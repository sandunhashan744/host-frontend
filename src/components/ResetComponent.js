import React from 'react'
import styles from '../styles/login.module.css'
import toast,{Toaster} from 'react-hot-toast'
import { useFormik } from 'formik'

import resetImg from '../assets/resetImg.png'
import { resetPasswordValidate } from '../validations/loginValidation' 
import { useNavigate, Navigate } from 'react-router-dom'
import {resetPass} from '../helper/helper'


const ResetComponent = () => {

  const email = localStorage.getItem('email');
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues : {
      password : '',
      confirm_pass : ''
    },
    //validate:resetPasswordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit : async values => {
      let resetPromise = resetPass({ email, password: values.password })

      toast.promise(resetPromise, {
        loading: 'Updating...',
        success: <b>Reset Successfully...!</b>,
        error : <b>Could not Reset!</b>
      });
       navigate('/')
    }
  })

  return (
    <div className='container mx-auto'>
      {/* toast message */}
      <Toaster position='top-center' reverseOrder={false} />
      <div className='flex justify-center items-center h-screen'>
        <div className={styles.glass}>
          <div className='title flex flex-col items-center'>
            <h4 className='md:text-3xl text-xl font-bold'>New Password</h4>
            <span className='md:py-3 py-1 md:text-xl text-lg w-2/3 text-center text-slate-200'>
              Enter Your New Password.
            </span>
          </div>

          <div className='profile flex justify-center my-0'>
            <img src={resetImg} className={styles.login_img} />
          </div>

          <form className='py-0' onSubmit={formik.handleSubmit}>
            
            <div className='textbox flex flex-col items-center gap-3 md:gap-5 my-3'>
              
              <div className='w-3/4'>
                <input 
                  {...formik.getFieldProps('password')} 
                  className={styles.login_text} 
                  type="text" 
                  name="password" 
                  placeholder='New Password' 
                />
              </div>
              
              <div className='w-3/4'>
                <input 
                  {...formik.getFieldProps('confirm_pass')} 
                  className={styles.login_text} 
                  type="password" 
                  name="confirm_pass" 
                  placeholder='Confirm Password' 
                />
              </div>

              <button className={styles.btn} type="submit">Confirm</button>
            </div>

          </form>

        </div>
      </div>
    </div>
  )
}

export default ResetComponent

