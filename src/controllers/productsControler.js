import { getAllService, getByIdService, createService, updateService, deleteService,} from "../services/products-service.js";
    
    export const getAllController = async (req, res, next) => {
        try {
            //const { sort } = req.query; => se trae la info de service para realizar la peticion.
            //const docs = await getAllService(sort);=> se le pasa el sort para buscar por ruta.
            const page = req.query.page || 1;
        const { payload, totalPages, prevPage, nextPage, hasPrevPage, hasNextPage, prevLink, nextLink } = await getAllService(page);
        
        const response = {
            status: "success",
            payload,
            totalPages,
            prevPage,
            nextPage,
            page,
            hasPrevPage,
            hasNextPage,
            prevLink,
            nextLink
        };

        res.json(response);
        } catch (error) {
        next(error);
        }
    };
    
    export const createController = async (req, res, next) => {
        try {
            const { title, description, category, price, stock } = req.body;
            const newDoc = await createService.createProduct({
                title,
                description,
                category,
                price,
                stock
            });
            res.json(newDoc);
            } catch (error) {
            next(error);
            }
        };

    export const getByIdController = async (req, res, next) => {
        try {
        const { id } = req.params;
        const doc = await getByIdService(id);
        res.json(doc);
        } catch (error) {
        next(error);
        }
    };
    
    export const createController2 = async (req, res, next) => {
        try {
        const { title, description, category, price, stock } = req.body;
        const newDoc = await createService({
            title,
            description,
            category,
            price,
            stock
        });
        res.json(newDoc);
        } catch (error) {
        next(error);
        }
    };
    
    export const updateController = async (req, res, next) => {
        try {
        const { id } = req.params;
        const { title, description, category, price, stock } = req.body;
        await getByIdService(id);
        const docUpd = await updateService(id, {
            title, description, category, price, stock
        });
        res.json(docUpd);
        } catch (error) {
        next(error);
        }
    };
    
    export const deleteController = async (req, res, next) => {
        try {
        const { id } = req.params;
        await deleteService(id);
        res.json({message: 'Product deleted successfully!'})
        } catch (error) {
        next(error);
        }
    };