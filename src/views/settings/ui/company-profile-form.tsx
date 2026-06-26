"use client";

import { Loader2, Save } from "lucide-react";
import { useState } from "react";
import type { Company } from "@/entities/company";
import { useUpdateCompanyProfile } from "@/features/update-company-profile";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { CompanyLogoUploader } from "./company-logo-uploader";

interface CompanyProfileFormProps {
  company: Company;
}

export function CompanyProfileForm({ company }: CompanyProfileFormProps) {
  const [name, setName] = useState(company.name);
  const [contactEmail, setContactEmail] = useState(company.contactEmail ?? "");
  const [contactPhone, setContactPhone] = useState(company.contactPhone ?? "");
  const [address, setAddress] = useState(company.address ?? "");
  const [website, setWebsite] = useState(company.website ?? "");

  const updateCompanyProfileMutation = useUpdateCompanyProfile();

  function handleSave() {
    updateCompanyProfileMutation.mutate({
      name: name.trim(),
      contactEmail: contactEmail.trim() ? contactEmail.trim() : null,
      contactPhone: contactPhone.trim() ? contactPhone.trim() : null,
      address: address.trim() ? address.trim() : null,
      website: website.trim() ? website.trim() : null,
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>بيانات الشركة</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <CompanyLogoUploader company={company} />

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="companyName">اسم الشركة</Label>
          <Input id="companyName" value={name} onChange={(event) => setName(event.target.value)} maxLength={120} />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="contactEmail">البريد الإلكتروني</Label>
            <Input
              id="contactEmail"
              type="email"
              placeholder="info@company.com"
              value={contactEmail}
              onChange={(event) => setContactEmail(event.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="contactPhone">رقم الهاتف</Label>
            <Input
              id="contactPhone"
              type="tel"
              placeholder="+966 5x xxx xxxx"
              value={contactPhone}
              onChange={(event) => setContactPhone(event.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="address">العنوان</Label>
            <Input
              id="address"
              placeholder="المدينة، الدولة"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="website">الموقع الإلكتروني</Label>
            <Input
              id="website"
              type="url"
              placeholder="https://example.com"
              value={website}
              onChange={(event) => setWebsite(event.target.value)}
            />
          </div>
        </div>

        <Button
          type="button"
          className="self-start"
          disabled={!name.trim() || updateCompanyProfileMutation.isPending}
          onClick={handleSave}
        >
          {updateCompanyProfileMutation.isPending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Save className="size-4" />
          )}
          حفظ البيانات
        </Button>
      </CardContent>
    </Card>
  );
}
