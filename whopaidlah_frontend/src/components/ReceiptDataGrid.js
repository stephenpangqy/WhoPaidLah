import { useEffect, useState, useCallback, useMutation } from "react";
import {
    Snackbar,
    Alert
} from "@mui/material";
import { 
    DataGrid,
} from "@mui/x-data-grid";

function ReceiptDataGrid(props) {
    // TO DO
    const [receiptDataRows, setReceiptDataRows] = useState([]);
    const [columns, setColumns] = useState([
        { field: 'description', headerName: 'Item', width: 150, editable: true },
        { field: 'quantity', headerName: 'Quantity', width: 150, editable: true },
        { field: 'amount_line', headerName: 'Cost (Item x Quantity)', width: 150, editable: true },
    ]);
    const [idsToDelete, setIdsToDelete] = useState([]);
    const [primaryKeys, setPrimaryKeys] = useState([]);

    const [snackbar, setSnackbar] = useState(null);

    const processRowUpdate = useCallback(
        console.log("Proces Row Update")
	);

    const handleProcessRowUpdateError = useCallback((error) => {
		setSnackbar({ children: error.message, severity: "error" });
	}, []);

    const handleCloseSnackbar = () => setSnackbar(null);

    useEffect(() => {
        // Populate with initial data
        let newReceiptDataRows = [];
        for (let receiptDataObj of props.receiptData) {
            const result = newReceiptDataRows.find((innerList) => innerList[0] === receiptDataObj.description);
            if (result) {
                const indexOfRow = newReceiptDataRows.indexOf(result);
                newReceiptDataRows[indexOfRow].quantity += receiptDataObj.quantity;
                newReceiptDataRows[indexOfRow].amount_line += receiptDataObj.amount_line;
            }
            else {
                newReceiptDataRows.push({ id: receiptDataObj.description, quantity: receiptDataObj.quantity, amount_line: receiptDataObj.amount_line })
            }
        }
        // CONTINUE
        console.log(newReceiptDataRows);
        setReceiptDataRows(newReceiptDataRows);
    },[])
    
    return (
        <div>
            <h1>Testing DATAGRID TABLE</h1>
            <DataGrid
                rows={receiptDataRows}
                columns={columns}
                setIdsToDelete={setIdsToDelete}
                getRowId={(row) => primaryKeys.map((pk) => row[pk]).join(",")}
				checkboxSelection={true}
                processRowUpdate={processRowUpdate}
                onProcessRowUpdateError={handleProcessRowUpdateError}
				experimentalFeatures={{ newEditingApi: true }}
                onSelectionModelChange={(ids) => {
					setIdsToDelete(ids);
				}}
            />
            {!!snackbar && (
				<Snackbar
					open
					anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
					onClose={handleCloseSnackbar}
				>
					<Alert {...snackbar} onClose={handleCloseSnackbar} />
				</Snackbar>
			)}
        </div>
    );
}

export default ReceiptDataGrid;