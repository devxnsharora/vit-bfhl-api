const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();  
app.use(bodyParser.json());
app.use(cors());

// POST route
app.post("/bfhl", (req, res) => {
  try {
    const data = req.body.data || [];
    let oddNumbers = [];
    let evenNumbers = [];
    let alphabets = [];
    let specialChars = [];
    let sum = 0;

    data.forEach(item => {
      if (!isNaN(item)) {
        const num = parseInt(item);
        if (num % 2 === 0) evenNumbers.push(item.toString());
        else oddNumbers.push(item.toString());
        sum += num;
      } else if (/^[a-zA-Z]+$/.test(item)) {
        alphabets.push(item.toUpperCase());
      } else {
        specialChars.push(item);
      }
    });

    const concatString = alphabets.join("").split("").reverse()
      .map((ch, i) => (i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()))
      .join("");

    const responseObj = {
      is_success: true,
      user_id: "devansh_arora_26012004", 
      email: "aroradevansh26@gmail.com",
      roll_number: "22BCE2187",
      odd_numbers: oddNumbers,
      even_numbers: evenNumbers,
      alphabets: alphabets,
      special_characters: specialChars,
      sum: sum.toString(),
      concat_string: concatString
    };

    res.status(200).json(responseObj);
  } catch (err) {
    res.status(500).json({ is_success: false, error: err.message });
  }
});

// listen for Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
