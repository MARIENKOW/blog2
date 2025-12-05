import { Box } from "@mui/material";
import BreadcrumbsComponent from "../../../../components/BreadcrumbsComponent";
import SendForm from "../SendForm";
import { MAIN_ROUTE } from "../../../../configs/routerLinks";
import { ContainerComponent } from "../../../../components/wrappers/ContainerComponent";

export default async function Page({ params }) {
    const { token } = await params;
    return (
        <Box>
            <ContainerComponent>
                <BreadcrumbsComponent
                    options={[{ name: "Подача жалоби" }]}
                    link={MAIN_ROUTE(token)}
                    sx={
                        {
                            mt:3,
                            // ol: {
                            //     borderRadius: 2,
                            //     display: "inline-flex",
                            //     backgroundColor: "#00427c",
                            //     padding: "5px 15px",
                            // },
                        }
                    }
                />
            </ContainerComponent>
            <SendForm />
        </Box>
    );
}
