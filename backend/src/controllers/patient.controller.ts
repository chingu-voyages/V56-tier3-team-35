import { Request, Response } from "express";
import supabase from "../config/supabaseClient.js";
import {
  ApiResponse,
  NewPatientInput,
  Patient,
  UpdatePatientInput,
} from "../types/types.js";

export const getAllPatients = async (
  req: Request,
  res: Response<ApiResponse<Patient[]>>
) => {
  console.log("🔥 Received GET request to /api/patients");
  try {
    const { data, error } = await supabase.from("patients").select("*");

    if (error) {
      console.error("❌ Supabase Select Error:", error);
      return res
        .status(500)
        .json({ message: "Error fetching patients", status: 500 });
    }

    if (!data || data.length === 0) {
      return res
        .status(404)
        .json({ message: "Patients not found", status: 404 });
    }

    res.status(200).json({
      message: "Successfully fetched all patients",
      status: 200,
      data: data,
    });
  } catch (error) {
    console.error("Unexpected error: ", error.message);
    res.status(500).json({
      message: "Unexpected server error in getAllPatients",
      status: 500,
    });
  }
};

export const getPatient = async (
  req: Request<{ id: string }>,
  res: Response<ApiResponse<Patient>>
) => {
  console.log("🔥 Received GET request to /api/patients/:id");
  const { id } = req.params;
  if (!id) {
    return res
      .status(400)
      .json({ message: "Patient ID is required", status: 400 });
  }
  try {
    const { data, error } = await supabase
      .from("patients")
      .select("*")
      .eq("id", id);

    if (!data || data.length === 0) {
      return res
        .status(404)
        .json({ message: "Patient not found", status: 400 });
    }
    res.status(200).json({
      message: "Successfully fetched patient",
      status: 200,
      data: data[0],
    });
    if (error) {
      console.error("❌ Supabase Select Error:", error);
      return res
        .status(500)
        .json({ message: "Error fetching patient", status: 500 });
    }
  } catch (error) {
    console.error("Unexpected error: ", error.message);
    res
      .status(500)
      .json({ message: "Unexpected server error in getPatient", status: 500 });
  }
};

export const addNewPatient = async (
  req: Request<NewPatientInput>,
  res: Response<ApiResponse<Patient>>
) => {
  console.log("🔥 Received POST request to /api/patients");
  const newPatient = req.body;
  if (!newPatient) {
    return res
      .status(400)
      .json({ message: "Patient information is required", status: 400 });
  }

  try {
    const { data, error } = await supabase
      .from("patients")
      .insert([newPatient])
      .select();

    if (error) {
      console.error("❌ Supabase Insert Error:", error);
      return res.status(500).json({ message: error.message, status: 500 });
    }

    console.log("✅ Patient added successfully:", data);
    res
      .status(201)
      .json({ message: "Patient added", status: 201, data: data[0] });
  } catch (error) {
    console.error("Unexpected error: ", error.message);
    res.status(500).json({
      message: "Unexpected server error in addNewPatient",
      status: 500,
    });
  }
};

export const deltePatient = async (
  req: Request<{ id: string }>,
  res: Response<ApiResponse<Patient>>
) => {
  console.log("🔥 Received DELETE request to /api/patients/:id");
  const { id } = req.params;
  if (!id) {
    return res
      .status(400)
      .json({ message: "Patient ID is required", status: 400 });
  }
  try {
    const { data, error } = await supabase
      .from("patients")
      .delete()
      .eq("id", id)
      .select();
    if (error) {
      console.error("❌ Supabase Deletion Error:", error);
      return res.status(500).json({ message: error.message, status: 500 });
    }

    if (!data || data.length === 0) {
      return res
        .status(404)
        .json({ message: "Patient not found", status: 404 });
    }

    console.log("✅ Patient deleted successfully:", data[0]);
    res
      .status(200)
      .json({ message: "Patient deleted", status: 200, data: data[0] });
  } catch (error) {
    console.error("Unexpected error: ", error.message);
    res.status(500).json({
      message: "Unexpected server error in deletePatient",
      status: 500,
    });
  }
};

export const updatePatient = async (
  req: Request<UpdatePatientInput>,
  res: Response<ApiResponse<Patient>>
) => {
  console.log("🔥 Received PATCH request to /api/patients/:id");

  const { id } = req.params;
  const updates = req.body;

  if (!updates) {
    return res
      .status(400)
      .json({ message: "Patient information is required", status: 400 });
  }
  if (!id) {
    return res
      .status(400)
      .json({ message: "Patient ID is required", status: 400 });
  }

  try {
    const { data, error } = await supabase
      .from("patients")
      .update(updates)
      .eq("id", id)
      .select("*");
    if (!data || data.length === 0) {
      return res
        .status(404)
        .json({ message: "Patient not found", status: 404 });
    }
    if (error) {
      console.error("❌ Supabase Update Error:", error);
      return res.status(500).json({ message: error.message, status: 500 });
    }

    console.log("✅ Patient updated successfully:", data);
    res.status(200).json({
      status: 200,
      message: "Patient updated successfully",
      data: data[0],
    });
  } catch (error: any) {
    console.error("Unexpected error:", error.message);
    res.status(500).json({
      message: "Unexpected server error in updatePatient",
      status: 500,
    });
  }
};
