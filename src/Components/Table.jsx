import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Stack } from '@mui/system';
import "../App.css"

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
        width: 160,
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
            return value;
        })
        setGridData(filteredData);
    };

    return (
        <>
            <Stack direction={"row"} spacing={3} m={2}>
                <select name="" id="" className='filters'>
                    <option value="" >All Channels</option>
                    <option value="">Primary</option>
                    <option value="">Secondary</option>
                </select>
                <select name="" value={caseTypeFilter} onChange={(e) => handleOnchange(e, "caseType")}>
                    {/* title */}
                    <option value="">All Case Type</option>
                    <option value="Installation">Installation</option>
                    <option value="Repair">Repair</option>
                    <option value="Replacement">Replacement</option>
                    <option value="Incidende">Incidende</option>
                </select>
                <select value={statusFilter} onChange={(e) => handleOnchange(e, "status")}>
                    {/* sub cases */}
                    <option value="">All Status</option>
                    <option value="Completed">Completed</option>
                    <option value="New">New</option>
                    <option value="Cancelled">Cancelled</option>
                </select>
                <select value={caseFilter} onChange={(e) => handleOnchange(e, "case")} >
                    {/* status */}
                    <option value="">All Cases</option>
                    <option value="Open">Open</option>
                    <option value="Closed">Closed</option>
                    <option value="Resolved">Resolved</option>
                </select>
                <input type="text" placeholder='Search' />
                <button>Search</button>
            </Stack>
            <div style={{ height: 450, width: '100%' }}>
                <DataGrid
                    rows={gridData}
                    columns={columns}
                    pageSize={8}
                    rowsPerPageOptions={[8]}
                    checkboxSelection
                />
            </div>
        </>
    );
}
