# Testrunner

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

This scenario logically consist of one step only wich is called 'i++'.

In reality there are two of them.

First one is 'scenario' and the second one is 'i++'.

This framework doesn't see te difference between step and scenario declarations.



Now lets make our first test more modular:

``` javascript
let Increment = describe('i++', ($scope) => {  
    $scope.i++;

    return $scope;
})

let scenarioOptions = {};
let scenarioScope = {increment: 0};

describe('scenario', ($scope) => $scope)(scenarioOptions)(scenarioScope)
    .then(Increment())

    .then((result) => console.log('done'))
    .catch((error) => console.log(error));
```

## Asynchronous steps

Now lets make our simple scenario asynchronous.
In order to do so we have to return promise instead of $scope:

``` javascript
let Increment = describe('i++', ($scope) => {  
    return new Promise(function(resolve, reject) {
        setTimeout(() => {
            $scope.i++;
            resolve($scope);
        }, 2000)
    });
})
```

Now test will wait for step 'i++' to resolve, and then continue as usual.

## Defenitions options
