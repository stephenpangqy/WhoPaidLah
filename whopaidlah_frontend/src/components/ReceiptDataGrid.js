import { useEffect, useState } from "react";
import {
    Snackbar
} from "@mui/material";
import { 
    DataGrid,
} from "@mui/x-data-grid";

function ReceiptDataGrid(props) {
    // TO DO
    const [receiptDataRows, setReceiptDataRows] = useState([]);
    const [columns, setColumns] = useState(["Item", "Quantity", "Cost (Item x Quantity)"]);
    const [idsToDelete, setIdsToDelete] = useState([]);

    const [snackbar, setSnackbar] = useState(null);

    useEffect(() => {
        // Populate with initial data
        let newReceiptDataRows = [];
        for (let receiptDataObj of props.receiptData) {
            console.log(receiptDataObj);
            newReceiptDataRows.push([receiptDataObj.description, receiptDataObj.quantity, receiptDataObj.amount_line])
        }
        // CONTINUE
    },[])
    
    return (
        <div>
            <h1>Testing DATAGRID TABLE</h1>
            <DataGrid
                rows={receiptDataRows}
                columns={columns}
                setIdsToDelete={setIdsToDelete}
            />
        </div>
    );
}

export default ReceiptDataGrid;