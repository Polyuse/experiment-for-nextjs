"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function login(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const signInData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { data, error } = await supabase.auth.signInWithPassword(signInData);

  if (error) {
    redirect("/error");
  }
  if (data.session) {
    console.log("cookie::", data.session.access_token);
    const cookieStore = cookies();
    (await cookieStore).set("token_id", data?.session.access_token, {
      httpOnly: true,
      path: "/",
    });
  } else {
    console.log("not cookie::");
  }
  revalidatePath("/", "layout");
  redirect("/account");
}

export async function signup(formData: FormData) {
  const supabase = await createClient();
  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  // redirect('/account')
}
