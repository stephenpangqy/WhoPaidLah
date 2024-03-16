import { useEffect, useState } from "react";
import {
    Grid,
    Button
} from "@mui/material";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import '../App.css';

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
    const [isPercentTax, setIsPercentTax] = useState(false); // 1st Scenario - 1st Prompt (Yes)
    const [isAddingPercent, setIsAddingPercent] = useState(false); // 1st Scenario - 1st Prompt (No)
    const [isNotSharingTax, setIsNotSharingTax] = useState(false); // 1st Scenario - 2nd prompt (No)
    const [isEnterTax, setIsEnterTax] = useState(false); // 2nd Scenario - User Prompt there is no tax (No)

    useEffect(() => {   
        let initialTaxData = {};
        for (let taxInfo in props.taxData) {
            if (props.taxData[taxInfo] !== null) {
                initialTaxData[taxInfo] = props.taxData[taxInfo]
            }
        }
        setTaxData(initialTaxData)
        // TO CONTINUE
        console.log(initialTaxData)
        if (Object.keys(initialTaxData).length > 0) {
            // There is Tax in the Receipt
            setIsGotTax(true);
        }
    },[])

    function onClickChoosePercentTax() {
        setIsAddingPercent(true);
    }

    return (
        <Grid item xs={12}>
            {!!isGotTax ? (
                    !isPercentTax ? (
                        !isAddingPercent ? (
                            <>
                                <h1>Do you choose to do % or tax amount on Items Tax??</h1>
                                <Button
                                    variant="contained"
                                    onClick={onClickChoosePercentTax}
                                >
                                    Pay Tax by Rate (%) based on Items
                                </Button>
                                <Button
                                    variant="contained"
                                    onClick={'TBA'}
                                >
                                    Pay Tax by Tax Amount
                                </Button>
                            </>
                        ) : (
                            <>
                                <h1>Enter Total Tax Rate to be paid (e.g. GST 9% + Svc Charge 10% = 19%)</h1>
                            </>
                        )
                    ) : (
                        !isNotSharingTax ? (
                            <>
                                <h1>Are you splitting the tax amount equally? Or is someone giving a treat :P?</h1>
                                <Button
                                    variant="contained"
                                    onClick={'TBA'}
                                >
                                    Yes, Split Tax Amount with Everyone
                                </Button>
                                <Button
                                    variant="contained"
                                    onClick={'TBA'}
                                >
                                    No, Some are Treating Tax!
                                </Button>
                            </>
                        ) : (
                            <h1>Checkbox and select who are paying for tax to split among them</h1>
                        )
                        
                    )
                ) : (
                    !isEnterTax ? (
                        <>
                            <h1>Is there confirmed no tax? Press button to Confirm, or proceed to Calculation</h1>
                            <Button
                                variant="contained"
                                onClick={'TBA'}
                            >
                                Yes, Split Tax Amount with Everyone
                            </Button>
                            <Button
                                variant="contained"
                                onClick={'TBA'}
                            >
                                No, Some are Treating Tax!
                            </Button>
                        </>
                    ) : (
                        <h1>Add Tax Manually now </h1>
                    )
                )

            }
        </Grid>
    )
}

export default AssignTax;