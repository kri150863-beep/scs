import { ContactUs } from "../../../domain/entities/contact-us.entity";
import { Chart } from "../../../domain/entities/dashboard.entity";

export const MOCK_CONTACT_US: ContactUs =
{
  business_development_contact_details: {
    name: "John Smith",
    email: "rm@swan-capitalsolutions.com",
    phone: "(+230) 207 3517",
    mobile: "(+230) 5 701 7895"
  },
  swan_centre_contact_details: {
    address: "10 Intendance street, Port Louis",
    email: "info@swanforlife.com",
    phone: "(+230) 207 3500"
  }
}