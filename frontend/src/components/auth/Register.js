import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './login.css'

function Register() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: '',
        confirmPassword:'',
    })
    const [disabledButton, setDisabledButton] = useState(true)
    const {
        firstName,
        lastName,
        email,
        username,
        password,
        confirmPassword,
    } = formData

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => {
            return {
                ...prevState,
                [name]: value,
            };
        });
    }

    const comparePassword=()=>{
        if (formData.confirmPassword === formData.password && formData.confirmPassword!=='' && formData.password!=='') {
            setDisabledButton(false)
        }else{
            setDisabledButton(true)
        }
    }

    useEffect(() => {
        comparePassword()
        return () =>{}
        
    })

    const handleSubmit = async (event) => {
		event.preventDefault();
		const data = {
            first_name:formData.firstName,
            last_name:formData.lastName,
            username:formData.username,
			email: formData.email,
			password: formData.password
		}
		axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
		axios.post('/register', data).then((res) => {
			navigate('/login')
		}).catch((error) => {
			console.log('this', error.response.data)
		});
	}

    return (
        <div className='register-form'>
            <div class="container">

                <div class="card o-hidden border-0 shadow-lg my-5">
                    <div class="card-body p-0">
                        {/* <!-- Nested Row within Card Body --> */}
                        <div class="row">
                            <div class="col-lg-5 d-none d-lg-block bg-register-image"></div>
                            <div class="col-lg-7">
                                <div class="p-5">
                                    <div class="text-center">
                                        <h1 class="h4 text-gray-900 mb-4">Create an Account!</h1>
                                    </div>
                                    <form class="user" onSubmit={handleSubmit}>
                                        <div class="form-group row">
                                            <div class="col-sm-3 mb-3 mb-sm-0">
                                                <input type="text" class="form-control form-control-user"  name="firstName"
                                                    placeholder="First Name" onChange={handleChange} value={firstName} required/>
                                            </div>
                                            <div class="col-sm-6">
                                                <input type="text" class="form-control form-control-user" name="lastName"
                                                    placeholder="Last Name" onChange={handleChange} value={lastName} required/>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <input type="email" class="form-control form-control-user" name="email"
                                                placeholder="Email Address" onChange={handleChange} value={email} required/>
                                        </div>
                                        <div class="form-group">
                                            <input type="text" class="form-control form-control-user" name="username"
                                                placeholder="Username" onChange={handleChange} value={username} required/>
                                        </div>
                                        <div class="form-group row">
                                            <div class="col-sm-6 mb-3 mb-sm-0">
                                                <input type="password" class="form-control form-control-user"
                                                    name="password" placeholder="Password" onChange={handleChange} value={password} required/>
                                            </div>
                                            <div class="col-sm-6">
                                                <input type="password" class="form-control form-control-user"
                                                    name="confirmPassword" placeholder="Repeat Password" onChange={handleChange} value={confirmPassword}/>
                                            </div>
                                        </div>
                                        <button type="submit" class="btn btn-primary btn-user btn-block" disabled={disabledButton} > Register Account</button>
                                    </form>
                                    <hr/>
                                        <div class="text-center">
                                            <a class="small" href="forgot-password.html">Forgot Password?</a>
                                        </div>
                                        <div class="text-center">
                                            <a class="small" href="login.html">Already have an account? Login!</a>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Register