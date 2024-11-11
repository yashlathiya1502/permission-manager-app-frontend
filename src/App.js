import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './screen/login';
import Home from './screen/home';
import AuthRestrictedRoute from './router/AuthRestrictedRoute';
import Signup from './screen/signup';
import ProtectedRoute from './router/ProtectedRoute';
import Header from './components/common/Header';
import RolesPage from './screen/roles';
import UsersPage from './screen/users';

function App() {
  return (
    <>
    <Header/>
      <Routes>
        <Route element={<AuthRestrictedRoute />}>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/users' element={<UsersPage />} />
          <Route path='/roles' element={<RolesPage />} />

        </Route>
      </Routes>
    </>
  );
}

export default App;
