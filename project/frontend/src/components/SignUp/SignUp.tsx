import React, { useState } from 'react';
import './SignUp.scss';
import MusicraveLogo from '../../assets/svg/Musicrave';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import { Link, useNavigate } from 'react-router-dom';

const SignUp: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [serverError, setServerError] = useState('');

    const navigate = useNavigate(); // Додано для навігації

    const validateEmail = (value: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
    };

    const validatePassword = (value: string) => {
        return value.length >= 8;
    };

    const handleEmailChange = (value: string) => {
        setEmail(value);
        if (isSubmitted && !value) {
            setEmailError('');
        }
    };

    const handlePasswordChange = (value: string) => {
        setPassword(value);
        if (isSubmitted && !value) {
            setPasswordError('');
        }
    };

    const handleConfirmPasswordChange = (value: string) => {
        setConfirmPassword(value);
        if (isSubmitted && !value) {
            setConfirmPasswordError('');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);

        let valid = true;

        if (!validateEmail(email)) {
            setEmailError('Invalid email format. Example: test@email.com');
            valid = false;
        } else {
            setEmailError('');
        }

        if (!validatePassword(password)) {
            setPasswordError('Password must be at least 8 characters');
            valid = false;
        } else {
            setPasswordError('');
        }

        if (password !== confirmPassword) {
            setConfirmPasswordError('Passwords do not match');
            valid = false;
        } else {
            setConfirmPasswordError('');
        }

        if (valid) {
            try {
                const response = await fetch('http://127.0.0.1:8000/users/register/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: new URLSearchParams({
                        email: email,
                        password: password,
                    }).toString(),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    setServerError(errorData.message || 'Something went wrong');
                } else {
                    const data = await response.json();
                    console.log('SignUp Successful:', data);
                    sessionStorage.setItem('user_id', data.user_id);
                    navigate('/discover');
                }
            } catch (error) {
                setServerError('Network error. Please try again later.');
                console.error('Error during sign-up:', error);
            }
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-background"></div>
            <div className="signup-form-container">
                <div className="signup-logo">
                    <MusicraveLogo />
                </div>
                <h1>Welcome to Musicrave</h1>
                <form className="signup-form" onSubmit={handleSubmit} autoComplete="off">
                    <div className="input-group">
                        <Input
                            label="Email"
                            id="email"
                            value={email}
                            setValue={handleEmailChange}
                            type="text"
                            autoComplete="none"
                            error={isSubmitted ? emailError : undefined}
                        />
                        {isSubmitted && emailError && <p className="error-message">{emailError}</p>}
                    </div>
                    <div className="input-group">
                        <Input
                            label="Password"
                            id="password"
                            value={password}
                            setValue={handlePasswordChange}
                            type="password"
                            autoComplete="none"
                            error={isSubmitted ? passwordError : undefined}
                        />
                        {isSubmitted && passwordError && <p className="error-message">{passwordError}</p>}
                    </div>
                    <div className="input-group">
                        <Input
                            label="Confirm Password"
                            id="confirm-password"
                            value={confirmPassword}
                            setValue={handleConfirmPasswordChange}
                            type="password"
                            autoComplete="none"
                            error={isSubmitted ? confirmPasswordError : undefined}
                        />
                        {isSubmitted && confirmPasswordError && (
                            <p className="error-message">{confirmPasswordError}</p>
                        )}
                    </div>
                    <Button text="SIGN UP" onClick={() => handleSubmit} />
                </form>
                <div className="login-link">
                    <Link to="/login">Already have an account? Login</Link>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
