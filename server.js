const getPic = require('./getPic')

// let get1 = new getPic({ length: 42, url: "", filename: "项链" })

// get1.setterByLocalPic();

let ge2 = new getPic({
        length: 41,
        url: "https://wenku.baidu.com/view/8b22996386254b35eefdc8d376eeaeaad1f3168e.html?fr=search-1-income9-psrec1&fixfr=p0nW7u5pufkLCW3m1pf4Og%3D%3D",
        // https://wenku.baidu.com/view/aee76970e53a580217fcfee9.html
        filename: "将进酒"
    })
    // ge2.download();
ge2.setterByLocalPic();