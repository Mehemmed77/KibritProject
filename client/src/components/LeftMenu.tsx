import { Box } from "@mui/material";
import { Drawer, List, ListItem, ListItemText, IconButton, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from "react-router-dom";

export default function LeftMenu() {
    const [open, setOpen] = useState(false);
    const isDesktop = useMediaQuery('(min-width: 750px)');
    const navigate = useNavigate();

    useEffect(() => {
        const isLoggedIn = sessionStorage.getItem("isLoggedIn");
        if(!isLoggedIn) {
            navigate("/login/");
        }
    }, [])

    const drawerContent = (
        <List>
            <Link to="/universities/">
                <ListItem>
                    <ListItemText className="link" primary="Universities" />
                </ListItem>
            </Link>
            
            <Link to="/schools/">
                <ListItem>
                    <ListItemText className="link" primary="Schools" />
                </ListItem>
            </Link>
            
            <Link to="/highSchools/">
                <ListItem>
                    <ListItemText className="link" primary="High Schools" />
                </ListItem>
            </Link>

        </List>
    );

    const drawerWidth = "120px";

    return <>
        {!isDesktop && (
            <IconButton onClick={() => setOpen(true)}>
                <MenuIcon />
            </IconButton>)}

        <Box display={"flex"} alignItems={"start"}>
            <Drawer variant={isDesktop ? 'permanent' : 'temporary'} 
                open={isDesktop ? true : open}
                onClose={() => setOpen(false)}
                sx={{
                    width: drawerWidth,
                    flexShrink: 0, 
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',},}}>
                
                {drawerContent}
            </Drawer>

            <Box component="main" 
                sx={{ flexGrow: 1, p: 3,...(isDesktop && {marginLeft: `${drawerWidth}px` }) }}>

                <Outlet />

            </Box>
        </Box>
    </>;
}