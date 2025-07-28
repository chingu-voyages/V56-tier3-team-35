import type { Request, Response } from "express";
import { supabaseSignup, createDBUser, supabaseLogin } from "../utils/auth.util"

export const signup = async (req: Request, res: Response) => {
    try {
        const { username, email, role, password } = req.body;
        
        const authId = await supabaseSignup({ email, password });
        await createDBUser({ id: authId, username, email, role });
        
        res.status(200).json({ message: "User signup successful!" });
    } catch (error) {
        console.error("Unexpected error: ", error.message);
        res.status(500).json({
            message: "Unexpected server error in signup"
        });
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const data = await supabaseLogin({ email, password });
        
        res.status(200).json(data);
    } catch (error) {
        console.error("Unexpected error: ", error.message);
        res.status(500).json({
            message: "Unexpected server error in login"
        });
    }
}