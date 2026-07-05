import { useMemo } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { Clock, Globe, Users, Award, MapPin, BookOpen } from "lucide-react";
import ServicePageLayout, { type FAQ, type ClassStep, type TrustBadge } from "@/components/ServicePageLayout";
import { getLocationBySlug, getCitiesByCountry, allLocations, type LocationData } from "@/data/locations";

const buildClassSteps = (location: LocationData): ClassStep[] => [
  {
    titleEn: "Book Free Trial",
    titleAr: "احجز حصة تجريبية مجانية",
    descEn: `Register from ${location.name} for a complimentary trial session. No card details, no obligation — just choose your preferred course and we'll pair you with a teacher who fits your ${location.timezone} schedule.`,
    descAr: `سجّل من ${location.name} لحصة تجريبية مجانية بدون أي التزام، وسنرشح لك معلماً مناسباً لمواعيدك في ${location.timezone}.`,
  },
  {
    titleEn: "Meet Your Teacher",
    titleAr: "تعرّف على معلمك",
    descEn: `Join a live session with your certified Al-Azhar teacher. They'll assess your level, understand your goals, and organize a study plan that works within ${location.timezoneOffset}.`,
    descAr: `ادخل جلسة مباشرة مع معلمك المعتمد من الأزهر ليقيّم مستواك ويضع لك خطة تعلم تناسب فرق التوقيت ${location.timezoneOffset}.`,
  },
  {
    titleEn: "Begin Your Journey",
    titleAr: "ابدأ رحلتك",
    descEn: `Start one-on-one Quran, Arabic, or Islamic studies classes designed around ${location.type === "city" ? `life in ${location.name}` : `${location.name}'s daily rhythm`}.`,
    descAr: `ابدأ حصص القرآن أو العربية أو الدراسات الإسلامية بشكل فردي وفقاً لجدولك اليومي في ${location.name}.`,
  },
  {
    titleEn: "Grow & Achieve",
    titleAr: "تابع تقدمك",
    descEn: `Track your milestones through regular assessments and teacher feedback while learning from home with full schedule flexibility.`,
    descAr: `تابع تقدمك من خلال التقييمات المنتظمة وملاحظات المعلم مع مرونة كاملة في المواعيد والتعلم من المنزل.`,
  },
];

const LocationPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const location = slug ? getLocationBySlug(slug) : null;

  const faqs: FAQ[] = useMemo(
    () => location?.faqs.map((faq) => ({
      questionEn: faq.q,
      questionAr: faq.q,
      answerEn: faq.a,
      answerAr: faq.a,
    })) || [],
    [location],
  );

  if (!location) return <Navigate to="/404" replace />;

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

  const faqs: FAQ[] = useMemo(
    () => location?.faqs.map((faq) => ({
      questionEn: faq.q,
      questionAr: faq.q,
      answerEn: faq.a,
      answerAr: faq.a,
    })) || [],
    [location],
  );

  if (!location) return <Navigate to="/404" replace />;

  const trustBadges: TrustBadge[] = [
    { icon: Award, textEn: "Certified Al-Azhar Teachers", textAr: "معلمون معتمدون من الأزهر" },
    { icon: Users, textEn: "200+ Students Worldwide", textAr: "أكثر من 200 طالب حول العالم" },
    { icon: Globe, textEn: `${location.timezone} Friendly`, textAr: `مناسب لتوقيت ${location.timezone}` },
    { icon: Clock, textEn: "Flexible Scheduling", textAr: "مواعيد مرنة" },
  ];

  const features = [
    ...location.whyStudentsChoose,
    `Time zone-friendly scheduling for ${location.name}`,
    "Native Arabic-speaking teachers from Egypt",
  ].slice(0, 8);

  const outcomes = [
    ...location.whyStudentsChoose.slice(0, 4),
    `Convenient online learning from ${location.name}`,
  ];

  const relatedPages = [
    { titleEn: "Quran Classes Pricing", titleAr: "الأسعار", href: "/quran-classes-pricing" },
    { titleEn: "Free Trial", titleAr: "تجربة مجانية", href: "/free-trial" },
    { titleEn: "Online Quran Classes", titleAr: "دروس القرآن أونلاين", href: "/online-quran-classes" },
    { titleEn: "Tajweed Course", titleAr: "دورة التجويد", href: "/tajweed-course-online" },
    { titleEn: "Learn Quran Worldwide", titleAr: "تعلم القرآن عالميًا", href: "/learn-quran-online-worldwide" },
    ...(parentCountry ? [{ titleEn: `Learn Quran in ${parentCountry.name}`, titleAr: `تعلم القرآن في ${parentCountry.name}`, href: `/${parentCountry.slug}` }] : []),
  ];

  const childCitiesSection = childCities.length > 0 ? (
    <section className="py-16 bg-background" aria-label={`Cities in ${location.name}`}>
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
          Learn Quran in Cities Across {location.name}
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {childCities.map((city) => (
            <Link
              key={city.slug}
              to={`/${city.slug}`}
              className="flex items-center gap-3 bg-card border border-border rounded-xl p-4 shadow-sm hover:border-accent/30 hover:shadow-md transition-[border-color,box-shadow] duration-300 group"
            >
              <div className="w-11 h-11 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-accent" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="block font-semibold text-foreground group-hover:text-accent transition-colors">
                  {city.name}
                </span>
                <p className="text-xs text-muted-foreground">{city.timezone}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  ) : undefined;

  return (
    <ServicePageLayout
      seoTitle={location.metaTitle}
      seoDescription={location.metaDescription}
      seoKeywords={location.keywords}
      canonical={`https://alhamdacademy.net/${location.slug}`}
      breadcrumbJsonLd={breadcrumbSchema}
      heroTitleEn={`Learn Quran Online in ${location.name}`}
      heroTitleAr={`تعلم القرآن أونلاين في ${location.name}`}
      heroSubtitleEn="With Certified Native Arabic-Speaking Al-Azhar Teachers"
      heroSubtitleAr="مع معلمين معتمدين من الأزهر ومتحدثين أصليين بالعربية"
      heroDescEn={location.introContent}
      heroDescAr={location.introContent}
      aboutTitleEn={`Online Quran Learning in ${location.name}`}
      aboutTitleAr={`تعلم القرآن أونلاين في ${location.name}`}
      aboutContentEn={[
        location.introContent,
        location.muslimPopulationNote,
        location.localContext,
      ]}
      aboutContentAr={[
        location.introContent,
        location.muslimPopulationNote,
        location.localContext,
      ]}
      methodTitleEn="Time Zone Compatibility & Flexible Learning"
      methodTitleAr="التوافق مع فرق التوقيت ومرونة التعلم"
      methodContentEn={[
        `${location.name} is in the ${location.timezone} time zone, which is ${location.timezoneOffset}. Our teachers in Egypt are available throughout the day to fit your schedule comfortably.`,
        "You can study from home with one-on-one live sessions, flexible rescheduling, and direct follow-up after each class.",
      ]}
      methodContentAr={[
        `${location.name} is in the ${location.timezone} time zone, which is ${location.timezoneOffset}. Our teachers in Egypt are available throughout the day to fit your schedule comfortably.`,
        "You can study from home with one-on-one live sessions, flexible rescheduling, and direct follow-up after each class.",
      ]}
      classSteps={buildClassSteps(location)}
      classSessionTitleEn={location.type === "city" ? `How Online Quran Classes Work for Students in ${location.name}, ${location.country}` : `How Online Quran Classes Work Across ${location.name}`}
      classSessionTitleAr={`كيف تعمل حصص القرآن الأونلاين في ${location.name}`}
      levels={[]}
      outcomesEn={outcomes}
      outcomesAr={outcomes}
      featuresEn={features}
      featuresAr={features}
      faqs={faqs}
      testimonials={[]}
      relatedPages={relatedPages}
      relatedTitleEn="Explore More"
      relatedTitleAr="استكشف المزيد"
      trustBadges={trustBadges}
      whyChooseTitleEn={`Why Students in ${location.name} Choose Alhamd Academy`}
      whyChooseTitleAr={`لماذا يختار الطلاب في ${location.name} أكاديمية الحمد`}
      outcomesTitleEn={`Why Learning from ${location.name} Works Well Online`}
      outcomesTitleAr={`لماذا ينجح التعلم الأونلاين من ${location.name}`}
      faqTitleEn={`Frequently Asked Questions — ${location.name}`}
      faqTitleAr={`الأسئلة الشائعة — ${location.name}`}
      ctaTitleEn={`Start Learning Quran from ${location.name} Today`}
      ctaTitleAr={`ابدأ تعلم القرآن من ${location.name} اليوم`}
      ctaDescEn="Join hundreds of students worldwide. Book your free trial class and experience the difference certified Al-Azhar teachers make."
      ctaDescAr="انضم إلى مئات الطلاب حول العالم واحجز حصتك التجريبية المجانية مع معلمين معتمدين من الأزهر."
      jsonLd={structuredData}
      extraSection={childCitiesSection}
    />
  );
};

export default LocationPage;
