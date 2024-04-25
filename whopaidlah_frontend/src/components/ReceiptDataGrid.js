import { useEffect, useState, useCallback, useMutation } from "react";
import {
    Snackbar,
    Alert,
    Button,
} from "@mui/material";
import { 
    DataGrid,
} from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";

function ReceiptDataGrid(props) {
    // TO DO
    const [receiptDataRows, setReceiptDataRows] = useState([]);
    const [columns, setColumns] = useState([
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'description', headerName: 'Item', width: 150, editable: true },
        { field: 'quantity', headerName: 'Quantity', width: 150, editable: true },
        { field: 'amount_line', headerName: 'Cost (Item x Quantity)', width: 150, editable: true },
    ]);
    const [idsToDelete, setIdsToDelete] = useState([]);
    const [editRowsModel, setEditRowsModel] = useState({});
    const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);

    const [snackbar, setSnackbar] = useState(null);

    const processRowUpdate = useCallback((updatedRow) => {
        console.log("HANDLE EDIT ROWS MODEL CHANGE");
        console.log(updatedRow);
        // Update string-ed quantity and amount_line changes back to int and float respectively
        if (typeof updatedRow.quantity === "string") {
            updatedRow.quantity = parseInt(updatedRow.quantity);
        }

        if (typeof updatedRow.amount_line === "string") {
            updatedRow.amount_line = parseFloat(updatedRow.amount_line);
        }
        const updatedRows = receiptDataRows.map((row) =>
            row.id === updatedRow.id ? { ...row, ...updatedRow } : row
        );
        setReceiptDataRows((prevRows) => updatedRows);
        // update ReceiptData in MainPage.js
        props.updateMainReceiptData(updatedRows);

        console.log(updatedRows);
        return updatedRow;
    }, [receiptDataRows]); // Add receiptDataRows as a dependency to ensure the function has access to receiptDataRows state

    const handleProcessRowUpdateError = useCallback((error) => {
        console.log(error);
		setSnackbar({ children: error.message, severity: "error" });
	}, []);

    const handleCloseSnackbar = () => setSnackbar(null);

    const handleOpenDelCfm = () => setOpenDeleteConfirmation(true);
	const handleCloseDelCfm = () => setOpenDeleteConfirmation(false);

    useEffect(() => {
        // Populate with initial data
        let id_count = 1;
        let newReceiptDataRows = [];
        for (let receiptDataObj of props.receiptData) {
            const result = newReceiptDataRows.find((innerObj) => innerObj.description === receiptDataObj.description);
            if (result) {
                const indexOfRow = newReceiptDataRows.indexOf(result);
                newReceiptDataRows[indexOfRow].quantity += receiptDataObj.quantity;
                newReceiptDataRows[indexOfRow].amount_line += receiptDataObj.amount_line;
            }
            else {
                newReceiptDataRows.push({ id: id_count, description: receiptDataObj.description, quantity: receiptDataObj.quantity, amount_line: receiptDataObj.amount_line })
                id_count++;
            }
        }

        console.log(newReceiptDataRows);
        setReceiptDataRows(newReceiptDataRows);
    },[props.receiptData])
    
    return (
        <div>
            <h1>Testing DATAGRID TABLE</h1>
            <Button
                variant="contained"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={handleOpenDelCfm}
                disabled={idsToDelete.length === 0 ? true : false}
            >
                Delete Rows
            </Button>
            <DataGrid
                rows={receiptDataRows}
                columns={columns}
                setIdsToDelete={setIdsToDelete}
				checkboxSelection={true}
                editRowsModel={editRowsModel}
                processRowUpdate={processRowUpdate}
                onProcessRowUpdateError={handleProcessRowUpdateError}
				experimentalFeatures={{ newEditingApi: true }}
                onSelectionModelChange={(ids) => {
					setIdsToDelete(ids);
                    console.log(ids);
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