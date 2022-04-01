var express = require('express');
var homeController = require('../app/controllers/home')
var router = express.Router();

/* GET home page. */
router.get('/', homeController.index);

router.post('/cadastrar-questao', homeController.cadastrar);

router.post('/buscar', homeController.buscar);

router.get('/alterar', homeController.alterar)

router.get('/excluir', homeController.excluir)

router.post('/alterar-questao', homeController.alterar_questao);

router.get('/responder', homeController.responder_get )

router.post('/responder', homeController.responder_post)

module.exports = router;
