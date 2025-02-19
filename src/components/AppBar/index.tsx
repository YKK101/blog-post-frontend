import * as React from 'react';
import { AppBar as MuiAppBar, Toolbar } from '@mui/material';
import Image from 'next/image';
import AppBarItems from './AppBarItems';

export default function AppBar() {
    return (
        <MuiAppBar position="static">
            <Toolbar className="flex items-center justify-between" >
                <Image src="/logo-white.svg" alt="logo" width={60} height={36} />
                <AppBarItems />
            </Toolbar>
        </MuiAppBar>
    );
}
