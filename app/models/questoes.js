const App = require('../../config/app');

var Questao = function(){
    this.question = ''
    this.a =''
    this.b =''
    this.c =''
    this.d =''
    this.r =''

    this.excluir = (req,callback) => {
      var comando = 'DELETE FROM questoes WHERE question = "' + req.query.question + '" ;'
      console.log(req.query.question);
      App.db.cnn.exec(comando,function(retorno,erro){
         if(erro){
          console.log( 'Algo deu errado')
          callback.call()
        }
        else{
          callback.call()
        }
      })
    }

    this.alterar = (req,callback) => {
      let comando = 'SELECT * FROM questoes WHERE question = "' + req.query.question + '" ;'
      App.db.cnn.exec(comando,function(retorno,erro){
         if(erro){
          console.log( 'Algo deu errado')
          callback.call()
        }
        else{
          novosDados = retorno[0]
          callback.call(null,novosDados)
        }
      })
    }

    this.alterarQ = (req,callback)=>{
      let question = this.question 
      let a = this.a
      let b = this.b
      let c = this.c
      let d = this.d
      let r = this.r
      var comando = 'UPDATE questoes SET question = "' + question + '", a = "' + a + '",b ="' + b + '",c = "' + c + '", d = "' + d + '", r = "' + r + '"   WHERE question = "' + req.query.question + '" ;'
      App.db.cnn.exec(comando,function(retorno,erro){
         if(erro){
          console.log( 'Algo deu errado')
          callback.call()
        }
        else{
          callback.call(null,retorno)
        }
      })
    }

    this.salvar = (callback1, callback2) => {
     
      let comando = "SELECT * FROM questoes WHERE question ='"+this.question+"' "

      let comando2 = "INSERT INTO questoes (question,a,b,c,d,r)values('"+this.question+"','"+this.a+"','"+this.b+"','"+this.c+"','"+this.d+"','"+this.r+"')"
      console.log(comando2);

      App.db.cnn.exec(comando,function(retorno1,erro){
        if(erro){
          console.log( 'Algo deu errado')
        }
        if(retorno1.length==0){
          App.db.cnn.exec(comando2,function(retorno2,erro){
            if(erro){
              console.log('algo deu errado')
            }
            else{
              console.log(retorno2)
              callback1.call()
            }

          })
        }
        else{
          console.log('Questão já existe');
          callback2.call()
        }
      })
    }
}

Questao.Buscar = (req, callback) =>{
  var comando = 'SELECT * FROM questoes WHERE question LIKE "%' + req.body.question + '%" ;'
  App.db.cnn.exec(comando,function(retorno,erro){
    if(erro){
      console.log( 'Algo deu errado')
      callback.call(null, [])
    }
    else{
      callback.call(null, retorno)
    }
  })  
}

Questao.LerTodos = (callback) => {
  let comando = 'SELECT * FROM questoes;'
  App.db.cnn.exec(comando,function(retorno,erro){
    if(erro){
      console.log( 'Algo deu errado')
      callback.call(null, [])
    }
    else{
      callback.call(null, retorno)
    }
  })  
}

Questao.Responder = (req,callback1,callback2) => {
  Questao.LerTodos(function(dados){
    if(parseInt(req.query.i)<dados.length-1){
      k++
      i = parseInt(req.query.i) + 1
      if(req.body.alternativa == dados[parseInt(req.query.i)].r){
         p++
      }
      callback1.call(null,dados[i],i,p)
    }
    if((req.query.i)==dados.length-1){
      if(req.body.alternativa == dados[parseInt(req.query.i)].r){
        p++
      }
      
      if(k==dados.length-1){
        callback2.call(null,p)
        
      }
      k++
         
    }

  })
}

module.exports = Questao