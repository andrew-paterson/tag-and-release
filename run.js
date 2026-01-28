const tagAndRelease = require('./index');
const commitMessage = getNamedArgVal('--commit-msg');
const releaseType = getNamedArgVal('--release-type');

if (!commitMessage) {
  console.log('The --commit-msg argument is required.');
  return;
}

(async function () {
  const res = await tagAndRelease.run({ commitMessage: commitMessage, releaseType: releaseType });
  console.log(res);
})();

function getNamedArgVal(requested) {
  const [, ...args] = process.argv;
  let val;
  args.forEach((arg) => {
    if (arg.indexOf('=') < 0) {
      return;
    }

    const argName = arg.split(/=(.*)/s)[0];

    if (argName === requested) {
      val = arg.split(/=(.*)/s)[1];
    }
  });
  return val;
}
