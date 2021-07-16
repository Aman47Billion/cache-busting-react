const fs = require('fs');

const packageJson = require('./package.json')

const appVersion = packageJson.version;

//console.log(appVersion);

const jsonData = {
    version: appVersion
};

//console.log(jsonData);

var jsonContent = JSON.stringify(jsonData);

//console.log(jsonContent);

fs.writeFile('./public/meta.json', jsonContent, 'utf-8',(err)=>{
    if(err)
    {
        console.log('An error occured while writting the JSON object to meta.json');
    }

    else{
        console.log('meta.json file has been saved with latest version number')
    }
})