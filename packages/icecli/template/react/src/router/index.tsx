import {createBrowserRouter,RouteObject} from 'react-router-dom'
import BackManage from '../views/BackManage'
import BackMap from '../views/Home'
const routes: RouteObject[] = [
    {
        path: '/',
        element: <BackMap />

    },
    {
        path: '/back',
        element: <BackManage />
    }
]
export default createBrowserRouter(routes)