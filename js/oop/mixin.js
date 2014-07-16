// Implement mixin(destination, source) function.
function mixin(destination, source) {
    var afterMixed = 'afterMixed';

    for (var prop in source) {
        if (prop != afterMixed)
            destination[prop] = source[prop];
    }
    if (source.hasOwnProperty(afterMixed)) {
        source[afterMixed].apply(destination);
    }
}

var Encryptable = (function () {

    var En = {
        encrypt: function (propertyName) {
            console.log('encrypt', propertyName);
        },
        getEncrypted: function (propertyName) {
            console.log('getEncrypted', propertyName);
        }
    }
    return En;
})();

function mixinClassExampleUsage(mixin) {
    function User(login) {
        this.login = login;
    }

    User.prototype.getLogin = function () {
        return this.login;
    };

    // TODO: create Encryptable module (Singleton) with methods:
    // + encrypt(propertyName)
    // + getEncrypted(propertyName)

    mixin(User.prototype, Encryptable);

    var user = new User("bob");
    user.encrypt("login"); // => "some encrypted login"
    user.getEncrypted("login");
}

console.log('mixinClassExampleUsage');
mixinClassExampleUsage(mixin);
console.log('//mixinClassExampleUsage');

function mixinInstanceExampleUsage(mixin) {
    var bob = {name: "Bob"};

    // TODO: create modules (Singletons):
    // + Teacher with methods: teach()
    // + Dancer with methods: dance()
    var Teacher = {
        teach: function () {
            console.log("teach");
        },
        afterMixed: function () {
            console.log('afterMixed called');
            if (!this.skills)
                this.skills = [];
        }
    };

    var Dancer = {
        dance: function () {
            console.log('dance');
        }
    };

    mixin(bob, Teacher);
    mixin(bob, Dancer);

    bob.teach();
    bob.dance(); // logs "dance"
    console.log(bob);
}

console.log('mixinInstanceExampleUsage test');
mixinInstanceExampleUsage(mixin);
console.log('//mixinInstanceExampleUsage test');