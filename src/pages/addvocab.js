import Header from "../components/Header";
import Addvocab from "../components/Addvocab";
import Grid from '@mui/material/Unstable_Grid2';
import Toolbar from '@mui/material/Toolbar';

export default function addvocab() {
    return (
        <Grid container sx={{ justifyContent: 'center', width: '100%', }}>
            <Toolbar />
            <Grid xs={12} maxWidth="xl">
                <Header />
            </Grid>
            <Grid xs={12} maxWidth="xl">
                <Addvocab />
            </Grid>


        </Grid >
    )
}