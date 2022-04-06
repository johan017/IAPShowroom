import { Route, Redirect } from "react-router-dom";
import useAuth from "./hooks/use-auth";

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

const ProtectedRoute = ({fakeauth ,component: Component, ...rest}) => {
    const { auth } = useAuth();
    //.find(row => row.startsWith('connect.id=')).split('=')[1];
     // more secure way to authenticate users on front end is needed
     
    return(
        <Route {...rest} render={
            (props) => {
                if(!isEmpty(auth) || localStorage.getItem("role"))
                {
                    return <Component {...rest} {...props} />
                }
                if(isEmpty(auth))
                {
                    return <Redirect to ={{path:"/",state: {from:props.location}}}/>
                }
            }
        }
        />
    )
}
export default ProtectedRoute;