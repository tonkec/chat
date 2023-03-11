import "./Error.css";

export default function ErrorMessage({ error }) {
  return <h5 className="errorMessage">{error}</h5>;
}
