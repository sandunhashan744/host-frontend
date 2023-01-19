import * as Yup from 'yup';

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

export const registerSchema = Yup.object().shape({
    firstName: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Should be Required..!😡'),

    lastName: Yup.string()
        .max(20, 'Must be 20 characters or less')
        .required('Should be Required..!😡'),

    telegram: Yup.number()
        .required('Should be Required..!😡'),
    
    metaTrade: Yup.number()
        .required('Should be Required..!😡'),

    email: Yup.string()
        .email('Please Enter the valid email address')
        .required('Should be Required..!😡'),

    password: Yup.string()
        .min(5)
        .matches(passwordRules, { message: "Please create a stronger password" })
        .required('Should be Required..!😡'),

    confirm_password: Yup.string()
        .oneOf([Yup.ref('password'), null], "Password Not Matched..!😒")
        .required('Should be Required..!😡')
});
