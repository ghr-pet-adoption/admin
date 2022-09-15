import React, { useState } from 'react';
import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom'
import HomePage from './components/HomePage';
import SignInPage from './components/SignInPage';
import { ToastContainer } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import { AxiosResponse } from 'axios';
import BackendAPI from './backendApi/BackendAPI';
import { showSuccessToast } from './components/ToastNotification';
import { AdminModel } from './Models/TypeModels';
import SignUpPage from './components/SignUpPage';

function App() {


  const navigate = useNavigate();
  const [admin, setAdmin] = useState<AdminModel | {}>({})

  const onLogin = (email: string, password: string) => {
    BackendAPI.admin.login({ email, password })
      .then((res) => {
        if (res.status === 200) {
          res = res as AxiosResponse;

          let userToken = {
            type: res.data.token_type,
            value: res.data.access_token
          }
          setAdmin({
            id:res.data.id,
            name:res.data.name,
            email:res.data.email
          })
          localStorage.setItem("userToken", JSON.stringify(userToken))
          navigate("/success");
        } else {
          console.log(res)
          showSuccessToast("Invalid login credentials!");
          alert("Invalid login credentials!")
        }
      })
  }
  const onSignUp = (admin:AdminModel) =>{

  }

  return (
    <div className="App">
      <ToastContainer />
      <Routes>
        <Route path='/' element={<SignInPage onLogin={onLogin} />} />
        <Route path='/signup' element={<SignUpPage onSignUp={onSignUp} />} />
        <Route path="/success/*" element={<HomePage admin={admin} />} />
      </Routes>

    </div>
  );
}

export default App;
