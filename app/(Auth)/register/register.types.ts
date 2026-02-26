import * as zod from "zod";
import { schema } from "./register.schema";
export type RegisterFormType = zod.infer<typeof schema>;
