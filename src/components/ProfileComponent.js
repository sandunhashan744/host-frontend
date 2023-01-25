import {React,useState} from 'react'
import { useNavigate } from 'react-router-dom'
import avatar from '../assets/avatar.png'
import styles from '../styles/login.module.css'
import toast,{Toaster} from 'react-hot-toast'
import { useFormik } from 'formik'
import { profileValidation } from '../validations/loginValidation' 
import convetBase64 from '../helper/convert'
import useFetch from '../hook/featch-hook'
import {updateUser} from '../helper/helper'

const ProfileComponent = () => {

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
    <div className='container mx-auto'>
      {/* toast message */}
      <Toaster position='top-center' reverseOrder={false} />

      <div className='grid justify-center items-center h-screen'>
        <div className={styles.glass}>
          
          <h4 className='text-xl font-bold text-center'>{apiData?.firstName+' '+apiData?.lastName || 'Profile'} </h4>
          <div className='profile grid justify-center '>
            <label htmlFor="profile">
              <img src={file || apiData?.profile || avatar} className={styles.profile_img} alt="avatar"/>
            </label>
            <input onChange={onUpload} type="file" id='profile' name='profile' />
          </div>
              

          
            <form className='py-3 md:py-5' autoComplete='off' onSubmit={formik.handleSubmit}>

              <div className='text-center py-2'>
                
                <div className='name grid grid-cols-1 md:grid-cols-2 md:gap-4'> 
                  <div className={styles.textbox_container}>
                    <input 
                      {...formik.getFieldProps('firstName')} 
                      className={styles.textbox} 
                      type="text" 
                      name="firstName" 
                      placeholder='First Name' 
                    />
                    

          {/* <div className="flex items-center border-b border-gray-50 py-2">
            <input className="appearance-none bg-transparent border-none text-black mr-3 py-1 px-2 leading-tight focus:outline-none text-center" 
            type="text" 
            placeholder="First Name" 
            {...formik.getFieldProps('firstName')}
            name="firstName" 
            />
          </div> */}

                  </div>
                  
                  <div className={styles.textbox_container}>
                    <input 
                      {...formik.getFieldProps('lastName')} 
                      className={styles.textbox} 
                      type="text" 
                      name="lastName" 
                      placeholder='Last Name' 
                    />
                  </div>
                </div>

                <div className='name grid grid-cols-1  md:grid-cols-2 md:gap-4'>
                  <div className={styles.textbox_container}>
                    <input 
                      {...formik.getFieldProps('telegram')} 
                      className={styles.textbox} 
                      type="number" 
                      name="telegram" 
                      placeholder='Telegram No' 
                    />
                  </div>
                  <div className={styles.textbox_container}>
                    <input 
                      {...formik.getFieldProps('metaTrade')} 
                      className={styles.textbox} 
                      type="text" 
                      name="metaTrade"  
                      placeholder='Meta Trade No'
                    />
                  </div>
                </div>
                
                <div className='gap-4'> 
                  <div className={styles.textbox_container}>
                    <input 
                      {...formik.getFieldProps('email')} 
                      className={styles.textbox} 
                      type="email" 
                      name="email" 
                      placeholder='Email' 
                    />
                  </div>
                </div>

                <div className={styles.textbox_container}>
                  <button className={styles.btnR} type="submit">Update</button>
                </div>

              </div>

              <div className='text-center py-2'>
                <span className='text-gray-900'>Come Back Later? <span> </span>
                  <button onClick={userLogout} className='text-red-800 font-medium hover:font-bold'>Log out</button>
                </span>
              </div>

            </form> 

        </div>
      </div>
    </div>
  )
}

export default ProfileComponent