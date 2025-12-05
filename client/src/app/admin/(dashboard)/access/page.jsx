import ErrorElement from "../../../../components/ErrorElement";
import { ContainerComponent } from "../../../../components/wrappers/ContainerComponent";
import PhoneService from "../../../../services/PhoneService";
import BreadcrumbsComponent from "../../../../components/BreadcrumbsComponent";
import { Accesses } from "./Accesses";
import SiteService from "../../../../services/SiteService";

export const dynamic = "force-dynamic";

const site = new SiteService();

export default async function Page() {
    try {
        const { data } = await site.allTokens();
        return <Accesses dataApi={data} />;
    } catch (error) {
        console.log(error);
        return (
            <ContainerComponent>
                <BreadcrumbsComponent
                    options={[{ name: "доступ" }]}
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
