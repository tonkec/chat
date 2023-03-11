import './Error.scss';

export default function ErrorMessage({ error }) {
  return <h5 className="error-message">{error}</h5>;
}
