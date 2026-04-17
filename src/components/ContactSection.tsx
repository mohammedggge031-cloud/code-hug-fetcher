import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Mail, Phone, Send, CalendarIcon, Clock, Globe, AlertCircle } from "lucide-react";
import { useMobileSafeMotion } from "@/hooks/useMobileSafeMotion";
import EgyptFlag from "@/components/EgyptFlag";
import { useState, useRef } from "react";
import { format } from "date-fns";
import { fetchExternalFunction } from "@/lib/externalDashboard";
import { bookingFormSchema, getFieldError } from "@/lib/formValidation";
import { z } from "zod";

const TIME_SLOTS = [
  { label: "12:00 AM – 4:00 AM", value: "00:00-04:00" },
  { label: "4:00 AM – 8:00 AM", value: "04:00-08:00" },
  { label: "8:00 AM – 12:00 PM", value: "08:00-12:00" },
  { label: "12:00 PM – 4:00 PM", value: "12:00-16:00" },
  { label: "4:00 PM – 8:00 PM", value: "16:00-20:00" },
  { label: "8:00 PM – 12:00 AM", value: "20:00-00:00" },
];

const TIMEZONES = [
  { label: "(UTC-12:00) Baker Island", value: "UTC-12", offset: -12 },
  { label: "(UTC-11:00) Samoa", value: "UTC-11", offset: -11 },
  { label: "(UTC-10:00) Hawaii", value: "UTC-10", offset: -10 },
  { label: "(UTC-9:00) Alaska", value: "UTC-9", offset: -9 },
  { label: "(UTC-8:00) Pacific Time (US)", value: "UTC-8", offset: -8 },
  { label: "(UTC-7:00) Mountain Time (US)", value: "UTC-7", offset: -7 },
  { label: "(UTC-6:00) Central Time (US)", value: "UTC-6", offset: -6 },
  { label: "(UTC-5:00) Eastern Time (US)", value: "UTC-5", offset: -5 },
  { label: "(UTC-4:00) Atlantic Time", value: "UTC-4", offset: -4 },
  { label: "(UTC-3:00) Buenos Aires", value: "UTC-3", offset: -3 },
  { label: "(UTC-2:00) Mid-Atlantic", value: "UTC-2", offset: -2 },
  { label: "(UTC-1:00) Azores", value: "UTC-1", offset: -1 },
  { label: "(UTC+0:00) London, UTC", value: "UTC+0", offset: 0 },
  { label: "(UTC+1:00) Paris, Berlin", value: "UTC+1", offset: 1 },
  { label: "(UTC+2:00) Cairo, Egypt", value: "UTC+2", offset: 2 },
  { label: "(UTC+3:00) Riyadh, Moscow", value: "UTC+3", offset: 3 },
  { label: "(UTC+3:30) Tehran", value: "UTC+3:30", offset: 3.5 },
  { label: "(UTC+4:00) Dubai, Muscat", value: "UTC+4", offset: 4 },
  { label: "(UTC+4:30) Kabul", value: "UTC+4:30", offset: 4.5 },
  { label: "(UTC+5:00) Karachi, Tashkent", value: "UTC+5", offset: 5 },
  { label: "(UTC+5:30) Mumbai, New Delhi", value: "UTC+5:30", offset: 5.5 },
  { label: "(UTC+5:45) Kathmandu", value: "UTC+5:45", offset: 5.75 },
  { label: "(UTC+6:00) Dhaka", value: "UTC+6", offset: 6 },
  { label: "(UTC+6:30) Yangon", value: "UTC+6:30", offset: 6.5 },
  { label: "(UTC+7:00) Bangkok, Jakarta", value: "UTC+7", offset: 7 },
  { label: "(UTC+8:00) Singapore, Beijing", value: "UTC+8", offset: 8 },
  { label: "(UTC+9:00) Tokyo, Seoul", value: "UTC+9", offset: 9 },
  { label: "(UTC+9:30) Adelaide", value: "UTC+9:30", offset: 9.5 },
  { label: "(UTC+10:00) Sydney, Melbourne", value: "UTC+10", offset: 10 },
  { label: "(UTC+11:00) Solomon Islands", value: "UTC+11", offset: 11 },
  { label: "(UTC+12:00) Auckland, Fiji", value: "UTC+12", offset: 12 },
  { label: "(UTC+13:00) Tonga", value: "UTC+13", offset: 13 },
];

const EGYPT_OFFSET = 2; // UTC+2
function convertTimeSlotToEgypt(slotValue: string, userOffset: number): string {
  const startHour = parseInt(slotValue.split("-")[0].split(":")[0]);
  const diff = EGYPT_OFFSET - userOffset;
  let egyptStart = startHour + diff;
  let egyptEnd = egyptStart + 4;
  
  const formatH = (h: number) => {
    h = ((h % 24) + 24) % 24;
    if (h === 0) return "12:00 AM";
    if (h === 12) return "12:00 PM";
    return h > 12 ? `${h - 12}:00 PM` : `${h}:00 AM`;
  };
  
  return `${formatH(egyptStart)} – ${formatH(egyptEnd)}`;
}

function formatDiff(userOffset: number): string {
  const diff = EGYPT_OFFSET - userOffset;
  if (diff === 0) return "same as Egypt";
  const sign = diff > 0 ? "+" : "";
  const hours = Math.floor(Math.abs(diff));
  const mins = (Math.abs(diff) % 1) * 60;
  const hStr = mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  return `Egypt is ${sign}${diff > 0 ? "" : "-"}${hStr}`;
}

// Simple rate limiter: max 3 submissions per 5 minutes
const RATE_LIMIT_WINDOW = 5 * 60 * 1000;
const RATE_LIMIT_MAX = 3;
const submissionTimestamps: number[] = [];

const isRateLimited = (): boolean => {
  const now = Date.now();
  while (submissionTimestamps.length > 0 && now - submissionTimestamps[0] > RATE_LIMIT_WINDOW) {
    submissionTimestamps.shift();
  }
  return submissionTimestamps.length >= RATE_LIMIT_MAX;
};

interface ContactSectionProps {
  /** Optional source identifier for tracking (e.g. "facebook_ads", "media_campaign"). 
   *  When set, it is sent to the external system AND appended to the WhatsApp message. 
   *  Default: undefined (organic — no change in behavior). */
  source?: string;
}

const ContactSection = ({ source }: ContactSectionProps = {}) => {
  const { t } = useLanguage();
  const { fadeIn, slideInLeft } = useMobileSafeMotion();
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedTz, setSelectedTz] = useState("UTC+2");
  const [formErrors, setFormErrors] = useState<z.ZodError | null>(null);
  const [submitError, setSubmitError] = useState("");
  const honeypotRef = useRef<HTMLInputElement>(null);

  const currentTzObj = TIMEZONES.find(tz => tz.value === selectedTz);

  return (
    <section id="contact" className="py-16 sm:py-20 md:py-24 bg-background" aria-label="Book a Free Trial Class - Contact Alhamd Academy">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            {...fadeIn()}
            className="text-center mb-16"
          >
            <span className="text-sm font-semibold text-accent uppercase tracking-wider">
              {t("Contact Us", "تواصل معنا")}
            </span>
            <motion.h2 {...slideInLeft(0.1)} className="text-3xl md:text-5xl font-bold text-foreground mt-3">
              {t("Start Your Journey Today", "ابدأ رحلتك اليوم")}
            </motion.h2>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
              {t(
                "Book your free trial class and experience the difference.",
                "احجز درسك التجريبي المجاني واختبر الفرق."
              )}
            </p>
          </motion.div>

          <motion.div
            {...fadeIn(0.1)}
            className="bg-card rounded-2xl md:rounded-3xl shadow-elevated p-5 sm:p-8 md:p-12 border border-border"
          >
            <form className="grid md:grid-cols-2 gap-6" onSubmit={(e) => {
              e.preventDefault();
              setFormErrors(null);
              setSubmitError("");

              // Rate limit check
              if (isRateLimited()) {
                setSubmitError(t("Too many submissions. Please wait a few minutes.", "عدد كبير من المحاولات. يرجى الانتظار بضع دقائق."));
                return;
              }

              const form = e.currentTarget;
              const rawData = {
                fullName: (form.querySelector('[name="fullName"]') as HTMLInputElement)?.value || '',
                phone: (form.querySelector('[name="phone"]') as HTMLInputElement)?.value || '',
                course: (form.querySelector('[name="course"]') as HTMLSelectElement)?.value || '',
                message: (form.querySelector('[name="message"]') as HTMLTextAreaElement)?.value || '',
                website: honeypotRef.current?.value || '',
              };

              // Validate with Zod
              const result = bookingFormSchema.safeParse(rawData);
              if (!result.success) {
                setFormErrors(result.error);
                return;
              }

              // Honeypot check (bots fill hidden fields)
              if (result.data.website) return;

              submissionTimestamps.push(Date.now());

              const name = result.data.fullName;
              const phone = result.data.phone;
              const course = result.data.course;
              const message = result.data.message;

              let scheduleText = '';
              if (selectedDate || selectedTime) {
                const dateStr = selectedDate ? format(selectedDate, "yyyy-MM-dd (EEEE)") : t("Not specified", "غير محدد");
                const timeLabel = selectedTime ? TIME_SLOTS.find(s => s.value === selectedTime)?.label || selectedTime : t("Not specified", "غير محدد");
                const tzLabel = currentTzObj?.label || selectedTz;
                
                scheduleText = `\n\n📅 *${t("Preferred Date", "التاريخ المفضل")}:* ${dateStr}\n⏰ *${t("Time Slot", "الوقت")}:* ${timeLabel}\n🌍 *${t("Timezone", "المنطقة الزمنية")}:* ${tzLabel}`;
                
                if (selectedTime && currentTzObj) {
                  const egyptTime = convertTimeSlotToEgypt(selectedTime, currentTzObj.offset);
                  const diff = formatDiff(currentTzObj.offset);
                  scheduleText += `\n🇪🇬 *${t("Egypt Time", "توقيت مصر")}:* ${egyptTime}\n🔄 *${t("Time Difference", "فرق التوقيت")}:* ${diff}`;
                }
              }

              const sourceLine = source ? `\n🏷️ *Source:* ${source}` : '';
              const text = `📚 *New Booking Request - Alhamd Academy*\n\n👤 *Name:* ${name}\n📱 *Phone:* ${phone}\n📖 *Course:* ${course}\n💬 *Message:* ${message}${scheduleText}${sourceLine}`;

              // Send copy to admin system (non-blocking)
              try {
                fetchExternalFunction("receive-booking", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    full_name: name,
                    phone,
                    email: null,
                    course_interest: course,
                    preferred_date: selectedDate ? format(selectedDate, "yyyy-MM-dd") : null,
                    preferred_time: selectedTime || null,
                    timezone: selectedTz,
                    message: message || null,
                    ...(source ? { source } : {}),
                  }),
                }).catch((e) => console.error("Booking sync error:", e));
              } catch (e) {
                console.error("Booking sync error:", e);
              }

              window.open(`https://wa.me/201271134828?text=${encodeURIComponent(text)}`, '_blank');
            }}>
              {/* Honeypot — invisible to real users */}
              <div className="absolute -left-[9999px]" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input type="text" name="website" id="website" tabIndex={-1} autoComplete="off" ref={honeypotRef} />
              </div>

              {submitError && (
                <div className="md:col-span-2 flex items-center gap-2 text-destructive text-sm bg-destructive/10 p-3 rounded-lg">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {submitError}
                </div>
              )}

              <div>
                <label htmlFor="fullName" className="text-sm font-medium text-foreground mb-2 block">
                  {t("Full Name", "الاسم الكامل")} *
                </label>
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  required
                  maxLength={100}
                  className={`w-full px-4 py-3 rounded-xl border ${getFieldError(formErrors, "fullName") ? "border-destructive" : "border-input"} bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow`}
                  placeholder={t("Your name", "اسمك")}
                />
                {getFieldError(formErrors, "fullName") && (
                  <p className="text-xs text-destructive mt-1">{getFieldError(formErrors, "fullName")}</p>
                )}
              </div>
              <div>
                <label htmlFor="phone" className="text-sm font-medium text-foreground mb-2 block">
                  {t("Phone", "الهاتف")} *
                </label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  required
                  maxLength={20}
                  className={`w-full px-4 py-3 rounded-xl border ${getFieldError(formErrors, "phone") ? "border-destructive" : "border-input"} bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow`}
                  placeholder={t("+1 (555) 000-0000", "+966 5xx xxx xxxx")}
                />
                {getFieldError(formErrors, "phone") && (
                  <p className="text-xs text-destructive mt-1">{getFieldError(formErrors, "phone")}</p>
                )}
              </div>
              <div>
                <label htmlFor="course-select" className="text-sm font-medium text-foreground mb-2 block">
                  {t("Course Interest", "الدورة المطلوبة")}
                </label>
                <select name="course" id="course-select" className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow">
                  <option>{t("Quran Course", "دورة القرآن الكريم")}</option>
                  <option>{t("Tajweed Course", "دورة التجويد")}</option>
                  <option>{t("Arabic Course", "دورة اللغة العربية")}</option>
                  <option>{t("Islamic Studies", "الدراسات الإسلامية")}</option>
                  <option>{t("All-in-One Course", "الدورة الشاملة")}</option>
                </select>
              </div>

              {/* Date Picker - Optional */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  <CalendarIcon className="w-4 h-4 inline-block ltr:mr-1 rtl:ml-1" />
                  {t("Preferred Date (Optional)", "التاريخ المفضل (اختياري)")}
                </label>
                <input
                  type="date"
                  value={selectedDate ? format(selectedDate, "yyyy-MM-dd") : ""}
                  min={format(new Date(), "yyyy-MM-dd")}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (!value) {
                      setSelectedDate(undefined);
                      return;
                    }
                    const [year, month, day] = value.split("-").map(Number);
                    setSelectedDate(new Date(year, month - 1, day));
                  }}
                  className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
                  aria-label={t("Preferred Date", "التاريخ المفضل")}
                />
              </div>

              {/* Time Slot - Optional */}
              <div>
                <label htmlFor="time-select" className="text-sm font-medium text-foreground mb-2 block">
                  <Clock className="w-4 h-4 inline-block ltr:mr-1 rtl:ml-1" />
                  {t("Preferred Time (Optional)", "الوقت المفضل (اختياري)")}
                </label>
                <select
                  id="time-select"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
                >
                  <option value="">{t("Select a time slot", "اختر وقت")}</option>
                  {TIME_SLOTS.map((slot) => (
                    <option key={slot.value} value={slot.value}>{slot.label}</option>
                  ))}
                </select>
              </div>

              {/* Timezone - Optional */}
              <div className="md:col-span-2">
                <label htmlFor="timezone-select" className="text-sm font-medium text-foreground mb-2 block">
                  <Globe className="w-4 h-4 inline-block ltr:mr-1 rtl:ml-1" />
                  {t("Your Timezone (Optional)", "منطقتك الزمنية (اختياري)")}
                </label>
                <select
                  id="timezone-select"
                  value={selectedTz}
                  onChange={(e) => setSelectedTz(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
                >
                  {TIMEZONES.map((tz) => (
                    <option key={tz.value} value={tz.value}>{tz.label}</option>
                  ))}
                </select>
                {selectedTime && currentTzObj && currentTzObj.offset !== EGYPT_OFFSET && (
                  <p className="text-xs text-muted-foreground mt-2">
                    <EgyptFlag className="w-5 h-3.5 inline-block align-middle mr-1" /> {t("Egypt Time", "توقيت مصر")}: {convertTimeSlotToEgypt(selectedTime, currentTzObj.offset)} ({formatDiff(currentTzObj.offset)})
                  </p>
                )}
              </div>

              <div className="md:col-span-2">
                <label htmlFor="message" className="text-sm font-medium text-foreground mb-2 block">
                  {t("Message", "الرسالة")}
                </label>
                <textarea
                  rows={4}
                  name="message"
                  id="message"
                  maxLength={1000}
                  className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow resize-none"
                  placeholder={t("Tell us about your learning goals...", "أخبرنا عن أهدافك التعليمية...")}
                />
              </div>
              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-10 py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-lg hover:opacity-90 transition-opacity"
                >
                  <Send className="w-5 h-5" />
                  {t("Book Free Trial", "احجز درساً مجانياً")}
                </button>
              </div>
            </form>

            {/* WhatsApp Direct Shortcut - Marketing optimized */}
            <div className="mt-10 pt-8 border-t border-border">
              <div className="bg-whatsapp/5 border border-whatsapp/20 rounded-2xl p-6 text-center">
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  {t("Prefer to skip the form?", "تفضل تتخطى الفورم؟")}
                </p>
                <p className="text-xs text-muted-foreground/70 mb-4">
                  {t("Message us directly and we'll handle everything for you", "راسلنا مباشرة وهنرتب كل حاجة")}
                </p>
                <a
                  href="https://wa.me/201271134828?text=Salam%20Alhamd%20Academy%20%F0%9F%91%8B"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-3.5 rounded-xl bg-whatsapp text-whatsapp-foreground font-semibold text-base hover:brightness-110 transition-[filter,box-shadow] shadow-lg hover:shadow-xl"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  {t("Chat on WhatsApp Now", "تواصل على واتساب الآن")}
                </a>
                <p className="text-xs text-muted-foreground/60 mt-3">
                  {t("We typically respond within minutes", "بنرد خلال دقائق")}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 mt-6">
                <a href="mailto:info@alhamdacademy.net" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                  <Mail className="w-5 h-5" />
                  info@alhamdacademy.net
                </a>
                <a href="https://wa.me/201271134828?text=Salam%20Alhamd%20Academy%20%F0%9F%91%8B" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                  <Phone className="w-5 h-5" />
                  +20 127 113 4828
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
