import { useEffect, useState } from "react";
import {
    Button,
    Snackbar,
    Alert,
} from "@mui/material";
import {
    LoadingButton,
} from "@mui/lab";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import "../App.css";

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

function ImageUploader(props) {
    const [uploadedFile, setUploadedFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMsg, setSnackbarMsg] = useState('');

    function handleCloseSnackbar() {
        setOpenSnackbar(false);
        setSnackbarMsg('');
    }

    useEffect(() => {
    
    },[])

    const handleImageUpload = (event) => {
        setUploadedFile(event.target.files[0]);
        setIsLoading(true);
        setIsDisabled(true);
        let fileName = event.target.files[0].name
        // Check if it is an image (.png, .jpeg, .jpg)
        if (fileName.endsWith('.png') || fileName.endsWith('.jpg') || fileName.endsWith('jpeg')) {
            // Process File and send to API Endpoint for image processing
            // Send to backend to process image
            console.log(event.target.files[0])
            let formData = new FormData();
            formData.append('image', event.target.files[0]);
            axios.post('http://localhost:5000/whopaidlah/processImage', formData)
            .then(response => {
                console.log(response);
                let receiptDataItems = response.data.data[0].item_lines;
                let serviceTaxAmount = response.data.data[0].payment_information.service_charge;
                let totalTaxAmount = response.data.data[0].payment_information.total_tax;
                let taxItems = {"Service Tax": serviceTaxAmount, "Total Tax": totalTaxAmount}
                props.uploadReceiptData(receiptDataItems, taxItems);
            })
            .catch(error => {
                setOpenSnackbar(true);
                setSnackbarMsg(error.message);
            });

        }
        else {
            setOpenSnackbar(true);
            setSnackbarMsg("This is not an image. Please only upload .jpeg, .jpg or .png files.");
        }
        setIsLoading(false);
        setIsDisabled(false);
    };


    return (
        <div className="upload-container">
            <LoadingButton
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                loading={isLoading}
                disabled={isDisabled}
                startIcon={<CloudUploadIcon />}
                >
                Upload Receipt
                <VisuallyHiddenInput onChange={handleImageUpload} type="file" />
            </LoadingButton>
            <Snackbar open={openSnackbar}>
                <Alert onClose={handleCloseSnackbar}
                    severity="error"
                    variant="filled"
                >
                    {snackbarMsg}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default ImageUploader;