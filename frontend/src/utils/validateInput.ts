import {z} from "zod";

export const createNewPatientSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  street_address: z.string().min(1, "Address is required"),
  phone_number: z.string().min(1, "Phone number is required"),
  procedure: z.string().min(1, "Procedure is required"),
  contact_name: z.string().min(1, "Contact name is required"),
  surgeon: z.string().min(1, "Surgeon is required"),
  room: z.string().min(1, "Room is required"),
  duration: z.string().min(1, "Duration is required"),
  status: z.string().min(1, "Status is required"),
});






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