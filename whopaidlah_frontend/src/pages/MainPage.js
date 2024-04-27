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
    Alert
} from "@mui/material";

import ImageUploader from '../components/ImageUploader';
import AddNewItem from '../components/AddNewItem';
import AddNames from '../components/AddNames';
import AssignItems from '../components/AssignItems';
import AssignTax from "../components/AssignTax";
import CalculatePayments from "../components/CalculatePayments";
import ReceiptDataGrid from "../components/ReceiptDataGrid";

function MainPage() {
    const [receiptData, setReceiptData] = useState([]);
    const [taxData, setTaxData] = useState({});
    const [names, setNames] = useState([]);
    const [isAddItem, setIsAddItem] = useState(false);
    const [isAddNames, setIsAddNames] = useState(false);
    const [isAssignItems, setIsAssignItems] = useState(false);
    const [isAssignTax, setIsAssignTax] = useState(false);

    const [assigneeReceiptData, setAssigneeReceiptData] = useState([]);

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [openSnackbarInfo, setOpenSnackbarInfo] = useState(false);
    const [infoMsg, setInfoMsg] = useState('');

    const [isCalculation, setIsCalculation] = useState(false);
    const [taxType, setTaxType] = useState('');
    const [taxPayees, setTaxPayees] = useState([]); // if person decides for certain people to pay tax only

    function onClickAddItem() {
        setIsAddItem(true);
    }

    function onClickDontAddItem() {
        setIsAddItem(false);
    }

    function onClickProceedToNames() {
        setIsAddNames(true);
    }

    function onClickProceedToAssign() {
        if (names.length <= 1) {
            setOpenSnackbar(true);
            setErrorMsg("You have to enter AT LEAST 2 people to split the bill!")
            return;
        }
        setIsAssignItems(true);
        setOpenSnackbar(false);
    }

    function addToNames(name) {
        if (names.includes(name)) {
            setOpenSnackbar(true);
            setErrorMsg("This name has already been added, please add different one!")
        }
        else {
            setNames(names => [...names, name]);
        }
    }

    function addToReceiptData(itemName, quantity, cost) {
        // Add more fields here if deemed necessary
        let originalReceiptData = [...receiptData];
        console.log(originalReceiptData);
        // Search for duplicates
        let alreadyExistingObject = originalReceiptData.find(obj => obj.description === itemName)
        if (alreadyExistingObject !== undefined) {
            alreadyExistingObject.quantity += parseInt(quantity);
            alreadyExistingObject.amount_line += parseFloat(cost);
            setReceiptData(receiptData =>
                receiptData.map((receiptObj) => {
                        if (receiptObj.description === alreadyExistingObject.description) {
                            return alreadyExistingObject;
                        }
                        else {
                            return receiptObj;
                        }
                    }
                )
            )
            setOpenSnackbarInfo(true);
            setInfoMsg('As this item already exists in the table, we have updated the quantity and cost accordingly.')
        }
        else {
            let dataRow = {
                'description': itemName,
                'quantity': parseInt(quantity),
                'amount_line': parseFloat(cost)
            }
            setReceiptData(receiptData => [...receiptData, dataRow]) // Must use this format when modifying lists.
        }
    }

    function updateMainReceiptData(updatedRows) {
        setReceiptData(updatedRows);
    }

    function updateAssigneeReceiptData(itemDict) {
        setAssigneeReceiptData(assigneeReceiptData => [...itemDict]);
    }

    function onClickProceedToTax() {
        // Verifying that all items have at least one payee, if not stop the process.
        for (let receiptObject of assigneeReceiptData) {
            console.log(receiptObject);
            if (receiptObject.assignees.length <= 0) {
                setOpenSnackbar(true);
                setErrorMsg('Please ensure that every item has at least one person assigned to pay for it!')
                return;
            }
        }
        setIsAssignTax(true);
        setOpenSnackbar(false);
    }

    // Replaces TaxData with % Tax
    function updateTaxData(newTaxRows) {
        // reformat newTaxRows
        let newTaxData = {};
        console.log(newTaxRows);
        for (let taxRow of newTaxRows) {
            newTaxData[taxRow.tax_name] = taxRow.amount;
        }
        setTaxData(newTaxData);
    }

    function addTaxData(newTaxRow) {
        let newTaxData = taxData;
        let finalTaxData = {...newTaxData, ...newTaxRow}
        setTaxData(prevTaxData => finalTaxData);
    }

    function startCalculation(type) {
        console.log(type);
        setIsCalculation(true);
        console.log("CALCULATING INDIVIDUAL PAYMENTS");
        console.log(taxData);
        setTaxType(type);
    }

    function getTaxPayees(taxPayees) {
        setTaxPayees(taxPayees);
    }

    function handleCloseSnackbar() {
        setOpenSnackbar(false);
        setErrorMsg('');
    }

    function handleCloseSnackbarInfo() {
        setOpenSnackbarInfo(false);
        setInfoMsg('');
    }

    function uploadReceiptData(receiptDataItems, taxItems) {
        console.log(receiptDataItems);
        console.log(taxItems);
        let newReceiptData = [...receiptDataItems];
        // Remove all zero costing items from the list
        newReceiptData = newReceiptData.filter(receiptItem => receiptItem.amount_line !== 0);
        for (let taxName in taxItems) {
            if (taxItems[taxName] === 0) {
                delete taxItems[taxName];
            }
        }
        setReceiptData(receiptData => newReceiptData);
        setTaxData(taxData => taxItems);
    }

    useEffect(() => {

    },[receiptData])

    useEffect(() => {

    },[names])

    return (
        <Grid container spacing={1}>
            {!isCalculation ? (
                !isAssignTax ? (
                    !isAssignItems ? (
                            !isAddNames ? (
                                receiptData.length === 0 ? (
                                    <>
                                        <Grid item xs={12}>
                                            No receipt has been uploaded yet.
                                        </Grid>
                                        <Grid item xs={12}>
                                            <ImageUploader uploadReceiptData={uploadReceiptData} />
                                        </Grid>
                                    </>
                                ) : (
                                    <>
                                        {/*Testing DataGrid */}
                                        <Grid item xs={12}>
                                            <ReceiptDataGrid receiptData={receiptData} updateMainReceiptData={updateMainReceiptData} />
                                        </Grid>
                                        {/*Testing DataGrid END */}
                                        <Grid item xs={6}>
                                            Is this all of the items on the receipt? If not, you can manually add by clicking the orange button.
                                        </Grid>
                                        <Grid item xs={6}>
                                            <ButtonGroup variant="contained">
                                                {!!isAddItem ? (
                                                    <Button variant="contained" size="medium" sx={{ backgroundColor: 'orange', p: 1 }} onClick={onClickDontAddItem}>
                                                        Stop Adding Items
                                                    </Button>
                                                ) : (
                                                    <Button variant="contained" size="medium" sx={{ backgroundColor: 'orange', p: 1 }} onClick={onClickAddItem}>
                                                        Add New Items
                                                    </Button>
                                                )}
                                                <Button variant="contained" size="medium" sx={{ p: 3 }} color='success' onClick={onClickProceedToNames}>
                                                    Proceed
                                                </Button>
                                            </ButtonGroup>
                                        </Grid>
                                        {!!isAddItem && (
                                            <AddNewItem submitNewItem={addToReceiptData} />
                                        )}
                                        <Grid item xs={12}>
                                            <ImageUploader uploadReceiptData={uploadReceiptData} />
                                            {/* <Button
                                                component="label"
                                                role={undefined}
                                                variant="contained"
                                                tabIndex={-1}
                                                onClick={dummyOnClick}
                                                > 
                                                Dummy Re-Upload
                                            </Button> */}
                                        </Grid>
                                    </>
                                )
                            ) : (
                                <>
                                <Grid item xs={12}>
                                    <h1>Great! Now enter the names of the payees, including yourself!</h1>
                                </Grid>
                                    {names.map((name) => (
                                        <Grid item xs={12}>
                                            <Box sx={{ p: 2, border: '1px dashed grey' }}>
                                                <Typography>{name}</Typography>
                                            </Box>
                                        </Grid>
                                    ))}
                                    <AddNames namesList={names} addToNames={addToNames} />
                                    <Grid item xs={12}>
                                        <Button variant="contained" size="medium" sx={{ p: 3 }} color='success' onClick={onClickProceedToAssign}>
                                            Assign Items
                                        </Button>
                                    </Grid>
                                </>
                            )
                        ) : (
                            <>
                                <Grid item xs={12}>
                                    <h1 sx={{ textAlign: 'center' }}>Assign Payees</h1>
                                </Grid>
                                <AssignItems receiptData={receiptData} names={names} updateAssigneeReceiptData={updateAssigneeReceiptData} />
                                <Button variant="contained" size="medium" sx={{ p: 3 }} color='success' onClick={onClickProceedToTax}>
                                    Assign Tax
                                </Button>
                            </>
                        )
                    ) : (
                        <>
                            <Grid item xs={12}>
                                <h1 sx={{ textAlign: 'center' }}>Assign Taxes</h1>
                            </Grid>
                            <AssignTax names={names} taxData={taxData} startCalculation={startCalculation} updateTaxData={updateTaxData} getTaxPayees={getTaxPayees} addTaxData={addTaxData} />
                        </>
                    )
                ) : (
                    <CalculatePayments taxType={taxType} taxData={taxData} names={names} assigneeReceiptData={assigneeReceiptData} taxPayees={taxPayees} />
                )
            }
            <Snackbar
                open={openSnackbar}
            >
                <Alert onClose={handleCloseSnackbar}
                    severity="error"
                    variant="filled"
                >
                    {errorMsg}
                </Alert>
            </Snackbar>
            <Snackbar
                open={openSnackbarInfo}
            >
                <Alert onClose={handleCloseSnackbarInfo}
                    severity="info"
                    variant="filled"
                >
                    {infoMsg}
                </Alert>
            </Snackbar>
        </Grid>

    )
}

export default MainPage;