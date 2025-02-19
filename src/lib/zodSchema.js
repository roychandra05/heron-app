import * as z from "zod";

export const zodSchema = (type) => {
  const signUpSchema = z
    .object({
      email: z
        .string()
        .email()
        .min(3, "min 3 characters")
        .max(50, "max 25 characters"),
      username: z
        .string()
        .min(3, "min 3 characters")
        .max(15, "max 15 characters"),
      password: z
        .string()
        .min(3, "min 3 characters")
        .max(50, "max 50 characters"),
      confirm: z
        .string()
        .min(3, "min 3 characters")
        .max(50, "max 50 characters"),
    })
    .refine((data) => data.password === data.confirm, {
      message: "Passwords Dont't Match",
      path: ["confirm"],
    });

  const signInSchema = z.object({
    username: z
      .string()
      .min(3, "min 3 characters")
      .max(15, "max 15 characters"),
    password: z
      .string()
      .min(3, "min 3 characters")
      .max(50, "max 50 characters"),
  });

  const inputDataSchema = z.object({
    package: z.enum(["1 month", "3 month", "6 month", "12 month"]),
    price: z
      .string()
      .min(6, "min 6 numbers")
      .max(8, "max 8 numbers")
      .transform((val, ctx) => {
        const parsed = parseInt(val);
        if (isNaN(parsed)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Not a number",
          });
        }
        return parsed;
      }),
    quantity: z
      .string()
      .max(1, "max 1 numbers")
      .transform((val, ctx) => {
        const parsed = parseInt(val);
        if (isNaN(parsed)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Not a number",
          });
        }
        return parsed;
      }),
  });

  if (type === "inputData") {
    return inputDataSchema;
  }
  if (type === "signup") {
    return signUpSchema;
  }
  return signInSchema;
};

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .email()
    .min(3, "min 3 characters")
    .max(50, "max 25 characters"),
  username: z.string().min(3, "min 3 characters").max(15, "max 15 characters"),
});

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(3, "min 3 characters")
      .max(50, "max 50 characters"),
    confirmPassword: z.string().min(3, "min 3 characters").max(50, "max 50 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords Dont't Match",
    path: ["confirmPassword"],
  });
