export default function IsEmailValid(email) {
  const emailFormat =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return email.length > 1 && email.match(emailFormat) ? true : false;
}
