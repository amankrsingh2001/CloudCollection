import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Auth from "../pages/Auth";

const Router = createBrowserRouter([
    {
        path:'/',
        element:<App/>,
        children:[
            {
                path:'/signup',
                element:<Auth/>
            },
        ]
    }
])

export default Router