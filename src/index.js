const aggregate = require("./service/aggregator");
(async () => {
  try {
    await aggregate();
  } catch (error) {
    console.log(error);
  }
})();
