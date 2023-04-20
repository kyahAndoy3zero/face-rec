const Person = require('../model/personModel');
const csv = require('csv-parser');
const multer = require('multer');
const sharp = require('sharp');
const { Readable } = require('stream');
const path = require('path')



const multerStorage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image') || file.mimetype === 'text/csv') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: multerStorage,
    fileFilter,
});

const uploadFiles = upload.any();

const parseCsv = async (req, res, next) => {

    const csvFile = req.files.find(file => file.mimetype === 'text/csv');

    if (!csvFile) {
        return next();
    }

    for (const file of req.files) {
        if (file.mimetype !== 'text/csv') continue;

        // Parse the CSV file

        const results = [];
        const buffer = Buffer.from(file.buffer, 'utf-8');
        const stream = Readable.from(buffer.toString());



        stream.pipe(csv())
            .on('data', (data) => {
                // Validate CSV fields
                const { first_name, last_name, id_number, gender, year_level, course } = data;

                console.log(first_name, last_name, id_number, gender, year_level, course)


                if (!first_name || !last_name || !id_number || !gender || !year_level || !course) {

                    throw new Error('CSV file contains invalid data. Please check and try again.');
                }
                results.push(data);
            })
            .on('end', async () => {
                // Save parsed CSV data to MongoDB
                try {
                    const persons = await Person.create(results);
                    req.parsedCsv = persons;
                    next();
                } catch (error) {
                    next(error);
                }
            });
    }
};


const uploadImages = async (req, res, next) => {

    if (!req.files || req.files.length === 0) {
        return next();
    }

    // 2) Images
    await Promise.all(
        req.files.map(async (file, i) => {

            if (!file.mimetype.startsWith('image')) return;

            await sharp(file.buffer)
                .toFormat('jpeg')
                .jpeg({ quality: 90 })
                .toFile(path.join(__dirname, "../../student_images", file.originalname))
        })
    );

    next();
};



module.exports = {
    uploadFiles,
    parseCsv,
    uploadImages
}