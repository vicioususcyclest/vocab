import Header from "../components/Header";
import History from "../components/History";
import Grid from '@mui/material/Unstable_Grid2';
import Toolbar from '@mui/material/Toolbar';

export default function history() {
    return (

        <Grid container sx={{ justifyContent: 'center', width: '100%', }}>

            <Grid xs={12} >
                <Header />
            </Grid>
            <Grid xs={12} >
                <History />
            </Grid>
        </Grid >
    )
}