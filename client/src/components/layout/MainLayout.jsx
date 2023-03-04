import React from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import GlobalLoading from '../common/loading/GlobalLoading';

const MainLayout = () => {
    return (
        <>
            <GlobalLoading />

            <Box display="flex" minHeight="100vh">
                {/* header */}

                {/* main */}
                <Box
                    component="main"
                    flexGrow={1}
                    overflow="hidden"
                    minHeight="100vh"
                >
                    <Outlet />
                </Box>

                {/* footer */}
            </Box>
        </>
    )
}

export default MainLayout;
