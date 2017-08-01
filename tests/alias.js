const assert = require('assert');
const {describe} = require('..').core;
const {alias, given, then} = require('..').alias;

// given should return description
(() => {

    let scope = {i: 1};
    let firstDescription = describe('', ($scope) => {
        $scope.i++;

        return $scope;
    });
    let secondDescription = describe('', ($scope) => {
        assert.ok(2 === $scope.i);
    });

    given(firstDescription(), scope)
        .then(secondDescription())
        .catch(($scope) => console.log($scope.error));
})();

// then should return description
(() => {

    let scope = {i: 1};
    let firstDescription = describe('', ($scope) => {
        $scope.i++;

        return $scope;
    });
    let secondDescription = describe('', ($scope) => {
        assert.ok(2 === $scope.i);
    });

    then(firstDescription(), scope)
        .then(secondDescription())
        .catch(($scope) => console.log($scope.error));
})();
