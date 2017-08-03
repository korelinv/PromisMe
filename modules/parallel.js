/**
* returns query of descriptions
* basicly a promise.all wrapper
* @param {Function}
* @return {Promise}
*/
function parallel() {
    let methods = [...arguments];

    return (scope) => {
        return Promise.all(methods.map((description) => description(scope)));
    };
};

module.exports = {parallel};
