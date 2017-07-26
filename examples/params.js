const describe = require('..');

let scenarioOptions = {};
let scenarioScope = {i: 0};

let Increment = describe('i++', ($scope) => {
    let params = $scope.$params;
    $scope.i += params;

    return $scope;
});

let Log = describe('log', ($scope) => {
    let params = $scope.$params;
    console.log($scope[params]);

    return $scope;
});

describe('scenario',($scope) => $scope)(scenarioOptions)(scenarioScope)
    .then(Increment(10))
    .then(Log('i'))
    .then((result) => console.log('done'))
    .catch((error) => console.log(error));
