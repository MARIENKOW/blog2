import { Router } from "express";
import autAdminMiddelware from "../middlewares/authAdmin-middleware.js";
import listController from "../controllers/list-controller.js";

const ListRouter = new Router();

ListRouter.post("/", autAdminMiddelware, listController.create);
ListRouter.put("/:id", autAdminMiddelware, listController.update);
ListRouter.delete("/:id", autAdminMiddelware, listController.delete);
ListRouter.get("/", listController.getLists);

export default ListRouter;
