
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
      versionUpdate[0]++;
      versionUpdate[1] = 0;
      versionUpdate[2] = 0;
      break;
    case 'minor':
      versionUpdate[1]++;
      versionUpdate[2] = 0;
      break;
    default:
      versionUpdate[2]++;
  }
  //
  versionUpdate = versionUpdate.join('.');
  // write to file
  fs.readFile(path, 'utf8', (err, JSONFile) => {
    if (err) {
      return console.log(err);
    }
    let newPackageJSONFile = JSON.parse(JSONFile);
    newPackageJSONFile.version = versionUpdate;
    const result = JSON.stringify(newPackageJSONFile, null, 2);
    fs.writeFile(path, result, 'utf8', (err) => {
      if (err) return console.log(err);
    });
  });
};
