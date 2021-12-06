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
  try {
    const { id } = req.params;
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
  const riddle = new Riddle({
    riddle: req.body.riddle,
    answer: req.body.answer,
  });
  try {
    const newRiddle = easyRiddles;
    res.status(201).json(newRiddle);
  } catch (err) {
    res.status(400).send({ data: {}, error: err, status: 500 });
  }
});

//Updating ONE riddle
router.patch("/easyriddles/:id", getRiddle, async (req, res) => {
  if (req.body.riddle != null) {
    res.riddle.riddle = req.body.riddle;
  }
  if (req.body.answer != null) {
    res.riddle.answer = req.body.answer;
  }

  try {
    const updatedRiddle = easyRiddles;
    res.status(200).json(updatedRiddle);
  } catch (err) {
    res.status(400).send({ data: {}, error: err, status: 500 });
  }
});

// Deleting ONE riddle
router.delete("/easyriddles/:id", getRiddle, async (req, res) => {
  try {
    await res.riddle.remove();
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
