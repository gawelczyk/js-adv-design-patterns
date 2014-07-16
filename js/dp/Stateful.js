// Implement Stateful role (Singleton)
// Reuse: mixin and Evented role


//stateful pattern
var Stateful = (function (mixin, Evented) {
    var WATCHEDDATA = 'watchedData';
    var statefull = {
        watch: function (name, fn) {
            this.on(name, fn);
        },
        watchAll: function (fn) {
            this.on('watchall', fn);
        },
        set: function (property, value) {
            var old = this[property];
            if (!this[WATCHEDDATA])
                this[WATCHEDDATA] = {};
            this[WATCHEDDATA][property] = value;
            this.trigger(property, [old, value]);
            this.trigger('watchall', [property, old, value]);
        },
        get: function (property) {
            if (!this[WATCHEDDATA])
                return this[WATCHEDDATA][property];
        }
//        afterMixed:function(){
//            //reset events hash, if not we share it among all object after mixin
//            this.events = {};
//        }
    }

    mixin(statefull, Evented);

    return statefull;
})(mixin, Evented);

function statefulExampleUsage(mixin, Stateful) {
    var bob = {};
    mixin(bob, Stateful);

    bob.watch("name", function (oldValue, newValue) {
        log("name changed from:", oldValue, "to:", newValue);
    });
    bob.watch("birthDate", function (oldValue, newValue) {
        log("birthDate changed from:", oldValue, "to:", newValue);
    });
    bob.watchAll(function (attributeName, oldValue, newValue) {
        log("Attribute:", attributeName, " changed:", oldValue, newValue);
    });
    bob.set("name", 123);
    bob.set("birthDate", new Date());
    console.log(bob.get("name"), bob);

//  bob.toJSON();
}

console.log('statefulExampleUsage');
console.log('======================');
//statefulExampleUsage(mixin, Stateful);
console.log('//statefulExampleUsage');