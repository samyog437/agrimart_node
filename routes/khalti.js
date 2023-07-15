const axios = require("axios");
const express = require("express");
const router = express.Router();

const khalti = (req,res) => {
  let data = {
    token: req.body.token,
    amount: req.body.amount,
  };
  
  let config = {
    headers: {
      Authorization: "Key test_secret_key_3c7cfdc94ec34eb0933775b2866bde36",
      "Content-Type": "application/json",
    },
  };
  console.log(req.body.token)
  console.log(req.body.amount)
  axios
    .post("https://khalti.com/api/v2/payment/verify/", data, config)
    .then((response) => {
      console.log(response.data);
      res.status(200).json(response.data);
    })
    .catch((error) => {
      console.log(error);
      res.status(200).json(error.response.data)
    });
};


module.exports = {khalti}