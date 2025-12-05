import { $AdminApi } from "../http/index.js";
import config from "../configs/config.js";
import axios from "axios";

const LIST_API_URL = config.SERVER_API + "/List";

export default class ListService {
    constructor($api = $AdminApi) {
        this.create = async (value) => {
            if (this.CancelToken) this.CancelToken.abort();
            const controller = new AbortController();
            this.CancelToken = controller;
            const res = await $api.post(LIST_API_URL + "/", value, {
                headers: { "Content-Type": "multipart/form-data" },
                signal: controller.signal,
            });
            return res;
        };
        this.update = async (id, value) => {
            if (this.CancelToken) this.CancelToken.abort();
            const controller = new AbortController();
            this.CancelToken = controller;
            const res = await $api.put(LIST_API_URL + "/" + id, value, {
                headers: { "Content-Type": "multipart/form-data" },
                signal: controller.signal,
            });
            return res;
        };
        this.delete = async (id) => {
            if (this.CancelToken) this.CancelToken.abort();
            const controller = new AbortController();
            this.CancelToken = controller;
            const res = await $api.delete(LIST_API_URL + "/" + id, {
                signal: controller.signal,
            });
            return res;
        };
        this.getLists = async () => {
            const res = await axios.get(LIST_API_URL + "/");
            return res;
        };
    }
}
