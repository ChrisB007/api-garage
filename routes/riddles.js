const router = require("express").Router();
const Riddle = require("../models/riddleModel");
const { easyRiddles } = require("../riddle");

//Getting ALL riddles - Good code
router.get("/easyriddles", async (req, res) => {
  try {
    const riddles = await easyRiddles;
    res.status(200).json(riddles);
  } catch (err) {
    res.status(500).send({ data: {}, error: err, status: 500 });
  }
});

//Getting ONE riddle
router.get("/easyriddles/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const riddle = await easyRiddles.find((easyRiddle) => {
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
router.post("/easyriddles", async (req, res) => {
  const riddle = new easyRiddles({
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
router.patch("/easyriddles/:id", getRiddle, async (req, res) => {
  if (req.body.riddle != null) {
    res.easyRiddles.Riddle = req.body.riddle;
  }
  if (req.body.answer != null) {
    res.easyRiddles.Answer = req.body.answer;
  }

  try {
    const updatedRiddle = await easyRiddles.save();
    res.status(200).json(updatedRiddle);
  } catch (err) {
    res.status(400).send({ data: {}, error: err, status: 500 });
  }
});

// Deleting ONE riddle
router.delete("/easyriddles/:id", getRiddle, async (req, res) => {
  try {
    await easyRiddles.remove();
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
