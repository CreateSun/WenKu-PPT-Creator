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
            if (that.imgList.length > 0)
                null
                //  downloader(that.imgList, 0, "PicFile")
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
            let linksDom = $(this.targerDom)
                // console.log(linksDom)
                // 遍历dom集数组
            linksDom.each((index, item) => {
                // 取出title，注意这里使用了$(item)，而不是item本身
                // 类似地，取出链接地址
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
            fetch(uri, {
                method: 'GET',
                mode: 'no-cors'
            }, (err, response, body) => {
                if (err) {
                    console.log(err)
                }
                resolve(body)
            })
        })
    }
}