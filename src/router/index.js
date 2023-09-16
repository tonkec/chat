import Login from './../components/auth/Login';
import Register from './../components/auth/Register';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NotFound from './../components/NotFound';
import ProtectedRoute from './ProtectedRoute';
import ForgotPassword from './../components/auth/ForgotPassword';
import ResetPassword from '../components/auth/ResetPassword';
import HomePage from '../pages/HomePage';
import MessagesPage from '../pages/MessagesPage';
import MessagePage from '../pages/MessagePage';
import AllProfilesPage from '../pages/AllProfilesPage';
import UserPage from '../pages/UserPage';
import ProfilePage from '../pages/ProfilePage';

const RoutesComponent = () => (
  <Router>
    <Routes>
      <Route exact path='/' element={<ProtectedRoute />}>
        <Route exact path='/' element={<HomePage />} />
      </Route>
      <Route exact path='/' element={<ProtectedRoute />}>
        <Route path='/poruka/:id' element={<MessagePage />} />
      </Route>
      <Route exact path='/' element={<ProtectedRoute />}>
        <Route path='/poruke' element={<MessagesPage />} />
      </Route>
      <Route exact path='/' element={<ProtectedRoute />}>
        <Route path='/user/:id' element={<UserPage />} />
      </Route>
      <Route exact path='/' element={<ProtectedRoute />}>
        <Route path='/svi-profili' element={<AllProfilesPage />} />
      </Route>
      <Route exact path='/' element={<ProtectedRoute />}>
        <Route path='/profil' element={<ProfilePage />} />
      </Route>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />
      <Route path='/reset-password' element={<ResetPassword />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  </Router>
);

export default RoutesComponent;
