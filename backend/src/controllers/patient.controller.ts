/*
* Controller for implementing the business logic for requets made to access patient data
*/

import { Request, Response } from "express";
import supabase from "../config/supabaseClient.js";

export const getAllPatients = async (req: Request, res: Response) => {
    try {
        const { data, error } = await supabase.from('patients').select('*');

        if (error) {
            return res.status(500).json({ message: "Error fetching patients" })
        }

        res.status(200).json(data);
    } catch (error) {
        console.error("Unexpected error: ", error.message);
        res.status(500).json({ message: "Unexpected server error in getAllPosts" })
    }
}