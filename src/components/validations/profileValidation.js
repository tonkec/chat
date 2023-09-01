import * as yup from 'yup';

const rodRules = /^[a-zA-Z]+$/;

export const UserProfileDetails = yup.object().shape({
    name: yup.string().required("Morate unijeti ime")
    .min(3, {message: 'Ime ne moze sadrzati manje od 3 karaktera'})
    .max(24, {message: 'Ime ne moze imati vise od 24 karaktera'}),
    bio: yup.string()
    .min(150, {message: 'Opis mora imati 150 karaktera!'})
    .max(450, 'Opis ne moze biti duzi od 450 karaktera'),
    sex: yup.string().matches(rodRules, {message: 'Seksualnost ne mogu biti brojevi!'}),
    rod: yup.string().required('Morate navesti rod').matches(rodRules, {message: 'Rod ne mogu biti brojevi!'}),
    lokacija: yup.string(),
    dob: yup.number().required("Morate unijeti starosnu dob").positive().integer()
})