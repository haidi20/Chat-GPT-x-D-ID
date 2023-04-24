const express = require('express');
const router = express.Router();

const store = async (req, res) => {
  let data = { message: "D-ID" };

  res.send(data);
}

router.post('/store', store);

module.exports = router;