import Header from "../components/Header";
import Mainpage from "../components/Mainpage";
import Grid from '@mui/material/Unstable_Grid2';
import Toolbar from '@mui/material/Toolbar';

export default function test() {
    return (
        <Grid container sx={{ justifyContent: 'center', width: '100%', }}>
            <Grid xs={12} >
                <Header />
            </Grid>
            <Grid xs={12} >
                test
            </Grid>
        </Grid >
    )
}