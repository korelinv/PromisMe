const assert = require('assert');
const {describe} = require('..').core;

// type consistency
(() => {
    let description = describe('', () => {});

    assert.ok(description instanceof Function);
    assert.ok(description() instanceof Function);
    assert.ok(description()() instanceof Promise);
})();


// should share returned object between descriptions
(() => {
    let Scope = {};
    let haedDescription = describe('head description name', ({scope}) => {
        scope.prop = 'a';
        return scope;
    });
    let tailDescription = describe('tail description name', ({scope}) => {
        assert.ok(scope.prop === 'a');
        assert.ok(scope === Scope);
    });

    haedDescription()(Scope)
        .then(tailDescription())
        .catch(({error}) => console.log(error));
})();


// should pass description name into scope
// should override description name with current description name
(() => {
    let haedDescription = describe('head description name', ({name}) => {
        assert.ok(name === 'head description name');
    });
    let tailDescription = describe('tail description name', ({name}) => {
        assert.ok(name === 'tail description name');
    });

    haedDescription()({})
        .then(tailDescription())
        .catch(({error}) => console.log(error));
})();


// should pass parameters into description
(() => {
    let Params = {p: 1};
    let description = describe('', ({params}) => {
        assert.ok(params.p === Params.p);
    });

    description(Params)()
        .catch(({error}) => console.log(error));
})();
