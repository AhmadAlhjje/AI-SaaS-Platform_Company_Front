# Frontend Architecture — Foundation (Stage 1) + FSD Migration

> هذا الملف يشرح **ما تم بناؤه فعلياً** في مرحلة التأسيس (Foundation)، وأين يجد أي مطور جديد كل قطعة، وكيف يلتزم بقواعد [ROLE.md](ROLE.md) و[COLORS.md](COLORS.md) عند إضافة أي كود جديد.
>
> **تحديث مهم:** تم نقل المشروع من "Feature-Based Architecture" إلى **Feature-Sliced Design (FSD)** (انظر [ROLE.md §3](ROLE.md)). كل ما كان موجوداً وقتها (`modules/*` فارغة بالكامل، بدون كود حقيقي) أُعيد توزيعه على الطبقات الجديدة: `app/providers`, `views`, `widgets`, `features`, `entities`, `shared`. الكود الحقيقي القائم (Sidebar/Navbar/Auth/Axios/Providers) أُعيد تنظيمه بالكامل ضمن هذه الهجرة، وتم التحقق من نجاح `tsc --noEmit` و`pnpm lint` و`pnpm build` بعدها.

---

## 1. ما تم إنجازه

| المهمة                                                        | الحالة | أين                                                                         |
| ------------------------------------------------------------- | ------ | --------------------------------------------------------------------------- |
| مشروع Next.js (App Router, TS Strict)                         | ✅     | جذر `frontend/`                                                             |
| pnpm + كل المكتبات (RHF, Zod, Zustand, TanStack Query, Axios) | ✅     | `package.json`                                                              |
| Tailwind CSS v4 + shadcn/ui (style: base-nova, RTL)           | ✅     | `components.json`, `src/app/globals.css`                                    |
| ESLint + Prettier (+ قاعدة منع `any`)                         | ✅     | `eslint.config.mjs`, `.prettierrc.json`                                     |
| نظام الألوان (Light/Dark)                                     | ✅     | [COLORS.md](COLORS.md) + `globals.css`                                      |
| RTL + خط عربي (Vazirmatn)                                     | ✅     | `src/app/layout.tsx`                                                        |
| Axios + Interceptors                                          | ✅     | `src/shared/api/`                                                           |
| TanStack Query Client                                         | ✅     | `src/shared/api/query-client.ts`                                            |
| Zustand (مثال: Sidebar UI state)                              | ✅     | `src/shared/hooks/use-sidebar-store.ts`                                     |
| Middleware لحماية المسارات                                    | ✅     | `src/middleware.ts`                                                         |
| Layout رئيسي + Sidebar + Navbar (Widgets)                     | ✅     | `src/widgets/sidebar`, `src/widgets/navbar`                                 |
| Toast (sonner)                                                | ✅     | `src/shared/ui/sonner.tsx` + مُفعّل في `layout.tsx`                         |
| Loading / Error Pages                                         | ✅     | كل route segment (انظر §5)                                                  |
| **هجرة Feature-Based → Feature-Sliced Design**                | ✅     | `entities/`, `features/`, `widgets/`, `views/`, `shared/`, `app/providers/` |

> **ملاحظة:** لا يوجد بعد أي Feature/Entity مبني بمنطق أعمال حقيقي (`login`, `upload-document`...) — هذه المرحلة هي الأساس (Shell) فقط، موزّعة على طبقات FSD الصحيحة. صفحات `/login`, `/dashboard`, `/documents`, `/conversations`, `/settings` تستهلك حالياً `views/*` بمحتوى Placeholder بانتظار بناء كل Feature/Entity حسب خارطة الطريق ([ROLE.md §26 Feature Lifecycle](ROLE.md)).

---

## 2. شجرة المشروع الفعلية (FSD)

```text
frontend/
├── ROLE.md                  ← القواعد الرسمية (FSD)
├── COLORS.md                ← نظام الألوان الرسمي
├── ARCHITECTURE.md          ← هذا الملف
├── components.json          ← إعدادات shadcn/ui (aliases → shared/*)
├── src/
│   ├── app/                          # Routing فقط (Next.js)
│   │   ├── layout.tsx                 ← Root layout: خطوط، RTL، Providers، Toaster
│   │   ├── page.tsx                   ← يحوّل "/" إلى "/dashboard"
│   │   ├── loading.tsx / global-error.tsx
│   │   ├── providers/                 ← تجميع Providers (يعتمد على entities/user — لذلك هو هنا لا في shared، انظر ROLE.md §4.1)
│   │   │   ├── providers.tsx           ← التركيب: I18n → Theme → Query → Auth
│   │   │   ├── auth-provider/          ← useAuth() عبر React Query (يستهلك entities/user)
│   │   │   ├── query-provider/
│   │   │   ├── theme-provider/         ← next-themes (light/dark/system)
│   │   │   └── i18n-provider/          ← useI18n() (ar/rtl ثابت حالياً)
│   │   ├── login/                      ← Layout مستقل بدون Sidebar → يستهلك views/login
│   │   └── (protected)/                ← Route Group: كل الصفحات المحمية
│   │       ├── layout.tsx              ← يستهلك widgets/sidebar + widgets/navbar
│   │       ├── loading.tsx / error.tsx ← يغطّيان كل الصفحات الفرعية
│   │       ├── dashboard/page.tsx      ← يستهلك views/dashboard
│   │       ├── documents/page.tsx      ← يستهلك views/documents
│   │       ├── conversations/page.tsx  ← يستهلك views/conversations
│   │       └── settings/page.tsx       ← يستهلك views/settings
│   ├── views/                  # تجميع كل صفحة (Composition فقط، بدون Business Logic)
│   │   ├── login/ui/login-view.tsx
│   │   ├── dashboard/ui/dashboard-view.tsx
│   │   ├── documents/ui/documents-view.tsx
│   │   ├── conversations/ui/conversations-view.tsx
│   │   └── settings/ui/settings-view.tsx
│   ├── widgets/                # تجميعات مرئية مركّبة بين أكثر من View
│   │   ├── sidebar/ui/sidebar.tsx
│   │   ├── navbar/ui/navbar.tsx           ← يستهلك features/logout
│   │   ├── document-list/                 ← (فارغ حالياً، بانتظار modules/documents)
│   │   ├── conversation-panel/            ← (فارغ حالياً)
│   │   └── usage-summary/                 ← (فارغ حالياً)
│   ├── features/               # أفعال/تفاعلات المستخدم
│   │   ├── logout/model/use-logout.ts     ← Hook حقيقي يستهلكه navbar
│   │   ├── login/ / register/             ← (فارغ، بانتظار البناء)
│   │   ├── upload-document/ / delete-document/
│   │   ├── send-message/
│   │   ├── change-plan/
│   │   ├── update-company-profile/
│   │   └── update-settings/
│   ├── entities/                # الكيانات التجارية
│   │   ├── user/                          ← Entity حقيقي: AuthenticatedUser + getCurrentUser()
│   │   ├── company/ / document/ / conversation/ / message/
│   │   ├── subscription-plan/ / ai-model/
│   ├── shared/                  # Kit عام، لا يعرف أي Entity/Feature
│   │   ├── ui/                  ← مكونات shadcn (button, sonner, sheet, avatar, dropdown-menu...)
│   │   ├── hooks/                ← use-sidebar-store.ts (مشترك بين widgets/sidebar و widgets/navbar)
│   │   ├── lib/utils.ts
│   │   ├── api/                  ← axios-instance.ts, interceptors.ts, query-client.ts
│   │   ├── auth/session.types.ts ← فقط ACCESS_TOKEN_COOKIE (بدون Type كيان — ذلك في entities/user)
│   │   ├── config/nav-items.ts
│   │   ├── types/ / storage/ / websocket/   ← فارغة حالياً
│   └── middleware.ts             ← يحمي كل المسارات إلا /login (يستورد من shared/auth فقط)
```

---

## 3. لماذا Providers في `app/providers` لا `shared/providers`؟

قاعدة الطبقات الذهبية في FSD ([ROLE.md §3.2](ROLE.md)): `shared` هو أدنى طبقة، ولا يجوز له معرفة أي شيء عن `entities`. لكن `auth-provider` يحتاج فعلياً `entities/user` (النوع `AuthenticatedUser` ودالة `getCurrentUser`) — فوضعه في `shared` يكسر القاعدة. الحل المعتمد في FSD: أي "تجميع/تسليك" (Composition Root) يربط بين طبقات متعددة يعيش في أعلى طبقة (`app`)، لأنها الوحيدة المسموح لها بالاستيراد من كل ما تحتها.

---

## 4. الـ Auth Shell الحالي

- `entities/user/model/types.ts` → نوع `AuthenticatedUser`.
- `entities/user/api/get-current-user.ts` → ينادي `GET /auth/me` عبر `shared/api/axios-instance`.
- `entities/user/index.ts` → Public API للـ Entity (انظر [ROLE.md §3.3](ROLE.md)).
- `app/providers/auth-provider` → يستهلك `entities/user` عبر `useQuery` ويوفر `useAuth()`.
- `features/logout/model/use-logout.ts` → Hook حقيقي (`useLogout()`) يستدعي `POST /auth/logout` ثم يحوّل لصفحة الدخول — يستهلكه `widgets/navbar`.
- `middleware.ts` → يتحقق فقط من **وجود** كوكي `access_token` (UX redirect سريع، من `shared/auth/session.types.ts`) — التحقق الحقيقي من الصلاحية يبقى من مسؤولية Backend دائماً.
- تسجيل الدخول الفعلي (Form + Zod + Mutation) يُبنى لاحقاً داخل `features/login` حسب خارطة الطريق ([ROLE.md §26 Feature Lifecycle](ROLE.md)).

---

## 5. Loading / Error: كيف تغطي كل الصفحات

- `src/app/(protected)/loading.tsx` و `error.tsx` يغطّيان تلقائياً: `dashboard`, `documents`, `conversations`, `settings`.
- `src/app/login/loading.tsx` و `error.tsx` خاصان بصفحة الدخول فقط (Layout مختلف، بدون Sidebar).
- `src/app/loading.tsx` يُستخدم فقط للمستوى الجذري (نادراً، لأن `/` يحوّل فوراً).
- `src/app/global-error.tsx` يغطي أي خطأ فادح يكسر الـ Root Layout نفسه.

عند إضافة View جديدة داخل `(protected)` لا حاجة لإضافة `loading.tsx`/`error.tsx` إلا إذا احتجت حالة مختلفة عن الافتراضية.

---

## 6. نظام الألوان — ملخص الاستخدام العملي

التفاصيل الكاملة في [COLORS.md](COLORS.md). للاستخدام اليومي في الكود:

```tsx
<div className="bg-background text-foreground" />      // خلفية/نص أساسي
<Button className="bg-primary text-primary-foreground" /> // أساسي (Indigo)
<span className="bg-ai text-ai-foreground" />            // عناصر AI فقط (Teal) — entities/ai-model, entities/conversation وما يتصل بهما
<p className="text-success" />                           // نجاح
<p className="text-destructive" />                        // خطأ/حذف
```

**ممنوع:** كتابة `#4F46E5` أو أي Hex مباشرة داخل أي Component. كل لون جديد يُعرّف أولاً في `COLORS.md` ثم في `globals.css`.

---

## 7. قواعد لأي Slice جديد (تذكير سريع)

عند بناء أي Feature/Entity جديد اتبع [ROLE.md §3.4 و §26 Feature Lifecycle](ROLE.md):

```text
slice/
├── ui/        ← مكوّن React (Smart Component يستهلك model/)
├── model/     ← Hooks (useQuery/useMutation)، Types، Zod Schemas
├── api/       ← نداءات Backend (Axios عبر shared/api/axios-instance)
├── lib/       ← Helpers محلية للـ Slice فقط (نادر)
└── index.ts   ← Public API (Export فقط ما يُستخدم خارج الـ Slice)
```

- لا استيراد بين Slices في نفس الطبقة — التواصل عبر طبقة أعلى (`widgets`/`views`) أو عبر `app` (تجميع نهائي).
- لا استيراد إلا عبر `index.ts` للـ Slice الآخر (Public API).
- أي Query/Mutation يجب أن تعرض Loading + Error + Empty State بشكل واضح ([ROLE.md §20](ROLE.md)).
- ممنوع `any` (مفروض الآن عبر ESLint كقاعدة `error`).
- راجع [ROLE.md §30 Definition of Done](ROLE.md) قبل اعتبار أي Feature منتهياً.

---

## 8. التحقق (Verified)

تم التأكد من نجاح الهجرة الكاملة إلى FSD عبر:

```bash
pnpm exec tsc --noEmit   # ✅ بدون أخطاء
pnpm lint                # ✅ بدون أخطاء
pnpm build                # ✅ Build إنتاجي ناجح (Next.js 16, Turbopack) — كل الـ Routes تعمل
```

> ملاحظة تقنية: Next.js 16 بدأ يُهمل (deprecate) تسمية `middleware.ts` لصالح `proxy.ts` (نفس الوظيفة، تسمية جديدة فقط). أبقينا `middleware.ts` حالياً لأن [ROLE.md](ROLE.md) يذكرها صراحةً، والملف يعمل بدون مشاكل — أي تغيير تسمية يحتاج موافقة Architect المشروع حسب [ROLE.md §32 Forbidden Changes](ROLE.md).
