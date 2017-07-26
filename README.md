# Testrunner

Very minimalistic testing framework.

## Basics

Here is simple testing scenario:

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

Main idea is to use promise chains to mantain scenarios step order.

Now lets make our first test more modular

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
