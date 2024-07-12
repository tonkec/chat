import './AuthLayout.scss';
import Logo from '../../../components/Layout/Sidebar/Logo';

const AuthLayout = ({ children }) => {
  return (
    <main className='main-auth'>
      <div className='main-auth-left'>
        <div className='flex flex-column justify-content-between h-full'>
          <div className='flex align-items-center'>
            <h1>Duga</h1>
            <Logo />
          </div>
          <div>
            <h4>
              Dating aplikacija za <br /> LGBTIQ osobe s Balkana.
            </h4>
            <p>
              Izradila{' '}
              <a
                href='https://github.com/tonkec'
                target='_blank'
                rel='noreferrer'
              >
                tonkec
              </a>
              . Contributaj ovdje.
            </p>
          </div>
        </div>
      </div>
      <div className='main-auth-right'>{children}</div>
    </main>
  );
};

export default AuthLayout;
