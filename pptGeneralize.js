const pptxgenjs = require("pptxgenjs");

class pptx {
    constructor() {
        this.fileName = "default";
        this.ppt = null;
        this.suffix = ".ppt"; // 默认后缀是文件ppt
    }
    init() {
        this.ppt = new pptxgenjs();
    }
    newSlide(content) {
        // 新建一页新的PPT插入到已经初始化的PPT中
        let slide = this.ppt.addSlide();
        console.log(content)
        slide.addImage({
            path: content,
            w: "100%",
            h: "100%"
        });
    }
    newSlideCycle(length) {
        let element = "PicFile/" + length + ".jpg"
            // 新建一页新的PPT插入到已经初始化的PPT中
        let slide = this.ppt.addSlide();
        slide.addImage({
            path: element,
            w: "100%",
            h: "100%"
        });
        // let newLength = ;

        if (length - 1 > 0) {
            this.newSlideCycle(length - 1)
        } else {
            console.log("colse file" + length)
            this.ppt.writeFile(this.fileName)
        }
    }
    write(name) {
        this.ppt.writeFile(name || this.fileName).then(name => {
            console.log(`created file: ${name}`);
        })
    }
}

module.exports = pptx;