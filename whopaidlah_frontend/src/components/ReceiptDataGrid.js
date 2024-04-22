import { useEffect, useState } from "react";
import {
    DataGrid,
    Snackbar
} from "@mui/material";

function ReceiptDataGrid(props) {
    // TO DO
    return (
        <div>
            <h1>Testing DATAGRID TABLE</h1>
            <DataGrid
                rows={rows}
                columns={col}
                getRowId={(row) => primary}
            />
        </div>
    );
}

export default ReceiptDataGrid;