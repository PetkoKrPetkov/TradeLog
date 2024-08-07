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

