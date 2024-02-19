import { useEffect, useState } from "react";
import {
	AppBar,
	Box,
	Toolbar,
	IconButton,
	Menu,
	MenuItem,
	Container,
	Link,
    Grid,
    Stack,
    TextField,
    Autocomplete,
    Typography,
    Select,
    InputLabel,
    FormControl,
    List,
    ListSubheader,
    ListItemButton,
    ListItemText,
    ListItemIcon,
    Collapse,
    InputAdornment,
    Button,
} from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';

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

    const handleFileChange = (event) => {
        setUploadedFile(event.target.files[0]);
    };

    const handleUpload = () => {
        if (uploadedFile) {
            console.log("File received", uploadedFile.name);
            console.log(uploadedFile);
        } else {
            console.log("No file selected");
        }
    }

    return (
        <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
            onClick={handleUpload}
            >
            Upload file
            <VisuallyHiddenInput onChange={handleFileChange} type="file" />
        </Button>
    )
}

export default ImageUploader;