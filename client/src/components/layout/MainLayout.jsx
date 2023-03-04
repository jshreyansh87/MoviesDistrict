import React from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import GlobalLoading from '../common/loading/GlobalLoading';
import Footer from '../common/Footer';
import NavHeader from '../common/NavHeader';

const MainLayout = () => {
    return (
        <>
            <GlobalLoading />

            <Box display="flex" minHeight="100vh">
                {/* header */}
                <NavHeader />

                {/* main */}
                <Box
                    component="main"
                    flexGrow={1}
                    overflow="hidden"
                    minHeight="100vh"
                >
                    <Outlet />
                </Box>
            </Box>

            {/* footer */}
            <Footer />


        </>
    )
}

export default MainLayout;
