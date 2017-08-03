/**
* Resulting function witch got passed to "then" method
* @summary Execute user defined function.
* Then if something in code goes wrong result gets rejected
* and we can process it in catch method.
* If user defined function returns "thenable" object we'll wait for it
* to resolve, then pass result further down the chain.
* Otherwise we instantly resolve returned promise.
* @param {Object} context - gets passed to method
* @param {Function} method
* @return {Promise}
*/
function executor({context, method}) {
    return new Promise(function(resolve, reject) {
        let result;

        try {
            result = method(context) || {};
        } catch (error) {
            result = Object.assign(context, error);
        } finally {
            if (!!result.then) {
                result.then((result) => resolve(result), (error) => reject(Object.assign(context, error)));
                return;
            }
            if (!!result.error) {
                reject(result);
                return;
            }
            resolve(result);
        };
    });
};

/**
* executor wrapper
* @summary creates paramtrized executor function
* @param {String} name
* @param {Function} method
* @return {Funtion}
*/
function describe(name, method, providers) {
    return (params) => (scope) => executor({context: Object.assign({name, params, scope}, providers || {}), method});
};

module.exports = {describe};
