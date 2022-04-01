mysql = require('mysql')
connectionString = process.env.DATABASE_URL || 'mysql://root:password@localhost/questoes'

db = {}
db.cnn = {}
db.cnn.exec = function(query,callback){
    var connection = mysql.createConnection(connectionString)
    connection.query(query,function(err,rows){
        if(err){throw err}
        callback(rows,err)
        connection.end()
    })
}

var App = {
    caminho: './dadosbackend.js',
    db:db
}

module.exports = App

