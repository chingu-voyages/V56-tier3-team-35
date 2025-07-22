import { Request, Response } from "express";
import supabase from "../config/supabaseClient.js";
import {
  NewPatientInput,
  Patient,
  UpdatePatientInput,
} from "../types/types.js";

// TYPE ALL REQ/RES
export const getAllPatients = async (
  req: Request,
  res: Response<Patient[] | { message: string }>
) => {
  console.log("🔥 Received GET request to /api/patients");
  try {
    const { data, error } = await supabase.from("patients").select("*");

    if (error) {
      console.error("❌ Supabase Select Error:", error);
      return res.status(500).json({ message: "Error fetching patients" });
    }

    if (!data || data.length === 0) {
      return res.status(404).json({ message: "Patients not found" });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error("Unexpected error: ", error.message);
    res
      .status(500)
      .json({ message: "Unexpected server error in getAllPatients" });
  }
};

export const getPatient = async (
  req: Request<{ id: string }>,
  res: Response<Patient | { message: string }>
) => {
  console.log("🔥 Received GET request to /api/patients/:id");
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Patient ID is required" });
  }
  try {
    const { data, error } = await supabase
      .from("patients")
      .select("*")
      .eq("id", id);

    if (!data || data.length === 0) {
      return res.status(404).json({ message: "Patient not found" });
    }
    res.status(200).json(data[0]);
    if (error) {
      console.error("❌ Supabase Select Error:", error);
      return res.status(500).json({ message: "Error fetching patient" });
    }
  } catch (error) {
    console.error("Unexpected error: ", error.message);
    res.status(500).json({ message: "Unexpected server error in getPatient" });
  }
};

export const addNewPatient = async (
  req: Request<NewPatientInput>,
  res: Response
) => {
  console.log("🔥 Received POST request to /api/patients");
  const newPatient = req.body;
  if (!newPatient) {
    return res.status(400).json({ message: "Patient information is required" });
  }

  try {
    const { data, error } = await supabase
      .from("patients")
      .insert([newPatient])
      .select();

    if (error) {
      console.error("❌ Supabase Insert Error:", error);
      return res.status(500).json({ message: error.message });
    }
    console.log("✅ Patient added successfully:", data);
    res.status(201).json({ message: "Patient added", patient: data });
  } catch (error) {
    console.error("Unexpected error: ", error.message);
    res
      .status(500)
      .json({ message: "Unexpected server error in addNewPatient" });
  }
};

// might change this to PATCH later if we only want to update the fields that have been changed?
// then we might be able to use in the updating status function too
export const updatePatient = async (
  req: Request<UpdatePatientInput>,
  res: Response<Patient | { message: string }>
) => {
  console.log("🔥 Received PUT request to /api/patients/:id");

  //   const { id } = req.params;
  //   const updates = req.body; // right now this can be full or partial data (we havent got types set up yet)

  //   try {
  //     const { data, error } = await supabase
  //       .from("patients")
  //       .update(updates)
  //       .eq("id", id);

  //     if (error) {
  //       console.error("❌ Supabase Update Error:", error);
  //       return res.status(500).json({ message: error.message });
  //     }

  //     console.log("✅ Patient updated successfully:", data);
  //     res.status(200).json(data[0]);
  //   } catch (error: any) {
  //     console.error("Unexpected error:", error.message);
  //     res.status(500).json({ message: "Unexpected server error" });
  //   }
};
