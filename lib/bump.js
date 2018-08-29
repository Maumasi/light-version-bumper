
const fs = require('fs');

module.exports = (bumpType='patch', srcPath='') => {
  let path = `${process.env.PWD}/package.json`;
  if(srcPath !== '') {
    path = srcPath;
  }
  const version = require(path).version;
  let versionUpdate = version.split('.');
  //
  switch (bumpType) {
    case 'major':
      versionUpdate[0]++
      break;
    case 'minor':
      versionUpdate[1]++
      break;
    default:
      versionUpdate[2]++
  }
  //
  versionUpdate = versionUpdate.join('.');
  // write to file
  fs.readFile(path, 'utf8', (err,data) => {
    if (err) {
      return console.log(err);
    }
    let dataObj = JSON.parse(data);
    dataObj.version = versionUpdate;
    const result = JSON.stringify(dataObj, null, 2);
    fs.writeFile(path, result, 'utf8', (err) => {
      if (err) return console.log(err);
    });
  });
};
