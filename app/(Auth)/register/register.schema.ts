import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
export const schema = zod
    .object({
      name: zod
        .string()
        .min(1, "Name is required")
        .min(2, "Name must be at least 2 characters")
        .max(50, "Name cannot exceed 50 characters"),
      email: zod.string().email("Email is not in format"),
      password: zod
        .string()
        .min(8, "Password must be at least 8 characters")
        .max(100, "Password cannot exceed 100 characters")
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
        ),
      rePassword: zod.string().min(8, "Password must be at least 8 characters"),
      phone: zod
        .string()
        .regex(
          /^\+?[1-9]\d{1,14}$/,
          "Phone number must be in E.164 format (e.g., +1234567890)",
        ),
    })
    .refine((data) => data.password === data.rePassword, {
      message: "Passwords do not match",
    });