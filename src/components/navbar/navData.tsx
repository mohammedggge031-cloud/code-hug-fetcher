import { Mail, Phone, BookOpen, Moon, Languages, GraduationCap, Sparkles, Users, Award, MessageCircle, Clock } from "lucide-react";
import { FacebookIcon, InstagramIcon, WhatsAppIcon, YoutubeIcon, TikTokIcon } from "@/components/icons/SocialIcons";
import type { NavLinkWithDropdown, SocialLink } from "./types";

export const getLinks = (hasTeachers: boolean): NavLinkWithDropdown[] => [
  { en: "Home", ar: "الرئيسية", href: "#home" },
  {
    en: "Courses", ar: "الدورات", href: "#courses",
    dropdown: [
      {
        icon: <BookOpen className="w-4 h-4" />, labelEn: "Quran Course", labelAr: "دورة القرآن الكريم", href: "/courses/quran-course", isRoute: true,
        subItems: [
          { labelEn: "Learn to Read Quran", labelAr: "تعلم قراءة القرآن", href: "/online-quran-classes", isRoute: true },
          { labelEn: "Quran Memorization (Hifz)", labelAr: "حفظ القرآن أونلاين", href: "/quran-memorization-hifz", isRoute: true },
          { labelEn: "Quran Course Full Track", labelAr: "دورة القرآن المتكاملة", href: "/courses/quran-course", isRoute: true },
          { labelEn: "Quran for Kids", labelAr: "القرآن للأطفال", href: "/courses/quran-course", isRoute: true },
          { labelEn: "Ijazah Program", labelAr: "برنامج الإجازة", href: "/ijazah-program", isRoute: true },
        ],
      },
      {
        icon: <Moon className="w-4 h-4" />, labelEn: "Tajweed Course", labelAr: "دورة التجويد", href: "/courses/tajweed-course", isRoute: true,
        subItems: [
          { labelEn: "Basic Tajweed", labelAr: "التجويد الأساسي", href: "/tajweed-course-online", isRoute: true },
          { labelEn: "Intermediate Tajweed", labelAr: "التجويد المتوسط", href: "/courses/tajweed-course", isRoute: true },
          { labelEn: "Advanced Tajweed", labelAr: "التجويد المتقدم", href: "/courses/tajweed-course", isRoute: true },
          { labelEn: "Tajweed for Kids", labelAr: "التجويد للأطفال", href: "/courses/tajweed-course", isRoute: true },
        ],
      },
      {
        icon: <Languages className="w-4 h-4" />, labelEn: "Arabic Course", labelAr: "دورة اللغة العربية", href: "/courses/arabic-course", isRoute: true,
        subItems: [
          { labelEn: "Noorani Qaida Online", labelAr: "النورانية أونلاين", href: "/courses/arabic-course", isRoute: true },
          { labelEn: "Arabic for Kids", labelAr: "العربية للأطفال", href: "/arabic-for-kids", isRoute: true },
          { labelEn: "Arabic for Adults", labelAr: "العربية للكبار", href: "/arabic-for-adults", isRoute: true },
          { labelEn: "Quranic Arabic", labelAr: "العربية القرآنية", href: "/courses/arabic-course", isRoute: true },
        ],
      },
      {
        icon: <GraduationCap className="w-4 h-4" />, labelEn: "Islamic Studies", labelAr: "الدراسات الإسلامية", href: "/courses/islamic-studies", isRoute: true,
        subItems: [
          { labelEn: "Islamic Essentials for Kids", labelAr: "الأساسيات الإسلامية للأطفال", href: "/courses/islamic-studies", isRoute: true },
          { labelEn: "Fiqh & Aqeedah", labelAr: "الفقه والعقيدة", href: "/courses/islamic-studies", isRoute: true },
          { labelEn: "Tafseer, Hadith & Seerah", labelAr: "التفسير والحديث والسيرة", href: "/courses/islamic-studies", isRoute: true },
          { labelEn: "New Muslim Program", labelAr: "برنامج المسلمين الجدد", href: "/courses/islamic-studies", isRoute: true },
        ],
      },
      {
        icon: <Sparkles className="w-4 h-4" />, labelEn: "All-in-One Course", labelAr: "الدورة الشاملة", href: "/courses/all-in-one-course", isRoute: true,
        subItems: [
          { labelEn: "Customized Learning Plan", labelAr: "خطة تعلم مخصصة", href: "/courses/all-in-one-course", isRoute: true },
          { labelEn: "Family Package", labelAr: "الباقة العائلية", href: "/courses/all-in-one-course", isRoute: true },
          { labelEn: "Weekend Intensive", labelAr: "المكثفة في عطلة الأسبوع", href: "/courses/all-in-one-course", isRoute: true },
        ],
      },
    ],
  },
  { en: "Pricing", ar: "الأسعار", href: "#pricing" },
  {
    en: "About", ar: "من نحن", href: "#about",
    dropdown: [
      { icon: <Award className="w-4 h-4" />, labelEn: "Why Choose Us", labelAr: "ليه احنا", href: "#why-us" },
      { icon: <MessageCircle className="w-4 h-4" />, labelEn: "Testimonials", labelAr: "آراء الطلاب", href: "#testimonials" },
      { icon: <Users className="w-4 h-4" />, labelEn: "Our Team", labelAr: "فريقنا", href: "#about" },
      ...(hasTeachers ? [{ icon: <GraduationCap className="w-4 h-4" />, labelEn: "Our Teachers", labelAr: "معلمونا", href: "#teachers" }] : []),
    ],
  },
  { en: "Blog", ar: "المدونة", href: "/blog", isRoute: true },
  { en: "Videos", ar: "فيديوهات", href: "/videos", isRoute: true },
  {
    en: "Contact", ar: "تواصل معنا", href: "#contact",
    dropdown: [
      { icon: <Phone className="w-4 h-4" />, labelEn: "WhatsApp", labelAr: "واتساب", href: "https://wa.me/201271134828?text=Salam%20Alhamd%20Academy%20%F0%9F%91%8B" },
      { icon: <Mail className="w-4 h-4" />, labelEn: "Email Us", labelAr: "راسلنا", href: "mailto:info@alhamdacademy.net" },
      { icon: <Clock className="w-4 h-4" />, labelEn: "Free Trial", labelAr: "تجربة مجانية", href: "/free-trial", isRoute: true },
    ],
  },
];

export const socials: SocialLink[] = [
  { icon: <WhatsAppIcon />, href: "https://wa.me/201271134828?text=Salam%20Alhamd%20Academy%20%F0%9F%91%8B", label: "WhatsApp" },
  { icon: <FacebookIcon />, href: "https://www.facebook.com/share/1BFyf4qMm8/", label: "Facebook" },
  { icon: <InstagramIcon />, href: "https://www.instagram.com/alhamdacademy_official", label: "Instagram" },
  { icon: <Mail className="w-4 h-4" />, href: "mailto:info@alhamdacademy.net", label: "Email" },
  { icon: <YoutubeIcon />, href: "https://www.youtube.com/@alhamdacademy_official", label: "YouTube" },
  { icon: <TikTokIcon />, href: "https://www.tiktok.com/@alhamdacademy_official", label: "TikTok" },
];
