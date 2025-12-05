import PhoneService from "../services/PhoneService";
import Header from "./Header";

const phone = new PhoneService();

export const HeaderWrapper = async () => {
    try {
        const { data } = await phone.getPhones();
        console.log(data);
        return <Header data={data} />;
    } catch (error) {
        console.log(error);
        return <Header />;
    }
};
