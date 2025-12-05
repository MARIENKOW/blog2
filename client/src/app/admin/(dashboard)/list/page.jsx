import ErrorElement from "../../../../components/ErrorElement";
import { ContainerComponent } from "../../../../components/wrappers/ContainerComponent";
import BreadcrumbsComponent from "../../../../components/BreadcrumbsComponent";
import { Lists } from "./Lists";
import ListService from "../../../../services/ListService";

export const dynamic = "force-dynamic";

const list = new ListService();

export default async function Page() {
    try {
        const { data } = await list.getLists();
        return <Lists dataApi={data} />;
    } catch (error) {
        console.log(error);
        return (
            <ContainerComponent>
                <BreadcrumbsComponent
                    options={[{ name: "адреса" }]}
                    sx={{
                        ol: {
                            borderRadius: 2,
                            display: "inline-flex",
                            backgroundColor: "#00427c",
                            padding: "5px 15px",
                        },
                    }}
                />
                <ErrorElement />
            </ContainerComponent>
        );
    }
}
