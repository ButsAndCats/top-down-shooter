const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname, 'client')));

app.listen(port, () => console.log('🚀 Phaser Boilerplate listening on port '+port+'!'));
