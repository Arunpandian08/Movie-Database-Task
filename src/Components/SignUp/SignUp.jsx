import React, { useEffect, useState } from 'react';
import './signUp.css';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase/firebase';
import SigninWithGoogle from '../SigninWithGoogle/SigninWithGoogle';

const SignUp = ({ setIsAuthenticated }) => {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors }, watch } = useForm()
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('');

  const onSubmit = async (data) => {
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      setIsAuthenticated(true)
      setToastMessage('Registration successful!');
      setToastType('success');
      setShowToast(true);
      navigate('/')
    } catch (error) {
      console.error('Registration Error:',error);
      setToastMessage(error.message);
      setToastType('error'); 
      setShowToast(true);
    }
  }
  return (
    <div className="sign-up-container">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="text-center">
          <h2 style={{ fontWeight: 800 }}>Sign Up</h2>
        </div>
        <div className="flex-column">
          <label>Name</label>
        </div>
        <div className="inputForm">
          <i className="bi bi-person-lines-fill"></i>
          <input
            type="text"
            className="input"
            placeholder="Enter your Name"
            autoComplete='true'
            {...register('name', { required: 'Name is required' })}
          />
        </div>
        {errors.name && <p className='text-danger mb-0'>{errors.name.message}</p>}
        <div className="flex-column">
          <label>Email</label>
        </div>
        <div className="inputForm">
          <svg
            height="20"
            width="20"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455ZM16 21a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6Z" />
          </svg>
          <input
            type="email"
            className="input"
            placeholder="Enter your Email"
            autoComplete='true'
            {...register('email', {
              required: 'Email is Required',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'Invalid email address'
              }
            })}
          />
        </div>
        {errors.email && <p className='text-danger mb-0'>{errors.email.message}</p>}
        <div className="flex-column">
          <label>Password</label>
        </div>
        <div className="inputForm">
          <svg
            height="20"
            width="20"
            viewBox="-64 0 512 512"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M336 512H48c-26.453 0-48-21.523-48-48v-224c0-26.477 21.547-48 48-48h288c26.453 0 48 21.523 48 48v224c0 26.477-21.547 48-48 48ZM48 224c-8.813 0-16 7.168-16 16v224c0 8.832 7.188 16 16 16h288c8.813 0 16-7.168 16-16V240c0-8.832-7.188-16-16-16Zm0 0" />
            <path d="M304 224c-8.832 0-16-7.168-16-16v-80c0-52.93-43.07-96-96-96s-96 43.07-96 96v80c0 8.832-7.168 16-16 16s-16-7.168-16-16v-80C64 57.406 121.406 0 192 0s128 57.406 128 128v80c0 8.832-7.168 16-16 16Zm0 0" />
          </svg>
          <input 
          type="password" 
          className="input" 
          placeholder="Enter your Password"
          autoComplete='true'
          {...register('password',{
            required:'Password is Required',
            minLength:{value:8,message:'Password must be at least 6 characters'},
            pattern:{
              value:/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/,
              message:'Password must contain at least one uppercase letter, one number, and one special character'
            }
          })}
           />
        </div>
        {errors.password && <p className='text-danger mb-0'>{errors.password.message}</p>}
        <div className="flex-column">
          <label>Confirm Password</label>
        </div>
        <div className="inputForm">
          <svg
            height="20"
            width="20"
            viewBox="-64 0 512 512"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M336 512H48c-26.453 0-48-21.523-48-48v-224c0-26.477 21.547-48 48-48h288c26.453 0 48 21.523 48 48v224c0 26.477-21.547 48-48 48ZM48 224c-8.813 0-16 7.168-16 16v224c0 8.832 7.188 16 16 16h288c8.813 0 16-7.168 16-16V240c0-8.832-7.188-16-16-16Zm0 0" />
            <path d="M304 224c-8.832 0-16-7.168-16-16v-80c0-52.93-43.07-96-96-96s-96 43.07-96 96v80c0 8.832-7.168 16-16 16s-16-7.168-16-16v-80C64 57.406 121.406 0 192 0s128 57.406 128 128v80c0 8.832-7.168 16-16 16Zm0 0" />
          </svg>
          <input 
          type="password" 
          className="input" 
          placeholder="Enter same Password"
          autoComplete='true'
          {...register('confirmPassword', {
            required: 'Please confirm your password',
            validate: (value) => value === watch('password') || 'Passwords do not match'
          })}
          />
        </div>
          {errors.confirmPassword && <p className="text-danger mb-0">{errors.confirmPassword.message}</p>}
        <button className="button-submit" type='submit'>Sign up</button>
        <p className="p" >
          If you have an account?
          <span className="span"
            onClick={() => navigate('/signin')}
          >Sign In</span>
        </p>
        <p className="p-line text-center">-Or With-</p>
        <SigninWithGoogle setIsAuthenticated={setIsAuthenticated} />
      </form>

      <div className={`toast ${showToast ? 'show' : ''}`} style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 1050 }}>
        <div className={`toast-header ${toastType === 'success' ? 'bg-success text-white' : 'bg-danger text-white'}`}>
          <strong className="mr-auto">{toastType === 'success' ? 'Success' : 'Error'}</strong>
          <button type="button" className="ml-2 mb-1 close" onClick={() => setShowToast(false)}>
            <span>&times;</span>
          </button>
        </div>
        <div className="toast-body bg-black text-white">
          {toastMessage}
        </div>
      </div>
    </div>
  );
};
export default SignUp