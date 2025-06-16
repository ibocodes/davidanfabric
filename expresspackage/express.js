const express = require('express');
const app= express();
const path = require('path');

app.use(express.static(__dirname));

app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname, "home.html"));
});

app.listen(5000, () =>{
    console.log('server running on http://localhost:5000');
});

// add.use(express.json());
// add.use(express.static('public'))
// add.listen(5000, ()=>{
//     console.log(`Server is running on http://localhost:5000`);
// })