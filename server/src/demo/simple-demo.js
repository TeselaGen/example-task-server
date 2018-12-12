const queueManager = require("@teselagen/queue-middleware");
const Promise = require("bluebird");

module.exports = async function simpleDemo(app, appConfig) {
  const numTasks = process.env.DEMO_NUM_CALC_PI_TASKS || 10;
  const inputs = [];
  for (let i = 0; i < numTasks; i++) {
    inputs.push({
      //   iterations: 100000000000000000 + i,
      iterations: 1000 + i,
      delay: process.env.TASK_DELAY || 5000
    });
  }

  console.log("Submitting calc-pi demo tasks", inputs);
  let numCompleted = 0;
  await Promise.map(inputs, async (input, idx, total) => {
    console.log(`Executing calc-pi with input ${idx + 1} of ${total}: `, input);
    try {
      let result = await queueManager.execute("calc-pi", input);
      console.log(
        `Received calc-pi result task ${idx +
          1} - ${++numCompleted} of ${total}:`,
        result
      );
    } catch (error) {
      console.error(
        `Error executing calc-pi task ${idx +
          1} - ${++numCompleted} of ${total}:`,
        error
      );
    }
  });
  console.log("Done executing calc-pi demo tasks");
};
