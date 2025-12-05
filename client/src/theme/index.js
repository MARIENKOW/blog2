import { blue, grey, red } from "@mui/material/colors";

const colors = {
    pinkRose: {
        DEFAULT: "#EC4899",
        50: "#FDEEF6",
        100: "#FBDCEB",
        200: "#F8B7D7",
        300: "#F492C2",
        400: "#F06DAE",
        500: "#EC4899",
        600: "#E4187D",
        700: "#B11261",
        800: "#7F0D45",
        900: "#4C0829",
        950: "#32051B",
    },
};

export const themeSettings = {
    typography: {
        fontFamily: "inherit",
    },
    palette: {
        primary: {
            // main: "#0058a5",
            main: "#1f66a5cf",
            dark: "#023460e6",
            light: "#1f66a566",
            contrastText: "#e7f4ff",
            //  main: colors.pinkRose.DEFAULT,
            //  dark: colors.pinkRose[700],
            //  light: colors.pinkRose[300],
            //  contrastText: colors.pinkRose[50],
        },
        secondary: {
            main: grey[100],
            dark: grey[300],
            // light: "#363636",
            light: grey[50],
            contrastText: grey[900],
        },
        form: {
            main: grey[900],
            dark: "#000",
            // light: "#363636",
            light: grey[700],
            contrastText: grey[50],
        },
        alert: {
            main: "rgb(22, 11, 11)",
            dark: "#391010",
            light: "rgb(244, 67, 54)",
            contrastText: "rgb(244, 199, 199)",
        },
        success: {
            main: "rgb(34, 100, 43)",
            dark: "rgb(12, 19, 13)",
            light: "rgb(28, 46, 31)",
            contrastText: "rgb(204, 232, 205)",
        },
        error: {
            main: "#d32f2f",
            dark: "#3c0c0c",
            light: "#3c0c0c",
            contrastText: "#ffffff",
        },
        background: {
            main: "#bebebe",
            dark: "#e9e9e9",
            light: "#fff",
            contrastText: "#202020",
        },
    },
};
