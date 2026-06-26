# Design Tokens — Color System

> هذا الملف هو المرجع الرسمي لألوان المشروع. أي لون جديد يُضاف للواجهة يجب أن يُعرّف هنا أولاً، ثم يُستخدم عبر CSS Variables / Tailwind tokens — ممنوع استخدام Hex Codes مباشرة داخل Components.

---

## 1. فلسفة الاختيار

المنصة هي AI SaaS لخدمة الشركات (Support / Knowledge Base / Assistant)، لذلك تم اختيار:

- **Primary — Indigo (نيلي):** لون هادئ، يوحي بالذكاء والثقة، مستخدم بكثرة في منتجات AI/SaaS الحديثة، ومريح للعين عند الاستخدام الطويل (لوحات تحكم).
- **Accent — Teal (تركواز):** للعناصر المرتبطة بالمساعد الذكي (AI) تحديداً (شارات AI، فقاعات الدردشة) لتمييزها بصرياً عن باقي الواجهة دون كسر الهوية.
- **Neutral — Slate (رمادي بارد):** للخلفيات والنصوص والحدود، يعطي مظهر نظيف وهادئ بدلاً من الرمادي الكلاسيكي الأصفر الميل (Gray).
- **Semantic — Success/Warning/Danger/Info:** ألوان وظيفية واضحة لا تتعارض مع Primary/Accent.

جميع الألوان تدعم **Light Mode** و **Dark Mode**، وتم اختبار تباينها (Contrast) لتكون مقروءة وفق معايير WCAG AA.

---

## 2. Primary — Indigo

| Token         | Light     | Dark      | الاستخدام                                         |
| ------------- | --------- | --------- | ------------------------------------------------- |
| `primary-50`  | `#EEF2FF` | `#1E1B4B` | خلفيات خفيفة (Hover/Selected)                     |
| `primary-100` | `#E0E7FF` | `#272356` | خلفيات Badges                                     |
| `primary-300` | `#A5B4FC` | `#4F46E5` | Borders / Disabled                                |
| `primary-500` | `#6366F1` | `#818CF8` | عناصر ثانوية تفاعلية                              |
| `primary-600` | `#4F46E5` | `#6366F1` | **اللون الأساسي** — Buttons, Links, Active States |
| `primary-700` | `#4338CA` | `#818CF8` | Hover على Primary                                 |
| `primary-900` | `#312E81` | `#C7D2FE` | نصوص على خلفية فاتحة جداً                         |

---

## 3. Accent — Teal (AI Elements)

| Token        | Light     | Dark      | الاستخدام                                                 |
| ------------ | --------- | --------- | --------------------------------------------------------- |
| `accent-100` | `#CCFBF1` | `#134E4A` | خلفية فقاعة AI                                            |
| `accent-500` | `#14B8A6` | `#2DD4BF` | **اللون المميز لعناصر AI** — شارة "مساعد ذكي"، أيقونات AI |
| `accent-600` | `#0D9488` | `#5EEAD4` | Hover / Active على عناصر AI                               |

---

## 4. Neutral — Slate

| Token        | Light     | Dark      | الاستخدام                    |
| ------------ | --------- | --------- | ---------------------------- |
| `background` | `#FFFFFF` | `#0B0F19` | خلفية الصفحة                 |
| `surface`    | `#F8FAFC` | `#111827` | خلفية البطاقات / الـ Sidebar |
| `border`     | `#E2E8F0` | `#1F2937` | الحدود والفواصل              |
| `muted`      | `#64748B` | `#94A3B8` | نصوص ثانوية / placeholders   |
| `foreground` | `#0F172A` | `#F1F5F9` | النص الأساسي                 |

---

## 5. Semantic Colors

| Token     | Light     | Dark      | الاستخدام     |
| --------- | --------- | --------- | ------------- |
| `success` | `#16A34A` | `#4ADE80` | نجاح العمليات |
| `warning` | `#D97706` | `#FBBF24` | تحذيرات       |
| `danger`  | `#DC2626` | `#F87171` | أخطاء / حذف   |
| `info`    | `#0284C7` | `#38BDF8` | معلومات عامة  |

---

## 6. قواعد الاستخدام

- ممنوع كتابة Hex Code داخل أي Component مباشرة (`#4F46E5` ❌).
- يجب استخدام CSS Variables المعرفة في `src/app/globals.css` (مثل `bg-primary`, `text-foreground`, `border-border`).
- أي تعديل على الألوان يتم في هذا الملف وفي `globals.css` فقط، ثم ينعكس تلقائياً على كل المشروع (shadcn/ui tokens).
- لون `accent` (Teal) محصور بعناصر AI فقط، لا يُستخدم كلون أساسي للأزرار العادية.
- عند إضافة Dark Mode لأي Component جديد: يجب التأكد من أن القيم تُقرأ من الـ Variables لا Hardcoded.

---

## 7. الربط مع shadcn/ui

الألوان أعلاه معرّفة كـ CSS Variables (Hex) داخل `src/app/globals.css` وتُربط مع shadcn/ui tokens القياسية:

```text
--background          → background
--foreground           → foreground
--primary              → primary-600
--primary-foreground   → white
--secondary / --accent → Neutral hover/selected (شفاف، ليس Teal) — حالة UI عامة فقط
--muted                → neutral muted
--destructive          → danger
--border / --input      → border
--ring                  → primary-500
```

> ملاحظة مهمة: توكن `--accent` في shadcn/ui يُستخدم بشكل عام لحالات Hover/Selected في كل المكونات (Dropdown, Menu...)، لذلك يبقى **رمادي محايد** ولا يُستخدم لتلوينه بالـ Teal — وإلا أصبحت كل عناصر الواجهة تركوازية بدون داعٍ.

اللون **Teal (AI Accent)** مُعرّف بتوكن مخصص إضافي **منفصل** عن نظام shadcn القياسي:

```text
--color-ai            → accent-500 (Teal)
--color-ai-foreground → white
```

يُستخدم فقط داخل `modules/ai` و `modules/conversations` (شارات AI، فقاعات الدردشة، أيقونات المساعد) — عبر كلاس Tailwind: `bg-ai`, `text-ai`, `border-ai`.

الألوان الوظيفية الإضافية (`success`, `warning`, `info`) مُعرّفة أيضاً كتوكنات مخصصة بنفس الطريقة: `bg-success`, `bg-warning`, `bg-info`.

هذا يضمن أن كل مكونات shadcn/ui (Button, Card, Dialog...) تستخدم نفس نظام الألوان تلقائياً بدون أي تخصيص إضافي، مع إبقاء هوية AI مميزة بصرياً أينما احتجناها فعلاً.
