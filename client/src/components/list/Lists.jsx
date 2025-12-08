import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import ListService from "../../services/ListService";

const list = new ListService();

export default async function Lists() {
    try {
        const { data } = await list.getLists();

        if (!data || data?.length === 0) return "";

        return (
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
                                    bgcolor: i % 2 ? "" : "#bdbdbd",
                                    "&:last-child td, &:last-child th": {
                                        border: 0,
                                    },
                                }}
                            >
                                <TableCell component="th" scope="row">
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
        );
    } catch (error) {
        console.log(error);
        return "";
    }
}
