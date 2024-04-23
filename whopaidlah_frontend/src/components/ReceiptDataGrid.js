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
    const [columns, setColumns] = useState(["Item", "Quantity", "Cost (Item x Quantity)"]);
    const [idsToDelete, setIdsToDelete] = useState([]);
    const [primaryKeys, setPrimaryKeys] = useState([]);

    const [snackbar, setSnackbar] = useState(null);

    const mutateRow = useMutation();

    const processRowUpdate = useCallback(
		async (newRow) => {
			const response = await mutateRow(newRow);
			return response;
		},
		[mutateRow, columns, primaryKeys]
	);

    const handleProcessRowUpdateError = useCallback((error) => {
		setSnackbar({ children: error.message, severity: "error" });
	}, []);

    const handleCloseSnackbar = () => setSnackbar(null);

    useEffect(() => {
        // Populate with initial data
        let newReceiptDataRows = [];
        for (let receiptDataObj of props.receiptData) {
            console.log(receiptDataObj);
            if (newReceiptDataRows.find((innerList) => innerList[0] === receiptDataObj.description)) {

            }
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