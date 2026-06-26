import { I18nProvider } from "@/app/providers/i18n-provider/i18n-provider";
import { ThemeProvider } from "@/app/providers/theme-provider/theme-provider";
import { QueryProvider } from "@/app/providers/query-provider/query-provider";
import { AuthProvider } from "@/app/providers/auth-provider/auth-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <I18nProvider>
      <ThemeProvider>
        <QueryProvider>
          <AuthProvider>{children}</AuthProvider>
        </QueryProvider>
      </ThemeProvider>
    </I18nProvider>
  );
}
