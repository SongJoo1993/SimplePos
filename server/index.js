const express = require('express');
const cors = require('cors');
const app = express();
const inventory = require("./routes/inventory");

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

app.use('/api/v1/inventory', inventory);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});