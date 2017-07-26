/**
* resulting function witch got passed to "then" method of promis
* @param {Object} scope - scope object witch get passed to action
* @param {Function} action - user defined function
* @return {Promise}
*/
function executor(scope, action) {
    // creating promise that will be passed
    return new Promise(function(resolve, reject) {

        let _scope;
        // try executing user defined function
        // we need this to be able to reject errors in sync code
        try {
            _scope = action(scope);
        } catch (e) {
            // if smth gets wrong in code result gets rejected
            // and we can process it in catch method
            reject(Object.assign(scope, {$error: e}));
        };

        // if user defined function is a promis we'll wait for it to resolve
        // and then pass result further
        // otherwise we instantly resolve returned promise
        if (_scope instanceof Promise) {
            _scope.then((result) => resolve(result))
                  .catch((error) => reject(error));
        } else {
            resolve(_scope);
        };
    });
};

/**
* executor factory
* @param {String} name - name of user defined step
* @param {Function} action - user defined function
* @return {Function}
*/
function describe(name, action) {

    // factory witch produces function where
    // scope and params objects are merged
    // NOTE: if scope has $options field it will be owerriden
    let description = (name, action, params) => {
        let extent = {
            $options: {
                name: name,
                params: params
            }
        };
        return (scope) => executor(Object.assign(scope || {}, extent), action);
    };

    return (params) => description(name, action, params);
};

module.exports = describe;
