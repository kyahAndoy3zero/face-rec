const asyncHanlder = require("express-async-handler");





const importFiles = asyncHanlder(async (req, res) => {

    res.status(200).json({
        status: 'success',
        message: `Data Imported`
    })
})


module.exports = {
    importFiles,
};

