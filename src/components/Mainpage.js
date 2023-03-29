import axios from "axios";
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles'//import theme (to config some style) 
import Typography from '@mui/material/Typography';
import { Checkbox, useTheme, useMediaQuery, TextField, Paper, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from 'react';
import Data from '../asset/data.json'
import Randvbdata from '../asset/random.json'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import IconButton from '@mui/material/IconButton';
import CasinoIcon from '@mui/icons-material/Casino';

const contenttheme = createTheme({ //Create a theme which set the color
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



export default function Mainpage() {
  const [sortBy, setSortBy] = useState('word'); //Default sort state by vocab
  const [sortOrder, setSortOrder] = useState('asc');
  const [rand, setRand] = useState('');
  // const [baseURL, setBaseURL] = useState('API.com/');
  // const [Data, setData] = useState({ data: [] });

  function getrand() {
    var max = Math.floor(Randvbdata.Randvb.length);
    setRand(Randvbdata.Randvb[Math.floor(Math.random() * (max))])
  }

  // useEffect(() => {
  //   axios.get(baseURL).then((response) => {
  //     setData({ data: response.data });
  //   });
  // }, []);

  // function createvocab() {
  //   axios.post(baseURL, {
  //     word: "Vocab",
  //     chinese: "Chinese",
  //     addDateTime: "yymmdd",
  //     learnt: false
  //   })
  //     .then((response) => {
  //       console.log("Post success:" + response)
  //     });
  // }

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

  useEffect(() => { }, [rand])

  const newdata = () => {
    const unique1 = Data.data.filter((obj, index) => {
      var today = new Date();
      return (index === Data.data.findIndex(o => obj.word === o.word) &&
        new Date(obj.addDateTime).getDate() === today.getDate() &&
        new Date(obj.addDateTime).getMonth() === today.getMonth() &&
        new Date(obj.addDateTime).getFullYear() === today.getFullYear()
      )
    });
    unique1.map((item, index) => { item.word = item.word.toLowerCase() })
    return unique1
  }

  const handleSort = (column) => { //function to change the asc/desc after clicking
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const sortedRows = newdata().sort((a, b) => { //compare each element in the array
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

  const theme = useTheme()
  const [buttonSize, setButtonSize] = useState('large')
  const mobile = useMediaQuery(theme.breakpoints.between('xs', 'md'))

  function defbuttonSize() {
    mobile ? setButtonSize('small') : setButtonSize('large');
  }

  useEffect(() => { defbuttonSize() }, [mobile])

  const [open, setopen] = useState(false)
  return (
    <ThemeProvider theme={contenttheme}>
      <Grid container >
        <Grid container xs={12} sx={{ height: '20vh', minHeight: '120px', textAlign: 'center', justifyContent: 'center' }}>
          <Paper elevation={10} sx={{ width: { xs: '100%', md: '60%' }, height: { xs: '90%', sm: '90% ' }, mt: '2%' }}>
            <Grid container sx={{ height: '18vh', mb: '3%', alignItems: 'center', justifyContent: 'center' }}>
              <Grid container xs={3} sx={{ justifyContent: 'center' }} >
                <Grid>
                  <Typography color='#30334f' sx={{ fontSize: { xs: '20px', sm: '25px', md: '35px', lg: '40px' } }}>
                    Random Vocab:
                  </Typography>
                </Grid><Grid>
                  <IconButton color='header' size='large' onClick={() => { getrand() }} sx={{ display: { xs: 'block', sm: 'none' } }} >
                    <CasinoIcon />
                  </IconButton>
                </Grid>
              </Grid>
              <Grid xs={8} sm={5} sx={{ overflowWrap: { xs: 'break-word', sm: 'normal' } }} >
                <Typography color='#30334f' sx={{ fontSize: { xs: '30px', sm: '50px', lg: '65px' } }}>
                  {rand.word}
                </Typography>
              </Grid>
              <Grid xs={0} sm={3}>
                <IconButton color='header' size='large' onClick={() => { getrand() }} sx={{ display: { xs: 'none', sm: 'block' } }} >
                  <CasinoIcon fontSize='large' />
                </IconButton>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid container xs={12} sx={{ height: '70vh ', textAlign: 'center', justifyContent: 'center' }}>
          <Paper elevation={10} sx={{ width: { xs: '100%', md: '60%' }, height: { xs: '100%', sm: '80% ' }, mt: '5%' }}>
            <Grid container sx={{ mt: '3%', alignItems: 'center' }}>
              <Grid xsOffset={3} smOffset={4} xs={5} sm={4}>
                <Typography color='#30334f' variant='h4'>Today's Vocab</Typography>
              </Grid>

              <Grid xsOffset={1} xs={2} smOffset={0} sm={4} >
                <Button onClick={() => { setopen(true) }} color="header" variant="contained" sx={{ width: { xs: '90px', sm: '150px' } }} startIcon={<AddIcon />}>
                  Add Vocab
                </Button>
                <Dialog open={open} onClose={() => { setopen(false) }}  >
                  <DialogTitle >
                    <Typography color='#30334f' > Add vocab of today</Typography>

                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText >
                      <Typography color='#30334f' > Please enter the vocab:</Typography>
                    </DialogContentText>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="name"
                      fullWidth
                      variant="standard"
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => { setopen(false) }} >Cancel</Button>
                    <Button onClick={() => { setopen(false) }}>Submit</Button>
                  </DialogActions>
                </Dialog>
              </Grid>

              <Grid xs={12} >
                <TableContainer component={Paper} sx={{ maxHeight: '60vh' }}>
                  <Table stickyHeader  >
                    <TableHead>
                      <TableRow>
                        <TableCell align='center'>
                          <IconButton size="small" onClick={() => handleSort('word')} sx={{ fontFamily: contenttheme.typography.fontFamily }}>
                            Vocab
                            {sortBy === 'word' && sortOrder === 'asc' && <ArrowDownwardIcon />}
                            {sortBy === 'word' && sortOrder === 'desc' && <ArrowUpwardIcon />}
                          </IconButton>
                        </TableCell>
                        <TableCell align='center'>
                          <IconButton size="small" onClick={() => { }} sx={{ fontFamily: contenttheme.typography.fontFamily }}>
                            Chinese
                            {/* {sortBy === 'Industry' && sortOrder === 'asc' && <ArrowDownwardIcon />}
                            {sortBy === 'Industry' && sortOrder === 'desc' && <ArrowUpwardIcon />} */}
                          </IconButton>
                        </TableCell>
                        <TableCell align='center' >
                          <IconButton size="small" onClick={() => handleSort('learnt')} sx={{ fontFamily: contenttheme.typography.fontFamily }}>
                            Learnt
                            {sortBy === 'learnt' && sortOrder === 'asc' && <ArrowDownwardIcon />}
                            {sortBy === 'learnt' && sortOrder === 'desc' && <ArrowUpwardIcon />}
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {sortedRows.map((item, index) => (
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