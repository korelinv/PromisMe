const assert = require('assert');
const describe = require('./index');

let buy = describe('buy', function($scope) {

    let params = $scope.$options.params;
    let buyMethod = (customer, quantity, item) => console.log(`${customer} bought ${quantity} positions of "${item}"`);

    buyMethod(params.customer, params.quantity, params.item);
    $scope.lastCustomer = params.customer;

    return $scope;
});

let checkLastCustomer = describe('last customer', function($scope) {

    let params = $scope.$options.params;

    assert.ok($scope.lastCustomer === params, `${params} should be the last customer`);

    return $scope;
});

let params = {
    param1: 'foo',
    param2: 'bar'
};
let scope = {
    value1: 100,
    value2: [1, 2, 3],
    value3: (w) => (w + 1)
};

describe('feature simple maths', function($scope) {

    console.log(`initial parameters: ${JSON.stringify($scope.$options.params)}`);
    console.log(`initial scope: ${JSON.stringify($scope,null,'  ')}`);

    return $scope;
})(params)(scope)
    .then(buy({
        customer: 'Bob',
        quantity: 10,
        item: 'coke (0.33L can)'
    }))
    .then(checkLastCustomer('Bob'))
    .then((r) => console.log('done'))
    .catch((e) => console.log(e));
