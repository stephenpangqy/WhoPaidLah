import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
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
    InputAdornment
} from "@mui/material";

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