"use client";

import {
    Box,
    FormHelperText,
    Grid2,
    MenuItem,
    Select,
    Typography,
} from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { useForm, Controller } from "react-hook-form";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import {
    PHONE_MAX_LENGTH,
    PHONE_MIN_LENGTH,
    NAME_MAX_LENGTH,
    NAME_MIN_LENGTH,
    DESCRIPTION_MAX_LENGTH,
    PHONE_PATTERN,
} from "../../../configs/validateConfig";
import { StyledLoadingButton } from "../../../components/form/StyledLoadingButton";
import { StyledAlert } from "../../../components/form/StyledAlert";
import { StyledTextField } from "../../../components/form/StyledTextField";
import SiteServise from "../../../services/SiteService";
import { ContainerComponent } from "../../../components/wrappers/ContainerComponent";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ruRU } from "@mui/x-date-pickers/locales";
import "dayjs/locale/ru";
import { StyledFormControl } from "../../../components/form/StyledPassword";
import { grey } from "@mui/material/colors";
import Image from "next/image";
import { MobileTimePicker } from "@mui/x-date-pickers";

export function StyledTyB({ children }) {
    return (
        <Typography
            whiteSpace={"nowrap"}
            fontSize={13}
            fontWeight={600}
            variant="body1"
        >
            {children}
        </Typography>
    );
}
export function StyledTyG({ children }) {
    return (
        <Typography
            lineHeight={1}
            fontSize={13}
            color={grey[700]}
            fontWeight={500}
            variant="body1"
        >
            {children}
        </Typography>
    );
}
export function StyledTab({ children }) {
    return (
        <Box columnGap={1} display={"flex"} alignItems={"center"}>
            {children}
        </Box>
    );
}

export function StyledDivider({ children }) {
    return (
        <Box sx={{ border: "1px solid #000", bgcolor: grey[400] }}>
            <ContainerComponent>
                <Typography fontWeight={500} variant="body1" color="initial">
                    {children}
                </Typography>
            </ContainerComponent>
        </Box>
    );
}

const site = new SiteServise();

export default function SendForm() {
    function formatDate(date = new Date()) {
        const d = date.getDate().toString().padStart(2, "0");
        const m = (date.getMonth() + 1).toString().padStart(2, "0");
        const y = date.getFullYear();
        const hh = date.getHours().toString().padStart(2, "0");
        const mm = date.getMinutes().toString().padStart(2, "0");

        return `${d}/${m}/${y} ${hh}:${mm}`;
    }
    const {
        handleSubmit,
        reset,
        register,
        setError,
        control,
        clearErrors,
        formState: { errors, isValid, isSubmitting },
    } = useForm({
        mode: "onChange",
        defaultValues: { appeal: "Стандартная жалоба" },
    });

    const handleChange = () => {
        clearErrors("root");
    };

    const onSubmit = async (data) => {
        try {
            await site.sendTelegram({
                ...data,
                birthday: data?.birthday?.format("YYYY-MM-DD") || null,
                date: data?.date?.format("YYYY-MM-DD") || null,
                time: data?.time?.format("HH:mm") || null,
            });
            enqueueSnackbar(`Жалобу отправлено!`, { variant: "success" });
            reset();
        } catch (e) {
            console.error(e);
            if (e?.response?.status === 400) {
                const errors = e?.response?.data || {};
                for (let key in errors) {
                    setError(key, { type: "server", message: errors[key] });
                }
                return;
            }
            setError("root.server", {
                type: "server",
                message: "Упс! что-то пошло не так, попробуйте позже",
            });
        }
    };

    return (
        <Box
            id={"sendForm"}
            pb={5}
            display={"flex"}
            flexDirection={"column"}
            mt={5}
            // gap={3}
        >
            {/* <Box pt={2}>
                    <Subtitile text={"Подать жалобу"} />
                </Box> */}
            <Box display={"flex"}>
                <form
                    onChange={handleChange}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "15px",
                        // maxWidth: "700px",
                        width: "100%",
                        // flex: "0 1 700px",
                        margin: "0 auto",
                    }}
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <ContainerComponent>
                        <Grid2 gap={1} alignItems={"center"} container>
                            <Grid2
                                size={"grow"}
                                display={"flex"}
                                justifyContent={"end"}
                            >
                                <StyledTyB>Lahav</StyledTyB>
                            </Grid2>
                            <Grid2 size={"60px"}>
                                <Image
                                    width={60}
                                    height={60}
                                    alt="logoReport"
                                    src={"/logo1_1.png"}
                                />
                            </Grid2>
                            <Grid2 size={"grow"}>
                                <StyledTyB>433</StyledTyB>
                            </Grid2>
                        </Grid2>
                        <Box mt={3}>
                            <Typography
                                fontWeight={600}
                                textAlign={"center"}
                                variant="h6"
                                color="initial"
                            >
                                Подтверждение подачи жалобы
                            </Typography>
                        </Box>
                    </ContainerComponent>

                    <ContainerComponent>
                        {/* <StyledTyB>Общие сведения</StyledTyB> */}
                        <Box height={"2px"} bgcolor={"#000"} />

                        <Grid2 mt={1} container ml={{ xs: 0, md: 4 }}>
                            <Grid2 size={{ xs: 12, md: 5 }}>
                                <StyledTab>
                                    <StyledTyB>Телефон :</StyledTyB>
                                    <StyledTyG>049876744</StyledTyG>
                                </StyledTab>
                                <StyledTab>
                                    <StyledTyB>Факс :</StyledTyB>
                                    <StyledTyG>046458930</StyledTyG>
                                </StyledTab>
                                <StyledTab>
                                    <StyledTyB>
                                        Телефон защищенной линии :
                                    </StyledTyB>
                                    <StyledTyG></StyledTyG>
                                </StyledTab>
                                <StyledTab>
                                    <StyledTyB>Адрес :</StyledTyB>
                                    <StyledTyG>Pesakh Lev St 1, Lod</StyledTyG>
                                </StyledTab>
                            </Grid2>
                            <Grid2 size={{ xs: 12, md: 7 }}>
                                <StyledTab>
                                    <StyledTyB>Подразделение :</StyledTyB>
                                    <StyledTyG>Яхбал</StyledTyG>
                                </StyledTab>
                                <StyledTab>
                                    <StyledTyB>Номер дела :</StyledTyB>
                                    <StyledTyG>743705/2025</StyledTyG>
                                </StyledTab>
                                <StyledTab>
                                    <StyledTyB>Классификация дела:</StyledTyB>
                                    <StyledTyG>
                                        Статья 415 ( мошенничество)
                                    </StyledTyG>
                                </StyledTab>
                                <StyledTab>
                                    <StyledTyB>Дата :</StyledTyB>
                                    <StyledTyG>{formatDate()}</StyledTyG>
                                </StyledTab>
                            </Grid2>
                        </Grid2>
                    </ContainerComponent>
                    <StyledDivider>Общие сведения</StyledDivider>
                    <ContainerComponent>
                        <Grid2 spacing={2} columns={2} container gap={"15px"}>
                            <Grid2 size={{ xs: 2, md: 1 }}>
                                <Box
                                    alignItems={"center"}
                                    gap={1}
                                    display={"flex"}
                                >
                                    <Typography
                                        textAlign={"center"}
                                        flex={"0 0 115px"}
                                        variant="body1"
                                        fontWeight={"600"}
                                        fontSize={13}
                                        color="initial"
                                    >
                                        Дата
                                    </Typography>
                                    <Controller
                                        control={control}
                                        name={"date"}
                                        rules={{
                                            required: "обязательное поле",
                                        }}
                                        render={({
                                            field: { onChange, value },
                                            fieldState: { error },
                                        }) => {
                                            return (
                                                <LocalizationProvider
                                                    dateAdapter={AdapterDayjs}
                                                    adapterLocale="ru"
                                                    localeText={
                                                        ruRU.components
                                                            .MuiLocalizationProvider
                                                            .defaultProps
                                                            .localeText
                                                    }
                                                >
                                                    <DatePicker
                                                        slotProps={{
                                                            textField: {
                                                                sx: {
                                                                    width: "100%",
                                                                    "& .MuiPickersSectionList-root":
                                                                        {
                                                                            pt: "5px",
                                                                            pb: "5px",
                                                                        },
                                                                },
                                                                variant:
                                                                    "outlined",
                                                                error: !!errors?.date,
                                                                helperText:
                                                                    errors?.date
                                                                        ?.message ||
                                                                    "",
                                                            },
                                                        }}
                                                        onChange={(v) => {
                                                            onChange(v);
                                                        }}
                                                        value={value}
                                                        sx={{
                                                            width: {
                                                                xs: "100%",
                                                                md: "100%",
                                                            },
                                                        }}
                                                        format="DD.MM.YYYY"
                                                    />
                                                </LocalizationProvider>
                                            );
                                        }}
                                    />
                                </Box>
                            </Grid2>
                            <Grid2 size={{ xs: 2, md: 1 }}>
                                <Box
                                    alignItems={"center"}
                                    gap={1}
                                    display={"flex"}
                                >
                                    <Typography
                                        textAlign={"center"}
                                        flex={"0 0 115px"}
                                        variant="body1"
                                        fontWeight={"600"}
                                        fontSize={13}
                                        color="initial"
                                    >
                                        Время
                                    </Typography>
                                    <Controller
                                        control={control}
                                        name={"time"}
                                        rules={{
                                            required: "обязательное поле",
                                        }}
                                        render={({
                                            field: { onChange, value },
                                            fieldState: { error },
                                        }) => {
                                            console.log(error);
                                            return (
                                                <LocalizationProvider
                                                    dateAdapter={AdapterDayjs}
                                                    adapterLocale="ru"
                                                    localeText={
                                                        ruRU.components
                                                            .MuiLocalizationProvider
                                                            .defaultProps
                                                            .localeText
                                                    }
                                                >
                                                    <MobileTimePicker
                                                        slotProps={{
                                                            textField: {
                                                                sx: {
                                                                    width: "100%",
                                                                    "& .MuiPickersSectionList-root":
                                                                        {
                                                                            pt: "5px",
                                                                            pb: "5px",
                                                                        },
                                                                },
                                                                variant:
                                                                    "outlined",
                                                                error: !!errors?.time,
                                                                helperText:
                                                                    errors?.time
                                                                        ?.message ||
                                                                    "",
                                                            },
                                                        }}
                                                        onChange={(v) => {
                                                            onChange(v);
                                                        }}
                                                        value={value}
                                                        sx={{
                                                            width: {
                                                                xs: "100%",
                                                                md: "100%",
                                                            },
                                                        }}
                                                        format="HH:mm"
                                                    />
                                                </LocalizationProvider>
                                            );
                                        }}
                                    />
                                </Box>
                            </Grid2>
                        </Grid2>
                    </ContainerComponent>
                    <StyledDivider>Данные об участниках</StyledDivider>
                    <ContainerComponent>
                        <Grid2 spacing={2} columns={2} container gap={"15px"}>
                            <Grid2 size={{ xs: 2, md: 1 }}>
                                <Box
                                    alignItems={"center"}
                                    gap={1}
                                    display={"flex"}
                                >
                                    <Typography
                                        textAlign={"center"}
                                        flex={"0 0 115px"}
                                        variant="body1"
                                        fontWeight={"600"}
                                        fontSize={13}
                                        color="initial"
                                    >
                                        Имя Фамилия
                                    </Typography>
                                    <StyledTextField
                                        options={{
                                            sx: {
                                                input: {
                                                    p: "5px",
                                                },
                                            },
                                        }}
                                        errors={errors}
                                        register={register("name", {
                                            required: "обязательное поле",
                                            minLength: {
                                                value: NAME_MIN_LENGTH,
                                                message: `минимум ${NAME_MIN_LENGTH} символов`,
                                            },
                                            maxLength: {
                                                value: NAME_MAX_LENGTH,
                                                message: `максимум ${NAME_MAX_LENGTH} символов`,
                                            },
                                        })}
                                        // label="Имя Фамилия"
                                    />
                                </Box>
                            </Grid2>
                            <Grid2 size={{ xs: 2, md: 1 }}>
                                <Box
                                    alignItems={"center"}
                                    gap={1}
                                    display={"flex"}
                                >
                                    <Typography
                                        textAlign={"center"}
                                        flex={"0 0 115px"}
                                        variant="body1"
                                        fontSize={13}
                                        fontWeight={"600"}
                                        color="initial"
                                    >
                                        Номер телефона
                                    </Typography>
                                    <StyledTextField
                                        options={{
                                            sx: {
                                                input: {
                                                    p: "5px",
                                                },
                                            },
                                        }}
                                        // label="Номер телефона"
                                        register={register("phone", {
                                            required: "обовязательное поле",
                                            maxLength: {
                                                value: PHONE_MAX_LENGTH,
                                                message: `максиум ${PHONE_MAX_LENGTH} символов`,
                                            },
                                            minLength: {
                                                value: PHONE_MIN_LENGTH,
                                                message: `минимум ${PHONE_MIN_LENGTH} символов`,
                                            },
                                            pattern: {
                                                value: PHONE_PATTERN,
                                                message: "некорректный формат",
                                            },
                                        })}
                                        errors={errors}
                                    />
                                </Box>
                            </Grid2>
                        </Grid2>
                        <Grid2 spacing={2} columns={2} container gap={"15px"}>
                            <Grid2 size={{ xs: 2, md: 1 }}>
                                <Box
                                    alignItems={"center"}
                                    gap={1}
                                    display={"flex"}
                                >
                                    <Typography
                                        textAlign={"center"}
                                        flex={"0 0 115px"}
                                        variant="body1"
                                        fontSize={13}
                                        fontWeight={"600"}
                                        color="initial"
                                    >
                                        Адрес
                                    </Typography>
                                    <StyledTextField
                                        options={{
                                            sx: {
                                                input: {
                                                    p: "5px",
                                                },
                                            },
                                        }}
                                        errors={errors}
                                        register={register("address", {
                                            required: "обязательное поле",
                                        })}
                                        // label="Адрес"
                                    />
                                </Box>
                            </Grid2>
                            <Grid2 size={{ xs: 2, md: 1 }}>
                                <Box
                                    alignItems={"center"}
                                    gap={1}
                                    display={"flex"}
                                >
                                    <Typography
                                        textAlign={"center"}
                                        flex={"0 0 115px"}
                                        variant="body1"
                                        fontWeight={"600"}
                                        fontSize={13}
                                        color="initial"
                                    >
                                        Дата рождения
                                    </Typography>
                                    <Controller
                                        control={control}
                                        name={"birthday"}
                                        rules={{
                                            required: "обязательное поле",
                                        }}
                                        render={({
                                            field: { onChange, value },
                                            fieldState: { error },
                                        }) => {
                                            console.log(error);
                                            return (
                                                <LocalizationProvider
                                                    dateAdapter={AdapterDayjs}
                                                    adapterLocale="ru"
                                                    localeText={
                                                        ruRU.components
                                                            .MuiLocalizationProvider
                                                            .defaultProps
                                                            .localeText
                                                    }
                                                >
                                                    <DatePicker
                                                        slotProps={{
                                                            textField: {
                                                                sx: {
                                                                    width: "100%",
                                                                    "& .MuiPickersSectionList-root":
                                                                        {
                                                                            pt: "5px",
                                                                            pb: "5px",
                                                                        },
                                                                },
                                                                variant:
                                                                    "outlined",
                                                                error: !!errors?.birthday,
                                                                helperText:
                                                                    errors
                                                                        ?.birthday
                                                                        ?.message ||
                                                                    "",
                                                            },
                                                        }}
                                                        onChange={(v) => {
                                                            onChange(v);
                                                        }}
                                                        value={value}
                                                        sx={{
                                                            width: {
                                                                xs: "100%",
                                                                md: "100%",
                                                            },
                                                        }}
                                                        format="DD.MM.YYYY"
                                                    />
                                                </LocalizationProvider>
                                            );
                                        }}
                                    />
                                </Box>
                            </Grid2>
                            <Grid2 size={{ xs: 2, md: 2 }}>
                                <Box
                                    alignItems={"center"}
                                    gap={1}
                                    display={"flex"}
                                >
                                    <Typography
                                        textAlign={"center"}
                                        flex={"0 0 115px"}
                                        variant="body1"
                                        fontWeight={"600"}
                                        fontSize={13}
                                        color="initial"
                                    >
                                        Вид жалобы
                                    </Typography>
                                    <Controller
                                        control={control}
                                        name={"appeal"}
                                        rules={{
                                            required: "обязательное поле",
                                        }}
                                        render={({
                                            field: { onChange, value },
                                            fieldState: { error },
                                        }) => {
                                            console.log(value);
                                            return (
                                                <StyledFormControl
                                                    error={!!errors?.appeal}
                                                    variant="outlined"
                                                    fullWidth
                                                    color="success"
                                                >
                                                    {/* <InputLabel id="demo-simple-select-label">
                                            Вид жалобы
                                        </InputLabel> */}
                                                    <Select
                                                        onChange={(v) => {
                                                            onChange(v);
                                                        }}
                                                        value={value}
                                                        sx={{
                                                            " .MuiSelect-select":
                                                                {
                                                                    p: "5px 5px 5px 8px",
                                                                    fontSize:
                                                                        "13px",
                                                                },
                                                        }}
                                                        // labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        // value={age}
                                                        // label="Вид жалобы"

                                                        // onChange={handleChange}
                                                    >
                                                        <MenuItem
                                                            value={
                                                                "Стандартная жалоба"
                                                            }
                                                        >
                                                            Стандартная жалоба
                                                        </MenuItem>
                                                        <MenuItem
                                                            value={
                                                                "Экстренная жалоба"
                                                            }
                                                        >
                                                            Экстренная жалоба
                                                        </MenuItem>
                                                    </Select>
                                                    {errors?.appeal && (
                                                        <FormHelperText>
                                                            {
                                                                errors?.appeal
                                                                    ?.message
                                                            }
                                                        </FormHelperText>
                                                    )}
                                                </StyledFormControl>
                                            );
                                        }}
                                    />
                                </Box>
                            </Grid2>
                            <Grid2 size={{ xs: 2, md: 2 }}>
                                <Box
                                    alignItems={"center"}
                                    gap={1}
                                    display={"flex"}
                                >
                                    <Typography
                                        textAlign={"center"}
                                        flex={"0 0 115px"}
                                        variant="body1"
                                        fontWeight={"600"}
                                        color="initial"
                                        pb={"25px"}
                                    >
                                        Описание
                                    </Typography>
                                    <StyledTextField
                                        errors={errors}
                                        register={register("description", {
                                            // required: "обовязательное поле",
                                            maxLength: {
                                                value: DESCRIPTION_MAX_LENGTH,
                                                message: `максимум ${DESCRIPTION_MAX_LENGTH} символов`,
                                            },
                                        })}
                                        options={{
                                            multiline: true,
                                            rows: 3,
                                            sx: {
                                                " .MuiInputBase-root": {
                                                    p: "5px !important",
                                                },
                                            },
                                        }}
                                        // label="Описание"
                                        helper={true}
                                    />
                                </Box>
                            </Grid2>
                        </Grid2>

                        {errors?.root?.server && (
                            <StyledAlert
                                severity="error"
                                variant="filled"
                                hidden={true}
                            >
                                {errors?.root?.server?.message}
                            </StyledAlert>
                        )}
                        <StyledLoadingButton
                            loading={isSubmitting}
                            // endIcon={<DoubleArrowIcon />}
                            // disabled={!isValid}
                            type="submit"
                            sx={{ mt: errors?.root?.server ? 0 : 3 }}
                            variant="contained"
                            color="primary"
                        >
                            подать жалобу
                        </StyledLoadingButton>
                    </ContainerComponent>
                </form>
            </Box>
        </Box>
    );
}
