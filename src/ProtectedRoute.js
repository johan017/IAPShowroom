import { Route, Redirect } from "react-router-dom";
import useAuth from "./hooks/use-auth";
import useGetRole from "./hooks/use-get-role";


function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

const ProtectedRoute = ({component: Component, ...rest})  => {
    const { auth } = useAuth();
    const { role } = useGetRole();
    console.log(role)
    return(
        <Route {...rest} render={
            (props) => {
                return role ? <Component {...rest} {...props} /> :
                <Redirect to="/"/>
            }
        }
        />
    )
}
export default ProtectedRoute;