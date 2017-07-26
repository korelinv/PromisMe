const describe = require('..');

let scenarioOptions = {};
let scenarioScope = {i: 0};

let Increment = describe('i++', ($scope) => {
    return new Promise(function(resolve, reject) {
        setTimeout(() => {
            $scope.i++;
            resolve($scope);
        },2000);
    });
});

describe('scenario',($scope) => $scope)(scenarioOptions)(scenarioScope)
    .then(Increment())
    .then((result) => console.log('done'))
    .catch((error) => console.log(error));
