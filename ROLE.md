# Frontend (Company Portal) — Project Role & Architecture Rules

> هذا الملف هو المرجع الرسمي والثابت لفريق Frontend (واجهة الشركات/العملاء).
> أي كود أو تصميم يخالف هذه القواعد يجب رفضه أو تعديله قبل الدمج (Merge).
> هذا المشروع **مستقل تماماً** عن `admin-frontend` (لوحة صاحب المنصة)، ويتبع نفس فلسفة العمارة (FSD) لتسهيل التبديل بين الفريقين، لكنه يخدم جمهوراً مختلفاً بالكامل (الشركات/العملاء، لا صاحب المنصة).
> هذا الإصدار من الملف يعتمد **Feature-Sliced Design (FSD)** بدلاً من Feature-Based Architecture القديمة. أي كود مبني مسبقاً بنمط Feature-Based يُعاد تنظيمه تدريجياً ليطابق هذا الملف (انظر §28 Folder & Slice Rules لكيفية الانتقال).

---

# 1. Project Overview

واجهة منصة AI SaaS Multi-Tenant — تُستخدم من قبل **الشركات/العملاء فقط** (لا صاحب المنصة، الذي له واجهة مستقلة `admin-frontend`).

المنصة تسمح للشركات بـ:

- إنشاء حساب الشركة.
- تسجيل الدخول.
- رفع ملفات PDF / CSV / Excel.
- إدارة قاعدة المعرفة.
- تجربة المساعد الذكي.
- عرض المحادثات.
- إدارة الاشتراك.
- إدارة إعدادات الشركة.

---

# 2. Technology Stack

| Component       | Value                       |
| --------------- | --------------------------- |
| Language        | TypeScript (Strict Mode)    |
| Framework       | Next.js 15+ (App Router)    |
| Architecture    | Feature-Sliced Design (FSD) |
| Styling         | Tailwind CSS                |
| UI Components   | shadcn/ui                   |
| Forms           | React Hook Form             |
| Validation      | Zod                         |
| Client State    | Zustand                     |
| Server State    | TanStack Query              |
| Icons           | lucide-react                |
| Error Tracking  | Sentry (أو ما يعادلها)      |
| Package Manager | pnpm                        |

> نفس Stack المستخدم في `admin-frontend` تماماً — الهدف تسهيل تنقّل المطورين بين المشروعين دون تعلّم أدوات جديدة. أي إضافة مكتبة جديدة تحتاج تحديث هذا الجدول وموافقة Architect المشروع.

---

# 3. Architecture Style — Feature-Sliced Design (FSD)

ننتقل من "Feature-Based" إلى **Feature-Sliced Design** لأنه يوفر:

- حدود استيراد صارمة وواضحة (Layers) أقوى من Feature-Based العادي.
- فصل حقيقي بين "الكيان التجاري" (Entity) و"الفعل/التفاعل" (Feature) و"التجميع المرئي" (Widget) و"الصفحة" (View).
- قابلية تنبؤ عالية: أي مطور جديد يعرف فوراً أين يضع كود جديد بالنظر إلى نوعه.
- توافق ممتاز مع Next.js App Router (الـ App layer يبقى رفيعاً جداً، كل المنطق في الطبقات الأدنى).

## 3.1 الطبقات (Layers) — من الأعلى إلى الأدنى

```text
app          → Next.js routing only (routes, layouts, metadata)
views        → تجميع صفحة كاملة (يقابل "pages" في FSD الرسمي — أُعيد تسميته لتجنب تعارض مع مجلد Next.js pages)
widgets      → تجميعات مرئية مركّبة وقابلة لإعادة الاستخدام بين أكثر من view
features     → أفعال/تفاعلات المستخدم (login, upload-document, send-message, change-plan...)
entities     → الكيانات التجارية (user, document, conversation, message, subscription-plan...)
shared       → Kit عام لا يعرف أي شيء عن business logic (ui, lib, api client, config, types)
```

## 3.2 قاعدة الطبقات الذهبية (Layer Rule)

كل طبقة يمكنها الاستيراد فقط من الطبقات **الأدنى منها**:

```text
shared   ←  entities  ←  features  ←  widgets  ←  views  ←  app
```

ممنوع تماماً:

- استيراد من طبقة أعلى (مثلاً: `entities` يستورد من `features`).
- استيراد بين Slices في نفس الطبقة (مثلاً: `entities/document` يستورد من `entities/conversation` مباشرة) — إذا احتجت بيانات من كيانين، التجميع يتم في طبقة أعلى (`features` أو `widgets`).

## 3.3 الـ Public API (قاعدة `index.ts`)

كل Slice (مثل `entities/document`, `features/upload-document`) **يجب** أن يملك `index.ts` يُصدّر فقط ما يُسمح للخارج باستخدامه.

```ts
// entities/document/index.ts
export { DocumentCard } from "./ui/document-card";
export { useDocuments } from "./model/use-documents";
export type { Document } from "./model/types";
```

ممنوع الاستيراد من ملف داخلي مباشرة من خارج الـ Slice:

```ts
// ممنوع
import { DocumentCard } from "@/entities/document/ui/document-card";

// صحيح
import { DocumentCard } from "@/entities/document";
```

## 3.4 الشرائح (Segments) داخل كل Slice

```text
slice/
├── ui/        # مكونات React الخاصة بالـ Slice
├── model/     # State, hooks, types, business logic
├── api/       # Axios calls الخاصة بالـ Slice
├── lib/       # Helpers محلية للـ Slice فقط
├── config/    # ثوابت/تهيئة محلية (نادر)
└── index.ts   # Public API
```

لا يلزم وجود كل Segment — فقط ما يحتاجه الـ Slice فعلياً.

---

# 4. Project Structure

```text
src
├── app
├── views
├── widgets
├── features
├── entities
└── shared
```

---

## 4.1 App Layer

```text
app
├── providers/          # تركيب Providers العامة (انظر الملاحظة أدناه)
│   ├── providers.tsx
│   ├── auth-provider/
│   ├── query-provider/
│   ├── theme-provider/
│   └── i18n-provider/
├── login/
├── register/
├── (protected)/
│   ├── dashboard/
│   ├── documents/
│   ├── conversations/
│   └── settings/
├── layout.tsx
├── page.tsx
└── middleware.ts (أو proxy.ts)
```

المسؤوليات: Routing, Metadata, تركيب Providers، واستدعاء `views/*` فقط.

> **ملاحظة معمارية مهمة:** `Providers` (خصوصاً `auth-provider`) تعيش في `app/providers` وليس `shared/providers`، لأن `auth-provider` يعتمد على `entities/user` (النوع `AuthenticatedUser` ودالة `getCurrentUser`) — و`shared` هو أدنى طبقة وممنوع عليه الاستيراد من `entities` (§3.2). بينما `app` هو أعلى طبقة ويُسمح له بالاستيراد من كل الطبقات الأدنى، فهو المكان الصحيح لأي "تجميع/تسليك" (Composition/Wiring) يربط بين Entities و Providers عامة.

ممنوع: API Calls, Business Logic, Zustand Stores, Complex State, مكونات UI معقّدة.

```tsx
// app/(protected)/documents/page.tsx
import { DocumentsView } from "@/views/documents";

export default function Page() {
  return <DocumentsView />;
}
```

---

## 4.2 Views Layer

كل Route الرئيسي = View واحد، يجمع Widgets + Features + Entities المطلوبة للصفحة.

```text
views
├── login
├── register
├── dashboard
├── documents
├── conversations
└── settings
```

```text
views/documents/
├── ui/documents-view.tsx
└── index.ts
```

View لا يحتوي منطق أعمال — فقط تركيب (Composition).

---

## 4.3 Widgets Layer

تجميعات مرئية كبيرة تُستخدم في أكثر من View (أو معقّدة كفاية لتستحق عزلاً).

```text
widgets
├── sidebar
├── navbar
├── document-list
├── conversation-panel
└── usage-summary
```

مثال: `document-list` يجمع `entities/document` (عرض البيانات) + `features/upload-document` + `features/delete-document` (الأفعال) في تجميع واحد.

---

## 4.4 Features Layer

كل فعل يقوم به المستخدم (مالك الشركة) = Feature مستقل.

```text
features
├── login
├── register
├── logout
├── upload-document
├── delete-document
├── send-message
├── change-plan
├── update-company-profile
└── update-settings
```

```text
features/upload-document/
├── ui/upload-document-button.tsx
├── model/use-upload-document.ts
├── model/upload-document.schema.ts
├── api/upload-document.api.ts
└── index.ts
```

العمليات الحساسة (حذف مستند، إلغاء اشتراك) تُغلَّف دوماً بـ `ConfirmDialog` من `shared/ui` (انظر §9).

---

## 4.5 Entities Layer

الكيانات التجارية الأساسية (عرض + جلب بيانات فقط، بدون أفعال تعديل).

```text
entities
├── user
├── company
├── document
├── conversation
├── message
├── subscription-plan
└── ai-model
```

```text
entities/document/
├── ui/document-card.tsx
├── ui/document-status-badge.tsx
├── model/use-documents.ts
├── model/types.ts
├── api/documents.api.ts
└── index.ts
```

---

## 4.6 Shared Layer

كل شيء عام لا يعرف شيئاً عن أي Entity أو Feature.

```text
shared
├── ui                # Button, Input, Modal, DataTable, PageHeader, StatCard, ConfirmDialog, Skeleton...
├── lib                # date.ts, number.ts, currency.ts
├── api                # axios-instance.ts, interceptors.ts, query-client.ts
├── auth               # session.types.ts (مثل ACCESS_TOKEN_COOKIE) — بدون أي Type خاص بكيان (ذلك في entities/user)
├── config             # constants, nav-items, breakpoints, design tokens references
├── types              # Types عامة جداً (مثل ApiResponse<T>, PaginatedResponse<T>)
└── hooks              # useDebounce, useMediaQuery, usePagination...
```

ممنوع على `shared` معرفة أي Entity أو Feature أو Widget أو View — لهذا السبب `Providers` التي تعتمد على Entities (مثل `auth-provider`) لا تعيش هنا، بل في `app/providers` (انظر §4.1).

---

# 5. Import Rules

```text
shared
   ↑
entities
   ↑
features
   ↑
widgets
   ↑
views
   ↑
app
```

- كل طبقة تستورد فقط من الأدنى منها (§3.2).
- لا استيراد بين Slices في نفس الطبقة (مثال ممنوع: `document-list` widget يستورد من `conversation-panel` widget مباشرة — يتم التجميع في `view`).
- لا استيراد إلا عبر `index.ts` (Public API — §3.3).
- استيراد دائري (Circular Import) ممنوع تماماً ويُكتشف عبر ESLint (`import/no-cycle`).

---

# 6. Design System

> هذا القسم هو المرجع الوحيد لأي قيمة بصرية في المشروع. ممنوع كتابة Hex Color أو قيمة Spacing عشوائية مباشرة في الكود. التفاصيل الكاملة للألوان في [COLORS.md](COLORS.md).

## 6.1 Colors

نظام الألوان الكامل مُعرَّف في `COLORS.md` ويُطبَّق في `globals.css` عبر CSS Variables، ثم يُستهلك حصراً عبر Tailwind tokens (`bg-primary`, `text-destructive`, `bg-ai`...). نفس لوحة الألوان الأساسية تُستخدم في `admin-frontend` لضمان هوية بصرية موحّدة للمنصة.

## 6.2 Typography

| Token                  | Usage                                                                 |
| ---------------------- | --------------------------------------------------------------------- |
| `text-xs` → `text-3xl` | سلّم Tailwind الافتراضي فقط — ممنوع قيم حرة (`text-[13.5px]`)         |
| Font                   | Vazirmatn (خط متغيّر، يدعم العربية)                                   |
| Font Weight            | `font-normal` للنصوص، `font-medium`/`font-semibold` للعناوين والأزرار |

## 6.3 Spacing

استخدام سلّم Tailwind فقط (`p-2`, `gap-4`, `space-y-6`...) — ممنوع قيم Pixel حرة.

## 6.4 Radius

`rounded-lg` هو الافتراضي للبطاقات والأزرار، `rounded-md` للعناصر الصغيرة (Badges)، `rounded-full` للـ Avatars/Status Dots فقط.

## 6.5 Shadow

`shadow-sm` للبطاقات العادية، `shadow-md` للـ Dropdowns/Popovers، `shadow-lg` للـ Modals/Dialogs فقط.

## 6.6 Animation

- مدة قياسية: `duration-150` للتفاعلات الصغيرة (hover, focus)، `duration-300` للانتقالات (فتح Modal/Drawer).
- تأثيرات Onboarding/Empty States الترحيبية يمكن أن تكون أكثر حيوية من اللوحة الإدارية (هذا منتج موجّه للعميل)، لكن دون الإفراط.
- احترام `prefers-reduced-motion` إلزامي (`motion-reduce:transition-none`).

## 6.7 Icons

`lucide-react` فقط — ممنوع مزج مكتبات أيقونات متعددة. حجم قياسي `size-4` داخل الأزرار، `size-5` داخل Sidebar/Navbar.

## 6.8 Grid

استخدام `grid`/`flex` من Tailwind فقط. الشبكة القياسية للوحات: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`.

## 6.9 Breakpoints

| Breakpoint | Width    | الاستخدام                  |
| ---------- | -------- | -------------------------- |
| (default)  | < 640px  | Mobile                     |
| `sm:`      | ≥ 640px  | Mobile كبير / Tablet عمودي |
| `md:`      | ≥ 768px  | Tablet                     |
| `lg:`      | ≥ 1024px | Desktop                    |
| `xl:`      | ≥ 1280px | Desktop كبير               |
| `2xl:`     | ≥ 1536px | شاشات كبيرة                |

## 6.10 Accessibility Tokens

تباين الألوان (Contrast Ratio) يجب أن يحقق AA كحد أدنى (WCAG 2.1) لكل نص على خلفيته — يُتحقق عند اختيار/تعديل أي لون في `COLORS.md`.

---

# 7. Responsive Rules

- **Mobile First** إلزامي: تُكتب الـ Classes الأساسية بدون Prefix لأصغر شاشة، ثم تُضاف `sm:`/`md:`/`lg:` للتكبير — لا العكس.
- هذا المنتج موجّه للعملاء، ويجب أن يعمل بشكل كامل على الموبايل (على عكس `admin-frontend`):
  - **Mobile (< 640px)**: التجربة الكاملة — رفع ملفات، محادثة، عرض الفواتير، كل شيء يجب أن يعمل بسلاسة.
  - **Tablet (640–1024px)**: Sidebar قابل للطي، تخطيط من عمودين عند الإمكان.
  - **Desktop (≥ 1024px)**: Sidebar ثابت، تخطيط متعدد الأعمدة (مثلاً قائمة المحادثات + نافذة المحادثة جنباً إلى جنب).
  - **Large Screen (≥ 1536px)**: استغلال المساحة الإضافية دون تمديد عرض القراءة (Reading Width) بشكل مفرط.
- أي Component جديد **يجب اختباره** على الـ 4 مستويات أعلاه قبل الدمج (§30 Definition of Done).
- RTL إلزامي — اتجاه الصفحة `dir="rtl"` ثابت، الأعمدة الرقمية تستخدم `dir="ltr"` محلياً عند الحاجة فقط.

---

# 8. Component Rules

كل Component في المشروع يُصنَّف ضمن نوعين فقط:

## 8.1 Dumb (Presentational) Components

- موجودة في `shared/ui` فقط.
- **لا تعرف** TanStack Query، Zustand، أو أي Business Logic.
- تستقبل كل شيء عبر Props، ولا تستدعي API مطلقاً.
- مثال: `Button`, `Modal`, `DataTable`, `StatCard`.

## 8.2 Smart (Container) Components

- موجودة في `entities/*/ui`, `features/*/ui`, `widgets/*/ui`.
- تستهلك Hooks من `model/` (التي تستدعي TanStack Query/Zustand).
- تُمرّر البيانات للـ Dumb Components عبر Props.
- مثال: `DocumentList` (widget) يستهلك `useDocuments()` من `entities/document` ثم يمرّر الصفوف لـ `DataTable` (dumb) من `shared/ui`.

**القاعدة الذهبية:** لو احتاج Component إلى `useQuery`/`useMutation`/`useSidebarStore` فهو Smart ومكانه ليس `shared/ui`.

---

# 9. API Rules

ممنوع:

```ts
axios.get(...)
fetch(...)
```

داخل أي `ui/*.tsx` Component مباشرة.

- كل استدعاء API يكون داخل `api/` segment للـ Slice المناسب (`entities/document/api`, `features/upload-document/api`).
- يُستهلك فقط عبر `model/` (hooks تستخدم `useQuery`/`useMutation`).
- عميل Axios الموحّد في `shared/api/axios-instance.ts`.
- عمليات حساسة (حذف مستند، إلغاء اشتراك) **يجب** أن تُغلَّف بـ `shared/ui/ConfirmDialog` قبل التنفيذ.

---

# 10. Forms Rules

جميع Forms تستخدم React Hook Form + Zod، والـ Schema يعيش داخل `model/` للـ Feature المسؤولة (مثلاً `features/register/model/register.schema.ts`).

ممنوع استخدام `useState` للتحقق من النماذج.

---

# 11. State Management Rules

## TanStack Query

للبيانات القادمة من Backend فقط: documents, conversations, messages, subscription, company profile.

## Zustand

لحالة الواجهة فقط: sidebar state, theme state, dialog state, active conversation id (UI selection لا بيانات).

ممنوع تخزين بيانات الـ Backend (documents, conversations...) داخل Zustand.

---

# 12. Error Handling Rules

## 12.1 Query/Mutation States

كل Query أو Mutation يجب أن تعرض: Loading State, Error State, Empty State بشكل واضح (انظر §20 UI Guidelines).

## 12.2 Error Boundaries

- كل `view` (داخل `app/.../error.tsx`) يجب أن يملك Error Boundary خاص به على مستوى Next.js (`error.tsx`).
- لا يُسمح بشاشة بيضاء/Crash كامل — أي خطأ غير متوقع يجب أن يعرض رسالة عربية واضحة + زر "إعادة المحاولة".
- أخطاء الشبكة (Network/5xx) تُعامَل بشكل مختلف عن أخطاء الصلاحية (401/403) — انظر §20.

---

# 13. Type Safety Rules

ممنوع استخدام `any` في المشروع (مفروض عبر ESLint كقاعدة `error`).

يُفضَّل `unknown` عند الحاجة مع Type Guards.

جميع استجابات Backend يجب أن تمتلك Types واضحة (تعيش في `model/types.ts` للـ Slice المناسب، أو `shared/types` إذا كانت عامة جداً).

---

# 14. Authentication & Authorization Rules

هذا التطبيق مخصص لمستخدمين بصلاحية `role === COMPANY_OWNER` (مالكي الشركات).

- تسجيل الدخول/التسجيل عبر `/auth/login` و `/auth/register` في الـ Backend الموحّد (`features/login`, `features/register`).
- أي مستخدم بصلاحية `ADMIN` لا يملك ما يمنعه تقنياً من تسجيل الدخول هنا، لكن واجهة هذا المشروع **لا تعرض** أي بيانات إدارية متعددة الشركات — فقط بيانات شركته إن وُجدت، وهذا ليس الاستخدام المقصود (الأدمن يستخدم `admin-frontend`).
- الحماية تتم عبر:
  - Middleware (يتحقق من وجود الجلسة).
  - `shared/providers/auth-provider` (يجلب `/auth/me` ويوفر `useAuth()`).
  - Route Protection على مستوى `(protected)` route group.

ممنوع الاعتماد على Frontend فقط للحماية — Backend هو المرجع النهائي للصلاحيات.

---

# 15. Multi-Tenant Rule

على عكس `admin-frontend` (الذي يسمح باختيار أي شركة)، هذا التطبيق **يمنع تماماً** اختيار `company_id` يدوياً:

- سياق الشركة (`companyId`) يُستمَد دائماً من المستخدم المُصادَق عليه (`/auth/me`) — لا Dropdown، لا Query Param يدوي لتغيير الشركة.
- أي Endpoint يُستدعى من هنا يُفترض أنه يعمل ضمن نطاق شركة المستخدم الحالي فقط، والـ Backend يتحقق من ذلك بشكل مستقل عن الواجهة.
- هذا النمط (تحديد شركة يدوياً) خاص بـ `admin-frontend` فقط ولا يجوز نقله إلى هذا المشروع.

---

# 16. Performance Rules

- **Memo**: `React.memo` فقط للمكونات المتكررة داخل قوائم طويلة (رسائل المحادثة، قائمة المستندات).
- **Lazy / Dynamic Import**: أي Widget ثقيل وغير ظاهر فوراً يُحمَّل عبر `next/dynamic` مع `ssr: false` عند الحاجة.
- **Code Splitting**: تلقائي عبر App Router.
- **Image Optimization**: `next/image` فقط، ممنوع `<img>` مباشرة.
- **Virtualization**: قوائم المحادثات/الرسائل الطويلة (`conversation-panel`) **يجب** استخدام Virtualization (مثل `@tanstack/react-virtual`).
- **Pagination**: كل API يرجع قوائم (documents, conversations...) يجب أن يدعم Pagination من Backend.
- **Suspense**: استخدام `loading.tsx` لكل route بدل شاشات تحميل يدوية متفرقة.
- **Prefetch**: استخدام `<Link prefetch>` الافتراضي لروابط Sidebar الأساسية.
- **Debounce/Throttle**: أي حقل بحث (بحث المستندات) يستخدم `useDebounce` (من `shared/hooks`) بحد أدنى 300ms.

---

# 17. Accessibility Rules

- كل عنصر تفاعلي بدون نص مرئي (أيقونة فقط) يجب أن يملك `aria-label` واضحاً بالعربية.
- دعم **Keyboard Navigation** كامل (Tab/Enter/Esc) — مهم خصوصاً لواجهة المحادثة (إرسال برسالة Enter، اختصارات).
- أي Modal/Dialog/Drawer يطبّق **Focus Trap** (متوفر عبر `shared/ui/dialog` المبني على `@base-ui/react`).
- دعم Screen Reader عبر عناصر HTML الصحيحة قبل اللجوء لـ `<div>` + معالجات أحداث.
- احترام `prefers-reduced-motion`.

---

# 18. Logging Rules

- أي خطأ غير متوقع في الواجهة يُرسَل تلقائياً إلى أداة تتبّع الأخطاء (Sentry أو ما يعادلها) — يُهيَّأ مركزياً في `shared/lib/logger.ts`.
- ممنوع استخدام `console.log` في كود الإنتاج (يُمنع عبر ESLint `no-console` مع استثناء `console.error`/`console.warn` عند الحاجة الفعلية).
- أي طلب API فاشل يُسجَّل مع سياق كافٍ (Endpoint, Status Code, بدون بيانات حساسة).

---

# 19. Notifications Rules

استخدام نظام Toast واحد (`sonner` أو ما يعادله) بأربع حالات ثابتة:

| النوع   | الاستخدام         | مثال                                   |
| ------- | ----------------- | -------------------------------------- |
| Success | عملية نجحت        | "تم رفع المستند بنجاح"                 |
| Error   | عملية فشلت        | "فشل رفع الملف، حاول مجدداً"           |
| Warning | تحذير قبل/بعد فعل | "سيتم حذف هذا المستند نهائياً"         |
| Info    | معلومة عامة       | "جاري معالجة المستند، قد يستغرق دقيقة" |

- كل Mutation (إنشاء/تعديل/حذف) يجب أن تُظهر Toast مناسباً عند النجاح أو الفشل.
- رسائل الـ Toast بالعربية دوماً وواضحة (لا أكواد خطأ تقنية مباشرة للمستخدم).

---

# 20. UI State Guidelines

كل شاشة/قائمة/Widget يعرض بيانات من API يجب أن يتعامل مع الحالات التالية بشكل صريح ومتمايز بصرياً:

| الحالة                  | السلوك المطلوب                                                      |
| ----------------------- | ------------------------------------------------------------------- |
| Loading                 | `Skeleton` يطابق شكل المحتوى الحقيقي                                |
| Empty (No Data)         | رسالة + أيقونة + إجراء مقترح (مثلاً "لا توجد مستندات، ابدأ بالرفع") |
| Permission Denied (403) | رسالة "غير مخوّل" واضحة، لا تكرار محاولات API                       |
| Server Error (5xx)      | رسالة عربية عامة + زر "إعادة المحاولة"                              |
| Offline                 | اكتشاف فقدان الاتصال وعرض شريط تنبيه ثابت                           |

هذه الحالات تُبنى كمكونات عامة في `shared/ui` (`Skeleton`, `EmptyState`, `PermissionDeniedState`, `ServerErrorState`, `OfflineBanner`) ويُعاد استخدامها في كل `view`/`widget`.

---

# 21. Security Rules

- **XSS**: ممنوع `dangerouslySetInnerHTML` إلا لمحتوى مُعقَّم صراحة (مثل `DOMPurify`) — يحتاج موافقة Architect. مهم بشكل خاص في `conversations` (رسائل قد تحتوي Markdown/HTML من المستخدم أو الذكاء الاصطناعي).
- **CSRF**: الجلسة عبر Cookie httpOnly + `withCredentials` — لا يُعطَّل ولا يُخزَّن التوكن يدوياً.
- **Sanitize / Escape HTML**: أي محتوى نصي قادم من Backend أو من رسائل المستخدمين يُعرض كنص عادي (React Escaping تلقائي) أو عبر مكتبة Markdown آمنة — لا تمريره مباشرة لـ `dangerouslySetInnerHTML`.
- ممنوع تخزين أي مفتاح/سر في `localStorage`/`sessionStorage`/الكود — الجلسة عبر httpOnly Cookie فقط.

---

# 22. Event Handler Naming

كل معالج حدث يبدأ بـ `handle` + فعل واضح:

```ts
handleSubmit;
handleDelete;
handleOpenDialog;
handleCloseDialog;
handleSendMessage;
handleUploadFile;
```

Props التي تُمرَّر كدوال من الأعلى تبدأ بـ `on`:

```tsx
<UploadDocumentButton onSuccess={handleUploadSuccess} />
```

---

# 23. Environment Rules

ممنوع وضع API Keys/Secrets/Tokens داخل الكود.

يسمح فقط عبر `.env` و `NEXT_PUBLIC_*` حسب الحاجة.

---

# 24. Testing Rules

يجب اختبار: Hooks (`model/`), Forms (Zod schemas), Critical Components (رفع/حذف مستند، إرسال رسالة، تغيير خطة) عند الحاجة.

---

# 25. Naming Conventions

| العنصر              | الصيغة                     | مثال                              |
| ------------------- | -------------------------- | --------------------------------- |
| الملفات والمجلدات   | kebab-case                 | `document-list.tsx`               |
| المكونات            | PascalCase                 | `DocumentList`                    |
| Hooks               | camelCase + `use`          | `useDocuments`                    |
| Stores              | camelCase + `use...Store`  | `useSidebarStore`                 |
| Schemas             | camelCase + `Schema`       | `uploadDocumentSchema`            |
| معالجات الأحداث     | `handle...` (انظر §22)     | `handleDelete`                    |
| Props دوال          | `on...`                    | `onSuccess`                       |
| Slices (مجلدات FSD) | kebab-case، اسم تجاري واضح | `upload-document`, `conversation` |

---

# 26. Feature Lifecycle

عند إضافة أي ميزة جديدة، الترتيب الإلزامي:

```text
1. API        → تعريف نقطة النهاية في api/
2. Type       → تعريف الأنواع في model/types.ts
3. Validation → Zod Schema في model/
4. Hook       → useQuery/useMutation في model/
5. UI         → مكوّن في ui/ يستهلك الـ Hook
6. Testing    → اختبار الحالات الحرجة (§24)
7. Documentation → تحديث ARCHITECTURE.md / تعليق Public API إن لزم (§27)
```

لا يجوز البدء بـ UI قبل وجود Type واضح للبيانات.

---

# 27. Documentation Rules

- كل `Hook` جديد في `model/` يحتاج تعليق سطر واحد فوقه يوضح الغرض إن لم يكن الاسم كافياً وحده.
- كل `api/*.ts` جديد يوثّق Endpoint المستهدف (Method + Path) في تعليق علوي.
- كل `Slice` جديد (Entity/Feature/Widget) يُضاف إلى شجرة `ARCHITECTURE.md` عند إنشائه.
- أي قرار معماري يخالف هذا الملف ولو جزئياً يحتاج إضافة سطر في `ARCHITECTURE.md` يوضح السبب والموافقة عليه من Architect.

---

# 28. Folder & Slice Rules (وقواعد الانتقال من Feature-Based)

- **متى أنشئ Entity جديد؟** عندما يكون هناك كيان تجاري جديد له بيانات وعرض خاص به.
- **متى أنشئ Feature جديد؟** عندما يكون هناك فعل/تفاعل مستخدم جديد ولو استخدم Entity موجود.
- **متى أنشئ Widget جديد؟** عندما يتكرر تجميع مرئي معيّن في أكثر من View، أو يكون معقّداً كفاية ليستحق ملفاً مستقلاً.
- **متى أُضيف داخل Slice موجود بدل إنشاء جديد؟** عندما تكون الإضافة امتداداً مباشراً لنفس الكيان/الفعل.
- ممنوع إنشاء مجلد على مستوى `src` خارج الطبقات الست المعتمدة (§4) بدون موافقة Architect.
- **الانتقال من البنية القديمة (`modules/`)**: أي كود قديم مبني بنمط Feature-Based (`modules/auth`, `modules/documents`...) يُعاد توزيعه تدريجياً حسب نوعه الحقيقي:
  - منطق "كيان وعرضه" → `entities/<name>`.
  - منطق "فعل مستخدم" (نموذج/Mutation) → `features/<name>`.
  - مكوّن تجميعي مشترك (Sidebar, Navbar) → `widgets/<name>`.
  - هذا الانتقال يتم Slice تلو الآخر عند العمل الفعلي على ذلك الجزء — لا إعادة هيكلة جذرية دفعة واحدة بدون خطة Migration منفصلة يوافق عليها Architect.

---

# 29. Git Rules

أسماء الفروع:

```text
feature/<slice-name>        مثال: feature/upload-document
bugfix/<وصف-قصير>           مثال: bugfix/conversation-scroll
hotfix/<وصف-قصير>           مثال: hotfix/login-redirect-loop
release/<version>            مثال: release/1.2.0
```

- لا دمج مباشر على `main`/`master` — عبر Pull Request دائماً.
- رسالة الـ Commit تصف **لماذا** التغيير لا فقط **ماذا** تغيّر.

---

# 30. Definition of Done

أي Feature/Slice يُعتبر **منتهياً** فقط إذا تحقق كل ما يلي:

- ✅ Responsive (Mobile/Tablet/Desktop/Large — §7)
- ✅ RTL مُختبر
- ✅ Validation (Zod) مكتمل
- ✅ Types مكتملة (بدون `any`)
- ✅ Tests للحالات الحرجة (إن انطبق — §24)
- ✅ Loading State واضح
- ✅ Error State واضح (+ Error Boundary إن انطبق)
- ✅ Empty State واضح
- ✅ Accessibility أساسي (aria-label, keyboard nav — §17)
- ✅ Public API (`index.ts`) محدَّث (§3.3)
- ✅ Documentation محدَّثة (§27)
- ✅ Review من Architect/زميل قبل الدمج

---

# 31. Feature Checklist (مرجع سريع)

عند إضافة أي Feature راجع:

- هل هذا Entity جديد أم Feature جديد أم امتداد لـ Slice موجود؟ (§28)
- هل جميع API Calls داخل `api/`؟
- هل يوجد Hook مخصص في `model/`؟
- هل يوجد Loading/Error/Empty/Permission-Denied/Server-Error State؟ (§20)
- هل تم تعريف Types؟
- هل تم استخدام Zod؟
- هل العملية حساسة وتحتاج `ConfirmDialog`؟ (§9)
- هل تم اختبار RTL والـ Responsive؟ (§7)
- هل تم احترام Import Rules والـ Public API؟ (§5, §3.3)
- هل تأكدت أن لا مفاتيح/أسرار مكشوفة؟ (§23)
- هل اتبعت Definition of Done بالكامل؟ (§30)

---

# 32. Forbidden Changes

لا يجوز تغيير:

- Next.js
- Tailwind CSS
- shadcn/ui
- TanStack Query
- Zustand
- Feature-Sliced Design (الطبقات والـ Public API rule)
- Import Rules
- قاعدة الفصل عن `admin-frontend` (هذا المشروع لا يُدمج مع لوحة الإدارة في نفس الـ Next.js app)
- قاعدة Multi-Tenant (§15): منع اختيار `company_id` يدوياً

إلا بعد موافقة Architect المشروع.
