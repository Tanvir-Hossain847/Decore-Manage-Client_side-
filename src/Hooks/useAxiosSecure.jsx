import React from 'react';
import axios from 'axios';

const useAxiosSecure = () => {
    const instance = axios.create({
        baseURL: "http://localhost:3000/"
    })
    return instance;
};
export default useAxiosSecure;