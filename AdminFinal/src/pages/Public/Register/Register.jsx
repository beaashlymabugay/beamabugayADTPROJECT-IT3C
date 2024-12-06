import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './register.css';
import axios from 'axios';

function Register() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    middleName: '',
    contactNo: '',
    role: 'user',
  });
  const [status, setStatus] = useState('idle');
  const [isFieldsDirty, setIsFieldsDirty] = useState(false);
  const [errorMessages, setErrorMessages] = useState({});
  const navigate = useNavigate();

  const handleOnChange = (event) => {
    setIsFieldsDirty(true);
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleRegister = async () => {
    if (formData.email && formData.password && formData.firstName && formData.lastName && formData.contactNo) {
      setStatus('loading');
      setErrorMessages({});
      try {
        await axios.post('/admin/register', formData, {
          headers: { 'Content-Type': 'application/json' },
        });

        setStatus('success');
        alert('User registered successfully');

        setTimeout(async () => {
          try {
            const res = await axios.post('/admin/login', {
              email: formData.email,
              password: formData.password,
            });
            localStorage.setItem('accessToken', res.data.access_token);
            navigate('/main/movies');
          } catch (e) {
            console.error(e);
          } finally {
            setStatus('idle');
          }
        }, 2000);
      } catch (error) {
        console.error(error);
        setStatus('error');
        alert('Failed to register');
      }
    } else {
      setIsFieldsDirty(true);
      setErrorMessages({
        email: !formData.email ? 'Email is required' : '',
        password: !formData.password ? 'Password is required' : '',
        firstName: !formData.firstName ? 'First Name is required' : '',
        lastName: !formData.lastName ? 'Last Name is required' : '',
        contactNo: !formData.contactNo ? 'Contact Number is required' : '',
      });
    }
  };

  return (
    <div className="Register">
      <div className="main-container">
        <h3>Sign Up</h3>
        <form>
          <div className="form-containerg">
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleOnChange}
                required
                disabled={status === 'loading'}
              />
              {errorMessages.email && <span className="error">{errorMessages.email}</span>}
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleOnChange}
                required
                disabled={status === 'loading'}
              />
              {errorMessages.password && <span className="error">{errorMessages.password}</span>}
            </div>
            <div className="form-group">
              <label>First Name:</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleOnChange}
                required
                disabled={status === 'loading'}
              />
              {errorMessages.firstName && <span className="error">{errorMessages.firstName}</span>}
            </div>
            <div className="form-group">
              <label>Last Name:</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleOnChange}
                required
                disabled={status === 'loading'}
              />
              {errorMessages.lastName && <span className="error">{errorMessages.lastName}</span>}
            </div>
            <div className="form-group">
              <label>Middle Name:</label>
              <input
                type="text"
                name="middleName"
                value={formData.middleName}
                onChange={handleOnChange}
                disabled={status === 'loading'}
              />
            </div>
            <div className="form-group">
              <label>Contact No:</label>
              <input
                type="text"
                name="contactNo"
                value={formData.contactNo}
                onChange={handleOnChange}
                required
                disabled={status === 'loading'}
              />
              {errorMessages.contactNo && <span className="error">{errorMessages.contactNo}</span>}
            </div>
            <div className="submit-container">
              <button
                className="btn-register"
                type="button"
                onClick={handleRegister}
                disabled={status === 'loading'}
              >
                {status === 'loading' ? 'Loading...' : 'Register'}
              </button>
            </div>
            <div className="reg-container">
              <small>Already have an account? </small>
              <a href="/">
                <small>Log In</small>
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
