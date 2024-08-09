import { useEffect, useState, useCallback } from "react";
import {
    Grid,
    Snackbar,
    Alert,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Stack,
    Item,

} from "@mui/material";
import {
    LoadingButton,
} from "@mui/lab";
import "../App.css"

function Intro() {
    return (
        <Stack spacing={2}>
            <div class="title-container">
                <h1>Jumbotron Auto Viewport Height</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi pariatur laboriosam explicabo recusandae.</p>
                <p><a class="btn btn-primary btn-lg" href="//bootstrapcreative.com/" role="button">Learn more</a></p>
            </div>
        </Stack>
    )
}

export default Intro;