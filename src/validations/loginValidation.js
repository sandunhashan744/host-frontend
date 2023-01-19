import * as Yup from 'yup';

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

export const loginSchema = Yup.object().shape({
    email: Yup.string()
        .email('Please Enter the valid email address')
        .required('Should be Required..!😡'),

    password: Yup.string()
        .min(5)
        .matches(passwordRules, { message: "Please create a stronger password" })
        .required('Should be Required..!😡')
});