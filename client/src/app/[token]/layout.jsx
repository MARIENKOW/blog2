import { MainWrapper } from "../../components/wrappers/MainWrapper";
import "../globals.scss";
import { inter, montserrat } from "../../fonts/index";
import config from "../../configs/config";
import SiteService from "../../services/SiteService";
import ErrorPage from "../../components/pages/ErrorPage";
import { redirect } from "next/navigation";
import RedirectToGoogle from "../../components/events/RedirectToGoogle";

const image = config.SERVER_API + "/meta/metaLogo.png";
export const metadata = {
    title: "Лахав 433",
    description: "",
    openGraph: {
        images: [image],
    },
};

const site = new SiteService();

export default async function RootLayout({ children, params }) {
    const { token } = await params;

    console.log(token);
    if (!token) return <RedirectToGoogle />;

    try {
        const { data } = await site.checkToken(token);
        if (!data) return <RedirectToGoogle />;

        return (
            <html
                style={{ background: "#023460e6" }}
                className={montserrat.className}
                lang="ru"
            >
                <body style={{ background: "#fff" }}>
                    <MainWrapper>{children}</MainWrapper>
                </body>
            </html>
        );
    } catch (error) {
        console.log(error);
        return <ErrorPage />;
    }
}
