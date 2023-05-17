import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from 'react-router-dom';
import Home from './pages/home';
import Signup from './pages/signup';
import Login from './pages/login';
import Users from './pages/users';
import Layout from './components/Layout';
import Profile from './pages/profile';
import UserProfile from './pages/userprofile';
import { useContextState } from './hooks/useContextState';
import { useEffect } from 'react';

function App() {
  const { user } = useContextState();

  return (
    <div className="App">
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={<Profile />} />
            <Route
              path="/signup"
              element={user ? <Navigate to="/" /> : <Signup />}
            />
            <Route
              path="/login"
              element={user ? <Navigate to="/" /> : <Login />}
            />
            <Route
              path="/profile"
              element={user ? <UserProfile /> : <Navigate to="/signup" />}
            />
          </Routes>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
