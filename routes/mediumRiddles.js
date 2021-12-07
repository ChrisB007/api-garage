const router = require("express").Router();
const Riddle = require("../models/riddleModel");
const { mediumRiddles } = require("../riddle");

//Getting ALL riddles - Good code
router.get("/mediumriddles", async (req, res) => {
  try {
    const riddles = await mediumRiddles;
    res.status(200).json(riddles);
  } catch (err) {
    res.status(500).send({ data: {}, error: err, status: 500 });
  }
});

//Getting ONE riddle
router.get("/mediumriddles/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const riddle = await mediumRiddles.find((easyRiddle) => {
      return easyRiddle.id === Number(id);
    });
    if (!riddle) {
      return res.status(404).send("Riddle does not exist");
    }
    res.status(200).json(riddle);
  } catch (err) {
    res.status(500).send({ data: {}, error: err, status: 500 });
  }
});

//Creating ONE riddle
router.post("/mediumriddles", async (req, res) => {
  const riddle = new mediumRiddles({
    Riddle: req.body.riddle,
    Answer: req.body.answer,
  });
  try {
    const newRiddle = await riddle.save();
    res.status(201).json(newRiddle);
  } catch (err) {
    res.status(400).send({ data: {}, error: err, status: 500 });
  }
});

//Updating ONE riddle
router.patch("/mediumriddles/:id", getRiddle, async (req, res) => {
  if (req.body.riddle != null) {
    res.mediumriddles.Riddle = req.body.riddle;
  }
  if (req.body.answer != null) {
    res.mediumriddles.Answer = req.body.answer;
  }

  try {
    const updatedRiddle = await mediumRiddles.save();
    res.status(200).json(updatedRiddle);
  } catch (err) {
    res.status(400).send({ data: {}, error: err, status: 500 });
  }
});

// Deleting ONE riddle
router.delete("/mediumriddles/:id", getRiddle, async (req, res) => {
  try {
    await res.mediumRiddles.remove();
    res.status(200).json({ message: "Deleted Riddle" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

async function getRiddle(req, res) {
  let riddle;
  try {
    riddle = await Riddle.findById(req.params.id);

    if (riddle === null) {
      return res.status(404).json({ message: "Cannot find riddle" });
    }
  } catch (err) {
    return res.status(500).send({ data: {}, error: err, status: 500 });
  }

  res.riddle = riddle;
}

module.exports = router;
