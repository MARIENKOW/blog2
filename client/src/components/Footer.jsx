"use client";

import { useTheme, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { grey } from "@mui/material/colors";

export const Footer = () => {
    const theme = useTheme();
    return (
        <Box bgcolor={theme.palette.primary.dark} position={"relative"} sx={{borderTopWidth:2,borderStyle:'solid'}} borderColor={grey[300]}>
            <Typography
                textAlign={"center"}
                p={3}
                variant="body2"
                color="secondary.main"
            >
                © 2008-2025 Lahav 433
            </Typography>
        </Box>
    );
};
