import { MessageCircle } from "lucide-react";
import { Suspense } from "react";
import { LoginForm } from "@/features/login";

// ترتيب العناصر هنا أساسي: الصفحة dir="rtl" (انظر app/layout.tsx)، فالعنصر
// الأول في flex-row يظهر بصرياً على الجهة اليمنى. لذلك قسم تسجيل الدخول
// يأتي أولاً (يمين)، وقسم العرض التعريفي للمنصة ثانياً (يسار).
export function LoginView() {
  return (
    <div className="flex min-h-screen">
      <div className="flex w-full items-center justify-center px-4 py-12 lg:w-1/2">
        <div className="w-full max-w-sm">
          <h1 className="text-foreground text-2xl font-bold">تسجيل الدخول</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            أدخل بريدك الإلكتروني وكلمة المرور للوصول إلى لوحة التحكم.
          </p>

          <div className="mt-8">
            <Suspense>
              <LoginForm />
            </Suspense>
          </div>
        </div>
      </div>

      <div className="bg-primary text-primary-foreground hidden flex-col items-center justify-center gap-6 px-12 lg:flex lg:w-1/2">
        <div className="bg-primary-foreground/10 flex size-20 items-center justify-center rounded-full">
          <MessageCircle className="size-10" />
        </div>
        <div className="max-w-md text-center">
          <h2 className="text-3xl font-bold">Support OTP</h2>
          <p className="mt-3 text-base opacity-90">
            منصة المساعد الذكي لخدمة الشركات — أجب عن أسئلة عملائك تلقائياً، وأدِر مستنداتك وبياناتك ومحادثاتك من
            مكان واحد.
          </p>
        </div>
      </div>
    </div>
  );
}
