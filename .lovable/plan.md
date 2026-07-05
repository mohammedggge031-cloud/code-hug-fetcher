
# فحص السيو لصفحات المقالات + خطة التحسين

## 1) ازاى الصفحة بتظهر حاليًا لما تضيف مقالة

سيناريو المستخدم الحقيقى (متصفح عادى):
1. يفتح `/blog/my-slug`
2. Vercel يرجع `index.html` (SPA فاضية — فيها Navbar فقط)
3. React يشتغل → `BlogPost.tsx` → استعلام Supabase على `blog_posts` بـ `slug`
4. يظهر المحتوى + `SEOHead` يحدّث `<title>` و `<meta>` عن طريق `react-helmet-async`
5. سايت‑ماب `/sitemap-blog.xml` (Edge Function) يدرج المقالة تلقائيًا من الـ DB

سيناريو **زاحف السوشيال** (Facebook/LinkedIn/WhatsApp/…):
- الـ User‑Agent يتطابق مع regex فى `vercel.json` → إعادة كتابة إلى `/api/prerender?slug=…`
- ترجع HTML صغيرة فيها OG/Twitter/JSON-LD الخاص بالمقالة + `<meta refresh>` للمستخدم الحقيقى

سيناريو **Googlebot / Bingbot**:
- لا يتطابق مع regex الـ prerender → يستقبل نفس SPA الفاضية
- Google يعتمد على تنفيذ JS (Rendering Queue) عشان يقرا المحتوى — بيشتغل غالبًا لكن **بتأخير أيام** ومش مضمون خصوصًا للمقالات الجديدة

## 2) العيوب الأساسية اللى لقيتها

**عيوب حرجة تخص الفهرسة:**

1. **Googlebot لا يحصل على HTML مُقدَّم** — أهم مشكلة. الـ prerender محصور فى زواحف السوشيال. جوجل بيحتاج ينفّذ JS + Supabase fetch + Hydration عشان يشوف عنوان المقالة ومحتواها → تأخير الفهرسة + خطر عدم ظهور المقالة أصلاً.

2. **جسم `/api/prerender` بيحتوى بس على عنوان + مقتطف** — لو وسّعناه لـ Googlebot، مفيش نص كافى للفهرسة. المفروض يحتوى المقال كامل داخل `<article>`.

3. **`<meta http-equiv="refresh" content="0">` داخل الـ prerender HTML** — لو قدّمناها لـ Googlebot، بتتعامل معاها كـ soft redirect وممكن تسبب مشاكل canonical. لازم نشيلها لما نقدّمها للزواحف الفهرسية ونخليها فقط لسوشيال.

4. **صفحة المقالة ثنائية اللغة على URL واحد (`?lang=`)**  
   - `hreflang` يشير لـ `?lang=en` و `?lang=ar` بينما `canonical` نفس المسار بدون query → جوجل ممكن يعتبر النسختين نسخة واحدة ويتجاهل المحتوى العربى
   - المحتوى العربى مش موجود فى الـ HTML الأولى (بيتبدل client-side)
   - الحل الأنظف: مسارات منفصلة `/en/blog/slug` و `/ar/blog/slug` (تغيير كبير) — أو على الأقل تقديم prerender منفصل لكل لغة بمحتواها الحقيقى

**عيوب متوسطة:**

5. **تعارض `Article.author` بين المصادر**  
   - `BlogPost.tsx` يستخدم `Organization` كمؤلف  
   - `api/prerender.ts` يستخدم `Person` (`post.author`)  
   - Google Search Console بيحذّر من عدم التطابق

6. **`modifiedTime` فى `SEOHead` بيستخدم `postDate` (تاريخ النشر) بدل `post.updated_at`** → جوجل مش هيلاحظ تحديث المقالة

7. **صورة المقالة (`featured_image`) بدون `width`/`height`** → CLS

8. **RSS مش معلن فى robots.txt** — السطر `# Feed:` كومنت. مش directive رسمى لكن الأفضل نضيف `<link rel="alternate" type="application/rss+xml">` فى `index.html`

9. **`og:image:width` و `og:image:height` مفقودين** فى الـ prerender → LinkedIn/Slack بيعرضوا صورة مصغرة

10. **`sitemap.xml` index بيستخدم `<lastmod>` مطبوعة وقت البناء** فقط — لو مقالة اتضافت بعد آخر build، الـ index مش هيتحدّث. الحل: إعادة كتابة `/sitemap.xml` نفسها من Edge Function عشان تعكس آخر مقالة.

11. **مافيش IndexNow ping تلقائى** عند نشر مقالة جديدة — عندك `indexnow-ping` function موجودة لكن مش مربوطة بترجر إنشاء/تحديث `blog_posts`.

**تحسينات إضافية:**

12. `robots.txt` يمنع `?s=` لكن مش محدد أى معاملات أخرى (مثل `utm_*`) — canonical كافى بيحلها لكن ممكن نوضّح
13. مافيش `<meta name="author">` فى الـ head
14. `og:locale` فى prerender ثابت `en_US` — المفروض يتحدد حسب لغة المقالة الأصلية

## 3) الخطة المقترحة

### الأولوية القصوى (تأثير مباشر على الفهرسة)

**أ) توسيع الـ prerender ليشمل Googlebot + محتوى كامل**
- تعديل `vercel.json`: إضافة `Googlebot|bingbot|DuckDuckBot|YandexBot|Baiduspider|Applebot|GPTBot|PerplexityBot|ClaudeBot|Google-Extended|ChatGPT-User` لنفس الـ regex
- تعديل `api/prerender.ts`:
  - جلب `content_en`, `content_ar`, `title_ar`, `excerpt_ar` بجانب الحقول الحالية
  - إضافة كشف زاحف بحث (searchBot) مقابل زاحف سوشيال (socialBot) عبر UA
  - **لو زاحف بحث**: إرجاع HTML كامل يحتوى `<article>` بالمحتوى المُنظّف (نص + عناوين h2/h3)، وحذف `<meta refresh>` و`window.location.replace`، وإضافة `noscript` مع رابط للـ SPA
  - **لو زاحف سوشيال**: نفس الشكل الحالى (خفيف + refresh)
  - إضافة `og:image:width=1200`, `og:image:height=630`
  - إضافة نسختين HTML للمحتوى (en + ar) داخل نفس الصفحة تحت `<div lang="en">` و `<div lang="ar">` عشان جوجل يفهرس اللغتين

**ب) توحيد `Article` schema**
- `BlogPost.tsx`: تغيير `author` لـ `Person` باستخدام `post.author` مع `Organization` كـ publisher (تُطابق الـ prerender)
- تصحيح `modifiedTime`: استخدام `post.updated_at` بدل `postDate`

**ج) sitemap.xml index ديناميكى**
- تحويل `public/sitemap.xml` (السطح) إلى rewrite على Edge Function جديدة `generate-sitemap-index` ترجع lastmod الحقيقى لكل sub‑sitemap (تسحب MAX(updated_at) من `blog_posts` للـ blog sitemap)
- أو أبسط: يبقى ملف ثابت لكن `stamp-sitemap-lastmod.mjs` يستدعى Supabase لجلب MAX(updated_at) للمقالات

### الأولوية الثانية

**د) hreflang صحيح**
- اختيار: هل نبقى على `?lang=` أم ننقل لمسارات `/ar/…` و `/en/…`؟ (سؤال للمستخدم)
- الحل الأسرع بدون كسر: `SEOHead` يجعل الـ canonical يعتمد على اللغة الحالية (`?lang=ar` canonical لـ ar، وبدون query لـ en) — كل نسخة تشير لنفسها + للأخرى

**هـ) CLS**
- إضافة `width={1200} height={630}` على `<img>` الـ featured_image فى `BlogPost.tsx`

**و) IndexNow تلقائى**
- إضافة Database Trigger على `blog_posts` (بعد INSERT/UPDATE مع `status='published'`) يستدعى Edge Function `indexnow-ping` بالـ URL الجديد → Bing/Yandex/Seznam يفهرسوا فورًا

**ز) RSS + head hints**
- إضافة `<link rel="alternate" type="application/rss+xml" title="Alhamd Academy Blog" href="/rss.xml" />` فى `index.html`
- إضافة `<meta name="author" content="Alhamd Academy" />` فى `index.html`

### الأولوية الثالثة (اختياريّة)

**ح) OG per‑language**  
`api/prerender.ts` يقرأ `?hl=` أو `Accept-Language` ويقلب OG title/description للعربى عند اللزوم.

**ط) صفحة `/blog` (Listing)**  
تخضع لنفس مشكلة SPA — لو تريد جوجل يفهرس عناوين المقالات من صفحة القوائم، نضيفها للـ prerender كمان.

## 4) تفاصيل فنية (اختيارية للمراجعة)

**ملفات ستُعدَّل:**
- `vercel.json` — توسيع regex الـ prerender + قواعد headers للـ RSS
- `api/prerender.ts` — تفريع socialBot/searchBot، جلب `content_*`، بناء `<article>` كامل، حذف refresh لزواحف البحث، إضافة og:image:width/height
- `src/pages/BlogPost.tsx` — تصحيح author schema + modifiedTime + width/height للصورة
- `src/components/SEOHead.tsx` — canonical يعتمد على اللغة
- `scripts/stamp-sitemap-lastmod.mjs` — قراءة MAX(updated_at) من Supabase (أو تحويل sitemap.xml لـ Edge Function)
- `index.html` — RSS link + author meta

**ملفات جديدة:**
- `supabase/migrations/…_indexnow_trigger.sql` — trigger على `blog_posts` يستدعى edge function
- (اختياريًا) `supabase/functions/generate-sitemap-index/index.ts`

**بدون تغيير:**
- `generate-blog-sitemap` — يعمل تمام
- `generate-blog-rss` — يعمل تمام
- `robots.txt` — يعمل تمام

## 5) نقاط تحتاج قرارك قبل التنفيذ

1. **مسارات ثنائية اللغة**: نبقى على `?lang=` (بسيط، بدون كسر) ولا ننتقل لـ `/en/blog/slug` و `/ar/blog/slug` (أنظف SEO، لكن تغيير كبير فى الراوتينج)؟
2. **IndexNow trigger**: تريد trigger DB تلقائى ولا زر يدوى فى الأدمن؟
3. **sitemap.xml index**: نحوّله لـ Edge Function ديناميكى ولا نكتفى بتحديث `<lastmod>` وقت البناء؟
