import Header from "../components/Header";
import Mainpage from "../components/Mainpage";
import Grid from '@mui/material/Unstable_Grid2';
import Toolbar from '@mui/material/Toolbar';

export default function mainpage() {
    return (
        <Grid container sx={{ justifyContent: 'center', width: '100%', border: '1px solid red' }}>

            <Grid xs={12} sx={{ border: '1px solid blue' }}>
                <Header />
            </Grid>
            <Grid xs={12} sx={{ border: '1px solid red', mt: { xs: '20px', sm: '0px' } }}>
                <Mainpage />
            </Grid>


        </Grid >
    )
}