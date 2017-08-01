const assert = require('assert');
const {describe} = require('..').core;

// type consistency
(() => {
    let description = describe('', () => {});

    assert.ok(description instanceof Function);
    assert.ok(description() instanceof Function);
    assert.ok(description()() instanceof Promise);
})();


// should share returned object between descriptions
(() => {
    let scope = {};
    let haedDescription = describe('head description name', ($scope) => {
        $scope.prop = 'a';
        return $scope;
    });
    let tailDescription = describe('tail description name', ($scope) => {
        assert.ok($scope.prop === 'a');
        assert.ok($scope === scope);
    });

    haedDescription()(scope)
        .then(tailDescription())
        .catch((scope) => console.log(scope.$error));
})();


// should pass description name into scope
// should override description name with current description name
(() => {
    let haedDescription = describe('head description name', ($scope) => {
        assert.ok($scope.$name === 'head description name');
    });
    let tailDescription = describe('tail description name', ($scope) => {
        assert.ok($scope.$name === 'tail description name');
    });

    haedDescription()({})
        .then(tailDescription())
        .catch((scope) => console.log(scope.$error));
})();


// should pass parameters into description
(() => {
    let params = {p: 1};
    let description = describe('', ($scope) => {
        assert.ok($scope.$params.p === params.p);
    });

    description(params)()
        .catch((scope) => console.log(scope.$error));
})();
