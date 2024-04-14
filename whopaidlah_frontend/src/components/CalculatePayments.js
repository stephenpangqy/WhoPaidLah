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
        let taxPayees = props.taxPayees;

        console.log(taxData);
        console.log(names);
        console.log(assigneeReceiptData);
        console.log(taxPayees);


        if (taxType === 'percent') {
            console.log("Calculating based on percentage")
            let personCostDictList = processPaymentListPercent(taxData.taxPercent, names, assigneeReceiptData);
            setPaymentList(paymentList => personCostDictList)
        }
        else if (taxType === 'amount') {
            console.log("Calculating based on amount")
            let personCostDictList = processPaymentListAmount(taxData, names, assigneeReceiptData, taxPayees);
            setPaymentList(paymentList => personCostDictList)
        }
    },[])

    // Processes Payment based on Percentage Tax (%)
    function processPaymentListPercent(taxPercentDecimal, names, assigneeReceiptData) {
        let personCostDictList = [];
        for (let name of names) {
            let costAmount = 0;
            let stringCost = "( ";
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
                    if (stringCost !== "( ") {
                        stringCost += " + "
                    }
                    stringCost += assigneeReceiptData[i].id.split("$")[0] + "[$" + itemCost + "]";
                }
            }

            // Add Percentage Tax
            stringCost += " ) x " + (1 + taxPercentDecimal) + " [" + (taxPercentDecimal * 100) + "% tax]"

            costAmount = costAmount + costAmount * taxPercentDecimal;

            // Check results
            console.log(stringCost);
            console.log(costAmount);

            // Form JavaScript Object
            let personObj = {};
            personObj["name"] = name;
            personObj["totalCost"] = costAmount;
            personObj["stringCost"] = stringCost;
            personCostDictList.push(personObj);
        }

        console.log(personCostDictList);

        return personCostDictList;
    }

    // Processes Payment based on Tax Amount ($)
    function processPaymentListAmount(taxAmountDict, names, assigneeReceiptData, taxPayees) {
        // TO DO
        console.log(taxAmountDict);
        console.log(names);
        console.log(assigneeReceiptData);
        console.log(taxPayees);

        let personCostDictList = [];
        for (let name of names) {
            let costAmount = 0;
            let stringCost = "( ";
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
                    if (stringCost !== "( ") {
                        stringCost += " + "
                    }
                    stringCost += assigneeReceiptData[i].id.split("$")[0] + "[$" + itemCost + "] )";
                }
            }

            /////////// Amount Tax Processing
            let totalTax = 0;
            for (let taxName in taxAmountDict) {
                if (taxAmountDict[taxName] !== null) {
                    totalTax = taxAmountDict[taxName];
                }
            }

            if (taxPayees.length <= 0) {
                // No taxPayees means everyone is sharing the tax

                // NEED TO FIX, .length undefined error
                costAmount += (totalTax / names.length);
                stringCost += " + (Total Tax Amount divided by " + names.length + ") [" + (totalTax / names.length) + "] ";
            }
            else {
                // Add tax to cost if they are paying for it
                if (taxPayees.includes(name)) {
                    costAmount += (totalTax / taxPayees.length);
                    stringCost += " + (Total Tax Amount divided by " + taxPayees.length + " payees) [" + (totalTax / taxPayees.length) + "] ";
                }
            }

            // Check results
            console.log(stringCost);
            console.log(costAmount);

            // Form JavaScript Object
            let personObj = {};
            personObj["name"] = name;
            personObj["totalCost"] = costAmount;
            personObj["stringCost"] = stringCost;
            personCostDictList.push(personObj);
        }

        console.log(personCostDictList);

        return personCostDictList;
    }

    return (
        <>
            <h1>Here are the payments for each person:</h1>
            {paymentList.map((paymentObj) => (
                <Grid item xs={12}>
                    <Accordion sx={{ width: "100%", maxWidth: "70%" }}>
                        <AccordionSummary>
                            {paymentObj.name} -- <b>${paymentObj.totalCost.toFixed(2)}</b>
                        </AccordionSummary>
                        <AccordionDetails>
                            <h4>Cost Calculation:</h4>
                            {paymentObj.stringCost}
                        </AccordionDetails>
                    </Accordion>
                </Grid>
            ))}
        </>
    );
}

export default CalculatePayments;