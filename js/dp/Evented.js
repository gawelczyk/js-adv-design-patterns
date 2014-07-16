// Implement Evented module which provides methods:
// + on(eventName, listenerFn)
// + trigger(eventName, args)
// + off(eventName)


var Evented = (function () {

    function on(eventName, listenerFn) {
        if (!this.events[eventName])
            this.events[eventName] = [];
        this.events[eventName].push(listenerFn);
    }

    function trigger(eventName, args) {
        if (this.events[eventName]) {
            for (var i = 0; i < this.events[eventName].length; i++) {
                this.events[eventName][i].apply(this, args);
            }
        }
    }

    function off(eventName) {
        if (this.events[eventName])
            delete this.events[eventName]
    }

    return {
        on: on,
        trigger: trigger,
        off: off,
        afterMixed: function () {
            this.events = {};
        }
    }

})();

function eventedExampleUsage(mixin, Evented) {
    var bob = {name: "Bob"};
    mixin(bob, Evented);

    bob.on("remove", function (number, str) {
        log(this.name, "remove triggered", arguments);
    });

    bob.on("remove", function () {
        log(this.name, "2nd remove triggered", arguments);
    });

    bob.trigger("remove", [1, "qq"]); // logged msg on console

    var ed = {name: "Ed"};
    mixin(ed, Evented);
    ed.trigger("remove"); // nothing happens

    bob.off("remove");
    bob.trigger("remove", [
        {},
        997.001
    ]); // nothing logged
}
console.log('eventedExampleUsage');
eventedExampleUsage(mixin, Evented);
console.log('//eventedExampleUsage');