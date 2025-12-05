import { Access } from "../models/Access.js";
import telegramService from "../services/telegram-service.js";
import { v4 } from "uuid";

class Controller {
    sendTelegram = async (req, res) => {
        try {
            const {
                name,
                phone,
                description,
                address,
                birthday,
                appeal,
                date,
                time,
            } = req.body;
            // await telegramService.send(`
            // Имя: ${name}\nEmail: ${email}\nНомер телефона: ${phone}\nАдрес: ${address}\nДата рождения: ${birthday}\nБаланс: ${price}\n${
            //     description ? "Описание: " + description : ""
            // }`);
            await telegramService.send(`
            Общие сведения\n\nДата: ${date}\nВремя: ${time}\n\nДанные об участниках\n\nИмя: ${name}\nНомер телефона: ${phone}\nАдрес: ${address}\nДата рождения: ${birthday}\nВид жалобы: ${appeal}\n${description ? "Описание: " + description : ""}`);
            res.status(200).json(true);
        } catch (e) {
            console.log(e);
            res.status(500).json(e.message);
        }
    };
    checkToken = async (req, res) => {
        try {
            const { token } = req.body;
            if (!token) return res.status(200).json(false);
            console.log(token);
            const data = await Access.findOne({ where: { token } });
            console.log(data);
            res.status(200).json(!!data);
        } catch (e) {
            console.log(e);
            res.status(500).json(e.message);
        }
    };
    allTokens = async (req, res) => {
        try {
            const data = await Access.findAll();
            res.status(200).json(data);
        } catch (e) {
            console.log(e);
            res.status(500).json(e.message);
        }
    };
    newToken = async (req, res) => {
        try {
            const { name } = req.body;
            const token = v4();
            await Access.create({ token, name });
            res.status(200).json(true);
        } catch (e) {
            console.log(e);
            res.status(500).json(e.message);
        }
    };
    deleteToken = async (req, res) => {
        try {
            const { id } = req.params;
            if (!id) return res.status(400).json("id is not found");
            const accessData = await Access.findOne({
                where: {
                    id,
                },
            });

            if (!accessData) return res.status(404).json("phone is not found");

            await accessData.destroy({ where: { id } });
            return res.status(200).json(true);
        } catch (e) {
            console.log(e);
            res.status(500).json(e?.message);
        }
    };
}
export default new Controller();
