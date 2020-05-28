require("dotenv").config();
require("dotenv").config();
console.log(process.env.LIRAN);
const aggregate = require("./service/aggregator");
(async () => {
  try {
    await aggregate();
  } catch (error) {
    console.log(error);
  }
})();
