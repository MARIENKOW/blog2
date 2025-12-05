import { Container } from "@mui/material";

export const ContainerComponent = ({ children, sx }) => {
    return (
        <Container
            maxWidth={"lg"}
            sx={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                p: { xs: "0px 8px",md:"0px 16px" },
                ...sx,
            }}
        >
            {children}
        </Container>
    );
};
