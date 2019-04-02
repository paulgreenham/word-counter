const express = require("express")
const router = express.Router()

const wordCounter = {wind: 24}

const countWords = function (list) {
    const keys = Object.keys(list)
    let totalCount = 0
    for(let key of keys) {
        totalCount += list[key]
    }
    return totalCount
}

router.get("/word/:word", function (req, res) {
    let word = req.params.word
    if(wordCounter[word]) {
        res.send({count: wordCounter[word]})
    }
    else {
        res.send({count: 0})
    }
})

router.post("/word/:word", function (req, res) {
    let word = req.params.word
    // let word = req.body.word
    if(wordCounter[word]) {
        wordCounter[word]++
    }
    else {
        wordCounter[word] = 1
    }    
    res.send({
        text: `Added: ${word}`,
        currentCount: wordCounter[word]
    })
})

router.post("/words/:sentence", function (req, res) {
    let sentence = req.params.sentence
    let words = sentence.split(" ")
    let numNewWords = 0
    let numOldWords = 0
    for(let word of words) {
        if(wordCounter[word]) {
            wordCounter[word]++
            numOldWords++
        }
        else {
            wordCounter[word] = 1
            numNewWords++
        }
    }
    res.send({text: `Added ${numNewWords} words, ${numOldWords} already existed`, currentCount: wordCounter})
})

router.get("/total", function(req, res) {
    res.send({text: "Total count", count: countWords(wordCounter)})
})

module.exports = router