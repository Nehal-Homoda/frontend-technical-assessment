import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
export const schema = zod.object({
  username: zod
    .string()
    .min(1, "Username is required")
    .min(2, "Username must be at least 2 characters")
    .max(50, "Username cannot exceed 50 characters"),
  password: zod
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password cannot exceed 100 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    ),
});
