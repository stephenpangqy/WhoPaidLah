import { useEffect, useState, useCallback } from "react";
import {
    Snackbar,
    Alert,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,

} from "@mui/material";
import {
    LoadingButton,
} from "@mui/lab";
import { 
    DataGrid,
} from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";

function ReceiptDataGrid(props) {
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
    const [isDisabledDelete, setIsDisabledDelete] = useState(false);
    const [isLoadingDelete, setIsLoadingDelete] = useState(false);

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

    const handleDelete = () => {
		setIsLoadingDelete(true);
		setIsDisabledDelete(true);

        const remainingReceiptRows = receiptDataRows.filter(row => !idsToDelete.includes(row.id))
        setReceiptDataRows((prevRows) => remainingReceiptRows);
        props.updateMainReceiptData(remainingReceiptRows);

        setIsLoadingDelete(false);
		setIsDisabledDelete(false);
        setOpenDeleteConfirmation(false);
    }

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
                Delete Items
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
                onRowSelectionModelChange={(ids) => {
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
            <Dialog open={openDeleteConfirmation} onClose={handleCloseDelCfm}>
				<DialogTitle id="alert-dialog-title">Delete Items?</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						Are you sure you want to delete the selected items and their cost from the table?
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
        </div>
    );
}

export default ReceiptDataGrid;