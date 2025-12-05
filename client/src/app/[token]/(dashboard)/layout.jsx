import { Box } from "@mui/system";
import ImgBG from "../../../components/ImgBG";
import { Footer } from "../../../components/Footer";
import { HeaderWrapper } from "../../../components/HeaderWrapper";
import { Map } from "../../../components/Map";
import SendForm from "./SendForm";

export const dynamic = "force-dynamic";

export default function RootLayout({ children }) {
    return (
        <>
            <Box
                position={"relative"}
                flex={1}
                display={"flex"}
                flexDirection={"column"}
                overflow={"hidden"}
            >
                {/* <ImgBG /> */}
                <HeaderWrapper />
                {/* <Header data={[{number:+99288294440},{number:+99288294440},{number:+99288294440}]} /> */}
                <Box
                    display={"flex"}
                    flexDirection={"column"}
                    flex={1}
                    position={"relative"}
                    zIndex={"10 "}
                >
                    {children}
                    {/* <Map /> */}
                </Box>
                <Footer />
            </Box>
        </>
    );
}
