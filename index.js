function executor(scope, action) {
    return new Promise(function(resolve, reject) {

        let _scope;
        try {
            _scope = action(scope);
        } catch (e) {
            reject(Object.assign(scope, {$error: e}));
        }

        if (_scope instanceof Promise) {
            _scope.then((result) => resolve(result))
                 .catch((error) => reject(error));
        } else {
            resolve(_scope);
        }
    });
};

function describe(name, action) {

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
