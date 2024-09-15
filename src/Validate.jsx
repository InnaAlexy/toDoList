import * as Yup from 'yup';

export const formSchema = Yup.object().shape({
	login: Yup.string().required('Login is required'),
	password: Yup.string()
		.required('Password is required')
		.min(3, 'Password less then 3 characters long'),
	password2: Yup.string()
		.required('Reapid the password')
		.oneOf([Yup.ref('password')], 'Passwords did not match'),
});
