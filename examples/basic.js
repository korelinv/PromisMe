const describe = require('..');

let scenarioOptions = {};
let scenarioScope = {i: 0};

let Increment = describe('i++', ($scope) => {
    $scope.i++;

    return $scope;
});

describe('scenario',($scope) => $scope)(scenarioOptions)(scenarioScope)
    .then(Increment())
    .then((result) => console.log('done'))
    .catch((error) => console.log(error));
