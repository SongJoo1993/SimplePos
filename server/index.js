const express = require('express');
const app = express();
const inventory = require("./routes/inventory");

const PORT = process.env.PORT || 8080;

app.use(express.json());

app.use('/api/v1/inventory', inventory);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});