import { Route, Redirect } from "react-router-dom";
import useAuth from "./hooks/use-auth";
import useGetRole from "./hooks/use-get-role";

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}
const ProtectedRoute = ({component: Component, uRole, aID, ...rest})  => {
    // const { auth } = useAuth();

    console.log("Protected Routes Parameters",uRole, aID);
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