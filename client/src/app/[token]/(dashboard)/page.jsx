import ListService from "../../../services/ListService";
import ErrorElement from "../../../components/ErrorElement";
import { Empty } from "../../../components/Empty";
import { Box, Button, Grid2, Typography } from "@mui/material";
import { ContainerComponent } from "../../../components/wrappers/ContainerComponent";
import { grey } from "@mui/material/colors";
import Link from "next/link";
import { REPORT_ROUTE } from "../../../configs/routerLinks";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Map } from "../../../components/Map";

const list = new ListService();

export default async function Page({ params }) {
    const { token } = await params;
    try {
        const { data } = await list.getLists();

        if (!data || data?.length === 0) return <Empty />;

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
                            <TableContainer component={Paper}>
                                <Table size="small" aria-label="a dense table">
                                    <TableHead>
                                        <TableRow sx={{ bgcolor: "#023460e6" }}>
                                            <TableCell align="left">
                                                <Typography
                                                    variant="body1"
                                                    fontWeight={600}
                                                    color="secondary"
                                                >
                                                    Отдел
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="right">
                                                <Typography
                                                    variant="body1"
                                                    fontWeight={600}
                                                    color="secondary"
                                                >
                                                    Телефон
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {data.map((row, i) => (
                                            <TableRow
                                                key={row.id}
                                                sx={{
                                                    bgcolor:
                                                        i % 2 ? "" : "#bdbdbd",
                                                    "&:last-child td, &:last-child th":
                                                        { border: 0 },
                                                }}
                                            >
                                                <TableCell
                                                    component="th"
                                                    scope="row"
                                                >
                                                    <Typography
                                                        fontSize={16}
                                                        fontWeight={400}
                                                        variant="body1"
                                                    >
                                                        {row.name}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Typography
                                                        fontSize={16}
                                                        fontWeight={400}
                                                        variant="body1"
                                                    >
                                                        {row.phone}
                                                    </Typography>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </Box>
                </ContainerComponent>
                <Box mt={10} >
                    <Map />
                </Box>
            </>
        );
    } catch (error) {
        console.log(error);
        return <ErrorElement />;
    }
}
