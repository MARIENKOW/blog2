"use client";

import AdminStore from "../../../store/admin-store";
import { createContext, useEffect } from "react";
export const adminStore = new AdminStore();
import { inter, montserrat } from "../../../fonts/index";
export const AdminContext = createContext(adminStore);
import ChechAuthAdmin from "../../../components/wrappers/ChechAuthAdmin";
import HeaderAdmin from "../../../components/HeaderAdmin";
import "../../globals.scss";
import { Box } from "@mui/material";
import { MainWrapper } from "../../../components/wrappers/MainWrapper";

export default function RootLayout({ children }) {
    useEffect(() => {
        adminStore.aboutAdmin();
    }, []);

    return (
        <html
            className={montserrat.className}
            style={{ background: "#023460e6" }}
            lang="ru"
        >
            <body style={{ background: "#fff" }}>
                <MainWrapper>
                    <AdminContext.Provider value={adminStore}>
                        <ChechAuthAdmin>
                            <Box
                                display={"flex"}
                                flexDirection={"column"}
                                flex={1}
                                bgcolor={"#fff"}
                            >
                                <HeaderAdmin />
                                {children}
                            </Box>
                        </ChechAuthAdmin>
                    </AdminContext.Provider>
                </MainWrapper>
            </body>
        </html>
    );
}
