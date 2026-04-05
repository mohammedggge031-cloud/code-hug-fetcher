import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Globe, MapPin, ArrowRight, CheckCircle, Users, Award, Star, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import SEOHead from "@/components/SEOHead";
import { useSeoMetadata } from "@/hooks/useSeoMetadata";
import { countryLocations, getCitiesByCountry } from "@/data/locations";

const WHATSAPP = "https://wa.me/201271134828?text=Salam%20Alhamd%20Academy%20%F0%9F%91%8B";

const LearnQuranWorldwide = () => {
  const { seo } = useSeoMetadata("/learn-quran-online-worldwide");

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Alhamd Academy",
    "url": "https://alhamdacademy.net/learn-quran-online-worldwide",
    "description": "Learn Quran online from anywhere in the world with certified Al-Azhar teachers. Serving students in USA, Canada, UK, Australia, and Europe.",
    "areaServed": countryLocations.map(c => ({
      "@type": "Country",
      "name": c.name,
    })),
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Learn Quran Online Worldwide | Al-Azhar Teachers"
        description="Learn Quran online from anywhere. Certified Al-Azhar teachers. One-on-one classes for students in USA, Canada, UK, Australia & Europe. Free trial."
        canonical="https://alhamdacademy.net/learn-quran-online-worldwide"
        keywords="learn quran online worldwide, online quran classes international, quran teacher online, learn quran from home, global quran education"
        structuredData={structuredData}
        dynamicSeo={seo}
      />
      <Navbar />

      {/* Breadcrumb */}
      <div className="bg-muted/30 border-b">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <span className="text-foreground font-medium">Learn Quran Online Worldwide</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Globe className="w-4 h-4" />
              Serving 8+ Countries Worldwide
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground leading-tight mb-6">
              Learn Quran Online from Anywhere in the World
              <span className="block text-primary mt-2">With Certified Al-Azhar Teachers from Egypt</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Alhamd Academy connects Muslim families worldwide with certified Al-Azhar University teachers for personalized one-on-one Quran, Arabic, and Islamic studies classes. Available 24/7 across all time zones.
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
              { icon: Award, text: "Al-Azhar Certified Teachers" },
              { icon: Users, text: "200+ Students, 8+ Countries" },
              { icon: Star, text: "4.9/5 Rating" },
              { icon: Clock, text: "24/7 Across All Time Zones" },
            ].map((b, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <b.icon className="w-6 h-6 text-primary" />
                <span className="text-sm font-medium text-foreground">{b.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Countries Grid */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-10 text-center">
            Find Quran Classes in Your Country
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {countryLocations.map((country) => {
              const cities = getCitiesByCountry(country.slug);
              return (
                <motion.div
                  key={country.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-background border rounded-xl p-6 hover:border-primary hover:shadow-md transition-all"
                >
                  <Link to={`/${country.slug}`} className="group">
                    <div className="flex items-center gap-3 mb-3">
                      <Globe className="w-6 h-6 text-primary" />
                      <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                        {country.name}
                      </h3>
                      <ArrowRight className="w-4 h-4 text-muted-foreground ml-auto group-hover:text-primary transition-colors" />
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{country.timezone} · {country.timezoneOffset}</p>
                  </Link>
                  {cities.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t">
                      {cities.map(city => (
                        <Link
                          key={city.slug}
                          to={`/${city.slug}`}
                          className="inline-flex items-center gap-1 text-xs text-primary hover:underline bg-primary/5 px-2 py-1 rounded-full"
                        >
                          <MapPin className="w-3 h-3" />
                          {city.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
              Why Families Worldwide Choose Alhamd Academy
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                "Certified Al-Azhar University teachers with 7+ years experience",
                "One-on-one personalized sessions — not group classes",
                "24/7 availability across all time zones worldwide",
                "Structured curriculum from Noor Al-Bayan to Ijazah",
                "Male and female teachers available",
                "Affordable plans — check our pricing for details",
                "Free trial with no commitment required",
                "Ijazah certification with Sanad — best value online",
              ].map((r, i) => (
                <div key={i} className="flex items-start gap-3 bg-background rounded-lg p-4 shadow-sm">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <span className="text-foreground">{r}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Start Your Quran Journey Today
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Join students from 8+ countries who trust Alhamd Academy for their Quran education. Book your free trial now.
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

      <Footer />
    </div>
  );
};

export default LearnQuranWorldwide;
