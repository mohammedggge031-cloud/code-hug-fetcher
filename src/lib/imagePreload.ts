/**
 * Preloads all section images in the background after initial paint.
 * This ensures images are in the browser cache before sections become visible.
 * Does NOT affect rendering, layout, or any existing functionality.
 */

// Course images
import courseQuran from "@/assets/course-quran.webp";
import courseTajweed from "@/assets/course-tajweed.webp";
import courseArabic from "@/assets/course-arabic.webp";
import courseIslamic from "@/assets/course-islamic.webp";
import courseAllInOne from "@/assets/course-allinone.webp";

// Feature images (Why Choose Us)
import featureOneOnOne from "@/assets/features/one-on-one.webp";
import featureFlexible from "@/assets/features/flexible-schedule.webp";
import featureCertified from "@/assets/features/certified-teachers.webp";
import featureSupport from "@/assets/features/support-247.webp";
import featureSafe from "@/assets/features/safe-environment.webp";
import featureTrial from "@/assets/features/free-trial.webp";

// How It Works images
import stepBookTrial from "@/assets/features/step-book-trial.webp";
import stepMeetTeacher from "@/assets/features/step-meet-teacher.webp";
import stepStartJourney from "@/assets/features/step-start-journey.webp";
import stepProgress from "@/assets/features/step-progress.webp";

// Commitment images
import imgIntegrity from "@/assets/features/integrity-trust.webp";
import imgPatience from "@/assets/features/patience-compassion.webp";
import imgResults from "@/assets/features/results-driven.webp";
import imgAuthentic from "@/assets/features/authentic-education.webp";

// Hero gallery images
import heroStudent1 from "@/assets/hero-student1.webp";
import heroStudent2 from "@/assets/hero-student2.webp";
import heroStudent3 from "@/assets/hero-student3.webp";
import heroStudent4 from "@/assets/hero-student4.webp";
import heroStudent5 from "@/assets/hero-student5.webp";
import heroStudent6 from "@/assets/hero-student6.webp";

// Logo
import logo from "@/assets/logo-new.webp";

const ALL_IMAGES = [
  // Priority 1: Hero gallery (visible on desktop immediately)
  heroStudent1, heroStudent2, heroStudent3, heroStudent4, heroStudent5, heroStudent6,
  logo,
  // Priority 2: Courses section (first deferred section)
  courseQuran, courseTajweed, courseArabic, courseIslamic, courseAllInOne,
  // Priority 3: How It Works
  stepBookTrial, stepMeetTeacher, stepStartJourney, stepProgress,
  // Priority 4: Commitment
  imgIntegrity, imgPatience, imgResults, imgAuthentic,
  // Priority 5: Why Choose Us
  featureOneOnOne, featureFlexible, featureCertified, featureSupport, featureSafe, featureTrial,
];

function preloadImage(src: string): Promise<void> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => resolve(); // Don't block on errors
    img.src = src;
  });
}

/**
 * Start preloading all images in batches after initial paint.
 * Uses requestIdleCallback to avoid blocking the main thread.
 */
export function startImagePreload(): void {
  const run = () => {
    let i = 0;
    const BATCH = 3;

    const loadBatch = () => {
      const batch = ALL_IMAGES.slice(i, i + BATCH);
      if (batch.length === 0) return;
      i += BATCH;
      Promise.all(batch.map(preloadImage)).then(() => {
        if (i < ALL_IMAGES.length) {
          // Small delay between batches to avoid network congestion
          setTimeout(loadBatch, 50);
        }
      });
    };

    loadBatch();
  };

  // Wait for initial paint, then start background preloading
  if ("requestIdleCallback" in window) {
    requestIdleCallback(run, { timeout: 2000 });
  } else {
    setTimeout(run, 1000);
  }
}
