import * as yup from 'yup';

const rodRules = /^[a-zA-Z]+$/;

export const UserProfileDetails = yup.object().shape({
    name: yup
    .string()
    .required("Morate unijeti ime")
    .min(3, {message: 'Ime ne moze sadrzati manje od 3 karaktera'})
    .max(24, {message: 'Ime ne moze imati vise od 24 karaktera'}),
    bio: yup
    .string()
    .min(150, {message: 'Opis mora imati 150 karaktera!'})
    .max(450, 'Opis ne moze biti duzi od 450 karaktera'),
    sex: yup
    .string()
    .matches(rodRules, {message: 'Seksualnost ne mogu biti brojevi!'}),
    rod: yup
    .string()
    .required('Morate navesti rod').matches(rodRules, {message: 'Rod ne mogu biti brojevi!'}),
    lokacija: yup
    .string(),
    dob: yup.
    number().
    required("Morate unijeti starosnu dob")
    .positive()
    .integer()
})

export const MailVerificationSchema = yup.object().shape({
    mail: yup
    .string()
    .required('Morate unijeti vas email!')
    .email('Unesite validan email!'),
    password: yup
    .string()
    .required('Morate unijeti sifru!')
    .min(8, 'Sifra mora imati 8 karaktera ili vise!')
    .matches(/[0-9]/, 'Sifra mora sadrzati brojeve!')
    .matches(/[a-z]/, 'Sifra mora sadrzati mala slova!')
    .matches(/[A-Z]/, 'Sifra mora sadrzati velika slova!')
})

export const RegistrationSchema = yup.object().shape({
    mail: yup
    .string()
    .required('Morate unijeti vas email!')
    .email('Unesite validan email!'),
    name: yup
    .string()
    .required("Morate unijeti ime")
    .min(3, 'Ime ne moze sadrzati manje od 3 karaktera')
    .max(24, 'Ime ne moze imati vise od 24 karaktera'),
    lastName: yup
    .string()
    .required("Morate unijeti prezime")
    .min(3, 'Prezime ne moze sadrzati manje od 3 karaktera')
    .max(24, 'Prezime ne moze imati vise od 24 karaktera'),
    password: yup
    .string()
    .required('Morate unijeti sifru!')
    .min(8, 'Sifra mora imati 8 karaktera ili vise!')
    .matches(/[0-9]/, 'Sifra mora sadrzati brojeve!')
    .matches(/[a-z]/, 'Sifra mora sadrzati mala slova!')
    .matches(/[A-Z]/, 'Sifra mora sadrzati velika slova!')
})

export const ForgotPasswordSchema = yup.object().shape({
    mail: yup
    .string()
    .required('Morate unijeti vas email!')
    .email('Unesite validan email!'),
})

export const PasswordChangeSchema = yup.object().shape({
    password: yup
    .string()
    .required('Morate unijeti vasu novu sifru!')
    .min(8, 'Sifra mora imati 8 karaktera ili vise!')
    .matches(/[0-9]/, 'Sifra mora sadrzati brojeve!')
    .matches(/[a-z]/, 'Sifra mora sadrzati mala slova!')
    .matches(/[A-Z]/, 'Sifra mora sadrzati velika slova!'),
    passwordConfirm: yup
    .string()
    .required('Morate ponovo unijeti vasu novu sifru!')
    .oneOf([yup.ref('password'), null], 'Passwordi se moraju poklapati!')
})