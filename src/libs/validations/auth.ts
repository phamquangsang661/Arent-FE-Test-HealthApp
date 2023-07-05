import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

export const loginValidation = toFormikValidationSchema(
  z.object({
    name: z
      .string({ required_error: "名前を空白のままにすることはできません" })
      .min(1, "名前を空白のままにすることはできません"),
    email: z
      .string({
        required_error: "メールアドレスを空白のままにすることはできません",
      })
      .min(1, "メールアドレスを空白のままにすることはできません")
      .email("電子メールの形式が無効です。もう一度お試しください。"),
    password: z
      .string({ required_error: "パスワードは最低6文字" })
      .min(6, "パスワードは最低6文字"),
  })
);
