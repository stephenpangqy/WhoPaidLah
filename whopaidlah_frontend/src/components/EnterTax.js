import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
    Grid,
    Button,
    Stack,
    Typography,
    TextField,
    FormControlLabel,
    FormGroup,
    Checkbox,
    InputAdornment
} from "@mui/material";
import '../App.css';

function EnterTax(props) {
    // TODO (28 March 2024)
    // 1. Find out how to enter Tax
    // Put on hold until done with Calculation
    const [isAmount, setIsAmount] = useState(true);

    const { handleSubmit, control } = useForm({
        defaultvalues: { tax_name: "", tax_amount: 0, tax_percent: 0}
    })

    function onClickToggleAdd() {
        setIsAmount(!isAmount);
    }

    const onSubmit = ({ tax_name, tax_amount, tax_percent }) => {
        console.log(tax_name);
        console.log(tax_amount);
        console.log(tax_percent);

        props.addTaxRow(tax_name, tax_amount, tax_percent);
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                {!!isAmount ? (
                    <>
                        <h1>Add Tax Amount ($)</h1>
                        <Stack spacing={2}>
                            <Controller
                                name={"tax_name"}
                                control={control}
                                render={({
                                    field: { onChange, value },
                                    fieldState: { error },
                                }) => (
                                    <TextField
                                        onChange={onChange}
                                        value={value}
                                        label={"Tax Name"}
                                        error={!!error}
                                        required
                                        helperText={error ? error.message : null}
                                    />
                                )}
                                rules={{
                                    required: "Tax Name required",
                                }}
                            />
                        </Stack>
                        <br />
                        <Stack spacing={2}>
                            <Controller
                                name={"tax_amount"}
                                control={control}
                                render={({
                                    field: { onChange, value },
                                    fieldState: { error },
                                }) => (
                                    <TextField
                                        type="number"
                                        onChange={onChange}
                                        value={value}
                                        required
                                        label={"Tax Amount"}
                                        InputProps={{
                                            startAdornment:
                                                <InputAdornment
                                                    position="start"
                                                    component="div"
                                                >
                                                    $
                                                </InputAdornment>
                                        }}
                                    />
                                )}
                                rules={{
                                    required: "Tax Amount required",
                                }}
                            />
                        </Stack>
                        <Button
                            type='submit'
                            variant="contained"
                            color="primary"
                        >
                            Enter Amount
                        </Button>
                        {/* For now, comment out and only allow adding of Tax Amount */}
                        {/* <Button
                            variant="outlined"
                            color="primary"
                            onClick={onClickToggleAdd}
                        >
                            Change to Add Percentage Tax (%)
                        </Button> */}
                    </>
                ) : (
                    <>
                        <h1>Add Tax Percentage (%)</h1>
                        <Stack spacing={2}>
                            <Controller
                                name={"tax_name"}
                                control={control}
                                render={({
                                    field: { onChange, value },
                                    fieldState: { error },
                                }) => (
                                    <TextField
                                        onChange={onChange}
                                        value={value}
                                        label={"Tax Name"}
                                        error={!!error}
                                        helperText={error ? error.message : null}
                                    />
                                )}
                                rules={{
                                    required: "Tax Name required",
                                }}
                            />
                        </Stack>
                        <Stack spacing={2}>
                            <Controller
                                name={"tax_percent"}
                                control={control}
                                render={({
                                    field: { onChange, value },
                                    fieldState: { error },
                                }) => (
                                    <TextField
                                        type="number"
                                        onChange={onChange}
                                        value={value}
                                        required
                                        InputProps={{
                                            startAdornment:
                                                <InputAdornment
                                                    position="start"
                                                    component="div"
                                                >
                                                    %
                                                </InputAdornment>
                                        }}
                                    />
                                )}
                                rules={{
                                    required: "Tax Percent required",
                                }}
                            />
                        </Stack>
                        <Button
                            type='submit'
                            variant="contained"
                            color="primary"
                        >
                            Enter Percentage
                        </Button>
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={onClickToggleAdd}
                        >
                            Change to Add Tax Amount ($)
                        </Button>
                    </>
                )}
            </form>
        </>
    )
}

export default EnterTax;