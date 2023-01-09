import React, { useState } from 'react';
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBIcon,
    MDBInput
}
    from 'mdb-react-ui-kit';
import { Link } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import Spinner from '../../Spinner/Spinner';
import useLocalStorage from '../../../hooks/useLocalStorage';

const Login = ({ userData }) => {
    const [, setLocal] = useLocalStorage('user');
    const [form, setForm] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => {
            return ({
                ...prev,
                [name]: type === 'checkbox' ? checked : value
            })
        })
    }

    const handleSubmit = (e) => {
        setLoading(true)
        axios.post('http://localhost:5000/api/users/login', form, { withCredentials: true })
            .then(res => { setLoading(false);setLocal(res.data.user);userData(res.data.user);})
            .catch(err => {console.log(err);setLoading(false); toast(err.response.data.msg); setForm({ email: '', password: '' }) });
    }

    return (
        <section>
            {loading && <Spinner cover={true} center={true} bg={"white"} />}
            <ToastContainer />
            <MDBContainer fluid>
                <MDBRow>

                    <MDBCol sm='6'>

                        <div className='d-flex flex-row ps-5 pt-5'>
                            <MDBIcon fas icon="crow fa-3x me-3" style={{ color: '#709085' }} />
                            <span className="h1 fw-bold mb-0">Logo</span>
                        </div>

                        <div className='d-flex flex-column justify-content-center h-custom-2 w-75 pt-4'>

                            <h3 className="fw-normal mb-3 ps-5 pb-3" style={{ letterSpacing: '1px' }}>Log in</h3>

                            <MDBInput wrapperClass='mb-4 mx-5 w-100' label='Email address' id='formControlLg' type='email' size="lg" name='email' onChange={handleChange} value={form.email} />
                            <MDBInput wrapperClass='mb-4 mx-5 w-100' label='Password' id='formControlLg' type='password' size="lg" name="password" onChange={handleChange} value={form.password}/>

                            <MDBBtn className="mb-4 px-5 mx-5 w-100" color='info' size='lg' onClick={handleSubmit}>LOGIN</MDBBtn>
                            <p className="small mb-5 pb-lg-3 ms-5"><a className="text-muted" href="#!">Forgot password?</a></p>
                            <p className='ms-5'>Don't have an account? <Link to={'/register'} className="link-info">Register here</Link></p>

                        </div>

                    </MDBCol>

                    <MDBCol sm='6' className='d-none d-sm-block px-0' style={{ height: "100vh" }}>
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img3.webp" alt='Loading'
                            className="w-100 h-100" style={{ objectFit: 'cover', objectPosition: 'left' }} />
                    </MDBCol>

                </MDBRow>

            </MDBContainer>
        </section>
    )
}

export default Login