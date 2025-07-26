import appRouter from 'navigation/app.router'
import { RouterProvider } from 'react-router-dom'
import { Provider } from 'jotai'

const App = () => {

    return (
        <Provider>
            <RouterProvider router={appRouter} />
        </Provider>

    )
}

export default App