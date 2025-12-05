import { List } from "../models/List.js";

class Controller {
    create = async (req, res) => {
        try {
            const { name, phone } = req.body;

            if (!name)
                return res.status(400).json({ name: "некорректные данные" });
            if (!phone)
                return res.status(400).json({ phone: "некорректные данные" });

            await List.create({
                name,
                phone,
            });
            return res.status(200).json(true);
        } catch (e) {
            console.log(e);
            res.status(500).json(e?.message);
        }
    };
    delete = async (req, res) => {
        try {
            const { id } = req.params;
            if (!id) return res.status(404).json("id is not found");
            const listData = await List.findOne({
                where: {
                    id,
                },
            });

            if (!listData) return res.status(404).json("list is not found");

            await listData.destroy({ where: { id } });
            return res.status(200).json(true);
        } catch (e) {
            console.log(e);
            res.status(500).json(e?.message);
        }
    };
    update = async (req, res) => {
        try {
            const { name, phone } = req.body;

            const { id } = req.params;
            if (!id) return res.status(404).json("id is not found");

            if (!name)
                return res.status(400).json({ name: "некорректные данные" });
            if (!phone)
                return res.status(400).json({ phone: "некорректные данные" });

            const listData = await List.findOne({
                where: {
                    id,
                },
            });

            if (!listData) return res.status(404).json("phone not found");

            await List.update({ name, phone }, { where: { id: listData.id } });

            return res.status(200).json(true);
        } catch (e) {
            console.log(e);
            res.status(500).json(e?.message);
        }
    };
    getLists = async (req, res) => {
        try {
            const list = await List.findAll();

            return res.status(200).json(list);
        } catch (e) {
            console.log(e);
            res.status(500).json(e?.message);
        }
    };
}
export default new Controller();
