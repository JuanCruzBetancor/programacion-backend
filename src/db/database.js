import mongoose from 'mongoose';

const username = 'juanbetancor91';
const password = '6xR8E0uVbl9dYviB';

// Codificar la contraseña en URL
const encodedPassword = encodeURIComponent(password);

const connectionString = `mongodb+srv://${username}:${encodedPassword}@cluster0.i1n4pzx.mongodb.net/?retryWrites=true&w=majority`;

try {
    await mongoose.connect(connectionString);
    console.log('Conectado a la base de datos de MongoDB');
} catch (error) {
    console.log(error);
}
