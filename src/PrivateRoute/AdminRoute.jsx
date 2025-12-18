import React, { Children, use } from 'react';
import { AuthContext } from '../Context/AuthContext';
import useRole from '../Hooks/useRole';
import Loder from '../Components/Loder';
import Forbidden from '../Pages/Forbidden';

const AdminRoute = ({children}) => {
    const {loading} = use(AuthContext)
    const {role, roleLoading} = useRole()

    if (loading || roleLoading) {
        return <Loder></Loder>
    }

    if(role !== "Admin"){
        return <Forbidden></Forbidden>
    }
    return children;
};

export default AdminRoute;