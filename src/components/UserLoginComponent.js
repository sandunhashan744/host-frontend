import React,{useRef} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import loginAvatar from '../assets/login.png'
import styles from '../styles/login.module.css'
import toast, { Toaster} from 'react-hot-toast'
import { useFormik } from 'formik'
import { loginSchema } from '../validations/loginValidation' 
import { login, getUser } from '../helper/helper'


const UserLoginComponent = () => {

  const inputRef = useRef(null);

  const navigate = useNavigate();

  // check the user name is Entered 
  const handleClick = () => {
    const email = inputRef.current.value 
    if(!email){

      toast.error('Email must be Required..!');
      inputRef.current.focus()

    }else{
      getUser({email})
      .then((user) => {
        if(user.status===404){
          toast.error('User Email is Invalied..!');
          inputRef.current.focus() 
        }
        else{
          localStorage.setItem('email', email);
          navigate('/recovery') 
        }
      })
      .catch(error =>{
        toast.error('User Not Founded..!');
      })
    }
  };

  const {values, errors, touched, handleBlur, handleChange, handleSubmit} = useFormik({
    initialValues : {
      email : '',
      password : ''
    },
    validationSchema: loginSchema,
    onSubmit : async values => {
      let loginPromise = login(values);
      toast.promise(loginPromise,{
        loading : 'loading...',
        success : <b>Login Successful..🙂👍</b>,
        error : <b>Login Error...😟👎</b>
      });

      loginPromise.then(res => {
        let {token} = res.data;
        localStorage.setItem('token', token);
        navigate('/new')
        //navigate('/profile')
      });
    }
  })

  return (
    <div className='container mx-auto'>
      {/* toast message */}
      <Toaster position='top-center' reverseOrder={false} />

      <div className='flex justify-center items-center h-screen'>
        <div className={styles.glass}>
          <div className='title flex flex-col items-center'>
            <h4 className='md:text-3xl text-xl font-bold'>welcome</h4>
            <span className='py-1 md:py-2 text-base md:text-xl w-2/3 text-center text-slate-200'>
              Explore More by connecting with us.
            </span>
          </div>

          <div className='profile flex justify-center my-0'>
              <img src={loginAvatar} className={styles.login_img} />
          </div>

          <form className='py-0' autoComplete='off' onSubmit={handleSubmit}>
            
            <div className='textbox flex flex-col items-center gap-3 md:gap-5 my-3'>
              
              <div className='w-3/4'> 
                <input 
                  value={values.email}
                  onChange={handleChange}
                  className={errors.email && touched.email ? `${styles.input_error}` : `${styles.login_text}`}  
                  type="text" 
                  id="email" 
                  placeholder='Enter Your Email'
                  onBlur={handleBlur}
                  ref={inputRef} 
                />
                {errors.email && touched.email && <p className={styles.error_msg}>{errors.email}</p>}
              </div>

              <div className='w-3/4'>  
                <input 
                  value={values.password}
                  onChange={handleChange}
                  className={errors.password && touched.password ? `${styles.input_error}` : `${styles.login_text}`}
                  type="password" 
                  id="password" 
                  placeholder='Password'
                  onBlur={handleBlur}
                />
                {errors.password && touched.password && <p className={styles.error_msg}>{errors.password}</p>}
              </div>
              <div className='w-3/4'> 
                <button className={styles.btn} type="submit">Sign In</button>  
              </div>
            </div>

            <div className='text-center py-2 '>
              <span className='text-gray-900'>Not a Member :<span> </span>
                <Link className='text-red-700 hover:font-bold ' to={"/register"}>Register Now</Link>
              </span>
            </div>

          </form>

          <div className='text-center -mt-2'>
            <button onClick={handleClick} className='text-blue-700 hover:font-bold py-1'>Forget Password</button>
          </div> 

        </div>
      </div>
    </div>
  )
}

export default UserLoginComponent