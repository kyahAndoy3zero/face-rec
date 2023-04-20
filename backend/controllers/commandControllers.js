const asyncHanlder = require("express-async-handler");
const { spawn } = require('child_process')

const trainCommand = asyncHanlder(async (req, res) => {

    const pythonProcess = spawn('python', ['./train.py']);

    pythonProcess.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    pythonProcess.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
        res.status(200).json({
            status: 'success',
            message: `Training Done`
        })
    });



})


const runCommand = asyncHanlder(async (req, res) => {

    const pythonProcess = spawn('python', ['./facerec.py']);

    pythonProcess.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    pythonProcess.on('close', (code) => {
        console.log(`child process exited with code ${code}`);

    });

    res.status(200).json({
        status: 'success',
        message: `A video window will pop out`
    })

})

module.exports = {
    trainCommand,
    runCommand
};
