import * as zod from "zod";
import { schema } from "./login.schema";
export type LoginFormType = zod.infer<typeof schema>;
