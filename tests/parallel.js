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
        assert.ok(Array.isArray(scope), 'scope should be an instance of array');
        assert.equal(2, scope.length, 'scope should have 2 elements');
        assert.deepEqual(scope[0], scope[1], 'elements of scope shoul be pointing at the same object');
        assert.deepEqual(scope[0], {array: ['b', 'a']}, 'scope[0] should be [\'b\',\'a\']');
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
        .then(parallel(
            parallelDescription({delay: 200, prop: 'a'}),
            parallelDescription({delay: 100, prop: 'b'})
        ))
        .then(tailDescription())
        .then(() => console.log('parallel should pass down an array of resolved promises - pass'))
        .catch(({error}) => console.log('parallel should pass down an array of resolved promises - fail\n', error));
})();
