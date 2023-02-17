import React, { useEffect, useState, useRef }  from 'react'
import styles from '../styles/login.module.css'
import toast,{Toaster} from 'react-hot-toast'
import OTPImg from '../assets/OTPImg.png'
import { generateOTP, verifyOTP } from '../helper/helper'
import { useNavigate } from 'react-router-dom'



const RecoveryComponent = () => {

  const dataFetchedRef = useRef(false);

  //  Get the email
  const email = localStorage.getItem('email');

  const [OTP, setOTP] = useState();
  const navigate = useNavigate();

  useEffect(() => {

    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    resendOTP();

  }, [])

  async function onSubmit(e){
    e.preventDefault();
    try {
      let { status } = await verifyOTP({ email : email, code : OTP })
      if(status === 201){
        toast.success('Verify Successfully!')
        return navigate('/reset')
      }  
    } catch (error) {
      return toast.error('Wront OTP! Check email again!')
    }
  }

  // handler of resend OTP
  function resendOTP(){

    let sentPromise = generateOTP(email);

    toast.promise(sentPromise ,
      {
        loading: 'Sending...',
        success: <b>OTP has been send to your email!</b>,
        error: <b>Could not Send it!</b>,
      }
    );

    sentPromise.then((OTP) => {
      console.log(OTP)
    });
    
  }

  return (
    <div className='container mx-auto'>
      {/* toast message */}
      <Toaster position='top-center' reverseOrder={false} />

      <div className='flex justify-center items-center h-screen'>
        <div className={styles.glass}>
          <div className='title flex flex-col items-center'>
            <h4 className=' md:text-3xl text-xl font-bold'>OTP Verification</h4>
            <span className='py-1 md:py-2 md:text-xl text-base w-2/3 text-center text-slate-200'>
              Enter OTP to Reset Your Password.
            </span>
          </div>

          <div className='profile flex justify-center my-0'>
            <img src={OTPImg} className={styles.login_img} />
          </div>

          <form className='py-0' onSubmit={onSubmit} autoComplete='off' > 
          {/* onSubmit={handleSubmit} */}
            <div className='input text-center'>
              <samp className='text-center text-m text-gray-700'>
                Enter the 6 digit OTP 
              </samp>
                
              <div className='textbox flex flex-col items-center gap-3 py-2'>
                <div className='w-3/4'> 
                  <input 
                    onChange={(e) => setOTP(e.target.value) } 
                    className={styles.login_text} 
                    type="text" 
                    name="otp" 
                    placeholder='OTP'
                    autoComplete='off'
                  />
                </div>
                <div className='w-3/4'> 
                  <button className={styles.btn} type="submit">Recover</button>
                </div>
              </div>
            </div>
          </form>

          <div className='text-center py-2'>
              <span className='text-gray-900'>Can't Get OTP ?<span> </span>
                <button onClick={resendOTP} className='text-cyan-900 hover:font-bold'>Re-send</button>
              </span>
            </div>

        </div>
      </div>
    </div>
  )
}

export default RecoveryComponent