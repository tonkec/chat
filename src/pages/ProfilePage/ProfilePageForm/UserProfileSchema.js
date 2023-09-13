import * as yup from "yup";

const rodRules = /^[a-zA-Z]+$/;

export const UserProfileDetails = yup.object().shape({
  name: yup
    .string()
    .required("Morate unijeti ime")
    .min(3, { message: "Ime ne moze sadrzati manje od 3 znaka" })
    .max(24, { message: "Ime ne moze imati vise od 24 znaka" }),
  bio: yup
    .string()
    .min(150, { message: "Opis mora imati 150 znakova!" })
    .max(450, "Opis ne moze biti duzi od 450 znakova"),
  sex: yup
    .string()
    .matches(rodRules, { message: "Seksualnost ne moze biti broj!" }),
  rod: yup
    .string()
    .required("Morate navesti rod")
    .matches(rodRules, { message: "Rod ne moze biti broj!" }),
  lokacija: yup.string(),
  dob: yup
    .number()
    .required("Morate unijeti starosnu dob")
    .positive()
    .integer(),
});
