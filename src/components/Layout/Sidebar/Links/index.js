import { Link } from 'react-router-dom';
import './Links.scss';
const links = [
  {
    to: 'svi-profili',
    text: 'svi profili',
  },
  {
    to: 'poruke',
    text: 'moje poruke',
  },
  {
    to: 'posjetitelji',
    text: 'moji posjetitelji',
  },
  {
    to: 'račun',
    text: 'moj račun',
  },
  {
    to: 'log-out',
    text: 'odjavi se',
  },
];

const Links = () => {
  return (
    <nav>
      <ul>
        {links.map((link, i) => (
          <li key={i}>
            <Link to={link.to}>{link.text}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Links;
