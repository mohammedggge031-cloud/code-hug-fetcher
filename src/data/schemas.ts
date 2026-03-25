// JSON-LD Structured Data schemas — extracted for performance (reduces Index.tsx bundle)

export const courseSchemas = [
  {
    "@context": "https://schema.org",
    "@type": "Course",
    "@id": "https://alhamdacademy.net/#quran-course",
    "name": "Online Quran Recitation & Memorization (Hifz)",
    "description": "Comprehensive Quran learning program with reading, recitation, and memorization. One-on-one sessions with certified Egyptian teachers using Noor Al-Bayan method.",
    "provider": { "@id": "https://alhamdacademy.net/#organization" },
    "educationalLevel": "Beginner to Advanced",
    "availableLanguage": ["English", "Arabic"],
    "deliveryMode": "online",
    "coursePrerequisites": "No prior knowledge required",
    "educationalCredentialAwarded": "Certificate of Completion & Ijazah (for advanced students)",
    "timeToComplete": "PT12M",
    "numberOfCredits": { "@type": "StructuredValue", "value": "Ongoing" },
    "teaches": "Quran reading, recitation with Tajweed, and memorization (Hifz)",
    "about": ["Quran", "Hifz", "Quran Memorization", "Quran Recitation"],
    "inLanguage": ["en", "ar"],
    "offers": {
      "@type": "Offer",
      "price": "57",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "priceValidUntil": "2027-12-31",
      "url": "https://alhamdacademy.net/#pricing"
    },
    "hasCourseInstance": {
      "@type": "CourseInstance",
      "courseMode": "online",
      "courseWorkload": "PT4H/month",
      "instructor": {
        "@type": "Person",
        "name": "Certified Al-Azhar University Graduate Teachers",
        "jobTitle": "Quran Instructor",
        "alumniOf": { "@type": "CollegeOrUniversity", "name": "Al-Azhar University" }
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": 4.9,
      "ratingCount": 85,
      "bestRating": 5
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "Course",
    "@id": "https://alhamdacademy.net/#tajweed-course",
    "name": "Tajweed Course - Basic to Ijazah",
    "description": "Master the art of Quranic recitation with proper Tajweed rules. From basic Makharij to advanced Ijazah preparation with certified teachers.",
    "provider": { "@id": "https://alhamdacademy.net/#organization" },
    "educationalLevel": "Beginner to Advanced",
    "availableLanguage": ["English", "Arabic"],
    "deliveryMode": "online",
    "educationalCredentialAwarded": "Tajweed Certificate & Ijazah",
    "teaches": "Tajweed rules, Makharij al-Huruf, Qiraat, and Ijazah preparation",
    "about": ["Tajweed", "Quran Recitation", "Ijazah", "Makharij"],
    "inLanguage": ["en", "ar"],
    "offers": { "@type": "Offer", "price": "57", "priceCurrency": "USD", "availability": "https://schema.org/InStock", "url": "https://alhamdacademy.net/#pricing" },
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": 4.9, "ratingCount": 45, "bestRating": 5 }
  },
  {
    "@context": "https://schema.org",
    "@type": "Course",
    "@id": "https://alhamdacademy.net/#arabic-course",
    "name": "Arabic Language Course (Al-Arabiyyah Bayna Yadayk)",
    "description": "Learn Arabic with the acclaimed Al-Arabiyyah Bayna Yadayk curriculum. From beginner to fluent speaker with native Arab teachers. Reading, writing, grammar, and conversation.",
    "provider": { "@id": "https://alhamdacademy.net/#organization" },
    "educationalLevel": "Beginner to Advanced",
    "availableLanguage": ["English", "Arabic"],
    "deliveryMode": "online",
    "teaches": "Arabic reading, writing, grammar (Nahw & Sarf), and conversation skills",
    "about": ["Arabic Language", "Learn Arabic", "Arabic Grammar", "Arabic Conversation"],
    "inLanguage": ["en", "ar"],
    "offers": { "@type": "Offer", "price": "57", "priceCurrency": "USD", "availability": "https://schema.org/InStock", "url": "https://alhamdacademy.net/#pricing" },
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": 4.8, "ratingCount": 40, "bestRating": 5 }
  },
  {
    "@context": "https://schema.org",
    "@type": "Course",
    "@id": "https://alhamdacademy.net/#islamic-studies-course",
    "name": "Islamic Studies Online - Fiqh, Aqeedah, Tafseer, Hadith & Seerah",
    "description": "Comprehensive Islamic Studies covering Fiqh, Aqeedah, Tafseer, Hadith & Seerah with qualified Al-Azhar scholars. Suitable for kids and adults.",
    "provider": { "@id": "https://alhamdacademy.net/#organization" },
    "educationalLevel": "Beginner to Advanced",
    "availableLanguage": ["English", "Arabic"],
    "deliveryMode": "online",
    "teaches": "Islamic jurisprudence, creed, Quran interpretation, Prophetic traditions, and Prophet's biography",
    "about": ["Islamic Studies", "Fiqh", "Aqeedah", "Tafseer", "Hadith", "Seerah"],
    "inLanguage": ["en", "ar"],
    "offers": { "@type": "Offer", "price": "57", "priceCurrency": "USD", "availability": "https://schema.org/InStock", "url": "https://alhamdacademy.net/#pricing" },
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": 4.9, "ratingCount": 30, "bestRating": 5 }
  },
  {
    "@context": "https://schema.org",
    "@type": "Course",
    "@id": "https://alhamdacademy.net/#ijazah-course",
    "name": "Ijazah Certification Program - Connected Sanad",
    "description": "Earn your Ijazah certification in Quran recitation with a connected chain of narration (Sanad) back to Prophet Muhammad ﷺ. One-on-one with certified sheikhs at only $15/hour.",
    "provider": { "@id": "https://alhamdacademy.net/#organization" },
    "educationalLevel": "Advanced",
    "availableLanguage": ["English", "Arabic"],
    "deliveryMode": "online",
    "educationalCredentialAwarded": "Ijazah with Connected Sanad",
    "teaches": "Complete Quran recitation with Ijazah certification in Hafs 'an 'Asim and other Qiraat",
    "about": ["Ijazah", "Sanad", "Quran Certification", "Hafs an Asim"],
    "inLanguage": ["en", "ar"],
    "offers": { "@type": "Offer", "price": "15", "priceCurrency": "USD", "unitText": "per hour", "availability": "https://schema.org/InStock", "url": "https://alhamdacademy.net/ijazah-program" },
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": 5.0, "ratingCount": 20, "bestRating": 5 }
  }
];

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://alhamdacademy.net/#faq",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What courses does Alhamd Academy offer?",
      "acceptedAnswer": { "@type": "Answer", "text": "Alhamd Academy offers Online Quran Recitation & Memorization (Hifz), Tajweed (Basic to Advanced with Ijazah), Arabic Language courses using the Al-Arabiyyah Bayna Yadayk curriculum, Islamic Studies (Fiqh, Aqeedah, Tafseer, Hadith & Seerah), Ijazah Certification with connected Sanad, and a customizable All-in-One course combining multiple disciplines." }
    },
    {
      "@type": "Question",
      "name": "Are the teachers at Alhamd Academy qualified and certified?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. All our teachers are certified native Arabic speakers from Egypt, holding university degrees in Islamic & Arabic studies from Al-Azhar University and other prestigious Egyptian institutions. They have years of experience teaching Quran, Arabic, and Islamic studies to non-Arabic speakers. Every teacher passes a rigorous multi-stage interview testing Tajweed precision, Islamic knowledge, Arabic mastery, and English fluency." }
    },
    {
      "@type": "Question",
      "name": "Do you offer a free trial class?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes! We offer a completely free trial class with no commitment required. You can book your trial through our website contact form or by messaging us directly on WhatsApp at +201271134828. If you're not satisfied with the first teacher, you can request a different one — no questions asked." }
    },
    {
      "@type": "Question",
      "name": "What ages do you teach? Do you have Quran classes for kids?",
      "acceptedAnswer": { "@type": "Answer", "text": "We teach students of all ages — children as young as 4 years old, teenagers, and adults. Our curriculum is tailored to each student's age, level, and learning goals. Children receive age-appropriate, engaging lessons designed to hold their attention, while adults receive logic-based explanations with flexible pacing." }
    },
    {
      "@type": "Question",
      "name": "How much do online Quran classes cost?",
      "acceptedAnswer": { "@type": "Answer", "text": "Plans start from $57/month for 30-minute sessions, 3 days per week. We offer flexible plans with 30, 45, or 60-minute sessions, up to 5 days per week. Semi-annual subscribers save 6%, and annual subscribers save 14%. Family discounts are available for multiple students. Ijazah sessions are only $15/hour." }
    },
    {
      "@type": "Question",
      "name": "How do I book a free trial Quran class?",
      "acceptedAnswer": { "@type": "Answer", "text": "You can book a free trial by: 1) Filling out the contact form on our website, 2) Messaging us directly on WhatsApp at +201271134828, or 3) Emailing us at info@alhamdacademy.net. We'll match you with a certified teacher and schedule a convenient time for your trial within 24 hours." }
    },
    {
      "@type": "Question",
      "name": "What platform do you use for online Quran classes?",
      "acceptedAnswer": { "@type": "Answer", "text": "We use Zoom and other video conferencing platforms for our one-on-one sessions. All you need is a stable internet connection and a device with a camera and microphone. We also use interactive whiteboards and screen sharing for an engaging learning experience." }
    },
    {
      "@type": "Question",
      "name": "Can I choose my class schedule? Are classes flexible?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes! We offer fully flexible scheduling available 24/7. You can choose the days and times that work best for you across all time zones, and adjust your schedule as needed. Our teachers are available across North America, Europe, Middle East, and Asia-Pacific time zones." }
    },
    {
      "@type": "Question",
      "name": "How long does it take to memorize the Quran (Hifz)?",
      "acceptedAnswer": { "@type": "Answer", "text": "The time to complete Hifz varies based on the student's dedication, schedule, and learning pace. Every student progresses differently depending on their commitment and number of sessions per week. We create personalized memorization plans with daily revision schedules to ensure strong retention." }
    },
    {
      "@type": "Question",
      "name": "What is the Noor Al-Bayan method for learning Quran?",
      "acceptedAnswer": { "@type": "Answer", "text": "Noor Al-Bayan is a proven systematic method for teaching Arabic reading and Quran recitation from scratch. It starts with individual letters, then connects them into words and sentences, building a strong foundation for fluent Quran reading. It's especially effective for beginners and young children who have no prior Arabic knowledge." }
    },
    {
      "@type": "Question",
      "name": "Do you offer Ijazah certification in Quran recitation?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes, we offer Ijazah certification for qualified students at only $15/hour — one-on-one with a certified sheikh. Our program covers Hafs 'an 'Asim (primary) with other Qiraat available. The Ijazah is granted through a connected chain of narration (Sanad) back to Prophet Muhammad ﷺ." }
    },
    {
      "@type": "Question",
      "name": "Can adults learn Quran online? Is it too late to start?",
      "acceptedAnswer": { "@type": "Answer", "text": "It's never too late to learn the Quran! Many of our students are adults who started from scratch. Our teachers are experienced in teaching adults with patience and respect. Whether you want to learn reading, improve Tajweed, or memorize the Quran, we'll create a plan that fits your pace and schedule." }
    },
    {
      "@type": "Question",
      "name": "Do you have female Quran teachers available?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes! We have certified female Quran teachers (Ustadhat) available for sisters and children who prefer learning with a female instructor. Our female teachers hold Ijazah certification and are experienced in teaching Quran, Tajweed, and Arabic in a comfortable, modesty-conscious environment." }
    },
    {
      "@type": "Question",
      "name": "Is Alhamd Academy suitable for new Muslims (converts)?",
      "acceptedAnswer": { "@type": "Answer", "text": "Absolutely! We welcome new Muslims and have experienced teachers who specialize in guiding converts. We start from the very basics — learning Arabic letters, basic Quran reading, essential Islamic practices (prayer, fasting, etc.), and gradually build knowledge. Our teachers are patient, understanding, and create a supportive environment for your journey." }
    },
    {
      "@type": "Question",
      "name": "Do you offer family discounts for multiple students?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes, we offer special family discounts when multiple family members enroll together. Contact us on WhatsApp at +201271134828 to discuss custom family plans. We believe every family member should have access to quality Quran and Arabic education." }
    },
    {
      "@type": "Question",
      "name": "What makes Alhamd Academy different from other online Quran academies?",
      "acceptedAnswer": { "@type": "Answer", "text": "Alhamd Academy stands out because of: 1) All teachers are native Arabic speakers and Al-Azhar graduates — Arabic is their mother tongue, so they understand exactly where non-Arabic speakers struggle. 2) Strictly one-on-one classes for personalized attention. 3) Structured curriculum from Noor Al-Bayan to Ijazah. 4) 24/7 availability across all time zones. 5) The most affordable Ijazah program at $15/hour. 6) 4.9/5 rating from 200+ students worldwide." }
    }
  ]
};

export const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://alhamdacademy.net/" }
  ]
};

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["EducationalOrganization", "Organization"],
  "@id": "https://alhamdacademy.net/#organization",
  "name": "Alhamd Academy",
  "legalName": "Alhamd Academy for Online Quran & Arabic Education",
  "alternateName": ["أكاديمية الحمد", "Alhamd Quran Academy", "Alhamd Online Academy"],
  "url": "https://alhamdacademy.net",
  "logo": {
    "@type": "ImageObject",
    "url": "https://alhamdacademy.net/favicon-512.png",
    "width": 512,
    "height": 512
  },
  "image": "https://alhamdacademy.net/og-image.jpg",
  "description": "Alhamd Academy is a specialized online Quran, Arabic & Islamic studies academy founded in Egypt. We provide one-on-one personalized classes with certified Al-Azhar University graduate teachers for kids and adults worldwide. Rated 4.9/5 by 200+ students across USA, UK, Canada & Australia.",
  "disambiguatingDescription": "Alhamd Academy (alhamdacademy.net) is an online Islamic educational institution specializing in Quran recitation, Tajweed, Hifz (memorization), Arabic language, and Islamic studies. Not affiliated with any other entity using a similar name in other industries.",
  "foundingDate": "2020",
  "foundingLocation": {
    "@type": "Place",
    "name": "Egypt",
    "address": { "@type": "PostalAddress", "addressCountry": "EG" }
  },
  "founder": {
    "@type": "Person",
    "name": "Alhamd Academy Team"
  },
  "numberOfEmployees": {
    "@type": "QuantitativeValue",
    "minValue": 20,
    "maxValue": 30
  },
  "naics": "611710",
  "isicV4": "8549",
  "additionalType": [
    "https://schema.org/School",
    "https://www.wikidata.org/wiki/Q3914"
  ],
  "brand": {
    "@type": "Brand",
    "name": "Alhamd Academy",
    "slogan": "One-on-One Quran & Arabic Classes — A Life-Changing Journey",
    "logo": "https://alhamdacademy.net/favicon-512.png",
    "url": "https://alhamdacademy.net"
  },
  "keywords": "online quran academy, learn quran online, tajweed classes, arabic language course, hifz program, ijazah certification, islamic studies online",
  "sameAs": [
    "https://www.facebook.com/share/1BFyf4qMm8/",
    "https://www.instagram.com/alhamdacademy_official",
    "https://wa.me/201271134828",
    "https://alhamdacademy.net"
  ],
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "telephone": "+201271134828",
      "contactType": "customer service",
      "availableLanguage": ["English", "Arabic"],
      "areaServed": "Worldwide",
      "hoursAvailable": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "00:00",
        "closes": "23:59"
      }
    },
    {
      "@type": "ContactPoint",
      "email": "info@alhamdacademy.net",
      "contactType": "customer support",
      "availableLanguage": ["English", "Arabic"]
    }
  ],
  "areaServed": [
    { "@type": "Country", "name": "United States" },
    { "@type": "Country", "name": "United Kingdom" },
    { "@type": "Country", "name": "Canada" },
    { "@type": "Country", "name": "Australia" },
    { "@type": "Country", "name": "United Arab Emirates" },
    { "@type": "Country", "name": "Saudi Arabia" },
    { "@type": "Country", "name": "Germany" },
    { "@type": "Country", "name": "France" }
  ],
  "knowsAbout": [
    "Quran Recitation", "Tajweed", "Hifz", "Arabic Language",
    "Islamic Studies", "Fiqh", "Aqeedah", "Tafseer", "Hadith",
    "Seerah", "Noor Al-Bayan", "Ijazah Certification"
  ],
  "slogan": "One-on-One Quran & Arabic Classes — A Life-Changing Journey",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": 4.9,
    "bestRating": 5,
    "worstRating": 1,
    "ratingCount": 200,
    "reviewCount": 150
  }
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://alhamdacademy.net/#website",
  "name": "Alhamd Academy — Online Quran, Arabic & Islamic Studies",
  "alternateName": ["أكاديمية الحمد", "Alhamd Quran Academy"],
  "url": "https://alhamdacademy.net",
  "publisher": { "@id": "https://alhamdacademy.net/#organization" },
  "inLanguage": ["en", "ar"],
  "about": "Online Quran, Arabic & Islamic education with certified Al-Azhar teachers"
};

export const reviewSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "@id": "https://alhamdacademy.net/#org-reviews",
  "name": "Alhamd Academy",
  "url": "https://alhamdacademy.net",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": 4.9,
    "bestRating": 5,
    "worstRating": 1,
    "ratingCount": 200,
    "reviewCount": 150
  },
  "review": [
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Dusa Ali" },
      "datePublished": "2025-01-15",
      "reviewRating": { "@type": "Rating", "ratingValue": 5, "bestRating": 5 },
      "reviewBody": "My children have made incredible progress in their Quran recitation. The teachers are patient, skilled, and truly passionate about teaching."
    },
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Zayan" },
      "datePublished": "2025-02-20",
      "reviewRating": { "@type": "Rating", "ratingValue": 5, "bestRating": 5 },
      "reviewBody": "As a busy professional, the flexible scheduling is a blessing. I've been able to consistently learn Arabic and Quran around my work schedule."
    },
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Izzan" },
      "datePublished": "2025-03-10",
      "reviewRating": { "@type": "Rating", "ratingValue": 5, "bestRating": 5 },
      "reviewBody": "I completed my Hifz journey with Alhamd Academy. The structured program and supportive teachers made what seemed impossible totally achievable."
    },
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Issa" },
      "datePublished": "2025-04-05",
      "reviewRating": { "@type": "Rating", "ratingValue": 5, "bestRating": 5 },
      "reviewBody": "The way the teachers treat my kids is outstanding. They make learning feel like fun, and my children actually look forward to their Quran classes every day."
    },
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Naveed Shahul" },
      "datePublished": "2025-05-12",
      "reviewRating": { "@type": "Rating", "ratingValue": 5, "bestRating": 5 },
      "reviewBody": "I was amazed by how organized and professional the system is. Everything from booking to class follow-ups runs so smoothly."
    },
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Hamza A." },
      "datePublished": "2025-06-18",
      "reviewRating": { "@type": "Rating", "ratingValue": 5, "bestRating": 5 },
      "reviewBody": "The teachers genuinely care about your progress. They celebrate every milestone with you and always encourage you to keep going."
    },
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Ruqayyah N." },
      "datePublished": "2025-07-22",
      "reviewRating": { "@type": "Rating", "ratingValue": 5, "bestRating": 5 },
      "reviewBody": "What sets Alhamd Academy apart is the personal attention. The teachers know each student's strengths and adapt their teaching accordingly."
    },
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Tariq J." },
      "datePublished": "2025-08-30",
      "reviewRating": { "@type": "Rating", "ratingValue": 5, "bestRating": 5 },
      "reviewBody": "The academy's structured curriculum and warm, welcoming environment made me feel comfortable from day one. Truly a world-class experience."
    }
  ]
};

export const speakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://alhamdacademy.net/#webpage",
  "name": "Alhamd Academy | Online Quran, Arabic & Islamic Studies",
  "description": "Professional online Quran, Arabic and Islamic studies classes with certified native Arabic teachers for kids and adults worldwide.",
  "isPartOf": { "@id": "https://alhamdacademy.net/#website" },
  "about": { "@id": "https://alhamdacademy.net/#organization" },
  "primaryImageOfPage": {
    "@type": "ImageObject",
    "url": "https://alhamdacademy.net/og-image.jpg"
  },
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": ["#home h1", "#about h2", "#courses h2"]
  },
  "url": "https://alhamdacademy.net/",
  "inLanguage": "en",
  "datePublished": "2020-01-01",
  "dateModified": "2026-03-24"
};

export const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://alhamdacademy.net/#service",
  "serviceType": "Online Quran & Arabic Education",
  "provider": { "@id": "https://alhamdacademy.net/#organization" },
  "name": "Online Quran, Arabic & Islamic Studies Classes",
  "description": "One-on-one online Quran, Arabic and Islamic studies classes with certified native Arabic-speaking teachers from Egypt. For kids and adults worldwide.",
  "areaServed": "Worldwide",
  "availableChannel": {
    "@type": "ServiceChannel",
    "serviceUrl": "https://alhamdacademy.net/",
    "servicePhone": "+201271134828",
    "availableLanguage": ["English", "Arabic"]
  },
  "offers": [
    {
      "@type": "Offer",
      "name": "Monthly Plan - 30min sessions",
      "price": "57",
      "priceCurrency": "USD",
      "description": "3 days/week, 30-minute sessions, 4 hours/month",
      "availability": "https://schema.org/InStock",
      "url": "https://alhamdacademy.net/#pricing"
    },
    {
      "@type": "Offer",
      "name": "Monthly Plan - 60min sessions",
      "price": "152",
      "priceCurrency": "USD",
      "description": "5 days/week, 60-minute sessions, 20 hours/month",
      "availability": "https://schema.org/InStock",
      "url": "https://alhamdacademy.net/#pricing"
    }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Online Islamic Education Courses",
    "itemListElement": [
      { "@type": "OfferCatalog", "name": "Quran Courses", "description": "Quran reading, recitation, and memorization (Hifz)" },
      { "@type": "OfferCatalog", "name": "Tajweed Courses", "description": "Tajweed rules from basic to Ijazah level" },
      { "@type": "OfferCatalog", "name": "Arabic Language", "description": "Arabic reading, writing, grammar, and conversation" },
      { "@type": "OfferCatalog", "name": "Islamic Studies", "description": "Fiqh, Aqeedah, Tafseer, Hadith & Seerah" },
      { "@type": "OfferCatalog", "name": "Ijazah Certification", "description": "Connected Sanad Ijazah at $15/hour" }
    ]
  },
  "hoursAvailable": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    "opens": "00:00",
    "closes": "23:59"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": 4.9,
    "reviewCount": 150,
    "bestRating": 5
  }
};

// HowTo schema — competitors don't have this, gives us rich snippets
export const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Start Learning Quran Online with Alhamd Academy",
  "description": "A simple 4-step process to start your Quran, Arabic, or Islamic studies journey with certified Al-Azhar teachers.",
  "totalTime": "PT24H",
  "estimatedCost": {
    "@type": "MonetaryAmount",
    "currency": "USD",
    "value": "0"
  },
  "step": [
    {
      "@type": "HowToStep",
      "name": "Book Your Free Trial",
      "text": "Send a WhatsApp message to +201271134828 or fill out the contact form on our website. Tell us your preferred course, schedule, and whether you'd like a male or female teacher.",
      "url": "https://alhamdacademy.net/free-trial",
      "position": 1
    },
    {
      "@type": "HowToStep",
      "name": "Meet Your Teacher",
      "text": "Within 24 hours, we'll match you with a certified Al-Azhar teacher who fits your goals. Your teacher will assess your current level during the free trial session.",
      "url": "https://alhamdacademy.net/#how-it-works",
      "position": 2
    },
    {
      "@type": "HowToStep",
      "name": "Start Your Journey",
      "text": "Choose a plan that fits your schedule from $57/month. Your teacher creates a personalized curriculum and tracks your progress every step of the way.",
      "url": "https://alhamdacademy.net/#pricing",
      "position": 3
    },
    {
      "@type": "HowToStep",
      "name": "See Real Progress",
      "text": "With structured one-on-one sessions and consistent practice, you'll notice measurable improvement in your Quran recitation, memorization, or Arabic skills.",
      "url": "https://alhamdacademy.net/#testimonials",
      "position": 4
    }
  ]
};

// ItemList schema for course carousel in search results
export const courseListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Alhamd Academy Online Courses",
  "description": "Complete list of online Quran, Arabic, and Islamic studies courses offered by Alhamd Academy",
  "numberOfItems": 7,
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Online Quran Recitation & Reading",
      "url": "https://alhamdacademy.net/online-quran-classes"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Tajweed Course - Basic to Advanced",
      "url": "https://alhamdacademy.net/tajweed-course-online"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Quran Memorization (Hifz) Program",
      "url": "https://alhamdacademy.net/quran-memorization-hifz"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Arabic Language for Kids",
      "url": "https://alhamdacademy.net/arabic-for-kids"
    },
    {
      "@type": "ListItem",
      "position": 5,
      "name": "Arabic Language for Adults",
      "url": "https://alhamdacademy.net/arabic-for-adults"
    },
    {
      "@type": "ListItem",
      "position": 6,
      "name": "Islamic Studies Online",
      "url": "https://alhamdacademy.net/islamic-studies-online"
    },
    {
      "@type": "ListItem",
      "position": 7,
      "name": "Ijazah Certification Program",
      "url": "https://alhamdacademy.net/ijazah-program"
    }
  ]
};

// Build a single @graph object for better Google understanding of entity relationships
const stripContext = (schema: any) => {
  const { "@context": _, ...rest } = schema;
  return rest;
};

export const allSchemas = {
  "@context": "https://schema.org",
  "@graph": [
    stripContext(organizationSchema),
    stripContext(websiteSchema),
    ...courseSchemas.map(stripContext),
    stripContext(faqSchema),
    stripContext(breadcrumbSchema),
    stripContext(reviewSchema),
    stripContext(speakableSchema),
    stripContext(serviceSchema),
    stripContext(howToSchema),
    stripContext(courseListSchema),
  ]
};
