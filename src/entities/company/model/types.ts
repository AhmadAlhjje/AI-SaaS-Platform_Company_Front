export interface Company {
  id: string;
  name: string;
  logo: string | null;
  contactEmail: string | null;
  contactPhone: string | null;
  address: string | null;
  website: string | null;
  status: string;
  createdAt: string;
}

export interface UpdateCompanyProfileInput {
  name: string;
  contactEmail: string | null;
  contactPhone: string | null;
  address: string | null;
  website: string | null;
}
