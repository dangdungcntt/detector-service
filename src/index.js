const express = require('express');

const app = express();

require('./bootstrap')(app);

app.get('/geo', require('./services/geo'));

const PORT = process.env.PORT || 3403;

app.listen(PORT, (err) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }

    console.log(`Running on port ${PORT}`);
});