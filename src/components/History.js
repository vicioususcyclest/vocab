import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles'//import theme (to config some style) 
import Typography from '@mui/material/Typography';
import { Toolbar, Switch, FormGroup, FormControlLabel, Checkbox, useTheme, useMediaQuery, TextField, Paper, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from 'react';
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


export default function History() {

    const [showall, setshowall] = useState('block')
    const [showday, setshowday] = useState('none')

    const newdata = () => {
        const unique2 = Data.data.filter((obj, index) => {
            return index === Data.data.findIndex(o => obj.word === o.word);
        });
        return unique2
    }

    function setallorday(checked) {
        if (checked) {
            setshowday('none')
            setshowall('block')
        } else {
            setshowday('block')
            setshowall('none')
        }
    }

    useEffect(() => { }, [showday])

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

    return (
        <ThemeProvider theme={theme}>
            <Toolbar />
            <Grid container >
                <Grid container xs={12} sx={{ height: '90vh ', textAlign: 'center', justifyContent: 'center' }}>
                    <Paper elevation={10} sx={{ width: { xs: '100%', sm: '90%' }, height: { xs: '100%', sm: '80% ' }, mt: '5%', mb: '10%' }}>
                        <Grid container sx={{ mt: '3%', alignItems: 'center', justifyContent: 'center' }}>
                            <Grid >
                                <FormGroup >
                                    <FormControlLabel control={<Switch defaultChecked onChange={(event) => { setallorday(event.target.checked) }} />} label="All" labelPlacement="start" />
                                </FormGroup>
                            </Grid>
                            <Grid xs={6}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker />
                                </LocalizationProvider>
                            </Grid>
                            <Grid xs={10} >
                                <TableContainer className="all" component={Paper} sx={{ maxHeight: '60vh', display: showall }}>
                                    ALL
                                    <Table stickyHeader  >
                                        <TableHead>
                                            <TableRow>

                                                <TableCell align='center'>
                                                    {/* <IconButton size="small" onClick={() => handleSort('Company')}> */}
                                                    Vocab
                                                    {/* {sortBy === 'Company' && sortOrder === 'asc' && <ArrowDownwardIcon />}
                                                        {sortBy === 'Company' && sortOrder === 'desc' && <ArrowUpwardIcon />}
                                                    </IconButton> */}
                                                </TableCell>
                                                <TableCell align='center'>
                                                    {/* <IconButton size="small" onClick={() => handleSort('Industry')}> */}
                                                    Chinese
                                                    {/* {sortBy === 'Industry' && sortOrder === 'asc' && <ArrowDownwardIcon />}
                                                        {sortBy === 'Industry' && sortOrder === 'desc' && <ArrowUpwardIcon />}
                                                    </IconButton> */}
                                                </TableCell>
                                                <TableCell align='center' >
                                                    {/* <IconButton size="small" onClick={() => handleSort('Position')}> */}
                                                    Learnt
                                                    {/* {sortBy === 'Position' && sortOrder === 'asc' && <ArrowDownwardIcon />}
                                                        {sortBy === 'Position' && sortOrder === 'desc' && <ArrowUpwardIcon />}
                                                    </IconButton> */}
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {newdata().map((item, index) => (
                                                <TableRow
                                                    key={item.word}
                                                //sx={{ '&:last-child td, &:last-child th': { border: 0 } }} //Useless in this prog
                                                >
                                                    <TableCell align='center' component="th" /* th = table header cell */ scope="item">
                                                        {item.word}
                                                    </TableCell>
                                                    <TableCell align='center' >{item.chinese}</TableCell>
                                                    <TableCell align='center'>
                                                        <Checkbox
                                                            disableRipple
                                                            checked={item.learnt}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <TableContainer className="day" component={Paper} sx={{ maxHeight: '60vh', display: showday }}>
                                    DAY
                                    <Table stickyHeader  >
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align='center'>
                                                    {/* <IconButton size="small" onClick={() => handleSort('Company')}> */}
                                                    Vocab
                                                    {/* {sortBy === 'Company' && sortOrder === 'asc' && <ArrowDownwardIcon />}
                                                        {sortBy === 'Company' && sortOrder === 'desc' && <ArrowUpwardIcon />}
                                                    </IconButton> */}
                                                </TableCell>
                                                <TableCell align='center'>
                                                    {/* <IconButton size="small" onClick={() => handleSort('Industry')}> */}
                                                    Chinese
                                                    {/* {sortBy === 'Industry' && sortOrder === 'asc' && <ArrowDownwardIcon />}
                                                        {sortBy === 'Industry' && sortOrder === 'desc' && <ArrowUpwardIcon />}
                                                    </IconButton> */}
                                                </TableCell>
                                                <TableCell align='center' >
                                                    {/* <IconButton size="small" onClick={() => handleSort('Position')}> */}
                                                    Learnt
                                                    {/* {sortBy === 'Position' && sortOrder === 'asc' && <ArrowDownwardIcon />}
                                                        {sortBy === 'Position' && sortOrder === 'desc' && <ArrowUpwardIcon />}
                                                    </IconButton> */}
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {newdata().map((item, index) => (
                                                <TableRow
                                                    key={item.word}
                                                //sx={{ '&:last-child td, &:last-child th': { border: 0 } }} //Useless in this prog
                                                >
                                                    <TableCell align='center' component="th" /* th = table header cell */ scope="item">
                                                        {item.word}
                                                    </TableCell>
                                                    <TableCell align='center' >{item.chinese}</TableCell>
                                                    <TableCell align='center'>
                                                        <Checkbox
                                                            disableRipple
                                                            checked={item.learnt}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </ThemeProvider>
    )
}