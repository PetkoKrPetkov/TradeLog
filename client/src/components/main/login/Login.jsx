import { useNavigate } from 'react-router-dom';
import { useLogin } from '../../../hooks/useAuth';
import { useForm } from '../../../hooks/useForm';
import styles from '../register/Register.module.css';

export default function Login() {
    const login = useLogin();
    const navigate = useNavigate();
    const { values, changeHandler, submitHandler } = useForm({
        email: '', password: ''
    },
        async ({ email, password }) => { 
            try {
                await login(email, password)
                navigate('/');
            } catch (error) {
                console.error(error.message);
            }
        }
                
    );

    return (
        <div className={styles.formContainer}>
            <form className={styles.form} onSubmit={submitHandler}>

                <h2 className={styles.title}>Login</h2>

                <div className={styles.formGroup}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={values.email}
                        onChange={changeHandler}
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
                        value={values.password}
                        onChange={changeHandler}
                        required
                    />
                </div>

                <button type="submit" className={styles.button}>Login</button>
            </form>
        </div>
    );
}