import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles'//import theme (to config some style) 
import { Paper } from '@mui/material';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import { Link } from "react-router-dom";

export default function Header() {
    const drawerWidth = 200;
    const navItems = ['HOME', 'ADD VOCAB', 'HISTORY', 'TEST'];
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const theme = createTheme({
        typography: {
            fontFamily: 'Lilita One',
        },
        palette: {
            header: {
                main: '#30334f',
                contrastText: '#fff',
            },
        },
    });

    //Drawer(Later do)
    const drawer = (
        <Grid onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                VocabLib
            </Typography>
            <Divider />
            <List>
                {navItems.map((item, i) => (
                    <ListItem key={item} disablePadding>
                        <ListItemButton sx={{ textAlign: 'center' }} >
                            <ListItemText primary={item} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Grid>
    );


    return (
        <ThemeProvider theme={theme}>
            <Grid>
                <AppBar position="sticky" color='header' component="nav">
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ display: { sm: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ mr: 2, display: { sm: 'none' } }}
                        >
                            &nbsp;VOCABLIB
                        </Typography>
                        <Grid container sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }} >
                            <Link to={"/"} style={{ textDecoration: 'none' }}>
                                <IconButton
                                    edge="start"
                                    sx={{ mr: 2, color: '#FFF' }}
                                >
                                    <LibraryBooksIcon />
                                    <Typography
                                        variant="h6"
                                        component="div"
                                    >
                                        &nbsp;VOCABLIB
                                    </Typography>
                                </IconButton>
                            </Link>
                        </Grid>

                        <Grid sx={{ display: { xs: 'none', sm: 'block' } }}>
                            {navItems.map((item) => (
                                <Link to={"/" + item.toLowerCase().replaceAll(' ', '')} style={{ textDecoration: 'none' }} key={item}>
                                    <Button sx={{ color: '#fff' }}>
                                        {item}
                                    </Button>
                                </Link>

                            ))}
                        </Grid>
                    </Toolbar>
                </AppBar>
                <Grid component="nav">
                    <Drawer
                        variant="temporary"
                        open={mobileOpen}
                        PaperProps={{ sx: { GridSizing: 'border-Grid', width: drawerWidth } }}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile and also SEO.
                        }}
                        sx={{
                            display: { xs: 'block', sm: 'none' },
                            //'.MuiDrawer-paper ': { GridSizing: 'border-Grid', width: drawerWidth },
                        }}
                    >
                        {drawer}
                    </Drawer>

                </Grid>
            </Grid>
        </ThemeProvider>
    )
}