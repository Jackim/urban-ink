module.exports = {
    toDegrees:function(angle) {
        return angle * (180 / Math.PI);
    },
    randInt:function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    jitter:function() {
        return (Math.random() < 0.5 ? -1 : 1) * Math.random() * 0.5;
    }
};
