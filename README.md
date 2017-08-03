# PromiseMe

Very minimalistic testing framework.

## Installation

```
    npm install promise-me-framework
```

## Usage

``` javascript
    const {describe} = require('promise-me-framework').core;

    let test = describe('my test\'s name', function({scope}) {
        console.log('hello');
        return scope;
    });

    let scope = {};

    test()(scope)
        .then(() => console.log('done'));
```

## Basics

Main concept is to use promise chains. Like this:

``` javascript
given(LoginFeature(options), scope)
    .then(OpenPage('https://mycoolapp.com'))
    .then(FillInput({
        id: 'login',
        value: 'tester'
    }))
    .then(FillInput({
        id: 'password',
        value: getPassword('tester')
    }))
    .then(ClickButton('login'))
    .then(WaitForTitle('Welcome!'))
    .then(ReportSucces)
    .catch(ReportFailure);
```

Although it's not "real" code but you've got the idea.


Now here is simple testing scenario:

``` javascript
const {describe} = require('promise-me-framework').core;

// declaring scenario
describe('scenario', ({scope}) => scope)({})({i: 0})

    // declaring step
    .then(describe('i++', ({scope}) => {
        scope.i++;

        return scope;
     })())

     // handling scenario results and errors
    .then(() => console.log('done'))
    .catch(({error}) => console.log(error));

```

And lets make it more modular:

``` javascript
// declaring step
let Increment = describe('i++', ({scope}) => {  
    scope.i++;

    return scope;
});

let scenarioOptions = {};
let scenarioScope = {increment: 0};

// declaring scenario
describe('scenario', ({scope}) => scope)(scenarioOptions)(scenarioScope)
    .then(Increment())

    // handling scenario results and errors
    .then(() => console.log('done'))
    .catch(({error}) => console.log(error));
```

## Asynchronous steps

We can make our simple scenario asynchronous.

In order to do so we have to return promise instead of $scope:

``` javascript
// declaring step
let Increment = describe('i++', ({scope}) => {  
    return new Promise(function(resolve, reject) {
        setTimeout(() => {
            scope.i++;
            resolve(scope);
        }, 2000);
    });
});
```

## Defenitions options

We can pass parameters to step like this:

``` javascript
    .then(Increment(10))
```

And in order to access it within step definition we have to use <b>params</b> property of context:

``` javascript
// declaring step
let Increment = describe('i++', ({scope, params, name}) => {  
    console.log(name); // prints 'i++'
    scope.i += params;

    return scope;
});
```

Pretty much everything could be passed as a parameter to a step.

And as you can see we can access description <b>name</b> using name property of context.

## Groups

We can also group steps like this:
``` javascript
let Before = describe('before', doSmthBefore);
let After = describe('after', doSmthAfter);
let Action = describe('action', performaction);
let Prepare = describe('prepare', doPreparations);
let Continue = describe('continue', doSmthElse);

// declaring group
let Group = describe('group', ({scope}) => {
    return Before()(scope)
        .then(Action())
        .then(After());
});
```
and then use as regular step defenition
``` javascript
.then(Prepare())
.then(Group())
.then(Continue())
```

## Alias module

as you can see we have to invoke description with scope object as parameter in order to create promise chain

``` javascript
// declaring group
let Group = describe('group', ({scope}) => {
    return Before()(scope)
        .then(Action())
        .then(After());
});
```

it's perfectly fuctional but not quite clear what is happening here

we can fix this using alias module like so:

``` javascript
const {alias} = require('promise-me-framework').alias;

let given = alias;
let Group = describe('group', ({scope}) => {
    return given(Before(), scope)
        .then(Action())
        .then(After());
});
```

now group description can be red almost like plain english

## Parallel module

we can also execute steps in parallel using paralle module

connect it like so:

``` javascript
const {parallel} = require('promise-me-framework').parallel;
```

and use like this:

``` javascript
.then(parallel(
    actionOne('some parameter'),
    actionTwo(),
    actionThree([1,2,3])
))
.then(({scope}) => someActions(scope))
```

note that all descriptions will share same scope object

parallel method will pass down an array of resolved promises, or will throw a rejection
