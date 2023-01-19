import toast from 'react-hot-toast'

// validate username
// export default function userNameVerify(error = {}, values){
//     if(!values.username){
//         error.username = toast.error("User Name Required...!😟");
//     }else if(values.username.includes(" ")){
//         error.username = toast.error("User Name is Invalid...!😡");
//     }
//     return error;
// }

//first name validate
function firstNameVeryfy(error ={}, values){
    if(!values.f_name){
        error.username = toast.error("Required...!😟");
    }
}

// //last name validate
function lastNameVeryfy(error ={}, values){
    if(!values.l_name){
        error.username = toast.error("Last Name is Required...!😟");
    }
}

//telegram validate
function telegramVeryfy(error ={}, values){
    if(!values.l_name){
        error.username = toast.error("Telegram Number is Required...!😟");
    }
}

// //mt4 validate
// function metaTradeVeryfy(error ={}, values){}

// //password validate
// function passwordVeryfy(error ={}, values){}

// //confirm pass validate
// function confirmPassVeryfy(error ={}, values){}

// export default ({
//     firstNameVeryfy, 
//     lastNameVeryfy, 
//     telegramVeryfy,
// })