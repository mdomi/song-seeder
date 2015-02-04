(function (window) {
    'use strict';

    var HALF_STEP = 1,
        WHOLE_STEP = 2;

    function Interval() {

    }

    Object.defineProperty(Interval, 'HALF_STEP', {
        get : function () {
            return HALF_STEP;
        }
    });

    Object.defineProperty(Interval, 'WHOLE_STEP', {
        get : function () {
            return WHOLE_STEP;
        }
    });

    window.Interval = Interval;


}(window));
