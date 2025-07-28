import type { SignInWithPasswordCredentials, SignUpWithPasswordCredentials } from "@supabase/supabase-js";
import supabase from "../config/supabaseClient.js";

interface DBUser {
  id: string;
  username: string;
  email: string;
  role: string;
}

export const supabaseSignup = async (cred : SignUpWithPasswordCredentials) => {
    const { data, error } = await supabase.auth.signUp(cred);

    console.log(cred);
    console.log(data);

    if (error) {
        throw error;
    }

    return data.user.id ;
}

export const createDBUser = async (user: DBUser) => {
    const { data, error } = await supabase.from('users').insert(user);

    if (error) {
        throw error;
    }

    return data;
}

export const supabaseLogin = async (cred: SignInWithPasswordCredentials) => {
    const { data, error } = await supabase.auth.signInWithPassword(cred);

    if (error) {
        throw error;
    }

    return data;
}