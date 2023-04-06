import React, { useCallback, useEffect, useMemo, useState } from 'react';
import MaterialReactTable from 'material-react-table';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    DialogContentText,
    IconButton,
    MenuItem,
    Stack,
    TextField,
    Tooltip,
    Checkbox,
    Typography,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import Alldata from '../asset/data.json';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles'//import themeHis (to config some style)
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs'
import axios from 'axios';

export default function Example() {
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


    const [delopen, setDelOpen] = useState(false);
    const [editopen, setEditOpen] = useState(false);
    const [editingdata, seteEditingData] = useState(
        {
            word: "N/A",
            chinese: "N/A",
            addDateTime: "1999-09-23T13:51:50.417Z",
            learnt: false,
            type: "v"
        }
    )
    const [editdate, setEditDate] = useState("")
    const [baseURL, setbaseURL] = useState("http://localhost:8080")
    const [tableData, setTableData] = useState({
        data: {
            data: [{
                "word": "default",
                "chinese": "default",
                "addDateTime": "2023-03-25T13:51:50Z",
                "learnt": false,
                "type": "v"
            }]
        }
    });

    useEffect(() => {
        axiosget()

    }, []);

    useEffect(() => {
        console.log(tableData)
    }, [tableData]);


    function axiosget() {
        axios.get(baseURL).then((response) => {
            setTableData({ data: response.data });
        });
    }

    useEffect(() => { }, [editdate])
    useEffect(() => { }, [editingdata])
    useEffect(() => { }, [delopen])
    useEffect(() => { }, [editopen])

    const handleDeleteOpen = () => {
        setDelOpen(true);
    };

    const handleDeleteClose = () => {
        setDelOpen(false);
    };

    const handleDeleteSubmit = () => {

        axios.delete(`${baseURL}/word`, {
            word: editingdata.word,
        })
            .then((response) => {
                console.log("Delete success:" + response)
            })
            .catch((err) => {
                console.log(err)
            });
        axiosget()
        setDelOpen(false);
    };

    const handleEditOpen = (row) => {
        seteEditingData(row.original)
        setEditOpen(true);
    };

    const handleEditClose = () => {
        setEditOpen(false);
    };

    const handleEditSubmit = () => {
        axios.put(`${baseURL}/word`, {
            word: editingdata.word,
            chinese: editingdata.chinese,
            addDateTime: editingdata.addDateTime,
            learnt: editingdata.learnt,
            type: editingdata.type
        })
            .then((response) => {
                console.log("Update success:" + response)
            })
            .catch((err) => {
                console.log(err)
            });
        axiosget()
        setEditOpen(false);
    };

    const columns = useMemo(
        () => [
            {
                accessorKey: 'word',
                header: 'Word',
                enableColumnOrdering: false,
                size: 140,
            },
            {
                accessorKey: 'chinese',
                header: 'Chinese',
                size: 140,
            },
            {
                accessorKey: 'addDateTime',
                header: 'Added date',
                size: 140,
                Cell: ({ cell }) => (
                    date(cell)
                ),
            },
            {
                accessorKey: 'learnt',
                header: 'Learnt?',
                Cell: ({ cell }) => (
                    <Checkbox checked={Boolean(cell.row.original.learnt)} />
                ),
            },
        ],
        [],
    );

    function date(cell) {
        return <Box> {new Date(cell.row.original.addDateTime).getFullYear()}/{new Date(cell.row.original.addDateTime).getMonth() + 1}/{new Date(cell.row.original.addDateTime).getDate()}</Box>
    }


    return (
        <ThemeProvider theme={theme}>
            <Grid>
                <MaterialReactTable
                    muiTableContainerProps={{ sx: { maxHeight: '500px' } }}
                    //positionActionsColumn="last"
                    displayColumnDefOptions={{
                        'mrt-row-actions': {
                            muiTableHeadCellProps: {
                                align: 'center',
                            },
                            size: 120,
                        },
                    }} //customized row option
                    columns={columns}
                    data={tableData.data.data}
                    enableColumnOrdering
                    enableRowActions
                    renderRowActions={({ row, table }) => (
                        <Box sx={{ display: 'flex', gap: '1rem' }}>
                            <Tooltip arrow placement="left" title="Edit">
                                <IconButton onClick={() => { handleEditOpen(row) }}>
                                    <Edit />
                                </IconButton>
                            </Tooltip>
                            <Tooltip arrow placement="right" title="Delete">
                                <IconButton color="error" onClick={() => handleDeleteOpen(row)}>
                                    <Delete />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    )}
                />
                <Dialog open={delopen} onClose={handleDeleteClose}>
                    <DialogTitle>Delete Item</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Are you sure you want to delete this item?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDeleteClose}>Cancel</Button>
                        <Button onClick={handleDeleteSubmit}>Delete</Button>
                    </DialogActions>
                </Dialog>

                <Dialog open={editopen} onClose={handleEditClose}>
                    <DialogTitle>Edit Item</DialogTitle>
                    <DialogContent>
                        <Grid contatiner>
                            <TextField
                                margin="dense"
                                label="Word"
                                fullWidth
                                variant="standard"
                                value={editingdata.word}
                                disabled
                            />
                            <TextField
                                margin="dense"
                                label="Chinese"
                                fullWidth
                                variant="standard"
                                value={editingdata.chinese}
                            />
                            <Grid container sx={{ alignItems: "center" }}>
                                <Grid xs={12} sx={{ mr: 2 }}>
                                    <Typography >Date:</Typography>
                                </Grid>
                                <Grid xs={12}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker value={dayjs(editingdata.addDateTime)} onChange={(e) => { setEditDate(e); seteEditingData({ ...editingdata, addDateTime: e.toISOString() }); }} />
                                    </LocalizationProvider>
                                </Grid>
                            </Grid>

                            <Grid container sx={{ alignItems: "center" }}>
                                <Grid xs={12}>
                                    <Typography >Learnt:</Typography>
                                </Grid>
                                <Grid xs={12}>
                                    <Checkbox checked={editingdata.learnt} onChange={(e) => { seteEditingData({ ...editingdata, learnt: e.target.checked }) }} />
                                </Grid>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleEditClose}>Close</Button>
                        <Button onClick={handleEditSubmit}>Submit</Button>
                    </DialogActions>
                </Dialog >
            </Grid>
        </ThemeProvider>
    )
}

