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
                <h1>WhoPaidLah?</h1>
                <p>Your one quick solution to split the cost between friends and family accurately and flexibly.</p>
                <h2>Q: What is this?</h2>
                <p>WhoPaidLah is a web application that helps you to divide the cost of a meal or other purchases by simply uploading the receipt and customizing.</p>
                <h2>Q: How does it work?</h2>
                <p>You just need to perform the following steps:</p>
                <ol type='1'>
                    <li>1. Upload the Receipt as an image</li>
                    <li>2. Enter the names of everyone paying</li>
                    <li>3. Select who has paid for which item(s)</li>
                    <li>4. Customize how you want to distribute tax payment</li>
                    <li>5. Let the app calculate for you!</li>
                </ol>
            </div>
        </Stack>
    )
}

export default Intro;