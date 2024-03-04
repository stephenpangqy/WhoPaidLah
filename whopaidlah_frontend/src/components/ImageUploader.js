import { useEffect, useState } from "react";
import {
    Button,
} from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import axios from 'axios';

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

function ImageUploader() {
    const [uploadedFile, setUploadedFile] = useState(null);

    useEffect(() => {
    
    },[])

    const handleImageUpload = (event) => {
        setUploadedFile(event.target.files[0]);
        let fileName = event.target.files[0].name
        // Check if it is an image (.png, .jpeg, .jpg)
        if (fileName.endsWith('.png') || fileName.endsWith('.jpg') || fileName.endsWith('jpeg')) {
            console.log("File is image");
            // Process File and send to API Endpoint for image processing
            // Send to backend to process image
            console.log(event.target.files[0])
            let formData = new FormData();
            formData.append('image', event.target.files[0]);
            axios.post('http://localhost:5000/whopaidlah/processImage', formData)
            .then(response => {
                console.log(response);
            })
            .catch(error => {

            });

        }
        else {
            console.log("This is not an image. Please only upload .jpeg, .jpg or .png files.")
        }
    };


    return (
        <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
            >
            Upload Image
            <VisuallyHiddenInput onChange={handleImageUpload} type="file" />
        </Button>
    )
}

export default ImageUploader;