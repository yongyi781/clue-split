/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "../node_modules/.pnpm/@alt1+base@1.0.0-alpha.7/node_modules/@alt1/base/dist/alt1api.js":
/*!**********************************************************************************************!*\
  !*** ../node_modules/.pnpm/@alt1+base@1.0.0-alpha.7/node_modules/@alt1/base/dist/alt1api.js ***!
  \**********************************************************************************************/
/***/ (() => {

"use strict";



/***/ }),

/***/ "../node_modules/.pnpm/@alt1+base@1.0.0-alpha.7/node_modules/@alt1/base/dist/declarations.js":
/*!***************************************************************************************************!*\
  !*** ../node_modules/.pnpm/@alt1+base@1.0.0-alpha.7/node_modules/@alt1/base/dist/declarations.js ***!
  \***************************************************************************************************/
/***/ (() => {

"use strict";



/***/ }),

/***/ "../node_modules/.pnpm/@alt1+base@1.0.0-alpha.7/node_modules/@alt1/base/dist/imagedata-extensions.js":
/*!***********************************************************************************************************!*\
  !*** ../node_modules/.pnpm/@alt1+base@1.0.0-alpha.7/node_modules/@alt1/base/dist/imagedata-extensions.js ***!
  \***********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ImageData: () => (/* binding */ ImageData)
/* harmony export */ });
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ "../node_modules/.pnpm/@alt1+base@1.0.0-alpha.7/node_modules/@alt1/base/dist/index.js");
/* harmony import */ var _nodepolyfill_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./nodepolyfill.js */ "../node_modules/.pnpm/@alt1+base@1.0.0-alpha.7/node_modules/@alt1/base/dist/nodepolyfill.js");


//export this so node.js can also use it
var ImageData;
// //TODO revamp this madness a bit?
// (function () {
// 	var globalvar = (typeof self != "undefined" ? self : (typeof (global as any) != "undefined" ? (global as any) : null)) as any;
// 	//use the node-canvas version when on node
// 	if (typeof globalvar.ImageData == "undefined") {
// 		let nodecnv = requireNodeCanvas();
// 		globalvar.ImageData = nodecnv.ImageData;
// 	}
// 	var fill = typeof globalvar.ImageData == "undefined";
// 	//should never be reach anymore
// 	var constr = function (this: any) {
// 		var i = 0;
// 		var data = (arguments[i] instanceof Uint8ClampedArray ? arguments[i++] : null);
// 		var width = arguments[i++];
// 		var height = arguments[i++];
// 		if (fill) {
// 			if (!data) { data = new Uint8ClampedArray(width * height * 4); }
// 			this.width = width;
// 			this.height = height;
// 			this.data = data;
// 		}
// 		else if (oldconstr) {
// 			return (data ? new oldconstr(data, width, height) : new oldconstr(width, height));
// 		} else {
// 			var canvas = document.createElement('canvas');
// 			canvas.width = width;
// 			canvas.height = height;
// 			var ctx = canvas.getContext("2d")!;
// 			var imageData = ctx.createImageData(width, height);
// 			if (data) { imageData.data.set(data); }
// 			return imageData;
// 		}
// 	}
// 	var oldconstr = globalvar.ImageData;
// 	if (typeof document != "undefined") {
// 		try {
// 			new oldconstr(1, 1);
// 		} catch (e) {
// 			//direct constructor call not allowed in ie
// 			oldconstr = null;
// 		}
// 	}
// 	if (!fill) { constr.prototype = globalvar.ImageData.prototype; }
// 	globalvar.ImageData = constr;
// 	ImageData = constr as any;
// })();
(function () {
    var globalvar = (typeof self != "undefined" ? self : (typeof global != "undefined" ? global : null));
    var filltype = typeof globalvar.ImageData == "undefined" || typeof globalvar.document == "undefined";
    var fillconstr = filltype;
    if (!filltype) {
        var oldconstr = globalvar.ImageData;
        try {
            let data = new Uint8ClampedArray(4);
            data[0] = 1;
            let a = new globalvar.ImageData(data, 1, 1);
            fillconstr = a.data[0] != 1;
        }
        catch (e) {
            fillconstr = true;
        }
    }
    if (fillconstr) {
        var constr = function ImageDataShim() {
            var i = 0;
            var data = (arguments[i] instanceof Uint8ClampedArray ? arguments[i++] : null);
            var width = arguments[i++];
            var height = arguments[i++];
            if (filltype) {
                if (!data) {
                    data = new Uint8ClampedArray(width * height * 4);
                }
                this.width = width;
                this.height = height;
                this.data = data;
            }
            else if (fillconstr) {
                //WARNING This branch of code does not use the same pixel data backing store
                //(problem with wasm, however all wasm browser have a native constructor (unless asm.js is used))
                var canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
                var ctx = canvas.getContext("2d");
                var imageData = ctx.createImageData(width, height);
                if (data) {
                    imageData.data.set(data);
                }
                return imageData;
            }
            // else {
            // 	//oh no...
            // 	//we need this monstrocity in order to call the native constructor with variable number of args
            // 	//when es5 transpile is enable (that strips the spread operator)
            // 	return new (Function.prototype.bind.apply(oldconstr, [null,...arguments]));
            // }
        };
        if (!filltype) {
            constr.prototype = globalvar.ImageData.prototype;
        }
        globalvar.ImageData = constr;
        ImageData = constr;
    }
    else {
        ImageData = globalvar.ImageData;
    }
})();
//Recast into a drawable imagedata class on all platforms, into a normal browser ImageData on browsers or a node-canvas imagedata on nodejs
ImageData.prototype.toDrawableData = function () {
    if (typeof document == "undefined") {
        return _nodepolyfill_js__WEBPACK_IMPORTED_MODULE_1__.imageDataToDrawable(this);
    }
    else {
        return this;
    }
};
ImageData.prototype.putImageData = function (buf, cx, cy) {
    for (var dx = 0; dx < buf.width; dx++) {
        for (var dy = 0; dy < buf.height; dy++) {
            var i1 = (dx + cx) * 4 + (dy + cy) * 4 * this.width;
            var i2 = dx * 4 + dy * 4 * buf.width;
            this.data[i1] = buf.data[i2];
            this.data[i1 + 1] = buf.data[i2 + 1];
            this.data[i1 + 2] = buf.data[i2 + 2];
            this.data[i1 + 3] = buf.data[i2 + 3];
        }
    }
};
ImageData.prototype.pixelOffset = function (x, y) {
    return x * 4 + y * this.width * 4;
};
//creates a hash of a portion of the buffer used to check for changes
ImageData.prototype.getPixelHash = function (rect) {
    if (!rect) {
        rect = new _index_js__WEBPACK_IMPORTED_MODULE_0__.Rect(0, 0, this.width, this.height);
    }
    var hash = 0;
    for (var x = rect.x; x < rect.x + rect.width; x++) {
        for (var y = rect.y; y < rect.y + rect.height; y++) {
            var i = x * 4 + y * 4 * this.width;
            hash = (((hash << 5) - hash) + this.data[i]) | 0;
            hash = (((hash << 5) - hash) + this.data[i + 1]) | 0;
            hash = (((hash << 5) - hash) + this.data[i + 2]) | 0;
            hash = (((hash << 5) - hash) + this.data[i + 3]) | 0;
        }
    }
    return hash;
};
ImageData.prototype.clone = function (rect) {
    return this.toImage(rect).getContext("2d").getImageData(0, 0, rect.width, rect.height);
};
ImageData.prototype.show = function (x = 5, y = 5, zoom = 1) {
    if (typeof document == "undefined") {
        console.error("need a document to show an imagedata object");
        return;
    }
    var imgs = document.getElementsByClassName("debugimage");
    while (imgs.length > ImageData.prototype.show.maxImages) {
        imgs[0].remove();
    }
    var el = this.toImage();
    el.classList.add("debugimage");
    el.style.position = "absolute";
    el.style.zIndex = "1000";
    el.style.left = x / zoom + "px";
    el.style.top = y / zoom + "px";
    el.style.background = "purple";
    el.style.cursor = "pointer";
    el.style.imageRendering = "pixelated";
    el.style.outline = "1px solid #0f0";
    el.style.width = (this.width == 1 ? 100 : this.width) * zoom + "px";
    el.style.height = (this.height == 1 ? 100 : this.height) * zoom + "px";
    el.onclick = function () { el.remove(); };
    document.body.appendChild(el);
    return el;
};
ImageData.prototype.show.maxImages = 10;
ImageData.prototype.toImage = function (rect) {
    if (!rect) {
        rect = new _index_js__WEBPACK_IMPORTED_MODULE_0__.Rect(0, 0, this.width, this.height);
    }
    if (typeof document != "undefined") {
        var el = document.createElement("canvas");
        el.width = rect.width;
        el.height = rect.height;
    }
    else {
        el = _nodepolyfill_js__WEBPACK_IMPORTED_MODULE_1__.createCanvas(rect.width, rect.height);
    }
    var ctx = el.getContext("2d");
    ctx.putImageData(this.toDrawableData(), -rect.x, -rect.y);
    return el;
};
ImageData.prototype.getPixel = function (x, y) {
    var i = x * 4 + y * 4 * this.width;
    return [this.data[i], this.data[i + 1], this.data[i + 2], this.data[i + 3]];
};
ImageData.prototype.getPixelValueSum = function (x, y) {
    var i = x * 4 + y * 4 * this.width;
    return this.data[i] + this.data[i + 1] + this.data[i + 2];
};
ImageData.prototype.getPixelInt = function (x, y) {
    var i = x * 4 + y * 4 * this.width;
    return (this.data[i + 3] << 24) + (this.data[i + 0] << 16) + (this.data[i + 1] << 8) + (this.data[i + 2] << 0);
};
ImageData.prototype.getColorDifference = function (x, y, r, g, b, a = 255) {
    var i = x * 4 + y * 4 * this.width;
    return Math.abs(this.data[i] - r) + Math.abs(this.data[i + 1] - g) + Math.abs(this.data[i + 2] - b) * a / 255;
};
ImageData.prototype.setPixel = function (x, y, ...color) {
    var r, g, b, a;
    var [r, g, b, a] = (Array.isArray(color[0]) ? color[0] : color);
    var i = x * 4 + y * 4 * this.width;
    this.data[i] = r;
    this.data[i + 1] = g;
    this.data[i + 2] = b;
    this.data[i + 3] = a == undefined ? 255 : a;
};
ImageData.prototype.setPixelInt = function (x, y, color) {
    var i = x * 4 + y * 4 * this.width;
    this.data[i] = (color >> 24) & 0xff;
    this.data[i + 1] = (color >> 16) & 0xff;
    this.data[i + 2] = (color >> 8) & 0xff;
    this.data[i + 3] = (color >> 0) & 0xff;
};
ImageData.prototype.toFileBytes = function (format, quality) {
    if (typeof HTMLCanvasElement != "undefined") {
        return new Promise(d => this.toImage().toBlob(b => {
            var r = new FileReader();
            r.readAsArrayBuffer(b);
            r.onload = () => d(new Uint8Array(r.result));
        }, format, quality));
    }
    else {
        return _nodepolyfill_js__WEBPACK_IMPORTED_MODULE_1__.imageDataToFileBytes(this, format, quality);
    }
};
ImageData.prototype.toPngBase64 = function () {
    if (typeof HTMLCanvasElement != "undefined") {
        var str = this.toImage().toDataURL("image/png");
        return str.slice(str.indexOf(",") + 1);
    }
    else {
        throw new Error("synchronous image conversion not supported in nodejs, try using ImageData.prototype.toFileBytes");
    }
};
ImageData.prototype.pixelCompare = function (buf, x = 0, y = 0, max) {
    return _index_js__WEBPACK_IMPORTED_MODULE_0__.ImageDetect.simpleCompare(this, buf, x, y, max);
};
ImageData.prototype.copyTo = function (target, sourcex, sourcey, width, height, targetx, targety) {
    //convince v8 that these are 31bit uints
    const targetwidth = target.width | 0;
    const thiswidth = this.width | 0;
    const copywidth = width | 0;
    const fastwidth = Math.floor(width / 4) * 4;
    const thisdata = new Int32Array(this.data.buffer, this.data.byteOffset, this.data.byteLength / 4);
    const targetdata = new Int32Array(target.data.buffer, target.data.byteOffset, target.data.byteLength / 4);
    for (let cy = 0; cy < height; cy++) {
        let cx = 0;
        let it = (cx + targetx) + (cy + targety) * targetwidth;
        let is = (cx + sourcex) + (cy + sourcey) * thiswidth;
        //copy 4 pixels per iter (xmm)
        for (; cx < fastwidth; cx += 4) {
            targetdata[it] = thisdata[is];
            targetdata[it + 1] = thisdata[is + 1];
            targetdata[it + 2] = thisdata[is + 2];
            targetdata[it + 3] = thisdata[is + 3];
            it += 4;
            is += 4;
        }
        //copy remainder per pixel
        for (; cx < copywidth; cx++) {
            targetdata[it] = thisdata[is];
            it += 1;
            is += 1;
        }
    }
};
if (typeof HTMLImageElement != "undefined") {
    HTMLImageElement.prototype.toBuffer = function (x = 0, y = 0, w = this.width, h = this.height) {
        var cnv = document.createElement("canvas");
        cnv.width = w;
        cnv.height = h;
        var ctx = cnv.getContext("2d");
        ctx.drawImage(this, -x, -y);
        return ctx.getImageData(0, 0, w, h);
    };
    HTMLImageElement.prototype.toCanvas = function (x = 0, y = 0, w = this.width, h = this.height) {
        var cnv = document.createElement("canvas");
        cnv.width = w;
        cnv.height = h;
        var ctx = cnv.getContext("2d");
        ctx.drawImage(this, -x, -y);
        return cnv;
    };
}


/***/ }),

/***/ "../node_modules/.pnpm/@alt1+base@1.0.0-alpha.7/node_modules/@alt1/base/dist/imagedetect.js":
/*!**************************************************************************************************!*\
  !*** ../node_modules/.pnpm/@alt1+base@1.0.0-alpha.7/node_modules/@alt1/base/dist/imagedetect.js ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ImageDataSet: () => (/* binding */ ImageDataSet),
/* harmony export */   asyncMap: () => (/* binding */ asyncMap),
/* harmony export */   clearPngColorspace: () => (/* binding */ clearPngColorspace),
/* harmony export */   coldif: () => (/* binding */ coldif),
/* harmony export */   findSubbuffer: () => (/* binding */ findSubbuffer),
/* harmony export */   findSubimage: () => (/* binding */ findSubimage),
/* harmony export */   imageDataFromBase64: () => (/* binding */ imageDataFromBase64),
/* harmony export */   imageDataFromFileBuffer: () => (/* binding */ imageDataFromFileBuffer),
/* harmony export */   imageDataFromUrl: () => (/* binding */ imageDataFromUrl),
/* harmony export */   isPngBuffer: () => (/* binding */ isPngBuffer),
/* harmony export */   simpleCompare: () => (/* binding */ simpleCompare),
/* harmony export */   simpleCompareRMSE: () => (/* binding */ simpleCompareRMSE),
/* harmony export */   webpackImages: () => (/* binding */ webpackImages)
/* harmony export */ });
/* harmony import */ var _imgref_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./imgref.js */ "../node_modules/.pnpm/@alt1+base@1.0.0-alpha.7/node_modules/@alt1/base/dist/imgref.js");
/* harmony import */ var _wrapper_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./wrapper.js */ "../node_modules/.pnpm/@alt1+base@1.0.0-alpha.7/node_modules/@alt1/base/dist/wrapper.js");
/* harmony import */ var _nodepolyfill_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./nodepolyfill.js */ "../node_modules/.pnpm/@alt1+base@1.0.0-alpha.7/node_modules/@alt1/base/dist/nodepolyfill.js");
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./index.js */ "../node_modules/.pnpm/@alt1+base@1.0.0-alpha.7/node_modules/@alt1/base/dist/index.js");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};




/**
* Downloads an image and returns the ImageData
* Make sure the png image does not have a sRGB chunk or the resulting pixels will differ for different users!!!
* @param url http(s) or data url to the image
*/
function imageDataFromUrl(url) {
    return __awaiter(this, void 0, void 0, function* () {
        if (typeof Image != "undefined") {
            var img = new Image();
            img.crossOrigin = "crossorigin";
            return yield new Promise((done, fail) => {
                img.onload = function () { done(img.toBuffer()); };
                img.onerror = fail;
                img.src = url;
            });
        }
        else {
            var hdr = "data:image/png;base64,";
            if (url.startsWith(hdr)) {
                return imageDataFromBase64(url.slice(hdr.length));
            }
            throw new Error("loading remote images in nodejs has been disabled, load the raw bytes and use imageDataFromNodeBuffer instead");
        }
    });
}
/**
* Loads an ImageData object from a base64 encoded png image
* Make sure the png image does not have a sRGB chunk or the resulting pixels will differ for different users!!!
* @param data a base64 encoded png image
*/
function imageDataFromBase64(data) {
    return __awaiter(this, void 0, void 0, function* () {
        if (typeof Image != "undefined") {
            return imageDataFromUrl("data:image/png;base64," + data);
        }
        else {
            return _nodepolyfill_js__WEBPACK_IMPORTED_MODULE_2__.imageDataFromBase64(data);
        }
    });
}
/**
 * Loads an ImageData object directly from a png encoded file buffer
 * This method ensures that png color space headers are taken care off
 * @param data The bytes of a png file
 */
function imageDataFromFileBuffer(data) {
    return __awaiter(this, void 0, void 0, function* () {
        clearPngColorspace(data);
        if (typeof Image != "undefined") {
            let blob = new Blob([data], { type: "image/png" });
            let url = URL.createObjectURL(blob);
            let r = yield imageDataFromUrl(url);
            URL.revokeObjectURL(url);
            return r;
        }
        else {
            return _nodepolyfill_js__WEBPACK_IMPORTED_MODULE_2__.imageDataFromBuffer(data);
        }
    });
}
/**
* Checks if a given byte array is a png file (by checking for ?PNG as first 4 bytes)
* @param bytes Raw bytes of the png file
*/
function isPngBuffer(bytes) {
    return bytes[0] == 137 && bytes[1] == 80 && bytes[2] == 78 && bytes[3] == 71;
}
/**
* Resets the colorspace data in the png file.
* This makes sure the browser renders the exact colors in the file instead of filtering it in order to obtain the best real life representation of
* what it looked like on the authors screen. (this feature is often broken and not supported)
* For example a round trip printscreen -> open in browser results in different colors than the original
* @param data Raw bytes of the png file
*/
function clearPngColorspace(data) {
    if (!isPngBuffer(data)) {
        throw new Error("non-png image received");
    }
    var i = 8;
    while (i < data.length) {
        var length = data[i++] * 0x1000000 + data[i++] * 0x10000 + data[i++] * 0x100 + data[i++];
        var ancillary = !!((data[i] >> 5) & 1);
        var chunkname = String.fromCharCode(data[i], data[i + 1], data[i + 2], data[i + 3]);
        var chunkid = chunkname.toLowerCase();
        if (chunkid != "trns" && ancillary) {
            data[i + 0] = "n".charCodeAt(0);
            data[i + 1] = "o".charCodeAt(0);
            data[i + 2] = "P".charCodeAt(0);
            data[i + 3] = "E".charCodeAt(0);
            //calculate new chunk checksum
            //http://www.libpng.org/pub/png/spec/1.2/PNG-CRCAppendix.html
            var end = i + 4 + length;
            var crc = 0xffffffff;
            //should be fast enough like this
            var bitcrc = function (bit) {
                for (var k = 0; k < 8; k++) {
                    if (bit & 1) {
                        bit = 0xedb88320 ^ (bit >>> 1);
                    }
                    else {
                        bit = bit >>> 1;
                    }
                }
                return bit;
            };
            for (var a = i; a < end; a++) {
                if (a >= i + 4) {
                    data[a] = 0;
                }
                var bit = data[a];
                crc = bitcrc((crc ^ bit) & 0xff) ^ (crc >>> 8);
            }
            crc = crc ^ 0xffffffff;
            //new chunk checksum
            data[i + 4 + length + 0] = (crc >> 24) & 0xff;
            data[i + 4 + length + 1] = (crc >> 16) & 0xff;
            data[i + 4 + length + 2] = (crc >> 8) & 0xff;
            data[i + 4 + length + 3] = (crc >> 0) & 0xff;
        }
        if (chunkname == "IEND") {
            break;
        }
        i += 4; //type
        i += length; //data
        i += 4; //crc
    }
}
/**
* finds the given needle ImageBuffer in the given haystack ImgRef this function uses the best optimized available
* code depending on the type of the haystack. It will use fast c# searching if the haystack is an ImgRefBind, js searching
* is used otherwise.
* the checklist argument is no longer used and should ignored or null/undefined
* The optional sx,sy,sw,sh arguments indicate a bounding rectangle in which to search the needle. The rectangle should be bigger than the needle
* @returns An array of points where the needle is found. The array is empty if none are found
*/
function findSubimage(haystackImgref, needleBuffer, sx = 0, sy = 0, sw = haystackImgref.width, sh = haystackImgref.height) {
    if (!haystackImgref) {
        throw new TypeError();
    }
    if (!needleBuffer) {
        throw new TypeError();
    }
    var max = 30;
    //check if we can do this in alt1
    if (haystackImgref instanceof _imgref_js__WEBPACK_IMPORTED_MODULE_0__.ImgRefBind && _wrapper_js__WEBPACK_IMPORTED_MODULE_1__.hasAlt1 && alt1.bindFindSubImg) {
        var needlestr = _wrapper_js__WEBPACK_IMPORTED_MODULE_1__.encodeImageString(needleBuffer);
        var r = alt1.bindFindSubImg(haystackImgref.handle, needlestr, needleBuffer.width, sx, sy, sw, sh);
        if (!r) {
            throw new _wrapper_js__WEBPACK_IMPORTED_MODULE_1__.Alt1Error();
        }
        return JSON.parse(r);
    }
    return findSubbuffer(haystackImgref.read(), needleBuffer, sx, sy, sw, sh);
}
/**
* Uses js to find the given needle ImageBuffer in the given haystack ImageBuffer. It is better to use the alt1.bind- functions in
* combination with a1nxt.findsubimg.
* the optional sx,sy,sw,sh arguments indicate a bounding rectangle in which to search.
* @returns An array of points where the needle is found. The array is empty if none are found
*/
function findSubbuffer(haystack, needle, sx = 0, sy = 0, sw = haystack.width, sh = haystack.height) {
    var r = [];
    var maxdif = 30;
    var maxresults = 50;
    var needlestride = needle.width * 4;
    var heystackstride = haystack.width * 4;
    //built list of non trans pixel to check
    var checkList = [];
    for (var y = 0; y < needle.height; y++) {
        for (var x = 0; x < needle.width; x++) {
            var i = x * 4 + y * needlestride;
            if (needle.data[i + 3] == 255) {
                checkList.push({ x: x, y: y });
            }
            if (checkList.length == 10) {
                break;
            }
        }
        if (checkList.length == 10) {
            break;
        }
    }
    var cw = (sx + sw) - needle.width;
    var ch = (sy + sh) - needle.height;
    var checklength = checkList.length;
    for (var y = sy; y <= ch; y++) {
        outer: for (var x = sx; x <= cw; x++) {
            for (var a = 0; a < checklength; a++) {
                var i1 = (x + checkList[a].x) * 4 + (y + checkList[a].y) * heystackstride;
                var i2 = checkList[a].x * 4 + checkList[a].y * needlestride;
                var d = 0;
                d = d + Math.abs(haystack.data[i1 + 0] - needle.data[i2 + 0]) | 0;
                d = d + Math.abs(haystack.data[i1 + 1] - needle.data[i2 + 1]) | 0;
                d = d + Math.abs(haystack.data[i1 + 2] - needle.data[i2 + 2]) | 0;
                d *= 255 / needle.data[i2 + 3];
                if (d > maxdif) {
                    continue outer;
                }
            }
            if (simpleCompare(haystack, needle, x, y, maxdif) != Infinity) {
                r.push({ x, y });
                if (r.length > maxresults) {
                    return r;
                }
            }
        }
    }
    return r;
}
/**
* Compares two images and returns the average color difference per pixel between them
* @param max The max color difference at any point in the image before short circuiting the function and returning Infinity. set to -1 to always continue.
* @returns The average color difference per pixel or Infinity if the difference is more than max at any point in the image
*/
function simpleCompare(bigbuf, checkbuf, x, y, max = 30) {
    if (x < 0 || y < 0) {
        throw new RangeError();
    }
    if (x + checkbuf.width > bigbuf.width || y + checkbuf.height > bigbuf.height) {
        throw new RangeError();
    }
    if (max == -1) {
        max = 255 * 4;
    }
    var dif = 0;
    for (var step = 8; step >= 1; step /= 2) {
        for (var cx = 0; cx < checkbuf.width; cx += step) {
            for (var cy = 0; cy < checkbuf.height; cy += step) {
                var i1 = (x + cx) * 4 + (y + cy) * bigbuf.width * 4;
                var i2 = cx * 4 + cy * checkbuf.width * 4;
                var d = 0;
                d = d + Math.abs(bigbuf.data[i1 + 0] - checkbuf.data[i2 + 0]) | 0;
                d = d + Math.abs(bigbuf.data[i1 + 1] - checkbuf.data[i2 + 1]) | 0;
                d = d + Math.abs(bigbuf.data[i1 + 2] - checkbuf.data[i2 + 2]) | 0;
                d *= checkbuf.data[i2 + 3] / 255;
                if (step == 1) {
                    dif += d;
                }
                if (d > max) {
                    return Infinity;
                }
            }
        }
    }
    return dif / checkbuf.width / checkbuf.height;
}
/**
* Calculates the root mean square error between the two buffers at the given coordinate, this method can be used in situations with significant blur or
* transparency, it does not bail early on non-matching images like simpleCompare does so it can be expected to be much slower when called often.
* @returns The root mean square error beteen the images, high single pixel errors are penalized more than consisten low errors. return of 0 means perfect match.
*/
function simpleCompareRMSE(bigbuf, checkbuf, x, y) {
    if (x < 0 || y < 0) {
        throw new RangeError();
    }
    if (x + checkbuf.width > bigbuf.width || y + checkbuf.height > bigbuf.height) {
        throw new RangeError();
    }
    var dif = 0;
    var numpix = 0;
    for (var cx = 0; cx < checkbuf.width; cx++) {
        for (var cy = 0; cy < checkbuf.height; cy++) {
            var i1 = (x + cx) * 4 + (y + cy) * bigbuf.width * 4;
            var i2 = cx * 4 + cy * checkbuf.width * 4;
            var d = 0;
            d = d + Math.abs(bigbuf.data[i1 + 0] - checkbuf.data[i2 + 0]) | 0;
            d = d + Math.abs(bigbuf.data[i1 + 1] - checkbuf.data[i2 + 1]) | 0;
            d = d + Math.abs(bigbuf.data[i1 + 2] - checkbuf.data[i2 + 2]) | 0;
            var weight = checkbuf.data[i2 + 3] / 255;
            numpix += weight;
            dif += d * d * weight;
        }
    }
    return Math.sqrt(dif / numpix);
}
/**
* Returns the difference between two colors (scaled to the alpha of the second color)
*/
function coldif(r1, g1, b1, r2, g2, b2, a2) {
    return (Math.abs(r1 - r2) + Math.abs(g1 - g2) + Math.abs(b1 - b2)) * a2 / 255; //only applies alpha for 2nd buffer!
}
/**
 * Turns map of promises into a map that contains the resolved values after loading.
 * @param input
 */
function asyncMap(input) {
    var raw = {};
    var promises = [];
    for (var a in input) {
        if (input.hasOwnProperty(a)) {
            raw[a] = null;
            promises.push(input[a].then(function (a, i) { raw[a] = i; r[a] = i; }.bind(null, a)));
        }
    }
    var r = {};
    var promise = Promise.all(promises).then(() => { r.loaded = true; return r; });
    Object.defineProperty(r, "loaded", { enumerable: false, value: false, writable: true });
    Object.defineProperty(r, "promise", { enumerable: false, value: promise });
    Object.defineProperty(r, "raw", { enumerable: false, value: raw });
    return Object.assign(r, raw);
}
/**
* Same as asyncMap, but casts the properties to ImageData in typescript
*/
function webpackImages(input) {
    return asyncMap(input);
}
class ImageDataSet {
    constructor() {
        this.buffers = [];
    }
    matchBest(img, x, y, max) {
        let best = null;
        let bestscore = max;
        for (let a = 0; a < this.buffers.length; a++) {
            let score = img.pixelCompare(this.buffers[a], x, y, bestscore);
            if (isFinite(score) && (bestscore == undefined || score < bestscore)) {
                bestscore = score;
                best = a;
            }
        }
        if (best == null) {
            return null;
        }
        return { index: best, score: bestscore };
    }
    static fromFilmStrip(baseimg, width) {
        if ((baseimg.width % width) != 0) {
            throw new Error("slice size does not fit in base img");
        }
        let r = new ImageDataSet();
        for (let x = 0; x < baseimg.width; x += width) {
            r.buffers.push(baseimg.clone(new _index_js__WEBPACK_IMPORTED_MODULE_3__.Rect(x, 0, width, baseimg.height)));
        }
        return r;
    }
    static fromFilmStripUneven(baseimg, widths) {
        let r = new ImageDataSet();
        let x = 0;
        for (let w of widths) {
            r.buffers.push(baseimg.clone(new _index_js__WEBPACK_IMPORTED_MODULE_3__.Rect(x, 0, w, baseimg.height)));
            x += w;
            if (x > baseimg.width) {
                throw new Error("sampling filmstrip outside bounds");
            }
        }
        if (x != baseimg.width) {
            throw new Error("unconsumed pixels left in film strip imagedata");
        }
        return r;
    }
    static fromAtlas(baseimg, slices) {
        let r = new ImageDataSet();
        for (let slice of slices) {
            r.buffers.push(baseimg.clone(slice));
        }
        return r;
    }
}


/***/ }),

/***/ "../node_modules/.pnpm/@alt1+base@1.0.0-alpha.7/node_modules/@alt1/base/dist/imgref.js":
/*!*********************************************************************************************!*\
  !*** ../node_modules/.pnpm/@alt1+base@1.0.0-alpha.7/node_modules/@alt1/base/dist/imgref.js ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ImgRef: () => (/* binding */ ImgRef),
/* harmony export */   ImgRefBind: () => (/* binding */ ImgRefBind),
/* harmony export */   ImgRefCtx: () => (/* binding */ ImgRefCtx),
/* harmony export */   ImgRefData: () => (/* binding */ ImgRefData)
/* harmony export */ });
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ "../node_modules/.pnpm/@alt1+base@1.0.0-alpha.7/node_modules/@alt1/base/dist/index.js");

/**
 * Represents an image that might be in different types of memory
 * This is mostly used to represent images still in Alt1 memory that have
 * not been transfered to js yet. Various a1lib api's use this type and
 * choose the most efficient approach based on the memory type
 */
class ImgRef {
    constructor(x, y, w, h) {
        this.t = "none";
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
    }
    read(x = 0, y = 0, w = this.width, h = this.height) {
        throw new Error("This imgref (" + this.t + ") does not support toData");
    }
    findSubimage(needle, sx = 0, sy = 0, w = this.width, h = this.height) {
        return _index_js__WEBPACK_IMPORTED_MODULE_0__.ImageDetect.findSubimage(this, needle, sx, sy, w, h);
    }
    toData(x = this.x, y = this.y, w = this.width, h = this.height) {
        return this.read(x - this.x, y - this.y, w, h);
    }
    ;
    containsArea(rect) {
        return this.x <= rect.x && this.y <= rect.y && this.x + this.width >= rect.x + rect.width && this.y + this.height >= rect.y + rect.height;
    }
}
/**
 * Represents an image in js render memory (canvas/image tag)
 */
class ImgRefCtx extends ImgRef {
    constructor(img, x = 0, y = 0) {
        if (img instanceof CanvasRenderingContext2D) {
            super(x, y, img.canvas.width, img.canvas.height);
            this.ctx = img;
        }
        else {
            super(x, y, img.width, img.height);
            var cnv = (img instanceof HTMLCanvasElement ? img : img.toCanvas());
            this.ctx = cnv.getContext("2d");
        }
        this.t = "ctx";
    }
    read(x = 0, y = 0, w = this.width, h = this.height) {
        return this.ctx.getImageData(x, y, w, h);
    }
}
/**
 * Represents in image in Alt1 memory, This type of image can be searched for subimages
 * very efficiently and transfering the full image to js can be avoided this way
 */
class ImgRefBind extends ImgRef {
    constructor(handle, x = 0, y = 0, w = 0, h = 0) {
        super(x, y, w, h);
        this.handle = handle;
        this.t = "bind";
    }
    read(x = 0, y = 0, w = this.width, h = this.height) {
        return (0,_index_js__WEBPACK_IMPORTED_MODULE_0__.transferImageData)(this.handle, x, y, w, h);
    }
}
/**
 * Represents an image in js memory
 */
class ImgRefData extends ImgRef {
    constructor(buf, x = 0, y = 0) {
        super(x, y, buf.width, buf.height);
        this.buf = buf;
        this.t = "data";
    }
    read(x = 0, y = 0, w = this.width, h = this.height) {
        if (x == 0 && y == 0 && w == this.width && h == this.height) {
            return this.buf;
        }
        var r = new ImageData(w, h);
        for (var b = y; b < y + h; b++) {
            for (var a = x; a < x + w; a++) {
                var i1 = (a - x) * 4 + (b - y) * w * 4;
                var i2 = a * 4 + b * 4 * this.buf.width;
                r.data[i1] = this.buf.data[i2];
                r.data[i1 + 1] = this.buf.data[i2 + 1];
                r.data[i1 + 2] = this.buf.data[i2 + 2];
                r.data[i1 + 3] = this.buf.data[i2 + 3];
            }
        }
        return r;
    }
}


/***/ }),

/***/ "../node_modules/.pnpm/@alt1+base@1.0.0-alpha.7/node_modules/@alt1/base/dist/index.js":
/*!********************************************************************************************!*\
  !*** ../node_modules/.pnpm/@alt1+base@1.0.0-alpha.7/node_modules/@alt1/base/dist/index.js ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Alt1Error: () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.Alt1Error),
/* harmony export */   ImageData: () => (/* reexport safe */ _imagedata_extensions_js__WEBPACK_IMPORTED_MODULE_4__.ImageData),
/* harmony export */   ImageDetect: () => (/* reexport module object */ _imagedetect_js__WEBPACK_IMPORTED_MODULE_1__),
/* harmony export */   ImageStreamReader: () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.ImageStreamReader),
/* harmony export */   ImgRef: () => (/* reexport safe */ _imgref_js__WEBPACK_IMPORTED_MODULE_6__.ImgRef),
/* harmony export */   ImgRefBind: () => (/* reexport safe */ _imgref_js__WEBPACK_IMPORTED_MODULE_6__.ImgRefBind),
/* harmony export */   ImgRefCtx: () => (/* reexport safe */ _imgref_js__WEBPACK_IMPORTED_MODULE_6__.ImgRefCtx),
/* harmony export */   ImgRefData: () => (/* reexport safe */ _imgref_js__WEBPACK_IMPORTED_MODULE_6__.ImgRefData),
/* harmony export */   NoAlt1Error: () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.NoAlt1Error),
/* harmony export */   NodePolyfill: () => (/* reexport module object */ _nodepolyfill_js__WEBPACK_IMPORTED_MODULE_5__),
/* harmony export */   PasteInput: () => (/* reexport module object */ _pasteinput_js__WEBPACK_IMPORTED_MODULE_2__),
/* harmony export */   Rect: () => (/* reexport safe */ _rect_js__WEBPACK_IMPORTED_MODULE_3__["default"]),
/* harmony export */   addResizeElement: () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.addResizeElement),
/* harmony export */   capture: () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.capture),
/* harmony export */   captureAsync: () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.captureAsync),
/* harmony export */   captureHold: () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.captureHold),
/* harmony export */   captureHoldFullRs: () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.captureHoldFullRs),
/* harmony export */   captureHoldScreen: () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.captureHoldScreen),
/* harmony export */   captureMultiAsync: () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.captureMultiAsync),
/* harmony export */   captureStream: () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.captureStream),
/* harmony export */   decodeImageString: () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.decodeImageString),
/* harmony export */   encodeImageString: () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.encodeImageString),
/* harmony export */   getMousePosition: () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.getMousePosition),
/* harmony export */   getdisplaybounds: () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.getdisplaybounds),
/* harmony export */   hasAlt1: () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.hasAlt1),
/* harmony export */   hasAlt1Version: () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.hasAlt1Version),
/* harmony export */   identifyApp: () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.identifyApp),
/* harmony export */   mixColor: () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.mixColor),
/* harmony export */   newestversion: () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.newestversion),
/* harmony export */   on: () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.on),
/* harmony export */   once: () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.once),
/* harmony export */   openbrowser: () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.openbrowser),
/* harmony export */   removeListener: () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.removeListener),
/* harmony export */   requireAlt1: () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.requireAlt1),
/* harmony export */   resetEnvironment: () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.resetEnvironment),
/* harmony export */   skinName: () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.skinName),
/* harmony export */   transferImageData: () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.transferImageData),
/* harmony export */   unmixColor: () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.unmixColor)
/* harmony export */ });
/* harmony import */ var _declarations_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./declarations.js */ "../node_modules/.pnpm/@alt1+base@1.0.0-alpha.7/node_modules/@alt1/base/dist/declarations.js");
/* harmony import */ var _declarations_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_declarations_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _imagedetect_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./imagedetect.js */ "../node_modules/.pnpm/@alt1+base@1.0.0-alpha.7/node_modules/@alt1/base/dist/imagedetect.js");
/* harmony import */ var _pasteinput_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pasteinput.js */ "../node_modules/.pnpm/@alt1+base@1.0.0-alpha.7/node_modules/@alt1/base/dist/pasteinput.js");
/* harmony import */ var _rect_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./rect.js */ "../node_modules/.pnpm/@alt1+base@1.0.0-alpha.7/node_modules/@alt1/base/dist/rect.js");
/* harmony import */ var _imagedata_extensions_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./imagedata-extensions.js */ "../node_modules/.pnpm/@alt1+base@1.0.0-alpha.7/node_modules/@alt1/base/dist/imagedata-extensions.js");
/* harmony import */ var _nodepolyfill_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./nodepolyfill.js */ "../node_modules/.pnpm/@alt1+base@1.0.0-alpha.7/node_modules/@alt1/base/dist/nodepolyfill.js");
/* harmony import */ var _imgref_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./imgref.js */ "../node_modules/.pnpm/@alt1+base@1.0.0-alpha.7/node_modules/@alt1/base/dist/imgref.js");
/* harmony import */ var _wrapper_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./wrapper.js */ "../node_modules/.pnpm/@alt1+base@1.0.0-alpha.7/node_modules/@alt1/base/dist/wrapper.js");










/***/ }),

/***/ "../node_modules/.pnpm/@alt1+base@1.0.0-alpha.7/node_modules/@alt1/base/dist/nodepolyfill.js":
/*!***************************************************************************************************!*\
  !*** ../node_modules/.pnpm/@alt1+base@1.0.0-alpha.7/node_modules/@alt1/base/dist/nodepolyfill.js ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createCanvas: () => (/* binding */ createCanvas),
/* harmony export */   imageDataFromBase64: () => (/* binding */ imageDataFromBase64),
/* harmony export */   imageDataFromBuffer: () => (/* binding */ imageDataFromBuffer),
/* harmony export */   imageDataToDrawable: () => (/* binding */ imageDataToDrawable),
/* harmony export */   imageDataToFileBytes: () => (/* binding */ imageDataToFileBytes),
/* harmony export */   polyfillRequire: () => (/* binding */ polyfillRequire),
/* harmony export */   requireElectronCommon: () => (/* binding */ requireElectronCommon),
/* harmony export */   requireNodeCanvas: () => (/* binding */ requireNodeCanvas),
/* harmony export */   requireSharp: () => (/* binding */ requireSharp)
/* harmony export */ });
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ "../node_modules/.pnpm/@alt1+base@1.0.0-alpha.7/node_modules/@alt1/base/dist/index.js");
/* harmony import */ var _imagedetect_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./imagedetect.js */ "../node_modules/.pnpm/@alt1+base@1.0.0-alpha.7/node_modules/@alt1/base/dist/imagedetect.js");
//nodejs and electron polyfills for web api's
//commented out type info as that breaks webpack with optional dependencies
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


var requirefunction = null;
/**
 * Call this function to let the libs require extra dependencies on nodejs in order
 * to polyfill some browser api's (mostly image compression/decompression)
 * `NodePolifill.polyfillRequire(require);` should solve most cases
 */
function polyfillRequire(requirefn) {
    requirefunction = requirefn;
}
function requireSharp() {
    try {
        if (requirefunction) {
            return requirefunction("sharp");
        }
        else {
            return require(/* webpackIgnore: true */ "sharp"); // as typeof import("sharp");
        }
    }
    catch (e) { }
    return null;
}
function requireNodeCanvas() {
    //attempt to require sharp first, after loading canvas the module sharp fails to load
    requireSharp();
    try {
        if (requirefunction) {
            return requirefunction("canvas");
        }
        else {
            return require(/* webpackIgnore: true */ "canvas"); // as typeof import("sharp");
        }
    }
    catch (e) { }
    return null;
}
function requireElectronCommon() {
    try {
        if (requirefunction) {
            return requirefunction("electron/common");
        }
        else {
            return require(/* webpackIgnore: true */ "electron/common");
        }
    }
    catch (e) { }
    return null;
}
function imageDataToDrawable(buf) {
    let nodecnv = requireNodeCanvas();
    if (!nodecnv) {
        throw new Error("couldn't find built-in canvas or the module 'canvas'");
    }
    return new nodecnv.ImageData(buf.data, buf.width, buf.height);
}
function createCanvas(w, h) {
    let nodecnv = requireNodeCanvas();
    if (!nodecnv) {
        throw new Error("couldn't find built-in canvas or the module 'canvas'");
    }
    return nodecnv.createCanvas(w, h);
}
function flipBGRAtoRGBA(data) {
    for (let i = 0; i < data.length; i += 4) {
        let tmp = data[i + 2];
        data[i + 2] = data[i + 0];
        data[i + 0] = tmp;
    }
}
function imageDataToFileBytes(buf, format, quality) {
    return __awaiter(this, void 0, void 0, function* () {
        //use the electron API if we're in electron
        var electronCommon;
        var sharp;
        if (electronCommon = requireElectronCommon()) {
            let nativeImage = electronCommon.nativeImage;
            //need to copy the buffer in order to flip it without destroying the original
            let bufcpy = Buffer.from(buf.data.slice(buf.data.byteOffset, buf.data.byteLength));
            flipBGRAtoRGBA(bufcpy);
            let nativeimg = nativeImage.createFromBitmap(bufcpy, { width: buf.width, height: buf.height });
            return nativeimg.toPNG();
        }
        else if (sharp = requireSharp()) {
            let img = sharp(Buffer.from(buf.data.buffer), { raw: { width: buf.width, height: buf.height, channels: 4 } });
            if (format == "image/png") {
                img.png();
            }
            else if (format == "image/webp") {
                var opts = { quality: 80 };
                if (typeof quality == "number") {
                    opts.quality = quality * 100;
                }
                img.webp(opts);
            }
            else {
                throw new Error("unknown image format: " + format);
            }
            return yield img.toBuffer({ resolveWithObject: false }).buffer;
        }
        throw new Error("coulnd't find build-in image compression methods or the module 'electron/common' or 'sharp'");
    });
}
function imageDataFromBase64(base64) {
    return imageDataFromBuffer(Buffer.from(base64, "base64"));
}
function imageDataFromBuffer(buffer) {
    return __awaiter(this, void 0, void 0, function* () {
        (0,_imagedetect_js__WEBPACK_IMPORTED_MODULE_1__.clearPngColorspace)(buffer);
        //use the electron API if we're in electron
        var electronCommon;
        var nodecnv;
        if (electronCommon = requireElectronCommon()) {
            let nativeImage = electronCommon.nativeImage;
            let img = nativeImage.createFromBuffer(buffer);
            let pixels = img.toBitmap();
            let size = img.getSize();
            let pixbuf = new Uint8ClampedArray(pixels.buffer, pixels.byteOffset, pixels.byteLength);
            flipBGRAtoRGBA(pixbuf);
            return new _index_js__WEBPACK_IMPORTED_MODULE_0__.ImageData(pixbuf, size.width, size.height);
        }
        else if (nodecnv = requireNodeCanvas()) {
            return new Promise((done, err) => {
                let img = new nodecnv.Image();
                img.onerror = err;
                img.onload = () => {
                    var cnv = nodecnv.createCanvas(img.naturalWidth, img.naturalHeight);
                    var ctx = cnv.getContext("2d");
                    ctx.drawImage(img, 0, 0);
                    var data = ctx.getImageData(0, 0, img.naturalWidth, img.naturalHeight);
                    //use our own class
                    done(new _index_js__WEBPACK_IMPORTED_MODULE_0__.ImageData(data.data, data.width, data.height));
                };
                img.src = Buffer.from(buffer.buffer, buffer.byteOffset, buffer.byteLength);
            });
        }
        throw new Error("couldn't find built-in canvas, module 'electron/common' or the module 'canvas'");
    });
}


/***/ }),

/***/ "../node_modules/.pnpm/@alt1+base@1.0.0-alpha.7/node_modules/@alt1/base/dist/pasteinput.js":
/*!*************************************************************************************************!*\
  !*** ../node_modules/.pnpm/@alt1+base@1.0.0-alpha.7/node_modules/@alt1/base/dist/pasteinput.js ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fileDialog: () => (/* binding */ fileDialog),
/* harmony export */   lastref: () => (/* binding */ lastref),
/* harmony export */   listen: () => (/* binding */ listen),
/* harmony export */   start: () => (/* binding */ start),
/* harmony export */   startDragNDrop: () => (/* binding */ startDragNDrop),
/* harmony export */   triggerPaste: () => (/* binding */ triggerPaste),
/* harmony export */   unlisten: () => (/* binding */ unlisten)
/* harmony export */ });
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ "../node_modules/.pnpm/@alt1+base@1.0.0-alpha.7/node_modules/@alt1/base/dist/index.js");
/* harmony import */ var _imagedetect_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./imagedetect.js */ "../node_modules/.pnpm/@alt1+base@1.0.0-alpha.7/node_modules/@alt1/base/dist/imagedetect.js");


var listeners = [];
var started = false;
var dndStarted = false;
var pasting = false;
var lastref = null;
function listen(func, errorfunc, dragndrop) {
    listeners.push({ cb: func, error: errorfunc });
    if (!started) {
        start();
    }
    if (dragndrop && !dndStarted) {
        startDragNDrop();
    }
}
function unlisten(func) {
    let i = listeners.findIndex(c => c.cb == func);
    if (i != -1) {
        listeners.splice(i, 1);
    }
}
/**
 * currently used in multiple document situations (iframe), might be removed in the future
 */
function triggerPaste(img) {
    lastref = img;
    for (var a in listeners) {
        listeners[a].cb(lastref);
    }
}
function pasted(img) {
    pasting = false;
    let cnv = img instanceof HTMLCanvasElement ? img : img.toCanvas();
    triggerPaste(new _index_js__WEBPACK_IMPORTED_MODULE_0__.ImgRefCtx(cnv));
}
function error(error, mes) {
    var _a, _b;
    pasting = false;
    for (var a in listeners) {
        (_b = (_a = listeners[a]).error) === null || _b === void 0 ? void 0 : _b.call(_a, mes, error);
    }
}
function startDragNDrop() {
    var getitem = function (items) {
        var foundimage = "";
        for (var a = 0; a < items.length; a++) {
            var item = items[a];
            var m = item.type.match(/^image\/(\w+)$/);
            if (m) {
                if (m[1] == "png") {
                    return item;
                }
                else {
                    foundimage = m[1];
                }
            }
        }
        if (foundimage) {
            error("notpng", "The image you uploaded is not a .png image. Other image type have compression noise and can't be used for image detection.");
        }
        return null;
    };
    window.addEventListener("dragover", function (e) {
        e.preventDefault();
    });
    window.addEventListener("drop", function (e) {
        if (!e.dataTransfer) {
            return;
        }
        var item = getitem(e.dataTransfer.items);
        e.preventDefault();
        if (!item) {
            return;
        }
        fromFile(item.getAsFile());
    });
}
function start() {
    if (started) {
        return;
    }
    started = true;
    //determine if we have a clipboard api
    //try{a=new Event("clipboard"); a="clipboardData" in a;}
    //catch(e){a=false;}
    var ischrome = !!navigator.userAgent.match(/Chrome/) && !navigator.userAgent.match(/Edge/);
    //old method breaks after chrome 41, revert to good old user agent sniffing
    //nvm, internet explorer (edge) decided that it wants to be chrome, however fails at delivering
    //turns out this one is interesting, edge is a hybrid between the paste api's
    var apipasted = function (e) {
        if (!e.clipboardData) {
            return;
        }
        for (var a = 0; a < e.clipboardData.items.length; a++) { //loop all data types
            if (e.clipboardData.items[a].type.indexOf("image") != -1) {
                var file = e.clipboardData.items[a].getAsFile();
                var img = new Image();
                img.src = (window.URL || window.webkitURL).createObjectURL(file);
                if (img.width > 0) {
                    pasted(img);
                }
                else {
                    img.onload = function () { pasted(img); };
                }
            }
        }
    };
    if (ischrome) {
        document.addEventListener("paste", apipasted);
    }
    else {
        var catcher = document.createElement("div");
        catcher.setAttribute("contenteditable", "");
        catcher.className = "forcehidden"; //retarded ie safety/bug, cant apply styles using js//TODO i don't even know what's going on
        catcher.onpaste = function (e) {
            if (e.clipboardData && e.clipboardData.items) {
                apipasted(e);
                return;
            }
            setTimeout(function () {
                var b = catcher.children[0];
                if (!b || b.tagName != "IMG") {
                    return;
                }
                var img = new Image();
                img.src = b.src;
                var a = img.src.match(/^data:([\w\/]+);/);
                if (img.width > 0) {
                    pasted(img);
                }
                else {
                    img.onload = function () { pasted(img); };
                }
                catcher.innerHTML = "";
            }, 1);
        };
        document.body.appendChild(catcher);
    }
    //detect if ctrl-v is pressed and focus catcher if needed
    document.addEventListener("keydown", function (e) {
        if (e.target.tagName == "INPUT") {
            return;
        }
        if (e.keyCode != "V".charCodeAt(0) || !e.ctrlKey) {
            return;
        }
        pasting = true;
        setTimeout(function () {
            if (pasting) {
                error("noimg", "You pressed Ctrl+V, but no image was pasted by your browser, make sure your clipboard contains an image, and not a link to an image.");
            }
        }, 1000);
        if (catcher) {
            catcher.focus();
        }
    });
}
function fileDialog() {
    var fileinput = document.createElement("input");
    fileinput.type = "file";
    fileinput.accept = "image/png";
    fileinput.onchange = function () { if (fileinput.files && fileinput.files[0]) {
        fromFile(fileinput.files[0]);
    } };
    fileinput.click();
    return fileinput;
}
function fromFile(file) {
    if (!file) {
        return;
    }
    var reader = new FileReader();
    reader.onload = function () {
        var bytearray = new Uint8Array(reader.result);
        if (_imagedetect_js__WEBPACK_IMPORTED_MODULE_1__.isPngBuffer(bytearray)) {
            _imagedetect_js__WEBPACK_IMPORTED_MODULE_1__.clearPngColorspace(bytearray);
        }
        var blob = new Blob([bytearray], { type: "image/png" });
        var img = new Image();
        img.onerror = () => error("invalidfile", "The file you uploaded could not be opened as an image.");
        var bloburl = URL.createObjectURL(blob);
        img.src = bloburl;
        if (img.width > 0) {
            pasted(img);
            URL.revokeObjectURL(bloburl);
        }
        else {
            img.onload = function () { pasted(img); URL.revokeObjectURL(bloburl); };
        }
    };
    reader.readAsArrayBuffer(file);
}


/***/ }),

/***/ "../node_modules/.pnpm/@alt1+base@1.0.0-alpha.7/node_modules/@alt1/base/dist/rect.js":
/*!*******************************************************************************************!*\
  !*** ../node_modules/.pnpm/@alt1+base@1.0.0-alpha.7/node_modules/@alt1/base/dist/rect.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Rect)
/* harmony export */ });
//util class for rectangle maths
//TODO shit this sucks can we remove it again?
//more of a shorthand to get {x,y,width,height} than a class
//kinda starting to like it again
//TODO remove rant
;
/**
 * Simple rectangle class with some util functions
 */
class Rect {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
    }
    static fromArgs(...args) {
        if (typeof args[0] == "object") {
            return new Rect(args[0].x, args[0].y, args[0].width, args[0].height);
        }
        else if (typeof args[0] == "number" && args.length >= 4) {
            return new Rect(args[0], args[1], args[2], args[3]);
        }
        else {
            throw new Error("invalid rect args");
        }
    }
    /**
     * Resizes this Rect to include the full size of a given second rectangle
     */
    union(r2) {
        var x = Math.min(this.x, r2.x);
        var y = Math.min(this.y, r2.y);
        this.width = Math.max(this.x + this.width, r2.x + r2.width) - x;
        this.height = Math.max(this.y + this.height, r2.y + r2.height) - y;
        this.x = x;
        this.y = y;
        return this;
    }
    /**
     * Resizes this Rect to include a given point
     */
    includePoint(x, y) {
        this.union(new Rect(x, y, 0, 0));
    }
    /**
     * Grows the rectangle with the given dimensions
     */
    inflate(w, h) {
        this.x -= w;
        this.y -= h;
        this.width += 2 * w;
        this.height += 2 * h;
    }
    /**
     * Resizes this Rect to the area that overlaps a given Rect
     * width and height will be set to 0 if the intersection does not exist
     */
    intersect(r2) {
        if (this.x < r2.x) {
            this.width -= r2.x - this.x;
            this.x = r2.x;
        }
        if (this.y < r2.y) {
            this.height -= r2.y - this.y;
            this.y = r2.y;
        }
        this.width = Math.min(this.x + this.width, r2.x + r2.width) - this.x;
        this.height = Math.min(this.y + this.height, r2.y + r2.height) - this.y;
        if (this.width <= 0 || this.height <= 0) {
            this.width = 0;
            this.height = 0;
        }
    }
    /**
     * Returns wether this Rect has at least one pixel overlap with a given Rect
     */
    overlaps(r2) {
        return this.x < r2.x + r2.width && this.x + this.width > r2.x && this.y < r2.y + r2.height && this.y + this.height > r2.y;
    }
    /**
     * Returns wether a given Rect fits completely inside this Rect
     * @param r2
     */
    contains(r2) {
        return this.x <= r2.x && this.x + this.width >= r2.x + r2.width && this.y <= r2.y && this.y + this.height >= r2.y + r2.height;
    }
    /**
     * Returns wether a given point lies inside this Rect
     */
    containsPoint(x, y) {
        return this.x <= x && this.x + this.width > x && this.y <= y && this.y + this.height > y;
    }
}


/***/ }),

/***/ "../node_modules/.pnpm/@alt1+base@1.0.0-alpha.7/node_modules/@alt1/base/dist/wrapper.js":
/*!**********************************************************************************************!*\
  !*** ../node_modules/.pnpm/@alt1+base@1.0.0-alpha.7/node_modules/@alt1/base/dist/wrapper.js ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Alt1Error: () => (/* binding */ Alt1Error),
/* harmony export */   ImageStreamReader: () => (/* binding */ ImageStreamReader),
/* harmony export */   NoAlt1Error: () => (/* binding */ NoAlt1Error),
/* harmony export */   addResizeElement: () => (/* binding */ addResizeElement),
/* harmony export */   capture: () => (/* binding */ capture),
/* harmony export */   captureAsync: () => (/* binding */ captureAsync),
/* harmony export */   captureHold: () => (/* binding */ captureHold),
/* harmony export */   captureHoldFullRs: () => (/* binding */ captureHoldFullRs),
/* harmony export */   captureHoldScreen: () => (/* binding */ captureHoldScreen),
/* harmony export */   captureMultiAsync: () => (/* binding */ captureMultiAsync),
/* harmony export */   captureStream: () => (/* binding */ captureStream),
/* harmony export */   decodeImageString: () => (/* binding */ decodeImageString),
/* harmony export */   encodeImageString: () => (/* binding */ encodeImageString),
/* harmony export */   getMousePosition: () => (/* binding */ getMousePosition),
/* harmony export */   getdisplaybounds: () => (/* binding */ getdisplaybounds),
/* harmony export */   hasAlt1: () => (/* binding */ hasAlt1),
/* harmony export */   hasAlt1Version: () => (/* binding */ hasAlt1Version),
/* harmony export */   identifyApp: () => (/* binding */ identifyApp),
/* harmony export */   mixColor: () => (/* binding */ mixColor),
/* harmony export */   newestversion: () => (/* binding */ newestversion),
/* harmony export */   on: () => (/* binding */ on),
/* harmony export */   once: () => (/* binding */ once),
/* harmony export */   openbrowser: () => (/* binding */ openbrowser),
/* harmony export */   removeListener: () => (/* binding */ removeListener),
/* harmony export */   requireAlt1: () => (/* binding */ requireAlt1),
/* harmony export */   resetEnvironment: () => (/* binding */ resetEnvironment),
/* harmony export */   skinName: () => (/* binding */ skinName),
/* harmony export */   transferImageData: () => (/* binding */ transferImageData),
/* harmony export */   unmixColor: () => (/* binding */ unmixColor)
/* harmony export */ });
/* harmony import */ var _rect_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rect.js */ "../node_modules/.pnpm/@alt1+base@1.0.0-alpha.7/node_modules/@alt1/base/dist/rect.js");
/* harmony import */ var _imgref_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./imgref.js */ "../node_modules/.pnpm/@alt1+base@1.0.0-alpha.7/node_modules/@alt1/base/dist/imgref.js");
/* harmony import */ var _imagedata_extensions_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./imagedata-extensions.js */ "../node_modules/.pnpm/@alt1+base@1.0.0-alpha.7/node_modules/@alt1/base/dist/imagedata-extensions.js");
/* harmony import */ var _alt1api_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./alt1api.js */ "../node_modules/.pnpm/@alt1+base@1.0.0-alpha.7/node_modules/@alt1/base/dist/alt1api.js");
/* harmony import */ var _alt1api_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_alt1api_js__WEBPACK_IMPORTED_MODULE_3__);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};




/**
 * Thrown when a method is called that can not be used outside of Alt1
 */
class NoAlt1Error extends Error {
    constructor() {
        super();
        this.message = "This method can not be ran outside of Alt1";
    }
}
;
/**
 * Thrown when the Alt1 API returns an invalid result
 * Errors of a different type are throw when internal Alt1 errors occur
 */
class Alt1Error extends Error {
}
/**
 * The latest Alt1 version
 */
var newestversion = "1.5.5";
/**
 * Whether the Alt1 API is available
 */
var hasAlt1 = (typeof alt1 != "undefined");
/**
 * The name of the Alt1 interface skin. (Always "default" if running in a browser)
 */
var skinName = hasAlt1 ? alt1.skinName : "default";
/**
 * Max number of bytes that can be sent by alt1 in one function
 * Not completely sure why this number is different than window.alt1.maxtranfer
 */
var maxtransfer = 4000000;
/**
 * Open a link in the default browser
 * @deprecated use window.open instead
 */
function openbrowser(url) {
    if (hasAlt1) {
        alt1.openBrowser(url);
    }
    else {
        window.open(url, '_blank');
    }
}
/**
 * Throw if Alt1 API is not available
 */
function requireAlt1() {
    if (!hasAlt1) {
        throw new NoAlt1Error();
    }
}
/**
 * Returns an object with a rectangle that spans all screens
 */
function getdisplaybounds() {
    if (!hasAlt1) {
        return false;
    }
    return new _rect_js__WEBPACK_IMPORTED_MODULE_0__["default"](alt1.screenX, alt1.screenY, alt1.screenWidth, alt1.screenHeight);
}
/**
 * gets an imagebuffer with pixel data about the requested region
 */
function capture(...args) {
    //TODO change null return on error into throw instead (x3)
    if (!hasAlt1) {
        throw new NoAlt1Error();
    }
    var rect = _rect_js__WEBPACK_IMPORTED_MODULE_0__["default"].fromArgs(...args);
    if (alt1.capture) {
        return new _imagedata_extensions_js__WEBPACK_IMPORTED_MODULE_2__.ImageData(alt1.capture(rect.x, rect.y, rect.width, rect.height), rect.width, rect.height);
    }
    var buf = new _imagedata_extensions_js__WEBPACK_IMPORTED_MODULE_2__.ImageData(rect.width, rect.height);
    if (rect.width * rect.height * 4 <= maxtransfer) {
        var data = alt1.getRegion(rect.x, rect.y, rect.width, rect.height);
        if (!data) {
            return null;
        }
        decodeImageString(data, buf, 0, 0, rect.width, rect.height);
    }
    else {
        //split up the request to to exceed the single transfer limit (for now)
        var x1 = rect.x;
        var ref = alt1.bindRegion(rect.x, rect.y, rect.width, rect.height);
        if (ref <= 0) {
            return null;
        }
        while (x1 < rect.x + rect.width) {
            var x2 = Math.min(rect.x + rect.width, Math.floor(x1 + (maxtransfer / 4 / rect.height)));
            var data = alt1.bindGetRegion(ref, x1, rect.y, x2 - x1, rect.height);
            if (!data) {
                return null;
            }
            decodeImageString(data, buf, x1 - rect.x, 0, x2 - x1, rect.height);
            x1 = x2;
        }
    }
    return buf;
}
/**
 * Makes alt1 bind an area of the rs client in memory without sending it to the js client
 * returns an imgref object which can be used to get pixel data using the imgreftobuf function
 * currently only one bind can exist per app and the ref in (v) will always be 1
 */
function captureHold(x, y, w, h) {
    x = Math.round(x);
    y = Math.round(y);
    w = Math.round(w);
    h = Math.round(h);
    requireAlt1();
    var r = alt1.bindRegion(x, y, w, h);
    if (r <= 0) {
        throw new Alt1Error("capturehold failed");
    }
    return new _imgref_js__WEBPACK_IMPORTED_MODULE_1__.ImgRefBind(r, x, y, w, h);
}
/**
 * Same as captureHoldRegion, but captures the screen instead of the rs client. it also uses screen coordinates instead and can capture outside of the rs client
 */
function captureHoldScreen(x, y, w, h) {
    x = Math.round(x);
    y = Math.round(y);
    w = Math.round(w);
    h = Math.round(h);
    requireAlt1();
    var r = alt1.bindScreenRegion(x, y, w, h);
    if (r <= 0) {
        return false;
    }
    return new _imgref_js__WEBPACK_IMPORTED_MODULE_1__.ImgRefBind(r, x, y, w, h);
}
/**
 * bind the full rs window if the rs window can be detected by alt1, otherwise return the full screen
 */
function captureHoldFullRs() {
    return captureHold(0, 0, alt1.rsWidth, alt1.rsHeight);
}
/**
 * returns a subregion from a bound image
 * used internally in imgreftobuf if imgref is a bound image
 * @deprecated This should be handled internall by the imgrefbind.toData method
 */
function transferImageData(handle, x, y, w, h) {
    x = Math.round(x);
    y = Math.round(y);
    w = Math.round(w);
    h = Math.round(h);
    requireAlt1();
    if (alt1.bindGetRegionBuffer) {
        return new _imagedata_extensions_js__WEBPACK_IMPORTED_MODULE_2__.ImageData(alt1.bindGetRegionBuffer(handle, x, y, w, h), w, h);
    }
    var r = new _imagedata_extensions_js__WEBPACK_IMPORTED_MODULE_2__.ImageData(w, h);
    var x1 = x;
    while (true) { //split up the request to to exceed the single transfer limit (for now)
        var x2 = Math.min(x + w, Math.floor(x1 + (maxtransfer / 4 / h)));
        var a = alt1.bindGetRegion(handle, x1, y, x2 - x1, h);
        if (!a) {
            throw new Alt1Error();
        }
        decodeImageString(a, r, x1 - x, 0, x2 - x1, h);
        x1 = x2;
        if (x1 == x + w) {
            break;
        }
        ;
    }
    return r;
}
/**
 * decodes a returned string from alt1 to an imagebuffer
 */
function decodeImageString(imagestring, target, x, y, w, h) {
    var bin = atob(imagestring);
    var bytes = target.data;
    w |= 0;
    h |= 0;
    var offset = 4 * x + 4 * y * target.width;
    var target_width = target.width | 0;
    for (var a = 0; a < w; a++) {
        for (var b = 0; b < h; b++) {
            var i1 = (offset + (a * 4 | 0) + (b * target_width * 4 | 0)) | 0;
            var i2 = ((a * 4 | 0) + (b * 4 * w | 0)) | 0;
            bytes[i1 + 0 | 0] = bin.charCodeAt(i2 + 2 | 0); //fix weird red/blue swap in c#
            bytes[i1 + 1 | 0] = bin.charCodeAt(i2 + 1 | 0);
            bytes[i1 + 2 | 0] = bin.charCodeAt(i2 + 0 | 0);
            bytes[i1 + 3 | 0] = bin.charCodeAt(i2 + 3 | 0);
        }
    }
    return target;
}
/**
 * encodes an imagebuffer to a string
 */
function encodeImageString(buf, sx = 0, sy = 0, sw = buf.width, sh = buf.height) {
    var raw = "";
    for (var y = sy; y < sy + sh; y++) {
        for (var x = sx; x < sx + sw; x++) {
            var i = 4 * x + 4 * buf.width * y | 0;
            raw += String.fromCharCode(buf.data[i + 2 | 0]);
            raw += String.fromCharCode(buf.data[i + 1 | 0]);
            raw += String.fromCharCode(buf.data[i + 0 | 0]);
            raw += String.fromCharCode(buf.data[i + 3 | 0]);
        }
    }
    return btoa(raw);
}
/**
 * mixes the given color into a single int. This format is used by alt1
 */
function mixColor(r, g, b, a = 255) {
    return (b << 0) + (g << 8) + (r << 16) + (a << 24);
}
function unmixColor(col) {
    var r = (col >> 16) & 0xff;
    var g = (col >> 8) & 0xff;
    var b = (col >> 0) & 0xff;
    return [r, g, b];
}
function identifyApp(url) {
    if (hasAlt1) {
        alt1.identifyAppUrl(url);
    }
}
function resetEnvironment() {
    hasAlt1 = (typeof alt1 != "undefined");
    skinName = hasAlt1 ? alt1.skinName : "default";
}
function convertAlt1Version(str) {
    var a = str.match(/^(\d+)\.(\d+)\.(\d+)$/);
    if (!a) {
        throw new RangeError("Invalid version string");
    }
    return (+a[1]) * 1000 * 1000 + (+a[2]) * 1000 + (+a[3]) * 1;
}
var cachedVersionInt = -1;
/**
 * checks if alt1 is running and at least the given version. versionstr should be a string with the version eg: 1.3.2
 * @param versionstr
 */
function hasAlt1Version(versionstr) {
    if (!hasAlt1) {
        return false;
    }
    if (cachedVersionInt == -1) {
        cachedVersionInt = alt1.versionint;
    }
    return cachedVersionInt >= convertAlt1Version(versionstr);
}
/**
 * Gets the current cursor position in the game, returns null if the rs window is not active (alt1.rsActive)
 */
function getMousePosition() {
    var pos = alt1.mousePosition;
    if (pos == -1) {
        return null;
    }
    return { x: pos >>> 16, y: pos & 0xFFFF };
}
/**
 * Registers a given HTML element as a frame border, when this element is dragged by the user the Alt1 frame will resize accordingly
 * Use the direction arguements to make a given direction stick to the mouse. eg. Only set left to true to make the element behave as the left border
 * Or set all to true to move the whole window. Not all combinations are permitted
 */
function addResizeElement(el, left, top, right, bot) {
    if (!hasAlt1 || !alt1.userResize) {
        return;
    }
    el.addEventListener("mousedown", function (e) {
        alt1.userResize(left, top, right, bot);
        e.preventDefault();
    });
}
/**
 * Add an event listener
 */
function on(type, listener) {
    if (!hasAlt1) {
        return;
    }
    if (!alt1.events) {
        alt1.events = {};
    }
    if (!alt1.events[type]) {
        alt1.events[type] = [];
    }
    alt1.events[type].push(listener);
}
/**
 * Removes an event listener
 */
function removeListener(type, listener) {
    var elist = hasAlt1 && alt1.events && alt1.events[type];
    if (!elist) {
        return;
    }
    var i = elist.indexOf(listener);
    if (i == -1) {
        return;
    }
    elist.splice(i, 1);
}
/**
 * Listens for the event to fire once and then stops listening
 * @param event
 * @param cb
 */
function once(type, listener) {
    var fn = (e) => {
        removeListener(type, fn);
        listener(e);
    };
    on(type, fn);
}
;
/**
 * Used to read a set of images from a binary stream returned by the Alt1 API
 */
class ImageStreamReader {
    constructor(reader, ...args) {
        this.framebuffer = null;
        this.pos = 0;
        this.reading = false;
        this.closed = false;
        //paused state
        this.pausedindex = -1;
        this.pausedbuffer = null;
        this.streamreader = reader;
        if (args[0] instanceof _imagedata_extensions_js__WEBPACK_IMPORTED_MODULE_2__.ImageData) {
            this.setFrameBuffer(args[0]);
        }
        else if (typeof args[0] == "number") {
            this.setFrameBuffer(new _imagedata_extensions_js__WEBPACK_IMPORTED_MODULE_2__.ImageData(args[0], args[1]));
        }
    }
    /**
     *
     */
    setFrameBuffer(buffer) {
        if (this.reading) {
            throw new Error("can't change framebuffer while reading");
        }
        this.framebuffer = buffer;
    }
    /**
     * Closes the underlying stream and ends reading
     */
    close() {
        this.streamreader.cancel();
    }
    /**
     * Reads a single image from the stream
     */
    nextImage() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.reading) {
                throw new Error("already reading from this stream");
            }
            if (!this.framebuffer) {
                throw new Error("framebuffer not set");
            }
            this.reading = true;
            var synctime = -Date.now();
            var starttime = Date.now();
            var r = false;
            while (!r) {
                if (this.pausedindex != -1 && this.pausedbuffer) {
                    r = this.readChunk(this.pausedindex, this.framebuffer.data, this.pausedbuffer);
                }
                else {
                    synctime += Date.now();
                    var res = yield this.streamreader.read();
                    synctime -= Date.now();
                    if (res.done) {
                        throw new Error("Stream closed while reading");
                    }
                    var data = res.value;
                    r = this.readChunk(0, this.framebuffer.data, data);
                }
            }
            synctime += Date.now();
            //console.log("Decoded async image, " + this.framebuffer.width + "x" + this.framebuffer.height + " time: " + (Date.now() - starttime) + "ms (" + synctime + "ms main thread)");
            this.reading = false;
            return this.framebuffer;
        });
    }
    readChunk(i, framedata, buffer) {
        //very hot code, explicit int32 casting with |0 speeds it up by ~ x2
        i = i | 0;
        var framesize = framedata.length | 0;
        var pos = this.pos;
        var datalen = buffer.length | 0;
        //var data32 = new Float64Array(buffer.buffer);
        //var framedata32 = new Float64Array(framedata.buffer);
        //fix possible buffer misalignment
        //align to 16 for extra loop unrolling
        while (i < datalen) {
            //slow loop, fix alignment and other issues
            while (i < datalen && pos < framesize && (pos % 16 != 0 || !((i + 16 | 0) <= datalen && (pos + 16 | 0) <= framesize))) {
                var rel = pos;
                if (pos % 4 == 0) {
                    rel = rel + 2 | 0;
                }
                if (pos % 4 == 2) {
                    rel = rel - 2 | 0;
                }
                framedata[rel | 0] = buffer[i | 0];
                i = i + 1 | 0;
                pos = pos + 1 | 0;
            }
            //fast unrolled loop for large chunks i wish js had some sort of memcpy
            if (pos % 16 == 0) {
                while ((i + 16 | 0) <= datalen && (pos + 16 | 0) <= framesize) {
                    framedata[pos + 0 | 0] = buffer[i + 2 | 0];
                    framedata[pos + 1 | 0] = buffer[i + 1 | 0];
                    framedata[pos + 2 | 0] = buffer[i + 0 | 0];
                    framedata[pos + 3 | 0] = buffer[i + 3 | 0];
                    framedata[pos + 4 | 0] = buffer[i + 6 | 0];
                    framedata[pos + 5 | 0] = buffer[i + 5 | 0];
                    framedata[pos + 6 | 0] = buffer[i + 4 | 0];
                    framedata[pos + 7 | 0] = buffer[i + 7 | 0];
                    framedata[pos + 8 | 0] = buffer[i + 10 | 0];
                    framedata[pos + 9 | 0] = buffer[i + 9 | 0];
                    framedata[pos + 10 | 0] = buffer[i + 8 | 0];
                    framedata[pos + 11 | 0] = buffer[i + 11 | 0];
                    framedata[pos + 12 | 0] = buffer[i + 14 | 0];
                    framedata[pos + 13 | 0] = buffer[i + 13 | 0];
                    framedata[pos + 14 | 0] = buffer[i + 12 | 0];
                    framedata[pos + 15 | 0] = buffer[i + 15 | 0];
                    //could speed it up another x2 but wouldn't be able to swap r/b swap and possible alignment issues
                    //framedata32[pos / 8 + 0 | 0] = data32[i / 8 + 0 | 0];
                    //framedata32[pos / 8 + 1 | 0] = data32[i / 8 + 1 | 0];
                    //framedata32[pos / 4 + 2 | 0] = data32[i / 4 + 2 | 0];
                    //framedata32[pos / 4 + 3 | 0] = data32[i / 4 + 3 | 0];
                    pos = pos + 16 | 0;
                    i = i + 16 | 0;
                }
            }
            if (pos >= framesize) {
                this.pausedbuffer = null;
                this.pausedindex = -1;
                this.pos = 0;
                if (i != buffer.length - 1) {
                    this.pausedbuffer = buffer;
                    this.pausedindex = i;
                }
                return true;
            }
        }
        this.pos = pos;
        this.pausedbuffer = null;
        this.pausedindex = -1;
        return false;
    }
}
/**
 * Asynchronously captures a section of the game screen
 */
function captureAsync(...args) {
    return __awaiter(this, void 0, void 0, function* () {
        requireAlt1();
        var rect = _rect_js__WEBPACK_IMPORTED_MODULE_0__["default"].fromArgs(...args);
        if (alt1.captureAsync) {
            let img = yield alt1.captureAsync(rect.x, rect.y, rect.width, rect.height);
            return new _imagedata_extensions_js__WEBPACK_IMPORTED_MODULE_2__.ImageData(img, rect.width, rect.height);
        }
        if (!hasAlt1Version("1.4.6")) {
            return capture(rect.x, rect.y, rect.width, rect.height);
        }
        var url = "https://alt1api/pixel/getregion/" + encodeURIComponent(JSON.stringify(Object.assign(Object.assign({}, rect), { format: "raw", quality: 1 })));
        var res = yield fetch(url);
        var imgreader = new ImageStreamReader(res.body.getReader(), rect.width, rect.height);
        return imgreader.nextImage();
    });
}
/**
 * Asynchronously captures multple area's. This method captures the images in the same render frame if possible
 * @param areas
 */
function captureMultiAsync(areas) {
    return __awaiter(this, void 0, void 0, function* () {
        requireAlt1();
        var r = {};
        if (alt1.captureMultiAsync) {
            let bufs = yield alt1.captureMultiAsync(areas);
            for (let a in areas) {
                if (!bufs[a]) {
                    r[a] = null;
                }
                r[a] = new _imagedata_extensions_js__WEBPACK_IMPORTED_MODULE_2__.ImageData(bufs[a], areas[a].width, areas[a].height);
            }
            return r;
        }
        var capts = [];
        var captids = [];
        for (var id in areas) {
            if (areas[id]) {
                capts.push(areas[id]);
                captids.push(id);
            }
            else {
                r[id] = null;
            }
        }
        if (capts.length == 0) {
            return r;
        }
        if (!hasAlt1Version("1.5.1")) {
            var proms = [];
            for (var a = 0; a < capts.length; a++) {
                proms.push(captureAsync(capts[a]));
            }
            var results = yield Promise.all(proms);
            for (var a = 0; a < capts.length; a++) {
                r[captids[a]] = results[a];
            }
        }
        else {
            var res = yield fetch("https://alt1api/pixel/getregionmulti/" + encodeURIComponent(JSON.stringify({ areas: capts, format: "raw", quality: 1 })));
            var imgreader = new ImageStreamReader(res.body.getReader());
            for (var a = 0; a < capts.length; a++) {
                var capt = capts[a];
                imgreader.setFrameBuffer(new _imagedata_extensions_js__WEBPACK_IMPORTED_MODULE_2__.ImageData(capt.width, capt.height));
                r[captids[a]] = yield imgreader.nextImage();
            }
        }
        return r;
    });
}
/**
 * Starts capturing a realtime stream of the game. Make sure you keep reading the stream and close it when you're done or Alt1 WILL crash
 * @param framecb Called whenever a new frame is decoded
 * @param errorcb Called whenever an error occurs, the error is rethrown if not defined
 * @param fps Maximum fps of the stream
 */
function captureStream(x, y, width, height, fps, framecb, errorcb) {
    requireAlt1();
    if (!hasAlt1Version("1.4.6")) {
        throw new Alt1Error("This function is not supported in this version of Alt1");
    }
    var url = "https://alt1api/pixel/streamregion/" + encodeURIComponent(JSON.stringify({ x, y, width, height, fps, format: "raw" }));
    var res = fetch(url).then((res) => __awaiter(this, void 0, void 0, function* () {
        var reader = new ImageStreamReader(res.body.getReader(), width, height);
        try {
            while (!reader.closed && !state.closed) {
                var img = yield reader.nextImage();
                if (!state.closed) {
                    framecb(img);
                    state.framenr++;
                }
            }
        }
        catch (e) {
            if (!state.closed) {
                reader.close();
                if (errorcb) {
                    errorcb(e);
                }
                else {
                    throw e;
                }
            }
        }
        if (!reader.closed && state.closed) {
            reader.close();
        }
    }));
    var state = {
        x, y, width, height,
        framenr: 0,
        close: () => { state.closed = true; },
        closed: false,
    };
    return state;
}


/***/ }),

/***/ "../node_modules/.pnpm/@alt1+chatbox@1.0.0-alpha.7/node_modules/@alt1/chatbox/dist/imgs/badge_broadcast_bronze.js":
/*!************************************************************************************************************************!*\
  !*** ../node_modules/.pnpm/@alt1+chatbox@1.0.0-alpha.7/node_modules/@alt1/chatbox/dist/imgs/badge_broadcast_bronze.js ***!
  \************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports=(__webpack_require__(/*! @alt1/base */ "../node_modules/.pnpm/@alt1+base@1.0.0-alpha.7/node_modules/@alt1/base/dist/index.js").ImageDetect.imageDataFromBase64)("iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAMAAAC67D+PAAAAAW5vUEUAYtdMlAAAAARub1BFAAAAAEEgjiIAAAA2UExURQAAAAsICCEdHMZ8dappYgAAAVg0VYpLRWAsKIZ/fn9ANUolG9CHhTAUEjAgF1MyL/WkmQAAAO2GLvsAAAASdFJOU///////////////////////AOK/vxIAAAAJbm9QRQAAAAAAAAAAAKGKctUAAABJSURBVBhXPcpBEoAwCATBrIIQCDH8/7NiqnROfZiWf5vAx+OkY5MvEhFFNhBx7yyGovMYHMWcd6wVHvXCTF3ft0hz2mZC3R2ZD/YEBDE74WVXAAAAAElFTkSuQmCC")

/***/ }),

/***/ "../node_modules/.pnpm/@alt1+chatbox@1.0.0-alpha.7/node_modules/@alt1/chatbox/dist/imgs/badge_broadcast_gold.js":
/*!**********************************************************************************************************************!*\
  !*** ../node_modules/.pnpm/@alt1+chatbox@1.0.0-alpha.7/node_modules/@alt1/chatbox/dist/imgs/badge_broadcast_gold.js ***!
  \**********************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports=(__webpack_require__(/*! @alt1/base */ "../node_modules/.pnpm/@alt1+base@1.0.0-alpha.7/node_modules/@alt1/base/dist/index.js").ImageDetect.imageDataFromBase64)("iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAMAAAC67D+PAAAAAW5vUEUAYtdMlAAAAARub1BFAAAAAEEgjiIAAAAzUExURQAAAAsICKyWbaCGWgAAAWtiTzAgF11CIIdmNjIrICEdHNukUc+cJXpWKUolG39ANQAAAPj2qJUAAAARdFJOU/////////////////////8AJa2ZYgAAAAlub1BFAAAAAAAAAAAAoYpy1QAAAE5JREFUGFc9jEsWgDAIA/mkQFup3P+0oguzmuS9DNWfRhYR5Rehw8wDRRg2RedyEGTo3tEzcSD2lXCmco/MPKdvK63j65Xh5D3xebs0VD3I+wPSC+2UNgAAAABJRU5ErkJggg==")

/***/ }),

/***/ "../node_modules/.pnpm/@alt1+chatbox@1.0.0-alpha.7/node_modules/@alt1/chatbox/dist/imgs/badge_broadcast_silver.js":
/*!************************************************************************************************************************!*\
  !*** ../node_modules/.pnpm/@alt1+chatbox@1.0.0-alpha.7/node_modules/@alt1/chatbox/dist/imgs/badge_broadcast_silver.js ***!
  \************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports=(__webpack_require__(/*! @alt1/base */ "../node_modules/.pnpm/@alt1+base@1.0.0-alpha.7/node_modules/@alt1/base/dist/index.js").ImageDetect.imageDataFromBase64)("iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAMAAAC67D+PAAAAAW5vUEUAYtdMlAAAAARub1BFAAAAAEEgjiIAAAAwUExURQAAAAsICCEdHJaWlgAAAUZHR2ZmZlpVVzs8OoZ/fq2trdPT08bGxzAwL+Dg4AAAADwgKvoAAAAQdFJOU////////////////////wDgI10ZAAAACW5vUEUAAAAAAAAAAAChinLVAAAASklEQVQYVz3MSQ6AMAwDwOxJS03+/1tKJfBpZFmm/nPI/FFU5dA8IrKsycZkVRtpxBHzWupu1Ki6F0T2ljO9dnk4gHB+z6QAcPcD17YDp+hpqhwAAAAASUVORK5CYII=")

/***/ }),

/***/ "../node_modules/.pnpm/@alt1+chatbox@1.0.0-alpha.7/node_modules/@alt1/chatbox/dist/imgs/badgehcim.js":
/*!***********************************************************************************************************!*\
  !*** ../node_modules/.pnpm/@alt1+chatbox@1.0.0-alpha.7/node_modules/@alt1/chatbox/dist/imgs/badgehcim.js ***!
  \***********************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports=(__webpack_require__(/*! @alt1/base */ "../node_modules/.pnpm/@alt1+base@1.0.0-alpha.7/node_modules/@alt1/base/dist/index.js").ImageDetect.imageDataFromBase64)("iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAMAAACecocUAAAAAW5vUEUAYtdMlAAAAARub1BFAAAAAEEgjiIAAAAYUExURQAAAFwAAP8AAP99c9YAAAAAAf9bWwAAAKtA5IgAAAAIdFJOU/////////8A3oO9WQAAAAlub1BFAAAAAAAAAAAAoYpy1QAAAEFJREFUGFdlzUEOADEIAkClUP7/46X1skn1MiaoZfeUXW6sBZDtalyfIZZC6Zh/k9iJxM4AzW5uJoJwfPvxPLb9AWP8AZpOsiu3AAAAAElFTkSuQmCC")

/***/ }),

/***/ "../node_modules/.pnpm/@alt1+chatbox@1.0.0-alpha.7/node_modules/@alt1/chatbox/dist/imgs/badgeironman.js":
/*!**************************************************************************************************************!*\
  !*** ../node_modules/.pnpm/@alt1+chatbox@1.0.0-alpha.7/node_modules/@alt1/chatbox/dist/imgs/badgeironman.js ***!
  \**************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports=(__webpack_require__(/*! @alt1/base */ "../node_modules/.pnpm/@alt1+base@1.0.0-alpha.7/node_modules/@alt1/base/dist/index.js").ImageDetect.imageDataFromBase64)("iVBORw0KGgoAAAANSUhEUgAAAA0AAAAJCAMAAADepFZYAAAAAW5vUEUAYtdMlAAAAARub1BFAAAAAEEgjiIAAAAbUExURQAAAFpVVzIrIMbGxwAAATs8OiEdHDAwLwAAANYXi4cAAAAJdFJOU///////////AFNPeBIAAAAJbm9QRQAAAAAAAAAAAKGKctUAAAA9SURBVBhXXcxBDgAgCANBi7jy/xcL6sHYBNK5tMWbXzLtJlmqX/WSD8lVN+RHlSPym1kKb8G8K5NcAbaAWKaXAn7TGFt5AAAAAElFTkSuQmCC")

/***/ }),

/***/ "../node_modules/.pnpm/@alt1+chatbox@1.0.0-alpha.7/node_modules/@alt1/chatbox/dist/imgs/badgepmod.js":
/*!***********************************************************************************************************!*\
  !*** ../node_modules/.pnpm/@alt1+chatbox@1.0.0-alpha.7/node_modules/@alt1/chatbox/dist/imgs/badgepmod.js ***!
  \***********************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports=(__webpack_require__(/*! @alt1/base */ "../node_modules/.pnpm/@alt1+base@1.0.0-alpha.7/node_modules/@alt1/base/dist/index.js").ImageDetect.imageDataFromBase64)("iVBORw0KGgoAAAANSUhEUgAAAA0AAAALCAMAAACTbPdTAAAAAW5vUEUAYtdMlAAAAARub1BFAAAAAEEgjiIAAAASUExURZaWlgAAAODg4KKiogAAAQAAAJ/NAioAAAAGdFJOU///////ALO/pL8AAAAJbm9QRQAAAAAAAAAAAKGKctUAAAA3SURBVBhXbYxJDgAwCAKJy/+/XMT20FYwZOYikJW9sAJz7WcEc9e+JuyAz26jRtQR29TJcJK5AISjAaw7YIwNAAAAAElFTkSuQmCC")

/***/ }),

/***/ "../node_modules/.pnpm/@alt1+chatbox@1.0.0-alpha.7/node_modules/@alt1/chatbox/dist/imgs/badgepmodvip.js":
/*!**************************************************************************************************************!*\
  !*** ../node_modules/.pnpm/@alt1+chatbox@1.0.0-alpha.7/node_modules/@alt1/chatbox/dist/imgs/badgepmodvip.js ***!
  \**************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports=(__webpack_require__(/*! @alt1/base */ "../node_modules/.pnpm/@alt1+base@1.0.0-alpha.7/node_modules/@alt1/base/dist/index.js").ImageDetect.imageDataFromBase64)("iVBORw0KGgoAAAANSUhEUgAAAA0AAAALCAMAAACTbPdTAAAAAW5vUEUAYtdMlAAAAARub1BFAAAAAEEgjiIAAAAPUExURQAAAJaWlq2trQAAAQAAAIuYQeUAAAAFdFJOU/////8A+7YOUwAAAAlub1BFAAAAAAAAAAAAoYpy1QAAAEJJREFUGFc1jYkNADEIwzB0/5kvjy5FFIsA8yL6ldhiCFFwiETWuHHnUFtOEOzZ6zkuz3Ndsl0Tp+qiSVWT6L/M8j52yAF52AYCBwAAAABJRU5ErkJggg==")

/***/ }),

/***/ "../node_modules/.pnpm/@alt1+chatbox@1.0.0-alpha.7/node_modules/@alt1/chatbox/dist/imgs/badgevip.js":
/*!**********************************************************************************************************!*\
  !*** ../node_modules/.pnpm/@alt1+chatbox@1.0.0-alpha.7/node_modules/@alt1/chatbox/dist/imgs/badgevip.js ***!
  \**********************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports=(__webpack_require__(/*! @alt1/base */ "../node_modules/.pnpm/@alt1+base@1.0.0-alpha.7/node_modules/@alt1/base/dist/index.js").ImageDetect.imageDataFromBase64)("iVBORw0KGgoAAAANSUhEUgAAAA0AAAALCAMAAACTbPdTAAAAAW5vUEUAYtdMlAAAAARub1BFAAAAAEEgjiIAAAAMUExURQAAACGI3iFR3gAAANRJuUMAAAAEdFJOU////wBAKqn0AAAACW5vUEUAAAAAAAAAAAChinLVAAAAPUlEQVQYVzWNgQ0AIAjDmPz/sxuFxajNilZPxAHpgUMyDZYmpqRSENc2F+Nmbs3M8QjVmVmYubGZ7mc99QddvAEtcdAPjgAAAABJRU5ErkJggg==")

/***/ }),

/***/ "../node_modules/.pnpm/@alt1+chatbox@1.0.0-alpha.7/node_modules/@alt1/chatbox/dist/imgs/chatLegacyBorder.js":
/*!******************************************************************************************************************!*\
  !*** ../node_modules/.pnpm/@alt1+chatbox@1.0.0-alpha.7/node_modules/@alt1/chatbox/dist/imgs/chatLegacyBorder.js ***!
  \******************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports=(__webpack_require__(/*! @alt1/base */ "../node_modules/.pnpm/@alt1+base@1.0.0-alpha.7/node_modules/@alt1/base/dist/index.js").ImageDetect.imageDataFromBase64)("iVBORw0KGgoAAAANSUhEUgAAAAQAAAAPCAIAAABMVPnqAAAAIUlEQVQYV2P4jwRAnNk92RA0mDjzJuRCOUAWlAMF//8DAJmOfBu3Ydq7AAAAAElFTkSuQmCC")

/***/ }),

/***/ "../node_modules/.pnpm/@alt1+chatbox@1.0.0-alpha.7/node_modules/@alt1/chatbox/dist/imgs/chat_link.js":
/*!***********************************************************************************************************!*\
  !*** ../node_modules/.pnpm/@alt1+chatbox@1.0.0-alpha.7/node_modules/@alt1/chatbox/dist/imgs/chat_link.js ***!
  \***********************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports=(__webpack_require__(/*! @alt1/base */ "../node_modules/.pnpm/@alt1+base@1.0.0-alpha.7/node_modules/@alt1/base/dist/index.js").ImageDetect.imageDataFromBase64)("iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAYAAACprHcmAAAAZ0lEQVQY02NgwAOsbaz+gzADIeDm7v7f19Tnf4RJKH4NIIUgRTA+Xg3oikE2YCgGKQBhkGK8CmGeMTDQBysG0Vg9CBLwAZqA7IxwkxAwxlDoi6QQphhnWKL7HKdiZA0gG1zxKSQltgDRP03waXSEwgAAAABJRU5ErkJggg==")

/***/ }),

/***/ "../node_modules/.pnpm/@alt1+chatbox@1.0.0-alpha.7/node_modules/@alt1/chatbox/dist/imgs/chatbubble.js":
/*!************************************************************************************************************!*\
  !*** ../node_modules/.pnpm/@alt1+chatbox@1.0.0-alpha.7/node_modules/@alt1/chatbox/dist/imgs/chatbubble.js ***!
  \************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports=(__webpack_require__(/*! @alt1/base */ "../node_modules/.pnpm/@alt1+base@1.0.0-alpha.7/node_modules/@alt1/base/dist/index.js").ImageDetect.imageDataFromBase64)("iVBORw0KGgoAAAANSUhEUgAAAA0AAAAJCAYAAADpeqZqAAAAoElEQVQoU5WRwQ3DIAxF2Sg9t1KvySSM0d46AgNw55aukAzAAizADE6eIxCy1EMPH4z9nxHGiYjq835JCEG+69rF2Xsv87zIbZpO2+XtQM5ZSilSa1URo23btUGMsYOOThRGYARpZkGFKFjAQiil9D/EbQrxSBIYrCzQb3o873qggMkam3gP01SIaRCQHE00ItfMDdDpsTTwl/gS9ssr7gAl2lnMS+w6XAAAAABJRU5ErkJggg==")

/***/ }),

/***/ "../node_modules/.pnpm/@alt1+chatbox@1.0.0-alpha.7/node_modules/@alt1/chatbox/dist/imgs/entertochat.js":
/*!*************************************************************************************************************!*\
  !*** ../node_modules/.pnpm/@alt1+chatbox@1.0.0-alpha.7/node_modules/@alt1/chatbox/dist/imgs/entertochat.js ***!
  \*************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports=(__webpack_require__(/*! @alt1/base */ "../node_modules/.pnpm/@alt1+base@1.0.0-alpha.7/node_modules/@alt1/base/dist/index.js").ImageDetect.imageDataFromBase64)("iVBORw0KGgoAAAANSUhEUgAAABgAAAAJCAYAAAAo/ezGAAAAdElEQVQ4T62RSw7AIAhEOQTH8WCsXbvmuhRsTdQipqYmz88MJI4CM0tDB/zNPelipJT06Bee4oo9UbqV1+uDscLS5Zx163ulFN2OOiLWVxnEE1YpGq74FSISu/GsGy/hhDBBixgVecw9YYL6GQ+9uWPfI3ABK/Blt6d3IYgAAAAASUVORK5CYII=")

/***/ }),

/***/ "../node_modules/.pnpm/@alt1+chatbox@1.0.0-alpha.7/node_modules/@alt1/chatbox/dist/imgs/filterbutton.js":
/*!**************************************************************************************************************!*\
  !*** ../node_modules/.pnpm/@alt1+chatbox@1.0.0-alpha.7/node_modules/@alt1/chatbox/dist/imgs/filterbutton.js ***!
  \**************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports=(__webpack_require__(/*! @alt1/base */ "../node_modules/.pnpm/@alt1+base@1.0.0-alpha.7/node_modules/@alt1/base/dist/index.js").ImageDetect.imageDataFromBase64)("iVBORw0KGgoAAAANSUhEUgAAAA4AAAAPCAYAAADUFP50AAAAaElEQVQ4T9XLsQ2AMAxEUc+BxBysySTsQcEI7EF36JAcORdHoUMUv8jFz65jgXZuU2lf5zQD0OARonkg4+Eb6PcFMgc9GG8ryHpQ76qHp1D/WTOwCPXPS8fvINM/Lx1/CHWPpeMIAbAba/5W9dGOZAMAAAAASUVORK5CYII=")

/***/ }),

/***/ "../node_modules/.pnpm/@alt1+chatbox@1.0.0-alpha.7/node_modules/@alt1/chatbox/dist/imgs/gameall.js":
/*!*********************************************************************************************************!*\
  !*** ../node_modules/.pnpm/@alt1+chatbox@1.0.0-alpha.7/node_modules/@alt1/chatbox/dist/imgs/gameall.js ***!
  \*********************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports=(__webpack_require__(/*! @alt1/base */ "../node_modules/.pnpm/@alt1+base@1.0.0-alpha.7/node_modules/@alt1/base/dist/index.js").ImageDetect.imageDataFromBase64)("iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAo0lEQVQ4T6XMsQkCQRAF0KnA5DA0MDG3A2uwlQuN7cVY07vgAkPBTA3FAixA5esXvuyeC+O6Cw+Gv/PH7oc5Hsf/sGupjxx2289Ar2c51LNrNwX1FzzqRQc0e6ID580YxFCzJ9y1y3oIYphDPTutBiCGmj3hbvmB3XICYphDveiA5hQVRfnXge1i9KY8/A9p7zP0FzzqlR9o6wolrEmEv2rqCk/yGcSB9N78JQAAAABJRU5ErkJggg==")

/***/ }),

/***/ "../node_modules/.pnpm/@alt1+chatbox@1.0.0-alpha.7/node_modules/@alt1/chatbox/dist/imgs/gamefilter.js":
/*!************************************************************************************************************!*\
  !*** ../node_modules/.pnpm/@alt1+chatbox@1.0.0-alpha.7/node_modules/@alt1/chatbox/dist/imgs/gamefilter.js ***!
  \************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports=(__webpack_require__(/*! @alt1/base */ "../node_modules/.pnpm/@alt1+base@1.0.0-alpha.7/node_modules/@alt1/base/dist/index.js").ImageDetect.imageDataFromBase64)("iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAqUlEQVQ4T63MsQrCQBAE0P1LSzs7Sy3tBEvtFDFNwMYurVhY2lgKfkHyBXbJ6AQm3AnHcaeBB3ubnbGiaVE0XZZD3cI2jxd+MRR8Pkvxv4LVrQa5yxjeKucVaI7xChaXJ4jLFMp5BZpjvIJ5dQdxqTnGvbXZ6QriMoVyNi3PIC41E3+6bwVFe69gsq8QoqAMBaGDGOVsvD5mFzDbF7jUHPJ9b6PlDvm2eAMxAQErxoTm+QAAAABJRU5ErkJggg==")

/***/ }),

/***/ "../node_modules/.pnpm/@alt1+chatbox@1.0.0-alpha.7/node_modules/@alt1/chatbox/dist/imgs/gameoff.js":
/*!*********************************************************************************************************!*\
  !*** ../node_modules/.pnpm/@alt1+chatbox@1.0.0-alpha.7/node_modules/@alt1/chatbox/dist/imgs/gameoff.js ***!
  \*********************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports=(__webpack_require__(/*! @alt1/base */ "../node_modules/.pnpm/@alt1+base@1.0.0-alpha.7/node_modules/@alt1/base/dist/index.js").ImageDetect.imageDataFromBase64)("iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAdUlEQVQ4T62MsQrAIAxE/bwOhS7tkMHBLi79/zVthAvaCjZq4MFx5J6jePEI8wTPOQsq2M/YJcAuBQHlH/LfuQILVQFyi0Kw+cCClMgt8t9CYEEFK3kVINfAEKBPI0FK5BoYAvSFwIIKloNYeD+0+Ah6GRQQ30BWZJSYN2VIAAAAAElFTkSuQmCC")

/***/ }),

/***/ "../node_modules/.pnpm/@alt1+chatbox@1.0.0-alpha.7/node_modules/@alt1/chatbox/dist/imgs/legacyreport.js":
/*!**************************************************************************************************************!*\
  !*** ../node_modules/.pnpm/@alt1+chatbox@1.0.0-alpha.7/node_modules/@alt1/chatbox/dist/imgs/legacyreport.js ***!
  \**************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports=(__webpack_require__(/*! @alt1/base */ "../node_modules/.pnpm/@alt1+base@1.0.0-alpha.7/node_modules/@alt1/base/dist/index.js").ImageDetect.imageDataFromBase64)("iVBORw0KGgoAAAANSUhEUgAAACEAAAALCAYAAADx0+Q/AAAAlElEQVQ4T72OCQ4AIQgD/f+nXYuUgGLiukeTQVq8Sp2F7FdQWi2GKmz6CEh6Mfq4DQf/FfaO1EFt1ocKRX+SQ35lD/ErPcOafICfgp7kEGe9tF6gwYKiK/GaLrjbOx/mwSiQ9Ty8uuCgJ5YFo0zeKc0W+30+3kkgmYyXpJ5oZt5lRpZn+4DszQYbpI+fkoY7vPeJWi767hYjK0Ud6gAAAABJRU5ErkJggg==")

/***/ }),

/***/ "../node_modules/.pnpm/@alt1+chatbox@1.0.0-alpha.7/node_modules/@alt1/chatbox/dist/imgs/minusbutton.js":
/*!*************************************************************************************************************!*\
  !*** ../node_modules/.pnpm/@alt1+chatbox@1.0.0-alpha.7/node_modules/@alt1/chatbox/dist/imgs/minusbutton.js ***!
  \*************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports=(__webpack_require__(/*! @alt1/base */ "../node_modules/.pnpm/@alt1+base@1.0.0-alpha.7/node_modules/@alt1/base/dist/index.js").ImageDetect.imageDataFromBase64)("iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAIAAACQKrqGAAABL0lEQVQoU2PIzMk01hbUVGDDg4AKgMoYgFRLCPOOOtbdLWxAtLeTHYIgXKA4EAEVAJUxaMizbilju75E9u4mNUx0Y7UqUGp3MzdQGYOKLCuQ9XCH7qPdxg+2Gt3aYgQkgWw4AqoGKgAqQ1EKVIep9NY2LRSlt5ZrXV6tc3axNgRdXgbiQhDQ1J1VfDClNcJAuSBTJjjy1GNy1WSyUWI0kWa8PE8JRem9VcaYirRFGIAIaOHmIhEUpQ9X2D1e74WGgIK3ZhluzRWFKt1VKXNvjgYE3exVujNZFYiQGViUQuSudCkD0bkGJSAJVAckUZQC+demaMBJoDpktClVEqRUVY6jOYRvR5HsznoVILklUxpIQhCQDUE1LtxAZQw6JgZAHfKSLLLi2BFQCqhAx8QAACI62b/ivxHFAAAAAElFTkSuQmCC")

/***/ }),

/***/ "../node_modules/.pnpm/@alt1+chatbox@1.0.0-alpha.7/node_modules/@alt1/chatbox/dist/imgs/plusbutton.js":
/*!************************************************************************************************************!*\
  !*** ../node_modules/.pnpm/@alt1+chatbox@1.0.0-alpha.7/node_modules/@alt1/chatbox/dist/imgs/plusbutton.js ***!
  \************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports=(__webpack_require__(/*! @alt1/base */ "../node_modules/.pnpm/@alt1+base@1.0.0-alpha.7/node_modules/@alt1/base/dist/index.js").ImageDetect.imageDataFromBase64)("iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAIAAACQKrqGAAABT0lEQVQoU2PIzMk01hbUVGDDg4AKgMoYgFRLCPOOOtbdLWxAtLeTHYIgXKA4EAEVAJUxaMizbilju75E9u4mNSC6sVoVguBcoNTuZm6gMgYVWVYg6+EO3Ue7jYHo3irjIFOmYAumWztBXCC6tVwLqACoDEXprS1GQARUCkQQdSDBbahKgVovr9Y5u1j78jItTz0mIAJyIQjohp1VfDClNcJwFa6a6OjyPCUUpUAnAkUd1BiByEYJBQEt3FwkgqL04Qq7x+u9gCRQ2kKOEc69NcsQoXRXpcy9ORoQdKVL2USaEYhu9irdmawKREDG1lxRdKVACaAZ2iIMQHS1UweoDYJQlAL516aAjAQqvTLJBogutBmca1CCoE2pkiClqnIczSF8O4pkd9arAMktmdJAEoKAKoBcIKpx4QYqY9AxMQDqkJdkkRXHjoBSQAU6JgYAwvDKbZkKUHAAAAAASUVORK5CYII=")

/***/ }),

/***/ "../node_modules/.pnpm/@alt1+chatbox@1.0.0-alpha.7/node_modules/@alt1/chatbox/dist/imgs/reportbutton.js":
/*!**************************************************************************************************************!*\
  !*** ../node_modules/.pnpm/@alt1+chatbox@1.0.0-alpha.7/node_modules/@alt1/chatbox/dist/imgs/reportbutton.js ***!
  \**************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports=(__webpack_require__(/*! @alt1/base */ "../node_modules/.pnpm/@alt1+base@1.0.0-alpha.7/node_modules/@alt1/base/dist/index.js").ImageDetect.imageDataFromBase64)("iVBORw0KGgoAAAANSUhEUgAAAA8AAAAQCAYAAADJViUEAAABAElEQVQ4T6WSvwtBURTHj0V+FknyB6AMZCH8ATbxByijwb9gsFsMBrvJaFAGu00sJilltlp0+N7Xua7rySuvPr1z7z2f77m9Ht0PdQbPR9cm2P8G3TZlBli4yUCabd5kqUG/W+FmI+8aJtB1lWUAWWrIvXaSS8WsCpHA9cg5E1xlQQJOi5y6RToVVQHST8d5nAEWUguXpSNDAoOOswc+5P0sxgL2MNkUzV4lo3E7DaoNvAWIkbCfC5moYtIL6OCfcqsWUqDGVATZAVqwZbAeJ/QbVyfy8WyYesnm5G+gBwG4gUwG+iPZgs3OkATPshuEHwDYB16g86LKwD7wwh8y0wNntoLFjD8QsQAAAABJRU5ErkJggg==")

/***/ }),

/***/ "../node_modules/.pnpm/@alt1+chatbox@1.0.0-alpha.7/node_modules/@alt1/chatbox/dist/index.js":
/*!**************************************************************************************************!*\
  !*** ../node_modules/.pnpm/@alt1+chatbox@1.0.0-alpha.7/node_modules/@alt1/chatbox/dist/index.js ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ChatBoxReader),
/* harmony export */   defaultcolors: () => (/* binding */ defaultcolors)
/* harmony export */ });
/* harmony import */ var _alt1_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @alt1/base */ "../node_modules/.pnpm/@alt1+base@1.0.0-alpha.7/node_modules/@alt1/base/dist/index.js");
/* harmony import */ var _alt1_ocr__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @alt1/ocr */ "../node_modules/.pnpm/@alt1+ocr@1.0.0-alpha.7/node_modules/@alt1/ocr/dist/index.js");




let chatfont = __webpack_require__(/*! @alt1/ocr/fonts/chat_8px.js */ "../node_modules/.pnpm/@alt1+ocr@1.0.0-alpha.7/node_modules/@alt1/ocr/fonts/chat_8px.js");
let fonts = [
    { name: "10pt", lineheight: 14, badgey: -9, dy: 2, def: __webpack_require__(/*! @alt1/ocr/fonts/chatbox/10pt.js */ "../node_modules/.pnpm/@alt1+ocr@1.0.0-alpha.7/node_modules/@alt1/ocr/fonts/chatbox/10pt.js") },
    { name: "12pt", lineheight: 16, badgey: -9, dy: -1, def: __webpack_require__(/*! @alt1/ocr/fonts/chatbox/12pt.js */ "../node_modules/.pnpm/@alt1+ocr@1.0.0-alpha.7/node_modules/@alt1/ocr/fonts/chatbox/12pt.js") },
    { name: "14pt", lineheight: 18, badgey: -10, dy: -3, def: __webpack_require__(/*! @alt1/ocr/fonts/chatbox/14pt.js */ "../node_modules/.pnpm/@alt1+ocr@1.0.0-alpha.7/node_modules/@alt1/ocr/fonts/chatbox/14pt.js") },
    { name: "16pt", lineheight: 21, badgey: -10, dy: -6, def: __webpack_require__(/*! @alt1/ocr/fonts/chatbox/16pt.js */ "../node_modules/.pnpm/@alt1+ocr@1.0.0-alpha.7/node_modules/@alt1/ocr/fonts/chatbox/16pt.js") },
    { name: "18pt", lineheight: 23, badgey: -11, dy: -8, def: __webpack_require__(/*! @alt1/ocr/fonts/chatbox/18pt.js */ "../node_modules/.pnpm/@alt1+ocr@1.0.0-alpha.7/node_modules/@alt1/ocr/fonts/chatbox/18pt.js") },
    { name: "20pt", lineheight: 25, badgey: -11, dy: -11, def: __webpack_require__(/*! @alt1/ocr/fonts/chatbox/20pt.js */ "../node_modules/.pnpm/@alt1+ocr@1.0.0-alpha.7/node_modules/@alt1/ocr/fonts/chatbox/20pt.js") },
    { name: "22pt", lineheight: 27, badgey: -12, dy: -13, def: __webpack_require__(/*! @alt1/ocr/fonts/chatbox/22pt.js */ "../node_modules/.pnpm/@alt1+ocr@1.0.0-alpha.7/node_modules/@alt1/ocr/fonts/chatbox/22pt.js") },
];
const imgs = _alt1_base__WEBPACK_IMPORTED_MODULE_0__.ImageDetect.webpackImages({
    plusbutton: __webpack_require__(/*! ./imgs/plusbutton.js */ "../node_modules/.pnpm/@alt1+chatbox@1.0.0-alpha.7/node_modules/@alt1/chatbox/dist/imgs/plusbutton.js"),
    minusbutton: __webpack_require__(/*! ./imgs/minusbutton.js */ "../node_modules/.pnpm/@alt1+chatbox@1.0.0-alpha.7/node_modules/@alt1/chatbox/dist/imgs/minusbutton.js"),
    filterbutton: __webpack_require__(/*! ./imgs/filterbutton.js */ "../node_modules/.pnpm/@alt1+chatbox@1.0.0-alpha.7/node_modules/@alt1/chatbox/dist/imgs/filterbutton.js"),
    chatbubble: __webpack_require__(/*! ./imgs/chatbubble.js */ "../node_modules/.pnpm/@alt1+chatbox@1.0.0-alpha.7/node_modules/@alt1/chatbox/dist/imgs/chatbubble.js"),
    chatLegacyBorder: __webpack_require__(/*! ./imgs/chatLegacyBorder.js */ "../node_modules/.pnpm/@alt1+chatbox@1.0.0-alpha.7/node_modules/@alt1/chatbox/dist/imgs/chatLegacyBorder.js"),
    entertochat: __webpack_require__(/*! ./imgs/entertochat.js */ "../node_modules/.pnpm/@alt1+chatbox@1.0.0-alpha.7/node_modules/@alt1/chatbox/dist/imgs/entertochat.js"),
    gameoff: __webpack_require__(/*! ./imgs/gameoff.js */ "../node_modules/.pnpm/@alt1+chatbox@1.0.0-alpha.7/node_modules/@alt1/chatbox/dist/imgs/gameoff.js"),
    gamefilter: __webpack_require__(/*! ./imgs/gamefilter.js */ "../node_modules/.pnpm/@alt1+chatbox@1.0.0-alpha.7/node_modules/@alt1/chatbox/dist/imgs/gamefilter.js"),
    gameall: __webpack_require__(/*! ./imgs/gameall.js */ "../node_modules/.pnpm/@alt1+chatbox@1.0.0-alpha.7/node_modules/@alt1/chatbox/dist/imgs/gameall.js"),
    legacyreport: __webpack_require__(/*! ./imgs/legacyreport.js */ "../node_modules/.pnpm/@alt1+chatbox@1.0.0-alpha.7/node_modules/@alt1/chatbox/dist/imgs/legacyreport.js"),
    reportbutton: __webpack_require__(/*! ./imgs/reportbutton.js */ "../node_modules/.pnpm/@alt1+chatbox@1.0.0-alpha.7/node_modules/@alt1/chatbox/dist/imgs/reportbutton.js"),
});
const chatbadges = _alt1_base__WEBPACK_IMPORTED_MODULE_0__.ImageDetect.webpackImages({
    vip: __webpack_require__(/*! ./imgs/badgevip.js */ "../node_modules/.pnpm/@alt1+chatbox@1.0.0-alpha.7/node_modules/@alt1/chatbox/dist/imgs/badgevip.js"),
    pmod: __webpack_require__(/*! ./imgs/badgepmod.js */ "../node_modules/.pnpm/@alt1+chatbox@1.0.0-alpha.7/node_modules/@alt1/chatbox/dist/imgs/badgepmod.js"),
    pmodvip: __webpack_require__(/*! ./imgs/badgepmodvip.js */ "../node_modules/.pnpm/@alt1+chatbox@1.0.0-alpha.7/node_modules/@alt1/chatbox/dist/imgs/badgepmodvip.js"),
    broadcast_gold: __webpack_require__(/*! ./imgs/badge_broadcast_gold.js */ "../node_modules/.pnpm/@alt1+chatbox@1.0.0-alpha.7/node_modules/@alt1/chatbox/dist/imgs/badge_broadcast_gold.js"),
    broadcast_silver: __webpack_require__(/*! ./imgs/badge_broadcast_silver.js */ "../node_modules/.pnpm/@alt1+chatbox@1.0.0-alpha.7/node_modules/@alt1/chatbox/dist/imgs/badge_broadcast_silver.js"),
    broadcast_bronze: __webpack_require__(/*! ./imgs/badge_broadcast_bronze.js */ "../node_modules/.pnpm/@alt1+chatbox@1.0.0-alpha.7/node_modules/@alt1/chatbox/dist/imgs/badge_broadcast_bronze.js"),
    ironman: __webpack_require__(/*! ./imgs/badgeironman.js */ "../node_modules/.pnpm/@alt1+chatbox@1.0.0-alpha.7/node_modules/@alt1/chatbox/dist/imgs/badgeironman.js"),
    hcim: __webpack_require__(/*! ./imgs/badgehcim.js */ "../node_modules/.pnpm/@alt1+chatbox@1.0.0-alpha.7/node_modules/@alt1/chatbox/dist/imgs/badgehcim.js"),
    chatlink: __webpack_require__(/*! ./imgs/chat_link.js */ "../node_modules/.pnpm/@alt1+chatbox@1.0.0-alpha.7/node_modules/@alt1/chatbox/dist/imgs/chat_link.js"),
});
const badgemap = {
    vip: "\u2730",
    pmod: "\u2655",
    pmodvip: "\u2655",
    broadcast_gold: "\u2746",
    broadcast_silver: "\u2746",
    broadcast_bronze: "\u2746",
    ironman: "\u26AF",
    hcim: "\u{1F480}",
    chatlink: "\u{1F517}", //LINK SYMBOL
};
const defaultcolors = [
    [0, 255, 0],
    [0, 255, 255],
    [0, 175, 255],
    [0, 0, 255],
    [255, 82, 86],
    [159, 255, 159],
    [0, 111, 0],
    [255, 143, 143],
    [255, 152, 31],
    [255, 111, 0],
    [255, 255, 0],
    //[239, 0, 0],//messes up broadcast detection [255,0,0]
    [239, 0, 175],
    [255, 79, 255],
    [175, 127, 255],
    //[48, 48, 48],//fuck this color, its unlegible for computers and people alike
    [191, 191, 191],
    [127, 255, 255],
    [128, 0, 0],
    [255, 255, 255],
    [127, 169, 255],
    [255, 140, 56],
    [255, 0, 0],
    [69, 178, 71],
    [164, 153, 125],
    [215, 195, 119] //interface preset color
];
class ChatBoxReader {
    constructor() {
        //settings
        this.readargs = {
            colors: defaultcolors.map(c => _alt1_base__WEBPACK_IMPORTED_MODULE_0__.mixColor(c[0], c[1], c[2]))
        };
        this.minoverlap = 2;
        this.diffRead = true;
        this.diffReadUseTimestamps = true;
        this.forwardnudges = defaultforwardnudges.slice();
        this.backwardnudges = defaultbackwardnudges.slice();
        //state
        this.pos = null;
        this.debug = null;
        this.overlaplines = [];
        this.lastTimestamp = -1;
        this.lastTimestampUpdate = 0;
        this.addedLastread = false;
        this.font = null;
        this.lastReadBuffer = null;
    }
    readChatLine(box, imgdata, imgx, imgy, font, ocrcolors, linenr) {
        var liney = box.line0y - linenr * font.lineheight + font.dy;
        let ctx = {
            badgedy: font.badgey,
            baseliney: liney + box.rect.y - imgy,
            colors: ocrcolors,
            font: font.def,
            forward: true,
            imgdata,
            leftx: box.line0x + box.rect.x - imgx,
            rightx: box.line0x + box.rect.x - imgx,
            text: "",
            fragments: [],
            addfrag(frag) {
                if (this.forward) {
                    this.fragments.push(frag);
                    this.text += frag.text;
                    this.rightx = frag.xend;
                }
                else {
                    this.fragments.unshift(frag);
                    this.text = frag.text + this.text;
                    this.leftx = frag.xstart;
                }
            }
        };
        if (!box.leftfound) {
            let col = _alt1_ocr__WEBPACK_IMPORTED_MODULE_1__.getChatColor(imgdata, { x: ctx.rightx - 5, y: ctx.baseliney - 10, width: 10, height: 10 }, ocrcolors);
            if (!col) {
                return { text: "", fragments: [], basey: liney };
            }
            let pos = _alt1_ocr__WEBPACK_IMPORTED_MODULE_1__.findChar(imgdata, font.def, col, ctx.rightx - 5, ctx.baseliney, font.def.width, 1);
            if (!pos) {
                return { text: "", fragments: [], basey: liney };
            }
            ctx.rightx = pos.x;
            ctx.leftx = pos.x;
        }
        for (let dirforward of [false, true]) {
            if (box.leftfound && !dirforward) {
                continue;
            }
            ctx.forward = dirforward;
            let nudges = (dirforward ? this.forwardnudges : this.backwardnudges);
            retryloop: while (true) {
                for (let nudge of nudges) {
                    let m = ctx.text.match(nudge.match);
                    if (m) {
                        if (nudge.fn(ctx, m)) {
                            continue retryloop;
                        }
                    }
                }
                break;
            }
        }
        ctx.fragments.forEach(f => { f.xstart += imgx; f.xend += imgx; });
        if (!box.leftfound) {
            let found = false;
            let extraoffset = 0;
            //ignore lines with news in them since the preceeding news icon often doesn't match in backward reads
            if (ctx.text.match(/^(\[\w)/i) && ctx.text.indexOf("News") == -1) {
                found = true;
            }
            if (found) {
                let dx = ctx.fragments[0].xstart - box.rect.x - extraoffset;
                box.rect.x += dx;
                box.rect.width -= dx;
                box.leftfound = true;
                console.log("found box left because of chat contents", ctx.text);
            }
        }
        return { text: ctx.text, fragments: ctx.fragments, basey: ctx.baseliney + imgy };
    }
    read(img) {
        if (!this.pos) {
            return null;
        }
        var box = this.pos.mainbox;
        var leftmargin = (box.leftfound ? 0 : 300);
        let imgx = box.rect.x - leftmargin;
        let imgy = box.rect.y;
        let imgdata;
        if (img) {
            imgdata = img.toData(imgx, imgy, box.rect.width + leftmargin, box.rect.height);
        }
        else {
            imgdata = _alt1_base__WEBPACK_IMPORTED_MODULE_0__.capture(imgx, imgy, box.rect.width + leftmargin, box.rect.height);
        }
        this.lastReadBuffer = new _alt1_base__WEBPACK_IMPORTED_MODULE_0__.ImgRefData(imgdata, imgx, imgy);
        //add timestamp colors if needed
        //TODO
        if (true) {
            var cols = [_alt1_base__WEBPACK_IMPORTED_MODULE_0__.mixColor(127, 169, 255), _alt1_base__WEBPACK_IMPORTED_MODULE_0__.mixColor(255, 255, 255)];
            for (var a in cols) {
                if (this.readargs.colors.indexOf(cols[a]) == -1) {
                    this.readargs.colors.push(cols[a]);
                }
            }
        }
        var ocrcolors = this.readargs.colors.map(c => _alt1_base__WEBPACK_IMPORTED_MODULE_0__.unmixColor(c));
        if (!this.font) {
            for (let font of fonts) {
                let line1 = this.readChatLine(box, imgdata, imgx, imgy, font, ocrcolors, 0);
                let line2 = this.readChatLine(box, imgdata, imgx, imgy, font, ocrcolors, 1);
                let m = (line1.text + line2.text).match(/\w/g);
                if (m && m.length > 10) {
                    this.font = font;
                    break;
                }
            }
        }
        if (!this.font) {
            return null;
        }
        var readlines = [];
        var newlines = [];
        let hadtimestampless = false;
        for (var line = 0; true; line++) {
            var liney = box.line0y - line * this.font.lineheight + this.font.dy;
            if (liney - this.font.lineheight < 0) {
                newlines = readlines;
                break;
            }
            let newline = this.readChatLine(box, imgdata, imgx, imgy, this.font, ocrcolors, line);
            readlines.unshift(newline);
            //combine with previous reads
            if (this.diffRead) {
                let time = ChatBoxReader.getMessageTime(newline.text);
                if (this.diffReadUseTimestamps && !this.addedLastread && !hadtimestampless && time != -1 && this.lastTimestamp != -1) {
                    //don't block messages in the same second as last update
                    if (Date.now() > this.lastTimestampUpdate + 1000) {
                        const maxtime = 24 * 60 * 60;
                        let diff = time - this.lastTimestamp;
                        //wrap around at 00:00:00
                        if (diff < -maxtime / 2) {
                            diff += maxtime;
                        }
                        //don't accept messages with older timestamp
                        if (diff <= 0) {
                            newlines = readlines.slice(1);
                            break;
                        }
                    }
                }
                else {
                    //can not use timestamps if there is a msg without timestamp in the same batch
                    hadtimestampless = true;
                }
                if (readlines.length >= this.overlaplines.length && this.overlaplines.length >= this.minoverlap) {
                    var matched = true;
                    for (let a = 0; a < this.overlaplines.length; a++) {
                        if (!this.matchLines(this.overlaplines[a].text, readlines[a].text)) {
                            matched = false;
                            break;
                        }
                    }
                    if (matched) {
                        newlines = readlines.slice(this.overlaplines.length, readlines.length);
                        break;
                    }
                }
            }
        }
        //update the last message timestamp
        this.addedLastread = newlines.length != 0;
        for (let a = newlines.length - 1; a >= 0; a--) {
            let time = ChatBoxReader.getMessageTime(newlines[a].text);
            if (time != -1) {
                this.lastTimestamp = time;
                this.lastTimestampUpdate = Date.now();
                break;
            }
        }
        //add new lines
        this.overlaplines = this.overlaplines.concat(newlines);
        if (this.overlaplines.length > this.minoverlap) {
            this.overlaplines.splice(0, this.overlaplines.length - this.minoverlap);
        }
        //console.log("Read chat attempt time: " + (Date.now() - t));
        //for (let a = 0; a < newlines.length; a++) { console.log(newlines[a]); }
        return newlines;
    }
    //convert some similar characters to prevent problems when a character is slightly misread
    simplifyLine(str) {
        str = str.replace(/[\[\]\.\':;,_ ]/g, "");
        str = str.replace(/[|!lIji]/g, "l");
        return str;
    }
    matchLines(line1, line2) {
        return this.simplifyLine(line1) == this.simplifyLine(line2);
    }
    checkLegacyBG(buf, x, y) {
        return buf.getColorDifference(x, y, 155, 140, 107) < 20;
    }
    find(imgornull) {
        if (!imgornull) {
            imgornull = _alt1_base__WEBPACK_IMPORTED_MODULE_0__.captureHoldFullRs();
        }
        if (!imgornull) {
            return null;
        }
        var img = imgornull;
        var toprights = [];
        img.findSubimage(imgs.plusbutton).forEach(loc => toprights.push({ x: loc.x + 5, y: loc.y + 21, type: "hidden" }));
        img.findSubimage(imgs.filterbutton).forEach(loc => toprights.push({ x: loc.x + 19, y: loc.y + 19, type: "hidden" }));
        img.findSubimage(imgs.minusbutton).forEach(loc => toprights.push({ x: loc.x + 5, y: loc.y + 21, type: "full" }));
        var botlefts = [];
        img.findSubimage(imgs.chatbubble).forEach(loc => {
            //107,2 press enter to chat
            //102,2 click here to chat
            var data = img.toData(loc.x + 102, loc.y + 1, 28 + (107 - 102), 10);
            if (data.pixelCompare(imgs.entertochat, 0, 1) != Infinity || data.pixelCompare(imgs.entertochat, (107 - 102), 1) != Infinity) {
                botlefts.push(loc);
            }
            //i don't even know anymore some times the bubble is 1px higher (i think it might be java related)
            else if (data.pixelCompare(imgs.entertochat, 0, 0) != Infinity || data.pixelCompare(imgs.entertochat, (107 - 102), 0) != Infinity) {
                loc.y -= 1;
                botlefts.push(loc);
            }
            else {
                var pixel = img.toData(loc.x, loc.y - 6, 1, 1);
                var pixel2 = img.toData(loc.x, loc.y - 5, 1, 1);
                if (pixel.data[0] == 255 && pixel.data[1] == 255 && pixel.data[2] == 255) {
                    botlefts.push(loc);
                }
                //the weird offset again
                else if (pixel2.data[0] == 255 && pixel2.data[1] == 255 && pixel2.data[2] == 255) {
                    loc.y -= 1;
                    botlefts.push(loc);
                }
                else {
                    //console.log("unlinked quickchat bubble " + JSON.stringify(loc));
                }
            }
        });
        img.findSubimage(imgs.chatLegacyBorder).forEach(loc => {
            botlefts.push({ x: loc.x, y: loc.y - 1 });
        });
        //check if we're in full-on legacy
        if (botlefts.length == 1 && toprights.length == 0) {
            //cheat in a topright without knowing it's actual height
            var pos = img.findSubimage(imgs.legacyreport);
            if (pos.length == 1) {
                toprights.push({ x: pos[0].x + 32, y: pos[0].y - 170, type: "legacy" });
            }
        }
        var groups = [];
        var groupcorners = function () {
            var done = true;
            for (var a in toprights) {
                if (groups.find(q => q.topright == toprights[a])) {
                    continue;
                }
                done = false;
                for (var b in botlefts) {
                    if (groups.find(q => q.botleft == botlefts[b])) {
                        continue;
                    }
                    var group = {
                        timestamp: false,
                        type: "main",
                        leftfound: false,
                        topright: toprights[a],
                        botleft: botlefts[b],
                        rect: new _alt1_base__WEBPACK_IMPORTED_MODULE_0__.Rect(botlefts[b].x, toprights[a].y, toprights[a].x - botlefts[b].x, botlefts[b].y - toprights[a].y),
                        line0x: 0,
                        line0y: 0
                    };
                    if (groups.find(q => q.rect.overlaps(group.rect))) {
                        continue;
                    }
                    groups[groups.length] = group;
                    if (groupcorners()) {
                        return true;
                    }
                    groups.splice(groups.length - 1, 1);
                }
            }
            return done;
        };
        if (!groupcorners()) {
            return null;
        }
        var mainbox = null;
        groups.forEach(group => {
            let buf = img.toData(group.rect.x - 110, group.rect.y + group.rect.height - 5, 150, 20);
            let nameread = _alt1_ocr__WEBPACK_IMPORTED_MODULE_1__.readLine(buf, chatfont, [255, 255, 255], 110, 14, false, true);
            if (nameread) {
                var d = 0;
                if (nameread.text == "Clan Chat") {
                    group.type = "cc";
                    d = 62;
                }
                else if (nameread.text == "Friends Chat") {
                    group.type = "fc";
                    d = 76;
                }
                else if (nameread.text == "Group Chat") {
                    group.type = "gc";
                    d = 69;
                }
                else if (nameread.text == "Guest Clan Chat") {
                    group.type = "gcc";
                    d = 98;
                }
                if (d != 0) {
                    group.rect.x -= d;
                    group.rect.width += d;
                    group.leftfound = true;
                }
            }
            if (!group.leftfound && group.topright.type == "full") {
                var pos = [];
                if (pos.length == 0) {
                    pos = img.findSubimage(imgs.gameall, Math.max(0, group.rect.x - 300), group.rect.y - 22, 310, 16);
                }
                if (pos.length == 0) {
                    pos = img.findSubimage(imgs.gamefilter, Math.max(0, group.rect.x - 300), group.rect.y - 22, 310, 16);
                }
                if (pos.length == 0) {
                    pos = img.findSubimage(imgs.gameoff, Math.max(0, group.rect.x - 300), group.rect.y - 22, 310, 16);
                }
                if (pos.length != 0) {
                    group.leftfound = true;
                    var d = group.rect.x - pos[0].x;
                    group.rect.x -= d;
                    group.rect.width += d;
                }
            }
            //alt1.overLayRect(a1lib.mixcolor(255, 255, 255), group.rect.x, group.rect.y, group.rect.width, group.rect.height, 10000, 2);
            //alt1.overLayTextEx(group.type, a1lib.mixcolor(255, 255, 255), 20, group.rect.x + group.rect.width / 2 | 0, group.rect.y + group.rect.height / 2 | 0, 10000, "", true, true);
            group.line0x = 0;
            group.line0y = group.rect.height - 15; //12;//- 15;//-11//- 9;//-10 before mobile interface update
            if (group.leftfound) {
                group.timestamp = this.checkTimestamp(img, group);
            }
            if (mainbox == null || group.type == "main") {
                mainbox = group;
            }
        });
        if (groups.length == 0 || !mainbox) {
            return null;
        }
        var res = {
            mainbox: mainbox,
            boxes: groups
        };
        this.pos = res;
        return res;
    }
    checkTimestamp(img, pos) {
        //TODO replace this
        return false;
    }
    static getMessageTime(str) {
        let m = str.match(/^\[(\d{2}):(\d{2}):(\d{2})\]/);
        if (!m) {
            return -1;
        }
        return (+m[1]) * 60 * 60 + (+m[2]) * 60 + (+m[3]);
    }
    static getFontColor(buffer, x, y, w, h) {
        var bestscore = -Infinity;
        var bestx = 0, besty = 0;
        var data = buffer.data;
        for (var cx = x; cx < x + w - 1; cx++) {
            for (var cy = y; cy < y + h - 1; cy++) {
                var i1 = 4 * cx + 4 * buffer.width * cy;
                var i2 = 4 * (cx + 1) + 4 * buffer.width * (cy + 1);
                var colorness = data[i1] + data[i1 + 1] + data[i1 + 2];
                var blackness = data[i2] + data[i2 + 1] + data[i2 + 2];
                var score = Math.min(255, 255 + 20 - blackness) * colorness;
                if (score > bestscore) {
                    bestscore = score;
                    bestx = cx;
                    besty = cy;
                }
            }
        }
        return buffer.getPixel(bestx, besty);
    }
}
let checkchatbadge = (ctx) => {
    let addspace = ctx.forward && ctx.text.length != 0 && ctx.text[ctx.text.length - 1] != " ";
    for (let badge in chatbadges.raw) {
        let bimg = chatbadges.raw[badge];
        let badgeleft = (ctx.forward ? ctx.rightx + (addspace ? ctx.font.spacewidth : 0) : ctx.leftx - bimg.width);
        let d = ctx.imgdata.pixelCompare(bimg, badgeleft, ctx.baseliney + ctx.badgedy);
        if (d < Infinity) {
            if (addspace) {
                ctx.addfrag({ color: [255, 255, 255], index: -1, xstart: ctx.rightx, xend: badgeleft, text: " " });
            }
            ctx.addfrag({ color: [255, 255, 255], index: -1, text: badgemap[badge], xstart: badgeleft, xend: badgeleft + bimg.width });
            return true;
        }
    }
};
let defaultforwardnudges = [
    {
        //fix for "[" first char
        match: /^$/,
        name: "timestampopen", fn: (ctx) => {
            let timestampopen = _alt1_ocr__WEBPACK_IMPORTED_MODULE_1__.readChar(ctx.imgdata, ctx.font, [255, 255, 255], ctx.rightx, ctx.baseliney, false, false);
            if ((timestampopen === null || timestampopen === void 0 ? void 0 : timestampopen.chr) == "[") {
                ctx.addfrag({ color: [255, 255, 255], index: -1, text: "[", xstart: ctx.rightx, xend: ctx.rightx + timestampopen.basechar.width });
                return true;
            }
        }
    },
    {
        match: /(\] ?|news: ?|^)$/i,
        name: "badge", fn: checkchatbadge
    },
    {
        match: /.*/,
        name: "body", fn: ctx => {
            var data = _alt1_ocr__WEBPACK_IMPORTED_MODULE_1__.readLine(ctx.imgdata, ctx.font, ctx.colors, ctx.rightx, ctx.baseliney, true, false);
            if (data.text) {
                data.fragments.forEach(f => ctx.addfrag(f));
                return true;
            }
        }
    },
    {
        match: /\[[\w: ]+$/,
        name: "timestampclose", fn: ctx => {
            let closebracket = _alt1_ocr__WEBPACK_IMPORTED_MODULE_1__.readChar(ctx.imgdata, ctx.font, [255, 255, 255], ctx.rightx, ctx.baseliney, false, false);
            if ((closebracket === null || closebracket === void 0 ? void 0 : closebracket.chr) == "]") {
                ctx.addfrag({ color: [255, 255, 255], text: "] ", index: -1, xstart: ctx.rightx, xend: ctx.rightx + closebracket.basechar.width + ctx.font.spacewidth });
                return true;
            }
        }
    },
    {
        match: /(^|\]|:)( ?)$/i,
        name: "startline", fn: (ctx, match) => {
            let addspace = !match[2];
            let x = ctx.rightx + (addspace ? ctx.font.spacewidth : 0);
            let best = null;
            let bestcolor = null;
            for (let col of ctx.colors) {
                let chr = _alt1_ocr__WEBPACK_IMPORTED_MODULE_1__.readChar(ctx.imgdata, ctx.font, col, x, ctx.baseliney, false, false);
                if (chr && (!best || chr.sizescore < best.sizescore)) {
                    best = chr;
                    bestcolor = col;
                }
            }
            if (bestcolor) {
                var data = _alt1_ocr__WEBPACK_IMPORTED_MODULE_1__.readLine(ctx.imgdata, ctx.font, bestcolor, x, ctx.baseliney, true, false);
                if (data.text) {
                    if (addspace) {
                        ctx.addfrag({ color: [255, 255, 255], index: -1, text: " ", xstart: ctx.rightx, xend: x });
                    }
                    //console.log("hardrecol", text, data.text);
                    data.fragments.forEach(f => ctx.addfrag(f));
                    return true;
                }
            }
        }
    },
    {
        match: /\w$/,
        name: "whitecolon", fn: ctx => {
            let startx = ctx.rightx;
            let colonchar = _alt1_ocr__WEBPACK_IMPORTED_MODULE_1__.readChar(ctx.imgdata, ctx.font, [255, 255, 255], startx, ctx.baseliney, false, true);
            if ((colonchar === null || colonchar === void 0 ? void 0 : colonchar.chr) == ":") {
                ctx.addfrag({ color: [255, 255, 255], index: -1, text: ": ", xstart: startx, xend: startx + colonchar.basechar.width + ctx.font.spacewidth });
                return true;
            }
        }
    }
];
let defaultbackwardnudges = [
    {
        match: /^(news: |[\w\-_]{1,12}: )/i,
        name: "badge", fn: checkchatbadge
    },
    {
        match: /.*/,
        name: "body", fn: ctx => {
            var data = _alt1_ocr__WEBPACK_IMPORTED_MODULE_1__.readLine(ctx.imgdata, ctx.font, ctx.colors, ctx.leftx, ctx.baseliney, false, true);
            if (data.text) {
                data.fragments.reverse().forEach(f => ctx.addfrag(f));
                return true;
            }
        }
    },
    {
        match: /^\w/,
        name: "whitecolon", fn: ctx => {
            let startx = ctx.leftx - ctx.font.spacewidth;
            let colonchar = _alt1_ocr__WEBPACK_IMPORTED_MODULE_1__.readChar(ctx.imgdata, ctx.font, [255, 255, 255], startx, ctx.baseliney, false, true);
            if ((colonchar === null || colonchar === void 0 ? void 0 : colonchar.chr) == ":") {
                startx -= colonchar.basechar.width;
                ctx.addfrag({ color: [255, 255, 255], index: -1, text: ": ", xstart: startx, xend: startx + colonchar.basechar.width + ctx.font.spacewidth });
                return true;
            }
        }
    }
];


/***/ }),

/***/ "../node_modules/.pnpm/@alt1+ocr@1.0.0-alpha.7/node_modules/@alt1/ocr/dist/index.js":
/*!******************************************************************************************!*\
  !*** ../node_modules/.pnpm/@alt1+ocr@1.0.0-alpha.7/node_modules/@alt1/ocr/dist/index.js ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GetChatColorMono: () => (/* binding */ GetChatColorMono),
/* harmony export */   canblend: () => (/* binding */ canblend),
/* harmony export */   debug: () => (/* binding */ debug),
/* harmony export */   debugFont: () => (/* binding */ debugFont),
/* harmony export */   debugout: () => (/* binding */ debugout),
/* harmony export */   decompose2col: () => (/* binding */ decompose2col),
/* harmony export */   decompose3col: () => (/* binding */ decompose3col),
/* harmony export */   decomposeblack: () => (/* binding */ decomposeblack),
/* harmony export */   findChar: () => (/* binding */ findChar),
/* harmony export */   findReadLine: () => (/* binding */ findReadLine),
/* harmony export */   generatefont: () => (/* binding */ generatefont),
/* harmony export */   getChatColor: () => (/* binding */ getChatColor),
/* harmony export */   readChar: () => (/* binding */ readChar),
/* harmony export */   readLine: () => (/* binding */ readLine),
/* harmony export */   readSmallCapsBackwards: () => (/* binding */ readSmallCapsBackwards),
/* harmony export */   unblendBlackBackground: () => (/* binding */ unblendBlackBackground),
/* harmony export */   unblendKnownBg: () => (/* binding */ unblendKnownBg),
/* harmony export */   unblendTrans: () => (/* binding */ unblendTrans)
/* harmony export */ });
/* harmony import */ var _alt1_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @alt1/base */ "../node_modules/.pnpm/@alt1+base@1.0.0-alpha.7/node_modules/@alt1/base/dist/index.js");

var debug = {
    printcharscores: false,
    trackread: false
};
var debugout = {};
/**
 * draws the font definition to a buffer and displays it in the dom for debugging purposes
 * @param font
 */
function debugFont(font) {
    var spacing = font.width + 2;
    var buf = new _alt1_base__WEBPACK_IMPORTED_MODULE_0__.ImageData(spacing * font.chars.length, font.height + 1);
    for (var a = 0; a < buf.data.length; a += 4) {
        buf.data[a] = buf.data[a + 1] = buf.data[a + 2] = 0;
        buf.data[a + 3] = 255;
    }
    for (var a = 0; a < font.chars.length; a++) {
        var bx = a * spacing;
        var chr = font.chars[a];
        for (var b = 0; b < chr.pixels.length; b += (font.shadow ? 4 : 3)) {
            buf.setPixel(bx + chr.pixels[b], chr.pixels[b + 1], [chr.pixels[b + 2], chr.pixels[b + 2], chr.pixels[b + 2], 255]);
            if (font.shadow) {
                buf.setPixel(bx + chr.pixels[b], chr.pixels[b + 1], [chr.pixels[b + 3], 0, 0, 255]);
            }
        }
    }
    buf.show();
}
function unblendBlackBackground(img, r, g, b) {
    var rimg = new _alt1_base__WEBPACK_IMPORTED_MODULE_0__.ImageData(img.width, img.height);
    for (var i = 0; i < img.data.length; i += 4) {
        var col = decomposeblack(img.data[i], img.data[i + 1], img.data[i + 2], r, g, b);
        rimg.data[i + 0] = col[0] * 255;
        rimg.data[i + 1] = rimg.data[i + 0];
        rimg.data[i + 2] = rimg.data[i + 0];
        rimg.data[i + 3] = 255;
    }
    return rimg;
}
/**
 * unblends a imagebuffer into match strength with given color
 * the bgimg argument should contain a second image with pixel occluded by the font visible.
 * @param img
 * @param shadow detect black as second color
 * @param bgimg optional second image to
 */
function unblendKnownBg(img, bgimg, shadow, r, g, b) {
    if (bgimg && (img.width != bgimg.width || img.height != bgimg.height)) {
        throw "bgimg size doesn't match";
    }
    var rimg = new _alt1_base__WEBPACK_IMPORTED_MODULE_0__.ImageData(img.width, img.height);
    var totalerror = 0;
    for (var i = 0; i < img.data.length; i += 4) {
        var col = decompose2col(img.data[i], img.data[i + 1], img.data[i + 2], r, g, b, bgimg.data[i + 0], bgimg.data[i + 1], bgimg.data[i + 2]);
        if (shadow) {
            if (col[2] > 0.01) {
                console.log("high error component: " + (col[2] * 100).toFixed(1) + "%");
            }
            totalerror += col[2];
            var m = 1 - col[1] - Math.abs(col[2]); //main color+black=100%-bg-error
            rimg.data[i + 0] = m * 255;
            rimg.data[i + 1] = col[0] / m * 255;
            rimg.data[i + 2] = rimg.data[i + 0];
        }
        else {
            rimg.data[i + 0] = col[0] * 255;
            rimg.data[i + 1] = rimg.data[i + 0];
            rimg.data[i + 2] = rimg.data[i + 0];
        }
        rimg.data[i + 3] = 255;
    }
    return rimg;
}
/**
 * Unblends a font image that is already conpletely isolated to the raw image used ingame. This is the easiest mode for pixel fonts where alpha is 0 or 255, or for extracted font files.
 * @param img
 * @param r
 * @param g
 * @param b
 * @param shadow whether the font has a black shadow
 */
function unblendTrans(img, shadow, r, g, b) {
    var rimg = new _alt1_base__WEBPACK_IMPORTED_MODULE_0__.ImageData(img.width, img.height);
    var pxlum = r + g + b;
    for (var i = 0; i < img.data.length; i += 4) {
        if (shadow) {
            var lum = img.data[i + 0] + img.data[i + 1] + img.data[i + 2];
            rimg.data[i + 0] = img.data[i + 3];
            rimg.data[i + 1] = lum / pxlum * 255;
            rimg.data[i + 2] = rimg.data[i + 0];
        }
        else {
            rimg.data[i + 0] = img.data[i + 3];
            rimg.data[i + 1] = rimg.data[i + 0];
            rimg.data[i + 2] = rimg.data[i + 0];
        }
        rimg.data[i + 3] = 255;
    }
    return rimg;
}
/**
 * Determised wether color [rgb]m can be a result of a blend with color [rgb]1 that is p (0-1) of the mix
 * It returns the number that the second color has to lie outside of the possible color ranges
 * @param rm resulting color
 * @param r1 first color of the mix (the other color is unknown)
 * @param p the portion of the [rgb]1 in the mix (0-1)
 */
function canblend(rm, gm, bm, r1, g1, b1, p) {
    var m = Math.min(50, p / (1 - p));
    var r = rm + (rm - r1) * m;
    var g = gm + (gm - g1) * m;
    var b = bm + (bm - b1) * m;
    return Math.max(0, -r, -g, -b, r - 255, g - 255, b - 255);
}
/**
 * decomposes a color in 2 given component colors and returns the amount of each color present
 * also return a third (noise) component which is the the amount leftover orthagonal from the 2 given colors
 */
function decompose2col(rp, gp, bp, r1, g1, b1, r2, g2, b2) {
    //get the normal of the error (cross-product of both colors)
    var r3 = g1 * b2 - g2 * b1;
    var g3 = b1 * r2 - b2 * r1;
    var b3 = r1 * g2 - r2 * g1;
    //normalize to length 255
    var norm = 255 / Math.sqrt(r3 * r3 + g3 * g3 + b3 * b3);
    r3 *= norm;
    g3 *= norm;
    b3 *= norm;
    return decompose3col(rp, gp, bp, r1, g1, b1, r2, g2, b2, r3, g3, b3);
}
/**
 * decomposes a pixel in a given color component and black and returns what proportion of the second color it contains
 * this is not as formal as decompose 2/3 and only give a "good enough" number
 */
function decomposeblack(rp, gp, bp, r1, g1, b1) {
    var dr = Math.abs(rp - r1);
    var dg = Math.abs(gp - g1);
    var db = Math.abs(bp - b1);
    var maxdif = Math.max(dr, dg, db);
    return [1 - maxdif / 255];
}
/**
 * decomposes a color in 3 given component colors and returns the amount of each color present
 */
function decompose3col(rp, gp, bp, r1, g1, b1, r2, g2, b2, r3, g3, b3) {
    //P=x*C1+y*C2+z*C3
    //assemble as matrix 
    //M*w=p
    //get inverse of M
    //dirty written out version of cramer's rule
    var A = g2 * b3 - b2 * g3;
    var B = g3 * b1 - b3 * g1;
    var C = g1 * b2 - b1 * g2;
    var D = b2 * r3 - r2 * b3;
    var E = b3 * r1 - r3 * b1;
    var F = b1 * r2 - r1 * b2;
    var G = r2 * g3 - g2 * r3;
    var H = r3 * g1 - g3 * r1;
    var I = r1 * g2 - g1 * r2;
    var det = r1 * A + g1 * D + b1 * G;
    //M^-1*p=w
    var x = (A * rp + D * gp + G * bp) / det;
    var y = (B * rp + E * gp + H * bp) / det;
    var z = (C * rp + F * gp + I * bp) / det;
    return [x, y, z];
}
/**
 * brute force to the exact position of the text
 */
function findChar(buffer, font, col, x, y, w, h) {
    if (x < 0) {
        return null;
    }
    if (y - font.basey < 0) {
        return null;
    }
    if (x + w + font.width > buffer.width) {
        return null;
    }
    if (y + h - font.basey + font.height > buffer.height) {
        return null;
    }
    var best = 1000; //TODO finetune score constants
    var bestchar = null;
    for (var cx = x; cx < x + w; cx++) {
        for (var cy = y; cy < y + h; cy++) {
            var chr = readChar(buffer, font, col, cx, cy, false, false);
            if (chr != null && chr.sizescore < best) {
                best = chr.sizescore;
                bestchar = chr;
            }
        }
    }
    return bestchar;
}
/**
 * reads text with unknown exact coord or color. The given coord should be inside the text
 * color selection not implemented yet
 */
function findReadLine(buffer, font, cols, x, y, w = -1, h = -1) {
    if (w == -1) {
        w = font.width + font.spacewidth;
        x -= Math.ceil(w / 2);
    }
    if (h == -1) {
        h = 7;
        y -= 1;
    }
    var chr = null;
    if (cols.length > 1) {
        //TODO use getChatColor() instead for non-mono?
        var sorted = GetChatColorMono(buffer, new _alt1_base__WEBPACK_IMPORTED_MODULE_0__.Rect(x, y - font.basey, w, h), cols);
        //loop until we have a match (max 2 cols)
        for (var a = 0; a < 2 && a < sorted.length && chr == null; a++) {
            chr = findChar(buffer, font, sorted[a].col, x, y, w, h);
        }
    }
    else {
        chr = findChar(buffer, font, cols[0], x, y, w, h);
    }
    if (chr == null) {
        return { debugArea: { x, y, w, h }, text: "", fragments: [] };
    }
    return readLine(buffer, font, cols, chr.x, chr.y, true, true);
}
function GetChatColorMono(buf, rect, colors) {
    var colormap = colors.map(c => ({ col: c, score: 0 }));
    if (rect.x < 0 || rect.y < 0 || rect.x + rect.width > buf.width || rect.y + rect.height > buf.height) {
        return colormap;
    }
    var data = buf.data;
    var maxd = 50;
    for (var colobj of colormap) {
        var score = 0;
        var col = colobj.col;
        for (var y = rect.y; y < rect.y + rect.height; y++) {
            for (var x = rect.x; x < rect.x + rect.width; x++) {
                var i = x * 4 + y * 4 * buf.width;
                var d = Math.abs(data[i] - col[0]) + Math.abs(data[i + 1] - col[1]) + Math.abs(data[i + 2] - col[2]);
                if (d < maxd) {
                    score += maxd - d;
                }
            }
        }
        colobj.score = score;
    }
    return colormap.sort((a, b) => b.score - a.score);
}
function unblend(r, g, b, R, G, B) {
    var m = Math.sqrt(r * r + g * g + b * b);
    var n = Math.sqrt(R * R + G * G + B * B);
    var x = (r * R + g * G + b * B) / n;
    var y = Math.sqrt(Math.max(0, m * m - x * x));
    var r1 = Math.max(0, (63.75 - y) * 4);
    var r2 = x / n * 255;
    if (r2 > 255) //brighter than refcol
     {
        r1 = Math.max(0, r1 - r2 + 255);
        r2 = 255;
    }
    return [r1, r2];
}
function getChatColor(buf, rect, colors) {
    var bestscore = -1.0;
    var best = null;
    var b2 = 0.0;
    var data = buf.data;
    for (let col of colors) {
        var score = 0.0;
        for (var y = rect.y; y < rect.y + rect.height; y++) {
            for (var x = rect.x; x < rect.x + rect.width; x++) {
                if (x < 0 || x + 1 >= buf.width) {
                    continue;
                }
                if (y < 0 || y + 1 >= buf.width) {
                    continue;
                }
                let i1 = buf.pixelOffset(x, y);
                let i2 = buf.pixelOffset(x + 1, y + 1);
                var pixel1 = unblend(data[i1 + 0], data[i1 + 1], data[i1 + 2], col[0], col[1], col[2]);
                var pixel2 = unblend(data[i2 + 0], data[i2 + 1], data[i2 + 2], col[0], col[1], col[2]);
                //TODO this is from c# can simplify a bit
                var s = (pixel1[0] / 255 * pixel1[1] / 255) * (pixel2[0] / 255 * (255.0 - pixel2[1]) / 255);
                score += s;
            }
        }
        if (score > bestscore) {
            b2 = bestscore;
            bestscore = score;
            best = col;
        }
        else if (score > b2) {
            b2 = score;
        }
    }
    //Console.WriteLine("color: " + bestcol + " - " + (bestscore - b2));
    //bestscore /= rect.width * rect.height;
    return best;
}
/**
 * reads a line of text with exactly known position and color. y should be the y coord of the text base line, x should be the first pixel of a new character
 */
function readLine(buffer, font, colors, x, y, forward, backward = false) {
    if (typeof colors[0] != "number" && colors.length == 1) {
        colors = colors[0];
    }
    var multicol = typeof colors[0] != "number";
    var allcolors = multicol ? colors : [colors];
    var detectcolor = function (sx, sy, backward) {
        var w = Math.floor(font.width * 1.5);
        if (backward) {
            sx -= w;
        }
        sy -= font.basey;
        return getChatColor(buffer, { x: sx, y: sy, width: w, height: font.height }, allcolors);
    };
    var fragments = [];
    var x1 = x;
    var x2 = x;
    var maxspaces = (typeof font.maxspaces == "number" ? font.maxspaces : 1);
    let fragtext = "";
    let fraghadprimary = false;
    var lastcol = null;
    let addfrag = (forward) => {
        if (!fragtext) {
            return;
        }
        let frag = {
            text: fragtext,
            color: lastcol,
            index: 0,
            xstart: x + (forward ? fragstartdx : fragenddx),
            xend: x + (forward ? fragenddx : fragstartdx)
        };
        if (forward) {
            fragments.push(frag);
        }
        else {
            fragments.unshift(frag);
        }
        fragtext = "";
        fragstartdx = dx;
        fraghadprimary = false;
    };
    for (var dirforward of [true, false]) {
        //init vars
        if (dirforward && !forward) {
            continue;
        }
        if (!dirforward && !backward) {
            continue;
        }
        var dx = 0;
        var fragstartdx = dx;
        var fragenddx = dx;
        var triedspaces = 0;
        var triedrecol = false;
        var col = multicol ? null : colors;
        while (true) {
            col = col || detectcolor(x + dx, y, !dirforward);
            var chr = (col ? readChar(buffer, font, col, x + dx, y, !dirforward, true) : null);
            if (col == null || chr == null) {
                if (triedspaces < maxspaces) {
                    dx += (dirforward ? 1 : -1) * font.spacewidth;
                    triedspaces++;
                    continue;
                }
                if (multicol && !triedrecol && fraghadprimary) {
                    dx -= (dirforward ? 1 : -1) * triedspaces * font.spacewidth;
                    triedspaces = 0;
                    col = null;
                    triedrecol = true;
                    continue;
                }
                if (dirforward) {
                    x2 = x + dx - font.spacewidth;
                }
                else {
                    x1 = x + dx + font.spacewidth;
                }
                break;
            }
            else {
                if (lastcol && (col[0] != lastcol[0] || col[1] != lastcol[1] || col[2] != lastcol[2])) {
                    addfrag(dirforward);
                }
                var spaces = "";
                for (var a = 0; a < triedspaces; a++) {
                    spaces += " ";
                }
                if (dirforward) {
                    fragtext += spaces + chr.chr;
                }
                else {
                    fragtext = chr.chr + spaces + fragtext;
                }
                if (!chr.basechar.secondary) {
                    fraghadprimary = true;
                }
                triedspaces = 0;
                triedrecol = false;
                dx += (dirforward ? 1 : -1) * chr.basechar.width;
                fragenddx = dx;
                lastcol = col;
            }
        }
        if (lastcol && fraghadprimary) {
            addfrag(dirforward);
        }
    }
    fragments.forEach((f, i) => f.index = i);
    return {
        debugArea: { x: x1, y: y - 9, w: x2 - x1, h: 10 },
        text: fragments.map(f => f.text).join(""),
        fragments
    };
}
/**
 * Reads a line of text that uses a smallcaps font, these fonts can have duplicate chars that only have a different amount of
 * empty space after the char before the next char starts.
 * The coordinates should be near the end of the string, or a rectangle with high 1 containing all points where the string can end.
 */
function readSmallCapsBackwards(buffer, font, cols, x, y, w = -1, h = -1) {
    if (w == -1) {
        w = font.width + font.spacewidth;
        x -= Math.ceil(w / 2);
    }
    if (h == -1) {
        h = 7;
        y -= 1;
    }
    var matchedchar = null;
    var sorted = (cols.length == 1 ? [{ col: cols[0], score: 1 }] : GetChatColorMono(buffer, new _alt1_base__WEBPACK_IMPORTED_MODULE_0__.Rect(x, y - font.basey, w, h), cols));
    //loop until we have a match (max 2 cols)
    for (var a = 0; a < 2 && a < sorted.length && matchedchar == null; a++) {
        for (var cx = x + w - 1; cx >= x; cx--) {
            var best = 1000; //TODO finetune score constants
            var bestchar = null;
            for (var cy = y; cy < y + h; cy++) {
                var chr = readChar(buffer, font, sorted[a].col, cx, cy, true, false);
                if (chr != null && chr.sizescore < best) {
                    best = chr.sizescore;
                    bestchar = chr;
                }
            }
            if (bestchar) {
                matchedchar = bestchar;
                break;
            }
        }
    }
    if (matchedchar == null) {
        return { text: "", debugArea: { x, y, w, h } };
    }
    return readLine(buffer, font, cols, matchedchar.x, matchedchar.y, false, true);
}
/**
 * Reads a single character at the exact given location
 * @param x exact x location of the start of the character domain (includes part of the spacing between characters)
 * @param y exact y location of the baseline pixel of the character
 * @param backwards read in backwards direction, the x location should be the first pixel after the character domain in that case
 */
function readChar(buffer, font, col, x, y, backwards, allowSecondary) {
    y -= font.basey;
    var shiftx = 0;
    var shifty = font.basey;
    var shadow = font.shadow;
    var debugobj = null;
    var debugimg = null;
    if (debug.trackread) {
        var name = x + ";" + y + " " + JSON.stringify(col);
        if (!debugout[name]) {
            debugout[name] = [];
        }
        debugobj = debugout[name];
    }
    //===== make sure the full domain is inside the bitmap/buffer ======
    if (y < 0 || y + font.height >= buffer.height) {
        return null;
    }
    if (!backwards) {
        if (x < 0 || x + font.width > buffer.width) {
            return null;
        }
    }
    else {
        if (x - font.width < 0 || x > buffer.width) {
            return null;
        }
    }
    //====== start reading the char ======
    var scores = [];
    for (var chr = 0; chr < font.chars.length; chr++) {
        var chrobj = font.chars[chr];
        if (chrobj.secondary && !allowSecondary) {
            continue;
        }
        scores[chr] = { score: 0, sizescore: 0, chr: chrobj };
        var chrx = (backwards ? x - chrobj.width : x);
        if (debug.trackread) {
            debugimg = new _alt1_base__WEBPACK_IMPORTED_MODULE_0__.ImageData(font.width, font.height);
        }
        for (var a = 0; a < chrobj.pixels.length;) {
            var i = (chrx + chrobj.pixels[a]) * 4 + (y + chrobj.pixels[a + 1]) * buffer.width * 4;
            var penalty = 0;
            if (!shadow) {
                penalty = canblend(buffer.data[i], buffer.data[i + 1], buffer.data[i + 2], col[0], col[1], col[2], chrobj.pixels[a + 2] / 255);
                a += 3;
            }
            else {
                var lum = chrobj.pixels[a + 3] / 255;
                penalty = canblend(buffer.data[i], buffer.data[i + 1], buffer.data[i + 2], col[0] * lum, col[1] * lum, col[2] * lum, chrobj.pixels[a + 2] / 255);
                a += 4;
            }
            scores[chr].score += Math.max(0, penalty);
            //TODO add compiler flag to this to remove it for performance
            if (debugimg) {
                debugimg.setPixel(chrobj.pixels[a], chrobj.pixels[a + 1], [penalty, penalty, penalty, 255]);
            }
        }
        scores[chr].sizescore = scores[chr].score - chrobj.bonus;
        if (debugobj) {
            debugobj.push({ chr: chrobj.chr, score: scores[chr].sizescore, rawscore: scores[chr].score, img: debugimg });
        }
    }
    scores.sort((a, b) => a.sizescore - b.sizescore);
    if (debug.printcharscores) {
        scores.slice(0, 5).forEach(q => console.log(q.chr.chr, q.score.toFixed(3), q.sizescore.toFixed(3)));
    }
    var winchr = scores[0];
    if (!winchr || winchr.score > 400) {
        return null;
    }
    return { chr: winchr.chr.chr, basechar: winchr.chr, x: x + shiftx, y: y + shifty, score: winchr.score, sizescore: winchr.sizescore };
}
/**
 * Generates a font json description to use in reader functions
 * @param unblended A source image with all characters lined up. The image should be unblended into components using the unblend functions
 * The lowest pixel line of this image is used to mark the location and size of the charecters if the red component is 255 it means there is a character on that pixel column
 * @param chars A string containing all the characters of the image in the same order
 * @param seconds A string with characters that are considered unlikely and should only be detected if no other character is possible.
 * For example the period (.) character matches positive inside many other characters and should be marked as secondary
 * @param bonusses An object that contains bonus scores for certain difficult characters to make the more likely to be red.
 * @param basey The y position of the baseline pixel of the font
 * @param spacewidth the number of pixels a space takes
 * @param treshold minimal color match proportion (0-1) before a pixel is used for the font
 * @param shadow whether this font also uses the black shadow some fonts have. The "unblended" image should be unblended correspondingly
 * @returns a javascript object describing the font which is used as input for the different read functions
 */
function generatefont(unblended, chars, seconds, bonusses, basey, spacewidth, treshold, shadow) {
    //settings vars
    treshold *= 255;
    //initial vars
    var miny = unblended.height - 1;
    var maxy = 0;
    var font = { chars: [], width: 0, spacewidth: spacewidth, shadow: shadow, height: 0, basey: 0 };
    var ds = false;
    var chardata = [];
    //index all chars
    for (var dx = 0; dx < unblended.width; dx++) {
        var i = 4 * dx + 4 * unblended.width * (unblended.height - 1);
        if (unblended.data[i] == 255 && unblended.data[i + 3] == 255) {
            if (ds === false) {
                ds = dx;
            }
        }
        else {
            if (ds !== false) {
                //char found, start detection
                var de = dx;
                var char = chars[chardata.length];
                var chr = {
                    ds: ds,
                    de: de,
                    width: de - ds,
                    chr: char,
                    bonus: (bonusses && bonusses[char]) || 0,
                    secondary: seconds.indexOf(chars[chardata.length]) != -1,
                    pixels: []
                };
                chardata.push(chr);
                font.width = Math.max(font.width, chr.width);
                for (x = 0; x < de - ds; x++) {
                    for (y = 0; y < unblended.height - 1; y++) {
                        var i = (x + ds) * 4 + y * unblended.width * 4;
                        if (unblended.data[i] >= treshold) {
                            miny = Math.min(miny, y);
                            maxy = Math.max(maxy, y);
                        }
                    }
                }
                ds = false;
            }
        }
    }
    font.height = maxy + 1 - miny;
    font.basey = basey - miny;
    //detect all pixels
    for (var a in chardata) {
        var chr = chardata[a];
        for (var x = 0; x < chr.width; x++) {
            for (var y = 0; y < maxy + 1 - miny; y++) {
                var i = (x + chr.ds) * 4 + (y + miny) * unblended.width * 4;
                if (unblended.data[i] >= treshold) {
                    chr.pixels.push(x, y);
                    chr.pixels.push(unblended.data[i]);
                    if (shadow) {
                        chr.pixels.push(unblended.data[i + 1]);
                    }
                    chr.bonus += 5;
                }
            }
        }
        //prevent js from doing the thing with unnecessary output precision
        chr.bonus = +chr.bonus.toFixed(3);
        font.chars.push({ width: chr.width, bonus: chr.bonus, chr: chr.chr, pixels: chr.pixels, secondary: chr.secondary });
    }
    return font;
}


/***/ }),

/***/ "../node_modules/.pnpm/@alt1+ocr@1.0.0-alpha.7/node_modules/@alt1/ocr/fonts/chat_8px.js":
/*!**********************************************************************************************!*\
  !*** ../node_modules/.pnpm/@alt1+ocr@1.0.0-alpha.7/node_modules/@alt1/ocr/fonts/chat_8px.js ***!
  \**********************************************************************************************/
/***/ (function(module) {

!function(s,e){ true?module.exports=e():0}("undefined"!=typeof self?self:this,(()=>{
return s=[s=>{s.exports={chars:[{width:7,bonus:140,chr:"a",
pixels:[0,7,187,255,1,3,221,255,1,6,169,255,1,7,164,132,1,8,255,255,2,3,255,255,2,4,221,0,2,5,196,243,2,7,170,0,2,8,255,255,2,9,255,0,3,3,255,255,3,4,255,0,3,5,255,255,3,6,187,0,3,8,221,255,3,9,255,0,4,4,254,239,4,5,255,255,4,6,254,204,4,7,255,255,4,8,240,253,4,9,221,0,5,5,240,36,5,6,255,34,5,7,211,41,5,8,255,34,5,9,238,0],
secondary:!1},{width:7,bonus:175,chr:"b",
pixels:[0,1,203,255,0,2,221,255,0,3,221,255,0,4,221,255,0,5,221,255,0,6,221,255,0,7,221,255,0,8,203,255,1,2,211,41,1,3,248,209,1,4,243,178,1,5,230,75,1,6,230,75,1,7,243,178,1,8,246,194,1,9,204,0,2,3,255,255,2,4,204,0,2,5,170,0,2,8,255,255,2,9,187,0,3,3,255,255,3,4,255,0,3,8,255,255,3,9,255,0,4,3,169,255,4,4,254,171,4,7,169,255,4,9,255,0,5,4,204,128,5,5,232,205,5,6,205,233,5,8,170,0,6,6,187,0,6,7,187,0],
secondary:!1},{width:7,bonus:95,chr:"c",
pixels:[0,5,169,255,0,6,187,255,1,4,187,255,1,6,193,90,1,7,237,201,1,8,164,185,2,3,255,255,2,5,187,0,2,8,255,255,3,3,255,255,3,4,255,0,3,8,255,255,3,9,255,0,4,3,221,255,4,4,255,34,4,8,221,255,4,9,255,0,5,4,226,39,5,9,221,0],secondary:!1},{width:7,
bonus:180,chr:"d",
pixels:[0,5,187,255,0,6,187,255,1,4,169,255,1,6,205,85,1,7,232,187,1,8,203,213,2,3,255,255,2,5,170,0,2,8,255,255,2,9,170,0,3,3,255,255,3,4,255,0,3,8,255,255,3,9,255,0,4,3,203,255,4,4,254,171,4,7,169,255,4,8,187,255,4,9,255,0,5,1,203,255,5,2,225,251,5,3,225,251,5,4,248,227,5,5,244,231,5,6,230,245,5,7,230,245,5,8,237,219,5,9,187,0,6,2,204,0,6,3,221,0,6,4,221,0,6,5,221,0,6,6,221,0,6,7,221,0,6,8,221,0,6,9,204,0],
secondary:!1},{width:7,bonus:135,chr:"e",
pixels:[0,5,187,255,0,6,169,255,1,4,187,255,1,5,255,255,1,6,209,104,1,7,237,219,2,3,255,255,2,5,255,255,2,6,255,0,2,8,255,255,3,3,255,255,3,4,255,0,3,5,255,255,3,6,255,0,3,8,255,255,3,9,255,0,4,3,187,255,4,4,255,119,4,5,255,255,4,6,255,0,4,8,221,255,4,9,255,0,5,4,224,155,5,5,227,229,5,6,255,0,5,9,221,0,6,6,204,0],
secondary:!1},{width:4,bonus:90,chr:"f",pixels:[0,3,203,255,1,2,221,255,1,3,255,255,1,4,248,227,1,5,225,251,1,6,225,251,1,7,225,251,1,8,210,247,2,1,255,255,2,3,255,255,2,4,255,0,2,5,221,0,2,6,221,0,2,7,221,0,2,8,221,0,2,9,204,0,3,2,255,0,3,4,255,0],
secondary:!1},{width:7,bonus:200,chr:"g",
pixels:[0,5,187,255,0,6,187,255,1,3,169,255,1,4,153,255,1,5,155,112,1,6,205,85,1,7,232,187,1,8,184,189,1,11,153,255,2,3,255,255,2,4,170,0,2,5,153,0,2,8,255,255,2,11,245,247,3,3,255,255,3,4,255,0,3,8,255,255,3,9,255,0,3,11,221,255,4,3,221,255,4,4,255,136,4,7,153,255,4,8,221,255,4,9,255,85,4,10,203,255,5,3,203,255,5,4,250,226,5,5,239,236,5,6,230,245,5,7,230,245,5,8,241,234,5,9,243,178,5,11,204,0,6,4,204,0,6,5,221,0,6,6,221,0,6,7,221,0,6,8,221,0,6,9,221,0,6,10,170,0],
secondary:!1},{width:7,bonus:165,chr:"h",
pixels:[0,1,203,255,0,2,221,255,0,3,221,255,0,4,221,255,0,5,221,255,0,6,221,255,0,7,221,255,0,8,203,255,1,2,211,41,1,3,243,178,1,4,248,209,1,5,230,75,1,6,226,39,1,7,226,39,1,8,226,39,1,9,204,0,2,3,255,255,2,4,170,0,2,5,204,0,3,3,255,255,3,4,255,0,4,3,169,255,4,4,255,221,4,5,221,255,4,6,221,255,4,7,221,255,4,8,203,255,5,4,175,25,5,5,226,39,5,6,226,39,5,7,226,39,5,8,226,39,5,9,204,0],
secondary:!1},{width:3,bonus:70,chr:"i",pixels:[0,1,237,255,0,3,203,255,0,4,221,255,0,5,221,255,0,6,221,255,0,7,221,255,0,8,203,255,1,2,238,0,1,4,211,41,1,5,226,39,1,6,226,39,1,7,226,39,1,8,226,39,1,9,204,0],secondary:!1},{width:4,bonus:90,chr:"j",
pixels:[0,11,153,255,1,11,169,255,2,1,203,255,2,3,203,255,2,4,225,251,2,5,225,251,2,6,225,251,2,7,225,251,2,8,225,251,2,9,225,251,3,2,204,0,3,4,204,0,3,5,221,0,3,6,221,0,3,7,221,0,3,8,221,0,3,9,221,0,3,10,221,0],secondary:!1},{width:6,bonus:130,
chr:"k",
pixels:[0,1,203,255,0,2,221,255,0,3,221,255,0,4,221,255,0,5,221,255,0,6,221,255,0,7,221,255,0,8,203,255,1,2,211,41,1,3,226,39,1,4,226,39,1,5,255,255,1,6,226,39,1,7,226,39,1,8,226,39,1,9,204,0,2,4,166,235,2,5,255,255,2,6,255,221,3,3,203,255,3,5,153,0,3,6,255,51,3,7,250,226,3,8,160,217,4,4,204,0,4,8,239,145],
secondary:!1},{width:3,bonus:75,chr:"l",pixels:[0,1,203,255,0,2,221,255,0,3,221,255,0,4,221,255,0,5,221,255,0,6,221,255,0,7,221,255,1,2,211,41,1,3,226,39,1,4,226,39,1,5,226,39,1,6,226,39,1,7,226,39,1,8,255,255,2,9,255,0],secondary:!1},{width:10,
bonus:210,chr:"m",
pixels:[0,3,203,255,0,4,221,255,0,5,221,255,0,6,221,255,0,7,221,255,0,8,203,255,1,4,248,227,1,5,230,75,1,6,226,39,1,7,226,39,1,8,226,39,1,9,204,0,2,3,237,255,2,5,221,0,3,3,255,255,3,4,238,0,4,3,153,255,4,4,255,255,4,5,221,255,4,6,221,255,4,7,221,255,4,8,203,255,5,4,228,209,5,5,255,68,5,6,226,39,5,7,226,39,5,8,226,39,5,9,204,0,6,3,255,255,6,5,187,0,7,3,237,255,7,4,255,85,8,4,249,174,8,5,232,243,8,6,225,251,8,7,225,251,8,8,210,247,9,5,170,0,9,6,221,0,9,7,221,0,9,8,221,0,9,9,204,0],
secondary:!1},{width:7,bonus:140,chr:"n",
pixels:[0,3,203,255,0,4,221,255,0,5,221,255,0,6,221,255,0,7,221,255,0,8,203,255,1,4,248,227,1,5,232,93,1,6,226,39,1,7,226,39,1,8,226,39,1,9,204,0,2,3,237,255,2,5,221,0,3,3,255,255,3,4,238,0,4,3,237,255,4,4,255,85,5,4,249,174,5,5,232,243,5,6,225,251,5,7,225,251,5,8,210,247,6,5,170,0,6,6,221,0,6,7,221,0,6,8,221,0,6,9,204,0],
secondary:!1},{width:8,bonus:120,chr:"o",
pixels:[0,5,187,255,0,6,169,255,1,4,203,255,1,6,209,104,1,7,244,231,2,3,237,255,2,5,204,0,2,8,252,241,3,3,255,255,3,4,238,0,3,8,255,255,3,9,238,0,4,3,237,255,4,4,255,0,4,8,255,255,4,9,255,0,5,4,251,207,5,7,221,255,5,9,255,0,6,5,237,183,6,6,192,225,6,8,221,0,7,6,170,0,7,7,170,0],
secondary:!1},{width:6,bonus:170,chr:"p",
pixels:[0,3,237,255,0,4,255,255,0,5,187,255,0,6,203,255,0,7,255,255,0,8,221,255,0,9,221,255,0,10,221,255,1,3,255,255,1,4,240,36,1,5,255,0,1,6,187,0,1,7,211,41,1,8,254,239,1,9,221,0,1,10,221,0,1,11,221,0,2,3,255,255,2,4,255,0,2,8,255,255,2,9,238,0,3,3,237,255,3,4,255,34,3,8,237,255,3,9,255,0,4,4,253,240,4,5,255,255,4,6,255,255,4,7,237,255,4,9,238,0,5,5,239,18,5,6,255,17,5,7,255,0,5,8,238,0],
secondary:!1},{width:7,bonus:165,chr:"q",
pixels:[0,5,187,255,0,6,187,255,1,3,169,255,1,4,153,255,1,5,155,112,1,6,205,85,1,7,228,171,1,8,209,207,2,3,255,255,2,4,170,0,2,5,153,0,2,8,255,255,2,9,170,0,3,3,237,255,3,4,255,17,3,8,237,255,3,9,255,0,4,3,255,255,4,4,255,255,4,5,191,250,4,6,187,255,4,7,255,255,4,8,239,254,4,9,253,223,4,10,221,255,5,4,255,34,5,5,255,34,5,6,196,45,5,7,196,45,5,8,255,34,5,9,240,36,5,10,226,39,5,11,221,0],
secondary:!1},{width:4,bonus:85,chr:"r",pixels:[0,3,203,255,0,4,221,255,0,5,221,255,0,6,221,255,0,7,221,255,0,8,203,255,1,3,187,255,1,4,244,213,1,5,232,93,1,6,226,39,1,7,226,39,1,8,226,39,1,9,204,0,2,3,255,255,2,4,187,0,2,5,204,0,3,4,255,0],
secondary:!1},{width:6,bonus:100,chr:"s",
pixels:[0,4,187,255,1,3,255,255,1,5,250,243,1,8,255,255,2,3,255,255,2,4,255,0,2,5,155,196,2,6,246,123,2,8,255,255,2,9,255,0,3,3,255,255,3,4,255,0,3,6,245,247,3,7,164,132,3,8,255,255,3,9,255,0,4,4,255,17,4,7,250,191,4,9,255,0,5,8,187,0],secondary:!1
},{width:5,bonus:80,chr:"t",pixels:[1,2,221,255,1,3,255,255,1,4,235,240,1,5,221,255,1,6,221,255,1,7,169,255,2,3,255,255,2,4,255,34,2,5,226,39,2,6,226,39,2,7,232,93,2,8,249,243,3,4,255,0,3,8,187,209,3,9,238,0,4,9,153,0],secondary:!1},{width:6,
bonus:135,chr:"u",
pixels:[0,3,203,255,0,4,221,255,0,5,221,255,0,6,221,255,0,7,169,255,1,4,211,41,1,5,226,39,1,6,226,39,1,7,232,93,1,8,249,243,2,8,255,255,2,9,238,0,3,8,203,255,3,9,255,0,4,3,203,255,4,4,221,255,4,5,221,255,4,6,203,255,4,7,255,255,4,8,228,247,4,9,204,0,5,4,211,41,5,5,226,39,5,6,226,39,5,7,211,41,5,8,255,34,5,9,221,0],
secondary:!1},{width:6,bonus:95,chr:"v",
pixels:[0,3,237,255,1,4,247,141,1,5,245,247,1,6,203,255,2,6,241,54,2,7,255,255,2,8,255,255,3,5,153,255,3,6,255,255,3,7,173,226,3,8,255,51,3,9,255,0,4,3,237,255,4,4,203,255,4,6,153,0,4,7,255,0,4,8,153,0,5,4,238,0,5,5,204,0],secondary:!1},{width:10,
bonus:170,chr:"w",
pixels:[1,3,153,255,1,4,243,249,1,5,187,255,2,4,153,0,2,5,243,71,2,6,228,171,2,7,243,249,2,8,187,255,3,6,217,239,3,7,248,244,3,8,248,157,3,9,187,0,4,3,169,255,4,4,255,255,4,7,204,0,4,8,238,0,4,9,153,0,5,4,244,231,5,5,255,221,5,6,191,159,6,5,223,19,6,6,237,128,6,7,255,255,6,8,223,253,7,6,239,254,7,7,227,229,7,8,255,119,7,9,221,0,8,3,237,255,8,4,203,255,8,7,238,0,8,8,204,0,9,4,238,0,9,5,204,0],
secondary:!1},{width:6,bonus:95,chr:"x",
pixels:[0,8,169,255,1,3,169,255,1,4,224,232,1,7,221,255,1,9,170,0,2,4,193,90,2,5,255,255,2,6,240,253,2,8,221,0,3,4,255,255,3,5,155,196,3,6,255,187,3,7,250,191,4,3,221,255,4,5,255,0,4,7,209,104,4,8,255,255,5,4,221,0,5,9,255,0],secondary:!1},{width:6,
bonus:110,chr:"y",
pixels:[0,3,255,255,0,4,153,255,0,11,221,255,1,4,255,85,1,5,234,222,1,6,228,247,1,11,196,243,2,6,207,21,2,7,246,194,2,8,255,255,2,9,237,255,3,6,237,255,3,7,191,250,3,8,205,85,3,9,255,0,3,10,238,0,4,3,203,255,4,4,221,255,4,7,238,0,4,8,187,0,5,4,204,0,5,5,221,0],
secondary:!1},{width:6,bonus:130,chr:"z",
pixels:[0,3,153,255,0,8,203,255,1,3,255,255,1,4,153,0,1,7,221,255,1,8,255,255,1,9,204,0,2,3,255,255,2,4,255,0,2,6,255,255,2,8,255,255,2,9,255,0,3,3,255,255,3,4,254,171,3,5,169,255,3,7,255,0,3,8,255,255,3,9,255,0,4,3,255,255,4,4,255,119,4,5,170,0,4,6,170,0,4,8,255,255,4,9,255,0,5,4,255,0,5,9,255,0],
secondary:!1},{width:8,bonus:155,chr:"A",
pixels:[0,8,153,255,1,6,221,255,1,7,237,255,1,9,153,0,2,3,169,255,2,4,255,255,2,5,187,255,2,6,255,255,2,7,221,0,2,8,238,0,3,1,255,255,3,2,255,255,3,4,170,0,3,5,255,0,3,6,255,255,3,7,255,0,4,2,255,255,4,3,254,239,4,4,184,189,4,6,255,255,4,7,255,0,5,3,255,34,5,4,247,141,5,5,255,255,5,6,255,255,5,7,255,102,6,6,255,85,6,7,255,187,6,8,255,255,7,8,187,0,7,9,255,0],
secondary:!1},{width:7,bonus:225,chr:"B",
pixels:[0,1,203,255,0,2,221,255,0,3,221,255,0,4,221,255,0,5,221,255,0,6,221,255,0,7,221,255,0,8,203,255,1,1,255,255,1,2,211,41,1,3,226,39,1,4,255,255,1,5,226,39,1,6,226,39,1,7,226,39,1,8,255,255,1,9,204,0,2,1,255,255,2,2,255,0,2,4,255,255,2,5,255,0,2,8,255,255,2,9,255,0,3,1,255,255,3,2,255,0,3,4,255,255,3,5,255,0,3,8,255,255,3,9,255,0,4,1,221,255,4,2,255,85,4,4,255,255,4,5,254,171,4,8,203,255,4,9,255,0,5,2,243,178,5,3,198,219,5,5,255,102,5,6,232,205,5,7,180,217,5,9,204,0,6,3,170,0,6,4,170,0,6,7,187,0,6,8,153,0],
secondary:!1},{width:9,bonus:155,chr:"C",
pixels:[0,4,187,255,0,5,187,255,1,2,221,255,1,3,153,255,1,4,155,112,1,5,205,85,1,6,228,171,1,7,224,232,2,1,169,255,2,3,221,0,2,4,153,0,2,7,194,135,2,8,237,183,3,1,255,255,3,2,170,0,3,8,255,255,3,9,170,0,4,1,255,255,4,2,255,0,4,8,255,255,4,9,255,0,5,1,255,255,5,2,255,0,5,8,255,255,5,9,255,0,6,1,169,255,6,2,255,102,6,8,169,255,6,9,255,0,7,2,181,48,7,9,170,0],
secondary:!1},{width:8,bonus:200,chr:"D",
pixels:[0,1,203,255,0,2,221,255,0,3,221,255,0,4,221,255,0,5,221,255,0,6,221,255,0,7,221,255,0,8,203,255,1,1,255,255,1,2,211,41,1,3,226,39,1,4,226,39,1,5,226,39,1,6,226,39,1,7,226,39,1,8,255,255,1,9,204,0,2,1,255,255,2,2,255,0,2,8,255,255,2,9,255,0,3,1,255,255,3,2,255,0,3,8,255,255,3,9,255,0,4,1,203,255,4,2,255,68,4,8,203,255,4,9,255,0,5,2,248,227,5,3,168,207,5,7,221,255,5,9,204,0,6,3,237,128,6,4,223,214,6,5,205,233,6,6,155,196,6,8,221,0,7,5,187,0,7,6,187,0],
secondary:!1},{width:6,bonus:180,chr:"E",
pixels:[0,1,203,255,0,2,221,255,0,3,221,255,0,4,221,255,0,5,221,255,0,6,221,255,0,7,221,255,0,8,203,255,1,1,255,255,1,2,211,41,1,3,226,39,1,4,226,39,1,5,255,255,1,6,226,39,1,7,226,39,1,8,255,255,1,9,204,0,2,1,255,255,2,2,255,0,2,5,255,255,2,6,255,0,2,8,255,255,2,9,255,0,3,1,255,255,3,2,255,0,3,5,255,255,3,6,255,0,3,8,255,255,3,9,255,0,4,1,153,255,4,2,255,0,4,6,255,0,4,8,221,255,4,9,255,0,5,2,153,0,5,9,221,0],
secondary:!1},{width:6,bonus:135,chr:"F",
pixels:[0,1,203,255,0,2,221,255,0,3,221,255,0,4,221,255,0,5,221,255,0,6,221,255,0,7,221,255,0,8,203,255,1,1,255,255,1,2,211,41,1,3,226,39,1,4,226,39,1,5,255,255,1,6,226,39,1,7,226,39,1,8,226,39,1,9,204,0,2,1,255,255,2,2,255,0,2,5,255,255,2,6,255,0,3,1,255,255,3,2,255,0,3,5,255,255,3,6,255,0,4,2,255,0,4,6,255,0],
secondary:!1},{width:9,bonus:200,chr:"G",
pixels:[0,4,169,255,0,5,187,255,1,2,203,255,1,3,153,255,1,5,193,90,1,6,224,155,1,7,237,238,2,1,169,255,2,3,204,0,2,4,153,0,2,7,175,124,2,8,246,194,3,1,255,255,3,2,170,0,3,8,255,255,3,9,187,0,4,1,255,255,4,2,255,0,4,8,255,255,4,9,255,0,5,1,255,255,5,2,255,0,5,8,237,255,5,9,255,0,6,1,169,255,6,2,255,85,6,5,255,255,6,7,153,255,6,8,169,255,6,9,238,0,7,2,175,25,7,5,153,255,7,6,255,221,7,7,225,251,7,8,234,222,7,9,170,0,8,6,153,0,8,7,221,0,8,8,221,0,8,9,204,0],
secondary:!1},{width:8,bonus:200,chr:"H",
pixels:[0,1,203,255,0,2,221,255,0,3,221,255,0,4,221,255,0,5,221,255,0,6,221,255,0,7,221,255,0,8,203,255,1,2,211,41,1,3,226,39,1,4,226,39,1,5,255,255,1,6,226,39,1,7,226,39,1,8,226,39,1,9,204,0,2,5,255,255,2,6,255,0,3,5,255,255,3,6,255,0,4,5,255,255,4,6,255,0,5,5,255,255,5,6,255,34,6,1,203,255,6,2,225,251,6,3,225,251,6,4,225,251,6,5,225,251,6,6,255,221,6,7,225,251,6,8,210,247,7,2,204,0,7,3,221,0,7,4,221,0,7,5,221,0,7,6,221,0,7,7,221,0,7,8,221,0,7,9,204,0],
secondary:!1},{width:4,bonus:110,chr:"I",
pixels:[0,1,191,255,0,8,191,255,1,1,255,255,1,2,255,255,1,3,255,255,1,4,255,255,1,5,255,255,1,6,255,255,1,7,255,255,1,8,255,255,1,9,191,0,2,1,191,255,2,2,255,0,2,3,255,0,2,4,255,0,2,5,255,0,2,6,255,0,2,7,255,0,2,8,255,191,2,9,255,0,3,2,192,0,3,9,191,0],
secondary:!1},{width:6,bonus:130,chr:"J",
pixels:[0,6,153,255,0,7,153,255,1,7,194,135,1,8,234,222,2,1,221,255,2,8,255,255,2,9,204,0,3,1,255,255,3,2,226,39,3,8,203,255,3,9,255,0,4,1,203,255,4,2,255,221,4,3,225,251,4,4,225,251,4,5,225,251,4,6,225,251,4,7,166,235,4,9,204,0,5,2,204,0,5,3,221,0,5,4,221,0,5,5,221,0,5,6,221,0,5,7,221,0,5,8,153,0],
secondary:!1},{width:7,bonus:155,chr:"K",
pixels:[0,1,203,255,0,2,221,255,0,3,221,255,0,4,221,255,0,5,221,255,0,6,221,255,0,7,221,255,0,8,203,255,1,2,211,41,1,3,226,39,1,4,255,255,1,5,226,39,1,6,226,39,1,7,226,39,1,8,226,39,1,9,204,0,2,4,255,255,2,5,255,102,3,3,221,255,3,5,254,171,3,6,224,232,4,1,203,255,4,2,153,255,4,4,221,0,4,6,193,90,4,7,251,242,4,8,173,226,5,2,204,0,5,3,153,0,5,8,247,141,5,9,153,0],
secondary:!1},{width:6,bonus:115,chr:"L",
pixels:[0,1,203,255,0,2,221,255,0,3,221,255,0,4,221,255,0,5,221,255,0,6,221,255,0,7,221,255,0,8,203,255,1,2,211,41,1,3,226,39,1,4,226,39,1,5,226,39,1,6,226,39,1,7,226,39,1,8,255,255,1,9,204,0,2,8,255,255,2,9,255,0,3,8,255,255,3,9,255,0,4,8,255,255,4,9,255,0,5,9,255,0],
secondary:!1},{width:9,bonus:240,chr:"M",
pixels:[0,1,245,255,0,2,255,255,0,3,255,255,0,4,255,255,0,5,255,255,0,6,255,255,0,7,255,255,0,8,255,255,1,2,251,173,1,3,255,225,1,4,255,85,1,5,255,0,1,6,255,0,1,7,255,0,1,8,255,0,1,9,255,0,2,3,191,83,2,4,249,212,2,5,212,229,3,5,226,119,3,6,249,237,3,7,165,227,4,6,241,245,4,7,245,155,4,8,155,32,5,4,207,255,5,5,191,254,5,7,232,0,6,2,169,255,6,3,223,255,6,5,207,0,6,6,190,0,7,1,245,255,7,2,255,255,7,3,255,255,7,4,255,255,7,5,255,255,7,6,255,255,7,7,255,255,7,8,255,255,8,2,245,0,8,3,255,0,8,4,255,0,8,5,255,0,8,6,255,0,8,7,255,0,8,8,255,0,8,9,255,0],
secondary:!1},{width:8,bonus:200,chr:"N",
pixels:[0,1,203,255,0,2,221,255,0,3,221,255,0,4,221,255,0,5,221,255,0,6,221,255,0,7,221,255,0,8,203,255,1,2,255,255,1,3,235,111,1,4,226,39,1,5,226,39,1,6,226,39,1,7,226,39,1,8,226,39,1,9,204,0,2,3,255,221,2,4,163,160,3,4,246,194,3,5,214,223,4,5,214,122,4,6,246,229,5,6,163,160,5,7,255,255,6,1,203,255,6,2,225,251,6,3,225,251,6,4,225,251,6,5,225,251,6,6,225,251,6,7,235,240,6,8,254,204,7,2,204,0,7,3,221,0,7,4,221,0,7,5,221,0,7,6,221,0,7,7,221,0,7,8,221,0,7,9,204,0],
secondary:!1},{width:10,bonus:200,chr:"O",
pixels:[0,4,187,255,0,5,169,255,1,2,203,255,1,3,153,255,1,5,205,85,1,6,226,192,1,7,224,232,2,1,153,255,2,3,204,0,2,4,153,0,2,7,209,145,2,8,234,167,3,1,255,255,3,2,153,0,3,8,255,255,3,9,153,0,4,1,255,255,4,2,255,0,4,8,255,255,4,9,255,0,5,1,255,255,5,2,255,0,5,8,255,255,5,9,255,0,6,1,153,255,6,2,255,102,6,8,153,255,6,9,255,0,7,2,234,222,7,3,194,201,7,6,169,255,7,7,203,255,7,9,153,0,8,3,225,116,8,4,228,209,8,5,192,225,8,7,170,0,8,8,204,0,9,5,187,0,9,6,170,0],
secondary:!1},{width:7,bonus:165,chr:"P",
pixels:[0,1,203,255,0,2,221,255,0,3,221,255,0,4,221,255,0,5,221,255,0,6,221,255,0,7,221,255,0,8,203,255,1,1,255,255,1,2,211,41,1,3,226,39,1,4,226,39,1,5,255,255,1,6,226,39,1,7,226,39,1,8,226,39,1,9,204,0,2,1,255,255,2,2,255,0,2,5,255,255,2,6,255,0,3,1,255,255,3,2,255,0,3,5,255,255,3,6,255,0,4,1,187,255,4,2,255,136,4,5,187,255,4,6,255,0,5,2,224,155,5,3,239,236,5,6,187,0,6,4,221,0],
secondary:!1},{width:9,bonus:185,chr:"Q",
pixels:[0,4,187,255,0,5,187,255,1,2,221,255,1,4,155,112,1,5,205,85,1,6,228,171,1,7,235,240,2,1,187,255,2,3,221,0,2,7,187,116,2,8,243,178,3,1,255,255,3,2,187,0,3,8,255,255,3,9,170,0,4,1,255,255,4,2,255,0,4,8,255,255,4,9,255,0,5,1,237,255,5,2,255,0,5,8,237,255,5,9,255,0,6,2,251,207,6,7,255,255,6,9,238,0,7,3,255,255,7,4,203,255,7,5,221,255,7,6,255,255,7,7,155,196,7,8,254,204,8,4,255,17,8,5,207,21,8,6,221,0,8,7,255,0,8,9,204,0],
secondary:!1},{width:7,bonus:180,chr:"R",
pixels:[0,1,203,255,0,2,221,255,0,3,221,255,0,4,221,255,0,5,221,255,0,6,221,255,0,7,221,255,0,8,203,255,1,1,255,255,1,2,211,41,1,3,226,39,1,4,226,39,1,5,255,255,1,6,226,39,1,7,226,39,1,8,226,39,1,9,204,0,2,1,255,255,2,2,255,0,2,5,255,255,2,6,255,0,3,1,255,255,3,2,255,0,3,5,255,255,3,6,255,187,4,2,254,239,4,3,203,255,4,4,255,255,4,6,255,68,4,7,250,243,4,8,181,239,5,3,239,18,5,4,204,0,5,5,255,0,5,8,245,107,5,9,170,0],
secondary:!1},{width:6,bonus:130,chr:"S",
pixels:[0,2,153,255,0,3,169,255,1,1,203,255,1,3,187,116,1,4,244,231,1,8,243,249,2,1,255,255,2,2,204,0,2,4,198,219,2,5,232,93,2,8,255,255,2,9,238,0,3,1,255,255,3,2,255,0,3,5,255,255,3,8,255,255,3,9,255,0,4,1,169,255,4,2,255,68,4,5,160,217,4,6,255,221,4,7,237,255,4,9,255,0,5,2,170,0,5,7,223,19,5,8,238,0],
secondary:!1},{width:8,bonus:125,chr:"T",
pixels:[0,1,255,255,1,1,255,255,1,2,255,0,2,1,255,255,2,2,255,34,3,1,255,255,3,2,255,221,3,3,225,251,3,4,225,251,3,5,225,251,3,6,225,251,3,7,225,251,3,8,210,247,4,1,255,255,4,2,255,0,4,3,221,0,4,4,221,0,4,5,221,0,4,6,221,0,4,7,221,0,4,8,221,0,4,9,204,0,5,1,255,255,5,2,255,0,6,2,255,0],
secondary:!1},{width:8,bonus:165,chr:"U",
pixels:[0,1,203,255,0,2,221,255,0,3,221,255,0,4,221,255,0,5,221,255,0,6,187,255,1,2,211,41,1,3,226,39,1,4,226,39,1,5,226,39,1,6,230,75,1,7,232,187,1,8,184,189,2,8,255,255,3,8,255,255,3,9,255,0,4,8,221,255,4,9,255,0,5,1,203,255,5,2,221,255,5,3,221,255,5,4,221,255,5,5,221,255,5,6,255,255,5,7,237,255,5,9,221,0,6,2,211,41,6,3,226,39,6,4,226,39,6,5,226,39,6,6,223,19,6,7,255,0,6,8,238,0],
secondary:!1},{width:7,bonus:125,chr:"V",
pixels:[0,1,255,255,0,2,187,255,1,2,255,68,1,3,228,171,1,4,255,255,1,5,153,255,2,4,153,0,2,5,255,85,2,6,228,209,2,7,242,251,3,6,164,185,3,7,255,255,3,8,251,207,4,4,203,255,4,5,237,255,4,8,255,0,4,9,204,0,5,1,169,255,5,2,255,255,5,3,153,255,5,5,204,0,5,6,238,0,6,2,170,0,6,3,255,0,6,4,153,0],
secondary:!1},{width:10,bonus:245,chr:"W",
pixels:[0,1,255,255,0,2,221,255,1,2,255,17,1,3,237,128,1,4,223,214,1,5,255,255,1,6,203,255,2,5,191,23,2,6,255,136,2,7,255,255,2,8,255,255,3,3,153,255,3,4,237,255,3,5,221,255,3,7,168,103,3,8,255,0,3,9,255,0,4,1,255,255,4,2,255,255,4,3,187,209,4,4,153,0,4,5,238,0,4,6,221,0,5,2,255,102,5,3,254,171,5,4,248,244,5,5,203,255,6,4,170,0,6,5,241,54,6,6,231,150,6,7,255,255,6,8,255,255,7,4,153,255,7,5,237,255,7,6,241,252,7,7,207,188,7,8,255,85,7,9,255,0,8,1,237,255,8,2,237,255,8,3,153,255,8,4,153,171,8,5,153,0,8,6,238,0,8,7,238,0,8,8,153,0,9,2,238,0,9,3,238,0,9,4,153,0],
secondary:!1},{width:7,bonus:130,chr:"X",
pixels:[0,8,169,255,1,1,187,255,1,2,220,236,1,7,237,255,1,9,170,0,2,2,205,85,2,3,248,227,2,4,166,235,2,5,255,255,2,6,153,255,2,8,238,0,3,3,155,196,3,4,255,255,3,5,248,244,3,6,255,51,3,7,153,0,4,2,237,255,4,5,255,51,4,6,251,207,4,7,186,233,5,1,203,255,5,3,238,0,5,7,225,116,5,8,255,255,6,2,204,0,6,9,255,0],
secondary:!1},{width:7,bonus:90,chr:"Y",
pixels:[0,1,169,255,1,2,249,243,2,3,248,157,2,4,255,255,3,4,241,234,3,5,254,204,3,6,232,243,3,7,225,251,3,8,210,247,4,3,255,255,4,5,221,0,4,6,204,0,4,7,221,0,4,8,221,0,4,9,204,0,5,1,237,255,5,4,255,0,6,2,238,0],secondary:!1},{width:7,bonus:140,
chr:"Z",
pixels:[0,8,187,255,1,1,255,255,1,7,221,255,1,8,255,255,1,9,187,0,2,1,255,255,2,2,255,0,2,5,203,255,2,8,255,255,2,9,255,0,3,1,255,255,3,2,255,0,3,4,203,255,3,6,204,0,3,8,255,255,3,9,255,0,4,1,255,255,4,2,255,221,4,5,204,0,4,8,255,255,4,9,255,0,5,1,187,255,5,2,255,34,5,3,221,0,5,8,153,255,5,9,255,0,6,2,187,0,6,9,153,0],
secondary:!1},{width:7,bonus:170,chr:"0",
pixels:[0,2,153,255,0,3,221,255,0,4,255,255,0,5,255,255,0,6,237,255,0,7,169,255,1,1,187,255,1,3,153,0,1,4,221,0,1,5,255,0,1,6,255,0,1,7,243,71,1,8,237,219,2,1,187,255,2,2,187,0,2,8,205,233,2,9,211,41,3,1,221,255,3,2,205,85,3,8,203,255,3,9,187,0,4,2,243,178,4,3,255,255,4,4,187,255,4,5,187,255,4,6,237,255,4,7,169,255,4,9,204,0,5,3,170,0,5,4,255,0,5,5,187,0,5,6,187,0,5,7,238,0,5,8,170,0],
secondary:!1},{width:7,bonus:100,chr:"1",
pixels:[1,8,187,255,2,1,203,255,2,2,224,232,2,3,219,218,2,4,187,255,2,5,187,255,2,6,187,255,2,7,187,255,2,8,237,255,2,9,187,0,3,2,218,80,3,3,218,80,3,4,205,85,3,5,205,85,3,6,205,85,3,7,205,85,3,8,241,215,3,9,238,0,4,8,168,207,4,9,204,0],secondary:!1
},{width:7,bonus:105,chr:"2",
pixels:[1,8,255,255,2,1,187,255,2,6,153,255,2,8,223,214,2,9,255,0,3,1,203,255,3,2,187,0,3,5,153,255,3,7,153,0,3,8,219,218,3,9,187,0,4,1,187,255,4,2,234,167,4,4,203,255,4,6,153,0,4,8,187,255,4,9,187,0,5,2,214,122,5,3,200,152,5,5,204,0,5,9,187,0],
secondary:!1},{width:7,bonus:105,chr:"3",
pixels:[0,8,203,255,1,1,187,255,1,8,191,250,1,9,204,0,2,1,187,255,2,2,196,45,2,4,187,255,2,5,174,150,2,8,203,255,2,9,187,0,3,2,246,229,3,3,210,247,3,5,241,215,3,6,173,175,3,7,169,255,3,9,204,0,4,3,227,57,4,4,204,0,4,6,228,133,4,7,174,150,4,8,170,0],
secondary:!1},{width:7,bonus:150,chr:"4",
pixels:[0,6,237,255,1,4,187,255,1,6,219,218,1,7,238,0,2,3,169,255,2,5,187,0,2,6,219,218,2,7,187,0,3,1,187,255,3,2,153,255,3,3,155,112,3,4,193,90,3,6,203,255,3,7,205,85,4,1,187,255,4,2,237,201,4,3,228,209,4,4,205,233,4,5,205,233,4,6,242,251,4,7,241,198,4,8,205,233,5,2,187,0,5,3,187,0,5,4,187,0,5,5,187,0,5,6,224,155,5,7,238,0,5,8,187,0,5,9,187,0],
secondary:!1},{width:7,bonus:130,chr:"5",
pixels:[1,1,237,255,1,2,187,255,1,3,187,255,1,4,187,255,1,8,207,251,2,1,187,255,2,2,238,0,2,3,187,0,2,4,237,201,2,5,187,0,2,8,187,255,2,9,204,0,3,1,187,255,3,2,187,0,3,4,203,255,3,5,191,23,3,8,203,255,3,9,187,0,4,2,187,0,4,5,251,242,4,6,191,250,4,7,221,255,4,9,204,0,5,6,243,71,5,7,191,23,5,8,221,0],
secondary:!1},{width:7,bonus:150,chr:"6",
pixels:[0,3,169,255,0,4,255,255,0,5,255,255,0,6,237,255,0,7,153,255,1,2,187,255,1,4,209,145,1,5,255,68,1,6,255,0,1,7,246,123,1,8,228,209,2,1,203,255,2,3,187,0,2,4,200,238,2,8,219,218,2,9,187,0,3,1,187,255,3,2,204,0,3,4,203,255,3,5,205,85,3,8,187,255,3,9,187,0,4,2,187,0,4,5,248,227,4,6,255,255,4,7,187,255,4,9,187,0,5,6,221,0,5,7,255,0,5,8,187,0],
secondary:!1},{width:7,bonus:105,chr:"7",
pixels:[0,1,187,255,1,1,187,255,1,2,187,0,1,8,203,255,2,1,187,255,2,2,187,0,2,6,237,255,2,7,153,255,2,9,204,0,3,1,187,255,3,2,205,85,3,3,153,255,3,4,221,255,3,7,238,0,3,8,153,0,4,1,255,255,4,2,237,201,4,4,153,0,4,5,221,0,5,2,255,0,5,3,187,0],
secondary:!1},{width:7,bonus:165,chr:"8",
pixels:[1,2,237,255,1,3,221,255,1,6,203,255,1,7,228,247,2,1,203,255,2,3,241,54,2,4,248,209,2,5,186,233,2,7,207,21,2,8,250,226,3,1,187,255,3,2,204,0,3,4,186,233,3,5,221,98,3,6,170,0,3,8,191,250,3,9,221,0,4,1,221,255,4,2,209,104,4,4,169,255,4,5,237,219,4,8,187,255,4,9,187,0,5,2,243,178,5,3,187,209,5,5,204,128,5,6,251,242,5,7,240,253,5,9,187,0,6,3,170,0,6,4,153,0,6,7,238,0,6,8,238,0],
secondary:!1},{width:7,bonus:160,chr:"9",
pixels:[1,2,221,255,1,3,191,250,1,4,242,251,1,8,153,255,2,1,203,255,2,3,221,0,2,4,191,23,2,5,253,223,2,8,191,250,2,9,153,0,3,1,187,255,3,2,204,0,3,5,191,250,3,6,221,0,3,8,203,255,3,9,187,0,4,1,187,255,4,2,218,139,4,6,200,65,4,7,169,255,4,9,204,0,5,2,228,171,5,3,245,247,5,4,255,255,5,5,255,255,5,6,223,214,5,8,170,0,6,3,153,0,6,4,238,0,6,5,255,0,6,6,255,0,6,7,187,0],
secondary:!1},{width:8,bonus:130,chr:"%",
pixels:[0,3,255,255,0,8,255,255,1,2,255,255,1,4,255,255,1,7,255,255,1,9,255,0,2,3,255,255,2,5,255,41,2,6,255,255,2,8,255,0,3,4,255,41,3,5,255,255,3,7,255,0,4,4,255,255,4,6,255,92,4,7,255,255,5,3,255,255,5,5,255,0,5,6,255,255,5,8,255,255,6,2,255,255,6,4,255,0,6,7,255,255,6,9,255,0,7,3,255,0,7,8,255,0],
secondary:!1},{width:4,bonus:80,chr:"/",pixels:[0,7,153,255,0,8,237,255,0,9,221,255,1,4,187,255,1,5,237,255,1,6,169,255,1,8,153,0,1,9,238,0,1,10,221,0,2,1,221,255,2,2,221,255,2,5,187,0,2,6,238,0,2,7,170,0,3,2,221,0,3,3,221,0],secondary:!1},{width:7,
bonus:110,chr:"+",
pixels:[0,5,221,255,1,5,255,255,1,6,221,0,2,5,255,255,2,6,255,34,3,2,153,255,3,3,223,253,3,4,225,251,3,5,255,255,3,6,255,221,3,7,225,251,3,8,210,247,4,3,153,0,4,4,221,0,4,5,255,255,4,6,255,0,4,7,221,0,4,8,221,0,4,9,204,0,5,5,255,255,5,6,255,0,6,6,255,0],
secondary:!1},{width:5,bonus:75,chr:"?",pixels:[0,1,169,255,1,1,255,255,1,2,170,0,1,6,221,255,1,8,255,255,2,1,255,255,2,2,255,0,2,5,169,255,2,7,221,0,2,9,255,0,3,2,255,255,3,3,221,255,3,6,170,0,4,3,255,17,4,4,221,0],secondary:!1},{width:2,bonus:70,
chr:"!",pixels:[0,1,169,255,0,2,187,255,0,3,187,255,0,4,187,255,0,5,187,255,0,6,169,255,0,8,255,255,1,2,181,48,1,3,196,45,1,4,196,45,1,5,196,45,1,6,196,45,1,7,170,0,1,9,255,0],secondary:!1},{width:8,bonus:230,chr:"@",
pixels:[0,4,255,255,0,5,255,255,0,6,221,255,0,7,255,255,0,8,187,255,1,3,221,255,1,5,255,0,1,6,255,34,1,7,221,0,1,8,255,68,1,9,250,243,2,2,221,255,2,4,232,93,2,5,255,255,2,6,237,255,2,7,255,255,2,10,248,157,3,2,255,255,3,3,221,0,3,4,255,255,3,6,255,0,3,7,241,54,3,8,254,204,3,10,214,223,3,11,153,0,4,2,237,255,4,3,255,0,4,4,255,255,4,5,255,0,4,8,255,255,4,9,204,0,4,11,187,0,5,3,253,240,5,4,255,255,5,5,255,221,5,6,221,255,5,7,221,255,5,8,237,255,5,9,255,0,6,4,240,36,6,5,255,34,6,6,226,39,6,7,226,39,6,8,250,226,6,9,238,0,7,9,221,0],
secondary:!1},{width:8,bonus:200,chr:"#",
pixels:[0,6,255,255,1,3,255,255,1,6,255,255,1,7,254,171,1,8,237,255,2,1,169,255,2,2,237,255,2,3,255,255,2,4,255,221,2,5,175,247,2,6,255,255,2,7,255,85,2,8,170,0,2,9,238,0,3,2,170,0,3,3,255,255,3,4,255,0,3,5,221,0,3,6,255,255,3,7,255,0,4,3,255,255,4,4,255,153,4,5,203,255,4,6,255,255,4,7,254,239,4,8,187,255,5,1,255,255,5,2,187,255,5,3,255,255,5,4,255,85,5,5,159,27,5,6,255,255,5,7,255,0,5,8,238,0,5,9,187,0,6,2,255,0,6,3,255,255,6,4,255,0,6,7,255,0,7,4,255,0],
secondary:!1},{width:6,bonus:130,chr:"$",
pixels:[0,2,153,255,0,3,169,255,1,1,203,255,1,3,187,116,1,4,244,231,1,8,243,249,2,0,203,255,2,1,237,255,2,2,204,0,2,4,176,197,2,5,237,128,2,8,240,253,2,9,251,207,3,1,251,242,3,2,239,18,3,5,247,245,3,6,164,132,3,8,255,255,3,9,240,36,3,10,204,0,4,2,240,36,4,6,249,174,4,7,198,219,4,9,255,0,5,7,170,0,5,8,170,0],
secondary:!1},{width:6,bonus:75,chr:"^",pixels:[0,4,153,255,0,5,237,255,1,2,203,255,1,3,221,255,1,5,153,0,1,6,238,0,2,1,221,255,2,2,230,245,2,3,218,80,2,4,221,0,3,2,227,57,3,3,246,194,3,4,230,245,4,4,187,0,4,5,239,145],secondary:!1},{width:6,
bonus:35,chr:"~",pixels:[1,5,255,255,2,5,221,255,2,6,255,51,3,6,250,226,4,5,203,255,4,7,221,0,5,6,204,0],secondary:!1},{width:7,bonus:175,chr:"&",
pixels:[0,6,187,255,1,2,237,255,1,3,255,255,1,4,191,250,1,5,187,255,1,7,224,155,1,8,223,214,2,1,255,255,2,3,238,0,2,4,255,255,2,5,191,23,2,6,187,0,2,8,255,255,2,9,187,0,3,1,255,255,3,2,255,0,3,4,255,255,3,5,255,0,3,8,255,255,3,9,255,0,4,2,255,0,4,4,255,255,4,5,255,34,4,8,187,255,4,9,255,0,5,3,203,255,5,4,255,255,5,5,255,221,5,6,196,243,5,7,155,196,5,9,187,0,6,4,234,167,6,5,255,0,6,6,221,0,6,7,187,0],
secondary:!1},{width:6,bonus:70,chr:"*",pixels:[0,2,169,255,1,2,169,255,1,3,237,219,1,4,255,255,2,1,203,255,2,2,240,253,2,3,255,255,2,4,228,133,2,5,255,0,3,2,237,183,3,3,245,107,3,4,255,153,4,3,170,0,4,5,153,0],secondary:!1},{width:4,bonus:100,
chr:"(",pixels:[0,3,173,255,0,4,239,255,0,5,253,255,0,6,229,255,0,7,171,255,1,1,193,255,1,2,203,255,1,4,188,64,1,5,241,25,1,6,252,46,1,7,240,112,1,8,238,218,1,9,210,232,2,0,209,255,2,2,194,2,2,3,204,0,2,9,223,111,2,10,245,224,3,1,210,0,3,11,216,0],
secondary:!1},{width:4,bonus:75,chr:")",pixels:[1,0,211,255,1,10,215,255,2,1,244,203,2,2,222,234,2,8,203,255,2,9,191,255,2,11,216,0,3,2,213,94,3,3,238,186,3,4,246,248,3,5,253,255,3,6,231,253,3,7,186,234,3,9,203,1,3,10,191,0],secondary:!1},{width:7,
bonus:60,chr:"_",pixels:[0,9,153,255,1,9,255,255,1,10,153,0,2,9,255,255,2,10,255,0,3,9,255,255,3,10,255,0,4,9,255,255,4,10,255,0,5,9,255,255,5,10,255,0,6,10,255,0],secondary:!1},{width:4,bonus:30,chr:"-",
pixels:[0,5,255,255,1,5,255,255,1,6,255,0,2,5,255,255,2,6,255,0,3,6,255,0],secondary:!0},{width:8,bonus:100,chr:"=",
pixels:[0,4,255,255,0,6,255,255,1,4,255,255,1,5,255,0,1,6,255,255,1,7,255,0,2,4,255,255,2,5,255,0,2,6,255,255,2,7,255,0,3,4,255,255,3,5,255,0,3,6,255,255,3,7,255,0,4,4,255,255,4,5,255,0,4,6,255,255,4,7,255,0,5,5,255,0,5,7,255,0],secondary:!1},{
width:3,bonus:105,chr:"[",
pixels:[0,0,203,255,0,1,221,255,0,2,221,255,0,3,221,255,0,4,221,255,0,5,221,255,0,6,221,255,0,7,221,255,0,8,203,255,1,0,237,255,1,1,211,41,1,2,226,39,1,3,226,39,1,4,226,39,1,5,226,39,1,6,226,39,1,7,226,39,1,8,252,241,1,9,204,0,2,1,238,0,2,9,238,0],
secondary:!1},{width:3,bonus:105,chr:"]",
pixels:[0,0,237,255,0,8,237,255,1,0,203,255,1,1,253,223,1,2,225,251,1,3,225,251,1,4,225,251,1,5,225,251,1,6,225,251,1,7,225,251,1,8,210,247,1,9,238,0,2,1,204,0,2,2,221,0,2,3,221,0,2,4,221,0,2,5,221,0,2,6,221,0,2,7,221,0,2,8,221,0,2,9,204,0],
secondary:!1},{width:5,bonus:90,chr:"{",
pixels:[0,5,153,255,1,2,169,255,1,3,221,255,1,4,221,255,1,5,203,255,1,6,255,255,1,7,221,255,1,8,169,255,2,1,237,255,2,3,181,48,2,4,223,19,2,5,221,0,2,6,207,21,2,7,255,34,2,8,232,93,2,9,249,243,3,2,238,0,3,10,238,0],secondary:!1},{width:5,bonus:90,
chr:"}",pixels:[1,1,237,255,1,9,237,255,2,2,249,174,2,3,232,243,2,4,225,251,2,5,207,251,2,6,255,255,2,7,223,253,2,8,181,239,2,10,238,0,3,3,170,0,3,4,221,0,3,5,241,162,3,6,204,0,3,7,255,0,3,8,221,0,3,9,170,0,4,6,153,0],secondary:!1},{width:3,bonus:20,
chr:":",pixels:[1,3,255,255,1,7,255,255,2,4,255,0,2,8,255,0],secondary:!0},{width:3,bonus:40,chr:";",pixels:[0,9,201,255,1,3,255,255,1,7,241,255,1,8,255,255,1,10,201,0,2,4,255,0,2,8,241,0,2,9,255,0],secondary:!0},{width:3,bonus:30,chr:'"',
pixels:[0,1,255,255,0,2,255,255,1,2,255,0,1,3,255,0,2,1,255,255,2,2,255,255],secondary:!0},{width:2,bonus:20,chr:"'",pixels:[0,1,255,255,0,2,177,255,1,2,255,30,1,3,177,0],secondary:!0},{width:7,bonus:70,chr:"<",
pixels:[0,5,203,255,1,5,255,255,1,6,228,133,2,4,237,255,2,6,254,239,3,4,169,255,3,5,238,0,3,6,175,247,3,7,243,89,4,3,221,255,4,5,170,0,4,7,244,231,5,4,221,0,5,8,221,0],secondary:!1},{width:7,bonus:80,chr:">",
pixels:[0,3,203,255,0,7,203,255,1,4,228,133,1,7,187,255,1,8,204,0,2,4,247,245,2,6,255,255,2,8,187,0,3,4,175,247,3,5,248,157,3,6,203,255,3,7,255,0,4,5,255,255,4,6,173,75,4,7,204,0,5,6,255,0],secondary:!1},{width:5,bonus:70,chr:"\\",
pixels:[1,1,153,255,1,2,255,255,1,3,203,255,2,2,153,0,2,3,255,51,2,4,231,150,2,5,255,255,2,6,203,255,3,6,255,34,3,7,231,150,3,8,255,255,3,9,207,251,4,9,255,0,4,10,204,0],secondary:!1},{width:2,bonus:10,chr:".",pixels:[0,8,255,255,1,9,255,0],
secondary:!0},{width:3,bonus:30,chr:",",pixels:[0,9,205,255,1,7,205,255,1,8,255,255,1,10,205,0,2,8,205,0,2,9,255,0],secondary:!0},{width:3,bonus:100,chr:"|",
pixels:[0,1,221,255,0,2,221,255,0,3,221,255,0,4,221,255,0,5,221,255,0,6,221,255,0,7,221,255,0,8,221,255,0,9,221,255,0,10,203,255,1,2,226,39,1,3,226,39,1,4,226,39,1,5,226,39,1,6,226,39,1,7,226,39,1,8,226,39,1,9,226,39,1,10,226,39,1,11,204,0],
secondary:!1}],width:10,spacewidth:3,shadow:!0,height:12,basey:8}}],e={},function o(r){var n=e[r];if(void 0!==n)return n.exports;var i=e[r]={exports:{}};return s[r](i,i.exports,o),i.exports}(0);var s,e}));

/***/ }),

/***/ "../node_modules/.pnpm/@alt1+ocr@1.0.0-alpha.7/node_modules/@alt1/ocr/fonts/chatbox/10pt.js":
/*!**************************************************************************************************!*\
  !*** ../node_modules/.pnpm/@alt1+ocr@1.0.0-alpha.7/node_modules/@alt1/ocr/fonts/chatbox/10pt.js ***!
  \**************************************************************************************************/
/***/ (function(module) {

!function(s,e){ true?module.exports=e():0}("undefined"!=typeof self?self:this,(()=>{
return s=[s=>{s.exports={chars:[{width:5,bonus:115,chr:"a",
pixels:[0,5,217,255,0,6,227,255,1,2,197,255,1,4,200,254,1,6,219,17,1,7,250,220,2,2,223,255,2,3,199,13,2,4,209,255,2,5,199,0,2,7,158,246,2,8,216,0,3,3,250,226,3,4,242,254,3,5,251,239,3,6,243,255,3,7,208,239,3,8,152,0,4,4,222,0,4,5,241,0,4,6,236,0,4,7,244,0,4,8,195,0],
secondary:!1},{width:7,bonus:165,chr:"b",
pixels:[1,0,231,255,1,1,231,255,1,2,225,255,1,3,243,255,1,4,239,255,1,5,239,255,1,6,243,255,1,7,197,255,2,1,232,0,2,2,244,150,2,3,233,76,2,4,244,1,2,5,240,2,2,6,244,78,2,7,250,150,2,8,198,0,3,2,203,255,3,3,144,0,3,7,218,238,3,8,147,0,4,2,197,255,4,3,220,93,4,7,197,255,4,8,204,0,5,3,236,187,5,4,234,245,5,5,225,255,5,6,174,254,5,8,197,0,6,4,173,0,6,5,225,0,6,6,225,0,6,7,173,0],
secondary:!1},{width:5,bonus:95,chr:"c",
pixels:[0,3,163,255,0,4,223,255,0,5,223,255,0,6,167,255,1,2,179,255,1,4,165,6,1,5,224,5,1,6,235,99,1,7,231,203,2,2,207,255,2,3,179,0,2,7,225,236,2,8,184,0,3,2,207,255,3,3,207,4,3,7,208,255,3,8,208,0,4,3,207,0,4,8,208,0],secondary:!1},{width:6,
bonus:170,chr:"d",
pixels:[0,3,173,255,0,4,225,255,0,5,227,255,0,6,175,255,1,2,197,255,1,4,175,6,1,5,226,3,1,6,236,91,1,7,237,213,2,2,205,255,2,3,198,0,2,7,220,236,2,8,198,0,3,2,145,255,3,3,221,92,3,7,143,255,3,8,203,0,4,0,231,255,4,1,231,255,4,2,229,255,4,3,250,249,4,4,245,251,4,5,239,255,4,6,244,255,4,7,221,241,4,8,144,0,5,1,232,0,5,2,232,0,5,3,229,0,5,4,244,0,5,5,241,0,5,6,239,0,5,7,244,0,5,8,208,0],
secondary:!1},{width:5,bonus:130,chr:"e",
pixels:[0,3,158,255,0,4,223,255,0,5,225,255,0,6,159,255,1,2,175,255,1,4,238,223,1,5,225,9,1,6,238,121,1,7,223,196,2,2,203,255,2,3,175,0,2,4,219,243,2,5,208,0,2,7,229,233,2,8,171,0,3,2,197,255,3,3,211,47,3,4,208,255,3,5,208,0,3,7,211,255,3,8,209,0,4,3,242,207,4,4,221,249,4,5,208,0,4,7,136,255,4,8,211,0],
secondary:!1},{width:3,bonus:80,chr:"f",pixels:[0,2,147,255,1,1,229,255,1,2,251,255,1,3,245,241,1,4,231,255,1,5,231,255,1,6,231,255,1,7,231,255,2,0,221,255,2,2,251,212,2,3,251,0,2,4,232,0,2,5,232,0,2,6,232,0,2,7,232,0,2,8,232,0],secondary:!1},{
width:6,bonus:195,chr:"g",
pixels:[0,3,169,255,0,4,225,255,0,5,225,255,0,6,175,255,1,2,195,255,1,4,171,6,1,5,225,3,1,6,235,87,1,7,237,213,1,10,222,249,2,2,203,255,2,3,195,0,2,7,219,236,2,8,198,0,2,10,210,254,2,11,217,0,3,2,141,255,3,3,220,93,3,7,137,255,3,8,202,2,3,10,199,255,3,11,210,0,4,2,208,255,4,3,250,249,4,4,245,251,4,5,238,255,4,6,244,255,4,7,239,249,4,8,244,241,4,9,191,254,4,11,200,0,5,3,208,0,5,4,244,0,5,5,241,0,5,6,238,0,5,7,244,0,5,8,233,0,5,9,231,0,5,10,190,0],
secondary:!1},{width:7,bonus:150,chr:"h",
pixels:[1,0,231,255,1,1,231,255,1,2,227,255,1,3,243,255,1,4,239,255,1,5,231,255,1,6,231,255,1,7,231,255,2,1,232,0,2,2,244,141,2,3,237,91,2,4,244,3,2,5,240,0,2,6,232,0,2,7,232,0,2,8,232,0,3,2,199,255,3,3,135,0,4,2,215,255,4,3,208,46,5,3,249,222,5,4,235,251,5,5,231,255,5,6,231,255,5,7,231,255,6,4,217,0,6,5,232,0,6,6,232,0,6,7,232,0,6,8,232,0],
secondary:!1},{width:3,bonus:70,chr:"i",pixels:[1,0,133,255,1,2,231,255,1,3,231,255,1,4,231,255,1,5,231,255,1,6,231,255,1,7,231,255,2,1,133,0,2,3,232,0,2,4,232,0,2,5,232,0,2,6,232,0,2,7,232,0,2,8,232,0],secondary:!1},{width:3,bonus:105,chr:"j",
pixels:[0,10,221,255,1,0,133,255,1,2,231,255,1,3,231,255,1,4,231,255,1,5,231,255,1,6,231,255,1,7,231,255,1,8,231,255,1,9,227,255,1,10,131,245,1,11,221,0,2,1,133,0,2,3,232,0,2,4,232,0,2,5,232,0,2,6,232,0,2,7,232,0,2,8,232,0,2,9,232,0,2,10,228,0],
secondary:!1},{width:6,bonus:130,chr:"k",
pixels:[1,0,231,255,1,1,231,255,1,2,231,255,1,3,231,255,1,4,233,255,1,5,241,255,1,6,231,255,1,7,231,255,2,1,232,0,2,2,232,0,2,3,233,23,2,4,249,190,2,5,244,134,2,6,241,0,2,7,232,0,2,8,232,0,3,3,203,255,3,5,240,211,3,6,202,187,4,2,201,255,4,4,203,0,4,6,225,137,4,7,237,230,5,3,201,0,5,7,144,78,5,8,214,0],
secondary:!1},{width:3,bonus:80,chr:"l",pixels:[1,0,231,255,1,1,231,255,1,2,231,255,1,3,231,255,1,4,231,255,1,5,231,255,1,6,231,255,1,7,231,255,2,1,232,0,2,2,232,0,2,3,232,0,2,4,232,0,2,5,232,0,2,6,232,0,2,7,232,0,2,8,232,0],secondary:!1},{width:9,
bonus:195,chr:"m",
pixels:[1,2,205,255,1,3,243,255,1,4,239,255,1,5,231,255,1,6,231,255,1,7,231,255,2,2,148,255,2,3,215,61,2,4,244,0,2,5,239,0,2,6,232,0,2,7,232,0,2,8,232,0,3,2,213,255,3,3,157,36,4,3,255,255,4,4,239,254,4,5,231,255,4,6,231,255,4,7,231,255,5,2,165,255,5,3,135,92,5,4,255,0,5,5,238,0,5,6,232,0,5,7,232,0,5,8,232,0,6,2,221,255,6,3,172,31,7,3,251,227,7,4,233,254,7,5,231,255,7,6,231,255,7,7,231,255,8,4,223,0,8,5,232,0,8,6,232,0,8,7,232,0,8,8,232,0],
secondary:!1},{width:7,bonus:135,chr:"n",
pixels:[1,2,205,255,1,3,243,255,1,4,239,255,1,5,231,255,1,6,231,255,1,7,231,255,2,2,131,255,2,3,221,94,2,4,244,3,2,5,240,0,2,6,232,0,2,7,232,0,2,8,232,0,3,2,199,255,3,3,132,0,4,2,215,255,4,3,207,46,5,3,249,222,5,4,235,251,5,5,231,255,5,6,231,255,5,7,231,255,6,4,217,0,6,5,232,0,6,6,232,0,6,7,232,0,6,8,232,0],
secondary:!1},{width:5,bonus:110,chr:"o",
pixels:[0,3,169,255,0,4,223,255,0,5,229,255,0,6,167,255,1,2,187,255,1,4,171,4,1,5,224,5,1,6,238,93,1,7,233,208,2,2,208,255,2,3,187,0,2,7,225,237,2,8,190,0,3,2,184,255,3,3,224,96,3,7,185,255,3,8,210,0,4,3,229,181,4,4,233,244,4,5,224,255,4,6,166,254,4,8,185,0],
secondary:!1},{width:7,bonus:180,chr:"p",
pixels:[1,2,209,255,1,3,243,255,1,4,237,255,1,5,241,255,1,6,243,255,1,7,225,255,1,8,231,255,1,9,231,255,1,10,231,255,2,2,148,255,2,3,221,80,2,4,244,1,2,5,238,3,2,6,245,80,2,7,250,150,2,8,225,0,2,9,231,0,2,10,232,0,2,11,232,0,3,2,203,255,3,3,148,0,3,7,220,238,3,8,147,0,4,2,197,255,4,3,221,99,4,7,197,255,4,8,205,0,5,3,237,186,5,4,235,244,5,5,225,255,5,6,172,254,5,8,197,0,6,4,173,0,6,5,225,0,6,6,225,0,6,7,171,0],
secondary:!1},{width:6,bonus:175,chr:"q",
pixels:[0,3,172,255,0,4,225,255,0,5,227,255,0,6,175,255,1,2,195,255,1,4,173,6,1,5,225,3,1,6,236,90,1,7,238,215,2,2,203,255,2,3,195,0,2,7,220,236,2,8,201,0,3,2,143,255,3,3,220,93,3,7,137,255,3,8,203,0,4,2,203,255,4,3,250,249,4,4,245,251,4,5,238,255,4,6,244,255,4,7,236,248,4,8,244,242,4,9,231,255,4,10,231,255,5,3,204,0,5,4,244,0,5,5,241,0,5,6,238,0,5,7,244,0,5,8,229,0,5,9,232,0,5,10,232,0,5,11,232,0],
secondary:!1},{width:4,bonus:75,chr:"r",pixels:[1,2,202,255,1,3,241,255,1,4,239,255,1,5,231,255,1,6,231,255,1,7,231,255,2,2,136,255,2,3,223,118,2,4,241,8,2,5,240,0,2,6,232,0,2,7,232,0,2,8,232,0,3,2,209,255,3,3,136,0],secondary:!1},{width:4,bonus:85,
chr:"s",pixels:[0,3,229,255,0,7,185,255,1,2,217,255,1,4,249,204,1,5,142,62,1,7,213,251,1,8,185,0,2,2,211,255,2,3,218,0,2,5,234,176,2,7,209,255,2,8,210,0,3,2,137,255,3,3,214,14,3,5,191,215,3,6,244,236,3,8,210,0],secondary:!1},{width:4,bonus:70,
chr:"t",pixels:[1,1,203,255,1,2,251,255,1,3,243,243,1,4,231,255,1,5,231,255,1,6,229,255,2,2,246,216,2,3,251,0,2,4,232,0,2,5,232,0,2,6,233,18,2,7,251,221,3,3,208,0,3,8,217,0],secondary:!1},{width:7,bonus:135,chr:"u",
pixels:[1,2,231,255,1,3,231,255,1,4,231,255,1,5,231,255,1,6,219,255,2,3,232,0,2,4,232,0,2,5,232,0,2,6,235,36,2,7,250,221,3,7,207,246,3,8,217,0,4,7,137,255,4,8,200,0,5,2,231,255,5,3,231,255,5,4,231,255,5,5,239,255,5,6,244,255,5,7,224,239,5,8,138,0,6,3,232,0,6,4,232,0,6,5,232,0,6,6,240,0,6,7,244,0,6,8,210,0],
secondary:!1},{width:5,bonus:85,chr:"v",pixels:[0,2,211,255,1,3,229,119,1,4,222,219,1,5,213,245,2,5,197,37,2,6,236,177,2,7,254,254,3,4,171,255,3,5,215,255,3,6,153,235,3,7,183,76,3,8,253,0,4,2,221,255,4,3,150,246,4,5,171,2,4,6,215,0,4,7,141,0],
secondary:!1},{width:8,bonus:195,chr:"w",
pixels:[0,2,197,255,0,3,134,255,1,3,218,109,1,4,205,188,1,5,219,240,1,6,202,251,1,7,139,255,2,4,131,118,2,5,204,164,2,6,242,202,2,7,240,196,2,8,139,0,3,2,173,255,3,3,193,255,3,4,148,253,3,6,136,19,3,7,192,0,3,8,184,0,4,2,142,255,4,3,237,214,4,4,238,197,4,5,196,151,5,3,142,0,5,4,205,32,5,5,211,117,5,6,223,226,5,7,234,250,6,3,130,255,6,4,190,255,6,5,218,250,6,6,197,209,6,7,219,115,6,8,230,0,7,2,159,255,7,3,140,176,7,4,146,58,7,5,190,0,7,6,214,0,7,7,162,0],
secondary:!1},{width:5,bonus:75,chr:"x",pixels:[1,2,146,255,1,3,221,227,1,6,205,255,2,3,170,86,2,4,251,243,2,5,234,250,2,7,205,0,3,3,205,255,3,4,143,198,3,5,247,135,3,6,249,202,4,2,178,255,4,4,206,0,4,6,152,74,4,7,242,207],secondary:!1},{width:5,
bonus:125,chr:"y",
pixels:[0,2,207,255,0,10,181,255,1,3,228,125,1,4,223,223,1,5,204,247,1,10,203,255,1,11,182,0,2,5,201,33,2,6,230,166,2,7,250,252,2,8,224,252,2,9,156,254,2,11,204,0,3,4,157,255,3,5,215,255,3,6,169,240,3,7,181,106,3,8,247,6,3,9,221,0,3,10,155,0,4,2,223,255,4,3,158,249,4,5,158,8,4,6,215,0,4,7,159,0],
secondary:!1},{width:6,bonus:110,chr:"z",
pixels:[1,2,172,255,1,7,247,255,2,2,208,255,2,3,172,0,2,5,196,255,2,6,130,253,2,7,233,233,2,8,248,0,3,2,211,255,3,3,230,131,3,4,202,255,3,6,196,0,3,7,232,229,3,8,213,0,4,2,251,255,4,3,233,144,4,5,202,0,4,7,208,255,4,8,208,0,5,3,251,0,5,4,132,0,5,8,208,0],
secondary:!1},{width:6,bonus:150,chr:"A",
pixels:[0,7,209,255,1,4,201,255,1,5,251,255,1,6,151,228,1,7,139,57,1,8,209,0,2,1,190,255,2,2,213,255,2,3,149,235,2,4,145,103,2,5,249,230,2,6,251,0,2,7,135,0,3,0,195,255,3,1,225,233,3,2,220,136,3,3,219,45,3,4,138,0,3,5,231,247,3,6,225,0,4,1,202,38,4,2,228,131,4,3,228,230,4,4,221,249,4,5,241,255,4,6,229,49,5,4,214,48,5,5,236,139,5,6,253,219,5,7,204,241],
secondary:!1},{width:6,bonus:175,chr:"B",
pixels:[1,0,241,255,1,1,231,255,1,2,231,255,1,3,241,255,1,4,231,255,1,5,231,255,1,6,231,255,1,7,241,255,2,0,208,255,2,1,241,0,2,2,232,0,2,3,251,212,2,4,241,0,2,5,232,0,2,6,232,0,2,7,251,212,2,8,241,0,3,0,205,255,3,1,208,0,3,3,219,255,3,4,208,0,3,7,209,255,3,8,208,0,4,0,207,255,4,1,212,40,4,3,231,255,4,4,231,90,4,7,199,255,4,8,209,0,5,1,249,229,5,2,207,246,5,4,248,193,5,5,239,246,5,6,195,255,5,8,199,0],
secondary:!1},{width:7,bonus:115,chr:"C",
pixels:[1,2,189,255,1,3,229,255,1,4,225,255,1,5,191,255,2,1,199,255,2,3,190,7,2,4,230,5,2,5,231,57,2,6,239,206,2,7,165,185,3,0,211,255,3,2,200,0,3,7,246,230,4,0,211,255,4,1,211,0,4,7,214,252,4,8,222,0,5,0,211,255,5,1,213,20,5,7,208,255,5,8,211,0,6,1,213,7,6,8,208,0],
secondary:!1},{width:8,bonus:190,chr:"D",
pixels:[1,0,241,255,1,1,231,255,1,2,231,255,1,3,231,255,1,4,231,255,1,5,231,255,1,6,231,255,1,7,241,255,2,0,208,255,2,1,241,0,2,2,232,0,2,3,232,0,2,4,232,0,2,5,232,0,2,6,232,0,2,7,251,212,2,8,241,0,3,0,215,255,3,1,208,0,3,7,219,255,3,8,208,0,4,0,209,255,4,1,220,33,4,7,202,255,4,8,219,0,5,1,246,211,5,6,209,255,5,8,202,0,6,1,132,128,6,2,240,197,6,3,232,247,6,4,220,255,6,5,181,253,6,7,210,0,7,3,186,0,7,4,225,0,7,5,220,0,7,6,179,0],
secondary:!1},{width:6,bonus:160,chr:"E",
pixels:[1,0,241,255,1,1,231,255,1,2,231,255,1,3,241,255,1,4,231,255,1,5,231,255,1,6,231,255,1,7,241,255,2,0,208,255,2,1,241,0,2,2,232,0,2,3,251,212,2,4,241,0,2,5,232,0,2,6,232,0,2,7,251,212,2,8,241,0,3,0,208,255,3,1,208,0,3,3,208,255,3,4,208,0,3,7,208,255,3,8,208,0,4,0,208,255,4,1,208,0,4,3,178,255,4,4,208,0,4,7,208,255,4,8,208,0,5,1,208,0,5,4,178,0,5,8,208,0],
secondary:!1},{width:5,bonus:125,chr:"F",
pixels:[1,0,241,255,1,1,231,255,1,2,231,255,1,3,231,255,1,4,241,255,1,5,231,255,1,6,231,255,1,7,231,255,2,0,208,255,2,1,241,0,2,2,232,0,2,3,232,0,2,4,251,212,2,5,241,0,2,6,232,0,2,7,232,0,2,8,232,0,3,0,208,255,3,1,208,0,3,4,208,255,3,5,208,0,4,0,208,255,4,1,208,0,4,4,175,255,4,5,208,0],
secondary:!1},{width:8,bonus:170,chr:"G",
pixels:[1,2,184,255,1,3,229,255,1,4,225,255,1,5,187,255,2,1,209,255,2,3,185,10,2,4,230,7,2,5,231,61,2,6,240,212,2,7,151,180,3,0,199,255,3,2,209,0,3,7,247,226,4,0,211,255,4,1,200,0,4,7,217,251,4,8,219,0,5,0,219,255,5,1,212,4,5,4,208,255,5,7,215,255,5,8,214,0,6,0,137,255,6,1,224,36,6,4,219,255,6,5,250,236,6,6,231,255,6,7,178,255,6,8,215,0,7,1,137,0,7,5,220,0,7,6,232,0,7,7,232,0,7,8,178,0],
secondary:!1},{width:8,bonus:190,chr:"H",
pixels:[1,0,231,255,1,1,231,255,1,2,231,255,1,3,241,255,1,4,231,255,1,5,231,255,1,6,231,255,1,7,231,255,2,1,232,0,2,2,232,0,2,3,251,212,2,4,241,0,2,5,232,0,2,6,232,0,2,7,232,0,2,8,232,0,3,3,208,255,3,4,208,0,4,3,208,255,4,4,208,0,5,3,208,255,5,4,208,0,6,0,231,255,6,1,231,255,6,2,231,255,6,3,241,255,6,4,250,236,6,5,231,255,6,6,231,255,6,7,231,255,7,1,232,0,7,2,232,0,7,3,232,0,7,4,241,0,7,5,232,0,7,6,232,0,7,7,232,0,7,8,232,0],
secondary:!1},{width:3,bonus:100,chr:"I",
pixels:[0,0,136,255,0,7,135,255,1,0,249,255,1,1,244,242,1,2,231,255,1,3,231,255,1,4,231,255,1,5,231,255,1,6,231,255,1,7,249,255,1,8,135,0,2,0,139,255,2,1,250,0,2,2,232,0,2,3,232,0,2,4,232,0,2,5,232,0,2,6,232,0,2,7,244,144,2,8,250,0],secondary:!1},{
width:3,bonus:105,chr:"J",
pixels:[0,9,203,255,0,10,133,0,1,0,231,255,1,1,231,255,1,2,231,255,1,3,231,255,1,4,231,255,1,5,231,255,1,6,231,255,1,7,231,255,1,8,209,255,1,10,203,0,2,1,232,0,2,2,232,0,2,3,232,0,2,4,232,0,2,5,232,0,2,6,232,0,2,7,232,0,2,8,231,0,2,9,209,0],
secondary:!1},{width:6,bonus:145,chr:"K",
pixels:[1,0,231,255,1,1,231,255,1,2,231,255,1,3,233,255,1,4,241,255,1,5,231,255,1,6,231,255,1,7,231,255,2,1,232,0,2,2,233,15,2,3,248,182,2,4,244,131,2,5,242,0,2,6,232,0,2,7,232,0,2,8,232,0,3,2,203,255,3,3,137,243,3,4,245,233,3,5,184,162,4,1,205,255,4,3,203,0,4,4,139,35,4,5,244,170,4,6,225,226,5,0,185,255,5,2,206,0,5,6,190,99,5,7,246,226],
secondary:!1},{width:5,bonus:100,chr:"L",
pixels:[1,0,231,255,1,1,231,255,1,2,231,255,1,3,231,255,1,4,231,255,1,5,231,255,1,6,231,255,1,7,241,255,2,1,232,0,2,2,232,0,2,3,232,0,2,4,232,0,2,5,232,0,2,6,232,0,2,7,252,226,2,8,242,0,3,7,223,255,3,8,224,0,4,7,223,255,4,8,224,0],secondary:!1},{
width:9,bonus:255,chr:"M",
pixels:[1,0,243,255,1,1,231,255,1,2,231,255,1,3,231,255,1,4,231,255,1,5,231,255,1,6,231,255,1,7,231,255,2,0,155,255,2,1,252,206,2,2,245,153,2,3,238,73,2,4,232,5,2,5,232,0,2,6,232,0,2,7,232,0,2,8,232,0,3,1,156,3,3,2,215,70,3,3,206,172,3,4,215,238,3,5,165,253,4,4,139,0,4,5,217,87,4,6,244,233,4,7,242,248,5,4,181,255,5,5,153,255,5,7,223,8,5,8,235,0,6,0,141,255,6,1,179,255,6,2,136,255,6,5,182,0,6,6,153,0,7,0,243,255,7,1,244,242,7,2,248,238,7,3,244,242,7,4,237,249,7,5,232,255,7,6,231,255,7,7,231,255,8,1,244,0,8,2,232,0,8,3,232,0,8,4,232,0,8,5,232,0,8,6,232,0,8,7,232,0,8,8,232,0],
secondary:!1},{width:8,bonus:205,chr:"N",
pixels:[1,0,243,255,1,1,235,255,1,2,231,255,1,3,231,255,1,4,231,255,1,5,231,255,1,6,231,255,1,7,231,255,2,1,253,223,2,2,243,103,2,3,232,1,2,4,232,0,2,5,232,0,2,6,232,0,2,7,232,0,2,8,232,0,3,1,139,55,3,2,244,179,3,3,223,233,4,3,193,88,4,4,246,220,4,5,184,227,5,5,231,125,5,6,246,238,5,7,136,229,6,0,231,255,6,1,231,255,6,2,231,255,6,3,231,255,6,4,231,255,6,5,232,255,6,6,245,247,6,7,253,246,7,1,232,0,7,2,232,0,7,3,232,0,7,4,232,0,7,5,232,0,7,6,232,0,7,7,237,0,7,8,244,0],
secondary:!1},{width:9,bonus:170,chr:"O",
pixels:[1,2,189,255,1,3,225,255,1,4,225,255,1,5,187,255,2,1,193,255,2,3,190,7,2,4,225,5,2,5,230,57,2,6,238,208,2,7,150,179,3,0,213,255,3,2,194,0,3,7,245,224,4,0,213,255,4,1,214,0,4,7,216,252,4,8,215,0,5,0,213,255,5,1,217,19,5,7,213,255,5,8,214,0,6,1,244,200,6,6,191,255,6,8,213,0,7,1,143,126,7,2,237,200,7,3,229,248,7,4,224,254,7,5,187,253,7,7,192,0,8,3,186,0,8,4,223,0,8,5,223,0,8,6,186,0],
secondary:!1},{width:6,bonus:145,chr:"P",
pixels:[1,0,241,255,1,1,231,255,1,2,231,255,1,3,231,255,1,4,241,255,1,5,231,255,1,6,231,255,1,7,231,255,2,0,208,255,2,1,241,0,2,2,232,0,2,3,232,0,2,4,251,212,2,5,241,0,2,6,232,0,2,7,232,0,2,8,232,0,3,0,209,255,3,1,208,0,3,4,203,255,3,5,208,0,4,0,191,255,4,1,223,86,4,4,144,253,4,5,203,0,5,1,240,210,5,2,235,247,5,3,166,254,5,5,143,0],
secondary:!1},{width:9,bonus:185,chr:"Q",
pixels:[1,2,189,255,1,3,225,255,1,4,223,255,1,5,187,255,2,1,193,255,2,3,190,7,2,4,225,5,2,5,229,58,2,6,238,208,2,7,147,178,3,0,213,255,3,2,194,0,3,7,245,222,4,0,213,255,4,1,214,0,4,7,218,252,4,8,215,9,5,0,211,255,5,1,217,19,5,7,241,255,5,8,248,214,6,1,244,200,6,6,191,255,6,8,247,100,6,9,251,239,7,1,139,127,7,2,238,198,7,3,229,248,7,4,227,255,7,5,189,253,7,7,192,0,7,9,131,107,7,10,235,0,8,3,185,0,8,4,223,0,8,5,227,0,8,6,188,0],
secondary:!1},{width:7,bonus:185,chr:"R",
pixels:[1,0,241,255,1,1,231,255,1,2,231,255,1,3,231,255,1,4,241,255,1,5,231,255,1,6,231,255,1,7,231,255,2,0,208,255,2,1,241,0,2,2,232,0,2,3,232,0,2,4,251,212,2,5,241,0,2,6,232,0,2,7,232,0,2,8,232,0,3,0,208,255,3,1,208,0,3,4,229,255,3,5,214,36,4,0,193,255,4,1,220,77,4,4,199,255,4,5,251,227,4,6,135,225,5,1,241,209,5,2,237,249,5,3,179,254,5,5,202,21,5,6,242,156,5,7,230,232,6,2,198,0,6,3,231,0,6,4,178,0,6,7,167,72,6,8,209,0],
secondary:!1},{width:6,bonus:125,chr:"S",
pixels:[1,1,211,255,1,2,219,255,1,7,203,255,2,0,195,255,2,2,218,44,2,3,251,231,2,7,221,251,2,8,203,0,3,0,207,255,3,1,195,0,3,3,159,228,3,4,241,125,3,7,203,255,3,8,217,0,4,0,217,255,4,1,207,2,4,4,242,240,4,5,134,57,4,7,185,255,4,8,204,0,5,1,220,26,5,4,128,209,5,5,252,226,5,6,205,248,5,8,186,0],
secondary:!1},{width:5,bonus:110,chr:"T",
pixels:[0,0,208,255,1,0,208,255,1,1,208,0,2,0,251,255,2,1,250,236,2,2,231,255,2,3,231,255,2,4,231,255,2,5,231,255,2,6,231,255,2,7,231,255,3,0,208,255,3,1,251,0,3,2,232,0,3,3,232,0,3,4,232,0,3,5,232,0,3,6,232,0,3,7,232,0,3,8,232,0,4,0,208,255,4,1,208,0],
secondary:!1},{width:8,bonus:175,chr:"U",
pixels:[1,0,231,255,1,1,231,255,1,2,231,255,1,3,231,255,1,4,231,255,1,5,223,255,1,6,159,255,2,1,232,0,2,2,232,0,2,3,232,0,2,4,232,0,2,5,232,5,2,6,237,119,2,7,221,190,3,7,229,233,3,8,165,0,4,7,205,255,4,8,209,0,5,7,159,255,5,8,206,0,6,0,231,255,6,1,231,255,6,2,231,255,6,3,231,255,6,4,231,255,6,5,223,255,6,6,157,253,6,8,159,0,7,1,232,0,7,2,232,0,7,3,232,0,7,4,232,0,7,5,232,0,7,6,223,0,7,7,156,0],
secondary:!1},{width:6,bonus:140,chr:"V",
pixels:[0,0,213,255,0,1,134,255,1,1,230,115,1,2,222,212,1,3,227,247,1,4,146,255,2,3,188,20,2,4,232,98,2,5,215,194,2,6,220,243,2,7,158,253,3,5,199,216,3,6,240,226,3,7,236,168,3,8,157,0,4,2,189,255,4,3,219,255,4,4,151,242,4,5,133,121,4,6,170,4,4,7,213,0,4,8,156,0,5,0,213,255,5,1,147,230,5,2,138,94,5,3,189,0,5,4,220,0,5,5,144,0],
secondary:!1},{width:9,bonus:240,chr:"W",
pixels:[0,0,193,255,0,1,134,255,1,1,218,120,1,2,210,196,1,3,227,242,1,4,210,251,1,5,148,255,2,3,161,0,2,4,221,37,2,5,231,145,2,6,242,237,2,7,253,253,3,3,193,255,3,4,205,255,3,5,159,232,3,6,170,118,3,7,227,18,3,8,252,0,4,0,243,255,4,1,224,254,4,2,145,196,4,3,138,41,4,4,193,0,4,5,205,0,4,6,145,0,5,1,250,125,5,2,247,197,5,3,229,232,5,4,156,240,6,3,193,14,6,4,221,84,6,5,205,171,6,6,233,244,6,7,201,251,7,3,143,255,7,4,203,253,7,5,225,241,7,6,211,192,7,7,235,106,7,8,198,0,8,0,223,255,8,1,207,255,8,2,158,236,8,3,142,152,8,4,154,42,8,5,201,0,8,6,213,0,8,7,158,0],
secondary:!1},{width:6,bonus:130,chr:"X",
pixels:[0,0,134,255,0,7,171,255,1,1,235,232,1,5,137,255,1,6,199,255,1,8,171,0,2,1,129,39,2,2,238,159,2,3,221,232,2,4,209,255,2,6,138,2,2,7,199,0,3,2,184,247,3,3,216,192,3,4,244,213,3,5,235,157,4,0,148,255,4,1,193,255,4,3,178,0,4,4,164,3,4,5,224,117,4,6,238,233,4,7,133,235,5,1,148,2,5,2,194,0,5,7,237,148],
secondary:!1},{width:5,bonus:105,chr:"Y",
pixels:[0,0,217,255,0,1,166,238,1,1,230,104,1,2,237,225,1,3,177,238,2,3,238,173,2,4,253,253,2,5,235,251,2,6,231,255,2,7,231,255,3,2,209,255,3,3,161,254,3,4,176,57,3,5,252,0,3,6,232,0,3,7,232,0,3,8,232,0,4,0,215,255,4,1,154,253,4,3,209,0,4,4,160,0],
secondary:!1},{width:7,bonus:160,chr:"Z",
pixels:[1,0,181,255,1,6,131,255,1,7,247,255,2,0,208,255,2,1,182,0,2,5,219,255,2,6,141,247,2,7,236,233,2,8,248,0,3,0,208,255,3,1,208,0,3,3,185,255,3,4,185,255,3,6,219,0,3,7,233,228,3,8,216,0,4,0,215,255,4,1,233,150,4,2,219,255,4,4,185,0,4,5,185,0,4,7,208,255,4,8,208,0,5,0,247,255,5,1,236,142,5,2,142,18,5,3,219,0,5,7,208,255,5,8,208,0,6,1,248,0,6,2,131,0,6,8,208,0],
secondary:!1},{width:6,bonus:165,chr:"0",
pixels:[0,1,141,255,0,2,211,255,0,3,229,255,0,4,227,255,0,5,208,255,0,6,135,255,1,0,185,255,1,2,149,31,1,3,211,0,1,4,229,0,1,5,230,20,1,6,228,122,1,7,222,212,2,0,217,255,2,1,186,0,2,7,234,239,2,8,184,0,3,0,175,255,3,1,234,122,3,7,185,255,3,8,219,0,4,1,214,149,4,2,226,230,4,3,229,253,4,4,227,255,4,5,208,255,4,6,145,236,4,8,185,0,5,3,204,0,5,4,227,0,5,5,228,0,5,6,208,0,5,7,134,0],
secondary:!1},{width:6,bonus:85,chr:"1",pixels:[2,1,154,255,3,0,241,255,3,1,241,245,3,2,245,241,3,3,232,255,3,4,231,255,3,5,231,255,3,6,231,255,3,7,231,255,4,1,241,0,4,2,232,0,4,3,232,0,4,4,232,0,4,5,232,0,4,6,232,0,4,7,232,0,4,8,232,0],secondary:!1
},{width:6,bonus:120,chr:"2",
pixels:[1,0,171,255,1,6,193,255,1,7,246,254,2,0,217,255,2,1,171,0,2,5,209,255,2,7,244,218,2,8,246,0,3,0,207,255,3,1,224,43,3,4,213,255,3,6,209,0,3,7,224,237,3,8,208,0,4,1,246,217,4,2,229,251,4,3,156,252,4,5,214,0,4,7,208,255,4,8,208,0,5,2,210,0,5,3,225,0,5,4,154,0,5,8,208,0],
secondary:!1},{width:6,bonus:120,chr:"3",
pixels:[1,0,187,255,1,7,220,249,2,0,213,255,2,1,187,0,2,3,221,255,2,7,210,253,2,8,215,0,3,0,209,255,3,1,217,28,3,3,219,255,3,4,232,93,3,7,191,255,3,8,208,0,4,1,250,230,4,2,192,246,4,4,245,192,4,5,239,246,4,6,189,255,4,8,192,0,5,2,225,0,5,3,186,0,5,5,184,0,5,6,231,0,5,7,189,0],
secondary:!1},{width:6,bonus:125,chr:"4",
pixels:[1,4,193,255,1,5,234,252,2,2,173,255,2,5,247,231,2,6,231,0,3,1,178,255,3,3,173,0,3,5,224,255,3,6,224,0,4,0,243,255,4,1,240,246,4,2,248,238,4,3,236,250,4,4,231,255,4,5,253,255,4,6,252,235,4,7,231,255,5,1,243,0,5,2,232,0,5,3,232,0,5,4,232,0,5,5,252,226,5,6,253,0,5,7,232,0,5,8,232,0],
secondary:!1},{width:6,bonus:130,chr:"5",
pixels:[1,0,237,255,1,1,201,255,1,2,183,253,1,3,235,253,1,7,215,251,2,0,208,255,2,1,238,0,2,2,201,0,2,3,242,221,2,4,233,0,2,7,206,255,2,8,212,0,3,0,208,255,3,1,208,0,3,3,187,255,3,4,224,94,3,7,191,255,3,8,206,0,4,1,208,0,4,4,238,204,4,5,236,246,4,6,185,254,4,8,191,0,5,5,190,0,5,6,228,0,5,7,184,0],
secondary:!1},{width:6,bonus:150,chr:"6",
pixels:[0,2,179,255,0,3,223,255,0,4,237,255,0,5,211,255,0,6,142,255,1,1,189,255,1,3,215,143,1,4,235,98,1,5,238,4,1,6,228,108,1,7,218,200,2,0,203,255,2,2,189,0,2,3,219,243,2,7,226,236,2,8,171,0,3,0,208,255,3,1,204,0,3,3,187,255,3,4,220,80,3,7,196,255,3,8,209,0,4,1,208,0,4,4,239,206,4,5,236,248,4,6,186,254,4,8,196,0,5,5,193,0,5,6,229,0,5,7,186,0],
secondary:!1},{width:6,bonus:100,chr:"7",
pixels:[1,0,208,255,2,0,208,255,2,1,208,0,2,5,179,255,2,6,209,255,2,7,132,230,3,0,208,255,3,1,216,51,3,2,142,255,3,3,215,255,3,4,151,252,3,6,180,0,3,7,210,0,4,0,249,255,4,1,241,190,4,3,145,13,4,4,216,0,4,5,149,0,5,1,249,0,5,2,179,0],secondary:!1},{
width:6,bonus:150,chr:"8",
pixels:[0,1,221,255,0,2,209,255,0,5,225,255,0,6,211,255,1,0,211,255,1,2,225,33,1,3,247,223,1,4,177,220,1,5,132,29,1,6,230,42,1,7,246,210,2,0,211,255,2,1,214,24,2,3,215,249,2,4,233,122,2,5,152,0,2,7,215,247,2,8,202,0,3,1,249,226,3,2,212,251,3,4,243,193,3,7,199,255,3,8,208,0,4,2,221,0,4,3,208,0,4,5,242,221,4,6,211,248,4,8,199,0,5,6,210,0,5,7,205,0],
secondary:!1},{width:6,bonus:150,chr:"9",
pixels:[0,1,187,255,0,2,229,255,0,3,195,255,1,0,196,255,1,2,187,2,1,3,235,76,1,4,239,202,1,7,207,255,2,0,208,255,2,1,196,0,2,4,222,241,2,5,189,0,2,7,203,255,2,8,207,0,3,0,167,255,3,1,225,108,3,5,217,61,3,6,191,255,3,8,203,0,4,1,215,165,4,2,226,235,4,3,237,255,4,4,234,243,4,5,216,212,4,7,192,0,5,2,139,0,5,3,208,0,5,4,237,0,5,5,223,0,5,6,180,0],
secondary:!1},{width:9,bonus:135,chr:"%",
pixels:[1,2,227,255,1,3,225,255,2,1,211,255,2,3,230,22,2,4,249,217,3,2,249,229,3,3,226,252,3,5,224,86,3,6,145,255,4,3,230,62,4,4,241,153,4,5,147,125,4,7,145,0,5,2,141,255,5,4,131,189,5,5,240,235,5,6,234,246,6,3,141,0,6,4,210,225,6,6,223,15,6,7,251,225,7,5,245,228,7,6,229,253,7,7,132,243,7,8,221,0,8,6,219,0,8,7,228,0],
secondary:!1},{width:4,bonus:90,chr:"/",
pixels:[1,5,129,255,1,6,189,255,1,7,205,255,1,8,157,252,1,9,129,185,2,1,141,255,2,2,199,255,2,3,199,255,2,4,148,246,2,6,140,41,2,7,189,0,2,8,206,0,2,9,155,0,3,0,140,239,3,2,146,23,3,3,199,0,3,4,200,0,3,5,143,0],secondary:!1},{width:5,bonus:75,
chr:"+",pixels:[0,4,175,255,1,4,208,255,1,5,175,0,2,2,231,255,2,3,231,255,2,4,251,255,2,5,250,236,2,6,231,255,3,3,232,0,3,4,251,212,3,5,251,0,3,6,232,0,3,7,232,0,4,4,175,255,4,5,208,0],secondary:!1},{width:5,bonus:65,chr:"?",
pixels:[1,0,208,255,2,0,211,255,2,1,210,12,2,3,187,255,2,6,181,231,2,7,209,244,3,1,249,227,3,2,213,253,3,4,187,0,3,7,164,0,3,8,200,0,4,2,222,0,4,3,211,0],secondary:!1},{width:4,bonus:70,chr:"!",
pixels:[2,0,231,255,2,1,231,255,2,2,231,255,2,3,231,255,2,4,231,255,2,5,231,255,2,7,186,204,3,1,232,0,3,2,232,0,3,3,232,0,3,4,232,0,3,5,232,0,3,6,232,0,3,8,149,0],secondary:!1},{width:10,bonus:290,chr:"@",
pixels:[1,3,202,255,1,4,229,255,1,5,229,255,1,6,173,255,2,1,201,255,2,2,129,247,2,3,133,55,2,4,202,0,2,5,231,15,2,6,238,90,2,7,244,232,3,0,146,255,3,2,210,49,3,3,220,218,3,4,234,253,3,5,211,255,3,7,130,136,3,8,244,181,4,0,208,255,4,1,147,3,4,2,219,233,4,4,188,2,4,5,235,39,4,6,247,216,4,8,226,243,4,9,174,0,5,0,208,255,5,1,208,0,5,2,213,255,5,3,200,0,5,6,178,236,5,7,209,0,5,8,204,254,5,9,216,0,6,0,195,255,6,1,214,39,6,2,199,255,6,3,251,235,6,4,235,255,6,5,245,255,6,7,176,44,6,8,163,255,6,9,204,0,7,1,244,219,7,3,199,4,7,4,232,0,7,5,239,55,7,6,253,213,7,9,164,0,8,2,240,186,8,3,233,246,8,4,222,254,8,5,183,255,8,7,211,0,9,3,175,0,9,4,225,0,9,5,222,0,9,6,183,0],
secondary:!1},{width:7,bonus:165,chr:"#",
pixels:[0,5,136,255,1,3,184,255,1,5,223,255,1,6,196,167,1,7,166,255,2,1,155,255,2,2,179,255,2,3,233,255,2,4,223,164,2,5,229,251,2,6,230,57,2,7,133,20,2,8,166,0,3,2,156,0,3,3,234,201,3,4,235,15,3,5,239,234,3,6,237,113,3,7,168,223,4,1,128,255,4,2,174,244,4,3,233,255,4,4,228,181,4,5,230,254,4,6,229,80,4,8,147,0,5,2,133,20,5,3,231,203,5,4,233,0,5,5,226,197,5,6,229,0,6,4,184,0,6,6,175,0],
secondary:!1},{width:6,bonus:145,chr:"$",
pixels:[1,2,225,255,1,3,187,255,1,7,179,254,2,1,213,255,2,3,240,134,2,4,224,156,2,7,219,247,2,8,178,0,3,0,231,255,3,1,249,255,3,2,251,235,3,3,235,253,3,4,253,253,3,5,245,243,3,6,231,255,3,7,251,255,3,8,251,235,4,1,245,151,4,2,250,3,4,3,232,0,4,4,243,109,4,5,254,222,4,6,252,224,4,7,242,115,4,8,251,0,4,9,232,0,5,2,145,0,5,6,222,0,5,7,221,0],
secondary:!1},{width:6,bonus:65,chr:"^",pixels:[1,2,149,255,1,3,173,255,2,0,178,255,2,1,160,255,2,3,149,0,2,4,173,0,3,1,227,184,3,2,217,180,4,2,176,50,4,3,210,173,4,4,199,238,5,4,147,23,5,5,186,0],secondary:!1},{width:7,bonus:40,chr:"~",
pixels:[1,3,147,255,2,3,211,255,2,4,149,12,3,3,145,255,3,4,233,139,4,4,240,235,5,4,147,220,5,5,221,0],secondary:!1},{width:7,bonus:180,chr:"&",
pixels:[0,5,225,255,0,6,215,255,1,1,229,255,1,2,197,255,1,4,187,255,1,6,232,65,1,7,248,222,2,0,229,255,2,1,133,32,2,2,238,87,2,3,249,237,2,4,180,203,2,5,187,4,2,7,217,242,2,8,216,0,3,0,131,255,3,1,253,233,3,2,197,250,3,4,241,106,3,5,228,216,3,7,167,255,3,8,206,0,4,1,132,0,4,2,231,0,4,3,193,0,4,5,196,207,4,6,255,255,4,7,148,122,4,8,168,0,5,4,217,255,5,5,139,248,5,6,182,88,5,7,255,219,6,5,217,0,6,6,135,0,6,8,219,0],
secondary:!1},{width:6,bonus:65,chr:"*",pixels:[1,2,164,244,2,2,224,241,2,3,232,214,3,0,134,255,3,1,165,170,3,2,233,245,3,3,243,193,3,4,212,91,4,1,163,95,4,2,201,203,4,3,229,45,4,4,217,139,5,3,160,0],secondary:!1},{width:4,bonus:105,chr:"(",
pixels:[1,1,145,255,1,2,201,255,1,3,229,255,1,4,231,255,1,5,229,255,1,6,197,255,1,7,141,255,2,0,173,255,2,1,128,180,2,2,161,57,2,3,202,5,2,4,230,0,2,5,232,5,2,6,232,41,2,7,218,106,2,8,218,203,2,9,199,235,3,0,183,0,3,1,174,0,3,9,185,50,3,10,183,0],
secondary:!1},{width:4,bonus:105,chr:")",
pixels:[1,0,184,241,1,8,173,255,1,9,184,255,2,0,196,69,2,1,219,163,2,2,216,229,2,3,230,250,2,4,232,255,2,5,227,255,2,6,198,254,2,7,162,231,2,8,128,117,2,9,173,0,2,10,184,0,3,2,140,0,3,3,194,0,3,4,226,0,3,5,232,0,3,6,227,0,3,7,198,0,3,8,146,0],
secondary:!1},{width:4,bonus:35,chr:"_",pixels:[0,9,208,255,1,9,208,255,1,10,208,0,2,9,208,255,2,10,208,0,3,9,208,255,3,10,208,0],secondary:!1},{width:3,bonus:15,chr:"-",pixels:[1,4,208,255,2,4,187,255,2,5,208,0],secondary:!0},{width:6,bonus:80,
chr:"=",pixels:[1,3,208,255,1,5,208,255,2,3,208,255,2,4,208,0,2,5,208,255,2,6,208,0,3,3,208,255,3,4,208,0,3,5,208,255,3,6,208,0,4,3,208,255,4,4,208,0,4,5,208,255,4,6,208,0,5,4,208,0,5,6,208,0],secondary:!1},{width:4,bonus:115,chr:"[",
pixels:[1,0,231,255,1,1,231,255,1,2,231,255,1,3,231,255,1,4,231,255,1,5,231,255,1,6,231,255,1,7,231,255,1,8,231,255,1,9,219,255,2,0,220,0,2,1,232,0,2,2,232,0,2,3,232,0,2,4,232,0,2,5,232,0,2,6,232,0,2,7,232,0,2,8,232,0,2,9,251,212,2,10,220,0,3,0,208,0,3,10,208,0],
secondary:!1},{width:4,bonus:115,chr:"]",
pixels:[1,9,208,255,2,0,250,236,2,1,231,255,2,2,231,255,2,3,231,255,2,4,231,255,2,5,231,255,2,6,231,255,2,7,231,255,2,8,231,255,2,9,219,255,2,10,208,0,3,0,220,0,3,1,232,0,3,2,232,0,3,3,232,0,3,4,232,0,3,5,232,0,3,6,232,0,3,7,232,0,3,8,232,0,3,9,232,0,3,10,220,0],
secondary:!1},{width:4,bonus:85,chr:"{",pixels:[1,4,239,255,2,0,229,255,2,1,231,255,2,2,231,255,2,3,221,255,2,5,253,225,2,6,234,253,2,7,231,255,2,8,229,255,3,1,230,0,3,2,232,0,3,3,232,0,3,4,221,0,3,6,223,0,3,7,232,0,3,8,233,12,3,9,247,185],
secondary:!1},{width:3,bonus:90,chr:"}",
pixels:[0,9,179,255,1,0,247,237,1,1,232,255,1,2,231,255,1,3,221,255,1,5,223,255,1,6,231,255,1,7,231,255,1,8,229,255,1,10,179,0,2,1,229,0,2,2,232,0,2,3,234,26,2,4,252,241,2,6,224,0,2,7,232,0,2,8,232,0,2,9,229,0],secondary:!1},{width:3,bonus:30,
chr:":",pixels:[1,2,239,255,1,6,190,255,1,7,231,254,2,3,239,0,2,7,192,12,2,8,230,0],secondary:!0},{width:3,bonus:30,chr:";",pixels:[1,2,239,255,1,6,193,255,1,7,172,241,2,3,239,0,2,7,194,0,2,8,163,0],secondary:!0},{width:5,bonus:60,chr:'"',
pixels:[1,0,209,255,1,1,185,255,1,2,139,255,2,1,214,34,2,2,187,10,2,3,139,0,3,0,247,255,3,1,225,244,3,2,159,236,4,1,248,0,4,2,215,0,4,3,147,0],secondary:!0},{width:3,bonus:30,chr:"'",
pixels:[1,0,209,255,1,1,185,255,1,2,139,255,2,1,214,34,2,2,187,10,2,3,139,0],secondary:!0},{width:6,bonus:65,chr:"<",
pixels:[1,4,227,255,2,3,135,255,2,5,244,168,3,3,172,255,3,4,135,0,3,5,203,211,3,6,175,57,4,2,169,255,4,4,172,0,4,6,225,188,5,3,169,0,5,6,131,200,5,7,168,9],secondary:!1},{width:6,bonus:50,chr:">",
pixels:[1,2,196,255,1,6,201,255,2,3,222,127,2,7,201,0,3,3,212,223,3,5,193,255,4,4,243,222,4,6,194,0,5,4,138,185,5,5,212,5],secondary:!1},{width:4,bonus:80,chr:"\\",
pixels:[1,0,199,193,1,1,214,241,1,2,190,254,1,3,129,255,2,1,151,0,2,2,205,24,2,3,210,97,2,4,198,182,2,5,213,237,2,6,200,252,2,7,141,255,3,5,141,0,3,6,201,15,3,7,213,83,3,8,199,168,3,9,211,231],secondary:!1},{width:3,bonus:20,chr:".",
pixels:[1,6,172,255,1,7,217,248,2,7,172,0,2,8,211,0],secondary:!0},{width:3,bonus:35,chr:",",pixels:[0,8,153,255,1,6,163,255,1,7,157,210,1,8,133,84,1,9,153,0,2,7,164,0,2,8,129,0],secondary:!0},{width:5,bonus:105,chr:"|",
pixels:[2,0,231,255,2,1,231,255,2,2,231,255,2,3,231,255,2,4,231,255,2,5,231,255,2,6,231,255,2,7,231,255,2,8,231,255,2,9,231,255,3,0,232,0,3,1,232,0,3,2,232,0,3,3,232,0,3,4,232,0,3,5,232,0,3,6,232,0,3,7,232,0,3,8,232,0,3,9,232,0,3,10,232,0],
secondary:!1}],width:10,spacewidth:3,shadow:!0,height:12,basey:7}}],e={},function o(r){var n=e[r];if(void 0!==n)return n.exports;var i=e[r]={exports:{}};return s[r](i,i.exports,o),i.exports}(0);var s,e}));

/***/ }),

/***/ "../node_modules/.pnpm/@alt1+ocr@1.0.0-alpha.7/node_modules/@alt1/ocr/fonts/chatbox/12pt.js":
/*!**************************************************************************************************!*\
  !*** ../node_modules/.pnpm/@alt1+ocr@1.0.0-alpha.7/node_modules/@alt1/ocr/fonts/chatbox/12pt.js ***!
  \**************************************************************************************************/
/***/ (function(module) {

!function(s,e){ true?module.exports=e():0}("undefined"!=typeof self?self:this,(()=>{
return s=[s=>{s.exports={chars:[{width:7,bonus:145,chr:"a",
pixels:[1,7,249,255,1,8,252,254,2,3,196,255,2,6,203,255,2,8,249,36,2,9,255,241,3,3,239,255,3,4,196,2,3,6,237,255,3,7,203,4,3,9,223,249,3,10,241,0,4,3,221,255,4,4,246,115,4,6,241,255,4,7,240,45,4,10,218,0,5,4,249,217,5,5,247,250,5,6,245,254,5,7,254,245,5,8,245,254,5,9,244,241,6,5,212,0,6,6,242,0,6,7,244,0,6,8,244,0,6,9,244,0,6,10,231,0],
secondary:!1},{width:8,bonus:195,chr:"b",
pixels:[1,0,243,255,1,1,245,254,1,2,243,254,1,3,236,252,1,4,255,255,1,5,255,255,1,6,250,254,1,7,255,255,1,8,255,255,1,9,202,244,2,1,244,0,2,2,244,0,2,3,249,127,2,4,245,143,2,5,255,15,2,6,255,0,2,7,249,17,2,8,255,141,2,9,255,116,2,10,193,0,3,3,231,255,3,9,241,236,4,3,233,255,4,4,232,16,4,9,233,255,4,10,223,0,5,4,249,192,5,8,189,255,5,9,157,245,5,10,233,0,6,4,203,159,6,5,243,222,6,6,240,250,6,7,217,246,6,8,161,199,6,9,191,11,7,6,211,0,7,7,235,0,7,8,210,0],
secondary:!1},{width:6,bonus:105,chr:"c",
pixels:[1,4,173,255,1,5,251,255,1,6,250,255,1,7,254,255,1,8,181,253,2,3,171,255,2,5,179,26,2,6,252,0,2,7,250,20,2,8,255,142,2,9,232,197,3,3,233,255,3,4,172,7,3,9,247,245,3,10,179,0,4,3,231,255,4,4,235,18,4,9,230,255,4,10,237,0,5,4,232,13,5,10,230,0],
secondary:!1},{width:8,bonus:220,chr:"d",
pixels:[1,4,173,255,1,5,253,255,1,6,250,255,1,7,253,255,1,8,180,253,2,3,175,255,2,4,167,243,2,5,181,35,2,6,253,0,2,7,250,21,2,8,254,153,2,9,232,197,3,3,237,255,3,4,178,11,3,5,159,0,3,9,248,244,3,10,179,0,4,3,223,255,4,4,238,19,4,9,222,254,4,10,238,0,5,4,246,194,5,8,173,255,5,10,222,0,6,0,243,255,6,1,245,254,6,2,245,254,6,3,245,254,6,4,248,251,6,5,252,247,6,6,246,253,6,7,245,254,6,8,246,253,6,9,250,244,7,1,244,0,7,2,244,0,7,3,244,0,7,4,244,0,7,5,244,0,7,6,244,0,7,7,244,0,7,8,244,0,7,9,244,0,7,10,239,0],
secondary:!1},{width:7,bonus:150,chr:"e",
pixels:[1,4,173,255,1,5,251,255,1,6,255,255,1,7,251,255,1,8,175,253,2,3,184,255,2,5,177,22,2,6,254,240,2,7,255,8,2,8,253,132,2,9,229,195,3,3,237,255,3,4,184,4,3,6,240,254,3,7,240,0,3,9,245,245,3,10,175,0,4,3,179,255,4,4,246,149,4,6,241,255,4,7,240,0,4,9,232,255,4,10,236,0,5,4,224,170,5,5,239,234,5,6,239,251,5,7,241,0,5,10,232,0,6,6,219,0,6,7,235,0],
secondary:!1},{width:4,bonus:115,chr:"f",
pixels:[0,3,213,255,1,1,245,255,1,2,246,254,1,3,255,255,1,4,253,246,1,5,245,254,1,6,245,254,1,7,245,254,1,8,245,254,1,9,245,254,2,0,231,255,2,2,245,0,2,3,254,240,2,4,255,0,2,5,244,0,2,6,244,0,2,7,244,0,2,8,244,0,2,9,244,0,2,10,244,0,3,0,227,255,3,1,233,11,3,4,240,0],
secondary:!1},{width:8,bonus:260,chr:"g",
pixels:[1,4,173,255,1,5,253,255,1,6,250,255,1,7,253,255,1,8,180,253,2,3,175,255,2,4,163,243,2,5,181,34,2,6,253,0,2,7,250,21,2,8,253,151,2,9,232,197,2,12,229,247,3,3,237,255,3,4,177,10,3,5,156,0,3,9,247,245,3,10,179,0,3,12,243,254,3,13,222,0,4,3,221,255,4,4,238,19,4,9,222,254,4,10,238,0,4,12,232,255,4,13,242,0,5,4,245,193,5,8,175,255,5,10,228,59,5,11,173,255,5,12,171,248,5,13,232,0,6,3,239,255,6,4,247,252,6,5,252,247,6,6,246,253,6,7,245,254,6,8,246,253,6,9,251,248,6,10,238,241,6,11,180,228,6,12,180,28,6,13,166,0,7,4,240,0,7,5,244,0,7,6,244,0,7,7,244,0,7,8,244,0,7,9,244,0,7,10,244,0,7,11,225,0,7,12,161,0],
secondary:!1},{width:7,bonus:175,chr:"h",
pixels:[1,0,243,255,1,1,245,254,1,2,245,254,1,3,238,253,1,4,254,255,1,5,255,255,1,6,247,253,1,7,245,254,1,8,245,254,1,9,245,254,2,1,244,0,2,2,244,0,2,3,249,126,2,4,244,125,2,5,254,12,2,6,255,0,2,7,246,0,2,8,244,0,2,9,244,0,2,10,244,0,3,3,237,255,4,3,221,255,4,4,245,118,5,4,248,211,5,5,246,248,5,6,245,254,5,7,245,254,5,8,245,254,5,9,245,254,6,5,205,0,6,6,240,0,6,7,244,0,6,8,244,0,6,9,244,0,6,10,244,0],
secondary:!1},{width:3,bonus:80,chr:"i",pixels:[1,0,181,255,1,3,243,255,1,4,245,254,1,5,245,254,1,6,245,254,1,7,245,254,1,8,245,254,1,9,245,254,2,1,182,0,2,4,244,0,2,5,244,0,2,6,244,0,2,7,244,0,2,8,244,0,2,9,244,0,2,10,244,0],secondary:!1},{width:3,
bonus:115,chr:"j",
pixels:[0,12,236,255,0,13,186,0,1,0,181,255,1,3,243,255,1,4,245,254,1,5,245,254,1,6,245,254,1,7,245,254,1,8,245,254,1,9,245,254,1,10,245,253,1,11,227,251,1,13,236,0,2,1,182,0,2,4,244,0,2,5,244,0,2,6,244,0,2,7,244,0,2,8,244,0,2,9,244,0,2,10,244,0,2,11,243,0,2,12,223,0],
secondary:!1},{width:6,bonus:155,chr:"k",
pixels:[1,0,243,255,1,1,245,254,1,2,245,254,1,3,245,254,1,4,245,254,1,5,245,254,1,6,252,254,1,7,248,255,1,8,245,254,1,9,245,254,2,1,244,0,2,2,244,0,2,3,244,0,2,4,244,0,2,5,247,90,2,6,253,228,2,7,251,23,2,8,248,0,2,9,244,0,2,10,244,0,3,5,201,255,3,6,213,229,3,7,248,203,4,3,165,255,4,4,177,255,4,6,201,2,4,7,221,134,4,8,251,242,5,4,166,3,5,5,177,0,5,9,252,211],
secondary:!1},{width:3,bonus:100,chr:"l",
pixels:[1,0,243,255,1,1,245,254,1,2,245,254,1,3,245,254,1,4,245,254,1,5,245,254,1,6,245,254,1,7,245,254,1,8,245,254,1,9,245,254,2,1,244,0,2,2,244,0,2,3,244,0,2,4,244,0,2,5,244,0,2,6,244,0,2,7,244,0,2,8,244,0,2,9,244,0,2,10,244,0],secondary:!1},{
width:11,bonus:225,chr:"m",
pixels:[1,3,208,255,1,4,254,255,1,5,255,255,1,6,246,254,1,7,245,254,1,8,245,254,1,9,245,254,2,4,229,134,2,5,254,12,2,6,255,0,2,7,245,0,2,8,244,0,2,9,244,0,2,10,244,0,3,3,237,255,4,3,227,255,4,4,245,116,5,4,254,251,5,5,255,255,5,6,245,254,5,7,245,254,5,8,245,254,5,9,245,254,6,4,158,191,6,5,250,8,6,6,255,0,6,7,244,0,6,8,244,0,6,9,244,0,6,10,244,0,7,3,237,255,8,3,223,255,8,4,246,116,9,4,249,210,9,5,246,248,9,6,245,254,9,7,245,254,9,8,245,254,9,9,245,254,10,5,205,0,10,6,239,0,10,7,244,0,10,8,244,0,10,9,244,0,10,10,244,0],
secondary:!1},{width:7,bonus:145,chr:"n",
pixels:[1,3,208,255,1,4,254,255,1,5,255,255,1,6,246,254,1,7,245,254,1,8,245,254,1,9,245,254,2,4,229,134,2,5,254,12,2,6,255,0,2,7,245,0,2,8,244,0,2,9,244,0,2,10,244,0,3,3,237,255,4,3,223,255,4,4,245,118,5,4,249,210,5,5,246,248,5,6,245,254,5,7,245,254,5,8,245,254,5,9,245,254,6,5,205,0,6,6,239,0,6,7,244,0,6,8,244,0,6,9,244,0,6,10,244,0],
secondary:!1},{width:8,bonus:160,chr:"o",
pixels:[1,4,167,255,1,5,251,255,1,6,250,255,1,7,250,255,1,8,168,250,2,3,163,255,2,4,159,245,2,5,175,31,2,6,252,0,2,7,250,23,2,8,253,156,2,9,223,189,3,3,231,255,3,4,165,11,3,9,249,245,3,10,165,0,4,3,225,255,4,4,232,21,4,9,226,255,4,10,239,0,5,4,248,198,5,8,195,255,5,10,226,0,6,4,188,155,6,5,244,218,6,6,239,249,6,7,215,246,6,8,155,191,6,9,196,6,7,6,208,0,7,7,234,0,7,8,207,0],
secondary:!1},{width:8,bonus:195,chr:"p",
pixels:[1,3,211,255,1,4,255,255,1,5,255,255,1,6,248,255,1,7,255,255,1,8,255,255,1,9,236,252,1,10,245,253,1,11,245,254,1,12,245,254,2,4,235,149,2,5,255,12,2,6,255,0,2,7,249,18,2,8,255,146,2,9,255,114,2,10,234,0,2,11,243,0,2,12,244,0,2,13,244,0,3,3,219,255,3,9,240,235,4,3,233,255,4,4,221,22,4,9,234,254,4,10,222,0,5,4,250,199,5,8,199,255,5,9,159,242,5,10,233,0,6,4,203,159,6,5,245,220,6,6,241,249,6,7,217,246,6,8,163,197,6,9,201,10,7,6,211,0,7,7,235,0,7,8,210,0],
secondary:!1},{width:8,bonus:220,chr:"q",
pixels:[1,4,173,255,1,5,253,255,1,6,250,255,1,7,253,255,1,8,181,253,2,3,175,255,2,4,163,243,2,5,182,34,2,6,253,0,2,7,250,21,2,8,254,153,2,9,232,197,3,3,237,255,3,4,177,10,3,5,155,0,3,9,249,245,3,10,179,0,4,3,223,255,4,4,238,19,4,9,222,254,4,10,239,0,5,4,246,192,5,8,173,255,5,10,227,41,6,3,237,255,6,4,247,252,6,5,252,247,6,6,246,253,6,7,245,254,6,8,246,253,6,9,251,248,6,10,248,251,6,11,245,254,6,12,245,254,7,4,238,0,7,5,244,0,7,6,244,0,7,7,244,0,7,8,244,0,7,9,244,0,7,10,244,0,7,11,244,0,7,12,244,0,7,13,244,0],
secondary:!1},{width:5,bonus:85,chr:"r",pixels:[1,3,205,255,1,4,247,253,1,5,255,255,1,6,246,254,1,7,245,254,1,8,245,254,1,9,245,254,2,4,238,180,2,5,247,29,2,6,255,0,2,7,245,0,2,8,244,0,2,9,244,0,2,10,244,0,3,3,231,255,3,5,168,0,4,4,231,0],
secondary:!1},{width:7,bonus:125,chr:"s",
pixels:[1,4,251,255,1,5,225,253,1,9,198,251,2,3,219,255,2,5,253,139,2,6,240,146,2,9,243,251,2,10,195,0,3,3,239,255,3,4,219,0,3,6,243,241,3,9,237,255,3,10,240,0,4,3,229,255,4,4,241,25,4,6,184,245,4,7,243,139,4,9,197,255,4,10,237,0,5,4,233,43,5,7,239,217,5,8,236,233,5,10,198,0,6,8,203,0,6,9,215,0],
secondary:!1},{width:4,bonus:95,chr:"t",
pixels:[0,3,211,255,1,2,233,255,1,3,255,255,1,4,253,246,1,5,245,254,1,6,245,254,1,7,245,254,1,8,253,255,2,3,253,241,2,4,255,0,2,5,244,0,2,6,244,0,2,7,244,0,2,8,245,36,2,9,255,239,3,3,195,255,3,4,240,0,3,9,201,245,3,10,239,0],secondary:!1},{width:7,
bonus:150,chr:"u",
pixels:[1,3,243,255,1,4,245,254,1,5,245,254,1,6,245,254,1,7,248,255,1,8,248,254,2,4,244,0,2,5,244,0,2,6,244,0,2,7,244,0,2,8,249,60,2,9,254,236,3,9,237,249,3,10,235,0,4,8,165,255,4,10,231,0,5,3,243,255,5,4,245,254,5,5,245,254,5,6,245,254,5,7,245,254,5,8,246,253,5,9,249,245,6,4,244,0,6,5,244,0,6,6,244,0,6,7,244,0,6,8,244,0,6,9,244,0,6,10,240,0],
secondary:!1},{width:6,bonus:120,chr:"v",
pixels:[0,3,211,255,1,4,238,170,1,5,246,246,1,6,207,246,2,5,160,8,2,6,243,78,2,7,234,171,2,8,239,242,2,9,195,247,3,7,168,202,3,8,237,225,3,9,250,216,3,10,189,0,4,5,219,255,4,6,223,255,4,7,158,217,4,8,154,74,4,9,209,0,4,10,212,0,5,3,231,255,5,4,167,221,5,5,162,88,5,6,220,0,5,7,223,0],
secondary:!1},{width:9,bonus:200,chr:"w",
pixels:[0,3,187,255,1,4,227,164,1,5,229,229,1,6,244,252,1,7,187,253,2,6,208,16,2,7,246,105,2,8,244,223,2,9,255,255,3,6,217,255,3,7,213,253,3,8,183,190,3,9,223,70,3,10,255,0,4,3,245,255,4,4,212,254,4,6,158,50,4,7,218,0,4,8,211,0,5,4,252,185,5,5,251,237,5,6,210,218,6,5,185,11,6,6,239,76,6,7,220,161,6,8,232,237,6,9,224,250,7,6,163,251,7,7,229,245,7,8,242,240,7,9,240,174,7,10,220,0,8,3,231,255,8,4,233,255,8,5,180,237,8,6,162,162,8,7,174,56,8,8,220,0,8,9,228,0,8,10,164,0],
secondary:!1},{width:6,bonus:105,chr:"x",
pixels:[1,3,209,255,1,4,206,222,1,8,202,255,1,9,186,254,2,4,230,133,2,5,248,238,2,6,169,240,2,7,229,255,2,9,202,0,2,10,185,0,3,5,225,227,3,6,254,240,3,7,224,198,3,8,231,22,4,4,231,255,4,6,201,8,4,7,247,132,4,8,247,237,5,3,177,255,5,5,231,0,5,9,250,207],
secondary:!1},{width:6,bonus:150,chr:"y",
pixels:[0,3,205,255,0,12,201,255,1,4,238,183,1,5,247,249,1,6,179,247,1,12,231,255,1,13,201,0,2,5,176,20,2,6,246,100,2,7,231,201,2,8,233,245,2,10,155,255,2,11,237,255,2,13,231,0,3,7,178,187,3,8,242,222,3,9,249,215,3,10,194,156,3,11,165,34,3,12,237,0,4,5,217,255,4,6,225,255,4,7,159,219,4,9,211,0,4,10,210,0,5,3,235,255,5,4,170,226,5,5,162,96,5,6,218,1,5,7,225,0],
secondary:!1},{width:6,bonus:115,chr:"z",
pixels:[1,3,191,255,1,9,251,255,2,3,239,255,2,4,191,0,2,7,217,255,2,9,250,248,2,10,252,0,3,3,239,255,3,4,241,19,3,5,161,255,3,6,208,255,3,8,218,0,3,9,248,246,3,10,243,0,4,3,249,255,4,4,253,227,4,6,162,7,4,7,208,0,4,9,239,255,4,10,240,0,5,4,251,39,5,5,225,0,5,10,240,0],
secondary:!1},{width:8,bonus:175,chr:"A",
pixels:[0,9,208,255,1,6,179,255,1,7,235,255,1,8,165,242,1,10,208,0,2,4,231,255,2,5,177,252,2,6,247,251,2,7,187,39,2,8,235,0,2,9,157,0,3,1,215,255,3,2,202,255,3,4,158,32,3,5,232,0,3,6,247,239,3,7,244,25,4,2,249,223,4,3,242,203,4,4,165,156,4,6,231,255,4,7,234,26,5,3,226,69,5,4,230,173,5,5,242,246,5,6,251,255,5,7,241,105,6,5,159,14,6,6,241,96,6,7,254,186,6,8,245,249,6,9,164,251,7,8,192,36,7,9,246,124,7,10,161,0],
secondary:!1},{width:8,bonus:260,chr:"B",
pixels:[1,1,255,255,1,2,245,254,1,3,245,254,1,4,245,254,1,5,255,255,1,6,245,254,1,7,245,254,1,8,245,254,1,9,255,255,2,1,239,255,2,2,255,0,2,3,244,0,2,4,244,0,2,5,254,240,2,6,255,0,2,7,244,0,2,8,244,0,2,9,254,240,2,10,255,0,3,1,241,255,3,2,240,0,3,5,241,255,3,6,240,0,3,9,239,255,3,10,240,0,4,1,237,255,4,2,242,13,4,5,255,255,4,6,243,19,4,9,235,255,4,10,240,0,5,1,181,255,5,2,247,150,5,5,201,251,5,6,255,152,5,9,176,251,5,10,236,0,6,2,237,209,6,3,245,241,6,4,173,227,6,5,155,27,6,6,237,190,6,7,246,242,6,8,195,238,6,9,160,43,6,10,173,0,7,3,194,0,7,4,232,0,7,5,154,0,7,7,177,0,7,8,233,0,7,9,182,0],
secondary:!1},{width:8,bonus:140,chr:"C",
pixels:[1,3,199,255,1,4,253,255,1,5,251,255,1,6,252,254,1,7,206,255,2,2,235,255,2,4,203,25,2,5,254,0,2,6,251,19,2,7,253,99,2,8,251,239,3,1,191,255,3,3,235,0,3,9,251,215,4,1,237,255,4,2,193,9,4,9,248,252,4,10,212,0,5,1,237,255,5,2,238,10,5,9,240,254,5,10,245,0,6,1,189,255,6,2,241,69,6,9,170,255,6,10,240,0,7,2,189,0,7,10,170,0],
secondary:!1},{width:9,bonus:240,chr:"D",
pixels:[1,1,255,255,1,2,245,254,1,3,245,254,1,4,245,254,1,5,245,254,1,6,245,254,1,7,245,254,1,8,245,254,1,9,255,255,2,1,239,255,2,2,255,0,2,3,244,0,2,4,244,0,2,5,244,0,2,6,244,0,2,7,244,0,2,8,244,0,2,9,254,240,2,10,255,0,3,1,243,255,3,2,240,0,3,9,245,255,3,10,240,0,4,1,233,255,4,2,244,25,4,9,227,255,4,10,245,0,5,1,165,255,5,2,244,138,5,9,167,236,5,10,227,0,6,2,248,242,6,3,207,192,6,7,167,255,6,8,229,255,6,9,160,43,6,10,154,0,7,3,248,163,7,4,242,233,7,5,242,251,7,6,222,248,7,7,179,209,7,8,176,36,7,9,229,0,8,4,158,0,8,5,222,0,8,6,238,0,8,7,216,0],
secondary:!1},{width:6,bonus:180,chr:"E",
pixels:[1,1,255,255,1,2,245,254,1,3,245,254,1,4,245,254,1,5,255,255,1,6,245,254,1,7,245,254,1,8,245,254,1,9,255,255,2,1,239,255,2,2,255,0,2,3,244,0,2,4,244,0,2,5,254,240,2,6,255,0,2,7,244,0,2,8,244,0,2,9,254,240,2,10,255,0,3,1,239,255,3,2,240,0,3,5,239,255,3,6,240,0,3,9,239,255,3,10,240,0,4,1,239,255,4,2,240,0,4,5,239,255,4,6,240,0,4,9,239,255,4,10,240,0,5,1,157,255,5,2,240,0,5,6,240,0,5,9,157,255,5,10,240,0],
secondary:!1},{width:6,bonus:150,chr:"F",
pixels:[1,1,255,255,1,2,245,254,1,3,245,254,1,4,245,254,1,5,255,255,1,6,245,254,1,7,245,254,1,8,245,254,1,9,245,254,2,1,239,255,2,2,255,0,2,3,244,0,2,4,244,0,2,5,254,240,2,6,255,0,2,7,244,0,2,8,244,0,2,9,244,0,2,10,244,0,3,1,239,255,3,2,240,0,3,5,239,255,3,6,240,0,4,1,239,255,4,2,240,0,4,5,239,255,4,6,240,0,5,1,157,255,5,2,240,0,5,6,240,0],
secondary:!1},{width:9,bonus:210,chr:"G",
pixels:[1,3,190,255,1,4,253,255,1,5,251,255,1,6,255,255,1,7,211,252,2,2,235,255,2,4,196,31,2,5,254,0,2,6,251,23,2,7,255,106,2,8,252,242,3,1,171,255,3,3,236,0,3,8,161,150,3,9,251,201,4,1,233,255,4,2,176,23,4,9,249,251,4,10,198,0,5,1,241,255,5,2,233,0,5,5,239,255,5,9,240,254,5,10,245,0,6,1,221,255,6,2,243,34,6,5,241,255,6,6,242,38,6,9,225,255,6,10,240,0,7,2,226,52,7,5,235,255,7,6,254,245,7,7,245,254,7,8,245,254,7,9,186,226,7,10,225,0,8,6,236,0,8,7,244,0,8,8,244,0,8,9,244,0,8,10,165,0],
secondary:!1},{width:8,bonus:210,chr:"H",
pixels:[1,1,243,255,1,2,245,254,1,3,245,254,1,4,245,254,1,5,255,255,1,6,245,254,1,7,245,254,1,8,245,254,1,9,245,254,2,2,244,0,2,3,244,0,2,4,244,0,2,5,254,240,2,6,255,0,2,7,244,0,2,8,244,0,2,9,244,0,2,10,244,0,3,5,239,255,3,6,240,0,4,5,239,255,4,6,240,0,5,5,241,255,5,6,242,38,6,1,243,255,6,2,245,254,6,3,245,254,6,4,245,254,6,5,245,254,6,6,254,245,6,7,245,254,6,8,245,254,6,9,245,254,7,2,244,0,7,3,244,0,7,4,244,0,7,5,244,0,7,6,244,0,7,7,244,0,7,8,244,0,7,9,244,0,7,10,244,0],
secondary:!1},{width:4,bonus:110,chr:"I",
pixels:[1,1,211,255,1,9,209,255,2,1,253,255,2,2,253,246,2,3,245,254,2,4,245,254,2,5,245,254,2,6,245,254,2,7,245,254,2,8,245,254,2,9,254,255,2,10,209,0,3,1,191,255,3,2,254,0,3,3,244,0,3,4,244,0,3,5,244,0,3,6,244,0,3,7,244,0,3,8,244,0,3,9,253,192,3,10,254,0],
secondary:!1},{width:3,bonus:125,chr:"J",
pixels:[0,12,206,254,0,13,232,0,1,1,243,255,1,2,245,254,1,3,245,254,1,4,245,254,1,5,245,254,1,6,245,254,1,7,245,254,1,8,245,254,1,9,245,254,1,10,238,253,1,11,198,242,1,13,205,0,2,2,244,0,2,3,244,0,2,4,244,0,2,5,244,0,2,6,244,0,2,7,244,0,2,8,244,0,2,9,244,0,2,10,244,0,2,11,236,0,2,12,188,0],
secondary:!1},{width:7,bonus:170,chr:"K",
pixels:[1,1,243,255,1,2,245,254,1,3,245,254,1,4,245,254,1,5,252,254,1,6,250,254,1,7,245,254,1,8,245,254,1,9,245,254,2,2,244,0,2,3,244,0,2,4,247,69,2,5,253,221,2,6,252,30,2,7,249,0,2,8,244,0,2,9,244,0,2,10,244,0,3,4,221,255,3,5,239,249,3,6,241,165,4,3,203,255,4,5,224,26,4,6,249,184,4,7,241,232,5,1,175,255,5,2,177,255,5,4,203,0,5,7,210,124,5,8,252,242,5,9,153,210,6,2,176,3,6,3,177,0,6,9,251,201],
secondary:!1},{width:6,bonus:120,chr:"L",
pixels:[1,1,243,255,1,2,245,254,1,3,245,254,1,4,245,254,1,5,245,254,1,6,245,254,1,7,245,254,1,8,245,254,1,9,255,255,2,2,244,0,2,3,244,0,2,4,244,0,2,5,244,0,2,6,244,0,2,7,244,0,2,8,244,8,2,9,255,255,2,10,255,0,3,9,255,255,3,10,255,0,4,9,255,255,4,10,255,0,5,9,178,252,5,10,255,0],
secondary:!1},{width:10,bonus:295,chr:"M",
pixels:[1,1,255,255,1,2,247,253,1,3,245,254,1,4,245,254,1,5,245,254,1,6,245,254,1,7,245,254,1,8,245,254,1,9,245,254,2,1,175,255,2,2,254,225,2,3,251,155,2,4,247,73,2,5,244,5,2,6,244,0,2,7,244,0,2,8,244,0,2,9,244,0,2,10,244,0,3,2,179,15,3,3,234,92,3,4,220,194,3,5,233,246,3,6,163,252,4,5,170,11,4,6,234,84,4,7,219,185,4,8,237,247,4,9,172,250,5,7,212,232,5,8,231,211,5,9,240,120,5,10,169,0,6,4,196,255,6,5,184,255,6,8,193,0,6,9,192,0,7,1,205,255,7,2,213,255,7,5,204,45,7,6,194,47,8,1,243,255,8,2,252,247,8,3,253,246,8,4,249,250,8,5,246,253,8,6,245,254,8,7,245,254,8,8,245,254,8,9,245,254,9,2,244,0,9,3,244,0,9,4,244,0,9,5,244,0,9,6,244,0,9,7,244,0,9,8,244,0,9,9,244,0,9,10,244,0],
secondary:!1},{width:9,bonus:240,chr:"N",
pixels:[1,1,255,255,1,2,250,255,1,3,245,254,1,4,245,254,1,5,245,254,1,6,245,254,1,7,245,254,1,8,245,254,1,9,245,254,2,2,255,239,2,3,252,116,2,4,244,4,2,5,244,0,2,6,244,0,2,7,244,0,2,8,244,0,2,9,244,0,2,10,244,0,3,2,161,70,3,3,251,196,3,4,230,231,4,4,215,110,4,5,250,234,4,6,173,222,5,6,245,152,5,7,244,240,6,7,182,118,6,8,251,227,6,9,211,226,7,1,243,255,7,2,245,254,7,3,245,254,7,4,245,254,7,5,245,254,7,6,245,254,7,7,245,254,7,8,247,252,7,9,253,246,7,10,187,0,8,2,244,0,8,3,244,0,8,4,244,0,8,5,244,0,8,6,244,0,8,7,244,0,8,8,244,0,8,9,244,0,8,10,244,0],
secondary:!1},{width:10,bonus:210,chr:"O",
pixels:[1,3,211,255,1,4,255,255,1,5,251,255,1,6,255,255,1,7,212,252,2,2,233,255,2,4,214,21,2,5,255,0,2,6,251,19,2,7,255,96,2,8,251,237,3,1,199,255,3,3,233,0,3,9,251,206,4,1,243,255,4,2,201,9,4,9,247,252,4,10,202,0,5,1,239,255,5,2,243,11,5,9,241,255,5,10,244,0,6,1,181,255,6,2,246,105,6,9,185,251,6,10,241,0,7,2,248,240,7,3,186,193,7,8,233,255,7,10,182,0,8,3,247,164,8,4,240,235,8,5,243,251,8,6,227,248,8,7,183,219,8,8,158,58,8,9,234,0,9,4,158,0,9,5,221,0,9,6,239,0,9,7,221,0,9,8,157,0],
secondary:!1},{width:7,bonus:175,chr:"P",
pixels:[1,1,255,255,1,2,245,254,1,3,245,254,1,4,245,254,1,5,255,255,1,6,245,254,1,7,245,254,1,8,245,254,1,9,245,254,2,1,239,255,2,2,255,0,2,3,244,0,2,4,244,0,2,5,254,240,2,6,255,0,2,7,244,0,2,8,244,0,2,9,244,0,2,10,244,0,3,1,235,255,3,2,240,5,3,5,227,255,3,6,240,0,4,1,185,255,4,2,246,141,4,5,166,248,4,6,227,0,5,2,238,208,5,3,244,241,5,4,188,235,5,5,158,34,5,6,161,0,6,3,194,0,6,4,231,0,6,5,173,0],
secondary:!1},{width:10,bonus:220,chr:"Q",
pixels:[1,3,211,255,1,4,255,255,1,5,251,255,1,6,255,255,1,7,212,252,2,2,233,255,2,4,214,21,2,5,255,0,2,6,251,19,2,7,255,96,2,8,251,237,3,1,199,255,3,3,233,0,3,9,251,206,4,1,243,255,4,2,201,9,4,9,247,252,4,10,202,0,5,1,239,255,5,2,243,11,5,9,254,255,5,10,247,90,6,1,181,255,6,2,246,105,6,9,211,253,6,10,254,237,6,11,165,184,7,2,248,240,7,3,186,193,7,8,231,255,7,10,217,53,7,11,253,234,8,3,247,164,8,4,240,235,8,5,242,251,8,6,222,248,8,7,179,217,8,8,158,60,8,9,232,0,8,12,232,0,9,4,158,0,9,5,221,0,9,6,238,0,9,7,216,0],
secondary:!1},{width:7,bonus:200,chr:"R",
pixels:[1,1,255,255,1,2,245,254,1,3,245,254,1,4,245,254,1,5,255,255,1,6,245,254,1,7,245,254,1,8,245,254,1,9,245,254,2,1,239,255,2,2,255,0,2,3,244,0,2,4,244,0,2,5,254,240,2,6,255,0,2,7,244,0,2,8,244,0,2,9,244,0,2,10,244,0,3,1,235,255,3,2,240,3,3,5,249,255,3,6,244,80,4,1,189,255,4,2,246,133,4,5,178,252,4,6,254,196,4,7,224,240,5,2,239,208,5,3,244,244,5,4,188,235,5,6,176,0,5,7,212,87,5,8,246,211,5,9,235,242,6,3,195,0,6,4,234,0,6,5,173,0,6,9,219,94,6,10,223,0],
secondary:!1},{width:7,bonus:150,chr:"S",
pixels:[1,2,241,255,1,3,253,255,1,4,210,250,1,9,214,250,2,1,209,255,2,3,241,8,2,4,254,172,2,5,237,170,2,9,244,252,2,10,210,0,3,1,239,255,3,2,210,0,3,5,252,248,3,6,169,43,3,9,235,255,3,10,241,0,4,1,225,255,4,2,241,29,4,5,172,240,4,6,252,190,4,9,177,253,4,10,235,0,5,2,231,46,5,6,224,195,5,7,248,236,5,8,198,236,5,10,176,0,6,7,171,0,6,8,230,0,6,9,183,0],
secondary:!1},{width:8,bonus:135,chr:"T",
pixels:[1,1,239,255,2,1,239,255,2,2,240,0,3,1,241,255,3,2,242,38,4,1,255,255,4,2,254,245,4,3,245,254,4,4,245,254,4,5,245,254,4,6,245,254,4,7,245,254,4,8,245,254,4,9,245,254,5,1,239,255,5,2,255,0,5,3,244,0,5,4,244,0,5,5,244,0,5,6,244,0,5,7,244,0,5,8,244,0,5,9,244,0,5,10,244,0,6,1,239,255,6,2,240,0,7,2,240,0],
secondary:!1},{width:9,bonus:190,chr:"U",
pixels:[1,1,243,255,1,2,245,254,1,3,245,254,1,4,245,254,1,5,245,254,1,6,245,254,1,7,252,254,1,8,164,251,2,2,244,0,2,3,244,0,2,4,244,0,2,5,244,0,2,6,244,0,2,7,245,21,2,8,254,172,2,9,213,168,3,9,244,233,4,9,240,254,4,10,223,0,5,9,211,255,5,10,239,0,6,8,205,255,6,10,212,0,7,1,243,255,7,2,245,254,7,3,245,254,7,4,245,254,7,5,245,254,7,6,243,254,7,7,216,247,7,9,205,1,8,2,244,0,8,3,244,0,8,4,244,0,8,5,244,0,8,6,244,0,8,7,242,0,8,8,209,0],
secondary:!1},{width:7,bonus:155,chr:"V",
pixels:[0,1,211,255,1,2,239,172,1,3,247,247,1,4,214,247,2,3,163,9,2,4,244,80,2,5,238,175,2,6,247,247,2,7,209,247,3,6,165,11,3,7,245,94,3,8,247,227,3,9,254,255,4,6,199,255,4,7,242,255,4,8,198,214,4,9,230,87,4,10,254,0,5,3,199,255,5,4,245,255,5,5,180,242,5,6,161,134,5,7,200,11,5,8,242,0,5,9,166,0,6,1,247,255,6,2,184,244,6,3,162,140,6,4,202,15,6,5,245,0,6,6,171,0],
secondary:!1},{width:11,bonus:295,chr:"W",
pixels:[0,1,187,255,1,2,230,179,1,3,238,240,1,4,246,253,1,5,186,253,2,3,161,0,2,4,228,34,2,5,248,96,2,6,227,173,2,7,227,229,2,8,238,250,2,9,180,254,3,6,180,195,3,7,230,214,3,8,248,225,3,9,247,168,3,10,180,0,4,3,183,255,4,4,239,255,4,5,192,253,4,6,156,194,4,7,160,77,4,8,193,2,4,9,219,0,4,10,163,0,5,1,255,255,5,2,236,252,5,3,182,174,5,4,187,19,5,5,240,0,5,6,190,0,6,2,255,134,6,3,251,212,6,4,244,244,6,5,168,247,7,4,213,32,7,5,242,105,7,6,225,194,7,7,236,244,7,8,205,250,8,6,168,170,8,7,227,190,8,8,252,239,8,9,246,223,9,3,185,255,9,4,241,255,9,5,219,255,9,6,175,225,9,7,162,140,9,8,177,36,9,9,236,0,9,10,216,0,10,1,223,255,10,2,182,222,10,3,171,139,10,4,193,37,10,5,242,0,10,6,219,0,10,7,154,0],
secondary:!1},{width:7,bonus:150,chr:"X",
pixels:[0,9,166,255,1,1,187,255,1,2,231,233,1,8,231,255,1,10,166,0,2,2,209,101,2,3,249,229,2,4,178,223,2,6,208,255,2,7,170,255,2,9,231,0,3,4,249,217,3,5,255,255,3,6,167,203,3,7,208,0,3,8,170,0,4,3,211,255,4,4,160,247,4,5,225,89,4,6,254,215,4,7,217,206,5,1,169,255,5,2,211,255,5,4,211,0,5,5,155,0,5,7,233,130,5,8,249,243,6,2,170,7,6,3,212,0,6,9,249,178],
secondary:!1},{width:7,bonus:115,chr:"Y",
pixels:[0,1,190,255,1,2,248,234,1,3,200,233,2,3,238,115,2,4,247,235,2,5,191,235,3,5,251,227,3,6,253,251,3,7,246,253,3,8,245,254,3,9,245,254,4,4,231,255,4,6,225,12,4,7,249,0,4,8,244,0,4,9,244,0,4,10,244,0,5,1,155,255,5,2,237,255,5,4,158,26,5,5,232,0,6,2,164,33,6,3,237,0],
secondary:!1},{width:8,bonus:190,chr:"Z",
pixels:[1,1,239,255,1,9,251,255,2,1,239,255,2,2,240,0,2,7,221,255,2,8,182,252,2,9,251,249,2,10,252,0,3,1,239,255,3,2,240,0,3,5,161,255,3,6,233,255,3,8,222,0,3,9,250,244,3,10,245,0,4,1,239,255,4,2,240,0,4,4,233,255,4,5,167,245,4,6,168,27,4,7,233,0,4,9,239,255,4,10,240,0,5,1,245,255,5,2,250,183,5,3,221,255,5,5,233,0,5,6,160,0,5,9,239,255,5,10,240,0,6,1,251,255,6,2,251,143,6,3,183,14,6,4,222,0,6,9,239,255,6,10,240,0,7,2,252,0,7,10,240,0],
secondary:!1},{width:7,bonus:190,chr:"0",
pixels:[1,2,173,255,1,3,245,255,1,4,254,255,1,5,248,254,1,6,254,255,1,7,238,254,1,8,157,255,2,1,203,255,2,3,184,46,2,4,245,1,2,5,254,0,2,6,247,1,2,7,254,33,2,8,247,139,2,9,233,218,3,1,243,255,3,2,206,13,3,9,250,250,3,10,199,0,4,1,169,255,4,2,251,185,4,8,181,255,4,9,181,251,4,10,245,0,5,2,208,141,5,3,237,209,5,4,232,243,5,5,241,252,5,6,228,250,5,7,206,240,5,8,161,182,5,9,184,14,5,10,178,0,6,4,194,0,6,5,222,0,6,6,238,0,6,7,224,0,6,8,194,0],
secondary:!1},{width:7,bonus:105,chr:"1",
pixels:[1,2,191,255,2,2,165,253,2,3,201,46,3,1,243,255,3,2,250,249,3,3,251,248,3,4,245,254,3,5,245,254,3,6,245,254,3,7,245,254,3,8,245,254,3,9,245,254,4,2,244,0,4,3,244,0,4,4,244,0,4,5,244,0,4,6,244,0,4,7,244,0,4,8,244,0,4,9,244,0,4,10,244,0],
secondary:!1},{width:7,bonus:140,chr:"2",
pixels:[1,9,253,255,2,1,203,255,2,8,191,255,2,9,248,251,2,10,253,0,3,1,241,255,3,2,203,2,3,6,181,255,3,7,170,253,3,9,251,243,3,10,244,0,4,1,201,255,4,2,247,124,4,5,219,255,4,7,181,2,4,8,169,0,4,9,240,254,4,10,240,0,5,2,241,203,5,3,243,245,5,4,199,241,5,6,220,0,5,9,239,255,5,10,240,0,6,3,192,0,6,4,233,0,6,5,188,0,6,10,240,0],
secondary:!1},{width:7,bonus:160,chr:"3",
pixels:[1,9,197,250,2,1,221,255,2,5,205,255,2,9,243,251,2,10,193,0,3,1,239,255,3,2,221,1,3,5,255,255,3,6,209,17,3,9,235,255,3,10,239,0,4,1,199,255,4,2,247,126,4,4,169,255,4,5,187,248,4,6,255,148,4,9,177,252,4,10,235,0,5,2,242,211,5,3,241,243,5,4,159,219,5,5,173,18,5,6,233,195,5,7,245,241,5,8,193,237,5,9,157,44,5,10,175,0,6,3,200,0,6,4,230,0,6,7,178,0,6,8,232,0,6,9,179,0],
secondary:!1},{width:7,bonus:160,chr:"4",
pixels:[1,6,157,255,1,7,253,255,2,5,211,255,2,7,247,243,2,8,254,28,3,3,189,255,3,6,212,0,3,7,242,248,3,8,238,30,4,2,203,255,4,4,198,46,4,5,163,56,4,7,237,255,4,8,241,64,5,1,243,255,5,2,249,250,5,3,252,247,5,4,247,252,5,5,245,254,5,6,245,254,5,7,255,255,5,8,254,246,5,9,246,253,6,2,244,0,6,3,244,0,6,4,244,0,6,5,244,0,6,6,244,0,6,7,254,237,6,8,255,28,6,9,245,0,6,10,244,0],
secondary:!1},{width:7,bonus:170,chr:"5",
pixels:[1,1,175,255,1,2,197,255,1,3,219,255,1,4,231,255,1,9,203,251,2,1,243,255,2,2,191,69,2,3,203,32,2,4,252,234,2,5,232,2,2,9,243,251,2,10,200,0,3,1,239,255,3,2,244,0,3,4,236,252,3,5,233,22,3,9,229,255,3,10,240,0,4,1,239,255,4,2,240,0,4,4,163,255,4,5,248,185,4,8,173,255,4,9,154,247,4,10,229,0,5,2,240,0,5,5,221,183,5,6,247,235,5,7,225,246,5,8,165,215,5,9,177,16,6,6,159,0,6,7,227,0,6,8,217,0],
secondary:!1},{width:7,bonus:175,chr:"6",
pixels:[1,3,205,255,1,4,251,255,1,5,255,255,1,6,251,255,1,7,250,254,1,8,166,251,2,2,202,255,2,4,228,134,2,5,253,120,2,6,255,4,2,7,251,18,2,8,252,139,2,9,228,202,3,1,217,255,3,3,202,0,3,4,238,250,3,9,247,245,3,10,181,0,4,1,241,255,4,2,218,0,4,4,196,255,4,5,246,152,4,9,184,254,4,10,238,0,5,2,242,2,5,5,236,190,5,6,245,240,5,7,228,248,5,8,178,225,5,9,161,35,5,10,183,0,6,6,176,0,6,7,231,0,6,8,222,0,6,9,157,0],
secondary:!1},{width:7,bonus:135,chr:"7",
pixels:[1,1,239,255,2,1,239,255,2,2,240,0,3,1,239,255,3,2,240,0,3,7,171,255,3,8,247,255,3,9,181,241,4,1,239,255,4,2,240,0,4,5,199,255,4,6,237,255,4,7,162,215,4,8,180,41,4,9,248,0,4,10,171,0,5,1,243,255,5,2,246,117,5,3,223,255,5,4,212,255,5,5,153,171,5,6,201,13,5,7,237,0,6,1,253,255,6,2,251,182,6,4,223,0,6,5,212,0],
secondary:!1},{width:7,bonus:190,chr:"8",
pixels:[1,2,245,255,1,3,251,255,1,4,160,243,1,6,217,255,1,7,251,255,1,8,242,254,2,1,215,255,2,3,246,12,2,4,254,185,2,5,247,243,2,7,217,1,2,8,252,66,2,9,253,219,3,1,239,255,3,2,216,0,3,5,247,235,3,6,235,8,3,9,243,251,3,10,217,0,4,1,201,255,4,2,246,113,4,4,209,255,4,5,210,230,4,6,246,177,4,9,195,255,4,10,239,0,5,2,244,215,5,3,237,241,5,5,210,11,5,6,230,176,5,7,247,238,5,8,201,240,5,10,195,0,6,3,206,0,6,4,224,0,6,7,159,0,6,8,231,0,6,9,189,0],
secondary:!1},{width:7,bonus:155,chr:"9",
pixels:[1,2,229,255,1,3,251,255,1,4,243,254,2,1,211,255,2,3,229,0,2,4,252,72,2,5,253,221,2,9,241,255,3,1,233,255,3,2,211,6,3,5,235,247,3,6,220,0,3,9,209,255,3,10,241,0,4,2,246,161,4,6,236,80,4,8,241,255,4,10,209,0,5,2,195,147,5,3,237,224,5,4,241,252,5,5,245,245,5,6,233,231,5,7,184,215,5,8,163,78,5,9,242,0,6,4,208,0,6,5,238,0,6,6,235,0,6,7,211,0,6,8,155,0],
secondary:!1},{width:11,bonus:220,chr:"%",
pixels:[1,3,251,255,1,4,253,255,2,2,229,255,2,4,253,41,2,5,254,233,3,2,219,255,3,3,237,83,3,5,228,250,3,6,232,0,3,9,217,255,4,3,250,226,4,4,231,245,4,6,235,99,4,7,217,255,4,10,218,0,5,4,229,62,5,5,248,205,5,6,200,220,5,8,217,6,6,3,166,255,6,4,197,255,6,5,170,220,6,6,252,247,6,7,252,251,6,8,247,253,7,2,209,255,7,4,166,2,7,5,244,214,7,6,161,57,7,7,244,0,7,8,249,40,7,9,254,234,8,3,210,0,8,5,197,254,8,6,222,102,8,9,230,250,8,10,234,0,9,6,242,210,9,7,242,248,9,8,213,245,9,10,226,0,10,7,199,0,10,8,235,0,10,9,205,0],
secondary:!1},{width:5,bonus:125,chr:"/",
pixels:[1,8,167,255,1,9,227,255,1,10,219,255,1,11,172,235,2,4,173,255,2,5,233,255,2,6,212,255,2,7,167,228,2,8,156,143,2,9,176,38,2,10,228,0,2,11,220,0,2,12,158,0,3,0,181,255,3,1,237,255,3,2,203,255,3,3,163,221,3,4,156,129,3,5,180,27,3,6,233,0,3,7,212,0,4,0,157,115,4,1,185,18,4,2,237,0,4,3,203,0],
secondary:!1},{width:7,bonus:90,chr:"+",pixels:[1,6,239,255,2,6,241,255,2,7,242,38,3,3,243,255,3,4,245,254,3,5,245,254,3,6,255,255,3,7,254,245,3,8,245,254,4,4,244,0,4,5,244,0,4,6,254,240,4,7,255,0,4,8,244,0,4,9,244,0,5,6,239,255,5,7,240,0,6,7,240,0],
secondary:!1},{width:6,bonus:100,chr:"?",
pixels:[1,1,209,255,2,1,239,255,2,2,209,0,2,5,177,255,2,6,191,255,2,8,182,252,2,9,219,255,3,1,207,255,3,2,246,110,3,4,175,255,3,6,177,0,3,7,192,0,3,9,207,113,3,10,219,0,4,2,245,214,4,3,241,245,4,4,158,217,4,5,177,3,5,3,206,0,5,4,232,0],secondary:!1
},{width:5,bonus:80,chr:"!",pixels:[2,1,243,255,2,2,245,254,2,3,245,254,2,4,245,254,2,5,245,254,2,6,245,254,2,8,199,255,2,9,241,253,3,2,244,0,3,3,244,0,3,4,244,0,3,5,244,0,3,6,244,0,3,7,244,0,3,9,206,41,3,10,239,0],secondary:!1},{width:11,bonus:365,
chr:"@",
pixels:[1,4,219,255,1,5,255,255,1,6,251,255,1,7,252,254,1,8,191,252,2,2,187,255,2,3,186,254,2,5,222,26,2,6,255,28,2,7,251,34,2,8,254,137,2,9,250,243,3,2,175,253,3,3,194,29,3,4,234,195,3,5,253,255,3,6,251,255,3,7,232,252,3,9,199,172,3,10,249,165,4,1,209,255,4,3,229,192,4,4,161,242,4,5,184,23,4,6,253,1,4,7,252,88,4,8,251,219,4,10,241,238,4,11,161,0,5,1,237,255,5,2,209,1,5,3,242,252,5,4,174,10,5,8,239,246,5,9,215,2,5,10,241,253,5,11,225,0,6,1,229,255,6,2,239,17,6,3,238,255,6,4,241,43,6,7,155,255,6,9,232,9,6,10,220,255,6,11,239,0,7,1,154,255,7,2,243,142,7,3,189,249,7,4,254,245,7,5,245,254,7,6,245,254,7,7,238,250,7,8,197,141,7,10,160,250,7,11,220,0,8,2,240,231,8,3,214,201,8,4,204,91,8,5,245,43,8,6,246,49,8,7,249,105,8,8,252,226,8,11,157,0,9,3,236,137,9,4,239,221,9,5,241,249,9,6,222,248,9,7,185,233,9,9,224,0,10,5,207,0,10,6,235,0,10,7,216,0,10,8,169,0],
secondary:!1},{width:8,bonus:185,chr:"#",
pixels:[1,4,208,255,1,7,239,255,1,8,164,78,2,4,231,255,2,5,239,185,2,6,211,255,2,7,251,255,2,8,249,168,3,2,179,255,3,4,234,244,3,5,235,44,3,6,175,6,3,7,252,242,3,8,252,0,3,9,164,0,4,3,179,0,4,4,233,229,4,5,229,50,4,7,248,255,4,8,250,178,4,9,213,255,5,2,153,255,5,3,199,255,5,4,245,255,5,5,240,182,5,7,248,252,5,8,249,38,5,9,175,2,5,10,213,0,6,3,157,18,6,4,245,217,6,5,246,0,6,6,171,0,6,7,247,247,6,8,245,0,7,5,208,0,7,8,240,0],
secondary:!1},{width:7,bonus:180,chr:"$",
pixels:[1,2,245,255,1,3,253,255,1,4,155,242,1,8,205,249,2,1,205,255,2,3,247,62,2,4,255,235,2,5,181,114,2,8,243,251,2,9,208,44,3,0,243,255,3,1,254,255,3,2,252,247,3,3,248,251,3,4,249,254,3,5,254,252,3,6,247,252,3,7,245,254,3,8,254,255,3,9,254,245,4,1,252,212,4,2,254,26,4,3,244,0,4,4,246,46,4,5,254,234,4,6,252,70,4,7,249,120,4,8,252,196,4,9,254,0,4,10,244,0,5,2,217,54,5,6,252,228,5,7,218,240,5,9,194,0,6,7,225,0,6,8,205,0],
secondary:!1},{width:7,bonus:80,chr:"^",pixels:[1,5,213,255,2,2,160,255,2,3,197,255,2,6,214,0,3,1,217,255,3,2,203,241,3,3,173,53,3,4,197,0,4,2,228,84,4,3,238,198,4,4,194,242,5,4,197,57,5,5,227,174,5,6,228,241,6,6,163,31,6,7,216,0],secondary:!1},{
width:7,bonus:30,chr:"~",pixels:[2,5,235,255,2,6,155,22,3,6,246,142,4,6,246,244,5,6,154,238,5,7,235,0],secondary:!1},{width:9,bonus:225,chr:"&",
pixels:[1,6,237,255,1,7,252,254,1,8,231,253,2,2,253,255,2,3,227,253,2,5,217,255,2,7,238,2,2,8,253,106,2,9,250,209,3,1,235,255,3,3,253,55,3,4,254,246,3,5,162,185,3,6,218,0,3,9,247,250,3,10,205,0,4,1,233,255,4,2,241,77,4,4,189,231,4,5,254,222,4,6,178,161,4,9,228,254,4,10,242,0,5,2,252,232,5,3,196,225,5,5,179,38,5,6,249,216,5,7,201,201,5,8,175,255,5,9,153,231,5,10,228,0,6,3,230,0,6,4,173,0,6,7,253,247,6,8,253,251,6,9,183,36,7,5,187,255,7,6,239,255,7,7,155,224,7,8,252,173,7,9,254,212,8,6,191,18,8,7,239,0,8,9,218,167,8,10,211,0],
secondary:!1},{width:7,bonus:90,chr:"*",
pixels:[1,2,253,255,2,2,208,250,2,3,254,74,2,4,214,254,3,0,219,255,3,1,193,255,3,2,223,255,3,3,250,236,3,5,213,0,4,1,224,39,4,2,237,195,4,3,243,170,4,4,252,226,5,2,245,253,5,3,184,18,5,4,185,89,5,5,232,78,6,3,243,0],secondary:!1},{width:4,bonus:115,
chr:"(",
pixels:[1,2,205,255,1,3,249,255,1,4,255,255,1,5,248,254,1,6,255,255,1,7,248,254,1,8,203,254,2,0,225,255,2,1,160,228,2,2,170,111,2,3,211,33,2,4,249,3,2,5,255,0,2,6,247,4,2,7,255,29,2,8,249,77,2,9,232,159,2,10,241,240,2,11,170,233,3,0,160,7,3,1,226,0,3,11,238,110,3,12,156,0],
secondary:!1},{width:5,bonus:110,chr:")",
pixels:[2,0,246,242,2,1,200,247,2,9,191,255,2,10,237,255,3,1,241,91,3,2,231,172,3,3,227,226,3,4,235,247,3,5,242,252,3,6,233,251,3,7,215,244,3,8,189,216,3,9,171,137,3,10,193,14,3,11,237,0,4,3,156,0,4,4,201,0,4,5,227,0,4,6,239,0,4,7,229,0,4,8,206,0,4,9,160,0],
secondary:!1},{width:5,bonus:45,chr:"_",pixels:[0,11,239,255,1,11,239,255,1,12,240,0,2,11,239,255,2,12,240,0,3,11,239,255,3,12,240,0,4,11,227,255,4,12,240,0],secondary:!1},{width:4,bonus:25,chr:"-",
pixels:[1,6,239,255,2,6,239,255,2,7,240,0,3,6,217,255,3,7,240,0],secondary:!0},{width:7,bonus:100,chr:"=",
pixels:[1,4,239,255,1,7,239,255,2,4,239,255,2,5,240,0,2,7,239,255,2,8,240,0,3,4,239,255,3,5,240,0,3,7,239,255,3,8,240,0,4,4,239,255,4,5,240,0,4,7,239,255,4,8,240,0,5,4,239,255,5,5,240,0,5,7,239,255,5,8,240,0,6,5,240,0,6,8,240,0],secondary:!1},{
width:4,bonus:135,chr:"[",
pixels:[1,0,245,254,1,1,245,254,1,2,245,254,1,3,245,254,1,4,245,254,1,5,245,254,1,6,245,254,1,7,245,254,1,8,245,254,1,9,245,254,1,10,245,254,1,11,248,254,2,0,247,0,2,1,244,0,2,2,244,0,2,3,244,0,2,4,244,0,2,5,244,0,2,6,244,0,2,7,244,0,2,8,244,0,2,9,244,0,2,10,244,0,2,11,254,240,2,12,247,0,3,0,240,0,3,12,240,0],
secondary:!1},{width:4,bonus:135,chr:"]",
pixels:[1,11,241,255,2,0,254,245,2,1,245,254,2,2,245,254,2,3,245,254,2,4,245,254,2,5,245,254,2,6,245,254,2,7,245,254,2,8,245,254,2,9,245,254,2,10,245,254,2,11,238,253,2,12,241,0,3,0,236,0,3,1,244,0,3,2,244,0,3,3,244,0,3,4,244,0,3,5,244,0,3,6,244,0,3,7,244,0,3,8,244,0,3,9,244,0,3,10,244,0,3,11,244,0,3,12,236,0],
secondary:!1},{width:5,bonus:125,chr:"{",
pixels:[0,5,153,255,1,5,233,255,1,6,194,135,2,0,253,255,2,1,244,255,2,2,245,254,2,3,245,253,2,4,214,247,2,6,251,210,2,7,248,250,2,8,245,254,2,9,245,254,2,10,253,255,3,1,253,0,3,2,244,0,3,3,244,0,3,4,243,0,3,5,207,0,3,7,207,0,3,8,243,0,3,9,244,0,3,10,245,30,3,11,255,229,4,0,228,0,4,12,229,0],
secondary:!1},{width:5,bonus:115,chr:"}",
pixels:[1,11,217,255,2,0,251,229,2,1,247,252,2,2,245,254,2,3,245,254,2,4,245,253,2,6,243,255,2,7,244,255,2,8,245,254,2,9,245,254,2,10,227,251,2,12,218,0,3,1,225,0,3,2,244,0,3,3,244,0,3,4,246,57,3,5,255,247,3,7,243,0,3,8,244,0,3,9,244,0,3,10,244,0,3,11,223,0,4,6,247,0],
secondary:!1},{width:4,bonus:40,chr:":",pixels:[1,3,215,255,1,4,175,255,1,8,175,255,1,9,213,255,2,4,227,86,2,5,176,0,2,9,206,120,2,10,214,0],secondary:!0},{width:4,bonus:45,chr:";",
pixels:[1,3,215,255,1,4,175,255,1,9,243,255,1,10,234,254,1,11,155,228,2,4,227,86,2,5,176,0,2,10,243,4,2,11,234,0],secondary:!0},{width:6,bonus:50,chr:'"',
pixels:[2,1,166,255,2,2,207,174,2,3,183,162,3,2,198,116,3,3,170,97,4,1,193,255,4,2,208,207,4,3,182,201,5,2,194,0,5,3,169,0],secondary:!0},{width:4,bonus:20,chr:"'",pixels:[2,1,166,255,2,2,207,174,2,3,183,162,3,2,166,0],secondary:!0},{width:7,
bonus:80,chr:"<",pixels:[1,6,154,255,2,5,195,255,2,6,234,226,2,7,165,44,3,4,166,255,3,6,218,113,3,7,234,158,4,4,190,255,4,5,166,0,4,7,233,240,4,8,155,37,5,3,191,255,5,5,190,0,5,8,238,147,6,4,191,0,6,8,179,163],secondary:!1},{width:7,bonus:80,chr:">",
pixels:[1,3,219,255,1,8,197,255,2,4,237,134,2,7,175,255,2,9,198,0,3,4,232,232,3,7,203,255,3,8,176,0,4,5,234,147,4,6,162,245,4,8,204,0,5,5,219,230,5,6,231,227,5,7,156,2,6,6,211,74,6,7,206,0],secondary:!1},{width:5,bonus:95,chr:"\\",
pixels:[1,0,231,240,1,1,231,251,1,2,167,255,2,0,154,0,2,1,220,27,2,2,237,91,2,3,218,172,2,4,228,234,2,5,237,251,2,6,174,254,3,5,212,20,3,6,240,83,3,7,219,163,3,8,226,228,3,9,239,251,3,10,182,255,4,9,205,15,4,10,240,74,4,11,219,153],secondary:!1},{
width:3,bonus:20,chr:".",pixels:[1,8,197,255,1,9,236,255,2,9,210,68,2,10,236,0],secondary:!0},{width:3,bonus:20,chr:",",pixels:[1,9,255,255,1,10,204,247,2,10,255,0,2,11,198,0],secondary:!0},{width:7,bonus:125,chr:"|",
pixels:[3,0,245,254,3,1,245,254,3,2,245,254,3,3,245,254,3,4,245,254,3,5,245,254,3,6,245,254,3,7,245,254,3,8,245,254,3,9,245,254,3,10,245,254,3,11,245,254,4,0,244,0,4,1,244,0,4,2,244,0,4,3,244,0,4,4,244,0,4,5,244,0,4,6,244,0,4,7,244,0,4,8,244,0,4,9,244,0,4,10,244,0,4,11,244,0,4,12,244,0],
secondary:!1}],width:11,spacewidth:3,shadow:!0,height:14,basey:9}}],e={},function o(r){var n=e[r];if(void 0!==n)return n.exports;var i=e[r]={exports:{}};return s[r](i,i.exports,o),i.exports}(0);var s,e}));

/***/ }),

/***/ "../node_modules/.pnpm/@alt1+ocr@1.0.0-alpha.7/node_modules/@alt1/ocr/fonts/chatbox/14pt.js":
/*!**************************************************************************************************!*\
  !*** ../node_modules/.pnpm/@alt1+ocr@1.0.0-alpha.7/node_modules/@alt1/ocr/fonts/chatbox/14pt.js ***!
  \**************************************************************************************************/
/***/ (function(module) {

!function(s,e){ true?module.exports=e():0}("undefined"!=typeof self?self:this,(()=>{
return s=[s=>{s.exports={chars:[{width:8,bonus:210,chr:"a",
pixels:[1,7,229,255,1,8,255,255,1,9,249,254,2,3,169,255,2,6,161,255,2,7,187,240,2,8,232,28,2,9,255,113,2,10,254,226,3,3,229,255,3,4,183,60,3,6,215,255,3,7,184,86,3,8,176,0,3,10,251,252,3,11,225,0,4,3,245,255,4,4,232,35,4,6,237,255,4,7,221,42,4,10,201,247,4,11,248,0,5,3,199,255,5,4,251,172,5,6,243,255,5,7,242,85,5,9,209,255,5,11,195,0,6,4,245,218,6,5,253,253,6,6,255,255,6,7,255,255,6,8,255,255,6,9,255,255,6,10,254,250,7,5,209,4,7,6,252,8,7,7,255,8,7,8,255,8,7,9,255,8,7,10,255,8,7,11,249,0],
secondary:!1},{width:8,bonus:230,chr:"b",
pixels:[1,0,255,255,1,1,255,255,1,2,255,255,1,3,254,255,1,4,254,255,1,5,255,255,1,6,255,255,1,7,255,255,1,8,255,255,1,9,253,255,1,10,216,242,2,1,255,12,2,2,255,11,2,3,255,93,2,4,255,184,2,5,254,56,2,6,255,21,2,7,255,22,2,8,255,59,2,9,255,190,2,10,253,94,2,11,205,0,3,3,229,253,3,5,184,0,3,10,248,234,4,3,245,255,4,4,234,61,4,10,247,253,4,11,228,0,5,3,160,255,5,4,254,226,5,9,225,255,5,10,180,225,5,11,245,0,6,4,205,150,6,5,250,220,6,6,250,253,6,7,249,254,6,8,226,243,6,9,178,172,6,10,226,8,6,11,159,0,7,6,216,1,7,7,248,0,7,8,248,0,7,9,216,0],
secondary:!1},{width:7,bonus:125,chr:"c",
pixels:[1,5,245,255,1,6,255,255,1,7,255,255,1,8,250,254,2,4,222,254,2,5,171,118,2,6,247,27,2,7,255,25,2,8,255,77,2,9,254,220,2,10,207,178,3,3,229,255,3,4,167,104,3,5,221,0,3,10,252,236,4,3,249,255,4,4,232,32,4,10,250,254,4,11,233,0,5,3,219,255,5,4,250,77,5,10,220,250,5,11,249,0,6,4,221,13,6,11,216,0],
secondary:!1},{width:8,bonus:240,chr:"d",
pixels:[1,4,169,255,1,5,251,255,1,6,255,255,1,7,255,255,1,8,253,255,1,9,177,250,2,3,185,255,2,4,207,249,2,5,192,90,2,6,252,23,2,7,255,22,2,8,255,63,2,9,254,198,2,10,234,206,3,3,247,255,3,4,197,55,3,5,202,0,3,10,254,250,3,11,189,0,4,3,213,255,4,4,250,61,4,10,220,248,4,11,249,0,5,4,248,222,5,9,209,255,5,11,214,0,6,0,255,255,6,1,255,255,6,2,255,255,6,3,255,255,6,4,255,255,6,5,255,255,6,6,255,255,6,7,255,255,6,8,255,255,6,9,255,255,6,10,255,255,7,1,255,8,7,2,255,8,7,3,255,8,7,4,255,8,7,5,255,8,7,6,255,8,7,7,255,8,7,8,255,8,7,9,255,8,7,10,255,8,7,11,255,0],
secondary:!1},{width:8,bonus:175,chr:"e",
pixels:[1,5,245,255,1,6,255,255,1,7,255,255,1,8,249,254,2,4,199,253,2,5,161,82,2,6,254,242,2,7,255,54,2,8,255,77,2,9,254,222,2,10,201,176,3,3,239,255,3,4,168,69,3,5,198,0,3,6,243,251,3,7,243,34,3,10,251,235,4,3,231,255,4,4,242,46,4,6,239,255,4,7,242,34,4,10,251,253,4,11,232,0,5,4,249,205,5,6,243,255,5,7,242,34,5,10,226,252,5,11,249,0,6,4,206,172,6,5,249,235,6,6,255,255,6,7,245,33,6,11,223,0,7,6,230,5,7,7,255,1],
secondary:!1},{width:5,bonus:135,chr:"f",
pixels:[1,3,233,255,2,1,249,255,2,2,255,255,2,3,255,255,2,4,255,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,3,0,229,255,3,1,165,161,3,2,249,17,3,3,255,255,3,4,255,31,3,5,255,12,3,6,255,12,3,7,255,12,3,8,255,12,3,9,255,12,3,10,255,12,3,11,255,0,4,0,245,255,4,1,233,38,4,3,203,251,4,4,255,15],
secondary:!1},{width:8,bonus:265,chr:"g",
pixels:[1,4,167,255,1,5,251,255,1,6,255,255,1,7,255,255,1,8,252,254,1,9,175,249,2,3,184,255,2,4,207,249,2,5,190,90,2,6,251,23,2,7,255,22,2,8,255,63,2,9,255,196,2,10,232,206,2,14,232,237,3,3,247,255,3,4,196,55,3,5,202,0,3,10,254,250,3,11,188,0,3,14,248,252,4,3,209,255,4,4,250,63,4,10,217,246,4,11,249,0,4,14,234,252,5,4,248,223,5,9,211,255,5,11,221,73,5,13,227,255,5,14,180,220,6,3,255,255,6,4,255,255,6,5,255,255,6,6,255,255,6,7,255,255,6,8,255,255,6,9,255,255,6,10,255,255,6,11,254,255,6,12,235,249,6,13,193,194,6,14,230,15,7,4,255,8,7,5,255,8,7,6,255,8,7,7,255,8,7,8,255,8,7,9,255,8,7,10,255,8,7,11,255,4,7,12,254,0,7,13,229,0],
secondary:!1},{width:8,bonus:210,chr:"h",
pixels:[1,0,255,255,1,1,255,255,1,2,255,255,1,3,255,255,1,4,254,255,1,5,255,255,1,6,255,255,1,7,255,255,1,8,255,255,1,9,255,255,1,10,255,255,2,1,255,12,2,2,255,12,2,3,255,83,2,4,255,197,2,5,254,65,2,6,255,22,2,7,255,12,2,8,255,12,2,9,255,12,2,10,255,12,2,11,255,0,3,3,219,254,3,5,197,0,4,3,245,255,4,4,223,40,5,3,197,255,5,4,253,186,6,4,242,211,6,5,253,251,6,6,255,255,6,7,255,255,6,8,255,255,6,9,255,255,6,10,255,255,7,5,200,2,7,6,249,8,7,7,255,8,7,8,255,8,7,9,255,8,7,10,255,8,7,11,255,0],
secondary:!1},{width:3,bonus:90,chr:"i",
pixels:[1,1,223,255,1,3,255,255,1,4,255,255,1,5,255,255,1,6,255,255,1,7,255,255,1,8,255,255,1,9,255,255,1,10,255,255,2,2,223,0,2,4,255,12,2,5,255,12,2,6,255,12,2,7,255,12,2,8,255,12,2,9,255,12,2,10,255,12,2,11,255,0],secondary:!1},{width:4,bonus:135,
chr:"j",
pixels:[0,14,238,255,1,14,231,251,2,1,223,255,2,3,255,255,2,4,255,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,2,11,255,255,2,12,255,255,2,13,233,249,2,14,170,118,3,2,223,0,3,4,255,12,3,5,255,12,3,6,255,12,3,7,255,12,3,8,255,12,3,9,255,12,3,10,255,12,3,11,255,12,3,12,255,8,3,13,255,0,3,14,227,0],
secondary:!1},{width:7,bonus:200,chr:"k",
pixels:[1,0,255,255,1,1,255,255,1,2,255,255,1,3,255,255,1,4,255,255,1,5,255,255,1,6,255,255,1,7,255,255,1,8,255,255,1,9,255,255,1,10,255,255,2,1,255,12,2,2,255,12,2,3,255,12,2,4,255,12,2,5,255,22,2,6,255,171,2,7,255,165,2,8,255,12,2,9,255,12,2,10,255,12,2,11,255,0,3,5,207,253,3,6,237,253,3,7,244,234,3,8,187,86,4,4,223,255,4,5,154,238,4,6,206,7,4,7,245,135,4,8,254,251,4,9,167,212,5,3,237,255,5,5,224,0,5,8,159,94,5,9,254,222,5,10,234,228,6,4,237,0,6,10,243,169,6,11,210,0],
secondary:!1},{width:3,bonus:110,chr:"l",
pixels:[1,0,255,255,1,1,255,255,1,2,255,255,1,3,255,255,1,4,255,255,1,5,255,255,1,6,255,255,1,7,255,255,1,8,255,255,1,9,255,255,1,10,255,255,2,1,255,12,2,2,255,12,2,3,255,12,2,4,255,12,2,5,255,12,2,6,255,12,2,7,255,12,2,8,255,12,2,9,255,12,2,10,255,12,2,11,255,0],
secondary:!1},{width:13,bonus:285,chr:"m",
pixels:[1,3,223,255,1,4,254,255,1,5,255,255,1,6,255,255,1,7,255,255,1,8,255,255,1,9,255,255,1,10,255,255,2,4,247,201,2,5,254,63,2,6,255,22,2,7,255,12,2,8,255,12,2,9,255,12,2,10,255,12,2,11,255,0,3,3,215,255,3,5,195,0,4,3,247,255,4,4,222,41,5,3,205,255,5,4,252,188,6,4,250,238,6,5,255,255,6,6,255,255,6,7,255,255,6,8,255,255,6,9,255,255,6,10,255,255,7,4,209,241,7,5,239,58,7,6,255,14,7,7,255,8,7,8,255,8,7,9,255,8,7,10,255,8,7,11,255,0,8,3,219,255,8,5,198,0,9,3,245,255,9,4,225,41,10,3,199,255,10,4,252,187,11,4,243,209,11,5,253,250,11,6,255,255,11,7,255,255,11,8,255,255,11,9,255,255,11,10,255,255,12,5,199,1,12,6,248,8,12,7,255,8,12,8,255,8,12,9,255,8,12,10,255,8,12,11,255,0],
secondary:!1},{width:8,bonus:180,chr:"n",
pixels:[1,3,223,255,1,4,254,255,1,5,255,255,1,6,255,255,1,7,255,255,1,8,255,255,1,9,255,255,1,10,255,255,2,4,247,201,2,5,254,63,2,6,255,22,2,7,255,12,2,8,255,12,2,9,255,12,2,10,255,12,2,11,255,0,3,3,213,255,3,5,195,0,4,3,245,255,4,4,219,41,5,3,199,255,5,4,253,186,6,4,243,209,6,5,253,251,6,6,255,255,6,7,255,255,6,8,255,255,6,9,255,255,6,10,255,255,7,5,199,1,7,6,249,8,7,7,255,8,7,8,255,8,7,9,255,8,7,10,255,8,7,11,255,0],
secondary:!1},{width:9,bonus:190,chr:"o",
pixels:[1,5,245,255,1,6,255,255,1,7,255,255,1,8,245,253,2,4,222,254,2,5,169,119,2,6,246,26,2,7,255,27,2,8,255,83,2,9,254,226,2,10,190,162,3,3,225,255,3,4,164,108,3,5,222,0,3,10,251,227,4,3,249,255,4,4,230,35,4,10,251,253,4,11,224,0,5,3,215,255,5,4,250,96,5,10,220,249,5,11,249,0,6,4,252,245,6,5,174,186,6,9,243,255,6,10,155,159,6,11,215,0,7,5,252,201,7,6,249,249,7,7,247,252,7,8,217,238,7,9,168,120,7,10,243,0,8,6,199,0,8,7,243,0,8,8,244,0,8,9,202,0],
secondary:!1},{width:8,bonus:235,chr:"p",
pixels:[1,3,227,255,1,4,254,255,1,5,255,255,1,6,255,255,1,7,255,255,1,8,255,255,1,9,254,255,1,10,254,255,1,11,255,255,1,12,255,255,1,13,255,255,1,14,255,255,2,4,246,186,2,5,253,52,2,6,255,18,2,7,255,23,2,8,255,61,2,9,254,192,2,10,254,91,2,11,254,11,2,12,255,12,2,13,255,12,2,14,255,12,3,3,225,255,3,5,180,0,3,10,248,234,4,3,245,255,4,4,232,67,4,10,247,253,4,11,227,0,5,3,161,255,5,4,253,232,5,9,229,255,5,10,183,223,5,11,245,0,6,4,206,153,6,5,251,221,6,6,251,252,6,7,249,254,6,8,226,243,6,9,182,169,6,10,230,8,6,11,160,0,7,6,217,1,7,7,248,0,7,8,248,0,7,9,216,0],
secondary:!1},{width:8,bonus:245,chr:"q",
pixels:[1,4,167,255,1,5,251,255,1,6,255,255,1,7,255,255,1,8,252,254,1,9,177,250,2,3,183,255,2,4,207,251,2,5,191,92,2,6,251,23,2,7,255,22,2,8,255,65,2,9,254,200,2,10,235,207,3,3,247,255,3,4,195,56,3,5,203,0,3,10,254,250,3,11,190,0,4,3,211,255,4,4,249,62,4,10,218,247,4,11,249,0,5,4,248,221,5,9,208,255,5,11,221,65,6,3,255,255,6,4,255,255,6,5,255,255,6,6,255,255,6,7,255,255,6,8,255,255,6,9,255,255,6,10,255,255,6,11,255,255,6,12,255,255,6,13,255,255,6,14,255,255,7,4,255,8,7,5,255,8,7,6,255,8,7,7,255,8,7,8,255,8,7,9,255,8,7,10,255,8,7,11,255,8,7,12,255,8,7,13,255,8,7,14,255,8],
secondary:!1},{width:5,bonus:100,chr:"r",
pixels:[1,3,223,255,1,4,250,254,1,5,255,255,1,6,255,255,1,7,255,255,1,8,255,255,1,9,255,255,1,10,255,255,2,4,249,210,2,5,251,81,2,6,255,19,2,7,255,12,2,8,255,12,2,9,255,12,2,10,255,12,2,11,255,0,3,3,209,255,3,5,205,0,4,3,247,255,4,4,214,37],
secondary:!1},{width:7,bonus:150,chr:"s",
pixels:[1,4,253,255,1,5,255,255,1,10,200,244,2,3,217,255,2,4,154,160,2,5,253,73,2,6,254,249,2,10,247,249,2,11,192,0,3,3,247,255,3,4,221,31,3,6,201,227,3,7,251,140,3,10,245,253,3,11,241,0,4,3,225,255,4,4,249,65,4,7,252,248,4,8,178,125,4,9,154,255,4,10,201,245,4,11,243,0,5,4,232,77,5,7,161,207,5,8,255,245,5,9,230,241,5,10,173,72,5,11,193,0,6,9,245,0,6,10,217,0],
secondary:!1},{width:5,bonus:125,chr:"t",
pixels:[0,3,237,255,1,1,215,255,1,2,255,255,1,3,255,255,1,4,255,255,1,5,255,255,1,6,255,255,1,7,255,255,1,8,255,255,1,9,252,254,2,2,217,14,2,3,255,255,2,4,255,31,2,5,255,12,2,6,255,12,2,7,255,12,2,8,255,15,2,9,255,103,2,10,255,235,3,3,255,255,3,4,255,20,3,10,247,250,3,11,235,0,4,4,255,5,4,11,242,0],
secondary:!1},{width:8,bonus:180,chr:"u",
pixels:[1,3,255,255,1,4,255,255,1,5,255,255,1,6,255,255,1,7,255,255,1,8,255,255,1,9,242,252,2,4,255,12,2,5,255,12,2,6,255,12,2,7,255,12,2,8,255,26,2,9,255,146,2,10,252,218,3,10,251,252,3,11,216,0,4,10,211,248,4,11,248,0,5,9,221,255,5,11,205,0,6,3,255,255,6,4,255,255,6,5,255,255,6,6,255,255,6,7,255,255,6,8,255,255,6,9,255,255,6,10,255,255,7,4,255,8,7,5,255,8,7,6,255,8,7,7,255,8,7,8,255,8,7,9,255,8,7,10,255,8,7,11,255,0],
secondary:!1},{width:7,bonus:145,chr:"v",
pixels:[0,3,211,255,1,4,247,216,1,5,254,255,1,6,201,246,2,5,216,48,2,6,254,127,2,7,245,222,2,8,251,253,2,9,182,248,3,8,222,66,3,9,253,202,3,10,255,255,4,7,185,255,4,8,251,255,4,9,215,241,4,10,224,129,4,11,255,0,5,4,181,255,5,5,249,255,5,6,222,252,5,7,178,185,5,8,196,51,5,9,251,0,5,10,203,0,6,3,233,255,6,4,187,200,6,5,197,71,6,6,250,0,6,7,220,0],
secondary:!1},{width:11,bonus:295,chr:"w",
pixels:[0,3,184,255,1,4,239,213,1,5,253,253,1,6,241,252,1,7,176,255,2,5,202,14,2,6,252,70,2,7,246,136,2,8,235,207,2,9,245,247,2,10,235,251,3,7,158,197,3,8,222,216,3,9,250,243,3,10,250,198,3,11,232,0,4,4,153,255,4,5,227,255,4,6,239,255,4,7,184,232,4,8,169,137,4,9,193,24,4,10,238,0,4,11,194,0,5,3,255,255,5,4,234,246,5,5,198,144,5,6,228,9,5,7,239,0,5,8,168,0,6,4,255,158,6,5,252,232,6,6,247,250,6,7,177,252,7,5,158,2,7,6,234,53,7,7,248,124,7,8,234,204,7,9,247,250,7,10,214,250,8,7,158,218,8,8,221,221,8,9,250,244,8,10,254,230,8,11,209,0,9,4,201,255,9,5,251,255,9,6,236,255,9,7,196,224,9,8,184,146,9,9,201,49,9,10,240,0,9,11,229,0,10,3,181,255,10,4,190,154,10,5,211,59,10,6,251,2,10,7,236,0,10,8,172,0],
secondary:!1},{width:7,bonus:150,chr:"x",
pixels:[1,3,245,255,1,4,189,218,1,9,191,255,1,10,230,255,2,4,252,191,2,5,245,239,2,8,243,255,2,9,170,235,2,10,195,21,2,11,230,0,3,5,218,132,3,6,255,255,3,7,251,254,3,9,244,0,3,10,157,0,4,5,229,255,4,6,212,214,4,7,254,204,4,8,254,210,5,3,177,255,5,4,237,255,5,6,229,0,5,7,179,6,5,8,229,138,5,9,254,248,5,10,170,220,6,3,175,255,6,4,184,32,6,5,237,0,6,10,253,207],
secondary:!1},{width:7,bonus:200,chr:"y",
pixels:[0,3,237,255,0,4,156,250,0,14,239,255,1,4,250,178,1,5,252,251,1,6,231,246,1,14,236,252,2,5,179,20,2,6,250,97,2,7,245,189,2,8,252,252,2,9,211,246,2,13,243,255,2,14,153,187,3,8,194,55,3,9,253,178,3,10,255,255,3,11,253,253,3,12,198,234,3,13,170,100,3,14,244,0,4,7,205,255,4,8,253,255,4,9,203,242,4,10,209,128,4,11,255,22,4,12,252,0,4,13,182,0,5,4,213,255,5,5,255,255,5,6,208,245,5,7,181,159,5,8,210,33,5,9,253,0,5,10,193,0,6,3,207,255,6,4,188,163,6,5,218,39,6,6,255,0,6,7,200,0],
secondary:!1},{width:7,bonus:160,chr:"z",
pixels:[1,3,255,255,1,9,163,255,1,10,255,255,2,3,255,255,2,4,255,20,2,8,235,255,2,9,169,243,2,10,255,255,2,11,255,0,3,3,255,255,3,4,255,20,3,6,193,255,3,7,209,254,3,9,237,21,3,10,255,255,3,11,255,0,4,3,255,255,4,4,255,147,4,5,240,254,4,7,195,5,4,8,208,0,4,10,255,255,4,11,255,0,5,3,255,255,5,4,254,183,5,5,161,51,5,6,239,0,5,10,255,255,5,11,255,0,6,4,255,0,6,5,182,0,6,11,255,0],
secondary:!1},{width:9,bonus:220,chr:"A",
pixels:[0,10,205,255,1,7,163,255,1,8,245,255,1,9,229,253,1,10,178,175,1,11,206,0,2,5,217,255,2,6,251,255,2,7,255,255,2,8,201,133,2,9,246,4,2,10,227,0,3,2,175,255,3,3,249,255,3,4,208,249,3,5,178,159,3,6,220,27,3,7,254,252,3,8,255,44,4,1,255,255,4,2,232,245,4,3,200,104,4,4,250,0,4,5,203,0,4,7,252,254,4,8,253,44,5,2,255,157,5,3,253,246,5,4,231,242,5,7,251,255,5,8,253,44,6,3,162,21,6,4,248,104,6,5,247,208,6,6,255,255,6,7,255,255,6,8,253,130,7,6,210,55,7,7,255,145,7,8,255,237,7,9,249,250,7,10,155,246,8,9,243,93,8,10,252,191],
secondary:!1},{width:10,bonus:285,chr:"B",
pixels:[2,1,255,255,2,2,255,255,2,3,255,255,2,4,255,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,3,1,255,255,3,2,255,31,3,3,255,12,3,4,255,12,3,5,254,240,3,6,255,42,3,7,255,12,3,8,255,12,3,9,255,31,3,10,255,255,3,11,255,0,4,1,253,255,4,2,255,22,4,5,240,254,4,6,242,34,4,10,255,255,4,11,255,0,5,1,237,255,5,2,254,48,5,5,253,255,5,6,242,43,5,10,250,255,5,11,255,0,6,1,185,255,6,2,250,185,6,5,201,252,6,6,253,88,6,10,225,251,6,11,250,0,7,2,243,222,7,3,254,252,7,4,199,229,7,5,164,54,7,6,246,223,7,9,217,255,7,10,167,203,7,11,221,0,8,3,211,1,8,4,251,0,8,5,178,0,8,7,252,240,8,8,244,250,8,9,188,209,8,10,219,10,9,8,237,0,9,9,240,0,9,10,154,0],
secondary:!1},{width:9,bonus:190,chr:"C",
pixels:[1,3,178,255,1,4,251,255,1,5,255,255,1,6,255,255,1,7,254,255,1,8,200,251,2,2,233,255,2,3,201,245,2,4,200,92,2,5,251,29,2,6,255,28,2,7,255,67,2,8,254,180,2,9,253,249,3,1,154,255,3,2,182,243,3,3,234,1,3,4,193,0,3,9,227,180,3,10,252,182,4,1,227,255,4,2,175,79,4,3,173,0,4,10,249,245,4,11,180,0,5,1,249,255,5,2,230,30,5,10,252,254,5,11,239,0,6,1,229,255,6,2,250,60,6,10,234,253,6,11,251,0,7,1,166,255,7,2,240,114,7,10,163,223,7,11,232,0,8,2,166,0],
secondary:!1},{width:11,bonus:270,chr:"D",
pixels:[2,1,255,255,2,2,255,255,2,3,255,255,2,4,255,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,3,1,255,255,3,2,255,31,3,3,255,12,3,4,255,12,3,5,255,12,3,6,255,12,3,7,255,12,3,8,255,12,3,9,255,31,3,10,255,255,3,11,255,0,4,1,255,255,4,2,255,20,4,10,255,255,4,11,255,0,5,1,245,255,5,2,254,46,5,10,243,254,5,11,255,0,6,1,209,255,6,2,248,96,6,10,208,245,6,11,242,0,7,2,249,226,7,9,221,255,7,10,168,169,7,11,200,0,8,2,228,228,8,3,251,233,8,8,225,255,8,9,197,250,8,10,222,6,9,3,231,148,9,4,251,225,9,5,254,254,9,6,252,254,9,7,224,242,9,8,183,172,9,9,226,8,9,10,193,0,10,5,221,2,10,6,253,0,10,7,251,0,10,8,213,0],
secondary:!1},{width:8,bonus:210,chr:"E",
pixels:[2,1,255,255,2,2,255,255,2,3,255,255,2,4,255,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,3,1,255,255,3,2,255,31,3,3,255,12,3,4,255,12,3,5,254,240,3,6,255,42,3,7,255,12,3,8,255,12,3,9,255,31,3,10,255,255,3,11,255,0,4,1,255,255,4,2,255,20,4,5,240,254,4,6,242,34,4,10,255,255,4,11,255,0,5,1,255,255,5,2,255,20,5,5,239,255,5,6,242,34,5,10,255,255,5,11,255,0,6,1,255,255,6,2,255,20,6,5,239,255,6,6,242,34,6,10,255,255,6,11,255,0,7,2,255,7,7,6,240,3,7,11,255,0],
secondary:!1},{width:8,bonus:175,chr:"F",
pixels:[2,1,255,255,2,2,255,255,2,3,255,255,2,4,255,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,3,1,255,255,3,2,255,31,3,3,255,12,3,4,255,12,3,5,254,240,3,6,255,42,3,7,255,12,3,8,255,12,3,9,255,12,3,10,255,12,3,11,255,0,4,1,255,255,4,2,255,20,4,5,240,254,4,6,242,34,5,1,255,255,5,2,255,20,5,5,239,255,5,6,242,34,6,1,255,255,6,2,255,20,6,5,239,255,6,6,242,34,7,2,255,7,7,6,240,3],
secondary:!1},{width:10,bonus:265,chr:"G",
pixels:[1,3,165,255,1,4,247,255,1,5,255,255,1,6,255,255,1,7,253,255,1,8,191,250,2,2,217,255,2,3,212,251,2,4,193,104,2,5,248,32,2,6,255,29,2,7,255,71,2,8,254,192,2,9,251,243,3,2,199,252,3,3,218,6,3,4,208,0,3,9,240,205,3,10,248,166,4,1,211,255,4,2,164,113,4,3,196,0,4,10,249,237,4,11,162,0,5,1,243,255,5,2,215,32,5,10,252,254,5,11,231,0,6,1,241,255,6,2,245,36,6,5,239,255,6,10,247,253,6,11,252,0,7,1,209,255,7,2,246,77,7,5,239,255,7,6,244,85,7,10,220,250,7,11,246,0,8,2,222,79,8,5,239,255,8,6,255,255,8,7,255,255,8,8,255,255,8,9,255,255,8,10,199,201,8,11,216,0,9,6,240,8,9,7,255,8,9,8,255,8,9,9,255,8,9,10,255,3,9,11,157,0],
secondary:!1},{width:10,bonus:240,chr:"H",
pixels:[2,1,255,255,2,2,255,255,2,3,255,255,2,4,255,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,3,2,255,12,3,3,255,12,3,4,255,12,3,5,254,240,3,6,255,42,3,7,255,12,3,8,255,12,3,9,255,12,3,10,255,12,3,11,255,0,4,5,240,254,4,6,242,34,5,5,239,255,5,6,242,34,6,5,239,255,6,6,242,34,7,5,243,255,7,6,244,85,8,1,255,255,8,2,255,255,8,3,255,255,8,4,255,255,8,5,255,255,8,6,255,255,8,7,255,255,8,8,255,255,8,9,255,255,8,10,255,255,9,2,255,8,9,3,255,8,9,4,255,8,9,5,255,8,9,6,255,8,9,7,255,8,9,8,255,8,9,9,255,8,9,10,255,8,9,11,255,0],
secondary:!1},{width:5,bonus:130,chr:"I",
pixels:[1,1,237,255,1,10,233,255,2,1,255,255,2,2,255,255,2,3,255,255,2,4,255,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,2,11,234,0,3,1,227,255,3,2,255,12,3,3,255,12,3,4,255,12,3,5,255,12,3,6,255,12,3,7,255,12,3,8,255,12,3,9,255,12,3,10,255,225,3,11,255,0,4,2,228,0,4,11,225,0],
secondary:!1},{width:4,bonus:150,chr:"J",
pixels:[0,13,249,255,0,14,187,27,1,13,223,255,1,14,249,0,2,1,255,255,2,2,255,255,2,3,255,255,2,4,255,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,2,11,252,254,2,12,216,240,2,13,167,81,2,14,223,0,3,2,255,12,3,3,255,12,3,4,255,12,3,5,255,12,3,6,255,12,3,7,255,12,3,8,255,12,3,9,255,12,3,10,255,12,3,11,255,4,3,12,252,0,3,13,204,0],
secondary:!1},{width:9,bonus:230,chr:"K",
pixels:[2,1,255,255,2,2,255,255,2,3,255,255,2,4,255,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,3,2,255,12,3,3,255,12,3,4,255,13,3,5,255,154,3,6,254,180,3,7,255,14,3,8,255,12,3,9,255,12,3,10,255,12,3,11,255,0,4,4,171,249,4,5,255,255,4,6,227,208,4,7,187,30,5,3,189,255,5,4,187,253,5,5,182,63,5,6,255,199,5,7,248,236,6,2,208,255,6,3,172,248,6,4,190,7,6,5,186,0,6,7,229,152,6,8,255,251,6,9,161,204,7,1,223,255,7,2,157,238,7,3,208,1,7,4,167,0,7,8,168,105,7,9,255,231,7,10,223,219,8,2,224,0,8,10,249,189,8,11,192,0],
secondary:!1},{width:8,bonus:135,chr:"L",
pixels:[2,1,255,255,2,2,255,255,2,3,255,255,2,4,255,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,3,2,255,12,3,3,255,12,3,4,255,12,3,5,255,12,3,6,255,12,3,7,255,12,3,8,255,12,3,9,255,53,3,10,255,255,3,11,255,0,4,10,255,255,4,11,255,0,5,10,255,255,5,11,255,0,6,10,255,255,6,11,255,0,7,11,255,0],
secondary:!1},{width:13,bonus:375,chr:"M",
pixels:[2,1,255,255,2,2,255,255,2,3,255,255,2,4,255,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,3,1,241,255,3,2,255,227,3,3,255,133,3,4,255,39,3,5,255,12,3,6,255,12,3,7,255,12,3,8,255,12,3,9,255,12,3,10,255,12,3,11,255,0,4,2,246,97,4,3,248,196,4,4,253,253,4,5,194,241,5,4,198,43,5,5,253,130,5,6,246,232,5,7,243,249,6,7,232,73,6,8,248,168,6,9,252,253,6,10,218,244,7,8,212,236,7,9,249,245,7,10,253,154,7,11,208,0,8,5,155,255,8,6,241,255,8,7,190,252,8,8,154,150,8,9,198,12,8,10,240,0,9,3,213,255,9,4,223,255,9,5,156,207,9,6,168,47,9,7,241,0,9,8,188,0,10,1,249,255,10,2,222,252,10,3,182,169,10,4,223,65,10,5,230,62,10,6,155,92,11,1,255,255,11,2,255,255,11,3,255,255,11,4,255,255,11,5,255,255,11,6,255,255,11,7,255,255,11,8,255,255,11,9,255,255,11,10,255,255,12,2,255,8,12,3,255,8,12,4,255,8,12,5,255,8,12,6,255,8,12,7,255,8,12,8,255,8,12,9,255,8,12,10,255,8,12,11,255,0],
secondary:!1},{width:11,bonus:275,chr:"N",
pixels:[2,1,255,255,2,2,255,255,2,3,255,255,2,4,255,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,3,1,181,255,3,2,254,249,3,3,255,124,3,4,255,14,3,5,255,12,3,6,255,12,3,7,255,12,3,8,255,12,3,9,255,12,3,10,255,12,3,11,255,0,4,2,205,103,4,3,254,228,4,4,225,224,5,4,243,150,5,5,253,247,6,5,164,76,6,6,253,203,6,7,231,231,7,7,223,120,7,8,251,239,7,9,161,218,8,9,252,216,8,10,237,234,9,1,255,255,9,2,255,255,9,3,255,255,9,4,255,255,9,5,255,255,9,6,255,255,9,7,255,255,9,8,255,255,9,9,255,255,9,10,255,255,9,11,218,0,10,2,255,8,10,3,255,8,10,4,255,8,10,5,255,8,10,6,255,8,10,7,255,8,10,8,255,8,10,9,255,8,10,10,255,8,10,11,255,0],
secondary:!1},{width:11,bonus:270,chr:"O",
pixels:[1,3,191,255,1,4,253,255,1,5,255,255,1,6,255,255,1,7,254,255,1,8,194,250,2,2,241,255,2,3,190,235,2,4,207,80,2,5,254,27,2,6,255,28,2,7,255,65,2,8,254,177,2,9,251,246,3,1,169,255,3,2,181,236,3,3,242,0,3,4,175,0,3,9,228,187,3,10,250,172,4,1,233,255,4,2,189,82,4,3,168,0,4,10,247,241,4,11,169,0,5,1,249,255,5,2,236,34,5,10,251,254,5,11,234,0,6,1,225,255,6,2,251,68,6,10,229,251,6,11,250,0,7,2,248,198,7,9,193,255,7,10,176,213,7,11,226,0,8,2,239,232,8,3,244,223,8,8,213,255,8,9,218,255,8,10,198,25,9,3,237,148,9,4,249,225,9,5,253,253,9,6,252,254,9,7,229,244,9,8,187,187,9,9,217,19,9,10,218,0,10,5,220,1,10,6,252,1,10,7,252,0,10,8,219,0],
secondary:!1},{width:9,bonus:210,chr:"P",
pixels:[2,1,255,255,2,2,255,255,2,3,255,255,2,4,255,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,3,1,255,255,3,2,255,31,3,3,255,12,3,4,255,12,3,5,255,12,3,6,254,240,3,7,255,42,3,8,255,12,3,9,255,12,3,10,255,12,3,11,255,0,4,1,249,255,4,2,255,27,4,6,250,255,4,7,241,22,5,1,221,255,5,2,250,72,5,6,242,255,5,7,250,0,6,2,249,221,6,5,203,255,6,6,164,228,6,7,242,0,7,2,215,196,7,3,253,243,7,4,250,252,7,5,194,219,7,6,205,16,8,3,165,2,8,4,241,0,8,5,247,0,8,6,166,0],
secondary:!1},{width:11,bonus:295,chr:"Q",
pixels:[1,3,191,255,1,4,253,255,1,5,255,255,1,6,255,255,1,7,254,255,1,8,194,250,2,2,241,255,2,3,190,235,2,4,207,80,2,5,254,27,2,6,255,28,2,7,255,65,2,8,254,177,2,9,251,246,3,1,169,255,3,2,181,236,3,3,242,0,3,4,175,0,3,9,228,187,3,10,250,172,4,1,233,255,4,2,189,82,4,3,168,0,4,10,247,241,4,11,169,0,5,1,249,255,5,2,236,34,5,10,254,255,5,11,234,8,6,1,225,255,6,2,251,68,6,10,255,255,6,11,255,202,7,2,248,198,7,9,193,255,7,10,186,222,7,11,255,195,7,12,250,238,8,2,239,232,8,3,244,223,8,8,213,255,8,9,213,255,8,10,199,27,8,11,164,11,8,12,234,185,8,13,245,133,9,3,237,148,9,4,249,225,9,5,254,254,9,6,249,254,9,7,227,242,9,8,184,180,9,9,217,19,9,10,213,0,9,13,184,58,10,5,220,1,10,6,253,0,10,7,248,0,10,8,216,0],
secondary:!1},{width:9,bonus:250,chr:"R",
pixels:[2,1,255,255,2,2,255,255,2,3,255,255,2,4,255,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,3,1,255,255,3,2,255,31,3,3,255,12,3,4,255,12,3,5,255,12,3,6,254,240,3,7,255,42,3,8,255,12,3,9,255,12,3,10,255,12,3,11,255,0,4,1,251,255,4,2,255,24,4,6,244,255,4,7,242,34,5,1,223,255,5,2,252,63,5,6,255,255,5,7,252,202,6,2,249,214,6,5,193,255,6,6,166,238,6,7,255,143,6,8,254,250,6,9,169,224,7,2,218,196,7,3,252,245,7,4,248,252,7,5,188,217,7,6,196,12,7,7,155,0,7,8,165,79,7,9,253,208,7,10,246,242,8,3,168,0,8,4,242,0,8,5,245,0,8,6,160,0,8,10,228,128,8,11,233,0],
secondary:!1},{width:8,bonus:185,chr:"S",
pixels:[1,2,233,255,1,3,255,255,1,4,243,253,1,10,200,244,2,1,184,255,2,2,169,226,2,3,236,28,2,4,255,128,2,5,253,235,2,10,245,247,2,11,192,0,3,1,239,255,3,2,193,46,3,5,234,232,3,6,242,105,3,10,250,254,3,11,237,0,4,1,243,255,4,2,241,37,4,6,247,212,4,10,227,251,4,11,249,0,5,1,211,255,5,2,247,84,5,6,246,248,5,7,233,157,5,9,195,255,5,10,166,220,5,11,224,0,6,2,224,82,6,7,253,231,6,8,251,249,6,9,193,224,6,10,198,18,7,8,229,1,7,9,246,0,7,10,170,0],
secondary:!1},{width:9,bonus:155,chr:"T",
pixels:[1,1,255,255,2,1,255,255,2,2,255,20,3,1,255,255,3,2,255,71,4,1,255,255,4,2,255,255,4,3,255,255,4,4,255,255,4,5,255,255,4,6,255,255,4,7,255,255,4,8,255,255,4,9,255,255,4,10,255,255,5,1,255,255,5,2,255,27,5,3,255,8,5,4,255,8,5,5,255,8,5,6,255,8,5,7,255,8,5,8,255,8,5,9,255,8,5,10,255,8,5,11,255,0,6,1,255,255,6,2,255,20,7,1,255,255,7,2,255,20,8,2,255,0],
secondary:!1},{width:9,bonus:215,chr:"U",
pixels:[1,1,255,255,1,2,255,255,1,3,255,255,1,4,255,255,1,5,255,255,1,6,255,255,1,7,255,255,1,8,254,255,1,9,160,247,2,2,255,12,2,3,255,12,2,4,255,12,2,5,255,12,2,6,255,12,2,7,255,18,2,8,255,65,2,9,255,215,2,10,208,165,3,10,250,226,4,10,248,252,4,11,221,0,5,10,215,249,5,11,245,0,6,9,235,255,6,11,210,0,7,1,255,255,7,2,255,255,7,3,255,255,7,4,255,255,7,5,255,255,7,6,255,255,7,7,252,254,7,8,225,244,7,9,168,153,7,10,236,0,8,2,255,8,8,3,255,8,8,4,255,8,8,5,255,8,8,6,255,8,8,7,255,3,8,8,252,0,8,9,216,0],
secondary:!1},{width:8,bonus:185,chr:"V",
pixels:[0,1,209,255,1,2,247,221,1,3,254,255,1,4,200,246,2,3,222,55,2,4,254,138,2,5,248,231,2,6,251,253,2,7,180,248,3,6,232,67,3,7,252,151,3,8,247,238,3,9,244,250,3,10,161,251,4,8,203,165,4,9,253,235,4,10,254,246,4,11,158,0,5,6,219,255,5,7,251,255,5,8,199,236,5,9,177,134,5,10,234,13,5,11,245,0,6,3,208,255,6,4,255,255,6,5,211,246,6,6,185,153,6,7,222,26,6,8,252,0,6,9,184,0,7,1,253,255,7,2,225,251,7,3,189,176,7,4,215,46,7,5,255,0,7,6,203,0],
secondary:!1},{width:13,bonus:365,chr:"W",
pixels:[0,1,179,255,1,1,155,255,1,2,244,230,1,3,255,255,1,4,234,250,1,5,163,255,2,2,155,0,2,3,224,33,2,4,254,94,2,5,245,165,2,6,243,235,2,7,255,255,2,8,221,251,3,6,159,0,3,7,229,49,3,8,254,150,3,9,253,245,3,10,255,255,4,6,203,255,4,7,253,255,4,8,217,245,4,9,205,167,4,10,246,62,4,11,255,0,5,2,160,255,5,3,233,255,5,4,241,255,5,5,190,232,5,6,178,142,5,7,209,32,5,8,253,0,5,9,208,0,6,1,255,255,6,2,246,250,6,3,211,166,6,4,234,18,6,5,241,0,6,6,173,0,7,2,254,144,7,3,253,223,7,4,252,252,7,5,191,250,8,4,226,48,8,5,252,122,8,6,239,211,8,7,254,254,8,8,220,249,9,7,207,53,9,8,254,156,9,9,253,246,9,10,255,255,10,5,157,255,10,6,221,255,10,7,255,255,10,8,220,248,10,9,213,175,10,10,248,80,10,11,255,0,11,1,153,255,11,2,217,255,11,3,255,255,11,4,233,253,11,5,196,212,11,6,193,125,11,7,225,31,11,8,255,0,11,9,214,0,12,1,181,255,12,2,198,145,12,3,224,50,12,4,255,0,12,5,231,0,12,6,163,0],
secondary:!1},{width:8,bonus:200,chr:"X",
pixels:[0,10,159,255,1,1,233,255,1,2,218,226,1,9,233,255,1,10,184,248,1,11,159,0,2,2,247,159,2,3,253,247,2,7,183,255,2,8,227,255,2,10,234,0,2,11,179,0,3,3,176,84,3,4,253,213,3,5,231,233,3,6,240,254,3,7,156,233,3,8,186,16,3,9,227,0,4,4,184,227,4,5,252,245,4,6,252,242,4,7,246,109,5,3,235,255,5,4,168,245,5,5,170,27,5,6,245,74,5,7,253,225,5,8,224,232,6,1,187,255,6,2,225,255,6,4,235,0,6,5,162,0,6,8,241,150,6,9,253,252,6,10,171,223,7,2,191,16,7,3,225,0,7,9,165,82,7,10,254,210],
secondary:!1},{width:8,bonus:155,chr:"Y",
pixels:[1,1,247,255,1,2,207,233,2,2,252,150,2,3,253,249,2,4,186,231,3,3,160,45,3,4,251,152,3,5,251,248,3,6,164,232,4,5,188,126,4,6,254,252,4,7,255,255,4,8,255,255,4,9,255,255,4,10,255,255,5,4,191,255,5,5,227,255,5,6,155,161,5,7,252,13,5,8,255,12,5,9,255,12,5,10,255,12,5,11,255,0,6,2,189,255,6,3,239,255,6,5,193,12,6,6,228,0,7,1,249,255,7,2,169,215,7,3,193,25,7,4,240,0],
secondary:!1},{width:9,bonus:235,chr:"Z",
pixels:[1,1,255,255,1,9,153,255,1,10,255,255,2,1,255,255,2,2,255,20,2,8,223,255,2,9,223,253,2,10,255,255,2,11,255,0,3,1,255,255,3,2,255,20,3,7,251,255,3,8,166,210,3,9,226,30,3,10,255,255,3,11,255,0,4,1,255,255,4,2,255,20,4,5,217,255,4,6,219,254,4,7,170,86,4,8,251,0,4,10,255,255,4,11,255,0,5,1,255,255,5,2,255,27,5,4,251,255,5,5,169,219,5,6,219,12,5,7,218,0,5,10,255,255,5,11,255,0,6,1,255,255,6,2,254,222,6,3,226,252,6,4,166,98,6,5,251,0,6,10,255,255,6,11,255,0,7,1,255,255,7,2,255,152,7,3,224,14,7,4,223,0,7,10,255,255,7,11,255,0,8,2,255,0,8,11,255,0],
secondary:!1},{width:8,bonus:225,chr:"0",
pixels:[1,3,239,255,1,4,255,255,1,5,255,255,1,6,255,255,1,7,255,255,1,8,237,253,2,1,161,255,2,2,211,253,2,3,185,122,2,4,241,36,2,5,255,18,2,6,255,18,2,7,255,34,2,8,255,89,2,9,251,217,2,10,209,188,3,1,243,255,3,2,180,71,3,3,209,0,3,10,253,245,3,11,154,0,4,1,231,255,4,2,246,72,4,10,239,251,4,11,243,0,5,2,253,240,5,3,172,208,5,9,241,255,5,10,163,202,5,11,235,0,6,2,162,130,6,3,250,189,6,4,242,239,6,5,251,254,6,6,252,254,6,7,237,249,6,8,213,231,6,9,183,135,6,10,242,0,7,4,185,0,7,5,227,1,7,6,250,1,7,7,252,0,7,8,232,0,7,9,193,0],
secondary:!1},{width:8,bonus:120,chr:"1",
pixels:[2,2,213,255,3,1,167,255,3,2,193,252,3,3,222,64,4,1,255,255,4,2,255,255,4,3,255,255,4,4,255,255,4,5,255,255,4,6,255,255,4,7,255,255,4,8,255,255,4,9,255,255,4,10,255,255,5,2,255,12,5,3,255,12,5,4,255,12,5,5,255,12,5,6,255,12,5,7,255,12,5,8,255,12,5,9,255,12,5,10,255,12,5,11,255,0],
secondary:!1},{width:8,bonus:200,chr:"2",
pixels:[1,10,255,255,2,1,167,255,2,2,162,231,2,9,233,255,2,10,255,255,2,11,255,0,3,1,237,255,3,2,181,58,3,8,221,255,3,9,159,82,3,10,255,255,3,11,255,0,4,1,237,255,4,2,240,41,4,6,157,255,4,7,215,255,4,8,154,45,4,9,224,23,4,10,255,255,4,11,255,0,5,1,173,255,5,2,250,193,5,5,205,255,5,6,196,254,5,7,164,30,5,8,215,0,5,10,255,255,5,11,255,0,6,2,233,202,6,3,253,250,6,4,230,246,6,5,168,179,6,6,206,5,6,7,195,0,6,10,255,255,6,11,255,0,7,3,184,2,7,4,248,0,7,5,222,0,7,11,255,0],
secondary:!1},{width:8,bonus:180,chr:"3",
pixels:[1,1,166,255,1,10,237,240,2,1,235,255,2,2,182,66,2,5,241,255,2,10,251,253,2,11,223,0,3,1,243,255,3,2,237,38,3,5,253,255,3,6,245,76,3,10,229,251,3,11,249,0,4,1,191,255,4,2,251,174,4,4,184,255,4,5,164,242,4,6,255,213,4,9,211,255,4,10,173,220,4,11,226,0,5,2,246,225,5,3,253,252,5,4,185,219,5,5,185,3,5,6,211,172,5,7,253,247,5,8,244,250,5,9,190,213,5,10,214,17,6,3,217,2,6,4,250,0,6,5,158,0,6,8,245,0,6,9,240,0,6,10,159,0],
secondary:!1},{width:8,bonus:195,chr:"4",
pixels:[1,7,255,255,2,5,197,255,2,6,167,252,2,7,255,255,2,8,255,48,3,4,225,255,3,6,198,0,3,7,255,255,3,8,255,48,4,3,215,255,4,5,225,0,4,7,255,255,4,8,255,48,5,1,173,255,5,2,197,255,5,3,155,115,5,4,225,63,5,7,255,255,5,8,255,93,6,1,255,255,6,2,255,255,6,3,255,255,6,4,255,255,6,5,255,255,6,6,255,255,6,7,255,255,6,8,255,255,6,9,255,255,6,10,255,255,7,2,255,8,7,3,255,8,7,4,255,8,7,5,255,8,7,6,255,8,7,7,255,255,7,8,255,54,7,9,255,8,7,10,255,8,7,11,255,0],
secondary:!1},{width:8,bonus:200,chr:"5",
pixels:[1,1,166,255,1,2,191,255,1,3,219,255,1,4,243,255,1,10,201,243,2,1,255,255,2,2,212,157,2,3,213,104,2,4,250,230,2,5,245,52,2,10,247,250,2,11,191,0,3,1,255,255,3,2,255,20,3,4,240,248,3,5,230,45,3,10,247,253,3,11,242,0,4,1,255,255,4,2,255,20,4,4,208,255,4,5,241,102,4,10,214,249,4,11,246,0,5,1,255,255,5,2,255,20,5,5,252,240,5,6,163,167,5,9,235,255,5,11,208,0,6,2,255,6,6,5,184,176,6,6,253,241,6,7,253,253,6,8,227,244,6,9,167,154,6,10,235,0,7,7,240,4,7,8,252,0,7,9,217,0],
secondary:!1},{width:8,bonus:205,chr:"6",
pixels:[1,3,175,255,1,4,247,255,1,5,255,255,1,6,255,255,1,7,255,255,1,8,245,254,2,2,237,255,2,4,205,118,2,5,254,197,2,6,255,51,2,7,255,24,2,8,254,82,2,9,253,223,2,10,208,182,3,1,179,255,3,3,237,0,3,4,228,230,3,6,196,0,3,10,251,233,4,1,231,255,4,2,191,52,4,4,223,255,4,5,218,73,4,10,236,250,4,11,230,0,5,1,251,255,5,2,234,28,5,5,250,222,5,9,221,255,5,10,166,220,5,11,231,0,6,2,251,10,6,5,210,178,6,6,251,235,6,7,253,253,6,8,229,246,6,9,176,182,6,10,222,7,7,7,231,1,7,8,252,0,7,9,221,0],
secondary:!1},{width:8,bonus:160,chr:"7",
pixels:[1,1,255,255,2,1,255,255,2,2,255,20,3,1,255,255,3,2,255,20,3,8,197,255,3,9,247,255,3,10,182,233,4,1,255,255,4,2,255,20,4,6,237,255,4,7,211,253,4,8,164,171,4,9,202,23,4,10,247,0,4,11,166,0,5,1,255,255,5,2,255,108,5,3,200,249,5,4,241,255,5,5,171,230,5,6,168,82,5,7,238,0,5,8,210,0,6,1,255,255,6,2,255,199,6,3,165,153,6,4,198,15,6,5,242,0,6,6,154,0,7,2,255,0,7,3,199,0],
secondary:!1},{width:8,bonus:265,chr:"8",
pixels:[1,2,239,255,1,3,255,255,1,4,222,247,1,7,247,255,1,8,255,255,1,9,237,251,2,1,185,255,2,2,164,219,2,3,241,22,2,4,255,149,2,5,249,222,2,6,237,253,2,8,248,24,2,9,255,151,2,10,249,196,3,1,241,255,3,2,195,42,3,5,245,241,3,6,232,113,3,7,235,0,3,10,249,248,3,11,192,0,4,1,235,255,4,2,243,45,4,5,242,255,4,6,247,177,4,10,238,252,4,11,242,0,5,1,171,255,5,2,249,183,5,4,187,255,5,5,158,243,5,6,254,236,5,7,216,162,5,9,191,255,5,10,181,232,5,11,235,0,6,2,238,217,6,3,253,251,6,4,191,222,6,5,188,7,6,6,171,77,6,7,251,213,6,8,251,251,6,9,200,229,6,10,197,29,6,11,165,0,7,3,202,1,7,4,249,0,7,5,166,0,7,8,210,1,7,9,247,0,7,10,180,0],
secondary:!1},{width:8,bonus:230,chr:"9",
pixels:[1,2,199,255,1,3,255,255,1,4,255,255,1,5,238,252,2,1,178,255,2,2,190,243,2,3,207,47,2,4,255,24,2,5,255,135,2,6,252,232,2,10,253,255,3,1,241,255,3,2,189,53,3,3,181,0,3,6,252,253,3,7,232,24,3,10,232,252,3,11,253,0,4,1,229,255,4,2,244,72,4,6,235,255,4,7,250,6,4,9,171,255,4,10,181,232,4,11,229,0,5,2,252,235,5,5,189,255,5,7,244,113,5,8,202,254,5,9,225,255,5,10,182,45,5,11,165,0,6,2,164,141,6,3,249,202,6,4,250,253,6,5,255,255,6,6,252,247,6,7,230,226,6,8,182,181,6,9,205,25,6,10,225,0,7,4,198,0,7,5,248,3,7,6,255,0,7,7,244,0,7,8,204,0],
secondary:!1},{width:12,bonus:290,chr:"%",
pixels:[1,2,239,255,1,3,255,255,1,4,255,255,1,5,247,253,2,1,217,255,2,2,159,178,2,3,240,24,2,4,255,18,2,5,255,71,2,6,254,251,3,1,202,255,3,2,240,162,3,6,248,252,3,7,250,6,3,10,207,255,4,2,241,203,4,3,251,249,4,4,252,254,4,5,222,242,4,6,162,128,4,7,249,94,4,8,210,253,4,11,207,0,5,3,192,0,5,4,246,1,5,5,252,63,5,6,245,205,5,7,178,205,5,9,208,0,6,4,175,255,6,5,173,255,6,7,201,24,6,8,164,75,7,3,197,255,7,5,175,0,7,6,208,133,7,7,250,255,7,8,255,255,7,9,252,254,8,1,196,255,8,4,197,0,8,6,223,255,8,8,250,12,8,9,254,82,8,10,255,237,9,2,196,0,9,6,211,255,9,7,237,117,9,10,236,245,9,11,237,0,10,7,249,222,10,8,254,254,10,9,231,247,10,10,170,120,10,11,227,0,11,8,217,1,11,9,253,0,11,10,224,0],
secondary:!1},{width:6,bonus:150,chr:"/",
pixels:[1,10,197,255,1,11,251,255,1,12,225,254,2,6,195,255,2,7,249,255,2,8,228,254,2,9,186,222,2,10,179,138,2,11,205,40,2,12,251,0,2,13,224,0,3,2,191,255,3,3,247,255,3,4,230,255,3,5,188,224,3,6,179,143,3,7,204,45,3,8,249,0,3,9,227,0,3,10,162,0,4,0,233,255,4,1,190,227,4,2,179,148,4,3,200,50,4,4,248,0,4,5,230,0,4,6,165,0,5,0,246,0,5,1,233,0,5,2,169,0],
secondary:!1},{width:8,bonus:110,chr:"+",
pixels:[1,6,239,255,2,6,239,255,2,7,242,34,3,6,243,255,3,7,244,85,4,3,255,255,4,4,255,255,4,5,255,255,4,6,255,255,4,7,255,255,4,8,255,255,4,9,255,255,5,4,255,8,5,5,255,8,5,6,254,240,5,7,255,39,5,8,255,8,5,9,255,8,5,10,255,0,6,6,240,254,6,7,242,34,7,7,240,0],
secondary:!1},{width:7,bonus:125,chr:"?",
pixels:[1,1,167,255,2,1,227,255,2,2,183,64,2,7,167,255,3,1,243,255,3,2,231,38,3,6,211,255,3,7,158,131,3,8,168,0,3,9,223,255,3,10,240,239,4,1,189,255,4,2,251,174,4,5,227,255,4,7,211,0,4,10,224,5,4,11,225,0,5,2,243,220,5,3,254,254,5,4,214,238,5,5,156,62,5,6,227,0,6,3,209,4,6,4,253,0,6,5,200,0],
secondary:!1},{width:6,bonus:105,chr:"!",
pixels:[2,9,199,255,2,10,201,255,3,1,255,255,3,2,255,255,3,3,255,255,3,4,255,255,3,5,255,255,3,6,255,255,3,7,255,255,3,9,153,255,3,10,233,169,3,11,201,0,4,2,255,12,4,3,255,12,4,4,255,12,4,5,255,12,4,6,255,12,4,7,255,12,4,8,255,0,4,10,153,0,4,11,154,0],
secondary:!1},{width:13,bonus:430,chr:"@",
pixels:[1,4,179,255,1,5,251,255,1,6,255,255,1,7,255,255,1,8,252,254,1,9,179,249,2,3,247,255,2,4,175,227,2,5,198,80,2,6,252,23,2,7,255,21,2,8,255,71,2,9,253,193,2,10,246,236,3,2,243,255,3,4,247,0,3,5,167,43,3,10,238,201,3,11,244,158,4,2,174,235,4,3,244,22,4,4,209,229,4,5,255,255,4,6,255,255,4,7,248,254,4,11,250,240,5,1,215,255,5,2,172,98,5,3,223,194,5,4,190,247,5,5,199,54,5,6,255,15,5,7,255,91,5,8,254,251,5,11,252,254,5,12,236,21,6,1,243,255,6,2,221,35,6,3,246,253,6,4,183,53,6,5,184,0,6,8,250,253,6,9,250,17,6,11,246,254,6,12,252,24,7,1,237,255,7,2,245,39,7,3,239,254,7,4,247,91,7,7,161,255,7,9,248,0,7,11,251,255,7,12,246,3,8,1,195,255,8,2,245,104,8,3,197,243,8,4,255,255,8,5,255,255,8,6,255,255,8,7,245,252,8,8,203,144,8,11,198,251,8,12,252,0,9,2,247,231,9,4,190,11,9,5,255,8,9,6,255,8,9,7,255,39,9,8,254,252,9,12,195,0,10,2,208,220,10,3,251,227,10,7,160,250,10,8,226,250,10,9,252,3,11,3,214,138,11,4,250,219,11,5,253,253,11,6,246,253,11,7,197,225,11,8,170,52,11,9,222,0,12,5,215,2,12,6,251,0,12,7,244,0,12,8,174,0],
secondary:!1},{width:9,bonus:245,chr:"#",
pixels:[1,4,239,255,1,7,239,255,2,4,241,255,2,5,244,75,2,7,249,255,2,8,252,224,2,9,244,254,2,10,210,254,3,2,187,255,3,3,235,255,3,4,253,255,3,5,251,180,3,6,163,198,3,7,250,250,3,8,250,65,3,9,222,3,3,10,243,0,3,11,209,0,4,3,193,26,4,4,253,241,4,5,254,0,4,6,177,0,4,7,247,247,4,8,247,33,5,4,242,255,5,5,245,95,5,7,249,255,5,8,254,238,5,9,232,252,5,10,192,249,6,2,199,255,6,3,239,255,6,4,252,254,6,5,250,160,6,6,160,170,6,7,250,250,6,8,251,45,6,9,237,0,6,10,229,0,6,11,188,0,7,3,201,8,7,4,254,240,7,5,252,0,7,6,157,0,7,7,246,248,7,8,246,33,8,4,159,252,8,5,240,0,8,8,240,5],
secondary:!1},{width:8,bonus:245,chr:"$",
pixels:[1,2,235,255,1,3,255,255,1,4,246,253,1,9,240,253,2,1,179,255,2,2,195,238,2,3,242,85,2,4,255,169,2,5,253,234,2,9,252,254,2,10,243,76,3,0,255,255,3,1,255,255,3,2,255,255,3,3,255,255,3,4,255,255,3,5,255,255,3,6,255,255,3,7,255,255,3,8,255,255,3,9,255,255,3,10,255,255,3,11,255,255,4,1,255,179,4,2,255,86,4,3,255,8,4,4,255,8,4,5,255,172,4,6,255,149,4,7,255,8,4,8,255,33,4,9,255,243,4,10,255,10,4,11,255,8,4,12,255,0,5,2,216,149,5,6,250,247,5,7,182,114,5,8,164,251,5,9,182,240,5,10,243,0,6,2,192,140,6,6,175,211,6,7,255,251,6,8,219,236,6,9,172,45,6,10,171,0,7,8,251,0,7,9,202,0],
secondary:!1},{width:8,bonus:100,chr:"^",
pixels:[1,5,219,255,1,6,191,254,2,3,221,255,2,4,171,252,2,6,219,0,2,7,190,0,3,1,227,255,3,4,222,0,3,5,169,0,4,1,203,230,4,2,249,211,4,3,187,127,5,2,197,62,5,3,238,179,5,4,236,243,6,4,179,49,6,5,243,158,6,6,244,246,7,6,161,38,7,7,235,0],secondary:!1
},{width:8,bonus:55,chr:"~",pixels:[1,6,159,255,2,5,225,255,2,7,159,0,3,5,191,255,3,6,239,122,4,6,250,240,5,6,251,254,5,7,236,21,6,6,169,255,6,7,250,0,7,7,169,0],secondary:!1},{width:11,bonus:280,chr:"&",
pixels:[1,7,249,255,1,8,255,255,1,9,232,250,2,2,251,255,2,3,255,255,2,4,200,244,2,6,239,255,2,8,249,28,2,9,255,173,2,10,247,188,3,1,217,255,3,2,159,171,3,3,252,35,3,4,255,172,3,5,255,255,3,7,239,0,3,10,249,243,3,11,182,0,4,1,247,255,4,2,221,33,4,5,255,255,4,6,254,201,4,10,249,254,4,11,238,0,5,1,211,255,5,2,251,147,5,4,227,255,5,6,255,205,5,7,239,190,5,10,217,248,5,11,248,0,6,2,251,235,6,3,249,247,6,4,154,180,6,5,227,0,6,7,248,226,6,8,225,176,6,9,207,255,6,10,164,185,6,11,211,0,7,3,231,1,7,4,241,0,7,8,254,251,7,9,245,239,7,10,208,9,8,7,213,255,8,8,213,245,8,9,255,235,8,10,243,151,9,6,202,255,9,7,173,158,9,8,215,5,9,9,213,54,9,10,253,235,10,7,202,0,10,11,234,0],
secondary:!1},{width:9,bonus:125,chr:"*",
pixels:[1,2,187,255,2,3,223,154,2,5,190,255,3,3,235,225,3,4,245,243,3,5,178,242,3,6,202,61,4,0,241,255,4,1,228,239,4,2,217,241,4,3,255,255,4,4,237,173,4,5,235,25,4,6,169,0,5,1,241,0,5,2,231,117,5,3,236,175,5,4,255,167,5,5,252,250,6,2,179,255,6,3,180,180,6,4,162,0,6,5,199,120,6,6,248,25,7,3,197,82],
secondary:!1},{width:5,bonus:135,chr:"(",
pixels:[1,1,153,255,1,2,219,255,1,3,253,255,1,4,255,255,1,5,255,255,1,6,255,255,1,7,255,255,1,8,239,254,1,9,185,255,2,0,247,255,2,1,193,232,2,2,196,142,2,3,226,65,2,4,254,31,2,5,255,16,2,6,255,24,2,7,255,43,2,8,255,86,2,9,248,144,2,10,246,229,2,11,244,248,3,0,188,20,3,1,248,0,3,2,176,0,3,11,229,70,3,12,251,196,4,13,193,0],
secondary:!1},{width:5,bonus:135,chr:")",
pixels:[1,12,227,255,2,0,252,250,2,1,229,247,2,2,155,255,2,9,181,255,2,10,249,255,2,11,212,252,2,13,228,0,3,1,250,100,3,2,244,174,3,3,240,231,3,4,250,252,3,5,255,255,3,6,254,255,3,7,243,251,3,8,217,232,3,9,199,183,3,10,198,74,3,11,249,0,3,12,210,0,4,3,166,0,4,4,218,0,4,5,247,6,4,6,255,2,4,7,254,0,4,8,239,0,4,9,198,0],
secondary:!1},{width:6,bonus:55,chr:"_",pixels:[0,12,243,255,1,12,243,255,1,13,245,33,2,12,243,255,2,13,245,33,3,12,243,255,3,13,245,33,4,12,243,255,4,13,245,33,5,12,243,255,5,13,245,33],secondary:!1},{width:5,bonus:30,chr:"-",
pixels:[1,6,243,255,2,6,243,255,2,7,245,33,3,6,243,255,3,7,245,33,4,7,244,0],secondary:!0},{width:8,bonus:120,chr:"=",
pixels:[1,4,239,255,1,7,243,255,2,4,239,255,2,5,242,34,2,7,243,255,2,8,245,33,3,4,239,255,3,5,242,34,3,7,243,255,3,8,245,33,4,4,239,255,4,5,242,34,4,7,243,255,4,8,245,33,5,4,239,255,5,5,242,34,5,7,243,255,5,8,245,33,6,4,239,255,6,5,242,34,6,7,243,255,6,8,245,33,7,5,240,0,7,8,244,0],
secondary:!1},{width:5,bonus:145,chr:"[",
pixels:[2,0,255,255,2,1,255,255,2,2,255,255,2,3,255,255,2,4,255,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,2,11,255,255,2,12,255,255,3,0,255,12,3,1,255,12,3,2,255,12,3,3,255,12,3,4,255,12,3,5,255,12,3,6,255,12,3,7,255,12,3,8,255,12,3,9,255,12,3,10,255,12,3,11,255,12,3,12,254,245,3,13,255,32,4,12,157,248,4,13,245,21],
secondary:!1},{width:6,bonus:155,chr:"]",
pixels:[1,12,193,255,2,12,245,255,2,13,202,40,3,0,255,255,3,1,255,255,3,2,255,255,3,3,255,255,3,4,255,255,3,5,255,255,3,6,255,255,3,7,255,255,3,8,255,255,3,9,255,255,3,10,255,255,3,11,255,255,3,12,255,255,3,13,247,33,4,0,255,12,4,1,255,12,4,2,255,12,4,3,255,12,4,4,255,12,4,5,255,12,4,6,255,12,4,7,255,12,4,8,255,12,4,9,255,12,4,10,255,12,4,11,255,12,4,12,255,12,4,13,255,1],
secondary:!1},{width:5,bonus:135,chr:"{",
pixels:[0,5,179,255,1,5,223,255,1,6,227,183,2,0,255,255,2,1,255,255,2,2,255,255,2,3,255,255,2,4,230,247,2,6,247,201,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,2,11,255,255,3,0,252,13,3,1,255,12,3,2,255,12,3,3,255,10,3,4,255,0,3,5,223,0,3,7,197,10,3,8,255,12,3,9,255,12,3,10,255,12,3,11,255,56,3,12,255,249,4,13,249,7],
secondary:!1},{width:5,bonus:145,chr:"}",
pixels:[1,12,247,255,2,0,255,255,2,1,255,255,2,2,255,255,2,3,255,255,2,4,249,253,2,6,227,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,2,11,246,252,2,12,162,171,2,13,247,0,3,0,233,12,3,1,255,12,3,2,255,12,3,3,255,14,3,4,255,93,3,5,254,237,3,6,170,206,3,7,228,19,3,8,255,12,3,9,255,12,3,10,255,11,3,11,255,1,3,12,243,0,4,5,215,229,4,6,238,35],
secondary:!1},{width:4,bonus:70,chr:":",pixels:[1,3,161,255,1,4,161,255,1,9,161,255,1,10,161,255,2,3,193,255,2,4,231,211,2,5,161,0,2,9,191,255,2,10,232,212,2,11,162,0,3,4,193,0,3,5,192,0,3,10,192,0,3,11,193,0],secondary:!0},{width:4,bonus:85,chr:";",
pixels:[1,3,161,255,1,4,161,255,1,9,193,255,1,10,233,255,1,11,253,255,1,12,196,248,2,3,193,255,2,4,231,211,2,5,161,0,2,9,171,255,2,10,218,122,2,11,235,28,2,12,253,0,2,13,190,0,3,4,193,0,3,5,192,0,3,10,171,0],secondary:!0},{width:7,bonus:60,chr:'"',
pixels:[2,1,255,255,2,2,251,253,2,3,229,247,3,2,255,1,3,3,249,0,3,4,222,0,4,1,221,255,4,2,197,248,4,3,163,255,5,2,236,122,5,3,212,100,5,4,163,0],secondary:!0},{width:5,bonus:30,chr:"'",
pixels:[2,1,255,255,2,2,251,253,2,3,229,247,3,2,255,1,3,3,249,0,3,4,222,0],secondary:!0},{width:8,bonus:100,chr:"<",
pixels:[1,6,245,255,2,5,173,255,2,6,210,244,2,7,251,141,3,5,209,255,3,6,182,34,3,7,250,238,4,4,189,255,4,6,210,0,4,7,165,240,4,8,244,128,5,4,208,255,5,5,189,2,5,8,246,240,6,3,203,255,6,5,208,0,6,8,197,240,6,9,241,111,7,4,203,1,7,9,211,117],
secondary:!1},{width:8,bonus:100,chr:">",
pixels:[1,3,237,255,1,9,163,255,2,4,248,150,2,8,233,255,2,10,164,0,3,4,244,241,3,5,157,44,3,8,184,252,3,9,233,0,4,5,245,154,4,7,213,255,4,9,182,0,5,5,238,240,5,6,189,134,5,7,199,255,5,8,213,0,6,6,254,252,6,8,199,0,7,6,176,171,7,7,252,1],secondary:!1
},{width:6,bonus:120,chr:"\\",
pixels:[1,0,233,251,1,1,166,255,2,0,248,63,2,1,242,133,2,2,233,209,2,3,250,253,2,4,231,251,2,5,161,255,3,3,193,10,3,4,250,68,3,5,241,139,3,6,234,214,3,7,251,254,3,8,227,251,3,9,159,255,4,7,198,14,4,8,251,71,4,9,240,143,4,10,234,218,4,11,252,254,4,12,223,251,5,11,202,17,5,12,252,76,5,13,220,0],
secondary:!1},{width:4,bonus:20,chr:".",pixels:[1,9,211,255,1,10,211,255,2,10,235,156,2,11,212,0],secondary:!0},{width:4,bonus:35,chr:",",pixels:[1,9,243,255,1,10,255,255,1,11,232,252,1,12,174,209,2,10,246,58,2,11,255,2,2,12,229,0],secondary:!0},{
width:7,bonus:135,chr:"|",
pixels:[3,0,255,255,3,1,255,255,3,2,255,255,3,3,255,255,3,4,255,255,3,5,255,255,3,6,255,255,3,7,255,255,3,8,255,255,3,9,255,255,3,10,255,255,3,11,255,255,3,12,255,255,4,0,255,12,4,1,255,12,4,2,255,12,4,3,255,12,4,4,255,12,4,5,255,12,4,6,255,12,4,7,255,12,4,8,255,12,4,9,255,12,4,10,255,12,4,11,255,12,4,12,255,12,4,13,255,0],
secondary:!1}],width:13,spacewidth:4,shadow:!0,height:15,basey:10}}],e={},function o(r){var n=e[r];if(void 0!==n)return n.exports;var i=e[r]={exports:{}};return s[r](i,i.exports,o),i.exports}(0);var s,e}));

/***/ }),

/***/ "../node_modules/.pnpm/@alt1+ocr@1.0.0-alpha.7/node_modules/@alt1/ocr/fonts/chatbox/16pt.js":
/*!**************************************************************************************************!*\
  !*** ../node_modules/.pnpm/@alt1+ocr@1.0.0-alpha.7/node_modules/@alt1/ocr/fonts/chatbox/16pt.js ***!
  \**************************************************************************************************/
/***/ (function(module) {

!function(s,e){ true?module.exports=e():0}("undefined"!=typeof self?self:this,(()=>{
return s=[s=>{s.exports={chars:[{width:9,bonus:265,chr:"a",
pixels:[1,8,215,255,1,9,255,255,1,10,255,255,1,11,240,250,2,5,153,238,2,8,235,253,2,9,228,88,2,10,254,52,2,11,254,192,2,12,251,207,3,4,211,255,3,5,178,126,3,7,217,255,3,8,196,149,3,9,233,0,3,12,253,249,3,13,203,0,4,4,243,255,4,5,221,69,4,7,247,255,4,8,228,74,4,12,237,249,4,13,247,0,5,4,233,255,5,5,247,79,5,7,255,255,5,8,249,49,5,11,167,255,5,12,178,210,5,13,232,0,6,4,173,255,6,5,250,210,6,7,255,255,6,8,255,113,6,10,178,255,6,11,213,255,6,12,175,29,7,5,239,216,7,6,255,255,7,7,255,255,7,8,255,255,7,9,255,255,7,10,255,255,7,11,255,255,7,12,255,253,8,6,204,16,8,7,255,32,8,8,255,32,8,9,255,32,8,10,255,32,8,11,255,32,8,12,255,32,8,13,253,0],
secondary:!1},{width:10,bonus:275,chr:"b",
pixels:[2,1,255,255,2,2,255,255,2,3,255,255,2,4,255,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,2,11,255,255,2,12,229,242,3,2,255,36,3,3,255,35,3,4,254,70,3,5,254,225,3,6,255,108,3,7,255,50,3,8,255,39,3,9,254,58,3,10,254,120,3,11,255,225,3,12,255,48,3,13,218,0,4,4,203,245,4,6,224,0,4,11,178,158,4,12,248,203,5,4,247,255,5,5,209,78,5,12,251,252,5,13,197,0,6,4,227,255,6,5,251,137,6,12,234,248,6,13,248,0,7,5,254,255,7,6,215,203,7,10,175,255,7,11,255,255,7,12,191,158,7,13,228,0,8,5,169,143,8,6,254,210,8,7,254,252,8,8,255,255,8,9,253,253,8,10,228,234,8,11,204,117,8,12,255,0,9,7,211,5,9,8,252,24,9,9,255,4,9,10,252,0,9,11,210,0],
secondary:!1},{width:7,bonus:145,chr:"c",
pixels:[1,6,243,255,1,7,255,255,1,8,255,255,1,9,255,255,1,10,245,253,2,5,251,255,2,6,196,178,2,7,247,64,2,8,255,42,2,9,255,62,2,10,255,136,2,11,254,251,2,12,189,168,3,4,217,255,3,5,184,176,3,6,251,0,3,11,193,162,3,12,254,224,4,4,249,255,4,5,227,71,4,12,252,253,4,13,223,0,5,4,231,255,5,5,251,90,5,12,235,249,5,13,250,0,6,5,237,81,6,12,163,183,6,13,229,0],
secondary:!1},{width:9,bonus:290,chr:"d",
pixels:[1,6,243,255,1,7,255,255,1,8,255,255,1,9,255,255,1,10,249,253,1,11,154,246,2,5,250,255,2,6,202,172,2,7,247,64,2,8,255,42,2,9,255,60,2,10,255,130,2,11,255,247,2,12,212,184,3,4,235,255,3,5,196,151,3,6,250,0,3,11,184,154,3,12,254,240,3,13,153,0,4,4,243,255,4,5,241,70,4,12,248,251,4,13,239,0,5,4,172,255,5,5,250,140,5,12,193,228,5,13,244,0,6,5,248,242,6,6,211,195,6,10,158,255,6,11,231,255,6,12,153,85,6,13,172,0,7,1,255,255,7,2,255,255,7,3,255,255,7,4,255,255,7,5,255,255,7,6,255,255,7,7,255,255,7,8,255,255,7,9,255,255,7,10,255,255,7,11,255,255,7,12,255,255,8,2,255,32,8,3,255,32,8,4,255,32,8,5,255,32,8,6,255,32,8,7,255,32,8,8,255,32,8,9,255,32,8,10,255,32,8,11,255,32,8,12,255,32,8,13,255,0],
secondary:!1},{width:9,bonus:235,chr:"e",
pixels:[1,6,239,255,1,7,255,255,1,8,255,255,1,9,255,255,1,10,244,252,2,5,251,255,2,6,195,191,2,7,243,68,2,8,255,255,2,9,255,90,2,10,255,118,2,11,255,247,2,12,164,143,3,4,217,255,3,5,182,182,3,6,252,0,3,8,255,255,3,9,255,48,3,11,188,178,3,12,253,207,4,4,249,255,4,5,226,72,4,8,255,255,4,9,255,48,4,12,251,252,4,13,205,0,5,4,219,255,5,5,252,126,5,8,255,255,5,9,255,48,5,12,246,252,5,13,248,0,6,5,254,252,6,6,203,194,6,8,255,255,6,9,255,48,6,12,220,243,6,13,243,0,7,6,254,212,7,7,254,254,7,8,255,255,7,9,255,48,7,12,162,168,7,13,210,0,8,7,212,9,8,8,253,30,8,9,255,6],
secondary:!1},{width:6,bonus:170,chr:"f",
pixels:[1,4,239,255,1,5,189,155,2,2,251,255,2,3,255,255,2,4,255,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,2,11,255,255,2,12,255,255,3,1,221,255,3,2,194,206,3,3,253,42,3,4,255,255,3,5,255,80,3,6,255,36,3,7,255,36,3,8,255,36,3,9,255,36,3,10,255,36,3,11,255,36,3,12,255,36,3,13,255,0,4,1,247,255,4,2,229,68,4,3,157,0,4,4,255,255,4,5,254,52,5,1,207,255,5,2,249,65,5,5,255,9],
secondary:!1},{width:9,bonus:315,chr:"g",
pixels:[1,6,241,255,1,7,255,255,1,8,255,255,1,9,255,255,1,10,247,253,2,5,249,255,2,6,198,173,2,7,245,63,2,8,255,42,2,9,255,60,2,10,255,130,2,11,255,247,2,12,211,184,2,16,229,224,3,4,235,255,3,5,193,149,3,6,249,0,3,11,184,153,3,12,254,240,3,16,246,246,4,4,243,255,4,5,241,70,4,12,248,251,4,13,239,0,4,16,252,254,5,4,167,255,5,5,249,142,5,12,189,226,5,13,244,0,5,16,232,247,6,5,247,241,6,6,218,202,6,10,158,255,6,11,233,255,6,12,177,140,6,13,200,117,6,14,155,255,6,15,253,255,6,16,197,174,7,4,255,255,7,5,255,255,7,6,255,255,7,7,255,255,7,8,255,255,7,9,255,255,7,10,255,255,7,11,255,255,7,12,255,255,7,13,255,255,7,14,244,248,7,15,206,160,7,16,253,6,8,5,255,32,8,6,255,32,8,7,255,32,8,8,255,32,8,9,255,32,8,10,255,32,8,11,255,32,8,12,255,32,8,13,255,18,8,14,255,0,8,15,238,0],
secondary:!1},{width:10,bonus:250,chr:"h",
pixels:[2,1,255,255,2,2,255,255,2,3,255,255,2,4,255,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,2,11,255,255,2,12,255,255,3,2,255,36,3,3,255,36,3,4,255,65,3,5,255,225,3,6,255,129,3,7,255,60,3,8,255,38,3,9,255,36,3,10,255,36,3,11,255,36,3,12,255,36,3,13,255,0,4,4,190,241,4,5,158,201,4,6,225,0,5,4,243,255,5,5,198,82,6,4,233,255,6,5,248,93,7,4,173,255,7,5,253,234,7,6,165,177,8,5,234,208,8,6,254,255,8,7,255,255,8,8,255,255,8,9,255,255,8,10,255,255,8,11,255,255,8,12,255,255,9,6,192,10,9,7,254,30,9,8,255,32,9,9,255,32,9,10,255,32,9,11,255,32,9,12,255,32,9,13,255,0],
secondary:!1},{width:5,bonus:110,chr:"i",
pixels:[2,1,225,255,2,2,199,237,2,4,255,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,2,11,255,255,2,12,255,255,3,2,226,5,3,3,185,0,3,5,255,36,3,6,255,36,3,7,255,36,3,8,255,36,3,9,255,36,3,10,255,36,3,11,255,36,3,12,255,36,3,13,255,0],
secondary:!1},{width:5,bonus:160,chr:"j",
pixels:[0,16,241,253,1,15,175,255,1,16,234,248,2,1,225,255,2,2,199,237,2,4,255,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,2,11,255,255,2,12,255,255,2,13,255,255,2,14,255,255,2,15,243,249,2,16,201,108,3,2,226,5,3,3,185,0,3,5,255,36,3,6,255,36,3,7,255,36,3,8,255,36,3,9,255,36,3,10,255,36,3,11,255,36,3,12,255,36,3,13,255,36,3,14,255,28,3,15,255,3,3,16,238,0],
secondary:!1},{width:9,bonus:220,chr:"k",
pixels:[2,1,255,255,2,2,255,255,2,3,255,255,2,4,255,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,2,11,255,255,2,12,255,255,3,2,255,36,3,3,255,36,3,4,255,36,3,5,255,36,3,6,255,36,3,7,254,82,3,8,255,235,3,9,255,104,3,10,255,36,3,11,255,36,3,12,255,36,3,13,255,0,4,7,247,253,4,8,250,252,4,9,242,102,5,6,249,255,5,8,251,143,5,9,254,255,5,10,204,215,6,5,245,255,6,7,249,0,6,9,171,104,6,10,255,231,6,11,246,236,7,4,237,255,7,5,164,90,7,6,246,0,7,11,248,186,7,12,254,255,8,5,238,0,8,12,213,133,8,13,254,0],
secondary:!1},{width:5,bonus:120,chr:"l",
pixels:[2,1,255,255,2,2,255,255,2,3,255,255,2,4,255,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,2,11,255,255,2,12,255,255,3,2,255,36,3,3,255,36,3,4,255,36,3,5,255,36,3,6,255,36,3,7,255,36,3,8,255,36,3,9,255,36,3,10,255,36,3,11,255,36,3,12,255,36,3,13,255,0],
secondary:!1},{width:14,bonus:315,chr:"m",
pixels:[2,4,239,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,2,11,255,255,2,12,255,255,3,5,252,216,3,6,255,108,3,7,255,54,3,8,255,37,3,9,255,36,3,10,255,36,3,11,255,36,3,12,255,36,3,13,255,0,4,4,203,255,4,6,214,0,5,4,247,255,5,5,219,84,6,4,205,255,6,5,253,221,7,5,248,228,7,6,255,255,7,7,255,255,7,8,255,255,7,9,255,255,7,10,255,255,7,11,255,255,7,12,255,255,8,5,226,247,8,6,234,106,8,7,254,46,8,8,255,32,8,9,255,32,8,10,255,32,8,11,255,32,8,12,255,32,8,13,255,0,9,4,211,255,9,6,219,0,10,4,245,255,10,5,223,83,11,4,199,255,11,5,253,221,12,5,244,215,12,6,255,255,12,7,255,255,12,8,255,255,12,9,255,255,12,10,255,255,12,11,255,255,12,12,255,255,13,6,208,12,13,7,255,31,13,8,255,32,13,9,255,32,13,10,255,32,13,11,255,32,13,12,255,32,13,13,255,0],
secondary:!1},{width:10,bonus:215,chr:"n",
pixels:[2,4,239,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,2,11,255,255,2,12,255,255,3,5,253,225,3,6,255,127,3,7,255,59,3,8,255,38,3,9,255,36,3,10,255,36,3,11,255,36,3,12,255,36,3,13,255,0,4,4,175,255,4,6,223,0,5,4,243,255,5,5,195,83,6,4,235,255,6,5,247,94,7,4,173,255,7,5,253,234,7,6,165,177,8,5,233,206,8,6,255,253,8,7,255,255,8,8,255,255,8,9,255,255,8,10,255,255,8,11,255,255,8,12,255,255,9,6,189,10,9,7,253,30,9,8,255,32,9,9,255,32,9,10,255,32,9,11,255,32,9,12,255,32,9,13,255,0],
secondary:!1},{width:9,bonus:220,chr:"o",
pixels:[1,6,241,255,1,7,255,255,1,8,255,255,1,9,255,255,1,10,244,253,2,5,247,255,2,6,190,173,2,7,244,63,2,8,255,42,2,9,255,61,2,10,255,133,2,11,255,249,2,12,180,159,3,4,225,255,3,5,183,160,3,6,247,0,3,11,189,157,3,12,254,222,4,4,249,255,4,5,233,72,4,12,252,252,4,13,221,0,5,4,211,255,5,5,253,143,5,12,222,243,5,13,249,0,6,5,254,255,6,6,220,205,6,10,179,255,6,11,255,255,6,12,180,124,6,13,212,0,7,6,255,199,7,7,253,252,7,8,255,255,7,9,251,254,7,10,223,230,7,11,201,92,7,12,255,0,8,7,199,4,8,8,250,23,8,9,255,3,8,10,250,0,8,11,201,0],
secondary:!1},{width:10,bonus:280,chr:"p",
pixels:[2,4,241,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,2,11,255,255,2,12,255,255,2,13,255,255,2,14,255,255,2,15,255,255,2,16,255,255,3,5,253,221,3,6,255,112,3,7,255,53,3,8,255,39,3,9,255,59,3,10,255,123,3,11,255,229,3,12,255,71,3,13,255,35,3,14,255,36,3,15,255,36,3,16,255,36,4,4,191,255,4,6,219,0,4,11,180,158,4,12,249,200,5,4,247,255,5,5,208,80,5,12,251,252,5,13,195,0,6,4,227,255,6,5,251,146,6,12,234,248,6,13,248,0,7,5,255,255,7,6,223,207,7,10,187,255,7,11,255,255,7,12,196,152,7,13,228,0,8,5,168,142,8,6,255,211,8,7,254,252,8,8,255,255,8,9,253,253,8,10,229,233,8,11,211,110,8,12,255,0,9,7,212,5,9,8,252,24,9,9,255,4,9,10,252,0,9,11,209,0],
secondary:!1},{width:9,bonus:295,chr:"q",
pixels:[1,6,243,255,1,7,255,255,1,8,255,255,1,9,255,255,1,10,249,253,1,11,155,245,2,5,250,255,2,6,202,172,2,7,247,64,2,8,255,42,2,9,255,59,2,10,255,128,2,11,255,247,2,12,213,185,3,4,235,255,3,5,195,150,3,6,250,0,3,11,183,155,3,12,254,240,3,13,154,0,4,4,243,255,4,5,240,69,4,12,248,251,4,13,240,0,5,4,171,255,5,5,250,139,5,12,190,228,5,13,244,0,6,5,246,238,6,6,211,195,6,10,154,255,6,11,229,255,6,12,174,141,6,13,197,104,7,4,255,255,7,5,255,255,7,6,255,255,7,7,255,255,7,8,255,255,7,9,255,255,7,10,255,255,7,11,255,255,7,12,255,255,7,13,255,255,7,14,255,255,7,15,255,255,7,16,255,255,8,5,255,32,8,6,255,32,8,7,255,32,8,8,255,32,8,9,255,32,8,10,255,32,8,11,255,32,8,12,255,32,8,13,255,32,8,14,255,32,8,15,255,32,8,16,255,32],
secondary:!1},{width:7,bonus:130,chr:"r",
pixels:[2,4,235,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,2,11,255,255,2,12,255,255,3,5,251,200,3,6,255,154,3,7,255,59,3,8,255,36,3,9,255,36,3,10,255,36,3,11,255,36,3,12,255,36,3,13,255,0,4,4,169,255,4,5,154,243,4,6,196,0,4,7,154,0,5,4,245,255,5,5,190,83,6,4,165,255,6,5,246,44],
secondary:!1},{width:8,bonus:205,chr:"s",
pixels:[1,5,249,255,1,6,255,255,1,7,223,244,1,11,154,255,1,12,200,231,2,4,195,255,2,5,188,222,2,6,250,64,2,7,254,237,2,8,232,126,2,12,245,241,2,13,181,0,3,4,239,255,3,5,209,78,3,6,164,0,3,7,155,203,3,8,252,220,3,12,251,253,3,13,232,0,4,4,243,255,4,5,244,71,4,8,253,253,4,9,228,81,4,12,235,249,4,13,249,0,5,4,211,255,5,5,249,119,5,8,175,242,5,9,254,222,5,11,209,255,5,12,192,216,5,13,229,0,6,5,230,119,6,9,241,228,6,10,255,255,6,11,227,237,6,12,215,36,6,13,163,0,7,10,218,19,7,11,255,0,7,12,211,0],
secondary:!1},{width:6,bonus:150,chr:"t",
pixels:[1,4,241,255,1,5,161,182,2,2,221,255,2,3,255,255,2,4,255,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,2,11,252,254,3,3,227,41,3,4,255,255,3,5,255,80,3,6,255,36,3,7,255,36,3,8,255,36,3,9,255,36,3,10,255,45,3,11,255,167,3,12,254,226,4,4,255,255,4,5,254,52,4,12,252,251,4,13,225,0,5,4,175,255,5,5,255,35,5,12,182,228,5,13,248,0],
secondary:!1},{width:10,bonus:220,chr:"u",
pixels:[2,4,255,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,2,11,235,249,3,5,255,36,3,6,255,36,3,7,255,36,3,8,255,36,3,9,255,37,3,10,255,69,3,11,255,209,3,12,249,198,4,12,252,245,4,13,193,0,5,12,244,250,5,13,242,0,6,12,189,223,6,13,239,0,7,10,173,255,7,11,235,255,7,12,170,81,7,13,165,0,8,4,255,255,8,5,255,255,8,6,255,255,8,7,255,255,8,8,255,255,8,9,255,255,8,10,255,255,8,11,255,255,8,12,255,255,9,5,255,32,9,6,255,32,9,7,255,32,9,8,255,32,9,9,255,32,9,10,255,32,9,11,255,32,9,12,255,32,9,13,255,0],
secondary:!1},{width:8,bonus:190,chr:"v",
pixels:[0,4,209,255,1,4,175,255,1,5,253,250,1,6,254,254,1,7,196,246,2,5,179,20,2,6,250,96,2,7,254,182,2,8,253,252,2,9,249,251,2,10,171,249,3,8,186,25,3,9,252,99,3,10,252,182,3,11,251,247,3,12,239,249,4,10,189,200,4,11,246,234,4,12,254,251,4,13,233,0,5,8,233,255,5,9,255,255,5,10,212,238,5,11,193,140,5,12,228,21,5,13,250,0,6,5,227,255,6,6,255,255,6,7,228,245,6,8,202,160,6,9,236,38,6,10,255,0,6,11,198,0,7,4,235,255,7,5,207,184,7,6,233,61,7,7,255,0,7,8,219,0],
secondary:!1},{width:13,bonus:365,chr:"w",
pixels:[0,4,175,255,1,4,193,255,1,5,252,251,1,6,255,255,1,7,234,250,1,8,163,255,2,5,196,10,2,6,249,65,2,7,254,126,2,8,248,194,2,9,251,249,2,10,255,255,2,11,224,250,2,12,153,255,3,9,197,39,3,10,250,142,3,11,254,237,3,12,255,255,3,13,153,0,4,8,209,255,4,9,255,255,4,10,230,252,4,11,207,184,4,12,241,75,4,13,255,0,5,4,155,255,5,5,229,255,5,6,253,255,5,7,214,241,5,8,193,170,5,9,218,58,5,10,255,0,5,11,227,0,6,4,255,255,6,5,247,243,6,6,243,139,6,7,253,55,6,8,202,2,7,5,255,131,7,6,251,208,7,7,254,255,7,8,240,250,7,9,164,254,8,7,209,31,8,8,255,98,8,9,248,175,8,10,248,242,8,11,253,253,8,12,201,250,9,9,161,163,9,10,223,185,9,11,253,240,9,12,255,255,9,13,197,0,10,6,169,255,10,7,231,255,10,8,255,255,10,9,240,253,10,10,206,214,10,11,200,134,10,12,240,40,10,13,255,0,11,4,255,255,11,5,249,254,11,6,216,223,11,7,210,147,11,8,236,57,11,9,255,2,11,10,238,0,11,11,173,0,12,5,255,9,12,6,248,0,12,7,189,0],
secondary:!1},{width:8,bonus:195,chr:"x",
pixels:[1,4,253,255,1,5,169,216,1,11,177,255,1,12,253,255,2,5,254,237,2,6,238,233,2,10,235,255,2,11,217,251,2,12,193,72,2,13,253,0,3,6,248,175,3,7,255,253,3,8,212,240,3,9,251,255,3,10,176,195,3,11,236,8,3,12,214,0,4,7,246,238,4,8,255,255,4,9,243,211,4,10,252,26,5,6,251,255,5,7,187,233,5,8,236,65,5,9,255,202,5,10,251,243,6,4,217,255,6,5,236,254,6,6,176,125,6,7,251,0,6,8,171,0,6,10,228,139,6,11,254,251,6,12,216,225,7,4,173,255,7,5,221,26,7,6,235,0,7,12,254,210,7,13,190,0],
secondary:!1},{width:8,bonus:250,chr:"y",
pixels:[0,4,241,255,0,5,157,249,0,16,235,255,1,5,253,225,1,6,255,255,1,7,221,245,1,16,244,252,2,6,232,68,2,7,255,155,2,8,252,242,2,9,252,253,2,10,182,245,2,15,229,255,2,16,192,215,3,8,157,12,3,9,244,84,3,10,252,164,3,11,248,240,3,12,237,247,3,13,227,255,3,14,254,255,3,15,191,219,3,16,230,13,4,10,207,227,4,11,252,251,4,12,252,230,4,13,243,144,4,14,231,43,4,15,254,0,4,16,164,0,5,7,189,255,5,8,251,255,5,9,243,254,5,10,198,205,5,11,203,83,5,12,248,2,5,13,228,0,6,4,184,255,6,5,251,255,6,6,251,255,6,7,209,219,6,8,211,106,6,9,252,9,6,10,242,0,6,11,159,0,7,4,201,255,7,5,214,130,7,6,251,21,7,7,251,0,7,8,180,0],
secondary:!1},{width:8,bonus:205,chr:"z",
pixels:[1,4,255,255,1,11,177,255,1,12,255,255,2,4,255,255,2,5,254,52,2,10,239,255,2,11,192,246,2,12,255,255,2,13,255,0,3,4,255,255,3,5,254,52,3,8,185,255,3,9,229,255,3,11,241,55,3,12,255,255,3,13,255,0,4,4,255,255,4,5,255,53,4,7,243,255,4,8,181,241,4,9,191,26,4,10,230,0,4,12,255,255,4,13,255,0,5,4,255,255,5,5,254,221,5,6,244,252,5,7,162,147,5,8,244,0,5,9,171,0,5,12,255,255,5,13,255,0,6,4,255,255,6,5,254,192,6,6,224,36,6,7,241,0,6,12,255,255,6,13,255,0,7,5,255,0,7,6,192,0,7,13,255,0],
secondary:!1},{width:10,bonus:275,chr:"A",
pixels:[0,12,208,255,1,9,179,255,1,10,251,255,1,11,244,254,1,12,203,203,1,13,208,0,2,7,237,255,2,8,255,255,2,9,213,231,2,10,206,112,2,11,251,11,2,12,243,0,2,13,162,0,3,4,213,255,3,5,255,255,3,6,217,243,3,7,202,160,3,8,255,255,3,9,254,64,3,10,193,0,4,1,184,255,4,2,251,255,4,3,214,250,4,4,190,178,4,5,220,50,4,6,255,0,4,7,210,20,4,8,255,255,4,9,254,64,5,1,235,255,5,2,251,245,5,3,254,158,5,4,223,85,5,8,255,255,5,9,254,64,6,2,242,85,6,3,250,179,6,4,253,252,6,5,241,249,6,8,255,255,6,9,254,64,7,4,182,29,7,5,252,111,7,6,251,208,7,7,255,255,7,8,255,255,7,9,255,163,8,7,214,52,8,8,255,139,8,9,255,231,8,10,255,255,8,11,220,246,9,10,238,78,9,11,254,168,9,12,254,248],
secondary:!1},{width:10,bonus:345,chr:"B",
pixels:[2,1,255,255,2,2,255,255,2,3,255,255,2,4,255,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,2,11,255,255,2,12,255,255,3,1,255,255,3,2,255,80,3,3,255,36,3,4,255,36,3,5,255,36,3,6,255,255,3,7,255,77,3,8,255,36,3,9,255,36,3,10,255,36,3,11,255,80,3,12,255,255,3,13,255,0,4,1,255,255,4,2,254,52,4,6,255,255,4,7,255,48,4,12,255,255,4,13,255,0,5,1,247,255,5,2,254,64,5,6,255,255,5,7,255,60,5,12,250,254,5,13,255,0,6,1,221,255,6,2,251,114,6,6,255,255,6,7,255,119,6,12,224,245,6,13,249,0,7,2,252,241,7,3,174,163,7,5,211,255,7,6,165,220,7,7,254,246,7,8,188,175,7,11,247,255,7,12,184,164,7,13,215,0,8,2,227,211,8,3,254,255,8,4,254,254,8,5,192,203,8,6,212,1,8,7,196,160,8,8,255,245,8,9,255,255,8,10,247,252,8,11,200,171,8,12,248,4,9,3,191,18,9,4,254,10,9,5,253,0,9,9,246,23,9,10,255,1,9,11,244,0],
secondary:!1},{width:10,bonus:215,chr:"C",
pixels:[1,4,229,255,1,5,255,255,1,6,255,255,1,7,255,255,1,8,255,255,1,9,244,253,2,2,178,255,2,3,251,255,2,4,202,195,2,5,236,82,2,6,255,43,2,7,255,42,2,8,255,72,2,9,255,145,2,10,255,247,2,11,235,227,3,2,245,255,3,3,195,77,3,4,251,0,3,5,154,0,3,10,164,71,3,11,254,240,3,12,233,145,4,1,197,255,4,2,179,187,4,3,245,0,4,12,253,219,5,1,239,255,5,2,212,78,5,12,251,252,5,13,217,0,6,1,243,255,6,2,243,71,6,12,248,252,6,13,248,0,7,1,217,255,7,2,249,122,7,12,227,245,7,13,246,0,8,2,240,163,8,12,168,174,8,13,218,0,9,3,153,0],
secondary:!1},{width:12,bonus:345,chr:"D",
pixels:[2,1,255,255,2,2,255,255,2,3,255,255,2,4,255,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,2,11,255,255,2,12,255,255,3,1,255,255,3,2,255,80,3,3,255,36,3,4,255,36,3,5,255,36,3,6,255,36,3,7,255,36,3,8,255,36,3,9,255,36,3,10,255,36,3,11,255,80,3,12,255,255,3,13,255,0,4,1,255,255,4,2,254,52,4,12,255,255,4,13,255,0,5,1,251,255,5,2,255,59,5,12,249,253,5,13,255,0,6,1,229,255,6,2,252,92,6,12,228,246,6,13,247,0,7,1,171,255,7,2,246,182,7,11,197,255,7,12,197,203,7,13,220,0,8,2,254,255,8,3,210,132,8,11,251,255,8,12,208,59,8,13,157,0,9,2,156,204,9,3,255,255,9,4,221,228,9,9,209,255,9,10,253,255,9,11,184,147,9,12,252,0,10,3,163,116,10,4,255,191,10,5,254,250,10,6,255,255,10,7,255,255,10,8,247,251,10,9,216,212,10,10,221,69,10,11,253,0,11,5,192,6,11,6,250,25,11,7,255,20,11,8,255,2,11,9,243,0,11,10,179,0],
secondary:!1},{width:9,bonus:260,chr:"E",
pixels:[2,1,255,255,2,2,255,255,2,3,255,255,2,4,255,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,2,11,255,255,2,12,255,255,3,1,255,255,3,2,255,80,3,3,255,36,3,4,255,36,3,5,255,36,3,6,255,255,3,7,255,77,3,8,255,36,3,9,255,36,3,10,255,36,3,11,255,80,3,12,255,255,3,13,255,0,4,1,255,255,4,2,254,52,4,6,255,255,4,7,255,48,4,12,255,255,4,13,255,0,5,1,255,255,5,2,254,52,5,6,255,255,5,7,255,48,5,12,255,255,5,13,255,0,6,1,255,255,6,2,254,52,6,6,255,255,6,7,255,48,6,12,255,255,6,13,255,0,7,1,255,255,7,2,254,52,7,6,203,255,7,7,255,38,7,12,255,255,7,13,255,0,8,2,255,4,8,7,204,0,8,13,255,0],
secondary:!1},{width:8,bonus:205,chr:"F",
pixels:[2,1,255,255,2,2,255,255,2,3,255,255,2,4,255,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,2,11,255,255,2,12,255,255,3,1,255,255,3,2,255,80,3,3,255,36,3,4,255,36,3,5,255,36,3,6,255,36,3,7,255,255,3,8,255,77,3,9,255,36,3,10,255,36,3,11,255,36,3,12,255,36,3,13,255,0,4,1,255,255,4,2,254,52,4,7,255,255,4,8,255,48,5,1,255,255,5,2,254,52,5,7,255,255,5,8,255,48,6,1,255,255,6,2,254,52,6,7,255,255,6,8,255,48,7,1,255,255,7,2,254,52,7,7,199,255,7,8,255,37],
secondary:!1},{width:11,bonus:315,chr:"G",
pixels:[1,4,217,255,1,5,255,255,1,6,255,255,1,7,255,255,1,8,255,255,1,9,240,252,2,3,253,255,2,4,199,211,2,5,229,88,2,6,255,43,2,7,255,43,2,8,255,74,2,9,255,151,2,10,254,251,2,11,223,216,3,2,251,255,3,3,177,118,3,4,254,0,3,5,165,0,3,10,175,89,3,11,254,249,3,12,218,129,4,1,172,255,4,2,186,220,4,3,252,0,4,11,172,217,4,12,254,203,5,1,225,255,5,2,197,102,5,3,160,0,5,12,250,249,5,13,202,0,6,1,249,255,6,2,232,65,6,7,208,255,6,12,254,254,6,13,244,0,7,1,233,255,7,2,251,86,7,7,255,255,7,8,217,57,7,12,243,251,7,13,253,0,8,1,199,255,8,2,246,159,8,7,255,255,8,8,255,113,8,12,219,240,8,13,240,0,9,2,230,156,9,3,153,0,9,7,255,255,9,8,255,255,9,9,255,255,9,10,255,255,9,11,255,255,9,12,212,179,9,13,206,0,10,8,255,32,10,9,255,32,10,10,255,32,10,11,255,32,10,12,255,14],
secondary:!1},{width:12,bonus:290,chr:"H",
pixels:[2,1,255,255,2,2,255,255,2,3,255,255,2,4,255,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,2,11,255,255,2,12,255,255,3,2,255,36,3,3,255,36,3,4,255,36,3,5,255,36,3,6,255,255,3,7,255,77,3,8,255,36,3,9,255,36,3,10,255,36,3,11,255,36,3,12,255,36,3,13,255,0,4,6,255,255,4,7,255,48,5,6,255,255,5,7,255,48,6,6,255,255,6,7,255,48,7,6,255,255,7,7,255,48,8,6,255,255,8,7,255,113,9,1,255,255,9,2,255,255,9,3,255,255,9,4,255,255,9,5,255,255,9,6,255,255,9,7,255,255,9,8,255,255,9,9,255,255,9,10,255,255,9,11,255,255,9,12,255,255,10,2,255,32,10,3,255,32,10,4,255,32,10,5,255,32,10,6,255,32,10,7,255,32,10,8,255,32,10,9,255,32,10,10,255,32,10,11,255,32,10,12,255,32,10,13,255,0],
secondary:!1},{width:6,bonus:170,chr:"I",
pixels:[1,1,245,255,1,12,245,255,2,1,255,255,2,2,249,107,2,12,255,255,2,13,245,0,3,1,255,255,3,2,255,255,3,3,255,255,3,4,255,255,3,5,255,255,3,6,255,255,3,7,255,255,3,8,255,255,3,9,255,255,3,10,255,255,3,11,255,255,3,12,255,255,3,13,255,0,4,1,249,255,4,2,254,46,4,3,255,32,4,4,255,32,4,5,255,32,4,6,255,32,4,7,255,32,4,8,255,32,4,9,255,32,4,10,255,32,4,11,255,44,4,12,254,251,4,13,255,0,5,2,250,0,5,13,250,0],
secondary:!1},{width:5,bonus:175,chr:"J",
pixels:[0,15,255,255,0,16,214,43,1,14,187,255,1,15,231,253,1,16,255,2,2,1,255,255,2,2,255,255,2,3,255,255,2,4,255,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,2,11,255,255,2,12,255,255,2,13,255,255,2,14,226,235,2,15,202,68,2,16,229,0,3,2,255,36,3,3,255,36,3,4,255,36,3,5,255,36,3,6,255,36,3,7,255,36,3,8,255,36,3,9,255,36,3,10,255,36,3,11,255,36,3,12,255,35,3,13,255,13,3,14,255,0,3,15,208,0],
secondary:!1},{width:10,bonus:285,chr:"K",
pixels:[2,1,255,255,2,2,255,255,2,3,255,255,2,4,255,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,2,11,255,255,2,12,255,255,3,2,255,36,3,3,255,36,3,4,255,36,3,5,255,36,3,6,254,162,3,7,255,227,3,8,254,52,3,9,255,36,3,10,255,36,3,11,255,36,3,12,255,36,3,13,255,0,4,5,174,237,4,6,255,255,4,7,221,186,4,8,228,7,5,4,193,255,5,5,226,254,5,6,216,173,5,7,255,253,5,8,236,223,6,3,219,255,6,4,207,251,6,5,200,32,6,6,225,0,6,7,171,88,6,8,254,222,6,9,253,247,7,2,237,255,7,3,190,241,7,4,221,13,7,5,204,0,7,9,242,165,7,10,255,255,7,11,210,218,8,1,249,255,8,2,175,214,8,3,238,3,8,4,179,0,8,10,187,108,8,11,254,234,8,12,248,238,9,2,250,0,9,12,249,183,9,13,232,0],
secondary:!1},{width:9,bonus:165,chr:"L",
pixels:[2,1,255,255,2,2,255,255,2,3,255,255,2,4,255,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,2,11,255,255,2,12,255,255,3,2,255,36,3,3,255,36,3,4,255,36,3,5,255,36,3,6,255,36,3,7,255,36,3,8,255,36,3,9,255,36,3,10,255,36,3,11,255,104,3,12,255,255,3,13,255,0,4,12,255,255,4,13,255,0,5,12,255,255,5,13,255,0,6,12,255,255,6,13,255,0,7,12,255,255,7,13,255,0,8,13,255,0],
secondary:!1},{width:15,bonus:460,chr:"M",
pixels:[2,1,255,255,2,2,255,255,2,3,255,255,2,4,255,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,2,11,255,255,2,12,255,255,3,1,255,255,3,2,254,245,3,3,255,165,3,4,254,76,3,5,255,36,3,6,255,36,3,7,255,36,3,8,255,36,3,9,255,36,3,10,255,36,3,11,255,36,3,12,255,36,3,13,255,0,4,2,255,129,4,3,253,219,4,4,255,255,4,5,221,239,5,4,225,58,5,5,255,140,5,6,250,232,5,7,254,255,5,8,200,247,6,7,234,68,6,8,255,152,6,9,250,240,6,10,253,253,6,11,187,248,7,9,162,40,7,10,249,185,7,11,255,255,7,12,255,255,8,8,179,255,8,9,249,255,8,10,217,251,8,11,217,147,8,12,255,37,8,13,255,0,9,5,161,255,9,6,243,255,9,7,225,254,9,8,178,195,9,9,193,62,9,10,250,0,9,11,214,0,10,3,231,255,10,4,233,255,10,5,178,212,10,6,182,81,10,7,243,1,10,8,224,0,11,1,255,255,11,2,239,251,11,3,209,183,11,4,239,88,11,5,240,85,11,6,182,112,12,1,255,255,12,2,255,255,12,3,255,255,12,4,255,255,12,5,255,255,12,6,255,255,12,7,255,255,12,8,255,255,12,9,255,255,12,10,255,255,12,11,255,255,12,12,255,255,13,2,255,32,13,3,255,32,13,4,255,32,13,5,255,32,13,6,255,32,13,7,255,32,13,8,255,32,13,9,255,32,13,10,255,32,13,11,255,32,13,12,255,32,13,13,255,0],
secondary:!1},{width:13,bonus:345,chr:"N",
pixels:[2,1,255,255,2,2,255,255,2,3,255,255,2,4,255,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,2,11,255,255,2,12,255,255,3,1,213,255,3,2,255,255,3,3,255,181,3,4,255,50,3,5,255,36,3,6,255,36,3,7,255,36,3,8,255,36,3,9,255,36,3,10,255,36,3,11,255,36,3,12,255,36,3,13,255,0,4,2,234,137,4,3,254,249,4,4,247,237,5,4,254,191,5,5,255,255,5,6,207,225,6,5,214,113,6,6,255,235,6,7,253,249,7,7,248,165,7,8,255,255,7,9,234,234,8,8,183,89,8,9,254,216,8,10,255,255,8,11,185,223,9,10,247,209,9,11,255,255,9,12,248,244,10,1,255,255,10,2,255,255,10,3,255,255,10,4,255,255,10,5,255,255,10,6,255,255,10,7,255,255,10,8,255,255,10,9,255,255,10,10,255,255,10,11,255,255,10,12,255,255,10,13,237,0,11,2,255,32,11,3,255,32,11,4,255,32,11,5,255,32,11,6,255,32,11,7,255,32,11,8,255,32,11,9,255,32,11,10,255,32,11,11,255,32,11,12,255,32,11,13,255,0],
secondary:!1},{width:12,bonus:330,chr:"O",
pixels:[1,4,241,255,1,5,255,255,1,6,255,255,1,7,255,255,1,8,255,255,1,9,244,252,2,2,207,255,2,3,242,255,2,4,203,173,2,5,245,72,2,6,255,42,2,7,255,42,2,8,254,70,2,9,255,139,2,10,254,244,2,11,232,224,3,2,236,254,3,3,214,44,3,4,242,0,3,10,155,61,3,11,253,235,3,12,228,141,4,1,211,255,4,2,186,162,4,3,235,0,4,12,251,215,5,1,245,255,5,2,223,71,5,12,251,251,5,13,212,0,6,1,241,255,6,2,248,68,6,12,246,252,6,13,247,0,7,1,197,255,7,2,248,135,7,12,212,238,7,13,243,0,8,2,253,247,8,3,161,100,8,11,245,255,8,12,178,138,8,13,198,0,9,2,194,206,9,3,255,253,9,4,198,231,9,9,181,255,9,10,253,255,9,11,182,220,9,12,245,1,10,3,190,116,10,4,254,195,10,5,253,251,10,6,255,255,10,7,255,255,10,8,251,253,10,9,221,223,10,10,205,106,10,11,254,0,10,12,157,0,11,5,195,6,11,6,249,23,11,7,255,23,11,8,255,4,11,9,249,0,11,10,193,0],
secondary:!1},{width:10,bonus:255,chr:"P",
pixels:[2,1,255,255,2,2,255,255,2,3,255,255,2,4,255,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,2,11,255,255,2,12,255,255,3,1,255,255,3,2,255,80,3,3,255,36,3,4,255,36,3,5,255,36,3,6,255,36,3,7,255,255,3,8,255,77,3,9,255,36,3,10,255,36,3,11,255,36,3,12,255,36,3,13,255,0,4,1,255,255,4,2,255,53,4,7,255,255,4,8,255,43,5,1,243,255,5,2,254,76,5,7,255,255,5,8,255,16,6,1,205,255,6,2,251,151,6,7,229,251,6,8,255,0,7,2,254,255,7,3,209,179,7,6,247,255,7,7,171,164,7,8,226,0,8,2,193,191,8,3,254,249,8,4,255,255,8,5,247,252,8,6,198,176,8,7,248,2,9,4,248,26,9,5,255,5,9,6,244,0],
secondary:!1},{width:12,bonus:350,chr:"Q",
pixels:[1,4,241,255,1,5,255,255,1,6,255,255,1,7,255,255,1,8,255,255,1,9,244,252,2,2,207,255,2,3,242,255,2,4,203,173,2,5,245,72,2,6,255,42,2,7,255,42,2,8,254,70,2,9,255,139,2,10,254,244,2,11,232,224,3,2,236,254,3,3,214,44,3,4,242,0,3,10,155,61,3,11,253,235,3,12,229,138,4,1,211,255,4,2,186,162,4,3,235,0,4,12,251,214,5,1,245,255,5,2,223,71,5,12,251,251,5,13,211,0,6,1,241,255,6,2,248,68,6,12,255,255,6,13,249,66,7,1,197,255,7,2,248,135,7,12,252,254,7,13,255,249,8,2,253,247,8,3,161,100,8,11,245,255,8,12,179,141,8,13,253,157,8,14,254,255,9,2,194,206,9,3,255,253,9,4,198,231,9,9,181,255,9,10,253,255,9,11,184,220,9,12,245,1,9,14,214,178,9,15,255,128,10,3,190,116,10,4,254,195,10,5,253,251,10,6,255,255,10,7,255,255,10,8,250,252,10,9,218,220,10,10,206,107,10,11,254,0,10,12,159,0,10,15,166,62,11,5,195,6,11,6,249,23,11,7,255,18,11,8,255,0,11,9,247,0,11,10,188,0],
secondary:!1},{width:10,bonus:300,chr:"R",
pixels:[2,1,255,255,2,2,255,255,2,3,255,255,2,4,255,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,2,11,255,255,2,12,255,255,3,1,255,255,3,2,255,80,3,3,255,36,3,4,255,36,3,5,255,36,3,6,255,36,3,7,255,255,3,8,255,77,3,9,255,36,3,10,255,36,3,11,255,36,3,12,255,36,3,13,255,0,4,1,255,255,4,2,254,52,4,7,255,255,4,8,255,48,5,1,245,255,5,2,255,71,5,7,255,255,5,8,255,102,6,1,209,255,6,2,251,136,6,7,250,255,6,8,255,255,6,9,214,223,7,2,254,251,7,3,200,177,7,6,241,255,7,7,162,181,7,8,251,72,7,9,255,217,7,10,254,252,7,11,163,227,8,2,198,192,8,3,254,249,8,4,255,255,8,5,249,251,8,6,194,175,8,7,241,1,8,10,235,131,8,11,254,245,8,12,245,243,9,4,248,26,9,5,255,3,9,6,245,0,9,12,251,174,9,13,234,0],
secondary:!1},{width:9,bonus:240,chr:"S",
pixels:[1,2,213,255,1,3,255,255,1,4,255,255,1,5,234,248,1,11,167,255,1,12,202,231,2,2,220,252,2,3,224,71,2,4,255,72,2,5,255,219,2,6,251,222,2,12,246,238,2,13,183,0,3,1,221,255,3,2,183,127,3,3,217,0,3,6,255,255,3,7,231,95,3,12,250,253,3,13,230,0,4,1,247,255,4,2,228,66,4,6,221,242,4,7,255,190,4,12,242,251,4,13,248,0,5,1,233,255,5,2,249,84,5,7,255,255,5,8,203,66,5,12,215,238,5,13,238,0,6,1,197,255,6,2,246,148,6,7,239,243,6,8,254,222,6,11,245,255,6,12,172,144,6,13,201,0,7,2,224,130,7,8,251,223,7,9,255,255,7,10,252,252,7,11,195,187,7,12,245,2,8,9,223,26,8,10,255,9,8,11,249,0],
secondary:!1},{width:11,bonus:195,chr:"T",
pixels:[1,1,255,255,2,1,255,255,2,2,254,52,3,1,255,255,3,2,254,52,4,1,255,255,4,2,255,115,5,1,255,255,5,2,255,255,5,3,255,255,5,4,255,255,5,5,255,255,5,6,255,255,5,7,255,255,5,8,255,255,5,9,255,255,5,10,255,255,5,11,255,255,5,12,255,255,6,1,255,255,6,2,255,77,6,3,255,32,6,4,255,32,6,5,255,32,6,6,255,32,6,7,255,32,6,8,255,32,6,9,255,32,6,10,255,32,6,11,255,32,6,12,255,32,6,13,255,0,7,1,255,255,7,2,254,52,8,1,255,255,8,2,254,52,9,1,255,255,9,2,254,52,10,2,255,0],
secondary:!1},{width:12,bonus:280,chr:"U",
pixels:[2,1,255,255,2,2,255,255,2,3,255,255,2,4,255,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,246,252,3,2,255,36,3,3,255,36,3,4,255,36,3,5,255,36,3,6,255,36,3,7,255,36,3,8,255,37,3,9,255,61,3,10,255,143,3,11,255,253,3,12,169,146,4,11,206,178,4,12,255,208,5,12,251,252,5,13,208,0,6,12,246,252,6,13,248,0,7,11,169,255,7,12,207,230,7,13,243,0,8,10,190,255,8,11,251,255,8,12,190,81,8,13,187,0,9,1,255,255,9,2,255,255,9,3,255,255,9,4,255,255,9,5,255,255,9,6,255,255,9,7,255,255,9,8,255,255,9,9,254,255,9,10,225,231,9,11,207,82,9,12,251,0,10,2,255,32,10,3,255,32,10,4,255,32,10,5,255,32,10,6,255,32,10,7,255,32,10,8,255,30,10,9,255,13,10,10,254,0,10,11,204,0],
secondary:!1},{width:10,bonus:265,chr:"V",
pixels:[0,1,213,255,1,1,173,255,1,2,254,248,1,3,255,255,1,4,216,246,2,2,178,17,2,3,249,90,2,4,255,173,2,5,253,247,2,6,255,255,2,7,210,247,3,5,177,17,3,6,249,89,3,7,255,173,3,8,253,247,3,9,254,255,3,10,204,247,4,8,176,16,4,9,248,84,4,10,254,164,4,11,253,252,4,12,254,254,5,9,188,251,5,10,250,253,5,11,253,251,5,12,253,181,5,13,253,0,6,6,191,255,6,7,253,255,6,8,251,255,6,9,213,219,6,10,212,116,6,11,248,17,6,12,249,0,6,13,179,0,7,3,191,255,7,4,253,255,7,5,252,254,7,6,215,223,7,7,216,119,7,8,253,19,7,9,251,0,7,10,183,0,8,1,253,255,8,2,254,255,8,3,219,225,8,4,218,124,8,5,253,23,8,6,252,0,8,7,188,0,9,2,253,27,9,3,254,0,9,4,193,0],
secondary:!1},{width:15,bonus:480,chr:"W",
pixels:[0,1,172,255,1,1,209,255,1,2,254,255,1,3,255,255,1,4,237,251,1,5,171,255,2,2,213,20,2,3,254,79,2,4,255,139,2,5,250,205,2,6,254,252,2,7,255,255,2,8,237,251,2,9,169,255,3,6,203,14,3,7,252,69,3,8,255,127,3,9,248,181,3,10,245,234,3,11,255,255,3,12,235,251,4,9,214,206,4,10,244,232,4,11,255,253,4,12,255,207,4,13,231,0,5,5,157,255,5,6,227,255,5,7,255,255,5,8,235,251,5,9,202,204,5,10,203,116,5,11,225,26,5,12,253,0,5,13,207,0,6,2,199,255,6,3,251,255,6,4,248,255,6,5,211,228,6,6,203,148,6,7,232,53,6,8,255,1,6,9,232,0,6,10,162,0,7,1,255,255,7,2,254,254,7,3,238,192,7,4,252,64,7,5,248,3,7,6,189,0,8,2,255,142,8,3,255,217,8,4,255,255,8,5,241,251,8,6,168,254,9,4,222,40,9,5,255,109,9,6,250,187,9,7,252,250,9,8,254,255,9,9,210,250,10,7,185,12,10,8,248,72,10,9,254,126,10,10,243,201,10,11,254,255,10,12,243,251,11,8,165,250,11,9,228,244,11,10,254,255,11,11,253,252,11,12,255,196,11,13,240,0,12,4,173,255,12,5,233,255,12,6,255,255,12,7,252,254,12,8,220,229,12,9,210,161,12,10,228,77,12,11,254,10,12,12,250,0,12,13,196,0,13,1,239,255,13,2,255,255,13,3,252,254,13,4,224,229,13,5,217,160,13,6,239,76,13,7,255,12,13,8,251,0,13,9,198,0,14,2,244,77,14,3,255,13,14,4,252,0,14,5,201,0],
secondary:!1},{width:9,bonus:275,chr:"X",
pixels:[0,12,161,255,1,1,253,255,1,2,217,228,1,11,239,255,1,12,223,251,1,13,162,0,2,2,255,202,2,3,253,252,2,4,156,223,2,9,203,255,2,10,244,255,2,11,177,174,2,12,239,8,2,13,220,0,3,3,223,114,3,4,255,235,3,5,240,237,3,7,153,255,3,8,253,255,3,9,184,229,3,10,209,33,3,11,244,0,4,5,249,187,4,6,255,255,4,7,250,253,4,8,181,100,4,9,253,0,4,10,165,0,5,5,252,254,5,6,234,194,5,7,254,234,5,8,254,227,6,3,233,255,6,4,220,252,6,5,176,99,6,6,252,0,6,7,183,23,6,8,246,156,6,9,255,253,6,10,216,230,7,1,196,255,7,2,248,255,7,3,176,186,7,4,233,8,7,5,218,0,7,9,171,77,7,10,255,202,7,11,255,253,7,12,174,226,8,1,187,255,8,2,205,47,8,3,248,0,8,11,223,118,8,12,255,237,8,13,154,0],
secondary:!1},{width:9,bonus:215,chr:"Y",
pixels:[0,1,217,255,1,1,179,255,1,2,255,255,1,3,227,238,2,2,197,73,2,3,254,186,2,4,255,255,2,5,221,238,3,4,202,77,3,5,254,192,3,6,255,255,3,7,216,235,4,6,235,190,4,7,255,255,4,8,255,255,4,9,255,255,4,10,255,255,4,11,255,255,4,12,255,255,5,5,229,255,5,6,249,255,5,7,221,170,5,8,255,43,5,9,255,36,5,10,255,36,5,11,255,36,5,12,255,36,5,13,255,0,6,3,221,255,6,4,252,254,6,5,197,203,6,6,232,34,6,7,249,0,7,1,215,255,7,2,254,255,7,3,200,213,7,4,227,43,7,5,252,0,7,6,157,0,8,1,177,255,8,2,221,53,8,3,254,0,8,4,167,0],
secondary:!1},{width:10,bonus:305,chr:"Z",
pixels:[1,1,255,255,1,11,177,255,1,12,255,255,2,1,255,255,2,2,254,52,2,10,241,255,2,11,248,254,2,12,255,255,2,13,255,0,3,1,255,255,3,2,254,52,3,8,199,255,3,9,255,255,3,10,200,202,3,11,245,73,3,12,255,255,3,13,255,0,4,1,255,255,4,2,254,52,4,7,249,255,4,8,224,248,4,9,214,77,4,10,255,0,4,11,177,74,4,12,255,255,4,13,255,0,5,1,255,255,5,2,254,52,5,5,217,255,5,6,250,255,5,7,197,172,5,8,250,8,5,9,218,0,5,12,255,255,5,13,255,0,6,1,255,255,6,2,254,70,6,3,178,228,6,4,255,255,6,5,214,238,6,6,224,51,6,7,250,0,6,12,255,255,6,13,255,0,7,1,255,255,7,2,255,247,7,3,245,252,7,4,200,138,7,5,255,2,7,6,200,0,7,12,255,255,7,13,255,0,8,1,255,255,8,2,255,177,8,3,248,29,8,4,242,0,8,12,255,255,8,13,255,0,9,2,255,0,9,3,177,0,9,13,255,0],
secondary:!1},{width:9,bonus:280,chr:"0",
pixels:[1,3,213,255,1,4,255,255,1,5,255,255,1,6,255,255,1,7,255,255,1,8,255,255,1,9,254,255,1,10,205,250,2,2,253,255,2,3,195,210,2,4,227,95,2,5,255,50,2,6,255,39,2,7,255,38,2,8,255,50,2,9,255,83,2,10,254,160,2,11,254,252,3,1,223,255,3,2,177,170,3,3,253,0,3,4,160,0,3,11,203,147,3,12,254,221,4,1,247,255,4,2,231,66,4,12,251,252,4,13,220,0,5,1,203,255,5,2,252,157,5,11,155,255,5,12,220,243,5,13,248,0,6,2,253,247,6,3,237,225,6,10,208,255,6,11,250,255,6,12,184,103,6,13,209,0,7,3,251,155,7,4,250,230,7,5,255,255,7,6,255,255,7,7,255,255,7,8,255,255,7,9,241,247,7,10,212,202,7,11,217,59,7,12,250,0,8,5,226,11,8,6,255,26,8,7,255,26,8,8,255,12,8,9,255,0,8,10,233,0,8,11,168,0],
secondary:!1},{width:9,bonus:160,chr:"1",
pixels:[2,3,225,255,3,2,211,255,3,3,184,240,3,4,226,2,4,1,175,255,4,2,231,254,4,3,226,99,4,4,199,103,5,1,255,255,5,2,255,255,5,3,255,255,5,4,255,255,5,5,255,255,5,6,255,255,5,7,255,255,5,8,255,255,5,9,255,255,5,10,255,255,5,11,255,255,5,12,255,255,6,2,255,36,6,3,255,36,6,4,255,36,6,5,255,36,6,6,255,36,6,7,255,36,6,8,255,36,6,9,255,36,6,10,255,36,6,11,255,36,6,12,255,36,6,13,255,0],
secondary:!1},{width:9,bonus:275,chr:"2",
pixels:[1,2,155,255,1,11,160,255,1,12,255,255,2,2,236,255,2,3,164,35,2,10,173,255,2,11,254,255,2,12,255,255,2,13,255,0,3,1,215,255,3,2,184,159,3,3,236,0,3,9,185,255,3,10,238,255,3,11,208,133,3,12,255,255,3,13,255,0,4,1,247,255,4,2,225,68,4,8,196,255,4,9,232,255,4,10,197,59,4,11,241,55,4,12,255,255,4,13,255,0,5,1,219,255,5,2,250,104,5,7,209,255,5,8,223,253,5,9,204,46,5,10,232,0,5,12,255,255,5,13,255,0,6,2,253,241,6,3,173,174,6,6,245,255,6,7,204,246,6,8,214,29,6,9,222,0,6,12,255,255,6,13,255,0,7,2,207,191,7,3,254,249,7,4,255,255,7,5,236,244,7,6,196,147,7,7,246,4,7,8,196,0,7,12,255,255,7,13,255,0,8,3,157,7,8,4,249,18,8,5,255,0,8,6,226,0,8,13,255,0],
secondary:!1},{width:9,bonus:240,chr:"3",
pixels:[0,11,173,255,1,2,215,251,1,12,241,224,2,1,219,255,2,2,186,137,2,3,212,0,2,6,255,255,2,12,249,250,2,13,212,0,3,1,247,255,3,2,227,66,3,6,255,255,3,7,254,64,3,12,251,253,3,13,244,0,4,1,223,255,4,2,250,97,4,6,244,254,4,7,255,129,4,12,222,242,4,13,249,0,5,1,153,255,5,2,251,233,5,3,159,165,5,5,239,255,5,6,156,174,5,7,254,251,5,8,196,178,5,11,251,255,5,12,187,150,5,13,211,0,6,2,230,214,6,3,255,255,6,4,252,253,6,5,183,170,6,6,239,0,6,7,172,166,6,8,254,245,6,9,255,255,6,10,245,249,6,11,203,167,6,12,251,1,7,3,197,25,7,4,255,7,7,5,250,0,7,9,244,22,7,10,255,0,7,11,239,0],
secondary:!1},{width:9,bonus:270,chr:"4",
pixels:[1,8,169,255,1,9,255,255,2,7,227,255,2,8,212,252,2,9,255,255,2,10,255,68,3,6,247,255,3,7,155,197,3,8,230,25,3,9,255,255,3,10,255,68,4,4,211,255,4,5,210,253,4,6,162,71,4,7,247,0,4,9,255,255,4,10,255,68,5,3,245,255,5,4,154,218,5,5,212,6,5,6,208,0,5,9,255,255,5,10,255,68,6,1,191,255,6,2,235,255,6,3,183,172,6,4,248,82,6,5,171,119,6,9,255,255,6,10,254,126,7,1,255,255,7,2,255,255,7,3,255,255,7,4,255,255,7,5,255,255,7,6,255,255,7,7,255,255,7,8,255,255,7,9,255,255,7,10,255,255,7,11,255,255,7,12,255,255,8,2,255,32,8,3,255,32,8,4,255,32,8,5,255,32,8,6,255,32,8,7,255,32,8,8,255,49,8,9,255,255,8,10,255,91,8,11,255,32,8,12,255,32,8,13,255,0],
secondary:!1},{width:9,bonus:230,chr:"5",
pixels:[2,1,255,255,2,2,255,255,2,3,254,255,2,4,244,250,2,5,233,240,2,6,252,252,2,7,175,123,2,12,238,231,3,1,255,255,3,2,255,67,3,3,255,3,3,4,254,0,3,5,239,0,3,6,252,240,3,7,250,57,3,12,252,253,3,13,215,0,4,1,255,255,4,2,254,52,4,6,247,255,4,7,241,69,4,12,242,251,4,13,250,0,5,1,255,255,5,2,254,52,5,6,215,255,5,7,251,135,5,12,212,238,5,13,238,0,6,1,255,255,6,2,254,52,6,7,254,252,6,8,199,178,6,11,251,255,6,12,176,126,6,13,198,0,7,2,255,16,7,7,197,190,7,8,254,252,7,9,255,255,7,10,246,250,7,11,199,159,7,12,252,0,8,9,252,29,8,10,255,4,8,11,241,0],
secondary:!1},{width:9,bonus:290,chr:"6",
pixels:[1,4,225,255,1,5,255,255,1,6,255,255,1,7,255,255,1,8,255,255,1,9,255,255,1,10,226,250,2,2,196,255,2,3,226,254,2,4,180,159,2,5,235,92,2,6,254,225,2,7,255,116,2,8,254,46,2,9,255,69,2,10,254,164,2,11,255,255,3,2,222,254,3,3,201,25,3,4,225,0,3,5,216,219,3,6,167,188,3,7,224,0,3,11,213,164,3,12,255,213,4,1,215,255,4,2,176,157,4,3,221,0,4,5,245,255,4,6,201,77,4,12,252,253,4,13,213,0,5,1,249,255,5,2,224,72,5,5,219,255,5,6,249,120,5,12,229,246,5,13,250,0,6,1,247,255,6,2,250,65,6,6,254,250,6,7,196,191,6,10,163,255,6,11,253,255,6,12,175,136,6,13,221,0,7,2,248,20,7,6,188,170,7,7,255,237,7,8,255,255,7,9,254,255,7,10,231,238,7,11,197,119,7,12,253,0,8,8,238,21,8,9,255,8,8,10,254,0,8,11,216,0],
secondary:!1},{width:9,bonus:205,chr:"7",
pixels:[1,1,255,255,2,1,255,255,2,2,254,52,3,1,255,255,3,2,254,52,3,10,155,255,3,11,243,255,3,12,249,255,4,1,255,255,4,2,254,52,4,8,213,255,4,9,255,255,4,10,216,242,4,11,198,140,4,12,244,19,4,13,249,0,5,1,255,255,5,2,254,52,5,5,171,255,5,6,249,255,5,7,235,253,5,8,193,189,5,9,220,53,5,10,255,0,5,11,205,0,6,1,255,255,6,2,255,163,6,3,231,249,6,4,251,255,6,5,199,227,6,6,198,103,6,7,249,5,6,8,234,0,7,1,255,255,7,2,255,211,7,3,204,143,7,4,229,25,7,5,251,0,7,6,177,0,8,2,255,0,8,3,211,0],
secondary:!1},{width:9,bonus:315,chr:"8",
pixels:[1,2,227,255,1,3,255,255,1,4,255,255,1,5,203,240,1,8,243,255,1,9,255,255,1,10,255,255,1,11,215,244,2,1,179,255,2,2,205,243,2,3,233,53,2,4,255,68,2,5,255,217,2,6,241,213,2,7,249,255,2,8,177,189,2,9,246,50,2,10,255,69,2,11,255,219,2,12,235,169,3,1,239,255,3,2,199,87,3,3,195,0,3,6,255,253,3,7,227,140,3,8,249,0,3,12,250,228,3,13,156,0,4,1,231,255,4,2,243,86,4,6,255,255,4,7,254,164,4,12,249,251,4,13,224,0,5,1,160,255,5,2,251,225,5,5,239,255,5,6,164,204,5,7,254,246,5,8,180,66,5,12,224,245,5,13,246,0,6,2,232,212,6,3,255,255,6,4,251,253,6,5,187,176,6,6,239,0,6,7,199,180,6,8,253,229,6,11,243,255,6,12,179,171,6,13,215,0,7,3,198,27,7,4,255,7,7,5,249,0,7,8,212,194,7,9,255,255,7,10,253,253,7,11,199,190,7,12,243,5,8,9,168,29,8,10,255,12,8,11,252,0],
secondary:!1},{width:9,bonus:290,chr:"9",
pixels:[1,2,165,255,1,3,255,255,1,4,255,255,1,5,255,255,1,6,228,247,2,2,236,255,2,3,200,128,2,4,254,46,2,5,255,67,2,6,255,202,2,7,249,217,2,12,253,255,3,1,231,255,3,2,183,141,3,3,236,0,3,7,255,255,3,8,216,30,3,12,249,253,3,13,253,0,4,1,247,255,4,2,238,73,4,7,255,255,4,8,255,36,4,12,219,241,4,13,247,0,5,1,197,255,5,2,253,161,5,7,214,253,5,8,255,1,5,11,247,255,5,12,178,139,5,13,207,0,6,2,253,249,6,3,228,205,6,6,231,255,6,7,171,194,6,8,233,137,6,9,203,255,6,10,255,255,6,11,183,219,6,12,247,2,7,3,252,175,7,4,251,246,7,5,255,255,7,6,255,255,7,7,255,255,7,8,245,245,7,9,216,211,7,10,218,88,7,11,255,0,7,12,157,0,8,4,174,3,8,5,243,22,8,6,255,27,8,7,255,14,8,8,255,0,8,9,235,0,8,10,178,0],
secondary:!1},{width:13,bonus:350,chr:"%",
pixels:[1,3,249,255,1,4,255,255,1,5,255,255,1,6,254,255,1,7,158,234,2,2,233,255,2,3,185,185,2,4,250,46,2,5,255,41,2,6,255,95,2,7,255,255,2,8,156,42,3,2,217,255,3,3,247,179,3,4,177,131,3,6,162,228,3,7,254,255,3,8,255,17,3,12,189,255,4,3,249,222,4,4,255,255,4,5,255,255,4,6,242,248,4,7,188,137,4,8,254,0,4,10,185,255,4,13,189,0,5,4,219,17,5,5,255,21,5,6,255,1,5,7,237,19,5,8,191,200,5,9,158,255,5,11,185,0,6,7,188,255,6,10,158,0,7,5,184,255,7,8,193,28,8,4,157,255,8,6,184,0,8,7,162,147,8,8,248,255,8,9,255,255,8,10,255,255,8,11,251,254,9,2,187,255,9,5,157,0,9,7,213,255,9,8,166,176,9,9,249,39,9,10,255,40,9,11,254,132,9,12,254,234,10,3,187,0,10,7,202,255,10,8,240,171,10,9,162,137,10,11,187,238,10,12,239,239,10,13,234,0,11,8,246,223,11,9,255,255,11,10,255,255,11,11,237,244,11,12,198,94,11,13,224,0,12,9,218,19,12,10,255,19,12,11,255,0,12,12,227,0],
secondary:!1},{width:7,bonus:200,chr:"/",
pixels:[1,13,177,255,1,14,239,255,1,15,255,255,2,9,171,255,2,10,233,255,2,11,255,255,2,12,232,250,2,13,202,204,2,14,206,120,2,15,241,34,2,16,255,0,3,5,165,255,3,6,229,255,3,7,255,255,3,8,235,251,3,9,203,210,3,10,205,127,3,11,237,40,3,12,255,0,3,13,227,0,3,14,162,0,4,1,159,255,4,2,223,255,4,3,255,255,4,4,238,253,4,5,205,214,4,6,202,135,4,7,234,45,4,8,255,0,4,9,232,0,4,10,167,0,5,0,240,254,5,1,206,219,5,2,201,141,5,3,229,51,5,4,255,1,5,5,236,0,5,6,172,0,6,1,239,0,6,2,177,0],
secondary:!1},{width:9,bonus:120,chr:"+",
pixels:[1,7,255,255,2,7,255,255,2,8,255,48,3,7,255,255,3,8,255,113,4,4,255,255,4,5,255,255,4,6,255,255,4,7,255,255,4,8,255,255,4,9,255,255,4,10,255,255,5,5,255,32,5,6,255,32,5,7,255,255,5,8,255,74,5,9,255,32,5,10,255,32,5,11,255,0,6,7,255,255,6,8,255,48,7,7,255,255,7,8,255,48,8,8,255,0],
secondary:!1},{width:8,bonus:160,chr:"?",
pixels:[2,1,190,255,2,2,174,198,3,1,235,255,3,2,208,89,3,7,159,255,3,8,225,255,3,11,249,255,3,12,237,249,4,1,235,255,4,2,242,85,4,6,190,255,4,7,190,251,4,8,163,17,4,9,226,0,4,12,250,12,4,13,231,0,5,1,167,255,5,2,253,227,5,5,205,255,5,6,213,254,5,7,193,20,5,8,187,0,6,2,231,206,6,3,254,255,6,4,255,255,6,5,212,223,6,6,210,29,6,7,212,0,7,3,190,16,7,4,254,14,7,5,255,0,7,6,186,0],
secondary:!1},{width:6,bonus:100,chr:"!",
pixels:[3,1,255,255,3,2,255,255,3,3,255,255,3,4,255,255,3,5,255,255,3,6,255,255,3,7,255,255,3,8,255,255,3,11,249,255,3,12,237,249,4,2,255,32,4,3,255,32,4,4,255,32,4,5,255,32,4,6,255,32,4,7,255,32,4,8,255,32,4,9,255,0,4,12,250,12,4,13,231,0],
secondary:!1},{width:14,bonus:545,chr:"@",
pixels:[1,5,221,255,1,6,255,255,1,7,255,255,1,8,255,255,1,9,255,255,1,10,239,251,2,3,209,255,2,4,244,255,2,5,202,192,2,6,231,87,2,7,255,49,2,8,255,42,2,9,255,74,2,10,255,152,2,11,254,251,2,12,217,213,3,2,197,255,3,3,213,250,3,4,215,39,3,5,244,0,3,6,160,33,3,11,176,87,3,12,255,247,3,13,212,129,4,2,239,255,4,3,203,35,4,4,208,2,4,5,158,232,4,6,251,255,4,7,255,255,4,8,255,255,4,9,243,251,4,12,160,208,4,13,253,215,5,1,185,255,5,2,181,199,5,3,239,0,5,5,244,255,5,6,193,149,5,7,251,48,5,8,255,49,5,9,255,166,5,10,254,243,5,13,255,255,5,14,216,20,6,1,227,255,6,2,208,98,6,4,219,255,6,5,177,163,6,6,244,0,6,10,255,255,6,11,244,40,6,13,255,255,6,14,255,40,7,1,247,255,7,2,234,66,7,4,249,255,7,5,229,69,7,10,244,254,7,11,255,11,7,13,255,255,7,14,255,33,8,1,223,255,8,2,250,95,8,4,231,255,8,5,252,139,8,9,211,255,8,11,243,0,8,13,253,255,8,14,255,7,9,1,155,255,9,2,246,199,9,4,181,255,9,5,255,255,9,6,255,255,9,7,255,255,9,8,255,255,9,9,244,246,9,10,233,136,9,13,202,245,9,14,253,0,10,2,252,251,10,3,227,160,10,5,190,43,10,6,255,32,10,7,255,32,10,8,255,33,10,9,255,77,10,10,255,255,10,14,194,0,11,3,255,249,11,4,238,233,11,9,201,245,11,10,235,247,11,11,255,8,12,4,253,166,12,5,253,244,12,6,255,255,12,7,255,255,12,8,246,251,12,9,206,207,12,10,201,41,12,11,227,0,13,5,165,0,13,6,243,19,13,7,255,22,13,8,255,2,13,9,242,0,13,10,167,0],
secondary:!1},{width:11,bonus:310,chr:"#",
pixels:[1,5,239,255,1,9,255,255,2,5,239,255,2,6,242,34,2,9,255,255,2,10,255,159,2,11,196,238,2,12,233,255,3,5,247,255,3,6,252,209,3,7,244,254,3,8,255,255,3,9,255,255,3,10,254,192,3,11,207,159,3,12,204,94,3,13,234,0,4,3,255,255,4,4,228,250,4,5,253,253,4,6,250,134,4,7,219,81,4,8,244,24,4,9,255,255,4,10,255,48,4,11,192,0,5,4,255,0,5,5,253,241,5,6,252,32,5,9,255,255,5,10,255,48,6,5,239,255,6,6,243,59,6,9,255,255,6,10,255,225,6,11,254,255,6,12,244,254,7,4,171,255,7,5,251,255,7,6,255,255,7,7,241,252,7,8,211,234,7,9,255,255,7,10,255,121,7,11,230,47,7,12,254,2,7,13,243,0,8,3,204,246,8,4,188,186,8,5,252,248,8,6,252,54,8,7,255,0,8,8,238,0,8,9,255,255,8,10,255,48,9,4,196,0,9,5,248,246,9,6,247,33,9,9,255,255,9,10,255,48,10,6,240,0,10,10,255,0],
secondary:!1},{width:9,bonus:315,chr:"$",
pixels:[1,4,255,255,1,5,255,255,1,6,242,250,1,12,244,250,2,3,253,255,2,4,185,152,2,5,254,52,2,6,255,199,2,7,252,224,2,12,255,255,2,13,241,25,3,3,235,251,3,4,254,80,3,5,156,131,3,7,255,255,3,8,238,134,3,12,255,255,3,13,255,108,4,1,255,255,4,2,255,255,4,3,255,255,4,4,255,255,4,5,255,255,4,6,255,255,4,7,255,255,4,8,255,255,4,9,255,255,4,10,255,255,4,11,255,255,4,12,255,255,4,13,255,255,4,14,182,180,5,2,254,126,5,3,254,213,5,4,255,32,5,5,255,32,5,6,255,32,5,7,255,152,5,8,254,240,5,9,255,40,5,10,255,32,5,11,255,78,5,12,255,251,5,13,255,39,5,14,255,16,6,3,250,250,6,4,214,12,6,8,253,251,6,9,250,179,6,11,209,247,6,12,202,227,6,13,251,0,7,3,205,230,7,4,247,34,7,9,255,245,7,10,255,255,7,11,220,233,7,12,208,35,7,13,180,0,8,4,185,0,8,10,246,19,8,11,255,0,8,12,201,0],
secondary:!1},{width:9,bonus:135,chr:"^",
pixels:[1,7,207,255,1,8,235,255,2,5,215,255,2,6,220,255,2,7,156,174,2,8,209,12,2,9,236,0,3,3,223,255,3,4,200,255,3,6,216,2,3,7,220,0,4,2,255,255,4,3,193,196,4,4,224,5,4,5,200,0,5,2,163,128,5,3,255,201,5,4,242,238,6,4,214,76,6,5,247,189,6,6,247,250,6,7,153,244,7,6,196,61,7,7,250,168,7,8,252,252,8,8,176,46,8,9,249,0],
secondary:!1},{width:9,bonus:70,chr:"~",pixels:[1,8,189,255,2,7,233,255,2,8,158,103,2,9,189,0,3,7,233,255,3,8,241,94,4,8,250,201,5,8,255,255,5,9,204,39,6,8,255,255,6,9,255,26,7,8,179,247,7,9,255,0,8,9,173,0],secondary:!1},{width:11,bonus:365,chr:"&",
pixels:[1,8,245,255,1,9,255,255,1,10,255,255,1,11,220,246,2,2,247,255,2,3,255,255,2,4,252,254,2,5,156,235,2,7,251,255,2,8,181,199,2,9,246,49,2,10,255,75,2,11,254,222,2,12,241,181,3,1,213,255,3,2,191,217,3,3,248,45,3,4,255,95,3,5,254,228,3,6,253,253,3,7,169,217,3,8,251,0,3,12,252,236,3,13,171,0,4,1,245,255,4,2,223,73,4,3,163,0,4,5,185,198,4,6,254,255,4,7,254,214,4,8,155,44,4,12,250,252,4,13,233,0,5,1,205,255,5,2,252,196,5,4,153,255,5,5,245,255,5,6,168,88,5,7,255,197,5,8,249,229,5,12,220,243,5,13,247,0,6,2,250,234,6,3,255,255,6,4,236,244,6,5,179,95,6,6,246,0,6,8,241,205,6,9,252,236,6,11,231,255,6,12,179,167,6,13,209,0,7,3,231,23,7,4,255,1,7,5,226,0,7,9,239,204,7,10,255,255,7,11,220,239,7,12,232,8,8,9,236,255,8,10,252,248,8,11,254,243,8,12,218,74,9,7,255,255,9,8,244,254,9,9,190,184,9,10,237,19,9,11,252,182,9,12,254,246,10,8,255,12,10,9,243,0,10,12,231,190,10,13,246,0],
secondary:!1},{width:10,bonus:170,chr:"*",
pixels:[1,4,167,255,2,4,244,248,2,5,168,0,3,4,254,254,3,5,241,64,3,6,223,255,3,7,249,255,3,8,160,91,4,1,211,255,4,2,185,255,4,3,158,255,4,4,244,254,4,5,254,234,4,6,156,204,4,7,227,25,4,8,249,0,5,1,169,255,5,2,235,156,5,3,217,138,5,4,250,248,5,5,254,240,5,6,247,175,6,2,170,0,6,3,160,59,6,4,253,253,6,5,244,34,6,6,252,201,6,7,255,255,7,4,238,252,7,5,252,0,7,7,221,116,7,8,255,0,8,4,188,187,8,5,235,0],
secondary:!1},{width:5,bonus:175,chr:"(",
pixels:[1,3,199,255,1,4,247,255,1,5,255,255,1,6,255,255,1,7,255,255,1,8,255,255,1,9,255,255,1,10,255,255,1,11,223,253,1,12,153,255,2,1,247,255,2,2,246,254,2,3,211,211,2,4,226,138,2,5,249,78,2,6,255,55,2,7,255,40,2,8,255,49,2,9,255,65,2,10,255,101,2,11,255,151,2,12,250,221,2,13,255,255,2,14,214,240,3,0,217,253,3,1,179,137,3,2,248,12,3,3,245,0,3,4,175,0,3,13,225,57,3,14,254,156,3,15,253,252,4,1,216,0,4,15,170,56,4,16,250,0],
secondary:!1},{width:6,bonus:185,chr:")",
pixels:[2,0,247,253,2,1,153,238,2,14,197,255,2,15,241,255,3,0,157,133,3,1,254,220,3,2,255,255,3,3,233,249,3,4,173,255,3,11,195,255,3,12,247,255,3,13,252,254,3,14,196,210,3,15,203,30,3,16,241,0,4,2,228,69,4,3,255,148,4,4,249,206,4,5,252,251,4,6,255,255,4,7,255,255,4,8,255,255,4,9,255,255,4,10,242,246,4,11,222,209,4,12,223,133,4,13,247,26,4,14,252,0,4,15,162,0,5,5,201,1,5,6,248,14,5,7,255,29,5,8,255,25,5,9,255,9,5,10,255,0,5,11,234,0,5,12,182,0],
secondary:!1},{width:7,bonus:65,chr:"_",pixels:[0,14,255,255,1,14,255,255,1,15,255,48,2,14,255,255,2,15,255,48,3,14,255,255,3,15,255,48,4,14,255,255,4,15,255,48,5,14,255,255,5,15,255,48,6,14,255,255,6,15,255,48],secondary:!1},{width:6,bonus:40,
chr:"-",pixels:[1,8,255,255,2,8,255,255,2,9,255,48,3,8,255,255,3,9,255,48,4,8,255,255,4,9,255,48,5,9,255,0],secondary:!0},{width:9,bonus:140,chr:"=",
pixels:[1,6,255,255,1,9,255,255,2,6,255,255,2,7,255,48,2,9,255,255,2,10,255,48,3,6,255,255,3,7,255,48,3,9,255,255,3,10,255,48,4,6,255,255,4,7,255,48,4,9,255,255,4,10,255,48,5,6,255,255,5,7,255,48,5,9,255,255,5,10,255,48,6,6,255,255,6,7,255,48,6,9,255,255,6,10,255,48,7,6,255,255,7,7,255,48,7,9,255,255,7,10,255,48,8,7,255,0,8,10,255,0],
secondary:!1},{width:6,bonus:195,chr:"[",
pixels:[2,0,255,255,2,1,255,255,2,2,255,255,2,3,255,255,2,4,255,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,2,11,255,255,2,12,255,255,2,13,255,255,2,14,255,255,2,15,255,255,3,0,255,255,3,1,255,77,3,2,255,36,3,3,255,36,3,4,255,36,3,5,255,36,3,6,255,36,3,7,255,36,3,8,255,36,3,9,255,36,3,10,255,36,3,11,255,36,3,12,255,36,3,13,255,36,3,14,255,39,3,15,255,255,3,16,255,48,4,0,243,255,4,1,255,45,4,15,245,254,4,16,255,45,5,1,244,0,5,16,244,0],
secondary:!1},{width:6,bonus:195,chr:"]",
pixels:[1,0,255,255,1,15,255,255,2,0,255,255,2,1,255,113,2,15,255,255,2,16,255,48,3,0,255,255,3,1,255,255,3,2,255,255,3,3,255,255,3,4,255,255,3,5,255,255,3,6,255,255,3,7,255,255,3,8,255,255,3,9,255,255,3,10,255,255,3,11,255,255,3,12,255,255,3,13,255,255,3,14,255,255,3,15,255,255,3,16,255,48,4,1,255,36,4,2,255,36,4,3,255,36,4,4,255,36,4,5,255,36,4,6,255,36,4,7,255,36,4,8,255,36,4,9,255,36,4,10,255,36,4,11,255,36,4,12,255,36,4,13,255,36,4,14,255,36,4,15,255,36,4,16,255,6],
secondary:!1},{width:6,bonus:185,chr:"{",
pixels:[1,7,255,255,2,6,175,255,2,7,206,249,2,8,255,213,3,1,255,255,3,2,255,255,3,3,255,255,3,4,255,255,3,5,255,255,3,6,239,247,3,7,186,48,3,8,240,200,3,9,255,255,3,10,255,255,3,11,255,255,3,12,255,255,3,13,255,255,3,14,255,255,3,15,174,228,4,0,231,255,4,1,187,169,4,2,255,37,4,3,255,36,4,4,255,36,4,5,255,34,4,6,255,6,4,7,232,0,4,9,195,34,4,10,255,36,4,11,255,36,4,12,255,36,4,13,255,37,4,14,255,90,4,15,255,255,4,16,165,34,5,1,231,10,5,16,255,8],
secondary:!1},{width:7,bonus:200,chr:"}",
pixels:[1,0,197,255,1,15,208,255,2,0,203,255,2,1,238,191,2,14,153,255,2,15,240,254,2,16,209,9,3,1,253,247,3,2,255,255,3,3,255,255,3,4,255,255,3,5,255,255,3,6,251,253,3,8,219,255,3,9,255,255,3,10,255,255,3,11,255,255,3,12,255,255,3,13,255,255,3,14,250,252,3,15,190,126,3,16,239,0,4,2,246,36,4,3,255,36,4,4,255,36,4,5,255,39,4,6,254,138,4,7,254,222,4,8,203,236,4,9,227,54,4,10,255,36,4,11,255,36,4,12,255,36,4,13,255,34,4,14,255,5,4,15,247,0,5,7,255,255,5,8,231,76,5,9,188,0,6,8,255,9],
secondary:!1},{width:5,bonus:40,chr:":",pixels:[2,4,231,255,2,5,252,254,2,11,249,255,2,12,237,249,3,5,234,20,3,6,251,0,3,12,250,12,3,13,231,0],secondary:!0},{width:5,bonus:65,chr:";",
pixels:[1,13,167,255,1,14,219,255,2,4,231,255,2,5,252,254,2,11,241,255,2,12,203,228,2,13,178,162,2,14,180,54,2,15,220,0,3,5,234,20,3,6,251,0,3,12,241,0,3,13,182,0],secondary:!0},{width:8,bonus:85,chr:'"',
pixels:[2,1,255,255,2,2,254,255,2,3,234,254,2,4,209,255,3,2,255,117,3,3,255,92,3,4,240,72,3,5,209,0,4,2,164,78,5,1,255,255,5,2,255,255,5,3,255,255,5,4,251,255,6,2,255,69,6,3,255,44,6,4,255,20,6,5,251,0],secondary:!0},{width:5,bonus:40,chr:"'",
pixels:[2,1,255,255,2,2,254,255,2,3,234,254,2,4,209,255,3,2,255,117,3,3,255,92,3,4,240,72,3,5,209,0],secondary:!0},{width:9,bonus:120,chr:"<",
pixels:[1,7,197,255,2,7,219,255,2,8,252,246,2,9,156,39,3,6,219,255,3,8,242,177,3,9,250,143,4,6,195,253,4,7,220,0,4,9,251,247,5,5,235,255,5,7,194,0,5,9,199,238,5,10,249,136,6,5,186,249,6,6,236,0,6,10,251,245,7,4,247,255,7,5,161,76,7,6,182,0,7,10,216,239,7,11,247,130,8,5,247,0,8,11,202,0],
secondary:!1},{width:9,bonus:130,chr:">",
pixels:[1,4,247,255,1,10,203,255,2,4,153,231,2,5,252,184,2,10,239,255,2,11,206,20,3,5,246,244,3,6,199,77,3,9,185,255,3,10,164,207,3,11,240,0,4,6,250,197,4,9,243,255,4,10,190,26,5,6,235,238,5,7,211,87,5,8,167,255,5,9,162,221,5,10,243,0,6,7,250,221,6,8,246,252,6,9,175,35,7,7,216,233,7,8,239,157,7,9,243,0,8,8,197,0],
secondary:!1},{width:7,bonus:145,chr:"\\",
pixels:[1,0,254,255,1,1,213,251,2,0,157,99,2,1,254,126,2,2,243,201,2,3,251,252,2,4,254,254,2,5,206,252,3,3,194,10,3,4,250,68,3,5,253,133,3,6,243,207,3,7,252,253,3,8,252,254,3,9,200,252,4,7,200,15,4,8,252,73,4,9,252,139,4,10,243,213,4,11,254,254,4,12,249,254,4,13,193,253,5,11,206,20,5,12,254,79,5,13,251,146,5,14,244,219,5,15,254,255,6,15,213,24,6,16,254,0],
secondary:!1},{width:3,bonus:20,chr:".",pixels:[1,11,249,255,1,12,237,249,2,12,250,12,2,13,231,0],secondary:!0},{width:4,bonus:50,chr:",",
pixels:[1,11,205,255,1,12,247,255,1,13,255,255,1,14,210,244,2,11,215,255,2,12,233,154,2,13,248,48,2,14,255,0,2,15,201,0,3,12,216,0],secondary:!0},{width:9,bonus:160,chr:"|",
pixels:[4,0,255,255,4,1,255,255,4,2,255,255,4,3,255,255,4,4,255,255,4,5,255,255,4,6,255,255,4,7,255,255,4,8,255,255,4,9,255,255,4,10,255,255,4,11,255,255,4,12,255,255,4,13,255,255,4,14,255,255,4,15,255,255,5,1,255,36,5,2,255,36,5,3,255,36,5,4,255,36,5,5,255,36,5,6,255,36,5,7,255,36,5,8,255,36,5,9,255,36,5,10,255,36,5,11,255,36,5,12,255,36,5,13,255,36,5,14,255,36,5,15,255,36,5,16,255,0],
secondary:!1}],width:15,spacewidth:4,shadow:!0,height:17,basey:12}}],e={},function o(r){var n=e[r];if(void 0!==n)return n.exports;var i=e[r]={exports:{}};return s[r](i,i.exports,o),i.exports}(0);var s,e}));

/***/ }),

/***/ "../node_modules/.pnpm/@alt1+ocr@1.0.0-alpha.7/node_modules/@alt1/ocr/fonts/chatbox/18pt.js":
/*!**************************************************************************************************!*\
  !*** ../node_modules/.pnpm/@alt1+ocr@1.0.0-alpha.7/node_modules/@alt1/ocr/fonts/chatbox/18pt.js ***!
  \**************************************************************************************************/
/***/ (function(module) {

!function(s,e){ true?module.exports=e():0}("undefined"!=typeof self?self:this,(()=>{
return s=[s=>{s.exports={chars:[{width:10,bonus:330,chr:"a",
pixels:[1,10,239,255,1,11,235,255,1,12,161,255,2,5,165,255,2,9,255,255,2,10,235,225,2,11,251,187,2,12,254,255,2,13,220,184,3,4,173,255,3,5,198,225,3,6,165,0,3,8,211,255,3,9,219,219,3,10,255,1,3,11,207,0,3,12,224,162,3,13,255,233,3,14,158,0,4,4,223,255,4,5,211,144,4,6,175,0,4,8,251,255,4,9,229,112,4,10,188,0,4,13,251,251,4,14,233,0,5,4,247,255,5,5,235,106,5,8,255,255,5,9,252,77,5,13,222,233,5,14,247,0,6,4,221,255,6,5,251,166,6,8,255,255,6,9,255,68,6,12,229,255,6,13,163,108,6,14,202,0,7,5,255,255,7,6,237,222,7,7,173,255,7,8,255,255,7,9,254,189,7,10,202,231,7,11,243,255,7,12,203,245,7,13,237,88,8,5,204,181,8,6,255,225,8,7,254,255,8,8,255,255,8,9,255,255,8,10,255,255,8,11,255,255,8,12,255,255,8,13,255,255,9,7,225,0,9,8,254,0,9,9,255,0,9,10,255,0,9,11,255,0,9,12,255,0,9,13,255,0,9,14,255,0],
secondary:!1},{width:12,bonus:395,chr:"b",
pixels:[2,0,255,255,2,1,255,255,2,2,255,255,2,3,255,255,2,4,255,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,2,11,255,255,2,12,255,255,2,13,255,255,3,0,163,255,3,1,254,164,3,2,254,164,3,3,254,162,3,4,255,151,3,5,255,223,3,6,254,251,3,7,255,196,3,8,254,168,3,9,255,169,3,10,254,198,3,11,255,251,3,12,255,215,3,13,255,75,3,14,255,0,4,1,164,0,4,2,164,0,4,3,164,0,4,4,197,125,4,5,245,241,4,6,227,36,4,7,250,0,4,8,196,0,4,9,168,0,4,10,169,0,4,11,205,43,4,12,254,234,4,13,231,110,5,4,213,255,5,5,174,185,5,6,232,0,5,13,251,217,6,4,249,255,6,5,230,111,6,13,252,252,6,14,214,0,7,4,229,255,7,5,252,164,7,12,161,255,7,13,239,245,7,14,249,0,8,5,255,255,8,6,216,173,8,12,255,255,8,13,213,169,8,14,230,0,9,5,220,205,9,6,255,255,9,7,255,255,9,8,255,255,9,9,255,255,9,10,255,255,9,11,255,255,9,12,222,203,9,13,255,9,10,6,194,76,10,7,255,127,10,8,254,156,10,9,255,155,10,10,255,127,10,11,254,58,10,12,255,0,10,13,177,0,11,9,156,0,11,10,155,0],
secondary:!1},{width:9,bonus:215,chr:"c",
pixels:[1,7,213,255,1,8,247,255,1,9,247,255,1,10,217,255,2,5,219,255,2,6,255,255,2,7,235,232,2,8,243,187,2,9,252,179,2,10,253,215,2,11,255,255,2,12,243,239,3,5,248,254,3,6,229,78,3,7,255,0,3,8,214,0,3,9,178,0,3,10,177,0,3,11,224,79,3,12,254,246,3,13,245,165,4,4,225,255,4,5,207,174,4,6,247,0,4,12,169,208,4,13,254,232,4,14,159,0,5,4,249,255,5,5,237,104,5,13,252,253,5,14,231,0,6,4,231,255,6,5,252,122,6,13,239,245,6,14,250,0,7,4,179,255,7,5,245,156,7,12,187,255,7,13,208,205,7,14,230,0,8,5,179,0,8,13,188,0,8,14,167,0],
secondary:!1},{width:11,bonus:430,chr:"d",
pixels:[1,7,219,255,1,8,249,255,1,9,249,255,1,10,221,255,1,11,154,255,2,5,237,255,2,6,255,255,2,7,238,231,2,8,244,186,2,9,253,176,2,10,254,209,2,11,255,255,2,12,249,248,3,4,181,255,3,5,244,253,3,6,241,71,3,7,255,0,3,8,215,0,3,9,178,0,3,10,175,0,3,11,218,63,3,12,254,239,3,13,251,189,4,4,243,255,4,5,219,150,4,6,242,0,4,12,153,210,4,13,254,246,4,14,186,0,5,4,241,255,5,5,248,106,5,13,248,249,5,14,245,0,6,4,178,255,6,5,251,169,6,12,155,255,6,13,209,218,6,14,242,0,7,5,248,238,7,6,213,161,7,12,225,255,7,13,169,53,7,14,178,0,8,0,255,255,8,1,255,255,8,2,255,255,8,3,255,255,8,4,247,255,8,5,246,254,8,6,255,255,8,7,255,255,8,8,255,255,8,9,255,255,8,10,255,255,8,11,255,255,8,12,248,248,8,13,248,202,9,0,163,255,9,1,254,164,9,2,254,164,9,3,254,164,9,4,254,164,9,5,251,166,9,6,251,166,9,7,254,164,9,8,254,164,9,9,254,164,9,10,254,164,9,11,254,164,9,12,254,164,9,13,249,168,9,14,196,0,10,1,164,0,10,2,164,0,10,3,164,0,10,4,164,0,10,5,164,0,10,6,164,0,10,7,164,0,10,8,164,0,10,9,164,0,10,10,164,0,10,11,164,0,10,12,164,0,10,13,164,0,10,14,164,0],
secondary:!1},{width:10,bonus:290,chr:"e",
pixels:[1,7,213,255,1,8,247,255,1,9,247,255,1,10,215,255,2,5,223,255,2,6,249,255,2,7,229,222,2,8,255,255,2,9,253,199,2,10,254,209,2,11,255,255,2,12,237,234,3,4,167,255,3,5,232,252,3,6,228,42,3,7,250,20,3,8,255,255,3,9,255,68,3,10,197,0,3,11,220,77,3,12,255,247,3,13,239,160,4,4,237,255,4,5,208,145,4,6,229,0,4,8,255,255,4,9,255,68,4,12,172,211,4,13,254,228,5,4,247,255,5,5,245,109,5,8,255,255,5,9,255,68,5,13,253,253,5,14,228,0,6,4,193,255,6,5,253,205,6,8,255,255,6,9,255,68,6,13,241,247,6,14,251,0,7,5,254,250,7,6,250,238,7,7,188,251,7,8,255,255,7,9,255,68,7,12,167,255,7,13,215,220,7,14,234,0,8,6,254,179,8,7,253,240,8,8,255,255,8,9,255,68,8,13,190,93,8,14,186,0,9,7,178,0,9,8,238,0,9,9,255,0],
secondary:!1},{width:8,bonus:265,chr:"f",
pixels:[1,4,173,255,2,3,161,255,2,4,251,255,2,5,236,211,2,6,195,214,2,7,163,255,2,8,163,255,2,9,163,255,2,10,163,255,2,11,163,255,2,12,163,255,2,13,163,255,3,1,251,255,3,2,255,255,3,3,255,255,3,4,255,255,3,5,255,255,3,6,255,255,3,7,255,255,3,8,255,255,3,9,255,255,3,10,255,255,3,11,255,255,3,12,255,255,3,13,255,255,3,14,164,0,4,0,201,255,4,1,221,239,4,2,253,41,4,3,255,2,4,4,255,255,4,5,254,88,4,6,255,0,4,7,255,0,4,8,255,0,4,9,255,0,4,10,255,0,4,11,255,0,4,12,255,0,4,13,255,0,4,14,255,0,5,0,241,255,5,1,223,117,5,2,207,0,5,4,255,255,5,5,254,88,6,0,243,255,6,1,248,115,6,4,255,255,6,5,254,88,7,0,178,255,7,1,247,97,7,5,255,0],
secondary:!1},{width:11,bonus:475,chr:"g",
pixels:[1,7,217,255,1,8,249,255,1,9,249,255,1,10,221,255,1,11,153,255,2,5,235,255,2,6,255,255,2,7,237,229,2,8,244,185,2,9,252,178,2,10,254,210,2,11,255,255,2,12,249,248,2,16,203,255,2,17,179,220,3,4,181,255,3,5,242,252,3,6,240,65,3,7,255,0,3,8,213,0,3,9,177,0,3,10,176,0,3,11,218,62,3,12,255,237,3,13,251,190,3,17,247,224,3,18,154,0,4,4,243,255,4,5,218,148,4,6,240,0,4,13,254,246,4,14,187,0,4,17,248,248,4,18,217,0,5,4,241,255,5,5,248,106,5,13,248,248,5,14,245,0,5,17,253,253,5,18,241,0,6,4,175,255,6,5,250,171,6,12,155,255,6,13,205,215,6,14,241,0,6,16,153,255,6,17,238,243,6,18,251,0,7,5,246,235,7,6,214,162,7,12,215,255,7,13,167,44,7,14,179,28,7,16,251,255,7,17,215,185,7,18,227,0,8,4,197,255,8,5,243,254,8,6,255,255,8,7,255,255,8,8,255,255,8,9,255,255,8,10,255,255,8,11,255,255,8,12,255,255,8,13,255,255,8,14,255,255,8,15,255,255,8,16,236,239,8,17,252,26,8,18,156,0,9,4,163,255,9,5,234,178,9,6,250,167,9,7,254,164,9,8,254,164,9,9,254,164,9,10,254,164,9,11,254,164,9,12,254,164,9,13,255,163,9,14,254,150,9,15,255,100,9,16,255,11,9,17,221,0,10,5,164,0,10,6,164,0,10,7,164,0,10,8,164,0,10,9,164,0,10,10,164,0,10,11,164,0,10,12,164,0,10,13,164,0,10,14,163,0],
secondary:!1},{width:11,bonus:385,chr:"h",
pixels:[2,0,255,255,2,1,255,255,2,2,255,255,2,3,255,255,2,4,255,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,2,11,255,255,2,12,255,255,2,13,255,255,3,0,163,255,3,1,254,164,3,2,254,164,3,3,254,164,3,4,255,157,3,5,255,217,3,6,255,251,3,7,255,196,3,8,254,168,3,9,254,164,3,10,254,164,3,11,254,164,3,12,254,164,3,13,254,164,3,14,255,0,4,1,164,0,4,2,164,0,4,3,164,0,4,4,195,116,4,5,246,240,4,6,222,39,4,7,251,0,4,8,196,0,4,9,168,0,4,10,164,0,4,11,164,0,4,12,164,0,4,13,164,0,4,14,164,0,5,4,211,255,5,5,170,186,5,6,232,0,6,4,247,255,6,5,228,112,7,4,221,255,7,5,253,180,8,5,255,255,8,6,244,230,8,7,172,254,8,8,163,255,8,9,163,255,8,10,163,255,8,11,163,255,8,12,163,255,8,13,163,255,9,5,200,179,9,6,255,227,9,7,255,253,9,8,255,255,9,9,255,255,9,10,255,255,9,11,255,255,9,12,255,255,9,13,255,255,9,14,164,0,10,7,227,0,10,8,253,0,10,9,255,0,10,10,255,0,10,11,255,0,10,12,255,0,10,13,255,0,10,14,255,0],
secondary:!1},{width:5,bonus:175,chr:"i",
pixels:[2,0,205,255,2,1,215,255,2,4,255,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,2,11,255,255,2,12,255,255,2,13,255,255,3,1,229,137,3,2,215,0,3,4,163,255,3,5,254,164,3,6,254,164,3,7,254,164,3,8,254,164,3,9,254,164,3,10,254,164,3,11,254,164,3,12,254,164,3,13,254,164,3,14,255,0,4,5,164,0,4,6,164,0,4,7,164,0,4,8,164,0,4,9,164,0,4,10,164,0,4,11,164,0,4,12,164,0,4,13,164,0,4,14,164,0],
secondary:!1},{width:5,bonus:240,chr:"j",
pixels:[0,17,249,254,1,16,165,255,1,17,241,247,1,18,248,0,2,0,205,255,2,1,215,255,2,4,255,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,2,11,255,255,2,12,255,255,2,13,255,255,2,14,255,255,2,15,255,255,2,16,255,255,2,17,215,167,2,18,233,0,3,1,229,137,3,2,215,0,3,4,163,255,3,5,254,164,3,6,254,164,3,7,254,164,3,8,254,164,3,9,254,164,3,10,254,164,3,11,254,164,3,12,254,164,3,13,254,164,3,14,254,164,3,15,255,149,3,16,255,91,3,17,255,2,4,5,164,0,4,6,164,0,4,7,164,0,4,8,164,0,4,9,164,0,4,10,164,0,4,11,164,0,4,12,164,0,4,13,164,0,4,14,164,0,4,15,164,0],
secondary:!1},{width:10,bonus:335,chr:"k",
pixels:[2,0,255,255,2,1,255,255,2,2,255,255,2,3,255,255,2,4,255,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,2,11,255,255,2,12,255,255,2,13,255,255,3,0,163,255,3,1,254,164,3,2,254,164,3,3,254,164,3,4,254,164,3,5,254,164,3,6,254,164,3,7,254,164,3,8,254,192,3,9,255,255,3,10,255,179,3,11,254,164,3,12,254,164,3,13,254,164,3,14,255,0,4,1,164,0,4,2,164,0,4,3,164,0,4,4,164,0,4,5,164,0,4,6,164,0,4,7,188,94,4,8,249,243,4,9,231,178,4,10,255,0,4,11,179,0,4,12,164,0,4,13,164,0,4,14,164,0,5,7,251,255,5,8,248,252,5,9,254,249,5,10,202,140,6,6,255,255,6,7,179,191,6,8,251,23,6,9,252,185,6,10,255,255,6,11,213,217,7,5,253,255,7,6,180,159,7,7,255,0,7,10,216,137,7,11,254,251,7,12,248,238,8,4,249,255,8,5,185,125,8,6,254,0,8,12,254,220,8,13,254,255,9,5,250,0,9,13,241,171,9,14,254,0],
secondary:!1},{width:5,bonus:215,chr:"l",
pixels:[2,0,255,255,2,1,255,255,2,2,255,255,2,3,255,255,2,4,255,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,2,11,255,255,2,12,255,255,2,13,255,255,3,0,163,255,3,1,254,164,3,2,254,164,3,3,254,164,3,4,254,164,3,5,254,164,3,6,254,164,3,7,254,164,3,8,254,164,3,9,254,164,3,10,254,164,3,11,254,164,3,12,254,164,3,13,254,164,3,14,255,0,4,1,164,0,4,2,164,0,4,3,164,0,4,4,164,0,4,5,164,0,4,6,164,0,4,7,164,0,4,8,164,0,4,9,164,0,4,10,164,0,4,11,164,0,4,12,164,0,4,13,164,0,4,14,164,0],
secondary:!1},{width:17,bonus:490,chr:"m",
pixels:[2,4,255,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,2,11,255,255,2,12,255,255,2,13,255,255,3,5,254,215,3,6,255,247,3,7,255,193,3,8,254,168,3,9,254,164,3,10,254,164,3,11,254,164,3,12,254,164,3,13,254,164,3,14,255,0,4,5,235,240,4,6,218,29,4,7,247,0,4,8,193,0,4,9,168,0,4,10,164,0,4,11,164,0,4,12,164,0,4,13,164,0,4,14,164,0,5,4,215,255,5,5,168,178,5,6,222,0,6,4,247,255,6,5,232,116,7,4,215,255,7,5,253,219,8,5,254,255,8,6,255,255,8,7,255,255,8,8,255,255,8,9,255,255,8,10,255,255,8,11,255,255,8,12,255,255,8,13,255,255,9,5,202,216,9,6,255,249,9,7,254,192,9,8,255,167,9,9,254,164,9,10,254,164,9,11,254,164,9,12,254,164,9,13,254,164,9,14,255,0,10,5,222,254,10,6,179,38,10,7,249,0,10,8,192,0,10,9,167,0,10,10,164,0,10,11,164,0,10,12,164,0,10,13,164,0,10,14,164,0,11,4,219,255,11,5,177,167,11,6,222,0,12,4,245,255,12,5,234,115,13,4,211,255,13,5,253,219,14,5,255,255,14,6,255,255,14,7,255,255,14,8,255,255,14,9,255,255,14,10,255,255,14,11,255,255,14,12,255,255,14,13,255,255,15,6,255,137,15,7,255,160,15,8,254,164,15,9,254,164,15,10,254,164,15,11,254,164,15,12,254,164,15,13,254,164,15,14,255,0,16,8,160,0,16,9,164,0,16,10,164,0,16,11,164,0,16,12,164,0,16,13,164,0,16,14,164,0],
secondary:!1},{width:11,bonus:320,chr:"n",
pixels:[2,4,255,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,2,11,255,255,2,12,255,255,2,13,255,255,3,5,254,213,3,6,254,251,3,7,255,196,3,8,254,168,3,9,254,164,3,10,254,164,3,11,254,164,3,12,254,164,3,13,254,164,3,14,255,0,4,5,241,245,4,6,218,40,4,7,250,0,4,8,196,0,4,9,168,0,4,10,164,0,4,11,164,0,4,12,164,0,4,13,164,0,4,14,164,0,5,4,209,255,5,5,169,187,5,6,232,0,6,4,247,255,6,5,227,112,7,4,221,255,7,5,253,180,8,5,255,255,8,6,244,230,8,7,172,254,8,8,163,255,8,9,163,255,8,10,163,255,8,11,163,255,8,12,163,255,8,13,163,255,9,5,196,169,9,6,254,219,9,7,254,250,9,8,255,255,9,9,255,255,9,10,255,255,9,11,255,255,9,12,255,255,9,13,255,255,9,14,164,0,10,7,218,0,10,8,249,0,10,9,255,0,10,10,255,0,10,11,255,0,10,12,255,0,10,13,255,0,10,14,255,0],
secondary:!1},{width:11,bonus:300,chr:"o",
pixels:[1,7,215,255,1,8,247,255,1,9,243,255,1,10,208,255,2,5,221,255,2,6,255,255,2,7,235,230,2,8,243,186,2,9,253,180,2,10,253,217,2,11,255,255,2,12,231,231,3,5,246,254,3,6,230,74,3,7,255,0,3,8,212,0,3,9,177,0,3,10,178,0,3,11,227,82,3,12,254,249,3,13,234,154,4,4,227,255,4,5,207,170,4,6,246,0,4,12,173,208,4,13,254,225,5,4,249,255,5,5,239,107,5,13,252,252,5,14,224,0,6,4,227,255,6,5,253,142,6,13,238,243,6,14,249,0,7,5,254,248,7,6,172,105,7,12,247,255,7,13,207,184,7,14,227,0,8,5,236,228,8,6,255,255,8,7,225,242,8,8,178,255,8,9,179,255,8,10,217,255,8,11,255,255,8,12,229,242,8,13,249,20,9,6,233,140,9,7,255,211,9,8,253,247,9,9,252,248,9,10,243,224,9,11,237,143,9,12,255,15,9,13,218,0,10,8,211,0,10,9,246,0,10,10,246,0,10,11,213,0],
secondary:!1},{width:12,bonus:400,chr:"p",
pixels:[2,4,255,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,2,11,255,255,2,12,255,255,2,13,255,255,2,14,255,255,2,15,255,255,2,16,255,255,2,17,255,255,3,5,255,213,3,6,254,252,3,7,255,197,3,8,254,171,3,9,255,169,3,10,254,201,3,11,254,252,3,12,254,225,3,13,255,155,3,14,255,163,3,15,254,164,3,16,254,164,3,17,254,164,3,18,255,0,4,5,241,244,4,6,219,43,4,7,252,0,4,8,197,0,4,9,170,0,4,10,169,0,4,11,208,48,4,12,254,237,4,13,235,100,4,14,155,0,4,15,163,0,4,16,164,0,4,17,164,0,4,18,164,0,5,4,209,255,5,5,169,189,5,6,231,0,5,13,251,215,6,4,247,255,6,5,228,113,6,13,252,252,6,14,212,0,7,4,229,255,7,5,253,172,7,12,171,255,7,13,239,245,7,14,249,0,8,5,255,255,8,6,223,181,8,11,163,255,8,12,255,255,8,13,217,165,8,14,229,0,9,5,220,205,9,6,255,255,9,7,255,255,9,8,255,255,9,9,255,255,9,10,255,255,9,11,255,255,9,12,225,197,9,13,255,8,10,6,194,76,10,7,255,127,10,8,254,156,10,9,255,155,10,10,254,126,10,11,255,56,10,12,255,0,10,13,174,0,11,9,156,0,11,10,155,0],
secondary:!1},{width:11,bonus:425,chr:"q",
pixels:[1,7,217,255,1,8,249,255,1,9,249,255,1,10,221,255,2,5,235,255,2,6,255,255,2,7,237,230,2,8,244,186,2,9,253,176,2,10,254,210,2,11,255,255,2,12,249,247,3,4,179,255,3,5,243,253,3,6,240,68,3,7,255,0,3,8,214,0,3,9,178,0,3,10,175,0,3,11,219,66,3,12,255,239,3,13,251,190,4,4,241,255,4,5,218,151,4,6,241,0,4,12,157,208,4,13,254,246,4,14,187,0,5,4,241,255,5,5,247,106,5,13,248,248,5,14,245,0,6,4,175,255,6,5,250,168,6,12,154,255,6,13,206,216,6,14,241,0,7,5,245,235,7,6,213,161,7,12,221,255,7,13,167,50,7,14,175,0,8,4,189,255,8,5,239,253,8,6,255,255,8,7,255,255,8,8,255,255,8,9,255,255,8,10,255,255,8,11,255,255,8,12,251,251,8,13,254,252,8,14,255,255,8,15,255,255,8,16,255,255,8,17,255,255,9,4,163,255,9,5,231,181,9,6,248,168,9,7,254,164,9,8,254,164,9,9,254,164,9,10,254,164,9,11,254,164,9,12,254,164,9,13,251,166,9,14,253,165,9,15,254,164,9,16,254,164,9,17,254,164,9,18,255,0,10,5,164,0,10,6,164,0,10,7,164,0,10,8,164,0,10,9,164,0,10,10,164,0,10,11,164,0,10,12,164,0,10,13,164,0,10,14,164,0,10,15,164,0,10,16,164,0,10,17,164,0,10,18,164,0],
secondary:!1},{width:8,bonus:180,chr:"r",
pixels:[2,4,255,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,2,11,255,255,2,12,255,255,2,13,255,255,3,5,255,169,3,6,255,255,3,7,254,213,3,8,255,169,3,9,254,164,3,10,254,164,3,11,254,164,3,12,254,164,3,13,254,164,3,14,255,0,4,5,245,249,4,6,198,111,4,7,255,0,4,8,212,0,4,9,169,0,4,10,164,0,4,11,164,0,4,12,164,0,4,13,164,0,4,14,164,0,5,4,199,255,5,5,170,220,5,6,240,0,6,4,247,255,6,5,220,112,7,5,250,61],
secondary:!1},{width:9,bonus:235,chr:"s",
pixels:[1,5,173,255,1,6,241,255,1,7,193,255,1,12,231,255,2,5,250,255,2,6,231,198,2,7,255,247,2,8,238,199,2,13,251,217,3,4,221,255,3,5,201,174,3,6,250,0,3,7,208,119,3,8,255,255,3,9,199,62,3,13,249,248,3,14,214,0,4,4,247,255,4,5,233,104,4,8,238,243,4,9,254,156,4,13,248,251,4,14,242,0,5,4,233,255,5,5,251,119,5,9,254,248,5,10,170,54,5,12,155,255,5,13,229,237,5,14,244,0,6,4,191,255,6,5,249,189,6,9,249,249,6,10,254,231,6,11,195,242,6,12,255,255,6,13,203,154,6,14,213,0,7,5,216,118,7,6,184,0,7,10,253,225,7,11,254,246,7,12,229,180,7,13,255,7,8,11,223,0,8,12,245,0,8,13,162,0],
secondary:!1},{width:8,bonus:205,chr:"t",
pixels:[1,4,187,255,2,4,255,255,2,5,239,208,2,6,195,214,2,7,163,255,2,8,163,255,2,9,163,255,2,10,163,255,3,2,255,255,3,3,255,255,3,4,255,255,3,5,255,255,3,6,255,255,3,7,255,255,3,8,255,255,3,9,255,255,3,10,255,255,3,11,255,255,3,12,255,255,3,13,164,190,4,3,255,0,4,4,255,255,4,5,254,88,4,6,255,0,4,7,255,0,4,8,255,0,4,9,255,0,4,10,255,0,4,11,255,24,4,12,255,187,4,13,254,225,5,4,255,255,5,5,254,88,5,13,253,250,5,14,224,0,6,4,255,255,6,5,254,88,6,13,231,242,6,14,248,0,7,5,255,0,7,14,219,0],
secondary:!1},{width:11,bonus:320,chr:"u",
pixels:[1,4,255,255,1,5,255,255,1,6,255,255,1,7,255,255,1,8,255,255,1,9,255,255,1,10,253,255,1,11,231,255,2,4,163,255,2,5,254,164,2,6,254,164,2,7,254,164,2,8,254,164,2,9,254,164,2,10,254,171,2,11,254,219,2,12,255,255,2,13,206,172,3,5,164,0,3,6,164,0,3,7,164,0,3,8,164,0,3,9,164,0,3,10,164,0,3,11,170,2,3,12,243,184,3,13,254,225,4,13,252,251,4,14,224,0,5,13,229,237,5,14,248,0,6,12,231,255,6,13,172,141,6,14,213,0,7,4,163,255,7,5,163,255,7,6,163,255,7,7,163,255,7,8,163,255,7,9,167,255,7,10,197,255,7,11,251,255,7,12,223,249,7,13,242,114,8,4,255,255,8,5,255,255,8,6,255,255,8,7,255,255,8,8,255,255,8,9,255,255,8,10,255,255,8,11,255,255,8,12,255,255,8,13,255,255,9,5,255,0,9,6,255,0,9,7,255,0,9,8,255,0,9,9,255,0,9,10,255,0,9,11,255,0,9,12,255,0,9,13,255,0,9,14,255,0],
secondary:!1},{width:9,bonus:230,chr:"v",
pixels:[0,4,209,255,1,4,221,255,1,5,255,255,1,6,253,253,1,7,192,246,2,5,229,62,2,6,255,145,2,7,255,231,2,8,255,255,2,9,247,251,2,10,164,249,3,8,237,71,3,9,255,155,3,10,254,237,3,11,255,255,3,12,233,247,4,10,156,5,4,11,243,98,4,12,255,227,4,13,255,255,5,10,203,255,5,11,255,255,5,12,249,251,5,13,246,172,5,14,255,0,6,7,197,255,6,8,253,255,6,9,254,255,6,10,221,221,6,11,224,112,6,12,255,14,6,13,246,0,6,14,166,0,7,4,185,255,7,5,251,255,7,6,255,255,7,7,233,238,7,8,225,141,7,9,254,32,7,10,254,0,7,11,192,0,8,4,237,255,8,5,225,170,8,6,253,56,8,7,255,0,8,8,218,0],
secondary:!1},{width:14,bonus:430,chr:"w",
pixels:[0,4,171,255,1,4,241,255,1,5,255,255,1,6,255,255,1,7,227,251,1,8,155,255,2,5,244,55,2,6,255,116,2,7,255,179,2,8,253,241,2,9,255,255,2,10,254,255,2,11,213,251,3,8,180,3,3,9,243,51,3,10,255,110,3,11,254,170,3,12,252,247,3,13,255,255,4,10,198,237,4,11,247,250,4,12,254,255,4,13,253,205,4,14,255,0,5,7,213,255,5,8,255,255,5,9,250,254,5,10,214,218,5,11,213,125,5,12,243,28,5,13,254,0,5,14,203,0,6,4,233,255,6,5,254,255,6,6,224,245,6,7,208,191,6,8,227,95,6,9,255,13,6,10,249,0,6,11,183,0,7,4,253,255,7,5,254,248,7,6,254,186,7,7,234,133,7,8,176,72,8,5,255,100,8,6,252,177,8,7,252,246,8,8,255,255,8,9,234,250,8,10,157,255,9,7,177,9,9,8,246,72,9,9,254,144,9,10,251,219,9,11,255,255,9,12,251,254,9,13,192,251,10,10,176,110,10,11,239,165,10,12,254,245,10,13,255,255,10,14,189,0,11,8,207,255,11,9,253,255,11,10,255,255,11,11,242,250,11,12,221,196,11,13,249,105,11,14,255,0,12,4,205,255,12,5,253,255,12,6,255,255,12,7,250,253,12,8,226,213,12,9,230,134,12,10,253,52,12,11,255,2,12,12,237,0,12,13,170,0,13,4,209,255,13,5,233,154,13,6,253,71,13,7,255,10,13,8,248,0,13,9,189,0],
secondary:!1},{width:10,bonus:260,chr:"x",
pixels:[1,4,249,255,1,12,166,255,1,13,255,255,2,4,155,255,2,5,255,255,2,6,229,227,2,11,229,255,2,12,246,254,2,13,205,140,2,14,255,0,3,5,182,97,3,6,254,225,3,7,253,250,3,9,155,255,3,10,255,255,3,11,213,235,3,12,232,41,3,13,246,0,4,7,244,177,4,8,255,255,4,9,255,255,4,10,204,155,4,11,255,2,4,12,196,0,5,7,242,255,5,8,246,238,5,9,255,245,5,10,254,222,5,11,157,105,6,5,190,255,6,6,255,255,6,7,199,207,6,8,243,17,6,9,233,41,6,10,253,201,6,11,254,255,6,12,177,217,7,4,245,255,7,5,236,252,7,6,211,97,7,7,255,0,7,8,162,0,7,11,226,139,7,12,254,251,7,13,242,236,8,4,172,255,8,5,245,22,8,6,233,0,8,13,254,212,8,14,224,0,9,5,172,0,9,14,211,0],
secondary:!1},{width:9,bonus:310,chr:"y",
pixels:[0,4,241,255,0,5,154,248,0,17,231,255,1,4,179,255,1,5,254,252,1,6,255,255,1,7,210,243,1,17,249,251,1,18,231,0,2,5,186,35,2,6,254,119,2,7,255,215,2,8,255,255,2,9,245,249,2,16,219,255,2,17,218,224,2,18,245,0,3,8,224,64,3,9,255,152,3,10,253,238,3,11,255,255,3,12,207,243,3,14,158,255,3,15,247,255,3,16,236,252,3,17,227,54,3,18,192,0,4,10,160,33,4,11,248,159,4,12,255,253,4,13,255,255,4,14,248,251,4,15,213,173,4,16,249,27,4,17,234,0,5,9,179,255,5,10,249,255,5,11,255,255,5,12,230,214,5,13,254,97,5,14,255,12,5,15,244,0,6,6,161,255,6,7,241,255,6,8,255,255,6,9,235,244,6,10,218,152,6,11,250,36,6,12,255,0,6,13,193,0,7,4,231,255,7,5,255,255,7,6,248,252,7,7,222,190,7,8,246,71,7,9,255,2,7,10,225,0,8,4,199,255,8,5,241,108,8,6,255,15,8,7,246,0,8,8,165,0],
secondary:!1},{width:9,bonus:260,chr:"z",
pixels:[1,4,255,255,1,12,193,255,1,13,255,255,2,4,255,255,2,5,254,88,2,11,241,255,2,12,230,252,2,13,255,255,2,14,255,0,3,4,255,255,3,5,254,88,3,9,179,255,3,10,249,255,3,11,168,171,3,12,246,92,3,13,255,255,3,14,255,0,4,4,255,255,4,5,254,88,4,8,235,255,4,9,222,252,4,10,194,67,4,11,249,0,4,12,161,139,4,13,255,255,4,14,255,0,5,4,255,255,5,5,255,104,5,6,195,214,5,7,255,255,5,8,194,217,5,9,236,14,5,10,219,0,5,13,255,255,5,14,255,0,6,4,255,255,6,5,255,251,6,6,248,251,6,7,198,125,6,8,255,0,6,9,165,0,6,13,255,255,6,14,255,0,7,4,255,255,7,5,255,209,7,6,252,41,7,7,244,0,7,13,255,255,7,14,255,0,8,5,255,0,8,6,209,0,8,14,255,0],
secondary:!1},{width:12,bonus:345,chr:"A",
pixels:[0,13,207,255,1,10,166,255,1,11,247,255,1,12,255,255,1,13,232,237,1,14,207,0,2,8,223,255,2,9,255,255,2,10,252,254,2,11,226,196,2,12,249,68,2,13,255,0,2,14,216,0,3,5,185,255,3,6,253,255,3,7,255,255,3,8,239,239,3,9,255,255,3,10,255,93,3,11,252,0,3,12,174,0,4,3,235,255,4,4,255,255,4,5,238,246,4,6,224,160,4,7,253,49,4,8,255,36,4,9,255,255,4,10,255,84,5,1,255,255,5,2,252,254,5,3,209,181,5,4,240,65,5,5,255,2,5,6,229,0,5,9,255,255,5,10,255,84,6,1,172,255,6,2,254,251,6,3,255,251,6,4,226,212,6,9,255,255,6,10,255,84,7,2,178,30,7,3,252,114,7,4,254,213,7,5,255,255,7,6,251,254,7,7,184,248,7,9,255,255,7,10,255,84,8,5,221,62,8,6,255,153,8,7,255,241,8,8,255,255,8,9,255,255,8,10,254,186,9,7,157,17,9,8,245,97,9,9,254,192,9,10,254,255,9,11,255,255,9,12,220,243,10,10,200,44,10,11,254,133,10,12,254,228,10,13,255,255,11,13,236,80,11,14,255,0],
secondary:!1},{width:12,bonus:475,chr:"B",
pixels:[2,1,255,255,2,2,255,255,2,3,255,255,2,4,255,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,2,11,255,255,2,12,255,255,2,13,255,255,3,1,255,255,3,2,255,195,3,3,254,164,3,4,254,164,3,5,254,164,3,6,255,171,3,7,255,255,3,8,254,189,3,9,254,164,3,10,254,164,3,11,254,164,3,12,255,195,3,13,255,255,3,14,255,0,4,1,255,255,4,2,254,88,4,3,195,0,4,4,164,0,4,5,164,0,4,6,171,30,4,7,255,255,4,8,255,68,4,9,188,0,4,10,164,0,4,11,164,0,4,12,195,115,4,13,255,255,4,14,255,0,5,1,255,255,5,2,254,88,5,7,255,255,5,8,255,68,5,13,255,255,5,14,255,0,6,1,245,255,6,2,255,105,6,7,255,255,6,8,254,76,6,13,253,253,6,14,255,0,7,1,219,255,7,2,251,152,7,7,255,255,7,8,255,108,7,13,236,244,7,14,252,0,8,1,158,255,8,2,253,246,8,3,181,108,8,6,207,255,8,7,205,231,8,8,255,205,8,12,219,255,8,13,215,210,8,14,226,0,9,2,250,246,9,3,255,255,9,4,255,255,9,5,255,255,9,6,221,246,9,7,212,32,9,8,250,240,9,9,248,228,9,10,180,251,9,11,231,255,9,12,254,255,9,13,227,65,9,14,177,0,10,3,248,135,10,4,255,155,10,5,255,115,10,6,255,15,10,7,214,0,10,9,251,208,10,10,254,248,10,11,242,227,10,12,238,94,10,13,254,0,11,5,155,0,11,10,205,0,11,11,247,0,11,12,216,0],
secondary:!1},{width:11,bonus:290,chr:"C",
pixels:[1,5,191,255,1,6,231,255,1,7,251,255,1,8,239,255,1,9,202,255,2,3,217,255,2,4,255,255,2,5,241,244,2,6,236,196,2,7,247,173,2,8,254,182,2,9,253,229,2,10,255,255,2,11,248,248,3,2,221,255,3,3,235,251,3,4,229,89,3,5,255,1,3,6,231,0,3,7,182,0,3,8,167,0,3,9,181,0,3,10,234,72,3,11,254,221,3,12,255,247,4,2,247,255,4,3,227,45,4,4,231,0,4,12,253,243,4,13,252,159,5,1,205,255,5,2,200,195,5,3,247,0,5,12,159,235,5,13,253,225,5,14,157,0,6,1,239,255,6,2,225,113,6,3,153,0,6,13,252,252,6,14,224,0,7,1,243,255,7,2,246,108,7,13,248,251,7,14,249,0,8,1,219,255,8,2,251,151,8,13,233,240,8,14,244,0,9,1,158,255,9,2,251,231,9,12,185,255,9,13,208,198,9,14,220,0,10,2,171,52,10,3,228,0,10,13,185,0,10,14,161,0],
secondary:!1},{width:13,bonus:445,chr:"D",
pixels:[2,1,255,255,2,2,255,255,2,3,255,255,2,4,255,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,2,11,255,255,2,12,255,255,2,13,255,255,3,1,255,255,3,2,255,195,3,3,254,164,3,4,254,164,3,5,254,164,3,6,254,164,3,7,254,164,3,8,254,164,3,9,254,164,3,10,254,164,3,11,254,164,3,12,255,195,3,13,255,255,3,14,255,0,4,1,255,255,4,2,254,88,4,3,195,0,4,4,164,0,4,5,164,0,4,6,164,0,4,7,164,0,4,8,164,0,4,9,164,0,4,10,164,0,4,11,164,0,4,12,195,115,4,13,255,255,4,14,255,0,5,1,255,255,5,2,255,89,5,13,254,254,5,14,255,0,6,1,241,255,6,2,255,105,6,13,243,249,6,14,253,0,7,1,209,255,7,2,250,162,7,12,175,255,7,13,220,225,7,14,237,0,8,2,253,247,8,3,171,51,8,12,251,255,8,13,211,138,8,14,194,0,9,2,244,244,9,3,254,224,9,11,233,255,9,12,226,248,9,13,252,12,10,3,253,234,10,4,255,255,10,5,233,246,10,6,179,255,10,7,167,255,10,8,184,255,10,9,233,255,10,10,255,255,10,11,231,242,10,12,237,43,10,13,220,0,11,4,243,132,11,5,255,201,11,6,253,241,11,7,253,252,11,8,247,241,11,9,237,205,11,10,242,117,11,11,255,11,11,12,219,0,12,6,201,0,12,7,239,0,12,8,250,0,12,9,234,0,12,10,190,0],
secondary:!1},{width:10,bonus:340,chr:"E",
pixels:[2,1,255,255,2,2,255,255,2,3,255,255,2,4,255,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,2,11,255,255,2,12,255,255,2,13,255,255,3,1,255,255,3,2,255,195,3,3,254,164,3,4,254,164,3,5,254,164,3,6,255,171,3,7,255,255,3,8,254,189,3,9,254,164,3,10,254,164,3,11,254,164,3,12,255,195,3,13,255,255,3,14,255,0,4,1,255,255,4,2,254,88,4,3,195,0,4,4,164,0,4,5,164,0,4,6,171,30,4,7,255,255,4,8,255,68,4,9,188,0,4,10,164,0,4,11,164,0,4,12,195,115,4,13,255,255,4,14,255,0,5,1,255,255,5,2,254,88,5,7,255,255,5,8,255,68,5,13,255,255,5,14,255,0,6,1,255,255,6,2,254,88,6,7,255,255,6,8,255,68,6,13,255,255,6,14,255,0,7,1,255,255,7,2,254,88,7,7,255,255,7,8,255,68,7,13,255,255,7,14,255,0,8,1,255,255,8,2,254,88,8,7,230,252,8,8,255,60,8,13,255,255,8,14,255,0,9,2,255,19,9,8,228,0,9,14,255,0],
secondary:!1},{width:10,bonus:295,chr:"F",
pixels:[2,1,255,255,2,2,255,255,2,3,255,255,2,4,255,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,2,11,255,255,2,12,255,255,2,13,255,255,3,1,255,255,3,2,255,195,3,3,254,164,3,4,254,164,3,5,254,164,3,6,255,171,3,7,255,255,3,8,254,189,3,9,254,164,3,10,254,164,3,11,254,164,3,12,254,164,3,13,254,164,3,14,255,0,4,1,255,255,4,2,254,88,4,3,195,0,4,4,164,0,4,5,164,0,4,6,171,30,4,7,255,255,4,8,255,68,4,9,188,0,4,10,164,0,4,11,164,0,4,12,164,0,4,13,164,0,4,14,164,0,5,1,255,255,5,2,254,88,5,7,255,255,5,8,255,68,6,1,255,255,6,2,254,88,6,7,255,255,6,8,255,68,7,1,255,255,7,2,254,88,7,7,255,255,7,8,255,68,8,1,255,255,8,2,254,88,8,7,226,252,8,8,255,59,9,2,255,19,9,8,224,0],
secondary:!1},{width:13,bonus:415,chr:"G",
pixels:[1,5,185,255,1,6,227,255,1,7,249,255,1,8,239,255,1,9,199,255,2,3,195,255,2,4,255,255,2,5,244,248,2,6,236,199,2,7,246,173,2,8,253,182,2,9,253,232,2,10,255,255,2,11,243,243,3,2,191,255,3,3,245,254,3,4,218,118,3,5,255,4,3,6,237,0,3,7,184,0,3,8,167,0,3,9,181,2,3,10,238,84,3,11,255,231,3,12,253,238,4,2,255,255,4,3,209,86,4,4,244,0,4,12,255,251,4,13,246,140,5,1,179,255,5,2,207,225,5,3,255,0,5,12,185,233,5,13,254,210,6,1,223,255,6,2,213,137,6,3,183,0,6,13,251,248,6,14,210,0,7,1,247,255,7,2,235,102,7,7,208,255,7,13,254,254,7,14,244,0,8,1,235,255,8,2,251,117,8,7,255,255,8,8,221,78,8,13,247,251,8,14,253,0,9,1,208,255,9,2,247,166,9,7,255,255,9,8,255,68,9,13,231,238,9,14,243,0,10,2,250,236,10,3,161,2,10,7,255,255,10,8,255,255,10,9,255,255,10,10,255,255,10,11,255,255,10,12,255,255,10,13,215,191,10,14,215,0,11,2,157,49,11,3,232,0,11,7,170,246,11,8,254,164,11,9,254,164,11,10,254,164,11,11,254,164,11,12,254,164,11,13,255,71,11,14,161,0,12,8,164,0,12,9,164,0,12,10,164,0,12,11,164,0,12,12,164,0,12,13,164,0],
secondary:!1},{width:14,bonus:450,chr:"H",
pixels:[2,1,255,255,2,2,255,255,2,3,255,255,2,4,255,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,2,11,255,255,2,12,255,255,2,13,255,255,3,1,163,255,3,2,254,164,3,3,254,164,3,4,254,164,3,5,254,164,3,6,255,171,3,7,255,255,3,8,254,189,3,9,254,164,3,10,254,164,3,11,254,164,3,12,254,164,3,13,254,164,3,14,255,0,4,2,164,0,4,3,164,0,4,4,164,0,4,5,164,0,4,6,171,30,4,7,255,255,4,8,255,68,4,9,188,0,4,10,164,0,4,11,164,0,4,12,164,0,4,13,164,0,4,14,164,0,5,7,255,255,5,8,255,68,6,7,255,255,6,8,255,68,7,7,255,255,7,8,255,68,8,7,255,255,8,8,255,68,9,7,255,255,9,8,255,68,10,1,163,255,10,2,163,255,10,3,163,255,10,4,163,255,10,5,163,255,10,6,171,255,10,7,255,255,10,8,254,189,10,9,188,222,10,10,163,255,10,11,163,255,10,12,163,255,10,13,163,255,11,1,255,255,11,2,255,255,11,3,255,255,11,4,255,255,11,5,255,255,11,6,255,255,11,7,255,255,11,8,255,255,11,9,255,255,11,10,255,255,11,11,255,255,11,12,255,255,11,13,255,255,11,14,164,0,12,2,255,0,12,3,255,0,12,4,255,0,12,5,255,0,12,6,255,0,12,7,255,0,12,8,255,0,12,9,255,0,12,10,255,0,12,11,255,0,12,12,255,0,12,13,255,0,12,14,255,0],
secondary:!1},{width:7,bonus:250,chr:"I",
pixels:[1,1,253,255,1,13,253,255,2,1,255,255,2,2,254,189,2,3,171,244,2,4,163,255,2,5,163,255,2,6,163,255,2,7,163,255,2,8,163,255,2,9,163,255,2,10,163,255,2,11,163,255,2,12,185,255,2,13,255,255,2,14,254,0,3,1,255,255,3,2,255,255,3,3,255,255,3,4,255,255,3,5,255,255,3,6,255,255,3,7,255,255,3,8,255,255,3,9,255,255,3,10,255,255,3,11,255,255,3,12,255,255,3,13,255,255,3,14,255,0,4,1,255,255,4,2,255,56,4,3,255,0,4,4,255,0,4,5,255,0,4,6,255,0,4,7,255,0,4,8,255,0,4,9,255,0,4,10,255,0,4,11,255,0,4,12,254,52,4,13,255,255,4,14,255,0,5,1,253,255,5,2,255,10,5,13,253,255,5,14,255,0,6,2,253,0,6,14,253,0],
secondary:!1},{width:5,bonus:255,chr:"J",
pixels:[0,16,255,255,0,17,255,57,1,15,159,255,1,16,251,255,1,17,255,17,2,1,255,255,2,2,255,255,2,3,255,255,2,4,255,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,2,11,255,255,2,12,255,255,2,13,255,255,2,14,255,255,2,15,255,255,2,16,206,156,2,17,251,0,3,1,163,255,3,2,254,164,3,3,254,164,3,4,254,164,3,5,254,164,3,6,254,164,3,7,254,164,3,8,254,164,3,9,254,164,3,10,254,164,3,11,254,164,3,12,254,164,3,13,255,161,3,14,255,133,3,15,255,61,3,16,255,0,4,2,164,0,4,3,164,0,4,4,164,0,4,5,164,0,4,6,164,0,4,7,164,0,4,8,164,0,4,9,164,0,4,10,164,0,4,11,164,0,4,12,164,0,4,13,164,0,4,14,161,0],
secondary:!1},{width:11,bonus:385,chr:"K",
pixels:[2,1,255,255,2,2,255,255,2,3,255,255,2,4,255,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,2,11,255,255,2,12,255,255,2,13,255,255,3,1,163,255,3,2,254,164,3,3,254,164,3,4,254,164,3,5,254,164,3,6,254,164,3,7,254,237,3,8,255,237,3,9,254,164,3,10,254,164,3,11,254,164,3,12,254,164,3,13,254,164,3,14,255,0,4,2,164,0,4,3,164,0,4,4,164,0,4,5,164,2,4,6,213,166,4,7,252,250,4,8,239,62,4,9,237,0,4,10,164,0,4,11,164,0,4,12,164,0,4,13,164,0,4,14,164,0,5,5,166,255,5,6,255,255,5,7,254,255,5,8,252,138,6,4,190,255,6,5,246,254,6,6,200,124,6,7,254,186,6,8,255,255,6,9,229,222,7,3,211,255,7,4,238,254,7,5,204,72,7,6,246,0,7,8,217,138,7,9,254,251,7,10,251,243,8,2,227,255,8,3,227,251,8,4,218,47,8,5,237,0,8,10,254,219,8,11,255,255,8,12,185,208,9,1,239,255,9,2,217,246,9,3,230,29,9,4,224,0,9,11,241,168,9,12,255,255,9,13,236,226,10,1,190,255,10,2,241,15,10,3,209,0,10,12,191,116,10,13,255,239,10,14,209,0],
secondary:!1},{width:10,bonus:250,chr:"L",
pixels:[2,1,255,255,2,2,255,255,2,3,255,255,2,4,255,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,2,11,255,255,2,12,255,255,2,13,255,255,3,1,163,255,3,2,254,164,3,3,254,164,3,4,254,164,3,5,254,164,3,6,254,164,3,7,254,164,3,8,254,164,3,9,254,164,3,10,254,164,3,11,254,164,3,12,255,207,3,13,255,255,3,14,255,0,4,2,164,0,4,3,164,0,4,4,164,0,4,5,164,0,4,6,164,0,4,7,164,0,4,8,164,0,4,9,164,0,4,10,164,0,4,11,164,0,4,12,206,148,4,13,255,255,4,14,255,0,5,13,255,255,5,14,255,0,6,13,255,255,6,14,255,0,7,13,255,255,7,14,255,0,8,13,255,255,8,14,255,0,9,13,156,111,9,14,255,0],
secondary:!1},{width:17,bonus:640,chr:"M",
pixels:[2,1,255,255,2,2,255,255,2,3,255,255,2,4,255,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,2,11,255,255,2,12,255,255,2,13,255,255,3,1,255,255,3,2,254,249,3,3,255,179,3,4,254,164,3,5,254,164,3,6,254,164,3,7,254,164,3,8,254,164,3,9,254,164,3,10,254,164,3,11,254,164,3,12,254,164,3,13,254,164,3,14,255,0,4,1,197,255,4,2,255,255,4,3,255,247,4,4,229,188,4,5,190,101,4,6,165,6,4,7,164,0,4,8,164,0,4,9,164,0,4,10,164,0,4,11,164,0,4,12,164,0,4,13,164,0,4,14,164,0,5,2,206,45,5,3,255,130,5,4,253,223,5,5,255,255,5,6,238,248,6,5,230,69,6,6,254,156,6,7,253,241,6,8,255,255,6,9,219,246,7,7,159,13,7,8,245,91,7,9,255,181,7,10,254,252,7,11,253,253,7,12,192,246,8,10,192,48,8,11,254,204,8,12,255,255,8,13,255,255,9,9,163,255,9,10,245,255,9,11,248,255,9,12,239,184,9,13,255,78,9,14,255,0,10,7,225,255,10,8,255,255,10,9,212,236,10,10,200,131,10,11,246,17,10,12,248,0,10,13,172,0,11,4,197,255,11,5,255,255,11,6,225,249,11,7,194,167,11,8,230,39,11,9,255,0,11,10,196,0,12,1,167,255,12,2,247,255,12,3,238,255,12,4,194,200,12,5,210,70,12,6,255,0,12,7,220,0,13,1,255,255,13,2,250,246,13,3,252,173,13,4,248,168,13,5,218,192,13,6,184,227,13,7,163,255,13,8,163,255,13,9,163,255,13,10,163,255,13,11,163,255,13,12,163,255,13,13,163,255,14,1,255,255,14,2,255,255,14,3,255,255,14,4,255,255,14,5,255,255,14,6,255,255,14,7,255,255,14,8,255,255,14,9,255,255,14,10,255,255,14,11,255,255,14,12,255,255,14,13,255,255,14,14,164,0,15,2,255,0,15,3,255,0,15,4,255,0,15,5,255,0,15,6,255,0,15,7,255,0,15,8,255,0,15,9,255,0,15,10,255,0,15,11,255,0,15,12,255,0,15,13,255,0,15,14,255,0],
secondary:!1},{width:14,bonus:480,chr:"N",
pixels:[2,1,255,255,2,2,255,255,2,3,255,255,2,4,255,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,2,11,255,255,2,12,255,255,2,13,255,255,3,1,255,255,3,2,255,255,3,3,254,210,3,4,254,164,3,5,254,164,3,6,254,164,3,7,254,164,3,8,254,164,3,9,254,164,3,10,254,164,3,11,254,164,3,12,254,164,3,13,254,164,3,14,255,0,4,2,255,225,4,3,255,253,4,4,237,166,4,5,171,30,4,6,164,0,4,7,164,0,4,8,164,0,4,9,164,0,4,10,164,0,4,11,164,0,4,12,164,0,4,13,164,0,4,14,164,0,5,3,240,135,5,4,255,245,5,5,249,245,6,5,251,170,6,6,255,255,6,7,230,234,7,6,188,82,7,7,255,205,7,8,255,255,7,9,194,226,8,8,225,113,8,9,255,233,8,10,252,248,9,10,245,145,9,11,255,249,9,12,239,239,10,1,163,255,10,2,163,255,10,3,163,255,10,4,163,255,10,5,163,255,10,6,163,255,10,7,163,255,10,8,163,255,10,9,163,255,10,10,168,248,10,11,229,223,10,12,255,255,10,13,255,255,11,1,255,255,11,2,255,255,11,3,255,255,11,4,255,255,11,5,255,255,11,6,255,255,11,7,255,255,11,8,255,255,11,9,255,255,11,10,255,255,11,11,255,255,11,12,255,255,11,13,255,255,11,14,255,0,12,2,255,0,12,3,255,0,12,4,255,0,12,5,255,0,12,6,255,0,12,7,255,0,12,8,255,0,12,9,255,0,12,10,255,0,12,11,255,0,12,12,255,0,12,13,255,0,12,14,255,0],
secondary:!1},{width:14,bonus:405,chr:"O",
pixels:[1,5,201,255,1,6,239,255,1,7,251,255,1,8,239,255,1,9,199,255,2,3,235,255,2,4,255,255,2,5,239,239,2,6,239,191,2,7,249,171,2,8,253,181,2,9,253,227,2,10,255,255,2,11,245,245,3,2,239,255,3,3,225,244,3,4,239,65,3,5,255,0,3,6,224,0,3,7,179,0,3,8,167,0,3,9,180,0,3,10,232,69,3,11,254,219,3,12,253,241,4,2,241,253,4,3,242,27,4,4,216,0,4,12,253,243,4,13,249,146,5,1,213,255,5,2,207,180,5,3,240,0,5,12,158,236,5,13,253,217,6,1,243,255,6,2,230,110,6,13,251,249,6,14,215,0,7,1,245,255,7,2,248,101,7,13,249,251,7,14,246,0,8,1,213,255,8,2,250,144,8,13,230,239,8,14,246,0,9,2,252,240,9,12,237,255,9,13,204,175,9,14,215,0,10,2,247,245,10,3,251,215,10,11,213,255,10,12,237,254,10,13,240,26,11,3,253,233,11,4,255,255,11,5,230,247,11,6,179,255,11,7,167,255,11,8,181,255,11,9,223,255,11,10,255,255,11,11,235,249,11,12,222,63,11,13,236,0,12,4,243,128,12,5,255,197,12,6,253,239,12,7,254,252,12,8,249,243,12,9,238,210,12,10,238,129,12,11,255,16,12,12,229,0,13,6,197,0,13,7,237,0,13,8,251,0,13,9,237,0,13,10,196,0],
secondary:!1},{width:11,bonus:360,chr:"P",
pixels:[2,1,255,255,2,2,255,255,2,3,255,255,2,4,255,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,2,11,255,255,2,12,255,255,2,13,255,255,3,1,255,255,3,2,255,195,3,3,254,164,3,4,254,164,3,5,254,164,3,6,254,164,3,7,255,171,3,8,255,255,3,9,254,189,3,10,254,164,3,11,254,164,3,12,254,164,3,13,254,164,3,14,255,0,4,1,255,255,4,2,254,88,4,3,195,0,4,4,164,0,4,5,164,0,4,6,164,0,4,7,171,30,4,8,255,255,4,9,255,68,4,10,188,0,4,11,164,0,4,12,164,0,4,13,164,0,4,14,164,0,5,1,251,255,5,2,255,97,5,8,255,255,5,9,255,61,6,1,231,255,6,2,253,136,6,8,255,255,6,9,255,33,7,1,173,255,7,2,253,237,7,7,193,255,7,8,227,244,7,9,255,0,8,2,254,252,8,3,254,245,8,4,195,244,8,5,181,255,8,6,235,255,8,7,253,255,8,8,211,93,8,9,217,0,9,3,254,197,9,4,254,246,9,5,252,247,9,6,237,209,9,7,240,74,9,8,253,0,10,4,196,0,10,5,246,0,10,6,244,0,10,7,194,0],
secondary:!1},{width:14,bonus:440,chr:"Q",
pixels:[1,5,201,255,1,6,239,255,1,7,251,255,1,8,239,255,1,9,199,255,2,3,235,255,2,4,255,255,2,5,239,239,2,6,239,191,2,7,249,171,2,8,253,181,2,9,253,227,2,10,255,255,2,11,245,245,3,2,239,255,3,3,225,244,3,4,239,65,3,5,255,0,3,6,224,0,3,7,179,0,3,8,167,0,3,9,180,0,3,10,232,69,3,11,254,219,3,12,254,240,4,2,241,253,4,3,242,27,4,4,216,0,4,12,253,243,4,13,248,146,5,1,213,255,5,2,207,180,5,3,240,0,5,12,158,236,5,13,253,217,6,1,243,255,6,2,230,110,6,13,251,249,6,14,215,0,7,1,245,255,7,2,248,101,7,13,255,255,7,14,248,43,8,1,213,255,8,2,250,144,8,13,255,255,8,14,254,240,9,2,252,240,9,12,237,255,9,13,219,202,9,14,255,227,9,15,254,251,10,2,247,245,10,3,251,215,10,11,213,255,10,12,242,254,10,13,240,24,10,14,183,43,10,15,251,222,10,16,255,255,11,3,253,233,11,4,255,255,11,5,230,247,11,6,179,255,11,7,167,255,11,8,181,255,11,9,223,255,11,10,255,255,11,11,237,249,11,12,222,59,11,13,241,0,11,16,248,215,11,17,255,0,12,4,243,128,12,5,255,197,12,6,253,239,12,7,253,252,12,8,245,236,12,9,237,210,12,10,238,118,12,11,255,16,12,12,232,0,12,17,210,0,13,6,197,0,13,7,237,0,13,8,250,0,13,9,227,0,13,10,195,0],
secondary:!1},{width:11,bonus:410,chr:"R",
pixels:[2,1,255,255,2,2,255,255,2,3,255,255,2,4,255,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,2,11,255,255,2,12,255,255,2,13,255,255,3,1,255,255,3,2,255,195,3,3,254,164,3,4,254,164,3,5,254,164,3,6,255,171,3,7,255,255,3,8,254,189,3,9,254,164,3,10,254,164,3,11,254,164,3,12,254,164,3,13,254,164,3,14,255,0,4,1,255,255,4,2,254,88,4,3,195,0,4,4,164,0,4,5,164,0,4,6,171,30,4,7,255,255,4,8,255,68,4,9,188,0,4,10,164,0,4,11,164,0,4,12,164,0,4,13,164,0,4,14,164,0,5,1,253,255,5,2,255,92,5,7,255,255,5,8,255,68,6,1,237,255,6,2,254,119,6,7,255,255,6,8,255,202,7,1,191,255,7,2,252,214,7,6,157,255,7,7,226,248,7,8,254,219,7,9,255,255,7,10,208,233,8,2,255,255,8,3,249,231,8,4,178,251,8,5,211,255,8,6,255,255,8,7,188,109,8,8,220,6,8,9,234,121,8,10,255,237,8,11,255,255,8,12,196,234,9,2,155,173,9,3,254,221,9,4,254,249,9,5,242,225,9,6,228,103,9,7,255,0,9,11,247,146,9,12,255,249,9,13,254,255,10,4,220,0,10,5,248,0,10,6,214,0,10,12,156,57,10,13,253,174,10,14,254,0],
secondary:!1},{width:10,bonus:310,chr:"S",
pixels:[1,3,227,255,1,4,243,255,1,5,193,255,1,12,233,255,1,13,154,255,2,2,255,255,2,3,228,234,2,4,248,190,2,5,255,245,2,6,253,247,2,12,156,254,2,13,251,219,2,14,154,0,3,1,190,255,3,2,209,232,3,3,255,3,3,4,210,0,3,5,198,67,3,6,255,251,3,7,251,170,3,13,251,249,3,14,216,0,4,1,233,255,4,2,217,125,4,3,190,0,4,6,180,227,4,7,254,251,4,8,176,32,4,13,252,253,4,14,245,0,5,1,245,255,5,2,242,106,5,7,255,255,5,8,252,122,5,13,235,243,5,14,250,0,6,1,223,255,6,2,251,137,6,7,217,243,6,8,255,237,6,12,211,255,6,13,211,208,6,14,224,0,7,1,171,255,7,2,249,214,7,8,254,255,7,9,253,235,7,10,182,243,7,11,223,255,7,12,252,254,7,13,221,58,7,14,172,0,8,2,202,120,8,3,209,0,8,9,254,221,8,10,254,250,8,11,241,223,8,12,234,85,8,13,252,0,9,10,220,0,9,11,249,0,9,12,211,0],
secondary:!1},{width:12,bonus:275,chr:"T",
pixels:[1,1,255,255,2,1,255,255,2,2,254,88,3,1,255,255,3,2,254,88,4,1,255,255,4,2,254,88,5,1,255,255,5,2,255,255,5,3,255,255,5,4,255,255,5,5,255,255,5,6,255,255,5,7,255,255,5,8,255,255,5,9,255,255,5,10,255,255,5,11,255,255,5,12,255,255,5,13,255,255,6,1,255,255,6,2,255,195,6,3,254,164,6,4,254,164,6,5,254,164,6,6,254,164,6,7,254,164,6,8,254,164,6,9,254,164,6,10,254,164,6,11,254,164,6,12,254,164,6,13,254,164,6,14,255,0,7,1,255,255,7,2,254,88,7,3,195,0,7,4,164,0,7,5,164,0,7,6,164,0,7,7,164,0,7,8,164,0,7,9,164,0,7,10,164,0,7,11,164,0,7,12,164,0,7,13,164,0,7,14,164,0,8,1,255,255,8,2,254,88,9,1,255,255,9,2,254,88,10,1,255,255,10,2,254,88,11,2,255,0],
secondary:!1},{width:14,bonus:410,chr:"U",
pixels:[2,1,255,255,2,2,255,255,2,3,255,255,2,4,255,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,249,255,2,10,219,255,3,1,163,255,3,2,254,164,3,3,254,164,3,4,254,164,3,5,254,164,3,6,254,164,3,7,254,164,3,8,254,164,3,9,255,171,3,10,254,212,3,11,255,255,3,12,234,228,4,2,164,0,4,3,164,0,4,4,164,0,4,5,164,0,4,6,164,0,4,7,164,0,4,8,164,0,4,9,164,0,4,10,171,0,4,11,224,93,4,12,255,253,4,13,233,144,5,12,191,215,5,13,255,215,6,13,252,251,6,14,215,0,7,13,249,251,7,14,248,0,8,12,161,255,8,13,228,234,8,14,246,0,9,12,253,255,9,13,207,154,9,14,209,0,10,1,163,255,10,2,163,255,10,3,163,255,10,4,163,255,10,5,163,255,10,6,163,255,10,7,163,255,10,8,163,255,10,9,172,255,10,10,211,255,10,11,255,255,10,12,222,236,10,13,253,9,11,1,255,255,11,2,255,255,11,3,255,255,11,4,255,255,11,5,255,255,11,6,255,255,11,7,255,255,11,8,255,255,11,9,253,252,11,10,243,231,11,11,235,146,11,12,255,13,11,13,205,0,12,2,255,0,12,3,255,0,12,4,255,0,12,5,255,0,12,6,255,0,12,7,255,0,12,8,255,0,12,9,255,0,12,10,250,0,12,11,220,0],
secondary:!1},{width:11,bonus:300,chr:"V",
pixels:[0,1,211,255,1,1,223,255,1,2,255,255,1,3,254,255,1,4,204,246,2,2,230,62,2,3,255,145,2,4,255,231,2,5,255,255,2,6,252,253,2,7,185,247,3,5,237,72,3,6,254,156,3,7,254,239,3,8,255,255,3,9,247,252,3,10,169,249,4,7,158,10,4,8,243,81,4,9,254,164,4,10,254,240,4,11,255,255,4,12,241,249,5,10,181,68,5,11,250,176,5,12,254,255,5,13,255,255,6,9,215,255,6,10,255,255,6,11,253,255,6,12,234,208,6,13,254,101,6,14,255,0,7,6,208,255,7,7,255,255,7,8,255,255,7,9,230,227,7,10,233,126,7,11,255,27,7,12,253,0,7,13,191,0,8,3,197,255,8,4,253,255,8,5,255,255,8,6,236,237,8,7,232,142,8,8,255,39,8,9,255,0,8,10,205,0,9,1,251,255,9,2,255,255,9,3,241,244,9,4,229,160,9,5,254,54,9,6,255,0,9,7,219,0,10,1,158,255,10,2,253,69,10,3,255,3,10,4,231,0],
secondary:!1},{width:17,bonus:545,chr:"W",
pixels:[0,1,167,255,1,1,251,255,1,2,255,255,1,3,255,255,1,4,225,251,1,5,154,255,2,2,252,73,2,3,255,137,2,4,255,201,2,5,254,252,2,6,255,255,2,7,254,255,2,8,213,251,3,5,204,17,3,6,253,76,3,7,255,139,3,8,254,204,3,9,254,252,3,10,255,255,3,11,252,254,3,12,200,252,4,9,206,15,4,10,253,107,4,11,255,205,4,12,255,255,4,13,255,255,5,8,179,255,5,9,241,255,5,10,255,255,5,11,247,250,5,12,238,186,5,13,255,100,5,14,255,0,6,5,213,255,6,6,255,255,6,7,255,255,6,8,230,236,6,9,220,161,6,10,245,68,6,11,255,5,6,12,242,0,6,13,174,0,7,1,173,255,7,2,241,255,7,3,255,255,7,4,245,251,7,5,220,205,7,6,231,115,7,7,255,30,7,8,255,0,7,9,213,0,8,1,255,255,8,2,255,255,8,3,252,197,8,4,254,88,8,5,241,16,8,6,177,0,9,2,254,150,9,3,254,227,9,4,255,255,9,5,252,254,9,6,195,250,10,4,231,52,10,5,255,124,10,6,254,201,10,7,254,255,10,8,255,255,10,9,227,249,11,7,205,28,11,8,254,97,11,9,254,162,11,10,250,223,11,11,255,255,11,12,248,252,11,13,180,253,12,10,212,164,12,11,248,209,12,12,255,255,12,13,255,255,12,14,178,0,13,7,209,255,13,8,253,255,13,9,255,255,13,10,250,253,13,11,225,217,13,12,229,138,13,13,255,57,13,14,255,0,14,3,209,255,14,4,253,255,14,5,255,255,14,6,254,254,14,7,233,223,14,8,234,148,14,9,254,69,14,10,255,9,14,11,248,0,14,12,191,0,15,1,255,255,15,2,255,255,15,3,238,231,15,4,236,160,15,5,254,81,15,6,255,17,15,7,253,0,15,8,203,0,16,2,255,27,16,3,255,0,16,4,215,0],
secondary:!1},{width:11,bonus:325,chr:"X",
pixels:[0,13,155,255,1,1,255,255,1,2,203,222,1,12,231,255,1,13,246,254,1,14,155,0,2,2,255,243,2,3,251,245,2,10,184,255,2,11,255,255,2,12,205,222,2,13,235,35,2,14,246,0,3,3,251,179,3,4,255,255,3,5,218,226,3,9,245,255,3,10,229,251,3,11,206,98,3,12,255,0,3,13,178,0,4,4,200,100,4,5,255,225,4,6,253,250,4,7,221,249,4,8,250,255,4,9,191,182,4,10,245,11,4,11,225,0,5,6,254,255,5,7,255,255,5,8,246,205,5,9,251,31,6,4,181,255,6,5,255,255,6,6,198,211,6,7,254,107,6,8,255,239,6,9,253,247,7,3,245,255,7,4,229,251,7,5,203,92,7,6,255,0,7,7,164,0,7,9,249,171,7,10,255,255,7,11,234,235,8,1,211,255,8,2,253,255,8,3,196,188,8,4,245,13,8,5,225,0,8,10,192,96,8,11,255,223,8,12,255,255,8,13,192,224,9,1,211,255,9,2,220,64,9,3,253,0,9,12,240,146,9,13,255,251,9,14,169,0,10,2,211,0,10,13,159,75,10,14,251,0],
secondary:!1},{width:10,bonus:270,chr:"Y",
pixels:[0,1,241,255,1,1,189,255,1,2,255,255,1,3,243,242,2,2,206,82,2,3,254,198,2,4,255,255,2,5,234,239,3,4,214,89,3,5,254,207,3,6,255,255,3,7,224,236,4,6,222,95,4,7,254,231,4,8,255,255,4,9,255,255,4,10,255,255,4,11,255,255,4,12,255,255,4,13,255,255,5,6,179,255,5,7,255,255,5,8,252,224,5,9,254,164,5,10,254,164,5,11,254,164,5,12,254,164,5,13,254,164,5,14,255,0,6,4,166,255,6,5,253,255,6,6,237,251,6,7,211,131,6,8,255,5,6,9,221,0,6,10,164,0,6,11,164,0,6,12,164,0,6,13,164,0,6,14,164,0,7,2,154,255,7,3,251,255,7,4,245,253,7,5,210,154,7,6,253,12,7,7,233,0,8,1,247,255,8,2,250,255,8,3,212,177,8,4,251,23,8,5,243,0,9,1,166,255,9,2,248,36,9,3,250,0],
secondary:!1},{width:11,bonus:350,chr:"Z",
pixels:[1,1,255,255,1,12,193,255,1,13,255,255,2,1,255,255,2,2,254,88,2,11,245,255,2,12,255,255,2,13,255,255,2,14,255,0,3,1,255,255,3,2,254,88,3,9,193,255,3,10,255,255,3,11,222,227,3,12,250,129,3,13,255,255,3,14,255,0,4,1,255,255,4,2,254,88,4,8,245,255,4,9,247,253,4,10,221,132,4,11,255,2,4,12,216,103,4,13,255,255,4,14,255,0,5,1,255,255,5,2,254,88,5,6,196,255,5,7,255,255,5,8,223,225,5,9,247,38,5,10,246,0,5,13,255,255,5,14,255,0,6,1,255,255,6,2,254,88,6,5,245,255,6,6,246,254,6,7,222,129,6,8,255,2,6,9,196,0,6,13,255,255,6,14,255,0,7,1,255,255,7,2,255,127,7,3,217,232,7,4,255,255,7,5,221,224,7,6,247,37,7,7,245,0,7,13,255,255,7,14,255,0,8,1,255,255,8,2,255,255,8,3,250,250,8,4,223,126,8,5,255,1,8,6,194,0,8,13,255,255,8,14,255,0,9,1,255,255,9,2,255,193,9,3,255,35,9,4,245,0,9,13,255,255,9,14,255,0,10,2,255,0,10,3,193,0,10,14,255,0],
secondary:!1},{width:10,bonus:385,chr:"0",
pixels:[1,4,181,255,1,5,223,255,1,6,245,255,1,7,253,255,1,8,245,255,1,9,221,255,1,10,177,255,2,2,221,255,2,3,255,255,2,4,241,244,2,5,237,205,2,6,245,178,2,7,252,167,2,8,254,172,2,9,253,192,2,10,252,234,2,11,255,255,2,12,229,237,3,1,178,255,3,2,233,251,3,3,230,70,3,4,255,0,3,5,231,0,3,6,190,0,3,7,171,0,3,8,165,0,3,9,171,0,3,10,190,0,3,11,237,67,3,12,255,229,3,13,240,180,4,1,241,255,4,2,211,134,4,3,230,0,4,13,254,242,4,14,170,0,5,1,239,255,5,2,248,118,5,13,247,249,5,14,241,0,6,1,166,255,6,2,253,235,6,3,153,118,6,12,233,255,6,13,209,212,6,14,241,0,7,2,238,222,7,3,255,255,7,4,239,249,7,5,191,254,7,6,171,255,7,7,166,255,7,8,171,255,7,9,190,255,7,10,233,255,7,11,255,255,7,12,228,244,7,13,235,31,7,14,174,0,8,3,224,105,8,4,255,172,8,5,252,222,8,6,252,247,8,7,254,254,8,8,251,249,8,9,244,234,8,10,236,196,8,11,242,112,8,12,255,10,8,13,218,0,9,5,172,0,9,6,219,0,9,7,244,0,9,8,253,0,9,9,246,0,9,10,224,0,9,11,182,0],
secondary:!1},{width:10,bonus:235,chr:"1",
pixels:[2,3,209,255,3,2,167,255,3,3,236,255,3,4,216,41,4,2,243,255,4,3,187,79,4,4,236,0,5,1,251,255,5,2,255,255,5,3,255,255,5,4,255,255,5,5,255,255,5,6,255,255,5,7,255,255,5,8,255,255,5,9,255,255,5,10,255,255,5,11,255,255,5,12,255,255,5,13,255,255,6,1,163,255,6,2,253,165,6,3,254,164,6,4,254,164,6,5,254,164,6,6,254,164,6,7,254,164,6,8,254,164,6,9,254,164,6,10,254,164,6,11,254,164,6,12,254,164,6,13,254,164,6,14,255,0,7,2,164,0,7,3,164,0,7,4,164,0,7,5,164,0,7,6,164,0,7,7,164,0,7,8,164,0,7,9,164,0,7,10,164,0,7,11,164,0,7,12,164,0,7,13,164,0,7,14,164,0],
secondary:!1},{width:10,bonus:305,chr:"2",
pixels:[1,12,185,255,1,13,255,255,2,2,254,255,2,3,177,95,2,11,199,255,2,12,255,255,2,13,255,255,2,14,255,0,3,1,197,255,3,2,201,211,3,3,254,0,3,10,209,255,3,11,238,254,3,12,230,156,3,13,255,255,3,14,255,0,4,1,243,255,4,2,219,115,4,3,166,0,4,9,221,255,4,10,234,253,4,11,218,53,4,12,242,92,4,13,255,255,4,14,255,0,5,1,231,255,5,2,248,124,5,8,233,255,5,9,228,250,5,10,226,42,5,11,232,0,5,13,255,255,5,14,255,0,6,1,173,255,6,2,252,236,6,3,155,107,6,7,251,255,6,8,217,241,6,9,235,27,6,10,224,0,6,13,255,255,6,14,255,0,7,2,249,241,7,3,255,255,7,4,255,255,7,5,255,255,7,6,253,255,7,7,209,183,7,8,251,8,7,9,205,0,7,13,255,255,7,14,255,0,8,3,245,133,8,4,255,155,8,5,255,121,8,6,255,38,8,7,253,0,8,13,255,255,8,14,255,0,9,5,155,0,9,14,255,0],
secondary:!1},{width:10,bonus:295,chr:"3",
pixels:[1,2,173,255,1,12,249,255,2,2,230,252,2,3,174,7,2,12,178,243,2,13,254,208,3,1,213,255,3,2,201,179,3,3,228,0,3,6,255,255,3,13,250,244,3,14,207,0,4,1,245,255,4,2,230,114,4,6,255,255,4,7,255,81,4,13,253,253,4,14,239,0,5,1,233,255,5,2,250,114,5,6,252,254,5,7,255,123,5,13,239,245,5,14,251,0,6,1,185,255,6,2,251,219,6,5,211,255,6,6,185,213,6,7,254,227,6,12,239,255,6,13,211,198,6,14,230,0,7,2,254,252,7,3,255,255,7,4,255,255,7,5,215,247,7,6,214,17,7,7,240,231,7,8,253,241,7,9,188,245,7,10,191,255,7,11,249,255,7,12,245,253,7,13,242,42,7,14,164,0,8,3,253,145,8,4,255,124,8,5,255,16,8,6,208,0,8,8,243,188,8,9,254,240,8,10,250,244,8,11,236,194,8,12,250,46,8,13,243,0,9,9,180,0,9,10,240,0,9,11,240,0,9,12,179,0],
secondary:!1},{width:10,bonus:355,chr:"4",
pixels:[1,9,184,255,1,10,255,255,2,8,241,255,2,9,223,251,2,10,255,255,2,11,255,84,3,6,187,255,3,7,246,254,3,8,172,172,3,9,244,41,3,10,255,255,3,11,255,84,4,5,243,255,4,6,199,244,4,7,197,45,4,8,246,0,4,10,255,255,4,11,255,84,5,3,193,255,5,4,240,254,5,5,166,154,5,6,244,1,5,7,190,0,5,10,255,255,5,11,255,84,6,2,235,255,6,3,163,233,6,4,199,31,6,5,240,0,6,10,255,255,6,11,255,84,7,1,255,255,7,2,255,255,7,3,255,255,7,4,255,255,7,5,255,255,7,6,255,255,7,7,255,255,7,8,255,255,7,9,255,255,7,10,255,255,7,11,255,255,7,12,255,255,7,13,255,255,8,1,163,255,8,2,254,164,8,3,254,164,8,4,254,164,8,5,254,164,8,6,254,164,8,7,254,164,8,8,254,164,8,9,254,177,8,10,255,255,8,11,254,195,8,12,254,164,8,13,254,164,8,14,255,0,9,2,164,0,9,3,164,0,9,4,164,0,9,5,164,0,9,6,164,0,9,7,164,0,9,8,164,0,9,9,177,52,9,10,255,255,9,11,255,84,9,12,194,0,9,13,164,0,9,14,164,0],
secondary:!1},{width:10,bonus:290,chr:"5",
pixels:[1,5,159,255,1,6,178,255,1,12,227,255,2,1,255,255,2,2,255,255,2,3,254,254,2,4,243,245,2,5,234,228,2,6,253,253,2,7,210,130,2,13,251,221,3,1,255,255,3,2,255,101,3,3,255,3,3,4,253,0,3,5,233,3,3,6,254,252,3,7,252,78,3,13,252,253,3,14,218,0,4,1,255,255,4,2,254,88,4,6,255,255,4,7,253,84,4,13,251,253,4,14,250,0,5,1,255,255,5,2,254,88,5,6,238,255,5,7,255,142,5,12,159,255,5,13,231,238,5,14,249,0,6,1,255,255,6,2,254,88,6,6,163,255,6,7,254,249,6,8,186,135,6,12,253,255,6,13,207,159,6,14,215,0,7,1,179,255,7,2,255,61,7,7,245,239,7,8,255,255,7,9,255,255,7,10,255,255,7,11,255,255,7,12,221,221,7,13,253,8,8,2,180,0,8,8,241,124,8,9,255,157,8,10,255,145,8,11,255,80,8,12,255,2,8,13,192,0,9,10,157,0],
secondary:!1},{width:10,bonus:365,chr:"6",
pixels:[1,5,185,255,1,6,227,255,1,7,245,255,1,8,251,255,1,9,239,255,1,10,197,255,2,3,241,255,2,4,255,255,2,5,235,238,2,6,234,195,2,7,251,227,2,8,254,234,2,9,254,176,2,10,251,207,2,11,255,255,2,12,232,235,3,2,251,255,3,3,211,234,3,4,244,46,3,5,255,0,3,6,233,113,3,7,242,225,3,8,226,20,3,9,233,0,3,10,175,0,3,11,215,65,3,12,254,239,3,13,240,171,4,1,167,255,4,2,226,250,4,3,251,7,4,4,194,0,4,6,235,255,4,7,163,158,4,8,214,0,4,13,254,238,4,14,161,0,5,1,233,255,5,2,210,153,5,3,222,0,5,6,255,255,5,7,241,92,5,13,251,251,5,14,237,0,6,1,253,255,6,2,240,100,6,6,234,254,6,7,254,189,6,12,213,255,6,13,221,228,6,14,247,0,7,1,229,255,7,2,254,109,7,7,255,255,7,8,248,236,7,9,177,252,7,10,187,255,7,11,243,255,7,12,251,255,7,13,221,60,7,14,197,0,8,2,230,0,8,7,156,145,8,8,255,211,8,9,254,250,8,10,250,244,8,11,235,193,8,12,244,48,8,13,251,0,9,9,211,0,9,10,249,0,9,11,239,0,9,12,178,0],
secondary:!1},{width:10,bonus:240,chr:"7",
pixels:[1,1,255,255,2,1,255,255,2,2,254,88,3,1,255,255,3,2,254,88,3,12,193,255,3,13,255,255,4,1,255,255,4,2,254,88,4,10,233,255,4,11,255,255,4,12,234,243,4,13,223,141,4,14,255,0,5,1,255,255,5,2,254,88,5,7,179,255,5,8,253,255,5,9,251,255,5,10,216,204,5,11,239,76,5,12,255,1,5,13,223,0,6,1,255,255,6,2,254,88,6,5,221,255,6,6,255,255,6,7,231,244,6,8,215,143,6,9,253,24,6,10,251,0,6,11,173,0,7,1,255,255,7,2,255,208,7,3,250,253,7,4,250,255,7,5,211,208,7,6,231,76,7,7,255,1,7,8,221,0,8,1,255,255,8,2,254,221,8,3,229,134,8,4,248,24,8,5,250,0,8,6,172,0,9,2,255,0,9,3,220,0],
secondary:!1},{width:10,bonus:375,chr:"8",
pixels:[1,9,199,255,1,10,247,255,1,11,225,255,2,2,247,255,2,3,255,255,2,4,255,255,2,5,255,255,2,8,247,255,2,9,233,247,2,10,237,186,2,11,254,216,2,12,255,255,2,13,157,150,3,1,187,255,3,2,221,245,3,3,248,37,3,4,255,17,3,5,255,143,3,6,255,253,3,7,235,238,3,8,190,232,3,9,248,6,3,10,226,0,3,11,173,4,3,12,244,195,3,13,255,203,4,1,237,255,4,2,215,126,4,3,212,0,4,6,229,219,4,7,254,240,4,8,222,17,4,9,173,0,4,13,250,244,4,14,203,0,5,1,237,255,5,2,245,111,5,6,194,255,5,7,254,255,5,8,243,55,5,13,244,248,5,14,240,0,6,1,185,255,6,2,252,215,6,6,239,255,6,7,241,206,6,8,255,213,6,12,197,255,6,13,219,225,6,14,238,0,7,2,252,248,7,3,255,255,7,4,255,255,7,5,254,255,7,6,185,125,7,7,241,37,7,8,250,240,7,9,251,237,7,10,181,248,7,11,223,255,7,12,255,255,7,13,214,86,7,14,193,0,8,3,250,148,8,4,255,142,8,5,255,57,8,6,254,0,8,9,251,193,8,10,254,246,8,11,243,228,8,12,233,88,8,13,255,0,9,10,190,0,9,11,245,0,9,12,217,0],
secondary:!1},{width:10,bonus:375,chr:"9",
pixels:[1,3,172,255,1,4,237,255,1,5,245,255,1,6,211,255,2,2,249,255,2,3,245,254,2,4,233,206,2,5,249,177,2,6,254,220,2,7,255,255,2,8,200,195,2,13,231,255,3,1,195,255,3,2,223,244,3,3,250,23,3,4,244,0,3,5,188,0,3,6,173,2,3,7,239,153,3,8,255,255,3,9,164,44,3,13,254,254,3,14,232,0,4,1,247,255,4,2,221,125,4,3,214,0,4,8,255,255,4,9,255,61,4,13,241,247,4,14,253,0,5,1,235,255,5,2,250,121,5,8,254,255,5,9,255,28,5,12,213,255,5,13,209,207,5,14,234,0,6,1,157,255,6,2,254,243,6,3,154,110,6,7,181,255,6,8,171,221,6,9,254,0,6,11,181,255,6,12,252,254,6,13,220,49,6,14,170,0,7,2,237,225,7,3,255,255,7,4,221,242,7,5,173,255,7,6,225,255,7,7,238,255,7,8,235,201,7,9,237,229,7,10,253,255,7,11,243,253,7,12,203,95,7,13,252,0,8,3,229,121,8,4,254,192,8,5,252,240,8,6,254,252,8,7,254,244,8,8,252,226,8,9,234,196,8,10,232,123,8,11,254,18,8,12,241,0,9,5,192,0,9,6,237,0,9,7,251,0,9,8,243,0,9,9,224,0,9,10,180,0],
secondary:!1},{width:15,bonus:500,chr:"%",
pixels:[1,3,155,255,1,4,227,255,1,5,249,255,1,6,229,255,1,7,167,255,2,2,187,255,2,3,250,255,2,4,230,212,2,5,245,174,2,6,253,183,2,7,253,244,2,8,244,233,3,2,251,255,3,3,214,120,3,4,250,0,3,5,191,0,3,6,168,0,3,7,196,67,3,8,255,255,3,9,229,56,4,2,237,255,4,3,253,168,4,8,255,255,4,9,255,33,4,12,169,255,4,13,239,255,5,3,255,255,5,4,255,255,5,5,255,255,5,6,255,255,5,7,255,255,5,8,211,203,5,9,255,15,5,11,243,255,5,12,162,235,5,13,176,30,5,14,240,0,6,4,255,129,6,5,255,155,6,6,255,137,6,7,255,80,6,8,255,108,6,9,247,241,6,10,185,249,6,11,157,68,6,12,244,0,7,6,184,103,7,7,235,231,7,8,223,239,7,10,234,0,7,11,181,0,8,5,185,255,8,6,231,255,8,8,223,72,8,9,233,150,8,10,182,218,9,3,155,255,9,4,241,255,9,6,189,16,9,7,241,113,9,8,255,255,9,9,255,255,9,10,255,255,9,11,255,255,9,12,255,255,10,2,241,255,10,3,169,243,10,4,165,42,10,5,242,0,10,7,219,253,10,8,187,189,10,9,255,20,10,10,255,4,10,11,255,28,10,12,255,172,10,13,254,225,11,3,241,0,11,4,161,0,11,7,231,255,11,8,229,89,11,13,250,244,11,14,224,0,12,7,155,255,12,8,254,249,12,9,208,230,12,10,169,255,12,11,197,255,12,12,253,255,12,13,209,204,12,14,239,0,13,8,209,169,13,9,254,222,13,10,253,250,13,11,245,237,13,12,231,167,13,13,253,16,13,14,168,0,14,10,222,0,14,11,248,0,14,12,228,0],
secondary:!1},{width:8,bonus:225,chr:"/",
pixels:[1,14,155,255,1,15,221,255,1,16,255,255,2,11,215,255,2,12,255,255,2,13,255,255,2,14,236,244,2,15,218,188,2,16,235,105,2,17,255,0,3,7,208,255,3,8,253,255,3,9,255,255,3,10,239,246,3,11,218,194,3,12,231,111,3,13,255,36,3,14,255,0,3,15,226,0,3,16,161,0,4,3,201,255,4,4,251,255,4,5,255,255,4,6,241,249,4,7,218,200,4,8,228,119,4,9,254,41,4,10,255,0,4,11,231,0,4,12,166,0,5,0,249,255,5,1,255,255,5,2,243,251,5,3,218,207,5,4,224,127,5,5,252,46,5,6,255,1,5,7,235,0,5,8,171,0,6,0,222,135,6,1,250,52,6,2,255,2,6,3,239,0,6,4,177,0,7,0,182,0],
secondary:!1},{width:10,bonus:175,chr:"+",
pixels:[1,7,255,255,2,7,255,255,2,8,255,68,3,7,255,255,3,8,255,68,4,4,163,255,4,5,163,255,4,6,171,255,4,7,255,255,4,8,254,189,4,9,188,222,4,10,163,255,4,11,163,255,5,4,255,255,5,5,255,255,5,6,255,255,5,7,255,255,5,8,255,255,5,9,255,255,5,10,255,255,5,11,255,255,5,12,164,0,6,5,255,0,6,6,255,20,6,7,255,255,6,8,255,68,6,9,255,0,6,10,255,0,6,11,255,0,6,12,255,0,7,7,255,255,7,8,255,68,8,7,255,255,8,8,255,68,9,8,255,0],
secondary:!1},{width:9,bonus:185,chr:"?",
pixels:[2,1,159,255,2,2,213,242,3,1,217,255,3,2,206,156,3,3,202,0,3,11,159,255,3,12,249,255,3,13,196,255,4,1,245,255,4,2,232,109,4,7,235,255,4,8,159,235,4,9,161,74,4,12,218,184,4,13,251,109,4,14,196,0,5,1,215,255,5,2,252,169,5,6,221,255,5,7,168,232,5,8,235,0,5,13,157,0,6,2,255,255,6,3,236,217,6,4,177,255,6,5,243,255,6,6,207,248,6,7,222,8,7,2,193,180,7,3,255,227,7,4,251,243,7,5,227,183,7,6,244,17,7,7,201,0,8,4,227,0,8,5,240,0,8,6,163,0],
secondary:!1},{width:7,bonus:175,chr:"!",
pixels:[3,1,163,255,3,2,163,255,3,3,163,255,3,4,163,255,3,5,163,255,3,6,163,255,3,7,163,255,3,8,163,255,3,9,163,255,3,12,247,255,3,13,184,255,4,1,255,255,4,2,255,255,4,3,255,255,4,4,255,255,4,5,255,255,4,6,255,255,4,7,255,255,4,8,255,255,4,9,255,255,4,10,164,0,4,12,252,250,4,13,253,186,4,14,184,0,5,2,255,0,5,3,255,0,5,4,255,0,5,5,255,0,5,6,255,0,5,7,255,0,5,8,255,0,5,9,255,0,5,10,255,0,5,13,247,0,5,14,184,0],
secondary:!1},{width:16,bonus:695,chr:"@",
pixels:[1,6,181,255,1,7,221,255,1,8,247,255,1,9,241,255,1,10,205,255,2,4,219,255,2,5,255,255,2,6,242,248,2,7,236,207,2,8,243,178,2,9,253,181,2,10,253,225,2,11,255,255,2,12,247,247,3,3,249,255,3,4,226,247,3,5,230,83,3,6,255,4,3,7,236,0,3,8,192,0,3,9,170,0,3,10,179,0,3,11,231,70,3,12,254,221,3,13,254,246,4,2,223,255,4,3,212,242,4,4,249,11,4,5,219,0,4,8,157,255,4,13,252,236,4,14,252,173,5,2,250,255,5,3,228,34,5,4,203,10,5,5,185,251,5,6,255,255,5,7,255,255,5,8,255,255,5,9,255,255,5,10,255,255,5,11,174,215,5,14,254,248,5,15,173,11,6,1,185,255,6,2,204,215,6,3,250,0,6,4,154,233,6,5,250,255,6,6,215,138,6,7,255,30,6,8,255,6,6,9,255,30,6,10,254,162,6,11,255,255,6,12,159,46,6,14,255,255,6,15,248,47,7,1,223,255,7,2,218,138,7,3,172,0,7,4,229,255,7,5,201,170,7,6,250,0,7,11,255,255,7,12,255,55,7,14,255,255,7,15,255,62,8,1,247,255,8,2,235,103,8,4,245,255,8,5,240,111,8,11,229,251,8,12,255,7,8,14,255,255,8,15,255,45,9,1,227,255,9,2,251,120,9,4,219,255,9,5,253,213,9,6,200,209,9,7,163,255,9,8,175,255,9,9,215,255,9,10,209,255,9,12,225,0,9,14,254,255,9,15,255,16,10,1,183,255,10,2,248,199,10,4,158,255,10,5,255,255,10,6,255,255,10,7,255,255,10,8,255,255,10,9,255,255,10,10,255,255,10,11,239,177,10,14,207,239,10,15,254,0,11,2,255,255,11,3,214,100,11,5,158,0,11,6,255,0,11,7,255,0,11,8,255,0,11,9,255,5,11,10,254,88,11,11,255,255,11,12,183,71,11,15,194,0,12,2,208,226,12,3,255,247,12,4,161,181,12,11,255,255,12,12,255,34,13,3,233,197,13,4,255,255,13,5,248,250,13,6,193,253,13,7,169,255,13,8,181,255,13,9,229,255,13,10,255,255,13,11,196,193,13,12,255,0,14,4,203,99,14,5,254,174,14,6,253,225,14,7,253,250,14,8,249,243,14,9,235,201,14,10,238,93,14,11,255,0,15,6,174,0,15,7,223,0,15,8,248,0,15,9,237,0,15,10,186,0],
secondary:!1},{width:13,bonus:350,chr:"#",
pixels:[1,10,255,255,2,6,255,255,2,10,255,255,2,11,255,68,3,6,255,255,3,7,255,48,3,10,255,255,3,11,255,167,3,12,201,230,3,13,233,255,4,6,255,255,4,7,254,210,4,8,245,253,4,9,255,255,4,10,255,255,4,11,255,199,4,12,212,158,4,13,202,95,4,14,233,0,5,3,255,255,5,4,250,255,5,5,223,244,5,6,255,255,5,7,255,141,5,8,221,80,5,9,245,42,5,10,255,255,5,11,255,68,5,12,199,0,6,4,255,4,6,5,250,0,6,6,255,255,6,7,255,48,6,10,255,255,6,11,255,68,7,6,255,255,7,7,254,70,7,10,255,255,7,11,255,227,7,12,254,254,7,13,244,255,8,5,181,255,8,6,255,255,8,7,255,255,8,8,242,251,8,9,213,237,8,10,255,255,8,11,255,135,8,12,232,49,8,13,253,3,8,14,244,0,9,3,217,249,9,4,200,214,9,5,196,163,9,6,255,255,9,7,255,67,9,8,255,0,9,9,239,21,9,10,255,255,9,11,255,68,10,4,212,0,10,5,168,0,10,6,255,255,10,7,255,48,10,10,255,255,10,11,255,68,11,6,255,255,11,7,255,48,11,11,255,0,12,7,255,0],
secondary:!1},{width:10,bonus:420,chr:"$",
pixels:[1,3,184,255,1,4,243,255,1,5,211,255,1,11,171,255,1,12,213,255,2,2,197,255,2,3,245,254,2,4,233,191,2,5,253,232,2,6,254,252,2,12,255,255,2,13,217,27,3,2,255,255,3,3,213,87,3,4,244,0,3,5,183,38,3,6,253,244,3,7,253,177,3,12,255,255,3,13,255,50,4,0,163,255,4,1,193,255,4,2,255,255,4,3,255,166,4,4,189,221,4,5,163,255,4,6,230,252,4,7,255,251,4,8,226,185,4,9,163,255,4,10,163,255,4,11,173,255,4,12,255,255,4,13,255,187,4,14,181,231,5,0,255,255,5,1,255,255,5,2,255,255,5,3,255,255,5,4,255,255,5,5,255,255,5,6,255,255,5,7,255,255,5,8,255,255,5,9,255,255,5,10,255,255,5,11,255,255,5,12,255,255,5,13,255,255,5,14,255,255,5,15,164,0,6,1,254,76,6,2,255,253,6,3,255,12,6,4,255,0,6,5,255,0,6,6,255,11,6,7,254,239,6,8,255,183,6,9,255,2,6,10,255,0,6,11,255,95,6,12,255,251,6,13,255,15,6,14,255,0,6,15,255,0,7,2,255,255,7,3,253,82,7,8,255,255,7,9,241,218,7,10,177,255,7,11,247,255,7,12,199,213,7,13,251,0,8,3,255,49,8,8,190,180,8,9,254,237,8,10,252,240,8,11,226,179,8,12,248,15,8,13,166,0,9,10,236,0,9,11,237,0,9,12,158,0],
secondary:!1},{width:10,bonus:165,chr:"^",
pixels:[1,7,193,255,1,8,253,255,2,5,205,255,2,6,249,255,2,7,186,217,2,8,204,53,2,9,254,0,3,3,217,255,3,4,239,255,3,5,175,197,3,6,210,31,3,7,249,0,3,8,158,0,4,1,227,255,4,2,224,255,4,3,168,170,4,4,219,14,4,5,239,0,5,1,235,247,5,2,251,223,5,3,237,120,6,2,238,103,6,3,249,219,6,4,247,249,7,4,227,88,7,5,252,199,7,6,254,254,7,7,186,241,8,6,209,72,8,7,254,178,8,8,254,255,9,8,189,55,9,9,254,0],
secondary:!1},{width:10,bonus:95,chr:"~",
pixels:[1,8,213,255,2,7,241,255,2,8,177,135,2,9,213,0,3,7,255,255,3,8,246,91,4,7,215,253,4,8,254,168,5,8,254,250,5,9,173,25,6,8,255,255,6,9,251,63,7,8,255,255,7,9,255,37,8,7,175,255,8,8,194,238,8,9,255,0,9,8,176,0,9,9,181,0],secondary:!1},{width:13,
bonus:445,chr:"&",
pixels:[1,9,227,255,1,10,249,255,1,11,213,255,2,2,178,255,2,3,241,255,2,4,195,255,2,7,185,255,2,8,254,255,2,9,228,221,2,10,246,182,2,11,254,234,2,12,255,255,3,2,252,254,3,3,232,197,3,4,253,225,3,5,252,248,3,6,186,231,3,7,248,255,3,8,205,91,3,9,254,0,3,10,197,0,3,11,181,24,3,12,251,219,3,13,255,193,4,1,227,255,4,2,207,169,4,3,252,0,4,4,181,11,4,5,245,184,4,6,255,255,4,7,215,163,4,8,248,0,4,13,252,240,4,14,193,0,5,1,247,255,5,2,237,104,5,6,255,255,5,7,254,245,5,8,168,101,5,13,249,251,5,14,237,0,6,1,217,255,6,2,253,186,6,5,249,255,6,6,176,125,6,7,255,209,6,8,254,246,6,13,230,239,6,14,246,0,7,2,255,255,7,3,255,255,7,4,255,255,7,5,182,205,7,6,250,0,7,8,246,217,7,9,254,249,7,12,237,255,7,13,204,174,7,14,215,0,8,2,165,142,8,3,255,151,8,4,254,94,8,5,255,1,8,9,247,218,8,10,254,251,8,11,223,239,8,12,241,253,8,13,240,28,9,10,255,253,9,11,255,255,9,12,236,158,9,13,240,0,10,8,163,255,10,9,247,255,10,10,243,251,10,11,254,210,10,12,254,255,10,13,192,145,11,7,255,255,11,8,244,250,11,9,217,174,11,10,248,28,11,11,241,13,11,12,244,199,11,13,255,255,12,8,255,7,12,9,240,0,12,13,236,193,12,14,255,0],
secondary:!1},{width:11,bonus:190,chr:"*",
pixels:[2,3,255,255,2,4,184,121,3,3,237,251,3,4,255,107,3,6,208,255,3,7,234,254,4,3,163,255,4,4,249,202,4,5,249,251,4,6,227,249,4,7,229,127,4,8,233,12,5,0,255,255,5,1,255,255,5,2,255,255,5,3,255,255,5,4,255,255,5,5,232,171,5,6,245,3,5,7,222,0,6,1,254,70,6,2,255,43,6,3,255,167,6,4,254,207,6,5,254,251,6,6,236,224,7,3,232,250,7,4,204,136,7,5,216,64,7,6,254,222,7,7,252,245,8,3,255,255,8,4,236,96,8,7,231,83,8,8,242,0,9,3,187,236,9,4,255,55,10,4,173,0],
secondary:!1},{width:6,bonus:225,chr:"(",
pixels:[1,4,181,255,1,5,221,255,1,6,237,255,1,7,251,255,1,8,243,255,1,9,227,255,1,10,199,255,2,1,221,255,2,2,255,255,2,3,255,255,2,4,248,248,2,5,238,214,2,6,245,190,2,7,249,172,2,8,253,177,2,9,252,195,2,10,251,225,2,11,255,255,2,12,255,255,2,13,250,253,2,14,176,248,3,0,254,255,3,1,222,223,3,2,235,113,3,3,255,38,3,4,255,1,3,5,241,0,3,6,200,0,3,7,183,0,3,8,168,0,3,9,176,0,3,10,193,0,3,11,223,19,3,12,255,69,3,13,254,150,3,14,254,236,3,15,254,254,3,16,170,226,4,0,225,42,4,1,254,0,4,2,194,0,4,15,243,105,4,16,255,227,5,0,166,0,5,17,227,0],
secondary:!1},{width:7,bonus:200,chr:")",
pixels:[2,15,190,255,2,16,255,255,3,0,254,249,3,1,255,255,3,2,207,246,3,12,157,255,3,13,235,255,3,14,255,255,3,15,223,240,3,16,205,76,3,17,255,0,4,1,252,126,4,2,254,219,4,3,255,255,4,4,255,255,4,5,255,255,4,6,255,255,4,7,255,255,4,8,255,255,4,9,255,255,4,10,255,255,4,11,255,255,4,12,253,253,4,13,226,203,4,14,242,89,4,15,255,4,4,16,210,0,5,3,222,32,5,4,255,79,5,5,255,121,5,6,255,140,5,7,255,157,5,8,255,152,5,9,255,134,5,10,255,110,5,11,255,61,5,12,255,12,5,13,252,0,5,14,180,0,6,8,157,0],
secondary:!1},{width:7,bonus:65,chr:"_",pixels:[0,16,255,255,1,16,255,255,1,17,255,68,2,16,255,255,2,17,255,68,3,16,255,255,3,17,255,68,4,16,255,255,4,17,255,68,5,16,255,255,5,17,255,68,6,16,255,255,6,17,255,68],secondary:!1},{width:6,bonus:40,
chr:"-",pixels:[1,8,255,255,2,8,255,255,2,9,255,68,3,8,255,255,3,9,255,68,4,8,255,255,4,9,255,68,5,9,255,0],secondary:!0},{width:10,bonus:160,chr:"=",
pixels:[1,5,255,255,1,9,255,255,2,5,255,255,2,6,255,68,2,9,255,255,2,10,255,68,3,5,255,255,3,6,255,68,3,9,255,255,3,10,255,68,4,5,255,255,4,6,255,68,4,9,255,255,4,10,255,68,5,5,255,255,5,6,255,68,5,9,255,255,5,10,255,68,6,5,255,255,6,6,255,68,6,9,255,255,6,10,255,68,7,5,255,255,7,6,255,68,7,9,255,255,7,10,255,68,8,5,255,255,8,6,255,68,8,9,255,255,8,10,255,68,9,6,255,0,9,10,255,0],
secondary:!1},{width:7,bonus:290,chr:"[",
pixels:[2,0,255,255,2,1,255,255,2,2,255,255,2,3,255,255,2,4,255,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,2,11,255,255,2,12,255,255,2,13,255,255,2,14,255,255,2,15,255,255,2,16,255,255,3,0,254,189,3,1,254,164,3,2,254,164,3,3,254,164,3,4,254,164,3,5,254,164,3,6,254,164,3,7,254,164,3,8,254,164,3,9,254,164,3,10,254,164,3,11,254,164,3,12,254,164,3,13,254,164,3,14,254,164,3,15,255,171,3,16,255,255,3,17,255,68,4,0,255,68,4,1,188,0,4,2,164,0,4,3,164,0,4,4,164,0,4,5,164,0,4,6,164,0,4,7,164,0,4,8,164,0,4,9,164,0,4,10,164,0,4,11,164,0,4,12,164,0,4,13,164,0,4,14,164,0,4,15,171,30,4,16,255,255,4,17,255,68,5,0,254,46,5,16,182,246,5,17,254,46,6,0,176,0,6,17,176,0],
secondary:!1},{width:7,bonus:290,chr:"]",
pixels:[1,16,255,255,2,0,255,68,2,16,255,255,2,17,255,68,3,0,255,255,3,1,255,255,3,2,255,255,3,3,255,255,3,4,255,255,3,5,255,255,3,6,255,255,3,7,255,255,3,8,255,255,3,9,255,255,3,10,255,255,3,11,255,255,3,12,255,255,3,13,255,255,3,14,255,255,3,15,255,255,3,16,255,255,3,17,255,68,4,0,254,164,4,1,254,164,4,2,254,164,4,3,254,164,4,4,254,164,4,5,254,164,4,6,254,164,4,7,254,164,4,8,254,164,4,9,254,164,4,10,254,164,4,11,254,164,4,12,254,164,4,13,254,164,4,14,254,164,4,15,254,164,4,16,254,164,4,17,255,43,5,0,164,0,5,1,164,0,5,2,164,0,5,3,164,0,5,4,164,0,5,5,164,0,5,6,164,0,5,7,164,0,5,8,164,0,5,9,164,0,5,10,164,0,5,11,164,0,5,12,164,0,5,13,164,0,5,14,164,0,5,15,164,0,5,16,164,0,5,17,164,0],
secondary:!1},{width:7,bonus:255,chr:"{",
pixels:[1,8,255,255,2,8,236,252,2,9,254,183,3,0,191,255,3,1,245,255,3,2,255,255,3,3,255,255,3,4,255,255,3,5,255,255,3,6,255,255,3,7,252,254,3,8,181,106,3,9,254,245,3,10,255,255,3,11,255,255,3,12,255,255,3,13,255,255,3,14,255,255,3,15,223,255,4,0,243,253,4,1,235,188,4,2,251,166,4,3,254,164,4,4,254,164,4,5,254,164,4,6,255,151,4,7,255,68,4,8,252,0,4,10,250,156,4,11,254,164,4,12,254,164,4,13,254,164,4,14,255,166,4,15,255,221,4,16,253,244,5,0,216,111,5,1,241,0,5,2,173,0,5,3,164,0,5,4,164,0,5,5,164,0,5,6,164,0,5,11,153,0,5,12,164,0,5,13,164,0,5,14,164,0,5,15,179,56,5,16,255,255,5,17,244,57,6,0,253,0,6,17,255,0],
secondary:!1},{width:6,bonus:255,chr:"}",
pixels:[1,0,204,191,1,16,255,255,2,0,255,255,2,1,255,255,2,2,255,255,2,3,255,255,2,4,255,255,2,5,255,255,2,6,243,255,2,7,157,255,2,10,245,255,2,11,255,255,2,12,255,255,2,13,255,255,2,14,255,255,2,15,255,255,2,16,220,232,2,17,255,0,3,0,178,132,3,1,255,152,3,2,254,164,3,3,254,164,3,4,254,164,3,5,254,164,3,6,254,177,3,7,254,245,3,8,213,173,3,9,251,255,3,10,221,207,3,11,251,166,3,12,254,164,3,13,254,164,3,14,255,163,3,15,255,125,3,16,255,17,3,17,200,0,4,3,164,0,4,4,164,0,4,5,164,0,4,6,164,0,4,7,199,96,4,8,255,255,4,9,196,155,4,10,251,0,4,11,179,0,4,12,164,0,4,13,164,0,4,14,164,0,4,15,163,0,5,8,166,197,5,9,255,37],
secondary:!1},{width:5,bonus:55,chr:":",pixels:[2,4,211,255,2,5,229,255,2,11,159,255,2,12,249,255,2,13,196,255,3,5,234,150,3,6,230,5,3,12,218,184,3,13,251,109,3,14,196,0,4,13,157,0],secondary:!0},{width:5,bonus:65,chr:";",
pixels:[1,15,155,255,2,4,211,255,2,5,229,255,2,12,247,255,2,13,255,255,2,14,223,249,2,15,177,190,2,16,156,0,3,5,234,150,3,6,230,5,3,13,248,40,3,14,255,0,3,15,218,0],secondary:!0},{width:9,bonus:130,chr:'"',
pixels:[2,1,229,255,2,2,205,255,2,3,181,255,2,4,159,255,3,1,253,255,3,2,253,238,3,3,247,220,3,4,237,205,3,5,222,192,4,2,254,0,4,3,236,0,4,4,213,0,4,5,190,0,4,6,167,0,5,1,185,255,5,2,163,252,6,1,255,255,6,2,255,255,6,3,254,254,6,4,245,243,6,5,231,233,7,2,255,22,7,3,255,2,7,4,253,0,7,5,233,0,7,6,211,0],
secondary:!0},{width:6,bonus:70,chr:"'",pixels:[2,1,229,255,2,2,205,255,2,3,181,255,2,4,159,255,3,1,253,255,3,2,253,238,3,3,247,220,3,4,237,205,3,5,222,192,4,2,254,0,4,3,236,0,4,4,213,0,4,5,190,0,4,6,167,0],secondary:!0},{width:10,bonus:155,chr:"<",
pixels:[1,8,243,255,2,7,225,255,2,8,245,249,2,9,249,134,3,7,213,254,3,8,236,93,3,9,254,240,4,6,237,255,4,7,161,134,4,8,212,2,4,9,232,243,4,10,247,122,5,6,210,251,5,7,237,1,5,10,252,234,6,5,245,255,6,6,170,115,6,7,207,0,6,10,245,247,6,11,241,111,7,4,153,255,7,5,205,249,7,6,245,0,7,11,252,224,8,4,251,255,8,5,180,99,8,6,200,0,8,11,251,252,8,12,234,100,9,5,251,0,9,12,248,0],
secondary:!1},{width:10,bonus:145,chr:">",
pixels:[1,4,251,255,1,11,249,255,2,4,168,232,2,5,254,201,2,11,225,251,2,12,249,3,3,5,251,249,3,6,216,89,3,10,237,255,3,11,182,147,3,12,222,0,4,6,252,208,4,10,232,254,4,11,237,8,5,6,246,246,5,7,221,94,5,9,219,255,5,10,176,171,5,11,231,0,6,7,252,214,6,9,238,255,6,10,221,15,7,7,238,241,7,8,252,241,7,9,172,194,7,10,238,0,8,8,254,246,8,9,239,20,9,9,245,0],
secondary:!1},{width:8,bonus:180,chr:"\\",
pixels:[1,0,191,252,2,0,253,192,2,1,253,249,2,2,255,255,2,3,246,252,2,4,183,253,3,1,192,10,3,2,249,66,3,3,255,131,3,4,253,198,3,5,253,252,3,6,255,255,3,7,241,252,3,8,175,255,4,5,198,14,4,6,251,72,4,7,255,137,4,8,252,205,4,9,254,252,4,10,255,255,4,11,235,251,4,12,167,255,5,9,205,19,5,10,253,77,5,11,255,143,5,12,251,212,5,13,254,255,5,14,255,255,5,15,230,250,5,16,161,255,6,13,212,24,6,14,254,83,6,15,255,149,6,16,250,219,6,17,161,0,7,17,215,0],
secondary:!1},{width:4,bonus:35,chr:".",pixels:[1,11,161,255,1,12,249,255,1,13,197,255,2,12,218,181,2,13,251,105,2,14,198,0,3,13,155,0],secondary:!0},{width:5,bonus:55,chr:",",
pixels:[1,12,167,255,1,13,219,255,1,14,255,255,1,15,242,254,2,12,255,255,2,13,242,231,2,14,236,126,2,15,255,14,2,16,241,0,3,13,255,1,3,14,220,0],secondary:!0},{width:10,bonus:265,chr:"|",
pixels:[4,0,255,255,4,1,255,255,4,2,255,255,4,3,255,255,4,4,255,255,4,5,255,255,4,6,255,255,4,7,255,255,4,8,255,255,4,9,255,255,4,10,255,255,4,11,255,255,4,12,255,255,4,13,255,255,4,14,255,255,4,15,255,255,4,16,255,255,5,0,254,164,5,1,254,164,5,2,254,164,5,3,254,164,5,4,254,164,5,5,254,164,5,6,254,164,5,7,254,164,5,8,254,164,5,9,254,164,5,10,254,164,5,11,254,164,5,12,254,164,5,13,254,164,5,14,254,164,5,15,254,164,5,16,254,164,5,17,255,0,6,0,164,0,6,1,164,0,6,2,164,0,6,3,164,0,6,4,164,0,6,5,164,0,6,6,164,0,6,7,164,0,6,8,164,0,6,9,164,0,6,10,164,0,6,11,164,0,6,12,164,0,6,13,164,0,6,14,164,0,6,15,164,0,6,16,164,0,6,17,164,0],
secondary:!1}],width:17,spacewidth:5,shadow:!0,height:19,basey:13}}],e={},function o(r){var n=e[r];if(void 0!==n)return n.exports;var i=e[r]={exports:{}};return s[r](i,i.exports,o),i.exports}(0);var s,e}));

/***/ }),

/***/ "../node_modules/.pnpm/@alt1+ocr@1.0.0-alpha.7/node_modules/@alt1/ocr/fonts/chatbox/20pt.js":
/*!**************************************************************************************************!*\
  !*** ../node_modules/.pnpm/@alt1+ocr@1.0.0-alpha.7/node_modules/@alt1/ocr/fonts/chatbox/20pt.js ***!
  \**************************************************************************************************/
/***/ (function(module) {

!function(s,e){ true?module.exports=e():0}("undefined"!=typeof self?self:this,(()=>{
return s=[s=>{s.exports={chars:[{width:11,bonus:380,chr:"a",
pixels:[1,10,221,255,1,11,247,255,1,12,215,255,2,9,255,255,2,10,254,255,2,11,250,226,2,12,254,245,2,13,255,255,2,14,180,167,3,5,225,249,3,8,199,255,3,9,244,250,3,10,255,47,3,11,254,0,3,12,223,19,3,13,253,215,3,14,255,219,4,4,209,255,4,5,214,192,4,6,220,0,4,8,251,255,4,9,232,164,4,10,240,0,4,14,254,250,4,15,219,0,5,4,241,255,5,5,233,142,5,6,161,0,5,8,255,255,5,9,253,105,5,14,240,239,5,15,249,0,6,4,245,255,6,5,249,147,6,8,255,255,6,9,255,85,6,13,223,255,6,14,205,171,6,15,225,0,7,4,203,255,7,5,254,234,7,6,167,81,7,8,255,255,7,9,255,84,7,12,187,255,7,13,189,252,7,14,224,10,8,5,255,255,8,6,255,255,8,7,255,255,8,8,255,255,8,9,255,255,8,10,255,255,8,11,255,255,8,12,255,255,8,13,245,226,8,14,230,179,9,6,255,175,9,7,254,204,9,8,255,208,9,9,255,208,9,10,255,208,9,11,255,208,9,12,255,208,9,13,255,208,9,14,248,214,9,15,162,0,10,7,175,0,10,8,204,0,10,9,208,0,10,10,208,0,10,11,208,0,10,12,208,0,10,13,208,0,10,14,208,0,10,15,208,0],
secondary:!1},{width:13,bonus:460,chr:"b",
pixels:[2,0,255,255,2,1,255,255,2,2,255,255,2,3,255,255,2,4,255,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,2,11,255,255,2,12,255,255,2,13,255,255,2,14,255,255,3,0,208,255,3,1,255,208,3,2,255,208,3,3,254,207,3,4,255,196,3,5,254,219,3,6,255,255,3,7,255,251,3,8,254,221,3,9,254,210,3,10,254,222,3,11,255,253,3,12,255,255,3,13,255,205,3,14,255,108,3,15,255,0,4,1,208,0,4,2,208,0,4,3,208,0,4,4,213,47,4,5,251,241,4,6,238,144,4,7,255,14,4,8,251,0,4,9,220,0,4,10,210,0,4,11,224,19,4,12,254,141,4,13,254,240,4,14,213,49,5,4,172,255,5,5,205,244,5,6,237,0,5,13,230,222,5,14,250,177,6,4,235,255,6,5,216,162,6,6,196,0,6,14,251,241,6,15,174,0,7,4,247,255,7,5,247,151,7,14,252,252,7,15,237,0,8,4,211,255,8,5,254,220,8,13,213,255,8,14,235,231,8,15,249,0,9,5,255,255,9,6,247,205,9,12,203,255,9,13,255,255,9,14,232,123,9,15,213,0,10,5,198,197,10,6,255,255,10,7,255,255,10,8,255,255,10,9,255,255,10,10,255,255,10,11,255,255,10,12,255,255,10,13,234,167,10,14,255,2,11,6,175,84,11,7,255,146,11,8,255,190,11,9,255,203,11,10,255,189,11,11,255,146,11,12,254,58,11,13,255,0,11,14,153,0,12,9,190,0,12,10,203,0,12,11,189,0],
secondary:!1},{width:9,bonus:240,chr:"c",
pixels:[1,7,190,255,1,8,237,255,1,9,251,255,1,10,239,255,1,11,195,255,2,5,179,255,2,6,255,255,2,7,255,255,2,8,250,240,2,9,252,216,2,10,255,235,2,11,255,255,2,12,255,255,2,13,217,225,3,5,255,255,3,6,226,179,3,7,255,33,3,8,255,0,3,9,235,0,3,10,214,0,3,11,238,34,3,12,255,158,3,13,255,255,3,14,222,145,4,4,208,255,4,5,223,226,4,6,255,0,4,7,159,0,4,13,231,214,4,14,255,215,5,4,245,255,5,5,232,142,5,6,197,0,5,14,254,250,5,15,215,0,6,4,239,255,6,5,251,141,6,14,247,247,6,15,249,0,7,4,207,255,7,5,252,201,7,13,191,255,7,14,229,220,7,15,239,0,8,5,222,90,8,6,199,0,8,14,207,82,8,15,197,0],
secondary:!1},{width:13,bonus:475,chr:"d",
pixels:[1,7,193,255,1,8,237,255,1,9,251,255,1,10,239,255,1,11,196,255,2,5,197,255,2,6,255,255,2,7,255,255,2,8,251,241,2,9,252,216,2,10,254,234,2,11,255,255,2,12,255,255,2,13,225,229,3,5,255,255,3,6,235,182,3,7,255,38,3,8,255,0,3,9,237,0,3,10,214,0,3,11,236,34,3,12,255,163,3,13,255,255,3,14,231,156,4,4,223,255,4,5,229,222,4,6,255,1,4,7,168,0,4,13,236,219,4,14,255,225,5,4,249,255,5,5,239,138,5,6,199,0,5,14,253,252,5,15,225,0,6,4,227,255,6,5,252,151,6,14,242,240,6,15,250,0,7,5,251,225,7,6,154,18,7,13,215,255,7,14,209,179,7,15,228,0,8,5,236,229,8,6,247,197,8,12,173,255,8,13,210,253,8,14,217,20,9,0,255,255,9,1,255,255,9,2,255,255,9,3,255,255,9,4,249,255,9,5,242,255,9,6,255,255,9,7,255,255,9,8,255,255,9,9,255,255,9,10,255,255,9,11,255,255,9,12,255,255,9,13,248,240,9,14,242,196,10,0,208,255,10,1,255,208,10,2,255,208,10,3,255,208,10,4,255,208,10,5,254,209,10,6,253,210,10,7,255,208,10,8,255,208,10,9,255,208,10,10,255,208,10,11,255,208,10,12,255,208,10,13,255,208,10,14,252,211,10,15,186,0,11,1,208,0,11,2,208,0,11,3,208,0,11,4,208,0,11,5,208,0,11,6,208,0,11,7,208,0,11,8,208,0,11,9,208,0,11,10,208,0,11,11,208,0,11,12,208,0,11,13,208,0,11,14,208,0,11,15,208,0],
secondary:!1},{width:11,bonus:345,chr:"e",
pixels:[1,7,185,255,1,8,235,255,1,9,251,255,1,10,237,255,1,11,189,255,2,5,175,255,2,6,255,255,2,7,246,251,2,8,255,255,2,9,253,232,2,10,255,243,2,11,255,255,2,12,255,255,2,13,197,214,3,5,254,255,3,6,208,126,3,7,255,38,3,8,255,255,3,9,255,84,3,10,230,0,3,11,245,53,3,12,255,189,3,13,255,255,3,14,201,130,4,4,215,255,4,5,215,211,4,6,254,0,4,8,255,255,4,9,255,84,4,13,245,227,4,14,255,201,5,4,249,255,5,5,236,141,5,6,178,0,5,8,255,255,5,9,255,84,5,14,254,246,5,15,201,0,6,4,233,255,6,5,252,157,6,8,255,255,6,9,255,84,6,14,253,253,6,15,245,0,7,4,165,255,7,5,254,246,7,6,176,79,7,8,255,255,7,9,255,84,7,13,155,255,7,14,242,242,7,15,251,0,8,5,248,242,8,6,254,255,8,7,235,249,8,8,255,255,8,9,255,84,8,13,221,255,8,14,220,193,8,15,229,0,9,6,247,169,9,7,254,234,9,8,254,255,9,9,255,84,9,14,229,60,9,15,166,0,10,7,164,0,10,8,234,0,10,9,254,0],
secondary:!1},{width:8,bonus:270,chr:"f",
pixels:[2,4,225,255,2,5,195,157,3,2,225,255,3,3,253,255,3,4,255,255,3,5,255,255,3,6,255,255,3,7,255,255,3,8,255,255,3,9,255,255,3,10,255,255,3,11,255,255,3,12,255,255,3,13,255,255,3,14,255,255,4,1,255,255,4,2,248,246,4,3,249,215,4,4,255,255,4,5,254,231,4,6,255,208,4,7,255,208,4,8,255,208,4,9,255,208,4,10,255,208,4,11,255,208,4,12,255,208,4,13,255,208,4,14,255,208,4,15,255,0,5,0,227,255,5,1,226,209,5,2,255,5,5,3,239,0,5,4,255,255,5,5,254,120,5,6,230,0,5,7,208,0,5,8,208,0,5,9,208,0,5,10,208,0,5,11,208,0,5,12,208,0,5,13,208,0,5,14,208,0,5,15,208,0,6,0,245,255,6,1,242,140,6,2,186,0,6,4,255,255,6,5,254,120,7,0,199,255,7,1,251,130,7,5,255,0],
secondary:!1},{width:13,bonus:530,chr:"g",
pixels:[1,7,191,255,1,8,237,255,1,9,251,255,1,10,239,255,1,11,196,255,2,5,191,255,2,6,255,255,2,7,255,255,2,8,250,240,2,9,252,216,2,10,255,235,2,11,255,255,2,12,255,255,2,13,225,229,2,18,255,255,3,5,255,255,3,6,233,183,3,7,255,37,3,8,255,0,3,9,236,0,3,10,214,0,3,11,238,34,3,12,255,158,3,13,255,255,3,14,231,156,3,18,208,245,3,19,255,199,4,4,223,255,4,5,227,222,4,6,255,0,4,7,167,0,4,13,231,214,4,14,254,227,4,18,157,255,4,19,249,235,5,4,249,255,5,5,239,137,5,6,197,0,5,14,253,252,5,15,226,0,5,19,253,251,6,4,225,255,6,5,253,154,6,14,241,240,6,15,250,0,6,19,250,250,7,5,251,227,7,6,157,21,7,13,215,255,7,14,206,174,7,15,227,0,7,18,219,255,7,19,235,227,8,5,234,226,8,6,248,200,8,12,173,255,8,13,198,253,8,14,217,15,8,17,189,255,8,18,255,255,8,19,237,139,9,4,187,255,9,5,235,253,9,6,255,255,9,7,255,255,9,8,255,255,9,9,255,255,9,10,255,255,9,11,255,255,9,12,255,255,9,13,255,255,9,14,255,255,9,15,255,255,9,16,255,255,9,17,255,255,9,18,241,215,9,19,255,11,10,4,208,255,10,5,243,219,10,6,252,211,10,7,255,208,10,8,255,208,10,9,255,208,10,10,255,208,10,11,255,208,10,12,255,208,10,13,255,208,10,14,255,208,10,15,255,202,10,16,255,175,10,17,255,104,10,18,255,8,10,19,203,0,11,5,208,0,11,6,208,0,11,7,208,0,11,8,208,0,11,9,208,0,11,10,208,0,11,11,208,0,11,12,208,0,11,13,208,0,11,14,208,0,11,15,208,0,11,16,202,0,11,17,175,0],
secondary:!1},{width:13,bonus:435,chr:"h",
pixels:[2,0,255,255,2,1,255,255,2,2,255,255,2,3,255,255,2,4,255,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,2,11,255,255,2,12,255,255,2,13,255,255,2,14,255,255,3,0,208,255,3,1,255,208,3,2,255,208,3,3,255,208,3,4,255,203,3,5,255,215,3,6,255,255,3,7,255,251,3,8,254,221,3,9,255,208,3,10,255,208,3,11,255,208,3,12,255,208,3,13,255,208,3,14,255,208,3,15,255,0,4,1,208,0,4,2,208,0,4,3,208,0,4,4,215,43,4,5,250,238,4,6,236,148,4,7,255,14,4,8,251,0,4,9,220,0,4,10,208,0,4,11,208,0,4,12,208,0,4,13,208,0,4,14,208,0,4,15,208,0,5,4,172,255,5,5,203,245,5,6,233,0,6,4,237,255,6,5,216,162,6,6,195,0,7,4,241,255,7,5,248,150,8,4,203,255,8,5,254,240,8,6,167,75,9,5,255,255,9,6,254,255,9,7,231,249,9,8,208,255,9,9,208,255,9,10,208,255,9,11,208,255,9,12,208,255,9,13,208,255,9,14,208,255,10,5,160,169,10,6,255,211,10,7,254,249,10,8,255,255,10,9,255,255,10,10,255,255,10,11,255,255,10,12,255,255,10,13,255,255,10,14,255,255,10,15,208,0,11,7,211,0,11,8,248,0,11,9,255,0,11,10,255,0,11,11,255,0,11,12,255,0,11,13,255,0,11,14,255,0,11,15,255,0],
secondary:!1},{width:6,bonus:205,chr:"i",
pixels:[2,0,205,255,2,1,229,255,2,4,255,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,2,11,255,255,2,12,255,255,2,13,255,255,2,14,255,255,3,0,155,255,3,1,240,190,3,2,230,9,3,4,208,255,3,5,255,208,3,6,255,208,3,7,255,208,3,8,255,208,3,9,255,208,3,10,255,208,3,11,255,208,3,12,255,208,3,13,255,208,3,14,255,208,3,15,255,0,4,1,156,0,4,2,179,0,4,5,208,0,4,6,208,0,4,7,208,0,4,8,208,0,4,9,208,0,4,10,208,0,4,11,208,0,4,12,208,0,4,13,208,0,4,14,208,0,4,15,208,0],
secondary:!1},{width:6,bonus:280,chr:"j",
pixels:[0,19,253,251,1,18,208,255,1,19,239,238,2,0,205,255,2,1,229,255,2,4,255,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,2,11,255,255,2,12,255,255,2,13,255,255,2,14,255,255,2,15,255,255,2,16,255,255,2,17,255,255,2,18,255,255,2,19,231,137,3,0,155,255,3,1,240,190,3,2,230,9,3,4,208,255,3,5,255,208,3,6,255,208,3,7,255,208,3,8,255,208,3,9,255,208,3,10,255,208,3,11,255,208,3,12,255,208,3,13,255,208,3,14,255,208,3,15,255,208,3,16,254,207,3,17,255,178,3,18,255,99,3,19,255,2,4,1,156,0,4,2,179,0,4,5,208,0,4,6,208,0,4,7,208,0,4,8,208,0,4,9,208,0,4,10,208,0,4,11,208,0,4,12,208,0,4,13,208,0,4,14,208,0,4,15,208,0,4,16,208,0,4,17,206,0,4,18,178,0],
secondary:!1},{width:11,bonus:400,chr:"k",
pixels:[2,0,255,255,2,1,255,255,2,2,255,255,2,3,255,255,2,4,255,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,2,11,255,255,2,12,255,255,2,13,255,255,2,14,255,255,3,0,208,255,3,1,255,208,3,2,255,208,3,3,255,208,3,4,255,208,3,5,255,208,3,6,255,208,3,7,255,208,3,8,255,208,3,9,255,241,3,10,254,251,3,11,255,208,3,12,255,208,3,13,255,208,3,14,255,208,3,15,255,0,4,1,208,0,4,2,208,0,4,3,208,0,4,4,208,0,4,5,208,0,4,6,208,0,4,7,208,0,4,8,230,134,4,9,254,252,4,10,246,94,4,11,250,0,4,12,208,0,4,13,208,0,4,14,208,0,4,15,208,0,5,7,163,255,5,8,255,255,5,9,254,254,5,10,252,133,6,6,184,255,6,7,254,255,6,8,208,154,6,9,254,204,6,10,255,255,6,11,227,222,7,5,202,255,7,6,250,255,7,7,209,110,7,8,254,0,7,10,233,156,7,11,255,255,7,12,251,243,8,4,217,255,8,5,246,254,8,6,218,87,8,7,250,0,8,11,175,109,8,12,254,237,8,13,255,255,8,14,190,211,9,4,239,255,9,5,226,66,9,6,246,0,9,13,250,197,9,14,255,255,9,15,157,0,10,5,239,0,10,14,224,147,10,15,255,0],
secondary:!1},{width:6,bonus:230,chr:"l",
pixels:[2,0,255,255,2,1,255,255,2,2,255,255,2,3,255,255,2,4,255,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,2,11,255,255,2,12,255,255,2,13,255,255,2,14,255,255,3,0,208,255,3,1,255,208,3,2,255,208,3,3,255,208,3,4,255,208,3,5,255,208,3,6,255,208,3,7,255,208,3,8,255,208,3,9,255,208,3,10,255,208,3,11,255,208,3,12,255,208,3,13,255,208,3,14,255,208,3,15,255,0,4,1,208,0,4,2,208,0,4,3,208,0,4,4,208,0,4,5,208,0,4,6,208,0,4,7,208,0,4,8,208,0,4,9,208,0,4,10,208,0,4,11,208,0,4,12,208,0,4,13,208,0,4,14,208,0,4,15,208,0],
secondary:!1},{width:19,bonus:580,chr:"m",
pixels:[2,4,255,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,2,11,255,255,2,12,255,255,2,13,255,255,2,14,255,255,3,5,255,205,3,6,255,255,3,7,255,251,3,8,254,221,3,9,255,208,3,10,255,208,3,11,255,208,3,12,255,208,3,13,255,208,3,14,255,208,3,15,255,0,4,5,245,243,4,6,231,144,4,7,255,12,4,8,251,0,4,9,220,0,4,10,208,0,4,11,208,0,4,12,208,0,4,13,208,0,4,14,208,0,4,15,208,0,5,4,172,255,5,5,198,243,5,6,233,0,6,4,239,255,6,5,216,159,6,6,189,0,7,4,245,255,7,5,249,159,8,4,203,255,8,5,254,249,8,6,190,121,9,5,255,255,9,6,255,255,9,7,255,255,9,8,255,255,9,9,255,255,9,10,255,255,9,11,255,255,9,12,255,255,9,13,255,255,9,14,255,255,10,5,167,190,10,6,255,255,10,7,254,251,10,8,255,223,10,9,255,208,10,10,255,208,10,11,255,208,10,12,255,208,10,13,255,208,10,14,255,208,10,15,255,0,11,5,249,255,11,6,191,174,11,7,255,11,11,8,250,0,11,9,223,0,11,10,208,0,11,11,208,0,11,12,208,0,11,13,208,0,11,14,208,0,11,15,208,0,12,4,181,255,12,5,201,238,12,6,249,0,13,4,239,255,13,5,219,155,13,6,188,0,14,4,239,255,14,5,249,159,15,4,197,255,15,5,254,249,15,6,191,123,16,5,254,255,16,6,255,255,16,7,255,255,16,8,255,255,16,9,255,255,16,10,255,255,16,11,255,255,16,12,255,255,16,13,255,255,16,14,255,255,17,6,254,164,17,7,254,201,17,8,255,208,17,9,255,208,17,10,255,208,17,11,255,208,17,12,255,208,17,13,255,208,17,14,255,208,17,15,255,0,18,7,164,0,18,8,200,0,18,9,208,0,18,10,208,0,18,11,208,0,18,12,208,0,18,13,208,0,18,14,208,0,18,15,208,0],
secondary:!1},{width:13,bonus:370,chr:"n",
pixels:[2,4,255,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,2,11,255,255,2,12,255,255,2,13,255,255,2,14,255,255,3,5,255,205,3,6,255,255,3,7,255,251,3,8,254,221,3,9,255,208,3,10,255,208,3,11,255,208,3,12,255,208,3,13,255,208,3,14,255,208,3,15,255,0,4,5,245,243,4,6,232,148,4,7,255,13,4,8,251,0,4,9,220,0,4,10,208,0,4,11,208,0,4,12,208,0,4,13,208,0,4,14,208,0,4,15,208,0,5,4,167,255,5,5,202,245,5,6,233,0,6,4,235,255,6,5,215,163,6,6,194,0,7,4,241,255,7,5,247,151,8,4,205,255,8,5,254,240,8,6,167,75,9,5,255,255,9,6,254,255,9,7,231,249,9,8,208,255,9,9,208,255,9,10,208,255,9,11,208,255,9,12,208,255,9,13,208,255,9,14,208,255,10,5,159,167,10,6,255,209,10,7,254,249,10,8,255,255,10,9,255,255,10,10,255,255,10,11,255,255,10,12,255,255,10,13,255,255,10,14,255,255,10,15,208,0,11,7,209,0,11,8,248,0,11,9,255,0,11,10,255,0,11,11,255,0,11,12,255,0,11,13,255,0,11,14,255,0,11,15,255,0],
secondary:!1},{width:12,bonus:370,chr:"o",
pixels:[1,7,189,255,1,8,237,255,1,9,249,255,1,10,231,255,1,11,177,255,2,5,172,255,2,6,255,255,2,7,255,255,2,8,250,240,2,9,252,218,2,10,254,239,2,11,255,255,2,12,255,255,2,13,183,213,3,5,255,255,3,6,227,190,3,7,255,32,3,8,255,0,3,9,235,0,3,10,215,0,3,11,241,43,3,12,254,174,3,13,255,255,3,14,189,126,4,4,203,255,4,5,228,233,4,6,255,4,4,7,169,0,4,13,240,220,4,14,255,199,5,4,243,255,5,5,232,155,5,6,208,0,5,14,252,245,5,15,199,0,6,4,245,255,6,5,250,137,6,14,250,250,6,15,242,0,7,4,201,255,7,5,253,211,7,13,209,255,7,14,230,224,7,15,245,0,8,5,255,255,8,6,240,186,8,12,177,255,8,13,255,255,8,14,227,113,8,15,202,0,9,5,194,204,9,6,255,255,9,7,255,255,9,8,240,253,9,9,215,255,9,10,239,255,9,11,255,255,9,12,255,255,9,13,226,182,9,14,255,1,10,6,186,111,10,7,255,184,10,8,254,237,10,9,255,251,10,10,252,238,10,11,251,188,10,12,255,85,10,13,255,0,10,14,161,0,11,8,184,0,11,9,236,0,11,10,251,0,11,11,235,0,11,12,185,0],
secondary:!1},{width:13,bonus:460,chr:"p",
pixels:[2,4,255,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,2,11,255,255,2,12,255,255,2,13,255,255,2,14,255,255,2,15,255,255,2,16,255,255,2,17,255,255,2,18,255,255,2,19,255,255,3,5,255,207,3,6,255,255,3,7,255,249,3,8,254,216,3,9,255,209,3,10,254,225,3,11,255,253,3,12,255,255,3,13,254,221,3,14,255,196,3,15,255,207,3,16,255,208,3,17,255,208,3,18,255,208,3,19,255,208,4,5,244,241,4,6,232,143,4,7,255,10,4,8,249,0,4,9,216,0,4,10,209,0,4,11,226,22,4,12,254,149,4,13,255,239,4,14,225,44,4,15,196,0,4,16,207,0,4,17,208,0,4,18,208,0,4,19,208,0,5,4,165,255,5,5,202,246,5,6,231,0,5,13,233,223,5,14,250,176,6,4,235,255,6,5,213,165,6,6,195,0,6,14,251,241,6,15,172,0,7,4,247,255,7,5,246,142,7,14,252,252,7,15,237,0,8,4,213,255,8,5,254,222,8,13,221,255,8,14,235,231,8,15,249,0,9,5,255,255,9,6,249,214,9,12,213,255,9,13,255,255,9,14,236,119,9,15,213,0,10,5,201,199,10,6,255,255,10,7,255,255,10,8,255,255,10,9,255,255,10,10,255,255,10,11,255,255,10,12,255,255,10,13,237,161,10,14,255,2,11,6,179,84,11,7,255,147,11,8,255,190,11,9,255,203,11,10,255,189,11,11,254,144,11,12,255,55,11,13,255,0,12,9,190,0,12,10,203,0,12,11,189,0],
secondary:!1},{width:13,bonus:480,chr:"q",
pixels:[1,7,193,255,1,8,237,255,1,9,251,255,1,10,239,255,1,11,196,255,2,5,193,255,2,6,255,255,2,7,255,255,2,8,251,241,2,9,252,216,2,10,254,234,2,11,255,255,2,12,255,255,2,13,226,229,3,5,255,255,3,6,234,185,3,7,255,40,3,8,255,0,3,9,237,0,3,10,214,0,3,11,237,34,3,12,255,160,3,13,255,255,3,14,232,157,4,4,221,255,4,5,229,222,4,6,255,1,4,7,170,0,4,13,233,215,4,14,255,227,5,4,249,255,5,5,238,138,5,6,199,0,5,14,253,252,5,15,227,0,6,4,227,255,6,5,252,153,6,14,240,240,6,15,250,0,7,5,251,225,7,6,156,20,7,13,213,255,7,14,206,177,7,15,226,0,8,5,233,224,8,6,246,199,8,12,169,255,8,13,204,254,8,14,215,18,9,4,181,255,9,5,231,254,9,6,255,255,9,7,255,255,9,8,255,255,9,9,255,255,9,10,255,255,9,11,255,255,9,12,255,255,9,13,252,248,9,14,254,252,9,15,255,255,9,16,255,255,9,17,255,255,9,18,255,255,9,19,255,255,10,4,208,255,10,5,242,220,10,6,251,212,10,7,255,208,10,8,255,208,10,9,255,208,10,10,255,208,10,11,255,208,10,12,255,208,10,13,255,208,10,14,254,209,10,15,255,208,10,16,255,208,10,17,255,208,10,18,255,208,10,19,255,208,11,5,208,0,11,6,208,0,11,7,208,0,11,8,208,0,11,9,208,0,11,10,208,0,11,11,208,0,11,12,208,0,11,13,208,0,11,14,208,0,11,15,208,0,11,16,208,0,11,17,208,0,11,18,208,0,11,19,208,0],
secondary:!1},{width:9,bonus:210,chr:"r",
pixels:[2,4,255,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,2,11,255,255,2,12,255,255,2,13,255,255,2,14,255,255,3,5,255,169,3,6,255,255,3,7,255,255,3,8,255,225,3,9,255,208,3,10,255,208,3,11,255,208,3,12,255,208,3,13,255,208,3,14,255,208,3,15,255,0,4,5,231,224,4,6,234,210,4,7,255,40,4,8,255,0,4,9,225,0,4,10,208,0,4,11,208,0,4,12,208,0,4,13,208,0,4,14,208,0,4,15,208,0,5,5,225,253,5,6,205,13,5,7,193,0,6,4,235,255,6,5,207,169,6,6,223,0,7,4,245,255,7,5,246,142,8,5,245,24],
secondary:!1},{width:10,bonus:280,chr:"s",
pixels:[1,5,154,255,1,6,245,255,1,7,227,255,1,13,255,255,2,5,255,255,2,6,245,239,2,7,254,249,2,8,254,249,2,13,205,246,2,14,255,203,3,4,203,255,3,5,225,229,3,6,255,3,3,7,234,58,3,8,255,253,3,9,251,152,3,14,250,238,3,15,203,0,4,4,237,255,4,5,229,147,4,6,202,0,4,8,190,232,4,9,255,243,4,10,155,22,4,14,252,252,4,15,234,0,5,4,245,255,5,5,247,139,5,9,255,255,5,10,248,112,5,14,240,240,5,15,249,0,6,4,217,255,6,5,252,177,6,9,229,245,6,10,255,233,6,13,235,255,6,14,222,202,6,15,226,0,7,4,158,255,7,5,254,246,7,6,178,11,7,10,255,255,7,11,255,255,7,12,255,255,7,13,253,255,7,14,240,65,7,15,176,0,8,5,179,82,8,6,245,0,8,11,254,195,8,12,255,185,8,13,255,78,8,14,253,0,9,12,194,0,9,13,185,0],
secondary:!1},{width:8,bonus:230,chr:"t",
pixels:[1,4,181,255,2,3,158,255,2,4,255,255,2,5,247,237,2,6,231,230,2,7,208,255,2,8,208,255,2,9,208,255,2,10,208,255,2,11,205,255,2,12,181,255,3,2,255,255,3,3,255,255,3,4,255,255,3,5,255,255,3,6,255,255,3,7,255,255,3,8,255,255,3,9,255,255,3,10,255,255,3,11,255,255,3,12,255,255,3,13,255,255,3,14,182,184,4,3,255,0,4,4,255,255,4,5,254,120,4,6,255,0,4,7,255,0,4,8,255,0,4,9,255,0,4,10,255,0,4,11,255,2,4,12,255,43,4,13,254,216,4,14,255,225,5,4,255,255,5,5,254,120,5,14,253,250,5,15,225,0,6,4,255,255,6,5,254,120,6,14,235,234,6,15,248,0,7,5,255,0,7,15,216,0],
secondary:!1},{width:13,bonus:370,chr:"u",
pixels:[2,4,255,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,2,11,249,255,2,12,213,255,3,4,208,255,3,5,255,208,3,6,255,208,3,7,255,208,3,8,255,208,3,9,255,208,3,10,255,208,3,11,254,225,3,12,254,255,3,13,255,255,3,14,164,150,4,5,208,0,4,6,208,0,4,7,208,0,4,8,208,0,4,9,208,0,4,10,208,0,4,11,208,0,4,12,229,50,4,13,254,237,4,14,254,207,5,13,163,225,5,14,254,244,5,15,206,0,6,14,247,245,6,15,243,0,7,13,193,255,7,14,217,206,7,15,238,0,8,13,235,255,8,14,204,50,8,15,175,0,9,4,208,255,9,5,208,255,9,6,208,255,9,7,208,255,9,8,208,255,9,9,208,255,9,10,221,255,9,11,251,255,9,12,255,255,9,13,235,229,9,14,247,150,10,4,255,255,10,5,255,255,10,6,255,255,10,7,255,255,10,8,255,255,10,9,255,255,10,10,255,255,10,11,255,255,10,12,255,255,10,13,255,255,10,14,255,255,11,5,255,0,11,6,255,0,11,7,255,0,11,8,255,0,11,9,255,0,11,10,255,0,11,11,255,0,11,12,255,0,11,13,255,0,11,14,255,0,11,15,255,0],
secondary:!1},{width:10,bonus:275,chr:"v",
pixels:[0,4,209,255,1,4,251,255,1,5,255,255,1,6,253,253,1,7,188,245,2,5,252,106,2,6,255,195,2,7,254,255,2,8,255,255,2,9,244,250,2,10,157,251,3,7,202,38,3,8,255,118,3,9,255,207,3,10,255,255,3,11,255,255,3,12,228,246,4,10,215,48,4,11,255,123,4,12,255,201,4,13,254,252,4,14,254,255,5,12,209,204,5,13,252,244,5,14,255,255,5,15,254,0,6,9,167,255,6,10,245,255,6,11,255,255,6,12,247,252,6,13,223,184,6,14,244,70,6,15,255,0,7,6,154,255,7,7,237,255,7,8,255,255,7,9,254,255,7,10,233,208,7,11,248,98,7,12,255,12,7,13,244,0,7,14,161,0,8,4,227,255,8,5,255,255,8,6,255,255,8,7,241,232,8,8,246,129,8,9,255,31,8,10,254,0,8,11,190,0,9,4,239,255,9,5,244,160,9,6,254,58,9,7,255,0,9,8,219,0],
secondary:!1},{width:16,bonus:500,chr:"w",
pixels:[0,4,166,255,1,4,255,255,1,5,255,255,1,6,255,255,1,7,220,250,2,5,255,107,2,6,255,171,2,7,254,234,2,8,255,255,2,9,255,255,2,10,252,254,2,11,200,252,3,7,171,2,3,8,238,47,3,9,255,108,3,10,255,172,3,11,254,233,3,12,255,255,3,13,255,255,3,14,244,252,4,11,200,107,4,12,247,177,4,13,255,251,4,14,255,255,4,15,241,0,5,9,197,255,5,10,253,255,5,11,255,255,5,12,242,248,5,13,223,182,5,14,252,80,5,15,255,0,6,6,217,255,6,7,255,255,6,8,255,255,6,9,237,238,6,10,230,158,6,11,254,62,6,12,255,3,6,13,235,0,6,14,159,0,7,4,255,255,7,5,253,255,7,6,217,204,7,7,234,120,7,8,255,42,7,9,255,0,7,10,222,0,8,4,245,255,8,5,255,255,8,6,255,245,8,7,233,206,8,8,177,171,9,5,248,76,9,6,254,150,9,7,254,226,9,8,255,255,9,9,255,255,9,10,229,249,10,8,230,52,10,9,255,123,10,10,255,197,10,11,255,251,10,12,255,255,10,13,248,252,10,14,181,251,11,11,211,73,11,12,254,173,11,13,255,251,11,14,255,255,11,15,178,0,12,9,179,255,12,10,239,255,12,11,255,255,12,12,255,255,12,13,248,240,12,14,254,167,12,15,255,0,13,5,173,255,13,6,237,255,13,7,255,255,13,8,255,255,13,9,251,252,13,10,234,205,13,11,247,122,13,12,255,49,13,13,255,1,13,14,234,0,13,15,166,0,14,4,255,255,14,5,255,255,14,6,240,223,14,7,247,145,14,8,255,71,14,9,255,9,14,10,248,0,14,11,188,0,15,5,255,24,15,6,255,0,15,7,210,0],
secondary:!1},{width:11,bonus:300,chr:"x",
pixels:[1,4,247,255,1,13,155,255,1,14,255,255,2,4,215,255,2,5,255,255,2,6,218,221,2,12,221,255,2,13,255,255,2,14,223,199,2,15,255,0,3,5,237,149,3,6,254,252,3,7,251,243,3,11,253,255,3,12,241,251,3,13,234,98,3,14,255,0,3,15,174,0,4,6,164,85,4,7,254,215,4,8,255,255,4,9,242,248,4,10,255,255,4,11,220,207,4,12,253,24,4,13,237,0,5,8,254,252,5,9,255,255,5,10,253,231,5,11,255,38,5,12,178,0,6,6,159,255,6,7,255,255,6,8,232,243,6,9,253,128,6,10,254,245,6,11,254,246,7,5,229,255,7,6,255,255,7,7,217,181,7,8,255,12,7,9,221,0,7,11,252,200,7,12,255,255,7,13,223,226,8,4,255,255,8,5,238,248,8,6,236,81,8,7,255,0,8,8,154,0,8,12,225,140,8,13,254,251,8,14,252,248,9,4,171,255,9,5,255,19,9,6,231,0,9,14,254,215,9,15,246,0,10,5,171,0,10,15,214,0],
secondary:!1},{width:10,bonus:350,chr:"y",
pixels:[0,4,243,255,0,5,164,247,0,19,227,255,1,4,221,255,1,5,255,255,1,6,255,255,1,7,224,245,1,19,251,251,2,5,229,68,2,6,255,155,2,7,254,240,2,8,255,255,2,9,252,253,2,10,179,246,2,18,221,255,2,19,233,229,3,7,158,13,3,8,245,91,3,9,255,181,3,10,255,251,3,11,255,255,3,12,234,246,3,17,225,255,3,18,255,255,3,19,233,94,4,10,187,29,4,11,253,105,4,12,255,181,4,13,254,246,4,14,254,254,4,15,248,254,4,16,255,255,4,17,242,246,4,18,237,99,4,19,255,0,5,12,224,232,5,13,254,254,5,14,254,255,5,15,254,194,5,16,250,99,5,17,255,10,5,18,234,0,6,9,211,255,6,10,255,255,6,11,255,255,6,12,236,235,6,13,228,140,6,14,253,32,6,15,254,0,6,16,193,0,7,6,202,255,7,7,255,255,7,8,255,255,7,9,246,246,7,10,238,163,7,11,255,57,7,12,255,0,7,13,218,0,8,4,253,255,8,5,255,255,8,6,253,253,8,7,239,190,8,8,255,84,8,9,255,7,8,10,238,0,9,4,203,255,9,5,254,111,9,6,255,21,9,7,251,0,9,8,178,0],
secondary:!1},{width:10,bonus:305,chr:"z",
pixels:[1,13,202,255,1,14,255,255,2,4,255,255,2,12,239,255,2,13,255,255,2,14,255,255,2,15,255,0,3,4,255,255,3,5,254,120,3,11,255,255,3,12,255,255,3,13,253,225,3,14,255,255,3,15,255,0,4,4,255,255,4,5,254,120,4,9,207,255,4,10,255,255,4,11,243,238,4,12,255,72,4,13,254,120,4,14,255,255,4,15,255,0,5,4,255,255,5,5,254,120,5,8,243,255,5,9,255,255,5,10,236,168,5,11,255,15,5,12,227,0,5,13,157,195,5,14,255,255,5,15,255,0,6,4,255,255,6,5,255,129,6,6,203,197,6,7,255,255,6,8,237,244,6,9,247,75,6,10,255,0,6,11,156,0,6,14,255,255,6,15,255,0,7,4,255,255,7,5,255,251,7,6,255,255,7,7,216,184,7,8,255,15,7,9,227,0,7,14,255,255,7,15,255,0,8,4,255,255,8,5,255,227,8,6,252,73,8,7,255,0,8,8,156,0,8,14,255,255,8,15,255,0,9,5,255,0,9,6,227,0,9,15,255,0],
secondary:!1},{width:13,bonus:415,chr:"A",
pixels:[0,14,205,255,1,11,155,255,1,12,243,255,1,13,255,255,1,14,248,251,1,15,205,0,2,9,207,255,2,10,255,255,2,11,255,255,2,12,233,218,2,13,248,103,2,14,255,13,2,15,244,0,3,6,158,255,3,7,243,255,3,8,255,255,3,9,255,255,3,10,244,208,3,11,255,43,3,12,255,0,3,13,199,0,4,4,209,255,4,5,255,255,4,6,252,254,4,7,227,203,4,8,247,84,4,9,255,255,4,10,254,156,4,11,199,0,5,1,160,255,5,2,245,255,5,3,255,255,5,4,232,237,5,5,232,136,5,6,255,28,5,7,252,0,5,8,181,0,5,9,255,255,5,10,254,156,5,11,156,0,6,1,255,255,6,2,253,253,6,3,251,143,6,4,255,20,6,5,216,0,6,9,255,255,6,10,254,156,6,11,156,0,7,2,254,204,7,3,255,255,7,4,253,253,7,5,185,247,7,9,255,255,7,10,254,156,7,11,156,0,8,3,214,60,8,4,255,151,8,5,255,241,8,6,255,255,8,7,240,248,8,9,255,255,8,10,254,156,8,11,156,0,9,5,155,18,9,6,246,103,9,7,254,201,9,8,255,255,9,9,255,255,9,10,255,229,9,11,202,150,10,8,209,56,10,9,255,148,10,10,254,240,10,11,255,255,10,12,253,253,10,13,182,245,11,11,245,99,11,12,255,197,11,13,255,255,11,14,255,255,12,13,206,53,12,14,255,145,12,15,255,0],
secondary:!1},{width:13,bonus:540,chr:"B",
pixels:[2,1,255,255,2,2,255,255,2,3,255,255,2,4,255,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,2,11,255,255,2,12,255,255,2,13,255,255,2,14,255,255,3,1,255,255,3,2,254,231,3,3,255,208,3,4,255,208,3,5,255,208,3,6,254,215,3,7,255,255,3,8,255,223,3,9,255,208,3,10,255,208,3,11,255,208,3,12,255,208,3,13,254,231,3,14,255,255,3,15,255,0,4,1,255,255,4,2,254,120,4,3,230,0,4,4,208,0,4,5,208,0,4,6,215,43,4,7,255,255,4,8,255,84,4,9,223,0,4,10,208,0,4,11,208,0,4,12,208,0,4,13,229,134,4,14,255,255,4,15,255,0,5,1,255,255,5,2,254,120,5,7,255,255,5,8,255,84,5,14,255,255,5,15,255,0,6,1,251,255,6,2,255,122,6,7,255,255,6,8,255,85,6,14,255,255,6,15,255,0,7,1,239,255,7,2,253,138,7,7,255,255,7,8,255,107,7,14,252,252,7,15,255,0,8,1,209,255,8,2,251,192,8,7,255,255,8,8,255,160,8,13,193,255,8,14,239,234,8,15,249,0,9,2,254,255,9,3,216,123,9,6,223,255,9,7,202,210,9,8,255,247,9,9,185,91,9,13,255,255,9,14,229,167,9,15,220,0,10,2,252,250,10,3,255,255,10,4,255,255,10,5,255,255,10,6,225,247,10,7,226,20,10,8,242,231,10,9,255,255,10,10,234,248,10,11,237,255,10,12,255,255,10,13,244,248,10,14,255,29,11,3,252,175,11,4,254,198,11,5,255,151,11,6,255,27,11,7,218,0,11,9,244,188,11,10,255,239,11,11,253,244,11,12,249,184,11,13,255,42,11,14,237,0,12,4,173,0,12,5,198,0,12,10,180,0,12,11,239,0,12,12,242,0,12,13,180,0],
secondary:!1},{width:13,bonus:345,chr:"C",
pixels:[1,5,155,255,1,6,215,255,1,7,243,255,1,8,247,255,1,9,225,255,1,10,173,255,2,4,255,255,2,5,255,255,2,6,250,249,2,7,249,222,2,8,253,217,2,9,254,243,2,10,255,255,2,11,255,255,2,12,213,232,3,3,255,255,3,4,231,218,3,5,255,66,3,6,255,3,3,7,244,0,3,8,217,0,3,9,215,2,3,10,245,58,3,11,254,183,3,12,255,255,3,13,241,211,4,2,255,255,4,3,220,201,4,4,255,4,4,5,198,0,4,12,226,174,4,13,255,255,4,14,219,108,5,2,244,252,5,3,255,18,5,4,173,0,5,13,247,243,5,14,254,183,6,1,213,255,6,2,219,195,6,3,241,0,6,13,165,250,6,14,253,234,6,15,182,0,7,1,241,255,7,2,235,141,7,3,168,0,7,14,254,252,7,15,232,0,8,1,243,255,8,2,249,139,8,14,252,253,8,15,251,0,9,1,221,255,9,2,251,172,9,13,155,255,9,14,243,242,9,15,250,0,10,1,179,255,10,2,253,239,10,3,170,6,10,13,203,255,10,14,226,204,10,15,231,0,11,2,231,193,11,3,238,17,11,14,217,79,11,15,181,0,12,3,175,0],
secondary:!1},{width:14,bonus:520,chr:"D",
pixels:[2,1,255,255,2,2,255,255,2,3,255,255,2,4,255,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,2,11,255,255,2,12,255,255,2,13,255,255,2,14,255,255,3,1,255,255,3,2,254,231,3,3,255,208,3,4,255,208,3,5,255,208,3,6,255,208,3,7,255,208,3,8,255,208,3,9,255,208,3,10,255,208,3,11,255,208,3,12,255,208,3,13,254,231,3,14,255,255,3,15,255,0,4,1,255,255,4,2,254,120,4,3,230,0,4,4,208,0,4,5,208,0,4,6,208,0,4,7,208,0,4,8,208,0,4,9,208,0,4,10,208,0,4,11,208,0,4,12,208,0,4,13,229,134,4,14,255,255,4,15,255,0,5,1,255,255,5,2,254,120,5,14,255,255,5,15,255,0,6,1,249,255,6,2,255,129,6,14,249,250,6,15,255,0,7,1,229,255,7,2,253,161,7,13,173,255,7,14,238,235,7,15,244,0,8,1,178,255,8,2,252,232,8,3,162,9,8,13,241,255,8,14,225,183,8,15,220,0,9,2,255,255,9,3,243,142,9,12,161,255,9,13,255,255,9,14,245,69,9,15,162,0,10,2,214,230,10,3,255,255,10,4,213,199,10,11,184,255,10,12,255,255,10,13,223,194,10,14,255,0,11,3,239,204,11,4,255,255,11,5,255,255,11,6,242,252,11,7,215,255,11,8,217,255,11,9,243,255,11,10,255,255,11,11,255,255,11,12,231,189,11,13,255,11,11,14,170,0,12,4,213,102,12,5,255,175,12,6,255,227,12,7,254,249,12,8,253,246,12,9,249,225,12,10,250,165,12,11,255,66,12,12,255,0,12,13,171,0,13,6,175,0,13,7,227,0,13,8,248,0,13,9,244,0,13,10,220,0,13,11,162,0],
secondary:!1},{width:11,bonus:375,chr:"E",
pixels:[2,1,255,255,2,2,255,255,2,3,255,255,2,4,255,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,2,11,255,255,2,12,255,255,2,13,255,255,2,14,255,255,3,1,255,255,3,2,254,231,3,3,255,208,3,4,255,208,3,5,255,208,3,6,254,215,3,7,255,255,3,8,255,223,3,9,255,208,3,10,255,208,3,11,255,208,3,12,255,208,3,13,254,231,3,14,255,255,3,15,255,0,4,1,255,255,4,2,254,120,4,3,230,0,4,4,208,0,4,5,208,0,4,6,215,43,4,7,255,255,4,8,255,84,4,9,223,0,4,10,208,0,4,11,208,0,4,12,208,0,4,13,229,134,4,14,255,255,4,15,255,0,5,1,255,255,5,2,254,120,5,7,255,255,5,8,255,84,5,14,255,255,5,15,255,0,6,1,255,255,6,2,254,120,6,7,255,255,6,8,255,84,6,14,255,255,6,15,255,0,7,1,255,255,7,2,254,120,7,7,255,255,7,8,255,84,7,14,255,255,7,15,255,0,8,1,255,255,8,2,254,120,8,7,255,255,8,8,255,84,8,14,255,255,8,15,255,0,9,1,255,255,9,2,254,120,9,8,255,42,9,14,255,255,9,15,255,0,10,2,255,0,10,15,255,0],
secondary:!1},{width:11,bonus:320,chr:"F",
pixels:[2,1,255,255,2,2,255,255,2,3,255,255,2,4,255,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,2,11,255,255,2,12,255,255,2,13,255,255,2,14,255,255,3,1,255,255,3,2,254,231,3,3,255,208,3,4,255,208,3,5,255,208,3,6,255,208,3,7,254,215,3,8,255,255,3,9,255,223,3,10,255,208,3,11,255,208,3,12,255,208,3,13,255,208,3,14,255,208,3,15,255,0,4,1,255,255,4,2,254,120,4,3,230,0,4,4,208,0,4,5,208,0,4,6,208,0,4,7,215,43,4,8,255,255,4,9,255,84,4,10,223,0,4,11,208,0,4,12,208,0,4,13,208,0,4,14,208,0,4,15,208,0,5,1,255,255,5,2,254,120,5,8,255,255,5,9,255,84,6,1,255,255,6,2,254,120,6,8,255,255,6,9,255,84,7,1,255,255,7,2,254,120,7,8,255,255,7,9,255,84,8,1,255,255,8,2,254,120,8,8,255,255,8,9,255,84,9,1,255,255,9,2,254,120,9,9,255,42,10,2,255,0],
secondary:!1},{width:14,bonus:475,chr:"G",
pixels:[1,6,213,255,1,7,241,255,1,8,247,255,1,9,225,255,1,10,169,255,2,4,253,255,2,5,255,255,2,6,251,249,2,7,249,222,2,8,252,218,2,9,254,243,2,10,255,255,2,11,255,255,2,12,204,229,3,3,255,255,3,4,230,227,3,5,253,70,3,6,255,4,3,7,245,0,3,8,217,0,3,9,216,2,3,10,244,60,3,11,254,186,3,12,255,255,3,13,236,202,4,2,251,255,4,3,220,217,4,4,255,7,4,5,205,0,4,12,230,181,4,13,255,255,4,14,209,101,5,2,248,254,5,3,251,26,5,4,187,0,5,13,250,246,5,14,254,177,6,1,205,255,6,2,219,209,6,3,247,0,6,13,176,248,6,14,254,230,6,15,176,0,7,1,233,255,7,2,232,148,7,3,179,0,7,14,253,251,7,15,229,0,8,1,249,255,8,2,244,133,8,7,255,255,8,14,253,253,8,15,249,0,9,1,229,255,9,2,252,151,9,7,255,255,9,8,255,84,9,14,246,246,9,15,251,0,10,1,202,255,10,2,248,199,10,7,255,255,10,8,255,84,10,13,191,255,10,14,235,226,10,15,238,0,11,2,253,252,11,3,196,13,11,7,255,255,11,8,255,255,11,9,255,255,11,10,255,255,11,11,255,255,11,12,255,255,11,13,255,255,11,14,230,172,11,15,208,0,12,2,166,95,12,3,250,0,12,7,215,247,12,8,255,208,12,9,255,208,12,10,255,208,12,11,255,208,12,12,255,208,12,13,255,208,12,14,255,84,12,15,155,0,13,8,208,0,13,9,208,0,13,10,208,0,13,11,208,0,13,12,208,0,13,13,208,0,13,14,208,0],
secondary:!1},{width:15,bonus:490,chr:"H",
pixels:[2,1,255,255,2,2,255,255,2,3,255,255,2,4,255,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,2,11,255,255,2,12,255,255,2,13,255,255,2,14,255,255,3,1,208,255,3,2,255,208,3,3,255,208,3,4,255,208,3,5,255,208,3,6,254,215,3,7,255,255,3,8,255,223,3,9,255,208,3,10,255,208,3,11,255,208,3,12,255,208,3,13,255,208,3,14,255,208,3,15,255,0,4,2,208,0,4,3,208,0,4,4,208,0,4,5,208,0,4,6,215,43,4,7,255,255,4,8,255,84,4,9,223,0,4,10,208,0,4,11,208,0,4,12,208,0,4,13,208,0,4,14,208,0,4,15,208,0,5,7,255,255,5,8,255,84,6,7,255,255,6,8,255,84,7,7,255,255,7,8,255,84,8,7,255,255,8,8,255,84,9,7,255,255,9,8,255,84,10,7,255,255,10,8,255,84,11,1,208,255,11,2,208,255,11,3,208,255,11,4,208,255,11,5,208,255,11,6,213,255,11,7,255,255,11,8,255,223,11,9,224,237,11,10,208,255,11,11,208,255,11,12,208,255,11,13,208,255,11,14,208,255,12,1,255,255,12,2,255,255,12,3,255,255,12,4,255,255,12,5,255,255,12,6,255,255,12,7,255,255,12,8,255,255,12,9,255,255,12,10,255,255,12,11,255,255,12,12,255,255,12,13,255,255,12,14,255,255,12,15,208,0,13,2,255,0,13,3,255,0,13,4,255,0,13,5,255,0,13,6,255,0,13,7,255,0,13,8,255,0,13,9,255,0,13,10,255,0,13,11,255,0,13,12,255,0,13,13,255,0,13,14,255,0,13,15,255,0],
secondary:!1},{width:7,bonus:265,chr:"I",
pixels:[1,1,255,255,1,14,255,255,2,1,255,255,2,2,255,80,2,14,255,255,2,15,255,0,3,1,255,255,3,2,255,255,3,3,255,255,3,4,255,255,3,5,255,255,3,6,255,255,3,7,255,255,3,8,255,255,3,9,255,255,3,10,255,255,3,11,255,255,3,12,255,255,3,13,255,255,3,14,255,255,3,15,255,0,4,1,255,255,4,2,254,227,4,3,255,208,4,4,255,208,4,5,255,208,4,6,255,208,4,7,255,208,4,8,255,208,4,9,255,208,4,10,255,208,4,11,255,208,4,12,255,208,4,13,255,225,4,14,255,255,4,15,255,0,5,1,255,255,5,2,255,47,5,3,226,0,5,4,208,0,5,5,208,0,5,6,208,0,5,7,208,0,5,8,208,0,5,9,208,0,5,10,208,0,5,11,208,0,5,12,208,0,5,13,216,51,5,14,255,255,5,15,255,0,6,2,255,0,6,15,255,0],
secondary:!1},{width:6,bonus:290,chr:"J",
pixels:[0,18,255,255,0,19,255,74,1,17,196,255,1,18,252,254,1,19,255,24,2,1,255,255,2,2,255,255,2,3,255,255,2,4,255,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,2,11,255,255,2,12,255,255,2,13,255,255,2,14,255,255,2,15,255,255,2,16,255,255,2,17,255,255,2,18,226,149,2,19,252,0,3,1,208,255,3,2,255,208,3,3,255,208,3,4,255,208,3,5,255,208,3,6,255,208,3,7,255,208,3,8,255,208,3,9,255,208,3,10,255,208,3,11,255,208,3,12,255,208,3,13,255,208,3,14,255,208,3,15,255,197,3,16,254,162,3,17,255,68,3,18,255,0,4,2,208,0,4,3,208,0,4,4,208,0,4,5,208,0,4,6,208,0,4,7,208,0,4,8,208,0,4,9,208,0,4,10,208,0,4,11,208,0,4,12,208,0,4,13,208,0,4,14,208,0,4,15,208,0,4,16,197,0,4,17,162,0],
secondary:!1},{width:12,bonus:435,chr:"K",
pixels:[2,1,255,255,2,2,255,255,2,3,255,255,2,4,255,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,2,11,255,255,2,12,255,255,2,13,255,255,2,14,255,255,3,1,208,255,3,2,255,208,3,3,255,208,3,4,255,208,3,5,255,208,3,6,255,208,3,7,255,217,3,8,255,255,3,9,255,231,3,10,255,208,3,11,255,208,3,12,255,208,3,13,255,208,3,14,255,208,3,15,255,0,4,2,208,0,4,3,208,0,4,4,208,0,4,5,208,0,4,6,211,20,4,7,244,206,4,8,250,230,4,9,255,25,4,10,231,0,4,11,208,0,4,12,208,0,4,13,208,0,4,14,208,0,4,15,208,0,5,6,211,255,5,7,255,255,5,8,235,183,5,9,227,7,6,5,223,255,6,6,241,253,6,7,248,222,6,8,255,255,6,9,237,219,7,4,233,255,7,5,236,252,7,6,230,53,7,7,241,11,7,8,240,169,7,9,255,255,7,10,252,242,8,3,241,255,8,4,230,248,8,5,237,40,8,6,233,0,8,9,194,123,8,10,254,245,8,11,255,255,8,12,176,204,9,2,247,255,9,3,224,243,9,4,243,30,9,5,224,0,9,11,252,212,9,12,255,255,9,13,229,220,10,1,253,255,10,2,220,235,10,3,248,20,10,4,214,0,10,12,237,166,10,13,255,255,10,14,250,240,11,1,189,255,11,2,253,12,11,3,202,0,11,13,189,120,11,14,254,243,11,15,236,0],
secondary:!1},{width:11,bonus:300,chr:"L",
pixels:[2,1,255,255,2,2,255,255,2,3,255,255,2,4,255,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,2,11,255,255,2,12,255,255,2,13,255,255,2,14,255,255,3,1,208,255,3,2,255,208,3,3,255,208,3,4,255,208,3,5,255,208,3,6,255,208,3,7,255,208,3,8,255,208,3,9,255,208,3,10,255,208,3,11,255,208,3,12,255,208,3,13,255,237,3,14,255,255,3,15,255,0,4,2,208,0,4,3,208,0,4,4,208,0,4,5,208,0,4,6,208,0,4,7,208,0,4,8,208,0,4,9,208,0,4,10,208,0,4,11,208,0,4,12,208,0,4,13,236,168,4,14,255,255,4,15,255,0,5,13,155,255,5,14,255,255,5,15,255,0,6,13,155,255,6,14,255,255,6,15,255,0,7,13,155,255,7,14,255,255,7,15,255,0,8,13,155,255,8,14,255,255,8,15,255,0,9,13,155,255,9,14,255,255,9,15,255,0,10,14,156,0,10,15,255,0],
secondary:!1},{width:18,bonus:715,chr:"M",
pixels:[2,1,255,255,2,2,255,255,2,3,255,255,2,4,255,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,2,11,255,255,2,12,255,255,2,13,255,255,2,14,255,255,3,1,255,255,3,2,254,252,3,3,254,210,3,4,255,208,3,5,255,208,3,6,255,208,3,7,255,208,3,8,255,208,3,9,255,208,3,10,255,208,3,11,255,208,3,12,255,208,3,13,255,208,3,14,255,208,3,15,255,0,4,1,245,255,4,2,255,255,4,3,254,228,4,4,234,150,4,5,216,53,4,6,208,0,4,7,208,0,4,8,208,0,4,9,208,0,4,10,208,0,4,11,208,0,4,12,208,0,4,13,208,0,4,14,208,0,4,15,208,0,5,2,248,98,5,3,254,189,5,4,255,253,5,5,255,255,5,6,217,245,6,4,195,35,6,5,254,119,6,6,255,211,6,7,255,255,6,8,253,253,6,9,191,246,7,7,219,56,7,8,255,141,7,9,255,231,7,10,255,255,7,11,247,251,7,12,165,249,8,10,238,77,8,11,255,165,8,12,255,245,8,13,255,255,8,14,235,247,9,11,176,210,9,12,248,242,9,13,255,255,9,14,254,219,9,15,228,0,10,9,211,255,10,10,255,255,10,11,239,251,10,12,208,180,10,13,240,58,10,14,255,0,10,15,218,0,11,6,184,255,11,7,251,255,11,8,248,254,11,9,208,207,11,10,223,87,11,11,255,5,11,12,235,0,12,3,157,255,12,4,241,255,12,5,254,255,12,6,213,229,12,7,211,120,12,8,252,15,12,9,247,0,12,10,169,0,13,1,221,255,13,2,255,255,13,3,223,244,13,4,203,152,13,5,243,32,13,6,254,0,13,7,191,0,14,1,255,255,14,2,254,249,14,3,255,208,14,4,248,214,14,5,231,230,14,6,214,249,14,7,208,255,14,8,208,255,14,9,208,255,14,10,208,255,14,11,208,255,14,12,208,255,14,13,208,255,14,14,208,255,15,1,255,255,15,2,255,255,15,3,255,255,15,4,255,255,15,5,255,255,15,6,255,255,15,7,255,255,15,8,255,255,15,9,255,255,15,10,255,255,15,11,255,255,15,12,255,255,15,13,255,255,15,14,255,255,15,15,208,0,16,2,255,0,16,3,255,0,16,4,255,0,16,5,255,0,16,6,255,0,16,7,255,0,16,8,255,0,16,9,255,0,16,10,255,0,16,11,255,0,16,12,255,0,16,13,255,0,16,14,255,0,16,15,255,0],
secondary:!1},{width:16,bonus:555,chr:"N",
pixels:[2,1,255,255,2,2,255,255,2,3,255,255,2,4,255,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,2,11,255,255,2,12,255,255,2,13,255,255,2,14,255,255,3,1,255,255,3,2,255,255,3,3,254,233,3,4,255,208,3,5,255,208,3,6,255,208,3,7,255,208,3,8,255,208,3,9,255,208,3,10,255,208,3,11,255,208,3,12,255,208,3,13,255,208,3,14,255,208,3,15,255,0,4,1,165,255,4,2,255,255,4,3,254,246,4,4,242,119,4,5,208,2,4,6,208,0,4,7,208,0,4,8,208,0,4,9,208,0,4,10,208,0,4,11,208,0,4,12,208,0,4,13,208,0,4,14,208,0,4,15,208,0,5,2,190,98,5,3,255,225,5,4,255,255,5,5,223,226,6,4,242,154,6,5,255,253,6,6,253,249,7,5,170,84,7,6,255,213,7,7,255,255,7,8,225,226,8,7,234,138,8,8,255,249,8,9,253,250,9,9,254,198,9,10,255,255,9,11,227,227,10,10,221,122,10,11,255,241,10,12,254,250,11,12,250,179,11,13,255,255,11,14,228,228,12,1,255,255,12,2,255,255,12,3,255,255,12,4,255,255,12,5,255,255,12,6,255,255,12,7,255,255,12,8,255,255,12,9,255,255,12,10,255,255,12,11,255,255,12,12,254,255,12,13,255,255,12,14,255,255,12,15,204,0,13,1,208,255,13,2,255,208,13,3,255,208,13,4,255,208,13,5,255,208,13,6,255,208,13,7,255,208,13,8,255,208,13,9,255,208,13,10,255,208,13,11,255,208,13,12,255,208,13,13,255,208,13,14,255,208,13,15,255,0,14,2,208,0,14,3,208,0,14,4,208,0,14,5,208,0,14,6,208,0,14,7,208,0,14,8,208,0,14,9,208,0,14,10,208,0,14,11,208,0,14,12,208,0,14,13,208,0,14,14,208,0,14,15,208,0],
secondary:!1},{width:15,bonus:485,chr:"O",
pixels:[1,5,175,255,1,6,227,255,1,7,247,255,1,8,247,255,1,9,225,255,1,10,173,255,2,3,199,255,2,4,255,255,2,5,255,255,2,6,250,244,2,7,250,218,2,8,254,216,2,9,254,240,2,10,255,255,2,11,255,255,2,12,216,233,3,2,207,255,3,3,255,255,3,4,233,170,3,5,255,43,3,6,255,0,3,7,239,0,3,8,214,0,3,9,215,0,3,10,241,48,3,11,255,159,3,12,255,255,3,13,243,216,4,2,255,255,4,3,229,127,4,4,255,0,4,5,156,0,4,12,203,146,4,13,255,255,4,14,225,117,5,1,187,255,5,2,231,238,5,3,255,1,5,13,233,236,5,14,255,190,6,1,233,255,6,2,227,164,6,3,216,0,6,14,252,238,6,15,190,0,7,1,249,255,7,2,244,131,7,14,253,253,7,15,235,0,8,1,235,255,8,2,252,145,8,14,245,245,8,15,251,0,9,1,189,255,9,2,251,215,9,13,211,255,9,14,226,213,9,15,236,0,10,2,255,255,10,3,230,119,10,13,255,255,10,14,229,111,10,15,189,0,11,2,222,231,11,3,254,255,11,4,193,198,11,12,253,255,11,13,222,230,11,14,255,4,12,3,241,203,12,4,255,255,12,5,255,255,12,6,240,253,12,7,215,255,12,8,215,255,12,9,239,255,12,10,255,255,12,11,255,255,12,12,228,211,12,13,254,20,12,14,200,0,13,4,212,98,13,5,255,171,13,6,254,225,13,7,254,246,13,8,253,247,13,9,250,228,13,10,249,174,13,11,255,78,13,12,255,1,13,13,189,0,14,6,171,0,14,7,224,0,14,8,246,0,14,9,246,0,14,10,224,0,14,11,170,0],
secondary:!1},{width:12,bonus:395,chr:"P",
pixels:[2,1,255,255,2,2,255,255,2,3,255,255,2,4,255,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,2,11,255,255,2,12,255,255,2,13,255,255,2,14,255,255,3,1,255,255,3,2,254,231,3,3,255,208,3,4,255,208,3,5,255,208,3,6,255,208,3,7,254,215,3,8,255,255,3,9,255,223,3,10,255,208,3,11,255,208,3,12,255,208,3,13,255,208,3,14,255,208,3,15,255,0,4,1,255,255,4,2,254,120,4,3,230,0,4,4,208,0,4,5,208,0,4,6,208,0,4,7,215,43,4,8,255,255,4,9,255,84,4,10,223,0,4,11,208,0,4,12,208,0,4,13,208,0,4,14,208,0,4,15,208,0,5,1,255,255,5,2,255,122,5,8,255,255,5,9,255,81,6,1,245,255,6,2,254,144,6,8,255,255,6,9,255,67,7,1,215,255,7,2,253,199,7,8,255,255,7,9,255,25,8,2,255,255,8,3,220,119,8,7,233,255,8,8,224,227,8,9,255,0,9,2,249,248,9,3,255,255,9,4,243,247,9,5,227,255,9,6,255,255,9,7,249,254,9,8,238,62,9,9,199,0,10,3,251,190,10,4,254,245,10,5,254,244,10,6,248,194,10,7,254,58,10,8,248,0,11,4,187,0,11,5,244,0,11,6,243,0,11,7,189,0],
secondary:!1},{width:15,bonus:530,chr:"Q",
pixels:[1,5,175,255,1,6,227,255,1,7,247,255,1,8,247,255,1,9,225,255,1,10,173,255,2,3,199,255,2,4,255,255,2,5,255,255,2,6,250,244,2,7,250,218,2,8,254,216,2,9,254,240,2,10,255,255,2,11,255,255,2,12,216,233,3,2,207,255,3,3,255,255,3,4,233,170,3,5,255,43,3,6,255,0,3,7,239,0,3,8,214,0,3,9,215,0,3,10,241,48,3,11,255,159,3,12,255,255,3,13,243,216,4,2,255,255,4,3,229,127,4,4,255,0,4,5,156,0,4,12,203,146,4,13,255,255,4,14,225,117,5,1,187,255,5,2,231,238,5,3,255,1,5,13,233,236,5,14,255,190,6,1,233,255,6,2,227,164,6,3,216,0,6,14,252,238,6,15,190,0,7,1,249,255,7,2,244,131,7,14,254,254,7,15,235,0,8,1,235,255,8,2,252,145,8,14,255,255,8,15,254,135,9,1,189,255,9,2,251,215,9,13,211,255,9,14,255,255,9,15,255,255,9,16,208,190,10,2,255,255,10,3,230,119,10,13,255,255,10,14,232,130,10,15,255,187,10,16,255,255,10,17,223,199,11,2,222,231,11,3,254,255,11,4,193,198,11,12,253,255,11,13,227,233,11,14,255,6,11,16,237,203,11,17,255,255,11,18,174,0,12,3,241,203,12,4,255,255,12,5,255,255,12,6,240,253,12,7,215,255,12,8,215,255,12,9,239,255,12,10,255,255,12,11,255,255,12,12,232,216,12,13,254,23,12,14,207,0,12,17,238,205,12,18,255,0,13,4,212,98,13,5,255,171,13,6,254,225,13,7,254,246,13,8,253,250,13,9,250,230,13,10,249,178,13,11,255,84,13,12,255,1,13,13,196,0,13,18,191,0,14,6,171,0,14,7,224,0,14,8,246,0,14,9,248,0,14,10,226,0,14,11,174,0],
secondary:!1},{width:12,bonus:460,chr:"R",
pixels:[2,1,255,255,2,2,255,255,2,3,255,255,2,4,255,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,2,11,255,255,2,12,255,255,2,13,255,255,2,14,255,255,3,1,255,255,3,2,254,231,3,3,255,208,3,4,255,208,3,5,255,208,3,6,255,208,3,7,254,215,3,8,255,255,3,9,255,223,3,10,255,208,3,11,255,208,3,12,255,208,3,13,255,208,3,14,255,208,3,15,255,0,4,1,255,255,4,2,254,120,4,3,230,0,4,4,208,0,4,5,208,0,4,6,208,0,4,7,215,43,4,8,255,255,4,9,255,84,4,10,223,0,4,11,208,0,4,12,208,0,4,13,208,0,4,14,208,0,4,15,208,0,5,1,255,255,5,2,254,120,5,8,255,255,5,9,255,84,6,1,247,255,6,2,255,139,6,8,255,255,6,9,255,119,7,1,221,255,7,2,253,186,7,8,255,255,7,9,255,255,7,10,215,215,8,1,160,255,8,2,254,255,8,3,208,103,8,7,225,255,8,8,213,222,8,9,255,157,8,10,254,255,8,11,252,251,9,2,252,250,9,3,255,255,9,4,240,248,9,5,225,255,9,6,253,255,9,7,244,253,9,8,231,49,9,9,185,0,9,10,181,87,9,11,255,215,9,12,255,255,9,13,239,239,10,3,253,193,10,4,254,245,10,5,254,240,10,6,247,190,10,7,254,51,10,8,242,0,10,12,234,137,10,13,254,249,10,14,255,255,11,4,191,0,11,5,244,0,11,6,239,0,11,7,184,0,11,14,254,191,11,15,255,0],
secondary:!1},{width:11,bonus:355,chr:"S",
pixels:[1,3,211,255,1,4,247,255,1,5,211,255,1,13,255,255,2,2,249,255,2,3,252,254,2,4,248,224,2,5,255,249,2,6,255,255,2,7,161,167,2,13,214,249,2,14,254,204,3,1,159,255,3,2,245,254,3,3,250,44,3,4,251,0,3,5,222,36,3,6,254,230,3,7,254,240,3,13,158,255,3,14,251,242,3,15,204,0,4,1,217,255,4,2,219,185,4,3,244,0,4,7,255,255,4,8,246,110,4,14,253,253,4,15,238,0,5,1,247,255,5,2,236,137,5,3,159,0,5,7,245,249,5,8,255,202,5,14,251,252,5,15,252,0,6,1,235,255,6,2,252,148,6,7,153,249,6,8,255,255,6,9,213,66,6,13,178,255,6,14,237,234,6,15,248,0,7,1,211,255,7,2,249,190,7,8,254,255,7,9,254,204,7,13,251,255,7,14,222,169,7,15,217,0,8,2,254,250,8,3,189,18,8,8,173,229,8,9,255,255,8,10,253,245,8,11,223,253,8,12,255,255,8,13,242,251,8,14,252,29,9,2,188,126,9,3,249,6,9,9,211,172,9,10,254,234,9,11,254,246,9,12,246,195,9,13,255,45,9,14,238,0,10,11,234,0,10,12,246,0,10,13,188,0],
secondary:!1},{width:13,bonus:300,chr:"T",
pixels:[1,1,255,255,2,1,255,255,2,2,254,120,3,1,255,255,3,2,254,120,4,1,255,255,4,2,254,120,5,1,255,255,5,2,254,231,5,3,231,230,5,4,208,255,5,5,208,255,5,6,208,255,5,7,208,255,5,8,208,255,5,9,208,255,5,10,208,255,5,11,208,255,5,12,208,255,5,13,208,255,5,14,208,255,6,1,255,255,6,2,255,255,6,3,255,255,6,4,255,255,6,5,255,255,6,6,255,255,6,7,255,255,6,8,255,255,6,9,255,255,6,10,255,255,6,11,255,255,6,12,255,255,6,13,255,255,6,14,255,255,6,15,208,0,7,1,255,255,7,2,254,120,7,3,255,0,7,4,255,0,7,5,255,0,7,6,255,0,7,7,255,0,7,8,255,0,7,9,255,0,7,10,255,0,7,11,255,0,7,12,255,0,7,13,255,0,7,14,255,0,7,15,255,0,8,1,255,255,8,2,254,120,9,1,255,255,9,2,254,120,10,1,255,255,10,2,254,120,11,1,255,255,11,2,254,120,12,2,255,0],
secondary:!1},{width:15,bonus:465,chr:"U",
pixels:[2,1,255,255,2,2,255,255,2,3,255,255,2,4,255,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,243,255,2,11,201,255,3,1,208,255,3,2,255,208,3,3,255,208,3,4,255,208,3,5,255,208,3,6,255,208,3,7,255,208,3,8,255,208,3,9,255,208,3,10,254,228,3,11,255,255,3,12,255,255,3,13,202,212,4,2,208,0,4,3,208,0,4,4,208,0,4,5,208,0,4,6,208,0,4,7,208,0,4,8,208,0,4,9,208,0,4,10,208,0,4,11,231,31,4,12,255,179,4,13,255,255,4,14,199,119,5,13,246,236,5,14,255,190,6,13,161,248,6,14,253,241,6,15,190,0,7,14,253,253,7,15,239,0,8,13,155,255,8,14,245,245,8,15,251,0,9,13,229,255,9,14,228,206,9,15,235,0,10,12,184,255,10,13,255,255,10,14,237,91,10,15,184,0,11,1,208,255,11,2,208,255,11,3,208,255,11,4,208,255,11,5,208,255,11,6,208,255,11,7,208,255,11,8,208,255,11,9,208,255,11,10,229,255,11,11,255,255,11,12,255,255,11,13,229,179,11,14,255,0,12,1,255,255,12,2,255,255,12,3,255,255,12,4,255,255,12,5,255,255,12,6,255,255,12,7,255,255,12,8,255,255,12,9,255,255,12,10,253,245,12,11,249,205,12,12,255,99,12,13,255,1,12,14,161,0,13,2,255,0,13,3,255,0,13,4,255,0,13,5,255,0,13,6,255,0,13,7,255,0,13,8,255,0,13,9,255,0,13,10,255,0,13,11,243,0,13,12,200,0],
secondary:!1},{width:12,bonus:345,chr:"V",
pixels:[0,1,209,255,1,1,251,255,1,2,255,255,1,3,254,254,1,4,192,246,2,2,253,109,2,3,254,201,2,4,255,255,2,5,255,255,2,6,247,252,2,7,167,249,3,4,208,44,3,5,255,127,3,6,254,219,3,7,255,255,3,8,255,255,3,9,236,248,4,7,225,60,4,8,255,145,4,9,255,233,4,10,255,255,4,11,255,255,4,12,217,246,5,10,239,73,5,11,255,152,5,12,254,221,5,13,255,255,5,14,253,253,6,11,181,217,6,12,242,235,6,13,255,255,6,14,254,252,6,15,252,0,7,9,235,255,7,10,255,255,7,11,255,255,7,12,237,224,7,13,237,124,7,14,255,25,7,15,252,0,8,6,221,255,8,7,255,255,8,8,255,255,8,9,244,240,8,10,245,143,8,11,255,45,8,12,255,0,8,13,208,0,9,3,203,255,9,4,255,255,9,5,255,255,9,6,249,250,9,7,242,170,9,8,255,68,9,9,255,2,9,10,229,0,10,1,251,255,10,2,255,255,10,3,254,254,10,4,241,196,10,5,255,92,10,6,255,11,10,7,244,0,10,8,162,0,11,1,208,255,11,2,253,116,11,3,255,25,11,4,253,0,11,5,185,0],
secondary:!1},{width:19,bonus:655,chr:"W",
pixels:[0,1,158,255,1,1,255,255,1,2,255,255,1,3,254,255,1,4,209,251,2,2,255,131,2,3,255,197,2,4,255,251,2,5,255,255,2,6,255,255,2,7,248,252,2,8,188,252,3,4,200,15,3,5,252,75,3,6,255,140,3,7,254,207,3,8,254,255,3,9,255,255,3,10,255,255,3,11,237,251,3,12,165,255,4,8,209,23,4,9,253,82,4,10,255,136,4,11,255,187,4,12,253,240,4,13,255,255,4,14,255,255,5,10,167,192,5,11,222,213,5,12,249,239,5,13,255,255,5,14,255,245,5,15,255,0,6,7,163,255,6,8,235,255,6,9,255,255,6,10,255,255,6,11,239,238,6,12,226,167,6,13,240,77,6,14,255,8,6,15,245,0,7,4,191,255,7,5,251,255,7,6,255,255,7,7,253,253,7,8,233,212,7,9,245,124,7,10,255,43,7,11,255,0,7,12,223,0,8,1,217,255,8,2,255,255,8,3,255,255,8,4,243,245,8,5,232,179,8,6,252,90,8,7,255,17,8,8,252,0,8,9,194,0,9,1,255,255,9,2,255,255,9,3,254,210,9,4,255,113,9,5,237,43,9,6,163,0,10,2,255,157,10,3,254,234,10,4,255,255,10,5,255,255,10,6,225,249,11,3,158,3,11,4,238,63,11,5,254,138,11,6,255,217,11,7,255,255,11,8,255,255,11,9,242,251,11,10,168,252,12,7,223,46,12,8,255,119,12,9,255,196,12,10,255,249,12,11,255,255,12,12,251,254,12,13,193,250,13,10,199,15,13,11,251,113,13,12,255,215,13,13,255,255,13,14,255,255,14,9,184,255,14,10,243,255,14,11,255,255,14,12,255,255,14,13,252,242,14,14,254,174,14,15,255,0,15,5,177,255,15,6,239,255,15,7,255,255,15,8,255,255,15,9,253,253,15,10,239,210,15,11,248,130,15,12,255,57,15,13,255,3,15,14,240,0,15,15,174,0,16,1,169,255,16,2,233,255,16,3,255,255,16,4,255,255,16,5,255,255,16,6,243,228,16,7,249,152,16,8,255,78,16,9,255,14,16,10,251,0,16,11,196,0,17,1,255,255,17,2,249,243,17,3,247,175,17,4,255,100,17,5,255,31,17,6,255,0,17,7,217,0,18,2,255,2,18,3,237,0,18,4,170,0],
secondary:!1},{width:12,bonus:385,chr:"X",
pixels:[0,14,153,255,1,1,255,255,1,2,188,219,1,13,227,255,1,14,255,255,1,15,153,0,2,1,179,255,2,2,255,255,2,3,245,239,2,11,165,255,2,12,255,255,2,13,234,246,2,14,234,82,2,15,255,0,3,2,205,108,3,3,254,233,3,4,255,255,3,5,191,217,3,10,233,255,3,11,253,255,3,12,215,170,3,13,255,12,3,14,226,0,4,4,245,162,4,5,255,255,4,6,246,239,4,8,175,255,4,9,255,255,4,10,225,236,4,11,238,57,4,12,253,0,5,5,180,90,5,6,254,225,5,7,255,255,5,8,255,255,5,9,213,145,5,10,255,4,5,11,208,0,6,6,250,254,6,7,255,251,6,8,255,255,6,9,255,205,7,4,211,255,7,5,255,255,7,6,211,204,7,7,249,23,7,8,252,110,7,9,255,243,7,10,255,253,7,11,169,222,8,3,253,255,8,4,236,250,8,5,224,93,8,6,255,0,8,7,169,0,8,10,252,187,8,11,255,255,8,12,244,240,9,1,223,255,9,2,255,255,9,3,214,195,9,4,253,19,9,5,232,0,9,11,210,115,9,12,255,237,9,13,255,255,9,14,207,225,10,1,229,255,10,2,233,86,10,3,255,0,10,4,164,0,10,13,249,175,10,14,255,255,10,15,183,0,11,2,230,0,11,14,197,105,11,15,255,0],
secondary:!1},{width:12,bonus:305,chr:"Y",
pixels:[1,1,255,255,1,2,240,241,2,2,255,239,2,3,255,255,2,4,226,236,3,3,247,139,3,4,255,245,3,5,255,255,3,6,205,231,4,5,251,149,4,6,255,249,4,7,254,254,4,8,178,231,5,6,161,51,5,7,253,161,5,8,255,255,5,9,255,255,5,10,255,255,5,11,255,255,5,12,255,255,5,13,255,255,5,14,255,255,6,7,206,246,6,8,255,255,6,9,255,227,6,10,255,208,6,11,255,208,6,12,255,208,6,13,255,208,6,14,255,208,6,15,255,0,7,5,187,255,7,6,255,255,7,7,239,249,7,8,222,120,7,9,255,3,7,10,227,0,7,11,208,0,7,12,208,0,7,13,208,0,7,14,208,0,7,15,208,0,8,3,173,255,8,4,255,255,8,5,247,253,8,6,221,152,8,7,255,13,8,8,233,0,9,1,160,255,9,2,251,255,9,3,253,255,9,4,224,181,9,5,255,27,9,6,246,0,10,1,255,255,10,2,230,207,10,3,252,47,10,4,253,0,10,5,159,0,11,2,255,0,11,3,187,0],
secondary:!1},{width:12,bonus:405,chr:"Z",
pixels:[1,1,255,255,1,13,205,255,1,14,255,255,2,1,255,255,2,2,254,120,2,12,247,255,2,13,255,255,2,14,255,255,2,15,255,0,3,1,255,255,3,2,254,120,3,10,193,255,3,11,255,255,3,12,240,242,3,13,253,180,3,14,255,255,3,15,255,0,4,1,255,255,4,2,254,120,4,9,243,255,4,10,255,255,4,11,233,181,4,12,255,16,4,13,240,127,4,14,255,255,4,15,255,0,5,1,255,255,5,2,254,120,5,7,179,255,5,8,255,255,5,9,243,247,5,10,247,88,5,11,255,0,5,12,165,0,5,14,255,255,5,15,255,0,6,1,255,255,6,2,254,120,6,6,235,255,6,7,255,255,6,8,232,197,6,9,255,24,6,10,236,0,6,14,255,255,6,15,255,0,7,1,255,255,7,2,254,120,7,4,166,255,7,5,255,255,7,6,246,251,7,7,244,105,7,8,255,0,7,9,180,0,7,14,255,255,7,15,255,0,8,1,255,255,8,2,255,178,8,3,240,242,8,4,255,255,8,5,233,212,8,6,255,33,8,7,242,0,8,14,255,255,8,15,255,0,9,1,255,255,9,2,255,255,9,3,252,251,9,4,241,123,9,5,255,2,9,6,194,0,9,14,255,255,9,15,255,0,10,1,255,255,10,2,254,207,10,3,255,43,10,4,248,0,10,14,255,255,10,15,255,0,11,2,255,0,11,3,206,0,11,15,255,0],
secondary:!1},{width:11,bonus:425,chr:"0",
pixels:[1,4,155,255,1,5,207,255,1,6,237,255,1,7,251,255,1,8,249,255,1,9,235,255,1,10,201,255,2,2,177,255,2,3,255,255,2,4,255,255,2,5,252,250,2,6,248,228,2,7,252,214,2,8,254,210,2,9,254,222,2,10,254,248,2,11,255,255,2,12,255,255,2,13,174,226,3,2,255,255,3,3,226,182,3,4,255,49,3,5,255,2,3,6,247,0,3,7,222,0,3,8,211,0,3,9,210,0,3,10,222,2,3,11,248,50,3,12,255,161,3,13,255,255,3,14,202,156,4,1,225,255,4,2,220,211,4,3,255,0,4,4,161,0,4,13,228,202,4,14,254,222,5,1,247,255,5,2,240,136,5,3,182,0,5,14,253,251,5,15,222,0,6,1,219,255,6,2,253,188,6,13,187,255,6,14,239,239,6,15,249,0,7,2,255,255,7,3,232,186,7,12,169,255,7,13,255,255,7,14,221,152,7,15,224,0,8,2,200,194,8,3,255,255,8,4,255,255,8,5,250,254,8,6,224,255,8,7,211,255,8,8,211,255,8,9,223,255,8,10,249,255,8,11,255,255,8,12,255,255,8,13,227,194,8,14,255,6,9,3,172,74,9,4,255,142,9,5,255,201,9,6,254,237,9,7,254,251,9,8,254,251,9,9,252,240,9,10,248,212,9,11,253,154,9,12,254,64,9,13,255,0,9,14,172,0,10,6,201,0,10,7,236,0,10,8,250,0,10,9,250,0,10,10,237,0,10,11,206,0],
secondary:!1},{width:11,bonus:260,chr:"1",
pixels:[2,3,221,255,2,4,212,245,3,2,173,255,3,3,247,255,3,4,227,57,3,5,204,0,4,2,251,255,4,3,199,104,4,4,247,0,5,1,249,255,5,2,255,255,5,3,255,255,5,4,255,255,5,5,255,255,5,6,255,255,5,7,255,255,5,8,255,255,5,9,255,255,5,10,255,255,5,11,255,255,5,12,255,255,5,13,255,255,5,14,255,255,6,1,208,255,6,2,254,209,6,3,255,208,6,4,255,208,6,5,255,208,6,6,255,208,6,7,255,208,6,8,255,208,6,9,255,208,6,10,255,208,6,11,255,208,6,12,255,208,6,13,255,208,6,14,255,208,6,15,255,0,7,2,208,0,7,3,208,0,7,4,208,0,7,5,208,0,7,6,208,0,7,7,208,0,7,8,208,0,7,9,208,0,7,10,208,0,7,11,208,0,7,12,208,0,7,13,208,0,7,14,208,0,7,15,208,0],
secondary:!1},{width:11,bonus:345,chr:"2",
pixels:[1,13,207,255,1,14,255,255,2,2,255,255,2,3,195,161,2,12,223,255,2,13,255,255,2,14,255,255,2,15,255,0,3,1,187,255,3,2,225,240,3,3,255,3,3,11,237,255,3,12,232,250,3,13,243,169,3,14,255,255,3,15,255,0,4,1,239,255,4,2,223,154,4,3,212,0,4,10,247,255,4,11,226,246,4,12,239,33,4,13,240,127,4,14,255,255,4,15,255,0,5,1,247,255,5,2,248,147,5,9,253,255,5,10,221,237,5,11,248,23,5,12,218,0,5,14,255,255,5,15,255,0,6,1,197,255,6,2,254,240,6,3,162,72,6,7,183,255,6,8,255,255,6,9,217,217,6,10,253,12,6,11,205,0,6,14,255,255,6,15,255,0,7,2,255,255,7,3,255,253,7,4,227,248,7,5,235,255,7,6,255,255,7,7,253,255,7,8,220,152,7,9,255,3,7,10,184,0,7,14,255,255,7,15,255,0,8,3,255,205,8,4,254,249,8,5,250,228,8,6,248,167,8,7,254,46,8,8,253,0,8,14,255,255,8,15,255,0,9,4,205,0,9,5,248,0,9,6,224,0,9,7,163,0,9,14,255,255,9,15,255,0,10,15,255,0],
secondary:!1},{width:11,bonus:365,chr:"3",
pixels:[1,2,167,255,1,13,255,255,2,2,255,255,2,3,192,97,2,13,220,246,2,14,255,187,3,1,181,255,3,2,226,236,3,3,255,0,3,7,187,255,3,13,159,255,3,14,251,233,3,15,187,0,4,1,231,255,4,2,223,164,4,3,209,0,4,7,255,255,4,8,211,104,4,14,253,251,4,15,229,0,5,1,251,255,5,2,243,133,5,7,255,255,5,8,255,107,5,14,250,250,5,15,249,0,6,1,233,255,6,2,253,168,6,7,247,253,6,8,254,164,6,13,199,255,6,14,235,227,6,15,245,0,7,1,172,255,7,2,254,250,7,3,194,107,7,6,245,255,7,7,195,168,7,8,254,249,7,9,188,94,7,13,255,255,7,14,227,148,7,15,209,0,8,2,252,251,8,3,255,255,8,4,255,255,8,5,255,255,8,6,212,225,8,7,246,7,8,8,233,231,8,9,255,255,8,10,235,247,8,11,239,255,8,12,255,255,8,13,238,242,8,14,255,18,9,3,253,176,9,4,254,195,9,5,254,132,9,6,255,11,9,7,187,0,9,9,241,187,9,10,254,240,9,11,253,239,9,12,249,169,9,13,255,29,9,14,226,0,10,4,175,0,10,5,194,0,10,10,177,0,10,11,240,0,10,12,237,0,10,13,165,0],
secondary:!1},{width:11,bonus:420,chr:"4",
pixels:[1,9,160,255,1,10,255,255,1,11,163,255,2,8,227,255,2,9,229,253,2,10,255,255,2,11,254,164,2,12,164,0,3,6,157,255,3,7,253,255,3,8,183,217,3,9,228,17,3,10,255,255,3,11,254,164,3,12,164,0,4,5,225,255,4,6,225,254,4,7,183,96,4,8,254,0,4,9,156,0,4,10,255,255,4,11,254,164,4,12,164,0,5,3,154,255,5,4,253,255,5,5,177,215,5,6,227,14,5,7,224,0,5,10,255,255,5,11,254,164,5,12,164,0,6,2,223,255,6,3,202,252,6,4,178,87,6,5,253,0,6,10,255,255,6,11,254,164,6,12,164,0,7,1,253,255,7,2,249,253,7,3,250,213,7,4,245,217,7,5,220,242,7,6,208,255,7,7,208,255,7,8,208,255,7,9,208,255,7,10,255,255,7,11,254,239,7,12,239,222,7,13,208,255,7,14,208,255,8,1,255,255,8,2,255,255,8,3,255,255,8,4,255,255,8,5,255,255,8,6,255,255,8,7,255,255,8,8,255,255,8,9,255,255,8,10,255,255,8,11,255,255,8,12,255,255,8,13,255,255,8,14,255,255,8,15,208,0,9,2,255,0,9,3,255,0,9,4,255,0,9,5,255,0,9,6,255,0,9,7,255,0,9,8,255,0,9,9,255,0,9,10,255,255,9,11,254,164,9,12,255,0,9,13,255,0,9,14,255,0,9,15,255,0,10,10,255,255,10,11,254,164,10,12,164,0],
secondary:!1},{width:11,bonus:350,chr:"5",
pixels:[1,6,163,255,1,13,255,255,2,1,255,255,2,2,255,255,2,3,255,255,2,4,255,255,2,5,255,255,2,6,255,255,2,7,212,162,2,13,213,243,2,14,254,198,3,1,255,255,3,2,255,177,3,3,255,87,3,4,255,59,3,5,255,38,3,6,254,255,3,7,255,103,3,14,252,242,3,15,198,0,4,1,255,255,4,2,254,120,4,3,177,0,4,6,255,255,4,7,254,89,4,14,253,253,4,15,239,0,5,1,255,255,5,2,254,120,5,6,255,255,5,7,255,116,5,14,246,246,5,15,252,0,6,1,255,255,6,2,254,120,6,6,245,254,6,7,255,197,6,13,223,255,6,14,226,209,6,15,237,0,7,1,255,255,7,2,254,120,7,6,162,254,7,7,255,255,7,8,232,170,7,12,185,255,7,13,255,255,7,14,234,92,7,15,186,0,8,1,199,255,8,2,255,93,8,7,242,233,8,8,255,255,8,9,255,255,8,10,255,255,8,11,255,255,8,12,255,255,8,13,227,172,8,14,255,0,9,2,200,0,9,8,239,139,9,9,254,192,9,10,255,199,9,11,254,164,9,12,254,76,9,13,255,0,9,14,153,0,10,10,192,0,10,11,199,0,10,12,164,0],
secondary:!1},{width:11,bonus:430,chr:"6",
pixels:[1,5,154,255,1,6,205,255,1,7,237,255,1,8,249,255,1,9,247,255,1,10,225,255,1,11,169,255,2,3,193,255,2,4,255,255,2,5,255,255,2,6,244,238,2,7,250,236,2,8,255,255,2,9,254,232,2,10,254,228,2,11,254,255,2,12,255,255,2,13,187,220,3,2,215,255,3,3,248,254,3,4,223,140,3,5,255,24,3,6,255,53,3,7,252,235,3,8,239,99,3,9,255,0,3,10,231,0,3,11,231,36,3,12,255,172,3,13,255,255,3,14,204,144,4,2,255,255,4,3,227,83,4,4,247,0,4,6,217,250,4,7,178,227,4,8,232,0,4,13,236,212,4,14,254,215,5,1,205,255,5,2,221,225,5,3,255,0,5,6,255,255,5,7,229,109,5,8,158,0,5,14,254,250,5,15,214,0,6,1,243,255,6,2,233,157,6,3,195,0,6,6,255,255,6,7,255,127,6,13,171,255,6,14,244,244,6,15,249,0,7,1,253,255,7,2,249,128,7,6,222,252,7,7,255,241,7,8,160,106,7,13,253,255,7,14,224,182,7,15,234,0,8,1,203,255,8,2,254,129,8,7,255,253,8,8,255,255,8,9,239,249,8,10,217,255,8,11,247,255,8,12,255,255,8,13,238,242,8,14,254,26,8,15,160,0,9,2,203,0,9,8,254,186,9,9,255,241,9,10,254,250,9,11,249,225,9,12,251,146,9,13,255,22,9,14,226,0,10,9,185,0,10,10,241,0,10,11,249,0,10,12,220,0],
secondary:!1},{width:11,bonus:280,chr:"7",
pixels:[1,1,255,255,2,1,255,255,2,2,254,120,3,1,255,255,3,2,254,120,3,14,235,255,4,1,255,255,4,2,254,120,4,11,171,255,4,12,251,255,4,13,255,255,4,14,241,239,4,15,236,0,5,1,255,255,5,2,254,120,5,9,205,255,5,10,255,255,5,11,254,255,5,12,232,204,5,13,252,80,5,14,255,3,5,15,226,0,6,1,255,255,6,2,254,120,6,7,233,255,6,8,255,255,6,9,245,249,6,10,233,157,6,11,255,39,6,12,254,0,6,13,186,0,7,1,255,255,7,2,254,120,7,4,167,255,7,5,249,255,7,6,255,255,7,7,233,229,7,8,243,107,7,9,255,11,7,10,240,0,8,1,255,255,8,2,255,241,8,3,255,255,8,4,251,254,8,5,225,189,8,6,251,61,8,7,255,0,8,8,209,0,9,1,255,255,9,2,254,228,9,3,248,129,9,4,255,24,9,5,250,0,9,6,167,0,10,2,255,0,10,3,228,0],
secondary:!1},{width:11,bonus:470,chr:"8",
pixels:[1,3,177,255,1,4,195,255,1,10,221,255,1,11,247,255,1,12,208,255,2,2,241,255,2,3,255,255,2,4,255,255,2,5,255,255,2,6,234,231,2,9,255,255,2,10,248,248,2,11,250,224,2,12,254,252,2,13,255,253,3,1,161,255,3,2,247,253,3,3,246,75,3,4,255,12,3,5,255,92,3,6,255,251,3,7,245,205,3,8,255,255,3,9,208,174,3,10,255,6,3,11,241,0,3,12,227,54,3,13,255,243,3,14,254,174,4,1,223,255,4,2,221,185,4,3,246,0,4,6,179,196,4,7,255,255,4,8,239,200,4,9,255,0,4,13,174,227,4,14,253,225,4,15,173,0,5,1,247,255,5,2,240,136,5,3,160,0,5,7,255,255,5,8,255,124,5,9,188,0,5,14,253,252,5,15,223,0,6,1,223,255,6,2,252,163,6,7,255,255,6,8,255,237,6,13,161,255,6,14,243,243,6,15,250,0,7,1,163,255,7,2,253,247,7,3,188,98,7,6,251,255,7,7,202,178,7,8,254,251,7,9,250,192,7,13,249,255,7,14,223,191,7,15,232,0,8,2,250,246,8,3,255,255,8,4,255,255,8,5,255,255,8,6,213,224,8,7,251,3,8,8,193,154,8,9,255,255,8,10,253,249,8,11,225,254,8,12,255,255,8,13,248,252,8,14,250,45,8,15,167,0,9,3,250,177,9,4,255,193,9,5,254,126,9,6,255,9,9,7,187,0,9,9,171,149,9,10,254,216,9,11,255,247,9,12,248,203,9,13,255,57,9,14,246,0,10,4,174,0,10,5,193,0,10,11,216,0,10,12,247,0,10,13,197,0],
secondary:!1},{width:11,bonus:415,chr:"9",
pixels:[1,3,158,255,1,4,233,255,1,5,249,255,1,6,221,255,2,2,235,255,2,3,255,255,2,4,247,243,2,5,251,221,2,6,255,249,2,7,255,255,2,8,188,187,2,14,202,255,3,1,163,255,3,2,252,254,3,3,242,89,3,4,255,0,3,5,235,0,3,6,221,29,3,7,253,205,3,8,254,251,3,14,255,255,3,15,202,0,4,1,233,255,4,2,222,187,4,3,251,0,4,8,255,255,4,9,251,64,4,14,249,250,4,15,255,0,5,1,249,255,5,2,244,134,5,3,163,0,5,8,255,255,5,9,254,70,5,13,199,255,5,14,232,225,5,15,244,0,6,1,211,255,6,2,253,190,6,8,247,253,6,9,255,17,6,13,255,255,6,14,227,137,6,15,205,0,7,2,255,255,7,3,228,166,7,7,219,255,7,8,153,146,7,9,245,2,7,11,155,255,7,12,253,255,7,13,233,240,7,14,255,12,8,2,198,200,8,3,255,255,8,4,252,251,8,5,221,253,8,6,251,255,8,7,242,252,8,8,251,233,8,9,252,254,8,10,255,255,8,11,255,255,8,12,230,212,8,13,254,21,8,14,219,0,9,3,181,93,9,4,255,165,9,5,254,222,9,6,253,247,9,7,254,249,9,8,253,235,9,9,249,205,9,10,253,148,9,11,254,58,9,12,255,0,9,13,192,0,10,5,165,0,10,6,222,0,10,7,246,0,10,8,248,0,10,9,234,0,10,10,200,0],
secondary:!1},{width:17,bonus:600,chr:"%",
pixels:[1,3,153,255,1,4,225,255,1,5,247,255,1,6,227,255,1,7,165,255,2,2,189,255,2,3,255,255,2,4,247,243,2,5,249,217,2,6,254,228,2,7,255,255,2,8,243,232,3,2,253,255,3,3,225,157,3,4,255,1,3,5,235,0,3,6,212,0,3,7,237,99,3,8,255,255,3,9,229,67,4,2,253,255,4,3,255,148,4,8,255,255,4,9,255,59,4,14,239,255,5,2,182,250,5,3,255,255,5,4,247,245,5,5,213,255,5,6,231,255,5,7,255,255,5,8,236,241,5,9,255,10,5,12,213,255,5,13,212,255,5,15,239,0,6,3,221,164,6,4,254,222,6,5,254,248,6,6,250,232,6,7,247,172,6,8,255,37,6,9,227,37,6,10,178,252,6,11,243,255,6,12,154,194,6,13,213,6,6,14,212,0,7,5,222,0,7,6,247,0,7,7,228,12,7,8,212,160,7,9,249,254,7,10,183,241,7,11,185,40,7,12,244,0,8,7,227,255,8,8,221,253,8,9,168,111,8,10,248,0,8,11,173,0,9,5,195,255,9,6,247,255,9,7,173,189,9,8,228,11,9,9,232,102,9,10,199,227,9,11,199,255,9,12,172,255,10,3,153,255,10,4,253,255,10,5,198,237,10,6,204,45,10,7,248,0,10,8,187,161,10,9,255,255,10,10,255,255,10,11,255,255,10,12,255,255,10,13,255,255,11,2,239,255,11,3,229,253,11,4,187,115,11,5,253,0,11,6,184,0,11,8,223,255,11,9,208,205,11,10,255,27,11,11,255,5,11,12,255,42,11,13,255,211,11,14,254,213,12,3,240,13,12,4,227,0,12,8,251,255,12,9,232,76,12,10,168,0,12,14,253,247,12,15,212,0,13,8,221,255,13,9,253,175,13,13,215,255,13,14,235,231,13,15,245,0,14,9,255,255,14,10,255,255,14,11,255,255,14,12,255,255,14,13,255,255,14,14,232,114,14,15,213,0,15,9,157,137,15,10,255,173,15,11,255,199,15,12,254,174,15,13,255,83,15,14,255,0,16,11,173,0,16,12,199,0,16,13,174,0],
secondary:!1},{width:9,bonus:255,chr:"/",
pixels:[1,16,195,255,1,17,249,255,2,12,181,255,2,13,243,255,2,14,255,255,2,15,255,255,2,16,241,241,2,17,233,176,2,18,250,0,3,8,167,255,3,9,233,255,3,10,255,255,3,11,255,255,3,12,245,247,3,13,231,191,3,14,248,109,3,15,255,39,3,16,255,0,3,17,228,0,3,18,161,0,4,4,154,255,4,5,221,255,4,6,255,255,4,7,255,255,4,8,249,251,4,9,231,205,4,10,244,124,4,11,254,52,4,12,255,2,4,13,238,0,4,14,173,0,5,1,208,255,5,2,253,255,5,3,255,255,5,4,253,253,5,5,233,218,5,6,238,141,5,7,255,65,5,8,255,7,5,9,246,0,5,10,186,0,6,0,255,255,6,1,235,230,6,2,235,157,6,3,254,77,6,4,255,14,6,5,252,0,6,6,199,0,7,0,255,24,7,1,255,0,7,2,212,0],
secondary:!1},{width:11,bonus:200,chr:"+",
pixels:[1,8,255,255,2,8,255,255,2,9,255,84,3,8,255,255,3,9,255,84,4,4,208,255,4,5,208,255,4,6,208,255,4,7,213,255,4,8,255,255,4,9,255,223,4,10,224,237,4,11,208,255,4,12,208,255,5,4,255,255,5,5,255,255,5,6,255,255,5,7,255,255,5,8,255,255,5,9,255,255,5,10,255,255,5,11,255,255,5,12,255,255,5,13,208,0,6,5,255,0,6,6,255,0,6,7,255,36,6,8,255,255,6,9,255,84,6,10,255,0,6,11,255,0,6,12,255,0,6,13,255,0,7,8,255,255,7,9,255,84,8,8,255,255,8,9,255,84,9,8,255,255,9,9,255,84,10,9,255,0],
secondary:!1},{width:10,bonus:245,chr:"?",
pixels:[1,2,167,255,2,2,241,251,2,3,169,9,3,1,219,255,3,2,220,197,3,3,237,0,3,13,247,255,3,14,181,255,4,1,249,255,4,2,237,142,4,3,170,0,4,8,245,255,4,9,216,247,4,10,182,146,4,12,173,255,4,13,255,255,4,14,253,214,4,15,181,0,5,1,229,255,5,2,252,155,5,7,239,255,5,8,196,228,5,9,245,4,5,10,209,0,5,13,183,42,5,14,255,5,5,15,212,0,6,1,179,255,6,2,254,246,6,3,182,101,6,6,223,255,6,7,222,249,6,8,239,14,6,9,175,0,7,2,252,251,7,3,255,255,7,4,255,255,7,5,255,255,7,6,240,250,7,7,229,49,7,8,217,0,8,3,252,176,8,4,254,198,8,5,255,153,8,6,255,33,8,7,236,0,9,4,174,0,9,5,198,0,9,6,153,0],
secondary:!1},{width:7,bonus:200,chr:"!",
pixels:[3,1,208,255,3,2,208,255,3,3,208,255,3,4,208,255,3,5,208,255,3,6,208,255,3,7,208,255,3,8,208,255,3,9,208,255,3,10,208,255,3,13,247,255,3,14,181,255,4,1,255,255,4,2,255,255,4,3,255,255,4,4,255,255,4,5,255,255,4,6,255,255,4,7,255,255,4,8,255,255,4,9,255,255,4,10,255,255,4,11,208,0,4,12,173,255,4,13,255,255,4,14,253,214,4,15,181,0,5,2,255,0,5,3,255,0,5,4,255,0,5,5,255,0,5,6,255,0,5,7,255,0,5,8,255,0,5,9,255,0,5,10,255,0,5,11,255,0,5,13,183,42,5,14,255,5,5,15,212,0],
secondary:!1},{width:18,bonus:760,chr:"@",
pixels:[1,7,211,255,1,8,243,255,1,9,249,255,1,10,231,255,1,11,181,255,2,5,255,255,2,6,255,255,2,7,253,253,2,8,250,230,2,9,253,215,2,10,254,237,2,11,255,255,2,12,255,255,2,13,226,235,3,3,193,255,3,4,255,255,3,5,228,213,3,6,255,78,3,7,255,5,3,8,251,0,3,9,226,0,3,10,214,0,3,11,239,46,3,12,255,160,3,13,255,255,3,14,248,223,4,3,255,255,4,4,223,141,4,5,255,1,4,6,190,0,4,13,203,146,4,14,255,255,4,15,236,142,5,2,253,255,5,3,211,194,5,4,255,0,5,6,153,255,5,7,225,255,5,8,249,255,5,9,225,255,5,10,155,255,5,14,223,226,5,15,254,233,6,2,252,254,6,3,253,25,6,4,173,51,6,5,235,255,6,6,255,255,6,7,249,245,6,8,250,218,6,9,255,237,6,10,255,255,6,11,239,227,6,15,255,255,6,16,235,42,7,1,202,255,7,2,223,214,7,3,252,0,7,4,177,243,7,5,248,254,7,6,242,89,7,7,255,1,7,8,239,0,7,9,214,4,7,10,246,140,7,11,255,255,7,12,222,66,7,15,255,255,7,16,255,69,8,1,239,255,8,2,233,162,8,3,187,0,8,4,237,255,8,5,219,174,8,6,247,0,8,11,255,255,8,12,254,64,8,15,255,255,8,16,255,77,9,1,251,255,9,2,247,131,9,4,245,255,9,5,247,146,9,10,158,255,9,11,218,245,9,12,255,4,9,15,255,255,9,16,255,55,10,1,231,255,10,2,253,148,10,4,215,255,10,5,254,239,10,6,234,227,10,7,208,255,10,8,219,255,10,9,247,255,10,10,200,252,10,11,166,31,10,12,209,0,10,15,255,255,10,16,255,23,11,1,197,255,11,2,250,206,11,5,255,255,11,6,255,255,11,7,255,255,11,8,255,255,11,9,255,255,11,10,255,255,11,11,236,187,11,14,163,255,11,15,222,234,11,16,255,0,12,2,255,255,12,3,212,61,12,6,255,0,12,7,255,0,12,8,255,0,12,9,255,8,12,10,255,119,12,11,255,255,12,12,192,78,12,15,191,105,12,16,203,0,13,2,248,248,13,3,255,213,13,11,255,255,13,12,255,67,14,3,255,255,14,4,251,233,14,10,225,255,14,11,242,251,14,12,255,13,15,4,255,245,15,5,255,255,15,6,255,255,15,7,255,255,15,8,255,255,15,9,255,255,15,10,248,252,15,11,234,82,15,12,238,0,16,5,249,116,16,6,254,171,16,7,255,199,16,8,255,187,16,9,255,130,16,10,255,29,16,11,245,0,17,7,170,0,17,8,199,0,17,9,187,0],
secondary:!1},{width:14,bonus:445,chr:"#",
pixels:[1,10,255,255,2,6,255,255,2,10,255,255,2,11,255,84,3,6,255,255,3,7,254,64,3,10,255,255,3,11,255,142,3,12,166,189,3,13,167,255,3,14,209,255,4,6,255,255,4,7,254,164,4,8,202,234,4,9,239,255,4,10,255,255,4,11,255,255,4,12,242,238,4,13,216,212,4,14,214,160,4,15,210,0,5,3,193,255,5,4,239,255,5,5,255,255,5,6,255,255,5,7,254,225,5,8,222,188,5,9,220,153,5,10,255,255,5,11,255,90,5,12,255,0,5,13,226,0,5,14,180,0,6,3,186,213,6,4,219,126,6,5,244,77,6,6,255,255,6,7,254,64,6,8,224,0,6,9,177,52,6,10,255,255,6,11,255,84,7,4,156,0,7,6,255,255,7,7,254,64,7,10,255,255,7,11,255,127,7,12,153,171,7,14,197,255,8,6,255,255,8,7,255,151,8,8,187,225,8,9,221,255,8,10,255,255,8,11,255,255,8,12,248,248,8,13,220,228,8,14,211,181,8,15,197,0,9,3,165,255,9,4,213,255,9,5,251,255,9,6,255,255,9,7,254,234,9,8,224,204,9,9,218,173,9,10,255,255,9,11,255,100,9,12,255,0,9,13,241,0,9,14,196,0,10,3,198,230,10,4,210,157,10,5,229,104,10,6,255,255,10,7,254,64,10,8,234,0,10,9,191,48,10,10,255,255,10,11,255,84,11,4,178,0,11,6,255,255,11,7,254,64,11,10,255,255,11,11,255,84,12,6,255,255,12,7,254,64,12,11,255,0,13,7,255,0],
secondary:!1},{width:11,bonus:490,chr:"$",
pixels:[1,3,153,255,1,4,235,255,1,5,235,255,1,6,161,255,1,12,195,255,1,13,221,255,2,2,161,255,2,3,255,255,2,4,243,237,2,5,253,233,2,6,255,255,2,7,234,215,2,13,255,255,2,14,226,43,3,2,251,255,3,3,215,174,3,4,255,0,3,5,226,1,3,6,245,153,3,7,255,255,3,8,217,102,3,13,255,255,3,14,255,67,4,0,208,255,4,1,217,255,4,2,255,255,4,3,254,221,4,4,235,226,4,5,208,255,4,6,215,255,4,7,255,255,4,8,255,237,4,9,224,237,4,10,208,255,4,11,208,255,4,12,215,255,4,13,255,255,4,14,255,223,4,15,221,241,5,0,255,255,5,1,255,255,5,2,255,255,5,3,255,255,5,4,255,255,5,5,255,255,5,6,255,255,5,7,255,255,5,8,255,255,5,9,255,255,5,10,255,255,5,11,255,255,5,12,255,255,5,13,255,255,5,14,255,255,5,15,255,255,5,16,232,141,6,1,255,43,6,2,255,255,6,3,255,67,6,4,255,0,6,5,255,0,6,6,255,0,6,7,255,121,6,8,255,255,6,9,255,69,6,10,255,0,6,11,255,0,6,12,255,90,6,13,255,255,6,14,255,35,6,15,255,0,6,16,255,0,7,2,255,255,7,3,255,109,7,8,253,253,7,9,255,196,7,12,197,255,7,13,237,245,7,14,255,0,8,2,221,253,8,3,254,180,8,8,161,237,8,9,255,255,8,10,250,240,8,11,236,254,8,12,255,255,8,13,220,119,8,14,228,0,9,3,229,80,9,4,180,0,9,9,214,185,9,10,255,243,9,11,253,235,9,12,245,130,9,13,255,1,10,10,156,0,10,11,243,0,10,12,233,0],
secondary:!1},{width:11,bonus:200,chr:"^",
pixels:[1,8,169,255,1,9,253,255,2,6,171,255,2,7,253,255,2,8,225,248,2,9,203,126,2,10,253,0,3,4,173,255,3,5,253,255,3,6,217,246,3,7,199,112,3,8,254,3,3,9,219,0,4,2,175,255,4,3,253,255,4,4,208,242,4,5,197,98,4,6,254,0,4,7,209,0,5,1,255,255,5,2,253,255,5,3,207,123,5,4,254,0,5,5,198,0,6,2,255,202,6,3,255,253,6,4,205,215,7,3,216,82,7,4,254,196,7,5,255,255,7,6,206,239,8,5,209,77,8,6,254,189,8,7,255,255,8,8,224,240,9,7,203,70,9,8,255,181,9,9,255,255,10,9,196,65,10,10,255,0],
secondary:!1},{width:11,bonus:105,chr:"~",
pixels:[1,8,231,255,2,7,247,255,2,8,195,160,2,9,231,0,3,7,255,255,3,8,250,94,4,7,250,254,4,8,255,146,5,7,186,253,5,8,254,234,6,8,255,255,6,9,238,58,7,8,255,255,7,9,255,78,8,8,255,255,8,9,255,43,9,7,199,255,9,8,207,230,9,9,255,0,10,8,200,0,10,9,187,0],
secondary:!1},{width:15,bonus:550,chr:"&",
pixels:[1,10,227,255,1,11,247,255,1,12,203,255,2,3,191,255,2,4,187,255,2,8,179,255,2,9,255,255,2,10,246,246,2,11,252,228,2,12,255,255,2,13,253,252,3,2,255,255,3,3,255,255,3,4,255,255,3,5,255,255,3,6,206,218,3,8,255,255,3,9,221,162,3,10,255,5,3,11,237,0,3,12,233,80,3,13,254,252,3,14,252,164,4,1,195,255,4,2,238,248,4,3,255,40,4,4,255,25,4,5,255,158,4,6,255,255,4,7,255,255,4,8,217,221,4,9,255,0,4,13,196,224,4,14,255,219,4,15,162,0,5,1,235,255,5,2,228,157,5,3,231,0,5,6,226,201,5,7,255,255,5,8,255,158,5,9,188,0,5,14,252,251,5,15,219,0,6,1,241,255,6,2,246,141,6,6,235,255,6,7,252,248,6,8,255,255,6,9,203,149,6,14,247,247,6,15,248,0,7,1,205,255,7,2,253,229,7,3,154,65,7,5,187,255,7,6,242,255,7,7,238,44,7,8,254,209,7,9,254,255,7,10,165,133,7,13,185,255,7,14,231,224,7,15,240,0,8,2,255,255,8,3,255,255,8,4,255,255,8,5,254,255,8,6,211,105,8,7,242,0,8,9,249,231,8,10,255,247,8,13,251,255,8,14,221,148,8,15,202,0,9,2,154,157,9,3,255,184,9,4,254,180,9,5,255,69,9,6,254,0,9,10,253,241,9,11,254,236,9,12,210,240,9,13,243,254,9,14,252,23,10,4,184,0,10,5,180,0,10,11,255,255,10,12,255,255,10,13,222,130,10,14,242,0,11,10,213,255,11,11,255,255,11,12,255,255,11,13,255,221,12,8,239,255,12,9,255,255,12,10,247,252,12,11,231,120,12,12,255,91,12,13,255,253,12,14,251,229,13,8,211,255,13,9,247,131,13,10,255,23,13,11,244,0,13,14,255,253,13,15,225,0,14,9,212,0,14,15,253,0],
secondary:!1},{width:12,bonus:250,chr:"*",
pixels:[2,3,247,255,2,4,215,229,3,3,187,253,3,4,253,214,3,5,193,0,3,7,189,255,4,4,248,238,4,5,224,82,4,6,233,255,4,7,255,255,4,8,240,212,5,0,207,255,5,1,179,255,5,3,154,255,5,4,254,255,5,5,254,252,5,6,200,229,5,7,239,71,5,8,255,0,5,9,200,0,6,0,255,255,6,1,254,252,6,2,246,234,6,3,236,226,6,4,255,255,6,5,254,237,6,6,253,114,6,7,182,14,7,1,255,2,7,2,251,0,7,3,236,98,7,4,252,242,7,5,255,148,7,6,255,255,7,7,243,245,8,3,161,255,8,4,230,241,8,5,239,0,8,6,182,116,8,7,254,240,8,8,249,191,9,3,231,255,9,4,234,217,9,5,218,0,9,8,243,44,9,9,187,0,10,3,180,254,10,4,245,153,10,5,199,0,11,4,180,0],
secondary:!1},{width:7,bonus:245,chr:"(",
pixels:[1,4,175,255,1,5,215,255,1,6,233,255,1,7,249,255,1,8,247,255,1,9,231,255,1,10,211,255,1,11,167,255,2,1,221,255,2,2,255,255,2,3,255,255,2,4,255,255,2,5,252,251,2,6,251,235,2,7,252,218,2,8,254,218,2,9,254,234,2,10,254,251,2,11,255,255,2,12,255,255,2,13,255,255,2,14,222,245,3,0,255,255,3,1,246,246,3,2,242,161,3,3,255,89,3,4,255,37,3,5,255,1,3,6,248,0,3,7,231,0,3,8,215,0,3,9,217,0,3,10,233,2,3,11,250,42,3,12,255,92,3,13,255,154,3,14,254,239,3,15,255,255,3,16,238,240,4,0,235,89,4,1,255,6,4,2,237,0,4,14,156,10,4,15,243,87,4,16,255,207,4,17,255,255,5,0,205,0,5,17,224,107,5,18,255,0],
secondary:!1},{width:7,bonus:245,chr:")",
pixels:[2,16,239,255,2,17,248,255,3,0,255,255,3,1,255,255,3,2,216,246,3,13,203,255,3,14,255,255,3,15,255,255,3,16,223,215,3,17,242,40,3,18,248,0,4,0,202,82,4,1,254,162,4,2,254,245,4,3,255,255,4,4,255,255,4,5,255,255,4,6,255,255,4,7,255,255,4,8,255,255,4,9,255,255,4,10,255,255,4,11,255,255,4,12,255,255,4,13,252,252,4,14,237,183,4,15,255,71,4,16,255,0,4,17,188,0,5,2,166,16,5,3,247,64,5,4,255,115,5,5,255,160,5,6,254,180,5,7,255,197,5,8,254,201,5,9,254,183,5,10,254,164,5,11,255,123,5,12,255,69,5,13,255,15,5,14,249,0,5,15,170,0,6,6,160,0,6,7,180,0,6,8,197,0,6,9,200,0,6,10,182,0,6,11,164,0],
secondary:!1},{width:8,bonus:75,chr:"_",pixels:[0,17,255,255,1,17,255,255,1,18,255,84,2,17,255,255,2,18,255,84,3,17,255,255,3,18,255,84,4,17,255,255,4,18,255,84,5,17,255,255,5,18,255,84,6,17,255,255,6,18,255,84,7,17,255,255,7,18,255,84],secondary:!1
},{width:7,bonus:50,chr:"-",pixels:[1,8,255,255,2,8,255,255,2,9,255,84,3,8,255,255,3,9,255,84,4,8,255,255,4,9,255,84,5,8,255,255,5,9,255,84,6,9,255,0],secondary:!0},{width:11,bonus:180,chr:"=",
pixels:[1,6,255,255,1,10,255,255,2,6,255,255,2,7,255,84,2,10,255,255,2,11,255,84,3,6,255,255,3,7,255,84,3,10,255,255,3,11,255,84,4,6,255,255,4,7,255,84,4,10,255,255,4,11,255,84,5,6,255,255,5,7,255,84,5,10,255,255,5,11,255,84,6,6,255,255,6,7,255,84,6,10,255,255,6,11,255,84,7,6,255,255,7,7,255,84,7,10,255,255,7,11,255,84,8,6,255,255,8,7,255,84,8,10,255,255,8,11,255,84,9,6,255,255,9,7,255,84,9,10,255,255,9,11,255,84,10,7,255,0,10,11,255,0],
secondary:!1},{width:7,bonus:295,chr:"[",
pixels:[2,0,255,255,2,1,255,255,2,2,255,255,2,3,255,255,2,4,255,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,2,11,255,255,2,12,255,255,2,13,255,255,2,14,255,255,2,15,255,255,2,16,255,255,2,17,255,255,3,0,255,208,3,1,255,208,3,2,255,208,3,3,255,208,3,4,255,208,3,5,255,208,3,6,255,208,3,7,255,208,3,8,255,208,3,9,255,208,3,10,255,208,3,11,255,208,3,12,255,208,3,13,255,208,3,14,255,208,3,15,255,208,3,16,254,215,3,17,255,255,3,18,255,84,4,0,223,0,4,1,208,0,4,2,208,0,4,3,208,0,4,4,208,0,4,5,208,0,4,6,208,0,4,7,208,0,4,8,208,0,4,9,208,0,4,10,208,0,4,11,208,0,4,12,208,0,4,13,208,0,4,14,208,0,4,15,208,0,4,16,215,43,4,17,255,255,4,18,255,84,5,17,255,255,5,18,255,84,6,18,255,6],
secondary:!1},{width:7,bonus:300,chr:"]",
pixels:[1,17,255,255,2,17,255,255,2,18,255,84,3,0,255,255,3,1,255,255,3,2,255,255,3,3,255,255,3,4,255,255,3,5,255,255,3,6,255,255,3,7,255,255,3,8,255,255,3,9,255,255,3,10,255,255,3,11,255,255,3,12,255,255,3,13,255,255,3,14,255,255,3,15,255,255,3,16,255,255,3,17,255,255,3,18,255,84,4,0,255,208,4,1,255,208,4,2,255,208,4,3,255,208,4,4,255,208,4,5,255,208,4,6,255,208,4,7,255,208,4,8,255,208,4,9,255,208,4,10,255,208,4,11,255,208,4,12,255,208,4,13,255,208,4,14,255,208,4,15,255,208,4,16,255,208,4,17,255,208,4,18,255,68,5,0,208,0,5,1,208,0,5,2,208,0,5,3,208,0,5,4,208,0,5,5,208,0,5,6,208,0,5,7,208,0,5,8,208,0,5,9,208,0,5,10,208,0,5,11,208,0,5,12,208,0,5,13,208,0,5,14,208,0,5,15,208,0,5,16,208,0,5,17,208,0,5,18,208,0],
secondary:!1},{width:8,bonus:285,chr:"{",
pixels:[1,8,255,255,1,9,184,156,2,7,191,255,2,8,232,246,2,9,255,215,3,0,245,255,3,1,255,255,3,2,255,255,3,3,255,255,3,4,255,255,3,5,255,255,3,6,255,255,3,7,252,254,3,8,208,81,3,9,253,244,3,10,255,255,3,11,255,255,3,12,255,255,3,13,255,255,3,14,255,255,3,15,253,255,3,16,213,255,4,0,244,234,4,1,254,209,4,2,255,208,4,3,255,208,4,4,255,208,4,5,255,207,4,6,254,186,4,7,255,78,4,8,252,0,4,10,251,191,4,11,255,208,4,12,255,208,4,13,255,208,4,14,255,208,4,15,254,215,4,16,255,251,4,17,250,232,5,0,255,0,5,1,224,0,5,2,208,0,5,3,208,0,5,4,208,0,5,5,208,0,5,6,207,0,5,7,186,0,5,11,188,0,5,12,208,0,5,13,208,0,5,14,208,0,5,15,208,0,5,16,229,103,5,17,255,255,5,18,233,60,6,17,174,188,6,18,255,38],
secondary:!1},{width:8,bonus:295,chr:"}",
pixels:[1,17,255,255,2,17,255,255,2,18,255,34,3,0,255,255,3,1,255,255,3,2,255,255,3,3,255,255,3,4,255,255,3,5,255,255,3,6,235,255,3,10,235,255,3,11,255,255,3,12,255,255,3,13,255,255,3,14,255,255,3,15,255,255,3,16,255,255,3,17,226,215,3,18,255,0,4,0,255,197,4,1,255,208,4,2,255,208,4,3,255,208,4,4,255,208,4,5,255,208,4,6,254,233,4,7,255,255,4,8,180,146,4,9,251,255,4,10,242,246,4,11,252,211,4,12,255,208,4,13,255,208,4,14,255,208,4,15,255,205,4,16,255,161,4,17,255,17,4,18,190,0,5,1,197,0,5,2,208,0,5,3,208,0,5,4,208,0,5,5,208,0,5,6,208,1,5,7,246,154,5,8,254,245,5,9,211,219,5,10,252,3,5,11,234,0,5,12,208,0,5,13,208,0,5,14,208,0,5,15,208,0,5,16,205,0,5,17,161,0,6,8,255,255,6,9,248,100,6,10,181,0,7,9,255,0],
secondary:!1},{width:6,bonus:85,chr:":",pixels:[2,4,183,255,2,5,247,255,2,13,247,255,2,14,181,255,3,4,215,255,3,5,255,255,3,6,252,176,3,12,175,255,3,13,255,255,3,14,254,214,3,15,181,0,4,5,219,36,4,6,255,3,4,7,174,0,4,13,184,43,4,14,255,6,4,15,213,0],
secondary:!0},{width:6,bonus:115,chr:";",
pixels:[1,17,181,255,2,4,183,255,2,5,247,255,2,13,239,255,2,14,255,255,2,15,255,255,2,16,248,252,2,17,209,200,2,18,181,0,3,4,215,255,3,5,255,255,3,6,252,176,3,13,223,255,3,14,250,162,3,15,255,83,3,16,255,11,3,17,245,0,3,18,164,0,4,5,219,36,4,6,255,3,4,7,174,0,4,14,223,0,4,15,158,0],
secondary:!0},{width:10,bonus:130,chr:'"',
pixels:[2,1,167,255,3,1,255,255,3,2,255,255,3,3,255,255,3,4,255,255,3,5,255,255,4,2,255,93,4,3,255,67,4,4,255,42,4,5,255,16,4,6,255,0,6,1,255,255,6,2,255,255,6,3,238,255,6,4,213,255,6,5,187,255,7,1,249,255,7,2,255,225,7,3,255,199,7,4,249,178,7,5,238,159,7,6,188,0,8,2,249,0,8,3,225,0,8,4,199,0,8,5,174,0],
secondary:!0},{width:7,bonus:55,chr:"'",pixels:[2,1,167,255,3,1,255,255,3,2,255,255,3,3,255,255,3,4,255,255,3,5,255,255,4,2,255,93,4,3,255,67,4,4,255,42,4,5,255,16,4,6,255,0],secondary:!0},{width:11,bonus:190,chr:"<",
pixels:[1,8,235,255,2,8,253,255,2,9,253,240,3,7,243,255,3,8,184,154,3,9,254,243,3,10,245,118,4,7,222,252,4,8,243,4,4,9,192,190,4,10,253,228,5,6,247,255,5,7,185,134,5,8,220,0,5,10,253,253,5,11,236,101,6,5,155,255,6,6,223,251,6,7,248,4,6,10,183,240,6,11,254,212,7,5,251,255,7,6,193,128,7,7,220,0,7,11,255,255,7,12,223,87,8,4,169,255,8,5,225,249,8,6,252,4,8,11,213,241,8,12,254,195,9,4,253,255,9,5,201,123,9,6,220,0,9,12,255,255,9,13,207,70,10,5,254,0,10,13,255,0],
secondary:!1},{width:11,bonus:190,chr:">",
pixels:[1,4,253,255,1,12,255,255,2,4,185,233,2,5,254,221,2,11,201,255,2,12,214,231,2,13,255,0,3,5,253,253,3,6,233,105,3,11,255,255,3,12,216,89,3,13,194,0,4,5,170,233,4,6,255,219,4,10,171,255,4,11,221,244,4,12,255,1,5,6,252,251,5,7,232,104,5,10,251,255,5,11,201,119,5,12,211,0,6,6,155,234,6,7,254,220,6,10,229,251,6,11,252,5,7,7,250,248,7,8,234,119,7,9,241,255,7,10,192,150,7,11,226,0,8,8,254,252,8,9,245,247,8,10,242,13,9,8,245,245,9,9,253,133,9,10,238,0,10,9,236,0],
secondary:!1},{width:9,bonus:205,chr:"\\",
pixels:[2,0,255,255,2,1,255,255,2,2,246,252,2,3,183,253,3,0,228,40,3,1,255,103,3,2,254,171,3,3,254,237,3,4,255,255,3,5,255,255,3,6,237,251,3,7,168,254,4,3,170,2,4,4,239,52,4,5,255,117,4,6,255,184,4,7,254,246,4,8,255,255,4,9,255,255,4,10,226,250,4,11,154,255,5,7,186,8,5,8,247,65,5,9,255,130,5,10,254,198,5,11,254,252,5,12,255,255,5,13,254,255,5,14,212,251,6,11,200,17,6,12,251,77,6,13,254,144,6,14,255,211,6,15,255,255,6,16,255,255,6,17,251,254,7,15,215,29,7,16,255,90,7,17,255,158,7,18,250,0,8,18,158,0],
secondary:!1},{width:5,bonus:45,chr:".",pixels:[1,13,247,255,1,14,181,255,2,12,173,255,2,13,255,255,2,14,253,214,2,15,181,0,3,13,183,42,3,14,255,5,3,15,212,0],secondary:!0},{width:5,bonus:65,chr:",",
pixels:[1,14,165,255,1,15,215,255,1,16,253,255,1,17,255,255,2,13,255,255,2,14,255,255,2,15,249,245,2,16,238,160,2,17,254,45,2,18,255,0,3,14,255,80,3,15,255,7,3,16,240,0],secondary:!0},{width:12,bonus:280,chr:"|",
pixels:[5,0,255,255,5,1,255,255,5,2,255,255,5,3,255,255,5,4,255,255,5,5,255,255,5,6,255,255,5,7,255,255,5,8,255,255,5,9,255,255,5,10,255,255,5,11,255,255,5,12,255,255,5,13,255,255,5,14,255,255,5,15,255,255,5,16,255,255,5,17,255,255,6,0,255,208,6,1,255,208,6,2,255,208,6,3,255,208,6,4,255,208,6,5,255,208,6,6,255,208,6,7,255,208,6,8,255,208,6,9,255,208,6,10,255,208,6,11,255,208,6,12,255,208,6,13,255,208,6,14,255,208,6,15,255,208,6,16,255,208,6,17,255,208,6,18,255,0,7,0,208,0,7,1,208,0,7,2,208,0,7,3,208,0,7,4,208,0,7,5,208,0,7,6,208,0,7,7,208,0,7,8,208,0,7,9,208,0,7,10,208,0,7,11,208,0,7,12,208,0,7,13,208,0,7,14,208,0,7,15,208,0,7,16,208,0,7,17,208,0,7,18,208,0],
secondary:!1}],width:19,spacewidth:5,shadow:!0,height:20,basey:14}}],e={},function o(r){var n=e[r];if(void 0!==n)return n.exports;var i=e[r]={exports:{}};return s[r](i,i.exports,o),i.exports}(0);var s,e}));

/***/ }),

/***/ "../node_modules/.pnpm/@alt1+ocr@1.0.0-alpha.7/node_modules/@alt1/ocr/fonts/chatbox/22pt.js":
/*!**************************************************************************************************!*\
  !*** ../node_modules/.pnpm/@alt1+ocr@1.0.0-alpha.7/node_modules/@alt1/ocr/fonts/chatbox/22pt.js ***!
  \**************************************************************************************************/
/***/ (function(module) {

!function(s,e){ true?module.exports=e():0}("undefined"!=typeof self?self:this,(()=>{
return s=[s=>{s.exports={chars:[{width:13,bonus:455,chr:"a",
pixels:[1,12,233,255,1,13,249,255,1,14,211,255,2,10,157,255,2,11,255,255,2,12,255,255,2,13,255,255,2,14,255,255,2,15,255,255,3,6,255,255,3,10,253,255,3,11,247,241,3,12,254,64,3,13,255,12,3,14,255,87,3,15,255,253,3,16,254,198,4,5,187,255,4,6,236,241,4,7,255,0,4,10,255,255,4,11,253,98,4,12,233,0,4,15,210,227,4,16,254,240,4,17,198,0,5,5,233,255,5,6,236,201,5,7,223,0,5,10,255,255,5,11,255,32,5,15,165,255,5,16,252,247,5,17,240,0,6,5,251,255,6,6,247,169,6,7,186,0,6,10,255,255,6,11,255,6,6,15,199,255,6,16,237,219,6,17,244,0,7,5,237,255,7,6,254,198,7,7,164,0,7,9,155,255,7,10,255,255,7,11,255,0,7,15,253,255,7,16,220,112,7,17,203,0,8,5,189,255,8,6,255,255,8,7,221,121,8,9,155,255,8,10,255,255,8,11,255,0,8,14,227,255,8,15,168,223,8,16,254,0,9,6,255,255,9,7,255,255,9,8,255,255,9,9,255,255,9,10,255,255,9,11,255,255,9,12,255,255,9,13,255,255,9,14,255,255,9,15,250,209,9,16,211,182,10,7,255,205,10,8,255,247,10,9,255,255,10,10,255,255,10,11,255,255,10,12,255,255,10,13,255,255,10,14,255,255,10,15,255,255,10,16,255,255,11,8,205,0,11,9,247,0,11,10,255,0,11,11,255,0,11,12,255,0,11,13,255,0,11,14,255,0,11,15,255,0,11,16,255,0,11,17,255,0],
secondary:!1},{width:13,bonus:515,chr:"b",
pixels:[2,1,255,255,2,2,255,255,2,3,255,255,2,4,255,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,2,11,255,255,2,12,255,255,2,13,255,255,2,14,255,255,2,15,255,255,2,16,255,255,3,1,255,255,3,2,255,255,3,3,255,255,3,4,254,255,3,5,255,243,3,6,254,239,3,7,255,255,3,8,255,255,3,9,255,255,3,10,255,255,3,11,255,255,3,12,255,255,3,13,255,255,3,14,255,255,3,15,255,213,3,16,255,143,3,17,255,0,4,2,255,0,4,3,255,0,4,4,255,0,4,5,254,13,4,6,253,198,4,7,252,207,4,8,255,77,4,9,255,23,4,10,255,4,4,11,255,4,4,12,255,25,4,13,255,81,4,14,255,209,4,15,255,199,4,16,215,16,5,6,238,254,5,7,201,28,5,8,205,0,5,15,251,242,5,16,230,156,6,5,227,255,6,6,222,209,6,7,237,0,6,15,188,247,6,16,253,229,7,5,249,255,7,6,245,176,7,7,182,0,7,15,167,255,7,16,253,251,7,17,227,0,8,5,219,255,8,6,255,237,8,7,176,29,8,15,237,255,8,16,242,231,8,17,249,0,9,6,255,255,9,7,252,222,9,14,221,255,9,15,255,255,9,16,246,130,9,17,220,0,10,6,214,209,10,7,255,255,10,8,255,255,10,9,255,255,10,10,255,255,10,11,255,255,10,12,255,255,10,13,255,255,10,14,255,255,10,15,244,183,10,16,255,6,11,7,201,103,11,8,255,175,11,9,254,227,11,10,254,249,11,11,254,249,11,12,254,227,11,13,254,174,11,14,255,80,11,15,255,0,11,16,175,0,12,9,175,0,12,10,226,0,12,11,248,0,12,12,248,0,12,13,226,0,12,14,174,0],
secondary:!1},{width:10,bonus:300,chr:"c",
pixels:[1,8,158,255,1,9,219,255,1,10,247,255,1,11,247,255,1,12,225,255,1,13,167,255,2,7,251,255,2,8,255,255,2,9,255,255,2,10,255,255,2,11,255,255,2,12,255,255,2,13,255,255,2,14,255,255,2,15,156,206,3,6,253,255,3,7,244,246,3,8,254,113,3,9,255,36,3,10,255,6,3,11,255,13,3,12,255,43,3,13,255,125,3,14,255,237,3,15,255,255,3,16,163,113,4,5,173,255,4,6,252,254,4,7,254,47,4,8,236,0,4,15,254,251,4,16,254,183,5,5,231,255,5,6,234,206,5,7,251,0,5,15,198,239,5,16,254,237,5,17,182,0,6,5,249,255,6,6,246,168,6,7,189,0,6,15,161,255,6,16,253,252,6,17,236,0,7,5,231,255,7,6,254,188,7,7,162,0,7,15,185,255,7,16,246,239,7,17,250,0,8,5,196,255,8,6,253,246,8,7,188,10,8,15,239,255,8,16,235,199,8,17,231,0,9,6,216,103,9,7,244,4,9,16,243,63,9,17,183,0],
secondary:!1},{width:13,bonus:520,chr:"d",
pixels:[1,8,175,255,1,9,225,255,1,10,249,255,1,11,249,255,1,12,227,255,1,13,178,255,2,6,177,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,2,11,255,255,2,12,255,255,2,13,255,255,2,14,255,255,2,15,206,225,3,6,255,255,3,7,246,235,3,8,255,104,3,9,255,34,3,10,255,6,3,11,255,4,3,12,255,28,3,13,255,93,3,14,255,219,3,15,255,255,3,16,219,152,4,5,219,255,4,6,247,247,4,7,255,27,4,8,227,0,4,15,252,240,4,16,254,222,5,5,249,255,5,6,243,177,5,7,239,0,5,15,174,245,5,16,255,249,5,17,222,0,6,5,225,255,6,6,252,176,6,7,169,0,6,15,181,255,6,16,244,236,6,17,249,0,7,6,253,241,7,7,181,31,7,15,237,255,7,16,220,160,7,17,226,0,8,6,225,217,8,7,252,220,8,14,203,255,8,15,195,247,8,16,238,11,9,1,255,255,9,2,255,255,9,3,255,255,9,4,255,255,9,5,251,255,9,6,238,255,9,7,255,255,9,8,255,255,9,9,255,255,9,10,255,255,9,11,255,255,9,12,255,255,9,13,255,255,9,14,255,255,9,15,248,229,9,16,235,192,10,1,255,255,10,2,255,255,10,3,255,255,10,4,255,255,10,5,255,255,10,6,255,255,10,7,255,255,10,8,255,255,10,9,255,255,10,10,255,255,10,11,255,255,10,12,255,255,10,13,255,255,10,14,255,255,10,15,255,255,10,16,255,255,10,17,177,0,11,2,255,0,11,3,255,0,11,4,255,0,11,5,255,0,11,6,255,0,11,7,255,0,11,8,255,0,11,9,255,0,11,10,255,0,11,11,255,0,11,12,255,0,11,13,255,0,11,14,255,0,11,15,255,0,11,16,255,0,11,17,255,0],
secondary:!1},{width:12,bonus:435,chr:"e",
pixels:[1,8,153,255,1,9,217,255,1,10,245,255,1,11,247,255,1,12,221,255,1,13,157,255,2,7,251,255,2,8,255,255,2,9,255,255,2,10,255,255,2,11,255,255,2,12,255,255,2,13,255,255,2,14,253,252,3,6,255,255,3,7,228,234,3,8,252,69,3,9,254,162,3,10,255,255,3,11,255,7,3,12,255,41,3,13,255,129,3,14,255,247,3,15,254,252,4,5,185,255,4,6,245,252,4,7,255,23,4,8,210,0,4,9,182,218,4,10,255,255,4,11,255,0,4,14,166,114,4,15,255,255,4,16,254,168,5,5,239,255,5,6,235,197,5,7,242,0,5,9,155,255,5,10,255,255,5,11,255,0,5,15,218,237,5,16,255,229,5,17,167,0,6,5,247,255,6,6,250,172,6,7,182,0,6,9,155,255,6,10,255,255,6,11,255,0,6,15,161,255,6,16,254,252,6,17,229,0,7,5,211,255,7,6,254,225,7,7,171,9,7,9,155,255,7,10,255,255,7,11,255,0,7,15,175,255,7,16,251,249,7,17,251,0,8,6,255,255,8,7,244,177,8,9,159,255,8,10,255,255,8,11,255,0,8,15,209,255,8,16,242,225,8,17,246,0,9,6,223,221,9,7,255,255,9,8,255,255,9,9,255,255,9,10,255,255,9,11,255,0,9,15,253,255,9,16,235,154,9,17,214,0,10,7,221,138,10,8,254,210,10,9,255,247,10,10,255,255,10,11,255,0,10,16,254,38,11,9,210,0,11,10,247,0,11,11,255,0],
secondary:!1},{width:9,bonus:340,chr:"f",
pixels:[1,6,155,255,2,5,221,255,2,6,208,191,2,7,156,0,3,3,219,255,3,4,251,255,3,5,255,255,3,6,255,255,3,7,255,255,3,8,255,255,3,9,255,255,3,10,255,255,3,11,255,255,3,12,255,255,3,13,255,255,3,14,255,255,3,15,255,255,3,16,255,255,4,2,255,255,4,3,255,255,4,4,255,255,4,5,255,255,4,6,255,255,4,7,255,255,4,8,255,255,4,9,255,255,4,10,255,255,4,11,255,255,4,12,255,255,4,13,255,255,4,14,255,255,4,15,255,255,4,16,255,255,4,17,255,0,5,1,209,255,5,2,248,250,5,3,255,59,5,4,255,3,5,5,255,255,5,6,254,156,5,7,255,0,5,8,255,0,5,9,255,0,5,10,255,0,5,11,255,0,5,12,255,0,5,13,255,0,5,14,255,0,5,15,255,0,5,16,255,0,5,17,255,0,6,1,241,255,6,2,240,182,6,3,243,0,6,5,255,255,6,6,254,156,6,7,156,0,7,1,241,255,7,2,251,178,7,3,171,0,7,5,255,255,7,6,254,156,7,7,156,0,8,1,197,255,8,2,250,173,8,3,175,0,8,6,255,0,8,7,156,0],
secondary:!1},{width:13,bonus:585,chr:"g",
pixels:[1,8,172,255,1,9,225,255,1,10,249,255,1,11,249,255,1,12,227,255,1,13,178,255,2,6,171,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,2,11,255,255,2,12,255,255,2,13,255,255,2,14,255,255,2,15,206,225,2,20,255,255,3,6,255,255,3,7,244,234,3,8,255,111,3,9,255,38,3,10,255,12,3,11,255,4,3,12,255,30,3,13,254,94,3,14,254,219,3,15,255,255,3,16,219,153,3,20,240,248,3,21,254,189,4,5,221,255,4,6,246,246,4,7,255,23,4,8,224,0,4,15,252,239,4,16,255,223,4,20,194,255,4,21,252,228,5,5,249,255,5,6,243,175,5,7,237,0,5,15,173,246,5,16,254,251,5,17,223,0,5,20,167,255,5,21,252,248,6,5,221,255,6,6,252,176,6,7,167,0,6,15,181,255,6,16,244,234,6,17,250,0,6,20,179,255,6,21,252,250,7,6,253,241,7,7,181,31,7,15,237,255,7,16,219,153,7,17,224,0,7,20,239,255,7,21,243,226,8,6,221,214,8,7,253,219,8,14,205,255,8,15,180,244,8,16,238,6,8,19,208,255,8,20,255,255,8,21,248,145,9,5,181,255,9,6,226,254,9,7,255,255,9,8,255,255,9,9,255,255,9,10,255,255,9,11,255,255,9,12,255,255,9,13,255,255,9,14,255,255,9,15,255,255,9,16,255,255,9,17,255,255,9,18,255,255,9,19,255,255,9,20,249,226,9,21,255,20,10,5,255,255,10,6,255,255,10,7,255,255,10,8,255,255,10,9,255,255,10,10,255,255,10,11,255,255,10,12,255,255,10,13,255,255,10,14,255,255,10,15,255,255,10,16,255,255,10,17,255,245,10,18,255,213,10,19,255,136,10,20,255,18,10,21,221,0,11,6,255,0,11,7,255,0,11,8,255,0,11,9,255,0,11,10,255,0,11,11,255,0,11,12,255,0,11,13,255,0,11,14,255,0,11,15,255,0,11,16,255,0,11,17,255,0,11,18,245,0,11,19,213,0],
secondary:!1},{width:14,bonus:480,chr:"h",
pixels:[2,1,255,255,2,2,255,255,2,3,255,255,2,4,255,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,2,11,255,255,2,12,255,255,2,13,255,255,2,14,255,255,2,15,255,255,2,16,255,255,3,1,255,255,3,2,255,255,3,3,255,255,3,4,255,255,3,5,254,255,3,6,255,243,3,7,255,255,3,8,255,255,3,9,255,255,3,10,255,255,3,11,255,255,3,12,255,255,3,13,255,255,3,14,255,255,3,15,255,255,3,16,255,255,3,17,255,0,4,2,255,0,4,3,255,0,4,4,255,0,4,5,255,5,4,6,255,179,4,7,253,223,4,8,255,91,4,9,255,27,4,10,255,4,4,11,255,0,4,12,255,0,4,13,255,0,4,14,255,0,4,15,255,0,4,16,255,0,4,17,255,0,5,6,247,255,5,7,191,55,5,8,222,0,6,5,213,255,6,6,222,223,6,7,247,0,7,5,247,255,7,6,241,176,7,7,194,0,8,5,239,255,8,6,253,211,8,7,166,2,9,5,187,255,9,6,255,255,9,7,236,161,10,6,254,254,10,7,255,255,10,8,255,255,10,9,255,255,10,10,255,255,10,11,255,255,10,12,255,255,10,13,255,255,10,14,255,255,10,15,255,255,10,16,255,255,11,7,255,190,11,8,254,240,11,9,255,255,11,10,255,255,11,11,255,255,11,12,255,255,11,13,255,255,11,14,255,255,11,15,255,255,11,16,255,255,11,17,255,0,12,8,190,0,12,9,240,0,12,10,255,0,12,11,255,0,12,12,255,0,12,13,255,0,12,14,255,0,12,15,255,0,12,16,255,0,12,17,255,0],
secondary:!1},{width:6,bonus:220,chr:"i",
pixels:[2,1,199,255,2,2,225,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,2,11,255,255,2,12,255,255,2,13,255,255,2,14,255,255,2,15,255,255,2,16,255,255,3,1,197,255,3,2,248,230,3,3,227,9,3,5,255,255,3,6,255,255,3,7,255,255,3,8,255,255,3,9,255,255,3,10,255,255,3,11,255,255,3,12,255,255,3,13,255,255,3,14,255,255,3,15,255,255,3,16,255,255,3,17,255,0,4,2,198,0,4,3,224,0,4,6,255,0,4,7,255,0,4,8,255,0,4,9,255,0,4,10,255,0,4,11,255,0,4,12,255,0,4,13,255,0,4,14,255,0,4,15,255,0,4,16,255,0,4,17,255,0],
secondary:!1},{width:6,bonus:300,chr:"j",
pixels:[0,20,166,255,0,21,253,252,1,20,231,255,1,21,244,235,2,1,199,255,2,2,225,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,2,11,255,255,2,12,255,255,2,13,255,255,2,14,255,255,2,15,255,255,2,16,255,255,2,17,255,255,2,18,255,255,2,19,255,255,2,20,255,255,2,21,244,143,3,1,197,255,3,2,248,230,3,3,227,9,3,5,255,255,3,6,255,255,3,7,255,255,3,8,255,255,3,9,255,255,3,10,255,255,3,11,255,255,3,12,255,255,3,13,255,255,3,14,255,255,3,15,255,255,3,16,255,255,3,17,255,255,3,18,255,251,3,19,254,221,3,20,255,131,3,21,255,8,4,2,198,0,4,3,224,0,4,6,255,0,4,7,255,0,4,8,255,0,4,9,255,0,4,10,255,0,4,11,255,0,4,12,255,0,4,13,255,0,4,14,255,0,4,15,255,0,4,16,255,0,4,17,255,0,4,18,255,0,4,19,251,0,4,20,220,0],
secondary:!1},{width:12,bonus:445,chr:"k",
pixels:[2,1,255,255,2,2,255,255,2,3,255,255,2,4,255,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,2,11,255,255,2,12,255,255,2,13,255,255,2,14,255,255,2,15,255,255,2,16,255,255,3,1,255,255,3,2,255,255,3,3,255,255,3,4,255,255,3,5,255,255,3,6,255,255,3,7,255,255,3,8,255,255,3,9,255,255,3,10,255,255,3,11,255,255,3,12,255,255,3,13,255,255,3,14,255,255,3,15,255,255,3,16,255,255,3,17,255,0,4,2,255,0,4,3,255,0,4,4,255,0,4,5,255,0,4,6,255,0,4,7,255,0,4,8,255,0,4,9,255,13,4,10,255,173,4,11,255,243,4,12,255,50,4,13,255,0,4,14,255,0,4,15,255,0,4,16,255,0,4,17,255,0,5,9,213,255,5,10,255,255,5,11,233,202,5,12,243,8,6,8,229,255,6,9,250,254,6,10,250,232,6,11,255,255,6,12,242,221,7,7,237,255,7,8,247,253,7,9,235,76,7,10,249,17,7,11,246,181,7,12,255,255,7,13,253,247,8,6,245,255,8,7,241,252,8,8,241,60,8,9,245,0,8,12,210,134,8,13,255,249,8,14,255,255,8,15,203,212,9,5,251,255,9,6,238,248,9,7,247,46,9,8,238,0,9,14,254,220,9,15,255,255,9,16,243,232,10,5,221,255,10,6,251,35,10,7,231,0,10,15,243,174,10,16,255,255,10,17,222,0,11,6,222,0,11,16,201,128,11,17,255,0],
secondary:!1},{width:6,bonus:245,chr:"l",
pixels:[2,1,255,255,2,2,255,255,2,3,255,255,2,4,255,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,2,11,255,255,2,12,255,255,2,13,255,255,2,14,255,255,2,15,255,255,2,16,255,255,3,1,255,255,3,2,255,255,3,3,255,255,3,4,255,255,3,5,255,255,3,6,255,255,3,7,255,255,3,8,255,255,3,9,255,255,3,10,255,255,3,11,255,255,3,12,255,255,3,13,255,255,3,14,255,255,3,15,255,255,3,16,255,255,3,17,255,0,4,2,255,0,4,3,255,0,4,4,255,0,4,5,255,0,4,6,255,0,4,7,255,0,4,8,255,0,4,9,255,0,4,10,255,0,4,11,255,0,4,12,255,0,4,13,255,0,4,14,255,0,4,15,255,0,4,16,255,0,4,17,255,0],
secondary:!1},{width:20,bonus:650,chr:"m",
pixels:[2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,2,11,255,255,2,12,255,255,2,13,255,255,2,14,255,255,2,15,255,255,2,16,255,255,3,5,175,255,3,6,254,222,3,7,255,255,3,8,255,255,3,9,255,255,3,10,255,255,3,11,255,255,3,12,255,255,3,13,255,255,3,14,255,255,3,15,255,255,3,16,255,255,3,17,255,0,4,6,235,208,4,7,248,207,4,8,255,74,4,9,255,22,4,10,255,3,4,11,255,0,4,12,255,0,4,13,255,0,4,14,255,0,4,15,255,0,4,16,255,0,4,17,255,0,5,6,233,254,5,7,195,21,5,8,201,0,6,5,229,255,6,6,219,202,6,7,232,0,7,5,247,255,7,6,249,195,7,7,174,0,8,5,209,255,8,6,255,255,8,7,222,143,9,6,255,255,9,7,255,255,9,8,255,255,9,9,255,255,9,10,255,255,9,11,255,255,9,12,255,255,9,13,255,255,9,14,255,255,9,15,255,255,9,16,255,255,10,6,159,164,10,7,255,255,10,8,255,255,10,9,255,255,10,10,255,255,10,11,255,255,10,12,255,255,10,13,255,255,10,14,255,255,10,15,255,255,10,16,255,255,10,17,255,0,11,6,223,255,11,7,220,229,11,8,255,67,11,9,255,16,11,10,255,1,11,11,255,0,11,12,255,0,11,13,255,0,11,14,255,0,11,15,255,0,11,16,255,0,11,17,255,0,12,5,157,255,12,6,233,253,12,7,224,17,12,8,197,0,13,5,231,255,13,6,223,199,13,7,231,0,14,5,249,255,14,6,250,194,14,7,174,0,15,5,213,255,15,6,255,255,15,7,222,144,16,6,255,255,16,7,255,255,16,8,255,255,16,9,255,255,16,10,255,255,16,11,255,255,16,12,255,255,16,13,255,255,16,14,255,255,16,15,255,255,16,16,255,255,17,6,157,151,17,7,254,198,17,8,254,243,17,9,255,255,17,10,255,255,17,11,255,255,17,12,255,255,17,13,255,255,17,14,255,255,17,15,255,255,17,16,255,255,17,17,255,0,18,8,198,0,18,9,242,0,18,10,255,0,18,11,255,0,18,12,255,0,18,13,255,0,18,14,255,0,18,15,255,0,18,16,255,0,18,17,255,0],
secondary:!1},{width:14,bonus:420,chr:"n",
pixels:[2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,2,11,255,255,2,12,255,255,2,13,255,255,2,14,255,255,2,15,255,255,2,16,255,255,3,5,175,255,3,6,254,222,3,7,255,255,3,8,255,255,3,9,255,255,3,10,255,255,3,11,255,255,3,12,255,255,3,13,255,255,3,14,255,255,3,15,255,255,3,16,255,255,3,17,255,0,4,6,231,198,4,7,251,225,4,8,255,90,4,9,255,27,4,10,255,4,4,11,255,0,4,12,255,0,4,13,255,0,4,14,255,0,4,15,255,0,4,16,255,0,4,17,255,0,5,6,247,255,5,7,192,54,5,8,221,0,6,5,213,255,6,6,222,223,6,7,247,0,7,5,247,255,7,6,241,176,7,7,194,0,8,5,241,255,8,6,253,211,8,7,166,2,9,5,191,255,9,6,255,255,9,7,236,161,10,6,254,255,10,7,255,255,10,8,255,255,10,9,255,255,10,10,255,255,10,11,255,255,10,12,255,255,10,13,255,255,10,14,255,255,10,15,255,255,10,16,255,255,11,7,255,189,11,8,254,240,11,9,255,255,11,10,255,255,11,11,255,255,11,12,255,255,11,13,255,255,11,14,255,255,11,15,255,255,11,16,255,255,11,17,255,0,12,8,189,0,12,9,240,0,12,10,255,0,12,11,255,0,12,12,255,0,12,13,255,0,12,14,255,0,12,15,255,0,12,16,255,0,12,17,255,0],
secondary:!1},{width:13,bonus:410,chr:"o",
pixels:[1,8,159,255,1,9,221,255,1,10,247,255,1,11,243,255,1,12,213,255,2,7,251,255,2,8,255,255,2,9,255,255,2,10,255,255,2,11,255,255,2,12,255,255,2,13,255,255,2,14,251,249,3,6,253,255,3,7,244,246,3,8,254,111,3,9,255,34,3,10,255,5,3,11,255,7,3,12,255,38,3,13,255,118,3,14,255,241,3,15,255,249,4,5,173,255,4,6,252,254,4,7,254,47,4,8,236,0,4,15,255,253,4,16,252,166,5,5,231,255,5,6,233,206,5,7,251,0,5,15,205,238,5,16,255,227,5,17,164,0,6,5,249,255,6,6,246,167,6,7,188,0,6,15,161,255,6,16,253,252,6,17,227,0,7,5,231,255,7,6,253,193,7,7,161,0,7,15,191,255,7,16,246,240,7,17,250,0,8,5,169,255,8,6,255,253,8,7,206,71,8,15,253,255,8,16,234,186,8,17,232,0,9,6,253,253,9,7,255,241,9,14,241,255,9,15,252,254,9,16,254,54,9,17,171,0,10,7,255,249,10,8,255,255,10,9,255,255,10,10,255,255,10,11,255,255,10,12,255,255,10,13,255,255,10,14,252,253,10,15,247,101,10,16,252,0,11,8,253,154,11,9,254,219,11,10,254,246,11,11,254,246,11,12,254,219,11,13,255,154,11,14,255,43,11,15,250,0,12,10,218,0,12,11,246,0,12,12,246,0,12,13,218,0,12,14,154,0],
secondary:!1},{width:13,bonus:525,chr:"p",
pixels:[2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,2,11,255,255,2,12,255,255,2,13,255,255,2,14,255,255,2,15,255,255,2,16,255,255,2,17,255,255,2,18,255,255,2,19,255,255,2,20,255,255,2,21,255,255,3,5,181,255,3,6,255,223,3,7,255,255,3,8,255,255,3,9,255,255,3,10,255,255,3,11,255,255,3,12,255,255,3,13,255,255,3,14,255,255,3,15,255,239,3,16,254,246,3,17,255,255,3,18,255,255,3,19,255,255,3,20,255,255,3,21,255,255,4,6,235,203,4,7,249,207,4,8,255,71,4,9,255,18,4,10,255,1,4,11,255,5,4,12,255,27,4,13,255,87,4,14,254,213,4,15,255,197,4,16,239,14,4,17,246,0,4,18,255,0,4,19,255,0,4,20,255,0,4,21,255,0,5,6,236,255,5,7,192,26,5,8,202,0,5,15,252,241,5,16,229,157,6,5,225,255,6,6,221,209,6,7,236,0,6,15,177,246,6,16,253,229,7,5,249,255,7,6,244,177,7,7,181,0,7,15,169,255,7,16,253,251,7,17,228,0,8,5,221,255,8,6,255,241,8,7,179,41,8,15,241,255,8,16,243,231,8,17,249,0,9,6,255,255,9,7,253,232,9,14,231,255,9,15,255,255,9,16,248,129,9,17,220,0,10,6,217,210,10,7,255,255,10,8,255,255,10,9,255,255,10,10,255,255,10,11,255,255,10,12,255,255,10,13,255,255,10,14,255,255,10,15,247,179,10,16,255,6,11,7,203,104,11,8,254,177,11,9,255,227,11,10,254,249,11,11,255,247,11,12,255,225,11,13,255,173,11,14,255,78,11,15,255,0,11,16,173,0,12,9,176,0,12,10,227,0,12,11,248,0,12,12,247,0,12,13,225,0,12,14,173,0],
secondary:!1},{width:13,bonus:525,chr:"q",
pixels:[1,8,173,255,1,9,225,255,1,10,249,255,1,11,249,255,1,12,227,255,1,13,175,255,2,6,173,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,2,11,255,255,2,12,255,255,2,13,255,255,2,14,255,255,2,15,204,224,3,6,255,255,3,7,245,235,3,8,255,113,3,9,255,39,3,10,255,13,3,11,255,10,3,12,255,36,3,13,255,106,3,14,255,221,3,15,255,255,3,16,218,153,4,5,219,255,4,6,246,246,4,7,255,25,4,8,226,0,4,15,253,239,4,16,255,223,5,5,247,255,5,6,242,177,5,7,238,0,5,15,174,246,5,16,254,251,5,17,223,0,6,5,223,255,6,6,253,175,6,7,168,0,6,15,179,255,6,16,245,234,6,17,250,0,7,6,253,241,7,7,179,30,7,15,235,255,7,16,219,157,7,17,225,0,8,6,222,213,8,7,252,218,8,14,197,255,8,15,190,249,8,16,235,10,9,5,173,255,9,6,222,254,9,7,255,255,9,8,255,255,9,9,255,255,9,10,255,255,9,11,255,255,9,12,255,255,9,13,255,255,9,14,255,255,9,15,252,245,9,16,254,254,9,17,255,255,9,18,255,255,9,19,255,255,9,20,255,255,9,21,255,255,10,5,255,255,10,6,255,255,10,7,255,255,10,8,255,255,10,9,255,255,10,10,255,255,10,11,255,255,10,12,255,255,10,13,255,255,10,14,255,255,10,15,255,255,10,16,255,255,10,17,255,255,10,18,255,255,10,19,255,255,10,20,255,255,10,21,255,255,11,6,255,0,11,7,255,0,11,8,255,0,11,9,255,0,11,10,255,0,11,11,255,0,11,12,255,0,11,13,255,0,11,14,255,0,11,15,255,0,11,16,255,0,11,17,255,0,11,18,255,0,11,19,255,0,11,20,255,0,11,21,255,0],
secondary:!1},{width:9,bonus:245,chr:"r",
pixels:[2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,2,11,255,255,2,12,255,255,2,13,255,255,2,14,255,255,2,15,255,255,2,16,255,255,3,5,175,255,3,6,255,201,3,7,255,247,3,8,255,255,3,9,255,255,3,10,255,255,3,11,255,255,3,12,255,255,3,13,255,255,3,14,255,255,3,15,255,255,3,16,255,255,3,17,255,0,4,6,214,146,4,7,253,249,4,8,252,138,4,9,255,39,4,10,255,5,4,11,255,0,4,12,255,0,4,13,255,0,4,14,255,0,4,15,255,0,4,16,255,0,4,17,255,0,5,6,255,255,5,7,166,130,5,8,247,0,6,5,208,255,6,6,222,234,6,7,255,0,7,5,247,255,7,6,238,176,7,7,204,0,8,5,209,255,8,6,252,145,8,7,164,0],
secondary:!1},{width:10,bonus:325,chr:"s",
pixels:[1,7,237,255,1,8,243,255,1,9,158,255,1,15,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,215,176,2,15,241,249,2,16,255,196,3,5,196,255,3,6,247,251,3,7,254,46,3,8,255,38,3,9,254,225,3,10,255,251,3,11,160,46,3,15,189,253,3,16,253,233,3,17,196,0,4,5,235,255,4,6,236,189,4,7,243,0,4,10,255,255,4,11,253,141,4,15,163,255,4,16,253,251,4,17,231,0,5,5,245,255,5,6,248,172,5,7,175,0,5,10,239,245,5,11,255,241,5,15,189,255,5,16,245,237,5,17,249,0,6,5,217,255,6,6,253,209,6,7,168,0,6,11,255,255,6,12,250,177,6,15,253,255,6,16,235,197,6,17,228,0,7,5,159,255,7,6,255,255,7,7,214,43,7,11,240,242,7,12,255,255,7,13,255,255,7,14,255,255,7,15,255,255,7,16,253,70,7,17,182,0,8,6,198,135,8,7,255,8,8,12,249,206,8,13,255,249,8,14,254,222,8,15,255,102,8,16,255,0,9,13,201,0,9,14,249,0,9,15,222,0],
secondary:!1},{width:9,bonus:290,chr:"t",
pixels:[1,6,155,255,2,5,235,255,2,6,211,188,2,7,156,0,3,4,231,255,3,5,255,255,3,6,255,255,3,7,255,255,3,8,255,255,3,9,255,255,3,10,255,255,3,11,255,255,3,12,255,255,3,13,249,255,3,14,219,255,4,3,255,255,4,4,255,255,4,5,255,255,4,6,255,255,4,7,255,255,4,8,255,255,4,9,255,255,4,10,255,255,4,11,255,255,4,12,255,255,4,13,255,255,4,14,255,255,4,15,255,255,4,16,203,182,5,4,255,0,5,5,255,255,5,6,254,156,5,7,255,0,5,8,255,0,5,9,255,0,5,10,255,0,5,11,255,0,5,12,255,0,5,13,255,6,5,14,255,61,5,15,255,235,5,16,254,228,6,5,255,255,6,6,254,156,6,7,156,0,6,15,182,222,6,16,254,246,6,17,228,0,7,5,255,255,7,6,254,156,7,7,156,0,7,15,179,255,7,16,237,223,7,17,246,0,8,6,255,0,8,7,156,0,8,16,180,0,8,17,207,0],
secondary:!1},{width:14,bonus:420,chr:"u",
pixels:[2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,2,11,255,255,2,12,255,255,2,13,241,255,2,14,191,255,3,5,255,255,3,6,255,255,3,7,255,255,3,8,255,255,3,9,255,255,3,10,255,255,3,11,255,255,3,12,255,255,3,13,255,255,3,14,255,255,3,15,254,255,4,6,255,0,4,7,255,0,4,8,255,0,4,9,255,0,4,10,255,0,4,11,255,0,4,12,255,2,4,13,255,30,4,14,255,142,4,15,255,255,4,16,255,191,5,15,235,226,5,16,254,243,5,17,191,0,6,15,165,255,6,16,254,250,6,17,242,0,7,15,193,255,7,16,241,230,7,17,249,0,8,15,247,255,8,16,225,146,8,17,218,0,9,14,223,255,9,15,198,241,9,16,247,8,10,5,255,255,10,6,255,255,10,7,255,255,10,8,255,255,10,9,255,255,10,10,255,255,10,11,255,255,10,12,255,255,10,13,255,255,10,14,255,255,10,15,251,231,10,16,236,199,11,5,255,255,11,6,255,255,11,7,255,255,11,8,255,255,11,9,255,255,11,10,255,255,11,11,255,255,11,12,255,255,11,13,255,255,11,14,255,255,11,15,255,255,11,16,255,255,11,17,184,0,12,6,255,0,12,7,255,0,12,8,255,0,12,9,255,0,12,10,255,0,12,11,255,0,12,12,255,0,12,13,255,0,12,14,255,0,12,15,255,0,12,16,255,0,12,17,255,0],
secondary:!1},{width:11,bonus:320,chr:"v",
pixels:[0,5,208,255,1,5,255,255,1,6,255,255,1,7,253,253,1,8,185,247,2,6,255,155,2,7,255,239,2,8,255,255,2,9,255,255,2,10,243,249,3,7,157,10,3,8,244,84,3,9,255,171,3,10,255,247,3,11,255,255,3,12,255,255,3,13,222,245,4,10,176,20,4,11,250,98,4,12,255,184,4,13,254,251,4,14,255,255,4,15,253,253,4,16,192,245,5,13,188,23,5,14,252,133,5,15,254,246,5,16,255,255,5,17,184,0,6,13,221,255,6,14,255,255,6,15,255,255,6,16,253,223,6,17,255,0,7,10,217,255,7,11,255,255,7,12,255,255,7,13,250,248,7,14,243,166,7,15,255,63,7,16,255,1,7,17,222,0,8,7,199,255,8,8,255,255,8,9,255,255,8,10,254,255,8,11,245,197,8,12,254,94,8,13,255,11,8,14,243,0,8,15,158,0,9,5,251,255,9,6,255,255,9,7,255,255,9,8,247,227,9,9,255,125,9,10,255,31,9,11,254,0,9,12,189,0,10,5,241,255,10,6,253,157,10,7,255,60,10,8,255,0,10,9,220,0],
secondary:!1},{width:17,bonus:595,chr:"w",
pixels:[0,5,158,255,1,5,255,255,1,6,255,255,1,7,254,255,1,8,211,250,2,6,255,159,2,7,255,223,2,8,255,255,2,9,255,255,2,10,255,255,2,11,249,253,2,12,189,252,3,7,159,0,3,8,227,36,3,9,255,96,3,10,255,160,3,11,254,225,3,12,255,255,3,13,255,255,3,14,255,255,3,15,237,251,3,16,167,255,4,11,160,0,4,12,228,36,4,13,254,94,4,14,254,186,4,15,255,255,4,16,255,255,4,17,167,0,5,12,177,255,5,13,241,253,5,14,255,255,5,15,255,255,5,16,254,213,5,17,255,0,6,9,202,255,6,10,253,255,6,11,255,255,6,12,254,254,6,13,237,211,6,14,247,120,6,15,255,36,6,16,255,0,6,17,212,0,7,6,219,255,7,7,255,255,7,8,255,255,7,9,251,251,7,10,239,192,7,11,255,100,7,12,255,22,7,13,253,0,7,14,196,0,8,5,255,255,8,6,255,255,8,7,244,190,8,8,255,71,8,9,255,8,8,10,247,0,8,11,180,0,9,5,221,255,9,6,255,255,9,7,255,255,9,8,252,248,9,9,206,231,10,6,227,47,10,7,255,119,10,8,255,196,10,9,255,253,10,10,255,255,10,11,255,255,10,12,221,249,11,9,201,25,11,10,253,94,11,11,255,171,11,12,254,240,11,13,255,255,11,14,255,255,11,15,242,251,11,16,168,252,12,12,172,6,12,13,245,81,12,14,255,187,12,15,255,255,12,16,255,255,12,17,166,0,13,11,154,255,13,12,217,255,13,13,255,255,13,14,255,255,13,15,255,255,13,16,254,231,13,17,255,0,14,8,211,255,14,9,255,255,14,10,255,255,14,11,255,255,14,12,251,249,14,13,245,192,14,14,255,114,14,15,255,44,14,16,255,0,14,17,230,0,15,5,253,255,15,6,255,255,15,7,255,255,15,8,254,255,15,9,247,215,15,10,254,138,15,11,255,68,15,12,255,8,15,13,246,0,15,14,184,0,16,5,231,255,16,6,254,162,16,7,255,92,16,8,255,23,16,9,254,0,16,10,208,0],
secondary:!1},{width:12,bonus:345,chr:"x",
pixels:[1,5,241,255,1,16,253,255,2,5,247,255,2,6,255,255,2,7,203,218,2,14,213,255,2,15,255,255,2,16,240,235,2,17,254,0,3,6,253,203,3,7,255,255,3,8,247,239,3,13,249,255,3,14,255,255,3,15,238,164,3,16,255,12,3,17,222,0,4,7,226,134,4,8,254,249,4,9,255,255,4,10,186,215,4,11,196,255,4,12,255,255,4,13,240,242,4,14,251,72,4,15,255,0,4,16,153,0,5,9,253,215,5,10,255,255,5,11,255,255,5,12,236,188,5,13,255,16,5,14,228,0,6,9,250,254,6,10,255,255,6,11,255,255,6,12,254,233,6,13,199,101,7,7,205,255,7,8,255,255,7,9,237,236,7,10,250,58,7,11,255,100,7,12,255,243,7,13,255,255,7,14,191,217,8,6,249,255,8,7,255,255,8,8,234,164,8,9,255,11,8,10,219,0,8,13,252,201,8,14,255,255,8,15,246,238,9,5,255,255,9,6,242,242,9,7,250,74,9,8,255,0,9,14,226,142,9,15,255,251,9,16,255,255,10,5,171,255,10,6,255,19,10,7,230,0,10,15,153,90,10,16,254,219,10,17,255,0,11,6,171,0,11,17,218,0],
secondary:!1},{width:11,bonus:420,chr:"y",
pixels:[0,5,247,255,0,6,167,246,0,20,175,255,0,21,223,255,1,5,247,255,1,6,255,255,1,7,255,255,1,8,220,243,1,20,166,255,1,21,252,250,2,6,251,108,2,7,254,204,2,8,255,255,2,9,255,255,2,10,248,251,2,11,161,246,2,20,229,255,2,21,243,232,3,8,212,55,3,9,254,144,3,10,255,235,3,11,255,255,3,12,255,255,3,13,215,243,3,19,197,255,3,20,255,255,3,21,242,136,4,11,242,89,4,12,254,177,4,13,254,249,4,14,255,255,4,15,247,250,4,16,161,248,4,17,197,255,4,18,255,255,4,19,255,255,4,20,238,194,4,21,255,9,5,13,190,63,5,14,253,188,5,15,255,255,5,16,255,255,5,17,255,255,5,18,245,220,5,19,255,92,5,20,255,1,5,21,181,0,6,12,205,255,6,13,255,255,6,14,255,255,6,15,250,244,6,16,255,152,6,17,255,55,6,18,255,0,6,19,211,0,7,9,191,255,7,10,253,255,7,11,255,255,7,12,254,255,7,13,241,199,7,14,255,91,7,15,255,9,7,16,240,0,8,6,171,255,8,7,247,255,8,8,255,255,8,9,255,255,8,10,247,230,8,11,254,127,8,12,255,31,8,13,254,0,8,14,188,0,9,5,255,255,9,6,255,255,9,7,252,248,9,8,252,165,9,9,255,65,9,10,255,1,9,11,223,0,10,5,197,255,10,6,255,101,10,7,255,14,10,8,246,0,10,9,163,0],
secondary:!1},{width:10,bonus:370,chr:"z",
pixels:[1,5,255,255,1,6,155,255,1,15,223,255,1,16,255,255,2,5,255,255,2,6,254,156,2,7,156,0,2,13,157,255,2,14,255,255,2,15,251,254,2,16,255,255,2,17,255,0,3,5,255,255,3,6,254,156,3,7,156,0,3,12,229,255,3,13,248,255,3,14,201,145,3,15,255,157,3,16,255,255,3,17,255,0,4,5,255,255,4,6,254,156,4,7,156,0,4,10,167,255,4,11,255,255,4,12,223,239,4,13,233,49,4,14,248,0,4,15,200,198,4,16,255,255,4,17,255,0,5,5,255,255,5,6,254,156,5,7,156,0,5,9,233,255,5,10,253,255,5,11,214,164,5,12,255,6,5,13,209,0,5,15,155,255,5,16,255,255,5,17,255,0,6,5,255,255,6,6,255,179,6,7,225,201,6,8,255,255,6,9,235,244,6,10,239,67,6,11,253,0,6,15,155,255,6,16,255,255,6,17,255,0,7,5,255,255,7,6,255,255,7,7,255,255,7,8,226,182,7,9,255,15,7,10,225,0,7,15,155,255,7,16,255,255,7,17,255,0,8,5,255,255,8,6,255,237,8,7,255,85,8,8,255,0,8,9,162,0,8,15,155,255,8,16,255,255,8,17,255,0,9,6,255,0,9,7,237,0,9,16,156,0,9,17,255,0],
secondary:!1},{width:14,bonus:480,chr:"A",
pixels:[0,16,207,255,1,13,169,255,1,14,247,255,1,15,255,255,1,16,255,255,1,17,207,0,2,11,225,255,2,12,255,255,2,13,255,255,2,14,247,241,2,15,252,145,2,16,255,47,2,17,255,0,3,8,189,255,3,9,253,255,3,10,255,255,3,11,255,255,3,12,245,182,3,13,255,79,3,14,255,5,3,15,234,0,4,6,239,255,4,7,255,255,4,8,255,255,4,9,242,217,4,10,254,228,4,11,255,255,4,12,255,0,4,13,175,0,5,3,209,255,5,4,255,255,5,5,255,255,5,6,245,240,5,7,248,144,5,8,255,45,5,9,255,0,5,10,242,202,5,11,255,255,5,12,255,0,6,1,249,255,6,2,255,255,6,3,237,240,6,4,236,161,6,5,255,71,6,6,255,3,6,7,231,0,6,10,191,255,6,11,255,255,6,12,255,0,7,1,253,255,7,2,255,255,7,3,254,221,7,4,241,148,7,5,172,85,7,10,191,255,7,11,255,255,7,12,255,0,8,2,253,127,8,3,254,222,8,4,255,255,8,5,255,255,8,6,227,247,8,10,191,255,8,11,255,255,8,12,255,0,9,4,231,73,9,5,254,164,9,6,254,246,9,7,255,255,9,8,255,255,9,9,205,246,9,10,227,255,9,11,255,255,9,12,255,0,10,6,169,23,10,7,250,106,10,8,255,202,10,9,255,255,10,10,255,255,10,11,255,255,10,12,255,184,11,9,211,53,11,10,255,142,11,11,254,234,11,12,255,255,11,13,255,255,11,14,243,249,12,12,240,87,12,13,254,180,12,14,254,252,12,15,255,255,12,16,255,255,13,14,188,35,13,15,253,121,13,16,255,217,13,17,255,0],
secondary:!1},{width:14,bonus:670,chr:"B",
pixels:[2,1,255,255,2,2,255,255,2,3,255,255,2,4,255,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,2,11,255,255,2,12,255,255,2,13,255,255,2,14,255,255,2,15,255,255,2,16,255,255,3,1,255,255,3,2,255,255,3,3,255,255,3,4,255,255,3,5,255,255,3,6,255,255,3,7,255,255,3,8,255,255,3,9,255,255,3,10,255,255,3,11,255,255,3,12,255,255,3,13,255,255,3,14,255,255,3,15,255,255,3,16,255,255,3,17,255,0,4,1,255,255,4,2,254,156,4,3,255,0,4,4,255,0,4,5,255,0,4,6,255,0,4,7,255,0,4,8,255,255,4,9,254,156,4,10,255,0,4,11,255,0,4,12,255,0,4,13,255,0,4,14,255,0,4,15,254,156,4,16,255,255,4,17,255,0,5,1,255,255,5,2,254,156,5,3,156,0,5,8,255,255,5,9,254,156,5,10,156,0,5,15,155,255,5,16,255,255,5,17,255,0,6,1,251,255,6,2,255,157,6,3,156,0,6,8,255,255,6,9,254,156,6,10,156,0,6,15,155,255,6,16,255,255,6,17,255,0,7,1,239,255,7,2,254,176,7,3,157,0,7,8,255,255,7,9,255,167,7,10,156,0,7,15,163,255,7,16,254,255,7,17,255,0,8,1,208,255,8,2,254,232,8,3,176,7,8,8,255,255,8,9,254,195,8,10,167,0,8,15,191,255,8,16,249,245,8,17,254,0,9,2,255,255,9,3,247,173,9,7,219,255,9,8,197,224,9,9,254,251,9,10,200,32,9,15,249,255,9,16,241,209,9,17,240,0,10,2,249,248,10,3,255,255,10,4,255,255,10,5,255,255,10,6,255,255,10,7,243,251,10,8,223,38,10,9,243,230,10,10,254,200,10,14,203,255,10,15,255,255,10,16,251,113,10,17,197,0,11,3,251,190,11,4,254,243,11,5,255,239,11,6,255,184,11,7,255,49,11,8,239,0,11,10,255,255,11,11,255,255,11,12,255,255,11,13,255,255,11,14,255,255,11,15,244,213,11,16,255,6,12,4,187,0,12,5,242,0,12,6,239,0,12,7,184,0,12,11,255,209,12,12,254,246,12,13,254,227,12,14,255,143,12,15,255,15,12,16,203,0,13,12,209,0,13,13,246,0,13,14,226,0],
secondary:!1},{width:14,bonus:410,chr:"C",
pixels:[1,6,175,255,1,7,217,255,1,8,243,255,1,9,247,255,1,10,229,255,1,11,185,255,2,4,219,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,2,11,255,255,2,12,255,255,2,13,249,250,3,3,249,255,3,4,255,255,3,5,246,198,3,6,255,90,3,7,255,32,3,8,255,8,3,9,255,7,3,10,255,29,3,11,254,82,3,12,255,177,3,13,255,255,3,14,255,255,3,15,164,166,4,2,225,255,4,3,253,255,4,4,252,104,4,5,255,0,4,6,191,0,4,13,201,99,4,14,254,249,4,15,255,249,5,2,255,255,5,3,240,135,5,4,253,0,5,15,255,255,5,16,252,139,6,1,184,255,6,2,247,251,6,3,255,9,6,15,245,247,6,16,255,207,7,1,221,255,7,2,235,201,7,3,243,0,7,15,182,253,7,16,254,240,7,17,207,0,8,1,247,255,8,2,242,170,8,3,185,0,8,15,161,255,8,16,254,254,8,17,239,0,9,1,237,255,9,2,253,184,9,3,162,0,9,15,175,255,9,16,251,249,9,17,253,0,10,1,213,255,10,2,252,224,10,3,183,0,10,15,202,255,10,16,243,231,10,17,246,0,11,1,165,255,11,2,255,255,11,3,228,55,11,15,249,255,11,16,236,178,11,17,220,0,12,2,237,218,12,3,255,47,12,16,250,60,12,17,165,0,13,3,202,0],
secondary:!1},{width:16,bonus:640,chr:"D",
pixels:[2,1,255,255,2,2,255,255,2,3,255,255,2,4,255,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,2,11,255,255,2,12,255,255,2,13,255,255,2,14,255,255,2,15,255,255,2,16,255,255,3,1,255,255,3,2,255,255,3,3,255,255,3,4,255,255,3,5,255,255,3,6,255,255,3,7,255,255,3,8,255,255,3,9,255,255,3,10,255,255,3,11,255,255,3,12,255,255,3,13,255,255,3,14,255,255,3,15,255,255,3,16,255,255,3,17,255,0,4,1,255,255,4,2,254,156,4,3,255,0,4,4,255,0,4,5,255,0,4,6,255,0,4,7,255,0,4,8,255,0,4,9,255,0,4,10,255,0,4,11,255,0,4,12,255,0,4,13,255,0,4,14,255,0,4,15,254,156,4,16,255,255,4,17,255,0,5,1,255,255,5,2,254,156,5,3,156,0,5,15,155,255,5,16,255,255,5,17,255,0,6,1,255,255,6,2,254,156,6,3,156,0,6,15,160,255,6,16,254,255,6,17,255,0,7,1,245,255,7,2,254,171,7,3,156,0,7,15,175,255,7,16,249,245,7,17,254,0,8,1,225,255,8,2,253,203,8,3,170,0,8,15,217,255,8,16,242,227,8,17,239,0,9,1,177,255,9,2,254,251,9,3,205,22,9,15,255,255,9,16,241,170,9,17,215,0,10,2,255,255,10,3,252,134,10,14,161,255,10,15,255,255,10,16,255,79,10,17,160,0,11,2,239,245,11,3,255,253,11,4,177,133,11,14,255,255,11,15,239,225,11,16,255,2,12,3,255,251,12,4,255,255,12,5,208,222,12,12,197,255,12,13,255,255,12,14,249,249,12,15,255,44,12,16,211,0,13,4,255,233,13,5,255,255,13,6,255,255,13,7,255,255,13,8,255,255,13,9,255,255,13,10,255,255,13,11,255,255,13,12,255,255,13,13,246,225,13,14,254,46,13,15,243,0,14,5,242,115,14,6,255,183,14,7,255,229,14,8,254,249,14,9,254,243,14,10,255,221,14,11,255,169,14,12,255,91,14,13,255,3,14,14,217,0,15,7,183,0,15,8,229,0,15,9,248,0,15,10,242,0,15,11,221,0,15,12,169,0],
secondary:!1},{width:12,bonus:535,chr:"E",
pixels:[2,1,255,255,2,2,255,255,2,3,255,255,2,4,255,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,2,11,255,255,2,12,255,255,2,13,255,255,2,14,255,255,2,15,255,255,2,16,255,255,3,1,255,255,3,2,255,255,3,3,255,255,3,4,255,255,3,5,255,255,3,6,255,255,3,7,255,255,3,8,255,255,3,9,255,255,3,10,255,255,3,11,255,255,3,12,255,255,3,13,255,255,3,14,255,255,3,15,255,255,3,16,255,255,3,17,255,0,4,1,255,255,4,2,254,156,4,3,255,0,4,4,255,0,4,5,255,0,4,6,255,0,4,7,255,0,4,8,255,255,4,9,254,156,4,10,255,0,4,11,255,0,4,12,255,0,4,13,255,0,4,14,255,0,4,15,254,156,4,16,255,255,4,17,255,0,5,1,255,255,5,2,254,156,5,3,156,0,5,8,255,255,5,9,254,156,5,10,156,0,5,15,155,255,5,16,255,255,5,17,255,0,6,1,255,255,6,2,254,156,6,3,156,0,6,8,255,255,6,9,254,156,6,10,156,0,6,15,155,255,6,16,255,255,6,17,255,0,7,1,255,255,7,2,254,156,7,3,156,0,7,8,255,255,7,9,254,156,7,10,156,0,7,15,155,255,7,16,255,255,7,17,255,0,8,1,255,255,8,2,254,156,8,3,156,0,8,8,255,255,8,9,254,156,8,10,156,0,8,15,155,255,8,16,255,255,8,17,255,0,9,1,255,255,9,2,254,156,9,3,156,0,9,8,255,255,9,9,254,156,9,10,156,0,9,15,155,255,9,16,255,255,9,17,255,0,10,1,255,255,10,2,254,156,10,3,156,0,10,9,255,78,10,10,156,0,10,15,155,255,10,16,255,255,10,17,255,0,11,2,255,0,11,3,156,0,11,16,156,0,11,17,255,0],
secondary:!1},{width:12,bonus:435,chr:"F",
pixels:[2,1,255,255,2,2,255,255,2,3,255,255,2,4,255,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,2,11,255,255,2,12,255,255,2,13,255,255,2,14,255,255,2,15,255,255,2,16,255,255,3,1,255,255,3,2,255,255,3,3,255,255,3,4,255,255,3,5,255,255,3,6,255,255,3,7,255,255,3,8,255,255,3,9,255,255,3,10,255,255,3,11,255,255,3,12,255,255,3,13,255,255,3,14,255,255,3,15,255,255,3,16,255,255,3,17,255,0,4,1,255,255,4,2,254,156,4,3,255,0,4,4,255,0,4,5,255,0,4,6,255,0,4,7,255,0,4,8,254,156,4,9,255,255,4,10,255,0,4,11,255,0,4,12,255,0,4,13,255,0,4,14,255,0,4,15,255,0,4,16,255,0,4,17,255,0,5,1,255,255,5,2,254,156,5,3,156,0,5,8,155,255,5,9,255,255,5,10,255,0,6,1,255,255,6,2,254,156,6,3,156,0,6,8,155,255,6,9,255,255,6,10,255,0,7,1,255,255,7,2,254,156,7,3,156,0,7,8,155,255,7,9,255,255,7,10,255,0,8,1,255,255,8,2,254,156,8,3,156,0,8,8,155,255,8,9,255,255,8,10,255,0,9,1,255,255,9,2,254,156,9,3,156,0,9,8,155,255,9,9,255,255,9,10,255,0,10,1,255,255,10,2,254,156,10,3,156,0,10,9,206,159,10,10,255,0,11,2,255,0,11,3,156,0],
secondary:!1},{width:16,bonus:580,chr:"G",
pixels:[1,6,171,255,1,7,215,255,1,8,241,255,1,9,247,255,1,10,229,255,1,11,183,255,2,4,208,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,2,11,255,255,2,12,255,255,2,13,246,248,3,3,241,255,3,4,255,255,3,5,244,209,3,6,254,94,3,7,255,33,3,8,255,8,3,9,255,8,3,10,255,30,3,11,255,84,3,12,255,181,3,13,255,255,3,14,255,255,4,2,205,255,4,3,255,255,4,4,247,124,4,5,255,1,4,6,200,0,4,13,206,108,4,14,255,251,4,15,255,245,5,2,255,255,5,3,234,162,5,4,255,0,5,14,168,187,5,15,255,255,5,16,250,133,6,1,165,255,6,2,251,254,6,3,255,19,6,15,250,250,6,16,255,201,7,1,211,255,7,2,234,215,7,3,250,0,7,15,193,252,7,16,254,238,7,17,201,0,8,1,239,255,8,2,240,177,8,3,197,0,8,15,163,255,8,16,254,254,8,17,237,0,9,1,245,255,9,2,250,174,9,3,166,0,9,8,155,255,9,9,255,255,9,15,165,255,9,16,253,251,9,17,253,0,10,1,223,255,10,2,252,202,10,3,171,0,10,8,155,255,10,9,255,255,10,10,255,0,10,15,185,255,10,16,247,241,10,17,249,0,11,1,196,255,11,2,253,247,11,3,202,14,11,8,155,255,11,9,255,255,11,10,255,0,11,15,233,255,11,16,241,214,11,17,233,0,12,2,255,255,12,3,249,87,12,8,155,255,12,9,255,255,12,10,255,255,12,11,255,255,12,12,255,255,12,13,255,255,12,14,255,255,12,15,255,255,12,16,246,154,12,17,202,0,13,2,190,165,13,3,255,16,13,8,155,255,13,9,255,255,13,10,255,255,13,11,255,255,13,12,255,255,13,13,255,255,13,14,255,255,13,15,255,255,13,16,255,90,14,9,156,0,14,10,255,0,14,11,255,0,14,12,255,0,14,13,255,0,14,14,255,0,14,15,255,0,14,16,255,0],
secondary:!1},{width:16,bonus:595,chr:"H",
pixels:[2,1,255,255,2,2,255,255,2,3,255,255,2,4,255,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,2,11,255,255,2,12,255,255,2,13,255,255,2,14,255,255,2,15,255,255,2,16,255,255,3,1,255,255,3,2,255,255,3,3,255,255,3,4,255,255,3,5,255,255,3,6,255,255,3,7,255,255,3,8,255,255,3,9,255,255,3,10,255,255,3,11,255,255,3,12,255,255,3,13,255,255,3,14,255,255,3,15,255,255,3,16,255,255,3,17,255,0,4,2,255,0,4,3,255,0,4,4,255,0,4,5,255,0,4,6,255,0,4,7,255,0,4,8,255,255,4,9,254,156,4,10,255,0,4,11,255,0,4,12,255,0,4,13,255,0,4,14,255,0,4,15,255,0,4,16,255,0,4,17,255,0,5,8,255,255,5,9,254,156,5,10,156,0,6,8,255,255,6,9,254,156,6,10,156,0,7,8,255,255,7,9,254,156,7,10,156,0,8,8,255,255,8,9,254,156,8,10,156,0,9,8,255,255,9,9,254,156,9,10,156,0,10,8,255,255,10,9,254,156,10,10,156,0,11,8,255,255,11,9,254,156,11,10,156,0,12,1,255,255,12,2,255,255,12,3,255,255,12,4,255,255,12,5,255,255,12,6,255,255,12,7,255,255,12,8,255,255,12,9,255,255,12,10,255,255,12,11,255,255,12,12,255,255,12,13,255,255,12,14,255,255,12,15,255,255,12,16,255,255,13,1,255,255,13,2,255,255,13,3,255,255,13,4,255,255,13,5,255,255,13,6,255,255,13,7,255,255,13,8,255,255,13,9,255,255,13,10,255,255,13,11,255,255,13,12,255,255,13,13,255,255,13,14,255,255,13,15,255,255,13,16,255,255,13,17,255,0,14,2,255,0,14,3,255,0,14,4,255,0,14,5,255,0,14,6,255,0,14,7,255,0,14,8,255,0,14,9,255,0,14,10,255,0,14,11,255,0,14,12,255,0,14,13,255,0,14,14,255,0,14,15,255,0,14,16,255,0,14,17,255,0],
secondary:!1},{width:8,bonus:315,chr:"I",
pixels:[1,1,255,255,1,16,255,255,2,1,255,255,2,2,255,128,2,16,255,255,2,17,255,0,3,1,255,255,3,2,255,255,3,3,255,255,3,4,255,255,3,5,255,255,3,6,255,255,3,7,255,255,3,8,255,255,3,9,255,255,3,10,255,255,3,11,255,255,3,12,255,255,3,13,255,255,3,14,255,255,3,15,255,255,3,16,255,255,3,17,255,0,4,1,255,255,4,2,255,255,4,3,255,255,4,4,255,255,4,5,255,255,4,6,255,255,4,7,255,255,4,8,255,255,4,9,255,255,4,10,255,255,4,11,255,255,4,12,255,255,4,13,255,255,4,14,255,255,4,15,255,255,4,16,255,255,4,17,255,0,5,1,255,255,5,2,255,127,5,3,255,0,5,4,255,0,5,5,255,0,5,6,255,0,5,7,255,0,5,8,255,0,5,9,255,0,5,10,255,0,5,11,255,0,5,12,255,0,5,13,255,0,5,14,255,0,5,15,255,123,5,16,255,255,5,17,255,0,6,1,255,255,6,2,254,70,6,16,255,255,6,17,255,0,7,2,255,0,7,17,255,0],
secondary:!1},{width:6,bonus:310,chr:"J",
pixels:[0,19,255,255,0,20,255,147,1,18,177,255,1,19,255,255,1,20,255,99,2,1,255,255,2,2,255,255,2,3,255,255,2,4,255,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,2,11,255,255,2,12,255,255,2,13,255,255,2,14,255,255,2,15,255,255,2,16,255,255,2,17,255,255,2,18,255,255,2,19,242,225,2,20,255,9,3,1,255,255,3,2,255,255,3,3,255,255,3,4,255,255,3,5,255,255,3,6,255,255,3,7,255,255,3,8,255,255,3,9,255,255,3,10,255,255,3,11,255,255,3,12,255,255,3,13,255,255,3,14,255,255,3,15,255,255,3,16,255,251,3,17,255,223,3,18,255,146,3,19,255,19,3,20,214,0,4,2,255,0,4,3,255,0,4,4,255,0,4,5,255,0,4,6,255,0,4,7,255,0,4,8,255,0,4,9,255,0,4,10,255,0,4,11,255,0,4,12,255,0,4,13,255,0,4,14,255,0,4,15,255,0,4,16,255,0,4,17,251,0,4,18,223,0],
secondary:!1},{width:14,bonus:515,chr:"K",
pixels:[2,1,255,255,2,2,255,255,2,3,255,255,2,4,255,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,2,11,255,255,2,12,255,255,2,13,255,255,2,14,255,255,2,15,255,255,2,16,255,255,3,1,255,255,3,2,255,255,3,3,255,255,3,4,255,255,3,5,255,255,3,6,255,255,3,7,255,255,3,8,255,255,3,9,255,255,3,10,255,255,3,11,255,255,3,12,255,255,3,13,255,255,3,14,255,255,3,15,255,255,3,16,255,255,3,17,255,0,4,2,255,0,4,3,255,0,4,4,255,0,4,5,255,0,4,6,255,0,4,7,255,5,4,8,255,165,4,9,254,255,4,10,255,90,4,11,255,0,4,12,255,0,4,13,255,0,4,14,255,0,4,15,255,0,4,16,255,0,4,17,255,0,5,7,187,255,5,8,255,255,5,9,222,185,5,10,254,0,6,6,209,255,6,7,255,255,6,8,255,255,6,9,254,255,6,10,213,171,7,5,227,255,7,6,254,255,7,7,230,132,7,8,255,109,7,9,255,247,7,10,255,255,7,11,233,224,8,4,239,255,8,5,250,255,8,6,237,99,8,7,254,0,8,10,254,212,8,11,255,255,8,12,253,245,9,3,249,255,9,4,245,252,9,5,244,72,9,6,250,0,9,11,236,159,9,12,255,255,9,13,255,255,9,14,197,211,10,2,255,255,10,3,240,245,10,4,251,50,10,5,242,0,10,12,178,108,10,13,254,234,10,14,255,255,10,15,242,231,11,1,255,255,11,2,236,235,11,3,255,33,11,4,231,0,11,14,249,187,11,15,255,255,11,16,254,250,12,1,199,255,12,2,255,20,12,3,217,0,12,15,215,133,12,16,254,249,12,17,249,0,13,2,199,0,13,17,248,0],
secondary:!1},{width:12,bonus:345,chr:"L",
pixels:[2,1,255,255,2,2,255,255,2,3,255,255,2,4,255,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,2,11,255,255,2,12,255,255,2,13,255,255,2,14,255,255,2,15,255,255,2,16,255,255,3,1,255,255,3,2,255,255,3,3,255,255,3,4,255,255,3,5,255,255,3,6,255,255,3,7,255,255,3,8,255,255,3,9,255,255,3,10,255,255,3,11,255,255,3,12,255,255,3,13,255,255,3,14,255,255,3,15,255,255,3,16,255,255,3,17,255,0,4,2,255,0,4,3,255,0,4,4,255,0,4,5,255,0,4,6,255,0,4,7,255,0,4,8,255,0,4,9,255,0,4,10,255,0,4,11,255,0,4,12,255,0,4,13,255,0,4,14,255,0,4,15,255,196,4,16,255,255,4,17,255,0,5,15,196,255,5,16,255,255,5,17,255,0,6,15,196,255,6,16,255,255,6,17,255,0,7,15,196,255,7,16,255,255,7,17,255,0,8,15,196,255,8,16,255,255,8,17,255,0,9,15,196,255,9,16,255,255,9,17,255,0,10,15,196,255,10,16,255,255,10,17,255,0,11,16,196,0,11,17,255,0],
secondary:!1},{width:20,bonus:855,chr:"M",
pixels:[2,1,255,255,2,2,255,255,2,3,255,255,2,4,255,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,2,11,255,255,2,12,255,255,2,13,255,255,2,14,255,255,2,15,255,255,2,16,255,255,3,1,255,255,3,2,255,255,3,3,255,255,3,4,255,255,3,5,255,255,3,6,255,255,3,7,255,255,3,8,255,255,3,9,255,255,3,10,255,255,3,11,255,255,3,12,255,255,3,13,255,255,3,14,255,255,3,15,255,255,3,16,255,255,3,17,255,0,4,1,255,255,4,2,255,255,4,3,254,207,4,4,255,112,4,5,255,22,4,6,255,0,4,7,255,0,4,8,255,0,4,9,255,0,4,10,255,0,4,11,255,0,4,12,255,0,4,13,255,0,4,14,255,0,4,15,255,0,4,16,255,0,4,17,255,0,5,2,255,185,5,3,255,253,5,4,255,255,5,5,253,253,5,6,186,246,6,3,192,34,6,4,254,118,6,5,254,213,6,6,255,255,6,7,255,255,6,8,244,250,6,9,157,251,7,6,221,58,7,7,254,144,7,8,255,233,7,9,255,255,7,10,255,255,7,11,228,246,8,9,239,82,8,10,255,171,8,11,254,249,8,12,255,255,8,13,255,255,8,14,204,246,9,11,176,24,9,12,251,106,9,13,254,198,9,14,255,255,9,15,255,255,9,16,250,252,10,13,210,217,10,14,255,253,10,15,255,255,10,16,255,239,10,17,247,0,11,11,235,255,11,12,255,255,11,13,252,254,11,14,232,196,11,15,254,85,11,16,255,7,11,17,239,0,12,8,209,255,12,9,255,255,12,10,255,255,12,11,233,223,12,12,244,115,12,13,255,21,12,14,251,0,12,15,178,0,13,5,179,255,13,6,251,255,13,7,255,255,13,8,240,241,13,9,234,148,13,10,255,42,13,11,255,0,13,12,204,0,14,3,237,255,14,4,255,255,14,5,247,252,14,6,227,181,14,7,252,68,14,8,255,2,14,9,227,0,15,1,255,255,15,2,255,255,15,3,226,211,15,4,243,98,15,5,255,11,15,6,244,0,15,7,161,0,16,1,255,255,16,2,255,255,16,3,255,255,16,4,255,255,16,5,255,255,16,6,255,255,16,7,255,255,16,8,255,255,16,9,255,255,16,10,255,255,16,11,255,255,16,12,255,255,16,13,255,255,16,14,255,255,16,15,255,255,16,16,255,255,17,1,255,255,17,2,255,255,17,3,255,255,17,4,255,255,17,5,255,255,17,6,255,255,17,7,255,255,17,8,255,255,17,9,255,255,17,10,255,255,17,11,255,255,17,12,255,255,17,13,255,255,17,14,255,255,17,15,255,255,17,16,255,255,17,17,255,0,18,2,255,0,18,3,255,0,18,4,255,0,18,5,255,0,18,6,255,0,18,7,255,0,18,8,255,0,18,9,255,0,18,10,255,0,18,11,255,0,18,12,255,0,18,13,255,0,18,14,255,0,18,15,255,0,18,16,255,0,18,17,255,0],
secondary:!1},{width:17,bonus:665,chr:"N",
pixels:[2,1,255,255,2,2,255,255,2,3,255,255,2,4,255,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,2,11,255,255,2,12,255,255,2,13,255,255,2,14,255,255,2,15,255,255,2,16,255,255,3,1,255,255,3,2,255,255,3,3,255,255,3,4,255,255,3,5,255,255,3,6,255,255,3,7,255,255,3,8,255,255,3,9,255,255,3,10,255,255,3,11,255,255,3,12,255,255,3,13,255,255,3,14,255,255,3,15,255,255,3,16,255,255,3,17,255,0,4,1,215,255,4,2,255,255,4,3,255,249,4,4,255,129,4,5,255,6,4,6,255,0,4,7,255,0,4,8,255,0,4,9,255,0,4,10,255,0,4,11,255,0,4,12,255,0,4,13,255,0,4,14,255,0,4,15,255,0,4,16,255,0,4,17,255,0,5,2,236,144,5,3,255,251,5,4,255,255,5,5,234,233,6,3,155,77,6,4,254,204,6,5,255,255,6,6,254,255,6,7,175,220,7,5,227,132,7,6,254,246,7,7,255,255,7,8,244,240,8,7,253,193,8,8,255,255,8,9,255,255,8,10,199,222,9,8,217,120,9,9,254,240,9,10,255,255,9,11,250,244,10,10,250,179,10,11,255,255,10,12,255,255,10,13,218,227,11,11,202,107,11,12,254,233,11,13,255,255,11,14,253,250,12,13,247,165,12,14,255,255,12,15,255,255,12,16,232,232,13,1,255,255,13,2,255,255,13,3,255,255,13,4,255,255,13,5,255,255,13,6,255,255,13,7,255,255,13,8,255,255,13,9,255,255,13,10,255,255,13,11,255,255,13,12,255,255,13,13,254,255,13,14,255,255,13,15,255,255,13,16,255,255,13,17,211,0,14,1,255,255,14,2,255,255,14,3,255,255,14,4,255,255,14,5,255,255,14,6,255,255,14,7,255,255,14,8,255,255,14,9,255,255,14,10,255,255,14,11,255,255,14,12,255,255,14,13,255,255,14,14,255,255,14,15,255,255,14,16,255,255,14,17,255,0,15,2,255,0,15,3,255,0,15,4,255,0,15,5,255,0,15,6,255,0,15,7,255,0,15,8,255,0,15,9,255,0,15,10,255,0,15,11,255,0,15,12,255,0,15,13,255,0,15,14,255,0,15,15,255,0,15,16,255,0,15,17,255,0],
secondary:!1},{width:16,bonus:575,chr:"O",
pixels:[1,6,190,255,1,7,231,255,1,8,247,255,1,9,247,255,1,10,229,255,1,11,187,255,2,4,249,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,2,11,255,255,2,12,255,255,2,13,251,252,3,3,255,255,3,4,251,252,3,5,252,151,3,6,255,69,3,7,255,24,3,8,255,6,3,9,255,6,3,10,255,25,3,11,255,71,3,12,255,153,3,13,255,249,3,14,255,255,3,15,187,178,4,2,253,255,4,3,241,239,4,4,255,40,4,5,248,0,4,13,170,63,4,14,254,228,4,15,254,255,4,16,154,80,5,1,155,255,5,2,255,255,5,3,254,59,5,4,226,0,5,15,255,255,5,16,254,156,6,1,217,255,6,2,238,226,6,3,255,0,6,15,220,243,6,16,255,219,6,17,155,0,7,1,243,255,7,2,242,177,7,3,211,0,7,15,167,255,7,16,253,247,7,17,219,0,8,1,245,255,8,2,251,169,8,3,168,0,8,15,166,255,8,16,252,248,8,17,245,0,9,1,219,255,9,2,253,209,9,3,166,0,9,15,207,255,9,16,242,231,9,17,245,0,10,1,153,255,10,2,255,255,10,3,217,62,10,15,255,255,10,16,236,165,10,17,219,0,11,2,254,254,11,3,254,222,11,14,223,255,11,15,252,254,11,16,255,44,11,17,153,0,12,3,255,255,12,4,253,247,12,5,162,231,12,13,247,255,12,14,255,255,12,15,238,130,12,16,252,0,13,3,176,152,13,4,255,245,13,5,255,255,13,6,255,255,13,7,255,255,13,8,255,255,13,9,255,255,13,10,255,255,13,11,255,255,13,12,255,255,13,13,251,249,13,14,250,107,13,15,255,0,14,5,250,120,14,6,255,185,14,7,255,229,14,8,255,247,14,9,255,247,14,10,255,229,14,11,255,184,14,12,255,117,14,13,255,20,14,14,245,0,15,7,185,0,15,8,229,0,15,9,247,0,15,10,247,0,15,11,229,0,15,12,184,0],
secondary:!1},{width:13,bonus:500,chr:"P",
pixels:[2,1,255,255,2,2,255,255,2,3,255,255,2,4,255,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,2,11,255,255,2,12,255,255,2,13,255,255,2,14,255,255,2,15,255,255,2,16,255,255,3,1,255,255,3,2,255,255,3,3,255,255,3,4,255,255,3,5,255,255,3,6,255,255,3,7,255,255,3,8,255,255,3,9,255,255,3,10,255,255,3,11,255,255,3,12,255,255,3,13,255,255,3,14,255,255,3,15,255,255,3,16,255,255,3,17,255,0,4,1,255,255,4,2,254,156,4,3,255,0,4,4,255,0,4,5,255,0,4,6,255,0,4,7,255,0,4,8,255,0,4,9,254,156,4,10,255,255,4,11,255,0,4,12,255,0,4,13,255,0,4,14,255,0,4,15,255,0,4,16,255,0,4,17,255,0,5,1,255,255,5,2,254,156,5,3,156,0,5,9,157,255,5,10,255,255,5,11,255,0,6,1,249,255,6,2,255,163,6,3,156,0,6,9,167,255,6,10,251,249,6,11,255,0,7,1,231,255,7,2,254,198,7,3,163,0,7,9,208,255,7,10,242,229,7,11,245,0,8,1,185,255,8,2,254,252,8,3,205,43,8,9,255,255,8,10,237,170,8,11,218,0,9,2,255,255,9,3,254,222,9,8,223,255,9,9,254,255,9,10,255,55,9,11,158,0,10,2,217,227,10,3,255,255,10,4,255,255,10,5,255,255,10,6,255,255,10,7,255,255,10,8,255,255,10,9,239,140,10,10,254,0,11,3,224,146,11,4,255,215,11,5,254,249,11,6,254,240,11,7,255,191,11,8,255,84,11,9,255,0,12,5,215,0,12,6,248,0,12,7,240,0,12,8,191,0],
secondary:!1},{width:16,bonus:610,chr:"Q",
pixels:[1,6,190,255,1,7,231,255,1,8,247,255,1,9,247,255,1,10,229,255,1,11,187,255,2,4,249,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,2,11,255,255,2,12,255,255,2,13,251,252,3,3,255,255,3,4,251,252,3,5,252,151,3,6,255,69,3,7,255,24,3,8,255,6,3,9,255,6,3,10,255,25,3,11,255,71,3,12,255,153,3,13,255,249,3,14,255,255,3,15,187,178,4,2,253,255,4,3,241,239,4,4,255,40,4,5,248,0,4,13,170,63,4,14,254,228,4,15,254,255,4,16,154,80,5,1,155,255,5,2,255,255,5,3,254,59,5,4,226,0,5,15,255,255,5,16,254,156,6,1,217,255,6,2,238,226,6,3,255,0,6,15,220,243,6,16,255,219,6,17,155,0,7,1,243,255,7,2,242,177,7,3,211,0,7,15,167,255,7,16,253,247,7,17,219,0,8,1,245,255,8,2,251,169,8,3,168,0,8,15,166,255,8,16,255,255,8,17,246,32,9,1,219,255,9,2,253,209,9,3,166,0,9,15,207,255,9,16,255,255,9,17,255,233,10,1,153,255,10,2,255,255,10,3,217,62,10,15,255,255,10,16,249,229,10,17,255,255,10,18,254,249,11,2,254,254,11,3,254,222,11,14,223,255,11,15,254,255,11,16,255,55,11,17,237,110,11,18,255,253,11,19,255,255,12,3,255,255,12,4,253,247,12,5,162,231,12,13,247,255,12,14,255,255,12,15,240,139,12,16,254,0,12,18,154,145,12,19,255,251,12,20,255,128,13,3,176,152,13,4,254,245,13,5,255,255,13,6,255,255,13,7,255,255,13,8,255,255,13,9,255,255,13,10,255,255,13,11,255,255,13,12,255,255,13,13,251,249,13,14,250,113,13,15,255,0,13,20,253,120,14,5,249,120,14,6,255,184,14,7,254,228,14,8,254,246,14,9,255,249,14,10,254,231,14,11,255,189,14,12,255,118,14,13,255,22,14,14,245,0,15,7,184,0,15,8,228,0,15,9,246,0,15,10,249,0,15,11,230,0,15,12,189,0],
secondary:!1},{width:14,bonus:575,chr:"R",
pixels:[2,1,255,255,2,2,255,255,2,3,255,255,2,4,255,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,2,11,255,255,2,12,255,255,2,13,255,255,2,14,255,255,2,15,255,255,2,16,255,255,3,1,255,255,3,2,255,255,3,3,255,255,3,4,255,255,3,5,255,255,3,6,255,255,3,7,255,255,3,8,255,255,3,9,255,255,3,10,255,255,3,11,255,255,3,12,255,255,3,13,255,255,3,14,255,255,3,15,255,255,3,16,255,255,3,17,255,0,4,1,255,255,4,2,254,156,4,3,255,0,4,4,255,0,4,5,255,0,4,6,255,0,4,7,255,0,4,8,255,0,4,9,255,255,4,10,254,156,4,11,255,0,4,12,255,0,4,13,255,0,4,14,255,0,4,15,255,0,4,16,255,0,4,17,255,0,5,1,255,255,5,2,254,156,5,3,156,0,5,9,255,255,5,10,254,156,5,11,156,0,6,1,251,255,6,2,255,159,6,3,156,0,6,9,255,255,6,10,254,156,6,11,156,0,7,1,237,255,7,2,254,184,7,3,159,0,7,9,255,255,7,10,255,233,7,11,192,124,8,1,196,255,8,2,254,244,8,3,188,22,8,9,255,255,8,10,255,253,8,11,255,255,8,12,218,231,9,2,255,255,9,3,252,202,9,8,245,255,9,9,222,227,9,10,254,46,9,11,254,198,9,12,255,255,9,13,255,253,9,14,173,226,10,2,231,233,10,3,255,255,10,4,255,255,10,5,255,255,10,6,255,255,10,7,255,255,10,8,246,248,10,9,247,50,10,10,197,0,10,12,220,117,10,13,255,237,10,14,255,255,10,15,248,244,11,3,235,156,11,4,255,223,11,5,255,249,11,6,254,228,11,7,255,165,11,8,255,40,11,9,239,0,11,14,248,166,11,15,255,255,11,16,255,255,12,5,223,0,12,6,249,0,12,7,228,0,12,8,165,0,12,15,184,87,12,16,254,215,12,17,255,0,13,17,214,0],
secondary:!1},{width:12,bonus:440,chr:"S",
pixels:[1,3,175,255,1,4,243,255,1,5,235,255,1,6,184,255,1,15,255,255,2,2,225,255,2,3,255,255,2,4,255,255,2,5,255,255,2,6,255,255,2,7,254,252,2,15,254,254,2,16,255,191,3,2,255,255,3,3,244,159,3,4,255,21,3,5,255,22,3,6,255,155,3,7,255,255,3,8,254,224,3,15,215,250,3,16,254,231,3,17,191,0,4,1,209,255,4,2,241,241,4,3,255,5,4,7,237,224,4,8,255,255,4,9,235,103,4,15,181,255,4,16,254,250,4,17,230,0,5,1,245,255,5,2,240,184,5,3,228,0,5,8,255,255,5,9,255,195,5,15,161,255,5,16,254,252,5,17,249,0,6,1,247,255,6,2,251,170,6,3,174,0,6,8,243,249,6,9,255,255,6,10,204,50,6,15,185,255,6,16,248,242,6,17,252,0,7,1,225,255,7,2,254,197,7,3,168,0,7,9,255,255,7,10,255,163,7,15,243,255,7,16,238,204,7,17,236,0,8,1,196,255,8,2,253,246,8,3,198,10,8,9,252,252,8,10,255,255,8,11,204,143,8,14,181,255,8,15,255,255,8,16,248,105,8,17,190,0,9,2,255,255,9,3,247,79,9,10,255,255,9,11,255,255,9,12,255,255,9,13,255,255,9,14,255,255,9,15,238,210,9,16,255,4,10,2,175,134,10,3,255,9,10,10,175,150,10,11,255,215,10,12,255,249,10,13,255,227,10,14,255,141,10,15,255,13,10,16,196,0,11,12,215,0,11,13,249,0,11,14,227,0],
secondary:!1},{width:14,bonus:390,chr:"T",
pixels:[1,1,255,255,1,2,155,255,2,1,255,255,2,2,254,156,2,3,156,0,3,1,255,255,3,2,254,156,3,3,156,0,4,1,255,255,4,2,254,156,4,3,156,0,5,1,255,255,5,2,254,156,5,3,156,0,6,1,255,255,6,2,255,255,6,3,255,255,6,4,255,255,6,5,255,255,6,6,255,255,6,7,255,255,6,8,255,255,6,9,255,255,6,10,255,255,6,11,255,255,6,12,255,255,6,13,255,255,6,14,255,255,6,15,255,255,6,16,255,255,7,1,255,255,7,2,255,255,7,3,255,255,7,4,255,255,7,5,255,255,7,6,255,255,7,7,255,255,7,8,255,255,7,9,255,255,7,10,255,255,7,11,255,255,7,12,255,255,7,13,255,255,7,14,255,255,7,15,255,255,7,16,255,255,7,17,255,0,8,1,255,255,8,2,254,156,8,3,255,0,8,4,255,0,8,5,255,0,8,6,255,0,8,7,255,0,8,8,255,0,8,9,255,0,8,10,255,0,8,11,255,0,8,12,255,0,8,13,255,0,8,14,255,0,8,15,255,0,8,16,255,0,8,17,255,0,9,1,255,255,9,2,254,156,9,3,156,0,10,1,255,255,10,2,254,156,10,3,156,0,11,1,255,255,11,2,254,156,11,3,156,0,12,1,255,255,12,2,254,156,12,3,156,0,13,2,255,0,13,3,156,0],
secondary:!1},{width:16,bonus:530,chr:"U",
pixels:[2,1,255,255,2,2,255,255,2,3,255,255,2,4,255,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,2,11,249,255,2,12,223,255,2,13,158,255,3,1,255,255,3,2,255,255,3,3,255,255,3,4,255,255,3,5,255,255,3,6,255,255,3,7,255,255,3,8,255,255,3,9,255,255,3,10,255,255,3,11,255,255,3,12,255,255,3,13,255,255,3,14,253,251,4,2,255,0,4,3,255,0,4,4,255,0,4,5,255,0,4,6,255,0,4,7,255,0,4,8,255,0,4,9,255,0,4,10,255,0,4,11,255,8,4,12,255,43,4,13,254,132,4,14,255,247,4,15,255,249,5,14,168,112,5,15,255,255,5,16,252,158,6,15,222,241,6,16,255,221,6,17,156,0,7,15,165,255,7,16,253,250,7,17,221,0,8,15,163,255,8,16,251,249,8,17,248,0,9,15,211,255,9,16,241,228,9,17,246,0,10,15,255,255,10,16,237,158,10,17,216,0,11,14,247,255,11,15,248,252,11,16,255,35,12,1,255,255,12,2,255,255,12,3,255,255,12,4,255,255,12,5,255,255,12,6,255,255,12,7,255,255,12,8,255,255,12,9,255,255,12,10,255,255,12,11,255,255,12,12,255,255,12,13,255,255,12,14,251,251,12,15,249,84,12,16,246,0,13,1,255,255,13,2,255,255,13,3,255,255,13,4,255,255,13,5,255,255,13,6,255,255,13,7,255,255,13,8,255,255,13,9,255,255,13,10,255,255,13,11,255,249,13,12,255,223,13,13,254,156,13,14,255,40,13,15,247,0,14,2,255,0,14,3,255,0,14,4,255,0,14,5,255,0,14,6,255,0,14,7,255,0,14,8,255,0,14,9,255,0,14,10,255,0,14,11,255,0,14,12,249,0,14,13,223,0,14,14,156,0],
secondary:!1},{width:13,bonus:430,chr:"V",
pixels:[0,1,211,255,1,1,255,255,1,2,255,255,1,3,255,255,1,4,205,246,2,2,255,152,2,3,255,235,2,4,255,255,2,5,255,255,2,6,253,253,2,7,191,247,3,3,154,7,3,4,241,76,3,5,255,160,3,6,254,240,3,7,255,255,3,8,255,255,3,9,250,252,3,10,177,248,4,6,162,11,4,7,245,83,4,8,254,168,4,9,255,245,4,10,255,255,4,11,255,255,4,12,244,250,4,13,161,252,5,9,171,16,5,10,248,90,5,11,254,174,5,12,255,245,5,13,255,255,5,14,255,255,5,15,237,249,6,12,176,13,6,13,249,102,6,14,255,221,6,15,255,255,6,16,255,255,7,12,207,255,7,13,255,255,7,14,255,255,7,15,254,255,7,16,255,196,7,17,255,0,8,9,209,255,8,10,255,255,8,11,255,255,8,12,255,255,8,13,246,217,8,14,254,120,8,15,255,31,8,16,254,0,8,17,196,0,9,6,201,255,9,7,255,255,9,8,255,255,9,9,255,255,9,10,248,228,9,11,255,133,9,12,255,43,9,13,255,0,9,14,209,0,10,3,193,255,10,4,253,255,10,5,255,255,10,6,255,255,10,7,250,236,10,8,255,146,10,9,255,56,10,10,255,0,10,11,222,0,11,1,251,255,11,2,255,255,11,3,255,255,11,4,252,244,11,5,254,160,11,6,254,70,11,7,255,3,11,8,232,0,12,1,247,255,12,2,254,174,12,3,255,83,12,4,255,8,12,5,241,0,12,6,159,0],
secondary:!1},{width:20,bonus:785,chr:"W",
pixels:[0,1,155,255,1,1,255,255,1,2,255,255,1,3,255,255,1,4,215,251,2,2,255,179,2,3,254,240,2,4,255,255,2,5,255,255,2,6,255,255,2,7,252,254,2,8,206,251,3,3,180,3,3,4,243,54,3,5,255,115,3,6,255,179,3,7,254,240,3,8,255,255,3,9,255,255,3,10,255,255,3,11,249,254,3,12,194,252,4,7,180,3,4,8,243,54,4,9,255,115,4,10,255,178,4,11,254,233,4,12,255,255,4,13,255,255,4,14,255,255,4,15,246,252,4,16,182,253,5,11,178,0,5,12,236,55,5,13,255,152,5,14,255,239,5,15,255,255,5,16,255,255,5,17,181,0,6,11,217,255,6,12,255,255,6,13,255,255,6,14,255,255,6,15,252,218,6,16,254,144,6,17,255,0,7,7,189,255,7,8,249,255,7,9,255,255,7,10,255,255,7,11,251,249,7,12,244,187,7,13,255,106,7,14,255,34,7,15,255,0,7,16,216,0,8,4,223,255,8,5,255,255,8,6,255,255,8,7,255,255,8,8,245,224,8,9,253,143,8,10,255,69,8,11,255,7,8,12,245,0,8,13,179,0,9,1,249,255,9,2,255,255,9,3,255,255,9,4,247,243,9,5,245,180,9,6,255,104,9,7,255,32,9,8,255,0,9,9,215,0,10,1,255,255,10,2,255,255,10,3,255,235,10,4,254,156,10,5,242,94,10,6,179,27,11,2,255,158,11,3,254,233,11,4,255,255,11,5,255,255,11,6,254,254,11,7,203,250,12,3,158,2,12,4,237,58,12,5,255,130,12,6,254,207,12,7,255,255,12,8,255,255,12,9,255,255,12,10,234,250,12,11,155,255,13,7,211,31,13,8,255,102,13,9,255,178,13,10,255,245,13,11,255,255,13,12,255,255,13,13,251,253,13,14,190,251,14,10,180,11,14,11,248,68,14,12,254,132,14,13,255,184,14,14,255,241,14,15,255,255,14,16,255,255,15,12,201,232,15,13,243,242,15,14,255,255,15,15,255,255,15,16,255,255,15,17,255,0,16,8,193,255,16,9,247,255,16,10,255,255,16,11,255,255,16,12,255,255,16,13,248,238,16,14,247,172,16,15,255,99,16,16,255,33,16,17,255,0,17,4,195,255,17,5,249,255,17,6,255,255,17,7,255,255,17,8,255,255,17,9,251,243,17,10,253,178,17,11,255,110,17,12,255,43,17,13,255,0,17,14,232,0,17,15,166,0,18,1,249,255,18,2,255,255,18,3,255,255,18,4,255,255,18,5,253,249,18,6,253,189,18,7,255,121,18,8,255,54,18,9,255,3,18,10,240,0,18,11,177,0,19,1,251,255,19,2,254,200,19,3,254,132,19,4,255,65,19,5,255,7,19,6,247,0,19,7,188,0],
secondary:!1},{width:13,bonus:450,chr:"X",
pixels:[1,1,255,255,1,2,184,220,1,15,231,255,1,16,255,255,2,1,225,255,2,2,255,255,2,3,247,241,2,13,183,255,2,14,255,255,2,15,250,252,2,16,243,131,2,17,255,0,3,2,242,146,3,3,255,251,3,4,255,255,3,5,205,223,3,12,245,255,3,13,255,255,3,14,233,197,3,15,255,33,3,16,247,0,4,3,159,72,4,4,254,197,4,5,255,255,4,6,251,247,4,10,209,255,4,11,255,255,4,12,238,240,4,13,248,81,4,14,255,0,4,15,180,0,5,5,219,114,5,6,254,237,5,7,255,255,5,8,233,238,5,9,254,255,5,10,250,254,5,11,233,145,5,12,255,10,5,13,224,0,6,7,254,245,6,8,255,255,6,9,255,255,6,10,255,122,6,11,249,0,7,6,241,255,7,7,255,255,7,8,253,192,7,9,255,249,7,10,255,255,7,11,218,217,8,4,205,255,8,5,255,255,8,6,237,241,8,7,245,76,8,8,255,0,8,9,200,51,8,10,253,193,8,11,255,255,8,12,253,251,8,13,154,226,9,3,253,255,9,4,252,254,9,5,234,155,9,6,255,11,9,7,224,0,9,11,216,114,9,12,254,237,9,13,255,255,9,14,242,239,10,1,231,255,10,2,255,255,10,3,236,225,10,4,253,52,10,5,252,0,10,13,248,165,10,14,255,255,10,15,255,255,10,16,210,228,11,1,245,255,11,2,242,125,11,3,255,4,11,4,208,0,11,14,183,89,11,15,254,216,11,16,255,255,11,17,188,0,12,2,246,0,12,16,236,139,12,17,255,0],
secondary:!1},{width:12,bonus:370,chr:"Y",
pixels:[0,1,235,255,1,1,253,255,1,2,255,255,1,3,238,241,2,2,254,183,2,3,255,255,2,4,255,255,2,5,229,238,3,3,199,78,3,4,255,196,3,5,255,255,3,6,255,255,3,7,218,235,4,5,213,91,4,6,255,209,4,7,255,255,4,8,255,255,4,9,204,234,5,7,225,102,5,8,254,221,5,9,255,255,5,10,255,255,5,11,255,255,5,12,255,255,5,13,255,255,5,14,255,255,5,15,255,255,5,16,255,255,6,8,233,242,6,9,255,255,6,10,255,255,6,11,255,255,6,12,255,255,6,13,255,255,6,14,255,255,6,15,255,255,6,16,255,255,6,17,255,0,7,6,207,255,7,7,255,255,7,8,255,255,7,9,244,184,7,10,255,43,7,11,255,0,7,12,255,0,7,13,255,0,7,14,255,0,7,15,255,0,7,16,255,0,7,17,255,0,8,4,191,255,8,5,255,255,8,6,255,255,8,7,243,203,8,8,254,58,8,9,255,0,8,10,176,0,9,2,177,255,9,3,255,255,9,4,255,255,9,5,243,220,9,6,255,75,9,7,255,0,9,8,194,0,10,1,253,255,10,2,255,255,10,3,245,232,10,4,255,92,10,5,255,2,10,6,210,0,11,1,233,255,11,2,254,111,11,3,255,6,11,4,223,0],
secondary:!1},{width:12,bonus:500,chr:"Z",
pixels:[1,1,255,255,1,2,155,255,1,15,225,255,1,16,255,255,2,1,255,255,2,2,254,156,2,3,156,0,2,13,187,255,2,14,255,255,2,15,255,255,2,16,255,255,2,17,255,0,3,1,255,255,3,2,254,156,3,3,156,0,3,12,251,255,3,13,253,255,3,14,227,169,3,15,255,172,3,16,255,255,3,17,255,0,4,1,255,255,4,2,254,156,4,3,156,0,4,10,231,255,4,11,255,255,4,12,232,224,4,13,251,54,4,14,253,0,4,15,214,185,4,16,255,255,4,17,255,0,5,1,255,255,5,2,254,156,5,3,156,0,5,8,197,255,5,9,255,255,5,10,245,249,5,11,241,113,5,12,255,2,5,13,204,0,5,15,155,255,5,16,255,255,5,17,255,0,6,1,255,255,6,2,254,156,6,3,156,0,6,6,153,255,6,7,253,255,6,8,255,255,6,9,234,178,6,10,255,23,6,11,240,0,6,15,155,255,6,16,255,255,6,17,255,0,7,1,255,255,7,2,254,156,7,3,157,5,7,5,237,255,7,6,255,255,7,7,238,229,7,8,253,64,7,9,255,0,7,10,164,0,7,15,155,255,7,16,255,255,7,17,255,0,8,1,255,255,8,2,255,197,8,3,236,224,8,4,255,255,8,5,249,251,8,6,245,125,8,7,255,5,8,8,214,0,8,15,155,255,8,16,255,255,8,17,255,0,9,1,255,255,9,2,255,255,9,3,255,255,9,4,240,188,9,5,255,31,9,6,245,0,9,15,155,255,9,16,255,255,9,17,255,0,10,1,255,255,10,2,255,223,10,3,255,77,10,4,255,0,10,5,177,0,10,15,155,255,10,16,255,255,10,17,255,0,11,2,255,0,11,3,223,0,11,16,156,0,11,17,255,0],
secondary:!1},{width:12,bonus:500,chr:"0",
pixels:[1,5,177,255,1,6,217,255,1,7,241,255,1,8,251,255,1,9,249,255,1,10,237,255,1,11,209,255,1,12,163,255,2,3,245,255,2,4,255,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,2,11,255,255,2,12,255,255,2,13,255,255,2,14,241,247,3,2,255,255,3,3,248,251,3,4,251,144,3,5,255,72,3,6,255,33,3,7,255,11,3,8,255,3,3,9,255,3,3,10,255,11,3,11,255,33,3,12,255,73,3,13,255,143,3,14,254,245,3,15,254,252,4,1,195,255,4,2,248,252,4,3,255,41,4,4,244,0,4,14,162,66,4,15,255,245,4,16,255,190,5,1,241,255,5,2,236,187,5,3,245,0,5,15,186,237,5,16,254,243,5,17,190,0,6,1,239,255,6,2,251,180,6,3,173,0,6,15,175,255,6,16,250,247,6,17,242,0,7,1,185,255,7,2,254,249,7,3,192,66,7,15,247,255,7,16,235,210,7,17,242,0,8,2,254,252,8,3,254,249,8,4,172,226,8,14,247,255,8,15,254,255,8,16,250,76,8,17,194,0,9,3,255,231,9,4,255,255,9,5,255,255,9,6,255,255,9,7,255,255,9,8,255,255,9,9,255,255,9,10,255,255,9,11,255,255,9,12,255,255,9,13,255,255,9,14,250,248,9,15,251,98,9,16,254,0,10,4,240,98,10,5,254,164,10,6,255,209,10,7,254,239,10,8,254,251,10,9,254,251,10,10,255,239,10,11,255,213,10,12,255,172,10,13,255,105,10,14,255,16,10,15,243,0,11,6,164,0,11,7,209,0,11,8,238,0,11,9,250,0,11,10,250,0,11,11,239,0,11,12,213,0,11,13,172,0],
secondary:!1},{width:12,bonus:300,chr:"1",
pixels:[2,4,163,255,3,3,203,255,3,4,254,255,3,5,192,104,4,2,158,255,4,3,255,255,4,4,229,136,4,5,254,0,5,2,255,255,5,3,215,176,5,4,255,0,6,1,249,255,6,2,255,255,6,3,255,255,6,4,255,255,6,5,255,255,6,6,255,255,6,7,255,255,6,8,255,255,6,9,255,255,6,10,255,255,6,11,255,255,6,12,255,255,6,13,255,255,6,14,255,255,6,15,255,255,6,16,255,255,7,1,255,255,7,2,255,255,7,3,255,255,7,4,255,255,7,5,255,255,7,6,255,255,7,7,255,255,7,8,255,255,7,9,255,255,7,10,255,255,7,11,255,255,7,12,255,255,7,13,255,255,7,14,255,255,7,15,255,255,7,16,255,255,7,17,255,0,8,2,255,0,8,3,255,0,8,4,255,0,8,5,255,0,8,6,255,0,8,7,255,0,8,8,255,0,8,9,255,0,8,10,255,0,8,11,255,0,8,12,255,0,8,13,255,0,8,14,255,0,8,15,255,0,8,16,255,0,8,17,255,0],
secondary:!1},{width:12,bonus:450,chr:"2",
pixels:[1,15,225,255,1,16,255,255,2,2,251,255,2,3,234,239,2,14,241,255,2,15,255,255,2,16,255,255,2,17,255,0,3,2,254,255,3,3,252,58,3,4,220,0,3,13,249,255,3,14,245,251,3,15,252,208,3,16,255,255,3,17,255,0,4,1,223,255,4,2,231,218,4,3,254,0,4,12,255,255,4,13,240,245,4,14,251,49,4,15,249,159,4,16,255,255,4,17,255,0,5,1,249,255,5,2,244,172,5,3,197,0,5,10,163,255,5,11,255,255,5,12,237,236,5,13,255,34,5,14,231,0,5,15,174,228,5,16,255,255,5,17,255,0,6,1,233,255,6,2,254,212,6,3,165,2,6,9,201,255,6,10,255,255,6,11,235,218,6,12,255,22,6,13,219,0,6,15,155,255,6,16,255,255,6,17,255,0,7,1,163,255,7,2,255,255,7,3,237,167,7,8,243,255,7,9,255,255,7,10,238,185,7,11,255,9,7,12,201,0,7,15,155,255,7,16,255,255,7,17,255,0,8,2,249,245,8,3,255,255,8,4,255,255,8,5,255,255,8,6,255,255,8,7,255,255,8,8,250,250,8,9,249,109,8,10,255,0,8,11,172,0,8,15,155,255,8,16,255,255,8,17,255,0,9,3,249,172,9,4,255,235,9,5,254,251,9,6,254,219,9,7,255,133,9,8,255,24,9,9,246,0,9,15,155,255,9,16,255,255,9,17,255,0,10,4,168,0,10,5,235,0,10,6,250,0,10,7,218,0,10,15,155,255,10,16,255,255,10,17,255,0,11,16,156,0,11,17,255,0],
secondary:!1},{width:12,bonus:450,chr:"3",
pixels:[1,2,241,255,1,3,183,233,1,15,255,255,1,16,202,188,2,2,255,255,2,3,247,106,2,4,167,0,2,15,230,247,2,16,255,211,3,1,199,255,3,2,243,242,3,3,255,3,3,8,255,255,3,9,163,243,3,15,173,255,3,16,252,239,3,17,211,0,4,1,237,255,4,2,237,187,4,3,231,0,4,8,255,255,4,9,254,164,4,10,156,0,4,15,160,255,4,16,254,252,4,17,236,0,5,1,249,255,5,2,249,170,5,3,174,0,5,8,255,255,5,9,255,193,5,10,164,0,5,15,184,255,5,16,249,245,5,17,251,0,6,1,225,255,6,2,254,218,6,3,167,3,6,8,240,253,6,9,254,251,6,10,198,29,6,15,247,255,6,16,238,209,6,17,239,0,7,1,157,255,7,2,255,255,7,3,239,159,7,7,249,255,7,8,186,151,7,9,254,249,7,10,254,198,7,14,207,255,7,15,255,255,7,16,251,110,7,17,195,0,8,2,250,248,8,3,255,255,8,4,255,255,8,5,255,255,8,6,255,255,8,7,230,232,8,8,250,8,8,9,188,185,8,10,255,255,8,11,255,255,8,12,255,255,8,13,255,255,8,14,255,255,8,15,244,206,8,16,255,5,9,3,251,189,9,4,255,245,9,5,255,229,9,6,255,159,9,7,255,22,9,8,210,0,9,10,191,160,9,11,255,219,9,12,254,249,9,13,254,221,9,14,254,132,9,15,255,10,9,16,197,0,10,4,186,0,10,5,245,0,10,6,229,0,10,7,159,0,10,12,219,0,10,13,248,0,10,14,220,0],
secondary:!1},{width:12,bonus:495,chr:"4",
pixels:[1,11,163,255,1,12,255,255,1,13,199,255,2,10,237,255,2,11,250,255,2,12,255,255,2,13,254,201,2,14,200,0,3,8,197,255,3,9,255,255,3,10,217,225,3,11,241,45,3,12,255,255,3,13,254,201,3,14,200,0,4,7,251,255,4,8,235,251,4,9,218,106,4,10,255,0,4,11,192,0,4,12,255,255,4,13,254,201,4,14,200,0,5,5,223,255,5,6,252,254,5,7,204,181,5,8,251,15,5,9,231,0,5,12,255,255,5,13,254,201,5,14,200,0,6,3,173,255,6,4,255,255,6,5,214,235,6,6,230,53,6,7,252,0,6,12,255,255,6,13,254,201,6,14,200,0,7,2,241,255,7,3,205,248,7,4,201,109,7,5,255,1,7,6,198,0,7,12,255,255,7,13,254,201,7,14,200,0,8,1,255,255,8,2,255,255,8,3,255,255,8,4,255,255,8,5,255,255,8,6,255,255,8,7,255,255,8,8,255,255,8,9,255,255,8,10,255,255,8,11,255,255,8,12,255,255,8,13,255,255,8,14,255,255,8,15,255,255,8,16,255,255,9,1,255,255,9,2,255,255,9,3,255,255,9,4,255,255,9,5,255,255,9,6,255,255,9,7,255,255,9,8,255,255,9,9,255,255,9,10,255,255,9,11,255,255,9,12,255,255,9,13,255,255,9,14,255,255,9,15,255,255,9,16,255,255,9,17,255,0,10,2,255,0,10,3,255,0,10,4,255,0,10,5,255,0,10,6,255,0,10,7,255,0,10,8,255,0,10,9,255,0,10,10,255,0,10,11,255,0,10,12,255,255,10,13,254,201,10,14,255,0,10,15,255,0,10,16,255,0,10,17,255,0,11,12,255,255,11,13,254,201,11,14,200,0],
secondary:!1},{width:12,bonus:465,chr:"5",
pixels:[2,1,159,255,2,2,179,255,2,3,199,255,2,4,221,255,2,5,241,255,2,6,255,255,2,7,255,255,2,8,187,243,2,15,255,255,2,16,204,191,3,1,255,255,3,2,255,255,3,3,255,255,3,4,252,246,3,5,250,223,3,6,252,199,3,7,254,243,3,8,254,201,3,9,178,0,3,15,223,248,3,16,254,215,4,1,255,255,4,2,255,166,4,3,255,10,4,4,255,0,4,5,243,0,4,6,219,0,4,7,249,235,4,8,250,171,4,9,200,0,4,15,172,255,4,16,253,247,4,17,214,0,5,1,255,255,5,2,254,156,5,3,166,0,5,7,247,255,5,8,246,171,5,9,168,0,5,15,163,255,5,16,254,252,5,17,246,0,6,1,255,255,6,2,254,156,6,3,156,0,6,7,245,255,6,8,253,199,6,9,165,0,6,15,193,255,6,16,246,240,6,17,251,0,7,1,255,255,7,2,254,156,7,3,156,0,7,7,202,255,7,8,254,252,7,9,207,53,7,15,251,255,7,16,237,192,7,17,232,0,8,1,255,255,8,2,254,156,8,3,156,0,8,8,255,255,8,9,254,222,8,14,225,255,8,15,255,255,8,16,252,75,8,17,178,0,9,1,219,255,9,2,255,134,9,3,156,0,9,8,222,226,9,9,255,255,9,10,255,255,9,11,255,255,9,12,255,255,9,13,255,255,9,14,255,255,9,15,242,153,9,16,255,0,10,2,220,0,10,9,226,145,10,10,254,219,10,11,255,249,10,12,254,239,10,13,255,187,10,14,255,83,10,15,255,0,11,11,218,0,11,12,249,0,11,13,238,0,11,14,187,0],
secondary:!1},{width:12,bonus:515,chr:"6",
pixels:[1,6,161,255,1,7,209,255,1,8,235,255,1,9,247,255,1,10,249,255,1,11,233,255,1,12,190,255,2,4,235,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,2,11,255,255,2,12,255,255,2,13,255,255,2,14,245,247,3,3,255,255,3,4,246,251,3,5,247,145,3,6,255,66,3,7,255,24,3,8,255,158,3,9,255,215,3,10,255,62,3,11,255,10,3,12,255,37,3,13,255,123,3,14,254,240,3,15,254,251,4,2,255,255,4,3,235,234,4,4,255,29,4,5,242,0,4,7,155,199,4,8,248,254,4,9,171,52,4,10,215,0,4,15,255,249,4,16,253,178,5,1,161,255,5,2,255,255,5,3,254,52,5,4,216,0,5,7,219,255,5,8,220,219,5,9,247,0,5,15,196,233,5,16,254,239,5,17,177,0,6,1,223,255,6,2,238,223,6,3,255,0,6,7,249,255,6,8,243,182,6,9,189,0,6,15,173,255,6,16,252,251,6,17,238,0,7,1,247,255,7,2,244,179,7,3,208,0,7,7,227,255,7,8,254,231,7,9,176,16,7,15,235,255,7,16,241,224,7,17,248,0,8,1,251,255,8,2,252,167,8,3,171,0,8,8,255,255,8,9,248,194,8,14,207,255,8,15,255,255,8,16,244,123,8,17,212,0,9,1,171,255,9,2,254,150,9,3,165,0,9,8,240,233,9,9,255,255,9,10,255,255,9,11,255,255,9,12,255,255,9,13,255,255,9,14,255,255,9,15,242,195,9,16,255,5,10,2,171,0,10,9,239,150,10,10,254,221,10,11,255,249,10,12,255,241,10,13,255,195,10,14,255,102,10,15,255,3,10,16,185,0,11,11,220,0,11,12,249,0,11,13,241,0,11,14,195,0],
secondary:!1},{width:12,bonus:375,chr:"7",
pixels:[1,1,255,255,1,2,155,255,2,1,255,255,2,2,254,156,2,3,156,0,3,1,255,255,3,2,254,156,3,3,156,0,3,16,195,255,4,1,255,255,4,2,254,156,4,3,156,0,4,14,231,255,4,15,255,255,4,16,255,255,4,17,195,0,5,1,255,255,5,2,254,156,5,3,156,0,5,11,175,255,5,12,251,255,5,13,255,255,5,14,254,254,5,15,248,184,5,16,255,75,5,17,255,0,6,1,255,255,6,2,254,156,6,3,156,0,6,9,215,255,6,10,255,255,6,11,255,255,6,12,247,237,6,13,254,131,6,14,255,29,6,15,253,0,6,16,179,0,7,1,255,255,7,2,254,156,7,3,156,0,7,6,154,255,7,7,245,255,7,8,255,255,7,9,254,255,7,10,244,194,7,11,255,81,7,12,255,4,7,13,229,0,8,1,255,255,8,2,254,162,8,3,191,121,8,4,197,255,8,5,255,255,8,6,255,255,8,7,246,242,8,8,251,138,8,9,255,34,8,10,254,0,8,11,185,0,9,1,255,255,9,2,255,255,9,3,255,255,9,4,255,255,9,5,241,202,9,6,255,87,9,7,255,6,9,8,233,0,10,1,255,255,10,2,255,237,10,3,255,142,10,4,255,39,10,5,255,0,10,6,191,0,11,2,255,0,11,3,237,0],
secondary:!1},{width:12,bonus:565,chr:"8",
pixels:[1,3,197,255,1,4,247,255,1,5,225,255,1,11,201,255,1,12,243,255,1,13,239,255,1,14,171,255,2,2,241,255,2,3,255,255,2,4,255,255,2,5,255,255,2,6,255,255,2,7,228,221,2,10,255,255,2,11,255,255,2,12,255,255,2,13,255,255,2,14,255,255,2,15,248,240,3,1,154,255,3,2,255,255,3,3,248,119,3,4,255,15,3,5,255,33,3,6,255,166,3,7,255,255,3,8,241,202,3,9,255,255,3,10,233,229,3,11,255,67,3,12,255,11,3,13,255,28,3,14,254,156,3,15,255,255,3,16,245,151,4,1,217,255,4,2,234,219,4,3,255,0,4,7,235,216,4,8,255,255,4,9,245,227,4,10,255,14,4,11,209,0,4,15,242,236,4,16,254,219,5,1,245,255,5,2,242,174,5,3,201,0,5,8,255,255,5,9,255,139,5,10,218,0,5,15,174,253,5,16,254,249,5,17,218,0,6,1,217,255,6,2,254,203,6,3,165,0,6,7,197,255,6,8,255,255,6,9,255,239,6,15,175,255,6,16,252,250,6,17,248,0,7,1,154,255,7,2,255,255,7,3,226,131,7,6,169,255,7,7,255,255,7,8,230,156,7,9,255,255,7,10,247,148,7,15,231,255,7,16,241,223,7,17,247,0,8,2,249,247,8,3,255,255,8,4,255,255,8,5,255,255,8,6,255,255,8,7,223,185,8,8,255,0,8,9,221,207,8,10,254,255,8,11,198,160,8,14,173,255,8,15,255,255,8,16,243,133,8,17,211,0,9,3,252,197,9,4,254,246,9,5,255,219,9,6,255,123,9,7,255,5,9,8,162,0,9,10,248,238,9,11,255,255,9,12,255,255,9,13,255,255,9,14,255,255,9,15,242,227,9,16,255,12,10,4,195,0,10,5,246,0,10,6,219,0,10,11,249,189,10,12,255,247,10,13,254,233,10,14,255,152,10,15,255,20,10,16,215,0,11,12,184,0,11,13,247,0,11,14,232,0],
secondary:!1},{width:12,bonus:520,chr:"9",
pixels:[1,4,197,255,1,5,241,255,1,6,249,255,1,7,223,255,2,2,185,255,2,3,255,255,2,4,255,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,242,238,2,16,172,255,3,2,255,255,3,3,241,217,3,4,254,70,3,5,255,12,3,6,255,10,3,7,255,53,3,8,255,185,3,9,255,255,3,10,244,159,3,15,165,255,3,16,254,255,3,17,172,0,4,1,211,255,4,2,244,246,4,3,255,19,4,4,205,0,4,9,247,235,4,10,254,228,4,15,166,255,4,16,252,251,4,17,254,0,5,1,247,255,5,2,241,184,5,3,235,0,5,9,174,251,5,10,254,250,5,11,228,0,5,15,201,255,5,16,244,234,5,17,248,0,6,1,237,255,6,2,252,184,6,3,174,0,6,9,189,255,6,10,244,231,6,11,249,0,6,15,253,255,6,16,235,175,6,17,224,0,7,1,175,255,7,2,255,251,7,3,199,82,7,9,247,255,7,10,221,142,7,11,221,0,7,14,209,255,7,15,254,255,7,16,254,55,7,17,162,0,8,2,254,252,8,3,255,243,8,4,162,205,8,8,217,255,8,9,174,235,8,10,248,39,8,11,156,106,8,13,239,255,8,14,255,255,8,15,234,148,8,16,254,0,9,3,254,239,9,4,255,255,9,5,255,255,9,6,255,255,9,7,255,255,9,8,255,255,9,9,255,255,9,10,255,255,9,11,255,255,9,12,255,255,9,13,246,244,9,14,246,114,9,15,255,0,10,4,246,122,10,5,255,189,10,6,255,233,10,7,255,249,10,8,254,246,10,9,254,233,10,10,254,204,10,11,255,157,10,12,255,92,10,13,255,8,10,14,236,0,11,6,189,0,11,7,233,0,11,8,249,0,11,9,246,0,11,10,232,0,11,11,204,0,11,12,157,0],
secondary:!1},{width:18,bonus:705,chr:"%",
pixels:[1,5,205,255,1,6,241,255,1,7,239,255,1,8,199,255,2,4,255,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,154,166,3,3,225,255,3,4,245,245,3,5,255,67,3,6,255,10,3,7,255,10,3,8,255,65,3,9,255,235,3,10,254,225,4,3,249,255,4,4,244,177,4,5,235,0,4,9,191,227,4,10,255,251,4,11,224,0,4,16,155,255,5,3,221,255,5,4,254,239,5,5,194,95,5,9,237,255,5,10,244,234,5,11,251,0,5,15,239,255,5,16,235,253,5,17,156,0,6,4,255,255,6,5,255,255,6,6,255,255,6,7,255,255,6,8,255,255,6,9,255,255,6,10,245,108,6,11,224,0,6,13,211,255,6,14,252,254,6,15,192,192,6,16,240,17,6,17,234,0,7,4,163,142,7,5,255,202,7,6,255,239,7,7,255,239,7,8,255,202,7,9,255,95,7,10,255,29,7,11,204,211,7,12,255,255,7,13,207,236,7,14,219,51,7,15,252,0,8,6,202,0,8,7,239,0,8,8,239,8,8,9,227,138,8,10,248,251,8,11,229,251,8,12,198,111,8,13,255,0,8,14,191,0,9,8,219,255,9,9,248,255,9,10,191,176,9,11,244,11,9,12,226,0,10,6,181,255,10,7,255,255,10,8,200,226,10,9,225,43,10,10,251,113,10,11,233,229,10,12,242,255,10,13,237,255,10,14,197,255,11,5,249,255,11,6,222,249,11,7,202,92,11,8,255,0,11,9,217,153,11,10,255,255,11,11,255,255,11,12,255,255,11,13,255,255,11,14,255,255,11,15,255,255,12,3,227,255,12,4,243,255,12,5,191,158,12,6,249,6,12,7,217,0,12,9,243,255,12,10,223,216,12,11,255,42,12,12,255,6,12,13,255,13,12,14,255,72,12,15,254,237,12,16,254,222,13,3,163,255,13,4,231,29,13,5,243,0,13,9,255,255,13,10,247,90,13,11,189,0,13,15,195,224,13,16,255,251,13,17,222,0,14,4,164,0,14,9,242,254,14,10,255,195,14,15,239,255,14,16,244,233,14,17,251,0,15,10,255,255,15,11,255,255,15,12,255,255,15,13,255,255,15,14,255,255,15,15,255,255,15,16,245,107,15,17,223,0,16,10,172,148,16,11,255,205,16,12,255,241,16,13,254,239,16,14,255,202,16,15,255,95,16,16,255,0,17,12,205,0,17,13,241,0,17,14,238,0,17,15,202,0],
secondary:!1},{width:9,bonus:310,chr:"/",
pixels:[1,19,175,255,1,20,239,255,2,15,161,255,2,16,227,255,2,17,255,255,2,18,255,255,2,19,255,255,2,20,246,233,2,21,239,0,3,12,215,255,3,13,255,255,3,14,255,255,3,15,255,255,3,16,248,242,3,17,245,177,3,18,255,103,3,19,255,36,3,20,255,0,3,21,225,0,4,8,201,255,4,9,251,255,4,10,255,255,4,11,255,255,4,12,250,249,4,13,243,191,4,14,255,115,4,15,255,48,4,16,255,1,4,17,235,0,4,18,170,0,5,4,187,255,5,5,245,255,5,6,255,255,5,7,255,255,5,8,252,253,5,9,242,205,5,10,253,128,5,11,255,60,5,12,255,5,5,13,244,0,5,14,182,0,6,0,173,255,6,1,237,255,6,2,255,255,6,3,255,255,6,4,254,255,6,5,242,218,6,6,251,143,6,7,255,73,6,8,255,12,6,9,250,0,6,10,195,0,7,0,255,255,7,1,243,230,7,2,248,157,7,3,255,85,7,4,255,20,7,5,254,0,7,6,207,0,8,0,255,31,8,1,255,0,8,2,219,0],
secondary:!1},{width:12,bonus:265,chr:"+",
pixels:[1,9,155,255,1,10,255,255,2,9,155,255,2,10,255,255,2,11,255,0,3,9,155,255,3,10,255,255,3,11,255,0,4,9,155,255,4,10,255,255,4,11,255,0,5,5,255,255,5,6,255,255,5,7,255,255,5,8,255,255,5,9,255,255,5,10,255,255,5,11,255,255,5,12,255,255,5,13,255,255,5,14,255,255,6,5,255,255,6,6,255,255,6,7,255,255,6,8,255,255,6,9,255,255,6,10,255,255,6,11,255,255,6,12,255,255,6,13,255,255,6,14,255,255,6,15,255,0,7,6,255,0,7,7,255,0,7,8,255,0,7,9,254,156,7,10,255,255,7,11,255,0,7,12,255,0,7,13,255,0,7,14,255,0,7,15,255,0,8,9,155,255,8,10,255,255,8,11,255,0,9,9,155,255,9,10,255,255,9,11,255,0,10,9,155,255,10,10,255,255,10,11,255,0,11,10,156,0,11,11,255,0],
secondary:!1},{width:12,bonus:285,chr:"?",
pixels:[2,2,223,255,3,1,154,255,3,2,253,255,3,3,227,37,4,1,221,255,4,2,232,216,4,3,253,0,4,14,155,255,4,15,245,255,4,16,157,255,5,1,249,255,5,2,243,171,5,3,196,0,5,9,221,255,5,10,255,255,5,11,255,255,5,14,243,255,5,15,255,255,5,16,254,246,5,17,157,0,6,1,239,255,6,2,253,199,6,3,163,0,6,8,235,255,6,9,253,255,6,10,238,141,6,11,255,37,6,12,255,6,6,15,252,206,6,16,255,117,6,17,246,0,7,1,179,255,7,2,255,255,7,3,224,137,7,7,239,255,7,8,254,255,7,9,244,105,7,10,253,0,7,16,204,0,8,2,253,252,8,3,255,255,8,4,255,255,8,5,255,255,8,6,255,255,8,7,254,254,8,8,246,108,8,9,254,0,9,3,254,194,9,4,254,246,9,5,255,239,9,6,255,187,9,7,255,63,9,8,253,0,10,4,193,0,10,5,246,0,10,6,239,0,10,7,187,0],
secondary:!1},{width:8,bonus:225,chr:"!",
pixels:[3,1,255,255,3,2,255,255,3,3,255,255,3,4,255,255,3,5,255,255,3,6,255,255,3,7,255,255,3,8,255,255,3,9,255,255,3,10,255,255,3,11,255,255,3,14,155,255,3,15,245,255,3,16,157,255,4,1,255,255,4,2,255,255,4,3,255,255,4,4,255,255,4,5,255,255,4,6,255,255,4,7,255,255,4,8,255,255,4,9,255,255,4,10,255,255,4,11,255,255,4,12,255,0,4,14,243,255,4,15,255,255,4,16,254,246,4,17,157,0,5,2,255,0,5,3,255,0,5,4,255,0,5,5,255,0,5,6,255,0,5,7,255,0,5,8,255,0,5,9,255,0,5,10,255,0,5,11,255,0,5,12,255,0,5,15,252,206,5,16,255,117,5,17,246,0,6,16,204,0],
secondary:!1},{width:19,bonus:910,chr:"@",
pixels:[1,8,209,255,1,9,241,255,1,10,251,255,1,11,239,255,1,12,209,255,2,5,199,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,2,11,255,255,2,12,255,255,2,13,255,255,2,14,255,255,2,15,181,231,3,4,243,255,3,5,255,255,3,6,244,215,3,7,255,117,3,8,255,49,3,9,255,22,3,10,255,4,3,11,255,17,3,12,254,58,3,13,255,133,3,14,255,237,3,15,255,255,3,16,233,212,4,3,243,255,4,4,247,251,4,5,248,106,4,6,255,0,4,7,206,0,4,15,250,202,4,16,255,255,4,17,225,148,5,2,211,255,5,3,252,254,5,4,246,72,5,5,243,0,5,8,191,255,5,9,237,255,5,10,245,255,5,11,215,255,5,16,249,237,5,17,255,241,6,2,255,255,6,3,234,149,6,4,252,0,6,6,175,255,6,7,255,255,6,8,255,255,6,9,255,255,6,10,255,255,6,11,255,255,6,12,255,255,6,13,243,238,6,17,255,255,6,18,245,78,7,1,165,255,7,2,252,254,7,3,255,29,7,6,255,255,7,7,239,216,7,8,255,74,7,9,255,21,7,10,255,7,7,11,255,43,7,12,255,179,7,13,255,255,7,14,240,126,7,17,255,255,7,18,254,126,8,1,217,255,8,2,237,222,8,3,252,0,8,5,211,255,8,6,239,243,8,7,255,14,8,8,202,0,8,13,255,255,8,14,255,148,8,17,255,255,8,18,255,146,9,1,243,255,9,2,243,185,9,3,206,0,9,5,247,255,9,6,240,179,9,7,228,0,9,13,255,255,9,14,255,103,9,17,255,255,9,18,255,143,10,1,245,255,10,2,251,170,10,3,176,0,10,5,235,255,10,6,253,197,10,7,169,0,10,12,205,255,10,13,210,246,10,14,255,9,10,17,255,255,10,18,255,116,11,1,217,255,11,2,253,201,11,3,167,0,11,5,202,255,11,6,255,255,11,7,255,255,11,8,255,255,11,9,255,255,11,10,255,255,11,11,255,255,11,12,217,239,11,13,209,27,11,14,202,0,11,17,255,255,11,18,255,79,12,1,172,255,12,2,254,252,12,3,205,35,12,6,255,255,12,7,255,255,12,8,255,255,12,9,255,255,12,10,255,255,12,11,255,255,12,12,255,255,12,13,249,230,12,17,246,252,12,18,255,9,13,2,255,255,13,3,254,159,13,7,255,0,13,8,255,0,13,9,255,0,13,10,255,0,13,11,255,9,13,12,255,98,13,13,255,255,13,14,241,138,13,17,181,153,13,18,243,0,14,2,218,238,14,3,255,255,14,4,207,159,14,13,255,255,14,14,255,137,15,3,251,241,15,4,255,255,15,5,230,228,15,12,217,255,15,13,255,255,15,14,254,58,16,4,250,202,16,5,255,255,16,6,255,255,16,7,255,255,16,8,255,255,16,9,255,255,16,10,255,255,16,11,255,255,16,12,254,255,16,13,235,128,16,14,255,0,17,5,214,84,17,6,254,164,17,7,255,213,17,8,255,241,17,9,255,245,17,10,255,217,17,11,255,152,17,12,255,45,17,13,254,0,18,7,164,0,18,8,213,0,18,9,241,0,18,10,245,0,18,11,217,0],
secondary:!1},{width:15,bonus:540,chr:"#",
pixels:[1,11,155,255,1,12,255,255,2,7,255,255,2,11,155,255,2,12,255,255,2,13,255,0,3,7,255,255,3,8,255,80,3,11,155,255,3,12,255,255,3,13,255,51,3,16,181,255,4,7,255,255,4,8,255,125,4,9,156,182,4,10,165,255,4,11,233,255,4,12,255,255,4,13,255,255,4,14,255,255,4,15,246,250,4,16,228,218,4,17,182,0,5,5,175,255,5,6,223,255,5,7,255,255,5,8,255,255,5,9,255,255,5,10,235,238,5,11,245,236,5,12,255,255,5,13,255,79,5,14,255,32,5,15,255,0,5,16,241,0,5,17,195,0,6,3,255,255,6,4,252,254,6,5,233,231,6,6,231,198,6,7,255,255,6,8,255,122,6,9,255,17,6,10,255,0,6,11,240,165,6,12,255,255,6,13,255,0,7,4,255,6,7,5,251,0,7,6,217,38,7,7,255,255,7,8,255,80,7,11,155,255,7,12,255,255,7,13,255,0,8,7,255,255,8,8,255,80,8,11,185,255,8,12,255,255,8,13,255,181,8,14,229,255,8,15,255,255,8,16,255,255,9,7,255,255,9,8,254,219,9,9,247,251,9,10,255,255,9,11,255,255,9,12,255,255,9,13,254,201,9,14,226,174,9,15,240,115,9,16,255,62,9,17,255,0,10,3,203,255,10,4,247,255,10,5,255,255,10,6,255,255,10,7,255,255,10,8,255,202,10,9,237,145,10,10,247,87,10,11,255,175,10,12,255,255,10,13,255,0,10,14,200,0,10,15,154,0,11,3,175,255,11,4,230,142,11,5,249,83,11,6,255,63,11,7,255,255,11,8,255,80,11,9,202,0,11,11,188,211,11,12,255,255,11,13,255,0,12,4,175,0,12,7,255,255,12,8,255,80,12,11,155,255,12,12,255,255,12,13,255,0,13,7,255,255,13,8,255,80,13,12,156,0,13,13,255,0,14,8,255,0],
secondary:!1},{width:12,bonus:555,chr:"$",
pixels:[1,5,219,255,1,6,245,255,1,7,202,255,1,14,187,255,1,15,249,255,2,4,253,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,253,2,15,255,255,2,16,252,91,3,3,181,255,3,4,252,254,3,5,254,77,3,6,255,11,3,7,255,109,3,8,255,255,3,9,255,211,3,15,255,255,3,16,255,124,4,3,243,255,4,4,230,184,4,5,251,0,4,8,215,220,4,9,255,255,4,10,221,73,4,15,255,255,4,16,255,146,5,1,255,255,5,2,255,255,5,3,255,255,5,4,255,255,5,5,255,255,5,6,255,255,5,7,255,255,5,8,255,255,5,9,255,255,5,10,255,255,5,11,255,255,5,12,255,255,5,13,255,255,5,14,255,255,5,15,255,255,5,16,255,255,5,17,255,255,5,18,255,255,6,1,255,255,6,2,255,255,6,3,255,255,6,4,255,255,6,5,255,255,6,6,255,255,6,7,255,255,6,8,255,255,6,9,255,255,6,10,255,255,6,11,255,255,6,12,255,255,6,13,255,255,6,14,255,255,6,15,255,255,6,16,255,255,6,17,255,255,6,18,255,255,6,19,255,0,7,2,255,4,7,3,255,253,7,4,255,141,7,5,255,0,7,6,255,0,7,7,255,0,7,8,255,0,7,9,255,209,7,10,255,251,7,11,255,33,7,12,255,0,7,13,255,0,7,14,255,60,7,15,255,255,7,16,255,100,7,17,255,0,7,18,255,0,7,19,255,0,8,3,231,255,8,4,254,188,8,10,255,255,8,11,254,191,8,14,196,255,8,15,253,255,8,16,255,32,9,3,169,255,9,4,254,251,9,5,191,23,9,10,228,234,9,11,255,255,9,12,255,255,9,13,255,255,9,14,255,255,9,15,230,165,9,16,253,0,10,4,200,116,10,5,250,6,10,11,240,187,10,12,254,245,10,13,255,235,10,14,255,142,10,15,255,6,11,12,176,0,11,13,244,0,11,14,235,0],
secondary:!1},{width:12,bonus:235,chr:"^",
pixels:[1,9,159,255,1,10,251,255,2,7,161,255,2,8,251,255,2,9,250,254,2,10,217,183,2,11,251,0,3,5,165,255,3,6,251,255,3,7,245,253,3,8,213,169,3,9,252,27,3,10,249,0,3,11,156,0,4,3,167,255,4,4,253,255,4,5,238,253,4,6,209,154,4,7,252,18,4,8,243,0,5,1,172,255,5,2,253,255,5,3,232,250,5,4,206,139,5,5,253,11,5,6,236,0,6,1,225,255,6,2,255,255,6,3,254,177,6,4,233,59,7,2,237,107,7,3,255,219,7,4,255,255,7,5,206,240,8,4,231,98,8,5,255,211,8,6,255,255,8,7,227,242,9,6,225,89,9,7,255,201,9,8,255,255,9,9,240,245,10,8,216,80,10,9,255,191,10,10,255,255,11,10,205,72,11,11,255,0],
secondary:!1},{width:12,bonus:140,chr:"~",
pixels:[1,9,245,255,2,8,197,255,2,9,230,248,2,10,246,5,3,8,247,255,3,9,234,178,3,10,224,0,4,8,235,255,4,9,254,206,4,10,164,0,5,8,158,255,5,9,255,255,5,10,215,63,6,9,255,255,6,10,255,163,7,9,215,243,7,10,254,239,7,11,163,0,8,9,163,255,8,10,254,250,8,11,238,0,9,9,221,255,9,10,234,215,9,11,249,0,10,9,246,254,10,10,229,62,10,11,198,0,11,10,246,0],
secondary:!1},{width:16,bonus:660,chr:"&",
pixels:[1,11,209,255,1,12,247,255,1,13,237,255,1,14,169,255,2,3,223,255,2,4,245,255,2,5,201,255,2,9,169,255,2,10,255,255,2,11,255,255,2,12,255,255,2,13,255,255,2,14,255,255,2,15,248,242,3,2,255,255,3,3,255,255,3,4,255,255,3,5,255,255,3,6,255,255,3,7,182,206,3,9,255,255,3,10,238,221,3,11,255,59,3,12,255,9,3,13,255,37,3,14,255,175,3,15,255,255,3,16,247,158,4,1,193,255,4,2,252,254,4,3,254,76,4,4,255,9,4,5,255,68,4,6,255,215,4,7,255,255,4,8,255,255,4,9,234,233,4,10,255,13,4,11,206,0,4,15,246,235,4,16,254,225,4,17,153,0,5,1,233,255,5,2,236,194,5,3,251,0,5,7,250,232,5,8,255,255,5,9,254,177,5,10,214,4,5,15,172,252,5,16,254,251,5,17,224,0,6,1,241,255,6,2,248,180,6,3,179,0,6,7,255,255,6,8,254,246,6,9,255,255,6,10,226,182,6,15,169,255,6,16,250,247,6,17,250,0,7,1,202,255,7,2,255,249,7,3,198,94,7,6,241,255,7,7,235,247,7,8,255,33,7,9,253,211,7,10,255,255,7,11,218,181,7,15,219,255,7,16,240,222,7,17,242,0,8,2,255,255,8,3,255,255,8,4,255,255,8,5,255,255,8,6,248,252,8,7,245,65,8,8,228,0,8,10,248,224,8,11,255,255,8,12,212,177,8,15,255,255,8,16,239,148,8,17,209,0,9,2,164,179,9,3,255,225,9,4,255,245,9,5,254,192,9,6,255,55,9,7,246,0,9,11,251,229,9,12,255,255,9,13,210,180,9,14,223,255,9,15,249,254,9,16,255,29,10,4,225,0,10,5,245,0,10,6,192,0,10,12,252,234,10,13,255,255,10,14,255,255,10,15,238,118,10,16,248,0,11,12,224,250,11,13,255,255,11,14,255,255,11,15,254,132,12,10,208,255,12,11,255,255,12,12,254,255,12,13,241,160,12,14,254,234,12,15,255,255,12,16,200,179,13,9,255,255,13,10,255,255,13,11,243,201,13,12,255,60,13,13,254,0,13,14,168,65,13,15,253,235,13,16,255,255,14,10,255,37,14,11,255,0,14,12,191,0,14,16,252,235,14,17,255,0,15,17,232,0],
secondary:!1},{width:13,bonus:285,chr:"*",
pixels:[2,4,205,255,2,5,255,255,3,5,255,255,3,6,255,60,3,9,166,255,4,5,255,255,4,6,255,79,4,8,221,255,4,9,255,255,4,10,224,190,5,5,243,251,5,6,255,187,5,7,251,253,5,8,251,254,5,9,242,173,5,10,255,51,5,11,167,0,6,1,255,255,6,2,255,255,6,3,255,255,6,4,244,255,6,5,250,255,6,6,255,255,6,7,230,179,6,8,249,28,6,9,250,0,6,10,164,0,7,1,205,255,7,2,255,178,7,3,255,151,7,4,255,123,7,5,254,236,7,6,255,253,7,7,254,249,7,8,216,176,8,2,205,0,8,3,178,0,8,4,160,36,8,5,254,255,8,6,243,114,8,7,254,183,8,8,255,255,8,9,252,252,9,5,255,255,9,6,253,70,9,8,216,142,9,9,255,251,9,10,251,115,10,4,163,255,10,5,255,255,10,6,255,51,10,10,251,6,11,4,166,255,11,5,243,232,11,6,255,31,12,5,166,0,12,6,222,0],
secondary:!1},{width:7,bonus:310,chr:"(",
pixels:[1,6,185,255,1,7,217,255,1,8,233,255,1,9,249,255,1,10,247,255,1,11,231,255,1,12,213,255,1,13,178,255,2,2,155,255,2,3,243,255,2,4,255,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,2,11,255,255,2,12,255,255,2,13,255,255,2,14,255,255,2,15,255,255,2,16,242,250,3,0,161,255,3,1,255,255,3,2,255,255,3,3,250,249,3,4,252,180,3,5,254,126,3,6,255,74,3,7,255,39,3,8,255,23,3,9,255,6,3,10,255,9,3,11,255,26,3,12,255,43,3,13,254,82,3,14,255,134,3,15,255,187,3,16,255,249,3,17,255,255,3,18,254,255,3,19,173,229,4,0,255,255,4,1,232,212,4,2,255,95,4,3,255,12,4,4,244,0,4,5,178,0,4,16,191,23,4,17,251,103,4,18,255,197,4,19,255,255,4,20,248,244,5,0,242,73,5,1,255,0,5,2,193,0,5,19,213,87,5,20,255,208,5,21,237,0,6,0,205,0,6,21,208,0],
secondary:!1},{width:8,bonus:310,chr:")",
pixels:[1,20,205,255,2,0,255,255,2,1,213,236,2,18,197,255,2,19,255,255,2,20,242,250,2,21,206,0,3,0,247,160,3,1,254,255,3,2,255,255,3,3,250,253,3,4,190,249,3,15,183,255,3,16,245,255,3,17,255,255,3,18,255,255,3,19,233,176,3,20,255,21,3,21,237,0,4,1,172,67,4,2,254,145,4,3,255,235,4,4,255,255,4,5,255,255,4,6,255,255,4,7,255,255,4,8,255,255,4,9,255,255,4,10,255,255,4,11,255,255,4,12,255,255,4,13,255,255,4,14,255,255,4,15,255,255,4,16,251,245,4,17,252,156,4,18,254,52,4,19,255,0,4,20,161,0,5,4,240,69,5,5,255,119,5,6,255,172,5,7,254,210,5,8,254,228,5,9,255,245,5,10,254,249,5,11,255,231,5,12,254,215,5,13,254,183,5,14,255,127,5,15,255,73,5,16,255,10,5,17,241,0,5,18,154,0,6,7,172,0,6,8,210,0,6,9,228,0,6,10,245,0,6,11,248,0,6,12,231,0,6,13,214,0,6,14,182,0],
secondary:!1},{width:9,bonus:130,chr:"_",
pixels:[0,18,155,255,0,19,255,255,1,18,155,255,1,19,255,255,1,20,255,0,2,18,155,255,2,19,255,255,2,20,255,0,3,18,155,255,3,19,255,255,3,20,255,0,4,18,155,255,4,19,255,255,4,20,255,0,5,18,155,255,5,19,255,255,5,20,255,0,6,18,155,255,6,19,255,255,6,20,255,0,7,18,155,255,7,19,255,255,7,20,255,0,8,18,155,255,8,19,255,255,8,20,255,0],
secondary:!1},{width:7,bonus:80,chr:"-",pixels:[1,9,155,255,1,10,255,255,2,9,155,255,2,10,255,255,2,11,255,0,3,9,155,255,3,10,255,255,3,11,255,0,4,9,155,255,4,10,255,255,4,11,255,0,5,9,155,255,5,10,255,255,5,11,255,0,6,10,156,0,6,11,255,0],
secondary:!0},{width:12,bonus:310,chr:"=",
pixels:[1,7,255,255,1,8,155,255,1,11,155,255,1,12,255,255,2,7,255,255,2,8,254,156,2,9,156,0,2,11,155,255,2,12,255,255,2,13,255,0,3,7,255,255,3,8,254,156,3,9,156,0,3,11,155,255,3,12,255,255,3,13,255,0,4,7,255,255,4,8,254,156,4,9,156,0,4,11,155,255,4,12,255,255,4,13,255,0,5,7,255,255,5,8,254,156,5,9,156,0,5,11,155,255,5,12,255,255,5,13,255,0,6,7,255,255,6,8,254,156,6,9,156,0,6,11,155,255,6,12,255,255,6,13,255,0,7,7,255,255,7,8,254,156,7,9,156,0,7,11,155,255,7,12,255,255,7,13,255,0,8,7,255,255,8,8,254,156,8,9,156,0,8,11,155,255,8,12,255,255,8,13,255,0,9,7,255,255,9,8,254,156,9,9,156,0,9,11,155,255,9,12,255,255,9,13,255,0,10,7,255,255,10,8,254,156,10,9,156,0,10,11,155,255,10,12,255,255,10,13,255,0,11,8,255,0,11,9,156,0,11,12,156,0,11,13,255,0],
secondary:!1},{width:8,bonus:370,chr:"[",
pixels:[2,0,255,255,2,1,255,255,2,2,255,255,2,3,255,255,2,4,255,255,2,5,255,255,2,6,255,255,2,7,255,255,2,8,255,255,2,9,255,255,2,10,255,255,2,11,255,255,2,12,255,255,2,13,255,255,2,14,255,255,2,15,255,255,2,16,255,255,2,17,255,255,2,18,255,255,2,19,255,255,2,20,255,255,3,0,255,255,3,1,255,255,3,2,255,255,3,3,255,255,3,4,255,255,3,5,255,255,3,6,255,255,3,7,255,255,3,8,255,255,3,9,255,255,3,10,255,255,3,11,255,255,3,12,255,255,3,13,255,255,3,14,255,255,3,15,255,255,3,16,255,255,3,17,255,255,3,18,255,255,3,19,255,255,3,20,255,255,3,21,255,0,4,0,254,156,4,1,255,0,4,2,255,0,4,3,255,0,4,4,255,0,4,5,255,0,4,6,255,0,4,7,255,0,4,8,255,0,4,9,255,0,4,10,255,0,4,11,255,0,4,12,255,0,4,13,255,0,4,14,255,0,4,15,255,0,4,16,255,0,4,17,255,0,4,18,255,0,4,19,254,156,4,20,255,255,4,21,255,0,5,0,254,156,5,1,156,0,5,19,155,255,5,20,255,255,5,21,255,0,6,0,255,78,6,1,156,0,6,20,206,159,6,21,255,0],
secondary:!1},{width:8,bonus:370,chr:"]",
pixels:[2,0,205,194,2,19,155,255,2,20,255,255,3,0,254,156,3,1,156,0,3,19,155,255,3,20,255,255,3,21,255,0,4,0,255,255,4,1,255,255,4,2,255,255,4,3,255,255,4,4,255,255,4,5,255,255,4,6,255,255,4,7,255,255,4,8,255,255,4,9,255,255,4,10,255,255,4,11,255,255,4,12,255,255,4,13,255,255,4,14,255,255,4,15,255,255,4,16,255,255,4,17,255,255,4,18,255,255,4,19,255,255,4,20,255,255,4,21,255,0,5,0,255,255,5,1,255,255,5,2,255,255,5,3,255,255,5,4,255,255,5,5,255,255,5,6,255,255,5,7,255,255,5,8,255,255,5,9,255,255,5,10,255,255,5,11,255,255,5,12,255,255,5,13,255,255,5,14,255,255,5,15,255,255,5,16,255,255,5,17,255,255,5,18,255,255,5,19,255,255,5,20,255,255,5,21,255,0,6,0,255,0,6,1,255,0,6,2,255,0,6,3,255,0,6,4,255,0,6,5,255,0,6,6,255,0,6,7,255,0,6,8,255,0,6,9,255,0,6,10,255,0,6,11,255,0,6,12,255,0,6,13,255,0,6,14,255,0,6,15,255,0,6,16,255,0,6,17,255,0,6,18,255,0,6,19,255,0,6,20,255,0,6,21,255,0],
secondary:!1},{width:8,bonus:360,chr:"{",
pixels:[1,9,190,255,1,10,255,255,2,9,253,255,2,10,246,228,2,11,255,167,3,1,235,255,3,2,255,255,3,3,255,255,3,4,255,255,3,5,255,255,3,6,255,255,3,7,255,255,3,8,255,255,3,9,222,237,3,10,254,103,3,11,255,255,3,12,255,255,3,13,255,255,3,14,255,255,3,15,255,255,3,16,255,255,3,17,255,255,3,18,239,255,4,0,255,255,4,1,255,255,4,2,255,255,4,3,255,255,4,4,255,255,4,5,255,255,4,6,255,255,4,7,254,251,4,8,254,198,4,9,255,41,4,10,206,4,4,11,195,202,4,12,255,241,4,13,255,255,4,14,255,255,4,15,255,255,4,16,255,255,4,17,255,255,4,18,255,255,4,19,255,255,4,20,188,149,5,0,244,248,5,1,254,46,5,2,255,1,5,3,255,0,5,4,255,0,5,5,255,0,5,6,255,0,5,7,255,0,5,8,250,0,5,9,198,0,5,12,154,0,5,13,241,0,5,14,255,0,5,15,255,0,5,16,255,0,5,17,255,1,5,18,255,42,5,19,254,234,5,20,255,208,6,0,237,182,6,1,237,0,6,19,181,234,6,20,253,244,6,21,208,0,7,0,240,0,7,1,169,0,7,20,166,0,7,21,242,0],
secondary:!1},{width:8,bonus:360,chr:"}",
pixels:[1,0,167,255,1,19,166,255,1,20,241,255,2,0,254,238,2,1,184,68,2,19,233,255,2,20,238,222,2,21,242,0,3,0,255,255,3,1,255,255,3,2,255,255,3,3,255,255,3,4,255,255,3,5,255,255,3,6,255,255,3,7,249,255,3,8,199,255,3,11,157,255,3,12,241,255,3,13,255,255,3,14,255,255,3,15,255,255,3,16,255,255,3,17,255,255,3,18,255,255,3,19,255,255,3,20,243,114,3,21,207,0,4,0,176,179,4,1,255,235,4,2,255,255,4,3,255,255,4,4,255,255,4,5,255,255,4,6,255,255,4,7,255,255,4,8,255,255,4,9,245,215,4,11,255,255,4,12,255,255,4,13,255,255,4,14,255,255,4,15,255,255,4,16,255,255,4,17,255,255,4,18,255,239,4,19,255,137,4,20,255,1,5,2,235,0,5,3,255,0,5,4,255,0,5,5,255,0,5,6,255,0,5,7,255,8,5,8,255,83,5,9,254,252,5,10,249,226,5,11,202,208,5,12,255,20,5,13,255,0,5,14,255,0,5,15,255,0,5,16,255,0,5,17,255,0,5,18,255,0,5,19,239,0,6,9,210,230,6,10,255,255,6,11,226,39,6,12,165,0,7,10,222,147,7,11,255,3],
secondary:!1},{width:7,bonus:100,chr:":",
pixels:[2,5,160,255,2,6,245,255,2,14,155,255,2,15,245,255,2,16,157,255,3,5,245,255,3,6,255,255,3,7,254,243,3,14,243,255,3,15,255,255,3,16,254,246,3,17,157,0,4,6,253,205,4,7,255,113,4,8,242,0,4,15,252,206,4,16,255,117,4,17,246,0,5,7,203,0,5,16,204,0],
secondary:!0},{width:7,bonus:125,chr:";",
pixels:[1,19,196,255,2,5,160,255,2,6,245,255,2,15,231,255,2,16,255,255,2,17,255,255,2,18,255,255,2,19,237,234,2,20,196,0,3,5,245,255,3,6,255,255,3,7,254,243,3,15,255,255,3,16,255,255,3,17,255,193,3,18,255,85,3,19,255,3,3,20,217,0,4,6,253,205,4,7,255,113,4,8,242,0,4,16,255,38,4,17,255,0,4,18,193,0,5,7,203,0],
secondary:!0},{width:11,bonus:165,chr:'"',
pixels:[3,1,255,255,3,2,255,255,3,3,255,255,3,4,255,255,3,5,255,255,3,6,247,255,4,1,235,255,4,2,254,213,4,3,255,189,4,4,255,165,4,5,255,142,4,6,255,119,4,7,247,0,5,2,235,0,5,3,212,0,5,4,189,0,5,5,165,0,7,1,255,255,7,2,255,255,7,3,255,255,7,4,255,255,7,5,255,255,7,6,255,255,8,1,199,255,8,2,254,177,8,3,255,153,8,4,255,129,8,5,255,106,8,6,255,83,8,7,255,0,9,2,199,0,9,3,176,0,9,4,153,0],
secondary:!0},{width:7,bonus:85,chr:"'",pixels:[3,1,255,255,3,2,255,255,3,3,255,255,3,4,255,255,3,5,255,255,3,6,247,255,4,1,235,255,4,2,254,213,4,3,255,189,4,4,255,165,4,5,255,142,4,6,255,119,4,7,247,0,5,2,235,0,5,3,212,0,5,4,189,0,5,5,165,0],
secondary:!0},{width:12,bonus:235,chr:"<",
pixels:[1,10,239,255,2,9,249,255,2,10,255,255,2,11,246,119,3,8,157,255,3,9,231,251,3,10,252,178,3,11,254,227,4,8,251,255,4,9,199,141,4,10,233,63,4,11,255,255,4,12,237,99,5,7,165,255,5,8,234,252,5,9,252,8,5,11,214,241,5,12,255,207,6,7,253,255,6,8,205,142,6,9,231,0,6,12,255,255,6,13,220,80,7,6,173,255,7,7,237,251,7,8,253,10,7,12,238,246,7,13,255,185,8,6,253,255,8,7,211,144,8,8,233,0,8,13,255,255,8,14,197,59,9,5,181,255,9,6,239,251,9,7,254,12,9,13,251,252,9,14,254,162,10,5,255,255,10,6,216,145,10,7,236,0,10,13,167,243,10,14,254,251,10,15,171,40,11,6,255,0,11,14,159,0,11,15,250,0],
secondary:!1},{width:12,bonus:230,chr:">",
pixels:[1,5,255,255,1,13,159,255,1,14,249,255,2,5,198,233,2,6,254,237,2,13,247,255,2,14,219,188,2,15,250,0,3,6,254,255,3,7,245,123,3,13,255,255,3,14,249,46,3,15,162,0,4,6,189,234,4,7,255,233,4,12,229,255,4,13,219,216,4,14,255,0,5,7,254,254,5,8,242,119,5,12,255,255,5,13,236,75,5,14,185,0,6,7,180,234,6,8,254,231,6,11,201,255,6,12,224,236,6,13,255,0,7,8,254,252,7,9,241,115,7,11,255,255,7,12,221,106,7,13,207,0,8,8,171,234,8,9,255,227,8,10,208,213,8,11,232,248,8,12,255,4,9,9,253,251,9,10,255,255,9,11,210,139,9,12,226,0,10,9,162,235,10,10,254,240,10,11,255,13,11,11,240,0],
secondary:!1},{width:9,bonus:250,chr:"\\",
pixels:[1,0,176,253,2,0,255,255,2,1,255,255,2,2,255,255,2,3,232,250,2,4,161,255,3,0,225,36,3,1,255,99,3,2,255,167,3,3,255,233,3,4,255,255,3,5,255,255,3,6,255,255,3,7,219,251,4,3,167,2,4,4,236,49,4,5,255,112,4,6,254,180,4,7,254,243,4,8,255,255,4,9,255,255,4,10,252,254,4,11,204,251,5,7,181,6,5,8,244,60,5,9,255,125,5,10,255,193,5,11,255,249,5,12,255,255,5,13,255,255,5,14,248,252,5,15,189,252,6,11,195,13,6,12,250,72,6,13,255,139,6,14,254,207,6,15,254,255,6,16,255,255,6,17,255,255,6,18,241,252,6,19,173,255,7,15,209,23,7,16,254,85,7,17,255,152,7,18,255,219,7,19,255,255,7,20,255,255,8,19,223,34,8,20,255,98,8,21,255,0],
secondary:!1},{width:6,bonus:55,chr:".",pixels:[2,14,155,255,2,15,245,255,2,16,157,255,3,14,243,255,3,15,255,255,3,16,254,246,3,17,157,0,4,15,252,206,4,16,255,117,4,17,246,0,5,16,204,0],secondary:!0},{width:6,bonus:80,chr:",",
pixels:[1,17,185,255,1,18,239,255,1,19,255,255,2,15,255,255,2,16,255,255,2,17,255,255,2,18,243,224,2,19,246,102,2,20,255,0,3,15,237,255,3,16,254,162,3,17,255,65,3,18,255,0,3,19,213,0,4,16,237,0,4,17,162,0],secondary:!0},{width:12,bonus:325,chr:"|",
pixels:[5,0,255,255,5,1,255,255,5,2,255,255,5,3,255,255,5,4,255,255,5,5,255,255,5,6,255,255,5,7,255,255,5,8,255,255,5,9,255,255,5,10,255,255,5,11,255,255,5,12,255,255,5,13,255,255,5,14,255,255,5,15,255,255,5,16,255,255,5,17,255,255,5,18,255,255,5,19,255,255,5,20,255,255,6,0,255,255,6,1,255,255,6,2,255,255,6,3,255,255,6,4,255,255,6,5,255,255,6,6,255,255,6,7,255,255,6,8,255,255,6,9,255,255,6,10,255,255,6,11,255,255,6,12,255,255,6,13,255,255,6,14,255,255,6,15,255,255,6,16,255,255,6,17,255,255,6,18,255,255,6,19,255,255,6,20,255,255,6,21,255,0,7,0,255,0,7,1,255,0,7,2,255,0,7,3,255,0,7,4,255,0,7,5,255,0,7,6,255,0,7,7,255,0,7,8,255,0,7,9,255,0,7,10,255,0,7,11,255,0,7,12,255,0,7,13,255,0,7,14,255,0,7,15,255,0,7,16,255,0,7,17,255,0,7,18,255,0,7,19,255,0,7,20,255,0,7,21,255,0],
secondary:!1}],width:20,spacewidth:6,shadow:!0,height:22,basey:16}}],e={},function o(r){var n=e[r];if(void 0!==n)return n.exports;var i=e[r]={exports:{}};return s[r](i,i.exports,o),i.exports}(0);var s,e}));

/***/ }),

/***/ "../node_modules/.pnpm/file-loader@6.2.0_webpack@5.96.1/node_modules/file-loader/dist/cjs.js?name=[name].[ext]!./appconfig.json":
/*!**************************************************************************************************************************************!*\
  !*** ../node_modules/.pnpm/file-loader@6.2.0_webpack@5.96.1/node_modules/file-loader/dist/cjs.js?name=[name].[ext]!./appconfig.json ***!
  \**************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "appconfig.json");

/***/ }),

/***/ "../node_modules/.pnpm/file-loader@6.2.0_webpack@5.96.1/node_modules/file-loader/dist/cjs.js?name=[name].[ext]!./icon.png":
/*!********************************************************************************************************************************!*\
  !*** ../node_modules/.pnpm/file-loader@6.2.0_webpack@5.96.1/node_modules/file-loader/dist/cjs.js?name=[name].[ext]!./icon.png ***!
  \********************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "icon.png");

/***/ }),

/***/ "../node_modules/.pnpm/file-loader@6.2.0_webpack@5.96.1/node_modules/file-loader/dist/cjs.js?name=[name].[ext]!./index.html":
/*!**********************************************************************************************************************************!*\
  !*** ../node_modules/.pnpm/file-loader@6.2.0_webpack@5.96.1/node_modules/file-loader/dist/cjs.js?name=[name].[ext]!./index.html ***!
  \**********************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "index.html");

/***/ }),

/***/ "../node_modules/.pnpm/file-loader@6.2.0_webpack@5.96.1/node_modules/file-loader/dist/cjs.js?name=[name].[ext]!./style.css":
/*!*********************************************************************************************************************************!*\
  !*** ../node_modules/.pnpm/file-loader@6.2.0_webpack@5.96.1/node_modules/file-loader/dist/cjs.js?name=[name].[ext]!./style.css ***!
  \*********************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "style.css");

/***/ }),

/***/ "../node_modules/.pnpm/vue@3.5.12_typescript@5.6.3/node_modules/vue/dist/vue.esm-browser.prod.js":
/*!*******************************************************************************************************!*\
  !*** ../node_modules/.pnpm/vue@3.5.12_typescript@5.6.3/node_modules/vue/dist/vue.esm-browser.prod.js ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BaseTransition: () => (/* binding */ n$),
/* harmony export */   BaseTransitionPropsValidators: () => (/* binding */ nM),
/* harmony export */   Comment: () => (/* binding */ i9),
/* harmony export */   DeprecationTypes: () => (/* binding */ l6),
/* harmony export */   EffectScope: () => (/* binding */ e_),
/* harmony export */   ErrorCodes: () => (/* binding */ t2),
/* harmony export */   ErrorTypeStrings: () => (/* binding */ lX),
/* harmony export */   Fragment: () => (/* binding */ i8),
/* harmony export */   KeepAlive: () => (/* binding */ rl),
/* harmony export */   ReactiveEffect: () => (/* binding */ ek),
/* harmony export */   Static: () => (/* binding */ i7),
/* harmony export */   Suspense: () => (/* binding */ i0),
/* harmony export */   Teleport: () => (/* binding */ nN),
/* harmony export */   Text: () => (/* binding */ i5),
/* harmony export */   TrackOpTypes: () => (/* binding */ tJ),
/* harmony export */   Transition: () => (/* binding */ sr),
/* harmony export */   TransitionGroup: () => (/* binding */ sQ),
/* harmony export */   TriggerOpTypes: () => (/* binding */ tG),
/* harmony export */   VueElement: () => (/* binding */ sj),
/* harmony export */   assertNumber: () => (/* binding */ t1),
/* harmony export */   callWithAsyncErrorHandling: () => (/* binding */ t3),
/* harmony export */   callWithErrorHandling: () => (/* binding */ t6),
/* harmony export */   camelize: () => (/* binding */ q),
/* harmony export */   capitalize: () => (/* binding */ z),
/* harmony export */   cloneVNode: () => (/* binding */ ly),
/* harmony export */   compatUtils: () => (/* binding */ l2),
/* harmony export */   compile: () => (/* binding */ ud),
/* harmony export */   computed: () => (/* binding */ lq),
/* harmony export */   createApp: () => (/* binding */ om),
/* harmony export */   createBlock: () => (/* binding */ la),
/* harmony export */   createCommentVNode: () => (/* binding */ l_),
/* harmony export */   createElementBlock: () => (/* binding */ lo),
/* harmony export */   createElementVNode: () => (/* binding */ lh),
/* harmony export */   createHydrationRenderer: () => (/* binding */ iN),
/* harmony export */   createPropsRestProxy: () => (/* binding */ r0),
/* harmony export */   createRenderer: () => (/* binding */ iw),
/* harmony export */   createSSRApp: () => (/* binding */ og),
/* harmony export */   createSlots: () => (/* binding */ rO),
/* harmony export */   createStaticVNode: () => (/* binding */ lb),
/* harmony export */   createTextVNode: () => (/* binding */ lv),
/* harmony export */   createVNode: () => (/* binding */ lm),
/* harmony export */   customRef: () => (/* binding */ tU),
/* harmony export */   defineAsyncComponent: () => (/* binding */ rn),
/* harmony export */   defineComponent: () => (/* binding */ nq),
/* harmony export */   defineCustomElement: () => (/* binding */ sV),
/* harmony export */   defineEmits: () => (/* binding */ rj),
/* harmony export */   defineExpose: () => (/* binding */ rH),
/* harmony export */   defineModel: () => (/* binding */ rK),
/* harmony export */   defineOptions: () => (/* binding */ rq),
/* harmony export */   defineProps: () => (/* binding */ rU),
/* harmony export */   defineSSRCustomElement: () => (/* binding */ sB),
/* harmony export */   defineSlots: () => (/* binding */ rW),
/* harmony export */   devtools: () => (/* binding */ lZ),
/* harmony export */   effect: () => (/* binding */ eM),
/* harmony export */   effectScope: () => (/* binding */ eS),
/* harmony export */   getCurrentInstance: () => (/* binding */ lR),
/* harmony export */   getCurrentScope: () => (/* binding */ ex),
/* harmony export */   getCurrentWatcher: () => (/* binding */ tZ),
/* harmony export */   getTransitionRawChildren: () => (/* binding */ nH),
/* harmony export */   guardReactiveProps: () => (/* binding */ lg),
/* harmony export */   h: () => (/* binding */ lW),
/* harmony export */   handleError: () => (/* binding */ t4),
/* harmony export */   hasInjectionContext: () => (/* binding */ ia),
/* harmony export */   hydrate: () => (/* binding */ oh),
/* harmony export */   hydrateOnIdle: () => (/* binding */ n5),
/* harmony export */   hydrateOnInteraction: () => (/* binding */ re),
/* harmony export */   hydrateOnMediaQuery: () => (/* binding */ n7),
/* harmony export */   hydrateOnVisible: () => (/* binding */ n9),
/* harmony export */   initCustomFormatter: () => (/* binding */ lK),
/* harmony export */   initDirectivesForSSR: () => (/* binding */ o_),
/* harmony export */   inject: () => (/* binding */ io),
/* harmony export */   isMemoSame: () => (/* binding */ lJ),
/* harmony export */   isProxy: () => (/* binding */ tk),
/* harmony export */   isReactive: () => (/* binding */ tx),
/* harmony export */   isReadonly: () => (/* binding */ tC),
/* harmony export */   isRef: () => (/* binding */ tR),
/* harmony export */   isRuntimeOnly: () => (/* binding */ lF),
/* harmony export */   isShallow: () => (/* binding */ tT),
/* harmony export */   isVNode: () => (/* binding */ lc),
/* harmony export */   markRaw: () => (/* binding */ tN),
/* harmony export */   mergeDefaults: () => (/* binding */ rZ),
/* harmony export */   mergeModels: () => (/* binding */ rY),
/* harmony export */   mergeProps: () => (/* binding */ lT),
/* harmony export */   nextTick: () => (/* binding */ nr),
/* harmony export */   normalizeClass: () => (/* binding */ eo),
/* harmony export */   normalizeProps: () => (/* binding */ ea),
/* harmony export */   normalizeStyle: () => (/* binding */ en),
/* harmony export */   onActivated: () => (/* binding */ ro),
/* harmony export */   onBeforeMount: () => (/* binding */ rh),
/* harmony export */   onBeforeUnmount: () => (/* binding */ rv),
/* harmony export */   onBeforeUpdate: () => (/* binding */ rg),
/* harmony export */   onDeactivated: () => (/* binding */ ra),
/* harmony export */   onErrorCaptured: () => (/* binding */ rC),
/* harmony export */   onMounted: () => (/* binding */ rm),
/* harmony export */   onRenderTracked: () => (/* binding */ rx),
/* harmony export */   onRenderTriggered: () => (/* binding */ rS),
/* harmony export */   onScopeDispose: () => (/* binding */ eC),
/* harmony export */   onServerPrefetch: () => (/* binding */ r_),
/* harmony export */   onUnmounted: () => (/* binding */ rb),
/* harmony export */   onUpdated: () => (/* binding */ ry),
/* harmony export */   onWatcherCleanup: () => (/* binding */ tY),
/* harmony export */   openBlock: () => (/* binding */ ln),
/* harmony export */   popScopeId: () => (/* binding */ nh),
/* harmony export */   provide: () => (/* binding */ is),
/* harmony export */   proxyRefs: () => (/* binding */ tV),
/* harmony export */   pushScopeId: () => (/* binding */ nf),
/* harmony export */   queuePostFlushCb: () => (/* binding */ ns),
/* harmony export */   reactive: () => (/* binding */ ty),
/* harmony export */   readonly: () => (/* binding */ tb),
/* harmony export */   ref: () => (/* binding */ tI),
/* harmony export */   registerRuntimeCompiler: () => (/* binding */ l$),
/* harmony export */   render: () => (/* binding */ of),
/* harmony export */   renderList: () => (/* binding */ rI),
/* harmony export */   renderSlot: () => (/* binding */ rP),
/* harmony export */   resolveComponent: () => (/* binding */ rk),
/* harmony export */   resolveDirective: () => (/* binding */ rE),
/* harmony export */   resolveDynamicComponent: () => (/* binding */ rN),
/* harmony export */   resolveFilter: () => (/* binding */ l1),
/* harmony export */   resolveTransitionHooks: () => (/* binding */ nV),
/* harmony export */   setBlockTracking: () => (/* binding */ ll),
/* harmony export */   setDevtoolsHook: () => (/* binding */ lY),
/* harmony export */   setTransitionHooks: () => (/* binding */ nj),
/* harmony export */   shallowReactive: () => (/* binding */ tv),
/* harmony export */   shallowReadonly: () => (/* binding */ t_),
/* harmony export */   shallowRef: () => (/* binding */ tO),
/* harmony export */   ssrContextKey: () => (/* binding */ iM),
/* harmony export */   ssrUtils: () => (/* binding */ l0),
/* harmony export */   stop: () => (/* binding */ eD),
/* harmony export */   toDisplayString: () => (/* binding */ ey),
/* harmony export */   toHandlerKey: () => (/* binding */ J),
/* harmony export */   toHandlers: () => (/* binding */ rD),
/* harmony export */   toRaw: () => (/* binding */ tw),
/* harmony export */   toRef: () => (/* binding */ tW),
/* harmony export */   toRefs: () => (/* binding */ tj),
/* harmony export */   toValue: () => (/* binding */ t$),
/* harmony export */   transformVNodeArgs: () => (/* binding */ ld),
/* harmony export */   triggerRef: () => (/* binding */ tD),
/* harmony export */   unref: () => (/* binding */ tL),
/* harmony export */   useAttrs: () => (/* binding */ rG),
/* harmony export */   useCssModule: () => (/* binding */ sW),
/* harmony export */   useCssVars: () => (/* binding */ sS),
/* harmony export */   useHost: () => (/* binding */ sH),
/* harmony export */   useId: () => (/* binding */ nW),
/* harmony export */   useModel: () => (/* binding */ iH),
/* harmony export */   useSSRContext: () => (/* binding */ iD),
/* harmony export */   useShadowRoot: () => (/* binding */ sq),
/* harmony export */   useSlots: () => (/* binding */ rJ),
/* harmony export */   useTemplateRef: () => (/* binding */ nz),
/* harmony export */   useTransitionState: () => (/* binding */ nO),
/* harmony export */   vModelCheckbox: () => (/* binding */ s4),
/* harmony export */   vModelDynamic: () => (/* binding */ on),
/* harmony export */   vModelRadio: () => (/* binding */ s5),
/* harmony export */   vModelSelect: () => (/* binding */ s9),
/* harmony export */   vModelText: () => (/* binding */ s3),
/* harmony export */   vShow: () => (/* binding */ sv),
/* harmony export */   version: () => (/* binding */ lG),
/* harmony export */   warn: () => (/* binding */ lQ),
/* harmony export */   watch: () => (/* binding */ iV),
/* harmony export */   watchEffect: () => (/* binding */ iL),
/* harmony export */   watchPostEffect: () => (/* binding */ i$),
/* harmony export */   watchSyncEffect: () => (/* binding */ iF),
/* harmony export */   withAsyncContext: () => (/* binding */ r1),
/* harmony export */   withCtx: () => (/* binding */ ng),
/* harmony export */   withDefaults: () => (/* binding */ rz),
/* harmony export */   withDirectives: () => (/* binding */ ny),
/* harmony export */   withKeys: () => (/* binding */ oc),
/* harmony export */   withMemo: () => (/* binding */ lz),
/* harmony export */   withModifiers: () => (/* binding */ oo),
/* harmony export */   withScopeId: () => (/* binding */ nm)
/* harmony export */ });
/**
* vue v3.5.12
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**//*! #__NO_SIDE_EFFECTS__ */let e,t,n,r,i,l,s,o,a,c,u,d,p;function f(e){let t=/* @__PURE__ */Object.create(null);for(let n of e.split(","))t[n]=1;return e=>e in t}let h={},m=[],g=()=>{},y=()=>!1,b=e=>111===e.charCodeAt(0)&&110===e.charCodeAt(1)&&(e.charCodeAt(2)>122||97>e.charCodeAt(2)),_=e=>e.startsWith("onUpdate:"),S=Object.assign,x=(e,t)=>{let n=e.indexOf(t);n>-1&&e.splice(n,1)},C=Object.prototype.hasOwnProperty,T=(e,t)=>C.call(e,t),k=Array.isArray,w=e=>"[object Map]"===L(e),N=e=>"[object Set]"===L(e),E=e=>"[object Date]"===L(e),A=e=>"[object RegExp]"===L(e),R=e=>"function"==typeof e,I=e=>"string"==typeof e,O=e=>"symbol"==typeof e,P=e=>null!==e&&"object"==typeof e,M=e=>(P(e)||R(e))&&R(e.then)&&R(e.catch),D=Object.prototype.toString,L=e=>D.call(e),$=e=>L(e).slice(8,-1),F=e=>"[object Object]"===L(e),V=e=>I(e)&&"NaN"!==e&&"-"!==e[0]&&""+parseInt(e,10)===e,B=/* @__PURE__ */f(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),U=/* @__PURE__ */f("bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo"),j=e=>{let t=/* @__PURE__ */Object.create(null);return n=>t[n]||(t[n]=e(n))},H=/-(\w)/g,q=j(e=>e.replace(H,(e,t)=>t?t.toUpperCase():"")),W=/\B([A-Z])/g,K=j(e=>e.replace(W,"-$1").toLowerCase()),z=j(e=>e.charAt(0).toUpperCase()+e.slice(1)),J=j(e=>e?`on${z(e)}`:""),G=(e,t)=>!Object.is(e,t),Q=(e,...t)=>{for(let n=0;n<e.length;n++)e[n](...t)},X=(e,t,n,r=!1)=>{Object.defineProperty(e,t,{configurable:!0,enumerable:!1,writable:r,value:n})},Z=e=>{let t=parseFloat(e);return isNaN(t)?e:t},Y=e=>{let t=I(e)?Number(e):NaN;return isNaN(t)?e:t},ee=()=>e||(e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{}),et=/* @__PURE__ */f("Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt,console,Error,Symbol");function en(e){if(k(e)){let t={};for(let n=0;n<e.length;n++){let r=e[n],i=I(r)?es(r):en(r);if(i)for(let e in i)t[e]=i[e]}return t}if(I(e)||P(e))return e}let er=/;(?![^(]*\))/g,ei=/:([^]+)/,el=/\/\*[^]*?\*\//g;function es(e){let t={};return e.replace(el,"").split(er).forEach(e=>{if(e){let n=e.split(ei);n.length>1&&(t[n[0].trim()]=n[1].trim())}}),t}function eo(e){let t="";if(I(e))t=e;else if(k(e))for(let n=0;n<e.length;n++){let r=eo(e[n]);r&&(t+=r+" ")}else if(P(e))for(let n in e)e[n]&&(t+=n+" ");return t.trim()}function ea(e){if(!e)return null;let{class:t,style:n}=e;return t&&!I(t)&&(e.class=eo(t)),n&&(e.style=en(n)),e}let ec=/* @__PURE__ */f("html,body,base,head,link,meta,style,title,address,article,aside,footer,header,hgroup,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot"),eu=/* @__PURE__ */f("svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistantLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view"),ed=/* @__PURE__ */f("annotation,annotation-xml,maction,maligngroup,malignmark,math,menclose,merror,mfenced,mfrac,mfraction,mglyph,mi,mlabeledtr,mlongdiv,mmultiscripts,mn,mo,mover,mpadded,mphantom,mprescripts,mroot,mrow,ms,mscarries,mscarry,msgroup,msline,mspace,msqrt,msrow,mstack,mstyle,msub,msubsup,msup,mtable,mtd,mtext,mtr,munder,munderover,none,semantics"),ep=/* @__PURE__ */f("area,base,br,col,embed,hr,img,input,link,meta,param,source,track,wbr"),ef=/* @__PURE__ */f("itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly");function eh(e,t){if(e===t)return!0;let n=E(e),r=E(t);if(n||r)return!!n&&!!r&&e.getTime()===t.getTime();if(n=O(e),r=O(t),n||r)return e===t;if(n=k(e),r=k(t),n||r)return!!n&&!!r&&function(e,t){if(e.length!==t.length)return!1;let n=!0;for(let r=0;n&&r<e.length;r++)n=eh(e[r],t[r]);return n}(e,t);if(n=P(e),r=P(t),n||r){if(!n||!r||Object.keys(e).length!==Object.keys(t).length)return!1;for(let n in e){let r=e.hasOwnProperty(n),i=t.hasOwnProperty(n);if(r&&!i||!r&&i||!eh(e[n],t[n]))return!1}}return String(e)===String(t)}function em(e,t){return e.findIndex(e=>eh(e,t))}let eg=e=>!!(e&&!0===e.__v_isRef),ey=e=>I(e)?e:null==e?"":k(e)||P(e)&&(e.toString===D||!R(e.toString))?eg(e)?ey(e.value):JSON.stringify(e,ev,2):String(e),ev=(e,t)=>eg(t)?ev(e,t.value):w(t)?{[`Map(${t.size})`]:[...t.entries()].reduce((e,[t,n],r)=>(e[eb(t,r)+" =>"]=n,e),{})}:N(t)?{[`Set(${t.size})`]:[...t.values()].map(e=>eb(e))}:O(t)?eb(t):!P(t)||k(t)||F(t)?t:String(t),eb=(e,t="")=>{var n;return O(e)?`Symbol(${null!=(n=e.description)?n:t})`:e};class e_{constructor(e=!1){this.detached=e,this._active=!0,this.effects=[],this.cleanups=[],this._isPaused=!1,this.parent=t,!e&&t&&(this.index=(t.scopes||(t.scopes=[])).push(this)-1)}get active(){return this._active}pause(){if(this._active){let e,t;if(this._isPaused=!0,this.scopes)for(e=0,t=this.scopes.length;e<t;e++)this.scopes[e].pause();for(e=0,t=this.effects.length;e<t;e++)this.effects[e].pause()}}resume(){if(this._active&&this._isPaused){let e,t;if(this._isPaused=!1,this.scopes)for(e=0,t=this.scopes.length;e<t;e++)this.scopes[e].resume();for(e=0,t=this.effects.length;e<t;e++)this.effects[e].resume()}}run(e){if(this._active){let n=t;try{return t=this,e()}finally{t=n}}}on(){t=this}off(){t=this.parent}stop(e){if(this._active){let t,n;for(t=0,n=this.effects.length;t<n;t++)this.effects[t].stop();for(t=0,n=this.cleanups.length;t<n;t++)this.cleanups[t]();if(this.scopes)for(t=0,n=this.scopes.length;t<n;t++)this.scopes[t].stop(!0);if(!this.detached&&this.parent&&!e){let e=this.parent.scopes.pop();e&&e!==this&&(this.parent.scopes[this.index]=e,e.index=this.index)}this.parent=void 0,this._active=!1}}}function eS(e){return new e_(e)}function ex(){return t}function eC(e,n=!1){t&&t.cleanups.push(e)}let eT=/* @__PURE__ */new WeakSet;class ek{constructor(e){this.fn=e,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,t&&t.active&&t.effects.push(this)}pause(){this.flags|=64}resume(){64&this.flags&&(this.flags&=-65,eT.has(this)&&(eT.delete(this),this.trigger()))}notify(){(!(2&this.flags)||32&this.flags)&&(8&this.flags||eN(this))}run(){if(!(1&this.flags))return this.fn();this.flags|=2,eB(this),eA(this);let e=n,t=eL;n=this,eL=!0;try{return this.fn()}finally{eR(this),n=e,eL=t,this.flags&=-3}}stop(){if(1&this.flags){for(let e=this.deps;e;e=e.nextDep)eP(e);this.deps=this.depsTail=void 0,eB(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){64&this.flags?eT.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){eI(this)&&this.run()}get dirty(){return eI(this)}}let ew=0;function eN(e,t=!1){if(e.flags|=8,t){e.next=i,i=e;return}e.next=r,r=e}function eE(){let e;if(!(--ew>0)){if(i){let e=i;for(i=void 0;e;){let t=e.next;e.next=void 0,e.flags&=-9,e=t}}for(;r;){let t=r;for(r=void 0;t;){let n=t.next;if(t.next=void 0,t.flags&=-9,1&t.flags)try{t.trigger()}catch(t){e||(e=t)}t=n}}if(e)throw e}}function eA(e){for(let t=e.deps;t;t=t.nextDep)t.version=-1,t.prevActiveLink=t.dep.activeLink,t.dep.activeLink=t}function eR(e){let t;let n=e.depsTail,r=n;for(;r;){let e=r.prevDep;-1===r.version?(r===n&&(n=e),eP(r),function(e){let{prevDep:t,nextDep:n}=e;t&&(t.nextDep=n,e.prevDep=void 0),n&&(n.prevDep=t,e.nextDep=void 0)}(r)):t=r,r.dep.activeLink=r.prevActiveLink,r.prevActiveLink=void 0,r=e}e.deps=t,e.depsTail=n}function eI(e){for(let t=e.deps;t;t=t.nextDep)if(t.dep.version!==t.version||t.dep.computed&&(eO(t.dep.computed)||t.dep.version!==t.version))return!0;return!!e._dirty}function eO(e){if(4&e.flags&&!(16&e.flags)||(e.flags&=-17,e.globalVersion===eU))return;e.globalVersion=eU;let t=e.dep;if(e.flags|=2,t.version>0&&!e.isSSR&&e.deps&&!eI(e)){e.flags&=-3;return}let r=n,i=eL;n=e,eL=!0;try{eA(e);let n=e.fn(e._value);(0===t.version||G(n,e._value))&&(e._value=n,t.version++)}catch(e){throw t.version++,e}finally{n=r,eL=i,eR(e),e.flags&=-3}}function eP(e,t=!1){let{dep:n,prevSub:r,nextSub:i}=e;if(r&&(r.nextSub=i,e.prevSub=void 0),i&&(i.prevSub=r,e.nextSub=void 0),n.subs===e&&(n.subs=r,!r&&n.computed)){n.computed.flags&=-5;for(let e=n.computed.deps;e;e=e.nextDep)eP(e,!0)}t||--n.sc||!n.map||n.map.delete(n.key)}function eM(e,t){e.effect instanceof ek&&(e=e.effect.fn);let n=new ek(e);t&&S(n,t);try{n.run()}catch(e){throw n.stop(),e}let r=n.run.bind(n);return r.effect=n,r}function eD(e){e.effect.stop()}let eL=!0,e$=[];function eF(){e$.push(eL),eL=!1}function eV(){let e=e$.pop();eL=void 0===e||e}function eB(e){let{cleanup:t}=e;if(e.cleanup=void 0,t){let e=n;n=void 0;try{t()}finally{n=e}}}let eU=0;class ej{constructor(e,t){this.sub=e,this.dep=t,this.version=t.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class eH{constructor(e){this.computed=e,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0}track(e){if(!n||!eL||n===this.computed)return;let t=this.activeLink;if(void 0===t||t.sub!==n)t=this.activeLink=new ej(n,this),n.deps?(t.prevDep=n.depsTail,n.depsTail.nextDep=t,n.depsTail=t):n.deps=n.depsTail=t,function e(t){if(t.dep.sc++,4&t.sub.flags){let n=t.dep.computed;if(n&&!t.dep.subs){n.flags|=20;for(let t=n.deps;t;t=t.nextDep)e(t)}let r=t.dep.subs;r!==t&&(t.prevSub=r,r&&(r.nextSub=t)),t.dep.subs=t}}(t);else if(-1===t.version&&(t.version=this.version,t.nextDep)){let e=t.nextDep;e.prevDep=t.prevDep,t.prevDep&&(t.prevDep.nextDep=e),t.prevDep=n.depsTail,t.nextDep=void 0,n.depsTail.nextDep=t,n.depsTail=t,n.deps===t&&(n.deps=e)}return t}trigger(e){this.version++,eU++,this.notify(e)}notify(e){ew++;try{for(let e=this.subs;e;e=e.prevSub)e.sub.notify()&&e.sub.dep.notify()}finally{eE()}}}let eq=/* @__PURE__ */new WeakMap,eW=Symbol(""),eK=Symbol(""),ez=Symbol("");function eJ(e,t,r){if(eL&&n){let t=eq.get(e);t||eq.set(e,t=/* @__PURE__ */new Map);let n=t.get(r);n||(t.set(r,n=new eH),n.map=t,n.key=r),n.track()}}function eG(e,t,n,r,i,l){let s=eq.get(e);if(!s){eU++;return}let o=e=>{e&&e.trigger()};if(ew++,"clear"===t)s.forEach(o);else{let i=k(e),l=i&&V(n);if(i&&"length"===n){let e=Number(r);s.forEach((t,n)=>{("length"===n||n===ez||!O(n)&&n>=e)&&o(t)})}else switch((void 0!==n||s.has(void 0))&&o(s.get(n)),l&&o(s.get(ez)),t){case"add":i?l&&o(s.get("length")):(o(s.get(eW)),w(e)&&o(s.get(eK)));break;case"delete":!i&&(o(s.get(eW)),w(e)&&o(s.get(eK)));break;case"set":w(e)&&o(s.get(eW))}}eE()}function eQ(e){let t=tw(e);return t===e?t:(eJ(t,"iterate",ez),tT(e)?t:t.map(tE))}function eX(e){return eJ(e=tw(e),"iterate",ez),e}let eZ={__proto__:null,[Symbol.iterator](){return eY(this,Symbol.iterator,tE)},concat(...e){return eQ(this).concat(...e.map(e=>k(e)?eQ(e):e))},entries(){return eY(this,"entries",e=>(e[1]=tE(e[1]),e))},every(e,t){return e1(this,"every",e,t,void 0,arguments)},filter(e,t){return e1(this,"filter",e,t,e=>e.map(tE),arguments)},find(e,t){return e1(this,"find",e,t,tE,arguments)},findIndex(e,t){return e1(this,"findIndex",e,t,void 0,arguments)},findLast(e,t){return e1(this,"findLast",e,t,tE,arguments)},findLastIndex(e,t){return e1(this,"findLastIndex",e,t,void 0,arguments)},forEach(e,t){return e1(this,"forEach",e,t,void 0,arguments)},includes(...e){return e6(this,"includes",e)},indexOf(...e){return e6(this,"indexOf",e)},join(e){return eQ(this).join(e)},lastIndexOf(...e){return e6(this,"lastIndexOf",e)},map(e,t){return e1(this,"map",e,t,void 0,arguments)},pop(){return e3(this,"pop")},push(...e){return e3(this,"push",e)},reduce(e,...t){return e2(this,"reduce",e,t)},reduceRight(e,...t){return e2(this,"reduceRight",e,t)},shift(){return e3(this,"shift")},some(e,t){return e1(this,"some",e,t,void 0,arguments)},splice(...e){return e3(this,"splice",e)},toReversed(){return eQ(this).toReversed()},toSorted(e){return eQ(this).toSorted(e)},toSpliced(...e){return eQ(this).toSpliced(...e)},unshift(...e){return e3(this,"unshift",e)},values(){return eY(this,"values",tE)}};function eY(e,t,n){let r=eX(e),i=r[t]();return r===e||tT(e)||(i._next=i.next,i.next=()=>{let e=i._next();return e.value&&(e.value=n(e.value)),e}),i}let e0=Array.prototype;function e1(e,t,n,r,i,l){let s=eX(e),o=s!==e&&!tT(e),a=s[t];if(a!==e0[t]){let t=a.apply(e,l);return o?tE(t):t}let c=n;s!==e&&(o?c=function(t,r){return n.call(this,tE(t),r,e)}:n.length>2&&(c=function(t,r){return n.call(this,t,r,e)}));let u=a.call(s,c,r);return o&&i?i(u):u}function e2(e,t,n,r){let i=eX(e),l=n;return i!==e&&(tT(e)?n.length>3&&(l=function(t,r,i){return n.call(this,t,r,i,e)}):l=function(t,r,i){return n.call(this,t,tE(r),i,e)}),i[t](l,...r)}function e6(e,t,n){let r=tw(e);eJ(r,"iterate",ez);let i=r[t](...n);return(-1===i||!1===i)&&tk(n[0])?(n[0]=tw(n[0]),r[t](...n)):i}function e3(e,t,n=[]){eF(),ew++;let r=tw(e)[t].apply(e,n);return eE(),eV(),r}let e4=/* @__PURE__ */f("__proto__,__v_isRef,__isVue"),e8=new Set(/* @__PURE__ */Object.getOwnPropertyNames(Symbol).filter(e=>"arguments"!==e&&"caller"!==e).map(e=>Symbol[e]).filter(O));function e5(e){O(e)||(e=String(e));let t=tw(this);return eJ(t,"has",e),t.hasOwnProperty(e)}class e9{constructor(e=!1,t=!1){this._isReadonly=e,this._isShallow=t}get(e,t,n){let r=this._isReadonly,i=this._isShallow;if("__v_isReactive"===t)return!r;if("__v_isReadonly"===t)return r;if("__v_isShallow"===t)return i;if("__v_raw"===t)return n===(r?i?tg:tm:i?th:tf).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(n)?e:void 0;let l=k(e);if(!r){let e;if(l&&(e=eZ[t]))return e;if("hasOwnProperty"===t)return e5}let s=Reflect.get(e,t,tR(e)?e:n);return(O(t)?e8.has(t):e4(t))?s:(r||eJ(e,"get",t),i)?s:tR(s)?l&&V(t)?s:s.value:P(s)?r?tb(s):ty(s):s}}class e7 extends e9{constructor(e=!1){super(!1,e)}set(e,t,n,r){let i=e[t];if(!this._isShallow){let t=tC(i);if(tT(n)||tC(n)||(i=tw(i),n=tw(n)),!k(e)&&tR(i)&&!tR(n))return!t&&(i.value=n,!0)}let l=k(e)&&V(t)?Number(t)<e.length:T(e,t),s=Reflect.set(e,t,n,tR(e)?e:r);return e===tw(r)&&(l?G(n,i)&&eG(e,"set",t,n):eG(e,"add",t,n)),s}deleteProperty(e,t){let n=T(e,t);e[t];let r=Reflect.deleteProperty(e,t);return r&&n&&eG(e,"delete",t,void 0),r}has(e,t){let n=Reflect.has(e,t);return O(t)&&e8.has(t)||eJ(e,"has",t),n}ownKeys(e){return eJ(e,"iterate",k(e)?"length":eW),Reflect.ownKeys(e)}}class te extends e9{constructor(e=!1){super(!0,e)}set(e,t){return!0}deleteProperty(e,t){return!0}}let tt=/* @__PURE__ */new e7,tn=/* @__PURE__ */new te,tr=/* @__PURE__ */new e7(!0),ti=/* @__PURE__ */new te(!0),tl=e=>e,ts=e=>Reflect.getPrototypeOf(e);function to(e){return function(...t){return"delete"!==e&&("clear"===e?void 0:this)}}function ta(e,t){let n=function(e,t){let n={get(n){let r=this.__v_raw,i=tw(r),l=tw(n);e||(G(n,l)&&eJ(i,"get",n),eJ(i,"get",l));let{has:s}=ts(i),o=t?tl:e?tA:tE;return s.call(i,n)?o(r.get(n)):s.call(i,l)?o(r.get(l)):void(r!==i&&r.get(n))},get size(){let t=this.__v_raw;return e||eJ(tw(t),"iterate",eW),Reflect.get(t,"size",t)},has(t){let n=this.__v_raw,r=tw(n),i=tw(t);return e||(G(t,i)&&eJ(r,"has",t),eJ(r,"has",i)),t===i?n.has(t):n.has(t)||n.has(i)},forEach(n,r){let i=this,l=i.__v_raw,s=tw(l),o=t?tl:e?tA:tE;return e||eJ(s,"iterate",eW),l.forEach((e,t)=>n.call(r,o(e),o(t),i))}};return S(n,e?{add:to("add"),set:to("set"),delete:to("delete"),clear:to("clear")}:{add(e){t||tT(e)||tC(e)||(e=tw(e));let n=tw(this);return ts(n).has.call(n,e)||(n.add(e),eG(n,"add",e,e)),this},set(e,n){t||tT(n)||tC(n)||(n=tw(n));let r=tw(this),{has:i,get:l}=ts(r),s=i.call(r,e);s||(e=tw(e),s=i.call(r,e));let o=l.call(r,e);return r.set(e,n),s?G(n,o)&&eG(r,"set",e,n):eG(r,"add",e,n),this},delete(e){let t=tw(this),{has:n,get:r}=ts(t),i=n.call(t,e);i||(e=tw(e),i=n.call(t,e)),r&&r.call(t,e);let l=t.delete(e);return i&&eG(t,"delete",e,void 0),l},clear(){let e=tw(this),t=0!==e.size,n=e.clear();return t&&eG(e,"clear",void 0,void 0),n}}),["keys","values","entries",Symbol.iterator].forEach(r=>{n[r]=function(...n){let i=this.__v_raw,l=tw(i),s=w(l),o="entries"===r||r===Symbol.iterator&&s,a=i[r](...n),c=t?tl:e?tA:tE;return e||eJ(l,"iterate","keys"===r&&s?eK:eW),{next(){let{value:e,done:t}=a.next();return t?{value:e,done:t}:{value:o?[c(e[0]),c(e[1])]:c(e),done:t}},[Symbol.iterator](){return this}}}}),n}(e,t);return(t,r,i)=>"__v_isReactive"===r?!e:"__v_isReadonly"===r?e:"__v_raw"===r?t:Reflect.get(T(n,r)&&r in t?n:t,r,i)}let tc={get:/* @__PURE__ */ta(!1,!1)},tu={get:/* @__PURE__ */ta(!1,!0)},td={get:/* @__PURE__ */ta(!0,!1)},tp={get:/* @__PURE__ */ta(!0,!0)},tf=/* @__PURE__ */new WeakMap,th=/* @__PURE__ */new WeakMap,tm=/* @__PURE__ */new WeakMap,tg=/* @__PURE__ */new WeakMap;function ty(e){return tC(e)?e:tS(e,!1,tt,tc,tf)}function tv(e){return tS(e,!1,tr,tu,th)}function tb(e){return tS(e,!0,tn,td,tm)}function t_(e){return tS(e,!0,ti,tp,tg)}function tS(e,t,n,r,i){if(!P(e)||e.__v_raw&&!(t&&e.__v_isReactive))return e;let l=i.get(e);if(l)return l;let s=e.__v_skip||!Object.isExtensible(e)?0:function(e){switch(e){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}($(e));if(0===s)return e;let o=new Proxy(e,2===s?r:n);return i.set(e,o),o}function tx(e){return tC(e)?tx(e.__v_raw):!!(e&&e.__v_isReactive)}function tC(e){return!!(e&&e.__v_isReadonly)}function tT(e){return!!(e&&e.__v_isShallow)}function tk(e){return!!e&&!!e.__v_raw}function tw(e){let t=e&&e.__v_raw;return t?tw(t):e}function tN(e){return!T(e,"__v_skip")&&Object.isExtensible(e)&&X(e,"__v_skip",!0),e}let tE=e=>P(e)?ty(e):e,tA=e=>P(e)?tb(e):e;function tR(e){return!!e&&!0===e.__v_isRef}function tI(e){return tP(e,!1)}function tO(e){return tP(e,!0)}function tP(e,t){return tR(e)?e:new tM(e,t)}class tM{constructor(e,t){this.dep=new eH,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=t?e:tw(e),this._value=t?e:tE(e),this.__v_isShallow=t}get value(){return this.dep.track(),this._value}set value(e){let t=this._rawValue,n=this.__v_isShallow||tT(e)||tC(e);G(e=n?e:tw(e),t)&&(this._rawValue=e,this._value=n?e:tE(e),this.dep.trigger())}}function tD(e){e.dep&&e.dep.trigger()}function tL(e){return tR(e)?e.value:e}function t$(e){return R(e)?e():tL(e)}let tF={get:(e,t,n)=>"__v_raw"===t?e:tL(Reflect.get(e,t,n)),set:(e,t,n,r)=>{let i=e[t];return tR(i)&&!tR(n)?(i.value=n,!0):Reflect.set(e,t,n,r)}};function tV(e){return tx(e)?e:new Proxy(e,tF)}class tB{constructor(e){this.__v_isRef=!0,this._value=void 0;let t=this.dep=new eH,{get:n,set:r}=e(t.track.bind(t),t.trigger.bind(t));this._get=n,this._set=r}get value(){return this._value=this._get()}set value(e){this._set(e)}}function tU(e){return new tB(e)}function tj(e){let t=k(e)?Array(e.length):{};for(let n in e)t[n]=tK(e,n);return t}class tH{constructor(e,t,n){this._object=e,this._key=t,this._defaultValue=n,this.__v_isRef=!0,this._value=void 0}get value(){let e=this._object[this._key];return this._value=void 0===e?this._defaultValue:e}set value(e){this._object[this._key]=e}get dep(){return function(e,t){let n=eq.get(e);return n&&n.get(t)}(tw(this._object),this._key)}}class tq{constructor(e){this._getter=e,this.__v_isRef=!0,this.__v_isReadonly=!0,this._value=void 0}get value(){return this._value=this._getter()}}function tW(e,t,n){return tR(e)?e:R(e)?new tq(e):P(e)&&arguments.length>1?tK(e,t,n):tI(e)}function tK(e,t,n){let r=e[t];return tR(r)?r:new tH(e,t,n)}class tz{constructor(e,t,n){this.fn=e,this.setter=t,this._value=void 0,this.dep=new eH(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=eU-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!t,this.isSSR=n}notify(){if(this.flags|=16,!(8&this.flags)&&n!==this)return eN(this,!0),!0}get value(){let e=this.dep.track();return eO(this),e&&(e.version=this.dep.version),this._value}set value(e){this.setter&&this.setter(e)}}let tJ={GET:"get",HAS:"has",ITERATE:"iterate"},tG={SET:"set",ADD:"add",DELETE:"delete",CLEAR:"clear"},tQ={},tX=/* @__PURE__ */new WeakMap;function tZ(){return d}function tY(e,t=!1,n=d){if(n){let t=tX.get(n);t||tX.set(n,t=[]),t.push(e)}}function t0(e,t=1/0,n){if(t<=0||!P(e)||e.__v_skip||(n=n||/* @__PURE__ */new Set).has(e))return e;if(n.add(e),t--,tR(e))t0(e.value,t,n);else if(k(e))for(let r=0;r<e.length;r++)t0(e[r],t,n);else if(N(e)||w(e))e.forEach(e=>{t0(e,t,n)});else if(F(e)){for(let r in e)t0(e[r],t,n);for(let r of Object.getOwnPropertySymbols(e))Object.prototype.propertyIsEnumerable.call(e,r)&&t0(e[r],t,n)}return e}function t1(e,t){}let t2={SETUP_FUNCTION:0,0:"SETUP_FUNCTION",RENDER_FUNCTION:1,1:"RENDER_FUNCTION",NATIVE_EVENT_HANDLER:5,5:"NATIVE_EVENT_HANDLER",COMPONENT_EVENT_HANDLER:6,6:"COMPONENT_EVENT_HANDLER",VNODE_HOOK:7,7:"VNODE_HOOK",DIRECTIVE_HOOK:8,8:"DIRECTIVE_HOOK",TRANSITION_HOOK:9,9:"TRANSITION_HOOK",APP_ERROR_HANDLER:10,10:"APP_ERROR_HANDLER",APP_WARN_HANDLER:11,11:"APP_WARN_HANDLER",FUNCTION_REF:12,12:"FUNCTION_REF",ASYNC_COMPONENT_LOADER:13,13:"ASYNC_COMPONENT_LOADER",SCHEDULER:14,14:"SCHEDULER",COMPONENT_UPDATE:15,15:"COMPONENT_UPDATE",APP_UNMOUNT_CLEANUP:16,16:"APP_UNMOUNT_CLEANUP"};function t6(e,t,n,r){try{return r?e(...r):e()}catch(e){t4(e,t,n)}}function t3(e,t,n,r){if(R(e)){let i=t6(e,t,n,r);return i&&M(i)&&i.catch(e=>{t4(e,t,n)}),i}if(k(e)){let i=[];for(let l=0;l<e.length;l++)i.push(t3(e[l],t,n,r));return i}}function t4(e,t,n,r=!0){t&&t.vnode;let{errorHandler:i,throwUnhandledErrorInProduction:l}=t&&t.appContext.config||h;if(t){let r=t.parent,l=t.proxy,s=`https://vuejs.org/error-reference/#runtime-${n}`;for(;r;){let t=r.ec;if(t){for(let n=0;n<t.length;n++)if(!1===t[n](e,l,s))return}r=r.parent}if(i){eF(),t6(i,null,10,[e,l,s]),eV();return}}!function(e,t,n,r=!0,i=!1){if(i)throw e;console.error(e)}(e,0,0,r,l)}let t8=[],t5=-1,t9=[],t7=null,ne=0,nt=/* @__PURE__ */Promise.resolve(),nn=null;function nr(e){let t=nn||nt;return e?t.then(this?e.bind(this):e):t}function ni(e){if(!(1&e.flags)){let t=nc(e),n=t8[t8.length-1];!n||!(2&e.flags)&&t>=nc(n)?t8.push(e):t8.splice(function(e){let t=t5+1,n=t8.length;for(;t<n;){let r=t+n>>>1,i=t8[r],l=nc(i);l<e||l===e&&2&i.flags?t=r+1:n=r}return t}(t),0,e),e.flags|=1,nl()}}function nl(){nn||(nn=nt.then(function e(t){try{for(t5=0;t5<t8.length;t5++){let e=t8[t5];!e||8&e.flags||(4&e.flags&&(e.flags&=-2),t6(e,e.i,e.i?15:14),4&e.flags||(e.flags&=-2))}}finally{for(;t5<t8.length;t5++){let e=t8[t5];e&&(e.flags&=-2)}t5=-1,t8.length=0,na(),nn=null,(t8.length||t9.length)&&e()}}))}function ns(e){k(e)?t9.push(...e):t7&&-1===e.id?t7.splice(ne+1,0,e):1&e.flags||(t9.push(e),e.flags|=1),nl()}function no(e,t,n=t5+1){for(;n<t8.length;n++){let t=t8[n];if(t&&2&t.flags){if(e&&t.id!==e.uid)continue;t8.splice(n,1),n--,4&t.flags&&(t.flags&=-2),t(),4&t.flags||(t.flags&=-2)}}}function na(e){if(t9.length){let e=[...new Set(t9)].sort((e,t)=>nc(e)-nc(t));if(t9.length=0,t7){t7.push(...e);return}for(ne=0,t7=e;ne<t7.length;ne++){let e=t7[ne];4&e.flags&&(e.flags&=-2),8&e.flags||e(),e.flags&=-2}t7=null,ne=0}}let nc=e=>null==e.id?2&e.flags?-1:1/0:e.id,nu=null,nd=null;function np(e){let t=nu;return nu=e,nd=e&&e.type.__scopeId||null,t}function nf(e){nd=e}function nh(){nd=null}let nm=e=>ng;function ng(e,t=nu,n){if(!t||e._n)return e;let r=(...n)=>{let i;r._d&&ll(-1);let l=np(t);try{i=e(...n)}finally{np(l),r._d&&ll(1)}return i};return r._n=!0,r._c=!0,r._d=!0,r}function ny(e,t){if(null===nu)return e;let n=lj(nu),r=e.dirs||(e.dirs=[]);for(let e=0;e<t.length;e++){let[i,l,s,o=h]=t[e];i&&(R(i)&&(i={mounted:i,updated:i}),i.deep&&t0(l),r.push({dir:i,instance:n,value:l,oldValue:void 0,arg:s,modifiers:o}))}return e}function nv(e,t,n,r){let i=e.dirs,l=t&&t.dirs;for(let s=0;s<i.length;s++){let o=i[s];l&&(o.oldValue=l[s].value);let a=o.dir[r];a&&(eF(),t3(a,n,8,[e.el,o,e,t]),eV())}}let nb=Symbol("_vte"),n_=e=>e.__isTeleport,nS=e=>e&&(e.disabled||""===e.disabled),nx=e=>e&&(e.defer||""===e.defer),nC=e=>"undefined"!=typeof SVGElement&&e instanceof SVGElement,nT=e=>"function"==typeof MathMLElement&&e instanceof MathMLElement,nk=(e,t)=>{let n=e&&e.to;return I(n)?t?t(n):null:n};function nw(e,t,n,{o:{insert:r},m:i},l=2){0===l&&r(e.targetAnchor,t,n);let{el:s,anchor:o,shapeFlag:a,children:c,props:u}=e,d=2===l;if(d&&r(s,t,n),(!d||nS(u))&&16&a)for(let e=0;e<c.length;e++)i(c[e],t,n,2);d&&r(o,t,n)}let nN={name:"Teleport",__isTeleport:!0,process(e,t,n,r,i,l,s,o,a,c){let{mc:u,pc:d,pbc:p,o:{insert:f,querySelector:h,createText:m,createComment:g}}=c,y=nS(t.props),{shapeFlag:b,children:_,dynamicChildren:S}=t;if(null==e){let e=t.el=m(""),c=t.anchor=m("");f(e,n,r),f(c,n,r);let d=(e,t)=>{16&b&&(i&&i.isCE&&(i.ce._teleportTarget=e),u(_,e,t,i,l,s,o,a))},p=()=>{let e=t.target=nk(t.props,h),n=nA(e,t,m,f);e&&("svg"!==s&&nC(e)?s="svg":"mathml"!==s&&nT(e)&&(s="mathml"),y||(d(e,n),nE(t,!1)))};y&&(d(n,c),nE(t,!0)),nx(t.props)?ik(p,l):p()}else{t.el=e.el,t.targetStart=e.targetStart;let r=t.anchor=e.anchor,u=t.target=e.target,f=t.targetAnchor=e.targetAnchor,m=nS(e.props),g=m?n:u;if("svg"===s||nC(u)?s="svg":("mathml"===s||nT(u))&&(s="mathml"),S?(p(e.dynamicChildren,S,g,i,l,s,o),iO(e,t,!0)):a||d(e,t,g,m?r:f,i,l,s,o,!1),y)m?t.props&&e.props&&t.props.to!==e.props.to&&(t.props.to=e.props.to):nw(t,n,r,c,1);else if((t.props&&t.props.to)!==(e.props&&e.props.to)){let e=t.target=nk(t.props,h);e&&nw(t,e,null,c,0)}else m&&nw(t,u,f,c,1);nE(t,y)}},remove(e,t,n,{um:r,o:{remove:i}},l){let{shapeFlag:s,children:o,anchor:a,targetStart:c,targetAnchor:u,target:d,props:p}=e;if(d&&(i(c),i(u)),l&&i(a),16&s){let e=l||!nS(p);for(let i=0;i<o.length;i++){let l=o[i];r(l,t,n,e,!!l.dynamicChildren)}}},move:nw,hydrate:function(e,t,n,r,i,l,{o:{nextSibling:s,parentNode:o,querySelector:a,insert:c,createText:u}},d){let p=t.target=nk(t.props,a);if(p){let a=nS(t.props),f=p._lpa||p.firstChild;if(16&t.shapeFlag){if(a)t.anchor=d(s(e),t,o(e),n,r,i,l),t.targetStart=f,t.targetAnchor=f&&s(f);else{t.anchor=s(e);let o=f;for(;o;){if(o&&8===o.nodeType){if("teleport start anchor"===o.data)t.targetStart=o;else if("teleport anchor"===o.data){t.targetAnchor=o,p._lpa=t.targetAnchor&&s(t.targetAnchor);break}}o=s(o)}t.targetAnchor||nA(p,t,u,c),d(f&&s(f),t,p,n,r,i,l)}}nE(t,a)}return t.anchor&&s(t.anchor)}};function nE(e,t){let n=e.ctx;if(n&&n.ut){let r,i;for(t?(r=e.el,i=e.anchor):(r=e.targetStart,i=e.targetAnchor);r&&r!==i;)1===r.nodeType&&r.setAttribute("data-v-owner",n.uid),r=r.nextSibling;n.ut()}}function nA(e,t,n,r){let i=t.targetStart=n(""),l=t.targetAnchor=n("");return i[nb]=l,e&&(r(i,e),r(l,e)),l}let nR=Symbol("_leaveCb"),nI=Symbol("_enterCb");function nO(){let e={isMounted:!1,isLeaving:!1,isUnmounting:!1,leavingVNodes:/* @__PURE__ */new Map};return rm(()=>{e.isMounted=!0}),rv(()=>{e.isUnmounting=!0}),e}let nP=[Function,Array],nM={mode:String,appear:Boolean,persisted:Boolean,onBeforeEnter:nP,onEnter:nP,onAfterEnter:nP,onEnterCancelled:nP,onBeforeLeave:nP,onLeave:nP,onAfterLeave:nP,onLeaveCancelled:nP,onBeforeAppear:nP,onAppear:nP,onAfterAppear:nP,onAppearCancelled:nP},nD=e=>{let t=e.subTree;return t.component?nD(t.component):t};function nL(e){let t=e[0];if(e.length>1){for(let n of e)if(n.type!==i9){t=n;break}}return t}let n$={name:"BaseTransition",props:nM,setup(e,{slots:t}){let n=lR(),r=nO();return()=>{let i=t.default&&nH(t.default(),!0);if(!i||!i.length)return;let l=nL(i),s=tw(e),{mode:o}=s;if(r.isLeaving)return nB(l);let a=nU(l);if(!a)return nB(l);let c=nV(a,s,r,n,e=>c=e);a.type!==i9&&nj(a,c);let u=n.subTree,d=u&&nU(u);if(d&&d.type!==i9&&!lu(a,d)&&nD(n).type!==i9){let e=nV(d,s,r,n);if(nj(d,e),"out-in"===o&&a.type!==i9)return r.isLeaving=!0,e.afterLeave=()=>{r.isLeaving=!1,8&n.job.flags||n.update(),delete e.afterLeave},nB(l);"in-out"===o&&a.type!==i9&&(e.delayLeave=(e,t,n)=>{nF(r,d)[String(d.key)]=d,e[nR]=()=>{t(),e[nR]=void 0,delete c.delayedLeave},c.delayedLeave=n})}return l}}};function nF(e,t){let{leavingVNodes:n}=e,r=n.get(t.type);return r||(r=/* @__PURE__ */Object.create(null),n.set(t.type,r)),r}function nV(e,t,n,r,i){let{appear:l,mode:s,persisted:o=!1,onBeforeEnter:a,onEnter:c,onAfterEnter:u,onEnterCancelled:d,onBeforeLeave:p,onLeave:f,onAfterLeave:h,onLeaveCancelled:m,onBeforeAppear:g,onAppear:y,onAfterAppear:b,onAppearCancelled:_}=t,S=String(e.key),x=nF(n,e),C=(e,t)=>{e&&t3(e,r,9,t)},T=(e,t)=>{let n=t[1];C(e,t),k(e)?e.every(e=>e.length<=1)&&n():e.length<=1&&n()},w={mode:s,persisted:o,beforeEnter(t){let r=a;if(!n.isMounted){if(!l)return;r=g||a}t[nR]&&t[nR](!0);let i=x[S];i&&lu(e,i)&&i.el[nR]&&i.el[nR](),C(r,[t])},enter(e){let t=c,r=u,i=d;if(!n.isMounted){if(!l)return;t=y||c,r=b||u,i=_||d}let s=!1,o=e[nI]=t=>{s||(s=!0,t?C(i,[e]):C(r,[e]),w.delayedLeave&&w.delayedLeave(),e[nI]=void 0)};t?T(t,[e,o]):o()},leave(t,r){let i=String(e.key);if(t[nI]&&t[nI](!0),n.isUnmounting)return r();C(p,[t]);let l=!1,s=t[nR]=n=>{l||(l=!0,r(),n?C(m,[t]):C(h,[t]),t[nR]=void 0,x[i]!==e||delete x[i])};x[i]=e,f?T(f,[t,s]):s()},clone(e){let l=nV(e,t,n,r,i);return i&&i(l),l}};return w}function nB(e){if(ri(e))return(e=ly(e)).children=null,e}function nU(e){if(!ri(e))return n_(e.type)&&e.children?nL(e.children):e;let{shapeFlag:t,children:n}=e;if(n){if(16&t)return n[0];if(32&t&&R(n.default))return n.default()}}function nj(e,t){6&e.shapeFlag&&e.component?(e.transition=t,nj(e.component.subTree,t)):128&e.shapeFlag?(e.ssContent.transition=t.clone(e.ssContent),e.ssFallback.transition=t.clone(e.ssFallback)):e.transition=t}function nH(e,t=!1,n){let r=[],i=0;for(let l=0;l<e.length;l++){let s=e[l],o=null==n?s.key:String(n)+String(null!=s.key?s.key:l);s.type===i8?(128&s.patchFlag&&i++,r=r.concat(nH(s.children,t,o))):(t||s.type!==i9)&&r.push(null!=o?ly(s,{key:o}):s)}if(i>1)for(let e=0;e<r.length;e++)r[e].patchFlag=-2;return r}/*! #__NO_SIDE_EFFECTS__ */function nq(e,t){return R(e)?S({name:e.name},t,{setup:e}):e}function nW(){let e=lR();return e?(e.appContext.config.idPrefix||"v")+"-"+e.ids[0]+e.ids[1]++:""}function nK(e){e.ids=[e.ids[0]+e.ids[2]+++"-",0,0]}function nz(e){let t=lR(),n=tO(null);return t&&Object.defineProperty(t.refs===h?t.refs={}:t.refs,e,{enumerable:!0,get:()=>n.value,set:e=>n.value=e}),n}function nJ(e,t,n,r,i=!1){if(k(e)){e.forEach((e,l)=>nJ(e,t&&(k(t)?t[l]:t),n,r,i));return}if(rt(r)&&!i)return;let l=4&r.shapeFlag?lj(r.component):r.el,s=i?null:l,{i:o,r:a}=e,c=t&&t.r,u=o.refs===h?o.refs={}:o.refs,d=o.setupState,p=tw(d),f=d===h?()=>!1:e=>T(p,e);if(null!=c&&c!==a&&(I(c)?(u[c]=null,f(c)&&(d[c]=null)):tR(c)&&(c.value=null)),R(a))t6(a,o,12,[s,u]);else{let t=I(a),r=tR(a);if(t||r){let o=()=>{if(e.f){let n=t?f(a)?d[a]:u[a]:a.value;i?k(n)&&x(n,l):k(n)?n.includes(l)||n.push(l):t?(u[a]=[l],f(a)&&(d[a]=u[a])):(a.value=[l],e.k&&(u[e.k]=a.value))}else t?(u[a]=s,f(a)&&(d[a]=s)):r&&(a.value=s,e.k&&(u[e.k]=s))};s?(o.id=-1,ik(o,n)):o()}}}let nG=!1,nQ=()=>{nG||(console.error("Hydration completed but contains mismatches."),nG=!0)},nX=e=>e.namespaceURI.includes("svg")&&"foreignObject"!==e.tagName,nZ=e=>e.namespaceURI.includes("MathML"),nY=e=>{if(1===e.nodeType){if(nX(e))return"svg";if(nZ(e))return"mathml"}},n0=e=>8===e.nodeType;function n1(e){let{mt:t,p:n,o:{patchProp:r,createText:i,nextSibling:l,parentNode:s,remove:o,insert:a,createComment:c}}=e,u=(n,r,o,c,b,_=!1)=>{_=_||!!r.dynamicChildren;let S=n0(n)&&"["===n.data,x=()=>h(n,r,o,c,b,S),{type:C,ref:T,shapeFlag:k,patchFlag:w}=r,N=n.nodeType;r.el=n,-2===w&&(_=!1,r.dynamicChildren=null);let E=null;switch(C){case i5:3!==N?""===r.children?(a(r.el=i(""),s(n),n),E=n):E=x():(n.data!==r.children&&(nQ(),n.data=r.children),E=l(n));break;case i9:y(n)?(E=l(n),g(r.el=n.content.firstChild,n,o)):E=8!==N||S?x():l(n);break;case i7:if(S&&(N=(n=l(n)).nodeType),1===N||3===N){E=n;let e=!r.children.length;for(let t=0;t<r.staticCount;t++)e&&(r.children+=1===E.nodeType?E.outerHTML:E.data),t===r.staticCount-1&&(r.anchor=E),E=l(E);return S?l(E):E}x();break;case i8:E=S?f(n,r,o,c,b,_):x();break;default:if(1&k)E=1===N&&r.type.toLowerCase()===n.tagName.toLowerCase()||y(n)?d(n,r,o,c,b,_):x();else if(6&k){r.slotScopeIds=b;let e=s(n);if(E=S?m(n):n0(n)&&"teleport start"===n.data?m(n,n.data,"teleport end"):l(n),t(r,e,null,o,c,nY(e),_),rt(r)){let t;S?(t=lm(i8)).anchor=E?E.previousSibling:e.lastChild:t=3===n.nodeType?lv(""):lm("div"),t.el=n,r.component.subTree=t}}else 64&k?E=8!==N?x():r.type.hydrate(n,r,o,c,b,_,e,p):128&k&&(E=r.type.hydrate(n,r,o,c,nY(s(n)),b,_,e,u))}return null!=T&&nJ(T,null,c,r),E},d=(e,t,n,i,l,s)=>{s=s||!!t.dynamicChildren;let{type:a,props:c,patchFlag:u,shapeFlag:d,dirs:f,transition:h}=t,m="input"===a||"option"===a;if(m||-1!==u){let a;f&&nv(t,null,n,"created");let _=!1;if(y(e)){_=iI(null,h)&&n&&n.vnode.props&&n.vnode.props.appear;let r=e.content.firstChild;_&&h.beforeEnter(r),g(r,e,n),t.el=e=r}if(16&d&&!(c&&(c.innerHTML||c.textContent))){let r=p(e.firstChild,t,e,n,i,l,s);for(;r;){n3(e,1)||nQ();let t=r;r=r.nextSibling,o(t)}}else if(8&d){let n=t.children;"\n"===n[0]&&("PRE"===e.tagName||"TEXTAREA"===e.tagName)&&(n=n.slice(1)),e.textContent!==n&&(n3(e,0)||nQ(),e.textContent=t.children)}if(c){if(m||!s||48&u){let t=e.tagName.includes("-");for(let i in c)(m&&(i.endsWith("value")||"indeterminate"===i)||b(i)&&!B(i)||"."===i[0]||t)&&r(e,i,null,c[i],void 0,n)}else if(c.onClick)r(e,"onClick",null,c.onClick,void 0,n);else if(4&u&&tx(c.style))for(let e in c.style)c.style[e]}(a=c&&c.onVnodeBeforeMount)&&lk(a,n,t),f&&nv(t,null,n,"beforeMount"),((a=c&&c.onVnodeMounted)||f||_)&&i3(()=>{a&&lk(a,n,t),_&&h.enter(e),f&&nv(t,null,n,"mounted")},i)}return e.nextSibling},p=(e,t,r,s,o,c,d)=>{d=d||!!t.dynamicChildren;let p=t.children,f=p.length;for(let t=0;t<f;t++){let h=d?p[t]:p[t]=lS(p[t]),m=h.type===i5;e?(m&&!d&&t+1<f&&lS(p[t+1]).type===i5&&(a(i(e.data.slice(h.children.length)),r,l(e)),e.data=h.children),e=u(e,h,s,o,c,d)):m&&!h.children?a(h.el=i(""),r):(n3(r,1)||nQ(),n(null,h,r,null,s,o,nY(r),c))}return e},f=(e,t,n,r,i,o)=>{let{slotScopeIds:u}=t;u&&(i=i?i.concat(u):u);let d=s(e),f=p(l(e),t,d,n,r,i,o);return f&&n0(f)&&"]"===f.data?l(t.anchor=f):(nQ(),a(t.anchor=c("]"),d,f),f)},h=(e,t,r,i,a,c)=>{if(n3(e.parentElement,1)||nQ(),t.el=null,c){let t=m(e);for(;;){let n=l(e);if(n&&n!==t)o(n);else break}}let u=l(e),d=s(e);return o(e),n(null,t,d,u,r,i,nY(d),a),u},m=(e,t="[",n="]")=>{let r=0;for(;e;)if((e=l(e))&&n0(e)&&(e.data===t&&r++,e.data===n)){if(0===r)return l(e);r--}return e},g=(e,t,n)=>{let r=t.parentNode;r&&r.replaceChild(e,t);let i=n;for(;i;)i.vnode.el===t&&(i.vnode.el=i.subTree.el=e),i=i.parent},y=e=>1===e.nodeType&&"TEMPLATE"===e.tagName;return[(e,t)=>{if(!t.hasChildNodes()){n(null,e,t),na(),t._vnode=e;return}u(t.firstChild,e,null,null,null),na(),t._vnode=e},u]}let n2="data-allow-mismatch",n6={0:"text",1:"children",2:"class",3:"style",4:"attribute"};function n3(e,t){if(0===t||1===t)for(;e&&!e.hasAttribute(n2);)e=e.parentElement;let n=e&&e.getAttribute(n2);if(null==n)return!1;if(""===n)return!0;{let e=n.split(",");return!!(0===t&&e.includes("children"))||n.split(",").includes(n6[t])}}let n4=ee().requestIdleCallback||(e=>setTimeout(e,1)),n8=ee().cancelIdleCallback||(e=>clearTimeout(e)),n5=(e=1e4)=>t=>{let n=n4(t,{timeout:e});return()=>n8(n)},n9=e=>(t,n)=>{let r=new IntersectionObserver(e=>{for(let n of e)if(n.isIntersecting){r.disconnect(),t();break}},e);return n(e=>{if(e instanceof Element){if(function(e){let{top:t,left:n,bottom:r,right:i}=e.getBoundingClientRect(),{innerHeight:l,innerWidth:s}=window;return(t>0&&t<l||r>0&&r<l)&&(n>0&&n<s||i>0&&i<s)}(e))return t(),r.disconnect(),!1;r.observe(e)}}),()=>r.disconnect()},n7=e=>t=>{if(e){let n=matchMedia(e);if(!n.matches)return n.addEventListener("change",t,{once:!0}),()=>n.removeEventListener("change",t);t()}},re=(e=[])=>(t,n)=>{I(e)&&(e=[e]);let r=!1,i=e=>{r||(r=!0,l(),t(),e.target.dispatchEvent(new e.constructor(e.type,e)))},l=()=>{n(t=>{for(let n of e)t.removeEventListener(n,i)})};return n(t=>{for(let n of e)t.addEventListener(n,i,{once:!0})}),l},rt=e=>!!e.type.__asyncLoader;/*! #__NO_SIDE_EFFECTS__ */function rn(e){let t;R(e)&&(e={loader:e});let{loader:n,loadingComponent:r,errorComponent:i,delay:l=200,hydrate:s,timeout:o,suspensible:a=!0,onError:c}=e,u=null,d=0,p=()=>(d++,u=null,f()),f=()=>{let e;return u||(e=u=n().catch(e=>{if(e=e instanceof Error?e:Error(String(e)),c)return new Promise((t,n)=>{c(e,()=>t(p()),()=>n(e),d+1)});throw e}).then(n=>e!==u&&u?u:(n&&(n.__esModule||"Module"===n[Symbol.toStringTag])&&(n=n.default),t=n,n)))};return nq({name:"AsyncComponentWrapper",__asyncLoader:f,__asyncHydrate(e,n,r){let i=s?()=>{let t=s(r,t=>(function(e,t){if(n0(e)&&"["===e.data){let n=1,r=e.nextSibling;for(;r;){if(1===r.nodeType){if(!1===t(r))break}else if(n0(r)){if("]"===r.data){if(0==--n)break}else"["===r.data&&n++}r=r.nextSibling}}else t(e)})(e,t));t&&(n.bum||(n.bum=[])).push(t)}:r;t?i():f().then(()=>!n.isUnmounted&&i())},get __asyncResolved(){return t},setup(){let e=lA;if(nK(e),t)return()=>rr(t,e);let n=t=>{u=null,t4(t,e,13,!i)};if(a&&e.suspense||lM)return f().then(t=>()=>rr(t,e)).catch(e=>(n(e),()=>i?lm(i,{error:e}):null));let s=tI(!1),c=tI(),d=tI(!!l);return l&&setTimeout(()=>{d.value=!1},l),null!=o&&setTimeout(()=>{if(!s.value&&!c.value){let e=Error(`Async component timed out after ${o}ms.`);n(e),c.value=e}},o),f().then(()=>{s.value=!0,e.parent&&ri(e.parent.vnode)&&e.parent.update()}).catch(e=>{n(e),c.value=e}),()=>s.value&&t?rr(t,e):c.value&&i?lm(i,{error:c.value}):r&&!d.value?lm(r):void 0}})}function rr(e,t){let{ref:n,props:r,children:i,ce:l}=t.vnode,s=lm(e,r,i);return s.ref=n,s.ce=l,delete t.vnode.ce,s}let ri=e=>e.type.__isKeepAlive,rl={name:"KeepAlive",__isKeepAlive:!0,props:{include:[String,RegExp,Array],exclude:[String,RegExp,Array],max:[String,Number]},setup(e,{slots:t}){let n=lR(),r=n.ctx;if(!r.renderer)return()=>{let e=t.default&&t.default();return e&&1===e.length?e[0]:e};let i=/* @__PURE__ */new Map,l=/* @__PURE__ */new Set,s=null,o=n.suspense,{renderer:{p:a,m:c,um:u,o:{createElement:d}}}=r,p=d("div");function f(e){ru(e),u(e,n,o,!0)}function h(e){i.forEach((t,n)=>{let r=lH(t.type);r&&!e(r)&&m(n)})}function m(e){let t=i.get(e);!t||s&&lu(t,s)?s&&ru(s):f(t),i.delete(e),l.delete(e)}r.activate=(e,t,n,r,i)=>{let l=e.component;c(e,t,n,0,o),a(l.vnode,e,t,n,l,o,r,e.slotScopeIds,i),ik(()=>{l.isDeactivated=!1,l.a&&Q(l.a);let t=e.props&&e.props.onVnodeMounted;t&&lk(t,l.parent,e)},o)},r.deactivate=e=>{let t=e.component;iP(t.m),iP(t.a),c(e,p,null,1,o),ik(()=>{t.da&&Q(t.da);let n=e.props&&e.props.onVnodeUnmounted;n&&lk(n,t.parent,e),t.isDeactivated=!0},o)},iV(()=>[e.include,e.exclude],([e,t])=>{e&&h(t=>rs(e,t)),t&&h(e=>!rs(t,e))},{flush:"post",deep:!0});let g=null,y=()=>{null!=g&&(iZ(n.subTree.type)?ik(()=>{i.set(g,rd(n.subTree))},n.subTree.suspense):i.set(g,rd(n.subTree)))};return rm(y),ry(y),rv(()=>{i.forEach(e=>{let{subTree:t,suspense:r}=n,i=rd(t);if(e.type===i.type&&e.key===i.key){ru(i);let e=i.component.da;e&&ik(e,r);return}f(e)})}),()=>{if(g=null,!t.default)return s=null;let n=t.default(),r=n[0];if(n.length>1)return s=null,n;if(!lc(r)||!(4&r.shapeFlag)&&!(128&r.shapeFlag))return s=null,r;let o=rd(r);if(o.type===i9)return s=null,o;let a=o.type,c=lH(rt(o)?o.type.__asyncResolved||{}:a),{include:u,exclude:d,max:p}=e;if(u&&(!c||!rs(u,c))||d&&c&&rs(d,c))return o.shapeFlag&=-257,s=o,r;let f=null==o.key?a:o.key,h=i.get(f);return o.el&&(o=ly(o),128&r.shapeFlag&&(r.ssContent=o)),g=f,h?(o.el=h.el,o.component=h.component,o.transition&&nj(o,o.transition),o.shapeFlag|=512,l.delete(f),l.add(f)):(l.add(f),p&&l.size>parseInt(p,10)&&m(l.values().next().value)),o.shapeFlag|=256,s=o,iZ(r.type)?r:o}}};function rs(e,t){return k(e)?e.some(e=>rs(e,t)):I(e)?e.split(",").includes(t):!!A(e)&&(e.lastIndex=0,e.test(t))}function ro(e,t){rc(e,"a",t)}function ra(e,t){rc(e,"da",t)}function rc(e,t,n=lA){let r=e.__wdc||(e.__wdc=()=>{let t=n;for(;t;){if(t.isDeactivated)return;t=t.parent}return e()});if(rp(t,r,n),n){let e=n.parent;for(;e&&e.parent;)ri(e.parent.vnode)&&function(e,t,n,r){let i=rp(t,e,r,!0);rb(()=>{x(r[t],i)},n)}(r,t,n,e),e=e.parent}}function ru(e){e.shapeFlag&=-257,e.shapeFlag&=-513}function rd(e){return 128&e.shapeFlag?e.ssContent:e}function rp(e,t,n=lA,r=!1){if(n){let i=n[e]||(n[e]=[]),l=t.__weh||(t.__weh=(...r)=>{eF();let i=lI(n),l=t3(t,n,e,r);return i(),eV(),l});return r?i.unshift(l):i.push(l),l}}let rf=e=>(t,n=lA)=>{lM&&"sp"!==e||rp(e,(...e)=>t(...e),n)},rh=rf("bm"),rm=rf("m"),rg=rf("bu"),ry=rf("u"),rv=rf("bum"),rb=rf("um"),r_=rf("sp"),rS=rf("rtg"),rx=rf("rtc");function rC(e,t=lA){rp("ec",e,t)}let rT="components";function rk(e,t){return rA(rT,e,!0,t)||e}let rw=Symbol.for("v-ndc");function rN(e){return I(e)?rA(rT,e,!1)||e:e||rw}function rE(e){return rA("directives",e)}function rA(e,t,n=!0,r=!1){let i=nu||lA;if(i){let n=i.type;if(e===rT){let e=lH(n,!1);if(e&&(e===t||e===q(t)||e===z(q(t))))return n}let l=rR(i[e]||n[e],t)||rR(i.appContext[e],t);return!l&&r?n:l}}function rR(e,t){return e&&(e[t]||e[q(t)]||e[z(q(t))])}function rI(e,t,n,r){let i;let l=n&&n[r],s=k(e);if(s||I(e)){let n=s&&tx(e),r=!1;n&&(r=!tT(e),e=eX(e)),i=Array(e.length);for(let n=0,s=e.length;n<s;n++)i[n]=t(r?tE(e[n]):e[n],n,void 0,l&&l[n])}else if("number"==typeof e){i=Array(e);for(let n=0;n<e;n++)i[n]=t(n+1,n,void 0,l&&l[n])}else if(P(e)){if(e[Symbol.iterator])i=Array.from(e,(e,n)=>t(e,n,void 0,l&&l[n]));else{let n=Object.keys(e);i=Array(n.length);for(let r=0,s=n.length;r<s;r++){let s=n[r];i[r]=t(e[s],s,r,l&&l[r])}}}else i=[];return n&&(n[r]=i),i}function rO(e,t){for(let n=0;n<t.length;n++){let r=t[n];if(k(r))for(let t=0;t<r.length;t++)e[r[t].name]=r[t].fn;else r&&(e[r.name]=r.key?(...e)=>{let t=r.fn(...e);return t&&(t.key=r.key),t}:r.fn)}return e}function rP(e,t,n={},r,i){if(nu.ce||nu.parent&&rt(nu.parent)&&nu.parent.ce)return"default"!==t&&(n.name=t),ln(),la(i8,null,[lm("slot",n,r&&r())],64);let l=e[t];l&&l._c&&(l._d=!1),ln();let s=l&&rM(l(n)),o=n.key||s&&s.key,a=la(i8,{key:(o&&!O(o)?o:`_${t}`)+(!s&&r?"_fb":"")},s||(r?r():[]),s&&1===e._?64:-2);return!i&&a.scopeId&&(a.slotScopeIds=[a.scopeId+"-s"]),l&&l._c&&(l._d=!0),a}function rM(e){return e.some(e=>!lc(e)||!!(e.type!==i9&&(e.type!==i8||rM(e.children))))?e:null}function rD(e,t){let n={};for(let r in e)n[t&&/[A-Z]/.test(r)?`on:${r}`:J(r)]=e[r];return n}let rL=e=>e?lP(e)?lj(e):rL(e.parent):null,r$=/* @__PURE__ */S(/* @__PURE__ */Object.create(null),{$:e=>e,$el:e=>e.vnode.el,$data:e=>e.data,$props:e=>e.props,$attrs:e=>e.attrs,$slots:e=>e.slots,$refs:e=>e.refs,$parent:e=>rL(e.parent),$root:e=>rL(e.root),$host:e=>e.ce,$emit:e=>e.emit,$options:e=>r3(e),$forceUpdate:e=>e.f||(e.f=()=>{ni(e.update)}),$nextTick:e=>e.n||(e.n=nr.bind(e.proxy)),$watch:e=>iU.bind(e)}),rF=(e,t)=>e!==h&&!e.__isScriptSetup&&T(e,t),rV={get({_:e},t){let n,r,i;if("__v_skip"===t)return!0;let{ctx:l,setupState:s,data:o,props:a,accessCache:c,type:u,appContext:d}=e;if("$"!==t[0]){let r=c[t];if(void 0!==r)switch(r){case 1:return s[t];case 2:return o[t];case 4:return l[t];case 3:return a[t]}else{if(rF(s,t))return c[t]=1,s[t];if(o!==h&&T(o,t))return c[t]=2,o[t];if((n=e.propsOptions[0])&&T(n,t))return c[t]=3,a[t];if(l!==h&&T(l,t))return c[t]=4,l[t];r2&&(c[t]=0)}}let p=r$[t];return p?("$attrs"===t&&eJ(e.attrs,"get",""),p(e)):(r=u.__cssModules)&&(r=r[t])?r:l!==h&&T(l,t)?(c[t]=4,l[t]):T(i=d.config.globalProperties,t)?i[t]:void 0},set({_:e},t,n){let{data:r,setupState:i,ctx:l}=e;return rF(i,t)?(i[t]=n,!0):r!==h&&T(r,t)?(r[t]=n,!0):!T(e.props,t)&&!("$"===t[0]&&t.slice(1) in e)&&(l[t]=n,!0)},has({_:{data:e,setupState:t,accessCache:n,ctx:r,appContext:i,propsOptions:l}},s){let o;return!!n[s]||e!==h&&T(e,s)||rF(t,s)||(o=l[0])&&T(o,s)||T(r,s)||T(r$,s)||T(i.config.globalProperties,s)},defineProperty(e,t,n){return null!=n.get?e._.accessCache[t]=0:T(n,"value")&&this.set(e,t,n.value,null),Reflect.defineProperty(e,t,n)}},rB=/* @__PURE__ */S({},rV,{get(e,t){if(t!==Symbol.unscopables)return rV.get(e,t,e)},has:(e,t)=>"_"!==t[0]&&!et(t)});function rU(){return null}function rj(){return null}function rH(e){}function rq(e){}function rW(){return null}function rK(){}function rz(e,t){return null}function rJ(){return rQ().slots}function rG(){return rQ().attrs}function rQ(){let e=lR();return e.setupContext||(e.setupContext=lU(e))}function rX(e){return k(e)?e.reduce((e,t)=>(e[t]=null,e),{}):e}function rZ(e,t){let n=rX(e);for(let e in t){if(e.startsWith("__skip"))continue;let r=n[e];r?k(r)||R(r)?r=n[e]={type:r,default:t[e]}:r.default=t[e]:null===r&&(r=n[e]={default:t[e]}),r&&t[`__skip_${e}`]&&(r.skipFactory=!0)}return n}function rY(e,t){return e&&t?k(e)&&k(t)?e.concat(t):S({},rX(e),rX(t)):e||t}function r0(e,t){let n={};for(let r in e)t.includes(r)||Object.defineProperty(n,r,{enumerable:!0,get:()=>e[r]});return n}function r1(e){let t=lR(),n=e();return lO(),M(n)&&(n=n.catch(e=>{throw lI(t),e})),[n,()=>lI(t)]}let r2=!0;function r6(e,t,n){t3(k(e)?e.map(e=>e.bind(t.proxy)):e.bind(t.proxy),t,n)}function r3(e){let t;let n=e.type,{mixins:r,extends:i}=n,{mixins:l,optionsCache:s,config:{optionMergeStrategies:o}}=e.appContext,a=s.get(n);return a?t=a:l.length||r||i?(t={},l.length&&l.forEach(e=>r4(t,e,o,!0)),r4(t,n,o)):t=n,P(n)&&s.set(n,t),t}function r4(e,t,n,r=!1){let{mixins:i,extends:l}=t;for(let s in l&&r4(e,l,n,!0),i&&i.forEach(t=>r4(e,t,n,!0)),t)if(r&&"expose"===s);else{let r=r8[s]||n&&n[s];e[s]=r?r(e[s],t[s]):t[s]}return e}let r8={data:r5,props:it,emits:it,methods:ie,computed:ie,beforeCreate:r7,created:r7,beforeMount:r7,mounted:r7,beforeUpdate:r7,updated:r7,beforeDestroy:r7,beforeUnmount:r7,destroyed:r7,unmounted:r7,activated:r7,deactivated:r7,errorCaptured:r7,serverPrefetch:r7,components:ie,directives:ie,watch:function(e,t){if(!e)return t;if(!t)return e;let n=S(/* @__PURE__ */Object.create(null),e);for(let r in t)n[r]=r7(e[r],t[r]);return n},provide:r5,inject:function(e,t){return ie(r9(e),r9(t))}};function r5(e,t){return t?e?function(){return S(R(e)?e.call(this,this):e,R(t)?t.call(this,this):t)}:t:e}function r9(e){if(k(e)){let t={};for(let n=0;n<e.length;n++)t[e[n]]=e[n];return t}return e}function r7(e,t){return e?[...new Set([].concat(e,t))]:t}function ie(e,t){return e?S(/* @__PURE__ */Object.create(null),e,t):t}function it(e,t){return e?k(e)&&k(t)?[.../* @__PURE__ */new Set([...e,...t])]:S(/* @__PURE__ */Object.create(null),rX(e),rX(null!=t?t:{})):t}function ir(){return{app:null,config:{isNativeTag:y,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:/* @__PURE__ */Object.create(null),optionsCache:/* @__PURE__ */new WeakMap,propsCache:/* @__PURE__ */new WeakMap,emitsCache:/* @__PURE__ */new WeakMap}}let ii=0,il=null;function is(e,t){if(lA){let n=lA.provides,r=lA.parent&&lA.parent.provides;r===n&&(n=lA.provides=Object.create(r)),n[e]=t}}function io(e,t,n=!1){let r=lA||nu;if(r||il){let i=il?il._context.provides:r?null==r.parent?r.vnode.appContext&&r.vnode.appContext.provides:r.parent.provides:void 0;if(i&&e in i)return i[e];if(arguments.length>1)return n&&R(t)?t.call(r&&r.proxy):t}}function ia(){return!!(lA||nu||il)}let ic={},iu=()=>Object.create(ic),id=e=>Object.getPrototypeOf(e)===ic;function ip(e,t,n,r){let i;let[l,s]=e.propsOptions,o=!1;if(t)for(let a in t){let c;if(B(a))continue;let u=t[a];l&&T(l,c=q(a))?s&&s.includes(c)?(i||(i={}))[c]=u:n[c]=u:iK(e.emitsOptions,a)||a in r&&u===r[a]||(r[a]=u,o=!0)}if(s){let t=tw(n),r=i||h;for(let i=0;i<s.length;i++){let o=s[i];n[o]=ih(l,t,o,r[o],e,!T(r,o))}}return o}function ih(e,t,n,r,i,l){let s=e[n];if(null!=s){let e=T(s,"default");if(e&&void 0===r){let e=s.default;if(s.type!==Function&&!s.skipFactory&&R(e)){let{propsDefaults:l}=i;if(n in l)r=l[n];else{let s=lI(i);r=l[n]=e.call(null,t),s()}}else r=e;i.ce&&i.ce._setProp(n,r)}s[0]&&(l&&!e?r=!1:s[1]&&(""===r||r===K(n))&&(r=!0))}return r}let im=/* @__PURE__ */new WeakMap;function ig(e){return!("$"===e[0]||B(e))}let iy=e=>"_"===e[0]||"$stable"===e,iv=e=>k(e)?e.map(lS):[lS(e)],ib=(e,t,n)=>{if(t._n)return t;let r=ng((...e)=>iv(t(...e)),n);return r._c=!1,r},i_=(e,t,n)=>{let r=e._ctx;for(let n in e){if(iy(n))continue;let i=e[n];if(R(i))t[n]=ib(n,i,r);else if(null!=i){let e=iv(i);t[n]=()=>e}}},iS=(e,t)=>{let n=iv(t);e.slots.default=()=>n},ix=(e,t,n)=>{for(let r in t)(n||"_"!==r)&&(e[r]=t[r])},iC=(e,t,n)=>{let r=e.slots=iu();if(32&e.vnode.shapeFlag){let e=t._;e?(ix(r,t,n),n&&X(r,"_",e,!0)):i_(t,r)}else t&&iS(e,t)},iT=(e,t,n)=>{let{vnode:r,slots:i}=e,l=!0,s=h;if(32&r.shapeFlag){let e=t._;e?n&&1===e?l=!1:ix(i,t,n):(l=!t.$stable,i_(t,i)),s=t}else t&&(iS(e,t),s={default:1});if(l)for(let e in i)iy(e)||null!=s[e]||delete i[e]},ik=i3;function iw(e){return iE(e)}function iN(e){return iE(e,n1)}function iE(e,t){var n;let r,i;ee().__VUE__=!0;let{insert:l,remove:s,patchProp:o,createElement:a,createText:c,createComment:u,setText:d,setElementText:p,parentNode:f,nextSibling:y,setScopeId:b=g,insertStaticContent:_}=e,x=(e,t,n,r=null,i=null,l=null,s,o=null,a=!!t.dynamicChildren)=>{if(e===t)return;e&&!lu(e,t)&&(r=ei(e),Z(e,i,l,!0),e=null),-2===t.patchFlag&&(a=!1,t.dynamicChildren=null);let{type:c,ref:u,shapeFlag:d}=t;switch(c){case i5:C(e,t,n,r);break;case i9:k(e,t,n,r);break;case i7:null==e&&w(t,n,r,s);break;case i8:F(e,t,n,r,i,l,s,o,a);break;default:1&d?A(e,t,n,r,i,l,s,o,a):6&d?V(e,t,n,r,i,l,s,o,a):64&d?c.process(e,t,n,r,i,l,s,o,a,eo):128&d&&c.process(e,t,n,r,i,l,s,o,a,eo)}null!=u&&i&&nJ(u,e&&e.ref,l,t||e,!t)},C=(e,t,n,r)=>{if(null==e)l(t.el=c(t.children),n,r);else{let n=t.el=e.el;t.children!==e.children&&d(n,t.children)}},k=(e,t,n,r)=>{null==e?l(t.el=u(t.children||""),n,r):t.el=e.el},w=(e,t,n,r)=>{[e.el,e.anchor]=_(e.children,t,n,r,e.el,e.anchor)},N=({el:e,anchor:t},n,r)=>{let i;for(;e&&e!==t;)i=y(e),l(e,n,r),e=i;l(t,n,r)},E=({el:e,anchor:t})=>{let n;for(;e&&e!==t;)n=y(e),s(e),e=n;s(t)},A=(e,t,n,r,i,l,s,o,a)=>{"svg"===t.type?s="svg":"math"===t.type&&(s="mathml"),null==e?I(t,n,r,i,l,s,o,a):D(e,t,i,l,s,o,a)},I=(e,t,n,r,i,s,c,u)=>{let d,f;let{props:h,shapeFlag:m,transition:g,dirs:y}=e;if(d=e.el=a(e.type,s,h&&h.is,h),8&m?p(d,e.children):16&m&&M(e.children,d,null,r,i,iA(e,s),c,u),y&&nv(e,null,r,"created"),O(d,e,e.scopeId,c,r),h){for(let e in h)"value"===e||B(e)||o(d,e,null,h[e],s,r);"value"in h&&o(d,"value",null,h.value,s),(f=h.onVnodeBeforeMount)&&lk(f,r,e)}y&&nv(e,null,r,"beforeMount");let b=iI(i,g);b&&g.beforeEnter(d),l(d,t,n),((f=h&&h.onVnodeMounted)||b||y)&&ik(()=>{f&&lk(f,r,e),b&&g.enter(d),y&&nv(e,null,r,"mounted")},i)},O=(e,t,n,r,i)=>{if(n&&b(e,n),r)for(let t=0;t<r.length;t++)b(e,r[t]);if(i){let n=i.subTree;if(t===n||iZ(n.type)&&(n.ssContent===t||n.ssFallback===t)){let t=i.vnode;O(e,t,t.scopeId,t.slotScopeIds,i.parent)}}},M=(e,t,n,r,i,l,s,o,a=0)=>{for(let c=a;c<e.length;c++)x(null,e[c]=o?lx(e[c]):lS(e[c]),t,n,r,i,l,s,o)},D=(e,t,n,r,i,l,s)=>{let a;let c=t.el=e.el,{patchFlag:u,dynamicChildren:d,dirs:f}=t;u|=16&e.patchFlag;let m=e.props||h,g=t.props||h;if(n&&iR(n,!1),(a=g.onVnodeBeforeUpdate)&&lk(a,n,t,e),f&&nv(t,e,n,"beforeUpdate"),n&&iR(n,!0),(m.innerHTML&&null==g.innerHTML||m.textContent&&null==g.textContent)&&p(c,""),d?L(e.dynamicChildren,d,c,n,r,iA(t,i),l):s||z(e,t,c,null,n,r,iA(t,i),l,!1),u>0){if(16&u)$(c,m,g,n,i);else if(2&u&&m.class!==g.class&&o(c,"class",null,g.class,i),4&u&&o(c,"style",m.style,g.style,i),8&u){let e=t.dynamicProps;for(let t=0;t<e.length;t++){let r=e[t],l=m[r],s=g[r];(s!==l||"value"===r)&&o(c,r,l,s,i,n)}}1&u&&e.children!==t.children&&p(c,t.children)}else s||null!=d||$(c,m,g,n,i);((a=g.onVnodeUpdated)||f)&&ik(()=>{a&&lk(a,n,t,e),f&&nv(t,e,n,"updated")},r)},L=(e,t,n,r,i,l,s)=>{for(let o=0;o<t.length;o++){let a=e[o],c=t[o],u=a.el&&(a.type===i8||!lu(a,c)||70&a.shapeFlag)?f(a.el):n;x(a,c,u,null,r,i,l,s,!0)}},$=(e,t,n,r,i)=>{if(t!==n){if(t!==h)for(let l in t)B(l)||l in n||o(e,l,t[l],null,i,r);for(let l in n){if(B(l))continue;let s=n[l],a=t[l];s!==a&&"value"!==l&&o(e,l,a,s,i,r)}"value"in n&&o(e,"value",t.value,n.value,i)}},F=(e,t,n,r,i,s,o,a,u)=>{let d=t.el=e?e.el:c(""),p=t.anchor=e?e.anchor:c(""),{patchFlag:f,dynamicChildren:h,slotScopeIds:m}=t;m&&(a=a?a.concat(m):m),null==e?(l(d,n,r),l(p,n,r),M(t.children||[],n,p,i,s,o,a,u)):f>0&&64&f&&h&&e.dynamicChildren?(L(e.dynamicChildren,h,n,i,s,o,a),(null!=t.key||i&&t===i.subTree)&&iO(e,t,!0)):z(e,t,n,p,i,s,o,a,u)},V=(e,t,n,r,i,l,s,o,a)=>{t.slotScopeIds=o,null==e?512&t.shapeFlag?i.ctx.activate(t,n,r,s,a):U(t,n,r,i,l,s,a):j(e,t,a)},U=(e,t,n,r,i,l,s)=>{let o=e.component=lE(e,r,i);ri(e)&&(o.ctx.renderer=eo),lD(o,!1,s),o.asyncDep?(i&&i.registerDep(o,H,s),e.el||k(null,o.subTree=lm(i9),t,n)):H(o,e,t,n,i,l,s)},j=(e,t,n)=>{let r=t.component=e.component;if(function(e,t,n){let{props:r,children:i,component:l}=e,{props:s,children:o,patchFlag:a}=t,c=l.emitsOptions;if(t.dirs||t.transition)return!0;if(!n||!(a>=0))return(!!i||!!o)&&(!o||!o.$stable)||r!==s&&(r?!s||iQ(r,s,c):!!s);if(1024&a)return!0;if(16&a)return r?iQ(r,s,c):!!s;if(8&a){let e=t.dynamicProps;for(let t=0;t<e.length;t++){let n=e[t];if(s[n]!==r[n]&&!iK(c,n))return!0}}return!1}(e,t,n)){if(r.asyncDep&&!r.asyncResolved){W(r,t,n);return}r.next=t,r.update()}else t.el=e.el,r.vnode=t},H=(e,t,n,r,l,s,o)=>{let a=()=>{if(e.isMounted){let t,{next:n,bu:r,u:i,parent:c,vnode:u}=e;{let t=function e(t){let n=t.subTree.component;if(n)return n.asyncDep&&!n.asyncResolved?n:e(n)}(e);if(t){n&&(n.el=u.el,W(e,n,o)),t.asyncDep.then(()=>{e.isUnmounted||a()});return}}let d=n;iR(e,!1),n?(n.el=u.el,W(e,n,o)):n=u,r&&Q(r),(t=n.props&&n.props.onVnodeBeforeUpdate)&&lk(t,c,n,u),iR(e,!0);let p=iz(e),h=e.subTree;e.subTree=p,x(h,p,f(h.el),ei(h),e,l,s),n.el=p.el,null===d&&iX(e,p.el),i&&ik(i,l),(t=n.props&&n.props.onVnodeUpdated)&&ik(()=>lk(t,c,n,u),l)}else{let o;let{el:a,props:c}=t,{bm:u,m:d,parent:p,root:f,type:h}=e,m=rt(t);if(iR(e,!1),u&&Q(u),!m&&(o=c&&c.onVnodeBeforeMount)&&lk(o,p,t),iR(e,!0),a&&i){let t=()=>{e.subTree=iz(e),i(a,e.subTree,e,l,null)};m&&h.__asyncHydrate?h.__asyncHydrate(a,e,t):t()}else{f.ce&&f.ce._injectChildStyle(h);let i=e.subTree=iz(e);x(null,i,n,r,e,l,s),t.el=i.el}if(d&&ik(d,l),!m&&(o=c&&c.onVnodeMounted)){let e=t;ik(()=>lk(o,p,e),l)}(256&t.shapeFlag||p&&rt(p.vnode)&&256&p.vnode.shapeFlag)&&e.a&&ik(e.a,l),e.isMounted=!0,t=n=r=null}};e.scope.on();let c=e.effect=new ek(a);e.scope.off();let u=e.update=c.run.bind(c),d=e.job=c.runIfDirty.bind(c);d.i=e,d.id=e.uid,c.scheduler=()=>ni(d),iR(e,!0),u()},W=(e,t,n)=>{t.component=e;let r=e.vnode.props;e.vnode=t,e.next=null,function(e,t,n,r){let{props:i,attrs:l,vnode:{patchFlag:s}}=e,o=tw(i),[a]=e.propsOptions,c=!1;if((r||s>0)&&!(16&s)){if(8&s){let n=e.vnode.dynamicProps;for(let r=0;r<n.length;r++){let s=n[r];if(iK(e.emitsOptions,s))continue;let u=t[s];if(a){if(T(l,s))u!==l[s]&&(l[s]=u,c=!0);else{let t=q(s);i[t]=ih(a,o,t,u,e,!1)}}else u!==l[s]&&(l[s]=u,c=!0)}}}else{let r;for(let s in ip(e,t,i,l)&&(c=!0),o)t&&(T(t,s)||(r=K(s))!==s&&T(t,r))||(a?n&&(void 0!==n[s]||void 0!==n[r])&&(i[s]=ih(a,o,s,void 0,e,!0)):delete i[s]);if(l!==o)for(let e in l)t&&T(t,e)||(delete l[e],c=!0)}c&&eG(e.attrs,"set","")}(e,t.props,r,n),iT(e,t.children,n),eF(),no(e),eV()},z=(e,t,n,r,i,l,s,o,a=!1)=>{let c=e&&e.children,u=e?e.shapeFlag:0,d=t.children,{patchFlag:f,shapeFlag:h}=t;if(f>0){if(128&f){G(c,d,n,r,i,l,s,o,a);return}if(256&f){J(c,d,n,r,i,l,s,o,a);return}}8&h?(16&u&&er(c,i,l),d!==c&&p(n,d)):16&u?16&h?G(c,d,n,r,i,l,s,o,a):er(c,i,l,!0):(8&u&&p(n,""),16&h&&M(d,n,r,i,l,s,o,a))},J=(e,t,n,r,i,l,s,o,a)=>{let c;e=e||m,t=t||m;let u=e.length,d=t.length,p=Math.min(u,d);for(c=0;c<p;c++){let r=t[c]=a?lx(t[c]):lS(t[c]);x(e[c],r,n,null,i,l,s,o,a)}u>d?er(e,i,l,!0,!1,p):M(t,n,r,i,l,s,o,a,p)},G=(e,t,n,r,i,l,s,o,a)=>{let c=0,u=t.length,d=e.length-1,p=u-1;for(;c<=d&&c<=p;){let r=e[c],u=t[c]=a?lx(t[c]):lS(t[c]);if(lu(r,u))x(r,u,n,null,i,l,s,o,a);else break;c++}for(;c<=d&&c<=p;){let r=e[d],c=t[p]=a?lx(t[p]):lS(t[p]);if(lu(r,c))x(r,c,n,null,i,l,s,o,a);else break;d--,p--}if(c>d){if(c<=p){let e=p+1,d=e<u?t[e].el:r;for(;c<=p;)x(null,t[c]=a?lx(t[c]):lS(t[c]),n,d,i,l,s,o,a),c++}}else if(c>p)for(;c<=d;)Z(e[c],i,l,!0),c++;else{let f;let h=c,g=c,y=/* @__PURE__ */new Map;for(c=g;c<=p;c++){let e=t[c]=a?lx(t[c]):lS(t[c]);null!=e.key&&y.set(e.key,c)}let b=0,_=p-g+1,S=!1,C=0,T=Array(_);for(c=0;c<_;c++)T[c]=0;for(c=h;c<=d;c++){let r;let u=e[c];if(b>=_){Z(u,i,l,!0);continue}if(null!=u.key)r=y.get(u.key);else for(f=g;f<=p;f++)if(0===T[f-g]&&lu(u,t[f])){r=f;break}void 0===r?Z(u,i,l,!0):(T[r-g]=c+1,r>=C?C=r:S=!0,x(u,t[r],n,null,i,l,s,o,a),b++)}let k=S?function(e){let t,n,r,i,l;let s=e.slice(),o=[0],a=e.length;for(t=0;t<a;t++){let a=e[t];if(0!==a){if(e[n=o[o.length-1]]<a){s[t]=n,o.push(t);continue}for(r=0,i=o.length-1;r<i;)e[o[l=r+i>>1]]<a?r=l+1:i=l;a<e[o[r]]&&(r>0&&(s[t]=o[r-1]),o[r]=t)}}for(r=o.length,i=o[r-1];r-- >0;)o[r]=i,i=s[i];return o}(T):m;for(f=k.length-1,c=_-1;c>=0;c--){let e=g+c,d=t[e],p=e+1<u?t[e+1].el:r;0===T[c]?x(null,d,n,p,i,l,s,o,a):S&&(f<0||c!==k[f]?X(d,n,p,2):f--)}}},X=(e,t,n,r,i=null)=>{let{el:s,type:o,transition:a,children:c,shapeFlag:u}=e;if(6&u){X(e.component.subTree,t,n,r);return}if(128&u){e.suspense.move(t,n,r);return}if(64&u){o.move(e,t,n,eo);return}if(o===i8){l(s,t,n);for(let e=0;e<c.length;e++)X(c[e],t,n,r);l(e.anchor,t,n);return}if(o===i7){N(e,t,n);return}if(2!==r&&1&u&&a){if(0===r)a.beforeEnter(s),l(s,t,n),ik(()=>a.enter(s),i);else{let{leave:e,delayLeave:r,afterLeave:i}=a,o=()=>l(s,t,n),c=()=>{e(s,()=>{o(),i&&i()})};r?r(s,o,c):c()}}else l(s,t,n)},Z=(e,t,n,r=!1,i=!1)=>{let l;let{type:s,props:o,ref:a,children:c,dynamicChildren:u,shapeFlag:d,patchFlag:p,dirs:f,cacheIndex:h}=e;if(-2===p&&(i=!1),null!=a&&nJ(a,null,n,e,!0),null!=h&&(t.renderCache[h]=void 0),256&d){t.ctx.deactivate(e);return}let m=1&d&&f,g=!rt(e);if(g&&(l=o&&o.onVnodeBeforeUnmount)&&lk(l,t,e),6&d)en(e.component,n,r);else{if(128&d){e.suspense.unmount(n,r);return}m&&nv(e,null,t,"beforeUnmount"),64&d?e.type.remove(e,t,n,eo,r):u&&!u.hasOnce&&(s!==i8||p>0&&64&p)?er(u,t,n,!1,!0):(s===i8&&384&p||!i&&16&d)&&er(c,t,n),r&&Y(e)}(g&&(l=o&&o.onVnodeUnmounted)||m)&&ik(()=>{l&&lk(l,t,e),m&&nv(e,null,t,"unmounted")},n)},Y=e=>{let{type:t,el:n,anchor:r,transition:i}=e;if(t===i8){et(n,r);return}if(t===i7){E(e);return}let l=()=>{s(n),i&&!i.persisted&&i.afterLeave&&i.afterLeave()};if(1&e.shapeFlag&&i&&!i.persisted){let{leave:t,delayLeave:r}=i,s=()=>t(n,l);r?r(e.el,l,s):s()}else l()},et=(e,t)=>{let n;for(;e!==t;)n=y(e),s(e),e=n;s(t)},en=(e,t,n)=>{let{bum:r,scope:i,job:l,subTree:s,um:o,m:a,a:c}=e;iP(a),iP(c),r&&Q(r),i.stop(),l&&(l.flags|=8,Z(s,e,t,n)),o&&ik(o,t),ik(()=>{e.isUnmounted=!0},t),t&&t.pendingBranch&&!t.isUnmounted&&e.asyncDep&&!e.asyncResolved&&e.suspenseId===t.pendingId&&(t.deps--,0===t.deps&&t.resolve())},er=(e,t,n,r=!1,i=!1,l=0)=>{for(let s=l;s<e.length;s++)Z(e[s],t,n,r,i)},ei=e=>{if(6&e.shapeFlag)return ei(e.component.subTree);if(128&e.shapeFlag)return e.suspense.next();let t=y(e.anchor||e.el),n=t&&t[nb];return n?y(n):t},el=!1,es=(e,t,n)=>{null==e?t._vnode&&Z(t._vnode,null,null,!0):x(t._vnode||null,e,t,null,null,null,n),t._vnode=e,el||(el=!0,no(),na(),el=!1)},eo={p:x,um:Z,m:X,r:Y,mt:U,mc:M,pc:z,pbc:L,n:ei,o:e};return t&&([r,i]=t(eo)),{render:es,hydrate:r,createApp:(n=r,function(e,t=null){R(e)||(e=S({},e)),null==t||P(t)||(t=null);let r=ir(),i=/* @__PURE__ */new WeakSet,l=[],s=!1,o=r.app={_uid:ii++,_component:e,_props:t,_container:null,_context:r,_instance:null,version:lG,get config(){return r.config},set config(v){},use:(e,...t)=>(i.has(e)||(e&&R(e.install)?(i.add(e),e.install(o,...t)):R(e)&&(i.add(e),e(o,...t))),o),mixin:e=>(r.mixins.includes(e)||r.mixins.push(e),o),component:(e,t)=>t?(r.components[e]=t,o):r.components[e],directive:(e,t)=>t?(r.directives[e]=t,o):r.directives[e],mount(i,l,a){if(!s){let c=o._ceVNode||lm(e,t);return c.appContext=r,!0===a?a="svg":!1===a&&(a=void 0),l&&n?n(c,i):es(c,i,a),s=!0,o._container=i,i.__vue_app__=o,lj(c.component)}},onUnmount(e){l.push(e)},unmount(){s&&(t3(l,o._instance,16),es(null,o._container),delete o._container.__vue_app__)},provide:(e,t)=>(r.provides[e]=t,o),runWithContext(e){let t=il;il=o;try{return e()}finally{il=t}}};return o})}}function iA({type:e,props:t},n){return"svg"===n&&"foreignObject"===e||"mathml"===n&&"annotation-xml"===e&&t&&t.encoding&&t.encoding.includes("html")?void 0:n}function iR({effect:e,job:t},n){n?(e.flags|=32,t.flags|=4):(e.flags&=-33,t.flags&=-5)}function iI(e,t){return(!e||e&&!e.pendingBranch)&&t&&!t.persisted}function iO(e,t,n=!1){let r=e.children,i=t.children;if(k(r)&&k(i))for(let e=0;e<r.length;e++){let t=r[e],l=i[e];!(1&l.shapeFlag)||l.dynamicChildren||((l.patchFlag<=0||32===l.patchFlag)&&((l=i[e]=lx(i[e])).el=t.el),n||-2===l.patchFlag||iO(t,l)),l.type===i5&&(l.el=t.el)}}function iP(e){if(e)for(let t=0;t<e.length;t++)e[t].flags|=8}let iM=Symbol.for("v-scx"),iD=()=>io(iM);function iL(e,t){return iB(e,null,t)}function i$(e,t){return iB(e,null,{flush:"post"})}function iF(e,t){return iB(e,null,{flush:"sync"})}function iV(e,t,n){return iB(e,t,n)}function iB(e,t,n=h){let r;let{immediate:i,deep:l,flush:s,once:o}=n,a=S({},n),c=t&&i||!t&&"post"!==s;if(lM){if("sync"===s){let e=iD();r=e.__watcherHandles||(e.__watcherHandles=[])}else if(!c){let e=()=>{};return e.stop=g,e.resume=g,e.pause=g,e}}let u=lA;a.call=(e,t,n)=>t3(e,u,t,n);let p=!1;"post"===s?a.scheduler=e=>{ik(e,u&&u.suspense)}:"sync"!==s&&(p=!0,a.scheduler=(e,t)=>{t?e():ni(e)}),a.augmentJob=e=>{t&&(e.flags|=4),p&&(e.flags|=2,u&&(e.id=u.uid,e.i=u))};let f=function(e,t,n=h){let r,i,l,s;let{immediate:o,deep:a,once:c,scheduler:u,augmentJob:p,call:f}=n,m=e=>a?e:tT(e)||!1===a||0===a?t0(e,1):t0(e),y=!1,b=!1;if(tR(e)?(i=()=>e.value,y=tT(e)):tx(e)?(i=()=>m(e),y=!0):k(e)?(b=!0,y=e.some(e=>tx(e)||tT(e)),i=()=>e.map(e=>tR(e)?e.value:tx(e)?m(e):R(e)?f?f(e,2):e():void 0)):i=R(e)?t?f?()=>f(e,2):e:()=>{if(l){eF();try{l()}finally{eV()}}let t=d;d=r;try{return f?f(e,3,[s]):e(s)}finally{d=t}}:g,t&&a){let e=i,t=!0===a?1/0:a;i=()=>t0(e(),t)}let _=ex(),S=()=>{r.stop(),_&&x(_.effects,r)};if(c&&t){let e=t;t=(...t)=>{e(...t),S()}}let C=b?Array(e.length).fill(tQ):tQ,T=e=>{if(1&r.flags&&(r.dirty||e)){if(t){let e=r.run();if(a||y||(b?e.some((e,t)=>G(e,C[t])):G(e,C))){l&&l();let n=d;d=r;try{let n=[e,C===tQ?void 0:b&&C[0]===tQ?[]:C,s];f?f(t,3,n):t(...n),C=e}finally{d=n}}}else r.run()}};return p&&p(T),(r=new ek(i)).scheduler=u?()=>u(T,!1):T,s=e=>tY(e,!1,r),l=r.onStop=()=>{let e=tX.get(r);if(e){if(f)f(e,4);else for(let t of e)t();tX.delete(r)}},t?o?T(!0):C=r.run():u?u(T.bind(null,!0),!0):r.run(),S.pause=r.pause.bind(r),S.resume=r.resume.bind(r),S.stop=S,S}(e,t,a);return lM&&(r?r.push(f):c&&f()),f}function iU(e,t,n){let r;let i=this.proxy,l=I(e)?e.includes(".")?ij(i,e):()=>i[e]:e.bind(i,i);R(t)?r=t:(r=t.handler,n=t);let s=lI(this),o=iB(l,r.bind(i),n);return s(),o}function ij(e,t){let n=t.split(".");return()=>{let t=e;for(let e=0;e<n.length&&t;e++)t=t[n[e]];return t}}function iH(e,t,n=h){let r=lR(),i=q(t),l=K(t),s=iq(e,i),o=tU((s,o)=>{let a,c;let u=h;return iF(()=>{let t=e[i];G(a,t)&&(a=t,o())}),{get:()=>(s(),n.get?n.get(a):a),set(e){let s=n.set?n.set(e):e;if(!G(s,a)&&!(u!==h&&G(e,u)))return;let d=r.vnode.props;d&&(t in d||i in d||l in d)&&(`onUpdate:${t}` in d||`onUpdate:${i}` in d||`onUpdate:${l}` in d)||(a=e,o()),r.emit(`update:${t}`,s),G(e,s)&&G(e,u)&&!G(s,c)&&o(),u=e,c=s}}});return o[Symbol.iterator]=()=>{let e=0;return{next:()=>e<2?{value:e++?s||h:o,done:!1}:{done:!0}}},o}let iq=(e,t)=>"modelValue"===t||"model-value"===t?e.modelModifiers:e[`${t}Modifiers`]||e[`${q(t)}Modifiers`]||e[`${K(t)}Modifiers`];function iW(e,t,...n){let r;if(e.isUnmounted)return;let i=e.vnode.props||h,l=n,s=t.startsWith("update:"),o=s&&iq(i,t.slice(7));o&&(o.trim&&(l=n.map(e=>I(e)?e.trim():e)),o.number&&(l=n.map(Z)));let a=i[r=J(t)]||i[r=J(q(t))];!a&&s&&(a=i[r=J(K(t))]),a&&t3(a,e,6,l);let c=i[r+"Once"];if(c){if(e.emitted){if(e.emitted[r])return}else e.emitted={};e.emitted[r]=!0,t3(c,e,6,l)}}function iK(e,t){return!!(e&&b(t))&&(T(e,(t=t.slice(2).replace(/Once$/,""))[0].toLowerCase()+t.slice(1))||T(e,K(t))||T(e,t))}function iz(e){let t,n;let{type:r,vnode:i,proxy:l,withProxy:s,propsOptions:[o],slots:a,attrs:c,emit:u,render:d,renderCache:p,props:f,data:h,setupState:m,ctx:g,inheritAttrs:y}=e,b=np(e);try{if(4&i.shapeFlag){let e=s||l;t=lS(d.call(e,e,p,f,m,h,g)),n=c}else t=lS(r.length>1?r(f,{attrs:c,slots:a,emit:u}):r(f,null)),n=r.props?c:iJ(c)}catch(n){le.length=0,t4(n,e,1),t=lm(i9)}let S=t;if(n&&!1!==y){let e=Object.keys(n),{shapeFlag:t}=S;e.length&&7&t&&(o&&e.some(_)&&(n=iG(n,o)),S=ly(S,n,!1,!0))}return i.dirs&&((S=ly(S,null,!1,!0)).dirs=S.dirs?S.dirs.concat(i.dirs):i.dirs),i.transition&&nj(S,i.transition),t=S,np(b),t}let iJ=e=>{let t;for(let n in e)("class"===n||"style"===n||b(n))&&((t||(t={}))[n]=e[n]);return t},iG=(e,t)=>{let n={};for(let r in e)_(r)&&r.slice(9) in t||(n[r]=e[r]);return n};function iQ(e,t,n){let r=Object.keys(t);if(r.length!==Object.keys(e).length)return!0;for(let i=0;i<r.length;i++){let l=r[i];if(t[l]!==e[l]&&!iK(n,l))return!0}return!1}function iX({vnode:e,parent:t},n){for(;t;){let r=t.subTree;if(r.suspense&&r.suspense.activeBranch===e&&(r.el=e.el),r===e)(e=t.vnode).el=n,t=t.parent;else break}}let iZ=e=>e.__isSuspense,iY=0,i0={name:"Suspense",__isSuspense:!0,process(e,t,n,r,i,l,s,o,a,c){if(null==e)!function(e,t,n,r,i,l,s,o,a){let{p:c,o:{createElement:u}}=a,d=u("div"),p=e.suspense=i2(e,i,r,t,d,n,l,s,o,a);c(null,p.pendingBranch=e.ssContent,d,null,r,p,l,s),p.deps>0?(i1(e,"onPending"),i1(e,"onFallback"),c(null,e.ssFallback,t,n,r,null,l,s),i4(p,e.ssFallback)):p.resolve(!1,!0)}(t,n,r,i,l,s,o,a,c);else{if(l&&l.deps>0&&!e.suspense.isInFallback){t.suspense=e.suspense,t.suspense.vnode=t,t.el=e.el;return}!function(e,t,n,r,i,l,s,o,{p:a,um:c,o:{createElement:u}}){let d=t.suspense=e.suspense;d.vnode=t,t.el=e.el;let p=t.ssContent,f=t.ssFallback,{activeBranch:h,pendingBranch:m,isInFallback:g,isHydrating:y}=d;if(m)d.pendingBranch=p,lu(p,m)?(a(m,p,d.hiddenContainer,null,i,d,l,s,o),d.deps<=0?d.resolve():g&&!y&&(a(h,f,n,r,i,null,l,s,o),i4(d,f))):(d.pendingId=iY++,y?(d.isHydrating=!1,d.activeBranch=m):c(m,i,d),d.deps=0,d.effects.length=0,d.hiddenContainer=u("div"),g?(a(null,p,d.hiddenContainer,null,i,d,l,s,o),d.deps<=0?d.resolve():(a(h,f,n,r,i,null,l,s,o),i4(d,f))):h&&lu(p,h)?(a(h,p,n,r,i,d,l,s,o),d.resolve(!0)):(a(null,p,d.hiddenContainer,null,i,d,l,s,o),d.deps<=0&&d.resolve()));else if(h&&lu(p,h))a(h,p,n,r,i,d,l,s,o),i4(d,p);else if(i1(t,"onPending"),d.pendingBranch=p,512&p.shapeFlag?d.pendingId=p.component.suspenseId:d.pendingId=iY++,a(null,p,d.hiddenContainer,null,i,d,l,s,o),d.deps<=0)d.resolve();else{let{timeout:e,pendingId:t}=d;e>0?setTimeout(()=>{d.pendingId===t&&d.fallback(f)},e):0===e&&d.fallback(f)}}(e,t,n,r,i,s,o,a,c)}},hydrate:function(e,t,n,r,i,l,s,o,a){let c=t.suspense=i2(t,r,n,e.parentNode,document.createElement("div"),null,i,l,s,o,!0),u=a(e,c.pendingBranch=t.ssContent,n,c,l,s);return 0===c.deps&&c.resolve(!1,!0),u},normalize:function(e){let{shapeFlag:t,children:n}=e,r=32&t;e.ssContent=i6(r?n.default:n),e.ssFallback=r?i6(n.fallback):lm(i9)}};function i1(e,t){let n=e.props&&e.props[t];R(n)&&n()}function i2(e,t,n,r,i,l,s,o,a,c,u=!1){let d;let{p:p,m:f,um:h,n:m,o:{parentNode:g,remove:y}}=c,b=function(e){let t=e.props&&e.props.suspensible;return null!=t&&!1!==t}(e);b&&t&&t.pendingBranch&&(d=t.pendingId,t.deps++);let _=e.props?Y(e.props.timeout):void 0,S=l,x={vnode:e,parent:t,parentComponent:n,namespace:s,container:r,hiddenContainer:i,deps:0,pendingId:iY++,timeout:"number"==typeof _?_:-1,activeBranch:null,pendingBranch:null,isInFallback:!u,isHydrating:u,isUnmounted:!1,effects:[],resolve(e=!1,n=!1){let{vnode:r,activeBranch:i,pendingBranch:s,pendingId:o,effects:a,parentComponent:c,container:u}=x,p=!1;x.isHydrating?x.isHydrating=!1:e||((p=i&&s.transition&&"out-in"===s.transition.mode)&&(i.transition.afterLeave=()=>{o===x.pendingId&&(f(s,u,l===S?m(i):l,0),ns(a))}),i&&(g(i.el)===u&&(l=m(i)),h(i,c,x,!0)),p||f(s,u,l,0)),i4(x,s),x.pendingBranch=null,x.isInFallback=!1;let y=x.parent,_=!1;for(;y;){if(y.pendingBranch){y.effects.push(...a),_=!0;break}y=y.parent}_||p||ns(a),x.effects=[],b&&t&&t.pendingBranch&&d===t.pendingId&&(t.deps--,0!==t.deps||n||t.resolve()),i1(r,"onResolve")},fallback(e){if(!x.pendingBranch)return;let{vnode:t,activeBranch:n,parentComponent:r,container:i,namespace:l}=x;i1(t,"onFallback");let s=m(n),c=()=>{x.isInFallback&&(p(null,e,i,s,r,null,l,o,a),i4(x,e))},u=e.transition&&"out-in"===e.transition.mode;u&&(n.transition.afterLeave=c),x.isInFallback=!0,h(n,r,null,!0),u||c()},move(e,t,n){x.activeBranch&&f(x.activeBranch,e,t,n),x.container=e},next:()=>x.activeBranch&&m(x.activeBranch),registerDep(e,t,n){let r=!!x.pendingBranch;r&&x.deps++;let i=e.vnode.el;e.asyncDep.catch(t=>{t4(t,e,0)}).then(l=>{if(e.isUnmounted||x.isUnmounted||x.pendingId!==e.suspenseId)return;e.asyncResolved=!0;let{vnode:o}=e;lL(e,l,!1),i&&(o.el=i);let a=!i&&e.subTree.el;t(e,o,g(i||e.subTree.el),i?null:m(e.subTree),x,s,n),a&&y(a),iX(e,o.el),r&&0==--x.deps&&x.resolve()})},unmount(e,t){x.isUnmounted=!0,x.activeBranch&&h(x.activeBranch,n,e,t),x.pendingBranch&&h(x.pendingBranch,n,e,t)}};return x}function i6(e){let t;if(R(e)){let n=li&&e._c;n&&(e._d=!1,ln()),e=e(),n&&(e._d=!0,t=lt,lr())}return k(e)&&(e=function(e,t=!0){let n;for(let t=0;t<e.length;t++){let r=e[t];if(!lc(r))return;if(r.type!==i9||"v-if"===r.children){if(n)return;n=r}}return n}(e)),e=lS(e),t&&!e.dynamicChildren&&(e.dynamicChildren=t.filter(t=>t!==e)),e}function i3(e,t){t&&t.pendingBranch?k(e)?t.effects.push(...e):t.effects.push(e):ns(e)}function i4(e,t){e.activeBranch=t;let{vnode:n,parentComponent:r}=e,i=t.el;for(;!i&&t.component;)i=(t=t.component.subTree).el;n.el=i,r&&r.subTree===n&&(r.vnode.el=i,iX(r,i))}let i8=Symbol.for("v-fgt"),i5=Symbol.for("v-txt"),i9=Symbol.for("v-cmt"),i7=Symbol.for("v-stc"),le=[],lt=null;function ln(e=!1){le.push(lt=e?null:[])}function lr(){le.pop(),lt=le[le.length-1]||null}let li=1;function ll(e){li+=e,e<0&&lt&&(lt.hasOnce=!0)}function ls(e){return e.dynamicChildren=li>0?lt||m:null,lr(),li>0&&lt&&lt.push(e),e}function lo(e,t,n,r,i,l){return ls(lh(e,t,n,r,i,l,!0))}function la(e,t,n,r,i){return ls(lm(e,t,n,r,i,!0))}function lc(e){return!!e&&!0===e.__v_isVNode}function lu(e,t){return e.type===t.type&&e.key===t.key}function ld(e){}let lp=({key:e})=>null!=e?e:null,lf=({ref:e,ref_key:t,ref_for:n})=>("number"==typeof e&&(e=""+e),null!=e?I(e)||tR(e)||R(e)?{i:nu,r:e,k:t,f:!!n}:e:null);function lh(e,t=null,n=null,r=0,i=null,l=e===i8?0:1,s=!1,o=!1){let a={__v_isVNode:!0,__v_skip:!0,type:e,props:t,key:t&&lp(t),ref:t&&lf(t),scopeId:nd,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:l,patchFlag:r,dynamicProps:i,dynamicChildren:null,appContext:null,ctx:nu};return o?(lC(a,n),128&l&&e.normalize(a)):n&&(a.shapeFlag|=I(n)?8:16),li>0&&!s&&lt&&(a.patchFlag>0||6&l)&&32!==a.patchFlag&&lt.push(a),a}let lm=function(e,t=null,n=null,r=0,i=null,l=!1){var s;if(e&&e!==rw||(e=i9),lc(e)){let r=ly(e,t,!0);return n&&lC(r,n),li>0&&!l&&lt&&(6&r.shapeFlag?lt[lt.indexOf(e)]=r:lt.push(r)),r.patchFlag=-2,r}if(R(s=e)&&"__vccOpts"in s&&(e=e.__vccOpts),t){let{class:e,style:n}=t=lg(t);e&&!I(e)&&(t.class=eo(e)),P(n)&&(tk(n)&&!k(n)&&(n=S({},n)),t.style=en(n))}let o=I(e)?1:iZ(e)?128:n_(e)?64:P(e)?4:R(e)?2:0;return lh(e,t,n,r,i,o,l,!0)};function lg(e){return e?tk(e)||id(e)?S({},e):e:null}function ly(e,t,n=!1,r=!1){let{props:i,ref:l,patchFlag:s,children:o,transition:a}=e,c=t?lT(i||{},t):i,u={__v_isVNode:!0,__v_skip:!0,type:e.type,props:c,key:c&&lp(c),ref:t&&t.ref?n&&l?k(l)?l.concat(lf(t)):[l,lf(t)]:lf(t):l,scopeId:e.scopeId,slotScopeIds:e.slotScopeIds,children:o,target:e.target,targetStart:e.targetStart,targetAnchor:e.targetAnchor,staticCount:e.staticCount,shapeFlag:e.shapeFlag,patchFlag:t&&e.type!==i8?-1===s?16:16|s:s,dynamicProps:e.dynamicProps,dynamicChildren:e.dynamicChildren,appContext:e.appContext,dirs:e.dirs,transition:a,component:e.component,suspense:e.suspense,ssContent:e.ssContent&&ly(e.ssContent),ssFallback:e.ssFallback&&ly(e.ssFallback),el:e.el,anchor:e.anchor,ctx:e.ctx,ce:e.ce};return a&&r&&nj(u,a.clone(u)),u}function lv(e=" ",t=0){return lm(i5,null,e,t)}function lb(e,t){let n=lm(i7,null,e);return n.staticCount=t,n}function l_(e="",t=!1){return t?(ln(),la(i9,null,e)):lm(i9,null,e)}function lS(e){return null==e||"boolean"==typeof e?lm(i9):k(e)?lm(i8,null,e.slice()):lc(e)?lx(e):lm(i5,null,String(e))}function lx(e){return null===e.el&&-1!==e.patchFlag||e.memo?e:ly(e)}function lC(e,t){let n=0,{shapeFlag:r}=e;if(null==t)t=null;else if(k(t))n=16;else if("object"==typeof t){if(65&r){let n=t.default;n&&(n._c&&(n._d=!1),lC(e,n()),n._c&&(n._d=!0));return}{n=32;let r=t._;r||id(t)?3===r&&nu&&(1===nu.slots._?t._=1:(t._=2,e.patchFlag|=1024)):t._ctx=nu}}else R(t)?(t={default:t,_ctx:nu},n=32):(t=String(t),64&r?(n=16,t=[lv(t)]):n=8);e.children=t,e.shapeFlag|=n}function lT(...e){let t={};for(let n=0;n<e.length;n++){let r=e[n];for(let e in r)if("class"===e)t.class!==r.class&&(t.class=eo([t.class,r.class]));else if("style"===e)t.style=en([t.style,r.style]);else if(b(e)){let n=t[e],i=r[e];i&&n!==i&&!(k(n)&&n.includes(i))&&(t[e]=n?[].concat(n,i):i)}else""!==e&&(t[e]=r[e])}return t}function lk(e,t,n,r=null){t3(e,t,7,[n,r])}let lw=ir(),lN=0;function lE(e,t,n){let r=e.type,i=(t?t.appContext:e.appContext)||lw,l={uid:lN++,vnode:e,type:r,parent:t,appContext:i,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new e_(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:t?t.provides:Object.create(i.provides),ids:t?t.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:function e(t,n,r=!1){let i=r?im:n.propsCache,l=i.get(t);if(l)return l;let s=t.props,o={},a=[],c=!1;if(!R(t)){let i=t=>{c=!0;let[r,i]=e(t,n,!0);S(o,r),i&&a.push(...i)};!r&&n.mixins.length&&n.mixins.forEach(i),t.extends&&i(t.extends),t.mixins&&t.mixins.forEach(i)}if(!s&&!c)return P(t)&&i.set(t,m),m;if(k(s))for(let e=0;e<s.length;e++){let t=q(s[e]);ig(t)&&(o[t]=h)}else if(s)for(let e in s){let t=q(e);if(ig(t)){let n=s[e],r=o[t]=k(n)||R(n)?{type:n}:S({},n),i=r.type,l=!1,c=!0;if(k(i))for(let e=0;e<i.length;++e){let t=i[e],n=R(t)&&t.name;if("Boolean"===n){l=!0;break}"String"===n&&(c=!1)}else l=R(i)&&"Boolean"===i.name;r[0]=l,r[1]=c,(l||T(r,"default"))&&a.push(t)}}let u=[o,a];return P(t)&&i.set(t,u),u}(r,i),emitsOptions:function e(t,n,r=!1){let i=n.emitsCache,l=i.get(t);if(void 0!==l)return l;let s=t.emits,o={},a=!1;if(!R(t)){let i=t=>{let r=e(t,n,!0);r&&(a=!0,S(o,r))};!r&&n.mixins.length&&n.mixins.forEach(i),t.extends&&i(t.extends),t.mixins&&t.mixins.forEach(i)}return s||a?(k(s)?s.forEach(e=>o[e]=null):S(o,s),P(t)&&i.set(t,o),o):(P(t)&&i.set(t,null),null)}(r,i),emit:null,emitted:null,propsDefaults:h,inheritAttrs:r.inheritAttrs,ctx:h,data:h,props:h,attrs:h,slots:h,refs:h,setupState:h,setupContext:null,suspense:n,suspenseId:n?n.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return l.ctx={_:l},l.root=t?t.root:l,l.emit=iW.bind(null,l),e.ce&&e.ce(l),l}let lA=null,lR=()=>lA||nu;{let e=ee(),t=(t,n)=>{let r;return(r=e[t])||(r=e[t]=[]),r.push(n),e=>{r.length>1?r.forEach(t=>t(e)):r[0](e)}};l=t("__VUE_INSTANCE_SETTERS__",e=>lA=e),s=t("__VUE_SSR_SETTERS__",e=>lM=e)}let lI=e=>{let t=lA;return l(e),e.scope.on(),()=>{e.scope.off(),l(t)}},lO=()=>{lA&&lA.scope.off(),l(null)};function lP(e){return 4&e.vnode.shapeFlag}let lM=!1;function lD(e,t=!1,n=!1){t&&s(t);let{props:r,children:i}=e.vnode,l=lP(e);!function(e,t,n,r=!1){let i={},l=iu();for(let n in e.propsDefaults=/* @__PURE__ */Object.create(null),ip(e,t,i,l),e.propsOptions[0])n in i||(i[n]=void 0);n?e.props=r?i:tv(i):e.type.props?e.props=i:e.props=l,e.attrs=l}(e,r,l,t),iC(e,i,n);let o=l?function(e,t){let n=e.type;e.accessCache=/* @__PURE__ */Object.create(null),e.proxy=new Proxy(e.ctx,rV);let{setup:r}=n;if(r){eF();let n=e.setupContext=r.length>1?lU(e):null,i=lI(e),l=t6(r,e,0,[e.props,n]),s=M(l);if(eV(),i(),(s||e.sp)&&!rt(e)&&nK(e),s){if(l.then(lO,lO),t)return l.then(n=>{lL(e,n,t)}).catch(t=>{t4(t,e,0)});e.asyncDep=l}else lL(e,l,t)}else lV(e,t)}(e,t):void 0;return t&&s(!1),o}function lL(e,t,n){R(t)?e.type.__ssrInlineRender?e.ssrRender=t:e.render=t:P(t)&&(e.setupState=tV(t)),lV(e,n)}function l$(e){o=e,a=e=>{e.render._rc&&(e.withProxy=new Proxy(e.ctx,rB))}}let lF=()=>!o;function lV(e,t,n){let r=e.type;if(!e.render){if(!t&&o&&!r.render){let t=r.template||r3(e).template;if(t){let{isCustomElement:n,compilerOptions:i}=e.appContext.config,{delimiters:l,compilerOptions:s}=r,a=S(S({isCustomElement:n,delimiters:l},i),s);r.render=o(t,a)}}e.render=r.render||g,a&&a(e)}{let t=lI(e);eF();try{!function(e){let t=r3(e),n=e.proxy,r=e.ctx;r2=!1,t.beforeCreate&&r6(t.beforeCreate,e,"bc");let{data:i,computed:l,methods:s,watch:o,provide:a,inject:c,created:u,beforeMount:d,mounted:p,beforeUpdate:f,updated:h,activated:m,deactivated:y,beforeDestroy:b,beforeUnmount:_,destroyed:S,unmounted:x,render:C,renderTracked:T,renderTriggered:w,errorCaptured:N,serverPrefetch:E,expose:A,inheritAttrs:O,components:M,directives:D,filters:L}=t;if(c&&function(e,t,n=g){for(let n in k(e)&&(e=r9(e)),e){let r;let i=e[n];tR(r=P(i)?"default"in i?io(i.from||n,i.default,!0):io(i.from||n):io(i))?Object.defineProperty(t,n,{enumerable:!0,configurable:!0,get:()=>r.value,set:e=>r.value=e}):t[n]=r}}(c,r,null),s)for(let e in s){let t=s[e];R(t)&&(r[e]=t.bind(n))}if(i){let t=i.call(n,n);P(t)&&(e.data=ty(t))}if(r2=!0,l)for(let e in l){let t=l[e],i=R(t)?t.bind(n,n):R(t.get)?t.get.bind(n,n):g,s=lq({get:i,set:!R(t)&&R(t.set)?t.set.bind(n):g});Object.defineProperty(r,e,{enumerable:!0,configurable:!0,get:()=>s.value,set:e=>s.value=e})}if(o)for(let e in o)!function e(t,n,r,i){let l=i.includes(".")?ij(r,i):()=>r[i];if(I(t)){let e=n[t];R(e)&&iV(l,e)}else if(R(t))iV(l,t.bind(r));else if(P(t)){if(k(t))t.forEach(t=>e(t,n,r,i));else{let e=R(t.handler)?t.handler.bind(r):n[t.handler];R(e)&&iV(l,e,t)}}}(o[e],r,n,e);if(a){let e=R(a)?a.call(n):a;Reflect.ownKeys(e).forEach(t=>{is(t,e[t])})}function $(e,t){k(t)?t.forEach(t=>e(t.bind(n))):t&&e(t.bind(n))}if(u&&r6(u,e,"c"),$(rh,d),$(rm,p),$(rg,f),$(ry,h),$(ro,m),$(ra,y),$(rC,N),$(rx,T),$(rS,w),$(rv,_),$(rb,x),$(r_,E),k(A)){if(A.length){let t=e.exposed||(e.exposed={});A.forEach(e=>{Object.defineProperty(t,e,{get:()=>n[e],set:t=>n[e]=t})})}else e.exposed||(e.exposed={})}C&&e.render===g&&(e.render=C),null!=O&&(e.inheritAttrs=O),M&&(e.components=M),D&&(e.directives=D),E&&nK(e)}(e)}finally{eV(),t()}}}let lB={get:(e,t)=>(eJ(e,"get",""),e[t])};function lU(e){return{attrs:new Proxy(e.attrs,lB),slots:e.slots,emit:e.emit,expose:t=>{e.exposed=t||{}}}}function lj(e){return e.exposed?e.exposeProxy||(e.exposeProxy=new Proxy(tV(tN(e.exposed)),{get:(t,n)=>n in t?t[n]:n in r$?r$[n](e):void 0,has:(e,t)=>t in e||t in r$})):e.proxy}function lH(e,t=!0){return R(e)?e.displayName||e.name:e.name||t&&e.__name}let lq=(e,t)=>(function(e,t,n=!1){let r,i;return R(e)?r=e:(r=e.get,i=e.set),new tz(r,i,n)})(e,0,lM);function lW(e,t,n){let r=arguments.length;return 2!==r?(r>3?n=Array.prototype.slice.call(arguments,2):3===r&&lc(n)&&(n=[n]),lm(e,t,n)):!P(t)||k(t)?lm(e,null,t):lc(t)?lm(e,null,[t]):lm(e,t)}function lK(){}function lz(e,t,n,r){let i=n[r];if(i&&lJ(i,e))return i;let l=t();return l.memo=e.slice(),l.cacheIndex=r,n[r]=l}function lJ(e,t){let n=e.memo;if(n.length!=t.length)return!1;for(let e=0;e<n.length;e++)if(G(n[e],t[e]))return!1;return li>0&&lt&&lt.push(e),!0}let lG="3.5.12",lQ=g,lX=null,lZ=void 0,lY=g,l0={createComponentInstance:lE,setupComponent:lD,renderComponentRoot:iz,setCurrentRenderingInstance:np,isVNode:lc,normalizeVNode:lS,getComponentPublicInstance:lj,ensureValidVNode:rM,pushWarningContext:function(e){},popWarningContext:function(){}},l1=null,l2=null,l6=null,l3="undefined"!=typeof window&&window.trustedTypes;if(l3)try{p=/* @__PURE__ */l3.createPolicy("vue",{createHTML:e=>e})}catch(e){}let l4=p?e=>p.createHTML(e):e=>e,l8="undefined"!=typeof document?document:null,l5=l8&&/* @__PURE__ */l8.createElement("template"),l9="transition",l7="animation",se=Symbol("_vtc"),st={name:String,type:String,css:{type:Boolean,default:!0},duration:[String,Number,Object],enterFromClass:String,enterActiveClass:String,enterToClass:String,appearFromClass:String,appearActiveClass:String,appearToClass:String,leaveFromClass:String,leaveActiveClass:String,leaveToClass:String},sn=/* @__PURE__ */S({},nM,st),sr=((oS=(e,{slots:t})=>lW(n$,ss(e),t)).displayName="Transition",oS.props=sn,oS),si=(e,t=[])=>{k(e)?e.forEach(e=>e(...t)):e&&e(...t)},sl=e=>!!e&&(k(e)?e.some(e=>e.length>1):e.length>1);function ss(e){let t={};for(let n in e)n in st||(t[n]=e[n]);if(!1===e.css)return t;let{name:n="v",type:r,duration:i,enterFromClass:l=`${n}-enter-from`,enterActiveClass:s=`${n}-enter-active`,enterToClass:o=`${n}-enter-to`,appearFromClass:a=l,appearActiveClass:c=s,appearToClass:u=o,leaveFromClass:d=`${n}-leave-from`,leaveActiveClass:p=`${n}-leave-active`,leaveToClass:f=`${n}-leave-to`}=e,h=function(e){if(null==e)return null;if(P(e))return[Y(e.enter),Y(e.leave)];{let t=Y(e);return[t,t]}}(i),m=h&&h[0],g=h&&h[1],{onBeforeEnter:y,onEnter:b,onEnterCancelled:_,onLeave:x,onLeaveCancelled:C,onBeforeAppear:T=y,onAppear:k=b,onAppearCancelled:w=_}=t,N=(e,t,n)=>{sa(e,t?u:o),sa(e,t?c:s),n&&n()},E=(e,t)=>{e._isLeaving=!1,sa(e,d),sa(e,f),sa(e,p),t&&t()},A=e=>(t,n)=>{let i=e?k:b,s=()=>N(t,e,n);si(i,[t,s]),sc(()=>{sa(t,e?a:l),so(t,e?u:o),sl(i)||sd(t,r,m,s)})};return S(t,{onBeforeEnter(e){si(y,[e]),so(e,l),so(e,s)},onBeforeAppear(e){si(T,[e]),so(e,a),so(e,c)},onEnter:A(!1),onAppear:A(!0),onLeave(e,t){e._isLeaving=!0;let n=()=>E(e,t);so(e,d),so(e,p),sm(),sc(()=>{e._isLeaving&&(sa(e,d),so(e,f),sl(x)||sd(e,r,g,n))}),si(x,[e,n])},onEnterCancelled(e){N(e,!1),si(_,[e])},onAppearCancelled(e){N(e,!0),si(w,[e])},onLeaveCancelled(e){E(e),si(C,[e])}})}function so(e,t){t.split(/\s+/).forEach(t=>t&&e.classList.add(t)),(e[se]||(e[se]=/* @__PURE__ */new Set)).add(t)}function sa(e,t){t.split(/\s+/).forEach(t=>t&&e.classList.remove(t));let n=e[se];n&&(n.delete(t),n.size||(e[se]=void 0))}function sc(e){requestAnimationFrame(()=>{requestAnimationFrame(e)})}let su=0;function sd(e,t,n,r){let i=e._endId=++su,l=()=>{i===e._endId&&r()};if(null!=n)return setTimeout(l,n);let{type:s,timeout:o,propCount:a}=sp(e,t);if(!s)return r();let c=s+"end",u=0,d=()=>{e.removeEventListener(c,p),l()},p=t=>{t.target===e&&++u>=a&&d()};setTimeout(()=>{u<a&&d()},o+1),e.addEventListener(c,p)}function sp(e,t){let n=window.getComputedStyle(e),r=e=>(n[e]||"").split(", "),i=r(`${l9}Delay`),l=r(`${l9}Duration`),s=sf(i,l),o=r(`${l7}Delay`),a=r(`${l7}Duration`),c=sf(o,a),u=null,d=0,p=0;t===l9?s>0&&(u=l9,d=s,p=l.length):t===l7?c>0&&(u=l7,d=c,p=a.length):p=(u=(d=Math.max(s,c))>0?s>c?l9:l7:null)?u===l9?l.length:a.length:0;let f=u===l9&&/\b(transform|all)(,|$)/.test(r(`${l9}Property`).toString());return{type:u,timeout:d,propCount:p,hasTransform:f}}function sf(e,t){for(;e.length<t.length;)e=e.concat(e);return Math.max(...t.map((t,n)=>sh(t)+sh(e[n])))}function sh(e){return"auto"===e?0:1e3*Number(e.slice(0,-1).replace(",","."))}function sm(){return document.body.offsetHeight}let sg=Symbol("_vod"),sy=Symbol("_vsh"),sv={beforeMount(e,{value:t},{transition:n}){e[sg]="none"===e.style.display?"":e.style.display,n&&t?n.beforeEnter(e):sb(e,t)},mounted(e,{value:t},{transition:n}){n&&t&&n.enter(e)},updated(e,{value:t,oldValue:n},{transition:r}){!t!=!n&&(r?t?(r.beforeEnter(e),sb(e,!0),r.enter(e)):r.leave(e,()=>{sb(e,!1)}):sb(e,t))},beforeUnmount(e,{value:t}){sb(e,t)}};function sb(e,t){e.style.display=t?e[sg]:"none",e[sy]=!t}let s_=Symbol("");function sS(e){let t=lR();if(!t)return;let n=t.ut=(n=e(t.proxy))=>{Array.from(document.querySelectorAll(`[data-v-owner="${t.uid}"]`)).forEach(e=>sx(e,n))},r=()=>{let r=e(t.proxy);t.ce?sx(t.ce,r):function e(t,n){if(128&t.shapeFlag){let r=t.suspense;t=r.activeBranch,r.pendingBranch&&!r.isHydrating&&r.effects.push(()=>{e(r.activeBranch,n)})}for(;t.component;)t=t.component.subTree;if(1&t.shapeFlag&&t.el)sx(t.el,n);else if(t.type===i8)t.children.forEach(t=>e(t,n));else if(t.type===i7){let{el:e,anchor:r}=t;for(;e&&(sx(e,n),e!==r);)e=e.nextSibling}}(t.subTree,r),n(r)};rh(()=>{i$(r)}),rm(()=>{let e=new MutationObserver(r);e.observe(t.subTree.el.parentNode,{childList:!0}),rb(()=>e.disconnect())})}function sx(e,t){if(1===e.nodeType){let n=e.style,r="";for(let e in t)n.setProperty(`--${e}`,t[e]),r+=`--${e}: ${t[e]};`;n[s_]=r}}let sC=/(^|;)\s*display\s*:/,sT=/\s*!important$/;function sk(e,t,n){if(k(n))n.forEach(n=>sk(e,t,n));else if(null==n&&(n=""),t.startsWith("--"))e.setProperty(t,n);else{let r=function(e,t){let n=sN[t];if(n)return n;let r=q(t);if("filter"!==r&&r in e)return sN[t]=r;r=z(r);for(let n=0;n<sw.length;n++){let i=sw[n]+r;if(i in e)return sN[t]=i}return t}(e,t);sT.test(n)?e.setProperty(K(r),n.replace(sT,""),"important"):e[r]=n}}let sw=["Webkit","Moz","ms"],sN={},sE="http://www.w3.org/1999/xlink";function sA(e,t,n,r,i,l=ef(t)){r&&t.startsWith("xlink:")?null==n?e.removeAttributeNS(sE,t.slice(6,t.length)):e.setAttributeNS(sE,t,n):null==n||l&&!(n||""===n)?e.removeAttribute(t):e.setAttribute(t,l?"":O(n)?String(n):n)}function sR(e,t,n,r,i){if("innerHTML"===t||"textContent"===t){null!=n&&(e[t]="innerHTML"===t?l4(n):n);return}let l=e.tagName;if("value"===t&&"PROGRESS"!==l&&!l.includes("-")){let r="OPTION"===l?e.getAttribute("value")||"":e.value,i=null==n?"checkbox"===e.type?"on":"":String(n);r===i&&"_value"in e||(e.value=i),null==n&&e.removeAttribute(t),e._value=n;return}let s=!1;if(""===n||null==n){let r=typeof e[t];if("boolean"===r){var o;n=!!(o=n)||""===o}else null==n&&"string"===r?(n="",s=!0):"number"===r&&(n=0,s=!0)}try{e[t]=n}catch(e){}s&&e.removeAttribute(i||t)}function sI(e,t,n,r){e.addEventListener(t,n,r)}let sO=Symbol("_vei"),sP=/(?:Once|Passive|Capture)$/,sM=0,sD=/* @__PURE__ */Promise.resolve(),sL=()=>sM||(sD.then(()=>sM=0),sM=Date.now()),s$=e=>111===e.charCodeAt(0)&&110===e.charCodeAt(1)&&e.charCodeAt(2)>96&&123>e.charCodeAt(2),sF={};/*! #__NO_SIDE_EFFECTS__ */function sV(e,t,n){let r=nq(e,t);F(r)&&S(r,t);class i extends sj{constructor(e){super(r,e,n)}}return i.def=r,i}/*! #__NO_SIDE_EFFECTS__ */let sB=(e,t)=>/* @__PURE__ */sV(e,t,og),sU="undefined"!=typeof HTMLElement?HTMLElement:class{};class sj extends sU{constructor(e,t={},n=om){super(),this._def=e,this._props=t,this._createApp=n,this._isVueCE=!0,this._instance=null,this._app=null,this._nonce=this._def.nonce,this._connected=!1,this._resolved=!1,this._numberProps=null,this._styleChildren=/* @__PURE__ */new WeakSet,this._ob=null,this.shadowRoot&&n!==om?this._root=this.shadowRoot:!1!==e.shadowRoot?(this.attachShadow({mode:"open"}),this._root=this.shadowRoot):this._root=this,this._def.__asyncLoader||this._resolveProps(this._def)}connectedCallback(){if(!this.isConnected)return;this.shadowRoot||this._parseSlots(),this._connected=!0;let e=this;for(;e=e&&(e.parentNode||e.host);)if(e instanceof sj){this._parent=e;break}this._instance||(this._resolved?(this._setParent(),this._update()):e&&e._pendingResolve?this._pendingResolve=e._pendingResolve.then(()=>{this._pendingResolve=void 0,this._resolveDef()}):this._resolveDef())}_setParent(e=this._parent){e&&(this._instance.parent=e._instance,this._instance.provides=e._instance.provides)}disconnectedCallback(){this._connected=!1,nr(()=>{this._connected||(this._ob&&(this._ob.disconnect(),this._ob=null),this._app&&this._app.unmount(),this._instance&&(this._instance.ce=void 0),this._app=this._instance=null)})}_resolveDef(){if(this._pendingResolve)return;for(let e=0;e<this.attributes.length;e++)this._setAttr(this.attributes[e].name);this._ob=new MutationObserver(e=>{for(let t of e)this._setAttr(t.attributeName)}),this._ob.observe(this,{attributes:!0});let e=(e,t=!1)=>{let n;this._resolved=!0,this._pendingResolve=void 0;let{props:r,styles:i}=e;if(r&&!k(r))for(let e in r){let t=r[e];(t===Number||t&&t.type===Number)&&(e in this._props&&(this._props[e]=Y(this._props[e])),(n||(n=/* @__PURE__ */Object.create(null)))[q(e)]=!0)}this._numberProps=n,t&&this._resolveProps(e),this.shadowRoot&&this._applyStyles(i),this._mount(e)},t=this._def.__asyncLoader;t?this._pendingResolve=t().then(t=>e(this._def=t,!0)):e(this._def)}_mount(e){this._app=this._createApp(e),e.configureApp&&e.configureApp(this._app),this._app._ceVNode=this._createVNode(),this._app.mount(this._root);let t=this._instance&&this._instance.exposed;if(t)for(let e in t)T(this,e)||Object.defineProperty(this,e,{get:()=>tL(t[e])})}_resolveProps(e){let{props:t}=e,n=k(t)?t:Object.keys(t||{});for(let e of Object.keys(this))"_"!==e[0]&&n.includes(e)&&this._setProp(e,this[e]);for(let e of n.map(q))Object.defineProperty(this,e,{get(){return this._getProp(e)},set(t){this._setProp(e,t,!0,!0)}})}_setAttr(e){if(e.startsWith("data-v-"))return;let t=this.hasAttribute(e),n=t?this.getAttribute(e):sF,r=q(e);t&&this._numberProps&&this._numberProps[r]&&(n=Y(n)),this._setProp(r,n,!1,!0)}_getProp(e){return this._props[e]}_setProp(e,t,n=!0,r=!1){t!==this._props[e]&&(t===sF?delete this._props[e]:(this._props[e]=t,"key"===e&&this._app&&(this._app._ceVNode.key=t)),r&&this._instance&&this._update(),n&&(!0===t?this.setAttribute(K(e),""):"string"==typeof t||"number"==typeof t?this.setAttribute(K(e),t+""):t||this.removeAttribute(K(e))))}_update(){of(this._createVNode(),this._root)}_createVNode(){let e={};this.shadowRoot||(e.onVnodeMounted=e.onVnodeUpdated=this._renderSlots.bind(this));let t=lm(this._def,S(e,this._props));return this._instance||(t.ce=e=>{this._instance=e,e.ce=this,e.isCE=!0;let t=(e,t)=>{this.dispatchEvent(new CustomEvent(e,F(t[0])?S({detail:t},t[0]):{detail:t}))};e.emit=(e,...n)=>{t(e,n),K(e)!==e&&t(K(e),n)},this._setParent()}),t}_applyStyles(e,t){if(!e)return;if(t){if(t===this._def||this._styleChildren.has(t))return;this._styleChildren.add(t)}let n=this._nonce;for(let t=e.length-1;t>=0;t--){let r=document.createElement("style");n&&r.setAttribute("nonce",n),r.textContent=e[t],this.shadowRoot.prepend(r)}}_parseSlots(){let e;let t=this._slots={};for(;e=this.firstChild;){let n=1===e.nodeType&&e.getAttribute("slot")||"default";(t[n]||(t[n]=[])).push(e),this.removeChild(e)}}_renderSlots(){let e=(this._teleportTarget||this).querySelectorAll("slot"),t=this._instance.type.__scopeId;for(let n=0;n<e.length;n++){let r=e[n],i=r.getAttribute("name")||"default",l=this._slots[i],s=r.parentNode;if(l)for(let e of l){if(t&&1===e.nodeType){let n;let r=t+"-s",i=document.createTreeWalker(e,1);for(e.setAttribute(r,"");n=i.nextNode();)n.setAttribute(r,"")}s.insertBefore(e,r)}else for(;r.firstChild;)s.insertBefore(r.firstChild,r);s.removeChild(r)}}_injectChildStyle(e){this._applyStyles(e.styles,e)}_removeChildStyle(e){}}function sH(e){let t=lR();return t&&t.ce||null}function sq(){let e=sH();return e&&e.shadowRoot}function sW(e="$style"){{let t=lR();if(!t)return h;let n=t.type.__cssModules;return n&&n[e]||h}}let sK=/* @__PURE__ */new WeakMap,sz=/* @__PURE__ */new WeakMap,sJ=Symbol("_moveCb"),sG=Symbol("_enterCb"),sQ=(ox={name:"TransitionGroup",props:/* @__PURE__ */S({},sn,{tag:String,moveClass:String}),setup(e,{slots:t}){let n,r;let i=lR(),l=nO();return ry(()=>{if(!n.length)return;let t=e.moveClass||`${e.name||"v"}-move`;if(!function(e,t,n){let r=e.cloneNode(),i=e[se];i&&i.forEach(e=>{e.split(/\s+/).forEach(e=>e&&r.classList.remove(e))}),n.split(/\s+/).forEach(e=>e&&r.classList.add(e)),r.style.display="none";let l=1===t.nodeType?t:t.parentNode;l.appendChild(r);let{hasTransform:s}=sp(r);return l.removeChild(r),s}(n[0].el,i.vnode.el,t))return;n.forEach(sX),n.forEach(sZ);let r=n.filter(sY);sm(),r.forEach(e=>{let n=e.el,r=n.style;so(n,t),r.transform=r.webkitTransform=r.transitionDuration="";let i=n[sJ]=e=>{(!e||e.target===n)&&(!e||/transform$/.test(e.propertyName))&&(n.removeEventListener("transitionend",i),n[sJ]=null,sa(n,t))};n.addEventListener("transitionend",i)})}),()=>{let s=tw(e),o=ss(s),a=s.tag||i8;if(n=[],r)for(let e=0;e<r.length;e++){let t=r[e];t.el&&t.el instanceof Element&&(n.push(t),nj(t,nV(t,o,l,i)),sK.set(t,t.el.getBoundingClientRect()))}r=t.default?nH(t.default()):[];for(let e=0;e<r.length;e++){let t=r[e];null!=t.key&&nj(t,nV(t,o,l,i))}return lm(a,null,r)}}},delete ox.props.mode,ox);function sX(e){let t=e.el;t[sJ]&&t[sJ](),t[sG]&&t[sG]()}function sZ(e){sz.set(e,e.el.getBoundingClientRect())}function sY(e){let t=sK.get(e),n=sz.get(e),r=t.left-n.left,i=t.top-n.top;if(r||i){let t=e.el.style;return t.transform=t.webkitTransform=`translate(${r}px,${i}px)`,t.transitionDuration="0s",e}}let s0=e=>{let t=e.props["onUpdate:modelValue"]||!1;return k(t)?e=>Q(t,e):t};function s1(e){e.target.composing=!0}function s2(e){let t=e.target;t.composing&&(t.composing=!1,t.dispatchEvent(new Event("input")))}let s6=Symbol("_assign"),s3={created(e,{modifiers:{lazy:t,trim:n,number:r}},i){e[s6]=s0(i);let l=r||i.props&&"number"===i.props.type;sI(e,t?"change":"input",t=>{if(t.target.composing)return;let r=e.value;n&&(r=r.trim()),l&&(r=Z(r)),e[s6](r)}),n&&sI(e,"change",()=>{e.value=e.value.trim()}),t||(sI(e,"compositionstart",s1),sI(e,"compositionend",s2),sI(e,"change",s2))},mounted(e,{value:t}){e.value=null==t?"":t},beforeUpdate(e,{value:t,oldValue:n,modifiers:{lazy:r,trim:i,number:l}},s){if(e[s6]=s0(s),e.composing)return;let o=(l||"number"===e.type)&&!/^0\d/.test(e.value)?Z(e.value):e.value,a=null==t?"":t;o===a||document.activeElement===e&&"range"!==e.type&&(r&&t===n||i&&e.value.trim()===a)||(e.value=a)}},s4={deep:!0,created(e,t,n){e[s6]=s0(n),sI(e,"change",()=>{let t=e._modelValue,n=oe(e),r=e.checked,i=e[s6];if(k(t)){let e=em(t,n),l=-1!==e;if(r&&!l)i(t.concat(n));else if(!r&&l){let n=[...t];n.splice(e,1),i(n)}}else if(N(t)){let e=new Set(t);r?e.add(n):e.delete(n),i(e)}else i(ot(e,r))})},mounted:s8,beforeUpdate(e,t,n){e[s6]=s0(n),s8(e,t,n)}};function s8(e,{value:t,oldValue:n},r){let i;if(e._modelValue=t,k(t))i=em(t,r.props.value)>-1;else if(N(t))i=t.has(r.props.value);else{if(t===n)return;i=eh(t,ot(e,!0))}e.checked!==i&&(e.checked=i)}let s5={created(e,{value:t},n){e.checked=eh(t,n.props.value),e[s6]=s0(n),sI(e,"change",()=>{e[s6](oe(e))})},beforeUpdate(e,{value:t,oldValue:n},r){e[s6]=s0(r),t!==n&&(e.checked=eh(t,r.props.value))}},s9={deep:!0,created(e,{value:t,modifiers:{number:n}},r){let i=N(t);sI(e,"change",()=>{let t=Array.prototype.filter.call(e.options,e=>e.selected).map(e=>n?Z(oe(e)):oe(e));e[s6](e.multiple?i?new Set(t):t:t[0]),e._assigning=!0,nr(()=>{e._assigning=!1})}),e[s6]=s0(r)},mounted(e,{value:t}){s7(e,t)},beforeUpdate(e,t,n){e[s6]=s0(n)},updated(e,{value:t}){e._assigning||s7(e,t)}};function s7(e,t){let n=e.multiple,r=k(t);if(!n||r||N(t)){for(let i=0,l=e.options.length;i<l;i++){let l=e.options[i],s=oe(l);if(n){if(r){let e=typeof s;"string"===e||"number"===e?l.selected=t.some(e=>String(e)===String(s)):l.selected=em(t,s)>-1}else l.selected=t.has(s)}else if(eh(oe(l),t)){e.selectedIndex!==i&&(e.selectedIndex=i);return}}n||-1===e.selectedIndex||(e.selectedIndex=-1)}}function oe(e){return"_value"in e?e._value:e.value}function ot(e,t){let n=t?"_trueValue":"_falseValue";return n in e?e[n]:t}let on={created(e,t,n){oi(e,t,n,null,"created")},mounted(e,t,n){oi(e,t,n,null,"mounted")},beforeUpdate(e,t,n,r){oi(e,t,n,r,"beforeUpdate")},updated(e,t,n,r){oi(e,t,n,r,"updated")}};function or(e,t){switch(e){case"SELECT":return s9;case"TEXTAREA":return s3;default:switch(t){case"checkbox":return s4;case"radio":return s5;default:return s3}}}function oi(e,t,n,r,i){let l=or(e.tagName,n.props&&n.props.type)[i];l&&l(e,t,n,r)}let ol=["ctrl","shift","alt","meta"],os={stop:e=>e.stopPropagation(),prevent:e=>e.preventDefault(),self:e=>e.target!==e.currentTarget,ctrl:e=>!e.ctrlKey,shift:e=>!e.shiftKey,alt:e=>!e.altKey,meta:e=>!e.metaKey,left:e=>"button"in e&&0!==e.button,middle:e=>"button"in e&&1!==e.button,right:e=>"button"in e&&2!==e.button,exact:(e,t)=>ol.some(n=>e[`${n}Key`]&&!t.includes(n))},oo=(e,t)=>{let n=e._withMods||(e._withMods={}),r=t.join(".");return n[r]||(n[r]=(n,...r)=>{for(let e=0;e<t.length;e++){let r=os[t[e]];if(r&&r(n,t))return}return e(n,...r)})},oa={esc:"escape",space:" ",up:"arrow-up",left:"arrow-left",right:"arrow-right",down:"arrow-down",delete:"backspace"},oc=(e,t)=>{let n=e._withKeys||(e._withKeys={}),r=t.join(".");return n[r]||(n[r]=n=>{if(!("key"in n))return;let r=K(n.key);if(t.some(e=>e===r||oa[e]===r))return e(n)})},ou=/* @__PURE__ */S({patchProp:(e,t,n,r,i,l)=>{let s="svg"===i;"class"===t?function(e,t,n){let r=e[se];r&&(t=(t?[t,...r]:[...r]).join(" ")),null==t?e.removeAttribute("class"):n?e.setAttribute("class",t):e.className=t}(e,r,s):"style"===t?function(e,t,n){let r=e.style,i=I(n),l=!1;if(n&&!i){if(t){if(I(t))for(let e of t.split(";")){let t=e.slice(0,e.indexOf(":")).trim();null==n[t]&&sk(r,t,"")}else for(let e in t)null==n[e]&&sk(r,e,"")}for(let e in n)"display"===e&&(l=!0),sk(r,e,n[e])}else if(i){if(t!==n){let e=r[s_];e&&(n+=";"+e),r.cssText=n,l=sC.test(n)}}else t&&e.removeAttribute("style");sg in e&&(e[sg]=l?r.display:"",e[sy]&&(r.display="none"))}(e,n,r):b(t)?_(t)||function(e,t,n,r,i=null){let l=e[sO]||(e[sO]={}),s=l[t];if(r&&s)s.value=r;else{let[n,o]=function(e){let t;if(sP.test(e)){let n;for(t={};n=e.match(sP);)e=e.slice(0,e.length-n[0].length),t[n[0].toLowerCase()]=!0}return[":"===e[2]?e.slice(3):K(e.slice(2)),t]}(t);r?sI(e,n,l[t]=function(e,t){let n=e=>{if(e._vts){if(e._vts<=n.attached)return}else e._vts=Date.now();t3(function(e,t){if(!k(t))return t;{let n=e.stopImmediatePropagation;return e.stopImmediatePropagation=()=>{n.call(e),e._stopped=!0},t.map(e=>t=>!t._stopped&&e&&e(t))}}(e,n.value),t,5,[e])};return n.value=e,n.attached=sL(),n}(r,i),o):s&&(!function(e,t,n,r){e.removeEventListener(t,n,r)}(e,n,s,o),l[t]=void 0)}}(e,t,0,r,l):("."===t[0]?(t=t.slice(1),0):"^"===t[0]?(t=t.slice(1),1):!function(e,t,n,r){if(r)return!!("innerHTML"===t||"textContent"===t||t in e&&s$(t)&&R(n));if("spellcheck"===t||"draggable"===t||"translate"===t||"form"===t||"list"===t&&"INPUT"===e.tagName||"type"===t&&"TEXTAREA"===e.tagName)return!1;if("width"===t||"height"===t){let t=e.tagName;if("IMG"===t||"VIDEO"===t||"CANVAS"===t||"SOURCE"===t)return!1}return!(s$(t)&&I(n))&&t in e}(e,t,r,s))?e._isVueCE&&(/[A-Z]/.test(t)||!I(r))?sR(e,q(t),r,l,t):("true-value"===t?e._trueValue=r:"false-value"===t&&(e._falseValue=r),sA(e,t,r,s)):(sR(e,t,r),e.tagName.includes("-")||"value"!==t&&"checked"!==t&&"selected"!==t||sA(e,t,r,s,l,"value"!==t))}},{insert:(e,t,n)=>{t.insertBefore(e,n||null)},remove:e=>{let t=e.parentNode;t&&t.removeChild(e)},createElement:(e,t,n,r)=>{let i="svg"===t?l8.createElementNS("http://www.w3.org/2000/svg",e):"mathml"===t?l8.createElementNS("http://www.w3.org/1998/Math/MathML",e):n?l8.createElement(e,{is:n}):l8.createElement(e);return"select"===e&&r&&null!=r.multiple&&i.setAttribute("multiple",r.multiple),i},createText:e=>l8.createTextNode(e),createComment:e=>l8.createComment(e),setText:(e,t)=>{e.nodeValue=t},setElementText:(e,t)=>{e.textContent=t},parentNode:e=>e.parentNode,nextSibling:e=>e.nextSibling,querySelector:e=>l8.querySelector(e),setScopeId(e,t){e.setAttribute(t,"")},insertStaticContent(e,t,n,r,i,l){let s=n?n.previousSibling:t.lastChild;if(i&&(i===l||i.nextSibling))for(;t.insertBefore(i.cloneNode(!0),n),i!==l&&(i=i.nextSibling););else{l5.innerHTML=l4("svg"===r?`<svg>${e}</svg>`:"mathml"===r?`<math>${e}</math>`:e);let i=l5.content;if("svg"===r||"mathml"===r){let e=i.firstChild;for(;e.firstChild;)i.appendChild(e.firstChild);i.removeChild(e)}t.insertBefore(i,n)}return[s?s.nextSibling:t.firstChild,n?n.previousSibling:t.lastChild]}}),od=!1;function op(){return c=od?c:iN(ou),od=!0,c}let of=(...e)=>{(c||(c=iw(ou))).render(...e)},oh=(...e)=>{op().hydrate(...e)},om=(...e)=>{let t=(c||(c=iw(ou))).createApp(...e),{mount:n}=t;return t.mount=e=>{let r=ov(e);if(!r)return;let i=t._component;R(i)||i.render||i.template||(i.template=r.innerHTML),1===r.nodeType&&(r.textContent="");let l=n(r,!1,oy(r));return r instanceof Element&&(r.removeAttribute("v-cloak"),r.setAttribute("data-v-app","")),l},t},og=(...e)=>{let t=op().createApp(...e),{mount:n}=t;return t.mount=e=>{let t=ov(e);if(t)return n(t,!0,oy(t))},t};function oy(e){return e instanceof SVGElement?"svg":"function"==typeof MathMLElement&&e instanceof MathMLElement?"mathml":void 0}function ov(e){return I(e)?document.querySelector(e):e}let ob=!1,o_=()=>{ob||(ob=!0,s3.getSSRProps=({value:e})=>({value:e}),s5.getSSRProps=({value:e},t)=>{if(t.props&&eh(t.props.value,e))return{checked:!0}},s4.getSSRProps=({value:e},t)=>{if(k(e)){if(t.props&&em(e,t.props.value)>-1)return{checked:!0}}else if(N(e)){if(t.props&&e.has(t.props.value))return{checked:!0}}else if(e)return{checked:!0}},on.getSSRProps=(e,t)=>{if("string"!=typeof t.type)return;let n=or(t.type.toUpperCase(),t.props&&t.props.type);if(n.getSSRProps)return n.getSSRProps(e,t)},sv.getSSRProps=({value:e})=>{if(!e)return{style:{display:"none"}}})};var oS,ox,oC=/*#__PURE__*/Object.freeze({__proto__:null,BaseTransition:n$,BaseTransitionPropsValidators:nM,Comment:i9,DeprecationTypes:l6,EffectScope:e_,ErrorCodes:t2,ErrorTypeStrings:lX,Fragment:i8,KeepAlive:rl,ReactiveEffect:ek,Static:i7,Suspense:i0,Teleport:nN,Text:i5,TrackOpTypes:tJ,Transition:sr,TransitionGroup:sQ,TriggerOpTypes:tG,VueElement:sj,assertNumber:t1,callWithAsyncErrorHandling:t3,callWithErrorHandling:t6,camelize:q,capitalize:z,cloneVNode:ly,compatUtils:l2,computed:lq,createApp:om,createBlock:la,createCommentVNode:l_,createElementBlock:lo,createElementVNode:lh,createHydrationRenderer:iN,createPropsRestProxy:r0,createRenderer:iw,createSSRApp:og,createSlots:rO,createStaticVNode:lb,createTextVNode:lv,createVNode:lm,customRef:tU,defineAsyncComponent:rn,defineComponent:nq,defineCustomElement:sV,defineEmits:rj,defineExpose:rH,defineModel:rK,defineOptions:rq,defineProps:rU,defineSSRCustomElement:sB,defineSlots:rW,devtools:lZ,effect:eM,effectScope:eS,getCurrentInstance:lR,getCurrentScope:ex,getCurrentWatcher:tZ,getTransitionRawChildren:nH,guardReactiveProps:lg,h:lW,handleError:t4,hasInjectionContext:ia,hydrate:oh,hydrateOnIdle:n5,hydrateOnInteraction:re,hydrateOnMediaQuery:n7,hydrateOnVisible:n9,initCustomFormatter:lK,initDirectivesForSSR:o_,inject:io,isMemoSame:lJ,isProxy:tk,isReactive:tx,isReadonly:tC,isRef:tR,isRuntimeOnly:lF,isShallow:tT,isVNode:lc,markRaw:tN,mergeDefaults:rZ,mergeModels:rY,mergeProps:lT,nextTick:nr,normalizeClass:eo,normalizeProps:ea,normalizeStyle:en,onActivated:ro,onBeforeMount:rh,onBeforeUnmount:rv,onBeforeUpdate:rg,onDeactivated:ra,onErrorCaptured:rC,onMounted:rm,onRenderTracked:rx,onRenderTriggered:rS,onScopeDispose:eC,onServerPrefetch:r_,onUnmounted:rb,onUpdated:ry,onWatcherCleanup:tY,openBlock:ln,popScopeId:nh,provide:is,proxyRefs:tV,pushScopeId:nf,queuePostFlushCb:ns,reactive:ty,readonly:tb,ref:tI,registerRuntimeCompiler:l$,render:of,renderList:rI,renderSlot:rP,resolveComponent:rk,resolveDirective:rE,resolveDynamicComponent:rN,resolveFilter:l1,resolveTransitionHooks:nV,setBlockTracking:ll,setDevtoolsHook:lY,setTransitionHooks:nj,shallowReactive:tv,shallowReadonly:t_,shallowRef:tO,ssrContextKey:iM,ssrUtils:l0,stop:eD,toDisplayString:ey,toHandlerKey:J,toHandlers:rD,toRaw:tw,toRef:tW,toRefs:tj,toValue:t$,transformVNodeArgs:ld,triggerRef:tD,unref:tL,useAttrs:rG,useCssModule:sW,useCssVars:sS,useHost:sH,useId:nW,useModel:iH,useSSRContext:iD,useShadowRoot:sq,useSlots:rJ,useTemplateRef:nz,useTransitionState:nO,vModelCheckbox:s4,vModelDynamic:on,vModelRadio:s5,vModelSelect:s9,vModelText:s3,vShow:sv,version:lG,warn:lQ,watch:iV,watchEffect:iL,watchPostEffect:i$,watchSyncEffect:iF,withAsyncContext:r1,withCtx:ng,withDefaults:rz,withDirectives:ny,withKeys:oc,withMemo:lz,withModifiers:oo,withScopeId:nm});let oT=Symbol(""),ok=Symbol(""),ow=Symbol(""),oN=Symbol(""),oE=Symbol(""),oA=Symbol(""),oR=Symbol(""),oI=Symbol(""),oO=Symbol(""),oP=Symbol(""),oM=Symbol(""),oD=Symbol(""),oL=Symbol(""),o$=Symbol(""),oF=Symbol(""),oV=Symbol(""),oB=Symbol(""),oU=Symbol(""),oj=Symbol(""),oH=Symbol(""),oq=Symbol(""),oW=Symbol(""),oK=Symbol(""),oz=Symbol(""),oJ=Symbol(""),oG=Symbol(""),oQ=Symbol(""),oX=Symbol(""),oZ=Symbol(""),oY=Symbol(""),o0=Symbol(""),o1=Symbol(""),o2=Symbol(""),o6=Symbol(""),o3=Symbol(""),o4=Symbol(""),o8=Symbol(""),o5=Symbol(""),o9=Symbol(""),o7={[oT]:"Fragment",[ok]:"Teleport",[ow]:"Suspense",[oN]:"KeepAlive",[oE]:"BaseTransition",[oA]:"openBlock",[oR]:"createBlock",[oI]:"createElementBlock",[oO]:"createVNode",[oP]:"createElementVNode",[oM]:"createCommentVNode",[oD]:"createTextVNode",[oL]:"createStaticVNode",[o$]:"resolveComponent",[oF]:"resolveDynamicComponent",[oV]:"resolveDirective",[oB]:"resolveFilter",[oU]:"withDirectives",[oj]:"renderList",[oH]:"renderSlot",[oq]:"createSlots",[oW]:"toDisplayString",[oK]:"mergeProps",[oz]:"normalizeClass",[oJ]:"normalizeStyle",[oG]:"normalizeProps",[oQ]:"guardReactiveProps",[oX]:"toHandlers",[oZ]:"camelize",[oY]:"capitalize",[o0]:"toHandlerKey",[o1]:"setBlockTracking",[o2]:"pushScopeId",[o6]:"popScopeId",[o3]:"withCtx",[o4]:"unref",[o8]:"isRef",[o5]:"withMemo",[o9]:"isMemoSame"},ae={start:{line:1,column:1,offset:0},end:{line:1,column:1,offset:0},source:""};function at(e,t,n,r,i,l,s,o=!1,a=!1,c=!1,u=ae){return e&&(o?(e.helper(oA),e.helper(e.inSSR||c?oR:oI)):e.helper(e.inSSR||c?oO:oP),s&&e.helper(oU)),{type:13,tag:t,props:n,children:r,patchFlag:i,dynamicProps:l,directives:s,isBlock:o,disableTracking:a,isComponent:c,loc:u}}function an(e,t=ae){return{type:17,loc:t,elements:e}}function ar(e,t=ae){return{type:15,loc:t,properties:e}}function ai(e,t){return{type:16,loc:ae,key:I(e)?al(e,!0):e,value:t}}function al(e,t=!1,n=ae,r=0){return{type:4,loc:n,content:e,isStatic:t,constType:t?3:r}}function as(e,t=ae){return{type:8,loc:t,children:e}}function ao(e,t=[],n=ae){return{type:14,loc:n,callee:e,arguments:t}}function aa(e,t,n=!1,r=!1,i=ae){return{type:18,params:e,returns:t,newline:n,isSlot:r,loc:i}}function ac(e,t,n,r=!0){return{type:19,test:e,consequent:t,alternate:n,newline:r,loc:ae}}function au(e,{helper:t,removeHelper:n,inSSR:r}){if(!e.isBlock){var i,l;e.isBlock=!0,n((i=e.isComponent,r||i?oO:oP)),t(oA),t((l=e.isComponent,r||l?oR:oI))}}let ad=new Uint8Array([123,123]),ap=new Uint8Array([125,125]);function af(e){return e>=97&&e<=122||e>=65&&e<=90}function ah(e){return 32===e||10===e||9===e||12===e||13===e}function am(e){return 47===e||62===e||ah(e)}function ag(e){let t=new Uint8Array(e.length);for(let n=0;n<e.length;n++)t[n]=e.charCodeAt(n);return t}let ay={Cdata:new Uint8Array([67,68,65,84,65,91]),CdataEnd:new Uint8Array([93,93,62]),CommentEnd:new Uint8Array([45,45,62]),ScriptEnd:new Uint8Array([60,47,115,99,114,105,112,116]),StyleEnd:new Uint8Array([60,47,115,116,121,108,101]),TitleEnd:new Uint8Array([60,47,116,105,116,108,101]),TextareaEnd:new Uint8Array([60,47,116,101,120,116,97,114,101,97])};function av(e){throw e}function ab(e){}function /*@__PURE__*/a_(e,t,n,r){let i=SyntaxError(String(`https://vuejs.org/error-reference/#compiler-${e}`));return i.code=e,i.loc=t,i}let aS=e=>4===e.type&&e.isStatic;function ax(e){switch(e){case"Teleport":case"teleport":return ok;case"Suspense":case"suspense":return ow;case"KeepAlive":case"keep-alive":return oN;case"BaseTransition":case"base-transition":return oE}}let aC=/^\d|[^\$\w\xA0-\uFFFF]/,aT=e=>!aC.test(e),ak=/[A-Za-z_$\xA0-\uFFFF]/,aw=/[\.\?\w$\xA0-\uFFFF]/,aN=/\s+[.[]\s*|\s*[.[]\s+/g,aE=e=>4===e.type?e.content:e.loc.source,aA=e=>{let t=aE(e).trim().replace(aN,e=>e.trim()),n=0,r=[],i=0,l=0,s=null;for(let e=0;e<t.length;e++){let o=t.charAt(e);switch(n){case 0:if("["===o)r.push(n),n=1,i++;else if("("===o)r.push(n),n=2,l++;else if(!(0===e?ak:aw).test(o))return!1;break;case 1:"'"===o||'"'===o||"`"===o?(r.push(n),n=3,s=o):"["===o?i++:"]"!==o||--i||(n=r.pop());break;case 2:if("'"===o||'"'===o||"`"===o)r.push(n),n=3,s=o;else if("("===o)l++;else if(")"===o){if(e===t.length-1)return!1;--l||(n=r.pop())}break;case 3:o===s&&(n=r.pop(),s=null)}}return!i&&!l},aR=/^\s*(async\s*)?(\([^)]*?\)|[\w$_]+)\s*(:[^=]+)?=>|^\s*(async\s+)?function(?:\s+[\w$]+)?\s*\(/,aI=e=>aR.test(aE(e));function aO(e,t,n=!1){for(let r=0;r<e.props.length;r++){let i=e.props[r];if(7===i.type&&(n||i.exp)&&(I(t)?i.name===t:t.test(i.name)))return i}}function aP(e,t,n=!1,r=!1){for(let i=0;i<e.props.length;i++){let l=e.props[i];if(6===l.type){if(n)continue;if(l.name===t&&(l.value||r))return l}else if("bind"===l.name&&(l.exp||r)&&aM(l.arg,t))return l}}function aM(e,t){return!!(e&&aS(e)&&e.content===t)}function aD(e){return 5===e.type||2===e.type}function aL(e){return 7===e.type&&"slot"===e.name}function a$(e){return 1===e.type&&3===e.tagType}function aF(e){return 1===e.type&&2===e.tagType}let aV=/* @__PURE__ */new Set([oG,oQ]);function aB(e,t,n){let r,i;let l=13===e.type?e.props:e.arguments[2],s=[];if(l&&!I(l)&&14===l.type){let e=function e(t,n=[]){if(t&&!I(t)&&14===t.type){let r=t.callee;if(!I(r)&&aV.has(r))return e(t.arguments[0],n.concat(t))}return[t,n]}(l);l=e[0],i=(s=e[1])[s.length-1]}if(null==l||I(l))r=ar([t]);else if(14===l.type){let e=l.arguments[0];I(e)||15!==e.type?l.callee===oX?r=ao(n.helper(oK),[ar([t]),l]):l.arguments.unshift(ar([t])):aU(t,e)||e.properties.unshift(t),r||(r=l)}else 15===l.type?(aU(t,l)||l.properties.unshift(t),r=l):(r=ao(n.helper(oK),[ar([t]),l]),i&&i.callee===oQ&&(i=s[s.length-2]));13===e.type?i?i.arguments[0]=r:e.props=r:i?i.arguments[0]=r:e.arguments[2]=r}function aU(e,t){let n=!1;if(4===e.key.type){let r=e.key.content;n=t.properties.some(e=>4===e.key.type&&e.key.content===r)}return n}function aj(e,t){return`_${t}_${e.replace(/[^\w]/g,(t,n)=>"-"===t?"_":e.charCodeAt(n).toString())}`}let aH=/([\s\S]*?)\s+(?:in|of)\s+(\S[\s\S]*)/,aq={parseMode:"base",ns:0,delimiters:["{{","}}"],getNamespace:()=>0,isVoidTag:y,isPreTag:y,isIgnoreNewlineTag:y,isCustomElement:y,onError:av,onWarn:ab,comments:!1,prefixIdentifiers:!1},aW=aq,aK=null,az="",aJ=null,aG=null,aQ="",aX=-1,aZ=-1,aY=0,a0=!1,a1=null,a2=[],a6=new class{constructor(e,t){this.stack=e,this.cbs=t,this.state=1,this.buffer="",this.sectionStart=0,this.index=0,this.entityStart=0,this.baseState=1,this.inRCDATA=!1,this.inXML=!1,this.inVPre=!1,this.newlines=[],this.mode=0,this.delimiterOpen=ad,this.delimiterClose=ap,this.delimiterIndex=-1,this.currentSequence=void 0,this.sequenceIndex=0}get inSFCRoot(){return 2===this.mode&&0===this.stack.length}reset(){this.state=1,this.mode=0,this.buffer="",this.sectionStart=0,this.index=0,this.baseState=1,this.inRCDATA=!1,this.currentSequence=void 0,this.newlines.length=0,this.delimiterOpen=ad,this.delimiterClose=ap}getPos(e){let t=1,n=e+1;for(let r=this.newlines.length-1;r>=0;r--){let i=this.newlines[r];if(e>i){t=r+2,n=e-i;break}}return{column:n,line:t,offset:e}}peek(){return this.buffer.charCodeAt(this.index+1)}stateText(e){60===e?(this.index>this.sectionStart&&this.cbs.ontext(this.sectionStart,this.index),this.state=5,this.sectionStart=this.index):this.inVPre||e!==this.delimiterOpen[0]||(this.state=2,this.delimiterIndex=0,this.stateInterpolationOpen(e))}stateInterpolationOpen(e){if(e===this.delimiterOpen[this.delimiterIndex]){if(this.delimiterIndex===this.delimiterOpen.length-1){let e=this.index+1-this.delimiterOpen.length;e>this.sectionStart&&this.cbs.ontext(this.sectionStart,e),this.state=3,this.sectionStart=e}else this.delimiterIndex++}else this.inRCDATA?(this.state=32,this.stateInRCDATA(e)):(this.state=1,this.stateText(e))}stateInterpolation(e){e===this.delimiterClose[0]&&(this.state=4,this.delimiterIndex=0,this.stateInterpolationClose(e))}stateInterpolationClose(e){e===this.delimiterClose[this.delimiterIndex]?this.delimiterIndex===this.delimiterClose.length-1?(this.cbs.oninterpolation(this.sectionStart,this.index+1),this.inRCDATA?this.state=32:this.state=1,this.sectionStart=this.index+1):this.delimiterIndex++:(this.state=3,this.stateInterpolation(e))}stateSpecialStartSequence(e){let t=this.sequenceIndex===this.currentSequence.length;if(t?am(e):(32|e)===this.currentSequence[this.sequenceIndex]){if(!t){this.sequenceIndex++;return}}else this.inRCDATA=!1;this.sequenceIndex=0,this.state=6,this.stateInTagName(e)}stateInRCDATA(e){if(this.sequenceIndex===this.currentSequence.length){if(62===e||ah(e)){let t=this.index-this.currentSequence.length;if(this.sectionStart<t){let e=this.index;this.index=t,this.cbs.ontext(this.sectionStart,t),this.index=e}this.sectionStart=t+2,this.stateInClosingTagName(e),this.inRCDATA=!1;return}this.sequenceIndex=0}(32|e)===this.currentSequence[this.sequenceIndex]?this.sequenceIndex+=1:0===this.sequenceIndex?this.currentSequence!==ay.TitleEnd&&(this.currentSequence!==ay.TextareaEnd||this.inSFCRoot)?this.fastForwardTo(60)&&(this.sequenceIndex=1):this.inVPre||e!==this.delimiterOpen[0]||(this.state=2,this.delimiterIndex=0,this.stateInterpolationOpen(e)):this.sequenceIndex=Number(60===e)}stateCDATASequence(e){e===ay.Cdata[this.sequenceIndex]?++this.sequenceIndex===ay.Cdata.length&&(this.state=28,this.currentSequence=ay.CdataEnd,this.sequenceIndex=0,this.sectionStart=this.index+1):(this.sequenceIndex=0,this.state=23,this.stateInDeclaration(e))}fastForwardTo(e){for(;++this.index<this.buffer.length;){let t=this.buffer.charCodeAt(this.index);if(10===t&&this.newlines.push(this.index),t===e)return!0}return this.index=this.buffer.length-1,!1}stateInCommentLike(e){e===this.currentSequence[this.sequenceIndex]?++this.sequenceIndex===this.currentSequence.length&&(this.currentSequence===ay.CdataEnd?this.cbs.oncdata(this.sectionStart,this.index-2):this.cbs.oncomment(this.sectionStart,this.index-2),this.sequenceIndex=0,this.sectionStart=this.index+1,this.state=1):0===this.sequenceIndex?this.fastForwardTo(this.currentSequence[0])&&(this.sequenceIndex=1):e!==this.currentSequence[this.sequenceIndex-1]&&(this.sequenceIndex=0)}startSpecial(e,t){this.enterRCDATA(e,t),this.state=31}enterRCDATA(e,t){this.inRCDATA=!0,this.currentSequence=e,this.sequenceIndex=t}stateBeforeTagName(e){33===e?(this.state=22,this.sectionStart=this.index+1):63===e?(this.state=24,this.sectionStart=this.index+1):af(e)?(this.sectionStart=this.index,0===this.mode?this.state=6:this.inSFCRoot?this.state=34:this.inXML?this.state=6:116===e?this.state=30:this.state=115===e?29:6):47===e?this.state=8:(this.state=1,this.stateText(e))}stateInTagName(e){am(e)&&this.handleTagName(e)}stateInSFCRootTagName(e){if(am(e)){let t=this.buffer.slice(this.sectionStart,this.index);"template"!==t&&this.enterRCDATA(ag("</"+t),0),this.handleTagName(e)}}handleTagName(e){this.cbs.onopentagname(this.sectionStart,this.index),this.sectionStart=-1,this.state=11,this.stateBeforeAttrName(e)}stateBeforeClosingTagName(e){ah(e)||(62===e?(this.state=1,this.sectionStart=this.index+1):(this.state=af(e)?9:27,this.sectionStart=this.index))}stateInClosingTagName(e){(62===e||ah(e))&&(this.cbs.onclosetag(this.sectionStart,this.index),this.sectionStart=-1,this.state=10,this.stateAfterClosingTagName(e))}stateAfterClosingTagName(e){62===e&&(this.state=1,this.sectionStart=this.index+1)}stateBeforeAttrName(e){62===e?(this.cbs.onopentagend(this.index),this.inRCDATA?this.state=32:this.state=1,this.sectionStart=this.index+1):47===e?this.state=7:60===e&&47===this.peek()?(this.cbs.onopentagend(this.index),this.state=5,this.sectionStart=this.index):ah(e)||this.handleAttrStart(e)}handleAttrStart(e){118===e&&45===this.peek()?(this.state=13,this.sectionStart=this.index):46===e||58===e||64===e||35===e?(this.cbs.ondirname(this.index,this.index+1),this.state=14,this.sectionStart=this.index+1):(this.state=12,this.sectionStart=this.index)}stateInSelfClosingTag(e){62===e?(this.cbs.onselfclosingtag(this.index),this.state=1,this.sectionStart=this.index+1,this.inRCDATA=!1):ah(e)||(this.state=11,this.stateBeforeAttrName(e))}stateInAttrName(e){(61===e||am(e))&&(this.cbs.onattribname(this.sectionStart,this.index),this.handleAttrNameEnd(e))}stateInDirName(e){61===e||am(e)?(this.cbs.ondirname(this.sectionStart,this.index),this.handleAttrNameEnd(e)):58===e?(this.cbs.ondirname(this.sectionStart,this.index),this.state=14,this.sectionStart=this.index+1):46===e&&(this.cbs.ondirname(this.sectionStart,this.index),this.state=16,this.sectionStart=this.index+1)}stateInDirArg(e){61===e||am(e)?(this.cbs.ondirarg(this.sectionStart,this.index),this.handleAttrNameEnd(e)):91===e?this.state=15:46===e&&(this.cbs.ondirarg(this.sectionStart,this.index),this.state=16,this.sectionStart=this.index+1)}stateInDynamicDirArg(e){93===e?this.state=14:(61===e||am(e))&&(this.cbs.ondirarg(this.sectionStart,this.index+1),this.handleAttrNameEnd(e))}stateInDirModifier(e){61===e||am(e)?(this.cbs.ondirmodifier(this.sectionStart,this.index),this.handleAttrNameEnd(e)):46===e&&(this.cbs.ondirmodifier(this.sectionStart,this.index),this.sectionStart=this.index+1)}handleAttrNameEnd(e){this.sectionStart=this.index,this.state=17,this.cbs.onattribnameend(this.index),this.stateAfterAttrName(e)}stateAfterAttrName(e){61===e?this.state=18:47===e||62===e?(this.cbs.onattribend(0,this.sectionStart),this.sectionStart=-1,this.state=11,this.stateBeforeAttrName(e)):ah(e)||(this.cbs.onattribend(0,this.sectionStart),this.handleAttrStart(e))}stateBeforeAttrValue(e){34===e?(this.state=19,this.sectionStart=this.index+1):39===e?(this.state=20,this.sectionStart=this.index+1):ah(e)||(this.sectionStart=this.index,this.state=21,this.stateInAttrValueNoQuotes(e))}handleInAttrValue(e,t){(e===t||this.fastForwardTo(t))&&(this.cbs.onattribdata(this.sectionStart,this.index),this.sectionStart=-1,this.cbs.onattribend(34===t?3:2,this.index+1),this.state=11)}stateInAttrValueDoubleQuotes(e){this.handleInAttrValue(e,34)}stateInAttrValueSingleQuotes(e){this.handleInAttrValue(e,39)}stateInAttrValueNoQuotes(e){ah(e)||62===e?(this.cbs.onattribdata(this.sectionStart,this.index),this.sectionStart=-1,this.cbs.onattribend(1,this.index),this.state=11,this.stateBeforeAttrName(e)):(39===e||60===e||61===e||96===e)&&this.cbs.onerr(18,this.index)}stateBeforeDeclaration(e){91===e?(this.state=26,this.sequenceIndex=0):this.state=45===e?25:23}stateInDeclaration(e){(62===e||this.fastForwardTo(62))&&(this.state=1,this.sectionStart=this.index+1)}stateInProcessingInstruction(e){(62===e||this.fastForwardTo(62))&&(this.cbs.onprocessinginstruction(this.sectionStart,this.index),this.state=1,this.sectionStart=this.index+1)}stateBeforeComment(e){45===e?(this.state=28,this.currentSequence=ay.CommentEnd,this.sequenceIndex=2,this.sectionStart=this.index+1):this.state=23}stateInSpecialComment(e){(62===e||this.fastForwardTo(62))&&(this.cbs.oncomment(this.sectionStart,this.index),this.state=1,this.sectionStart=this.index+1)}stateBeforeSpecialS(e){e===ay.ScriptEnd[3]?this.startSpecial(ay.ScriptEnd,4):e===ay.StyleEnd[3]?this.startSpecial(ay.StyleEnd,4):(this.state=6,this.stateInTagName(e))}stateBeforeSpecialT(e){e===ay.TitleEnd[3]?this.startSpecial(ay.TitleEnd,4):e===ay.TextareaEnd[3]?this.startSpecial(ay.TextareaEnd,4):(this.state=6,this.stateInTagName(e))}startEntity(){}stateInEntity(){}parse(e){for(this.buffer=e;this.index<this.buffer.length;){let e=this.buffer.charCodeAt(this.index);switch(10===e&&this.newlines.push(this.index),this.state){case 1:this.stateText(e);break;case 2:this.stateInterpolationOpen(e);break;case 3:this.stateInterpolation(e);break;case 4:this.stateInterpolationClose(e);break;case 31:this.stateSpecialStartSequence(e);break;case 32:this.stateInRCDATA(e);break;case 26:this.stateCDATASequence(e);break;case 19:this.stateInAttrValueDoubleQuotes(e);break;case 12:this.stateInAttrName(e);break;case 13:this.stateInDirName(e);break;case 14:this.stateInDirArg(e);break;case 15:this.stateInDynamicDirArg(e);break;case 16:this.stateInDirModifier(e);break;case 28:this.stateInCommentLike(e);break;case 27:this.stateInSpecialComment(e);break;case 11:this.stateBeforeAttrName(e);break;case 6:this.stateInTagName(e);break;case 34:this.stateInSFCRootTagName(e);break;case 9:this.stateInClosingTagName(e);break;case 5:this.stateBeforeTagName(e);break;case 17:this.stateAfterAttrName(e);break;case 20:this.stateInAttrValueSingleQuotes(e);break;case 18:this.stateBeforeAttrValue(e);break;case 8:this.stateBeforeClosingTagName(e);break;case 10:this.stateAfterClosingTagName(e);break;case 29:this.stateBeforeSpecialS(e);break;case 30:this.stateBeforeSpecialT(e);break;case 21:this.stateInAttrValueNoQuotes(e);break;case 7:this.stateInSelfClosingTag(e);break;case 23:this.stateInDeclaration(e);break;case 22:this.stateBeforeDeclaration(e);break;case 25:this.stateBeforeComment(e);break;case 24:this.stateInProcessingInstruction(e);break;case 33:this.stateInEntity()}this.index++}this.cleanup(),this.finish()}cleanup(){this.sectionStart!==this.index&&(1===this.state||32===this.state&&0===this.sequenceIndex?(this.cbs.ontext(this.sectionStart,this.index),this.sectionStart=this.index):(19===this.state||20===this.state||21===this.state)&&(this.cbs.onattribdata(this.sectionStart,this.index),this.sectionStart=this.index))}finish(){this.handleTrailingData(),this.cbs.onend()}handleTrailingData(){let e=this.buffer.length;this.sectionStart>=e||(28===this.state?this.currentSequence===ay.CdataEnd?this.cbs.oncdata(this.sectionStart,e):this.cbs.oncomment(this.sectionStart,e):6===this.state||11===this.state||18===this.state||17===this.state||12===this.state||13===this.state||14===this.state||15===this.state||16===this.state||20===this.state||19===this.state||21===this.state||9===this.state||this.cbs.ontext(this.sectionStart,e))}emitCodePoint(e,t){}}(a2,{onerr:cc,ontext(e,t){a9(a8(e,t),e,t)},ontextentity(e,t,n){a9(e,t,n)},oninterpolation(e,t){if(a0)return a9(a8(e,t),e,t);let n=e+a6.delimiterOpen.length,r=t-a6.delimiterClose.length;for(;ah(az.charCodeAt(n));)n++;for(;ah(az.charCodeAt(r-1));)r--;let i=a8(n,r);i.includes("&")&&(i=aW.decodeEntities(i,!1)),cl({type:5,content:ca(i,!1,cs(n,r)),loc:cs(e,t)})},onopentagname(e,t){let n=a8(e,t);aJ={type:1,tag:n,ns:aW.getNamespace(n,a2[0],aW.ns),tagType:0,props:[],children:[],loc:cs(e-1,t),codegenNode:void 0}},onopentagend(e){a5(e)},onclosetag(e,t){let n=a8(e,t);if(!aW.isVoidTag(n)){let r=!1;for(let e=0;e<a2.length;e++)if(a2[e].tag.toLowerCase()===n.toLowerCase()){r=!0,e>0&&/* @__PURE__ *//*@__PURE__*/a2[0].loc.start.offset;for(let n=0;n<=e;n++)a7(a2.shift(),t,n<e);break}r||/* @__PURE__ *//*@__PURE__*/ce(e,60)}},onselfclosingtag(e){let t=aJ.tag;aJ.isSelfClosing=!0,a5(e),a2[0]&&a2[0].tag===t&&a7(a2.shift(),e)},onattribname(e,t){aG={type:6,name:a8(e,t),nameLoc:cs(e,t),value:void 0,loc:cs(e)}},ondirname(e,t){let n=a8(e,t),r="."===n||":"===n?"bind":"@"===n?"on":"#"===n?"slot":n.slice(2);if(a0||""===r)aG={type:6,name:n,nameLoc:cs(e,t),value:void 0,loc:cs(e)};else if(aG={type:7,name:r,rawName:n,exp:void 0,arg:void 0,modifiers:"."===n?[al("prop")]:[],loc:cs(e)},"pre"===r){a0=a6.inVPre=!0,a1=aJ;let e=aJ.props;for(let t=0;t<e.length;t++)7===e[t].type&&(e[t]=function(e){let t={type:6,name:e.rawName,nameLoc:cs(e.loc.start.offset,e.loc.start.offset+e.rawName.length),value:void 0,loc:e.loc};if(e.exp){let n=e.exp.loc;n.end.offset<e.loc.end.offset&&(n.start.offset--,n.start.column--,n.end.offset++,n.end.column++),t.value={type:2,content:e.exp.content,loc:n}}return t}(e[t]))}},ondirarg(e,t){if(e===t)return;let n=a8(e,t);if(a0)aG.name+=n,co(aG.nameLoc,t);else{let r="["!==n[0];aG.arg=ca(r?n:n.slice(1,-1),r,cs(e,t),r?3:0)}},ondirmodifier(e,t){let n=a8(e,t);if(a0)aG.name+="."+n,co(aG.nameLoc,t);else if("slot"===aG.name){let e=aG.arg;e&&(e.content+="."+n,co(e.loc,t))}else{let r=al(n,!0,cs(e,t));aG.modifiers.push(r)}},onattribdata(e,t){aQ+=a8(e,t),aX<0&&(aX=e),aZ=t},onattribentity(e,t,n){aQ+=e,aX<0&&(aX=t),aZ=n},onattribnameend(e){let t=a8(aG.loc.start.offset,e);7===aG.type&&(aG.rawName=t),aJ.props.some(e=>(7===e.type?e.rawName:e.name)===t)},onattribend(e,t){aJ&&aG&&(co(aG.loc,t),0!==e&&(aQ.includes("&")&&(aQ=aW.decodeEntities(aQ,!0)),6===aG.type?("class"===aG.name&&(aQ=ci(aQ).trim()),aG.value={type:2,content:aQ,loc:1===e?cs(aX,aZ):cs(aX-1,aZ+1)},a6.inSFCRoot&&"template"===aJ.tag&&"lang"===aG.name&&aQ&&"html"!==aQ&&a6.enterRCDATA(ag("</template"),0)):(aG.exp=ca(aQ,!1,cs(aX,aZ),0,0),"for"===aG.name&&(aG.forParseResult=function(e){let t=e.loc,n=e.content,r=n.match(aH);if(!r)return;let[,i,l]=r,s=(e,n,r=!1)=>{let i=t.start.offset+n,l=i+e.length;return ca(e,!1,cs(i,l),0,r?1:0)},o={source:s(l.trim(),n.indexOf(l,i.length)),value:void 0,key:void 0,index:void 0,finalized:!1},a=i.trim().replace(a4,"").trim(),c=i.indexOf(a),u=a.match(a3);if(u){let e;a=a.replace(a3,"").trim();let t=u[1].trim();if(t&&(e=n.indexOf(t,c+a.length),o.key=s(t,e,!0)),u[2]){let r=u[2].trim();r&&(o.index=s(r,n.indexOf(r,o.key?e+t.length:c+a.length),!0))}}return a&&(o.value=s(a,c,!0)),o}(aG.exp)))),(7!==aG.type||"pre"!==aG.name)&&aJ.props.push(aG)),aQ="",aX=aZ=-1},oncomment(e,t){aW.comments&&cl({type:3,content:a8(e,t),loc:cs(e-4,t+3)})},onend(){let e=az.length;for(let t=0;t<a2.length;t++)a7(a2[t],e-1),/* @__PURE__ *//*@__PURE__*/a2[t].loc.start.offset},oncdata(e,t){0!==a2[0].ns&&a9(a8(e,t),e,t)},onprocessinginstruction(e){(a2[0]?a2[0].ns:aW.ns)===0&&cc(21,e-1)}}),a3=/,([^,\}\]]*)(?:,([^,\}\]]*))?$/,a4=/^\(|\)$/g;function a8(e,t){return az.slice(e,t)}function a5(e){a6.inSFCRoot&&(aJ.innerLoc=cs(e+1,e+1)),cl(aJ);let{tag:t,ns:n}=aJ;0===n&&aW.isPreTag(t)&&aY++,aW.isVoidTag(t)?a7(aJ,e):(a2.unshift(aJ),(1===n||2===n)&&(a6.inXML=!0)),aJ=null}function a9(e,t,n){{let t=a2[0]&&a2[0].tag;"script"!==t&&"style"!==t&&e.includes("&")&&(e=aW.decodeEntities(e,!1))}let r=a2[0]||aK,i=r.children[r.children.length-1];i&&2===i.type?(i.content+=e,co(i.loc,n)):r.children.push({type:2,content:e,loc:cs(t,n)})}function a7(e,t,n=!1){n?co(e.loc,ce(t,60)):co(e.loc,function(e,t){let n=e;for(;62!==az.charCodeAt(n)&&n<az.length-1;)n++;return n}(t,0)+1),a6.inSFCRoot&&(e.children.length?e.innerLoc.end=S({},e.children[e.children.length-1].loc.end):e.innerLoc.end=S({},e.innerLoc.start),e.innerLoc.source=a8(e.innerLoc.start.offset,e.innerLoc.end.offset));let{tag:r,ns:i,children:l}=e;if(!a0&&("slot"===r?e.tagType=2:function({tag:e,props:t}){if("template"===e){for(let e=0;e<t.length;e++)if(7===t[e].type&&ct.has(t[e].name))return!0}return!1}(e)?e.tagType=3:function({tag:e,props:t}){var n;if(aW.isCustomElement(e))return!1;if("component"===e||(n=e.charCodeAt(0))>64&&n<91||ax(e)||aW.isBuiltInComponent&&aW.isBuiltInComponent(e)||aW.isNativeTag&&!aW.isNativeTag(e))return!0;for(let e=0;e<t.length;e++){let n=t[e];if(6===n.type&&"is"===n.name&&n.value&&n.value.content.startsWith("vue:"))return!0}return!1}(e)&&(e.tagType=1)),a6.inRCDATA||(e.children=cr(l)),0===i&&aW.isIgnoreNewlineTag(r)){let e=l[0];e&&2===e.type&&(e.content=e.content.replace(/^\r?\n/,""))}0===i&&aW.isPreTag(r)&&aY--,a1===e&&(a0=a6.inVPre=!1,a1=null),a6.inXML&&(a2[0]?a2[0].ns:aW.ns)===0&&(a6.inXML=!1)}function ce(e,t){let n=e;for(;az.charCodeAt(n)!==t&&n>=0;)n--;return n}let ct=/* @__PURE__ */new Set(["if","else","else-if","for","slot"]),cn=/\r\n/g;function cr(e,t){let n="preserve"!==aW.whitespace,r=!1;for(let t=0;t<e.length;t++){let i=e[t];if(2===i.type){if(aY)i.content=i.content.replace(cn,"\n");else if(function(e){for(let t=0;t<e.length;t++)if(!ah(e.charCodeAt(t)))return!1;return!0}(i.content)){let l=e[t-1]&&e[t-1].type,s=e[t+1]&&e[t+1].type;!l||!s||n&&(3===l&&(3===s||1===s)||1===l&&(3===s||1===s&&function(e){for(let t=0;t<e.length;t++){let n=e.charCodeAt(t);if(10===n||13===n)return!0}return!1}(i.content)))?(r=!0,e[t]=null):i.content=" "}else n&&(i.content=ci(i.content))}}return r?e.filter(Boolean):e}function ci(e){let t="",n=!1;for(let r=0;r<e.length;r++)ah(e.charCodeAt(r))?n||(t+=" ",n=!0):(t+=e[r],n=!1);return t}function cl(e){(a2[0]||aK).children.push(e)}function cs(e,t){return{start:a6.getPos(e),end:null==t?t:a6.getPos(t),source:null==t?t:a8(e,t)}}function co(e,t){e.end=a6.getPos(t),e.source=a8(e.start.offset,t)}function ca(e,t=!1,n,r=0,i=0){return al(e,t,n,r)}function /*@__PURE__*/cc(e,t,n){aW.onError(/* @__PURE__ *//*@__PURE__*/a_(e,cs(t,t)))}function cu(e,t){let{children:n}=e;return 1===n.length&&1===t.type&&!aF(t)}function cd(e,t){let{constantCache:n}=t;switch(e.type){case 1:if(0!==e.tagType)return 0;let r=n.get(e);if(void 0!==r)return r;let i=e.codegenNode;if(13!==i.type||i.isBlock&&"svg"!==e.tag&&"foreignObject"!==e.tag&&"math"!==e.tag)return 0;if(void 0!==i.patchFlag)return n.set(e,0),0;{let r=3,c=cf(e,t);if(0===c)return n.set(e,0),0;c<r&&(r=c);for(let i=0;i<e.children.length;i++){let l=cd(e.children[i],t);if(0===l)return n.set(e,0),0;l<r&&(r=l)}if(r>1)for(let i=0;i<e.props.length;i++){let l=e.props[i];if(7===l.type&&"bind"===l.name&&l.exp){let i=cd(l.exp,t);if(0===i)return n.set(e,0),0;i<r&&(r=i)}}if(i.isBlock){var l,s,o,a;for(let t=0;t<e.props.length;t++)if(7===e.props[t].type)return n.set(e,0),0;t.removeHelper(oA),t.removeHelper((l=t.inSSR,s=i.isComponent,l||s?oR:oI)),i.isBlock=!1,t.helper((o=t.inSSR,a=i.isComponent,o||a?oO:oP))}return n.set(e,r),r}case 2:case 3:return 3;case 9:case 11:case 10:default:return 0;case 5:case 12:return cd(e.content,t);case 4:return e.constType;case 8:let c=3;for(let n=0;n<e.children.length;n++){let r=e.children[n];if(I(r)||O(r))continue;let i=cd(r,t);if(0===i)return 0;i<c&&(c=i)}return c;case 20:return 2}}let cp=/* @__PURE__ */new Set([oz,oJ,oG,oQ]);function cf(e,t){let n=3,r=ch(e);if(r&&15===r.type){let{properties:e}=r;for(let r=0;r<e.length;r++){let i;let{key:l,value:s}=e[r],o=cd(l,t);if(0===o)return o;if(o<n&&(n=o),0===(i=4===s.type?cd(s,t):14===s.type?function e(t,n){if(14===t.type&&!I(t.callee)&&cp.has(t.callee)){let r=t.arguments[0];if(4===r.type)return cd(r,n);if(14===r.type)return e(r,n)}return 0}(s,t):0))return i;i<n&&(n=i)}}return n}function ch(e){let t=e.codegenNode;if(13===t.type)return t.props}function cm(e,t){t.currentNode=e;let{nodeTransforms:n}=t,r=[];for(let i=0;i<n.length;i++){let l=n[i](e,t);if(l&&(k(l)?r.push(...l):r.push(l)),!t.currentNode)return;e=t.currentNode}switch(e.type){case 3:t.ssr||t.helper(oM);break;case 5:t.ssr||t.helper(oW);break;case 9:for(let n=0;n<e.branches.length;n++)cm(e.branches[n],t);break;case 10:case 11:case 1:case 0:!function(e,t){let n=0,r=()=>{n--};for(;n<e.children.length;n++){let i=e.children[n];I(i)||(t.grandParent=t.parent,t.parent=e,t.childIndex=n,t.onNodeRemoved=r,cm(i,t))}}(e,t)}t.currentNode=e;let i=r.length;for(;i--;)r[i]()}function cg(e,t){let n=I(e)?t=>t===e:t=>e.test(t);return(e,r)=>{if(1===e.type){let{props:i}=e;if(3===e.tagType&&i.some(aL))return;let l=[];for(let s=0;s<i.length;s++){let o=i[s];if(7===o.type&&n(o.name)){i.splice(s,1),s--;let n=t(e,o,r);n&&l.push(n)}}return l}}}let cy="/*@__PURE__*/",cv=e=>`${o7[e]}: _${o7[e]}`;function cb(e,t,{helper:n,push:r,newline:i,isTS:l}){let s=n("component"===t?o$:oV);for(let n=0;n<e.length;n++){let o=e[n],a=o.endsWith("__self");a&&(o=o.slice(0,-6)),r(`const ${aj(o,t)} = ${s}(${JSON.stringify(o)}${a?", true":""})${l?"!":""}`),n<e.length-1&&i()}}function c_(e,t){let n=e.length>3;t.push("["),n&&t.indent(),cS(e,t,n),n&&t.deindent(),t.push("]")}function cS(e,t,n=!1,r=!0){let{push:i,newline:l}=t;for(let s=0;s<e.length;s++){let o=e[s];I(o)?i(o,-3):k(o)?c_(o,t):cx(o,t),s<e.length-1&&(n?(r&&i(","),l()):r&&i(", "))}}function cx(e,t){if(I(e)){t.push(e,-3);return}if(O(e)){t.push(t.helper(e));return}switch(e.type){case 1:case 9:case 11:case 12:cx(e.codegenNode,t);break;case 2:!function(e,t){t.push(JSON.stringify(e.content),-3,e)}(e,t);break;case 4:cC(e,t);break;case 5:!function(e,t){let{push:n,helper:r,pure:i}=t;i&&n(cy),n(`${r(oW)}(`),cx(e.content,t),n(")")}(e,t);break;case 8:cT(e,t);break;case 3:!function(e,t){let{push:n,helper:r,pure:i}=t;i&&n(cy),n(`${r(oM)}(${JSON.stringify(e.content)})`,-3,e)}(e,t);break;case 13:!function(e,t){let n;let{push:r,helper:i,pure:l}=t,{tag:s,props:o,children:a,patchFlag:c,dynamicProps:u,directives:d,isBlock:p,disableTracking:f,isComponent:h}=e;c&&(n=String(c)),d&&r(i(oU)+"("),p&&r(`(${i(oA)}(${f?"true":""}), `),l&&r(cy),r(i(p?t.inSSR||h?oR:oI:t.inSSR||h?oO:oP)+"(",-2,e),cS(function(e){let t=e.length;for(;t--&&null==e[t];);return e.slice(0,t+1).map(e=>e||"null")}([s,o,a,n,u]),t),r(")"),p&&r(")"),d&&(r(", "),cx(d,t),r(")"))}(e,t);break;case 14:!function(e,t){let{push:n,helper:r,pure:i}=t,l=I(e.callee)?e.callee:r(e.callee);i&&n(cy),n(l+"(",-2,e),cS(e.arguments,t),n(")")}(e,t);break;case 15:!function(e,t){let{push:n,indent:r,deindent:i,newline:l}=t,{properties:s}=e;if(!s.length){n("{}",-2,e);return}let o=s.length>1;n(o?"{":"{ "),o&&r();for(let e=0;e<s.length;e++){let{key:r,value:i}=s[e];!function(e,t){let{push:n}=t;8===e.type?(n("["),cT(e,t),n("]")):e.isStatic?n(aT(e.content)?e.content:JSON.stringify(e.content),-2,e):n(`[${e.content}]`,-3,e)}(r,t),n(": "),cx(i,t),e<s.length-1&&(n(","),l())}o&&i(),n(o?"}":" }")}(e,t);break;case 17:c_(e.elements,t);break;case 18:!function(e,t){let{push:n,indent:r,deindent:i}=t,{params:l,returns:s,body:o,newline:a,isSlot:c}=e;c&&n(`_${o7[o3]}(`),n("(",-2,e),k(l)?cS(l,t):l&&cx(l,t),n(") => "),(a||o)&&(n("{"),r()),s?(a&&n("return "),k(s)?c_(s,t):cx(s,t)):o&&cx(o,t),(a||o)&&(i(),n("}")),c&&n(")")}(e,t);break;case 19:!function(e,t){let{test:n,consequent:r,alternate:i,newline:l}=e,{push:s,indent:o,deindent:a,newline:c}=t;if(4===n.type){let e=!aT(n.content);e&&s("("),cC(n,t),e&&s(")")}else s("("),cx(n,t),s(")");l&&o(),t.indentLevel++,l||s(" "),s("? "),cx(r,t),t.indentLevel--,l&&c(),l||s(" "),s(": ");let u=19===i.type;!u&&t.indentLevel++,cx(i,t),!u&&t.indentLevel--,l&&a(!0)}(e,t);break;case 20:!function(e,t){let{push:n,helper:r,indent:i,deindent:l,newline:s}=t,{needPauseTracking:o,needArraySpread:a}=e;a&&n("[...("),n(`_cache[${e.index}] || (`),o&&(i(),n(`${r(o1)}(-1),`),s(),n("(")),n(`_cache[${e.index}] = `),cx(e.value,t),o&&(n(`).cacheIndex = ${e.index},`),s(),n(`${r(o1)}(1),`),s(),n(`_cache[${e.index}]`),l()),n(")"),a&&n(")]")}(e,t);break;case 21:cS(e.body,t,!0,!1)}}function cC(e,t){let{content:n,isStatic:r}=e;t.push(r?JSON.stringify(n):n,-3,e)}function cT(e,t){for(let n=0;n<e.children.length;n++){let r=e.children[n];I(r)?t.push(r,-3):cx(r,t)}}let ck=cg(/^(if|else|else-if)$/,(e,t,n)=>(function(e,t,n,r){if("else"!==t.name&&(!t.exp||!t.exp.content.trim())){let r=t.exp?t.exp.loc:e.loc;n.onError(/* @__PURE__ *//*@__PURE__*/a_(28,t.loc)),t.exp=al("true",!1,r)}if("if"===t.name){var i;let l=cw(e,t),s={type:9,loc:cs((i=e.loc).start.offset,i.end.offset),branches:[l]};if(n.replaceNode(s),r)return r(s,l,!0)}else{let i=n.parent.children,l=i.indexOf(e);for(;l-- >=-1;){let s=i[l];if(s&&3===s.type||s&&2===s.type&&!s.content.trim().length){n.removeNode(s);continue}if(s&&9===s.type){"else-if"===t.name&&void 0===s.branches[s.branches.length-1].condition&&n.onError(/* @__PURE__ *//*@__PURE__*/a_(30,e.loc)),n.removeNode();let i=cw(e,t);s.branches.push(i);let l=r&&r(s,i,!1);cm(i,n),l&&l(),n.currentNode=null}else n.onError(/* @__PURE__ *//*@__PURE__*/a_(30,e.loc));break}}})(e,t,n,(e,t,r)=>{let i=n.parent.children,l=i.indexOf(e),s=0;for(;l-- >=0;){let e=i[l];e&&9===e.type&&(s+=e.branches.length)}return()=>{r?e.codegenNode=cN(t,s,n):function(e){for(;;)if(19===e.type){if(19!==e.alternate.type)return e;e=e.alternate}else 20===e.type&&(e=e.value)}(e.codegenNode).alternate=cN(t,s+e.branches.length-1,n)}}));function cw(e,t){let n=3===e.tagType;return{type:10,loc:e.loc,condition:"else"===t.name?void 0:t.exp,children:n&&!aO(e,"for")?e.children:[e],userKey:aP(e,"key"),isTemplateIf:n}}function cN(e,t,n){return e.condition?ac(e.condition,cE(e,t,n),ao(n.helper(oM),['""',"true"])):cE(e,t,n)}function cE(e,t,n){let{helper:r}=n,i=ai("key",al(`${t}`,!1,ae,2)),{children:l}=e,s=l[0];if(1!==l.length||1!==s.type){if(1!==l.length||11!==s.type)return at(n,r(oT),ar([i]),l,64,void 0,void 0,!0,!1,!1,e.loc);{let e=s.codegenNode;return aB(e,i,n),e}}{let e=s.codegenNode,t=14===e.type&&e.callee===o5?e.arguments[1].returns:e;return 13===t.type&&au(t,n),aB(t,i,n),e}}let cA=(e,t,n)=>{let{modifiers:r,loc:i}=e,l=e.arg,{exp:s}=e;if(s&&4===s.type&&!s.content.trim()&&(s=void 0),!s){if(4!==l.type||!l.isStatic)return n.onError(a_(52,l.loc)),{props:[ai(l,al("",!0,i))]};cR(e),s=e.exp}return 4!==l.type?(l.children.unshift("("),l.children.push(') || ""')):l.isStatic||(l.content=`${l.content} || ""`),r.some(e=>"camel"===e.content)&&(4===l.type?l.isStatic?l.content=q(l.content):l.content=`${n.helperString(oZ)}(${l.content})`:(l.children.unshift(`${n.helperString(oZ)}(`),l.children.push(")"))),!n.inSSR&&(r.some(e=>"prop"===e.content)&&cI(l,"."),r.some(e=>"attr"===e.content)&&cI(l,"^")),{props:[ai(l,s)]}},cR=(e,t)=>{let n=e.arg,r=q(n.content);e.exp=al(r,!1,n.loc)},cI=(e,t)=>{4===e.type?e.isStatic?e.content=t+e.content:e.content=`\`${t}\${${e.content}}\``:(e.children.unshift(`'${t}' + (`),e.children.push(")"))},cO=cg("for",(e,t,n)=>{let{helper:r,removeHelper:i}=n;return function(e,t,n,r){if(!t.exp){n.onError(/* @__PURE__ *//*@__PURE__*/a_(31,t.loc));return}let i=t.forParseResult;if(!i){n.onError(/* @__PURE__ *//*@__PURE__*/a_(32,t.loc));return}cP(i);let{addIdentifiers:l,removeIdentifiers:s,scopes:o}=n,{source:a,value:c,key:u,index:d}=i,p={type:11,loc:t.loc,source:a,valueAlias:c,keyAlias:u,objectIndexAlias:d,parseResult:i,children:a$(e)?e.children:[e]};n.replaceNode(p),o.vFor++;let f=r&&r(p);return()=>{o.vFor--,f&&f()}}(e,t,n,t=>{let l=ao(r(oj),[t.source]),s=a$(e),o=aO(e,"memo"),a=aP(e,"key",!1,!0);a&&7===a.type&&!a.exp&&cR(a);let c=a&&(6===a.type?a.value?al(a.value.content,!0):void 0:a.exp),u=a&&c?ai("key",c):null,d=4===t.source.type&&t.source.constType>0,p=d?64:a?128:256;return t.codegenNode=at(n,r(oT),void 0,l,p,void 0,void 0,!0,!d,!1,e.loc),()=>{let a;let{children:p}=t,f=1!==p.length||1!==p[0].type,h=aF(e)?e:s&&1===e.children.length&&aF(e.children[0])?e.children[0]:null;if(h)a=h.codegenNode,s&&u&&aB(a,u,n);else if(f)a=at(n,r(oT),u?ar([u]):void 0,e.children,64,void 0,void 0,!0,void 0,!1);else{var m,g,y,b,_,S,x,C;a=p[0].codegenNode,s&&u&&aB(a,u,n),!d!==a.isBlock&&(a.isBlock?(i(oA),i((m=n.inSSR,g=a.isComponent,m||g?oR:oI))):i((y=n.inSSR,b=a.isComponent,y||b?oO:oP))),(a.isBlock=!d,a.isBlock)?(r(oA),r((_=n.inSSR,S=a.isComponent,_||S?oR:oI))):r((x=n.inSSR,C=a.isComponent,x||C?oO:oP))}if(o){let e=aa(cM(t.parseResult,[al("_cached")]));e.body={type:21,body:[as(["const _memo = (",o.exp,")"]),as(["if (_cached",...c?[" && _cached.key === ",c]:[],` && ${n.helperString(o9)}(_cached, _memo)) return _cached`]),as(["const _item = ",a]),al("_item.memo = _memo"),al("return _item")],loc:ae},l.arguments.push(e,al("_cache"),al(String(n.cached.length))),n.cached.push(null)}else l.arguments.push(aa(cM(t.parseResult),a,!0))}})});function cP(e,t){e.finalized||(e.finalized=!0)}function cM({value:e,key:t,index:n},r=[]){return function(e){let t=e.length;for(;t--&&!e[t];);return e.slice(0,t+1).map((e,t)=>e||al("_".repeat(t+1),!1))}([e,t,n,...r])}let cD=al("undefined",!1),cL=(e,t)=>{if(1===e.type&&(1===e.tagType||3===e.tagType)){let n=aO(e,"slot");if(n)return n.exp,t.scopes.vSlot++,()=>{t.scopes.vSlot--}}},c$=(e,t,n,r)=>aa(e,n,!1,!0,n.length?n[0].loc:r);function cF(e,t,n){let r=[ai("name",e),ai("fn",t)];return null!=n&&r.push(ai("key",al(String(n),!0))),ar(r)}let cV=/* @__PURE__ */new WeakMap,cB=(e,t)=>function(){let n,r,i,l,s;if(!(1===(e=t.currentNode).type&&(0===e.tagType||1===e.tagType)))return;let{tag:o,props:a}=e,c=1===e.tagType,u=c?function(e,t,n=!1){let{tag:r}=e,i=cH(r),l=aP(e,"is",!1,!0);if(l){if(i){let e;if(6===l.type?e=l.value&&al(l.value.content,!0):(e=l.exp)||(e=al("is",!1,l.arg.loc)),e)return ao(t.helper(oF),[e])}else 6===l.type&&l.value.content.startsWith("vue:")&&(r=l.value.content.slice(4))}let s=ax(r)||t.isBuiltInComponent(r);return s?(n||t.helper(s),s):(t.helper(o$),t.components.add(r),aj(r,"component"))}(e,t):`"${o}"`,d=P(u)&&u.callee===oF,p=0,f=d||u===ok||u===ow||!c&&("svg"===o||"foreignObject"===o||"math"===o);if(a.length>0){let r=cU(e,t,void 0,c,d);n=r.props,p=r.patchFlag,l=r.dynamicPropNames;let i=r.directives;s=i&&i.length?an(i.map(e=>(function(e,t){let n=[],r=cV.get(e);r?n.push(t.helperString(r)):(t.helper(oV),t.directives.add(e.name),n.push(aj(e.name,"directive")));let{loc:i}=e;if(e.exp&&n.push(e.exp),e.arg&&(e.exp||n.push("void 0"),n.push(e.arg)),Object.keys(e.modifiers).length){e.arg||(e.exp||n.push("void 0"),n.push("void 0"));let t=al("true",!1,i);n.push(ar(e.modifiers.map(e=>ai(e,t)),i))}return an(n,e.loc)})(e,t))):void 0,r.shouldUseBlock&&(f=!0)}if(e.children.length>0){if(u===oN&&(f=!0,p|=1024),c&&u!==ok&&u!==oN){let{slots:n,hasDynamicSlots:i}=function(e,t,n=c$){t.helper(o3);let{children:r,loc:i}=e,l=[],s=[],o=t.scopes.vSlot>0||t.scopes.vFor>0,a=aO(e,"slot",!0);if(a){let{arg:e,exp:t}=a;e&&!aS(e)&&(o=!0),l.push(ai(e||al("default",!0),n(t,void 0,r,i)))}let c=!1,u=!1,d=[],p=/* @__PURE__ */new Set,f=0;for(let e=0;e<r.length;e++){let i,h,m,g;let y=r[e];if(!a$(y)||!(i=aO(y,"slot",!0))){3!==y.type&&d.push(y);continue}if(a){t.onError(/* @__PURE__ *//*@__PURE__*/a_(37,i.loc));break}c=!0;let{children:b,loc:_}=y,{arg:S=al("default",!0),exp:x,loc:C}=i;aS(S)?h=S?S.content:"default":o=!0;let T=aO(y,"for"),k=n(x,T,b,_);if(m=aO(y,"if"))o=!0,s.push(ac(m.exp,cF(S,k,f++),cD));else if(g=aO(y,/^else(-if)?$/,!0)){let n,i=e;for(;i--&&3===(n=r[i]).type;);if(n&&a$(n)&&aO(n,/^(else-)?if$/)){let e=s[s.length-1];for(;19===e.alternate.type;)e=e.alternate;e.alternate=g.exp?ac(g.exp,cF(S,k,f++),cD):cF(S,k,f++)}else t.onError(/* @__PURE__ *//*@__PURE__*/a_(30,g.loc))}else if(T){o=!0;let e=T.forParseResult;e?(cP(e),s.push(ao(t.helper(oj),[e.source,aa(cM(e),cF(S,k),!0)]))):t.onError(a_(32,T.loc))}else{if(h){if(p.has(h)){t.onError(a_(38,C));continue}p.add(h),"default"===h&&(u=!0)}l.push(ai(S,k))}}if(!a){let e=(e,t)=>ai("default",n(e,void 0,t,i));c?d.length&&d.some(e=>(function e(t){return 2!==t.type&&12!==t.type||(2===t.type?!!t.content.trim():e(t.content))})(e))&&(u?t.onError(a_(39,d[0].loc)):l.push(e(void 0,d))):l.push(e(void 0,r))}let h=o?2:!function e(t){for(let n=0;n<t.length;n++){let r=t[n];switch(r.type){case 1:if(2===r.tagType||e(r.children))return!0;break;case 9:if(e(r.branches))return!0;break;case 10:case 11:if(e(r.children))return!0}}return!1}(e.children)?1:3,m=ar(l.concat(ai("_",al(h+"",!1))),i);return s.length&&(m=ao(t.helper(oq),[m,an(s)])),{slots:m,hasDynamicSlots:o}}(e,t);r=n,i&&(p|=1024)}else if(1===e.children.length&&u!==ok){let n=e.children[0],i=n.type,l=5===i||8===i;l&&0===cd(n,t)&&(p|=1),r=l||2===i?n:e.children}else r=e.children}l&&l.length&&(i=function(e){let t="[";for(let n=0,r=e.length;n<r;n++)t+=JSON.stringify(e[n]),n<r-1&&(t+=", ");return t+"]"}(l)),e.codegenNode=at(t,u,n,r,0===p?void 0:p,i,s,!!f,!1,c,e.loc)};function cU(e,t,n=e.props,r,i,l=!1){let s;let{tag:o,loc:a,children:c}=e,u=[],d=[],p=[],f=c.length>0,h=!1,m=0,g=!1,y=!1,_=!1,S=!1,x=!1,C=!1,T=[],k=e=>{u.length&&(d.push(ar(cj(u),a)),u=[]),e&&d.push(e)},w=()=>{t.scopes.vFor>0&&u.push(ai(al("ref_for",!0),al("true")))},N=({key:e,value:n})=>{if(aS(e)){let l=e.content,s=b(l);s&&(!r||i)&&"onclick"!==l.toLowerCase()&&"onUpdate:modelValue"!==l&&!B(l)&&(S=!0),s&&B(l)&&(C=!0),s&&14===n.type&&(n=n.arguments[0]),20===n.type||(4===n.type||8===n.type)&&cd(n,t)>0||("ref"===l?g=!0:"class"===l?y=!0:"style"===l?_=!0:"key"===l||T.includes(l)||T.push(l),r&&("class"===l||"style"===l)&&!T.includes(l)&&T.push(l))}else x=!0};for(let i=0;i<n.length;i++){let s=n[i];if(6===s.type){let{loc:e,name:t,nameLoc:n,value:r}=s;if("ref"===t&&(g=!0,w()),"is"===t&&(cH(o)||r&&r.content.startsWith("vue:")))continue;u.push(ai(al(t,!0,n),al(r?r.content:"",!0,r?r.loc:e)))}else{let{name:n,arg:i,exp:c,loc:g,modifiers:y}=s,b="bind"===n,_="on"===n;if("slot"===n){r||t.onError(/* @__PURE__ *//*@__PURE__*/a_(40,g));continue}if("once"===n||"memo"===n||"is"===n||b&&aM(i,"is")&&cH(o)||_&&l)continue;if((b&&aM(i,"key")||_&&f&&aM(i,"vue:before-update"))&&(h=!0),b&&aM(i,"ref")&&w(),!i&&(b||_)){x=!0,c?b?(w(),k(),d.push(c)):k({type:14,loc:g,callee:t.helper(oX),arguments:r?[c]:[c,"true"]}):t.onError(a_(b?34:35,g));continue}b&&y.some(e=>"prop"===e.content)&&(m|=32);let S=t.directiveTransforms[n];if(S){let{props:n,needRuntime:r}=S(s,e,t);l||n.forEach(N),_&&i&&!aS(i)?k(ar(n,a)):u.push(...n),r&&(p.push(s),O(r)&&cV.set(s,r))}else!U(n)&&(p.push(s),f&&(h=!0))}}if(d.length?(k(),s=d.length>1?ao(t.helper(oK),d,a):d[0]):u.length&&(s=ar(cj(u),a)),x?m|=16:(y&&!r&&(m|=2),_&&!r&&(m|=4),T.length&&(m|=8),S&&(m|=32)),!h&&(0===m||32===m)&&(g||C||p.length>0)&&(m|=512),!t.inSSR&&s)switch(s.type){case 15:let E=-1,A=-1,R=!1;for(let e=0;e<s.properties.length;e++){let t=s.properties[e].key;aS(t)?"class"===t.content?E=e:"style"===t.content&&(A=e):t.isHandlerKey||(R=!0)}let I=s.properties[E],P=s.properties[A];R?s=ao(t.helper(oG),[s]):(I&&!aS(I.value)&&(I.value=ao(t.helper(oz),[I.value])),P&&(_||4===P.value.type&&"["===P.value.content.trim()[0]||17===P.value.type)&&(P.value=ao(t.helper(oJ),[P.value])));break;case 14:break;default:s=ao(t.helper(oG),[ao(t.helper(oQ),[s])])}return{props:s,directives:p,patchFlag:m,dynamicPropNames:T,shouldUseBlock:h}}function cj(e){let t=/* @__PURE__ */new Map,n=[];for(let r=0;r<e.length;r++){let i=e[r];if(8===i.key.type||!i.key.isStatic){n.push(i);continue}let l=i.key.content,s=t.get(l);s?("style"===l||"class"===l||b(l))&&(17===s.value.type?s.value.elements.push(i.value):s.value=an([s.value,i.value],s.loc)):(t.set(l,i),n.push(i))}return n}function cH(e){return"component"===e||"Component"===e}let cq=(e,t)=>{if(aF(e)){let{children:n,loc:r}=e,{slotName:i,slotProps:l}=function(e,t){let n,r='"default"',i=[];for(let t=0;t<e.props.length;t++){let n=e.props[t];if(6===n.type)n.value&&("name"===n.name?r=JSON.stringify(n.value.content):(n.name=q(n.name),i.push(n)));else if("bind"===n.name&&aM(n.arg,"name")){if(n.exp)r=n.exp;else if(n.arg&&4===n.arg.type){let e=q(n.arg.content);r=n.exp=al(e,!1,n.arg.loc)}}else"bind"===n.name&&n.arg&&aS(n.arg)&&(n.arg.content=q(n.arg.content)),i.push(n)}if(i.length>0){let{props:r,directives:l}=cU(e,t,i,!1,!1);n=r,l.length&&t.onError(a_(36,l[0].loc))}return{slotName:r,slotProps:n}}(e,t),s=[t.prefixIdentifiers?"_ctx.$slots":"$slots",i,"{}","undefined","true"],o=2;l&&(s[2]=l,o=3),n.length&&(s[3]=aa([],n,!1,!1,r),o=4),t.scopeId&&!t.slotted&&(o=5),s.splice(o),e.codegenNode=ao(t.helper(oH),s,r)}},cW=(e,t,n,r)=>{let i;let{loc:l,modifiers:s,arg:o}=e;if(e.exp||s.length,4===o.type){if(o.isStatic){let e=o.content;e.startsWith("vue:")&&(e=`vnode-${e.slice(4)}`),i=al(0!==t.tagType||e.startsWith("vnode")||!/[A-Z]/.test(e)?J(q(e)):`on:${e}`,!0,o.loc)}else i=as([`${n.helperString(o0)}(`,o,")"])}else(i=o).children.unshift(`${n.helperString(o0)}(`),i.children.push(")");let a=e.exp;a&&!a.content.trim()&&(a=void 0);let c=n.cacheHandlers&&!a&&!n.inVOnce;if(a){let e=aA(a),t=!(e||aI(a)),n=a.content.includes(";");(t||c&&e)&&(a=as([`${t?"$event":"(...args)"} => ${n?"{":"("}`,a,n?"}":")"]))}let u={props:[ai(i,a||al("() => {}",!1,l))]};return r&&(u=r(u)),c&&(u.props[0].value=n.cache(u.props[0].value)),u.props.forEach(e=>e.key.isHandlerKey=!0),u},cK=(e,t)=>{if(0===e.type||1===e.type||11===e.type||10===e.type)return()=>{let n;let r=e.children,i=!1;for(let e=0;e<r.length;e++){let t=r[e];if(aD(t)){i=!0;for(let i=e+1;i<r.length;i++){let l=r[i];if(aD(l))n||(n=r[e]=as([t],t.loc)),n.children.push(" + ",l),r.splice(i,1),i--;else{n=void 0;break}}}}if(i&&(1!==r.length||0!==e.type&&(1!==e.type||0!==e.tagType||e.props.find(e=>7===e.type&&!t.directiveTransforms[e.name]))))for(let e=0;e<r.length;e++){let n=r[e];if(aD(n)||8===n.type){let i=[];(2!==n.type||" "!==n.content)&&i.push(n),t.ssr||0!==cd(n,t)||i.push("1"),r[e]={type:12,content:n,loc:n.loc,codegenNode:ao(t.helper(oD),i)}}}}},cz=/* @__PURE__ */new WeakSet,cJ=(e,t)=>{if(1===e.type&&aO(e,"once",!0)&&!cz.has(e)&&!t.inVOnce&&!t.inSSR)return cz.add(e),t.inVOnce=!0,t.helper(o1),()=>{t.inVOnce=!1;let e=t.currentNode;e.codegenNode&&(e.codegenNode=t.cache(e.codegenNode,!0))}},cG=(e,t,n)=>{let r;let{exp:i,arg:l}=e;if(!i)return n.onError(/* @__PURE__ *//*@__PURE__*/a_(41,e.loc)),cQ();let s=i.loc.source.trim(),o=4===i.type?i.content:s,a=n.bindingMetadata[s];if("props"===a||"props-aliased"===a)return /* @__PURE__ */i.loc,cQ();if(!o.trim()||!aA(i))return n.onError(/* @__PURE__ *//*@__PURE__*/a_(42,i.loc)),cQ();let c=l||al("modelValue",!0),u=l?aS(l)?`onUpdate:${q(l.content)}`:as(['"onUpdate:" + ',l]):"onUpdate:modelValue",d=n.isTS?"($event: any)":"$event";r=as([`${d} => ((`,i,") = $event)"]);let p=[ai(c,e.exp),ai(u,r)];if(e.modifiers.length&&1===t.tagType){let t=e.modifiers.map(e=>e.content).map(e=>(aT(e)?e:JSON.stringify(e))+": true").join(", "),n=l?aS(l)?`${l.content}Modifiers`:as([l,' + "Modifiers"']):"modelModifiers";p.push(ai(n,al(`{ ${t} }`,!1,e.loc,2)))}return cQ(p)};function cQ(e=[]){return{props:e}}let cX=/* @__PURE__ */new WeakSet,cZ=(e,t)=>{if(1===e.type){let n=aO(e,"memo");if(!(!n||cX.has(e)))return cX.add(e),()=>{let r=e.codegenNode||t.currentNode.codegenNode;r&&13===r.type&&(1!==e.tagType&&au(r,t),e.codegenNode=ao(t.helper(o5),[n.exp,aa(void 0,r),"_cache",String(t.cached.length)]),t.cached.push(null))}}},cY=Symbol(""),c0=Symbol(""),c1=Symbol(""),c2=Symbol(""),c6=Symbol(""),c3=Symbol(""),c4=Symbol(""),c8=Symbol(""),c5=Symbol(""),c9=Symbol("");!function(e){Object.getOwnPropertySymbols(e).forEach(t=>{o7[t]=e[t]})}({[cY]:"vModelRadio",[c0]:"vModelCheckbox",[c1]:"vModelText",[c2]:"vModelSelect",[c6]:"vModelDynamic",[c3]:"withModifiers",[c4]:"withKeys",[c8]:"vShow",[c5]:"Transition",[c9]:"TransitionGroup"});let c7={parseMode:"html",isVoidTag:ep,isNativeTag:e=>ec(e)||eu(e)||ed(e),isPreTag:e=>"pre"===e,isIgnoreNewlineTag:e=>"pre"===e||"textarea"===e,decodeEntities:function(e,t=!1){return(u||(u=document.createElement("div")),t)?(u.innerHTML=`<div foo="${e.replace(/"/g,"&quot;")}">`,u.children[0].getAttribute("foo")):(u.innerHTML=e,u.textContent)},isBuiltInComponent:e=>"Transition"===e||"transition"===e?c5:"TransitionGroup"===e||"transition-group"===e?c9:void 0,getNamespace(e,t,n){let r=t?t.ns:n;if(t&&2===r){if("annotation-xml"===t.tag){if("svg"===e)return 1;t.props.some(e=>6===e.type&&"encoding"===e.name&&null!=e.value&&("text/html"===e.value.content||"application/xhtml+xml"===e.value.content))&&(r=0)}else/^m(?:[ions]|text)$/.test(t.tag)&&"mglyph"!==e&&"malignmark"!==e&&(r=0)}else t&&1===r&&("foreignObject"===t.tag||"desc"===t.tag||"title"===t.tag)&&(r=0);if(0===r){if("svg"===e)return 1;if("math"===e)return 2}return r}},ue=(e,t)=>al(JSON.stringify(es(e)),!1,t,3),ut=/* @__PURE__ */f("passive,once,capture"),un=/* @__PURE__ */f("stop,prevent,self,ctrl,shift,alt,meta,exact,middle"),ur=/* @__PURE__ */f("left,right"),ui=/* @__PURE__ */f("onkeyup,onkeydown,onkeypress"),ul=(e,t,n,r)=>{let i=[],l=[],s=[];for(let n=0;n<t.length;n++){let r=t[n].content;ut(r)?s.push(r):ur(r)?aS(e)?ui(e.content.toLowerCase())?i.push(r):l.push(r):(i.push(r),l.push(r)):un(r)?l.push(r):i.push(r)}return{keyModifiers:i,nonKeyModifiers:l,eventOptionModifiers:s}},us=(e,t)=>aS(e)&&"onclick"===e.content.toLowerCase()?al(t,!0):4!==e.type?as(["(",e,`) === "onClick" ? "${t}" : (`,e,")"]):e,uo=(e,t)=>{1===e.type&&0===e.tagType&&("script"===e.tag||"style"===e.tag)&&t.removeNode()},ua=[e=>{1===e.type&&e.props.forEach((t,n)=>{6===t.type&&"style"===t.name&&t.value&&(e.props[n]={type:7,name:"bind",arg:al("style",!0,t.loc),exp:ue(t.value.content,t.loc),modifiers:[],loc:t.loc})})}],uc={cloak:()=>({props:[]}),html:(e,t,n)=>{let{exp:r,loc:i}=e;return r||n.onError(a_(53,i)),t.children.length&&(n.onError(a_(54,i)),t.children.length=0),{props:[ai(al("innerHTML",!0,i),r||al("",!0))]}},text:(e,t,n)=>{let{exp:r,loc:i}=e;return r||n.onError(a_(55,i)),t.children.length&&(n.onError(a_(56,i)),t.children.length=0),{props:[ai(al("textContent",!0),r?cd(r,n)>0?r:ao(n.helperString(oW),[r],i):al("",!0))]}},model:(e,t,n)=>{let r=cG(e,t,n);if(!r.props.length||1===t.tagType)return r;e.arg&&n.onError(a_(58,e.arg.loc));let{tag:i}=t,l=n.isCustomElement(i);if("input"===i||"textarea"===i||"select"===i||l){let s=c1,o=!1;if("input"===i||l){let r=aP(t,"type");if(r){if(7===r.type)s=c6;else if(r.value)switch(r.value.content){case"radio":s=cY;break;case"checkbox":s=c0;break;case"file":o=!0,n.onError(a_(59,e.loc))}}else t.props.some(e=>7===e.type&&"bind"===e.name&&(!e.arg||4!==e.arg.type||!e.arg.isStatic))&&(s=c6)}else"select"===i&&(s=c2);o||(r.needRuntime=n.helper(s))}else n.onError(a_(57,e.loc));return r.props=r.props.filter(e=>!(4===e.key.type&&"modelValue"===e.key.content)),r},on:(e,t,n)=>cW(e,t,n,t=>{let{modifiers:r}=e;if(!r.length)return t;let{key:i,value:l}=t.props[0],{keyModifiers:s,nonKeyModifiers:o,eventOptionModifiers:a}=ul(i,r,n,e.loc);if(o.includes("right")&&(i=us(i,"onContextmenu")),o.includes("middle")&&(i=us(i,"onMouseup")),o.length&&(l=ao(n.helper(c3),[l,JSON.stringify(o)])),s.length&&(!aS(i)||ui(i.content.toLowerCase()))&&(l=ao(n.helper(c4),[l,JSON.stringify(s)])),a.length){let e=a.map(z).join("");i=aS(i)?al(`${i.content}${e}`,!0):as(["(",i,`) + "${e}"`])}return{props:[ai(i,l)]}}),show:(e,t,n)=>{let{exp:r,loc:i}=e;return!r&&n.onError(a_(61,i)),{props:[],needRuntime:n.helper(c8)}}},uu=/* @__PURE__ */Object.create(null);function ud(e,t){if(!I(e)){if(!e.nodeType)return g;e=e.innerHTML}let n=e+JSON.stringify(t,(e,t)=>"function"==typeof t?t.toString():t),r=uu[n];if(r)return r;if("#"===e[0]){let t=document.querySelector(e);e=t?t.innerHTML:""}let i=S({hoistStatic:!0,onError:void 0,onWarn:g},t);i.isCustomElement||"undefined"==typeof customElements||(i.isCustomElement=e=>!!customElements.get(e));let{code:l}=function(e,t={}){return function(e,t={}){let n=t.onError||av,r="module"===t.mode;!0===t.prefixIdentifiers?n(/* @__PURE__ *//*@__PURE__*/a_(47)):r&&n(/* @__PURE__ *//*@__PURE__*/a_(48)),t.cacheHandlers&&n(/* @__PURE__ *//*@__PURE__*/a_(49)),t.scopeId&&!r&&n(/* @__PURE__ *//*@__PURE__*/a_(50));let i=S({},t,{prefixIdentifiers:!1}),l=I(e)?function(e,t){if(a6.reset(),aJ=null,aG=null,aQ="",aX=-1,aZ=-1,a2.length=0,az=e,aW=S({},aq),t){let e;for(e in t)null!=t[e]&&(aW[e]=t[e])}a6.mode="html"===aW.parseMode?1:"sfc"===aW.parseMode?2:0,a6.inXML=1===aW.ns||2===aW.ns;let n=t&&t.delimiters;n&&(a6.delimiterOpen=ag(n[0]),a6.delimiterClose=ag(n[1]));let r=aK=function(e,t=""){return{type:0,source:t,children:e,helpers:/* @__PURE__ */new Set,components:[],directives:[],hoists:[],imports:[],cached:[],temps:0,codegenNode:void 0,loc:ae}}([],e);return a6.parse(az),r.loc=cs(0,e.length),r.children=cr(r.children),aK=null,r}(e,i):e,[s,o]=[[cJ,ck,cZ,cO,cq,cB,cL,cK],{on:cW,bind:cA,model:cG}];return!function(e,t){let n=function(e,{filename:t="",prefixIdentifiers:n=!1,hoistStatic:r=!1,hmr:i=!1,cacheHandlers:l=!1,nodeTransforms:s=[],directiveTransforms:o={},transformHoist:a=null,isBuiltInComponent:c=g,isCustomElement:u=g,expressionPlugins:d=[],scopeId:p=null,slotted:f=!0,ssr:m=!1,inSSR:y=!1,ssrCssVars:b="",bindingMetadata:_=h,inline:S=!1,isTS:x=!1,onError:C=av,onWarn:T=ab,compatConfig:k}){let w=t.replace(/\?.*$/,"").match(/([^/\\]+)\.\w+$/),N={filename:t,selfName:w&&z(q(w[1])),prefixIdentifiers:n,hoistStatic:r,hmr:i,cacheHandlers:l,nodeTransforms:s,directiveTransforms:o,transformHoist:a,isBuiltInComponent:c,isCustomElement:u,expressionPlugins:d,scopeId:p,slotted:f,ssr:m,inSSR:y,ssrCssVars:b,bindingMetadata:_,inline:S,isTS:x,onError:C,onWarn:T,compatConfig:k,root:e,helpers:/* @__PURE__ */new Map,components:/* @__PURE__ */new Set,directives:/* @__PURE__ */new Set,hoists:[],imports:[],cached:[],constantCache:/* @__PURE__ */new WeakMap,temps:0,identifiers:/* @__PURE__ */Object.create(null),scopes:{vFor:0,vSlot:0,vPre:0,vOnce:0},parent:null,grandParent:null,currentNode:e,childIndex:0,inVOnce:!1,helper(e){let t=N.helpers.get(e)||0;return N.helpers.set(e,t+1),e},removeHelper(e){let t=N.helpers.get(e);if(t){let n=t-1;n?N.helpers.set(e,n):N.helpers.delete(e)}},helperString:e=>`_${o7[N.helper(e)]}`,replaceNode(e){N.parent.children[N.childIndex]=N.currentNode=e},removeNode(e){let t=N.parent.children,n=e?t.indexOf(e):N.currentNode?N.childIndex:-1;e&&e!==N.currentNode?N.childIndex>n&&(N.childIndex--,N.onNodeRemoved()):(N.currentNode=null,N.onNodeRemoved()),N.parent.children.splice(n,1)},onNodeRemoved:g,addIdentifiers(e){},removeIdentifiers(e){},hoist(e){I(e)&&(e=al(e)),N.hoists.push(e);let t=al(`_hoisted_${N.hoists.length}`,!1,e.loc,2);return t.hoisted=e,t},cache(e,t=!1){let n=function(e,t,n=!1){return{type:20,index:e,value:t,needPauseTracking:n,needArraySpread:!1,loc:ae}}(N.cached.length,e,t);return N.cached.push(n),n}};return N}(e,t);cm(e,n),t.hoistStatic&&function e(t,n,r,i=!1,l=!1){let{children:s}=t,o=[];for(let n=0;n<s.length;n++){let a=s[n];if(1===a.type&&0===a.tagType){let e=i?0:cd(a,r);if(e>0){if(e>=2){a.codegenNode.patchFlag=-1,o.push(a);continue}}else{let e=a.codegenNode;if(13===e.type){let t=e.patchFlag;if((void 0===t||512===t||1===t)&&cf(a,r)>=2){let t=ch(a);t&&(e.props=r.hoist(t))}e.dynamicProps&&(e.dynamicProps=r.hoist(e.dynamicProps))}}}else if(12===a.type&&(i?0:cd(a,r))>=2){o.push(a);continue}if(1===a.type){let n=1===a.tagType;n&&r.scopes.vSlot++,e(a,t,r,!1,l),n&&r.scopes.vSlot--}else if(11===a.type)e(a,t,r,1===a.children.length,!0);else if(9===a.type)for(let n=0;n<a.branches.length;n++)e(a.branches[n],t,r,1===a.branches[n].children.length,l)}let a=!1;if(o.length===s.length&&1===t.type){if(0===t.tagType&&t.codegenNode&&13===t.codegenNode.type&&k(t.codegenNode.children))t.codegenNode.children=c(an(t.codegenNode.children)),a=!0;else if(1===t.tagType&&t.codegenNode&&13===t.codegenNode.type&&t.codegenNode.children&&!k(t.codegenNode.children)&&15===t.codegenNode.children.type){let e=u(t.codegenNode,"default");e&&(e.returns=c(an(e.returns)),a=!0)}else if(3===t.tagType&&n&&1===n.type&&1===n.tagType&&n.codegenNode&&13===n.codegenNode.type&&n.codegenNode.children&&!k(n.codegenNode.children)&&15===n.codegenNode.children.type){let e=aO(t,"slot",!0),r=e&&e.arg&&u(n.codegenNode,e.arg);r&&(r.returns=c(an(r.returns)),a=!0)}}if(!a)for(let e of o)e.codegenNode=r.cache(e.codegenNode);function c(e){let t=r.cache(e);return l&&r.hmr&&(t.needArraySpread=!0),t}function u(e,t){if(e.children&&!k(e.children)&&15===e.children.type){let n=e.children.properties.find(e=>e.key===t||e.key.content===t);return n&&n.value}}o.length&&r.transformHoist&&r.transformHoist(s,r,t)}(e,void 0,n,cu(e,e.children[0])),t.ssr||function(e,t){let{helper:n}=t,{children:r}=e;if(1===r.length){let n=r[0];if(cu(e,n)&&n.codegenNode){let r=n.codegenNode;13===r.type&&au(r,t),e.codegenNode=r}else e.codegenNode=n}else r.length>1&&(e.codegenNode=at(t,n(oT),void 0,e.children,64,void 0,void 0,!0,void 0,!1))}(e,n),e.helpers=/* @__PURE__ */new Set([...n.helpers.keys()]),e.components=[...n.components],e.directives=[...n.directives],e.imports=n.imports,e.hoists=n.hoists,e.temps=n.temps,e.cached=n.cached,e.transformed=!0}(l,S({},i,{nodeTransforms:[...s,...t.nodeTransforms||[]],directiveTransforms:S({},o,t.directiveTransforms||{})})),function(e,t={}){let n=function(e,{mode:t="function",prefixIdentifiers:n="module"===t,sourceMap:r=!1,filename:i="template.vue.html",scopeId:l=null,optimizeImports:s=!1,runtimeGlobalName:o="Vue",runtimeModuleName:a="vue",ssrRuntimeModuleName:c="vue/server-renderer",ssr:u=!1,isTS:d=!1,inSSR:p=!1}){let f={mode:t,prefixIdentifiers:n,sourceMap:r,filename:i,scopeId:l,optimizeImports:s,runtimeGlobalName:o,runtimeModuleName:a,ssrRuntimeModuleName:c,ssr:u,isTS:d,inSSR:p,source:e.source,code:"",column:1,line:1,offset:0,indentLevel:0,pure:!1,map:void 0,helper:e=>`_${o7[e]}`,push(e,t=-2,n){f.code+=e},indent(){h(++f.indentLevel)},deindent(e=!1){e?--f.indentLevel:h(--f.indentLevel)},newline(){h(f.indentLevel)}};function h(e){f.push("\n"+"  ".repeat(e),0)}return f}(e,t);t.onContextCreated&&t.onContextCreated(n);let{mode:r,push:i,prefixIdentifiers:l,indent:s,deindent:o,newline:a,scopeId:c,ssr:u}=n,d=Array.from(e.helpers),p=d.length>0,f=!l&&"module"!==r;(function(e,t){let{ssr:n,prefixIdentifiers:r,push:i,newline:l,runtimeModuleName:s,runtimeGlobalName:o,ssrRuntimeModuleName:a}=t,c=Array.from(e.helpers);if(c.length>0&&(i(`const _Vue = ${o}
`,-1),e.hoists.length)){let e=[oO,oP,oM,oD,oL].filter(e=>c.includes(e)).map(cv).join(", ");i(`const { ${e} } = _Vue
`,-1)}(function(e,t){if(!e.length)return;t.pure=!0;let{push:n,newline:r}=t;r();for(let i=0;i<e.length;i++){let l=e[i];l&&(n(`const _hoisted_${i+1} = `),cx(l,t),r())}t.pure=!1})(e.hoists,t),l(),i("return ")})(e,n);let h=(u?["_ctx","_push","_parent","_attrs"]:["_ctx","_cache"]).join(", ");if(i(`function ${u?"ssrRender":"render"}(${h}) {`),s(),f&&(i("with (_ctx) {"),s(),p&&(i(`const { ${d.map(cv).join(", ")} } = _Vue
`,-1),a())),e.components.length&&(cb(e.components,"component",n),(e.directives.length||e.temps>0)&&a()),e.directives.length&&(cb(e.directives,"directive",n),e.temps>0&&a()),e.temps>0){i("let ");for(let t=0;t<e.temps;t++)i(`${t>0?", ":""}_temp${t}`)}return(e.components.length||e.directives.length||e.temps)&&(i(`
`,0),a()),u||i("return "),e.codegenNode?cx(e.codegenNode,n):i("null"),f&&(o(),i("}")),o(),i("}"),{ast:e,code:n.code,preamble:"",map:n.map?n.map.toJSON():void 0}}(l,i)}(e,S({},c7,t,{nodeTransforms:[uo,...ua,...t.nodeTransforms||[]],directiveTransforms:S({},uc,t.directiveTransforms||{}),transformHoist:null}))}(e,i),s=Function("Vue",l)(oC);return s._rc=!0,uu[n]=s}l$(ud);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript && document.currentScript.tagName.toUpperCase() === 'SCRIPT')
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && (!scriptUrl || !/^http(s?):/.test(scriptUrl))) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
/*!******************!*\
  !*** ./index.ts ***!
  \******************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _alt1_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @alt1/base */ "../node_modules/.pnpm/@alt1+base@1.0.0-alpha.7/node_modules/@alt1/base/dist/index.js");
/* harmony import */ var _alt1_chatbox__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @alt1/chatbox */ "../node_modules/.pnpm/@alt1+chatbox@1.0.0-alpha.7/node_modules/@alt1/chatbox/dist/index.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vue */ "../node_modules/.pnpm/vue@3.5.12_typescript@5.6.3/node_modules/vue/dist/vue.esm-browser.prod.js");
// alt1 base libs, provides all the commonly used methods for image matching and capture
// also gives your editor info about the window.alt1 api



// tell webpack to add index.html and appconfig.json to output
__webpack_require__(/*! !file-loader?name=[name].[ext]!./index.html */ "../node_modules/.pnpm/file-loader@6.2.0_webpack@5.96.1/node_modules/file-loader/dist/cjs.js?name=[name].[ext]!./index.html");
__webpack_require__(/*! !file-loader?name=[name].[ext]!./appconfig.json */ "../node_modules/.pnpm/file-loader@6.2.0_webpack@5.96.1/node_modules/file-loader/dist/cjs.js?name=[name].[ext]!./appconfig.json");
__webpack_require__(/*! !file-loader?name=[name].[ext]!./style.css */ "../node_modules/.pnpm/file-loader@6.2.0_webpack@5.96.1/node_modules/file-loader/dist/cjs.js?name=[name].[ext]!./style.css");
__webpack_require__(/*! !file-loader?name=[name].[ext]!./icon.png */ "../node_modules/.pnpm/file-loader@6.2.0_webpack@5.96.1/node_modules/file-loader/dist/cjs.js?name=[name].[ext]!./icon.png");
// Puts timestampless chat lines with the previous chat line
function regroupChatLines(lines) {
    let result = [];
    for (let line of lines) {
        if (_alt1_chatbox__WEBPACK_IMPORTED_MODULE_1__["default"].getMessageTime(line.text) === -1 && result.length > 0) {
            let lastLine = result[result.length - 1];
            // Add space to the first fragment
            let fragments = line.fragments;
            fragments[0] = { ...fragments[0] };
            fragments[0].text = " " + fragments[0].text;
            lastLine.fragments.push(...fragments);
            lastLine.text += " " + line.text;
        }
        else {
            result.push({ ...line });
        }
    }
    return result;
}
function chatTimestampToDateTime(timestamp) {
    let now = new Date();
    let result = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, timestamp);
    if (result.getTime() - now.getTime() > 12 * 60 * 60 * 1000) {
        // Chatbox says 23:something and it's already past midnight. Check for this by testing if result is over 12 hours from now.
        result.setDate(result.getDate() - 1);
    }
    return result;
}
function mixColor(color) {
    return _alt1_base__WEBPACK_IMPORTED_MODULE_0__.mixColor(color[0], color[1], color[2], color[3]);
}
function formatTime(elapsed, useCsvTimeFormat = false) {
    const mins = Math.floor(elapsed / 60);
    const secs = elapsed % 60;
    return useCsvTimeFormat
        ? `${Math.floor(mins / 60)}:${(mins % 60)
            .toString()
            .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
        : `${mins}:${secs.toString().padStart(2, "0")}`;
}
function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
function formatDateTimeFileName(date) {
    function p(n) {
        return (n > 9 ? "" : "0") + n;
    }
    const y = date.getFullYear();
    const M = date.getMonth() + 1;
    const d = date.getDate();
    const h = date.getHours();
    const m = date.getMinutes();
    const s = date.getSeconds();
    return `${y}-${p(M)}-${p(d)}_${p(h)}-${p(m)}-${p(s)}`;
}
_alt1_base__WEBPACK_IMPORTED_MODULE_0__.identifyApp("appconfig.json");
const reader = new _alt1_chatbox__WEBPACK_IMPORTED_MODULE_1__["default"]();
const clueCompleteRegex = /Congratulations! You have now completed [\d,.]+ (?<clueType>\w+) treasure trails./;
const clueCompleteColor = [4, 143, 6];
reader.readargs.colors.push(mixColor(clueCompleteColor));
// Riftsplitter title
reader.readargs.colors.push(_alt1_base__WEBPACK_IMPORTED_MODULE_0__.mixColor(215, 243, 136));
// Hardcore Ironmen titles
reader.readargs.colors.push(_alt1_base__WEBPACK_IMPORTED_MODULE_0__.mixColor(186, 6, 31));
(0,vue__WEBPACK_IMPORTED_MODULE_2__.createApp)({
    setup() {
        const startTime = (0,vue__WEBPACK_IMPORTED_MODULE_2__.ref)(new Date());
        const clueType = (0,vue__WEBPACK_IMPORTED_MODULE_2__.ref)(null);
        const currentClueTime = (0,vue__WEBPACK_IMPORTED_MODULE_2__.ref)(0);
        const timestamps = (0,vue__WEBPACK_IMPORTED_MODULE_2__.ref)([]);
        const table = (0,vue__WEBPACK_IMPORTED_MODULE_2__.computed)(() => getTable(false));
        function getTable(useCsvTimeFormat = false) {
            return timestamps.value.map((t, i) => {
                const elapsed = (t.getTime() - startTime.value.getTime()) / 1000;
                const duration = i === 0
                    ? elapsed
                    : (t.getTime() - timestamps.value[i - 1].getTime()) / 1000;
                return {
                    id: i + 1,
                    elapsed: formatTime(elapsed, useCsvTimeFormat),
                    duration: formatTime(duration, useCsvTimeFormat),
                    rate: (((i + 1) * 3600) / elapsed).toFixed(1),
                };
            });
        }
        function getLastClueTime() {
            return timestamps.value.length === 0
                ? startTime.value
                : timestamps.value[timestamps.value.length - 1];
        }
        function init() {
            reader.find();
            if (!reader.pos) {
                console.log("Chat not found, trying again.");
                setTimeout(init, 1200);
                return;
            }
            const rect = reader.pos.mainbox.rect;
            // Overlay the chatbox.
            alt1.overLayRect(_alt1_base__WEBPACK_IMPORTED_MODULE_0__.mixColor(255, 0, 128), rect.x, rect.y, rect.width, rect.height, 2000, 1);
            reset();
            setInterval(captureChat, 1200);
            setInterval(() => {
                const lastClueTime = getLastClueTime();
                currentClueTime.value = Math.round((Date.now() - lastClueTime.getTime()) / 1000);
            }, 500);
        }
        function captureChat() {
            let lines = reader.read();
            if (lines == null || lines.length == 0) {
                return;
            }
            lines = regroupChatLines(lines);
            for (let line of lines) {
                let match = line.text.match(clueCompleteRegex);
                if (match != null && match.length > 0) {
                    let timestamp = chatTimestampToDateTime(_alt1_chatbox__WEBPACK_IMPORTED_MODULE_1__["default"].getMessageTime(line.text));
                    if (timestamp > getLastClueTime()) {
                        if (timestamps.value.length === 0) {
                            clueType.value = match.groups.clueType;
                        }
                        if (clueType.value === match.groups.clueType) {
                            timestamps.value.push(timestamp);
                        }
                    }
                }
            }
        }
        function reset() {
            startTime.value = new Date(Math.round(Date.now() / 1000) * 1000);
            // Debugging
            // timestamps.value = [new Date(startTime.value.getTime() + 3000), new Date(startTime.value.getTime() + 4000)]
            timestamps.value = [];
            clueType.value = null;
            currentClueTime.value = 0;
        }
        function exportCsv() {
            var _a;
            const rows = [["#", "Elapsed", "Clue time", "Clues/hr"]].concat(getTable(true).map((x) => [
                x.id.toString(),
                x.elapsed,
                x.duration,
                x.rate,
            ]));
            const csvContent = rows.map((r) => r.join(",")).join("\n");
            const link = document.createElement("a");
            const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
            // Now download the file
            const url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", `clue_split_${(_a = clueType.value) !== null && _a !== void 0 ? _a : "unknown"}_${formatDateTimeFileName(startTime.value)}.csv`);
            link.style.visibility = "hidden";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
        (0,vue__WEBPACK_IMPORTED_MODULE_2__.onMounted)(() => {
            setTimeout(init, 100);
        });
        (0,vue__WEBPACK_IMPORTED_MODULE_2__.watch)(timestamps, () => {
            const output = document.getElementById("output");
            output.scrollTop = output.scrollHeight;
        }, { deep: true, flush: "post" });
        return {
            startTime,
            clueType,
            currentClueTime,
            table,
            capitalizeFirstLetter,
            formatTime,
            init,
            reset,
            exportCSV: exportCsv,
        };
    },
}).mount("#app");

})();

/******/ })()
;