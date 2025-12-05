"use client";

import {
    Box,
    FormHelperText,
    InputAdornment,
    InputLabel,
    FormControl,
    OutlinedInput,
    Grid2,
} from "@mui/material";
import { StyledLoadingButton } from "../form/StyledLoadingButton";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { useEffect, useState } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useForm } from "react-hook-form";
import { enqueueSnackbar } from "notistack";
import {
    LIST_NAME_MAX_LENGTH,
    LIST_NAME_MIN_LENGTH,
    PHONE_NUMBER_MAX_LENGTH,
    PHONE_NUMBER_MIN_LENGTH,
    PHONE_NUMBER_PATTERN,
} from "../../configs/validateConfig";
import ListService from "../../services/ListService";
import { CanceledError } from "axios";
import { StyledTextField } from "../../components/form/StyledTextField";

const list = new ListService();

export const ListForm = ({ item, getData }) => {
    const [isDeleteLoading, setIsDeleteLoading] = useState();
    const {
        handleSubmit,
        register,
        setError,
        getValues,
        reset,

        formState: { errors, isValid, isSubmitting, isDirty },
    } = useForm({
        mode: "onChange",
        defaultValues: { name: item.name, phone: item.phone },
    });

    useEffect(() => {
        reset({ name: item.name, phone: item.phone }, { keepDirty: false });
    }, [item]);

    const onSubmit = async (data) => {
        try {
            await list.update(item.id, data);
            await getData();

            enqueueSnackbar(`Изменено!`, { variant: "success" });
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

    const handleDelete = async () => {
        try {
            setIsDeleteLoading(true);
            if (!confirm(`Удалить ${getValues().phone}?`))
                return setIsDeleteLoading(false);
            await list.delete(item.id);
            await getData();
            enqueueSnackbar(`Удалено!`, { variant: "success" });
        } catch (error) {
            if (e instanceof CanceledError) return;
            console.log(error);
            enqueueSnackbar(
                "Упс! что-то пошло не так. Перезагрузите страницу",
                {
                    variant: "error",
                }
            );
        } finally {
            setIsDeleteLoading(false);
        }
    };

    return (
        <Box>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid2
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr auto",
                    }}
                    // columns={12}
                    container
                >
                    <Grid2 size={"grow"}>
                        <FormControl
                            fullWidth
                            error={!!errors["name"]}
                            variant="outlined"
                        >
                            <InputLabel
                                htmlFor={`filled-adornment-amount-${item.id}`}
                            >
                                Отдел
                            </InputLabel>
                            <OutlinedInput
                                label={"Отдел"}
                                errors={errors}
                                {...register("name", {
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
                                id={`filled-adornment-amount-${item.id}`}
                            />
                        </FormControl>
                    </Grid2>
                    <Grid2 size={"grow"}>
                        <FormControl
                            fullWidth
                            error={!!errors["phone"]}
                            variant="outlined"
                        >
                            <InputLabel
                                htmlFor={`filled-adornment-amount-${item.id}`}
                            >
                                Телефон
                            </InputLabel>
                            <OutlinedInput
                                label={"Телефон"}
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
                                id={`filled-adornment-amount-${item.id}`}
                            />
                        </FormControl>
                    </Grid2>
                    <Grid2 pl={1} gap={1} display={"inline-flex"} size={"auto"}>
                        <StyledLoadingButton
                            type="submit"
                            size="small"
                            sx={{ height: "100%", minWidth: "50px" }}
                            loading={isSubmitting}
                            disabled={!isValid || !isDirty}
                            variant="contained"
                        >
                            <DoubleArrowIcon />
                        </StyledLoadingButton>
                        <StyledLoadingButton
                            sx={{ height: "100%", minWidth: "50px" }}
                            loading={isDeleteLoading}
                            variant="contained"
                            size="small"
                            color="error"
                            onClick={handleDelete}
                        >
                            <DeleteForeverIcon />
                        </StyledLoadingButton>
                    </Grid2>
                    <Grid2>
                        <FormHelperText error={!!errors["name"]}>
                            {(errors?.["name"] &&
                                (errors?.["name"]?.message || "ошибка")) ||
                                ""}
                        </FormHelperText>
                    </Grid2>
                    <Grid2>
                        <FormHelperText error={!!errors["phone"]}>
                            {(errors?.["phone"] &&
                                (errors?.["phone"]?.message || "ошибка")) ||
                                ""}
                        </FormHelperText>
                    </Grid2>
                </Grid2>
            </form>
        </Box>
    );
};
