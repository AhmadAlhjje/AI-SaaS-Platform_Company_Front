import { AiSettingsSection } from "./ai-settings-section";

export function SettingsView() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-foreground text-2xl font-bold">الإعدادات</h1>
        <p className="text-muted-foreground mt-2 text-sm">إعدادات الشركة والاشتراك.</p>
      </div>
      <AiSettingsSection />
    </div>
  );
}
