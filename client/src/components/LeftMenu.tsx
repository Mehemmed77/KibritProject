import { Box, Stack } from "@mui/material";
import { Drawer, List, ListItem, ListItemText, IconButton, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import { Link, Outlet } from "react-router-dom";

export default function LeftMenu() {
    const [open, setOpen] = useState(false);
    const isDesktop = useMediaQuery('(min-width: 750px)');

    const drawerContent = (
        <List>
            <Link to="">
                <ListItem>
                    <ListItemText className="link" primary="Universities" />
                </ListItem>
            </Link>
            
            <Link to="">
                <ListItem>
                    <ListItemText className="link" primary="Schools" />
                </ListItem>
            </Link>
            
            <Link to="">
                <ListItem>
                    <ListItemText className="link" primary="High Schools" />
                </ListItem>
            </Link>

        </List>
    );

    return <>
        <Box display={"flex"}>
            {!isDesktop && (
                <IconButton onClick={() => setOpen(true)}>
                    <MenuIcon />
                </IconButton>
            )}

            <Drawer
                variant={isDesktop ? 'permanent' : 'temporary'}
                open={isDesktop ? true : open}
                onClose={() => setOpen(false)}>
                {drawerContent}
            </Drawer>

            <Box flexGrow={2}>
                <Outlet />
            </Box>

        </Box>
    </>
}