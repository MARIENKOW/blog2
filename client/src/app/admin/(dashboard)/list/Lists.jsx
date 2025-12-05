"use client";

import { ContainerComponent } from "../../../../components/wrappers/ContainerComponent";
import BreadcrumbsComponent from "../../../../components/BreadcrumbsComponent";
import { Box, Button } from "@mui/material";
import { Empty } from "../../../../components/Empty";
import { ListForm } from "../../../../components/list/ListForm";
import { useState } from "react";
import ListService from "../../../../services/ListService";
import ListAdd from "../../../../components/list/ListAdd";

const list = new ListService();

export const Lists = ({ dataApi }) => {
    const [data, setData] = useState(dataApi || []);

    const getData = async () => {
        const { data } = await list.getLists();
        setData(data);
    };

    if (!data || data?.length === 0)
        return (
            <ContainerComponent>
                <Box
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    flexWrap={"nowrap"}
                    flexDirection={"row"}
                    gap={2}
                >
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
                    <ListAdd getData={getData} />
                </Box>
                <Box
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    flexDirection={"column"}
                    flex={1}
                >
                    <Empty />
                </Box>
            </ContainerComponent>
        );

    return (
        <ContainerComponent>
            <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
                flexWrap={"nowrap"}
                flexDirection={"row"}
                gap={2}
            >
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
                <ListAdd getData={getData} />
            </Box>
            <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                flexDirection={"column"}
                gap={1}
                flex={1}
            >
                {data?.map((e) => (
                    <ListForm getData={getData} key={e.id} item={e} />
                ))}
            </Box>
        </ContainerComponent>
    );
};
