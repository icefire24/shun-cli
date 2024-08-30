import { createBrowserRouter, RouteObject } from 'react-router-dom'
import Home from '../views/Home'
const routes: RouteObject[] = [
    {
        path: '/',
        element: <Home />

    }]
export default createBrowserRouter(routes)