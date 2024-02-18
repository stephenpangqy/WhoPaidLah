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

function MainPage() {
    useEffect(() => {

    },[])

    return (
        <Grid container spacing={1}>
            <Grid item xs={2}>
                <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                    >
                    Upload file
                    <VisuallyHiddenInput type="file" />
                </Button>
            </Grid>
        </Grid>
    )
}

export default MainPage;