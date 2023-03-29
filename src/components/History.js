import axios from "axios";
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles'//import themeHis (to config some style) 
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

    const [sortBy, setSortBy] = useState('word'); //Default sort state by vocab
    const [sortOrder, setSortOrder] = useState('asc');
    const [showall, setshowall] = useState('block')
    const [showday, setshowday] = useState('none')
    const [disdate, setdisdate] = useState(true)
    const [date, setdate] = useState('')

    const handleSort = (column) => { //function to change the asc/desc after clicking
        console.log(sortBy)
        console.log(column)
        if (sortBy === column) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(column);
            setSortOrder('asc');
        }
    };

    // useEffect(() => {
    //   axios.get(baseURL).then((response) => {
    //     setData({ data: response.data });
    //   });
    // }, []);



    // function updatePost() {
    //   axios.put(`${baseURL}/1`, {
    //     word: "Vocab",
    //     chinese: "Chinese",
    //     addDateTime: "yymmdd",
    //     learnt: false
    //   })
    //     .then((response) => {
    //       console.log("Update success:" + response)
    //     });
    // }

    useEffect(() => { }, [date])

    //Use the sorted data to sort


    const allnewdata = () => {
        const unique1 = Data.data.filter((obj, index) => {
            return index === Data.data.findIndex(o => obj.word === o.word);
        });
        unique1.map((item, index) => { item.word = item.word.toLowerCase() })
        return (unique1 != []) ? unique1 : []
    }

    const sortedallRows = allnewdata().sort((a, b) => { //compare each element in the array
        if (sortOrder === 'asc') {
            //if asc, 1st element in column "sortBy" > 2nd
            // it will return 1 (if return value>0, Sort a after b)
            // else, it will return -1 (if return value<0, Sort a before b)
            // sort till the end of the array
            return a[sortBy] > b[sortBy] ? 1 : -1;
        } else {
            return a[sortBy] < b[sortBy] ? 1 : -1;
        }
    });


    const daynewdata = () => {
        const unique2 = Data.data.filter((obj, index) => {
            var dayselected = new Date(date.toString());
            return (index === Data.data.findIndex(o => obj.word === o.word) &&
                new Date(obj.addDateTime).getDate() === dayselected.getDate() &&
                new Date(obj.addDateTime).getMonth() === dayselected.getMonth() &&
                new Date(obj.addDateTime).getFullYear() === dayselected.getFullYear()
            )
        });
        unique2.map((item, index) => { item.word = item.word.toLowerCase() })
        return unique2
    }

    const sorteddayRows = daynewdata().sort((a, b) => { //compare each element in the array
        if (sortOrder === 'asc') {
            //if asc, 1st element in column "sortBy" > 2nd
            // it will return 1 (if return value>0, Sort a after b)
            // else, it will return -1 (if return value<0, Sort a before b)
            // sort till the end of the array
            return a[sortBy] > b[sortBy] ? 1 : -1;
        } else {
            return a[sortBy] < b[sortBy] ? 1 : -1;
        }
    });



    function setallorday(checked) {
        if (checked) {
            setshowday('none')
            setdisdate(true)
            setshowall('block')
            setSortBy('word');
            setSortOrder('asc');
            //show all data
        } else {
            setshowday('block')
            setdisdate(false)
            setshowall('none')
            setSortBy('word');
            setSortOrder('asc');
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
                                <Grid xs={12} sm={2} sx={{ border: 'solid 1px red' }}>
                                    <Typography sx={{ fontSize: { xs: '20px', sm: '25px' } }}>All</Typography>
                                </Grid>
                                <Grid xs={12} sm={2} sx={{ border: 'solid 1px red', }}>
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
                                <TableContainer className="all" component={Paper} sx={{ maxHeight: '60vh', display: showall }}>
                                    <Table stickyHeader sx={{ tableLayout: "fixed" }} >
                                        <TableHead >
                                            <TableRow >

                                                <TableCell align='center' >
                                                    <IconButton size="small" onClick={() => handleSort('word')} sx={{ fontFamily: themeHis.typography.fontFamily }}>
                                                        Vocab
                                                        {sortBy === 'word' && sortOrder === 'asc' && <ArrowDownwardIcon />}
                                                        {sortBy === 'word' && sortOrder === 'desc' && <ArrowUpwardIcon />}
                                                    </IconButton>
                                                </TableCell>
                                                <TableCell align='center'>
                                                    <IconButton size="small" onClick={() => { }} sx={{ fontFamily: themeHis.typography.fontFamily }}>
                                                        Chinese
                                                        {sortBy === 'chinese' && sortOrder === 'asc' && <ArrowDownwardIcon />}
                                                        {sortBy === 'chinese' && sortOrder === 'desc' && <ArrowUpwardIcon />}
                                                    </IconButton>
                                                </TableCell>
                                                <TableCell align='center' >
                                                    <IconButton size="small" onClick={() => handleSort('learnt')} sx={{ fontFamily: themeHis.typography.fontFamily }}>
                                                        Learnt
                                                        {sortBy === 'learnt' && sortOrder === 'asc' && <ArrowDownwardIcon />}
                                                        {sortBy === 'learnt' && sortOrder === 'desc' && <ArrowUpwardIcon />}
                                                    </IconButton>
                                                </TableCell>
                                                <TableCell align='center' >
                                                    <IconButton size="small" onClick={() => handleSort('addDateTime')} sx={{ fontFamily: themeHis.typography.fontFamily }}>
                                                        Added Date
                                                        {sortBy === 'addDateTime' && sortOrder === 'asc' && <ArrowDownwardIcon />}
                                                        {sortBy === 'addDateTime' && sortOrder === 'desc' && <ArrowUpwardIcon />}
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {sortedallRows.map((item, index) => (
                                                <TableRow
                                                    key={item.word}
                                                //sx={{ '&:last-child td, &:last-child th': { border: 0 } }} //Useless in this prog
                                                >
                                                    <TableCell align='center' component="th" /* th = table header cell */ scope="item" sx={{ overflowWrap: { xs: 'break-word', sm: 'normal' } }}>
                                                        {item.word}
                                                    </TableCell>
                                                    <TableCell align='center' >{item.chinese}</TableCell>
                                                    <TableCell align='center'>
                                                        <Checkbox
                                                            disableRipple
                                                            checked={item.learnt}
                                                        />
                                                    </TableCell>
                                                    <TableCell align='center' sx={{ overflowWrap: { xs: 'break-word', sm: 'normal' } }}>
                                                        {new Date(item.addDateTime).getFullYear()}/{new Date(item.addDateTime).getMonth() + 1}/{new Date(item.addDateTime).getDate()}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <TableContainer className="day" component={Paper} sx={{ maxHeight: '60vh', display: showday }}>

                                    <Table stickyHeader sx={{ tableLayout: "fixed" }} >
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align='center'>
                                                    <IconButton size="small" onClick={() => handleSort('word')} sx={{ fontFamily: themeHis.typography.fontFamily }}>
                                                        Vocab
                                                        {sortBy === 'word' && sortOrder === 'asc' && <ArrowDownwardIcon />}
                                                        {sortBy === 'word' && sortOrder === 'desc' && <ArrowUpwardIcon />}
                                                    </IconButton>
                                                </TableCell>
                                                <TableCell align='center'>
                                                    <IconButton size="small" onClick={() => { }} sx={{ fontFamily: themeHis.typography.fontFamily }}>
                                                        Chinese
                                                        {sortBy === 'chinese' && sortOrder === 'asc' && <ArrowDownwardIcon />}
                                                        {sortBy === 'chinese' && sortOrder === 'desc' && <ArrowUpwardIcon />}
                                                    </IconButton>
                                                </TableCell>
                                                <TableCell align='center' >
                                                    <IconButton size="small" onClick={() => handleSort('learnt')} sx={{ fontFamily: themeHis.typography.fontFamily }}>
                                                        Learnt
                                                        {sortBy === 'learnt' && sortOrder === 'asc' && <ArrowDownwardIcon />}
                                                        {sortBy === 'learnt' && sortOrder === 'desc' && <ArrowUpwardIcon />}
                                                    </IconButton>
                                                </TableCell>
                                                <TableCell align='center' >
                                                    <IconButton size="small" onClick={() => handleSort('addDateTime')} sx={{ fontFamily: themeHis.typography.fontFamily }}>
                                                        Added Date
                                                        {sortBy === 'addDateTime' && sortOrder === 'asc' && <ArrowDownwardIcon />}
                                                        {sortBy === 'addDateTime' && sortOrder === 'desc' && <ArrowUpwardIcon />}
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {sorteddayRows.map((item, index) => (
                                                <TableRow
                                                    key={item.word}
                                                //sx={{ '&:last-child td, &:last-child th': { border: 0 } }} //Useless in this prog
                                                >
                                                    <TableCell align='center' component="th" /* th = table header cell */ scope="item" sx={{ overflowWrap: { xs: 'break-word', sm: 'normal' } }}>
                                                        {item.word}
                                                    </TableCell>
                                                    <TableCell align='center' >{item.chinese}</TableCell>
                                                    <TableCell align='center'>
                                                        <Checkbox
                                                            disableRipple
                                                            checked={item.learnt}
                                                        />
                                                    </TableCell>
                                                    <TableCell align='center' sx={{ overflowWrap: { xs: 'break-word', sm: 'normal' } }} >
                                                        {new Date(item.addDateTime).getFullYear()}/{new Date(item.addDateTime).getMonth() + 1}/{new Date(item.addDateTime).getDate()}
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
            </Grid >
        </ThemeProvider >
    )
}