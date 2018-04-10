const fs = require('fs');

// var streamWriter = fs.createWriteStream(`c:\\demo\/a.txt`);
// setInterval(() => {
//     streamWriter.write(`${new Date}\n`, (error) => {
//         console.log(error);
//     });
// }, 1000)

fs.createReadStream('C:\/Users\/DELL\/Desktop\/蓝胖子.jpg').pipe(fs.createWriteStream('f:\/aaa.jpg'))