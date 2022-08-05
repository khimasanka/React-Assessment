import axios from "../axios";

class LoginService {
    loginUser = async (data) => {
        const promise = new Promise((resolve => {
            axios({
                method: "post",
                url: "auth/login",
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            })
                .then((res) => {
                    return resolve(res)
                })
                .catch((err) => {
                    return resolve(err)
                });
        }));
        return await promise;
    };
}
export default new LoginService();