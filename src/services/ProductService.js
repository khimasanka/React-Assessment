import axios from "../axios";

class ProductService{
    getAllCategories = async () => {
        const promise = new Promise((resolve => {
            axios.get('products/categories')
                .then((res) => {
                    return resolve(res);
                })
                .catch((err) => {
                    return resolve(err);
                });
        }));
        return await promise;
    };

    getAllProducts = async () => {
        const promise = new Promise((resolve => {
            axios.get('products')
                .then((res) => {
                    return resolve(res);
                })
                .catch((err) => {
                    return resolve(err);
                });
        }));
        return await promise;
    };

    saveProduct = async (data) => {
        console.log(data)
        const promise = new Promise((resolve => {
            axios.post('products',data)
                .then((res) => {
                    return resolve(res);
                })
                .catch((err) => {
                    return resolve(err);
                });
        }));
        return await promise;
    };
}
export default new ProductService();