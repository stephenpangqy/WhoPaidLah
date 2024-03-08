import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
    Button,
    Box,
    Stack,
    Typography,
    TextField,
    Grid,


} from "@mui/material";
import { LoadingButton } from "@mui/lab";

function AddNames({ addToNames }) {
    const [isLoading, setIsLoading] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);

    const { handleSubmit, control } = useForm({
        defaultValues: { name: "" },
	});

    const onSubmit = ({ name }) => {
        setIsLoading(true);
        setIsDisabled(true);

        addToNames(name);
        console.log(name);

        setIsLoading(false);
        setIsDisabled(false);
    }

    useEffect(() => {
        console.log("Name Added")
    },[])



    return (
        <>
        <Grid item xs={6}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={2}>
                    <Typography fontWeight={"500"}>
                        Enter Name
                    </Typography>
                    <Controller
                        name={"name"}
                        control={control}
                        render={({
                            field: { onChange, value },
                            fieldState: { error },
                        }) => (
                            <TextField
                                onChange={onChange}
                                value={value}
                                label={"Person's Name"}
                                error={!!error}
                                helperText={error ? error.message : null}
                            />
                        )}
                        rules={{
                            required: "Name cannot be empty",
                        }}
                    />
                    <LoadingButton
                        loading={isLoading}
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={isDisabled}
                    >
                        Enter Name
                    </LoadingButton>
                </Stack>
            </form>
        </Grid>
        </>
    );
}

export default AddNames;

