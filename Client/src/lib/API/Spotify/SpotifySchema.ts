import { z } from "zod";

export const spotifyCTokenSchema = z
  .string()
  .length(115, { message: "Invalid token length" });
