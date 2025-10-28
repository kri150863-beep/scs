export interface Profile {
  personal_information?: AccountInformation;
  financial_information?: FinancialInformation;
  employment_information?: EmploymentInformation;
  administrative_settings?: AdministrativeSettings;
  security_settings?: SecuritySettings;
  notification_preferences?: NotificationPreferences;
}

export interface NotificationPreferences {
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
  claimUpdates: boolean;
  systemAlerts: boolean;
  marketingEmails: boolean;
}

export interface AccountInformation {
  business_name?: string;
  business_registration_number?: string;
  business_address?: string;
  city?: string;
  postal_code?: string;
  phone_number?: string;
  email_address?: string;
  website?: string;
  address: string;
  client_name: string;
  country_of_nationality: string;
  date_of_birth: string;
  home_number: string;
  kyc: string;
  mobile_number: string; 
  nic: string;
  profile_image: string;
}

export interface FinancialInformation {
  holder_name: any;
  bank_name: any;
  bank_account_number: any;
  bank_address: any;
  bank_country: any;
}

export interface EmploymentInformation {
  company_address: any;
  company_name: any;
  monthly_income: any;
  office_phone: any; 
  present_occupation: any;
}

export interface AdministrativeSettings {
  primary_contact_name: any;
  primary_contact_post: any;
  notification: any;
  communication_method: any;
  administrative_updated_at?: any;
}

export interface SecuritySettings {
  password?: string;
  backup_email?: any;
  masked_email?: any;
}

export interface LoginSession {
  id: string;
  email: string;
  maskedEmail: string;
  lastPasswordChange?: Date;
  twoFactorEnabled: boolean;
  loginSessions: LoginSession[];
}

export interface NotificationCategory {
  id: string;
  name: string;
  description: string;
  preferences: NotificationPreference[];
}

export interface NotificationPreference {
  id: keyof NotificationPreferences;
  name: string;
  description: string;
  enabled: boolean;
  required?: boolean;
  category: string;
}

export interface AccountField {
  label: string;
  value: string;
  key: keyof AccountInformation | 'email';
  editable?: boolean;
  editing?: boolean;
  type?: 'text' | 'email' | 'tel' | 'url';
  required?: boolean;
  validation?: {
    pattern?: RegExp;
    minLength?: number;
    maxLength?: number;
  };
}

export interface FinancialField {
  label: string;
  value: string;
  key: keyof FinancialInformation;
}

export interface EmploymentField {
  label: string;
  value: string;
  key: keyof EmploymentInformation;
}

export interface AdministrativeField {
  label: string;
  value: any;
  key: keyof AdministrativeSettings;
  editable?: boolean;
  editing?: boolean;
  editedValue?: string;
  type?: 'text' | 'switch' | 'multiselect';
  options?: string[]; // For select fields
  required?: boolean;
  validation?: {
    pattern?: RegExp;
    minLength?: number;
    maxLength?: number;
  };
}

export interface SecurityField {
  label: string;
  value: string;
  key: keyof SecuritySettings;
  editable?: boolean;
  editing?: boolean;
  type?: 'text' | 'tel';
  required?: boolean;
  validation?: {
    pattern?: RegExp;
    minLength?: number;
    maxLength?: number;
  };
}

export interface WebsiteRequest {
  email?: string;
  newWebsite: string;
}

export interface AdministrativeRequest {
  email?: string;
  primaryContactName?: string;
  primaryContactPost?: string;
  methodName?: string[];
  notification?: boolean;
}

export interface SecurityRequest {
  email?: string;
  currentPassword?: string;
  newPassword?: string;
  confirmNewPassword?: string;
  backupEmail?: string;
}

export interface Document {
  date: string;
  name: string;
}