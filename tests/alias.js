const assert = require('assert');
const {describe} = require('..').core;
const {alias} = require('..').alias;

// alias should return description
(() => {

    let scope = {i: 1};
    let firstDescription = describe('', ($scope) => {
        $scope.i++;

        return $scope;
    });
    let secondDescription = describe('', ($scope) => {
        assert.ok(2 === $scope.i);
    });

    alias(firstDescription(), scope)
        .then(secondDescription())
        .catch(($scope) => console.log($scope.error));
})();
