angular
  .module('contatooh')
  .controller('ContatosController',
  
  function (Contato, $scope, $resource) {

    $scope.total = 0;
    $scope.filtro = '';
    $scope.mensagem = {
      texto: ''
    };
    $scope.contatos = [];

    $scope.incrementa = function () {
      $scope.total++;
    };

    var Contato = $resource('/contatos/:id');

    var promise = Contato.query().$promise;

    function buscaContatos() {
      Contato.query(
        function (contatos) {
          $scope.contatos = contatos;
        },
        function (error) {
          console.log("Nao foi possivel receber a lista de contatos através da REST API")
          console.log(error);
        }
      );
    }
    buscaContatos();

    $scope.remove = function (contato) {
      Contato.delete({
          id: contato._id
        },
        buscaContatos,
        function (erro) {
          $scope.mensagem = {
            texto: 'Não foi possível remover o contato'
          };
          console.log(erro);
        }
      );
    };
  });