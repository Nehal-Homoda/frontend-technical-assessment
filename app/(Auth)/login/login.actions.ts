"use server";
import { LoginFormType } from "./login.types";

export default async function HandleLogin(data: LoginFormType) {
  try {
    const response = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    // DummyJSON returns { "message": "Invalid credentials" } for wrong login
    if (result.message) {
      console.error("Login failed:", result.message);
      return null;
    }

    console.log("Logged in user:", result);
    return result;
  } catch (error) {
    console.error("Login error:", error);
    return null;
  }
}
