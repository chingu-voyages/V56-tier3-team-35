import type { Request, Response, NextFunction } from "express";
import supabase from "../config/supabaseClient.js";

export const authToken = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "User not authorised" });
    }

    const { data, error } = await supabase.auth.getUser(token);

    if (error) {
        return res.status(401).json({ message: "User not authorised" });
    } 

    return next();
}