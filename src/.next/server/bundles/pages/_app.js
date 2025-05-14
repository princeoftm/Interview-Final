module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./actions/home/HomeActions.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export fetchBooking */
/* unused harmony export expandAccordion */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return actionTypes; });
var fetchBooking = function fetchBooking() {
  return {
    type: 'FETCH_BOOKING_LINK'
  };
};
var expandAccordion = function expandAccordion(payload) {
  return {
    type: 'EXPAND_ACCORDION',
    payload: payload
  };
};
var actionTypes = {
  FETCH_BOOKING_LINK: 'FETCH_BOOKING_LINK',
  EXPAND_ACCORDION: 'EXPAND_ACCORDION'
};

/***/ }),

/***/ "./components/Button/Button.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Icon_Icon__ = __webpack_require__("./components/Icon/Icon.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Icon_Icon___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__Icon_Icon__);
var _jsxFileName = "D:\\Develop\\blockchain\\ethereum\\poulina\\poulina\\src\\components\\Button\\Button.js";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }




var Button = function Button(_ref) {
  var type = _ref.type,
      icon = _ref.icon,
      iconClass = _ref.iconClass,
      children = _ref.children,
      props = _objectWithoutProperties(_ref, ["type", "icon", "iconClass", "children"]);

  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("button", _extends({
    type: type
  }, props, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 7
    }
  }), icon ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1__Icon_Icon__["default"], {
    type: icon,
    className: iconClass,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 8
    }
  }) : null, children);
};

/* harmony default export */ __webpack_exports__["a"] = (Button);

/***/ }),

/***/ "./components/Footer/Footer.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
throw new Error("Cannot find module \"next/image\"");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__heroicons_react_solid__ = __webpack_require__("@heroicons/react/solid");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__heroicons_react_solid___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__heroicons_react_solid__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Button_Button__ = __webpack_require__("./components/Button/Button.js");
var _jsxFileName = "D:\\Develop\\blockchain\\ethereum\\poulina\\poulina\\src\\components\\Footer\\Footer.js";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }






function NavLink(_ref) {
  var to = _ref.to,
      children = _ref.children,
      props = _objectWithoutProperties(_ref, ["to", "children"]);

  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("a", _extends({
    href: to
  }, props, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 8
    }
  }), children);
}

var Footer = function Footer(_ref2) {
  var props = _extends({}, _ref2);

  var footerLinks = [{
    title: 'Resources',
    content: [{
      name: 'User Guide',
      to: '/'
    }, {
      name: 'Blog',
      to: '/'
    }, {
      name: 'Give Feedback',
      to: '/'
    }]
  }, {
    title: 'Legal',
    content: [{
      name: 'Term of Use',
      to: '/'
    }, {
      name: 'Privacy Policy',
      to: '/'
    }]
  }, {
    title: 'Stats',
    content: [{
      name: 'Ranking',
      to: '/'
    }, {
      name: 'Activities',
      to: '/'
    }]
  }, {
    title: 'Service',
    content: [{
      name: 'Buy NFT',
      to: '/'
    }]
  }, {
    title: 'Company',
    content: [{
      name: 'Contact Us',
      to: '/'
    }, {
      name: 'About Us',
      to: '/'
    }]
  }];
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
    className: "flex flex-col px-9",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 47
    }
  }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
    className: "flex pt-14",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 48
    }
  }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
    className: "flex flex-col",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 49
    }
  }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
    className: "flex items-center mb-6",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 50
    }
  }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("a", {
    className: "flex items-center text-2xl font-semibold",
    href: "/",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 51
    }
  }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_next_image___default.a, {
    src: "/assets/logo.svg",
    alt: "logo",
    width: 59,
    height: 43,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 52
    }
  }), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
    className: "pl-3",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 53
    }
  }, "Poulina"))), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span", {
    className: "text-base leading-6 text-rolling-stone max-w-[230px] mb-4",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 56
    }
  }, "Please reach out to us on the email below if you have any idea, complain or request"), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("a", {
    className: "flex items-center",
    href: "mailto:nft@populina.com",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 57
    }
  }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__heroicons_react_solid__["MailIcon"], {
    className: "w-5 h-5 mr-3 text-black",
    "aria-hidden": "true",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 58
    }
  }), "nft@poulina.com")), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
    className: "flex flex-row flex-1 justify-evenly",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 65
    }
  }, footerLinks.map(function (item, idx) {
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
      className: "flex flex-col",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 68
      }
    }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span", {
      className: "title text-black/[0.8] font-medium text-xl mb-6",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 69
      }
    }, item.title), item.content.map(function (cItem, cIdx) {
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(NavLink, {
        to: cItem.to,
        className: "text-lg text-black/[0.5] mb-4",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 72
        }
      }, cItem.name);
    }));
  }))), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
    className: "flex items-center pt-20 pb-8",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 80
    }
  }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__Button_Button__["a" /* default */], {
    type: "button",
    icon: "youtube",
    className: "h-8 mr-10 w-11",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 81
    }
  }), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__Button_Button__["a" /* default */], {
    type: "button",
    icon: "instagram",
    className: "w-8 h-8 mr-10",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 82
    }
  }), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__Button_Button__["a" /* default */], {
    type: "button",
    icon: "linkedin",
    className: "w-8 h-8 mr-10",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 83
    }
  }), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__Button_Button__["a" /* default */], {
    type: "button",
    icon: "facebook",
    className: "w-8 h-8 mr-24",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 84
    }
  }), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__Button_Button__["a" /* default */], {
    type: "button",
    icon: "copyright",
    iconClass: "mr-2",
    className: "flex items-center text-black/[0.5]",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 85
    }
  }, "2022 NFT Poulina inc.")));
};

/* harmony default export */ __webpack_exports__["a"] = (Footer);

/***/ }),

/***/ "./components/Header/Header.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = Header;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
throw new Error("Cannot find module \"next/image\"");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Search_Search__ = __webpack_require__("./components/Search/Search.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Button_Button__ = __webpack_require__("./components/Button/Button.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_next_link__ = __webpack_require__("next/link");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_next_link___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_next_link__);
var _jsxFileName = "D:\\Develop\\blockchain\\ethereum\\poulina\\poulina\\src\\components\\Header\\Header.js";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }







function NavLink(_ref) {
  var to = _ref.to,
      children = _ref.children;
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("a", {
    href: to,
    className: "text-lg\tmx-4",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9
    }
  }, children);
}

function MobileHeader(_ref2) {
  var open = _ref2.open,
      setOpen = _ref2.setOpen;
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
    className: "absolute top-0 left-0 h-screen w-screen bg-white transform ".concat(open ? "-translate-x-0" : "-translate-x-full", " transition-transform duration-300 ease-in-out filter drop-shadow-md "),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 17
    }
  }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
    className: "flex items-center justify-center h-20 bg-white filter drop-shadow-md",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22
    }
  }, " ", __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("a", {
    className: "text-xl font-semibold",
    href: "/index-back",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 25
    }
  }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_next_image___default.a, {
    src: "/assets/logo.svg",
    alt: "logo",
    width: 100,
    height: 45,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26
    }
  }))), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
    className: "flex flex-col ml-4",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 29
    }
  }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("a", {
    className: "my-4 text-xl font-medium",
    href: "/",
    onClick: function onClick() {
      return setTimeout(function () {
        setOpen(!open);
      }, 100);
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 30
    }
  }, "Explore"), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("a", {
    className: "my-4 text-xl font-normal",
    href: "/",
    onClick: function onClick() {
      return setTimeout(function () {
        setOpen(!open);
      }, 100);
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 41
    }
  }, "Stats"), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("a", {
    className: "my-4 text-xl font-normal",
    href: "/",
    onClick: function onClick() {
      return setTimeout(function () {
        setOpen(!open);
      }, 100);
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 52
    }
  }, "Join Forum"), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("a", {
    className: "my-4 text-xl font-normal",
    href: "/create-item",
    onClick: function onClick() {
      return setTimeout(function () {
        setOpen(!open);
      }, 100);
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 63
    }
  }, "Create NFT")));
}

function Header() {
  var _useState = Object(__WEBPACK_IMPORTED_MODULE_0_react__["useState"])(false),
      _useState2 = _slicedToArray(_useState, 2),
      open = _useState2[0],
      setOpen = _useState2[1];

  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("nav", {
    className: "flex items-center px-8 bg-white shadow-lg py-9 h-28 filter drop-shadow-md",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 82
    }
  }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(MobileHeader, {
    open: open,
    setOpen: setOpen,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 83
    }
  }), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
    className: "flex items-center w-1/2",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 85
    }
  }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
    className: "items-center hidden md:flex",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 86
    }
  }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("a", {
    className: "flex items-center text-2xl font-semibold",
    href: "/index-back",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 87
    }
  }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_next_image___default.a, {
    src: "/assets/logo.svg",
    alt: "logo",
    width: 59,
    height: 43,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 91
    }
  }), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
    className: "pl-3",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 92
    }
  }, "Poulina"))), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
    className: "flex items-center justify-around flex-1",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 95
    }
  }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
    className: "relative z-50 flex flex-col items-center justify-between w-8 h-8 md:hidden",
    onClick: function onClick() {
      setOpen(!open);
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 96
    }
  }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span", {
    className: "h-1 w-full bg-black rounded-lg transform transition duration-300 ease-in-out ".concat(open ? "rotate-45 translate-y-3.5" : ""),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 103
    }
  }), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span", {
    className: "h-1 w-full bg-black rounded-lg transition-all duration-300 ease-in-out ".concat(open ? "w-0" : "w-full"),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 108
    }
  }), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span", {
    className: "h-1 w-full bg-black rounded-lg transform transition duration-300 ease-in-out ".concat(open ? "-rotate-45 -translate-y-3.5" : ""),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 113
    }
  })), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
    className: "hidden md:flex",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 120
    }
  }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(NavLink, {
    to: "/",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 121
    }
  }, "Explore"), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(NavLink, {
    to: "/",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 122
    }
  }, "Stats"), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(NavLink, {
    to: "/",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 123
    }
  }, "Join Forum"), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(NavLink, {
    to: "/create-item",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 124
    }
  }, "Create NFT")))), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
    className: "items-center justify-between hidden w-1/2 px-6 md:flex",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 128
    }
  }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__Search_Search__["a" /* default */], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 129
    }
  }), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__Button_Button__["a" /* default */], {
    type: "button",
    className: "rounded-md py-2.5 px-9 text-lg border border-solid border-orange text-orange",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 130
    }
  }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4_next_link___default.a, {
    href: "/pay-for-item",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 134
    }
  }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("a", {
    className: "mr-6 text-pink-500",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 135
    }
  }, "Wallet connect")))));
}

/***/ }),

/***/ "./components/Icon/Icon.js":
/***/ (function(module, exports) {

throw new Error("Module build failed: SyntaxError: D:\\Develop\\blockchain\\ethereum\\poulina\\poulina\\src\\components\\Icon\\Icon.js: Support for the experimental syntax 'nullishCoalescingOperator' isn't currently enabled (17:34):\n\n  15 |           {...props}\n  16 |         >\n> 17 |           {alt && <title>{alt ?? \"plus\"}</title>}\n     |                                  ^\n  18 |           <path\n  19 |             d=\"M5.83643 0.133972C3.07926 0.133972 0.836426 2.44277 0.836426 5.28103C0.836426 8.11929 3.07926 10.4281 5.83643 10.4281C8.59359 10.4281 10.8364 8.11889 10.8364 5.28103C10.8364 2.44317 8.59359 0.133972 5.83643 0.133972ZM5.83643 9.63072C3.50684 9.63072 1.61102 7.67954 1.61102 5.28103C1.61102 2.88252 3.50684 0.931344 5.83643 0.931344C8.16602 0.931344 10.0618 2.88252 10.0618 5.28103C10.0618 7.67954 8.16641 9.63072 5.83643 9.63072Z\"\n  20 |             fill=\"#F64900\"\n\nAdd @babel/plugin-proposal-nullish-coalescing-operator (https://git.io/vb4Se) to the 'plugins' section of your Babel config to enable transformation.\n    at _class.raise (D:\\Develop\\blockchain\\ethereum\\poulina\\poulina\\node_modules\\@babel\\core\\node_modules\\babylon\\lib\\index.js:778:15)\n    at _class.expectPlugin (D:\\Develop\\blockchain\\ethereum\\poulina\\poulina\\node_modules\\@babel\\core\\node_modules\\babylon\\lib\\index.js:2068:18)\n    at _class.parseExprOp (D:\\Develop\\blockchain\\ethereum\\poulina\\poulina\\node_modules\\@babel\\core\\node_modules\\babylon\\lib\\index.js:2654:16)\n    at _class.parseExprOps (D:\\Develop\\blockchain\\ethereum\\poulina\\poulina\\node_modules\\@babel\\core\\node_modules\\babylon\\lib\\index.js:2626:17)\n    at _class.parseMaybeConditional (D:\\Develop\\blockchain\\ethereum\\poulina\\poulina\\node_modules\\@babel\\core\\node_modules\\babylon\\lib\\index.js:2588:21)\n    at _class.parseMaybeAssign (D:\\Develop\\blockchain\\ethereum\\poulina\\poulina\\node_modules\\@babel\\core\\node_modules\\babylon\\lib\\index.js:2546:21)\n    at _class.parseExpression (D:\\Develop\\blockchain\\ethereum\\poulina\\poulina\\node_modules\\@babel\\core\\node_modules\\babylon\\lib\\index.js:2499:21)\n    at _class.jsxParseExpressionContainer (D:\\Develop\\blockchain\\ethereum\\poulina\\poulina\\node_modules\\@babel\\core\\node_modules\\babylon\\lib\\index.js:7950:32)\n    at _class.jsxParseElementAt (D:\\Develop\\blockchain\\ethereum\\poulina\\poulina\\node_modules\\@babel\\core\\node_modules\\babylon\\lib\\index.js:8035:36)\n    at _class.jsxParseElement (D:\\Develop\\blockchain\\ethereum\\poulina\\poulina\\node_modules\\@babel\\core\\node_modules\\babylon\\lib\\index.js:8077:19)\n    at _class.parseExprAtom (D:\\Develop\\blockchain\\ethereum\\poulina\\poulina\\node_modules\\@babel\\core\\node_modules\\babylon\\lib\\index.js:8084:21)\n    at _class.parseExprSubscripts (D:\\Develop\\blockchain\\ethereum\\poulina\\poulina\\node_modules\\@babel\\core\\node_modules\\babylon\\lib\\index.js:2725:21)\n    at _class.parseMaybeUnary (D:\\Develop\\blockchain\\ethereum\\poulina\\poulina\\node_modules\\@babel\\core\\node_modules\\babylon\\lib\\index.js:2704:21)\n    at _class.parseExprOp (D:\\Develop\\blockchain\\ethereum\\poulina\\poulina\\node_modules\\@babel\\core\\node_modules\\babylon\\lib\\index.js:2657:46)\n    at _class.parseExprOps (D:\\Develop\\blockchain\\ethereum\\poulina\\poulina\\node_modules\\@babel\\core\\node_modules\\babylon\\lib\\index.js:2626:17)\n    at _class.parseMaybeConditional (D:\\Develop\\blockchain\\ethereum\\poulina\\poulina\\node_modules\\@babel\\core\\node_modules\\babylon\\lib\\index.js:2588:21)");

/***/ }),

/***/ "./components/Search/Search.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
var _jsxFileName = "D:\\Develop\\blockchain\\ethereum\\poulina\\poulina\\src\\components\\Search\\Search.js";


var Search = function Search(_ref) {
  var mode = _ref.mode;
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
    className: "relative text-".concat(mode),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 5
    }
  }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span", {
    className: "absolute inset-y-0 left-0 flex items-center pl-4",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 6
    }
  }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("button", {
    className: "p-1 focus:outline-none focus:shadow-outline text-orange text-opacity-40",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 7
    }
  }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 18 18",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 8
    }
  }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", {
    d: "M12.4232 12.4278C13.5827 11.2694 14.3 9.66847 14.3 7.9C14.3 4.36538 11.4346 1.5 7.9 1.5C4.36538 1.5 1.5 4.36538 1.5 7.9C1.5 11.4346 4.36538 14.3 7.9 14.3C9.66616 14.3 11.2652 13.5846 12.4232 12.4278ZM12.4232 12.4278L16.4333 16.4379",
    stroke: "currentColor",
    strokeWidth: "1.06667",
    strokeLinecap: "square",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15
    }
  })))), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
    className: "w-72",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 25
    }
  }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", {
    type: "search",
    name: "q",
    className: "w-full py-3 px-12 text-sm bg-transparent border rounded-md border-orange border-opacity-40 focus:outline-none focus:text-gray-900",
    placeholder: "Search Items, artists etc",
    autoComplete: "off",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26
    }
  })));
};

/* harmony default export */ __webpack_exports__["a"] = (Search);

/***/ }),

/***/ "./pages/_app.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator__ = __webpack_require__("@babel/runtime/regenerator");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_redux__ = __webpack_require__("react-redux");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_next_app__ = __webpack_require__("next/app");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_next_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_next_app__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_next_redux_wrapper__ = __webpack_require__("next-redux-wrapper");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_next_redux_wrapper___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_next_redux_wrapper__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__store__ = __webpack_require__("./store.js");
throw new Error("Cannot find module \"swiper/css\"");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__styles_globals_css__ = __webpack_require__("./styles/globals.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__styles_globals_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__styles_globals_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_next_link__ = __webpack_require__("next/link");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_next_link___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_next_link__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_Header_Header__ = __webpack_require__("./components/Header/Header.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_Footer_Footer__ = __webpack_require__("./components/Footer/Footer.js");

var _jsxFileName = "D:\\Develop\\blockchain\\ethereum\\poulina\\poulina\\src\\pages\\_app.js";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }













var Poulina =
/*#__PURE__*/
function (_App) {
  _inherits(Poulina, _App);

  function Poulina() {
    _classCallCheck(this, Poulina);

    return _possibleConstructorReturn(this, (Poulina.__proto__ || Object.getPrototypeOf(Poulina)).apply(this, arguments));
  }

  _createClass(Poulina, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          Component = _props.Component,
          pageProps = _props.pageProps,
          store = _props.store;
      console.log('store========', store);
      return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 27
        }
      }, __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_9__components_Header_Header__["a" /* default */], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 28
        }
      }), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("nav", {
        className: "p-6 border-b",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 29
        }
      }, __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("p", {
        className: "text-4xl font-bold",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 30
        }
      }, "Metaverse Marketplace"), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("div", {
        className: "flex mt-4",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 31
        }
      }, __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_8_next_link___default.a, {
        href: "/",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 32
        }
      }, __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("a", {
        className: "mr-4 text-pink-500",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 33
        }
      }, "Home")), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_8_next_link___default.a, {
        href: "/create-item",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 37
        }
      }, __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("a", {
        className: "mr-6 text-pink-500",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 38
        }
      }, "Sell Digital Asset")), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_8_next_link___default.a, {
        href: "/my-assets",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 42
        }
      }, __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("a", {
        className: "mr-6 text-pink-500",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 43
        }
      }, "My Digital Assets")), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_8_next_link___default.a, {
        href: "/creator-dashboard",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 47
        }
      }, __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("a", {
        className: "mr-6 text-pink-500",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 48
        }
      }, "Creator Dashboard")))), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(Component, _extends({}, pageProps, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 54
        }
      })), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_10__components_Footer_Footer__["a" /* default */], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 55
        }
      }));
    }
  }], [{
    key: "getInitialProps",
    value: function () {
      var _getInitialProps = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee(_ref) {
        var Component, ctx, pageProps;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                Component = _ref.Component, ctx = _ref.ctx;

                if (!Component.getInitialProps) {
                  _context.next = 7;
                  break;
                }

                _context.next = 4;
                return Component.getInitialProps(ctx);

              case 4:
                _context.t0 = _context.sent;
                _context.next = 8;
                break;

              case 7:
                _context.t0 = {};

              case 8:
                pageProps = _context.t0;
                return _context.abrupt("return", {
                  pageProps: pageProps
                });

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function getInitialProps(_x) {
        return _getInitialProps.apply(this, arguments);
      };
    }()
  }]);

  return Poulina;
}(__WEBPACK_IMPORTED_MODULE_3_next_app___default.a);

/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_4_next_redux_wrapper___default()(__WEBPACK_IMPORTED_MODULE_5__store__["a" /* default */])(Poulina)); // function Poulina({ Component, pageProps, store }) {
//   console.log('store', store)
//   return (
//     <div>
//       <Header />
//       <nav className="p-6 border-b">
//         <p className="text-4xl font-bold">Metaverse Marketplace</p>
//         <div className="flex mt-4">
//           <Link href="/">
//             <a className="mr-4 text-pink-500">
//               Home
//             </a>
//           </Link>
//           <Link href="/create-item">
//             <a className="mr-6 text-pink-500">
//               Sell Digital Asset
//             </a>
//           </Link>
//           <Link href="/my-assets">
//             <a className="mr-6 text-pink-500">
//               My Digital Assets
//             </a>
//           </Link>
//           <Link href="/creator-dashboard">
//             <a className="mr-6 text-pink-500">
//               Creator Dashboard
//             </a>
//           </Link>
//         </div>
//       </nav>
//       <Component {...pageProps} />
//       <Footer />
//     </div>
//   )
// }
// export default Poulina

/***/ }),

/***/ "./reducer/home/homeReducer.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__actions_home_HomeActions__ = __webpack_require__("./actions/home/HomeActions.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash_object__ = __webpack_require__("lodash/object");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash_object___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_lodash_object__);


var navLinks = [{
  id: 1,
  icon: 'bg-calendar',
  text: 'Calendar',
  link: '/'
}, {
  id: 2,
  icon: 'bg-checkmark',
  text: 'Notes',
  link: '/note'
}, {
  id: 3,
  icon: 'bg-notebook',
  text: 'Tasks'
}, // and so on..
{
  id: 4,
  icon: 'bg-email',
  text: 'Email'
}, {
  id: 5,
  icon: 'bg-settings',
  text: 'Settings'
}];
var defaultState = {
  initStarted: false,
  publicInitFinished: false,
  appAuthInitFinished: false
};

var homeReducer = function homeReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case __WEBPACK_IMPORTED_MODULE_0__actions_home_HomeActions__["a" /* actionTypes */].FETCH_BOOKING_LINK:
      {
        return state.merge({
          tabIndex: 1
        });
      }

    case __WEBPACK_IMPORTED_MODULE_0__actions_home_HomeActions__["a" /* actionTypes */].EXPAND_ACCORDION:
      {
        var isAccordionCollapsed = state.get('accordionIndexExpanded') !== Object(__WEBPACK_IMPORTED_MODULE_1_lodash_object__["get"])(action, 'payload');
        return state.merge({
          accordionIndexExpanded: isAccordionCollapsed ? Object(__WEBPACK_IMPORTED_MODULE_1_lodash_object__["get"])(action, 'payload') : -1
        });
      }

    default:
      return state;
  }
};

/* harmony default export */ __webpack_exports__["a"] = (homeReducer);

/***/ }),

/***/ "./reducer/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux__ = __webpack_require__("redux");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__home_homeReducer__ = __webpack_require__("./reducer/home/homeReducer.js");


var rootReducer = Object(__WEBPACK_IMPORTED_MODULE_0_redux__["combineReducers"])({
  homeReducer: __WEBPACK_IMPORTED_MODULE_1__home_homeReducer__["a" /* default */]
});
/* harmony default export */ __webpack_exports__["a"] = (rootReducer);

/***/ }),

/***/ "./store.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux__ = __webpack_require__("redux");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux_devtools_extension__ = __webpack_require__("redux-devtools-extension");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux_devtools_extension___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_redux_devtools_extension__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_redux_thunk__ = __webpack_require__("redux-thunk");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_redux_thunk___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_redux_thunk__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__reducer__ = __webpack_require__("./reducer/index.js");



 // each reducer initialize their data

var initialDefaultState = {};

var makeStore = function makeStore() {
  var initialState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialDefaultState;
  return Object(__WEBPACK_IMPORTED_MODULE_0_redux__["createStore"])(__WEBPACK_IMPORTED_MODULE_3__reducer__["a" /* default */], initialState, Object(__WEBPACK_IMPORTED_MODULE_1_redux_devtools_extension__["composeWithDevTools"])(Object(__WEBPACK_IMPORTED_MODULE_0_redux__["applyMiddleware"])(__WEBPACK_IMPORTED_MODULE_2_redux_thunk___default.a)));
};

/* harmony default export */ __webpack_exports__["a"] = (makeStore);

/***/ }),

/***/ "./styles/globals.css":
/***/ (function(module, exports) {

throw new Error("Module parse failed: Unexpected character '@' (2:0)\nYou may need an appropriate loader to handle this file type.\n| /* ./styles/globals.css */\r\n| @tailwind base;\r\n| @tailwind components;\r\n| @tailwind utilities;\r");

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./pages/_app.js");


/***/ }),

/***/ "@babel/runtime/regenerator":
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/regenerator");

/***/ }),

/***/ "@heroicons/react/solid":
/***/ (function(module, exports) {

module.exports = require("@heroicons/react/solid");

/***/ }),

/***/ "lodash/object":
/***/ (function(module, exports) {

module.exports = require("lodash/object");

/***/ }),

/***/ "next-redux-wrapper":
/***/ (function(module, exports) {

module.exports = require("next-redux-wrapper");

/***/ }),

/***/ "next/app":
/***/ (function(module, exports) {

module.exports = require("next/app");

/***/ }),

/***/ "next/link":
/***/ (function(module, exports) {

module.exports = require("next/link");

/***/ }),

/***/ "react":
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "react-redux":
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),

/***/ "redux":
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),

/***/ "redux-devtools-extension":
/***/ (function(module, exports) {

module.exports = require("redux-devtools-extension");

/***/ }),

/***/ "redux-thunk":
/***/ (function(module, exports) {

module.exports = require("redux-thunk");

/***/ })

/******/ });
//# sourceMappingURL=_app.js.map