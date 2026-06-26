export interface AuthenticatedUser {
  id: string;
  email: string;
  fullName: string;
  role: string;
  companyId: string | null;
}

export interface CurrentUserApiModel {
  id: string;
  name: string;
  email: string;
  role: string;
  companyId: string | null;
}
