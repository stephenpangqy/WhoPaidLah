import { useEffect, useState } from "react";
import {
    Grid,
    Button,
    ButtonGroup,
    Table,
    TableHead,
    TableCell,
    TableBody,
    TableRow,
    Box,
    Typography,
    Snackbar,
    Alert,
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from "@mui/material";

function CalculatePayments(props) {
    const [paymentList, setPaymentList] = useState([]);
    // paymentList is a list of JavaScript objects
    // each Object contains the following properties
    //// name --> name of payee
    //// totalAmount --> total amount they need to pay
    //// mathWorking --> mathworking of calculation in String form.

    useEffect(() => {
        let taxType = props.taxType;
        let taxData = props.taxData;
        let names = props.names;
        let assigneeReceiptData = props.assigneeReceiptData;

        console.log(taxData);
        console.log(names);
        console.log(assigneeReceiptData);


        if (taxType === 'percent') {
            console.log("Calculating based on percentage")
            processPaymentListPercent(taxData.taxPercent, names, assigneeReceiptData);
        }
        else if (taxType === 'amount') {
            console.log("Calculating based on amount")
        }
    },[])

    function processPaymentListPercent(taxPercentDecimal, names, assigneeReceiptData) {
        for (let name of names) {
            let costAmount = 0;
            let stringCost = "";
            for (let i = 1; i < assigneeReceiptData.length; i++) {
                // Skip index 0, since that is "Assignee" block
                let paidForItem = false;
                for (let assigneeObj of assigneeReceiptData[i].assignees) {
                    if (assigneeObj.content === name) {
                        paidForItem = true;
                    }
                }
                if (paidForItem) {
                    let itemCost = parseFloat(assigneeReceiptData[i].id.split("$")[1]) / assigneeReceiptData[i].assignees.length;
                    console.log(itemCost);

                    costAmount += itemCost;
                    if (stringCost !== "") {
                        stringCost += " + "
                    }
                    stringCost += assigneeReceiptData[i].id.split("$")[0] + "[" + itemCost + "]";
                }
            }
            // Add Percentage Tax
            costAmount = costAmount + costAmount * taxPercentDecimal;
            stringCost += "\n = " + costAmount;

            // Check results
            console.log(stringCost);
            console.log(costAmount);
        }
    }

    return (
        <h1>Here are the payments for each person:</h1>
    );
}

export default CalculatePayments;