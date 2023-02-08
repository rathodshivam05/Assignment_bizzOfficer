import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Stack } from '@mui/system';
import "../App.css"

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 900,
    height: 400,
    overflow: "scroll",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function AddModal({ open, handleClose }) {

    return (
        <div>
            {/* <Button onClick={handleOpen}>Open modal</Button> */}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        New Case
                    </Typography>
                    <form action="">
                        <Box className="box">
                            <Stack spacing={2}>
                                <input type="text" placeholder=' Account Name' />
                                <input type="text" placeholder=' Contact Name' />
                                <input type="number" placeholder='Mobile' />
                                <input type="email" placeholder='Email' />
                                <input type="number" placeholder='Phone' />
                                <input type="text" placeholder='Address' />
                                <input type="number" placeholder='Pin Code' />
                                <input type="text" placeholder='Technician' />
                                <input type="date" placeholder='Appoinment Date' />
                                <select name="" id="">
                                    <option value="">Normal</option>
                                    <option value="">High</option>
                                    <option value="">Emergency</option>
                                </select>
                                <select name="" id="">
                                    <option value="">Select Source</option>
                                    <option value="">Partner</option>
                                    <option value="">Dealer Network</option>
                                    <option value="">Local</option>
                                    <option value="">Customer</option>
                                </select>
                                <input type="number" placeholder='Invoice Number' />
                                <input type="text" placeholder='Case Remarks' />
                                <input type="text" placeholder='Tags' />
                                <input type="checkbox" />Billable
                                <input type="checkbox" />Package Service
                            </Stack>
                            <Stack spacing={2}>
                                <select name="" id="">
                                    <option value="">Select Case Channel</option>
                                    <option value="">Primary</option>
                                    <option value="">Secondary</option>
                                </select>
                                <select name="" id="">
                                    <option value="">Select Case Type</option>
                                </select>
                                <input type="text" placeholder='Case Title' />
                                <select name="" id="">
                                    <option value="">Select Category</option>
                                    <option value="">Electrical</option>
                                    <option value="">Furniture</option>
                                    <option value="">Home Appliances</option>
                                    <option value="">It Products</option>
                                    <option value="">Sports</option>
                                </select>
                                <select name="" id="">
                                    <option value="">Select Category For Product List</option>
                                </select>
                                <select name="" id="">
                                    <option value="">Select Brand</option>
                                    <option value="">Bajaj Electronics</option>
                                    <option value="">Bluestar</option>
                                    <option value="">Godrej</option>
                                    <option value="">Havells</option>
                                </select>

                                <input type="number" placeholder='Serial Number' />
                                <input type="number" placeholder='Model(Series Number)' />
                                <select name="" id="">
                                    <option value="">Select</option>
                                    <option value="">In Warranty</option>
                                    <option value="">Out of Warranty</option>
                                    <option value="">AMC Warranty</option>
                                </select>
                                <select name="" id="">
                                    <option value="">Select Problem</option>
                                </select>
                                <select name="" id="">
                                    <option value="">Select Reason</option>
                                </select>
                                <input type="number" value='1' />
                                <input type="text" placeholder='Products Other details' />
                                <Stack direction="row">
                                    <input type="text" placeholder='Agent' value="Tester" disabled />
                                </Stack>
                            </Stack>
                        </Box>
                        <button>CANCEL</button>
                        <button>SAVE</button>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}
