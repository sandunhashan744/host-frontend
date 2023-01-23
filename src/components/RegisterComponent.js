import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import registerAvatar from '../assets/register.png'
import styles from '../styles/login.module.css'
import toast, {Toaster} from 'react-hot-toast'
import { useFormik } from 'formik'
import { registerSchema } from '../validations/registerValidation' 
import {registerUser} from '../helper/helper'

const RegisterComponent = () => {

  const navigate = useNavigate();

  const {values, errors, touched, handleBlur, handleChange, handleSubmit} = useFormik({
    initialValues : {
      firstName : '',
      lastName : '',
      telegram : '',
      metaTrade : '',
      email : '',
      password : '',
      confirm_password : ''
    },
    validationSchema: registerSchema,
    onSubmit : async values => {  
      let registerPromise = registerUser(values);

      toast.promise(registerPromise, {
        loading : 'Creating...',
        success : <b>Register Successfully.🙂</b>,
        error : <b>Couldn't Register.😟</b>
      });
      registerPromise.catch(function(error){
        
      })

      registerPromise.then(function(){ navigate('/')});

    }
  })

  return (
    <div className='container mx-auto'>
      {/* toast message */}
      <Toaster position='top-center' reverseOrder={false} />
      
      <div className='flex justify-center items-center h-screen'>
        <div className={styles.glass}>
          <div className='title flex flex-col items-center'>
            <h4 className='text-xl md:text-3xl font-bold'>Register Here</h4>
            <span className='py-1 mb-2 md:text-xl text-base w-2/3 text-center text-slate-200'>
               Happy to Join with us.
            </span>
          </div>

          <div className='profile flex justify-center'>
              <img src={registerAvatar} className={styles.register_img}  />
          </div>

          <form className='py-0' autoComplete='off' onSubmit={handleSubmit} >
            
            <div className='textbox grid grid-col gap-2 md:text-center text-center px-2 md:px-4 '>

              <div className='grid grid-cols md:grid-cols-2 gap-2'>
                <div className={styles.textbox_container}>
                    <input 
                      value={values.firstName}
                      onChange={handleChange}
                      className={errors.firstName && touched.firstName ? `${styles.input_error}` : `${styles.textbox}`} 
                      type="text" 
                      id="firstName" 
                      placeholder='First Name'
                      onBlur={handleBlur}
                    />
                    {errors.firstName && touched.firstName && <p className={styles.error_msg}>{errors.firstName}</p>}
                </div>

                <div className={styles.textbox_container}>
                  <input 
                    value={values.lastName} 
                    onChange={handleChange}
                    className={errors.lastName && touched.lastName ? `${styles.input_error}` : `${styles.textbox}`} 
                    type="text" 
                    id="lastName" 
                    placeholder='Last Name' 
                    onBlur={handleBlur}
                  />
                  {errors.lastName && touched.lastName && <p className={styles.error_msg}>{errors.lastName}</p>}
                </div>
              </div>

              <div className='grid grid-cols md:grid-cols-2 md:gap-4 gap-2'>
                <div className={styles.textbox_container}>
                  <input
                    value={values.telegram} 
                    onChange={handleChange}
                    className={ errors.telegram && touched.telegram ? `${styles.input_error}`: `${styles.textbox}`}
                    type="text" 
                    id="telegram" 
                    placeholder='Telegrame No' 
                    onBlur={handleBlur}
                  />
                  {errors.telegram && touched.telegram && <p className={styles.error_msg}>{errors.telegram}</p>}
                </div>
                
                <div className={styles.textbox_container}>
                  <input 
                    value={values.metaTrade} 
                    onChange={handleChange}
                    className={errors.metaTrade && touched.metaTrade ? `${styles.input_error}` : `${styles.textbox}`}
                    type="text" 
                    id="metaTrade" 
                    placeholder='Mt 4 No' 
                    onBlur={handleBlur}
                  />
                  {errors.metaTrade && touched.metaTrade && <p className={styles.error_msg}>{errors.metaTrade}</p>}
                </div>
              </div>

              <div className={styles.textbox_container}>
                <input 
                  value={values.email}
                  onChange={handleChange}
                  className={errors.email && touched.email ? `${styles.input_error}` : `${styles.textbox}`}  
                  type="email" 
                  id="email" 
                  placeholder='Email'
                  onBlur={handleBlur} 
                />
              {errors.email && touched.email && <p className={styles.error_msg}>{errors.email}</p>}
              </div>
              
              <div className='grid grid-cols md:grid-cols-2 md:gap-4 gap-2'>
                <div className={styles.textbox_container}>
                  <input 
                    value={values.password} 
                    onChange={handleChange}
                    className={errors.password && touched.password ? `${styles.input_error}` : `${styles.textbox}`}  
                    type="password" 
                    id="password" 
                    placeholder='Password' 
                    onBlur={handleBlur}
                  />
                  {errors.password && touched.password && <p className={styles.error_msg}>{errors.password}</p>}
                </div>
                <div className={styles.textbox_container}>
                  <input 
                    value={values.confirm_password} 
                    onChange={handleChange}
                    className={errors.confirm_password && touched.confirm_password ? `${styles.input_error}` : `${styles.textbox}`}  
                    type="password" 
                    id="confirm_password" 
                    placeholder='Confirm Password'
                    onBlur={handleBlur}
                  />
                  {errors.confirm_password && touched.confirm_password && <p className={styles.error_msg}>{errors.confirm_password}</p>}
                </div>
              </div>
 
              <button className={styles.btn} type="submit">Register</button>
             
            </div>

            <div className='text-center py-2'>
              <span className='text-gray-900'>Alredy Registered <span> </span>
                <Link className='text-green-800 font-medium hover:font-bold ' to={"/"}>Login Now</Link>
              </span>
            </div>

          </form>

        </div>
      </div>
    </div>
  )
}

export default RegisterComponent