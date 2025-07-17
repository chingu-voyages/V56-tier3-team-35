import { Request, Response } from "express";
import supabase from "../config/supabaseClient.js";

const getAllPatients = async (req: Request, res: Response) => {
  console.log("🔥 Received GET request to /api/patients");
  try {
    const { data, error } = await supabase.from("patients").select("*");

    if (error) {
      console.error("❌ Supabase Select Error:", error);
      return res.status(500).json({ message: "Error fetching patients" });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error("Unexpected error: ", error.message);
    res
      .status(500)
      .json({ message: "Unexpected server error in getAllPatients" });
  }
};

const addNewPatient = async (req: Request, res: Response) => {
  console.log("🔥 Received POST request to /api/patients");
  const newPatient = req.body;

  try {
    const { data, error } = await supabase
      .from("patients")
      .insert([newPatient])
      .select(); // adding select lets us return the inserted data to log, not really needed just used for now to help confirm its working

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
const updatePatient = async (req: Request, res: Response) => {
  console.log("🔥 Received PUT request to /api/patients/:id");

  const { id } = req.params;
  const updates = req.body; // right now this can be full or partial data (we havent got types set up yet)

  try {
    const { data, error } = await supabase
      .from("patients")
      .update(updates)
      .eq("id", id);

    if (error) {
      console.error("❌ Supabase Update Error:", error);
      return res.status(500).json({ message: error.message });
    }

    console.log("✅ Patient updated successfully:", data);
    res.status(200).json({ message: "Patient updated", patient: data });
  } catch (error: any) {
    console.error("Unexpected error:", error.message);
    res.status(500).json({ message: "Unexpected server error" });
  }
};

export const updateStatus = async (req: Request, res: Response) => {
  console.log("🔥 Received PATCH request to /api/patients/:id/status");

  const { id } = req.params;
  const { status_id: newStatusId } = req.body;

  // use proper type checks for this later
  if (!newStatusId || typeof newStatusId !== "number") {
    return res
      .status(400)
      .json({ message: "Missing or invalid status_id in request body" });
  }

  // Fetches the patient- but only with cols that we need
  const { data: patient, error: patientError } = await supabase
    .from("patients")
    .select("id, status_id")
    .eq("id", id)
    .single();

  if (patientError || !patient) {
    console.error("❌ Error fetching patient:", patientError);
    return res.status(404).json({ message: "Patient not found" });
  }

  const currentStatusId = patient.status_id;
  console.log("🧠 Current status ID:", currentStatusId);
  console.log("🔁 New status ID:", newStatusId);

  // checks if transition is allowed
  const { data: transition, error: transitionError } = await supabase
    .from("status_transitions")
    .select("id")
    .eq("from_status_id", currentStatusId)
    .eq("to_status_id", newStatusId)
    .single();

  if (transitionError || !transition) {
    console.error("❌ Invalid status transition:", transitionError);
    return res.status(400).json({ message: "Invalid status transition" });
  }

  // update the status, could maybe use the updatePatient function here instead
  // but would need to change to a PATCH request and make sure its tested well
  const { error: updateError } = await supabase
    .from("patients")
    .update({ status_id: newStatusId })
    .eq("id", id);

  if (updateError) {
    console.error("❌ Error updating status:", updateError);
    return res.status(500).json({ message: "Failed to update status" });
  }

  console.log("✅ Patient status updated successfully");
  return res
    .status(200)
    .json({ message: "Patient status updated successfully" });
};

const getStatusTransitions = async (req: Request, res: Response) => {
  console.log(
    "🔥 Received GET request to /api/patients/:id/status-transitions"
  );

  const { id } = req.params;

  const { data: patient, error: patientError } = await supabase
    .from("patients")
    .select("id, status_id")
    .eq("id", id)
    .single();

  if (patientError || !patient) {
    console.error("❌ Error fetching patient:", patientError);
    return res.status(404).json({ message: "Patient not found" });
  }

  const currentStatusId = patient.status_id;

  // get available transitions from status_transitions table
  const { data: availableTransitions, error: transitionsError } = await supabase
    .from("status_transitions")
    .select("*")
    .eq("from_status_id", currentStatusId);

  if (transitionsError) {
    console.error("❌ Error fetching availableTransitions:", transitionsError);
    return res.status(500).json({ message: "Error fetching transitions" });
  }

  if (!availableTransitions.length) {
    console.log("ℹ️ No available status transitions for current status");
    return res.status(200).json({ currentStatusId, availableStatuses: [] });
  }

  const availibleTransitionsIds = availableTransitions.map(
    (t) => t.to_status_id
  );

  // 3. Get info for each status the current one can transition to
  const { data: availableStatuses, error: statusError } = await supabase
    .from("status")
    .select("*")
    .in("id", availibleTransitionsIds);

  if (statusError) {
    console.error("❌ Error fetching status data:", statusError);
    return res.status(500).json({ message: "Error fetching status details" });
  }

  console.log("✅ Successfully returned status data:", availableStatuses);
  res.status(200).json({ currentStatusId, availableStatuses });
};

export const patientController = {
  getAllPatients: getAllPatients,
  addNewPatient: addNewPatient,
  updatePatient: updatePatient,
  updateStatus: updateStatus,
  getStatusTransitions: getStatusTransitions,
};

export default patientController;
