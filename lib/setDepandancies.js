
const fs = require('fs');

const cleanVersions = (objDependancies) => {
  let resultObj = {};
  Object.keys(objDependancies).forEach((key) => {
    let versionSplit = objDependancies[key].split('.');
    versionSplit[0] = versionSplit[0].replace( /^\D+/g, '');
    productionVersion = versionSplit.join('.');
    resultObj[key] = productionVersion;
  });
  return resultObj;
}

//
module.exports = (srcPath='') => {
  let path = `${process.env.PWD}/package.json`;
  if(srcPath !== '') {
    path = srcPath;
  }
  // write to file
  fs.readFile(path, 'utf8', (err,data) => {
    if (err) {
      return console.log(err);
    }
    let dataObj = JSON.parse(data);
    const { dependencies, devDependencies } = require(path);
    dataObj.devDependencies = cleanVersions(devDependencies);
    dataObj.dependencies = cleanVersions(dependencies);
    const result = JSON.stringify(dataObj, null, 2);
    console.log(result);
    // delete file contents
    fs.truncate(path, 0, () => {
      fs.writeFile(path, result, 'utf8', (err) => {
        if (err) return console.log(err);
      });
    });
    // write new json data

  });
};
