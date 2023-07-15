const axios = require("axios");
const express = require("express");
const router = express.Router();

let data = {
  token: "QUao9cqFzxPgvWJNi9aKac",
  amount: 1000,
};

let config = {
  headers: {
    Authorization: "Key test_secret_key_3c7cfdc94ec34eb0933775b2866bde36",
  },
};

const khalti = () => {
  axios
    .post("https://khalti.com/api/v2/payment/verify/", data, config)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};


module.exports = {khalti}