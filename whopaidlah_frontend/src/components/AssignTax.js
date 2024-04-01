import { useEffect, useState } from "react";
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
    TableBody
} from "@mui/material";
import '../App.css';
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
    const [chosenNames, setChosenNames] = useState([]);

    useEffect(() => {   
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
    },[])

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
        let newTaxData = { 'taxPercent': taxPercentFloat }
        props.updateTaxData(newTaxData)
        startCalculation('percent');
    }

    const handleCheckboxChange = (name) => (event) => {
        const { checked } = event.target;
        console.log(name);
        console.log(event.target);
        console.log(checked);
        formChosenNames.setValue(name, checked);
        console.log(formChosenNames);
    };

    const onSubmitChosenNames = (event) => {
        // Start Calculation
        // For some reason, chosenNames not used
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
        console.log("Updating Tax Data")
        
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
                                <Table sx={{ border: '1px solid black' }}>
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
                                </Table>
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
                            <EnterTax />

                        </>
                    )
                )

            }
        </Grid>
    )
}

export default AssignTax;