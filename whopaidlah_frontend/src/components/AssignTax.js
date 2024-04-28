import { useEffect, useState, useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import {
    Grid,
    Button,
    Stack,
    Typography,
    TextField,
    FormControlLabel,
    FormGroup,
    Checkbox,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Snackbar,
    Alert
} from "@mui/material";
import {
    LoadingButton,
} from "@mui/lab";
import { 
    DataGrid,
} from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EnterTax from "./EnterTax";

function AssignTax(props) {
    // 1st Scenario --> If there are tax Data from Receipt, populate accordingly
        // 1st Prompt, mention our app cannot detect Tax Rate. Check if user wants everyone to pay tax based on what they have ordered
            // If Yes, prompt user to enter tax (in %) to be paid (e.g. service + GST = 19%), then proceed to Calculation
            // If No, proceed to 2nd Prompt
        // 2nd Prompt if everyone sharing tax together
            // If No, checkboxes to select who is paying for the tax
            // If Yes, proceed to Calculation
    // 2nd Scenario --> If there is no taxData from Receipt
        // Prompt user if confirmed that there is no tax
        // If yes, proceed to calculation
        // If No, allow user to enter their Taxes, and then proceed to Calculation

    const [taxData, setTaxData] = useState({});
    const [isGotTax, setIsGotTax] = useState(false); // True if taxData got charge, False if taxData empty
    const [isNotPercentTax, setIsNotPercentTax] = useState(false); // 1st Scenario - 1st Prompt (Yes)
    const [isAddingPercent, setIsAddingPercent] = useState(false); // 1st Scenario - 1st Prompt (No)
    const [isNotSharingTax, setIsNotSharingTax] = useState(false); // 1st Scenario - 2nd prompt (No)
    const [isEnterTax, setIsEnterTax] = useState(false); // 2nd Scenario - User Prompt there is no tax (No)

    const [names, setNames] = useState([]);
    const [taxPayees, setTaxPayees] = useState([]);

    // Data Grid States
    const [columns, setColumns] = useState([
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'tax_name', headerName: 'Tax Name', width: 150, editable: true },
        { field: 'amount', headerName: 'Tax Amount ($)', width: 150, editable: true },
    ])
    const [taxRows, setTaxRows] = useState([]);
    const [idsToDelete, setIdsToDelete] = useState([]);
    const [editRowsModel, setEditRowsModel] = useState({});
    const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
    const [isDisabledDelete, setIsDisabledDelete] = useState(false);
    const [isLoadingDelete, setIsLoadingDelete] = useState(false);

    const [snackbar, setSnackbar] = useState(null);

    const handleCloseSnackbar = () => setSnackbar(null);

    const handleOpenDelCfm = () => setOpenDeleteConfirmation(true);
	const handleCloseDelCfm = () => setOpenDeleteConfirmation(false);

    const processRowUpdate = useCallback((updatedRow) => {
        console.log("HANDLE EDIT ROWS MODEL CHANGE");
        console.log(updatedRow);
        // Update string-ed quantity and amount_line changes back to int and float respectively
        if (typeof updatedRow.amount === "string") {
            updatedRow.amount = parseFloat(updatedRow.amount);
        }
        const updatedRows = taxRows.map((row) =>
            row.id === updatedRow.id ? { ...row, ...updatedRow } : row
        );
        setTaxRows((prevRows) => updatedRows);
        // update ReceiptData in MainPage.js
        props.updateTaxData(updatedRows);
        console.log(updatedRows);
        return updatedRow;
    }, [taxRows]);

    const handleProcessRowUpdateError = useCallback((error) => {
        console.log(error);
		setSnackbar({ children: error.message, severity: "error" });
	}, []);

    const handleDelete = () => {
		setIsLoadingDelete(true);
		setIsDisabledDelete(true);

        const remainingTaxRows = taxRows.filter(row => !idsToDelete.includes(row.id))
        setTaxRows((prevRows) => remainingTaxRows);
        
        props.updateTaxData(remainingTaxRows);
        setIsLoadingDelete(false);
		setIsDisabledDelete(false);
        setOpenDeleteConfirmation(false);
    }

    function addTaxRow(tax_name, tax_amount, tax_percent) {
        console.log("tax name: " + tax_name);
        console.log("tax_amount: " + tax_amount);
        console.log("tax_percent: " + tax_percent);
        let alreadyExistingTax = taxRows.find(row => row.tax_name === tax_name);
        if (alreadyExistingTax !== undefined) {
            alreadyExistingTax.amount += parseFloat(tax_amount);
            setTaxRows(prevTaxRows => 
                taxRows.map((row) => {
                    if (row.tax_name === alreadyExistingTax.tax_name) {
                        return alreadyExistingTax;
                    }
                    else {
                        return row;
                    }
                })
            )
            props.updateTaxData(taxRows);
            setSnackbar({ children: "As there is already a tax with a similar name, we have added on the amount to the existing tax item.", severity: "info" });
        }
        else {
            let taxRow = {}
            taxRow[tax_name] = parseFloat(tax_amount);
            props.addTaxData(taxRow);
        }
    }


    useEffect(() => {   
        let id_count = 1;
        console.log(props.taxData);
        // New Data Grid Table Method (Incomplete)
        let taxDataList = [];
        for (let taxInfo in props.taxData) {
            // Add Non-null taxes
            if (props.taxData[taxInfo] !== null) {
                let taxObj = {id: id_count, tax_name: taxInfo, amount: props.taxData[taxInfo]}
                taxDataList.push(taxObj);
                id_count++;
            }
        }
        setTaxRows(taxDataList)

        // Old Table Method
        let initialTaxData = {};
        for (let taxInfo in props.taxData) {
            if (props.taxData[taxInfo] !== null) {
                initialTaxData[taxInfo] = props.taxData[taxInfo]
            }
        }
        setTaxData(initialTaxData)
        console.log(initialTaxData)
        if (Object.keys(initialTaxData).length > 0) {
            // There is Tax in the Receipt
            setIsGotTax(true);
        }
        setNames(props.names);

        // Remove below line when not testing for no taxData
        // setIsGotTax(false);
    },[props.taxData])

    function onClickChoosePercentTax() {
        setIsAddingPercent(true);
    }

    const formPercentTax = useForm({
        defaultValues: { taxPercent: "" },
	});

    const formChosenNames = useForm({
        defaultValues: {},
    })

    // Submits the new Tax Percentage entered by the user
    const onSubmitTaxPercent = ({ taxPercent }) => {
        // Start Calculation
        console.log(taxPercent);
        let taxPercentFloat = parseFloat(taxPercent) / 100
        let newTaxData = [{ 'tax_name': 'Tax Percentage', 'amount': taxPercentFloat }]
        props.updateTaxData(newTaxData)
        startCalculation('percent');
    }

    const handleCheckboxChange = (name) => (event) => {
        const { checked } = event.target;
        
        let newTaxPayees = [...taxPayees];
        
        // add to taxPayees List
        if (checked === true) {
            newTaxPayees.push(name);
        }
        // Remove from taxPayees List
        else {
            let indexToRemove = newTaxPayees.indexOf(name);
            if (indexToRemove !== -1) {
                newTaxPayees.splice(indexToRemove, 1);
            }
        }
        setTaxPayees(taxPayees => newTaxPayees);
        console.log(newTaxPayees);

        formChosenNames.setValue(name, checked);

    };

    const onSubmitChosenNames = (event) => {
        // NOTE: THIS FUNCTION SEEMS TO NOT BE GETTING CALLED AT ALL
        console.log("SUBMITTING");
        // Start Calculation
        // For some reason, chosenNames not used
        //////////////////// ISSUE
        event.preventDefault();
        console.log(event);

    }
    
    function onClickChooseNotPercentTax() {
        setIsNotPercentTax(true);
    }

    function onClickNotSharingTax() {
        setIsNotSharingTax(true);
    }

    function onClickAddNewTax() {
        setIsEnterTax(true);
    }

    // Calls the startCalculation function on MainPage.js
    function startCalculation(type) {
        // Possible values for type:
        // percent --> if tax is based on % (e.g. 10% Service, 9% GST)\
        // amount --> if tax is based on amount stated on receipt)
        console.log("Calling StartCalculation(AssignTax)")
        
        // Set the Tax Payees (if applicable)
        props.getTaxPayees(taxPayees);
        
        // Set the new Tax Payees on MainPage
        props.getTaxPayees(taxPayees);
        props.startCalculation(type);
    }

    // Helper Functions
    // Converts Input String (e.g. total_tax) to this format (e.g. Total Tax)
    function convertToTitleCase(inputString) {
        // Split the input string by underscore
        let words = inputString.split('_');
    
        // Capitalize the first letter of each word
        let capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
    
        // Join the words back together with a space
        let titleCaseString = capitalizedWords.join(' ');
    
        return titleCaseString;
    }
    

    return (
        <Grid item xs={12}>
            {!!isGotTax ? (
                    !isNotPercentTax ? (
                        !isAddingPercent ? (
                            <>
                                <h1>Here are the following taxes that have been detected:</h1>
                                {/* <Table sx={{ border: '1px solid black' }}>
                                    <TableHead>
                                        <TableRow sx={{ backgroundcolor: 'gray', textWeight: 'bold'}}>
                                            <TableCell>Tax Name</TableCell>
                                            <TableCell>Amount</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {Object.entries(taxData).map(([key, value]) => (
                                            <TableRow key={key}>
                                                <TableCell>{convertToTitleCase(key)}</TableCell>
                                                <TableCell>{value}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table> */}
                                {/*Testing DataGrid */}
                                <div>
                                    <h1>Testing Tax DataGrid</h1>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        startIcon={<DeleteIcon />}
                                        onClick={handleOpenDelCfm}
                                        disabled={idsToDelete.length === 0 ? true : false}
                                    >
                                        Delete Items
                                    </Button>
                                    <DataGrid
                                        rows={taxRows}
                                        columns={columns}
                                        setIdsToDelete={setIdsToDelete}
                                        checkboxSelection={true}
                                        editRowsModel={editRowsModel}
                                        processRowUpdate={processRowUpdate}
                                        onProcessRowUpdateError={handleProcessRowUpdateError}
                                        experimentalFeatures={{ newEditingApi: true }}
                                        onRowSelectionModelChange={(ids) => {
                                            setIdsToDelete(ids);
                                        }}
                                    />
                                </div>
                                <EnterTax addTaxRow={addTaxRow} />
                                {/*Testing DataGrid END */}
                                <h1>Do you choose to do % or tax amount on Items Tax??</h1>
                                <Button
                                    variant="contained"
                                    onClick={onClickChoosePercentTax}
                                >
                                    Pay Tax by Rate (%) based on Items
                                </Button>
                                <Button
                                    variant="contained"
                                    onClick={onClickChooseNotPercentTax}
                                >
                                    Pay Tax by Tax Amount
                                </Button>
                            </>
                        ) : (
                            <>
                                <h1>Enter Total Tax Rate to be paid (e.g. GST 9% + Svc Charge 10% = 19%)</h1>
                                <form onSubmit={formPercentTax.handleSubmit(onSubmitTaxPercent)}>
                                    <Stack spacing={2}>
                                        <Typography fontWeight={"500"}>
                                            Enter Total Tax Percent
                                        </Typography>
                                        <Controller
                                            name={"taxPercent"}
                                            control={formPercentTax.control}
                                            render={({
                                                field: { onChange, value },
                                                fieldState: { error },
                                            }) => (
                                                <TextField
                                                    type="number"
                                                    onChange={onChange}
                                                    value={value}
                                                    label={"Total Tax Percent (%)"}
                                                    error={!!error}
                                                    helperText={error ? error.message : null}
                                                />
                                            )}
                                            rules={{
                                                required: "Tax Rate cannot be empty",
                                            }}
                                        />
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                            // onClick={() => startCalculation('percent')}
                                        >
                                            Start Calculation
                                        </Button>
                                    </Stack>
                                </form>
                            </>
                        )
                    ) : (
                        !isNotSharingTax ? (
                            <>
                                <h1>Okay, Are you splitting the tax amount equally? Or is someone giving a treat :P?</h1>
                                <Button
                                    variant="contained"
                                    onClick={() => startCalculation('amount')}
                                >
                                    Yes, Split Tax Amount with Everyone
                                </Button>
                                <Button
                                    variant="contained"
                                    onClick={onClickNotSharingTax}
                                >
                                    No, Some are Treating Tax!
                                </Button>
                            </>
                        ) : (
                            <>
                                <h1>Checkbox and select who are paying for tax to split among them</h1>
                                <form onSubmit={formChosenNames.handleSubmit(onSubmitChosenNames)}>
                                    <Stack spacing={2}>
                                        <Typography fontWeight={"500"}>
                                            Choose those who are paying for tax.
                                        </Typography>
                                        <FormGroup>
                                            {names.map((name) => (
                                                <Controller
                                                    name={name}
                                                    control={formChosenNames.control}
                                                    render={({
                                                        field: { props },
                                                    }) => (
                                                        <FormControlLabel
                                                            key={name}
                                                            control={
                                                                <Checkbox
                                                                    {...props}
                                                                    checked={formChosenNames.getValues()[name] || false}
                                                                    onChange={handleCheckboxChange(name)}
                                                                />
                                                            }
                                                            label={name}
                                                        />
                                                    )}
                                                />
                                            ))}
                                        </FormGroup>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                            onClick={() => startCalculation('amount')}
                                        >
                                            Start Calculation
                                        </Button>
                                    </Stack>
                                </form>
                            </>
                        )
                        
                    )
                ) : (
                    !isEnterTax ? (
                        <>
                            <h1>Is there confirmed no tax? Press button to Confirm and proceed with Calculation, or allow user to enter tax</h1>
                            <Button
                                variant="contained"
                                onClick={() => startCalculation('amount')}
                            >
                                Yes, there is no tax.
                            </Button>
                            <Button
                                variant="contained"
                                onClick={onClickAddNewTax}
                            >
                                No, there is tax missing
                            </Button>
                        </>
                    ) : (
                        <>
                            <h1>Add Tax Manually now </h1>
                            <EnterTax addTaxRow={addTaxRow} />

                        </>
                    ) 
                )

            }
            {!!snackbar && (
                <Snackbar
                    open
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                    onClose={handleCloseSnackbar}
                >
                    <Alert {...snackbar} onClose={handleCloseSnackbar} />
                </Snackbar>
            )}
            <Dialog open={openDeleteConfirmation} onClose={handleCloseDelCfm}>
                <DialogTitle id="alert-dialog-title">Delete Tax Items?</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete the selected tax items and their amounts from the table?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDelCfm} disabled={isDisabledDelete}>
                        Close
                    </Button>
                    <LoadingButton
                        onClick={handleDelete}
                        autoFocus
                        variant="outlined"
                        color="error"
                        loading={isLoadingDelete}
                        disabled={isDisabledDelete}
                    >
                        Confirm
                    </LoadingButton>
                </DialogActions>
            </Dialog>
        </Grid>
    )
}

export default AssignTax;