import { Route, Redirect } from "react-router-dom";
import useAuth from "./hooks/use-auth";
import useGetRole from "./hooks/use-get-role";

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}
const ProtectedRoute = ({component: Component, user_role: user_Role, ...rest})  => {
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
                else if(!isEmpty(role) && user_Role === "all") {
                    return <Component user_Role={role} {...rest} {...props}/>
                }
                else if(!isEmpty(role) && role === user_Role) {
                    return <Component  {...rest} {...props}/>
                }
                else if(!isEmpty(role) && role != user_Role) {
                    return (
                        <Redirect from="*" to ="/home"/>
                    )  
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