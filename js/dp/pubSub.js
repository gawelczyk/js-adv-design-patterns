// Implement pubSub service using Evented.

var pubSub = (function (mixin, Evented) {

    var pub = {
        subscribe: function (event, fn) {
            this.on(event, fn);
        },
        publish: function (event, args) {
            this.trigger(event, args);
        },
        unsubscribe: function (evt) {
            this.off(evt);
        }
    }

    mixin(pub, Evented);
    return pub;

})(mixin, Evented);


function pubSubExampleUsage(pubSub) {
    pubSub.subscribe("buttonClick", function () {
        log("buttonClicked published", arguments);
    });
    pubSub.subscribe("buttonClick", function () {
        log("buttonClicked 2 published", arguments);
    });
    pubSub.subscribe("resultsUpdate", function () {
        log("resultsUpdate published", arguments);
    });


    pubSub.publish("buttonClick", [1, "qq"]);
    pubSub.publish("resultsUpdate", [1, "qq"]);
  pubSub.unsubscribe("resultsUpdate");
    pubSub.publish("buttonClick");
    pubSub.publish("resultsUpdate");
}
//pubSubExampleUsage(pubSub);
