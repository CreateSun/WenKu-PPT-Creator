const request = require('request')
const cheerio = require('cheerio')
const downloader = require('./downloader')
const pptx = require("./pptGeneralize");

class getPicFile {
    constructor({ length, url, filename, targerDom, imgList }) {
        // 定义目标网址
        this.target = url || ""
        this.imgList = imgList || []
        this.length = length || ""
        this.targerDom = targerDom || 'img'
        this.filename = filename || "default"
    }

    /**
     * 下载图片资源到本地文件夹中
     */
    download() {
        this.getter(function(that) {
            if (that.imgList.length > 0) downloader(that.imgList, 0, "PicFile")
            else console.log("图片数组长度为0，请先调用setter方法")
        })
    }

    // 通过url获取资源
    setterByLocalPic() {
        let length = this.length
        let ppt = new pptx(); // 调用pptx类
        console.log("setterByURL is running...")
            // 初始化pptgenjs基础
        ppt.init();
        for (let i = 1; i < length; i++) {
            const element = i;
            ppt.newSlide("PicFile/" + element + ".jpg")
        }
        console.log("SetterByURL is success and write file to PPTX, waiting....")
        ppt.write(this.filename);
    }

    /**
     * 获取target获取网络图片资源
     */
    getter(nextTick) {
        // 使用request.js库发送get请求
        this.http(this.target).then(html => {
            // 载入并初始化cheerio
            const $ = cheerio.load(html)
                // 取出目标节点，即带article-list-link css类的<a>
                // let linksDom = 
            console.log()
            console.log($("img")['length'])
                // 遍历dom集数组
            $('img').each((index, item) => {
                // 取出title，注意这里使用了$(item)，而不是item本身
                // 类似地，取出链接地址
                // console.log(index)
                let src = index >= 3 ? $(item).attr('data-src') : $(item).attr('src')
                this.imgList.push(src)
            })

            this.length = this.imgList.length
            console.log("图片获取完成...")
                // console.log(this.imgList)
            if (nextTick) nextTick(this);
        })
    }

    http(uri) {
        return new Promise((resolve, reject) => {
            let j = request.jar()
            request.defaults({ jar: true })({
                uri: uri,
                method: 'GET',
                headers: {
                    Cookie: "BAIDUID=EFA5640965459E3A8785A32F93E671DE:FG=1; Expires=Wed, 09 Mar 2022 14:17:42 GMT; Max-Age=31536000; Domain=baidu.com; Path=/; version=1; hostOnly=false; aAge=1ms; cAge=213ms"
                },
                jar: j
            }, (err, response, body) => {

                if (err) {
                    console.log(err)
                }
                // console.log(response.request.headers.cookie)
                // let cookies = j.getCookies("http://www.baidu.com")
                // console.log(cookies[0])
                // console.log(response.headers)
                // console.log(body)
                resolve(body)
            })
        })
    }
}

module.exports = getPicFile