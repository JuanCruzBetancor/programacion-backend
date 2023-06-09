import { ProductsModel } from "./models/productsModel.js";

export default class ProductsMongoDB {

    async getAllProducts(limit = 10, page = 1, sort = "") {
        try {
            let sortOption = {};

            if (sort === "asc") {
                sortOption = { price: 1 };
                } else if (sort === "desc") {
                sortOption = { price: -1 };
                }
        
            const totalCount = await ProductsModel.countDocuments({});
            const totalPages = Math.ceil(totalCount / limit);
            const hasNextPage = page < totalPages;
            const hasPrevPage = page > 1;
            const prevPage = hasPrevPage ? page - 1 : null;
            const nextPage = hasNextPage ? page + 1 : null;
            const prevLink = hasPrevPage ? `?limit=${limit}&page=${prevPage}&sort=${sort}` : null;
            const nextLink = hasNextPage ? `?limit=${limit}&page=${nextPage}&sort=${sort}` : null;
        
            const response = await ProductsModel.find({})
                .sort(sortOption)
                .skip((page - 1) * limit)
                .limit(limit);
            
                return {
                status: "success",
                payload: response,
                totalPages,
                prevPage,
                nextPage,
                page,
                hasPrevPage,
                hasNextPage,
                prevLink,
                nextLink,
            }
        } catch (error) {
        console.log(error);
        }
    }

    
    async createProduct(productData) {
            try {
                const product = new ProductsModel(productData);
                await product.save();
                return product;
            } catch (error) {
                throw new Error('Error al crear el producto');
            }
            }

    async getProductById(id) {
        try {
            const response = await ProductsModel.findById(id);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async createProduct(obj) {
        try {
        const response = await ProductsModel.create(obj);
        return response;
        } catch (error) {
        console.log(error);
        }
    }

    async updateProduct(id, obj) {
        try {
        await ProductsModel.updateOne({_id: id}, obj);
        return obj;
        } catch (error) {
        console.log(error);
        }
    }

    async deleteProduct(id) {
        try {
        const response = await ProductsModel.findByIdAndDelete(id);
        return response;
        } catch (error) {
        console.log(error);
        }
    }
    }