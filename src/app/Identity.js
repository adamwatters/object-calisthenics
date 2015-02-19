function Identity(type) {
    this.type = type;
    this.number = assignIdentityNumber(type);

    // for debugging
    console.log(this.type, this.number);
}

// todo: are these two methods neccassary?
Identity.prototype.isA = function(type) {
    return this.type === type;
};

Identity.prototype.isNumber = function(number) {
    return this.number === number;
};

Identity.prototype.equals = function(identity) {
    return this.type === identity.type && this.number === identity.number;
};

var assignIdentityNumber =  function() {
        var counts = counts || {};
        return function(type) {
            counts[type] = counts[type] ? counts[type] += 1 : 1;
            return counts[type];
        };
    }();

module.exports = Identity;