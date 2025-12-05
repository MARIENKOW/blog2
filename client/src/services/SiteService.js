import { $AdminApi } from "../http/index.js";
import config from "../configs/config.js";
import axios from "axios";

const SITE_API_URL = config.SERVER_API + "/";

export default class SiteService {
    constructor($api = axios) {
        this.sendTelegram = async (value) => {
            const res = await $api.post(SITE_API_URL + "/sendTelegram", value);
            return res;
        };
        this.checkToken = async (value) => {
            const res = await $api.post(SITE_API_URL + "/checkToken", {token:value});
            return res;
        };
        this.newToken = async (value) => {
            const res = await $AdminApi.post(SITE_API_URL + "/newToken", value);
            return res;
        };
        this.allTokens = async (value) => {
            const res = await axios.get(SITE_API_URL + "/allTokens", value);
            return res;
        };
        this.deleteToken = async (id) => {
            const res = await $AdminApi.delete(
                SITE_API_URL + "/deleteToken/" + id
            );
            return res;
        };
    }
}
