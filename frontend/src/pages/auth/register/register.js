import React, { useState, useEffect } from 'react';
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBIcon,
    MDBInput
}
    from 'mdb-react-ui-kit';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import useLocalStorage from '../../../hooks/useLocalStorage';
import { ToastContainer, toast } from 'react-toastify';
import Spinner from '../../Spinner/Spinner';

const Register = ({ userData }) => {

    const navigate = useNavigate();
    const [local, setlocal] = useLocalStorage('user');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (local) { navigate('/') }
    }, [local, navigate])

    const [form, setForm] = useState({ email: '', password: '', name: '', confirmPassword: '' });

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
        setLoading(true);
        if (form.password !== form.confirmPassword) {
            setLoading(false)
            toast("passwords does not match")
        }
        axios.post('http://localhost:5000/api/users/create', form, {withCredentials : true})
            .then(res => { setLoading(false); userData(res.data.user); setlocal(res.data.user) })
            .catch(err => { setLoading(false); toast(err.response.data.msg) });
    }

    return (
        <section>
            <ToastContainer />
            {loading && <Spinner cover={true} center={true} bg={"white"} />}
            <MDBContainer fluid>
                <MDBRow>

                    <MDBCol sm='6'>

                        <div className='d-flex flex-row ps-5 pt-5'>
                            <MDBIcon fas icon="crow fa-3x me-3" style={{ color: '#709085' }} />
                            <span className="h1 fw-bold mb-0">Logo</span>
                        </div>

                        <div className='d-flex flex-column justify-content-center h-custom-2 w-75 pt-4'>

                            <h3 className="fw-normal mb-3 ps-5 pb-3" style={{ letterSpacing: '1px' }}>Sign Up</h3>

                            <MDBInput wrapperClass='mb-4 mx-5 w-100' label='User Name' id='formControlLg' type='text' size="lg" name='name' onChange={handleChange} />

                            <MDBInput wrapperClass='mb-4 mx-5 w-100' label='Email address' id='formControlLg' type='email' size="lg" name='email' onChange={handleChange} />
                            <MDBInput wrapperClass='mb-4 mx-5 w-100' label='Password' id='formControlLg' type='password' size="lg" name='password' onChange={handleChange} />

                            <MDBInput wrapperClass='mb-4 mx-5 w-100' label='Confirm Password' id='formControlLg' type='password' size="lg" name='confirmPassword' onChange={handleChange} />

                            <MDBBtn className="mb-4 px-5 mx-5 w-100" color='info' size='lg' onClick={handleSubmit}>Sign Up</MDBBtn>
                            <p className='ms-5'>Already have an Account? <Link to={"/"} className="link-info">Login here</Link></p>

                        </div>

                    </MDBCol>

                    <MDBCol sm='6' className='d-none d-sm-block px-0' style={{ height: "100vh" }}>
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img3.webp"
                            alt="Login.." className="w-100 h-100" style={{ objectFit: 'cover', objectPosition: 'left' }} />
                    </MDBCol>

                </MDBRow>

            </MDBContainer>
        </section>
    )
}

export default Register;