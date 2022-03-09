import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './login.css'
import { useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../useAuth';

const Login = () => {
	const { setAuth } = useAuth();
	const location = useLocation();
	const navigate = useNavigate();
	const from = location.state?.from?.pathname || "/";

	const [userCredentials, setUserCredential] = useState({
		email: '',
		password: '',
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
		try {
			event.preventDefault();
			const auth = {
				email: userCredentials.email,
				password: userCredentials.password
			}
			axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

			const response = await axios.post('/login', auth)
			// console.log(response.data);
			const token = response?.data?.token.token
			const user = response?.data?.user
			axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` };

			const staff = await axios.get('/isStaff')
			const staffdata = staff?.data?.data
			setAuth({ user, token, staffdata });
			navigate(from, { replace: true });
			console.log('complete');
		} catch (error) {
			console.log(error.message);
		}

	};

	useEffect(() => {
		console.log("change");
	});

	const { email, password } = userCredentials;
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