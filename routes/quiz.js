const { response } = require('express')
const express = require('express')
var ObjectId = require('mongodb').ObjectId;

const router = express.Router()
const Quiz = require('../models/quiz')
const Institute = require('../models/institute')
const institute = require('../models/institute')


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
    // console.log(req.body.QuizName);
    const quiz = new Quiz({
        InstituteID: req.body.InstituteID,
        SubjectId: req.body.SubjectId,
        QuizName: req.body.QuizName,
        Term: req.body.Term
    })
    try {
        const a1 = await quiz.save();
        institute1 = Institute.findById(quiz.InstituteID);

         Institute.updateOne(
            { _id: quiz.InstituteID },
            { $push: { available: quiz.Term } }, (done) => {
                // res.send('added')
            }
        );

        // res.send(a1)
    } catch (err) {
        res.send(err)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const quiz = await Quiz.findByIdAndRemove(req.params.id, (err, quiz) => {
            // As always, handle any potential errors:
            if (err) return res.status(500).send(err);
            // We'll create a simple object to send back with a message and the id of the document that was removed
            // You can really do this however you want, though.
            const response = {
                message: "quiz successfully deleted"
            };
            return res.status(200).send(response);
        });
    } catch (err) {
        res.send('Error ' + err)
    }
})

router.patch('/:id', async (req, res) => {

    //Getting the answers and Making it as arrays
    let answersReceived = req.body.answers
    let answersToAdd = answersReceived.split(",,")

    console.log('received');
    //Create the Question object
    let newQuestion = {
        Question: req.body.question,
        Answers: answersToAdd,
        CorrectAnswer: req.body.correctAnswer
    }
    try {
        const i = Quiz.updateOne(
            { _id: req.params.id }, // wrap in ObjectID },
            { $push: { Questions: newQuestion } }, (done) => {
                res.status(200).send(newQuestion);
            }
        );

    } catch (err) {
        console.log(err);
    }

})

module.exports = router