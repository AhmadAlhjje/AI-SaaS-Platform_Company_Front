import { Suspense } from "react";
import { LoginForm } from "@/features/login";

export function LoginView() {
  return (
    <div className="border-border bg-card w-full max-w-sm rounded-xl border p-6 shadow-sm">
      <h1 className="text-foreground text-xl font-bold">تسجيل الدخول</h1>
      <p className="text-muted-foreground mt-1 text-sm">
        أدخل بريدك الإلكتروني وكلمة المرور للوصول إلى لوحة التحكم.
      </p>

      <div className="mt-6">
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
