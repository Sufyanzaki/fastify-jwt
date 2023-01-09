import './App.module.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/auth/login/login';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import 'react-toastify/dist/ReactToastify.css';
import Register from './pages/auth/register/register';
import Weather from './pages/weather';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

function App() {

  const [user, setUser] = useState(null);
  
  //grabbing user data from register or login
  const userData = useCallback((data) => {
    console.log(data)
    setUser(data)
  }, [])

  //check if user already exists
  useEffect(() => {
    axios.get('http://localhost:5000/api/users/me', { withCredentials: true })
      .then(res => {setUser(res.data.user)})
      .catch(err => console.log('No session detected'));
  }, [])

  return (
    <Router>
      <Routes>
        <Route exact path='/' element={user ? <Weather /> : <Login userData={userData} />} />
        <Route exact path='/register' element={<Register userData={userData}/>} />
      </Routes>
    </Router>
  );
}

export default App;
