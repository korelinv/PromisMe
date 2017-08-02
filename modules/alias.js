/**
* description warpper for more readable code
* @param {Function} description
* @param {Object} context
* @return {Function}
* @example
*     let description = describe('name', ({scope}) => scope);
*     // lets you write like this
*     alias(description(options), scope);
*     // instead of this
*     description(options)(scope);
*/
const alias = (description, context) => description(context);

module.exports = {alias};
