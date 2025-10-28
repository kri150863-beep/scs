import { Profile } from '../../../domain/entities/profile.entity';

export const MOCK_USER_PROFILE: Profile = {
  personal_information: {
    city: "Saint Pierre 2",
    postal_code: "75202",
    phone_number: "547895122",
    email_address: "rene@gmail.com",
    website: "www.rene.com2",
    address: "Avenue victoria",
    client_name: "Santatra Miharimbola",
    country_of_nationality: "Mauritius",
    date_of_birth: "1995-09-06",
    home_number: "628468273",
    kyc: "2026-09-01",
    mobile_number: "55897899",
    nic: "W01728617827821",
    profile_image: "http://10.0.0.64:8000/uploads/profile/68c911b7943e6.png"
  },
  financial_information: {
    bank_account_number: "1234567890123456",
    bank_address: "10 Rue de la République, Paris",
    bank_country: "France",
    bank_name: "Global Bank PLC",
    holder_name: "Jean Dupont"
  },
  administrative_settings: {
    primary_contact_name: "Ann Smith",
    primary_contact_post: "SWAN Surveyor",
    notification: true,
    communication_method: "Portal, Email, SMS",
    administrative_updated_at: new Date(),
  },
  security_settings: {
    password: "bzVwzPz45RkeC1g!",
    backup_email: "rene@gmail.com"
  }
};

export const MOCK_PROFILE_UPDATE_RESPONSE = {
  success: true,
  data: MOCK_USER_PROFILE,
  message: 'Profile updated successfully'
};

export const MOCK_NOTIFICATION_UPDATE_RESPONSE = {
  success: true,
  message: 'Notification preferences updated successfully'
};

export const MOCK_PASSWORD_CHANGE_RESPONSE = {
  success: true,
  message: 'Password changed successfully'
};
