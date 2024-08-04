// import { Navigate } from "react-router-dom";
// import { useAuthContext } from "../../contexts/AuthContext";

// export default function IsAuth({ children }) {

//     const { isAuthenticated } = useAuthContext();

//     if (!isAuthenticated) {
//         return <Navigate to='/login' />
//     }

//     return (
//         <>
//             {children}
//         </>
//     );
// }

import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";

export default function IsAuth() {

    const { isAuthenticated } = useAuthContext();

    return isAuthenticated
        ? <Outlet />
        : <Navigate to='/login' />
}