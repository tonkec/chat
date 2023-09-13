import * as yup from "yup";

export const MailVerificationSchema = yup.object().shape({
  mail: yup
    .string()
    .required("Morate unijeti vas email!")
    .email("Unesite validan email!"),
  password: yup
    .string()
    .required("Morate unijeti sifru!")
    .min(8, "Lozinka mora imati 8 znakova ili vise!")
    .matches(/[0-9]/, "Lozinka mora sadrzati brojeve!")
    .matches(/[a-z]/, "Lozinka mora sadrzati mala slova!")
    .matches(/[A-Z]/, "Lozinka mora sadrzati velika slova!"),
});
