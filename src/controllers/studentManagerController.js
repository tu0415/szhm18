const MongoClient = require('mongodb').MongoClient
const xtpl = require('xtpl')
const path = require("path")

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'szhm18';

//导出返回学生列表的页面
exports.getStudentListPage = (req, res) => {
    MongoClient.connect(url, function (err, client) {
        
        // 连接数据库
        const db = client.db(dbName);

        const collection = db.collection('studentInfo');

        // 查询数据库的数据
        collection.find({}).toArray(function (err, docs) {
            // console.log(docs)
            client.close();
            // res.send("null")
            // 读取文件
            xtpl.renderFile(path.join(__dirname,"../views/list.html"),{studentList:docs,loginedName:req.session.loginedName},(err,content)=>{
                // 渲染出来
                res.send(content)
            })
        });

    });
}