function Identity(type) {
    this.type = type;
    this.number = assignIdentityNumber(type);

    // for debugging
    console.log("id", this.type, this.number);
}

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