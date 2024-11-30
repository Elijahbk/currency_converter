const path = require('path');

(async () => {
    const express = require('express');
    const fetchModule = await import('node-fetch');
    const fetch = fetchModule.default;
    const dotenv = require('dotenv');
    dotenv.config();

    const app = express();
    const apiKey = process.env.EXCHANGE_RATES_API_KEY;
    const url = `https://api.exchangeratesapi.io/latest?access_key=${apiKey}`;

    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, 'index.html'));
    });

    app.get('/api/rates', async (req, res) => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data.error) {
                res.status(500).json({ error: data.error });
            } else {
                res.json(data);
            }
        } catch (error) {
            res.status(500).json({ error: 'Error fetching data' });
        }
    });

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})();
