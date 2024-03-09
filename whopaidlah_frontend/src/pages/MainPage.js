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
} from "@mui/material";

import ImageUploader from '../components/ImageUploader';
import AddNewItem from '../components/AddNewItem';
import AddNames from '../components/AddNames';
import AssignItems from '../components/AssignItems';

function MainPage() {
    const [receiptData, setReceiptData] = useState([]);
    const [names, setNames] = useState([]);
    const [isAddItem, setIsAddItem] = useState(false);
    const [isAddNames, setIsAddNames] = useState(false);
    const [isAssignItems, setIsAssignItems] = useState(false);

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
        setIsAssignItems(true);
    }

    function addToNames(name) {
        setNames(names => [...names, name]);
    }

    function addToReceiptData(itemName, quantity, cost) {
        // Add more fields here if deemed necessary
        let dataRow = {
            'description': itemName,
            'quantity': quantity,
            'amount_line': cost
        }
        setReceiptData(receiptData => [...receiptData, dataRow]) // Must use this format when modifying lists.
    }

    function dummyOnClick() {
        // Dummy function to simulate uploading of data
        setReceiptData([{'tax': 'None', 'amount_line': 13.7, 'description': 'ShackBurger Double', 'quantity': 1.0, 'unit_price': 'None', 'unit_type': 'None', 'date': 'None', 'product_code': 'None', 'purchase_order': 'None', 'tax_rate': 'None', 'base_total': 'None', 'sub_total': 'None', 'discount_amount': 'None', 'discount_rate': 'None', 'discount_code': 'None', 'order_number': 'None', 'title': 'None'}, {'tax': 'None', 'amount_line': 13.7, 'description': 'ShackBurger Double', 'quantity': 1.0, 'unit_price': 'None', 'unit_type': 'None', 'date': 'None', 'product_code': 'None', 'purchase_order': 'None', 'tax_rate': 'None', 'base_total': 'None', 'sub_total': 'None', 'discount_amount': 'None', 'discount_rate': 'None', 'discount_code': 'None', 'order_number': 'None', 'title': 'None'}, {'tax': 'None', 'amount_line': 9.0, 'description': 'Fifty/Fifty(S)', 'quantity': 2.0, 'unit_price': 'None', 'unit_type': 'None', 'date': 'None', 'product_code': 'None', 'purchase_order': 'None', 'tax_rate': 'None', 'base_total': 'None', 'sub_total': 'None', 'discount_amount': 'None', 'discount_rate': 'None', 'discount_code': 'None', 'order_number': 'None', 'title': 'None'}, {'tax': 'None', 'amount_line': 6.3, 'description': 'Cheese Fries', 'quantity': 1.0, 'unit_price': 'None', 'unit_type': 'None', 'date': 'None', 'product_code': 'None', 'purchase_order': 'None', 'tax_rate': 'None', 'base_total': 'None', 'sub_total': 'None', 'discount_amount': 'None', 'discount_rate': 'None', 'discount_code': 'None', 'order_number': 'None', 'title': 'None'}])
    }

    useEffect(() => {
        console.log("Refreshing Receipt Data")
        // Populate ReceiptData
        console.log(receiptData)
        if (receiptData.length > 0) {
            console.log(receiptData[0].description)
        }
    },[receiptData])

    useEffect(() => {
        console.log("Refreshing Names");
        console.log(names)
    },[names])

    return (
        <Grid container spacing={1}>
            {!isAssignItems ? (
                    !isAddNames ? (
                        receiptData.length === 0 ? (
                            <>
                                <Grid item xs={12}>
                                    No receipt has been uploaded yet.
                                </Grid>
                                <Grid item xs={12}>
                                    {/* <ImageUploader /> */}
                                    <Button
                                        component="label"
                                        role={undefined}
                                        variant="contained"
                                        tabIndex={-1}
                                        onClick={dummyOnClick}
                                        >
                                        Dummy Upload
                                    </Button>
                                </Grid>
                            </>
                        ) : (
                            <>
                                <Grid item xs={12}>
                                    <Table sx={{ border: '1px solid black' }}>
                                        <TableHead>
                                            <TableRow sx={{ backgroundColor: 'gray' }}>
                                                <TableCell>Item</TableCell>
                                                <TableCell>Quantity</TableCell>
                                                <TableCell>Cost (Item x Quantity)</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {receiptData.map((receiptRow) => (
                                                <TableRow key={receiptRow.id}>
                                                    <TableCell>{receiptRow.description}</TableCell>
                                                    <TableCell>{receiptRow.quantity}</TableCell>
                                                    <TableCell>{receiptRow.amount_line}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </Grid>
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
                                    {/* <ImageUploader /> */}
                                    <Button
                                        component="label"
                                        role={undefined}
                                        variant="contained"
                                        tabIndex={-1}
                                        onClick={dummyOnClick}
                                        >
                                        Dummy Re-Upload
                                    </Button>
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
                        <Grid xs={12}>
                            <h1 sx={{ textAlign: 'center' }}>Assign Items</h1>
                        </Grid>
                        <AssignItems />
                    </>
                )
            }
        </Grid>
    )
}

export default MainPage;