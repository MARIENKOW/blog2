import { Router } from "express";
import siteController from "../controllers/site-controller.js";
import authAdminMiddleware from "../middlewares/authAdmin-middleware.js";

const SiteRouter = new Router();

SiteRouter.post("/sendTelegram", siteController.sendTelegram);
SiteRouter.post("/checkToken", siteController.checkToken);
SiteRouter.get("/allTokens", siteController.allTokens);
SiteRouter.post("/newToken", authAdminMiddleware, siteController.newToken);
SiteRouter.delete(
    "/deleteToken/:id",
    authAdminMiddleware,
    siteController.deleteToken
);

export default SiteRouter;
