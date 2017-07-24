function wrap(scope, action) {
    return new Promise(function(resolve, reject) {

        let _scope;
        try {
            _scope = action(scope);
        } catch (e) {
            reject({error: e});
        }

        if (scope instanceof Promise) {
            _scope.then((result) => resolve(result))
                 .catch((error) => reject(error));
        } else {
            resolve(_scope);
        }
    });
};

function describe(name, action) {
    return (scope) => wrap(scope, action);
};



let f = describe('feature', function() {
    let scope = {a: 1};
    return scope;
});

let s1 = describe('step 1', function(scope) {
    scope.a += 1;
    return scope;
});

let s2 = describe('step 2', function(scope) {

    scope.b = 'a';

    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve(scope);
        }, 2000);
    });
});

f().then(s1)
.then(s2)
.then(s1)
.then((d) => console.log(d))
.catch((e) => console.log(e));
