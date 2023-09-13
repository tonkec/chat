import * as yup from "yup";

export const ForgotPasswordSchema = yup.object().shape({
  mail: yup
    .string()
    .required("Morate unijeti vas email!")
    .email("Unesite validan email!"),
});
