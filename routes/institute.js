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
    } catch (err) {
        console.log(err);
    }

})

module.exports = router