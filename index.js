const jsonfile = require("jsonfile");
const moment = require("moment");
const random = require("random");
const simpleGit = require("simple-git");
const FILE_PATH = "./data.json";

const makeCommit = (n) => {
  if (n === 0) return simpleGit().push();
  const week = random.int(0, 54);
  const day = random.int(0, 6);
  const month = random.int(0, 1);
  const DATE = moment()
    // edit parameters below to commit to a specific date/period
    .subtract(2, "y")
    .add(1, "d")
    // .add(x, "w")
    .add(month, "M")
    .add(day, "d")
    .format();
  const data = {
    date: DATE,
  };

  console.log(DATE);
  jsonfile.writeFile(FILE_PATH, data, () => {
    // git commit date
    simpleGit()
      .add([FILE_PATH])
      .commit(DATE, { "--date": DATE }, makeCommit.bind(this, --n));
  });
};

// Uncomment the comman below and run "node index.js to launch"
makeCommit(5);
