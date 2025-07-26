import { Link, useNavigate } from 'react-router-dom'
import urls from 'navigation/app.urls'
import { Input, Button, DatePicker, Checkbox, Select } from 'antd'
import styles from './userForm.module.css'
import { IUser } from 'types/global'
import { useForm, Controller } from 'react-hook-form'
import dayjs from 'dayjs'
import useUserFormAction from './hooks/useUserFormAction'
import { useEffect } from 'react'
import { IUpdateUserDto } from 'screens/User/user.types'

const employmentOptions = [
    { value: 'Full-time', label: 'Постоянная занятость' },
    { value: 'Part-time', label: 'Частичная занятость' },
    { value: 'Self-employed', label: 'Самозанятый' },
    { value: 'Unemployed', label: 'Неполная занятость' },
]

interface IUserFormProps {
    action: 'createUser' | 'updateUser',
    user?: Omit<IUser, 'password'>,
}

const UserForm = (props: IUserFormProps) => {
    const defaultValues = props.user || {
        name: '',
        surName: '',
        password: '',
        confirmPassword: '',
        fullName: '',
        email: '',
        birthDate: dayjs('2000-01-01T00:00:00.000Z'),
        telephone: '',
        employment: '',
        userAgreement: false,
    }
    const {
        control,
        handleSubmit,
        formState: { errors },
        watch,
        setError,
        setValue,
        clearErrors,
    } = useForm<Omit<IUser, 'id'> & { confirmPassword: string }>({
        defaultValues,
    })
    const { actions } = useUserFormAction()
    const navigate = useNavigate()
    const password = watch('password')
    const confirmPassword = watch('confirmPassword')
    const name = watch('name')
    const surName = watch('surName')

    useEffect(() => {
        if (confirmPassword && password !== confirmPassword) {
            setError('confirmPassword', {
                type: 'manual',
                message: 'Пароли не совпадают',
            })
        } else {
            clearErrors('confirmPassword')
        }
    }, [password, confirmPassword, setError, clearErrors])

    useEffect(() => {
        if (name || surName) {
            setValue('fullName', `${name} ${surName}`)
        }
    }, [name, surName, setValue])


    const onSubmit = (data: Omit<IUser, 'id'> & { confirmPassword: string }) => {
        if (data.password !== data.confirmPassword) {
            setError('confirmPassword', {
                type: 'manual',
                message: 'Пароли не совпадают',
            })
            return
        }

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { confirmPassword, ...userData } = data
        if (props.action === 'createUser') {
            actions.createUser(userData, () => navigate(urls.main))

        } else if (props.action === 'updateUser') {
            const dto: IUpdateUserDto = {
                id: props.user?.id as string,
                name: data.name,
                surName: data.surName,
                fullName: data.fullName,
                userAgreement: data.userAgreement,
                birthDate: data.birthDate,
                telephone: data.telephone,
                employment: data.employment,
            }
            actions.updateUser(dto, () => navigate(urls.main))
        }
    }

    return (
        <div className={styles.form_container}>
            <div className={styles.form_header}>
                <h1 className={styles.form_title}>
                    {props.action === 'createUser' ? 'Создание пользователя' : 'Редактирование пользователя'}
                </h1>
                <Link to={urls.main} className={styles.backLink}>
                    ← Вернуться на главную
                </Link>
            </div>

            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.form_row}>
                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="name">Имя:</label>
                        <Controller
                            name="name"
                            control={control}
                            rules={{
                                required: 'Это поле обязательно',
                                pattern: {
                                    value: /^[A-Za-zА-Яа-яЁё\s-]+$/,
                                    message: 'Допустимы только буквы и дефисы',
                                },
                                maxLength: {
                                    value: 64,
                                    message: 'Имя может быть не больше 64 символов',
                                },

                            }}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    id="name"
                                    className={styles.input}
                                    placeholder="Введите имя"
                                    status={errors.name ? 'error' : ''}
                                />
                            )}
                        />
                        {errors.name && <span className={styles.error}>{errors.name.message}</span>}
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="surName">Фамилия:</label>
                        <Controller
                            name="surName"
                            control={control}
                            rules={{
                                required: 'Это поле обязательно',
                                pattern: {
                                    value: /^[A-Za-zА-Яа-яЁё\s-]+$/,
                                    message: 'Допустимы только буквы и дефисы',
                                },
                                maxLength: {
                                    value: 64,
                                    message: 'Фамилия может быть не больше 64 символов',
                                },
                            }}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    id="surName"
                                    className={styles.input}
                                    placeholder="Введите фамилию"
                                    status={errors.surName ? 'error' : ''}
                                />
                            )}
                        />
                        {errors.surName && <span className={styles.error}>{errors.surName.message}</span>}
                    </div>
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="fullName">Полное имя:</label>
                    <Controller
                        name="fullName"
                        control={control}
                        rules={{
                            maxLength: {
                                value: 130,
                                message: 'Полное имя может быть не больше 130 символов',
                            },
                        }}
                        render={({ field }) => (
                            <Input
                                {...field}
                                id="fullName"
                                className={styles.input}
                                placeholder="Полное имя"
                            />
                        )}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="email">Email:</label>
                    <Controller
                        name="email"
                        control={control}
                        rules={{
                            required: 'Это поле обязательно',
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'Некорректный email',
                            },
                        }}
                        render={({ field }) => (
                            <Input
                                {...field}
                                disabled={props.action === 'updateUser'}
                                id="email"
                                className={styles.input}
                                placeholder="Введите email"
                                status={errors.email ? 'error' : ''}
                                type="email"
                            />
                        )}
                    />
                    {errors.email && <span className={styles.error}>{errors.email.message}</span>}
                </div>

                {
                    props.action === 'createUser' && (
                        <div className={styles.form_row}>
                            <div className={styles.formGroup}>
                                <label className={styles.label} htmlFor="password">Пароль:</label>
                                <Controller
                                    name="password"
                                    control={control}
                                    rules={{
                                        required: 'Это поле обязательно',
                                        minLength: {
                                            value: 8,
                                            message: 'Пароль должен содержать минимум 8 символов',
                                        },
                                        pattern: {
                                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]/,
                                            message: 'Пароль должен содержать заглавные, строчные буквы и цифры',
                                        },
                                    }}
                                    render={({ field }) => (
                                        <Input.Password
                                            {...field}
                                            disabled={props.action === 'updateUser'}
                                            id="password"
                                            className={styles.input}
                                            placeholder="Введите пароль"
                                            status={errors.password ? 'error' : ''}
                                        />
                                    )}
                                />
                                {errors.password && <span className={styles.error}>{errors.password.message}</span>}
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label} htmlFor="confirmPassword">Подтвердите пароль:</label>
                                <Controller
                                    name="confirmPassword"
                                    control={control}
                                    rules={{
                                        required: 'Это поле обязательно',
                                        validate: {
                                            confirmPassword: (value) => value === password || 'Пароли не совпадают',
                                        },
                                    }}
                                    render={({ field }) => (
                                        <Input.Password
                                            {...field}
                                            disabled={props.action === 'updateUser'}
                                            id="confirmPassword"
                                            className={styles.input}
                                            placeholder="Повторите пароль"
                                            status={errors.confirmPassword ? 'error' : ''}
                                        />
                                    )}
                                />
                                {errors.confirmPassword &&
                                    <span className={styles.error}>{errors.confirmPassword.message}</span>}
                            </div>
                        </div>
                    )
                }


                <div className={styles.form_row}>
                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="telephone">Телефон:</label>
                        <Controller
                            name="telephone"
                            control={control}
                            rules={{
                                pattern: {
                                    value: /^\+?[0-9\s-]+$/,
                                    message: 'Некорректный номер телефона',

                                },
                                minLength: {
                                    value: 12,
                                    message: 'Телефон должен содержать минимум 12 символов',
                                },
                                maxLength: {
                                    value: 12,
                                    message: 'Телефон должен содержать максимум 12 символов',
                                },
                            }}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    id="telephone"
                                    maxLength={12}
                                    className={styles.input}
                                    placeholder="+7 (XXX) XXX-XX-XX"
                                    status={errors.telephone ? 'error' : ''}
                                />
                            )}
                        />
                        {errors.telephone && <span className={styles.error}>{errors.telephone.message}</span>}
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="birthDate">Дата рождения:</label>
                        <Controller
                            name="birthDate"
                            control={control}
                            rules={{ required: 'Это поле обязательно' }}
                            render={({ field }) => (
                                <DatePicker
                                    {...field}
                                    id="birthDate"
                                    className={styles.datePicker}
                                    format="DD.MM.YYYY"
                                    placeholder="Выберите дату"
                                    status={errors.birthDate ? 'error' : ''}
                                    value={field.value ? dayjs(field.value) : null}
                                    onChange={(date) => field.onChange(date ? date.toDate() : null)}
                                />
                            )}
                        />
                        {errors.birthDate && <span className={styles.error}>{errors.birthDate.message}</span>}
                    </div>
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="employment">Тип занятости:</label>
                    <Controller
                        name="employment"
                        control={control}
                        render={({ field }) => (
                            <Select
                                {...field}
                                id="employment"
                                options={employmentOptions}
                                placeholder="Выберите тип занятости"
                                status={errors.employment ? 'error' : ''}
                            />
                        )}
                    />
                    {errors.employment && <span className={styles.error}>{errors.employment.message}</span>}
                </div>

                <div className={styles.form_group}>
                    <Controller
                        name="userAgreement"
                        control={control}
                        render={({ field }) => (
                            <Checkbox
                                {...field}
                                id="userAgreement"
                                checked={field.value}
                                onChange={field.onChange}
                                className={styles.checkbox}
                            >
                                Я согласен с условиями пользовательского соглашения
                            </Checkbox>
                        )}
                    />
                </div>

                <div className={styles.formActions}>
                    <Button type="primary" htmlType="submit" className={styles.submitButton}>
                        {props.action === 'createUser' ? 'Создать пользователя' : 'Сохранить изменения'}
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default UserForm

