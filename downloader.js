//文件下载
var fs = require("fs");
var path = require("path");
var request = require("request");

// 接受下载的文件名以及地址数组，当前下载文件的index
module.exports = function downloader(urls, index, dirname) {
    console.log("开始下载...")

    //创建文件夹目录
    var dirPath = path.join(__dirname, dirname);
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
        console.log("文件夹创建成功");
    }

    //循环多线程下载

    let stream = fs.createWriteStream(path.join(dirPath, index + 1 + ".jpg"));
    // console.log(urls)
    request(urls[index]).pipe(stream).on("close", function(err) {
        console.log("文件[" + index + ".jpg" + "]下载完毕");
        if (err) console.log(err)
        if (index < urls.length - 1) downloader(urls, index + 1, dirname)
    });
    // }
}

//整数转字符串，不足的位数用0补齐
function intToString(num, len) {
    let str = num.toString();
    while (str.length < len) {
        str = "0" + str;
    }
    return str;
}