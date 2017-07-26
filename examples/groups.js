const describe = require('../index');

let scenarioOptions = {};
let scenarioScope = {i: 0};

let Increment = describe('i++', ($scope) => {
    $scope.i++;

    return $scope;
});

let Log = describe('log', ($scope) => {
    let params = $scope.$params;
    console.log($scope[params]);

    return $scope;
});

let Group = describe('group', ($scope) => {
    return Increment()($scope).then(Log('i'));
});

describe('scenario',($scope) => $scope)(scenarioOptions)(scenarioScope)
    .then(Increment())
    .then(Log('i'))
    .then(Group())
    .then((result) => console.log('done'))
    .catch((error) => console.log(error));
