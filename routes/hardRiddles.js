const router = require("express").Router();
const Riddle = require("../models/riddleModel");
const data = require("../riddle");

//Getting ALL riddles - Good code
router.get("/hardriddles", async (req, res) => {
  try {
    console.log(data.hardRiddles);
    const riddles = await Riddle.find();
    res.status(200).send({ data: riddles, error: "", status: 200 });
  } catch (err) {
    res.status(500).send({ data: {}, error: err, status: 500 });
  }
});

//Getting ONE riddle - Good code
router.get("/hardriddles/:id", async (req, res) => {
  try {
    const riddle = await Riddle.findById(req.params.id);
    res.status(200).json(riddle);
  } catch (err) {
    res.status(500).send({ data: {}, error: err, status: 500 });
  }
});

//Creating ONE riddle
router.post("/hardriddles", async (req, res) => {
  const riddle = new Riddle({
    riddle: req.body.riddle,
    answer: req.body.answer,
  });
  try {
    const newRiddle = await riddle.save();
    res.status(201).json(newRiddle);
  } catch (err) {
    res.status(400).send({ data: {}, error: err, status: 500 });
  }
});

//Updating ONE riddle
router.patch("/hardriddles/:id", getRiddle, async (req, res) => {
  if (req.body.riddle != null) {
    res.riddle.riddle = req.body.riddle;
  }
  if (req.body.answer != null) {
    res.riddle.answer = req.body.answer;
  }

  try {
    const updatedRiddle = await res.riddle.save();
    res.json(updatedRiddle);
  } catch (err) {
    res.status(400).send({ data: {}, error: err, status: 500 });
  }
});

// Deleting ONE riddle
router.delete("/hardriddles/:id", getRiddle, async (req, res) => {
  try {
    await res.riddle.remove();
    res.json({ message: "Deleted Riddle" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function getRiddle(req, res) {
  let riddle;
  try {
    riddle = await Riddle.findById(req.params.id);

    if (riddle == null) {
      return res.status(404).json({ message: "Cannot find riddle" });
    }
  } catch (err) {
    return res.status(500).send({ data: {}, error: err, status: 500 });
  }

  res.riddle = riddle;
}

module.exports = router;
