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

import ImageUploader from '../components/ImageUploader'

function MainPage() {
    useEffect(() => {

    },[])

    return (
        <Grid container spacing={1}>
            <Grid item xs={2}>
                <ImageUploader />
            </Grid>
        </Grid>
    )
}

export default MainPage;