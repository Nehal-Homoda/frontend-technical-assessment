import { RegisterFormType } from "../(Auth)/register/register.types";
export async function registerUser(
  data: RegisterFormType,
): Promise<any | null> {
  try {
    const nameParts = data.name.trim().split(" ");
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(" ") || "";

    const response = await fetch("https://dummyjson.com/users/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email: data.email,
        username: data.email.split("@")[0],
        password: data.password,
        phone: data.phone,
      }),
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
