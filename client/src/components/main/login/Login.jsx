// import { useNavigate } from 'react-router-dom';
// import { useLogin } from '../../../hooks/useAuth';
// import { useForm } from '../../../hooks/useForm';
// import styles from '../register/Register.module.css';
// const initialValues = { email: '', password: '' }

// export default function Login() {
//     const login = useLogin();
//     const navigate = useNavigate();

//     const loginHandler = async ({ email, password }) => { 
//         try {
//             await login(email, password)
//             navigate('/');
//         } catch (error) {
//             console.error(error.message);
//         }
//     }
//     const { values, changeHandler, submitHandler } = useForm(
//         initialValues, 
//         loginHandler,
//     );

//     return (
//         <div className={styles.formContainer}>
//             <form className={styles.form} onSubmit={submitHandler}>

//                 <h2 className={styles.title}>Login</h2>

//                 <div className={styles.formGroup}>
//                     <label htmlFor="email">Email</label>
//                     <input
//                         type="email"
//                         id="email"
//                         name="email"
//                         value={values.email}
//                         onChange={changeHandler}
//                         placeholder='john.doe@gmail.com'
//                         required
//                     />
//                 </div>

//                 <div className={styles.formGroup}>
//                     <label htmlFor="password">Password</label>
//                     <input
//                         type="password"
//                         id="password"
//                         name="password"
//                         value={values.password}
//                         onChange={changeHandler}
//                         required
//                     />
//                 </div>

//                 <button type="submit" className={styles.button}>Login</button>
//             </form>
//         </div>
//     );
// }

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../../../hooks/useAuth';
import styles from '../register/Register.module.css';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const login = useLogin();
    const navigate = useNavigate();

    const loginHandler = async (event) => {
        event.preventDefault();
        try {
            await login(email, password);
            navigate('/');
        } catch (error) {
            setError('Invalid email or password!');
            setPassword('');
            console.error(error.message);
        }
    }

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    return (
        <div className={styles.formContainer}>
            <form className={styles.form} onSubmit={loginHandler}>
                <h2 className={styles.title}>Login</h2>

                {error && <div className={styles.error}>{error}</div>} 

                <div className={styles.formGroup}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={handleEmailChange}
                        placeholder='john.doe@gmail.com'
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                </div>

                <button type="submit" className={styles.button}>Login</button>
            </form>
        </div>
    );
}

