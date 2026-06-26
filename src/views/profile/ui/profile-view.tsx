import { ChangeEmailForm } from "@/features/change-email";
import { ChangePasswordForm } from "@/features/change-password";
import { UpdateProfileForm } from "@/features/update-profile";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";

export function ProfileView() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-foreground text-2xl font-bold">الملف الشخصي</h1>
        <p className="text-muted-foreground mt-1 text-sm">إدارة بياناتك الشخصية وبيانات تسجيل الدخول.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>الاسم</CardTitle>
        </CardHeader>
        <CardContent>
          <UpdateProfileForm />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>البريد الإلكتروني</CardTitle>
        </CardHeader>
        <CardContent>
          <ChangeEmailForm />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>كلمة المرور</CardTitle>
        </CardHeader>
        <CardContent>
          <ChangePasswordForm />
        </CardContent>
      </Card>
    </div>
  );
}
