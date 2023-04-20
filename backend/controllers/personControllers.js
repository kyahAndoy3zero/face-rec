const asyncHanlder = require("express-async-handler");
const Person = require("../model/personModel");

const getPersons = asyncHanlder(async (req, res) => {

  try {

    let query = Person.find({ show: true });
    query = query.sort('-time_in');
    query = query.select('-__v');


    if (req.query.q) {
      const profiles = await query;
      const keys = ["first_name", "last_name", "id_number"];

      const search = (data) => {
        return data.filter((item) =>
          keys.some((key) => item[key].includes(req.query.q))
        );
      };
      return res.status(200).json({
        data: {
          person: search(profiles)
        }
      })
    }

    const changeStream = Person.watch();
    changeStream.on

    const person = await query;


    res.status(200).json({
      status: 'success',
      total: person.length,
      data: {
        person: person
      }
    })

  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: err
    });
  }
});



const createPerson = asyncHanlder(async (req, res) => {

  console.log(req.body)
  const { first_name, last_name, id_number, gender, year_level, course } = req.body;

  if (!first_name || !last_name || !id_number || !gender || !year_level || !course) {
    res.status(400);
    throw new Error("Data is lacking");
  }

  const profileExist = await Person.findOne({ id_number });

  if (profileExist) {
    res.status(400);
    throw new Error("Profile already exist");
  }


  const person = await Person.create({

    first_name: first_name,
    last_name: last_name,
    id_number: id_number,
    gender: gender,
    year_level: year_level,
    course: course
  });

  res.status(200).json(person);

});


const reset = asyncHanlder(async (req, res) => {

  const person = await Person.findOneAndUpdate({ _id: req.params.id }, { $set: { show: false } });

  res.status(200).json({
    status: 'updated',
    data: {
      person: person
    }
  })

})


const deletePerson = asyncHanlder(async (req, res) => {
  const person = await Person.findById(req.params.id)

  if (!person) {
    res.status(400)
    throw new Error('Person not found')
  }

  await person.remove()

  res.status(200).json({ id: req.params.id })

})


const updatePerson = asyncHanlder(async (req, res) => {

  const { id, first_name, last_name, id_number, course, gender, year_level } = req.body;

  const person = await Person.findById(id)

  person.first_name = first_name
  person.last_name = last_name
  person.id_number = id_number
  person.gender = gender
  person.year_level = year_level
  person.course = course

  const updated = await person.save()
  res.status(200).json({ message: `${updated} updated` })

})


const studentStats = asyncHanlder(async (req, res) => {

  const stats = await Person.aggregate([

    {
      $match: {
        show: { $eq: true }
      }
    },

    {
      $group: {
        _id: '$course',
        maleCount: { $sum: { $cond: [{ $eq: ["$gender", "Male"] }, 1, 0] } },
        femaleCount: { $sum: { $cond: [{ $eq: ["$gender", "Female"] }, 1, 0] } },
        fyear: { $sum: { $cond: [{ $eq: ["$year_level", "1st Year"] }, 1, 0] } },
        syear: { $sum: { $cond: [{ $eq: ["$year_level", "2nd Year"] }, 1, 0] } },
        tyear: { $sum: { $cond: [{ $eq: ["$year_level", "3rd Year"] }, 1, 0] } },
        lyear: { $sum: { $cond: [{ $eq: ["$year_level", "4rth Year"] }, 1, 0] } },
        total: { $sum: 1 },
      }
    }
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      stats
    }
  })

})


module.exports = {
  getPersons,
  createPerson,
  updatePerson,
  deletePerson,
  reset,
  studentStats
};


