import CredentialsForm from 'screens/Login/components/CredentialsForm'
import styles from './login.module.css'

const Login = () => {
    return (
        <div className={styles.container}>
            <CredentialsForm/>
        </div>
    );
};

export default Login;