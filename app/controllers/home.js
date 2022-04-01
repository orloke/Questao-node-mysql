var Questao = require('../models/questoes');
var Q = new Questao()
var homeController = {
    index: function(req, res, next) {
                Questao.LerTodos(function(dados){
                    res.render('index', { title: 'Questões', questao: dados });
                })
            },

    cadastrar: function(req, res, next) {
                    Q.question= req.body.question,
                    Q.a = req.body.a,
                    Q.b = req.body.b,
                    Q.c = req.body.c,
                    Q.d = req.body.d,
                    Q.r = req.body.r,
                
                    Q.salvar(function(){
                    res.redirect('/');
                    },
                    function(){
                    res.send(500,'Questão com enunciado já existente. Volte a pagina anterior e digite uma questão com enunciado diferente')
                    })
                },

    buscar: function(req, res, next) {
                Questao.Buscar(req,function(dadosPes){
                    res.render('index', { title: 'Adicionar Questão', questao: dadosPes })
                })
            },
    
    alterar: function(req, res){
                Q.alterar(req, function(j){
                    res.render('alterarQ', { title: 'Adicionar Questão', novosDados: j })
                })
            },

    excluir: function(req, res){
                Q.excluir(req,function(){
                    res.redirect('/');
                })  
            },
            
    alterar_questao: function(req, res, next) {                
                        Q.question= req.body.question,
                        Q.a = req.body.a,
                        Q.b = req.body.b,
                        Q.c = req.body.c,
                        Q.d = req.body.d,
                        Q.r = req.body.r,
                        
                        Q.alterarQ(req,function(dados){
                            res.redirect('/');
                        })
                    },

    responder_get: function(req, res){
                        p = 0
                        k = 0
                        Questao.LerTodos(function(dados){
                            i = parseInt(req.query.i)
                            res.render('responder', { title: 'Responder', questao:dados[i],l:i, p:p });
                        })
                    },

    responder_post: function(req, res){
                        Questao.Responder(req,
                        
                        function(dados,i,p){res.render('responder', { 
                            title: 'Responder', questao:dados, l:i, p:p 
                        })},

                        function(n){res.render('fim', { title: 'Fim', p:n, m:true })},
                        )
                    }
}

/* GET home page. */
module.exports = homeController;
