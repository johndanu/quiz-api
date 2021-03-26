const express = require('express')
const mongoose = require('mongoose')
const mongoConnectionString = 'mongodb+srv://john:john@cluster0.a0fgx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const bodyparser = require('body-parser')
const cors = require('cors');

const app = express()



// cors 
app.use(cors())

//mongoose connecting
mongoose.connect(mongoConnectionString, { useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify: false });
const con = mongoose.connection

con.on('open', () => {
    console.log('connected...')
})


app.use(express.urlencoded({ extended: true }));
app.use(express.json())

const instituteRouter = require('./routes/institute')
const subjectRouter = require('./routes/subject')
const quizRouter = require('./routes/quiz')
app.use('/institute', instituteRouter)
app.use('/subject', subjectRouter)
app.use('/quiz', quizRouter)

app.listen(9000, () => {
    console.log('Server started')
})