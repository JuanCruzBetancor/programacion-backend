import { MessagesModel } from "./models/messagesModel.js";

export default class MessagesManagerMongoDB {
    static async guardarMensaje(username, message) {
        try {
        const nuevoMensaje = new MessagesModel({
            user: username,
            message: message,
        });

        await nuevoMensaje.save();
        console.log("Mensaje guardado en MongoDB");
        } catch (error) {
        console.error("Error al guardar el mensaje en MongoDB:", error);
        }
    }
    }
