let conf = require(__dirname + '/conf.json');

const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Please specify URL for YouTube playlist: ', (answer) => {
    conf.urls.playlist = answer;
    console.log("Playlist saved");
    rl.question('Please specify path to load media /path/path/: ', (answer) => {
        if(!answer.match(/\/$/i)) {
            answer = answer + '/';
        }
        conf. dir_path = answer;
        console.log("Path saved");
        rl.close();
        fs.writeFileSync(__dirname + '/conf.json', JSON.stringify(conf));
    });
});
