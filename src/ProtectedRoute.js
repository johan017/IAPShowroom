import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({component: Component, uRole, aID, ...rest})  => {
    // const { auth } = useAuth();
    return(
        <Route {...rest} render={
            (props) => {
                if (uRole === null) {
                    return (
                         <Redirect from="*" to ="/"/>
                     )
                }
                else {
                    return <Component user_Role={uRole} adminID={aID} {...rest} {...props}/>
                }
            }
        }
        />
    )
}
export default ProtectedRoute;