export interface ContactUs {
    business_development_contact_details: BusinessDevelopment;
    swan_centre_contact_details: SwanCentre;
}

interface BusinessDevelopment {
    name: string;
    email: string;
    phone: string;
    mobile: string;
}

interface SwanCentre {
    address: string;
    email: string;
    phone: string;
}