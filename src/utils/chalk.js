const chalk = require("chalk");

var method = {};

method.clear = () => {
  for (let i = 0; i < 100; i++) {
    method.line();
  }
  process.stdout.write("\033c");
};

method.line = () => {
  console.log();
};

method.info = (progranm, log) => {
  console.log(chalk.white.bold(`>> ${chalk.yellow.bold(progranm)} - ${log}`));
};

method.alert = (progranm, log) => {
  console.log(chalk.grey.bold(`>> ${chalk.white.bold(progranm)} - ${log}`));
  console.log();
};

method.error = (error, log) => {
  console.log(chalk.white.bold(`>> Error: ${chalk.red.bold(error)} - ${log}`));
};

method.success = (progranm, log) => {
  console.log(chalk.white.bold(`>> ${chalk.green.bold(progranm)} - ${log}`));
};

module.exports = method;
