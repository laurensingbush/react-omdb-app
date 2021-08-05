import React from 'react';
import { BiErrorCircle } from 'react-icons/bi';
import { useForm } from '../../hooks/useForm';
import { useAuth } from '../../hooks/useAuth';

const LoginPage = () => {
    const { loginUser, error, setError } = useAuth();
    const { values, handleChange, handleSubmit } = useForm({
        email: '',
        password: ''
    }, loginUser);

    const resetServerError = () => {
        setError('');
    };

    return (
        <div className='login-form-container'>
            <h2>Log In</h2>
            <form onSubmit={handleSubmit} aria-label='login form'>
                <div className='form-item'>
                    <label htmlFor='email'>Email</label>
                    <input
                        type='text'
                        aria-label='email input'
                        id='email'
                        placeholder='Email'
                        name='email'
                        value={values.email}
                        onChange={(e) => {handleChange(e); resetServerError()}}
                        className={error ? 'input-error' : ''} 
                    />
                </div>
                <div className='form-item'>
                    <label htmlFor='password'>Password</label>
                    <input 
                        type='password'
                        aria-label='password input'
                        id='password'
                        placeholder='Password'
                        name='password'
                        value={values.password}
                        onChange={(e) => {handleChange(e); resetServerError()}}
                        autoComplete='off'
                        className={error ? 'input-error' : ''}
                    />
                    <div className={error ? 'input-error-feedback show' : 'input-error-feedback'}>
                        <BiErrorCircle className='error-icon' />
                        {error}
                    </div>
                </div>
                 <div className='form-item'>
                    <button onClick={handleSubmit} className='submit-btn' aria-label='submit'>
                        Log In
                    </button>
                </div>
                <div className='form-item form-redirect'>
                    New user?
                    <a href="/register">Create an account</a>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;