import React from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { Outlet } from 'react-router';
import ScrollToTop from '../Components/ScrollToTop';

const Root = () => {
    return (
        <div>
            <Header></Header>
            <ScrollToTop></ScrollToTop>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Root;