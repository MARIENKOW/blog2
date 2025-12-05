"use client";

import {
    Box,
    FormHelperText,
    InputLabel,
    Button,
    FormControl,
    OutlinedInput,
} from "@mui/material";
import { StyledLoadingButton } from "../form/StyledLoadingButton";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { enqueueSnackbar } from "notistack";
import {
    PHONE_NUMBER_MAX_LENGTH,
    PHONE_NUMBER_MIN_LENGTH,
    LIST_NAME_MAX_LENGTH,
    LIST_NAME_MIN_LENGTH,
    PHONE_NUMBER_PATTERN,
} from "../../configs/validateConfig";
import { CanceledError } from "axios";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import ListService from "../../services/ListService";
import { StyledTextField } from "../../components/form/StyledTextField";

const list = new ListService();

export default function ListAdd({ getData }) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const {
        handleSubmit,
        register,
        setError,

        formState: { errors, isSubmitting },
    } = useForm({
        mode: "onChange",
    });

    const onSubmit = async (data) => {
        try {
            await list.create(data);
            await getData();
            handleClose();
            enqueueSnackbar(`добавлено!`, { variant: "success" });
        } catch (e) {
            if (e instanceof CanceledError) return;
            console.error(e);
            if (e?.response?.status === 400) {
                const errors = e?.response?.data || {};
                for (let key in errors) {
                    setError(key, { type: "server", message: errors[key] });
                }
                return;
            }
            enqueueSnackbar(
                "Упс! что-то пошло не так. Перезагрузите страницу",
                {
                    variant: "error",
                }
            );
        }
    };

    return (
        <>
            <Button
                onClick={handleClickOpen}
                sx={{ display: "inline-block" }}
                variant="contained"
            >
                Добавить
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogContent>
                        <Box display={"flex"}>
                            <StyledTextField
                                label={"Отдел"}
                                errors={errors}
                                register={register("name", {
                                    required: "обязательное поле",
                                    maxLength: {
                                        value: LIST_NAME_MAX_LENGTH,
                                        message: `максимум ${LIST_NAME_MAX_LENGTH} символов`,
                                    },
                                    minLength: {
                                        value: LIST_NAME_MIN_LENGTH,
                                        message: `минимум ${LIST_NAME_MIN_LENGTH} символов`,
                                    },
                                })}
                            />
                            <FormControl
                                error={!!errors["phone"]}
                                variant="outlined"
                                fullWidth
                            >
                                <InputLabel
                                    htmlFor={`filled-adornment-amountt`}
                                >
                                    Телефон
                                </InputLabel>
                                <OutlinedInput
                                    label={"телефон"}
                                    errors={errors}
                                    {...register("phone", {
                                        required: "обязательное поле",
                                        pattern: {
                                            value: PHONE_NUMBER_PATTERN,
                                            message: "некорректный формат",
                                        },
                                        maxLength: {
                                            value: PHONE_NUMBER_MAX_LENGTH,
                                            message: `максимум ${PHONE_NUMBER_MAX_LENGTH} символов`,
                                        },
                                        minLength: {
                                            value: PHONE_NUMBER_MIN_LENGTH,
                                            message: `минимум ${PHONE_NUMBER_MIN_LENGTH} символов`,
                                        },
                                    })}
                                    id={`filled-adornment-amountt`}
                                />
                                <FormHelperText>
                                    {(errors?.["phone"] &&
                                        (errors?.["phone"]?.message ||
                                            "ошибка")) ||
                                        ""}
                                </FormHelperText>
                            </FormControl>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Отмена</Button>
                        <StyledLoadingButton
                            type="submit"
                            sx={{ height: "100%" }}
                            loading={isSubmitting}
                            endIcon={<DoubleArrowIcon />}
                            variant="contained"
                        >
                            Добавить
                        </StyledLoadingButton>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
}
