import Header from "../components/Header";
import Mainpage from "../components/Mainpage";
import Grid from '@mui/material/Unstable_Grid2';
import Toolbar from '@mui/material/Toolbar';

export default function test() {
    return (
        <Grid container sx={{ justifyContent: 'center', width: '100%', }}>
            <Toolbar />
            <Grid xs={12} maxWidth="xl">
                <Header />
            </Grid>
            <Grid xs={12} maxWidth="xl">
                test
            </Grid>


        </Grid >
    )
}