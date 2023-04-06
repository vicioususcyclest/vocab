import axios from "axios";
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles'//import theme (to config some style) 
import Typography from '@mui/material/Typography';
import { Checkbox, useTheme, useMediaQuery, TextField, Paper, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
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

export default function Addvocab() {

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

    function handleadd() {
        axios.post(baseURL, {
            word: word,
            chinese: chinese,
            addDateTime: new Date().toISOString(),
            learnt: false,
            type: 'v'
        })
            .then((response) => {
                console.log("Post success:" + response)
                alert("Post success!")
                setword("")
                setchinese("")
            })
            .catch((err) => {
                console.log(err)
            });;

    }
    const [baseURL, setbaseURL] = useState("http://localhost:8080")
    const [word, setword] = useState("")
    const [chinese, setchinese] = useState("")

    return (
        <ThemeProvider theme={theme}>
            <Grid container sx={{ justifyContent: 'center' }}>
                <Grid xs={10} sx={{ mt: '5%' }}>
                    <DialogTitle variant='h2'>
                        <Typography color='#30334f' > Add vocab of today</Typography>

                    </DialogTitle>
                    <DialogContent>
                        {/* <DialogContentText variant='body'> */}
                        <Typography color='#30334f' variant='h5'> Please enter the vocab:</Typography>
                        {/* </DialogContentText> */}
                        <TextField
                            label="English"
                            autoFocus
                            margin="dense"
                            id="name"
                            fullWidth
                            variant="standard"
                            value={word}
                            onChange={(e) => { setword(e.target.value) }}
                        />
                        <TextField
                            label="Chinese"
                            autoFocus
                            margin="dense"
                            id="name"
                            fullWidth
                            variant="standard"
                            value={chinese}
                            onChange={(e) => { setchinese(e.target.value) }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button variant='contained' color='header' onClick={() => { handleadd() }}>Submit</Button>
                    </DialogActions>
                </Grid>
            </Grid>
        </ThemeProvider>
    )
}