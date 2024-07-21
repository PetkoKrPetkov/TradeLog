import styles from '../register/Register.module.css';

export default function Login() {
    return (
        <div className={styles.formContainer}>
        <form className={styles.form}>

            <h2 className={styles.title}>Login</h2>

            <div className={styles.formGroup}>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    required
                />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    required
                />
            </div>

            <button type="submit" className={styles.button}>Login</button>
        </form>
        </div>
    );
}