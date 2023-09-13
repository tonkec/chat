import * as yup from "yup";

export const RegistrationSchema = yup.object().shape({
  mail: yup
    .string()
    .required("Morate unijeti vas email!")
    .email("Unesite validan email!"),
  name: yup
    .string()
    .required("Morate unijeti ime")
    .min(3, "Ime ne moze sadrzati manje od 3 znakova")
    .max(24, "Ime ne moze imati vise od 24 znakova"),
  lastName: yup
    .string()
    .required("Morate unijeti prezime")
    .min(3, "Prezime ne moze sadrzati manje od 3 znakova")
    .max(24, "Prezime ne moze imati vise od 24 znakova"),
  password: yup
    .string()
    .required("Morate unijeti sifru!")
    .min(8, "Lozinka mora imati 8 znakova ili vise!")
    .matches(/[0-9]/, "Lozinka mora sadrzati brojeve!")
    .matches(/[a-z]/, "Lozinka mora sadrzati mala slova!")
    .matches(/[A-Z]/, "Lozinka mora sadrzati velika slova!"),
});
