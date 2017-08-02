const assert = require('assert');
const {describe} = require('..').core;
const {parallel} = require('..').parallel;

// parallel should pass down an array of resolved promises
(() => {
    let Scope = {array: []};

    let headerDescription = describe('head', ({scope}) => {
        return scope;
    });

    let tailDescription = describe('tail', ({scope}) => {
        assert.ok(scope instanceof Array);
        assert.ok(2 === scope.length);
        assert.deepEqual(scope[0], scope[1]);
        assert.deepEqual(scope[0], {array: ['b', 'a']});
    });

    let parallelDescription = describe('parallel', ({scope, params}) => {
        const {delay, prop} = params;

        return new Promise(function(resolve, reject) {
            setTimeout(() => {
                scope.array.push(prop);
                resolve(scope);
            }, delay);
        });
    });

    headerDescription({})(Scope)
        .then(parallel([
            parallelDescription({delay: 200, prop: 'a'}),
            parallelDescription({delay: 100, prop: 'b'})
        ]))
        .then(tailDescription())
        .catch(({error}) => console.log(error));
})();
