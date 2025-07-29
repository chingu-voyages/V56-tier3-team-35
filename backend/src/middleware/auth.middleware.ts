import type { Request, Response, NextFunction } from "express";
import supabase from "../config/supabaseClient.js";
import type { User } from '@supabase/supabase-js';

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export const authToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
    const token = req.cookies?.access_token;

    if (!token) {
      return res.status(401).json({ message: "User not authorised" });
    }

    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data.user) {
      return res.status(401).json({ message: "User not authorised" });
    }

    req.user = data.user;
    next(); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}