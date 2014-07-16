/*
 * Using userRepository create cachedUserRepository -
 * it should cache results for up to 5 seconds, and send AJAX
 * request only if there are no cached results or cache has expired
 * */

var cachedUserRepository = (function (repo) {
    var TIMEOUT = 5000;
    var allData;
    var byIdData = {};

    var findAll = function (fn) {
        if (!allData) {
            console.log('fetching data');
            repo.findAll(function (data) {
                allData = data;
                setTimeout(function () {
                    allData = null;
                }, TIMEOUT);
                fn(allData);
            });
        } else {
            console.log('cache used');
            fn(allData);
        }
    };

    var findById = function (id, fn1) {
        if (!byIdData[id]) {
            console.log('fetching data', byIdData[id]);
            repo.findById(id, function (data) {
                byIdData[id] = data;
                setTimeout(function () {
                    byIdData[id] = null;
                }, TIMEOUT);
                fn1(byIdData[id]);
            });
        } else {
            console.log('cache used', byIdData[id]);
            fn1(byIdData[id]);
        }
    };

    return {
        findAll: findAll,
        findById: findById
    }
})(UsersRepository);

function proxyTest(cachedUserRepository) {
    var allUsers, user;

    cachedUserRepository.findAll(function (users) {
        console.log("should send AJAX request", users);
        assertEqual(users.length, 3);
    });

    setTimeout(function () {
        cachedUserRepository.findAll(function (users) {
            console.log("should return cached results", users);
            assertEqual(users.length, 3);
        });
    }, 3000);

    setTimeout(function () {
        cachedUserRepository.findAll(function (users) {
            console.log("should send new AJAX request", users);
            assertEqual(users.length, 3);
        });
    }, 6000);
}

function proxyTestById(cachedUserRepository) {
    var allUsers, user;

    cachedUserRepository.findById(2, function (users) {
        console.log("should send AJAX request", users);
        assertEqual(users.name, 'Batman');
    });

    setTimeout(function () {
        cachedUserRepository.findById(2, function (users) {
            console.log("should return cached results", users);
            assertEqual(users.name, 'Batman');
        });
        cachedUserRepository.findById(3, function (users) {
            console.log("should return ajax results", users);
            assertEqual(users.name, 'Jacykow');
        });
    }, 3000);

    setTimeout(function () {
        cachedUserRepository.findById(2, function (users) {
            console.log("should send new AJAX request", users);
            assertEqual(users.name, 'Batman');
        });
    }, 6000);
}

console.log('proxyTest');
proxyTest(cachedUserRepository);
console.log('//proxyTest');

setTimeout(function () {
    console.log('proxyTestById');
    proxyTestById(cachedUserRepository);
    console.log('//proxyTestById');
}, 8000);