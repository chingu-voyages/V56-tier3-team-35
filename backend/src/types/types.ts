//generic shape of api response
export type ApiResponse<T = undefined> = {
  status: number;
  message: string;
  data?: T;
};

export type Patient = {
  id: number;
  patient_number: string;
  first_name: string;
  last_name: string;
  street_address: string;
  phone_number: string;
  contact_name: string;
  created_at: string;
  status: string;
  procedure: string;
  surgeon: string;
  room: string;
  duration: number;
}; 

export interface Surgery {
  patient_number: string;
  first_name: string;
  last_name: string;
  street_address: string;
  city: string;
  postcode: string;
  region: string;
  country: string;
  phone_number: string;
  contact_email: string;
  created_at: string;
  status: string;
}

  /*

  */
export type NewPatientInput = Omit<Patient, "id" | "created_at">;

// data sent from UpdatePatient form (optional fields except id)
export type UpdatePatientInput = {
  id: number;
  patient_number?: string;
  first_name?: string;
  last_name?: string;
  street_address?: string;
  phone_number?: string;
  contact_name?: string;
  status?: string;
  procedure?: string;
  surgeon?: string;
  room?: string;
  duration?: number;
};

export type Role = "ADMIN" | "SURGICAL_TEAM";

export type User = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role: Role;
  created_at: string;
};

export type PatientStatusKey =
  | "CHECKED_IN"
  | "PRE_PROCEDURE"
  | "IN_PROGRESS"
  | "CLOSING"
  | "RECOVERY"
  | "COMPLETE"
  | "DISMISSAL";
