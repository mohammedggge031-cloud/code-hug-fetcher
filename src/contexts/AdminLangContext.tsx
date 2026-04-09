import { createContext, useContext, useState, ReactNode } from "react";

type AdminLang = "ar" | "en";

interface AdminLangContextType {
  lang: AdminLang;
  toggleLang: () => void;
  t: (key: string) => string;
  dir: "rtl" | "ltr";
}

const translations: Record<string, Record<AdminLang, string>> = {
  // Layout
  "nav.dashboard": { ar: "لوحة التحكم", en: "Dashboard" },
  "nav.posts": { ar: "المقالات", en: "Blog Posts" },
  "nav.categories": { ar: "التصنيفات", en: "Categories" },
  "nav.media": { ar: "الوسائط", en: "Media Library" },
  "nav.seo": { ar: "إدارة السيو", en: "SEO Management" },
  "nav.scripts": { ar: "السكربتات", en: "Custom Scripts" },
  "nav.team": { ar: "الفريق", en: "Team" },
  "nav.signout": { ar: "تسجيل الخروج", en: "Sign Out" },
  "nav.welcome": { ar: "مرحباً بك 👋", en: "Welcome back 👋" },
  "nav.role.admin": { ar: "مدير", en: "Admin" },
  "nav.role.editor": { ar: "محرر", en: "Editor" },

  // Dashboard
  "dash.title": { ar: "لوحة التحكم", en: "Dashboard" },
  "dash.subtitle": { ar: "نظرة عامة على إدارة الموقع", en: "Overview of your website management" },
  "dash.posts": { ar: "المقالات", en: "Posts" },
  "dash.posts.desc": { ar: "مقالات المدونة", en: "Blog articles" },
  "dash.seo": { ar: "صفحات السيو", en: "SEO Pages" },
  "dash.seo.desc": { ar: "صفحات بإعدادات SEO", en: "Pages with SEO metadata" },
  "dash.media": { ar: "الوسائط", en: "Media" },
  "dash.media.desc": { ar: "ملفات مرفوعة", en: "Uploaded files" },
  "dash.categories": { ar: "التصنيفات", en: "Categories" },
  "dash.categories.desc": { ar: "تصنيفات المقالات", en: "Article categories" },
  "dash.scripts": { ar: "السكربتات", en: "Scripts" },
  "dash.scripts.desc": { ar: "أكواد تسويقية", en: "Marketing scripts" },
  "dash.team": { ar: "الفريق", en: "Team" },
  "dash.team.desc": { ar: "أعضاء بصلاحيات", en: "Users with roles" },
  "dash.guide": { ar: "دليل سريع", en: "Quick Guide" },
  "dash.guide.posts": { ar: "أنشئ وحرر مقالات المدونة بالعربية والإنجليزية", en: "Create and edit blog posts in Arabic and English" },
  "dash.guide.seo": { ar: "عدل العناوين والأوصاف والبيانات المنظمة لكل صفحة", en: "Edit titles, descriptions, and structured data for each page" },
  "dash.guide.media": { ar: "ارفع الصور والملفات واحصل على روابط مباشرة", en: "Upload images and files and get direct URLs" },
  "dash.guide.scripts": { ar: "أضف أكواد التتبع والبيكسل بدون تعديل الكود", en: "Add tracking codes and pixels without code changes" },
  "dash.guide.team": { ar: "أدر صلاحيات الوصول لأعضاء فريقك", en: "Manage access permissions for your team members" },

  // User Roles
  "team.title": { ar: "إدارة الفريق", en: "Team Management" },
  "team.subtitle": { ar: "إدارة صلاحيات ووصول أعضاء الفريق", en: "Manage team access and permissions" },
  "team.add": { ar: "إضافة عضو", en: "Add Member" },
  "team.member": { ar: "العضو", en: "Member" },
  "team.role": { ar: "الصلاحية", en: "Role" },
  "team.date": { ar: "تاريخ الإضافة", en: "Date Added" },
  "team.loading": { ar: "جاري التحميل...", en: "Loading..." },
  "team.unknown": { ar: "غير معروف", en: "Unknown" },
  "team.empty": { ar: "لا يوجد أعضاء فريق. أضف أول عضو!", en: "No team members yet. Add your first member!" },
  "team.admin_only": { ar: "صلاحيات المدير فقط", en: "Admin Only" },
  "team.admin_only_desc": { ar: "فقط المديرون يمكنهم إدارة صلاحيات المستخدمين", en: "Only administrators can manage user roles" },
  "team.dialog.title": { ar: "إضافة عضو جديد", en: "Add New Member" },
  "team.dialog.desc": { ar: "أدخل بريد المستخدم لإضافته للفريق، أو أنشئ حساباً جديداً", en: "Enter the user's email to add them to the team, or create a new account" },
  "team.email": { ar: "البريد الإلكتروني", en: "Email Address" },
  "team.create_new": { ar: "إنشاء حساب جديد إذا لم يكن المستخدم موجوداً", en: "Create a new account if user doesn't exist" },
  "team.password": { ar: "كلمة المرور", en: "Password" },
  "team.password_hint": { ar: "6 أحرف على الأقل", en: "At least 6 characters" },
  "team.role_label": { ar: "الصلاحية", en: "Role" },
  "team.role.admin": { ar: "مدير (صلاحيات كاملة)", en: "Admin (Full Access)" },
  "team.role.editor": { ar: "محرر (المحتوى والسيو)", en: "Editor (Content & SEO)" },
  "team.submit": { ar: "إضافة العضو", en: "Add Member" },
  "team.submitting": { ar: "جاري المعالجة...", en: "Processing..." },
  "team.badge.super": { ar: "المدير الرئيسي", en: "Super Admin" },
  "team.badge.admin": { ar: "مدير", en: "Admin" },
  "team.badge.editor": { ar: "محرر", en: "Editor" },

  // Errors
  "err.email_required": { ar: "البريد الإلكتروني مطلوب", en: "Email is required" },
  "err.password_required": { ar: "كلمة المرور مطلوبة عند إنشاء مستخدم جديد", en: "Password is required when creating a new user" },
  "err.password_short": { ar: "كلمة المرور يجب أن تكون 6 أحرف على الأقل", en: "Password must be at least 6 characters" },
  "err.not_allowed": { ar: "غير مسموح", en: "Not Allowed" },
  "err.only_super_add": { ar: "فقط المدير الرئيسي يمكنه إضافة مسؤولين", en: "Only the Super Admin can add administrators" },
  "err.only_super_del": { ar: "فقط المدير الرئيسي يمكنه حذف الصلاحيات", en: "Only the Super Admin can delete roles" },
  "err.cant_del_super": { ar: "لا يمكن حذف المدير الرئيسي", en: "Cannot delete the Super Admin" },
  "err.user_not_found": { ar: "المستخدم غير موجود", en: "User not found" },
  "err.error": { ar: "خطأ", en: "Error" },
  "err.role_exists": { ar: "هذا المستخدم لديه صلاحية بالفعل", en: "This user already has a role" },
  "err.enable_create_new": { ar: "يرجى تفعيل خيار إنشاء حساب جديد", en: "Please enable the create new account option" },

  // Success
  "ok.account_created": { ar: "تم إنشاء الحساب", en: "Account Created" },
  "ok.account_created_for": { ar: "تم إنشاء حساب جديد لـ", en: "New account created for" },
  "ok.role_assigned": { ar: "تم تعيين الصلاحية بنجاح", en: "Role assigned successfully" },
  "ok.done": { ar: "تم", en: "Done" },
  "ok.deleted": { ar: "تم الحذف", en: "Deleted" },

  // Delete confirm
  "team.confirm_delete_title": { ar: "هل أنت متأكد؟", en: "Are you sure?" },
  "team.confirm_delete_desc": { ar: "سيتم حذف صلاحية هذا العضو نهائياً. لا يمكن التراجع عن هذا الإجراء.", en: "This member's role will be permanently removed. This action cannot be undone." },

  // Forgot Password
  "login.forgot": { ar: "نسيت كلمة المرور؟", en: "Forgot password?" },
  "login.reset_sent": { ar: "تم إرسال رابط الاستعادة", en: "Reset link sent" },
  "login.reset_sent_desc": { ar: "تحقق من بريدك الإلكتروني لإعادة تعيين كلمة المرور", en: "Check your email to reset your password" },
  "login.reset_error": { ar: "خطأ في الإرسال", en: "Error sending reset" },

  // Login
  "login.title": { ar: "تسجيل الدخول", en: "Sign In" },
  "login.subtitle": { ar: "أدخل بياناتك للوصول للوحة التحكم", en: "Enter your credentials to access the dashboard" },
  "login.email": { ar: "البريد الإلكتروني", en: "Email" },
  "login.password": { ar: "كلمة المرور", en: "Password" },
  "login.submit": { ar: "تسجيل الدخول", en: "Sign In" },
  "login.loading": { ar: "جاري الدخول...", en: "Signing in..." },
  "login.failed": { ar: "فشل تسجيل الدخول", en: "Login Failed" },
  "login.failed_desc": { ar: "تأكد من البريد الإلكتروني وكلمة المرور", en: "Check your email and password" },
  "login.panel": { ar: "لوحة التحكم", en: "Control Panel" },

  // Blog
  "blog.title": { ar: "المقالات", en: "Blog Posts" },
  "blog.total": { ar: "مقال", en: "articles total" },
  "blog.new": { ar: "مقال جديد", en: "New Post" },
  "blog.search": { ar: "بحث في المقالات...", en: "Search posts..." },
  "blog.col.title": { ar: "العنوان", en: "Title" },
  "blog.col.category": { ar: "التصنيف", en: "Category" },
  "blog.col.status": { ar: "الحالة", en: "Status" },
  "blog.col.date": { ar: "التاريخ", en: "Date" },
  "blog.col.actions": { ar: "إجراءات", en: "Actions" },
  "blog.empty": { ar: "لا توجد مقالات. أنشئ أول مقال!", en: "No posts found. Create your first article!" },
  "blog.edit": { ar: "تعديل المقال", en: "Edit Post" },
  "blog.create": { ar: "مقال جديد", en: "New Post" },
  "blog.title_en": { ar: "العنوان (إنجليزي)", en: "Title (English)" },
  "blog.title_ar": { ar: "العنوان (عربي)", en: "Title (Arabic)" },
  "blog.slug": { ar: "الرابط", en: "Slug" },
  "blog.category": { ar: "التصنيف", en: "Category" },
  "blog.status": { ar: "الحالة", en: "Status" },
  "blog.draft": { ar: "مسودة", en: "Draft" },
  "blog.published": { ar: "منشور", en: "Published" },
  "blog.excerpt_en": { ar: "المقتطف (إنجليزي)", en: "Excerpt (English)" },
  "blog.excerpt_ar": { ar: "المقتطف (عربي)", en: "Excerpt (Arabic)" },
  "blog.image": { ar: "رابط الصورة", en: "Featured Image URL" },
  "blog.read_en": { ar: "وقت القراءة (EN)", en: "Read Time (EN)" },
  "blog.read_ar": { ar: "وقت القراءة (AR)", en: "Read Time (AR)" },
  "blog.tags": { ar: "الوسوم (فاصلة بينها)", en: "Tags (comma-separated)" },
  "blog.content_en": { ar: "المحتوى الإنجليزي", en: "English Content" },
  "blog.content_ar": { ar: "المحتوى العربي", en: "Arabic Content" },
  "blog.cancel": { ar: "إلغاء", en: "Cancel" },
  "blog.update": { ar: "تحديث", en: "Update Post" },
  "blog.save": { ar: "إنشاء", en: "Create Post" },
  "blog.select_cat": { ar: "اختر تصنيف", en: "Select category" },
  "blog.confirm_delete": { ar: "هل تريد حذف هذا المقال؟", en: "Are you sure you want to delete this post?" },
  "blog.err_title": { ar: "العنوان مطلوب بالعربي والإنجليزي", en: "Title is required in both languages" },
  "blog.saved": { ar: "تم الحفظ!", en: "Saved!" },

  // Categories
  "cat.title": { ar: "تصنيفات المدونة", en: "Blog Categories" },
  "cat.subtitle": { ar: "إدارة تصنيفات المقالات", en: "Manage article categories" },
  "cat.add": { ar: "إضافة تصنيف", en: "Add Category" },
  "cat.name_en": { ar: "الاسم (إنجليزي)", en: "Name (English)" },
  "cat.name_ar": { ar: "الاسم (عربي)", en: "Name (Arabic)" },
  "cat.slug": { ar: "الرابط", en: "Slug" },
  "cat.actions": { ar: "إجراءات", en: "Actions" },
  "cat.edit": { ar: "تعديل التصنيف", en: "Edit Category" },
  "cat.new": { ar: "تصنيف جديد", en: "New Category" },
  "cat.update": { ar: "تحديث", en: "Update" },
  "cat.create": { ar: "إنشاء", en: "Create" },
  "cat.confirm_delete": { ar: "هل تريد حذف هذا التصنيف؟", en: "Delete this category?" },
  "cat.err_names": { ar: "الاسمان مطلوبان", en: "Both names required" },

  // Media
  "media.title": { ar: "مكتبة الوسائط", en: "Media Library" },
  "media.files": { ar: "ملف", en: "files" },
  "media.upload": { ar: "رفع ملفات", en: "Upload Files" },
  "media.uploading": { ar: "جاري الرفع...", en: "Uploading..." },
  "media.search": { ar: "بحث في الملفات...", en: "Search files..." },
  "media.empty": { ar: "لا توجد ملفات. ارفع أول صورة!", en: "No media files yet. Upload your first image!" },
  "media.confirm_delete": { ar: "حذف هذا الملف؟", en: "Delete this file?" },
  "media.copied": { ar: "تم النسخ!", en: "Copied!" },
  "media.copied_desc": { ar: "تم نسخ الرابط", en: "URL copied to clipboard" },

  // SEO
  "seo.title": { ar: "إدارة السيو", en: "SEO Management" },
  "seo.subtitle": { ar: "إدارة العناوين والأوصاف والبيانات المنظمة", en: "Manage meta tags and structured data for all pages" },
  "seo.init": { ar: "تهيئة كل الصفحات", en: "Initialize All Pages" },
  "seo.add": { ar: "إضافة صفحة", en: "Add Page" },
  "seo.search": { ar: "بحث في الصفحات...", en: "Search pages..." },
  "seo.col.page": { ar: "الصفحة", en: "Page" },
  "seo.col.path": { ar: "المسار", en: "Path" },
  "seo.col.title": { ar: "العنوان", en: "Title" },
  "seo.col.actions": { ar: "إجراءات", en: "Actions" },
  "seo.empty": { ar: "لا توجد إعدادات سيو. اضغط \"تهيئة كل الصفحات\" للبدء.", en: "No SEO entries found. Click \"Initialize All Pages\" to get started." },
  "seo.save": { ar: "حفظ", en: "Save" },
  "seo.cancel": { ar: "إلغاء", en: "Cancel" },

  // Scripts
  "scripts.title": { ar: "السكربتات المخصصة", en: "Custom Scripts" },
  "scripts.subtitle": { ar: "إدارة أكواد التتبع والبيكسل", en: "Manage marketing pixels and tracking scripts" },
  "scripts.add": { ar: "إضافة سكربت", en: "Add Script" },
  "scripts.empty": { ar: "لا توجد سكربتات. أضف فيسبوك بيكسل، تتبع التحويلات...", en: "No custom scripts yet. Add Facebook Pixel, conversion tracking, etc." },
  "scripts.name": { ar: "اسم السكربت", en: "Script Name" },
  "scripts.placement": { ar: "الموضع", en: "Placement" },
  "scripts.content": { ar: "محتوى السكربت", en: "Script Content" },
  "scripts.active": { ar: "مفعل", en: "Active" },
  "scripts.inactive": { ar: "معطل", en: "Inactive" },
  "scripts.save": { ar: "حفظ", en: "Save" },
  "scripts.cancel": { ar: "إلغاء", en: "Cancel" },
  "scripts.admin_only": { ar: "صلاحيات المدير فقط", en: "Admin Only" },
  "scripts.admin_only_desc": { ar: "فقط المديرون يمكنهم إدارة السكربتات", en: "Only administrators can manage custom scripts" },

  // Change Password
  "pwd.title": { ar: "تغيير كلمة المرور", en: "Change Password" },
  "pwd.new": { ar: "كلمة المرور الجديدة", en: "New Password" },
  "pwd.confirm": { ar: "تأكيد كلمة المرور", en: "Confirm Password" },
  "pwd.hint": { ar: "يجب أن تكون 6 أحرف على الأقل", en: "Must be at least 6 characters" },
  "pwd.save": { ar: "تغيير كلمة المرور", en: "Change Password" },
  "pwd.success": { ar: "تم تغيير كلمة المرور بنجاح", en: "Password changed successfully" },
  "pwd.mismatch": { ar: "كلمات المرور غير متطابقة", en: "Passwords do not match" },
  "pwd.min_length": { ar: "كلمة المرور يجب أن تكون 6 أحرف على الأقل", en: "Password must be at least 6 characters" },
  "pwd.change": { ar: "تغيير كلمة المرور", en: "Change Password" },
  "pwd.reset_btn": { ar: "إعادة تعيين كلمة المرور", en: "Reset Password" },
  "pwd.reset_title": { ar: "إعادة تعيين كلمة المرور", en: "Reset Password" },
  "pwd.reset_desc": { ar: "أدخل كلمة مرور جديدة للمستخدم:", en: "Enter a new password for:" },
  "pwd.reset_save": { ar: "إعادة تعيين", en: "Reset Password" },
  "pwd.reset_success": { ar: "تم إعادة تعيين كلمة المرور بنجاح", en: "Password reset successfully" },

  // Video Management
  "nav.videos": { ar: "الفيديوهات", en: "Videos" },
  "vid.title": { ar: "إدارة الفيديوهات", en: "Video Management" },
  "vid.subtitle": { ar: "إدارة مكتبة الفيديوهات الإسلامية", en: "Manage the Islamic video library" },
  "vid.count": { ar: "فيديو", en: "videos" },
  "vid.add": { ar: "إضافة فيديو", en: "Add Video" },
  "vid.all": { ar: "الكل", en: "All" },
  "vid.col_title": { ar: "العنوان", en: "Title" },
  "vid.col_category": { ar: "التصنيف", en: "Category" },
  "vid.col_lang": { ar: "اللغة", en: "Language" },
  "vid.empty": { ar: "لا توجد فيديوهات", en: "No videos found" },
  "vid.edit": { ar: "تعديل الفيديو", en: "Edit Video" },
  "vid.new": { ar: "فيديو جديد", en: "New Video" },
  "vid.title_en": { ar: "العنوان (إنجليزي)", en: "Title (English)" },
  "vid.title_ar": { ar: "العنوان (عربي)", en: "Title (Arabic)" },
  "vid.youtube_id": { ar: "معرف يوتيوب", en: "YouTube Video ID" },
  "vid.desc_en": { ar: "الوصف (إنجليزي)", en: "Description (EN)" },
  "vid.desc_ar": { ar: "الوصف (عربي)", en: "Description (AR)" },
  "vid.saved": { ar: "تم حفظ الفيديو", en: "Video saved" },
  "vid.err_required": { ar: "العنوان ومعرف يوتيوب مطلوبان", en: "Title and YouTube ID are required" },
  "vid.confirm_delete": { ar: "حذف هذا الفيديو؟", en: "Delete this video?" },
  "vid.confirm_delete_desc": { ar: "سيتم حذف الفيديو نهائياً", en: "This video will be permanently removed" },
  "vid.admin_only": { ar: "صلاحيات المدير فقط", en: "Admin Only" },
  "dash.videos": { ar: "الفيديوهات", en: "Videos" },
  "dash.videos.desc": { ar: "مكتبة الفيديوهات", en: "Video library" },
  "dash.guide.videos": { ar: "أضف وعدل فيديوهات المكتبة الإسلامية", en: "Add and manage Islamic video library content" },
};

const AdminLangContext = createContext<AdminLangContextType | undefined>(undefined);

export const AdminLangProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<AdminLang>(() => {
    return (localStorage.getItem("admin_lang") as AdminLang) || "en";
  });

  const toggleLang = () => {
    setLang(prev => {
      const next = prev === "ar" ? "en" : "ar";
      localStorage.setItem("admin_lang", next);
      return next;
    });
  };

  const t = (key: string): string => {
    return translations[key]?.[lang] || key;
  };

  return (
    <AdminLangContext.Provider value={{ lang, toggleLang, t, dir: lang === "ar" ? "rtl" : "ltr" }}>
      {children}
    </AdminLangContext.Provider>
  );
};

export const useAdminLang = () => {
  const context = useContext(AdminLangContext);
  if (!context) throw new Error("useAdminLang must be used within AdminLangProvider");
  return context;
};
