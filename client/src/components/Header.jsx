"use client";
import {
    Button,
    Grid2,
    Menu,
    MenuItem,
    useTheme,
    Typography,
    IconButton,
} from "@mui/material";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import LogoutIcon from "@mui/icons-material/Logout";
import { ContainerComponent } from "./wrappers/ContainerComponent";
import Image from "next/image";
import PhoneForwardedIcon from "@mui/icons-material/PhoneForwarded";
import Link from "next/link";
import { MAIN_ROUTE } from "../configs/routerLinks";
import { Children, useState } from "react";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
// import GoogleTranslate from "./google-translate";
const GoogleTranslate = dynamic(() => import("./google-translate"), {
    ssr: false,
});
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";

const Header = ({ data }) => {
    const params = useParams();
    const token = params.token;
    const theme = useTheme();

    const [anchorEl, setAnchorEl] = useState(null);
    const menu = Boolean(anchorEl);

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    return (
        <Box
            width={"100%"}
            zIndex={1000}
            sx={{
                background: theme.palette.primary.dark,
            }}
        >
            <ContainerComponent sx={{ p: { xs: 0 } }}>
                <Toolbar>
                    <Grid2 width={"100%"} spacing={2} container>
                        <Grid2
                            display={"flex"}
                            alignItems={"center"}
                            size={"grow"}
                        >
                            <Typography
                                maxWidth={"200"}
                                variant={"body2"}
                                color="secondary"
                            >
                                Pesakh Lev ,פארק אופק אזוה"ת הצפוני
                                <br />
                                St 1,Lod, Израиль
                            </Typography>
                        </Grid2>

                        <Grid2
                            display={"flex"}
                            justifyContent={"center"}
                            size={"40px"}
                        >
                            <Link href={MAIN_ROUTE(token)}>
                                <Box
                                    display={"flex"}
                                    alignItems={"center"}
                                    gap={1}
                                    pt={2}
                                    pb={2}
                                >
                                    <Image
                                        alt="logo"
                                        width={40}
                                        height={40}
                                        src={"/logo1_1.png"}
                                    />
                                </Box>
                            </Link>
                        </Grid2>
                        <Grid2
                            display={"flex"}
                            alignItems={"center"}
                            justifyContent={"end"}
                            size={"grow"}
                        >
                            <Box
                                display={"flex"}
                                // justifyContent={"end"}
                                height={"55px"}
                                maxWidth={"100%"}
                                pt={1}
                                pb={1}
                                gap={2}
                            >
                                {/* {data && data?.length !== 0 ? (
                                    <>
                                        <Button
                                            aria-label="more"
                                            id="long-button"
                                            sx={{
                                                height: "100% !important",
                                            }}
                                            aria-controls={
                                                menu ? "long-menu" : undefined
                                            }
                                            aria-expanded={
                                                menu ? "true" : undefined
                                            }
                                            aria-haspopup="true"
                                            onClick={handleClick}
                                            variant="outlined"
                                            color="secondary"
                                            size="small"
                                            // onClick={logOut}
                                        >
                                            <PhoneForwardedIcon />
                                        </Button>
                                        <Menu
                                            id="long-menu"
                                            MenuListProps={{
                                                "aria-labelledby":
                                                    "long-button",
                                            }}
                                            open={menu}
                                            onClose={handleClose}
                                            anchorEl={anchorEl}
                                            sx={{ paddingBottom: 0 }}
                                        >
                                            {data?.map((e, i) => (
                                                <Link
                                                    key={i + new Date()}
                                                    href={"tel:" + e.number}
                                                >
                                                    <MenuItem
                                                        onClick={handleClose}
                                                    >
                                                        {e.number}
                                                    </MenuItem>
                                                </Link>
                                            ))}
                                        </Menu>
                                    </>
                                ) : (
                                    ""
                                )} */}
                                <Box
                                    component={"a"}
                                    display={"flex"}
                                    alignItems={"center"}
                                    justifyContent={"center"}
                                    href="https://wa.me/message/JV3LEZKCJ5LVA1"
                                >
                                    <WhatsAppIcon color='secondary' fontSize="large" />
                                </Box>
                                <GoogleTranslate />
                            </Box>
                        </Grid2>
                    </Grid2>
                </Toolbar>
            </ContainerComponent>
        </Box>
    );
};

export default Header;
