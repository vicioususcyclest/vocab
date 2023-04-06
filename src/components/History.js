import axios from "axios";
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles'//import themeHis (to config some style) 
import Typography from '@mui/material/Typography';
import { Toolbar, Switch, FormGroup, FormControlLabel, Checkbox, useTheme, useMediaQuery, TextField, Paper, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState, useMemo } from 'react';
import Data from '../asset/data.json'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import IconButton from '@mui/material/IconButton';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TableAll from "./TableAll";
import TableDay from "./TableDay";
import dayjs from 'dayjs';

export default function History() {

    const [showall, setshowall] = useState('block')
    const [showday, setshowday] = useState('none')
    const [disdate, setdisdate] = useState(true)
    const [date, setdate] = useState(dayjs())

    useEffect(() => { console.log(date) }, [date])

    function setallorday(checked) {
        if (checked) {
            setshowday('none')
            setdisdate(true)
            setshowall('block')
            //show all data
        } else {
            setshowday('block')
            setdisdate(false)
            setshowall('none')
            //filter the data to that day
        }
    }

    useEffect(() => { }, [showday])

    const themeHis = createTheme({
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

    return (
        <ThemeProvider theme={themeHis}>
            <Grid container >
                <Grid container xs={12} sx={{ height: '90vh ', textAlign: 'center', justifyContent: 'center' }}>
                    <Paper elevation={10} sx={{ overflow: 'hidden', width: { xs: '100%', sm: '90%' }, height: { xs: '100%', sm: '80% ' }, mt: '5%', mb: '10%' }}>
                        <Grid container sx={{ mt: '3%', alignItems: 'center', justifyContent: 'spaceEvenly' }}>
                            <Grid container xsOffset={1} xs={2} sx={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Grid xs={12} sm={2} >
                                    <Typography sx={{ fontSize: { xs: '20px', sm: '25px' } }}>All</Typography>
                                </Grid>
                                <Grid xs={12} sm={2}>
                                    <Switch defaultChecked onChange={(event) => { setallorday(event.target.checked) }} />
                                </Grid>
                            </Grid>
                            <Grid xs={9}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker value={date} onChange={(e) => setdate(e)} disabled={disdate} />
                                </LocalizationProvider>
                            </Grid>
                        </Grid>
                        <Grid container sx={{ mt: '3%', alignItems: 'center', justifyContent: 'center' }}>
                            <Grid xs={10} >
                                <Grid sx={{ display: showall }}>
                                    <TableAll />
                                </Grid>
                                <Grid sx={{ display: showday }}>
                                    <TableDay dayselected={date} />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid >
        </ThemeProvider >
    )
};