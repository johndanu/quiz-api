const express = require('express')
// const institute = require('../models/institute')
const router = express.Router()
const Institute = require('../models/institute')


router.get('/', async (req, res) => {
    try {
        const institute = await Institute.find()
        res.json(institute)
    } catch (err) {
        res.send('Error ' + err)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const institute = await Institute.findById(req.params.id)
        res.json(institute)
    } catch (err) {
        res.send('Error ' + err)
    }
})


router.post('/', async (req, res) => {
    const institute = new Institute({
        name: req.body.name,
        address: req.body.address,
        city: req.body.city,
        phoneNo: req.body.phoneNo
    })
    try {
        const a1 = await institute.save()
        res.json(a1)
    } catch (err) {
        res.send(err)
    }
})

router.patch('/:id', async (req, res) => {
    let newQuiz =  req.body.quiz;
    try {
        const i = Institute.updateOne(
                { _id: req.params.id }, 
                { $push: { available: newQuiz } },(done)=>{
                res.send('added')
                }
            );

        // console.log(institute1);
        // // const a1 = await institute.findByIdAndUpdate(req.params.id, institute)
        // // console.log(available)

        // const a1 = await institute1.available.push(newQuiz)
        // const a2 = await institute1.save(done)
        // console.log(a1);
        // res.json(a2)
    } catch (err) {
        console.log(err);
    }

})

module.exports = router