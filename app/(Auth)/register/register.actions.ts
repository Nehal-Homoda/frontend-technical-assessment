"use server";
import { RegisterFormType } from "./register.types";
export default async function HandleRegister(data: RegisterFormType) {
  try {
    const response = await fetch("https://dummyjson.com/users/add", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to register user");
    }

    const result = await response.json();
    console.log("Registered user:", result);
    return result;
  } catch (error) {
    console.error("Register error:", error);
    return null;
  }
}
