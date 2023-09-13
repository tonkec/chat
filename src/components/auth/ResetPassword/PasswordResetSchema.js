import * as yup from "yup";

export const PasswordChangeSchema = yup.object().shape({
  password: yup
    .string()
    .required("Morate unijeti vasu novu sifru!")
    .min(8, "Lozinka mora imati 8 znakova ili vise!")
    .matches(/[0-9]/, "Lozinka mora sadrzati brojeve!")
    .matches(/[a-z]/, "Lozinka mora sadrzati mala slova!")
    .matches(/[A-Z]/, "Lozinka mora sadrzati velika slova!"),
  passwordConfirm: yup
    .string()
    .required("Morate ponovo unijeti vasu novu sifru!")
    .oneOf([yup.ref("password"), null], "Passwordi se moraju poklapati!"),
});
