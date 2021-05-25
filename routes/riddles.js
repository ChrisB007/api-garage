const express = require('express');
const router = express.Router();
const Riddle = require('../models/riddleModel')

//Getting ALL riddles

router.get('/', async (req,res) => {
    try{
        const riddles = await Riddle.find();
        res.json(riddles);
    } catch(err){
        res.status(500).json({message: err.message});
    }
});

//Getting ONE riddle
router.get('/:id', getRiddle, (req,res) => {
    res.json(res.riddle);

});

//Creating ONE riddle
router.post('/', async (req,res) => {
    const riddle = new Riddle({
        riddle: req.body.riddle,
        answer: req.body.answer
    })
    try{
        const newRiddle = await riddle.save()
        res.status(201).json(newRiddle)

    } catch(err){
        res.status(400).json({message: err.message})

    }

});

//Updating ONE riddle
router.patch('/:id', getRiddle, async(req,res) => {
    if(req.body.riddle != null){
        res.riddle.riddle = req.body.riddle;
    }
    if(req.body.answer != null){
        res.riddle.answer = req.body.answer;
    }

    try{
        const updatedRiddle = await res.riddle.save()
        res.json(updatedRiddle)
    } catch(err) {
        res.status(400).json({message: err.message});

    }

});


// Deleting ONE riddle
router.delete('/:id', getRiddle, async(req,res) => {
    try {
        await res.riddle.remove()
        res.json({message: "Deleted Riddle"})
    } catch (error) {
        res.status(500).json({message: error.message})
        
    }
});


async function getRiddle(req, res, next){
    let riddle;
    try{

        riddle = await Riddle.findById(req.params.id)

        if (riddle == null){
            return res.status(404).json({message: 'Cannot find riddle'})
        }

    } catch(err){
        return res.status(500).json({message: err.message})
    }

    res.riddle = riddle

    next();

}




module.exports = router;