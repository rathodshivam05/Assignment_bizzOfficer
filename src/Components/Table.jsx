import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Stack } from '@mui/system';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { FaTrello, FaCalendarAlt, FaEdit } from "react-icons/fa";
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import AddModal from './AddModal';
import "../App.css";


const columns = [
    { field: 'id', headerName: '#', width: 70 },
    { field: 'caseNumber', headerName: 'Case Number', width: 130, type: "number" },
    { field: 'title', headerName: 'Title', width: 130 },
    { field: 'product', headerName: 'Product', width: 130 },
    {
        field: 'subStatus',
        headerName: 'Sub Status',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 130,
    },
    { field: 'status', headerName: 'Status', width: 130 },
    { field: 'technician', headerName: 'Technician', width: 130 },
    { field: 'technicianStatus', headerName: 'Technician Status', width: 130 },

];

export default function Table() {
    const [data, setData] = useState([]);
    const [caseTypeFilter, setCaseTypeFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [caseFilter, setCaseFilter] = useState("");
    const [gridData, setGridData] = useState([]);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedRow, setSelectedRow] = useState("");
    const [modelMode, setModelMode] = useState("new");


    const getData = () => {
        fetch("https://bizzofficer-json.vercel.app/data")
            .then((r) => r.json())
            .then((res) => {
                // console.log("data", res)
                setData(res);
                setGridData(res);
            })
    }

    useEffect(() => {
        getData();
    }, [])

    const handleOnchange = (e, filter) => {
        // console.log("target valuse", e.target.value)
        switch (filter) {
            case "caseType":
                setCaseTypeFilter(e.target.value);
                filterData(e.target.value, statusFilter, caseFilter);
                break;
            case "status":
                setStatusFilter(e.target.value);
                filterData(caseTypeFilter, e.target.value, caseFilter);
                break;
            case "case":
                setCaseFilter(e.target.value);
                filterData(caseTypeFilter, statusFilter, e.target.value);
                break;

            default:
                break;
        };
    }

    const filterData = (caseType, status, caseName) => {
        // console.log(caseType, status, caseName)

        const filteredData = data.filter((e) => {
            let value = true;
            if (caseType) {
                value = e.title === caseType
                // console.log("value:", value, e.title)
            }
            if (status && value) {
                value = e.subStatus === status
            }
            if (caseName && value) {
                value = e.status === caseName
            }
            if (searchTerm && value) {
                value = e.caseNumber.includes(searchTerm) || e.title.includes(searchTerm) || e.product.includes(searchTerm) || e.subStatus.includes(searchTerm) || e.status.includes(searchTerm) || e.technician.includes(searchTerm) || e.technicianStatus.includes(searchTerm)
            }
            return value;
        })
        setGridData(filteredData);
    };

    const handleSearch = () => {
        filterData(caseTypeFilter, statusFilter, caseFilter)
        // console.log("searchTerm", searchTerm)
        // let searchedData = gridData.filter((el) => {
        //     return (
        //         el.caseNumber.includes(searchTerm) || el.title.includes(searchTerm) || el.product.includes(searchTerm) || el.subStatus.includes(searchTerm) || el.status.includes(searchTerm) || el.technician.includes(searchTerm) || el.technicianStatus.includes(searchTerm)
        //     )
        // });
        // console.log("SEarched Data", searchedData)
        // setGridData(searchedData);
    }
    const deleteRow = () => {
        let filteredData = data.filter((e) => {
            return e.id !== selectedRow;
        })
        let filteredGridData = gridData.filter((e) => {
            return e.id !== selectedRow;
        })
        setData(filteredData);
        setGridData(filteredGridData)
        setSelectedRow();
    }
    return (
        <>
            <Stack direction={"row"} spacing={1} m={2}>
                <select className='filters'>
                    <option value="" >All Channels</option>
                    <option value="">Primary</option>
                    <option value="">Secondary</option>
                </select>
                <select className='filters' value={caseTypeFilter} onChange={(e) => handleOnchange(e, "caseType")}>
                    {/* title */}
                    <option value="">All Case Type</option>
                    <option value="Installation">Installation</option>
                    <option value="Repair">Repair</option>
                    <option value="Replacement">Replacement</option>
                    <option value="Incidende">Incidende</option>
                </select>
                <select className='filters' value={statusFilter} onChange={(e) => handleOnchange(e, "status")}>
                    {/* sub cases */}
                    <option value="">All Status</option>
                    <option value="Completed">Completed</option>
                    <option value="New">New</option>
                    <option value="Cancelled">Cancelled</option>
                </select>
                <select className='filters' value={caseFilter} onChange={(e) => handleOnchange(e, "case")} >
                    {/* status */}
                    <option value="">All Cases</option>
                    <option value="Open">Open</option>
                    <option value="Closed">Closed</option>
                    <option value="Resolved">Resolved</option>
                </select>
                <input type="text" id='inp' value={searchTerm} placeholder='   Search' onChange={(e) => setSearchTerm(e.target.value)} />
                <button className='btn' onClick={handleSearch}>Search</button>
                <IconButton color="primary">
                    <FaTrello />
                </IconButton>
                <IconButton color="primary">
                    <FaCalendarAlt />
                </IconButton>
                <IconButton color="primary" onClick={handleOpen}>
                    <AddCircleIcon />
                </IconButton>
                {
                    selectedRow && (
                        <>
                            <IconButton color="primary" onClick={() => {
                                setModelMode("edit")
                                handleOpen();
                            }}>
                                <FaEdit />
                            </IconButton>
                            <IconButton color="primary" onClick={deleteRow}>
                                <DeleteIcon />
                            </IconButton>
                            <IconButton color="primary" onClick={() => {
                                setModelMode("info");
                                handleOpen();
                            }}>
                                <InfoIcon />
                            </IconButton>
                        </>
                    )
                }
                <AddModal open={open} handleClose={handleClose} data={gridData.find(e => e.id === selectedRow)} mode={modelMode} />
            </Stack>
            <div style={{ height: 450, width: '100%' }}>
                <DataGrid
                    rows={gridData}
                    columns={columns}
                    pageSize={8}
                    rowsPerPageOptions={[8]}
                    onSelectionModelChange={(id) => {
                        setSelectedRow(id[0])
                    }}
                    selectionModel={selectedRow}
                />
            </div>
        </>
    );
}