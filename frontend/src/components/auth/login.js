import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './login.css'
import { useNavigate } from 'react-router-dom';

function Login() {
	const navigate = useNavigate()
	const [userCredentials, setUserCredential] = useState({
		email: '',
		password: '',
		auth:false,
	});

	const handleChange = (event) => {
		const { name, value } = event.target;
		setUserCredential((prevState) => {
			return {
				...prevState,
				[name]: value,
			};
		});
	}

	const handleSubmit = async (event) => {
		event.preventDefault();
		const auth = {
			email: userCredentials.email,
			password: userCredentials.password
		}
		console.log(auth);
		axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
		axios.post('/login', auth).then((res) => {
			axios.defaults.headers.common = { 'Authorization': `Bearer ${res.data.token}` }
			setUserCredential({...userCredentials, auth:true});
			navigate('/')
		}).catch((error) => {
			console.log('this', error.response)
		});
	}

	useEffect(() => {
	  console.log('Auth:', userCredentials.auth)
	})
	

	const {email,password} = userCredentials;
	return (
		<div className="container">
			{/* <!-- Outer Row --> */}
			<div className="row justify-content-center">
				<div className="col-xl-10 col-lg-12 col-md-9">
					<div className="card o-hidden border-0 shadow-lg my-5">
						<div className="card-body p-0">
							{/* <!-- Nested Row within Card Body --> */}
							<div className="row">
								<div className="col-lg-6 d-none d-lg-block bg-login-image" ></div>
								{/* <div className="col-lg-6 d-none d-lg-block bg-login-image"></div> */}
								<div className="col-lg-6">
									<div className="p-5">
										<div className="text-center">
											<h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
										</div>
										<form className="user" onSubmit={handleSubmit}>
											<div className="form-group">
												<input type="email" name='email' onChange={handleChange} value={email} className="form-control form-control-user"
													id="email" aria-describedby="emailHelp"
													placeholder="Enter Email Address..." />
											</div>
											<div className="form-group">
												<input type="password" className="form-control form-control-user"
													id="password" name='password' onChange={handleChange} value={password} placeholder="Password" />
											</div>
											<div className="form-group">
												<div className="custom-control custom-checkbox small">
													<input type="checkbox" className="custom-control-input" id="customCheck" />
													<label className="custom-control-label" htmlFor="customCheck">Remember Me</label>
												</div>
											</div>
											<button className="btn btn-primary btn-user btn-block" type="submit"> Login</button>
											<hr />
											<a href="index.html" className="btn btn-google btn-user btn-block">
												<i className="fab fa-google fa-fw"></i> Login with Google
											</a>
											<a href="index.html" className="btn btn-facebook btn-user btn-block">
												<i className="fab fa-facebook-f fa-fw"></i> Login with Facebook
											</a>
										</form>
										<hr />
										{/* <button type="button" className="btn btn-primary" onClick={this.getCategory}>CLick</button> */}
										<div className="text-center">
											<a className="small" href="forgot-password.html">Forgot Password?</a>
										</div>
										<div className="text-center">
											<a className="small" href="register.html">Create an Account!</a>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

				</div>

			</div>

		</div>
	);
}

export default Login