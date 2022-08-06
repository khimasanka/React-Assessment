import axios from "../axios";

class UserService{
    userRegister =async (data)=>{
        const promise = new Promise((resolve,reject) => {
            axios.post('users', data)
                .then((res) => {
                    return resolve(res);
                })
                .catch((err) => {
                    return resolve(err);
                });
        });
        return await promise;
    }

    getAllUsers =async ()=>{
        const promise = new Promise((resolve) => {

            axios.get('users')
                .then((res) => {
                    return resolve(res);
                })
                .catch((err) => {
                    return resolve(err);
                });
        });
        return await promise;
    }

    removeUser =async (id)=>{
        const promise = new Promise((resolve,reject) => {
            axios.delete(`users/${id}`)
                .then((res) => {
                    return resolve(res);
                })
                .catch((err) => {
                    return resolve(err);
                });
        });
        return await promise;
    }
}

export default new UserService();