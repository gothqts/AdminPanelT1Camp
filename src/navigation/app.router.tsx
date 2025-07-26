import { createBrowserRouter } from 'react-router-dom'
import Login from 'screens/Login'
import urls from 'navigation/app.urls'
import Main from 'screens/Main'
import Layout from 'shared/Layout'
import CreateUser from 'screens/User/pages/CreateUser'
import UpdateUser from 'screens/User/pages/UpdateUser'
import PublicRoute from 'navigation/PublicRoute'
import PrivateRoute from 'navigation/PrivateRoute'

const appRouter = createBrowserRouter([
    {
        element: <PublicRoute Component={Login} />,
        path: urls.login,
    },
    {
        element: <PrivateRoute Component={Layout} />,
        children: [
            {
                element: <PrivateRoute Component={Main} />,
                path: urls.main,
            },
            {
                element: <PrivateRoute Component={CreateUser} />,
                path: urls.createUser,
            }
            ,
            {
                element: <PrivateRoute Component={UpdateUser} />,
                path: urls.updateUser,
            },
        ],

    },


])
export default appRouter