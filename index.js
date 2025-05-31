const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbztn5oBu635g0-9rIywa2BwZMXcOhgsfcxmRo2GTpwrnFD4O6lJAQH-7z1L4y0quAkt/exec';


app.post('/api/solicitud', async(req, res) => {
    try {
        const formData = new URLSearchParams(req.body).toString();

        const response = await axios.post(GOOGLE_SCRIPT_URL, formData, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });

        res.json({ ok: true, mensaje: '✅ Solicitud reenviada', respuesta: response.data });
    } catch (error) {
        console.error('Error al reenviar:', error.message);
        res.status(500).json({ ok: false, mensaje: '❌ Falló el reenvío' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
