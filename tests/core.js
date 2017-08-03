const assert = require('assert');
const {describe} = require('..').core;

// type consistency
(() => {
    let description = describe('', () => {});

    assert.ok(description instanceof Function, 'type consistency - fail\ndescription should be a function');
    assert.ok(description() instanceof Function, 'type consistency - fail\ndescription() should be a function');
    assert.ok(description()() instanceof Promise, 'type consistency - fail\ndescription()() should be a promise');

    console.log('type consistency - pass');
})();


// should share context between descriptions if specified
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


// should pass description name into context
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

// providers should be accesable in the context object
(() => {
    let Provider = {
        value: 1,
        method: (arg) => (arg + 1)
    };
    let description = describe('', ({provider}) => {
        assert.deepEqual(provider, Provider);
        console.log('providers should be accesable in the context object - pass');
    }, {provider: Provider});

    description()()
        .catch(({error}) => console.log('providers should be accesable in the context object - fail\n',error));
})();
