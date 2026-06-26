# Frontend Architecture — Foundation (Stage 1)

> هذا الملف يشرح **ما تم بناؤه فعلياً** في مرحلة التأسيس (Foundation)، وأين يجد أي مطور جديد كل قطعة، وكيف يلتزم بقواعد [ROLE.md](ROLE.md) و[COLORS.md](COLORS.md) عند إضافة أي كود جديد.

---

## 1. ما تم إنجازه في هذه المرحلة

| المهمة                                                        | الحالة | أين                                                 |
| ------------------------------------------------------------- | ------ | --------------------------------------------------- |
| مشروع Next.js (App Router, TS Strict)                         | ✅     | جذر `frontend/`                                     |
| pnpm + كل المكتبات (RHF, Zod, Zustand, TanStack Query, Axios) | ✅     | `package.json`                                      |
| Tailwind CSS v4 + shadcn/ui (style: base-nova, RTL)           | ✅     | `components.json`, `src/app/globals.css`            |
| ESLint + Prettier (+ قاعدة منع `any`)                         | ✅     | `eslint.config.mjs`, `.prettierrc.json`             |
| نظام الألوان (Light/Dark)                                     | ✅     | [COLORS.md](COLORS.md) + `globals.css`              |
| RTL + خط عربي (Vazirmatn)                                     | ✅     | `src/app/layout.tsx`                                |
| Axios + Interceptors                                          | ✅     | `src/infrastructure/api/`                           |
| TanStack Query Client                                         | ✅     | `src/infrastructure/query/query-client.ts`          |
| Zustand (مثال: Sidebar UI state)                              | ✅     | `src/shared/hooks/use-sidebar-store.ts`             |
| Middleware لحماية المسارات                                    | ✅     | `src/middleware.ts`                                 |
| Layout رئيسي + Sidebar + Navbar                               | ✅     | `src/app/(protected)/`                              |
| Toast (sonner)                                                | ✅     | `src/shared/ui/sonner.tsx` + مُفعّل في `layout.tsx` |
| Loading / Error Pages                                         | ✅     | كل route segment (انظر §4)                          |

> **ملاحظة:** لا يوجد بعد أي Module مبني فعلياً (`auth`, `documents`...) — هذه المرحلة هي الأساس (Shell) فقط. صفحات `/login`, `/dashboard`, `/documents`, `/conversations`, `/settings` تحتوي حالياً على محتوى Placeholder بانتظار بناء كل Module حسب خارطة الطريق.

---

## 2. شجرة المشروع الفعلية

```text
frontend/
├── ROLE.md                  ← القواعد الرسمية (ثابتة)
├── COLORS.md                ← نظام الألوان الرسمي
├── ARCHITECTURE.md          ← هذا الملف
├── components.json          ← إعدادات shadcn/ui (aliases → shared/*)
├── src/
│   ├── app/
│   │   ├── layout.tsx        ← Root layout: خطوط، RTL، Providers، Toaster
│   │   ├── page.tsx          ← يحوّل "/" إلى "/dashboard"
│   │   ├── loading.tsx / global-error.tsx
│   │   ├── login/             ← Layout مستقل بدون Sidebar
│   │   └── (protected)/       ← Route Group: كل الصفحات المحمية
│   │       ├── layout.tsx     ← Sidebar + Navbar + main
│   │       ├── loading.tsx / error.tsx   ← يغطّيان كل الصفحات الفرعية
│   │       ├── _components/   ← sidebar.tsx, navbar.tsx (خاصة بهذا الـ Layout فقط)
│   │       ├── dashboard/page.tsx
│   │       ├── documents/page.tsx
│   │       ├── conversations/page.tsx
│   │       └── settings/page.tsx
│   ├── modules/                ← فارغة حالياً (auth, company, documents, conversations, ai, subscriptions, settings)
│   ├── shared/
│   │   ├── ui/                 ← مكونات shadcn (button, sonner, sheet...)
│   │   ├── hooks/               ← use-sidebar-store.ts
│   │   ├── lib/utils.ts
│   │   ├── constants/nav-items.ts
│   │   ├── types/ / validations/   ← فارغة حالياً، تُعبّأ مع كل Module
│   ├── infrastructure/
│   │   ├── api/axios-instance.ts, interceptors.ts
│   │   ├── auth/session.types.ts, get-current-user.ts
│   │   ├── query/query-client.ts
│   │   └── websocket/ / storage/   ← فارغة حالياً
│   ├── providers/
│   │   ├── providers.tsx         ← التركيب: I18n → Theme → Query → Auth
│   │   ├── query-provider/
│   │   ├── theme-provider/        ← next-themes (light/dark/system)
│   │   ├── auth-provider/         ← useAuth() عبر React Query (`GET /auth/me`)
│   │   └── i18n-provider/         ← useI18n() (ar/rtl ثابت حالياً)
│   └── middleware.ts            ← يحمي كل المسارات إلا /login
```

---

## 3. كيف يعمل التوثيق (Auth Shell)

- **لا يوجد Auth Module حقيقي بعد.** الموجود الآن هو فقط البنية التي ستستخدمها وحدة `modules/auth` مستقبلاً:
  - `infrastructure/auth/session.types.ts` → نوع `AuthenticatedUser` + اسم الكوكي `access_token`.
  - `infrastructure/auth/get-current-user.ts` → ينادي `GET /auth/me` عبر Axios.
  - `providers/auth-provider` → يستهلك الدالة أعلاه عبر `useQuery` ويوفر `useAuth()`.
  - `middleware.ts` → يتحقق فقط من **وجود** كوكي `access_token` (UX redirect سريع) — التحقق الحقيقي من الصلاحية يبقى من مسؤولية Backend دائماً (انظر [ROLE.md §11](ROLE.md)).
- تسجيل الدخول/الخروج الفعلي (Forms + Zod + Mutations) يُبنى لاحقاً داخل `modules/auth` حسب خارطة الطريق، وسيستهلك نفس `axios-instance` و`AuthProvider` الموجودين.

---

## 4. Loading / Error: كيف تغطي كل الصفحات

Next.js App Router يطبّق أقرب `loading.tsx` / `error.tsx` من الأعلى إذا لم يوجد ملف خاص بالصفحة نفسها. لذلك:

- `src/app/(protected)/loading.tsx` و `error.tsx` يغطّيان تلقائياً: `dashboard`, `documents`, `conversations`, `settings`.
- `src/app/login/loading.tsx` و `error.tsx` خاصان بصفحة الدخول فقط (Layout مختلف، بدون Sidebar).
- `src/app/loading.tsx` يُستخدم فقط للمستوى الجذري (نادراً، لأن `/` يحوّل فوراً).
- `src/app/global-error.tsx` يغطي أي خطأ فادح يكسر الـ Root Layout نفسه (يحتاج `<html>/<body>` خاصين به وفق متطلبات Next.js).

عند إضافة صفحة جديدة داخل `(protected)` لا حاجة لإضافة `loading.tsx`/`error.tsx` إلا إذا احتجت حالة مختلفة عن الافتراضية.

---

## 5. نظام الألوان — ملخص الاستخدام العملي

التفاصيل الكاملة في [COLORS.md](COLORS.md). للاستخدام اليومي في الكود:

```tsx
<div className="bg-background text-foreground" />      // خلفية/نص أساسي
<Button className="bg-primary text-primary-foreground" /> // أساسي (Indigo)
<span className="bg-ai text-ai-foreground" />            // عناصر AI فقط (Teal) — modules/ai, modules/conversations
<p className="text-success" />                           // نجاح
<p className="text-destructive" />                        // خطأ/حذف
```

**ممنوع:** كتابة `#4F46E5` أو أي Hex مباشرة داخل أي Component. كل لون جديد يُعرّف أولاً في `COLORS.md` ثم في `globals.css`.

---

## 6. قواعد لأي Module جديد (تذكير سريع)

عند بناء أي Module (auth, documents...) اتبع هيكلية [ROLE.md §4.2](ROLE.md):

```text
modules/<name>/
├── api/          ← كل نداءات Backend (Axios عبر infrastructure/api/axios-instance)
├── components/   ← مكونات خاصة بالـ Module فقط
├── hooks/        ← useQuery / useMutation تستهلك api/
├── store/        ← Zustand فقط إذا وُجدت حالة UI محلية (لا تخزّن بيانات Backend هنا)
├── types/
├── validations/  ← Zod Schemas + React Hook Form
└── index.ts
```

- لا يستورد Module آخر مباشرة — التواصل عبر App Layer أو Shared Types فقط.
- أي Query/Mutation يجب أن تعرض Loading + Error + Empty State بشكل واضح.
- ممنوع `any` (مفروض الآن عبر ESLint كقاعدة `error`).

---

## 7. التحقق (Verified)

تم التأكد من نجاح الأساس عبر:

```bash
pnpm exec tsc --noEmit   # ✅ بدون أخطاء
pnpm lint                # ✅ بدون أخطاء
pnpm format              # ✅ Prettier (+ ترتيب كلاسات Tailwind تلقائياً)
pnpm build                # ✅ Build إنتاجي ناجح (Next.js 16, Turbopack)
```

> ملاحظة تقنية: Next.js 16 بدأ يُهمل (deprecate) تسمية `middleware.ts` لصالح `proxy.ts` (نفس الوظيفة، تسمية جديدة فقط). أبقينا `middleware.ts` حالياً لأن [ROLE.md](ROLE.md) يذكرها صراحةً، والملف يعمل بدون مشاكل — أي تغيير تسمية يحتاج موافقة Architect المشروع حسب [ROLE.md §18](ROLE.md).
