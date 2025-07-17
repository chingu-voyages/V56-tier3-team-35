// UNFINISHED !!
// id is gonna come back too from getAllPatients since db asigns it?? but we dont need for frontend etc?
export type Patient = {
  patient_number: string; // unsure what type this should be, its bpchar in supabase
  first_name: string;
  last_name: string;
  street_address: string;
  city: string;
  region: string;
  country: string;
  phone_number: string;
  contact_email: string;
  status: string;
  //   created_at: string; // this is a timestamp in supabase
};
