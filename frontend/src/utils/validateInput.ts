import {z} from "zod";


 export const createNewPatientSchema = z.object({
    first_name: z.string().min(1),
    last_name: z.string().min(1),
    street_address: z.string().min(1),
    region: z.string().min(1),
    city: z.string().min(1),
    postcode: z.string().min(1),
    country: z.string().min(1),
    phone_number: z.string().min(1),
    contact_email: z.string().min(1),
    status: z.string().min(1),

})







    // first_name: "",
    // last_name: "",
    // street_address: "",
    // city: "",
    // postcode: "",
    // region: "",
    // country: "",
    // phone_number: "",
    // contact_email: "",
    // status: "scheduled",