const path = require("path");
var captchapng = require("captchapng");
/**
 * 暴露了一个获取登录页面的方法，给路由调用
 */
exports.getLoginPage = (req, res) => {
    res.sendFile(path.join(__dirname, "../views/login.html"));
};

/**
 * 暴露出去的图片验证码
 * @param {*} req
 * @param {*} res
 */
exports.getImgVcode = (req, res) => {
    // 利用一个第三方的包,生成一个带数字的图片
    // 保存一个随机数
    const random = parseInt(Math.random() * 9000 + 1000);
    var p = new captchapng(80, 30, random); // width,height,numeric captcha
    p.color(0, 0, 0, 0); // First color: background (red, green, blue, alpha)
    p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)

    var img = p.getBase64();
    var imgbase64 = new Buffer(img, "base64");
    res.writeHead(200, {
        "Content-Type": "image/png"
    });
    res.end(imgbase64);
};
