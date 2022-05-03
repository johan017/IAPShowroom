// import {createContext,useState, useEffect } from "react";
// import axios from "../context/axios"

// const ROLE_URL = "api/auth/user-info"

// const AuthContext = createContext({});

// export const AuthProvider = ({children}) => {
//     // const [auth, setAuth] = useState({});
//     const [role, setRole] = useState();
//     const [uID, setuID] = useState();
//     const [isLoading, setLoading] = useState(true);

//     const getRole = async() =>{
//          try{
//              const result = await axios.get(ROLE_URL, 
//                  {
//                      headers: {"Content-Type": "application/json"},
//                      withCredentials: true
//                  })
//                      setRole(result.data.payload.user_role)
//                      setRole(result.data.payload.user_role);
//                      setuID(result.data.payload.adminid);
//                      setLoading(false);

//                 // setLoading(false);
//          }catch(err){
//              setRole(null);
//              setuID(null); 
//          }
//     }
//     useEffect(()=>{
//         getRole();
//     }, []);

    
//     return (
//     <AuthContext.Provider value={{role,uID,isLoading}}>
//         {children}
//     </AuthContext.Provider>
//     )
// }

// export default AuthContext;