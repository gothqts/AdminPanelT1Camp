import { Button, Input } from 'antd';
import styles from './credentialsForm.module.css';
import { useForm, Controller } from 'react-hook-form';
import { IAuth, IInputs } from 'screens/Login/login.types'
import { useAtom } from 'jotai';
import { authAtom } from 'screens/Login/login.atom'
import { authApi } from 'screens/Login/login.api';

const CredentialsForm = () => {
    const [, setAuth] = useAtom<IAuth | null>(authAtom)
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<IInputs>({
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = (data: IInputs) => {
        authApi.login(data).then((res) => {
            if (res.status === 'success') {
                authApi.auth().then((res) => {
                    if (res.status === 'success') {
                        setAuth(res.body);
                    }
                });
            }
        });
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <span className={styles.title}>Login</span>


            <label className={styles.label} htmlFor="email">Email:</label>
            <Controller
                name="email"
                control={control}
                rules={{
                    required: 'Email обязателен',
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Некорректный email',
                    },
                }}
                render={({ field }) => (
                    <Input
                        {...field}
                        className={styles.input}
                        placeholder="Email"
                        id="email"
                        size="large"
                        status={errors.email ? 'error' : ''}
                    />
                )}
            />
            {errors.email && <span className={styles.error}>{errors.email.message}</span>}


            <label className={styles.label} htmlFor="password">Password:</label>
            <Controller
                name="password"
                control={control}
                rules={{
                    required: 'Пароль обязателен',
                    minLength: {
                        value: 3,
                        message: 'Пароль должен быть не менее 3 символов',
                    },
                }}
                render={({ field }) => (
                    <Input.Password
                        {...field}
                        className={styles.input}
                        placeholder="Password"
                        id="password"
                        size="large"
                        status={errors.password ? 'error' : ''}
                    />
                )}
            />
            {errors.password && <span className={styles.error}>{errors.password.message}</span>}

            <Button
                className={styles.btn}
                size="large"
                htmlType="submit"
                type="primary"
            >
                Login
            </Button>
        </form>
    );
};

export default CredentialsForm;