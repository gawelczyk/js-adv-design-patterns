//var promise = $.get("server/users.json"); // AJAX request
//promise.success(function(data) {
//  console.log("Data from server", data);
//});
//promise.error(function(error) {
//  console.log("Server error", error);
//});

var UsersRepository = (function () {

    var findAll = function (fn) {
        var promise = $.get("server/users.json"); // AJAX request
        promise.success(function (data) {
            fn(data);
        });
        promise.error(function (error) {
            console.log("Server error", error);
        });
    };

    var findById = function (id, fn) {
        var promise = $.get("server/users.json"); // AJAX request
        promise.success(function (data) {
            for (var i = 0; i < data.length; i++) {
                if (data[i].id == id) {
                    fn(data[i]);
                    return;
                }
            }
            fn();
        });
        promise.error(function (error) {
            console.log("Server error", error);
        });
    };

    return {
        findAll: findAll,
        findById: findById
    }
})();
function repositoryTest(usersRepository) {
    var allUsers, user;

    usersRepository.findAll(function (users) {
        console.log(users);
        assertEqual(users.length, 3);
    });

    usersRepository.findById(2, function (user) {
        console.log(user);
        assertEqual(user.name, "Batman");
    });

    usersRepository.findById(997, function (user) {
        console.log(user);
        assertEqual(user, undefined);
    });
}
console.log('repositoryTest');
repositoryTest(UsersRepository);
console.log('//repositoryTest');