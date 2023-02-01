import React,{useState, useEffect} from 'react'
import styles from '../styles/login.module.css'
import Prostyles from '../styles/profile.module.css'
import avatar from '../assets/avatar.png'
import updateImg from '../assets/update.png'
import settingImg from '../assets/settings.png'
import { FiMoon } from 'react-icons/fi';
import { BsSun } from 'react-icons/bs';

import toast,{Toaster} from 'react-hot-toast'
import { useFormik } from 'formik'
import convetBase64 from '../helper/convert'
import useFetch from '../hook/featch-hook'
import {updateUser} from '../helper/helper'
import { useNavigate } from 'react-router-dom'

//BsSun

const NewProfile = () => {
    
    const chkTheam = localStorage.getItem('theam')

    const [theam, setTheam] = useState(chkTheam || '');

    useEffect(() => {
        localStorage.setItem('theam', theam);
      }, []);

    const darkChange=()=>{
        localStorage.setItem('theam', 'dark')
        setTheam('dark');
    }
    const lightChange=()=>{
        localStorage.removeItem('theam')
        setTheam('');
    }

    // profile
    const navigate = useNavigate();

  const [file, setFile] = useState();
  const [{ isLoading, apiData, serverError }] = useFetch();
  
  const formik = useFormik({
    initialValues : {
      firstName : apiData?.firstName || '' ,
      lastName : apiData?.lastName || '',
      telegram : apiData?.telegram || '',
      metaTrade : apiData?.metaTrade || '',
      email : apiData?.email || ''
    },
    enableReinitialize: true,
    //validate:profileValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit : async values => {
      values = await Object.assign(values, {profile: apiData?.profile || file || ''})
      
      let udateUserPromise = updateUser(values);
      console.log(udateUserPromise)
      
      toast.promise(udateUserPromise,{
        loading : 'Updating...',
        success : <b>Update Successful..🙂👍</b>,
        error : <b>Updating Error...😟👎</b>
      });
    }
  })

  // for image upload
  const onUpload = async e =>{
    const base64 = await convetBase64(e.target.files[0]);
    setFile(base64);
  }

  // logout handler
  const userLogout = () =>{
    localStorage.removeItem('token');
    navigate('/')
    
  }

  if(isLoading) return <h1 className='text-2xl font-bold'>isLoading</h1>;
  if(serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>

  return (
    <div className='container mx-auto '>

      {/* toast message */}
      <Toaster position='top-center' reverseOrder={false} />

        <div className='grid items-center mx-5 min-h-screen my-2 '>
            <div className={theam ? `${Prostyles.dark}` : `${styles.glass}`}>
                <div className='grid grid-cols-1 md:grid-cols-4 gap-8 mx-5 md:mx-10'>

                    {/* Profile */}
                    <div className='bg-transparent rounded-3xl shadow-2xl'>
                        
                        <div className='profile grid justify-center mx-auto my-5'>
                            <h3 className={Prostyles.titel}>Profile</h3>
                            <label htmlFor="profile">
                                <img src={avatar} className={styles.profile_img} alt="avatar"/>
                            </label>
                            <input type="file" id='profile' name='profile' />
                        </div>
                        <div className='profile grid justify-center mx-auto my-5'>
                            <label className='my-1 text-base font-bold'>Name : <span className='font-normal text-base'>{apiData?.firstName+' '+apiData?.lastName || ''}</span></label>
                            <label className='my-1 text-base font-bold'>Email : <span className='font-normal text-base'>{apiData?.email || ''}</span></label>
                            <label className='my-1 text-base font-bold'>Telegram : <span className='font-normal text-base'>{apiData?.telegram || ''}</span></label>
                            <label className='my-1 text-base font-bold'>MetaTrade No : <span className='font-normal text-base'>{apiData?.metaTrade || ''}</span></label>
                            
                            <div className='flex justify-center'>
                                <button className={Prostyles.pro_lgoutbtn} onClick={userLogout}>Log out</button>
                            </div>
                        </div>
                        
                    </div>

                    {/* Update Deatail */}
                    <div className=' bg-transparent rounded-xl shadow-2xl md:col-span-2 md:row-span-2'>
                        
                        <div className='profile grid justify-center mx-auto my-5'>
                        
                            <h3 className={Prostyles.titel}>Update Profile</h3>

                            <div className='profile flex justify-center my-0'>
                                <img src={updateImg} className={styles.login_img} />
                            </div>

                            <form className='py-3 md:py-5' autoComplete='off' onSubmit={formik.handleSubmit}>
                                <div className='grid items-center gap-6 md:grid-cols-2'>
                                    <div className='w-full text-center relative z-0 my-2'>
                                        <label for="default_standard" className={!theam ? `${Prostyles.light_lbl}` : `${Prostyles.dark_lbl}`}>First Name *</label>
                                        <input 
                                        {...formik.getFieldProps('firstName')} 
                                        //className={theam? `${Prostyles.textbox}` : `${styles.textbox}`}
                                        className={Prostyles.textbox}
                                        type="text" 
                                        name="firstName" 
                                        placeholder='First Name' 
                                        />   
                                    </div>

                                    <div className='w-full text-center relative z-0 my-2'>
                                        <label  className={!theam ? `${Prostyles.light_lbl}` : `${Prostyles.dark_lbl}`}>Last Name *</label>
                                        <input 
                                        {...formik.getFieldProps('lastName')} 
                                        //className={theam? `${Prostyles.textbox}` : `${styles.textbox}`} 
                                        className={Prostyles.textbox}
                                        type="text" 
                                        name="lastName" 
                                        placeholder='Last Name' 
                                        />
                                    </div> 

                                    <div className='w-full text-center relative z-0 '>
                                        <label className={!theam ? `${Prostyles.light_lbl}` : `${Prostyles.dark_lbl}`}>MetaTrade No *</label>
                                        <input 
                                        {...formik.getFieldProps('metaTrade')} 
                                        //className={theam? `${Prostyles.textbox}` : `${styles.textbox}`} 
                                        className={Prostyles.textbox}
                                        type="number" 
                                        name="metaTrade" 
                                        />
                                    </div>

                                    <div className='w-full text-center relative z-0 '>
                                    
                                        <label className={!theam ? `${Prostyles.light_lbl}` : `${Prostyles.dark_lbl}`}>Telegram No *</label>
                                        <input 
                                        {...formik.getFieldProps('telegram')} 
                                        //className={theam? `${Prostyles.textbox}` : `${styles.textbox}`} 
                                        className={Prostyles.textbox}
                                        type="number" 
                                        name="telegram" 
                                        placeholder='Telegram No' 
                                        />
                                    
                                    </div>
                                    
                                </div>  

                                <div className='flex justify-center mt-2'>
                                    <button className={Prostyles.pro_btn} type="">Update</button>
                                </div>

                            </form>

                        </div>

                    </div>

                    {/* Custom Feature */}
                    <div className=' bg-transparent rounded-xl shadow-2xl'>
                        <div className='profile grid justify-center mx-auto my-5'>
                            <h3 className={Prostyles.titel}>Settings</h3>
                            <div className={apiData?.userRoll===1 ? `hidden` : ``}>
                                <button className='bg-black'>check</button>
                            </div>
                            <div className='profile flex justify-center my-0'>
                                <img src={settingImg} className={styles.login_img} />
                            </div>
                            
                            <div className='flex items-center text-center'>

                                
                                <label className='text-base font-bold'>Theam </label>
                                
                                <div className='w-full h-full'>

                                    <div className={ theam ? `hidden` : ``}>
                                        <button onClick={darkChange}  className="w-1/5">
                                            < FiMoon className='w-full h-full' />
                                        </button>
                                    </div>
                                    
                                    <div className={!theam ? `hidden` : ``}>
                                        <button onClick={lightChange} className='w-1/5'>
                                            < BsSun className='w-full h-full' />
                                        </button>
                                    </div>  
                                </div>    
                                
                                
                            </div> 
                        </div>
                    </div>  
                     
                </div> 
            </div>
        </div>
    </div>
  )
}

export default NewProfile