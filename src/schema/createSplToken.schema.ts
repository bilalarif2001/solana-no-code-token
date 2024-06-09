import { z } from "zod";

const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(15, { message: "Name must be 20 characters max" }),
  symbol: z
    .string()
    .min(2, { message: "Symbol must be at least 2 characters" })
    .max(15, { message: "Symbol must be 20 characters max" }),
  decimals: z.coerce
    .number({ invalid_type_error: "Expected a Number" })
    .max(9, { message: "Decimals must be 9 max" }),
  supply: z.coerce
  .number({ invalid_type_error: "Expected a Number" })
  .min(1, { message: "Supply must be 1 min" }),
  description: z
    .string()
    .min(1, { message: "Description is required" })
    .max(200, { message: "Description must be 200 characters max" }),
  image: z
    .any()
    .refine((file) => file.length == 1, `Image is required.`)
    .refine(
      (file) => allowedFileTypes.includes(file[0]?.type),
      "File is not .jpg, .jpeg, .png"
    )
    .refine(
      (file) => file[0]?.size <= 5 * 1024 * 1024,
      "Max Image size is 5MB"
    ),
});

export default formSchema;
