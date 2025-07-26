import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import styles from './layout.module.css'
import { LogoutOutlined, TableOutlined, UserAddOutlined, MenuOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import urls from 'navigation/app.urls'
import { authApi } from 'screens/Login/login.api'
import { authAtom } from 'screens/Login/login.atom'
import { useAtom } from 'jotai'
import useHandleResize from 'shared/hooks/useHandleResize'
import { useEffect, useState } from 'react'

const Layout = () => {
    const [, setAuth] = useAtom(authAtom)
    const navigate = useNavigate()
    const width = useHandleResize()
    const [isMobile, setIsMobile] = useState(false)
    const [isNavbarVisible, setIsNavbarVisible] = useState(true)

    useEffect(() => {
        const mobile = width <= 768
        setIsMobile(mobile)

        setIsNavbarVisible(!mobile)
    }, [width])

    const handleLogout = () => {
        authApi.logout().then((res) => {
            if (res.status === 'success') {
                setAuth(null)
                navigate(urls.login)
            }
        })
    }

    const toggleNavbar = () => {
        setIsNavbarVisible(prev => !prev)
    }

    const closeNavbarOnMobile = () => {
        if (isMobile) {
            setIsNavbarVisible(false)
        }
    }

    return (
        <div className={styles.container}>
            <div
                className={`${styles.navbar} ${isNavbarVisible ? styles.visible : ''}`}
                onClick={closeNavbarOnMobile}
            >
                <h1 className={styles.h1}>Admin Panel</h1>
                <div className={styles.links_container}>
                    <NavLink
                        className={({ isActive }) =>
                            `${styles.link} ${isActive ? styles.active : ''}`
                        }
                        to={urls.main}
                        onClick={closeNavbarOnMobile}
                    >
                        <TableOutlined />
                        Пользователи
                    </NavLink>
                    <NavLink
                        className={({ isActive }) =>
                            `${styles.link} ${isActive ? styles.active : ''}`
                        }
                        to={urls.createUser}
                        onClick={closeNavbarOnMobile}
                    >
                        <UserAddOutlined />
                        Создать пользователя
                    </NavLink>
                </div>
            </div>
            <div
                className={styles.main_container}
                onClick={closeNavbarOnMobile}
            >
                <div className={styles.header}>
                    {isMobile && (
                        <Button
                            className={styles.menuToggle}
                            icon={<MenuOutlined />}
                            onClick={(e) => {
                                e.stopPropagation()
                                toggleNavbar()
                            }}
                        />
                    )}
                    <Button
                        className={styles.logout_btn}
                        icon={<LogoutOutlined />}
                        onClick={handleLogout}
                    >
                        Выйти
                    </Button>
                </div>
                <Outlet />
            </div>
        </div>
    )
}

export default Layout