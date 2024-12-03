const express = require('express');
const admin = require('firebase-admin');
const multer = require('multer');

const serviceAccount = require('./project-1944015027215575767-firebase-adminsdk-8h77y-7946dfd512.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://project-1944015027215575767-default-rtdb.firebaseio.com",
    storageBucket: "project-1944015027215575767.appspot.com"
});

const db = admin.firestore();
const bucket = admin.storage().bucket();
const app = express();
app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() });

app.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const file = req.file;
        const blob = bucket.file(file.originalname);
        const blobStream = blob.createWriteStream();

        blobStream.on('error', (err) => res.status(500).send(err));
        blobStream.on('finish', () => {
            res.status(200).send({ message: 'Archivo subido con éxito' });
        });

        blobStream.end(file.buffer);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.post('/add', async (req, res) => {
    try {
        const { collection, data } = req.body;
        const docRef = await db.collection(collection).add(data);
        res.status(200).send({ id: docRef.id });
    } catch (error) {
        res.status(500).send(error.message);
    }
});


app.listen(3200, () => console.log(`Servidor corriendo en http://localhost:${3200}`));
