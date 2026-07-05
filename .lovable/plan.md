الخطة المقترحة:

1. تثبيت سبب المشكلة
- الاعتماد الحالي على Vercel rewrite إلى `api/prerender` يعمل فقط عندما يكون الطلب من User-Agent معروف كبوت وعلى نطاق Vercel/custom domain.
- لكن `View Source` العادي، ونطاق Lovable المنشور، وأي Scanner لا يطابق الـ User-Agent يرجعون `index.html` العام، لذلك يظهر title/canonical الصفحة الرئيسية.

2. إضافة prerender static حقيقي للمقالات أثناء الـ build
- إنشاء سكربت build يقرأ المقالات المنشورة وبيانات SEO من قاعدة البيانات.
- يولّد ملفات فعلية داخل build output بالشكل:
  ```text
  /blog/<slug>/index.html
  ```
- كل ملف يحتوي static head صحيح للمقالة: title، description، canonical، og:url، og:type article، twitter tags، JSON-LD Article/Breadcrumb.
- يبقى React app يعمل بعد التحميل، لكن أول HTML يقرأه Google/View Source سيكون خاص بالمقالة وليس الصفحة الرئيسية.

3. الحفاظ على قاعدة “الـ DB هي مصدر SEO الوحيد”
- السكربت سيستخدم بيانات `blog_posts` و `seo_metadata` الموجودة، ولن يضع ميتا ثابتة عشوائية داخل الكود.
- في حال عدم وجود SEO override للمقالة، يستخدم title/excerpt/canonical المبني من بيانات المقالة.

4. ضبط build والنشر
- ربط السكربت مع build command حتى يعمل تلقائياً قبل/بعد نشر الواجهة.
- تحديث أي sitemap/blog generation مرتبط لو لزم ليظل نفس قائمة المقالات المنشورة.
- عدم الاعتماد على User-Agent فقط؛ الـ static HTML سيكون موجوداً لأي زائر مباشر أو crawler.

5. التحقق بعد التنفيذ
- محلياً: فحص الملف الناتج لكل slug والتأكد أن canonical يشير إلى رابط المقالة.
- بعد النشر: اختبار:
  ```text
  view-source:https://www.alhamdacademy.net/blog/benefits-of-learning-the-quran-online-10-reasons-that-change-everything
  ```
  يجب أن يظهر title المقالة و canonical المقالة مباشرة.
- اختبار Googlebot و normal browser UA للتأكد أن الاثنين لا يرجعون head الصفحة الرئيسية.