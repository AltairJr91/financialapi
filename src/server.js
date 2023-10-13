const express = require('express');
const routes = require('./routes/routes');
const app = express();
const port = 3000

app.use(express.json())
app.use(routes)


app.listen(port, () => {
    console.log(`server running on ${port}`);
})