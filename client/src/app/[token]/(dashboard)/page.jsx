import { Box, Button } from "@mui/material";
import { ContainerComponent } from "../../../components/wrappers/ContainerComponent";
import Link from "next/link";
import { REPORT_ROUTE } from "../../../configs/routerLinks";
import { Map } from "../../../components/Map";
import Lists from "../../../components/list/Lists";


export default async function Page({ params }) {
    const { token } = await params;

    return (
        <>
            {/* <Box
                component={"img"}
                src="/main.jpg"
                sx={{ aspectRatio: "4/1", objectFit: "cover" }}
                width={"100%"}
            /> */}
            <Box
                className={"rmUserSelect"}
                sx={{
                    position: "relative",
                    // height: "100%",
                    overflow: "hidden",
                }}
            >
                <Box
                    className={"rmUserSelect"}
                    sx={{
                        width: "100%",
                        height: "100%",
                        aspectRatio: { xs: "auto", md: "4/1" },
                        objectFit: "cover",
                        opacity: "1",
                    }}
                    component={"img"}
                    src={"/main.jpg"}
                ></Box>
                <Box
                    className={"rmUserSelect"}
                    sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        pointerEvents: "none",
                        height: "100%",
                        background: `linear-gradient(transparent,#fff)`,
                    }}
                ></Box>
            </Box>
            <ContainerComponent sx={{ flex: "none" }}>
                <Box mt={2} display={"flex"} justifyContent={"center"}>
                    <Link href={REPORT_ROUTE(token)}>
                        <Button
                            sx={{ minWidth: "250px" }}
                            size="large"
                            variant="contained"
                        >
                            Подать жалобу
                        </Button>
                    </Link>
                </Box>
            </ContainerComponent>
            <ContainerComponent
                sx={{ p: { xs: 0, md: 1 }, mt: 5, flex: "none" }}
            >
                <Box display={"flex"} justifyContent={"center"}>
                    <Box flex={"0 1 500px"} maxWidth={"500px"}>
                        <Lists/>
                    </Box>
                </Box>
            </ContainerComponent>
            <Box mt={10}>
                <Map />
            </Box>
        </>
    );
}
