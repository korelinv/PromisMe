/** checks if object is promise like
* @param {Object} object
* @return {Boolean}
*/
function isThenableObject(object) {
    return !!object.then;
};

/**
* resulting function witch got passed to "then" method of promis
* @param {Object} scope - scope object witch get passed to action
* @param {Function} action - user defined function
* @return {Promise}
*/
function executor(scope, action) {
    // creating promise that will be passed
    return new Promise(function(resolve, reject) {

        let resultScope;
        // try executing user defined function
        // we need this to be able to reject errors in sync code
        try {
            resultScope = action(scope) || {};
        } catch (error) {
            // if smth gets wrong in code result gets rejected
            // and we can process it in catch method
            resultScope = Object.assign(scope, {$error: error});
            reject(resultScope);
        };

        // if user defined function is a thenable object we'll wait for it to resolve
        // and then pass result further
        // otherwise we instantly resolve returned promise
        if (isThenableObject(resultScope)) {
            resultScope.then(
                (result) => resolve(result),
                (error) => {
                    resultScope = Object.assign(scope, {$error: error});
                    reject(resultScope);
                });
        } else {
            resolve(resultScope);
        };
    });
};

/**
* merges parameters and description name into scope and return executor
* NOTE: if scope has $name or $params field they will be owerriden
* @param {String} name - name of dectription
* @param {Function} action - user defined function
* @param {Object} parmas - parameters object for action
* @return {Function}
*/
function specifyExecutor(name, action, params) {
    let extent = {
        $name: name,
        $params: params
    };
    
    return (scope) => executor(Object.assign(scope || {}, extent), action);
};

/**
* executor factory
* @param {String} name - name of user defined step
* @param {Function} action - user defined function
* @return {Function}
*/
function describe(name, action) {
    return (params) => specifyExecutor(name, action, params);
};

module.exports = {describe};
