const express = require('express');
const fs = require('fs');
const { exec } = require('child_process');
const app = express();
app.use(express.json());
const port = 5001;
var stdoutx;
app.get('/chatx/:pk/:create', async (req, res) => {
    
    fs.writeFile('.env',`PK = ${req.params.pk}`, function (err) {
        if (err) throw err;
        console.log('File is created successfully.');
    });

    if (req.params.create === 'TRUE'){
        exec('npx hardhat compile', (error, stdout, stderr) => {if (error) {console.error(`exec error: ${error}`);return;}
            console.log(`stdout: ${stdout}`);console.error(`stderr: ${stderr}`);});
        exec('npx hardhat run scripts/deploy.js --network matic', (error, stdout, stderr) => {if (error) {console.error(`exec error: ${error}`);return;}
            stdoutx = stdout;console.log(`stdout: ${stdout}`);console.error(`stderr: ${stderr}`);});
    }
    res.status(200).json({'pk':req.params.pk,'create':req.params.create})
});

app.get('/invitex' , (req, res) =>{
    res.status(200).json({'contract':(new String(stdoutx)).slice(25,-2)})
});
app.listen(port, () => {console.log(`listening at http://localhost:${port}`)});
