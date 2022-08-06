import axios from "../axios";

class CartService{
    getAllCarts =async ()=>{
        const promise = new Promise((resolve => {
            axios.get('carts')
                .then((res) => {
                    return resolve(res);
                })
                .catch((err) => {
                    return resolve(err);
                });
        }));
        return await promise;
    }
}
export default new CartService();