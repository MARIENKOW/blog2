import { Box, Button } from "@mui/material";
import Link from "next/link";
import { ContainerComponent } from "../../../components/wrappers/ContainerComponent";
import { ADMIN_PHONE_ROUTE } from "../../../configs/routerLinks";
import { ADMIN_ACCESS_ROUTE } from "../../../configs/routerLinks";
import { ADMIN_LIST_ROUTE } from "../../../configs/routerLinks";

export default function Page() {
    return (
        <ContainerComponent
            sx={{
                flex: 1,
                display: "flex",
                alingItems: "center",
                justifyContent: "center",
                flexDirection: "row",
            }}
        >
            <Box
                flex={"0 1 400px"}
                display={"flex"}
                gap={4}
                justifyContent={"center"}
                flexDirection={"column"}
            >
                {/* <Link href={ADMIN_BLOG_ROUTE}>
                    <Button fullWidth variant="contained" color="primary">
                        Новости
                    </Button>
                </Link> */}
                {/* <Link href={ADMIN_PHONE_ROUTE}>
                    <Button fullWidth variant="contained" color="primary">
                        контакты
                    </Button>
                </Link> */}
                <Link href={ADMIN_LIST_ROUTE}>
                    <Button fullWidth variant="contained" color="primary">
                        адреса
                    </Button>
                </Link>
                <Link href={ADMIN_ACCESS_ROUTE}>
                    <Button fullWidth variant="contained" color="primary">
                        доступ
                    </Button>
                </Link>
            </Box>
        </ContainerComponent>
    );
}
