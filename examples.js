const assert = require('assert');
const describe = require('./index');

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
    let buyMethod = (customer, quantity, item) => console.log(`${customer} bought ${quantity} positions of "${item}"`);

    buyMethod(params.customer, params.quantity, params.item);
    $scope.lastCustomer = params.name;

    return $scope;
});

let checkLastCustomer = describe('last customer', function($scope) {

    let params = $scope.$options.params;

    assert.ok($scope.lastCustomer === params, `${params} should be the last customer`);

    return $scope;
});


describe('feature simple maths', function($scope) {
    return $scope;
})([1,2,3])()
    .then(addition([1, 2, 3]))
    .then(subtraction([1, 2, -1]))
    .then(buy({
        customer: 'Bob',
        quantity: 10,
        item: 'coke (0.33L can)'
    }))
    .then(checkLastCustomer('Alice'))
    .then((r) => console.log(r))
    .catch((e) => console.log(e));
