import type { Request, Response } from "express";
import supabase from "../config/supabaseClient.js";

export const signup = async (req: Request, res: Response) => {
    try {
        const { username, email, role, password } = req.body;
        
        const { data: authData, error: authError } = await supabase.auth.signUp({ email, password });

        if (authError) {
            return res.status(401).json({ error: authError.message });
        }

        const { data: signupData, error: signupError } = await supabase.from('users').insert({ id: authData.user.id, username, email, role });

        if (signupError) {
            return res.status(401).json({ error: signupError.message });
        }

        res.status(200).json({ message: "User signup successful!" });
    } catch (error) {
        console.error("Unexpected error: ", error.message);
        res.status(500).json({ error: "Unexpected server error in signup" });
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({ email, password });

        if (loginError) {
            return res.status(401).json({ error: loginError.message });
        }

        res.cookie("access_token", loginData.session.access_token, {
            httpOnly: true,
            secure: false,             
            sameSite: 'lax', 
            maxAge: 60 * 60 * 1000,            
            path: '/',
        });

        res.cookie("refresh_token", loginData.session.refresh_token, {
            httpOnly: true,
            secure: false,             
            sameSite: 'lax', 
            maxAge: 30 * 24 * 60 * 60 * 1000,            
            path: '/',
        });

        res.status(200).json(loginData.user);
    } catch (error) {
        console.error("Unexpected error: ", error.message);
        res.status(500).json({ error: "Unexpected server error in login" });
    }
}

export const logout = async (req: Request, res: Response) => {
    try {
        const access_token = req.cookies?.access_token;

        if (access_token) {
            await supabase.auth.admin.signOut(access_token);
        }

        res.clearCookie("access_token", { path: "/" });
        res.clearCookie("refresh_token", { path: "/" });

        return res.status(200).json({ message: "Successfully logged out!" });
    } catch (error) {
        console.error("Unexpected Error: ", error.message);
        res.status(500).json({ error: "Unexpected server error in logout" })
    }
}

export const refresh = async (req: Request, res: Response) => {
    try {
        const refresh_token = req.cookies?.refresh_token;

        if (!refresh_token) {
            return res.status(400).json({ error: "No refresh token provided" });
        }

        const { data, error } = await supabase.auth.refreshSession({ refresh_token });

        if (error || !data.session) {
            return res.status(401).json({ error: "Refresh failed" });
        }

        res.cookie("access_token", data.session.access_token, {
            httpOnly: true,
            secure: false,             
            sameSite: 'lax', 
            maxAge: 60 * 60 * 1000,            
            path: '/',
        });

        res.cookie("refresh_token", data.session.refresh_token, {
            httpOnly: true,
            secure: false,             
            sameSite: 'lax', 
            maxAge: 30 * 24 * 60 * 60 * 1000,            
            path: '/',
        });

        return res.status(200).json({ message: "Token refreshed successfully!" })
    } catch (error) {
        console.error("Unexpected Error: ", error.message);
        res.status(500).json({ error: "Unexpected server error in refresh" })
    }
}