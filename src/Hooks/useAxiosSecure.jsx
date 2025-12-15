import axios from 'axios';
import React, { use, useEffect } from 'react';
import { AuthContext } from '../Context/AuthContext';

const instance = axios.create({
    baseURL: "http://localhost:3000"
})

const useAxiosSecure = () => {
    const {user} = use(AuthContext)
    useEffect(() => {
        instance.interceptors.request.use(config => {
            config.headers.Authorization = `Bearer ${user?.accessToken}`
            return config
        })
    }, [user])


    return instance;
};
export default useAxiosSecure;