const { response } = require('express')
const express = require('express')

const router = express.Router()
const Quiz = require('../models/quiz')
const Institute = require('../models/institute')


router.get('/', async (req, res) => {
    try {
        const quiz = await Quiz.find()
        res.json(quiz)
    } catch (err) {
        res.send('Error ' + err)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id)
        res.json(quiz)
    } catch (err) {
        res.send('Error ' + err)
    }
})


router.post('/', async (req, res) => {
    console.log(req.body.QuizName);
    const quiz = new Quiz({
        InstituteID: req.body.InstituteID,
        SubjectId: req.body.SubjectId,
        QuizName: req.body.QuizName,
        Term: req.body.Term
    })
    try {
        // await Institute.updateOne(
        //     { _id: quiz.InstituteID },
        //     { $push: { available: quiz.Term } }, (done) => {
        //     })
        const a1 = await quiz.save();
        res.send(a1)
    } catch (err) {
        res.send(err)
    }
})


router.patch('/:id', async (req, res) => {
    //Getting the answers and Making it as arrays
    let answersReceived = req.body.answers
    let answersToAdd = answersReceived.split(",")
    //Create the Question object
    let newQuestion = {
        Question: req.body.question,
        Answers: answersToAdd,
        CorrectAnswer: req.body.correctAnswer
    }
    try {
        const i = Quiz.updateOne(
            { _id: req.params.id },
            { $push: { Questions: newQuestion } }, (done) => {
                res.sendStatus(200)
            }
        );

    } catch (err) {
        console.log(err);
    }

})

module.exports = router