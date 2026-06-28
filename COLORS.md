# Design Tokens — Color System

> هذا الملف هو المرجع الرسمي لألوان المشروع. أي لون جديد يُضاف للواجهة يجب أن يُعرّف هنا أولاً، ثم يُستخدم عبر CSS Variables / Tailwind tokens — ممنوع استخدام Hex Codes مباشرة داخل Components.

---

## 1. فلسفة الاختيار

تم اعتماد **هوية ألوان واتساب (WhatsApp)** بالكامل لكل المنصة (Light + Dark)، بألوان **مسطّحة (Flat)** فقط — **ممنوع أي Gradient** وممنوع أي تداخل بصري بين الألوان (كل توكن له دور واحد واضح ولا يُستخدم لدورين مختلفين في نفس الوقت):

- **Primary — WhatsApp Teal Green (`#008069` / `#00A884` Dark):** نفس اللون الأساسي لواتساب (الأزرار، الروابط، Active States، الـ Header) — هادئ واحترافي ومألوف للمستخدم.
- **AI Accent — WhatsApp Bright Green (`#25D366`):** نفس لون أيقونة واتساب الشهيرة، **محصور حصراً** بعناصر الذكاء الاصطناعي (شارات AI، فقاعات الدردشة) — مختلف بصرياً بشكل واضح عن Primary (درجة أفتح وأكثر سطوعاً) لتجنّب أي تداخل أو التباس بين "إجراء عادي" و"عنصر AI".
- **Neutral — WhatsApp Grays:** نفس درجات الرمادي/الأخضر الباهت المستخدمة في واجهة واتساب (خلفيات، حدود، نصوص ثانوية).
- **Semantic — Success/Warning/Danger/Info:** ألوان وظيفية واضحة ومتمايزة عن Primary وعن AI Accent حتى لا تتشابه دلالتها (`info` يستخدم لون التحقق الأزرق المعروف في واتساب لشارات "تمت القراءة").

جميع الألوان تدعم **Light Mode** و **Dark Mode** (مطابقة لنمط WhatsApp Web/Desktop الفاتح والداكن)، وتم اختبار تباينها (Contrast) لتكون مقروءة وفق معايير WCAG AA. لاحظ أن `--ai-foreground` غامق دوماً (لا أبيض) لأن الأخضر الفاتح `#25D366` لا يحقق تباين AA كافياً مع نص أبيض.

---

## 2. Primary — WhatsApp Teal Green

| Token               | Light     | Dark      | الاستخدام                                         |
| ------------------- | --------- | --------- | -------------------------------------------------- |
| `primary`           | `#008069` | `#00A884` | **اللون الأساسي** — Buttons, Links, Active States |
| `primary-foreground`| `#FFFFFF` | `#FFFFFF` | نص/أيقونات فوق Primary                            |
| `ring` (Focus)      | `#008069` | `#00A884` | حلقة التركيز (Focus Ring) لكل العناصر التفاعلية   |

> لا يوجد تدرّج Hover منفصل — التفاعل (Hover/Active) يُعبَّر عنه بشفافية (`opacity`/`hover:bg-primary/90`) لا بلون جديد، حفاظاً على مبدأ "بدون تدرّج ولا تداخل".

---

## 3. AI Accent — WhatsApp Bright Green (عناصر الذكاء الاصطناعي فقط)

| Token            | Light     | Dark      | الاستخدام                                                 |
| ---------------- | --------- | --------- | ----------------------------------------------------------- |
| `ai`             | `#25D366` | `#25D366` | **اللون المميز لعناصر AI** — شارة "مساعد ذكي"، فقاعات الرد |
| `ai-foreground`  | `#08201A` | `#0B141A` | نص غامق فوق `ai` (تباين AA — أبيض لا يصلح على أخضر فاتح)    |

---

## 4. Neutral — WhatsApp Grays

| Token        | Light     | Dark      | الاستخدام                                  |
| ------------ | --------- | --------- | -------------------------------------------- |
| `background` | `#F0F2F5` | `#111B21` | خلفية الصفحة (نفس خلفية واتساب الرئيسية)    |
| `card`       | `#FFFFFF` | `#202C33` | خلفية البطاقات / اللوحات (نفس لون Panel)    |
| `sidebar`    | `#FFFFFF` | `#202C33` | خلفية الـ Sidebar (نفس قائمة المحادثات)     |
| `border`     | `#E9EDEF` | `#2A3942` | الحدود والفواصل                              |
| `muted`      | `#E9EDEF` | `#202C33` | خلفيات ثانوية هادئة                          |
| `muted-foreground` | `#667781` | `#8696A0` | نصوص ثانوية / placeholders (رمادي واتساب) |
| `foreground` | `#111B21` | `#E9EDEF` | النص الأساسي                                 |

---

## 5. Semantic Colors

| Token     | Light     | Dark      | الاستخدام                                              |
| --------- | --------- | --------- | -------------------------------------------------------- |
| `success` | `#2BA84A` | `#3DD16F` | نجاح العمليات — أخضر متمايز عن `primary` و`ai`           |
| `warning` | `#D97706` | `#FBBF24` | تحذيرات                                                  |
| `danger`  | `#DC2626` | `#F87171` | أخطاء / حذف (`--destructive`)                            |
| `info`    | `#53BDEB` | `#53BDEB` | معلومات عامة — نفس أزرق "علامتي القراءة" في واتساب       |

---

## 6. قواعد الاستخدام

- ممنوع كتابة Hex Code داخل أي Component مباشرة (`#008069` ❌).
- ممنوع استخدام أي `bg-gradient-*` في أي مكان بالواجهة — كل الخلفيات والأزرار ألوان مسطّحة (Flat) فقط.
- يجب استخدام CSS Variables المعرفة في `src/app/globals.css` (مثل `bg-primary`, `text-foreground`, `border-border`).
- أي تعديل على الألوان يتم في هذا الملف وفي `globals.css` فقط، ثم ينعكس تلقائياً على كل المشروع (shadcn/ui tokens).
- لون `ai` (Bright Green) محصور بعناصر AI فقط، لا يُستخدم كلون أساسي للأزرار العادية (حتى لا يتداخل بصرياً مع `primary`).
- عند إضافة Dark Mode لأي Component جديد: يجب التأكد من أن القيم تُقرأ من الـ Variables لا Hardcoded.

---

## 7. الربط مع shadcn/ui

الألوان أعلاه معرّفة كـ CSS Variables (Hex) داخل `src/app/globals.css` وتُربط مع shadcn/ui tokens القياسية:

```text
--background          → خلفية واتساب الرئيسية
--foreground           → foreground
--primary              → WhatsApp Teal Green
--primary-foreground   → white
--secondary / --accent → Neutral hover/selected (رمادي محايد، ليس Bright Green) — حالة UI عامة فقط
--muted                → neutral muted
--destructive          → danger
--border / --input      → border
--ring                  → primary
```

> ملاحظة مهمة: توكن `--accent` في shadcn/ui يُستخدم بشكل عام لحالات Hover/Selected في كل المكونات (Dropdown, Menu...)، لذلك يبقى **رمادي محايد** ولا يُستخدم لتلوينه بالأخضر — وإلا أصبحت كل عناصر الواجهة "أخضر AI" بدون داعٍ ويحدث التداخل المرفوض.

اللون **AI Accent (Bright Green)** مُعرّف بتوكن مخصص إضافي **منفصل** عن نظام shadcn القياسي:

```text
--color-ai            → ai (#25D366)
--color-ai-foreground → ai-foreground (غامق دوماً)
```

يُستخدم فقط داخل Slices المرتبطة بالذكاء الاصطناعي والمحادثات (`entities/ai-model`, `entities/conversation`, `entities/message`, `features/send-message`, `widgets/conversation-panel`) — شارات AI، فقاعات الدردشة، أيقونات المساعد — عبر كلاس Tailwind: `bg-ai`, `text-ai`, `border-ai`.

الألوان الوظيفية الإضافية (`success`, `warning`, `info`) مُعرّفة أيضاً كتوكنات مخصصة بنفس الطريقة: `bg-success`, `bg-warning`, `bg-info`.

هذا يضمن أن كل مكونات shadcn/ui (Button, Card, Dialog...) تستخدم نفس نظام الألوان تلقائياً بدون أي تخصيص إضافي، مع إبقاء هوية AI مميزة بصرياً أينما احتجناها فعلاً، ودون أي Gradient في أي مكان.
