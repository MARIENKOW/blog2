import token from "../services/token-service.js";

const authAdminMiddleware = (req, res, next) => {
    try {
        const { accessTokenAdmin } = req.cookies;

        console.log(accessTokenAdmin);

        console.log(req.cookies);

        if (!accessTokenAdmin) return res.status(401).json("not authorized");

        const adminData = token.validateAccessToken(accessTokenAdmin);

        if (!adminData) return res.status(401).json("not authorized");

        if (adminData.role !== "admin")
            return res.status(401).json("not authorized");

        req.admin = adminData;
        next();
    } catch (e) {
        console.log(e);
        return res.status(500).json("some Error in middleware");
    }
};

export default authAdminMiddleware;
