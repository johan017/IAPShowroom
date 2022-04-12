import { Route, Redirect } from "react-router-dom";
import useAuth from "./hooks/use-auth";
import useGetRole from "./hooks/use-get-role";

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}
const ProtectedRoute = ({component: Component, ...rest})  => {
    const { auth } = useAuth();
    const {role}  = useGetRole();
    
    return(
        <Route {...rest} render={
            (props) => {
                if (role === null) {
                    return (
                         <Redirect from="*" to ="/"/>
                     )
                }
                else if(!isEmpty(role)) {
                    return <Component {...rest} {...props} /> 
                }
                else {
                    return <div>loading...</div>
                }
            }
        }
        />
    )
}
export default ProtectedRoute;