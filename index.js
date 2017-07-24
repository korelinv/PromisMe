const assert = require('assert');

function wrap(scope, action) {
    return new Promise(function(resolve, reject) {

        let _scope;
        try {
            _scope = action(scope);
        } catch (e) {
            reject(Object.assign(scope, {$error: e}));
        }

        if (_scope instanceof Promise) {
            _scope.then((result) => resolve(result))
                 .catch((error) => reject(error));
        } else {
            resolve(_scope);
        }
    });
};

function describe(name, action) {

    let description = (name, action, params) => {
        let extent = {
            $options: {
                name: name,
                params: params
            }
        };
        return (scope) => wrap(Object.assign(scope || {}, extent), action);
    };

    return (params) => description(name, action, params);
};


let addition = describe('test addition', function($scope) {

    let params = $scope.$options.params;

    let summ = params.pop();
    let summands = params;

    assert.ok(summ === summands[0] + summands[1]);

    return $scope;
});

let subtraction = describe('test subtraction', function($scope) {

    let params = $scope.$options.params;

    let summ = params.pop();
    let summands = params;

    assert.ok(summ === summands[0] - summands[1]);

    return $scope;
});


let buy = describe('buy', function($scope) {

    let params = $scope.$options.params;
    let buyMethod = (name) => console.log(`${name} bought smth`);

    buyMethod(params.name);
    $scope.lastCustomer = params.name;

    return $scope;
});

let lastCustomer = describe('last customer', function($scope) {

    let params = $scope.$options.params;

    assert.ok($scope.lastCustomer === params, `${params} should be the last customer`);

    return $scope;
});


describe('feature simple maths', function($scope) {
    return $scope;
})([1,2,3])()
    .then(addition([1, 2, 3]))
    .then(subtraction([1, 2, -1]))
    .then(buy({name: 'Bob'}))
    .then(lastCustomer('Alice'))
    .then((r) => console.log(r))
    .catch((e) => console.log(e));
