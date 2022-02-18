const { Router } = require("express");
const Mongoose = require("mongoose");
const User = require("../models/ver");

const router = new Router();

router.get("/", (req, res) => {
  try {
    User.find().then((result) => {
      res.status(200).json({ User: result });
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: "error" });
  }
});

router.get("/:id", (req, res) => {
  try {
    const _id = req.params.id;
    User.findById(_id).then((result) => {
      res.status(200).json({ User: result });
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: "error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const user = new User({
      _id: new Mongoose.Types.ObjectId(),
      fullname: req.body.fullname,
      radio: req.body.radio,
      information: req.body.information,
    });
    return res.status(200).json({ success: "true" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: "error" });
  }
});

router.delete("/:id", (req, res) => {
  try {
    User.remove({ _id: req.params.id }).then((result) => {
      res.status(200).json({ message: "user deleted", result: result });
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: "error" });
  }
});

module.exports = router;
