"use client";

import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useTheme } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { ADMIN_ROUTE } from "../configs/routerLinks";
import { StyledLink } from "./StyledLink";
import Link from "next/link";
import style from "./breadcrumbs.module.scss";

export default function BreadcrumbsComponent({
    main = true,
    link = ADMIN_ROUTE,
    options,
    sx = {},
}) {
    const theme = useTheme();
    return (
        <Breadcrumbs
            maxItems={3}
            separator={<NavigateNextIcon color="secondary" fontSize="small" />}
            aria-label="breadcrumb"
            // ol: {
            //     borderRadius: 2,
            //     display: "inline-flex",
            //     backgroundColor: "#00427c",
            //     padding: "5px 15px",
            // },

            sx={{
                borderRadius: 2,
                display: "inline-flex",
                backgroundColor: theme.palette.primary.dark,
                padding: "5px 15px",
                ...sx,
                "& ol": { flexWrap: "nowrap !important" },
            }}
        >
            {main && (
                <Link href={link}>
                    <StyledLink>
                        <HomeIcon sx={{ mr: 0.5 }} fontSize="small" />
                        Главная
                    </StyledLink>
                </Link>
            )}
            {options?.map((e, i, arr) =>
                i !== arr.length - 1 ? (
                    <Link href={e?.link} key={new Date()}>
                        <StyledLink>
                            {e?.icon}
                            <Typography className={style.bread}>
                                {e?.name}
                            </Typography>
                        </StyledLink>
                    </Link>
                ) : (
                    <Typography
                        className={style.bread}
                        key={new Date()}
                        color={theme.palette.secondary.light}
                    >
                        {e?.name}
                    </Typography>
                )
            )}
        </Breadcrumbs>
    );
}
