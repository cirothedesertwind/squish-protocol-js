// Uses AMD or browser globals to create a module.

// Grabbed from https://github.com/umdjs/umd/blob/master/amdWeb.js.
// Check out https://github.com/umdjs/umd for more patterns.

// Defines a module "squish".
// Note that the name of the module is implied by the file name. It is best
// if the file name and the exported global have matching names.

// If you do not want to support the browser global path, then you
// can remove the `root` use and the passing `this` as the first arg to
// the top function.

(function (root, factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else {
        // Browser globals
        root.squish = factory();
    }
}(this, function () {
    'use strict';

    var NONE =  0xA0;
    var SOME =  0xA1;

    var TRUE =  0xFF;
    var FALSE = 0x00;

    //1-127
    //Use SIZE0
    //256
    var SIZE1 = 0xB1;
    //65536
    var SIZE2 = 0xB2;
    //2^31-1
    var SIZE4 = 0xB4;

    function putNone(b) {
      b.writeByte(NONE);
    }

    function putSome(b) {
      b.writeByte(NONE);
    }

    function hasSome(b) {
        b.mark();

        byte v = b.readByte();

        if (v == SOME)
            return true;
        else if (v == NONE)
            return false;
        else {
            b.reset();
            throw "The data type stored is of type " + v;
        }
    }

    function put(b, bool) {
        if (bool)
            b.writeByte(TRUE);
        else
            b.writeByte(FALSE);
    }

    function getBoolean(b) {
        b.mark();

        byte v = b.writeByte();

        if (v == TRUE)
            return true;
        else if (v == FALSE)
            return false;
        else {
            b.reset();
            throw "The data type stored is of type " + v;
        }
    }

   function putUByte(b, i) {
        if (i < 0 || i > 255)
            throw "This is used for numbers from 0 to 2^8-1";

        b.writeByte(i);
    }

    function putUShort(b, i) {
        if (i < 0 || i > 65535)
            throw "This is used for numbers from 0 to 2^16-1";

        b.writeShort(i);
    }

    function putUInt(b, i) {
        if (i < 0 || i > (1L << 31))
            throw "This is used for numbers from 0 to 2^31-1";

        b.writeInt(i);
    }

    function putULong(b, i) {
        if (i < 0)
            throw "This is used for numbers from 0 to 2^63-1. "
                    + "Use BigInteger version for numbers >= 2^63 to 2^64-1.";

        b.writeLong(i);
    }


    // Return a value to define the module export.
    // This example returns a functions, but the module
    // can return an object as the exported value.
    return squish;
}));
