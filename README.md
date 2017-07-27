# PromisMe

Very minimalistic testing framework.

## Basics

Main concept is to use promise chains. Like this:

``` javascript
LoginFeature(options)(scope)
    .then(OpenPage('https//:mycoolapp.com'))
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
// declaring scenario
describe('scenario', ($scope) => $scope)({})({i: 0})

    // declaring step
    .then(describe('i++', ($scope) => {
        $scope.i++;

        return $scope;
     })())

     // handling scenario results and errors
    .then((result) => console.log('done'))
    .catch((error) => console.log(error));

```

And lets make it more modular:

``` javascript
// declaring step
let Increment = describe('i++', ($scope) => {  
    $scope.i++;

    return $scope;
});

let scenarioOptions = {};
let scenarioScope = {increment: 0};

// declaring scenario
describe('scenario', ($scope) => $scope)(scenarioOptions)(scenarioScope)
    .then(Increment())

    // handling scenario results and errors
    .then((result) => console.log('done'))
    .catch((error) => console.log(error));
```

## Asynchronous steps

We can make our simple scenario asynchronous.

In order to do so we have to return promise instead of $scope:

``` javascript
// declaring step
let Increment = describe('i++', ($scope) => {  
    return new Promise(function(resolve, reject) {
        setTimeout(() => {
            $scope.i++;
            resolve($scope);
        }, 2000);
    });
});
```

## Defenitions options

We also can pass parameters to step like this:

``` javascript
    .then(Increment(10))
```

And in order to access it within step definition we have to use $param property of $scope:

``` javascript
// declaring step
let Increment = describe('i++', ($scope) => {  
    let param = $scope.$params;
    $scope.i += param;

    return $scope;
});
```

Pretty much everything could be passed as a parameter to a step.

## Groups

We can also group steps like this:
``` javascript
let Before = describe('before', doSmthBefore);
let After = describe('after', doSmthAfter);
let Action = describe('action', performaction);
let Prepare = describe('prepare', doPreparations);
let Continue = describe('continue', doSmthElse);

// declaring group
let Group = describe('group', ($scope) => {
    return Before()($scope)
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
