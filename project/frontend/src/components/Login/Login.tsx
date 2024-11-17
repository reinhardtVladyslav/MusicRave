import React, { useState, useEffect } from 'react';
import './Login.scss';
import MusicraveLogo from '../../assets/svg/Musicrave';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import Eye from '../../assets/svg/EyeSVG';
import EyeSlash from '../../assets/svg/EyeSlashSVG';
import loginBackgroundImage from '../../assets/images/login_screen.gif';
import { Link } from 'react-router-dom';

interface LoginProps {
    onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

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

    const handleSubmit = (e: React.FormEvent) => {
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

        if (valid) {
            console.log('Email:', email, 'Password:', password);
            onLogin();
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="login-container">
            <div
                className="login-background"
                style={{ backgroundImage: `url(${loginBackgroundImage})` }}
            ></div>
            <div className="login-form-container">
                <div className="login-logo">
                    <MusicraveLogo />
                </div>
                <h1>Welcome to Musicrave</h1>
                <form className="login-form" onSubmit={handleSubmit} autoComplete="off">
                    <div className="input-group">
                        <Input
                            label="Email"
                            id="email"
                            value={email}
                            setValue={handleEmailChange}
                            type="text"
                            autoComplete="none"
                            error={isSubmitted ? emailError : undefined} // Застосовуємо умову для `string` або `undefined`
                        />
                        {isSubmitted && emailError && <p className="error-message">{emailError}</p>}
                    </div>
                    <div className="input-group">
                        <Link to={'/forgot-password'} className="forgot-password-above" > Forgot password?</Link>
                    </div>
                    <div className="input-group">
                        <Input
                            label="Password"
                            id="password"
                            value={password}
                            setValue={handlePasswordChange}
                            type={showPassword ? 'text' : 'password'}
                            autoComplete="none"
                            icon={
                                <span onClick={togglePasswordVisibility} style={{ cursor: 'pointer' }}>
                                    {showPassword ? <EyeSlash /> : <Eye />}
                                </span>
                            }
                            error={isSubmitted ? passwordError : undefined} // Застосовуємо умову для `string` або `undefined`
                        />
                        {isSubmitted && passwordError && <p className="error-message">{passwordError}</p>}
                    </div>
                    <Button text="LOGIN" onClick={() => handleSubmit} />
                </form>
                <div className="signup-link">
                    <Link to="/signup">Don't have an account? Sign up</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
