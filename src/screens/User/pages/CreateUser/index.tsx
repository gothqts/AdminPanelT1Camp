import styles from 'screens/User/userScreen.module.css'
import UserForm from 'screens/User/components/UserForm'
const CreateUser = () => {
    return (
        <div className={styles.container}>
            <UserForm action='createUser'/>
        </div>
    )
}

export default CreateUser