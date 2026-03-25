import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, Clock, Globe, Users, Award, BookOpen, Star, MapPin, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import SEOHead from "@/components/SEOHead";
import { useSeoMetadata } from "@/hooks/useSeoMetadata";
import { getLocationBySlug, getCitiesByCountry, allLocations, type LocationData } from "@/data/locations";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const WHATSAPP = "https://wa.me/201271134828?text=Salam%20Alhamd%20Academy%20%F0%9F%91%8B";

const LocationPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const location = slug ? getLocationBySlug(slug) : null;
  const { seo } = useSeoMetadata(`/${slug}`);

  if (!location) return <Navigate to="/not-found" replace />;

  const childCities = location.type === 'country' ? getCitiesByCountry(location.slug) : [];
  const parentCountry = location.type === 'city' && location.countrySlug
    ? allLocations.find(l => l.slug === location.countrySlug)
    : null;

  const breadcrumbItems = [
    { name: "Home", url: "https://alhamdacademy.net/" },
    { name: "Learn Quran Worldwide", url: "https://alhamdacademy.net/learn-quran-online-worldwide" },
  ];
  if (parentCountry) {
    breadcrumbItems.push({ name: parentCountry.name, url: `https://alhamdacademy.net/${parentCountry.slug}` });
  }
  breadcrumbItems.push({ name: location.name, url: `https://alhamdacademy.net/${location.slug}` });

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbItems.map((item, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": item.name,
      "item": item.url,
    })),
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Alhamd Academy",
    "url": `https://alhamdacademy.net/${location.slug}`,
    "description": location.metaDescription,
    "areaServed": {
      "@type": location.type === 'country' ? "Country" : "City",
      "name": location.name,
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": `Online Quran Classes in ${location.name}`,
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Course",
            "name": "Online Quran Classes",
            "provider": { "@type": "Organization", "name": "Alhamd Academy" },
          },
        },
      ],
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": location.faqs.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a },
    })),
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={location.metaTitle}
        description={location.metaDescription}
        canonical={`https://alhamdacademy.net/${location.slug}`}
        keywords={location.keywords}
        structuredData={[structuredData, faqSchema, breadcrumbSchema]}
        dynamicSeo={seo}
      />
      <Navbar />

      {/* Breadcrumb */}
      <div className="bg-muted/30 border-b">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link to="/learn-quran-online-worldwide" className="hover:text-primary transition-colors">
              Learn Quran Worldwide
            </Link>
            {parentCountry && (
              <>
                <span>/</span>
                <Link to={`/${parentCountry.slug}`} className="hover:text-primary transition-colors">
                  {parentCountry.name}
                </Link>
              </>
            )}
            <span>/</span>
            <span className="text-foreground font-medium">{location.name}</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <MapPin className="w-4 h-4" />
              {location.type === 'country' ? `Serving students across ${location.name}` : `Available in ${location.name}, ${location.country}`}
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground leading-tight mb-6">
              Learn Quran Online in {location.name}
              <span className="block text-primary mt-2">With Certified Native Arabic-Speaking Al-Azhar Teachers</span>
            </h1>
            <p className="text-sm font-medium text-accent mb-4 inline-flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-full">
              🇪🇬 All our teachers are native Arabic speakers from Egypt — Arabic is their mother tongue
            </p>
            <p className="text-lg md:text-xl text-muted-foreground mb-4 max-w-3xl mx-auto">
              {location.introContent}
            </p>
            <p className="text-sm md:text-base text-muted-foreground/80 italic mb-8 max-w-2xl mx-auto">
              Learn Quran online with native Arabic-speaking teachers from Al-Azhar University in Egypt.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/free-trial"
                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold hover:bg-primary/90 transition-colors text-lg"
              >
                Book Free Trial <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border-2 border-primary text-primary px-8 py-4 rounded-lg font-semibold hover:bg-primary/5 transition-colors text-lg"
              >
                WhatsApp Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-8 bg-muted/30 border-y">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { icon: Award, text: "Native Arabic-Speaking Al-Azhar Teachers" },
              { icon: Users, text: "200+ Students Worldwide" },
              { icon: Star, text: "4.9/5 Rating" },
              { icon: Clock, text: "24/7 Availability" },
            ].map((b, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <b.icon className="w-6 h-6 text-primary" />
                <span className="text-sm font-medium text-foreground">{b.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Local Context Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                Online Quran Learning in {location.name}
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                {location.muslimPopulationNote}
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                {location.localContext}
              </p>

              <div className="bg-primary/5 rounded-xl p-6 mb-8">
                <div className="flex items-center gap-3 mb-3">
                  <Globe className="w-6 h-6 text-primary" />
                  <h3 className="text-lg font-semibold text-foreground">Time Zone Compatibility</h3>
                </div>
                <p className="text-muted-foreground">
                  <strong>{location.name}</strong> is in the <strong>{location.timezone}</strong> time zone,
                  which is <strong>{location.timezoneOffset}</strong>. Our teachers in Egypt (UTC+2)
                  are available 24/7 to accommodate your schedule perfectly.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Students Choose Us */}
      <section className="py-16 md:py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
              Why Students in {location.name} Choose Alhamd Academy
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {location.whyStudentsChoose.map((reason, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-3 bg-background rounded-lg p-4 shadow-sm"
                >
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <span className="text-foreground">{reason}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
              How Online Quran Classes Work {location.type === 'city' ? `for Students in ${location.name}, ${location.country}` : `Across ${location.name}`}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { step: "1", title: "Book Free Trial", desc: `Register from ${location.name} for a complimentary trial session. No card details, no obligation — just choose your preferred course and we'll pair you with a teacher who fits your ${location.timezone} schedule.` },
                { step: "2", title: "Meet Your Teacher", desc: `Join a live video session with your certified Al-Azhar teacher. They'll evaluate your current reading level, discuss your learning goals, and propose a study plan that works within ${location.timezoneOffset}.` },
                { step: "3", title: "Begin Your Journey", desc: `Start one-on-one Quran, Arabic, or Islamic studies classes designed around ${location.type === 'city' ? `life in ${location.name}` : `${location.name}'s daily rhythm`}. Every lesson is recorded so you can review at your own pace.` },
                { step: "4", title: "Grow & Achieve", desc: `Track your milestones through regular assessments. Whether you're pursuing Hifz, Ijazah, or conversational Arabic in ${location.name}, your teacher adapts the curriculum as you advance.` },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Teaching Methodology */}
      <section className="py-16 md:py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 text-center">
              {location.type === 'city'
                ? `How We Teach Quran to Students in ${location.name}`
                : `The Al-Azhar Teaching Approach for ${location.name} Learners`}
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6 text-center max-w-3xl mx-auto">
              {location.type === 'city'
                ? `Families in ${location.name}, ${location.country}, are taught by native Arabic-speaking scholars from Al-Azhar University in Cairo — the world's oldest Islamic institution (est. 970 CE). Because Arabic is their mother tongue, students receive authentic pronunciation guidance that non-native tutors simply cannot replicate.`
                : `Across ${location.name}, our Al-Azhar graduates deliver Quran instruction rooted in over a millennium of Islamic scholarship. As native Arabic speakers from Egypt, they bring an innate command of Quranic phonetics, grammar, and meaning — giving ${location.name}-based students an unmistakable edge in their recitation and comprehension.`}
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: "Noor Al-Bayan Foundation", desc: `The Noor Al-Bayan curriculum gives ${location.name} beginners a clear path from zero to fluent Quran reading — mastering Arabic letter forms, connecting sounds, and building confidence before advancing to full Surahs.` },
                { title: "Tailored Study Plans", desc: `Your teacher designs a unique syllabus around your schedule in ${location.timezone} and your personal objectives — whether that's daily Hifz revision, weekend Tajweed refinement, or conversational Arabic fluency.` },
                { title: "Ijazah with Sanad", desc: `Dedicated students in ${location.name} can pursue an authenticated Ijazah — a certification with an unbroken chain of transmission back to the Prophet ﷺ, recognized by Islamic institutions worldwide.` },
              ].map((m, i) => (
                <div key={i} className="bg-background rounded-xl border p-6">
                  <h3 className="font-semibold text-foreground mb-2">{m.title}</h3>
                  <p className="text-sm text-muted-foreground">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Courses Available */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
              {location.type === 'city'
                ? `What You Can Study from ${location.name}`
                : `Full Course Catalog for ${location.name} Students`}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "Quran Reading & Recitation", desc: `Popular among ${location.name} beginners — progress from Noor Al-Bayan letter recognition to fluent Quran reading with proper Tajweed`, link: "/online-quran-classes", icon: BookOpen },
                { title: "Tajweed Mastery", desc: `${location.name} students refine every Makharij and Sifat rule with native speakers who model authentic Egyptian Quranic recitation`, link: "/tajweed-course-online", icon: Award },
                { title: "Quran Memorization (Hifz)", desc: `A structured Hifz track with daily Mutoon revision — designed for ${location.type === 'city' ? location.name : location.country} learners balancing school or work`, link: "/quran-memorization-hifz", icon: Star },
                { title: "Arabic Language", desc: `Build real Arabic fluency — reading, grammar, and conversation — essential for deeper Quran understanding from ${location.name}`, link: "/arabic-for-adults", icon: Globe },
                { title: "Islamic Studies", desc: `Comprehensive Fiqh, Aqeedah, Tafseer, Hadith & Seerah curriculum contextualized for Muslims living in ${location.country}`, link: "/islamic-studies-online", icon: BookOpen },
                { title: "Ijazah Certification", desc: `Earn an authenticated Ijazah with full Sanad — available to advanced ${location.name} students at just $15/hour`, link: "/ijazah-program", icon: Award },
              ].map((course, i) => (
                <Link
                  key={i}
                  to={course.link}
                  className="group bg-background rounded-xl border p-6 hover:border-primary hover:shadow-md transition-all"
                >
                  <course.icon className="w-8 h-8 text-primary mb-3" />
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{course.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Overview */}
      <section className="py-16 md:py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              {location.type === 'city'
                ? `Pricing Plans for ${location.name}, ${location.country}`
                : `Affordable Plans for ${location.name} Families`}
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              {location.type === 'city'
                ? `Compared to private Quran tutors in ${location.name}, Alhamd Academy offers Al-Azhar quality at a fraction of the cost — with the convenience of learning from home.`
                : `Families across ${location.name} enjoy premium Al-Azhar instruction at prices well below local tutoring rates. Every plan includes a free trial, progress reports, and full schedule flexibility in ${location.timezone}.`}
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { plan: "Basic", sessions: "3 days/week", duration: "30 min", price: "$57", note: "Great for beginners" },
                { plan: "Standard", sessions: "5 days/week", duration: "30 min", price: "$76", note: "Most popular" },
                { plan: "Premium", sessions: "5 days/week", duration: "45 min", price: "$114", note: "Deeper sessions" },
                { plan: "Intensive", sessions: "5 days/week", duration: "60 min", price: "$152", note: "Hifz & Ijazah track" },
              ].map((p, i) => (
                <div key={i} className={`bg-background rounded-xl border p-6 ${i === 1 ? 'border-primary ring-2 ring-primary/20' : ''}`}>
                  <h3 className="font-semibold text-foreground mb-1">{p.plan}</h3>
                  <p className="text-xs text-accent font-medium mb-2">{p.note}</p>
                  <p className="text-sm text-muted-foreground mb-3">{p.sessions} · {p.duration}</p>
                  <p className="text-2xl font-bold text-primary">{p.price}<span className="text-sm font-normal text-muted-foreground">/mo</span></p>
                </div>
              ))}
            </div>
            <p className="text-muted-foreground mt-6">Save 6% with semi-annual and 14% with annual subscription</p>
          </div>
        </div>
      </section>

      {/* City Pages for Country */}
      {childCities.length > 0 && (
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
                Learn Quran in Cities Across {location.name}
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {childCities.map(city => (
                  <Link
                    key={city.slug}
                    to={`/${city.slug}`}
                    className="flex items-center gap-3 bg-background border rounded-lg p-4 hover:border-primary hover:shadow-sm transition-all group"
                  >
                    <MapPin className="w-5 h-5 text-primary shrink-0" />
                    <div>
                      <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                        {city.name}
                      </span>
                      <p className="text-xs text-muted-foreground">{city.timezone}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground ml-auto group-hover:text-primary transition-colors" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FAQs */}
      <section className="py-16 md:py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
              Frequently Asked Questions — {location.name}
            </h2>
            <Accordion type="single" collapsible className="space-y-2">
              {location.faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="bg-background rounded-lg border px-4">
                  <AccordionTrigger className="text-left text-foreground font-medium">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Start Learning Quran from {location.name} Today
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Join hundreds of students worldwide. Book your free trial class and experience the difference certified Al-Azhar teachers make.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/free-trial"
              className="inline-flex items-center justify-center gap-2 bg-background text-primary px-8 py-4 rounded-lg font-semibold hover:bg-background/90 transition-colors text-lg"
            >
              Book Free Trial <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border-2 border-primary-foreground text-primary-foreground px-8 py-4 rounded-lg font-semibold hover:bg-primary-foreground/10 transition-colors text-lg"
            >
              WhatsApp +201271134828
            </a>
          </div>
        </div>
      </section>

      {/* Internal Links */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-lg font-semibold text-foreground mb-4">Explore More</h2>
            <div className="flex flex-wrap gap-3">
              <Link to="/learn-quran-online-worldwide" className="text-sm text-primary hover:underline">Learn Quran Worldwide</Link>
              <span className="text-muted-foreground">·</span>
              <Link to="/online-quran-classes" className="text-sm text-primary hover:underline">Online Quran Classes</Link>
              <span className="text-muted-foreground">·</span>
              <Link to="/tajweed-course-online" className="text-sm text-primary hover:underline">Tajweed Course</Link>
              <span className="text-muted-foreground">·</span>
              <Link to="/free-trial" className="text-sm text-primary hover:underline">Free Trial</Link>
              <span className="text-muted-foreground">·</span>
              <Link to="/ijazah-program" className="text-sm text-primary hover:underline">Ijazah Program</Link>
              {parentCountry && (
                <>
                  <span className="text-muted-foreground">·</span>
                  <Link to={`/${parentCountry.slug}`} className="text-sm text-primary hover:underline">
                    Learn Quran in {parentCountry.name}
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LocationPage;
