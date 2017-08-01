/**
* description warpper for more readable code
* @param {Function} description
* @param {Object} scope
* @return {Function}
* @example
*     let description = describe('name', ($scope) => $scope);
*     // lets you write like this
*     alias(description(options), scope);
*     // instead of this
*     description(options)(scope);
*/
function alias(description, scope) {
    return description(scope);
};

module.exports = {alias};
