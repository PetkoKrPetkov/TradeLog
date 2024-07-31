
import { useNavigate } from 'react-router-dom';
import { useRegister } from '../../../hooks/useAuth';
import styles from './Register.module.css';
import { useState } from 'react';
import { useForm } from '../../../hooks/useForm';

const initialValues = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
};

export default function Register() {

    const [error, setError] = useState('');
    const register = useRegister();
    const navigate = useNavigate();

    const registerHandler = async ( values ) => { 
        
        if(values.password !== values.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setError('');

        try {
            await register(values.email, values.password, values.username)
            navigate('/');
        } catch (error) {
            console.error(error.message);
            setError(error.message);
        }
    }

    const { values, changeHandler, submitHandler } = useForm(
        initialValues, 
        registerHandler,
    );

    return (
        <div className={styles.formContainer}>
        <form className={styles.form} onSubmit={submitHandler}>
            <h2 className={styles.title}>Register</h2>
            {error && <div className={styles.error}>{error}</div>}
            <div className={styles.formGroup}>
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={values.username}
                    onChange={changeHandler}
                    required
                />
            </div>
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
            <div className={styles.formGroup}>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={values.confirmPassword}
                    onChange={changeHandler}
                    required
                />
            </div>
            
            <button type="submit" className={styles.button}>Register</button>
        </form>
        </div>
    );
}
