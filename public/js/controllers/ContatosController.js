angular.module('contatooh').controller('ContatosController',
  function ($resource, $scope) {

    $scope.total = 0;

    $scope.filtro = '';

    $scope.contatos = [];

    $scope.incrementa = function () {
      $scope.total++;
    };

    var Contato = $resource('/contatos');

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
  });