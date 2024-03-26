import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
    Button,
    Box,
    Stack,
    Typography,
    TextField,

} from "@mui/material";
import { LoadingButton } from "@mui/lab";

function AddNewItem( { submitNewItem }) {
    const [isLoading, setIsLoading] = useState(false);
	const [isDisabled, setIsDisabled] = useState(false);

    const { handleSubmit, control } = useForm({
        defaultValues: { item_name: "", quantity: "", cost: "" },
	});

    const onSubmit = ({ item_name, quantity, cost}) => {
        setIsLoading(true);
        setIsDisabled(true);

        submitNewItem(item_name, quantity, cost)

        setIsLoading(false);
        setIsDisabled(false);
    }

    return (
        <Box>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={2}>
                    <Typography fontWeight={"500"}>
                        Add New Item
                    </Typography>
                    <Controller
                        name={"item_name"}
                        control={control}
                        render={({
                            field: { onChange, value },
                            fieldState: { error },
                        }) => (
                            <TextField
                                onChange={onChange}
                                value={value}
                                label={"Item Name"}
                                error={!!error}
                                helperText={error ? error.message : null}
                            />
                        )}
                        rules={{
                            required: "Item Name required",
                        }}
                    />
                    <Controller
                        name={"quantity"}
                        control={control}
                        render={({
                            field: { onChange, value },
                            fieldState: { error },
                        }) => (
                            <TextField
                                onChange={onChange}
                                value={value}
                                label={"Quantity"}
                                type='number'
                                error={!!error}
                                helperText={error ? error.message : null}
                            />
                        )}
                        rules={{ 
                            required: "Quantity required",
                            pattern: {
                                message: "You should only be entering an integer above 0",
                            },
                        }}
                    />
                    <Controller
                        name={"cost"}
                        control={control}
                        render={({
                            field: { onChange, value },
                            fieldState: { error },
                        }) => (
                            <TextField
                                onChange={onChange}
                                value={value}
                                label={"Total Cost (Item x Quantity)"}
                                type='number'
                                step="0.01"
                                error={!!error}
                                helperText={error ? error.message : null}
                            />
                        )}
                        rules={{
                            required: "Total Cost required",
                        }}
                    />
                    <LoadingButton
                        loading={isLoading}
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={isDisabled}
                    >
                        Add
                    </LoadingButton>
                </Stack>
            </form>
        </Box>
    );
}

export default AddNewItem;