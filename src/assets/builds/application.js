/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@honeybadger-io/js/dist/browser/honeybadger.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@honeybadger-io/js/dist/browser/honeybadger.js ***!
  \*********************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

(function(global2, factory) {
   true ? module.exports = factory() : 0;
})(this, function() {
  "use strict";
  var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof __webpack_require__.g !== "undefined" ? __webpack_require__.g : typeof self !== "undefined" ? self : {};
  function getDefaultExportFromCjs(x) {
    return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
  }
  function getAugmentedNamespace(n) {
    var f = n.default;
    if (typeof f == "function") {
      var a = function() {
        return f.apply(this, arguments);
      };
      a.prototype = f.prototype;
    } else a = {};
    Object.defineProperty(a, "__esModule", { value: true });
    Object.keys(n).forEach(function(k) {
      var d = Object.getOwnPropertyDescriptor(n, k);
      Object.defineProperty(a, k, d.get ? d : {
        enumerable: true,
        get: function() {
          return n[k];
        }
      });
    });
    return a;
  }
  var browser$1 = {};
  var src = {};
  var events = {};
  var util$1 = {};
  var UNKNOWN_FUNCTION = "<unknown>";
  function parse(stackString) {
    var lines = stackString.split("\n");
    return lines.reduce(function(stack, line) {
      var parseResult = parseChrome(line) || parseWinjs(line) || parseGecko(line) || parseNode(line) || parseJSC(line);
      if (parseResult) {
        stack.push(parseResult);
      }
      return stack;
    }, []);
  }
  var chromeRe = /^\s*at (.*?) ?\(((?:file|https?|blob|chrome-extension|native|eval|webpack|<anonymous>|\/|[a-z]:\\|\\\\).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i;
  var chromeEvalRe = /\((\S*)(?::(\d+))(?::(\d+))\)/;
  function parseChrome(line) {
    var parts = chromeRe.exec(line);
    if (!parts) {
      return null;
    }
    var isNative2 = parts[2] && parts[2].indexOf("native") === 0;
    var isEval = parts[2] && parts[2].indexOf("eval") === 0;
    var submatch = chromeEvalRe.exec(parts[2]);
    if (isEval && submatch != null) {
      parts[2] = submatch[1];
      parts[3] = submatch[2];
      parts[4] = submatch[3];
    }
    return {
      file: !isNative2 ? parts[2] : null,
      methodName: parts[1] || UNKNOWN_FUNCTION,
      arguments: isNative2 ? [parts[2]] : [],
      lineNumber: parts[3] ? +parts[3] : null,
      column: parts[4] ? +parts[4] : null
    };
  }
  var winjsRe = /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i;
  function parseWinjs(line) {
    var parts = winjsRe.exec(line);
    if (!parts) {
      return null;
    }
    return {
      file: parts[2],
      methodName: parts[1] || UNKNOWN_FUNCTION,
      arguments: [],
      lineNumber: +parts[3],
      column: parts[4] ? +parts[4] : null
    };
  }
  var geckoRe = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)((?:file|https?|blob|chrome|webpack|resource|\[native).*?|[^@]*bundle)(?::(\d+))?(?::(\d+))?\s*$/i;
  var geckoEvalRe = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i;
  function parseGecko(line) {
    var parts = geckoRe.exec(line);
    if (!parts) {
      return null;
    }
    var isEval = parts[3] && parts[3].indexOf(" > eval") > -1;
    var submatch = geckoEvalRe.exec(parts[3]);
    if (isEval && submatch != null) {
      parts[3] = submatch[1];
      parts[4] = submatch[2];
      parts[5] = null;
    }
    return {
      file: parts[3],
      methodName: parts[1] || UNKNOWN_FUNCTION,
      arguments: parts[2] ? parts[2].split(",") : [],
      lineNumber: parts[4] ? +parts[4] : null,
      column: parts[5] ? +parts[5] : null
    };
  }
  var javaScriptCoreRe = /^\s*(?:([^@]*)(?:\((.*?)\))?@)?(\S.*?):(\d+)(?::(\d+))?\s*$/i;
  function parseJSC(line) {
    var parts = javaScriptCoreRe.exec(line);
    if (!parts) {
      return null;
    }
    return {
      file: parts[3],
      methodName: parts[1] || UNKNOWN_FUNCTION,
      arguments: [],
      lineNumber: +parts[4],
      column: parts[5] ? +parts[5] : null
    };
  }
  var nodeRe = /^\s*at (?:((?:\[object object\])?[^\\/]+(?: \[as \S+\])?) )?\(?(.*?):(\d+)(?::(\d+))?\)?\s*$/i;
  function parseNode(line) {
    var parts = nodeRe.exec(line);
    if (!parts) {
      return null;
    }
    return {
      file: parts[2],
      methodName: parts[1] || UNKNOWN_FUNCTION,
      arguments: [],
      lineNumber: +parts[3],
      column: parts[4] ? +parts[4] : null
    };
  }
  var stackTraceParser_esm = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    parse
  });
  var require$$0$1 = /* @__PURE__ */ getAugmentedNamespace(stackTraceParser_esm);
  (function(exports2) {
    var __createBinding = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = commonjsGlobal && commonjsGlobal.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = commonjsGlobal && commonjsGlobal.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    var __awaiter2 = commonjsGlobal && commonjsGlobal.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator2 = commonjsGlobal && commonjsGlobal.__generator || function(thisArg, body) {
      var _ = { label: 0, sent: function() {
        if (t[0] & 1) throw t[1];
        return t[1];
      }, trys: [], ops: [] }, f, y, t, g;
      return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([n, v]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
          if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          if (y = 0, t) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return { value: op[0] ? op[1] : void 0, done: true };
      }
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.logDeprecatedMethod = exports2.globalThisOrWindow = exports2.isBrowserConfig = exports2.clone = exports2.formatCGIData = exports2.filterUrl = exports2.filter = exports2.generateStackTrace = exports2.endpoint = exports2.instrumentConsole = exports2.instrument = exports2.isErrorObject = exports2.makeNotice = exports2.logger = exports2.sanitize = exports2.shallowClone = exports2.runAfterNotifyHandlers = exports2.runBeforeNotifyHandlers = exports2.getSourceForBacktrace = exports2.getCauses = exports2.calculateBacktraceShift = exports2.DEFAULT_BACKTRACE_SHIFT = exports2.makeBacktrace = exports2.objectIsExtensible = exports2.objectIsEmpty = exports2.mergeNotice = exports2.merge = void 0;
    var stackTraceParser = __importStar(require$$0$1);
    function merge(obj1, obj2) {
      var result = {};
      for (var k in obj1) {
        result[k] = obj1[k];
      }
      for (var k in obj2) {
        result[k] = obj2[k];
      }
      return result;
    }
    exports2.merge = merge;
    function mergeNotice(notice1, notice2) {
      var result = merge(notice1, notice2);
      if (notice1.context && notice2.context) {
        result.context = merge(notice1.context, notice2.context);
      }
      return result;
    }
    exports2.mergeNotice = mergeNotice;
    function objectIsEmpty(obj) {
      for (var k in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, k)) {
          return false;
        }
      }
      return true;
    }
    exports2.objectIsEmpty = objectIsEmpty;
    function objectIsExtensible(obj) {
      if (typeof Object.isExtensible !== "function") {
        return true;
      }
      return Object.isExtensible(obj);
    }
    exports2.objectIsExtensible = objectIsExtensible;
    function makeBacktrace(stack, filterHbSourceCode, logger2) {
      if (filterHbSourceCode === void 0) {
        filterHbSourceCode = false;
      }
      if (logger2 === void 0) {
        logger2 = console;
      }
      if (!stack) {
        return [];
      }
      try {
        var backtrace = stackTraceParser.parse(stack).map(function(line) {
          return {
            file: line.file,
            method: line.methodName,
            number: line.lineNumber,
            column: line.column
          };
        });
        if (filterHbSourceCode) {
          backtrace.splice(0, calculateBacktraceShift(backtrace));
        }
        return backtrace;
      } catch (err) {
        logger2.debug(err);
        return [];
      }
    }
    exports2.makeBacktrace = makeBacktrace;
    function isFrameFromHbSourceCode(frame) {
      var hasHbFile = false;
      var hasHbMethod = false;
      if (frame.file) {
        hasHbFile = frame.file.toLowerCase().indexOf("@honeybadger-io") > -1;
      }
      if (frame.method) {
        hasHbMethod = frame.method.toLowerCase().indexOf("@honeybadger-io") > -1;
      }
      return hasHbFile || hasHbMethod;
    }
    exports2.DEFAULT_BACKTRACE_SHIFT = 3;
    function calculateBacktraceShift(backtrace) {
      var shift = 0;
      for (var i = 0; i < backtrace.length; i++) {
        var frame = backtrace[i];
        if (isFrameFromHbSourceCode(frame)) {
          shift++;
          continue;
        }
        if (!frame.file || frame.file === "<anonymous>") {
          var nextFrame = backtrace[i + 1];
          if (nextFrame && isFrameFromHbSourceCode(nextFrame)) {
            shift++;
            continue;
          }
        }
        break;
      }
      return shift || exports2.DEFAULT_BACKTRACE_SHIFT;
    }
    exports2.calculateBacktraceShift = calculateBacktraceShift;
    function getCauses(notice, logger2) {
      if (notice.cause) {
        var causes = [];
        var cause = notice;
        while (causes.length < 3 && (cause = cause.cause)) {
          causes.push({
            class: cause.name,
            message: cause.message,
            backtrace: typeof cause.stack == "string" ? makeBacktrace(cause.stack, false, logger2) : null
          });
        }
        return causes;
      }
      return [];
    }
    exports2.getCauses = getCauses;
    function getSourceForBacktrace(backtrace, getSourceFileHandler) {
      return __awaiter2(this, void 0, void 0, function() {
        var result, index, trace, fileContent;
        return __generator2(this, function(_a) {
          switch (_a.label) {
            case 0:
              result = [];
              if (!getSourceFileHandler || !backtrace || !backtrace.length) {
                return [2, result];
              }
              index = 0;
              _a.label = 1;
            case 1:
              if (!backtrace.length) return [3, 3];
              trace = backtrace.splice(0)[index];
              return [4, getSourceFileHandler(trace.file)];
            case 2:
              fileContent = _a.sent();
              result[index] = getSourceCodeSnippet(fileContent, trace.number);
              index++;
              return [3, 1];
            case 3:
              return [2, result];
          }
        });
      });
    }
    exports2.getSourceForBacktrace = getSourceForBacktrace;
    function runBeforeNotifyHandlers(notice, handlers) {
      var results = [];
      var result = true;
      for (var i = 0, len = handlers.length; i < len; i++) {
        var handler = handlers[i];
        var handlerResult = handler(notice);
        if (handlerResult === false) {
          result = false;
        }
        results.push(handlerResult);
      }
      return {
        results,
        result
      };
    }
    exports2.runBeforeNotifyHandlers = runBeforeNotifyHandlers;
    function runAfterNotifyHandlers(notice, handlers, error) {
      if (notice && notice.afterNotify) {
        notice.afterNotify(error, notice);
      }
      for (var i = 0, len = handlers.length; i < len; i++) {
        handlers[i](error, notice);
      }
      return true;
    }
    exports2.runAfterNotifyHandlers = runAfterNotifyHandlers;
    function shallowClone(obj) {
      if (typeof obj !== "object" || obj === null) {
        return {};
      }
      var result = {};
      for (var k in obj) {
        result[k] = obj[k];
      }
      return result;
    }
    exports2.shallowClone = shallowClone;
    function sanitize2(obj, maxDepth) {
      if (maxDepth === void 0) {
        maxDepth = 8;
      }
      var seenObjects = [];
      function seen(obj2) {
        if (!obj2 || typeof obj2 !== "object") {
          return false;
        }
        for (var i = 0; i < seenObjects.length; i++) {
          var value = seenObjects[i];
          if (value === obj2) {
            return true;
          }
        }
        seenObjects.push(obj2);
        return false;
      }
      function canSerialize(obj2) {
        var typeOfObj = typeof obj2;
        if (/function/.test(typeOfObj)) {
          return obj2.name === "toJSON";
        }
        if (/symbol/.test(typeOfObj)) {
          return false;
        }
        if (obj2 === null) {
          return false;
        }
        if (typeof obj2 === "object" && typeof obj2.hasOwnProperty === "undefined") {
          return false;
        }
        return true;
      }
      function serialize(obj2, depth) {
        if (depth === void 0) {
          depth = 0;
        }
        if (depth >= maxDepth) {
          return "[DEPTH]";
        }
        if (!canSerialize(obj2)) {
          return Object.prototype.toString.call(obj2);
        }
        if (seen(obj2)) {
          return "[RECURSION]";
        }
        if (Array.isArray(obj2)) {
          return obj2.map(function(o) {
            return safeSerialize(o, depth + 1);
          });
        }
        if (typeof obj2 === "object") {
          var ret = {};
          for (var k in obj2) {
            var v = obj2[k];
            if (Object.prototype.hasOwnProperty.call(obj2, k) && k != null && v != null) {
              ret[k] = safeSerialize(v, depth + 1);
            }
          }
          return ret;
        }
        return obj2;
      }
      function safeSerialize(obj2, depth) {
        if (depth === void 0) {
          depth = 0;
        }
        try {
          return serialize(obj2, depth);
        } catch (e) {
          return "[ERROR] ".concat(e);
        }
      }
      return safeSerialize(obj);
    }
    exports2.sanitize = sanitize2;
    function logger(client2) {
      var log = function(method) {
        return function() {
          var _a;
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
          }
          if (method === "debug") {
            if (!client2.config.debug) {
              return;
            }
            method = "log";
          }
          args.unshift("[Honeybadger]");
          (_a = client2.config.logger)[method].apply(_a, args);
        };
      };
      return {
        log: log("log"),
        info: log("info"),
        debug: log("debug"),
        warn: log("warn"),
        error: log("error")
      };
    }
    exports2.logger = logger;
    function makeNotice2(thing) {
      var notice;
      if (!thing) {
        notice = {};
      } else if (isErrorObject(thing)) {
        var e = thing;
        notice = merge(thing, { name: e.name, message: e.message, stack: e.stack, cause: e.cause });
      } else if (typeof thing === "object") {
        notice = shallowClone(thing);
      } else {
        var m = String(thing);
        notice = { message: m };
      }
      return notice;
    }
    exports2.makeNotice = makeNotice2;
    function isErrorObject(thing) {
      return thing instanceof Error || Object.prototype.toString.call(thing) === "[object Error]";
    }
    exports2.isErrorObject = isErrorObject;
    function instrument2(object, name, replacement) {
      if (!object || !name || !replacement || !(name in object)) {
        return;
      }
      try {
        var original = object[name];
        while (original && original.__hb_original) {
          original = original.__hb_original;
        }
        object[name] = replacement(original);
        object[name].__hb_original = original;
      } catch (_e) {
      }
    }
    exports2.instrument = instrument2;
    var _consoleAlreadyInstrumented = false;
    var listeners = [];
    function instrumentConsole2(_window, handler) {
      if (!_window || !_window.console || !handler) {
        return;
      }
      listeners.push(handler);
      if (_consoleAlreadyInstrumented) {
        return;
      }
      _consoleAlreadyInstrumented = true;
      ["debug", "info", "warn", "error", "log"].forEach(function(level) {
        instrument2(_window.console, level, function hbLogger(original) {
          return function() {
            var args = Array.prototype.slice.call(arguments);
            listeners.forEach(function(listener) {
              try {
                listener(level, args);
              } catch (_e) {
              }
            });
            if (typeof original === "function") {
              Function.prototype.apply.call(original, _window.console, arguments);
            }
          };
        });
      });
    }
    exports2.instrumentConsole = instrumentConsole2;
    function endpoint(base, path) {
      var endpoint2 = base.trim().replace(/\/$/, "");
      path = path.trim().replace(/(^\/|\/$)/g, "");
      return "".concat(endpoint2, "/").concat(path);
    }
    exports2.endpoint = endpoint;
    function generateStackTrace() {
      try {
        throw new Error("");
      } catch (e) {
        if (e.stack) {
          return e.stack;
        }
      }
      var maxStackSize = 10;
      var stack = [];
      var curr = arguments.callee;
      while (curr && stack.length < maxStackSize) {
        if (/function(?:\s+([\w$]+))+\s*\(/.test(curr.toString())) {
          stack.push(RegExp.$1 || "<anonymous>");
        } else {
          stack.push("<anonymous>");
        }
        try {
          curr = curr.caller;
        } catch (e) {
          break;
        }
      }
      return stack.join("\n");
    }
    exports2.generateStackTrace = generateStackTrace;
    function filter(obj, filters) {
      if (!is("Object", obj)) {
        return;
      }
      if (!is("Array", filters)) {
        filters = [];
      }
      var seen = [];
      function filter2(obj2) {
        var k, newObj;
        if (is("Object", obj2) || is("Array", obj2)) {
          if (seen.indexOf(obj2) !== -1) {
            return "[CIRCULAR DATA STRUCTURE]";
          }
          seen.push(obj2);
        }
        if (is("Object", obj2)) {
          newObj = {};
          for (k in obj2) {
            if (filterMatch(k, filters)) {
              newObj[k] = "[FILTERED]";
            } else {
              newObj[k] = filter2(obj2[k]);
            }
          }
          return newObj;
        }
        if (is("Array", obj2)) {
          return obj2.map(function(v) {
            return filter2(v);
          });
        }
        if (is("Function", obj2)) {
          return "[FUNC]";
        }
        return obj2;
      }
      return filter2(obj);
    }
    exports2.filter = filter;
    function filterMatch(key, filters) {
      for (var i = 0; i < filters.length; i++) {
        if (key.toLowerCase().indexOf(filters[i].toLowerCase()) !== -1) {
          return true;
        }
      }
      return false;
    }
    function is(type, obj) {
      var klass = Object.prototype.toString.call(obj).slice(8, -1);
      return obj !== void 0 && obj !== null && klass === type;
    }
    function filterUrl(url, filters) {
      if (!filters) {
        return url;
      }
      if (typeof url !== "string") {
        return url;
      }
      var query = url.split(/\?/, 2)[1];
      if (!query) {
        return url;
      }
      var result = url;
      query.split(/[&]\s?/).forEach(function(pair) {
        var _a = pair.split("=", 2), key = _a[0], value = _a[1];
        if (filterMatch(key, filters)) {
          result = result.replace("".concat(key, "=").concat(value), "".concat(key, "=[FILTERED]"));
        }
      });
      return result;
    }
    exports2.filterUrl = filterUrl;
    function formatCGIData(vars, prefix) {
      if (prefix === void 0) {
        prefix = "";
      }
      var formattedVars = {};
      Object.keys(vars).forEach(function(key) {
        var formattedKey = prefix + key.replace(/\W/g, "_").toUpperCase();
        formattedVars[formattedKey] = vars[key];
      });
      return formattedVars;
    }
    exports2.formatCGIData = formatCGIData;
    function clone(obj) {
      return JSON.parse(JSON.stringify(obj));
    }
    exports2.clone = clone;
    function getSourceCodeSnippet(fileData, lineNumber, sourceRadius) {
      if (sourceRadius === void 0) {
        sourceRadius = 2;
      }
      if (!fileData) {
        return null;
      }
      var lines = fileData.split("\n");
      lines.unshift("");
      var start = lineNumber - sourceRadius;
      var end = lineNumber + sourceRadius;
      var result = {};
      for (var i = start; i <= end; i++) {
        var line = lines[i];
        if (typeof line === "string") {
          result[i] = line;
        }
      }
      return result;
    }
    function isBrowserConfig(config) {
      return config.async !== void 0;
    }
    exports2.isBrowserConfig = isBrowserConfig;
    function globalThisOrWindow2() {
      if (typeof globalThis !== "undefined") {
        return globalThis;
      }
      if (typeof self !== "undefined") {
        return self;
      }
      return window;
    }
    exports2.globalThisOrWindow = globalThisOrWindow2;
    var _deprecatedMethodCalls = {};
    function logDeprecatedMethod(logger2, oldMethod, newMethod, callCountThreshold) {
      if (callCountThreshold === void 0) {
        callCountThreshold = 100;
      }
      var key = "".concat(oldMethod, "-").concat(newMethod);
      if (typeof _deprecatedMethodCalls[key] === "undefined") {
        _deprecatedMethodCalls[key] = 0;
      }
      if (_deprecatedMethodCalls[key] % callCountThreshold !== 0) {
        _deprecatedMethodCalls[key]++;
        return;
      }
      var msg = "Deprecation warning: ".concat(oldMethod, " has been deprecated; please use ").concat(newMethod, " instead.");
      logger2.warn(msg);
      _deprecatedMethodCalls[key]++;
    }
    exports2.logDeprecatedMethod = logDeprecatedMethod;
  })(util$1);
  Object.defineProperty(events, "__esModule", { value: true });
  var util_1$4 = util$1;
  function default_1$4(_window) {
    if (_window === void 0) {
      _window = (0, util_1$4.globalThisOrWindow)();
    }
    return {
      shouldReloadOnConfigure: false,
      load: function(client2) {
        function sendEventsToInsights() {
          return client2.config.eventsEnabled;
        }
        if (!sendEventsToInsights()) {
          return;
        }
        (0, util_1$4.instrumentConsole)(_window, function(level, args) {
          if (!sendEventsToInsights()) {
            return;
          }
          if (args.length === 0) {
            return;
          }
          var data = {
            severity: level
          };
          if (typeof args[0] === "string") {
            data.message = args[0];
            data.args = args.slice(1);
          } else {
            data.args = args;
          }
          client2.event("log", data);
        });
      }
    };
  }
  events.default = default_1$4;
  var client = {};
  var store = {};
  Object.defineProperty(store, "__esModule", { value: true });
  store.GlobalStore = void 0;
  var util_1$3 = util$1;
  var GlobalStore = (
    /** @class */
    function() {
      function GlobalStore2(contents, breadcrumbsLimit) {
        this.contents = contents;
        this.breadcrumbsLimit = breadcrumbsLimit;
      }
      GlobalStore2.create = function(contents, breadcrumbsLimit) {
        return new GlobalStore2(contents, breadcrumbsLimit);
      };
      GlobalStore2.prototype.available = function() {
        return true;
      };
      GlobalStore2.prototype.getContents = function(key) {
        var value = key ? this.contents[key] : this.contents;
        return JSON.parse(JSON.stringify(value));
      };
      GlobalStore2.prototype.setContext = function(context) {
        this.contents.context = (0, util_1$3.merge)(this.contents.context, context || {});
      };
      GlobalStore2.prototype.addBreadcrumb = function(breadcrumb) {
        if (this.contents.breadcrumbs.length == this.breadcrumbsLimit) {
          this.contents.breadcrumbs.shift();
        }
        this.contents.breadcrumbs.push(breadcrumb);
      };
      GlobalStore2.prototype.clear = function() {
        this.contents.context = {};
        this.contents.breadcrumbs = [];
      };
      GlobalStore2.prototype.run = function(callback) {
        return callback();
      };
      return GlobalStore2;
    }()
  );
  store.GlobalStore = GlobalStore;
  var throttled_events_logger = {};
  class NdJson {
    static parse(data) {
      const lines = data.trim().split("\n");
      return lines.map((line) => JSON.parse(line));
    }
    static stringify(data) {
      return data.map((item) => JSON.stringify(item)).join("\n");
    }
  }
  var module2 = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    NdJson
  });
  var require$$0 = /* @__PURE__ */ getAugmentedNamespace(module2);
  var defaults = {};
  Object.defineProperty(defaults, "__esModule", { value: true });
  defaults.CONFIG = void 0;
  defaults.CONFIG = {
    apiKey: null,
    endpoint: "https://api.honeybadger.io",
    environment: null,
    hostname: null,
    projectRoot: null,
    component: null,
    action: null,
    revision: null,
    reportData: null,
    breadcrumbsEnabled: true,
    // we could decide the value of eventsEnabled based on `env` and `developmentEnvironments`
    eventsEnabled: false,
    maxBreadcrumbs: 40,
    maxObjectDepth: 8,
    logger: console,
    developmentEnvironments: ["dev", "development", "test"],
    debug: false,
    tags: null,
    enableUncaught: true,
    enableUnhandledRejection: true,
    afterUncaught: function() {
      return true;
    },
    filters: ["creditcard", "password"],
    __plugins: []
  };
  var __assign$1 = commonjsGlobal && commonjsGlobal.__assign || function() {
    __assign$1 = Object.assign || function(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
      }
      return t;
    };
    return __assign$1.apply(this, arguments);
  };
  var __awaiter$2 = commonjsGlobal && commonjsGlobal.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var __generator$2 = commonjsGlobal && commonjsGlobal.__generator || function(thisArg, body) {
    var _ = { label: 0, sent: function() {
      if (t[0] & 1) throw t[1];
      return t[1];
    }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
      return this;
    }), g;
    function verb(n) {
      return function(v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (_) try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];
        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;
          case 4:
            _.label++;
            return { value: op[1], done: false };
          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;
          case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;
          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }
            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            if (t[2]) _.ops.pop();
            _.trys.pop();
            continue;
        }
        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
  Object.defineProperty(throttled_events_logger, "__esModule", { value: true });
  throttled_events_logger.ThrottledEventsLogger = void 0;
  var json_nd_1 = require$$0;
  var util_1$2 = util$1;
  var defaults_1$1 = defaults;
  var ThrottledEventsLogger = (
    /** @class */
    function() {
      function ThrottledEventsLogger2(config, transport2) {
        this.config = config;
        this.transport = transport2;
        this.queue = [];
        this.isProcessing = false;
        this.config = __assign$1(__assign$1({}, defaults_1$1.CONFIG), config);
        this.logger = this.originalLogger();
      }
      ThrottledEventsLogger2.prototype.configure = function(opts) {
        for (var k in opts) {
          this.config[k] = opts[k];
        }
      };
      ThrottledEventsLogger2.prototype.log = function(payload) {
        this.queue.push(payload);
        if (!this.isProcessing) {
          this.processQueue();
        }
      };
      ThrottledEventsLogger2.prototype.processQueue = function() {
        var _this = this;
        if (this.queue.length === 0 || this.isProcessing) {
          return;
        }
        this.isProcessing = true;
        var eventsData = this.queue.slice();
        this.queue = [];
        var data = json_nd_1.NdJson.stringify(eventsData);
        this.makeHttpRequest(data).then(function() {
          setTimeout(function() {
            _this.isProcessing = false;
            _this.processQueue();
          }, 50);
        }).catch(function(error) {
          _this.logger.error("[Honeybadger] Error making HTTP request:", error);
          setTimeout(function() {
            _this.isProcessing = false;
            _this.processQueue();
          }, 50);
        });
      };
      ThrottledEventsLogger2.prototype.makeHttpRequest = function(data) {
        return __awaiter$2(this, void 0, void 0, function() {
          var _this = this;
          return __generator$2(this, function(_a) {
            return [2, this.transport.send({
              headers: {
                "X-API-Key": this.config.apiKey,
                "Content-Type": "application/json"
              },
              method: "POST",
              endpoint: (0, util_1$2.endpoint)(this.config.endpoint, "/v1/events"),
              maxObjectDepth: this.config.maxObjectDepth,
              logger: this.logger
            }, data).then(function() {
              if (_this.config.debug) {
                _this.logger.debug("[Honeybadger] Events sent successfully");
              }
            }).catch(function(err) {
              _this.logger.error("[Honeybadger] Error sending events: ".concat(err.message));
            })];
          });
        });
      };
      ThrottledEventsLogger2.prototype.originalLogger = function() {
        var _a, _b, _c, _d, _e;
        return {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          log: (_a = console.log.__hb_original) !== null && _a !== void 0 ? _a : console.log,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          info: (_b = console.info.__hb_original) !== null && _b !== void 0 ? _b : console.info,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          debug: (_c = console.debug.__hb_original) !== null && _c !== void 0 ? _c : console.debug,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          warn: (_d = console.warn.__hb_original) !== null && _d !== void 0 ? _d : console.warn,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          error: (_e = console.error.__hb_original) !== null && _e !== void 0 ? _e : console.error
        };
      };
      return ThrottledEventsLogger2;
    }()
  );
  throttled_events_logger.ThrottledEventsLogger = ThrottledEventsLogger;
  var __assign = commonjsGlobal && commonjsGlobal.__assign || function() {
    __assign = Object.assign || function(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
      }
      return t;
    };
    return __assign.apply(this, arguments);
  };
  var __awaiter$1 = commonjsGlobal && commonjsGlobal.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var __generator$1 = commonjsGlobal && commonjsGlobal.__generator || function(thisArg, body) {
    var _ = { label: 0, sent: function() {
      if (t[0] & 1) throw t[1];
      return t[1];
    }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
      return this;
    }), g;
    function verb(n) {
      return function(v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (_) try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];
        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;
          case 4:
            _.label++;
            return { value: op[1], done: false };
          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;
          case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;
          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }
            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            if (t[2]) _.ops.pop();
            _.trys.pop();
            continue;
        }
        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
  Object.defineProperty(client, "__esModule", { value: true });
  client.Client = void 0;
  var util_1$1 = util$1;
  var store_1 = store;
  var throttled_events_logger_1 = throttled_events_logger;
  var defaults_1 = defaults;
  var TAG_SEPARATOR = /,|\s+/;
  var NOT_BLANK = /\S/;
  var Client = (
    /** @class */
    function() {
      function Client2(opts, transport2) {
        if (opts === void 0) {
          opts = {};
        }
        this.__pluginsLoaded = false;
        this.__store = null;
        this.__beforeNotifyHandlers = [];
        this.__afterNotifyHandlers = [];
        this.__notifier = {
          name: "@honeybadger-io/core",
          url: "https://github.com/honeybadger-io/honeybadger-js/tree/master/packages/core",
          version: "6.9.3"
        };
        this.config = __assign(__assign({}, defaults_1.CONFIG), opts);
        this.__initStore();
        this.__transport = transport2;
        this.__eventsLogger = new throttled_events_logger_1.ThrottledEventsLogger(this.config, this.__transport);
        this.logger = (0, util_1$1.logger)(this);
      }
      Client2.prototype.getVersion = function() {
        return this.__notifier.version;
      };
      Client2.prototype.getNotifier = function() {
        return this.__notifier;
      };
      Client2.prototype.setNotifier = function(notifier) {
        this.__notifier = notifier;
      };
      Client2.prototype.configure = function(opts) {
        if (opts === void 0) {
          opts = {};
        }
        for (var k in opts) {
          this.config[k] = opts[k];
        }
        this.__eventsLogger.configure(this.config);
        this.loadPlugins();
        return this;
      };
      Client2.prototype.loadPlugins = function() {
        var _this = this;
        var pluginsToLoad = this.__pluginsLoaded ? this.config.__plugins.filter(function(plugin) {
          return plugin.shouldReloadOnConfigure;
        }) : this.config.__plugins;
        pluginsToLoad.forEach(function(plugin) {
          return plugin.load(_this);
        });
        this.__pluginsLoaded = true;
      };
      Client2.prototype.__initStore = function() {
        this.__store = new store_1.GlobalStore({ context: {}, breadcrumbs: [] }, this.config.maxBreadcrumbs);
      };
      Client2.prototype.beforeNotify = function(handler) {
        this.__beforeNotifyHandlers.push(handler);
        return this;
      };
      Client2.prototype.afterNotify = function(handler) {
        this.__afterNotifyHandlers.push(handler);
        return this;
      };
      Client2.prototype.setContext = function(context) {
        if (typeof context === "object" && context != null) {
          this.__store.setContext(context);
        }
        return this;
      };
      Client2.prototype.resetContext = function(context) {
        this.logger.warn("Deprecation warning: `Honeybadger.resetContext()` has been deprecated; please use `Honeybadger.clear()` instead.");
        this.__store.clear();
        if (typeof context === "object" && context !== null) {
          this.__store.setContext(context);
        }
        return this;
      };
      Client2.prototype.clear = function() {
        this.__store.clear();
        return this;
      };
      Client2.prototype.notify = function(noticeable, name, extra) {
        var _this = this;
        if (name === void 0) {
          name = void 0;
        }
        if (extra === void 0) {
          extra = void 0;
        }
        var notice = this.makeNotice(noticeable, name, extra);
        var sourceCodeData = notice && notice.backtrace ? notice.backtrace.map(function(trace) {
          return (0, util_1$1.shallowClone)(trace);
        }) : null;
        var preConditionsResult = this.__runPreconditions(notice);
        if (preConditionsResult instanceof Error) {
          (0, util_1$1.runAfterNotifyHandlers)(notice, this.__afterNotifyHandlers, preConditionsResult);
          return false;
        }
        if (preConditionsResult instanceof Promise) {
          preConditionsResult.then(function(result) {
            if (result instanceof Error) {
              (0, util_1$1.runAfterNotifyHandlers)(notice, _this.__afterNotifyHandlers, result);
              return false;
            }
            return _this.__send(notice, sourceCodeData);
          });
          return true;
        }
        this.__send(notice, sourceCodeData).catch(function(_err) {
        });
        return true;
      };
      Client2.prototype.notifyAsync = function(noticeable, name, extra) {
        var _this = this;
        if (name === void 0) {
          name = void 0;
        }
        if (extra === void 0) {
          extra = void 0;
        }
        return new Promise(function(resolve, reject) {
          var applyAfterNotify = function(partialNotice) {
            var originalAfterNotify = partialNotice.afterNotify;
            partialNotice.afterNotify = function(err) {
              originalAfterNotify === null || originalAfterNotify === void 0 ? void 0 : originalAfterNotify.call(_this, err);
              if (err) {
                return reject(err);
              }
              resolve();
            };
          };
          var objectToOverride;
          if (noticeable.afterNotify) {
            objectToOverride = noticeable;
          } else if (name && name.afterNotify) {
            objectToOverride = name;
          } else if (extra && extra.afterNotify) {
            objectToOverride = extra;
          } else if (name && typeof name === "object") {
            objectToOverride = name;
          } else if (extra) {
            objectToOverride = extra;
          } else {
            objectToOverride = name = {};
          }
          applyAfterNotify(objectToOverride);
          _this.notify(noticeable, name, extra);
        });
      };
      Client2.prototype.makeNotice = function(noticeable, name, extra) {
        if (name === void 0) {
          name = void 0;
        }
        if (extra === void 0) {
          extra = void 0;
        }
        var notice = (0, util_1$1.makeNotice)(noticeable);
        if (name && !(typeof name === "object")) {
          var n = String(name);
          name = { name: n };
        }
        if (name) {
          notice = (0, util_1$1.mergeNotice)(notice, name);
        }
        if (typeof extra === "object" && extra !== null) {
          notice = (0, util_1$1.mergeNotice)(notice, extra);
        }
        if ((0, util_1$1.objectIsEmpty)(notice)) {
          return null;
        }
        var context = this.__store.getContents("context");
        var noticeTags = this.__constructTags(notice.tags);
        var contextTags = this.__constructTags(context["tags"]);
        var configTags = this.__constructTags(this.config.tags);
        var tags = noticeTags.concat(contextTags).concat(configTags);
        var uniqueTags = tags.filter(function(item, index) {
          return tags.indexOf(item) === index;
        });
        notice = (0, util_1$1.merge)(notice, {
          name: notice.name || "Error",
          context: (0, util_1$1.merge)(context, notice.context),
          projectRoot: notice.projectRoot || this.config.projectRoot,
          environment: notice.environment || this.config.environment,
          component: notice.component || this.config.component,
          action: notice.action || this.config.action,
          revision: notice.revision || this.config.revision,
          tags: uniqueTags
        });
        if (!Array.isArray(notice.backtrace) || !notice.backtrace.length) {
          if (typeof notice.stack !== "string" || !notice.stack.trim()) {
            notice.stack = (0, util_1$1.generateStackTrace)();
            notice.backtrace = (0, util_1$1.makeBacktrace)(notice.stack, true, this.logger);
          } else {
            notice.backtrace = (0, util_1$1.makeBacktrace)(notice.stack, false, this.logger);
          }
        }
        return notice;
      };
      Client2.prototype.addBreadcrumb = function(message, opts) {
        if (!this.config.breadcrumbsEnabled) {
          return;
        }
        opts = opts || {};
        var metadata = (0, util_1$1.shallowClone)(opts.metadata);
        var category = opts.category || "custom";
        var timestamp = (/* @__PURE__ */ new Date()).toISOString();
        this.__store.addBreadcrumb({
          category,
          message,
          metadata,
          timestamp
        });
        return this;
      };
      Client2.prototype.logEvent = function(data) {
        (0, util_1$1.logDeprecatedMethod)(this.logger, "Honeybadger.logEvent", "Honeybadger.event");
        this.event("log", data);
      };
      Client2.prototype.event = function(type, data) {
        var _a;
        if (typeof type === "object") {
          data = type;
          type = (_a = type["event_type"]) !== null && _a !== void 0 ? _a : void 0;
        }
        this.__eventsLogger.log(__assign({ event_type: type, ts: (/* @__PURE__ */ new Date()).toISOString() }, data));
      };
      Client2.prototype.__getBreadcrumbs = function() {
        return this.__store.getContents("breadcrumbs").slice();
      };
      Client2.prototype.__getContext = function() {
        return this.__store.getContents("context");
      };
      Client2.prototype.__developmentMode = function() {
        if (this.config.reportData === true) {
          return false;
        }
        return this.config.environment && this.config.developmentEnvironments.includes(this.config.environment);
      };
      Client2.prototype.__buildPayload = function(notice) {
        var headers = (0, util_1$1.filter)(notice.headers, this.config.filters) || {};
        var cgiData = (0, util_1$1.filter)(__assign(__assign({}, notice.cgiData), (0, util_1$1.formatCGIData)(headers, "HTTP_")), this.config.filters);
        return {
          notifier: this.__notifier,
          breadcrumbs: {
            enabled: !!this.config.breadcrumbsEnabled,
            trail: notice.__breadcrumbs || []
          },
          error: {
            class: notice.name,
            message: notice.message,
            backtrace: notice.backtrace,
            fingerprint: notice.fingerprint,
            tags: notice.tags,
            causes: (0, util_1$1.getCauses)(notice, this.logger)
          },
          request: {
            url: (0, util_1$1.filterUrl)(notice.url, this.config.filters),
            component: notice.component,
            action: notice.action,
            context: notice.context,
            cgi_data: cgiData,
            params: (0, util_1$1.filter)(notice.params, this.config.filters) || {},
            session: (0, util_1$1.filter)(notice.session, this.config.filters) || {}
          },
          server: {
            project_root: notice.projectRoot,
            environment_name: notice.environment,
            revision: notice.revision,
            hostname: this.config.hostname,
            time: (/* @__PURE__ */ new Date()).toUTCString()
          },
          details: notice.details || {}
        };
      };
      Client2.prototype.__constructTags = function(tags) {
        if (!tags) {
          return [];
        }
        return tags.toString().split(TAG_SEPARATOR).filter(function(tag) {
          return NOT_BLANK.test(tag);
        });
      };
      Client2.prototype.__runPreconditions = function(notice) {
        var _this = this;
        var preConditionError = null;
        if (!notice) {
          this.logger.debug("failed to build error report");
          preConditionError = new Error("failed to build error report");
        }
        if (this.config.reportData === false) {
          this.logger.debug("skipping error report: honeybadger.js is disabled", notice);
          preConditionError = new Error("honeybadger.js is disabled");
        }
        if (this.__developmentMode()) {
          this.logger.log("honeybadger.js is in development mode; the following error report will be sent in production.", notice);
          preConditionError = new Error("honeybadger.js is in development mode");
        }
        if (!this.config.apiKey) {
          this.logger.warn("could not send error report: no API key has been configured", notice);
          preConditionError = new Error("missing API key");
        }
        var beforeNotifyResult = (0, util_1$1.runBeforeNotifyHandlers)(notice, this.__beforeNotifyHandlers);
        if (!preConditionError && !beforeNotifyResult.result) {
          this.logger.debug("skipping error report: one or more beforeNotify handlers returned false", notice);
          preConditionError = new Error("beforeNotify handlers returned false");
        }
        if (beforeNotifyResult.results.length && beforeNotifyResult.results.some(function(result) {
          return result instanceof Promise;
        })) {
          return Promise.allSettled(beforeNotifyResult.results).then(function(results) {
            if (!preConditionError && results.some(function(result) {
              return result.status === "rejected" || result.value === false;
            })) {
              _this.logger.debug("skipping error report: one or more beforeNotify handlers returned false", notice);
              preConditionError = new Error("beforeNotify handlers (async) returned false");
            }
            if (preConditionError) {
              return preConditionError;
            }
          });
        }
        return preConditionError;
      };
      Client2.prototype.__send = function(notice, originalBacktrace) {
        var _this = this;
        if (this.config.breadcrumbsEnabled) {
          this.addBreadcrumb("Honeybadger Notice", {
            category: "notice",
            metadata: {
              message: notice.message,
              name: notice.name,
              stack: notice.stack
            }
          });
          notice.__breadcrumbs = this.__store.getContents("breadcrumbs");
        } else {
          notice.__breadcrumbs = [];
        }
        return (0, util_1$1.getSourceForBacktrace)(originalBacktrace, this.__getSourceFileHandler).then(function(sourcePerTrace) {
          return __awaiter$1(_this, void 0, void 0, function() {
            var payload;
            return __generator$1(this, function(_a) {
              sourcePerTrace.forEach(function(source, index) {
                notice.backtrace[index].source = source;
              });
              payload = this.__buildPayload(notice);
              return [2, this.__transport.send({
                headers: {
                  "X-API-Key": this.config.apiKey,
                  "Content-Type": "application/json",
                  "Accept": "text/json, application/json"
                },
                method: "POST",
                endpoint: (0, util_1$1.endpoint)(this.config.endpoint, "/v1/notices/js"),
                maxObjectDepth: this.config.maxObjectDepth,
                logger: this.logger
              }, payload)];
            });
          });
        }).then(function(res) {
          if (res.statusCode !== 201) {
            (0, util_1$1.runAfterNotifyHandlers)(notice, _this.__afterNotifyHandlers, new Error("Bad HTTP response: ".concat(res.statusCode)));
            _this.logger.warn("Error report failed: unknown response from server. code=".concat(res.statusCode));
            return false;
          }
          var uuid = JSON.parse(res.body).id;
          (0, util_1$1.runAfterNotifyHandlers)((0, util_1$1.merge)(notice, {
            id: uuid
          }), _this.__afterNotifyHandlers);
          _this.logger.info("Error report sent \u26A1 https://app.honeybadger.io/notice/".concat(uuid));
          return true;
        }).catch(function(err) {
          _this.logger.error("Error report failed: an unknown error occurred.", "message=".concat(err.message));
          (0, util_1$1.runAfterNotifyHandlers)(notice, _this.__afterNotifyHandlers, err);
          return false;
        });
      };
      return Client2;
    }()
  );
  client.Client = Client;
  var types = {};
  Object.defineProperty(types, "__esModule", { value: true });
  (function(exports2) {
    var __createBinding = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = commonjsGlobal && commonjsGlobal.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __exportStar = commonjsGlobal && commonjsGlobal.__exportStar || function(m, exports3) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports3, p)) __createBinding(exports3, m, p);
    };
    var __importStar = commonjsGlobal && commonjsGlobal.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    var __importDefault = commonjsGlobal && commonjsGlobal.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Plugins = exports2.Util = exports2.Types = exports2.Client = void 0;
    var events_1 = __importDefault(events);
    var client_1 = client;
    Object.defineProperty(exports2, "Client", { enumerable: true, get: function() {
      return client_1.Client;
    } });
    __exportStar(store, exports2);
    exports2.Types = __importStar(types);
    exports2.Util = __importStar(util$1);
    exports2.Plugins = {
      events: events_1.default
    };
  })(src);
  var util = {};
  Object.defineProperty(util, "__esModule", { value: true });
  util.preferCatch = util.encodeCookie = util.decodeCookie = util.localURLPathname = util.parseURL = util.nativeFetch = util.stringTextOfElement = util.stringSelectorOfElement = util.stringNameOfElement = void 0;
  var core_1$6 = src;
  var globalThisOrWindow$6 = core_1$6.Util.globalThisOrWindow;
  function stringNameOfElement(element) {
    if (!element || !element.tagName) {
      return "";
    }
    var name = element.tagName.toLowerCase();
    if (name === "html") {
      return "";
    }
    if (element.id) {
      name += "#".concat(element.id);
    }
    var stringClassNames = element.getAttribute("class");
    if (stringClassNames) {
      stringClassNames.split(/\s+/).forEach(function(className) {
        name += ".".concat(className);
      });
    }
    ["alt", "name", "title", "type"].forEach(function(attrName) {
      var attr = element.getAttribute(attrName);
      if (attr) {
        name += "[".concat(attrName, '="').concat(attr, '"]');
      }
    });
    var siblings = getSiblings(element);
    if (siblings.length > 1) {
      name += ":nth-child(".concat(Array.prototype.indexOf.call(siblings, element) + 1, ")");
    }
    return name;
  }
  util.stringNameOfElement = stringNameOfElement;
  function stringSelectorOfElement(element) {
    var name = stringNameOfElement(element);
    if (element.parentNode && element.parentNode.tagName) {
      var parentName = stringSelectorOfElement(element.parentNode);
      if (parentName.length > 0) {
        return "".concat(parentName, " > ").concat(name);
      }
    }
    return name;
  }
  util.stringSelectorOfElement = stringSelectorOfElement;
  function stringTextOfElement(element) {
    var text = element.textContent || element.innerText || "";
    if (!text && (element.type === "submit" || element.type === "button")) {
      text = element.value;
    }
    return truncate(text.trim(), 300);
  }
  util.stringTextOfElement = stringTextOfElement;
  function nativeFetch() {
    var global2 = globalThisOrWindow$6();
    if (!global2.fetch) {
      return false;
    }
    if (isNative(global2.fetch)) {
      return true;
    }
    if (typeof document === "undefined") {
      return false;
    }
    try {
      var sandbox = document.createElement("iframe");
      sandbox.style.display = "none";
      document.head.appendChild(sandbox);
      var result = sandbox.contentWindow.fetch && isNative(sandbox.contentWindow.fetch);
      document.head.removeChild(sandbox);
      return result;
    } catch (err) {
      if (console && console.warn) {
        console.warn("failed to detect native fetch via iframe: " + err);
      }
    }
    return false;
  }
  util.nativeFetch = nativeFetch;
  function isNative(func) {
    return func.toString().indexOf("native") !== -1;
  }
  function parseURL(url) {
    var match = url.match(/^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/) || {};
    return {
      protocol: match[2],
      host: match[4],
      pathname: match[5]
    };
  }
  util.parseURL = parseURL;
  function localURLPathname(url) {
    var parsed = parseURL(url);
    var parsedDocURL = parseURL(document.URL);
    if (!parsed.host || !parsed.protocol) {
      return parsed.pathname;
    }
    if (parsed.protocol === parsedDocURL.protocol && parsed.host === parsedDocURL.host) {
      return parsed.pathname;
    }
    return "".concat(parsed.protocol, "://").concat(parsed.host).concat(parsed.pathname);
  }
  util.localURLPathname = localURLPathname;
  function decodeCookie(string) {
    var result = {};
    string.split(/[;,]\s?/).forEach(function(pair) {
      var _a = pair.split("=", 2), key = _a[0], value = _a[1];
      result[key] = value;
    });
    return result;
  }
  util.decodeCookie = decodeCookie;
  function encodeCookie(object) {
    if (typeof object !== "object") {
      return void 0;
    }
    var cookies = [];
    for (var k in object) {
      cookies.push(k + "=" + object[k]);
    }
    return cookies.join(";");
  }
  util.encodeCookie = encodeCookie;
  function getSiblings(element) {
    try {
      var nodes = element.parentNode.childNodes;
      var siblings_1 = [];
      Array.prototype.forEach.call(nodes, function(node) {
        if (node.tagName && node.tagName === element.tagName) {
          siblings_1.push(node);
        }
      });
      return siblings_1;
    } catch (e) {
      return [];
    }
  }
  function truncate(string, length) {
    if (string.length > length) {
      string = string.substr(0, length) + "...";
    }
    return string;
  }
  util.preferCatch = function() {
    var preferCatch = true;
    if (typeof window === "undefined")
      return preferCatch;
    if (!window.atob) {
      preferCatch = false;
    }
    if (window.ErrorEvent) {
      try {
        if (new window.ErrorEvent("").colno === 0) {
          preferCatch = false;
        }
      } catch (_e) {
      }
    }
    return preferCatch;
  }();
  var onerror = {};
  Object.defineProperty(onerror, "__esModule", { value: true });
  onerror.onError = onerror.ignoreNextOnError = void 0;
  var core_1$5 = src;
  var instrument$4 = core_1$5.Util.instrument, makeNotice = core_1$5.Util.makeNotice, globalThisOrWindow$5 = core_1$5.Util.globalThisOrWindow;
  var ignoreOnError = 0;
  var currentTimeout;
  function ignoreNextOnError() {
    ignoreOnError += 1;
    clearTimeout(currentTimeout);
    currentTimeout = setTimeout(function() {
      ignoreOnError = 0;
    });
  }
  onerror.ignoreNextOnError = ignoreNextOnError;
  function onError(_window) {
    if (_window === void 0) {
      _window = globalThisOrWindow$5();
    }
    return {
      load: function(client2) {
        instrument$4(_window, "onerror", function(original) {
          var onerror2 = function(msg, url, line, col, err) {
            client2.logger.debug("window.onerror callback invoked", arguments);
            if (ignoreOnError > 0) {
              client2.logger.debug("Ignoring window.onerror (error likely reported earlier)", arguments);
              ignoreOnError -= 1;
              return;
            }
            if (line === 0 && /Script error\.?/.test(msg)) {
              if (client2.config.enableUncaught) {
                client2.logger.warn("Ignoring cross-domain script error: enable CORS to track these types of errors", arguments);
              }
              return;
            }
            var notice = makeNotice(err);
            if (!notice.name) {
              notice.name = "window.onerror";
            }
            if (!notice.message) {
              notice.message = msg;
            }
            if (!notice.stack) {
              notice.stack = [notice.message, "\n    at ? (", url || "unknown", ":", line || 0, ":", col || 0, ")"].join("");
            }
            client2.addBreadcrumb(notice.name === "window.onerror" || !notice.name ? "window.onerror" : "window.onerror: ".concat(notice.name), {
              category: "error",
              metadata: {
                name: notice.name,
                message: notice.message,
                stack: notice.stack
              }
            });
            if (client2.config.enableUncaught) {
              client2.notify(notice);
            }
          };
          return function(msg, url, line, col, err) {
            onerror2(msg, url, line, col, err);
            if (typeof original === "function") {
              return original.apply(_window, arguments);
            }
            return false;
          };
        });
      }
    };
  }
  onerror.onError = onError;
  var onunhandledrejection = {};
  Object.defineProperty(onunhandledrejection, "__esModule", { value: true });
  var core_1$4 = src;
  var instrument$3 = core_1$4.Util.instrument, globalThisOrWindow$4 = core_1$4.Util.globalThisOrWindow;
  function default_1$3(_window) {
    if (_window === void 0) {
      _window = globalThisOrWindow$4();
    }
    return {
      load: function(client2) {
        if (!client2.config.enableUnhandledRejection) {
          return;
        }
        instrument$3(_window, "onunhandledrejection", function(original) {
          function onunhandledrejection2(promiseRejectionEvent) {
            var _a;
            client2.logger.debug("window.onunhandledrejection callback invoked", arguments);
            if (!client2.config.enableUnhandledRejection) {
              return;
            }
            var reason = promiseRejectionEvent.reason;
            if (reason instanceof Error) {
              var fileName = "unknown";
              var lineNumber = 0;
              var stackFallback = "".concat(reason.message, "\n    at ? (").concat(fileName, ":").concat(lineNumber, ")");
              var stack = reason.stack || stackFallback;
              var err = {
                name: reason.name,
                message: "UnhandledPromiseRejectionWarning: ".concat(reason),
                stack
              };
              client2.addBreadcrumb("window.onunhandledrejection: ".concat(err.name), {
                category: "error",
                metadata: err
              });
              client2.notify(err);
              return;
            }
            var message = typeof reason === "string" ? reason : (_a = JSON.stringify(reason)) !== null && _a !== void 0 ? _a : "Unspecified reason";
            client2.notify({
              name: "window.onunhandledrejection",
              message: "UnhandledPromiseRejectionWarning: ".concat(message)
            });
          }
          return function(promiseRejectionEvent) {
            onunhandledrejection2(promiseRejectionEvent);
            if (typeof original === "function") {
              original.apply(this, arguments);
            }
          };
        });
      }
    };
  }
  onunhandledrejection.default = default_1$3;
  var breadcrumbs = {};
  Object.defineProperty(breadcrumbs, "__esModule", { value: true });
  var core_1$3 = src;
  var util_1 = util;
  var sanitize$1 = core_1$3.Util.sanitize, instrument$2 = core_1$3.Util.instrument, instrumentConsole = core_1$3.Util.instrumentConsole, globalThisOrWindow$3 = core_1$3.Util.globalThisOrWindow;
  function default_1$2(_window) {
    if (_window === void 0) {
      _window = globalThisOrWindow$3();
    }
    return {
      load: function(client2) {
        function breadcrumbsEnabled(type) {
          if (client2.config.breadcrumbsEnabled === true) {
            return true;
          }
          if (type) {
            return client2.config.breadcrumbsEnabled[type] === true;
          }
          return client2.config.breadcrumbsEnabled !== false;
        }
        (function() {
          if (!breadcrumbsEnabled("console")) {
            return;
          }
          function inspectArray(obj) {
            if (!Array.isArray(obj)) {
              return "";
            }
            return obj.map(function(value) {
              try {
                return String(value);
              } catch (e) {
                return "[unknown]";
              }
            }).join(" ");
          }
          instrumentConsole(_window, function(level, args) {
            var message = inspectArray(args);
            var opts = {
              category: "log",
              metadata: {
                level,
                arguments: sanitize$1(args, 3)
              }
            };
            client2.addBreadcrumb(message, opts);
          });
        })();
        (function() {
          if (!breadcrumbsEnabled("dom")) {
            return;
          }
          if (typeof _window.addEventListener !== "function") {
            return;
          }
          _window.addEventListener("click", function(event) {
            var message, selector, text;
            try {
              message = (0, util_1.stringNameOfElement)(event.target);
              selector = (0, util_1.stringSelectorOfElement)(event.target);
              text = (0, util_1.stringTextOfElement)(event.target);
            } catch (e) {
              message = "UI Click";
              selector = "[unknown]";
              text = "[unknown]";
            }
            if (message.length === 0) {
              return;
            }
            client2.addBreadcrumb(message, {
              category: "ui.click",
              metadata: {
                selector,
                text,
                event
              }
            });
          }, _window.location ? true : false);
        })();
        (function() {
          if (!breadcrumbsEnabled("network")) {
            return;
          }
          if (typeof XMLHttpRequest === "undefined") {
            return;
          }
          instrument$2(XMLHttpRequest.prototype, "open", function(original) {
            return function() {
              var xhr = this;
              var rawUrl = arguments[1];
              var url = typeof rawUrl === "string" ? rawUrl : String(rawUrl);
              var method = typeof arguments[0] === "string" ? arguments[0].toUpperCase() : arguments[0];
              var message = "".concat(method, " ").concat((0, util_1.localURLPathname)(url));
              this.__hb_xhr = {
                type: "xhr",
                method,
                url,
                message
              };
              if (typeof original === "function") {
                original.apply(xhr, arguments);
              }
            };
          });
          instrument$2(XMLHttpRequest.prototype, "send", function(original) {
            return function() {
              var xhr = this;
              function onreadystatechangeHandler() {
                if (xhr.readyState === 4) {
                  var message = void 0;
                  if (xhr.__hb_xhr) {
                    xhr.__hb_xhr.status_code = xhr.status;
                    message = xhr.__hb_xhr.message;
                    delete xhr.__hb_xhr.message;
                  }
                  client2.addBreadcrumb(message || "XMLHttpRequest", {
                    category: "request",
                    metadata: xhr.__hb_xhr
                  });
                }
              }
              if ("onreadystatechange" in xhr && typeof xhr.onreadystatechange === "function") {
                instrument$2(xhr, "onreadystatechange", function(original2) {
                  return function() {
                    onreadystatechangeHandler();
                    if (typeof original2 === "function") {
                      original2.apply(this, arguments);
                    }
                  };
                });
              } else {
                xhr.onreadystatechange = onreadystatechangeHandler;
              }
              if (typeof original === "function") {
                original.apply(xhr, arguments);
              }
            };
          });
        })();
        (function() {
          if (!breadcrumbsEnabled("network")) {
            return;
          }
          if (!(0, util_1.nativeFetch)()) {
            return;
          }
          instrument$2(_window, "fetch", function(original) {
            return function() {
              var input = arguments[0];
              var method = "GET";
              var url;
              if (typeof input === "string") {
                url = input;
              } else if ("Request" in _window && input instanceof Request) {
                url = input.url;
                if (input.method) {
                  method = input.method;
                }
              } else {
                url = String(input);
              }
              if (arguments[1] && arguments[1].method) {
                method = arguments[1].method;
              }
              if (typeof method === "string") {
                method = method.toUpperCase();
              }
              var message = "".concat(method, " ").concat(typeof document === "undefined" ? url : (0, util_1.localURLPathname)(url));
              var metadata = {
                type: "fetch",
                method,
                url
              };
              return original.apply(this, arguments).then(function(response) {
                metadata["status_code"] = response.status;
                client2.addBreadcrumb(message, {
                  category: "request",
                  metadata
                });
                return response;
              }).catch(function(error) {
                client2.addBreadcrumb("fetch error", {
                  category: "error",
                  metadata
                });
                throw error;
              });
            };
          });
        })();
        (function() {
          if (!breadcrumbsEnabled("navigation")) {
            return;
          }
          if (_window.location == null) {
            return;
          }
          var lastHref = _window.location.href;
          function recordUrlChange(from, to) {
            lastHref = to;
            client2.addBreadcrumb("Page changed", {
              category: "navigation",
              metadata: {
                from,
                to
              }
            });
          }
          if (typeof addEventListener === "function") {
            addEventListener("popstate", function(_event) {
              recordUrlChange(lastHref, _window.location.href);
            });
          }
          if (typeof _window.history === "undefined") {
            return;
          }
          function historyWrapper(original) {
            return function() {
              var url = arguments.length > 2 ? arguments[2] : void 0;
              if (url) {
                recordUrlChange(lastHref, String(url));
              }
              return original.apply(this, arguments);
            };
          }
          instrument$2(_window.history, "pushState", historyWrapper);
          instrument$2(_window.history, "replaceState", historyWrapper);
        })();
      }
    };
  }
  breadcrumbs.default = default_1$2;
  var timers = {};
  Object.defineProperty(timers, "__esModule", { value: true });
  var core_1$2 = src;
  var instrument$1 = core_1$2.Util.instrument, globalThisOrWindow$2 = core_1$2.Util.globalThisOrWindow;
  function default_1$1(_window) {
    if (_window === void 0) {
      _window = globalThisOrWindow$2();
    }
    return {
      load: function(client2) {
        (function() {
          function instrumentTimer(wrapOpts) {
            return function(original) {
              return function(func, delay) {
                if (typeof func === "function") {
                  var args_1 = Array.prototype.slice.call(arguments, 2);
                  func = client2.__wrap(func, wrapOpts);
                  return original(function() {
                    func.apply(void 0, args_1);
                  }, delay);
                } else {
                  return original(func, delay);
                }
              };
            };
          }
          instrument$1(_window, "setTimeout", instrumentTimer({ component: "setTimeout" }));
          instrument$1(_window, "setInterval", instrumentTimer({ component: "setInterval" }));
        })();
      }
    };
  }
  timers.default = default_1$1;
  var event_listeners = {};
  Object.defineProperty(event_listeners, "__esModule", { value: true });
  var core_1$1 = src;
  var instrument = core_1$1.Util.instrument, globalThisOrWindow$1 = core_1$1.Util.globalThisOrWindow;
  function default_1(_window) {
    if (_window === void 0) {
      _window = globalThisOrWindow$1();
    }
    return {
      load: function(client2) {
        var targets = ["EventTarget", "Window", "Node", "ApplicationCache", "AudioTrackList", "ChannelMergerNode", "CryptoOperation", "EventSource", "FileReader", "HTMLUnknownElement", "IDBDatabase", "IDBRequest", "IDBTransaction", "KeyOperation", "MediaController", "MessagePort", "ModalWindow", "Notification", "SVGElementInstance", "Screen", "TextTrack", "TextTrackCue", "TextTrackList", "WebSocket", "WebSocketWorker", "Worker", "XMLHttpRequest", "XMLHttpRequestEventTarget", "XMLHttpRequestUpload"];
        targets.forEach(function(prop) {
          var prototype = _window[prop] && _window[prop].prototype;
          if (prototype && Object.prototype.hasOwnProperty.call(prototype, "addEventListener")) {
            instrument(prototype, "addEventListener", function(original) {
              var wrapOpts = { component: "".concat(prop, ".prototype.addEventListener") };
              return function(type, listener, useCapture, wantsUntrusted) {
                try {
                  if (listener && listener.handleEvent != null) {
                    listener.handleEvent = client2.__wrap(listener.handleEvent, wrapOpts);
                  }
                } catch (e) {
                  client2.logger.error(e);
                }
                return original.call(this, type, client2.__wrap(listener, wrapOpts), useCapture, wantsUntrusted);
              };
            });
            instrument(prototype, "removeEventListener", function(original) {
              return function(type, listener, useCapture, wantsUntrusted) {
                original.call(this, type, listener, useCapture, wantsUntrusted);
                return original.call(this, type, client2.__wrap(listener), useCapture, wantsUntrusted);
              };
            });
          }
        });
      }
    };
  }
  event_listeners.default = default_1;
  var transport = {};
  var __awaiter = commonjsGlobal && commonjsGlobal.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var __generator = commonjsGlobal && commonjsGlobal.__generator || function(thisArg, body) {
    var _ = { label: 0, sent: function() {
      if (t[0] & 1) throw t[1];
      return t[1];
    }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
      return this;
    }), g;
    function verb(n) {
      return function(v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (_) try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];
        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;
          case 4:
            _.label++;
            return { value: op[1], done: false };
          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;
          case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;
          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }
            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            if (t[2]) _.ops.pop();
            _.trys.pop();
            continue;
        }
        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
  Object.defineProperty(transport, "__esModule", { value: true });
  transport.BrowserTransport = void 0;
  var core_1 = src;
  var sanitize = core_1.Util.sanitize, globalThisOrWindow = core_1.Util.globalThisOrWindow;
  function objectEntries(obj) {
    return Object.entries(obj);
  }
  var BrowserTransport = (
    /** @class */
    function() {
      function BrowserTransport2(headers) {
        if (headers === void 0) {
          headers = {};
        }
        this.headers = {};
        this.headers = headers;
      }
      BrowserTransport2.prototype.defaultHeaders = function() {
        return this.headers;
      };
      BrowserTransport2.prototype.send = function(options, payload) {
        return __awaiter(this, void 0, void 0, function() {
          var headerArray, headers, requestInit, response, body;
          return __generator(this, function(_a) {
            switch (_a.label) {
              case 0:
                headerArray = options.headers ? objectEntries(options.headers) : [];
                headers = this.defaultHeaders();
                headerArray.forEach(function(_a2) {
                  var key = _a2[0], value = _a2[1];
                  if (key != null && value != null) {
                    headers[String(key)] = String(value);
                  }
                });
                requestInit = {
                  method: options.method,
                  headers
                };
                if (options.method === "POST" && payload) {
                  requestInit.body = typeof payload === "string" ? payload : JSON.stringify(sanitize(payload, options.maxObjectDepth));
                }
                return [4, globalThisOrWindow().fetch(options.endpoint, requestInit)];
              case 1:
                response = _a.sent();
                return [4, response.text()];
              case 2:
                body = _a.sent();
                return [2, Promise.resolve({ statusCode: response.status, body })];
            }
          });
        });
      };
      return BrowserTransport2;
    }()
  );
  transport.BrowserTransport = BrowserTransport;
  (function(exports2) {
    var __extends = commonjsGlobal && commonjsGlobal.__extends || /* @__PURE__ */ function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __assign2 = commonjsGlobal && commonjsGlobal.__assign || function() {
      __assign2 = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
        }
        return t;
      };
      return __assign2.apply(this, arguments);
    };
    var __awaiter2 = commonjsGlobal && commonjsGlobal.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator2 = commonjsGlobal && commonjsGlobal.__generator || function(thisArg, body) {
      var _ = { label: 0, sent: function() {
        if (t[0] & 1) throw t[1];
        return t[1];
      }, trys: [], ops: [] }, f, y, t, g;
      return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([n, v]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
          if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          if (y = 0, t) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return { value: op[0] ? op[1] : void 0, done: true };
      }
    };
    var __importDefault = commonjsGlobal && commonjsGlobal.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Types = exports2.getUserFeedbackScriptUrl = void 0;
    var core_12 = src;
    var util_12 = util;
    var onerror_1 = onerror;
    var onunhandledrejection_1 = __importDefault(onunhandledrejection);
    var breadcrumbs_1 = __importDefault(breadcrumbs);
    var timers_1 = __importDefault(timers);
    var event_listeners_1 = __importDefault(event_listeners);
    var transport_1 = transport;
    var merge = core_12.Util.merge, filter = core_12.Util.filter, objectIsExtensible = core_12.Util.objectIsExtensible, globalThisOrWindow2 = core_12.Util.globalThisOrWindow;
    var getProjectRoot = function() {
      var global2 = globalThisOrWindow2();
      var projectRoot = "";
      if (global2.location != null) {
        projectRoot = global2.location.protocol + "//" + global2.location.host;
      }
      return projectRoot;
    };
    var getUserFeedbackScriptUrl = function(version) {
      var majorMinorVersion = version.split(".").slice(0, 2).join(".");
      return "https://js.honeybadger.io/v".concat(majorMinorVersion, "/honeybadger-feedback-form.js");
    };
    exports2.getUserFeedbackScriptUrl = getUserFeedbackScriptUrl;
    var Honeybadger = (
      /** @class */
      function(_super) {
        __extends(Honeybadger2, _super);
        function Honeybadger2(opts) {
          if (opts === void 0) {
            opts = {};
          }
          var _this = _super.call(this, __assign2({ userFeedbackEndpoint: "https://api.honeybadger.io/v2/feedback", async: true, maxErrors: null, projectRoot: getProjectRoot() }, opts), new transport_1.BrowserTransport({
            "User-Agent": userAgent()
          })) || this;
          _this.__errorsSent = 0;
          _this.__lastWrapErr = void 0;
          _this.__lastNoticeId = void 0;
          _this.__beforeNotifyHandlers = [
            function(notice) {
              if (_this.__exceedsMaxErrors()) {
                _this.logger.debug("Dropping notice: max errors exceeded", notice);
                return false;
              }
              if (notice && !notice.url && typeof document !== "undefined") {
                notice.url = document.URL;
              }
              _this.__incrementErrorsCount();
              return true;
            }
          ];
          _this.__afterNotifyHandlers = [
            function(_error, notice) {
              if (notice) {
                _this.__lastNoticeId = notice.id;
              }
            }
          ];
          return _this;
        }
        Honeybadger2.prototype.configure = function(opts) {
          if (opts === void 0) {
            opts = {};
          }
          return _super.prototype.configure.call(this, opts);
        };
        Honeybadger2.prototype.resetMaxErrors = function() {
          return this.__errorsSent = 0;
        };
        Honeybadger2.prototype.factory = function(opts) {
          var clone = new Honeybadger2(opts);
          clone.setNotifier(this.getNotifier());
          return clone;
        };
        Honeybadger2.prototype.checkIn = function(_id) {
          throw new Error("Honeybadger.checkIn() is not supported on the browser");
        };
        Honeybadger2.prototype.showUserFeedbackForm = function(options) {
          if (options === void 0) {
            options = {};
          }
          return __awaiter2(this, void 0, void 0, function() {
            var global2;
            return __generator2(this, function(_a) {
              if (!this.config || !this.config.apiKey) {
                this.logger.debug("Client not initialized");
                return [
                  2
                  /*return*/
                ];
              }
              if (!this.__lastNoticeId) {
                this.logger.debug("Can't show user feedback form without a notice already reported");
                return [
                  2
                  /*return*/
                ];
              }
              global2 = globalThisOrWindow2();
              if (typeof global2.document === "undefined") {
                this.logger.debug("global.document is undefined. Cannot attach script");
                return [
                  2
                  /*return*/
                ];
              }
              if (this.isUserFeedbackScriptUrlAlreadyVisible()) {
                this.logger.debug("User feedback form is already visible");
                return [
                  2
                  /*return*/
                ];
              }
              global2["honeybadgerUserFeedbackOptions"] = __assign2(__assign2({}, options), { apiKey: this.config.apiKey, endpoint: this.config.userFeedbackEndpoint, noticeId: this.__lastNoticeId });
              this.appendUserFeedbackScriptTag(global2, options);
              return [
                2
                /*return*/
              ];
            });
          });
        };
        Honeybadger2.prototype.appendUserFeedbackScriptTag = function(window2, options) {
          if (options === void 0) {
            options = {};
          }
          var script = window2.document.createElement("script");
          script.setAttribute("src", this.getUserFeedbackSubmitUrl());
          script.setAttribute("async", "true");
          if (options.onLoad) {
            script.onload = options.onLoad;
          }
          (commonjsGlobal.document.head || commonjsGlobal.document.body).appendChild(script);
        };
        Honeybadger2.prototype.isUserFeedbackScriptUrlAlreadyVisible = function() {
          var global2 = globalThisOrWindow2();
          var feedbackScriptUrl = this.getUserFeedbackSubmitUrl();
          for (var i = 0; i < global2.document.scripts.length; i++) {
            var script = global2.document.scripts[i];
            if (script.src === feedbackScriptUrl) {
              return true;
            }
          }
          return false;
        };
        Honeybadger2.prototype.getUserFeedbackSubmitUrl = function() {
          return (0, exports2.getUserFeedbackScriptUrl)(this.getVersion());
        };
        Honeybadger2.prototype.__buildPayload = function(notice) {
          var cgiData = {
            HTTP_USER_AGENT: void 0,
            HTTP_REFERER: void 0,
            HTTP_COOKIE: void 0
          };
          if (typeof navigator !== "undefined" && navigator.userAgent) {
            cgiData.HTTP_USER_AGENT = navigator.userAgent;
          }
          if (typeof document !== "undefined" && document.referrer.match(/\S/)) {
            cgiData.HTTP_REFERER = document.referrer;
          }
          var cookiesObject;
          if (typeof notice.cookies === "string") {
            cookiesObject = (0, util_12.decodeCookie)(notice.cookies);
          } else {
            cookiesObject = notice.cookies;
          }
          if (cookiesObject) {
            cgiData.HTTP_COOKIE = (0, util_12.encodeCookie)(filter(cookiesObject, this.config.filters));
          }
          var payload = _super.prototype.__buildPayload.call(this, notice);
          payload.request.cgi_data = merge(cgiData, payload.request.cgi_data);
          return payload;
        };
        Honeybadger2.prototype.__wrap = function(f, opts) {
          if (opts === void 0) {
            opts = {};
          }
          var func = f;
          if (!opts) {
            opts = {};
          }
          try {
            if (typeof func !== "function") {
              return func;
            }
            if (!objectIsExtensible(func)) {
              return func;
            }
            if (!func.___hb) {
              var client_1 = this;
              func.___hb = function() {
                if (util_12.preferCatch) {
                  try {
                    return func.apply(this, arguments);
                  } catch (err) {
                    if (client_1.__lastWrapErr === err) {
                      throw err;
                    }
                    client_1.__lastWrapErr = err;
                    (0, onerror_1.ignoreNextOnError)();
                    client_1.addBreadcrumb(opts.component ? "".concat(opts.component, ": ").concat(err.name) : err.name, {
                      category: "error",
                      metadata: {
                        message: err.message,
                        name: err.name,
                        stack: err.stack
                      }
                    });
                    if (client_1.config.enableUncaught) {
                      client_1.notify(err);
                    }
                    throw err;
                  }
                } else {
                  return func.apply(this, arguments);
                }
              };
            }
            func.___hb.___hb = func.___hb;
            return func.___hb;
          } catch (_e) {
            return func;
          }
        };
        Honeybadger2.prototype.__incrementErrorsCount = function() {
          return this.__errorsSent++;
        };
        Honeybadger2.prototype.__exceedsMaxErrors = function() {
          return this.config.maxErrors && this.__errorsSent >= this.config.maxErrors;
        };
        return Honeybadger2;
      }(core_12.Client)
    );
    var NOTIFIER = {
      name: "@honeybadger-io/js",
      url: "https://github.com/honeybadger-io/honeybadger-js/tree/master/packages/js",
      version: "6.9.3"
    };
    var userAgent = function() {
      if (typeof navigator !== "undefined") {
        return "Honeybadger JS Browser Client ".concat(NOTIFIER.version, "; ").concat(navigator.userAgent);
      }
      return "Honeybadger JS Browser Client ".concat(NOTIFIER.version, "; n/a; n/a");
    };
    var singleton = new Honeybadger({
      __plugins: [
        (0, onerror_1.onError)(),
        (0, onunhandledrejection_1.default)(),
        (0, timers_1.default)(),
        (0, event_listeners_1.default)(),
        (0, breadcrumbs_1.default)(),
        core_12.Plugins.events()
      ]
    });
    singleton.setNotifier(NOTIFIER);
    var core_2 = src;
    Object.defineProperty(exports2, "Types", { enumerable: true, get: function() {
      return core_2.Types;
    } });
    exports2.default = singleton;
  })(browser$1);
  var browser = /* @__PURE__ */ getDefaultExportFromCjs(browser$1);
  return browser;
});


/***/ }),

/***/ "./node_modules/@hotwired/stimulus/dist/stimulus.js":
/*!**********************************************************!*\
  !*** ./node_modules/@hotwired/stimulus/dist/stimulus.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Application: () => (/* binding */ Application),
/* harmony export */   AttributeObserver: () => (/* binding */ AttributeObserver),
/* harmony export */   Context: () => (/* binding */ Context),
/* harmony export */   Controller: () => (/* binding */ Controller),
/* harmony export */   ElementObserver: () => (/* binding */ ElementObserver),
/* harmony export */   IndexedMultimap: () => (/* binding */ IndexedMultimap),
/* harmony export */   Multimap: () => (/* binding */ Multimap),
/* harmony export */   SelectorObserver: () => (/* binding */ SelectorObserver),
/* harmony export */   StringMapObserver: () => (/* binding */ StringMapObserver),
/* harmony export */   TokenListObserver: () => (/* binding */ TokenListObserver),
/* harmony export */   ValueListObserver: () => (/* binding */ ValueListObserver),
/* harmony export */   add: () => (/* binding */ add),
/* harmony export */   defaultSchema: () => (/* binding */ defaultSchema),
/* harmony export */   del: () => (/* binding */ del),
/* harmony export */   fetch: () => (/* binding */ fetch),
/* harmony export */   prune: () => (/* binding */ prune)
/* harmony export */ });
class EventListener {
  constructor(eventTarget, eventName, eventOptions) {
    this.eventTarget = eventTarget;
    this.eventName = eventName;
    this.eventOptions = eventOptions;
    this.unorderedBindings = /* @__PURE__ */ new Set();
  }
  connect() {
    this.eventTarget.addEventListener(this.eventName, this, this.eventOptions);
  }
  disconnect() {
    this.eventTarget.removeEventListener(this.eventName, this, this.eventOptions);
  }
  bindingConnected(binding) {
    this.unorderedBindings.add(binding);
  }
  bindingDisconnected(binding) {
    this.unorderedBindings.delete(binding);
  }
  handleEvent(event) {
    const extendedEvent = extendEvent(event);
    for (const binding of this.bindings) {
      if (extendedEvent.immediatePropagationStopped) {
        break;
      } else {
        binding.handleEvent(extendedEvent);
      }
    }
  }
  hasBindings() {
    return this.unorderedBindings.size > 0;
  }
  get bindings() {
    return Array.from(this.unorderedBindings).sort((left, right) => {
      const leftIndex = left.index, rightIndex = right.index;
      return leftIndex < rightIndex ? -1 : leftIndex > rightIndex ? 1 : 0;
    });
  }
}
function extendEvent(event) {
  if ("immediatePropagationStopped" in event) {
    return event;
  } else {
    const { stopImmediatePropagation } = event;
    return Object.assign(event, {
      immediatePropagationStopped: false,
      stopImmediatePropagation() {
        this.immediatePropagationStopped = true;
        stopImmediatePropagation.call(this);
      }
    });
  }
}
class Dispatcher {
  constructor(application) {
    this.application = application;
    this.eventListenerMaps = /* @__PURE__ */ new Map();
    this.started = false;
  }
  start() {
    if (!this.started) {
      this.started = true;
      this.eventListeners.forEach((eventListener) => eventListener.connect());
    }
  }
  stop() {
    if (this.started) {
      this.started = false;
      this.eventListeners.forEach((eventListener) => eventListener.disconnect());
    }
  }
  get eventListeners() {
    return Array.from(this.eventListenerMaps.values()).reduce((listeners, map) => listeners.concat(Array.from(map.values())), []);
  }
  bindingConnected(binding) {
    this.fetchEventListenerForBinding(binding).bindingConnected(binding);
  }
  bindingDisconnected(binding, clearEventListeners = false) {
    this.fetchEventListenerForBinding(binding).bindingDisconnected(binding);
    if (clearEventListeners)
      this.clearEventListenersForBinding(binding);
  }
  handleError(error2, message, detail = {}) {
    this.application.handleError(error2, `Error ${message}`, detail);
  }
  clearEventListenersForBinding(binding) {
    const eventListener = this.fetchEventListenerForBinding(binding);
    if (!eventListener.hasBindings()) {
      eventListener.disconnect();
      this.removeMappedEventListenerFor(binding);
    }
  }
  removeMappedEventListenerFor(binding) {
    const { eventTarget, eventName, eventOptions } = binding;
    const eventListenerMap = this.fetchEventListenerMapForEventTarget(eventTarget);
    const cacheKey = this.cacheKey(eventName, eventOptions);
    eventListenerMap.delete(cacheKey);
    if (eventListenerMap.size == 0)
      this.eventListenerMaps.delete(eventTarget);
  }
  fetchEventListenerForBinding(binding) {
    const { eventTarget, eventName, eventOptions } = binding;
    return this.fetchEventListener(eventTarget, eventName, eventOptions);
  }
  fetchEventListener(eventTarget, eventName, eventOptions) {
    const eventListenerMap = this.fetchEventListenerMapForEventTarget(eventTarget);
    const cacheKey = this.cacheKey(eventName, eventOptions);
    let eventListener = eventListenerMap.get(cacheKey);
    if (!eventListener) {
      eventListener = this.createEventListener(eventTarget, eventName, eventOptions);
      eventListenerMap.set(cacheKey, eventListener);
    }
    return eventListener;
  }
  createEventListener(eventTarget, eventName, eventOptions) {
    const eventListener = new EventListener(eventTarget, eventName, eventOptions);
    if (this.started) {
      eventListener.connect();
    }
    return eventListener;
  }
  fetchEventListenerMapForEventTarget(eventTarget) {
    let eventListenerMap = this.eventListenerMaps.get(eventTarget);
    if (!eventListenerMap) {
      eventListenerMap = /* @__PURE__ */ new Map();
      this.eventListenerMaps.set(eventTarget, eventListenerMap);
    }
    return eventListenerMap;
  }
  cacheKey(eventName, eventOptions) {
    const parts = [eventName];
    Object.keys(eventOptions).sort().forEach((key) => {
      parts.push(`${eventOptions[key] ? "" : "!"}${key}`);
    });
    return parts.join(":");
  }
}
const defaultActionDescriptorFilters = {
  stop({ event, value }) {
    if (value)
      event.stopPropagation();
    return true;
  },
  prevent({ event, value }) {
    if (value)
      event.preventDefault();
    return true;
  },
  self({ event, value, element }) {
    if (value) {
      return element === event.target;
    } else {
      return true;
    }
  }
};
const descriptorPattern = /^(?:(?:([^.]+?)\+)?(.+?)(?:\.(.+?))?(?:@(window|document))?->)?(.+?)(?:#([^:]+?))(?::(.+))?$/;
function parseActionDescriptorString(descriptorString) {
  const source = descriptorString.trim();
  const matches = source.match(descriptorPattern) || [];
  let eventName = matches[2];
  let keyFilter = matches[3];
  if (keyFilter && !["keydown", "keyup", "keypress"].includes(eventName)) {
    eventName += `.${keyFilter}`;
    keyFilter = "";
  }
  return {
    eventTarget: parseEventTarget(matches[4]),
    eventName,
    eventOptions: matches[7] ? parseEventOptions(matches[7]) : {},
    identifier: matches[5],
    methodName: matches[6],
    keyFilter: matches[1] || keyFilter
  };
}
function parseEventTarget(eventTargetName) {
  if (eventTargetName == "window") {
    return window;
  } else if (eventTargetName == "document") {
    return document;
  }
}
function parseEventOptions(eventOptions) {
  return eventOptions.split(":").reduce((options, token) => Object.assign(options, { [token.replace(/^!/, "")]: !/^!/.test(token) }), {});
}
function stringifyEventTarget(eventTarget) {
  if (eventTarget == window) {
    return "window";
  } else if (eventTarget == document) {
    return "document";
  }
}
function camelize(value) {
  return value.replace(/(?:[_-])([a-z0-9])/g, (_, char) => char.toUpperCase());
}
function namespaceCamelize(value) {
  return camelize(value.replace(/--/g, "-").replace(/__/g, "_"));
}
function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
function dasherize(value) {
  return value.replace(/([A-Z])/g, (_, char) => `-${char.toLowerCase()}`);
}
function tokenize(value) {
  return value.match(/[^\s]+/g) || [];
}
function isSomething(object) {
  return object !== null && object !== void 0;
}
function hasProperty(object, property) {
  return Object.prototype.hasOwnProperty.call(object, property);
}
const allModifiers = ["meta", "ctrl", "alt", "shift"];
class Action {
  constructor(element, index, descriptor, schema) {
    this.element = element;
    this.index = index;
    this.eventTarget = descriptor.eventTarget || element;
    this.eventName = descriptor.eventName || getDefaultEventNameForElement(element) || error("missing event name");
    this.eventOptions = descriptor.eventOptions || {};
    this.identifier = descriptor.identifier || error("missing identifier");
    this.methodName = descriptor.methodName || error("missing method name");
    this.keyFilter = descriptor.keyFilter || "";
    this.schema = schema;
  }
  static forToken(token, schema) {
    return new this(token.element, token.index, parseActionDescriptorString(token.content), schema);
  }
  toString() {
    const eventFilter = this.keyFilter ? `.${this.keyFilter}` : "";
    const eventTarget = this.eventTargetName ? `@${this.eventTargetName}` : "";
    return `${this.eventName}${eventFilter}${eventTarget}->${this.identifier}#${this.methodName}`;
  }
  shouldIgnoreKeyboardEvent(event) {
    if (!this.keyFilter) {
      return false;
    }
    const filters = this.keyFilter.split("+");
    if (this.keyFilterDissatisfied(event, filters)) {
      return true;
    }
    const standardFilter = filters.filter((key) => !allModifiers.includes(key))[0];
    if (!standardFilter) {
      return false;
    }
    if (!hasProperty(this.keyMappings, standardFilter)) {
      error(`contains unknown key filter: ${this.keyFilter}`);
    }
    return this.keyMappings[standardFilter].toLowerCase() !== event.key.toLowerCase();
  }
  shouldIgnoreMouseEvent(event) {
    if (!this.keyFilter) {
      return false;
    }
    const filters = [this.keyFilter];
    if (this.keyFilterDissatisfied(event, filters)) {
      return true;
    }
    return false;
  }
  get params() {
    const params = {};
    const pattern = new RegExp(`^data-${this.identifier}-(.+)-param$`, "i");
    for (const { name, value } of Array.from(this.element.attributes)) {
      const match = name.match(pattern);
      const key = match && match[1];
      if (key) {
        params[camelize(key)] = typecast(value);
      }
    }
    return params;
  }
  get eventTargetName() {
    return stringifyEventTarget(this.eventTarget);
  }
  get keyMappings() {
    return this.schema.keyMappings;
  }
  keyFilterDissatisfied(event, filters) {
    const [meta, ctrl, alt, shift] = allModifiers.map((modifier) => filters.includes(modifier));
    return event.metaKey !== meta || event.ctrlKey !== ctrl || event.altKey !== alt || event.shiftKey !== shift;
  }
}
const defaultEventNames = {
  a: () => "click",
  button: () => "click",
  form: () => "submit",
  details: () => "toggle",
  input: (e) => e.getAttribute("type") == "submit" ? "click" : "input",
  select: () => "change",
  textarea: () => "input"
};
function getDefaultEventNameForElement(element) {
  const tagName = element.tagName.toLowerCase();
  if (tagName in defaultEventNames) {
    return defaultEventNames[tagName](element);
  }
}
function error(message) {
  throw new Error(message);
}
function typecast(value) {
  try {
    return JSON.parse(value);
  } catch (o_O) {
    return value;
  }
}
class Binding {
  constructor(context, action) {
    this.context = context;
    this.action = action;
  }
  get index() {
    return this.action.index;
  }
  get eventTarget() {
    return this.action.eventTarget;
  }
  get eventOptions() {
    return this.action.eventOptions;
  }
  get identifier() {
    return this.context.identifier;
  }
  handleEvent(event) {
    const actionEvent = this.prepareActionEvent(event);
    if (this.willBeInvokedByEvent(event) && this.applyEventModifiers(actionEvent)) {
      this.invokeWithEvent(actionEvent);
    }
  }
  get eventName() {
    return this.action.eventName;
  }
  get method() {
    const method = this.controller[this.methodName];
    if (typeof method == "function") {
      return method;
    }
    throw new Error(`Action "${this.action}" references undefined method "${this.methodName}"`);
  }
  applyEventModifiers(event) {
    const { element } = this.action;
    const { actionDescriptorFilters } = this.context.application;
    const { controller } = this.context;
    let passes = true;
    for (const [name, value] of Object.entries(this.eventOptions)) {
      if (name in actionDescriptorFilters) {
        const filter = actionDescriptorFilters[name];
        passes = passes && filter({ name, value, event, element, controller });
      } else {
        continue;
      }
    }
    return passes;
  }
  prepareActionEvent(event) {
    return Object.assign(event, { params: this.action.params });
  }
  invokeWithEvent(event) {
    const { target, currentTarget } = event;
    try {
      this.method.call(this.controller, event);
      this.context.logDebugActivity(this.methodName, { event, target, currentTarget, action: this.methodName });
    } catch (error2) {
      const { identifier, controller, element, index } = this;
      const detail = { identifier, controller, element, index, event };
      this.context.handleError(error2, `invoking action "${this.action}"`, detail);
    }
  }
  willBeInvokedByEvent(event) {
    const eventTarget = event.target;
    if (event instanceof KeyboardEvent && this.action.shouldIgnoreKeyboardEvent(event)) {
      return false;
    }
    if (event instanceof MouseEvent && this.action.shouldIgnoreMouseEvent(event)) {
      return false;
    }
    if (this.element === eventTarget) {
      return true;
    } else if (eventTarget instanceof Element && this.element.contains(eventTarget)) {
      return this.scope.containsElement(eventTarget);
    } else {
      return this.scope.containsElement(this.action.element);
    }
  }
  get controller() {
    return this.context.controller;
  }
  get methodName() {
    return this.action.methodName;
  }
  get element() {
    return this.scope.element;
  }
  get scope() {
    return this.context.scope;
  }
}
class ElementObserver {
  constructor(element, delegate) {
    this.mutationObserverInit = { attributes: true, childList: true, subtree: true };
    this.element = element;
    this.started = false;
    this.delegate = delegate;
    this.elements = /* @__PURE__ */ new Set();
    this.mutationObserver = new MutationObserver((mutations) => this.processMutations(mutations));
  }
  start() {
    if (!this.started) {
      this.started = true;
      this.mutationObserver.observe(this.element, this.mutationObserverInit);
      this.refresh();
    }
  }
  pause(callback) {
    if (this.started) {
      this.mutationObserver.disconnect();
      this.started = false;
    }
    callback();
    if (!this.started) {
      this.mutationObserver.observe(this.element, this.mutationObserverInit);
      this.started = true;
    }
  }
  stop() {
    if (this.started) {
      this.mutationObserver.takeRecords();
      this.mutationObserver.disconnect();
      this.started = false;
    }
  }
  refresh() {
    if (this.started) {
      const matches = new Set(this.matchElementsInTree());
      for (const element of Array.from(this.elements)) {
        if (!matches.has(element)) {
          this.removeElement(element);
        }
      }
      for (const element of Array.from(matches)) {
        this.addElement(element);
      }
    }
  }
  processMutations(mutations) {
    if (this.started) {
      for (const mutation of mutations) {
        this.processMutation(mutation);
      }
    }
  }
  processMutation(mutation) {
    if (mutation.type == "attributes") {
      this.processAttributeChange(mutation.target, mutation.attributeName);
    } else if (mutation.type == "childList") {
      this.processRemovedNodes(mutation.removedNodes);
      this.processAddedNodes(mutation.addedNodes);
    }
  }
  processAttributeChange(element, attributeName) {
    if (this.elements.has(element)) {
      if (this.delegate.elementAttributeChanged && this.matchElement(element)) {
        this.delegate.elementAttributeChanged(element, attributeName);
      } else {
        this.removeElement(element);
      }
    } else if (this.matchElement(element)) {
      this.addElement(element);
    }
  }
  processRemovedNodes(nodes) {
    for (const node of Array.from(nodes)) {
      const element = this.elementFromNode(node);
      if (element) {
        this.processTree(element, this.removeElement);
      }
    }
  }
  processAddedNodes(nodes) {
    for (const node of Array.from(nodes)) {
      const element = this.elementFromNode(node);
      if (element && this.elementIsActive(element)) {
        this.processTree(element, this.addElement);
      }
    }
  }
  matchElement(element) {
    return this.delegate.matchElement(element);
  }
  matchElementsInTree(tree = this.element) {
    return this.delegate.matchElementsInTree(tree);
  }
  processTree(tree, processor) {
    for (const element of this.matchElementsInTree(tree)) {
      processor.call(this, element);
    }
  }
  elementFromNode(node) {
    if (node.nodeType == Node.ELEMENT_NODE) {
      return node;
    }
  }
  elementIsActive(element) {
    if (element.isConnected != this.element.isConnected) {
      return false;
    } else {
      return this.element.contains(element);
    }
  }
  addElement(element) {
    if (!this.elements.has(element)) {
      if (this.elementIsActive(element)) {
        this.elements.add(element);
        if (this.delegate.elementMatched) {
          this.delegate.elementMatched(element);
        }
      }
    }
  }
  removeElement(element) {
    if (this.elements.has(element)) {
      this.elements.delete(element);
      if (this.delegate.elementUnmatched) {
        this.delegate.elementUnmatched(element);
      }
    }
  }
}
class AttributeObserver {
  constructor(element, attributeName, delegate) {
    this.attributeName = attributeName;
    this.delegate = delegate;
    this.elementObserver = new ElementObserver(element, this);
  }
  get element() {
    return this.elementObserver.element;
  }
  get selector() {
    return `[${this.attributeName}]`;
  }
  start() {
    this.elementObserver.start();
  }
  pause(callback) {
    this.elementObserver.pause(callback);
  }
  stop() {
    this.elementObserver.stop();
  }
  refresh() {
    this.elementObserver.refresh();
  }
  get started() {
    return this.elementObserver.started;
  }
  matchElement(element) {
    return element.hasAttribute(this.attributeName);
  }
  matchElementsInTree(tree) {
    const match = this.matchElement(tree) ? [tree] : [];
    const matches = Array.from(tree.querySelectorAll(this.selector));
    return match.concat(matches);
  }
  elementMatched(element) {
    if (this.delegate.elementMatchedAttribute) {
      this.delegate.elementMatchedAttribute(element, this.attributeName);
    }
  }
  elementUnmatched(element) {
    if (this.delegate.elementUnmatchedAttribute) {
      this.delegate.elementUnmatchedAttribute(element, this.attributeName);
    }
  }
  elementAttributeChanged(element, attributeName) {
    if (this.delegate.elementAttributeValueChanged && this.attributeName == attributeName) {
      this.delegate.elementAttributeValueChanged(element, attributeName);
    }
  }
}
function add(map, key, value) {
  fetch(map, key).add(value);
}
function del(map, key, value) {
  fetch(map, key).delete(value);
  prune(map, key);
}
function fetch(map, key) {
  let values = map.get(key);
  if (!values) {
    values = /* @__PURE__ */ new Set();
    map.set(key, values);
  }
  return values;
}
function prune(map, key) {
  const values = map.get(key);
  if (values != null && values.size == 0) {
    map.delete(key);
  }
}
class Multimap {
  constructor() {
    this.valuesByKey = /* @__PURE__ */ new Map();
  }
  get keys() {
    return Array.from(this.valuesByKey.keys());
  }
  get values() {
    const sets = Array.from(this.valuesByKey.values());
    return sets.reduce((values, set) => values.concat(Array.from(set)), []);
  }
  get size() {
    const sets = Array.from(this.valuesByKey.values());
    return sets.reduce((size, set) => size + set.size, 0);
  }
  add(key, value) {
    add(this.valuesByKey, key, value);
  }
  delete(key, value) {
    del(this.valuesByKey, key, value);
  }
  has(key, value) {
    const values = this.valuesByKey.get(key);
    return values != null && values.has(value);
  }
  hasKey(key) {
    return this.valuesByKey.has(key);
  }
  hasValue(value) {
    const sets = Array.from(this.valuesByKey.values());
    return sets.some((set) => set.has(value));
  }
  getValuesForKey(key) {
    const values = this.valuesByKey.get(key);
    return values ? Array.from(values) : [];
  }
  getKeysForValue(value) {
    return Array.from(this.valuesByKey).filter(([_key, values]) => values.has(value)).map(([key, _values]) => key);
  }
}
class IndexedMultimap extends Multimap {
  constructor() {
    super();
    this.keysByValue = /* @__PURE__ */ new Map();
  }
  get values() {
    return Array.from(this.keysByValue.keys());
  }
  add(key, value) {
    super.add(key, value);
    add(this.keysByValue, value, key);
  }
  delete(key, value) {
    super.delete(key, value);
    del(this.keysByValue, value, key);
  }
  hasValue(value) {
    return this.keysByValue.has(value);
  }
  getKeysForValue(value) {
    const set = this.keysByValue.get(value);
    return set ? Array.from(set) : [];
  }
}
class SelectorObserver {
  constructor(element, selector, delegate, details) {
    this._selector = selector;
    this.details = details;
    this.elementObserver = new ElementObserver(element, this);
    this.delegate = delegate;
    this.matchesByElement = new Multimap();
  }
  get started() {
    return this.elementObserver.started;
  }
  get selector() {
    return this._selector;
  }
  set selector(selector) {
    this._selector = selector;
    this.refresh();
  }
  start() {
    this.elementObserver.start();
  }
  pause(callback) {
    this.elementObserver.pause(callback);
  }
  stop() {
    this.elementObserver.stop();
  }
  refresh() {
    this.elementObserver.refresh();
  }
  get element() {
    return this.elementObserver.element;
  }
  matchElement(element) {
    const { selector } = this;
    if (selector) {
      const matches = element.matches(selector);
      if (this.delegate.selectorMatchElement) {
        return matches && this.delegate.selectorMatchElement(element, this.details);
      }
      return matches;
    } else {
      return false;
    }
  }
  matchElementsInTree(tree) {
    const { selector } = this;
    if (selector) {
      const match = this.matchElement(tree) ? [tree] : [];
      const matches = Array.from(tree.querySelectorAll(selector)).filter((match2) => this.matchElement(match2));
      return match.concat(matches);
    } else {
      return [];
    }
  }
  elementMatched(element) {
    const { selector } = this;
    if (selector) {
      this.selectorMatched(element, selector);
    }
  }
  elementUnmatched(element) {
    const selectors = this.matchesByElement.getKeysForValue(element);
    for (const selector of selectors) {
      this.selectorUnmatched(element, selector);
    }
  }
  elementAttributeChanged(element, _attributeName) {
    const { selector } = this;
    if (selector) {
      const matches = this.matchElement(element);
      const matchedBefore = this.matchesByElement.has(selector, element);
      if (matches && !matchedBefore) {
        this.selectorMatched(element, selector);
      } else if (!matches && matchedBefore) {
        this.selectorUnmatched(element, selector);
      }
    }
  }
  selectorMatched(element, selector) {
    this.delegate.selectorMatched(element, selector, this.details);
    this.matchesByElement.add(selector, element);
  }
  selectorUnmatched(element, selector) {
    this.delegate.selectorUnmatched(element, selector, this.details);
    this.matchesByElement.delete(selector, element);
  }
}
class StringMapObserver {
  constructor(element, delegate) {
    this.element = element;
    this.delegate = delegate;
    this.started = false;
    this.stringMap = /* @__PURE__ */ new Map();
    this.mutationObserver = new MutationObserver((mutations) => this.processMutations(mutations));
  }
  start() {
    if (!this.started) {
      this.started = true;
      this.mutationObserver.observe(this.element, { attributes: true, attributeOldValue: true });
      this.refresh();
    }
  }
  stop() {
    if (this.started) {
      this.mutationObserver.takeRecords();
      this.mutationObserver.disconnect();
      this.started = false;
    }
  }
  refresh() {
    if (this.started) {
      for (const attributeName of this.knownAttributeNames) {
        this.refreshAttribute(attributeName, null);
      }
    }
  }
  processMutations(mutations) {
    if (this.started) {
      for (const mutation of mutations) {
        this.processMutation(mutation);
      }
    }
  }
  processMutation(mutation) {
    const attributeName = mutation.attributeName;
    if (attributeName) {
      this.refreshAttribute(attributeName, mutation.oldValue);
    }
  }
  refreshAttribute(attributeName, oldValue) {
    const key = this.delegate.getStringMapKeyForAttribute(attributeName);
    if (key != null) {
      if (!this.stringMap.has(attributeName)) {
        this.stringMapKeyAdded(key, attributeName);
      }
      const value = this.element.getAttribute(attributeName);
      if (this.stringMap.get(attributeName) != value) {
        this.stringMapValueChanged(value, key, oldValue);
      }
      if (value == null) {
        const oldValue2 = this.stringMap.get(attributeName);
        this.stringMap.delete(attributeName);
        if (oldValue2)
          this.stringMapKeyRemoved(key, attributeName, oldValue2);
      } else {
        this.stringMap.set(attributeName, value);
      }
    }
  }
  stringMapKeyAdded(key, attributeName) {
    if (this.delegate.stringMapKeyAdded) {
      this.delegate.stringMapKeyAdded(key, attributeName);
    }
  }
  stringMapValueChanged(value, key, oldValue) {
    if (this.delegate.stringMapValueChanged) {
      this.delegate.stringMapValueChanged(value, key, oldValue);
    }
  }
  stringMapKeyRemoved(key, attributeName, oldValue) {
    if (this.delegate.stringMapKeyRemoved) {
      this.delegate.stringMapKeyRemoved(key, attributeName, oldValue);
    }
  }
  get knownAttributeNames() {
    return Array.from(new Set(this.currentAttributeNames.concat(this.recordedAttributeNames)));
  }
  get currentAttributeNames() {
    return Array.from(this.element.attributes).map((attribute) => attribute.name);
  }
  get recordedAttributeNames() {
    return Array.from(this.stringMap.keys());
  }
}
class TokenListObserver {
  constructor(element, attributeName, delegate) {
    this.attributeObserver = new AttributeObserver(element, attributeName, this);
    this.delegate = delegate;
    this.tokensByElement = new Multimap();
  }
  get started() {
    return this.attributeObserver.started;
  }
  start() {
    this.attributeObserver.start();
  }
  pause(callback) {
    this.attributeObserver.pause(callback);
  }
  stop() {
    this.attributeObserver.stop();
  }
  refresh() {
    this.attributeObserver.refresh();
  }
  get element() {
    return this.attributeObserver.element;
  }
  get attributeName() {
    return this.attributeObserver.attributeName;
  }
  elementMatchedAttribute(element) {
    this.tokensMatched(this.readTokensForElement(element));
  }
  elementAttributeValueChanged(element) {
    const [unmatchedTokens, matchedTokens] = this.refreshTokensForElement(element);
    this.tokensUnmatched(unmatchedTokens);
    this.tokensMatched(matchedTokens);
  }
  elementUnmatchedAttribute(element) {
    this.tokensUnmatched(this.tokensByElement.getValuesForKey(element));
  }
  tokensMatched(tokens) {
    tokens.forEach((token) => this.tokenMatched(token));
  }
  tokensUnmatched(tokens) {
    tokens.forEach((token) => this.tokenUnmatched(token));
  }
  tokenMatched(token) {
    this.delegate.tokenMatched(token);
    this.tokensByElement.add(token.element, token);
  }
  tokenUnmatched(token) {
    this.delegate.tokenUnmatched(token);
    this.tokensByElement.delete(token.element, token);
  }
  refreshTokensForElement(element) {
    const previousTokens = this.tokensByElement.getValuesForKey(element);
    const currentTokens = this.readTokensForElement(element);
    const firstDifferingIndex = zip(previousTokens, currentTokens).findIndex(([previousToken, currentToken]) => !tokensAreEqual(previousToken, currentToken));
    if (firstDifferingIndex == -1) {
      return [[], []];
    } else {
      return [previousTokens.slice(firstDifferingIndex), currentTokens.slice(firstDifferingIndex)];
    }
  }
  readTokensForElement(element) {
    const attributeName = this.attributeName;
    const tokenString = element.getAttribute(attributeName) || "";
    return parseTokenString(tokenString, element, attributeName);
  }
}
function parseTokenString(tokenString, element, attributeName) {
  return tokenString.trim().split(/\s+/).filter((content) => content.length).map((content, index) => ({ element, attributeName, content, index }));
}
function zip(left, right) {
  const length = Math.max(left.length, right.length);
  return Array.from({ length }, (_, index) => [left[index], right[index]]);
}
function tokensAreEqual(left, right) {
  return left && right && left.index == right.index && left.content == right.content;
}
class ValueListObserver {
  constructor(element, attributeName, delegate) {
    this.tokenListObserver = new TokenListObserver(element, attributeName, this);
    this.delegate = delegate;
    this.parseResultsByToken = /* @__PURE__ */ new WeakMap();
    this.valuesByTokenByElement = /* @__PURE__ */ new WeakMap();
  }
  get started() {
    return this.tokenListObserver.started;
  }
  start() {
    this.tokenListObserver.start();
  }
  stop() {
    this.tokenListObserver.stop();
  }
  refresh() {
    this.tokenListObserver.refresh();
  }
  get element() {
    return this.tokenListObserver.element;
  }
  get attributeName() {
    return this.tokenListObserver.attributeName;
  }
  tokenMatched(token) {
    const { element } = token;
    const { value } = this.fetchParseResultForToken(token);
    if (value) {
      this.fetchValuesByTokenForElement(element).set(token, value);
      this.delegate.elementMatchedValue(element, value);
    }
  }
  tokenUnmatched(token) {
    const { element } = token;
    const { value } = this.fetchParseResultForToken(token);
    if (value) {
      this.fetchValuesByTokenForElement(element).delete(token);
      this.delegate.elementUnmatchedValue(element, value);
    }
  }
  fetchParseResultForToken(token) {
    let parseResult = this.parseResultsByToken.get(token);
    if (!parseResult) {
      parseResult = this.parseToken(token);
      this.parseResultsByToken.set(token, parseResult);
    }
    return parseResult;
  }
  fetchValuesByTokenForElement(element) {
    let valuesByToken = this.valuesByTokenByElement.get(element);
    if (!valuesByToken) {
      valuesByToken = /* @__PURE__ */ new Map();
      this.valuesByTokenByElement.set(element, valuesByToken);
    }
    return valuesByToken;
  }
  parseToken(token) {
    try {
      const value = this.delegate.parseValueForToken(token);
      return { value };
    } catch (error2) {
      return { error: error2 };
    }
  }
}
class BindingObserver {
  constructor(context, delegate) {
    this.context = context;
    this.delegate = delegate;
    this.bindingsByAction = /* @__PURE__ */ new Map();
  }
  start() {
    if (!this.valueListObserver) {
      this.valueListObserver = new ValueListObserver(this.element, this.actionAttribute, this);
      this.valueListObserver.start();
    }
  }
  stop() {
    if (this.valueListObserver) {
      this.valueListObserver.stop();
      delete this.valueListObserver;
      this.disconnectAllActions();
    }
  }
  get element() {
    return this.context.element;
  }
  get identifier() {
    return this.context.identifier;
  }
  get actionAttribute() {
    return this.schema.actionAttribute;
  }
  get schema() {
    return this.context.schema;
  }
  get bindings() {
    return Array.from(this.bindingsByAction.values());
  }
  connectAction(action) {
    const binding = new Binding(this.context, action);
    this.bindingsByAction.set(action, binding);
    this.delegate.bindingConnected(binding);
  }
  disconnectAction(action) {
    const binding = this.bindingsByAction.get(action);
    if (binding) {
      this.bindingsByAction.delete(action);
      this.delegate.bindingDisconnected(binding);
    }
  }
  disconnectAllActions() {
    this.bindings.forEach((binding) => this.delegate.bindingDisconnected(binding, true));
    this.bindingsByAction.clear();
  }
  parseValueForToken(token) {
    const action = Action.forToken(token, this.schema);
    if (action.identifier == this.identifier) {
      return action;
    }
  }
  elementMatchedValue(element, action) {
    this.connectAction(action);
  }
  elementUnmatchedValue(element, action) {
    this.disconnectAction(action);
  }
}
class ValueObserver {
  constructor(context, receiver) {
    this.context = context;
    this.receiver = receiver;
    this.stringMapObserver = new StringMapObserver(this.element, this);
    this.valueDescriptorMap = this.controller.valueDescriptorMap;
  }
  start() {
    this.stringMapObserver.start();
    this.invokeChangedCallbacksForDefaultValues();
  }
  stop() {
    this.stringMapObserver.stop();
  }
  get element() {
    return this.context.element;
  }
  get controller() {
    return this.context.controller;
  }
  getStringMapKeyForAttribute(attributeName) {
    if (attributeName in this.valueDescriptorMap) {
      return this.valueDescriptorMap[attributeName].name;
    }
  }
  stringMapKeyAdded(key, attributeName) {
    const descriptor = this.valueDescriptorMap[attributeName];
    if (!this.hasValue(key)) {
      this.invokeChangedCallback(key, descriptor.writer(this.receiver[key]), descriptor.writer(descriptor.defaultValue));
    }
  }
  stringMapValueChanged(value, name, oldValue) {
    const descriptor = this.valueDescriptorNameMap[name];
    if (value === null)
      return;
    if (oldValue === null) {
      oldValue = descriptor.writer(descriptor.defaultValue);
    }
    this.invokeChangedCallback(name, value, oldValue);
  }
  stringMapKeyRemoved(key, attributeName, oldValue) {
    const descriptor = this.valueDescriptorNameMap[key];
    if (this.hasValue(key)) {
      this.invokeChangedCallback(key, descriptor.writer(this.receiver[key]), oldValue);
    } else {
      this.invokeChangedCallback(key, descriptor.writer(descriptor.defaultValue), oldValue);
    }
  }
  invokeChangedCallbacksForDefaultValues() {
    for (const { key, name, defaultValue, writer } of this.valueDescriptors) {
      if (defaultValue != void 0 && !this.controller.data.has(key)) {
        this.invokeChangedCallback(name, writer(defaultValue), void 0);
      }
    }
  }
  invokeChangedCallback(name, rawValue, rawOldValue) {
    const changedMethodName = `${name}Changed`;
    const changedMethod = this.receiver[changedMethodName];
    if (typeof changedMethod == "function") {
      const descriptor = this.valueDescriptorNameMap[name];
      try {
        const value = descriptor.reader(rawValue);
        let oldValue = rawOldValue;
        if (rawOldValue) {
          oldValue = descriptor.reader(rawOldValue);
        }
        changedMethod.call(this.receiver, value, oldValue);
      } catch (error2) {
        if (error2 instanceof TypeError) {
          error2.message = `Stimulus Value "${this.context.identifier}.${descriptor.name}" - ${error2.message}`;
        }
        throw error2;
      }
    }
  }
  get valueDescriptors() {
    const { valueDescriptorMap } = this;
    return Object.keys(valueDescriptorMap).map((key) => valueDescriptorMap[key]);
  }
  get valueDescriptorNameMap() {
    const descriptors = {};
    Object.keys(this.valueDescriptorMap).forEach((key) => {
      const descriptor = this.valueDescriptorMap[key];
      descriptors[descriptor.name] = descriptor;
    });
    return descriptors;
  }
  hasValue(attributeName) {
    const descriptor = this.valueDescriptorNameMap[attributeName];
    const hasMethodName = `has${capitalize(descriptor.name)}`;
    return this.receiver[hasMethodName];
  }
}
class TargetObserver {
  constructor(context, delegate) {
    this.context = context;
    this.delegate = delegate;
    this.targetsByName = new Multimap();
  }
  start() {
    if (!this.tokenListObserver) {
      this.tokenListObserver = new TokenListObserver(this.element, this.attributeName, this);
      this.tokenListObserver.start();
    }
  }
  stop() {
    if (this.tokenListObserver) {
      this.disconnectAllTargets();
      this.tokenListObserver.stop();
      delete this.tokenListObserver;
    }
  }
  tokenMatched({ element, content: name }) {
    if (this.scope.containsElement(element)) {
      this.connectTarget(element, name);
    }
  }
  tokenUnmatched({ element, content: name }) {
    this.disconnectTarget(element, name);
  }
  connectTarget(element, name) {
    var _a;
    if (!this.targetsByName.has(name, element)) {
      this.targetsByName.add(name, element);
      (_a = this.tokenListObserver) === null || _a === void 0 ? void 0 : _a.pause(() => this.delegate.targetConnected(element, name));
    }
  }
  disconnectTarget(element, name) {
    var _a;
    if (this.targetsByName.has(name, element)) {
      this.targetsByName.delete(name, element);
      (_a = this.tokenListObserver) === null || _a === void 0 ? void 0 : _a.pause(() => this.delegate.targetDisconnected(element, name));
    }
  }
  disconnectAllTargets() {
    for (const name of this.targetsByName.keys) {
      for (const element of this.targetsByName.getValuesForKey(name)) {
        this.disconnectTarget(element, name);
      }
    }
  }
  get attributeName() {
    return `data-${this.context.identifier}-target`;
  }
  get element() {
    return this.context.element;
  }
  get scope() {
    return this.context.scope;
  }
}
function readInheritableStaticArrayValues(constructor, propertyName) {
  const ancestors = getAncestorsForConstructor(constructor);
  return Array.from(ancestors.reduce((values, constructor2) => {
    getOwnStaticArrayValues(constructor2, propertyName).forEach((name) => values.add(name));
    return values;
  }, /* @__PURE__ */ new Set()));
}
function readInheritableStaticObjectPairs(constructor, propertyName) {
  const ancestors = getAncestorsForConstructor(constructor);
  return ancestors.reduce((pairs, constructor2) => {
    pairs.push(...getOwnStaticObjectPairs(constructor2, propertyName));
    return pairs;
  }, []);
}
function getAncestorsForConstructor(constructor) {
  const ancestors = [];
  while (constructor) {
    ancestors.push(constructor);
    constructor = Object.getPrototypeOf(constructor);
  }
  return ancestors.reverse();
}
function getOwnStaticArrayValues(constructor, propertyName) {
  const definition = constructor[propertyName];
  return Array.isArray(definition) ? definition : [];
}
function getOwnStaticObjectPairs(constructor, propertyName) {
  const definition = constructor[propertyName];
  return definition ? Object.keys(definition).map((key) => [key, definition[key]]) : [];
}
class OutletObserver {
  constructor(context, delegate) {
    this.started = false;
    this.context = context;
    this.delegate = delegate;
    this.outletsByName = new Multimap();
    this.outletElementsByName = new Multimap();
    this.selectorObserverMap = /* @__PURE__ */ new Map();
    this.attributeObserverMap = /* @__PURE__ */ new Map();
  }
  start() {
    if (!this.started) {
      this.outletDefinitions.forEach((outletName) => {
        this.setupSelectorObserverForOutlet(outletName);
        this.setupAttributeObserverForOutlet(outletName);
      });
      this.started = true;
      this.dependentContexts.forEach((context) => context.refresh());
    }
  }
  refresh() {
    this.selectorObserverMap.forEach((observer) => observer.refresh());
    this.attributeObserverMap.forEach((observer) => observer.refresh());
  }
  stop() {
    if (this.started) {
      this.started = false;
      this.disconnectAllOutlets();
      this.stopSelectorObservers();
      this.stopAttributeObservers();
    }
  }
  stopSelectorObservers() {
    if (this.selectorObserverMap.size > 0) {
      this.selectorObserverMap.forEach((observer) => observer.stop());
      this.selectorObserverMap.clear();
    }
  }
  stopAttributeObservers() {
    if (this.attributeObserverMap.size > 0) {
      this.attributeObserverMap.forEach((observer) => observer.stop());
      this.attributeObserverMap.clear();
    }
  }
  selectorMatched(element, _selector, { outletName }) {
    const outlet = this.getOutlet(element, outletName);
    if (outlet) {
      this.connectOutlet(outlet, element, outletName);
    }
  }
  selectorUnmatched(element, _selector, { outletName }) {
    const outlet = this.getOutletFromMap(element, outletName);
    if (outlet) {
      this.disconnectOutlet(outlet, element, outletName);
    }
  }
  selectorMatchElement(element, { outletName }) {
    const selector = this.selector(outletName);
    const hasOutlet = this.hasOutlet(element, outletName);
    const hasOutletController = element.matches(`[${this.schema.controllerAttribute}~=${outletName}]`);
    if (selector) {
      return hasOutlet && hasOutletController && element.matches(selector);
    } else {
      return false;
    }
  }
  elementMatchedAttribute(_element, attributeName) {
    const outletName = this.getOutletNameFromOutletAttributeName(attributeName);
    if (outletName) {
      this.updateSelectorObserverForOutlet(outletName);
    }
  }
  elementAttributeValueChanged(_element, attributeName) {
    const outletName = this.getOutletNameFromOutletAttributeName(attributeName);
    if (outletName) {
      this.updateSelectorObserverForOutlet(outletName);
    }
  }
  elementUnmatchedAttribute(_element, attributeName) {
    const outletName = this.getOutletNameFromOutletAttributeName(attributeName);
    if (outletName) {
      this.updateSelectorObserverForOutlet(outletName);
    }
  }
  connectOutlet(outlet, element, outletName) {
    var _a;
    if (!this.outletElementsByName.has(outletName, element)) {
      this.outletsByName.add(outletName, outlet);
      this.outletElementsByName.add(outletName, element);
      (_a = this.selectorObserverMap.get(outletName)) === null || _a === void 0 ? void 0 : _a.pause(() => this.delegate.outletConnected(outlet, element, outletName));
    }
  }
  disconnectOutlet(outlet, element, outletName) {
    var _a;
    if (this.outletElementsByName.has(outletName, element)) {
      this.outletsByName.delete(outletName, outlet);
      this.outletElementsByName.delete(outletName, element);
      (_a = this.selectorObserverMap.get(outletName)) === null || _a === void 0 ? void 0 : _a.pause(() => this.delegate.outletDisconnected(outlet, element, outletName));
    }
  }
  disconnectAllOutlets() {
    for (const outletName of this.outletElementsByName.keys) {
      for (const element of this.outletElementsByName.getValuesForKey(outletName)) {
        for (const outlet of this.outletsByName.getValuesForKey(outletName)) {
          this.disconnectOutlet(outlet, element, outletName);
        }
      }
    }
  }
  updateSelectorObserverForOutlet(outletName) {
    const observer = this.selectorObserverMap.get(outletName);
    if (observer) {
      observer.selector = this.selector(outletName);
    }
  }
  setupSelectorObserverForOutlet(outletName) {
    const selector = this.selector(outletName);
    const selectorObserver = new SelectorObserver(document.body, selector, this, { outletName });
    this.selectorObserverMap.set(outletName, selectorObserver);
    selectorObserver.start();
  }
  setupAttributeObserverForOutlet(outletName) {
    const attributeName = this.attributeNameForOutletName(outletName);
    const attributeObserver = new AttributeObserver(this.scope.element, attributeName, this);
    this.attributeObserverMap.set(outletName, attributeObserver);
    attributeObserver.start();
  }
  selector(outletName) {
    return this.scope.outlets.getSelectorForOutletName(outletName);
  }
  attributeNameForOutletName(outletName) {
    return this.scope.schema.outletAttributeForScope(this.identifier, outletName);
  }
  getOutletNameFromOutletAttributeName(attributeName) {
    return this.outletDefinitions.find((outletName) => this.attributeNameForOutletName(outletName) === attributeName);
  }
  get outletDependencies() {
    const dependencies = new Multimap();
    this.router.modules.forEach((module) => {
      const constructor = module.definition.controllerConstructor;
      const outlets = readInheritableStaticArrayValues(constructor, "outlets");
      outlets.forEach((outlet) => dependencies.add(outlet, module.identifier));
    });
    return dependencies;
  }
  get outletDefinitions() {
    return this.outletDependencies.getKeysForValue(this.identifier);
  }
  get dependentControllerIdentifiers() {
    return this.outletDependencies.getValuesForKey(this.identifier);
  }
  get dependentContexts() {
    const identifiers = this.dependentControllerIdentifiers;
    return this.router.contexts.filter((context) => identifiers.includes(context.identifier));
  }
  hasOutlet(element, outletName) {
    return !!this.getOutlet(element, outletName) || !!this.getOutletFromMap(element, outletName);
  }
  getOutlet(element, outletName) {
    return this.application.getControllerForElementAndIdentifier(element, outletName);
  }
  getOutletFromMap(element, outletName) {
    return this.outletsByName.getValuesForKey(outletName).find((outlet) => outlet.element === element);
  }
  get scope() {
    return this.context.scope;
  }
  get schema() {
    return this.context.schema;
  }
  get identifier() {
    return this.context.identifier;
  }
  get application() {
    return this.context.application;
  }
  get router() {
    return this.application.router;
  }
}
class Context {
  constructor(module, scope) {
    this.logDebugActivity = (functionName, detail = {}) => {
      const { identifier, controller, element } = this;
      detail = Object.assign({ identifier, controller, element }, detail);
      this.application.logDebugActivity(this.identifier, functionName, detail);
    };
    this.module = module;
    this.scope = scope;
    this.controller = new module.controllerConstructor(this);
    this.bindingObserver = new BindingObserver(this, this.dispatcher);
    this.valueObserver = new ValueObserver(this, this.controller);
    this.targetObserver = new TargetObserver(this, this);
    this.outletObserver = new OutletObserver(this, this);
    try {
      this.controller.initialize();
      this.logDebugActivity("initialize");
    } catch (error2) {
      this.handleError(error2, "initializing controller");
    }
  }
  connect() {
    this.bindingObserver.start();
    this.valueObserver.start();
    this.targetObserver.start();
    this.outletObserver.start();
    try {
      this.controller.connect();
      this.logDebugActivity("connect");
    } catch (error2) {
      this.handleError(error2, "connecting controller");
    }
  }
  refresh() {
    this.outletObserver.refresh();
  }
  disconnect() {
    try {
      this.controller.disconnect();
      this.logDebugActivity("disconnect");
    } catch (error2) {
      this.handleError(error2, "disconnecting controller");
    }
    this.outletObserver.stop();
    this.targetObserver.stop();
    this.valueObserver.stop();
    this.bindingObserver.stop();
  }
  get application() {
    return this.module.application;
  }
  get identifier() {
    return this.module.identifier;
  }
  get schema() {
    return this.application.schema;
  }
  get dispatcher() {
    return this.application.dispatcher;
  }
  get element() {
    return this.scope.element;
  }
  get parentElement() {
    return this.element.parentElement;
  }
  handleError(error2, message, detail = {}) {
    const { identifier, controller, element } = this;
    detail = Object.assign({ identifier, controller, element }, detail);
    this.application.handleError(error2, `Error ${message}`, detail);
  }
  targetConnected(element, name) {
    this.invokeControllerMethod(`${name}TargetConnected`, element);
  }
  targetDisconnected(element, name) {
    this.invokeControllerMethod(`${name}TargetDisconnected`, element);
  }
  outletConnected(outlet, element, name) {
    this.invokeControllerMethod(`${namespaceCamelize(name)}OutletConnected`, outlet, element);
  }
  outletDisconnected(outlet, element, name) {
    this.invokeControllerMethod(`${namespaceCamelize(name)}OutletDisconnected`, outlet, element);
  }
  invokeControllerMethod(methodName, ...args) {
    const controller = this.controller;
    if (typeof controller[methodName] == "function") {
      controller[methodName](...args);
    }
  }
}
function bless(constructor) {
  return shadow(constructor, getBlessedProperties(constructor));
}
function shadow(constructor, properties) {
  const shadowConstructor = extend(constructor);
  const shadowProperties = getShadowProperties(constructor.prototype, properties);
  Object.defineProperties(shadowConstructor.prototype, shadowProperties);
  return shadowConstructor;
}
function getBlessedProperties(constructor) {
  const blessings = readInheritableStaticArrayValues(constructor, "blessings");
  return blessings.reduce((blessedProperties, blessing) => {
    const properties = blessing(constructor);
    for (const key in properties) {
      const descriptor = blessedProperties[key] || {};
      blessedProperties[key] = Object.assign(descriptor, properties[key]);
    }
    return blessedProperties;
  }, {});
}
function getShadowProperties(prototype, properties) {
  return getOwnKeys(properties).reduce((shadowProperties, key) => {
    const descriptor = getShadowedDescriptor(prototype, properties, key);
    if (descriptor) {
      Object.assign(shadowProperties, { [key]: descriptor });
    }
    return shadowProperties;
  }, {});
}
function getShadowedDescriptor(prototype, properties, key) {
  const shadowingDescriptor = Object.getOwnPropertyDescriptor(prototype, key);
  const shadowedByValue = shadowingDescriptor && "value" in shadowingDescriptor;
  if (!shadowedByValue) {
    const descriptor = Object.getOwnPropertyDescriptor(properties, key).value;
    if (shadowingDescriptor) {
      descriptor.get = shadowingDescriptor.get || descriptor.get;
      descriptor.set = shadowingDescriptor.set || descriptor.set;
    }
    return descriptor;
  }
}
const getOwnKeys = (() => {
  if (typeof Object.getOwnPropertySymbols == "function") {
    return (object) => [...Object.getOwnPropertyNames(object), ...Object.getOwnPropertySymbols(object)];
  } else {
    return Object.getOwnPropertyNames;
  }
})();
const extend = (() => {
  function extendWithReflect(constructor) {
    function extended() {
      return Reflect.construct(constructor, arguments, new.target);
    }
    extended.prototype = Object.create(constructor.prototype, {
      constructor: { value: extended }
    });
    Reflect.setPrototypeOf(extended, constructor);
    return extended;
  }
  function testReflectExtension() {
    const a = function() {
      this.a.call(this);
    };
    const b = extendWithReflect(a);
    b.prototype.a = function() {
    };
    return new b();
  }
  try {
    testReflectExtension();
    return extendWithReflect;
  } catch (error2) {
    return (constructor) => class extended extends constructor {
    };
  }
})();
function blessDefinition(definition) {
  return {
    identifier: definition.identifier,
    controllerConstructor: bless(definition.controllerConstructor)
  };
}
class Module {
  constructor(application, definition) {
    this.application = application;
    this.definition = blessDefinition(definition);
    this.contextsByScope = /* @__PURE__ */ new WeakMap();
    this.connectedContexts = /* @__PURE__ */ new Set();
  }
  get identifier() {
    return this.definition.identifier;
  }
  get controllerConstructor() {
    return this.definition.controllerConstructor;
  }
  get contexts() {
    return Array.from(this.connectedContexts);
  }
  connectContextForScope(scope) {
    const context = this.fetchContextForScope(scope);
    this.connectedContexts.add(context);
    context.connect();
  }
  disconnectContextForScope(scope) {
    const context = this.contextsByScope.get(scope);
    if (context) {
      this.connectedContexts.delete(context);
      context.disconnect();
    }
  }
  fetchContextForScope(scope) {
    let context = this.contextsByScope.get(scope);
    if (!context) {
      context = new Context(this, scope);
      this.contextsByScope.set(scope, context);
    }
    return context;
  }
}
class ClassMap {
  constructor(scope) {
    this.scope = scope;
  }
  has(name) {
    return this.data.has(this.getDataKey(name));
  }
  get(name) {
    return this.getAll(name)[0];
  }
  getAll(name) {
    const tokenString = this.data.get(this.getDataKey(name)) || "";
    return tokenize(tokenString);
  }
  getAttributeName(name) {
    return this.data.getAttributeNameForKey(this.getDataKey(name));
  }
  getDataKey(name) {
    return `${name}-class`;
  }
  get data() {
    return this.scope.data;
  }
}
class DataMap {
  constructor(scope) {
    this.scope = scope;
  }
  get element() {
    return this.scope.element;
  }
  get identifier() {
    return this.scope.identifier;
  }
  get(key) {
    const name = this.getAttributeNameForKey(key);
    return this.element.getAttribute(name);
  }
  set(key, value) {
    const name = this.getAttributeNameForKey(key);
    this.element.setAttribute(name, value);
    return this.get(key);
  }
  has(key) {
    const name = this.getAttributeNameForKey(key);
    return this.element.hasAttribute(name);
  }
  delete(key) {
    if (this.has(key)) {
      const name = this.getAttributeNameForKey(key);
      this.element.removeAttribute(name);
      return true;
    } else {
      return false;
    }
  }
  getAttributeNameForKey(key) {
    return `data-${this.identifier}-${dasherize(key)}`;
  }
}
class Guide {
  constructor(logger) {
    this.warnedKeysByObject = /* @__PURE__ */ new WeakMap();
    this.logger = logger;
  }
  warn(object, key, message) {
    let warnedKeys = this.warnedKeysByObject.get(object);
    if (!warnedKeys) {
      warnedKeys = /* @__PURE__ */ new Set();
      this.warnedKeysByObject.set(object, warnedKeys);
    }
    if (!warnedKeys.has(key)) {
      warnedKeys.add(key);
      this.logger.warn(message, object);
    }
  }
}
function attributeValueContainsToken(attributeName, token) {
  return `[${attributeName}~="${token}"]`;
}
class TargetSet {
  constructor(scope) {
    this.scope = scope;
  }
  get element() {
    return this.scope.element;
  }
  get identifier() {
    return this.scope.identifier;
  }
  get schema() {
    return this.scope.schema;
  }
  has(targetName) {
    return this.find(targetName) != null;
  }
  find(...targetNames) {
    return targetNames.reduce((target, targetName) => target || this.findTarget(targetName) || this.findLegacyTarget(targetName), void 0);
  }
  findAll(...targetNames) {
    return targetNames.reduce((targets, targetName) => [
      ...targets,
      ...this.findAllTargets(targetName),
      ...this.findAllLegacyTargets(targetName)
    ], []);
  }
  findTarget(targetName) {
    const selector = this.getSelectorForTargetName(targetName);
    return this.scope.findElement(selector);
  }
  findAllTargets(targetName) {
    const selector = this.getSelectorForTargetName(targetName);
    return this.scope.findAllElements(selector);
  }
  getSelectorForTargetName(targetName) {
    const attributeName = this.schema.targetAttributeForScope(this.identifier);
    return attributeValueContainsToken(attributeName, targetName);
  }
  findLegacyTarget(targetName) {
    const selector = this.getLegacySelectorForTargetName(targetName);
    return this.deprecate(this.scope.findElement(selector), targetName);
  }
  findAllLegacyTargets(targetName) {
    const selector = this.getLegacySelectorForTargetName(targetName);
    return this.scope.findAllElements(selector).map((element) => this.deprecate(element, targetName));
  }
  getLegacySelectorForTargetName(targetName) {
    const targetDescriptor = `${this.identifier}.${targetName}`;
    return attributeValueContainsToken(this.schema.targetAttribute, targetDescriptor);
  }
  deprecate(element, targetName) {
    if (element) {
      const { identifier } = this;
      const attributeName = this.schema.targetAttribute;
      const revisedAttributeName = this.schema.targetAttributeForScope(identifier);
      this.guide.warn(element, `target:${targetName}`, `Please replace ${attributeName}="${identifier}.${targetName}" with ${revisedAttributeName}="${targetName}". The ${attributeName} attribute is deprecated and will be removed in a future version of Stimulus.`);
    }
    return element;
  }
  get guide() {
    return this.scope.guide;
  }
}
class OutletSet {
  constructor(scope, controllerElement) {
    this.scope = scope;
    this.controllerElement = controllerElement;
  }
  get element() {
    return this.scope.element;
  }
  get identifier() {
    return this.scope.identifier;
  }
  get schema() {
    return this.scope.schema;
  }
  has(outletName) {
    return this.find(outletName) != null;
  }
  find(...outletNames) {
    return outletNames.reduce((outlet, outletName) => outlet || this.findOutlet(outletName), void 0);
  }
  findAll(...outletNames) {
    return outletNames.reduce((outlets, outletName) => [...outlets, ...this.findAllOutlets(outletName)], []);
  }
  getSelectorForOutletName(outletName) {
    const attributeName = this.schema.outletAttributeForScope(this.identifier, outletName);
    return this.controllerElement.getAttribute(attributeName);
  }
  findOutlet(outletName) {
    const selector = this.getSelectorForOutletName(outletName);
    if (selector)
      return this.findElement(selector, outletName);
  }
  findAllOutlets(outletName) {
    const selector = this.getSelectorForOutletName(outletName);
    return selector ? this.findAllElements(selector, outletName) : [];
  }
  findElement(selector, outletName) {
    const elements = this.scope.queryElements(selector);
    return elements.filter((element) => this.matchesElement(element, selector, outletName))[0];
  }
  findAllElements(selector, outletName) {
    const elements = this.scope.queryElements(selector);
    return elements.filter((element) => this.matchesElement(element, selector, outletName));
  }
  matchesElement(element, selector, outletName) {
    const controllerAttribute = element.getAttribute(this.scope.schema.controllerAttribute) || "";
    return element.matches(selector) && controllerAttribute.split(" ").includes(outletName);
  }
}
class Scope {
  constructor(schema, element, identifier, logger) {
    this.targets = new TargetSet(this);
    this.classes = new ClassMap(this);
    this.data = new DataMap(this);
    this.containsElement = (element2) => {
      return element2.closest(this.controllerSelector) === this.element;
    };
    this.schema = schema;
    this.element = element;
    this.identifier = identifier;
    this.guide = new Guide(logger);
    this.outlets = new OutletSet(this.documentScope, element);
  }
  findElement(selector) {
    return this.element.matches(selector) ? this.element : this.queryElements(selector).find(this.containsElement);
  }
  findAllElements(selector) {
    return [
      ...this.element.matches(selector) ? [this.element] : [],
      ...this.queryElements(selector).filter(this.containsElement)
    ];
  }
  queryElements(selector) {
    return Array.from(this.element.querySelectorAll(selector));
  }
  get controllerSelector() {
    return attributeValueContainsToken(this.schema.controllerAttribute, this.identifier);
  }
  get isDocumentScope() {
    return this.element === document.documentElement;
  }
  get documentScope() {
    return this.isDocumentScope ? this : new Scope(this.schema, document.documentElement, this.identifier, this.guide.logger);
  }
}
class ScopeObserver {
  constructor(element, schema, delegate) {
    this.element = element;
    this.schema = schema;
    this.delegate = delegate;
    this.valueListObserver = new ValueListObserver(this.element, this.controllerAttribute, this);
    this.scopesByIdentifierByElement = /* @__PURE__ */ new WeakMap();
    this.scopeReferenceCounts = /* @__PURE__ */ new WeakMap();
  }
  start() {
    this.valueListObserver.start();
  }
  stop() {
    this.valueListObserver.stop();
  }
  get controllerAttribute() {
    return this.schema.controllerAttribute;
  }
  parseValueForToken(token) {
    const { element, content: identifier } = token;
    return this.parseValueForElementAndIdentifier(element, identifier);
  }
  parseValueForElementAndIdentifier(element, identifier) {
    const scopesByIdentifier = this.fetchScopesByIdentifierForElement(element);
    let scope = scopesByIdentifier.get(identifier);
    if (!scope) {
      scope = this.delegate.createScopeForElementAndIdentifier(element, identifier);
      scopesByIdentifier.set(identifier, scope);
    }
    return scope;
  }
  elementMatchedValue(element, value) {
    const referenceCount = (this.scopeReferenceCounts.get(value) || 0) + 1;
    this.scopeReferenceCounts.set(value, referenceCount);
    if (referenceCount == 1) {
      this.delegate.scopeConnected(value);
    }
  }
  elementUnmatchedValue(element, value) {
    const referenceCount = this.scopeReferenceCounts.get(value);
    if (referenceCount) {
      this.scopeReferenceCounts.set(value, referenceCount - 1);
      if (referenceCount == 1) {
        this.delegate.scopeDisconnected(value);
      }
    }
  }
  fetchScopesByIdentifierForElement(element) {
    let scopesByIdentifier = this.scopesByIdentifierByElement.get(element);
    if (!scopesByIdentifier) {
      scopesByIdentifier = /* @__PURE__ */ new Map();
      this.scopesByIdentifierByElement.set(element, scopesByIdentifier);
    }
    return scopesByIdentifier;
  }
}
class Router {
  constructor(application) {
    this.application = application;
    this.scopeObserver = new ScopeObserver(this.element, this.schema, this);
    this.scopesByIdentifier = new Multimap();
    this.modulesByIdentifier = /* @__PURE__ */ new Map();
  }
  get element() {
    return this.application.element;
  }
  get schema() {
    return this.application.schema;
  }
  get logger() {
    return this.application.logger;
  }
  get controllerAttribute() {
    return this.schema.controllerAttribute;
  }
  get modules() {
    return Array.from(this.modulesByIdentifier.values());
  }
  get contexts() {
    return this.modules.reduce((contexts, module) => contexts.concat(module.contexts), []);
  }
  start() {
    this.scopeObserver.start();
  }
  stop() {
    this.scopeObserver.stop();
  }
  loadDefinition(definition) {
    this.unloadIdentifier(definition.identifier);
    const module = new Module(this.application, definition);
    this.connectModule(module);
    const afterLoad = definition.controllerConstructor.afterLoad;
    if (afterLoad) {
      afterLoad.call(definition.controllerConstructor, definition.identifier, this.application);
    }
  }
  unloadIdentifier(identifier) {
    const module = this.modulesByIdentifier.get(identifier);
    if (module) {
      this.disconnectModule(module);
    }
  }
  getContextForElementAndIdentifier(element, identifier) {
    const module = this.modulesByIdentifier.get(identifier);
    if (module) {
      return module.contexts.find((context) => context.element == element);
    }
  }
  proposeToConnectScopeForElementAndIdentifier(element, identifier) {
    const scope = this.scopeObserver.parseValueForElementAndIdentifier(element, identifier);
    if (scope) {
      this.scopeObserver.elementMatchedValue(scope.element, scope);
    } else {
      console.error(`Couldn't find or create scope for identifier: "${identifier}" and element:`, element);
    }
  }
  handleError(error2, message, detail) {
    this.application.handleError(error2, message, detail);
  }
  createScopeForElementAndIdentifier(element, identifier) {
    return new Scope(this.schema, element, identifier, this.logger);
  }
  scopeConnected(scope) {
    this.scopesByIdentifier.add(scope.identifier, scope);
    const module = this.modulesByIdentifier.get(scope.identifier);
    if (module) {
      module.connectContextForScope(scope);
    }
  }
  scopeDisconnected(scope) {
    this.scopesByIdentifier.delete(scope.identifier, scope);
    const module = this.modulesByIdentifier.get(scope.identifier);
    if (module) {
      module.disconnectContextForScope(scope);
    }
  }
  connectModule(module) {
    this.modulesByIdentifier.set(module.identifier, module);
    const scopes = this.scopesByIdentifier.getValuesForKey(module.identifier);
    scopes.forEach((scope) => module.connectContextForScope(scope));
  }
  disconnectModule(module) {
    this.modulesByIdentifier.delete(module.identifier);
    const scopes = this.scopesByIdentifier.getValuesForKey(module.identifier);
    scopes.forEach((scope) => module.disconnectContextForScope(scope));
  }
}
const defaultSchema = {
  controllerAttribute: "data-controller",
  actionAttribute: "data-action",
  targetAttribute: "data-target",
  targetAttributeForScope: (identifier) => `data-${identifier}-target`,
  outletAttributeForScope: (identifier, outlet) => `data-${identifier}-${outlet}-outlet`,
  keyMappings: Object.assign(Object.assign({ enter: "Enter", tab: "Tab", esc: "Escape", space: " ", up: "ArrowUp", down: "ArrowDown", left: "ArrowLeft", right: "ArrowRight", home: "Home", end: "End", page_up: "PageUp", page_down: "PageDown" }, objectFromEntries("abcdefghijklmnopqrstuvwxyz".split("").map((c) => [c, c]))), objectFromEntries("0123456789".split("").map((n) => [n, n])))
};
function objectFromEntries(array) {
  return array.reduce((memo, [k, v]) => Object.assign(Object.assign({}, memo), { [k]: v }), {});
}
class Application {
  constructor(element = document.documentElement, schema = defaultSchema) {
    this.logger = console;
    this.debug = false;
    this.logDebugActivity = (identifier, functionName, detail = {}) => {
      if (this.debug) {
        this.logFormattedMessage(identifier, functionName, detail);
      }
    };
    this.element = element;
    this.schema = schema;
    this.dispatcher = new Dispatcher(this);
    this.router = new Router(this);
    this.actionDescriptorFilters = Object.assign({}, defaultActionDescriptorFilters);
  }
  static start(element, schema) {
    const application = new this(element, schema);
    application.start();
    return application;
  }
  async start() {
    await domReady();
    this.logDebugActivity("application", "starting");
    this.dispatcher.start();
    this.router.start();
    this.logDebugActivity("application", "start");
  }
  stop() {
    this.logDebugActivity("application", "stopping");
    this.dispatcher.stop();
    this.router.stop();
    this.logDebugActivity("application", "stop");
  }
  register(identifier, controllerConstructor) {
    this.load({ identifier, controllerConstructor });
  }
  registerActionOption(name, filter) {
    this.actionDescriptorFilters[name] = filter;
  }
  load(head, ...rest) {
    const definitions = Array.isArray(head) ? head : [head, ...rest];
    definitions.forEach((definition) => {
      if (definition.controllerConstructor.shouldLoad) {
        this.router.loadDefinition(definition);
      }
    });
  }
  unload(head, ...rest) {
    const identifiers = Array.isArray(head) ? head : [head, ...rest];
    identifiers.forEach((identifier) => this.router.unloadIdentifier(identifier));
  }
  get controllers() {
    return this.router.contexts.map((context) => context.controller);
  }
  getControllerForElementAndIdentifier(element, identifier) {
    const context = this.router.getContextForElementAndIdentifier(element, identifier);
    return context ? context.controller : null;
  }
  handleError(error2, message, detail) {
    var _a;
    this.logger.error(`%s

%o

%o`, message, error2, detail);
    (_a = window.onerror) === null || _a === void 0 ? void 0 : _a.call(window, message, "", 0, 0, error2);
  }
  logFormattedMessage(identifier, functionName, detail = {}) {
    detail = Object.assign({ application: this }, detail);
    this.logger.groupCollapsed(`${identifier} #${functionName}`);
    this.logger.log("details:", Object.assign({}, detail));
    this.logger.groupEnd();
  }
}
function domReady() {
  return new Promise((resolve) => {
    if (document.readyState == "loading") {
      document.addEventListener("DOMContentLoaded", () => resolve());
    } else {
      resolve();
    }
  });
}
function ClassPropertiesBlessing(constructor) {
  const classes = readInheritableStaticArrayValues(constructor, "classes");
  return classes.reduce((properties, classDefinition) => {
    return Object.assign(properties, propertiesForClassDefinition(classDefinition));
  }, {});
}
function propertiesForClassDefinition(key) {
  return {
    [`${key}Class`]: {
      get() {
        const { classes } = this;
        if (classes.has(key)) {
          return classes.get(key);
        } else {
          const attribute = classes.getAttributeName(key);
          throw new Error(`Missing attribute "${attribute}"`);
        }
      }
    },
    [`${key}Classes`]: {
      get() {
        return this.classes.getAll(key);
      }
    },
    [`has${capitalize(key)}Class`]: {
      get() {
        return this.classes.has(key);
      }
    }
  };
}
function OutletPropertiesBlessing(constructor) {
  const outlets = readInheritableStaticArrayValues(constructor, "outlets");
  return outlets.reduce((properties, outletDefinition) => {
    return Object.assign(properties, propertiesForOutletDefinition(outletDefinition));
  }, {});
}
function getOutletController(controller, element, identifier) {
  return controller.application.getControllerForElementAndIdentifier(element, identifier);
}
function getControllerAndEnsureConnectedScope(controller, element, outletName) {
  let outletController = getOutletController(controller, element, outletName);
  if (outletController)
    return outletController;
  controller.application.router.proposeToConnectScopeForElementAndIdentifier(element, outletName);
  outletController = getOutletController(controller, element, outletName);
  if (outletController)
    return outletController;
}
function propertiesForOutletDefinition(name) {
  const camelizedName = namespaceCamelize(name);
  return {
    [`${camelizedName}Outlet`]: {
      get() {
        const outletElement = this.outlets.find(name);
        const selector = this.outlets.getSelectorForOutletName(name);
        if (outletElement) {
          const outletController = getControllerAndEnsureConnectedScope(this, outletElement, name);
          if (outletController)
            return outletController;
          throw new Error(`The provided outlet element is missing an outlet controller "${name}" instance for host controller "${this.identifier}"`);
        }
        throw new Error(`Missing outlet element "${name}" for host controller "${this.identifier}". Stimulus couldn't find a matching outlet element using selector "${selector}".`);
      }
    },
    [`${camelizedName}Outlets`]: {
      get() {
        const outlets = this.outlets.findAll(name);
        if (outlets.length > 0) {
          return outlets.map((outletElement) => {
            const outletController = getControllerAndEnsureConnectedScope(this, outletElement, name);
            if (outletController)
              return outletController;
            console.warn(`The provided outlet element is missing an outlet controller "${name}" instance for host controller "${this.identifier}"`, outletElement);
          }).filter((controller) => controller);
        }
        return [];
      }
    },
    [`${camelizedName}OutletElement`]: {
      get() {
        const outletElement = this.outlets.find(name);
        const selector = this.outlets.getSelectorForOutletName(name);
        if (outletElement) {
          return outletElement;
        } else {
          throw new Error(`Missing outlet element "${name}" for host controller "${this.identifier}". Stimulus couldn't find a matching outlet element using selector "${selector}".`);
        }
      }
    },
    [`${camelizedName}OutletElements`]: {
      get() {
        return this.outlets.findAll(name);
      }
    },
    [`has${capitalize(camelizedName)}Outlet`]: {
      get() {
        return this.outlets.has(name);
      }
    }
  };
}
function TargetPropertiesBlessing(constructor) {
  const targets = readInheritableStaticArrayValues(constructor, "targets");
  return targets.reduce((properties, targetDefinition) => {
    return Object.assign(properties, propertiesForTargetDefinition(targetDefinition));
  }, {});
}
function propertiesForTargetDefinition(name) {
  return {
    [`${name}Target`]: {
      get() {
        const target = this.targets.find(name);
        if (target) {
          return target;
        } else {
          throw new Error(`Missing target element "${name}" for "${this.identifier}" controller`);
        }
      }
    },
    [`${name}Targets`]: {
      get() {
        return this.targets.findAll(name);
      }
    },
    [`has${capitalize(name)}Target`]: {
      get() {
        return this.targets.has(name);
      }
    }
  };
}
function ValuePropertiesBlessing(constructor) {
  const valueDefinitionPairs = readInheritableStaticObjectPairs(constructor, "values");
  const propertyDescriptorMap = {
    valueDescriptorMap: {
      get() {
        return valueDefinitionPairs.reduce((result, valueDefinitionPair) => {
          const valueDescriptor = parseValueDefinitionPair(valueDefinitionPair, this.identifier);
          const attributeName = this.data.getAttributeNameForKey(valueDescriptor.key);
          return Object.assign(result, { [attributeName]: valueDescriptor });
        }, {});
      }
    }
  };
  return valueDefinitionPairs.reduce((properties, valueDefinitionPair) => {
    return Object.assign(properties, propertiesForValueDefinitionPair(valueDefinitionPair));
  }, propertyDescriptorMap);
}
function propertiesForValueDefinitionPair(valueDefinitionPair, controller) {
  const definition = parseValueDefinitionPair(valueDefinitionPair, controller);
  const { key, name, reader: read, writer: write } = definition;
  return {
    [name]: {
      get() {
        const value = this.data.get(key);
        if (value !== null) {
          return read(value);
        } else {
          return definition.defaultValue;
        }
      },
      set(value) {
        if (value === void 0) {
          this.data.delete(key);
        } else {
          this.data.set(key, write(value));
        }
      }
    },
    [`has${capitalize(name)}`]: {
      get() {
        return this.data.has(key) || definition.hasCustomDefaultValue;
      }
    }
  };
}
function parseValueDefinitionPair([token, typeDefinition], controller) {
  return valueDescriptorForTokenAndTypeDefinition({
    controller,
    token,
    typeDefinition
  });
}
function parseValueTypeConstant(constant) {
  switch (constant) {
    case Array:
      return "array";
    case Boolean:
      return "boolean";
    case Number:
      return "number";
    case Object:
      return "object";
    case String:
      return "string";
  }
}
function parseValueTypeDefault(defaultValue) {
  switch (typeof defaultValue) {
    case "boolean":
      return "boolean";
    case "number":
      return "number";
    case "string":
      return "string";
  }
  if (Array.isArray(defaultValue))
    return "array";
  if (Object.prototype.toString.call(defaultValue) === "[object Object]")
    return "object";
}
function parseValueTypeObject(payload) {
  const { controller, token, typeObject } = payload;
  const hasType = isSomething(typeObject.type);
  const hasDefault = isSomething(typeObject.default);
  const fullObject = hasType && hasDefault;
  const onlyType = hasType && !hasDefault;
  const onlyDefault = !hasType && hasDefault;
  const typeFromObject = parseValueTypeConstant(typeObject.type);
  const typeFromDefaultValue = parseValueTypeDefault(payload.typeObject.default);
  if (onlyType)
    return typeFromObject;
  if (onlyDefault)
    return typeFromDefaultValue;
  if (typeFromObject !== typeFromDefaultValue) {
    const propertyPath = controller ? `${controller}.${token}` : token;
    throw new Error(`The specified default value for the Stimulus Value "${propertyPath}" must match the defined type "${typeFromObject}". The provided default value of "${typeObject.default}" is of type "${typeFromDefaultValue}".`);
  }
  if (fullObject)
    return typeFromObject;
}
function parseValueTypeDefinition(payload) {
  const { controller, token, typeDefinition } = payload;
  const typeObject = { controller, token, typeObject: typeDefinition };
  const typeFromObject = parseValueTypeObject(typeObject);
  const typeFromDefaultValue = parseValueTypeDefault(typeDefinition);
  const typeFromConstant = parseValueTypeConstant(typeDefinition);
  const type = typeFromObject || typeFromDefaultValue || typeFromConstant;
  if (type)
    return type;
  const propertyPath = controller ? `${controller}.${typeDefinition}` : token;
  throw new Error(`Unknown value type "${propertyPath}" for "${token}" value`);
}
function defaultValueForDefinition(typeDefinition) {
  const constant = parseValueTypeConstant(typeDefinition);
  if (constant)
    return defaultValuesByType[constant];
  const hasDefault = hasProperty(typeDefinition, "default");
  const hasType = hasProperty(typeDefinition, "type");
  const typeObject = typeDefinition;
  if (hasDefault)
    return typeObject.default;
  if (hasType) {
    const { type } = typeObject;
    const constantFromType = parseValueTypeConstant(type);
    if (constantFromType)
      return defaultValuesByType[constantFromType];
  }
  return typeDefinition;
}
function valueDescriptorForTokenAndTypeDefinition(payload) {
  const { token, typeDefinition } = payload;
  const key = `${dasherize(token)}-value`;
  const type = parseValueTypeDefinition(payload);
  return {
    type,
    key,
    name: camelize(key),
    get defaultValue() {
      return defaultValueForDefinition(typeDefinition);
    },
    get hasCustomDefaultValue() {
      return parseValueTypeDefault(typeDefinition) !== void 0;
    },
    reader: readers[type],
    writer: writers[type] || writers.default
  };
}
const defaultValuesByType = {
  get array() {
    return [];
  },
  boolean: false,
  number: 0,
  get object() {
    return {};
  },
  string: ""
};
const readers = {
  array(value) {
    const array = JSON.parse(value);
    if (!Array.isArray(array)) {
      throw new TypeError(`expected value of type "array" but instead got value "${value}" of type "${parseValueTypeDefault(array)}"`);
    }
    return array;
  },
  boolean(value) {
    return !(value == "0" || String(value).toLowerCase() == "false");
  },
  number(value) {
    return Number(value.replace(/_/g, ""));
  },
  object(value) {
    const object = JSON.parse(value);
    if (object === null || typeof object != "object" || Array.isArray(object)) {
      throw new TypeError(`expected value of type "object" but instead got value "${value}" of type "${parseValueTypeDefault(object)}"`);
    }
    return object;
  },
  string(value) {
    return value;
  }
};
const writers = {
  default: writeString,
  array: writeJSON,
  object: writeJSON
};
function writeJSON(value) {
  return JSON.stringify(value);
}
function writeString(value) {
  return `${value}`;
}
class Controller {
  constructor(context) {
    this.context = context;
  }
  static get shouldLoad() {
    return true;
  }
  static afterLoad(_identifier, _application) {
    return;
  }
  get application() {
    return this.context.application;
  }
  get scope() {
    return this.context.scope;
  }
  get element() {
    return this.scope.element;
  }
  get identifier() {
    return this.scope.identifier;
  }
  get targets() {
    return this.scope.targets;
  }
  get outlets() {
    return this.scope.outlets;
  }
  get classes() {
    return this.scope.classes;
  }
  get data() {
    return this.scope.data;
  }
  initialize() {
  }
  connect() {
  }
  disconnect() {
  }
  dispatch(eventName, { target = this.element, detail = {}, prefix = this.identifier, bubbles = true, cancelable = true } = {}) {
    const type = prefix ? `${prefix}:${eventName}` : eventName;
    const event = new CustomEvent(type, { detail, bubbles, cancelable });
    target.dispatchEvent(event);
    return event;
  }
}
Controller.blessings = [
  ClassPropertiesBlessing,
  TargetPropertiesBlessing,
  ValuePropertiesBlessing,
  OutletPropertiesBlessing
];
Controller.targets = [];
Controller.outlets = [];
Controller.values = {};



/***/ }),

/***/ "./node_modules/@hotwired/turbo-rails/app/javascript/turbo/cable.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@hotwired/turbo-rails/app/javascript/turbo/cable.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createConsumer: () => (/* binding */ createConsumer),
/* harmony export */   getConsumer: () => (/* binding */ getConsumer),
/* harmony export */   setConsumer: () => (/* binding */ setConsumer),
/* harmony export */   subscribeTo: () => (/* binding */ subscribeTo)
/* harmony export */ });
let consumer;
async function getConsumer() {
  return consumer || setConsumer(createConsumer().then(setConsumer));
}
function setConsumer(newConsumer) {
  return consumer = newConsumer;
}
async function createConsumer() {
  const { createConsumer: createConsumer2 } = await Promise.resolve(/*! import() | actioncable */).then(__webpack_require__.bind(__webpack_require__, /*! @rails/actioncable/src */ "./node_modules/@rails/actioncable/src/index.js"));
  return createConsumer2();
}
async function subscribeTo(channel, mixin) {
  const { subscriptions } = await getConsumer();
  return subscriptions.create(channel, mixin);
}


/***/ }),

/***/ "./node_modules/@hotwired/turbo-rails/app/javascript/turbo/cable_stream_source_element.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/@hotwired/turbo-rails/app/javascript/turbo/cable_stream_source_element.js ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _hotwired_turbo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @hotwired/turbo */ "./node_modules/@hotwired/turbo/dist/turbo.es2017-esm.js");
/* harmony import */ var _cable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cable */ "./node_modules/@hotwired/turbo-rails/app/javascript/turbo/cable.js");
/* harmony import */ var _snakeize__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./snakeize */ "./node_modules/@hotwired/turbo-rails/app/javascript/turbo/snakeize.js");



class TurboCableStreamSourceElement extends HTMLElement {
  async connectedCallback() {
    (0,_hotwired_turbo__WEBPACK_IMPORTED_MODULE_0__.connectStreamSource)(this);
    this.subscription = await (0,_cable__WEBPACK_IMPORTED_MODULE_1__.subscribeTo)(this.channel, {
      received: this.dispatchMessageEvent.bind(this),
      connected: this.subscriptionConnected.bind(this),
      disconnected: this.subscriptionDisconnected.bind(this)
    });
  }
  disconnectedCallback() {
    (0,_hotwired_turbo__WEBPACK_IMPORTED_MODULE_0__.disconnectStreamSource)(this);
    if (this.subscription) this.subscription.unsubscribe();
  }
  dispatchMessageEvent(data) {
    const event = new MessageEvent("message", { data });
    return this.dispatchEvent(event);
  }
  subscriptionConnected() {
    this.setAttribute("connected", "");
  }
  subscriptionDisconnected() {
    this.removeAttribute("connected");
  }
  get channel() {
    const channel = this.getAttribute("channel");
    const signed_stream_name = this.getAttribute("signed-stream-name");
    return { channel, signed_stream_name, ...(0,_snakeize__WEBPACK_IMPORTED_MODULE_2__["default"])({ ...this.dataset }) };
  }
}
if (customElements.get("turbo-cable-stream-source") === void 0) {
  customElements.define("turbo-cable-stream-source", TurboCableStreamSourceElement);
}


/***/ }),

/***/ "./node_modules/@hotwired/turbo-rails/app/javascript/turbo/fetch_requests.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/@hotwired/turbo-rails/app/javascript/turbo/fetch_requests.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   encodeMethodIntoRequestBody: () => (/* binding */ encodeMethodIntoRequestBody)
/* harmony export */ });
function encodeMethodIntoRequestBody(event) {
  if (event.target instanceof HTMLFormElement) {
    const { target: form, detail: { fetchOptions } } = event;
    form.addEventListener("turbo:submit-start", ({ detail: { formSubmission: { submitter } } }) => {
      const body = isBodyInit(fetchOptions.body) ? fetchOptions.body : new URLSearchParams();
      const method = determineFetchMethod(submitter, body, form);
      if (!/get/i.test(method)) {
        if (/post/i.test(method)) {
          body.delete("_method");
        } else {
          body.set("_method", method);
        }
        fetchOptions.method = "post";
      }
    }, { once: true });
  }
}
function determineFetchMethod(submitter, body, form) {
  const formMethod = determineFormMethod(submitter);
  const overrideMethod = body.get("_method");
  const method = form.getAttribute("method") || "get";
  if (typeof formMethod == "string") {
    return formMethod;
  } else if (typeof overrideMethod == "string") {
    return overrideMethod;
  } else {
    return method;
  }
}
function determineFormMethod(submitter) {
  if (submitter instanceof HTMLButtonElement || submitter instanceof HTMLInputElement) {
    if (submitter.name === "_method") {
      return submitter.value;
    } else if (submitter.hasAttribute("formmethod")) {
      return submitter.formMethod;
    } else {
      return null;
    }
  } else {
    return null;
  }
}
function isBodyInit(body) {
  return body instanceof FormData || body instanceof URLSearchParams;
}


/***/ }),

/***/ "./node_modules/@hotwired/turbo-rails/app/javascript/turbo/index.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@hotwired/turbo-rails/app/javascript/turbo/index.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Turbo: () => (/* reexport module object */ _hotwired_turbo__WEBPACK_IMPORTED_MODULE_1__),
/* harmony export */   cable: () => (/* reexport module object */ _cable__WEBPACK_IMPORTED_MODULE_2__)
/* harmony export */ });
/* harmony import */ var _cable_stream_source_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cable_stream_source_element */ "./node_modules/@hotwired/turbo-rails/app/javascript/turbo/cable_stream_source_element.js");
/* harmony import */ var _hotwired_turbo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @hotwired/turbo */ "./node_modules/@hotwired/turbo/dist/turbo.es2017-esm.js");
/* harmony import */ var _cable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cable */ "./node_modules/@hotwired/turbo-rails/app/javascript/turbo/cable.js");
/* harmony import */ var _fetch_requests__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./fetch_requests */ "./node_modules/@hotwired/turbo-rails/app/javascript/turbo/fetch_requests.js");






window.Turbo = _hotwired_turbo__WEBPACK_IMPORTED_MODULE_1__;
addEventListener("turbo:before-fetch-request", _fetch_requests__WEBPACK_IMPORTED_MODULE_3__.encodeMethodIntoRequestBody);


/***/ }),

/***/ "./node_modules/@hotwired/turbo-rails/app/javascript/turbo/snakeize.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@hotwired/turbo-rails/app/javascript/turbo/snakeize.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ walk)
/* harmony export */ });
function walk(obj) {
  if (!obj || typeof obj !== "object") return obj;
  if (obj instanceof Date || obj instanceof RegExp) return obj;
  if (Array.isArray(obj)) return obj.map(walk);
  return Object.keys(obj).reduce(function(acc, key) {
    var camel = key[0].toLowerCase() + key.slice(1).replace(/([A-Z]+)/g, function(m, x) {
      return "_" + x.toLowerCase();
    });
    acc[camel] = walk(obj[key]);
    return acc;
  }, {});
}
;


/***/ }),

/***/ "./node_modules/@hotwired/turbo/dist/turbo.es2017-esm.js":
/*!***************************************************************!*\
  !*** ./node_modules/@hotwired/turbo/dist/turbo.es2017-esm.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FetchEnctype: () => (/* binding */ FetchEnctype),
/* harmony export */   FetchMethod: () => (/* binding */ FetchMethod),
/* harmony export */   FetchRequest: () => (/* binding */ FetchRequest),
/* harmony export */   FetchResponse: () => (/* binding */ FetchResponse),
/* harmony export */   FrameElement: () => (/* binding */ FrameElement),
/* harmony export */   FrameLoadingStyle: () => (/* binding */ FrameLoadingStyle),
/* harmony export */   FrameRenderer: () => (/* binding */ FrameRenderer),
/* harmony export */   PageRenderer: () => (/* binding */ PageRenderer),
/* harmony export */   PageSnapshot: () => (/* binding */ PageSnapshot),
/* harmony export */   StreamActions: () => (/* binding */ StreamActions),
/* harmony export */   StreamElement: () => (/* binding */ StreamElement),
/* harmony export */   StreamSourceElement: () => (/* binding */ StreamSourceElement),
/* harmony export */   cache: () => (/* binding */ cache),
/* harmony export */   clearCache: () => (/* binding */ clearCache),
/* harmony export */   connectStreamSource: () => (/* binding */ connectStreamSource),
/* harmony export */   disconnectStreamSource: () => (/* binding */ disconnectStreamSource),
/* harmony export */   fetch: () => (/* binding */ fetchWithTurboHeaders),
/* harmony export */   fetchEnctypeFromString: () => (/* binding */ fetchEnctypeFromString),
/* harmony export */   fetchMethodFromString: () => (/* binding */ fetchMethodFromString),
/* harmony export */   isSafe: () => (/* binding */ isSafe),
/* harmony export */   navigator: () => (/* binding */ navigator$1),
/* harmony export */   registerAdapter: () => (/* binding */ registerAdapter),
/* harmony export */   renderStreamMessage: () => (/* binding */ renderStreamMessage),
/* harmony export */   session: () => (/* binding */ session),
/* harmony export */   setConfirmMethod: () => (/* binding */ setConfirmMethod),
/* harmony export */   setFormMode: () => (/* binding */ setFormMode),
/* harmony export */   setProgressBarDelay: () => (/* binding */ setProgressBarDelay),
/* harmony export */   start: () => (/* binding */ start),
/* harmony export */   visit: () => (/* binding */ visit)
/* harmony export */ });
var __defProp = Object.defineProperty;
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
/*!
Turbo 8.0.4
Copyright © 2024 37signals LLC
 */
var _resolveRequestPromise, _FetchRequest_instances, allowRequestToBeIntercepted_fn, willDelegateErrorHandling_fn, _prefetchTimeout, _prefetched, _resolveRenderPromise, _resolveInterceptionPromise, _activeElement, _viewTransitionStarted, _lastOperation, _FrameRedirector_instances, shouldSubmit_fn, shouldRedirect_fn, findFrameElement_fn, _prefetchedLink, _enable, _tryToPrefetchRequest, _cancelRequestIfObsolete, _cancelPrefetchRequest, _tryToUsePrefetchedRequest, _LinkPrefetchObserver_instances, cacheTtl_get, isPrefetchable_fn, _Navigator_instances, getActionForFormSubmission_fn, getDefaultAction_fn, _started, _PageRenderer_instances, setLanguage_fn, _MorphRenderer_instances, morphBody_fn, morphElements_fn, _shouldAddElement, _shouldMorphElement, _shouldUpdateAttribute, _didMorphElement, _shouldRemoveElement, reloadRemoteFrames_fn, renderFrameWithMorph_fn, _morphFrameUpdate, isFrameReloadedWithMorph_fn, remoteFrames_fn, _preloadAll, _Cache_instances, setCacheControl_fn, _pageRefreshDebouncePeriod, _currentFetchRequest, _resolveVisitPromise, _connected, _hasBeenLoaded, _ignoredAttributes, _FrameController_instances, loadSourceURL_fn, loadFrameResponse_fn, visit_fn, navigateFrame_fn, handleUnvisitableFrameResponse_fn, willHandleFrameMissingFromResponse_fn, handleFrameMissingFromResponse_fn, throwFrameMissingError_fn, visitResponse_fn, findFrameElement_fn2, formActionIsVisitable_fn, shouldInterceptNavigation_fn, isIgnoringChangesTo_fn, ignoringChangesToAttribute_fn, withCurrentNavigationElement_fn, _StreamElement_instances, raise_fn;
(function(prototype) {
  if (typeof prototype.requestSubmit == "function") return;
  prototype.requestSubmit = function(submitter) {
    if (submitter) {
      validateSubmitter(submitter, this);
      submitter.click();
    } else {
      submitter = document.createElement("input");
      submitter.type = "submit";
      submitter.hidden = true;
      this.appendChild(submitter);
      submitter.click();
      this.removeChild(submitter);
    }
  };
  function validateSubmitter(submitter, form) {
    submitter instanceof HTMLElement || raise(TypeError, "parameter 1 is not of type 'HTMLElement'");
    submitter.type == "submit" || raise(TypeError, "The specified element is not a submit button");
    submitter.form == form || raise(DOMException, "The specified element is not owned by this form element", "NotFoundError");
  }
  function raise(errorConstructor, message, name) {
    throw new errorConstructor("Failed to execute 'requestSubmit' on 'HTMLFormElement': " + message + ".", name);
  }
})(HTMLFormElement.prototype);
const submittersByForm = /* @__PURE__ */ new WeakMap();
function findSubmitterFromClickTarget(target) {
  const element = target instanceof Element ? target : target instanceof Node ? target.parentElement : null;
  const candidate = element ? element.closest("input, button") : null;
  return candidate?.type == "submit" ? candidate : null;
}
function clickCaptured(event) {
  const submitter = findSubmitterFromClickTarget(event.target);
  if (submitter && submitter.form) {
    submittersByForm.set(submitter.form, submitter);
  }
}
(function() {
  if ("submitter" in Event.prototype) return;
  let prototype = window.Event.prototype;
  if ("SubmitEvent" in window) {
    const prototypeOfSubmitEvent = window.SubmitEvent.prototype;
    if (/Apple Computer/.test(navigator.vendor) && !("submitter" in prototypeOfSubmitEvent)) {
      prototype = prototypeOfSubmitEvent;
    } else {
      return;
    }
  }
  addEventListener("click", clickCaptured, true);
  Object.defineProperty(prototype, "submitter", {
    get() {
      if (this.type == "submit" && this.target instanceof HTMLFormElement) {
        return submittersByForm.get(this.target);
      }
    }
  });
})();
const FrameLoadingStyle = {
  eager: "eager",
  lazy: "lazy"
};
const _FrameElement = class _FrameElement extends HTMLElement {
  constructor() {
    super();
    __publicField(this, "loaded", Promise.resolve());
    this.delegate = new _FrameElement.delegateConstructor(this);
  }
  static get observedAttributes() {
    return ["disabled", "loading", "src"];
  }
  connectedCallback() {
    this.delegate.connect();
  }
  disconnectedCallback() {
    this.delegate.disconnect();
  }
  reload() {
    return this.delegate.sourceURLReloaded();
  }
  attributeChangedCallback(name) {
    if (name == "loading") {
      this.delegate.loadingStyleChanged();
    } else if (name == "src") {
      this.delegate.sourceURLChanged();
    } else if (name == "disabled") {
      this.delegate.disabledChanged();
    }
  }
  /**
   * Gets the URL to lazily load source HTML from
   */
  get src() {
    return this.getAttribute("src");
  }
  /**
   * Sets the URL to lazily load source HTML from
   */
  set src(value) {
    if (value) {
      this.setAttribute("src", value);
    } else {
      this.removeAttribute("src");
    }
  }
  /**
   * Gets the refresh mode for the frame.
   */
  get refresh() {
    return this.getAttribute("refresh");
  }
  /**
   * Sets the refresh mode for the frame.
   */
  set refresh(value) {
    if (value) {
      this.setAttribute("refresh", value);
    } else {
      this.removeAttribute("refresh");
    }
  }
  /**
   * Determines if the element is loading
   */
  get loading() {
    return frameLoadingStyleFromString(this.getAttribute("loading") || "");
  }
  /**
   * Sets the value of if the element is loading
   */
  set loading(value) {
    if (value) {
      this.setAttribute("loading", value);
    } else {
      this.removeAttribute("loading");
    }
  }
  /**
   * Gets the disabled state of the frame.
   *
   * If disabled, no requests will be intercepted by the frame.
   */
  get disabled() {
    return this.hasAttribute("disabled");
  }
  /**
   * Sets the disabled state of the frame.
   *
   * If disabled, no requests will be intercepted by the frame.
   */
  set disabled(value) {
    if (value) {
      this.setAttribute("disabled", "");
    } else {
      this.removeAttribute("disabled");
    }
  }
  /**
   * Gets the autoscroll state of the frame.
   *
   * If true, the frame will be scrolled into view automatically on update.
   */
  get autoscroll() {
    return this.hasAttribute("autoscroll");
  }
  /**
   * Sets the autoscroll state of the frame.
   *
   * If true, the frame will be scrolled into view automatically on update.
   */
  set autoscroll(value) {
    if (value) {
      this.setAttribute("autoscroll", "");
    } else {
      this.removeAttribute("autoscroll");
    }
  }
  /**
   * Determines if the element has finished loading
   */
  get complete() {
    return !this.delegate.isLoading;
  }
  /**
   * Gets the active state of the frame.
   *
   * If inactive, source changes will not be observed.
   */
  get isActive() {
    return this.ownerDocument === document && !this.isPreview;
  }
  /**
   * Sets the active state of the frame.
   *
   * If inactive, source changes will not be observed.
   */
  get isPreview() {
    return this.ownerDocument?.documentElement?.hasAttribute("data-turbo-preview");
  }
};
__publicField(_FrameElement, "delegateConstructor");
let FrameElement = _FrameElement;
function frameLoadingStyleFromString(style) {
  switch (style.toLowerCase()) {
    case "lazy":
      return FrameLoadingStyle.lazy;
    default:
      return FrameLoadingStyle.eager;
  }
}
function expandURL(locatable) {
  return new URL(locatable.toString(), document.baseURI);
}
function getAnchor(url) {
  let anchorMatch;
  if (url.hash) {
    return url.hash.slice(1);
  } else if (anchorMatch = url.href.match(/#(.*)$/)) {
    return anchorMatch[1];
  }
}
function getAction$1(form, submitter) {
  const action = submitter?.getAttribute("formaction") || form.getAttribute("action") || form.action;
  return expandURL(action);
}
function getExtension(url) {
  return (getLastPathComponent(url).match(/\.[^.]*$/) || [])[0] || "";
}
function isHTML(url) {
  return !!getExtension(url).match(/^(?:|\.(?:htm|html|xhtml|php))$/);
}
function isPrefixedBy(baseURL, url) {
  const prefix = getPrefix(url);
  return baseURL.href === expandURL(prefix).href || baseURL.href.startsWith(prefix);
}
function locationIsVisitable(location2, rootLocation) {
  return isPrefixedBy(location2, rootLocation) && isHTML(location2);
}
function getRequestURL(url) {
  const anchor = getAnchor(url);
  return anchor != null ? url.href.slice(0, -(anchor.length + 1)) : url.href;
}
function toCacheKey(url) {
  return getRequestURL(url);
}
function urlsAreEqual(left, right) {
  return expandURL(left).href == expandURL(right).href;
}
function getPathComponents(url) {
  return url.pathname.split("/").slice(1);
}
function getLastPathComponent(url) {
  return getPathComponents(url).slice(-1)[0];
}
function getPrefix(url) {
  return addTrailingSlash(url.origin + url.pathname);
}
function addTrailingSlash(value) {
  return value.endsWith("/") ? value : value + "/";
}
class FetchResponse {
  constructor(response) {
    this.response = response;
  }
  get succeeded() {
    return this.response.ok;
  }
  get failed() {
    return !this.succeeded;
  }
  get clientError() {
    return this.statusCode >= 400 && this.statusCode <= 499;
  }
  get serverError() {
    return this.statusCode >= 500 && this.statusCode <= 599;
  }
  get redirected() {
    return this.response.redirected;
  }
  get location() {
    return expandURL(this.response.url);
  }
  get isHTML() {
    return this.contentType && this.contentType.match(/^(?:text\/([^\s;,]+\b)?html|application\/xhtml\+xml)\b/);
  }
  get statusCode() {
    return this.response.status;
  }
  get contentType() {
    return this.header("Content-Type");
  }
  get responseText() {
    return this.response.clone().text();
  }
  get responseHTML() {
    if (this.isHTML) {
      return this.response.clone().text();
    } else {
      return Promise.resolve(void 0);
    }
  }
  header(name) {
    return this.response.headers.get(name);
  }
}
function activateScriptElement(element) {
  if (element.getAttribute("data-turbo-eval") == "false") {
    return element;
  } else {
    const createdScriptElement = document.createElement("script");
    const cspNonce = getMetaContent("csp-nonce");
    if (cspNonce) {
      createdScriptElement.nonce = cspNonce;
    }
    createdScriptElement.textContent = element.textContent;
    createdScriptElement.async = false;
    copyElementAttributes(createdScriptElement, element);
    return createdScriptElement;
  }
}
function copyElementAttributes(destinationElement, sourceElement) {
  for (const { name, value } of sourceElement.attributes) {
    destinationElement.setAttribute(name, value);
  }
}
function createDocumentFragment(html) {
  const template = document.createElement("template");
  template.innerHTML = html;
  return template.content;
}
function dispatch(eventName, { target, cancelable, detail } = {}) {
  const event = new CustomEvent(eventName, {
    cancelable,
    bubbles: true,
    composed: true,
    detail
  });
  if (target && target.isConnected) {
    target.dispatchEvent(event);
  } else {
    document.documentElement.dispatchEvent(event);
  }
  return event;
}
function nextRepaint() {
  if (document.visibilityState === "hidden") {
    return nextEventLoopTick();
  } else {
    return nextAnimationFrame();
  }
}
function nextAnimationFrame() {
  return new Promise((resolve) => requestAnimationFrame(() => resolve()));
}
function nextEventLoopTick() {
  return new Promise((resolve) => setTimeout(() => resolve(), 0));
}
function nextMicrotask() {
  return Promise.resolve();
}
function parseHTMLDocument(html = "") {
  return new DOMParser().parseFromString(html, "text/html");
}
function unindent(strings, ...values) {
  const lines = interpolate(strings, values).replace(/^\n/, "").split("\n");
  const match = lines[0].match(/^\s+/);
  const indent = match ? match[0].length : 0;
  return lines.map((line) => line.slice(indent)).join("\n");
}
function interpolate(strings, values) {
  return strings.reduce((result, string, i) => {
    const value = values[i] == void 0 ? "" : values[i];
    return result + string + value;
  }, "");
}
function uuid() {
  return Array.from({ length: 36 }).map((_, i) => {
    if (i == 8 || i == 13 || i == 18 || i == 23) {
      return "-";
    } else if (i == 14) {
      return "4";
    } else if (i == 19) {
      return (Math.floor(Math.random() * 4) + 8).toString(16);
    } else {
      return Math.floor(Math.random() * 15).toString(16);
    }
  }).join("");
}
function getAttribute(attributeName, ...elements) {
  for (const value of elements.map((element) => element?.getAttribute(attributeName))) {
    if (typeof value == "string") return value;
  }
  return null;
}
function hasAttribute(attributeName, ...elements) {
  return elements.some((element) => element && element.hasAttribute(attributeName));
}
function markAsBusy(...elements) {
  for (const element of elements) {
    if (element.localName == "turbo-frame") {
      element.setAttribute("busy", "");
    }
    element.setAttribute("aria-busy", "true");
  }
}
function clearBusyState(...elements) {
  for (const element of elements) {
    if (element.localName == "turbo-frame") {
      element.removeAttribute("busy");
    }
    element.removeAttribute("aria-busy");
  }
}
function waitForLoad(element, timeoutInMilliseconds = 2e3) {
  return new Promise((resolve) => {
    const onComplete = () => {
      element.removeEventListener("error", onComplete);
      element.removeEventListener("load", onComplete);
      resolve();
    };
    element.addEventListener("load", onComplete, { once: true });
    element.addEventListener("error", onComplete, { once: true });
    setTimeout(resolve, timeoutInMilliseconds);
  });
}
function getHistoryMethodForAction(action) {
  switch (action) {
    case "replace":
      return history.replaceState;
    case "advance":
    case "restore":
      return history.pushState;
  }
}
function isAction(action) {
  return action == "advance" || action == "replace" || action == "restore";
}
function getVisitAction(...elements) {
  const action = getAttribute("data-turbo-action", ...elements);
  return isAction(action) ? action : null;
}
function getMetaElement(name) {
  return document.querySelector(`meta[name="${name}"]`);
}
function getMetaContent(name) {
  const element = getMetaElement(name);
  return element && element.content;
}
function setMetaContent(name, content) {
  let element = getMetaElement(name);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute("name", name);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
  return element;
}
function findClosestRecursively(element, selector) {
  if (element instanceof Element) {
    return element.closest(selector) || findClosestRecursively(element.assignedSlot || element.getRootNode()?.host, selector);
  }
}
function elementIsFocusable(element) {
  const inertDisabledOrHidden = "[inert], :disabled, [hidden], details:not([open]), dialog:not([open])";
  return !!element && element.closest(inertDisabledOrHidden) == null && typeof element.focus == "function";
}
function queryAutofocusableElement(elementOrDocumentFragment) {
  return Array.from(elementOrDocumentFragment.querySelectorAll("[autofocus]")).find(elementIsFocusable);
}
async function around(callback, reader) {
  const before = reader();
  callback();
  await nextAnimationFrame();
  const after = reader();
  return [before, after];
}
function doesNotTargetIFrame(anchor) {
  if (anchor.hasAttribute("target")) {
    for (const element of document.getElementsByName(anchor.target)) {
      if (element instanceof HTMLIFrameElement) return false;
    }
  }
  return true;
}
function findLinkFromClickTarget(target) {
  return findClosestRecursively(target, "a[href]:not([target^=_]):not([download])");
}
function getLocationForLink(link) {
  return expandURL(link.getAttribute("href") || "");
}
function debounce(fn, delay) {
  let timeoutId = null;
  return (...args) => {
    const callback = () => fn.apply(this, args);
    clearTimeout(timeoutId);
    timeoutId = setTimeout(callback, delay);
  };
}
class LimitedSet extends Set {
  constructor(maxSize) {
    super();
    this.maxSize = maxSize;
  }
  add(value) {
    if (this.size >= this.maxSize) {
      const iterator = this.values();
      const oldestValue = iterator.next().value;
      this.delete(oldestValue);
    }
    super.add(value);
  }
}
const recentRequests = new LimitedSet(20);
const nativeFetch = window.fetch;
function fetchWithTurboHeaders(url, options = {}) {
  const modifiedHeaders = new Headers(options.headers || {});
  const requestUID = uuid();
  recentRequests.add(requestUID);
  modifiedHeaders.append("X-Turbo-Request-Id", requestUID);
  return nativeFetch(url, {
    ...options,
    headers: modifiedHeaders
  });
}
function fetchMethodFromString(method) {
  switch (method.toLowerCase()) {
    case "get":
      return FetchMethod.get;
    case "post":
      return FetchMethod.post;
    case "put":
      return FetchMethod.put;
    case "patch":
      return FetchMethod.patch;
    case "delete":
      return FetchMethod.delete;
  }
}
const FetchMethod = {
  get: "get",
  post: "post",
  put: "put",
  patch: "patch",
  delete: "delete"
};
function fetchEnctypeFromString(encoding) {
  switch (encoding.toLowerCase()) {
    case FetchEnctype.multipart:
      return FetchEnctype.multipart;
    case FetchEnctype.plain:
      return FetchEnctype.plain;
    default:
      return FetchEnctype.urlEncoded;
  }
}
const FetchEnctype = {
  urlEncoded: "application/x-www-form-urlencoded",
  multipart: "multipart/form-data",
  plain: "text/plain"
};
class FetchRequest {
  constructor(delegate, method, location2, requestBody = new URLSearchParams(), target = null, enctype = FetchEnctype.urlEncoded) {
    __privateAdd(this, _FetchRequest_instances);
    __publicField(this, "abortController", new AbortController());
    __privateAdd(this, _resolveRequestPromise, (_value) => {
    });
    const [url, body] = buildResourceAndBody(expandURL(location2), method, requestBody, enctype);
    this.delegate = delegate;
    this.url = url;
    this.target = target;
    this.fetchOptions = {
      credentials: "same-origin",
      redirect: "follow",
      method,
      headers: { ...this.defaultHeaders },
      body,
      signal: this.abortSignal,
      referrer: this.delegate.referrer?.href
    };
    this.enctype = enctype;
  }
  get method() {
    return this.fetchOptions.method;
  }
  set method(value) {
    const fetchBody = this.isSafe ? this.url.searchParams : this.fetchOptions.body || new FormData();
    const fetchMethod = fetchMethodFromString(value) || FetchMethod.get;
    this.url.search = "";
    const [url, body] = buildResourceAndBody(this.url, fetchMethod, fetchBody, this.enctype);
    this.url = url;
    this.fetchOptions.body = body;
    this.fetchOptions.method = fetchMethod;
  }
  get headers() {
    return this.fetchOptions.headers;
  }
  set headers(value) {
    this.fetchOptions.headers = value;
  }
  get body() {
    if (this.isSafe) {
      return this.url.searchParams;
    } else {
      return this.fetchOptions.body;
    }
  }
  set body(value) {
    this.fetchOptions.body = value;
  }
  get location() {
    return this.url;
  }
  get params() {
    return this.url.searchParams;
  }
  get entries() {
    return this.body ? Array.from(this.body.entries()) : [];
  }
  cancel() {
    this.abortController.abort();
  }
  async perform() {
    const { fetchOptions } = this;
    this.delegate.prepareRequest(this);
    const event = await __privateMethod(this, _FetchRequest_instances, allowRequestToBeIntercepted_fn).call(this, fetchOptions);
    try {
      this.delegate.requestStarted(this);
      if (event.detail.fetchRequest) {
        this.response = event.detail.fetchRequest.response;
      } else {
        this.response = fetchWithTurboHeaders(this.url.href, fetchOptions);
      }
      const response = await this.response;
      return await this.receive(response);
    } catch (error) {
      if (error.name !== "AbortError") {
        if (__privateMethod(this, _FetchRequest_instances, willDelegateErrorHandling_fn).call(this, error)) {
          this.delegate.requestErrored(this, error);
        }
        throw error;
      }
    } finally {
      this.delegate.requestFinished(this);
    }
  }
  async receive(response) {
    const fetchResponse = new FetchResponse(response);
    const event = dispatch("turbo:before-fetch-response", {
      cancelable: true,
      detail: { fetchResponse },
      target: this.target
    });
    if (event.defaultPrevented) {
      this.delegate.requestPreventedHandlingResponse(this, fetchResponse);
    } else if (fetchResponse.succeeded) {
      this.delegate.requestSucceededWithResponse(this, fetchResponse);
    } else {
      this.delegate.requestFailedWithResponse(this, fetchResponse);
    }
    return fetchResponse;
  }
  get defaultHeaders() {
    return {
      Accept: "text/html, application/xhtml+xml"
    };
  }
  get isSafe() {
    return isSafe(this.method);
  }
  get abortSignal() {
    return this.abortController.signal;
  }
  acceptResponseType(mimeType) {
    this.headers["Accept"] = [mimeType, this.headers["Accept"]].join(", ");
  }
}
_resolveRequestPromise = new WeakMap();
_FetchRequest_instances = new WeakSet();
allowRequestToBeIntercepted_fn = async function(fetchOptions) {
  const requestInterception = new Promise((resolve) => __privateSet(this, _resolveRequestPromise, resolve));
  const event = dispatch("turbo:before-fetch-request", {
    cancelable: true,
    detail: {
      fetchOptions,
      url: this.url,
      resume: __privateGet(this, _resolveRequestPromise)
    },
    target: this.target
  });
  this.url = event.detail.url;
  if (event.defaultPrevented) await requestInterception;
  return event;
};
willDelegateErrorHandling_fn = function(error) {
  const event = dispatch("turbo:fetch-request-error", {
    target: this.target,
    cancelable: true,
    detail: { request: this, error }
  });
  return !event.defaultPrevented;
};
function isSafe(fetchMethod) {
  return fetchMethodFromString(fetchMethod) == FetchMethod.get;
}
function buildResourceAndBody(resource, method, requestBody, enctype) {
  const searchParams = Array.from(requestBody).length > 0 ? new URLSearchParams(entriesExcludingFiles(requestBody)) : resource.searchParams;
  if (isSafe(method)) {
    return [mergeIntoURLSearchParams(resource, searchParams), null];
  } else if (enctype == FetchEnctype.urlEncoded) {
    return [resource, searchParams];
  } else {
    return [resource, requestBody];
  }
}
function entriesExcludingFiles(requestBody) {
  const entries = [];
  for (const [name, value] of requestBody) {
    if (value instanceof File) continue;
    else entries.push([name, value]);
  }
  return entries;
}
function mergeIntoURLSearchParams(url, requestBody) {
  const searchParams = new URLSearchParams(entriesExcludingFiles(requestBody));
  url.search = searchParams.toString();
  return url;
}
class AppearanceObserver {
  constructor(delegate, element) {
    __publicField(this, "started", false);
    __publicField(this, "intersect", (entries) => {
      const lastEntry = entries.slice(-1)[0];
      if (lastEntry?.isIntersecting) {
        this.delegate.elementAppearedInViewport(this.element);
      }
    });
    this.delegate = delegate;
    this.element = element;
    this.intersectionObserver = new IntersectionObserver(this.intersect);
  }
  start() {
    if (!this.started) {
      this.started = true;
      this.intersectionObserver.observe(this.element);
    }
  }
  stop() {
    if (this.started) {
      this.started = false;
      this.intersectionObserver.unobserve(this.element);
    }
  }
}
class StreamMessage {
  static wrap(message) {
    if (typeof message == "string") {
      return new this(createDocumentFragment(message));
    } else {
      return message;
    }
  }
  constructor(fragment) {
    this.fragment = importStreamElements(fragment);
  }
}
__publicField(StreamMessage, "contentType", "text/vnd.turbo-stream.html");
function importStreamElements(fragment) {
  for (const element of fragment.querySelectorAll("turbo-stream")) {
    const streamElement = document.importNode(element, true);
    for (const inertScriptElement of streamElement.templateElement.content.querySelectorAll("script")) {
      inertScriptElement.replaceWith(activateScriptElement(inertScriptElement));
    }
    element.replaceWith(streamElement);
  }
  return fragment;
}
const PREFETCH_DELAY = 100;
class PrefetchCache {
  constructor() {
    __privateAdd(this, _prefetchTimeout, null);
    __privateAdd(this, _prefetched, null);
  }
  get(url) {
    if (__privateGet(this, _prefetched) && __privateGet(this, _prefetched).url === url && __privateGet(this, _prefetched).expire > Date.now()) {
      return __privateGet(this, _prefetched).request;
    }
  }
  setLater(url, request, ttl) {
    this.clear();
    __privateSet(this, _prefetchTimeout, setTimeout(() => {
      request.perform();
      this.set(url, request, ttl);
      __privateSet(this, _prefetchTimeout, null);
    }, PREFETCH_DELAY));
  }
  set(url, request, ttl) {
    __privateSet(this, _prefetched, { url, request, expire: new Date((/* @__PURE__ */ new Date()).getTime() + ttl) });
  }
  clear() {
    if (__privateGet(this, _prefetchTimeout)) clearTimeout(__privateGet(this, _prefetchTimeout));
    __privateSet(this, _prefetched, null);
  }
}
_prefetchTimeout = new WeakMap();
_prefetched = new WeakMap();
const cacheTtl = 10 * 1e3;
const prefetchCache = new PrefetchCache();
const FormSubmissionState = {
  initialized: "initialized",
  requesting: "requesting",
  waiting: "waiting",
  receiving: "receiving",
  stopping: "stopping",
  stopped: "stopped"
};
class FormSubmission {
  constructor(delegate, formElement, submitter, mustRedirect = false) {
    __publicField(this, "state", FormSubmissionState.initialized);
    const method = getMethod(formElement, submitter);
    const action = getAction(getFormAction(formElement, submitter), method);
    const body = buildFormData(formElement, submitter);
    const enctype = getEnctype(formElement, submitter);
    this.delegate = delegate;
    this.formElement = formElement;
    this.submitter = submitter;
    this.fetchRequest = new FetchRequest(this, method, action, body, formElement, enctype);
    this.mustRedirect = mustRedirect;
  }
  static confirmMethod(message, _element, _submitter) {
    return Promise.resolve(confirm(message));
  }
  get method() {
    return this.fetchRequest.method;
  }
  set method(value) {
    this.fetchRequest.method = value;
  }
  get action() {
    return this.fetchRequest.url.toString();
  }
  set action(value) {
    this.fetchRequest.url = expandURL(value);
  }
  get body() {
    return this.fetchRequest.body;
  }
  get enctype() {
    return this.fetchRequest.enctype;
  }
  get isSafe() {
    return this.fetchRequest.isSafe;
  }
  get location() {
    return this.fetchRequest.url;
  }
  // The submission process
  async start() {
    const { initialized, requesting } = FormSubmissionState;
    const confirmationMessage = getAttribute("data-turbo-confirm", this.submitter, this.formElement);
    if (typeof confirmationMessage === "string") {
      const answer = await FormSubmission.confirmMethod(confirmationMessage, this.formElement, this.submitter);
      if (!answer) {
        return;
      }
    }
    if (this.state == initialized) {
      this.state = requesting;
      return this.fetchRequest.perform();
    }
  }
  stop() {
    const { stopping, stopped } = FormSubmissionState;
    if (this.state != stopping && this.state != stopped) {
      this.state = stopping;
      this.fetchRequest.cancel();
      return true;
    }
  }
  // Fetch request delegate
  prepareRequest(request) {
    if (!request.isSafe) {
      const token = getCookieValue(getMetaContent("csrf-param")) || getMetaContent("csrf-token");
      if (token) {
        request.headers["X-CSRF-Token"] = token;
      }
    }
    if (this.requestAcceptsTurboStreamResponse(request)) {
      request.acceptResponseType(StreamMessage.contentType);
    }
  }
  requestStarted(_request) {
    this.state = FormSubmissionState.waiting;
    this.submitter?.setAttribute("disabled", "");
    this.setSubmitsWith();
    markAsBusy(this.formElement);
    dispatch("turbo:submit-start", {
      target: this.formElement,
      detail: { formSubmission: this }
    });
    this.delegate.formSubmissionStarted(this);
  }
  requestPreventedHandlingResponse(request, response) {
    prefetchCache.clear();
    this.result = { success: response.succeeded, fetchResponse: response };
  }
  requestSucceededWithResponse(request, response) {
    if (response.clientError || response.serverError) {
      this.delegate.formSubmissionFailedWithResponse(this, response);
      return;
    }
    prefetchCache.clear();
    if (this.requestMustRedirect(request) && responseSucceededWithoutRedirect(response)) {
      const error = new Error("Form responses must redirect to another location");
      this.delegate.formSubmissionErrored(this, error);
    } else {
      this.state = FormSubmissionState.receiving;
      this.result = { success: true, fetchResponse: response };
      this.delegate.formSubmissionSucceededWithResponse(this, response);
    }
  }
  requestFailedWithResponse(request, response) {
    this.result = { success: false, fetchResponse: response };
    this.delegate.formSubmissionFailedWithResponse(this, response);
  }
  requestErrored(request, error) {
    this.result = { success: false, error };
    this.delegate.formSubmissionErrored(this, error);
  }
  requestFinished(_request) {
    this.state = FormSubmissionState.stopped;
    this.submitter?.removeAttribute("disabled");
    this.resetSubmitterText();
    clearBusyState(this.formElement);
    dispatch("turbo:submit-end", {
      target: this.formElement,
      detail: { formSubmission: this, ...this.result }
    });
    this.delegate.formSubmissionFinished(this);
  }
  // Private
  setSubmitsWith() {
    if (!this.submitter || !this.submitsWith) return;
    if (this.submitter.matches("button")) {
      this.originalSubmitText = this.submitter.innerHTML;
      this.submitter.innerHTML = this.submitsWith;
    } else if (this.submitter.matches("input")) {
      const input = this.submitter;
      this.originalSubmitText = input.value;
      input.value = this.submitsWith;
    }
  }
  resetSubmitterText() {
    if (!this.submitter || !this.originalSubmitText) return;
    if (this.submitter.matches("button")) {
      this.submitter.innerHTML = this.originalSubmitText;
    } else if (this.submitter.matches("input")) {
      const input = this.submitter;
      input.value = this.originalSubmitText;
    }
  }
  requestMustRedirect(request) {
    return !request.isSafe && this.mustRedirect;
  }
  requestAcceptsTurboStreamResponse(request) {
    return !request.isSafe || hasAttribute("data-turbo-stream", this.submitter, this.formElement);
  }
  get submitsWith() {
    return this.submitter?.getAttribute("data-turbo-submits-with");
  }
}
function buildFormData(formElement, submitter) {
  const formData = new FormData(formElement);
  const name = submitter?.getAttribute("name");
  const value = submitter?.getAttribute("value");
  if (name) {
    formData.append(name, value || "");
  }
  return formData;
}
function getCookieValue(cookieName) {
  if (cookieName != null) {
    const cookies = document.cookie ? document.cookie.split("; ") : [];
    const cookie = cookies.find((cookie2) => cookie2.startsWith(cookieName));
    if (cookie) {
      const value = cookie.split("=").slice(1).join("=");
      return value ? decodeURIComponent(value) : void 0;
    }
  }
}
function responseSucceededWithoutRedirect(response) {
  return response.statusCode == 200 && !response.redirected;
}
function getFormAction(formElement, submitter) {
  const formElementAction = typeof formElement.action === "string" ? formElement.action : null;
  if (submitter?.hasAttribute("formaction")) {
    return submitter.getAttribute("formaction") || "";
  } else {
    return formElement.getAttribute("action") || formElementAction || "";
  }
}
function getAction(formAction, fetchMethod) {
  const action = expandURL(formAction);
  if (isSafe(fetchMethod)) {
    action.search = "";
  }
  return action;
}
function getMethod(formElement, submitter) {
  const method = submitter?.getAttribute("formmethod") || formElement.getAttribute("method") || "";
  return fetchMethodFromString(method.toLowerCase()) || FetchMethod.get;
}
function getEnctype(formElement, submitter) {
  return fetchEnctypeFromString(submitter?.getAttribute("formenctype") || formElement.enctype);
}
class Snapshot {
  constructor(element) {
    this.element = element;
  }
  get activeElement() {
    return this.element.ownerDocument.activeElement;
  }
  get children() {
    return [...this.element.children];
  }
  hasAnchor(anchor) {
    return this.getElementForAnchor(anchor) != null;
  }
  getElementForAnchor(anchor) {
    return anchor ? this.element.querySelector(`[id='${anchor}'], a[name='${anchor}']`) : null;
  }
  get isConnected() {
    return this.element.isConnected;
  }
  get firstAutofocusableElement() {
    return queryAutofocusableElement(this.element);
  }
  get permanentElements() {
    return queryPermanentElementsAll(this.element);
  }
  getPermanentElementById(id) {
    return getPermanentElementById(this.element, id);
  }
  getPermanentElementMapForSnapshot(snapshot) {
    const permanentElementMap = {};
    for (const currentPermanentElement of this.permanentElements) {
      const { id } = currentPermanentElement;
      const newPermanentElement = snapshot.getPermanentElementById(id);
      if (newPermanentElement) {
        permanentElementMap[id] = [currentPermanentElement, newPermanentElement];
      }
    }
    return permanentElementMap;
  }
}
function getPermanentElementById(node, id) {
  return node.querySelector(`#${id}[data-turbo-permanent]`);
}
function queryPermanentElementsAll(node) {
  return node.querySelectorAll("[id][data-turbo-permanent]");
}
class FormSubmitObserver {
  constructor(delegate, eventTarget) {
    __publicField(this, "started", false);
    __publicField(this, "submitCaptured", () => {
      this.eventTarget.removeEventListener("submit", this.submitBubbled, false);
      this.eventTarget.addEventListener("submit", this.submitBubbled, false);
    });
    __publicField(this, "submitBubbled", (event) => {
      if (!event.defaultPrevented) {
        const form = event.target instanceof HTMLFormElement ? event.target : void 0;
        const submitter = event.submitter || void 0;
        if (form && submissionDoesNotDismissDialog(form, submitter) && submissionDoesNotTargetIFrame(form, submitter) && this.delegate.willSubmitForm(form, submitter)) {
          event.preventDefault();
          event.stopImmediatePropagation();
          this.delegate.formSubmitted(form, submitter);
        }
      }
    });
    this.delegate = delegate;
    this.eventTarget = eventTarget;
  }
  start() {
    if (!this.started) {
      this.eventTarget.addEventListener("submit", this.submitCaptured, true);
      this.started = true;
    }
  }
  stop() {
    if (this.started) {
      this.eventTarget.removeEventListener("submit", this.submitCaptured, true);
      this.started = false;
    }
  }
}
function submissionDoesNotDismissDialog(form, submitter) {
  const method = submitter?.getAttribute("formmethod") || form.getAttribute("method");
  return method != "dialog";
}
function submissionDoesNotTargetIFrame(form, submitter) {
  if (submitter?.hasAttribute("formtarget") || form.hasAttribute("target")) {
    const target = submitter?.getAttribute("formtarget") || form.target;
    for (const element of document.getElementsByName(target)) {
      if (element instanceof HTMLIFrameElement) return false;
    }
    return true;
  } else {
    return true;
  }
}
class View {
  constructor(delegate, element) {
    __privateAdd(this, _resolveRenderPromise, (_value) => {
    });
    __privateAdd(this, _resolveInterceptionPromise, (_value) => {
    });
    this.delegate = delegate;
    this.element = element;
  }
  // Scrolling
  scrollToAnchor(anchor) {
    const element = this.snapshot.getElementForAnchor(anchor);
    if (element) {
      this.scrollToElement(element);
      this.focusElement(element);
    } else {
      this.scrollToPosition({ x: 0, y: 0 });
    }
  }
  scrollToAnchorFromLocation(location2) {
    this.scrollToAnchor(getAnchor(location2));
  }
  scrollToElement(element) {
    element.scrollIntoView();
  }
  focusElement(element) {
    if (element instanceof HTMLElement) {
      if (element.hasAttribute("tabindex")) {
        element.focus();
      } else {
        element.setAttribute("tabindex", "-1");
        element.focus();
        element.removeAttribute("tabindex");
      }
    }
  }
  scrollToPosition({ x, y }) {
    this.scrollRoot.scrollTo(x, y);
  }
  scrollToTop() {
    this.scrollToPosition({ x: 0, y: 0 });
  }
  get scrollRoot() {
    return window;
  }
  // Rendering
  async render(renderer) {
    const { isPreview, shouldRender, willRender, newSnapshot: snapshot } = renderer;
    const shouldInvalidate = willRender;
    if (shouldRender) {
      try {
        this.renderPromise = new Promise((resolve) => __privateSet(this, _resolveRenderPromise, resolve));
        this.renderer = renderer;
        await this.prepareToRenderSnapshot(renderer);
        const renderInterception = new Promise((resolve) => __privateSet(this, _resolveInterceptionPromise, resolve));
        const options = { resume: __privateGet(this, _resolveInterceptionPromise), render: this.renderer.renderElement, renderMethod: this.renderer.renderMethod };
        const immediateRender = this.delegate.allowsImmediateRender(snapshot, options);
        if (!immediateRender) await renderInterception;
        await this.renderSnapshot(renderer);
        this.delegate.viewRenderedSnapshot(snapshot, isPreview, this.renderer.renderMethod);
        this.delegate.preloadOnLoadLinksForView(this.element);
        this.finishRenderingSnapshot(renderer);
      } finally {
        delete this.renderer;
        __privateGet(this, _resolveRenderPromise).call(this, void 0);
        delete this.renderPromise;
      }
    } else if (shouldInvalidate) {
      this.invalidate(renderer.reloadReason);
    }
  }
  invalidate(reason) {
    this.delegate.viewInvalidated(reason);
  }
  async prepareToRenderSnapshot(renderer) {
    this.markAsPreview(renderer.isPreview);
    await renderer.prepareToRender();
  }
  markAsPreview(isPreview) {
    if (isPreview) {
      this.element.setAttribute("data-turbo-preview", "");
    } else {
      this.element.removeAttribute("data-turbo-preview");
    }
  }
  markVisitDirection(direction) {
    this.element.setAttribute("data-turbo-visit-direction", direction);
  }
  unmarkVisitDirection() {
    this.element.removeAttribute("data-turbo-visit-direction");
  }
  async renderSnapshot(renderer) {
    await renderer.render();
  }
  finishRenderingSnapshot(renderer) {
    renderer.finishRendering();
  }
}
_resolveRenderPromise = new WeakMap();
_resolveInterceptionPromise = new WeakMap();
class FrameView extends View {
  missing() {
    this.element.innerHTML = `<strong class="turbo-frame-error">Content missing</strong>`;
  }
  get snapshot() {
    return new Snapshot(this.element);
  }
}
class LinkInterceptor {
  constructor(delegate, element) {
    __publicField(this, "clickBubbled", (event) => {
      if (this.respondsToEventTarget(event.target)) {
        this.clickEvent = event;
      } else {
        delete this.clickEvent;
      }
    });
    __publicField(this, "linkClicked", (event) => {
      if (this.clickEvent && this.respondsToEventTarget(event.target) && event.target instanceof Element) {
        if (this.delegate.shouldInterceptLinkClick(event.target, event.detail.url, event.detail.originalEvent)) {
          this.clickEvent.preventDefault();
          event.preventDefault();
          this.delegate.linkClickIntercepted(event.target, event.detail.url, event.detail.originalEvent);
        }
      }
      delete this.clickEvent;
    });
    __publicField(this, "willVisit", (_event) => {
      delete this.clickEvent;
    });
    this.delegate = delegate;
    this.element = element;
  }
  start() {
    this.element.addEventListener("click", this.clickBubbled);
    document.addEventListener("turbo:click", this.linkClicked);
    document.addEventListener("turbo:before-visit", this.willVisit);
  }
  stop() {
    this.element.removeEventListener("click", this.clickBubbled);
    document.removeEventListener("turbo:click", this.linkClicked);
    document.removeEventListener("turbo:before-visit", this.willVisit);
  }
  respondsToEventTarget(target) {
    const element = target instanceof Element ? target : target instanceof Node ? target.parentElement : null;
    return element && element.closest("turbo-frame, html") == this.element;
  }
}
class LinkClickObserver {
  constructor(delegate, eventTarget) {
    __publicField(this, "started", false);
    __publicField(this, "clickCaptured", () => {
      this.eventTarget.removeEventListener("click", this.clickBubbled, false);
      this.eventTarget.addEventListener("click", this.clickBubbled, false);
    });
    __publicField(this, "clickBubbled", (event) => {
      if (event instanceof MouseEvent && this.clickEventIsSignificant(event)) {
        const target = event.composedPath && event.composedPath()[0] || event.target;
        const link = findLinkFromClickTarget(target);
        if (link && doesNotTargetIFrame(link)) {
          const location2 = getLocationForLink(link);
          if (this.delegate.willFollowLinkToLocation(link, location2, event)) {
            event.preventDefault();
            this.delegate.followedLinkToLocation(link, location2);
          }
        }
      }
    });
    this.delegate = delegate;
    this.eventTarget = eventTarget;
  }
  start() {
    if (!this.started) {
      this.eventTarget.addEventListener("click", this.clickCaptured, true);
      this.started = true;
    }
  }
  stop() {
    if (this.started) {
      this.eventTarget.removeEventListener("click", this.clickCaptured, true);
      this.started = false;
    }
  }
  clickEventIsSignificant(event) {
    return !(event.target && event.target.isContentEditable || event.defaultPrevented || event.which > 1 || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey);
  }
}
class FormLinkClickObserver {
  constructor(delegate, element) {
    this.delegate = delegate;
    this.linkInterceptor = new LinkClickObserver(this, element);
  }
  start() {
    this.linkInterceptor.start();
  }
  stop() {
    this.linkInterceptor.stop();
  }
  // Link hover observer delegate
  canPrefetchRequestToLocation(link, location2) {
    return false;
  }
  prefetchAndCacheRequestToLocation(link, location2) {
    return;
  }
  // Link click observer delegate
  willFollowLinkToLocation(link, location2, originalEvent) {
    return this.delegate.willSubmitFormLinkToLocation(link, location2, originalEvent) && (link.hasAttribute("data-turbo-method") || link.hasAttribute("data-turbo-stream"));
  }
  followedLinkToLocation(link, location2) {
    const form = document.createElement("form");
    const type = "hidden";
    for (const [name, value] of location2.searchParams) {
      form.append(Object.assign(document.createElement("input"), { type, name, value }));
    }
    const action = Object.assign(location2, { search: "" });
    form.setAttribute("data-turbo", "true");
    form.setAttribute("action", action.href);
    form.setAttribute("hidden", "");
    const method = link.getAttribute("data-turbo-method");
    if (method) form.setAttribute("method", method);
    const turboFrame = link.getAttribute("data-turbo-frame");
    if (turboFrame) form.setAttribute("data-turbo-frame", turboFrame);
    const turboAction = getVisitAction(link);
    if (turboAction) form.setAttribute("data-turbo-action", turboAction);
    const turboConfirm = link.getAttribute("data-turbo-confirm");
    if (turboConfirm) form.setAttribute("data-turbo-confirm", turboConfirm);
    const turboStream = link.hasAttribute("data-turbo-stream");
    if (turboStream) form.setAttribute("data-turbo-stream", "");
    this.delegate.submittedFormLinkToLocation(link, location2, form);
    document.body.appendChild(form);
    form.addEventListener("turbo:submit-end", () => form.remove(), { once: true });
    requestAnimationFrame(() => form.requestSubmit());
  }
}
class Bardo {
  static async preservingPermanentElements(delegate, permanentElementMap, callback) {
    const bardo = new this(delegate, permanentElementMap);
    bardo.enter();
    await callback();
    bardo.leave();
  }
  constructor(delegate, permanentElementMap) {
    this.delegate = delegate;
    this.permanentElementMap = permanentElementMap;
  }
  enter() {
    for (const id in this.permanentElementMap) {
      const [currentPermanentElement, newPermanentElement] = this.permanentElementMap[id];
      this.delegate.enteringBardo(currentPermanentElement, newPermanentElement);
      this.replaceNewPermanentElementWithPlaceholder(newPermanentElement);
    }
  }
  leave() {
    for (const id in this.permanentElementMap) {
      const [currentPermanentElement] = this.permanentElementMap[id];
      this.replaceCurrentPermanentElementWithClone(currentPermanentElement);
      this.replacePlaceholderWithPermanentElement(currentPermanentElement);
      this.delegate.leavingBardo(currentPermanentElement);
    }
  }
  replaceNewPermanentElementWithPlaceholder(permanentElement) {
    const placeholder = createPlaceholderForPermanentElement(permanentElement);
    permanentElement.replaceWith(placeholder);
  }
  replaceCurrentPermanentElementWithClone(permanentElement) {
    const clone = permanentElement.cloneNode(true);
    permanentElement.replaceWith(clone);
  }
  replacePlaceholderWithPermanentElement(permanentElement) {
    const placeholder = this.getPlaceholderById(permanentElement.id);
    placeholder?.replaceWith(permanentElement);
  }
  getPlaceholderById(id) {
    return this.placeholders.find((element) => element.content == id);
  }
  get placeholders() {
    return [...document.querySelectorAll("meta[name=turbo-permanent-placeholder][content]")];
  }
}
function createPlaceholderForPermanentElement(permanentElement) {
  const element = document.createElement("meta");
  element.setAttribute("name", "turbo-permanent-placeholder");
  element.setAttribute("content", permanentElement.id);
  return element;
}
class Renderer {
  constructor(currentSnapshot, newSnapshot, renderElement, isPreview, willRender = true) {
    __privateAdd(this, _activeElement, null);
    this.currentSnapshot = currentSnapshot;
    this.newSnapshot = newSnapshot;
    this.isPreview = isPreview;
    this.willRender = willRender;
    this.renderElement = renderElement;
    this.promise = new Promise((resolve, reject) => this.resolvingFunctions = { resolve, reject });
  }
  get shouldRender() {
    return true;
  }
  get reloadReason() {
    return;
  }
  prepareToRender() {
    return;
  }
  render() {
  }
  finishRendering() {
    if (this.resolvingFunctions) {
      this.resolvingFunctions.resolve();
      delete this.resolvingFunctions;
    }
  }
  async preservingPermanentElements(callback) {
    await Bardo.preservingPermanentElements(this, this.permanentElementMap, callback);
  }
  focusFirstAutofocusableElement() {
    const element = this.connectedSnapshot.firstAutofocusableElement;
    if (element) {
      element.focus();
    }
  }
  // Bardo delegate
  enteringBardo(currentPermanentElement) {
    if (__privateGet(this, _activeElement)) return;
    if (currentPermanentElement.contains(this.currentSnapshot.activeElement)) {
      __privateSet(this, _activeElement, this.currentSnapshot.activeElement);
    }
  }
  leavingBardo(currentPermanentElement) {
    if (currentPermanentElement.contains(__privateGet(this, _activeElement)) && __privateGet(this, _activeElement) instanceof HTMLElement) {
      __privateGet(this, _activeElement).focus();
      __privateSet(this, _activeElement, null);
    }
  }
  get connectedSnapshot() {
    return this.newSnapshot.isConnected ? this.newSnapshot : this.currentSnapshot;
  }
  get currentElement() {
    return this.currentSnapshot.element;
  }
  get newElement() {
    return this.newSnapshot.element;
  }
  get permanentElementMap() {
    return this.currentSnapshot.getPermanentElementMapForSnapshot(this.newSnapshot);
  }
  get renderMethod() {
    return "replace";
  }
}
_activeElement = new WeakMap();
class FrameRenderer extends Renderer {
  static renderElement(currentElement, newElement) {
    const destinationRange = document.createRange();
    destinationRange.selectNodeContents(currentElement);
    destinationRange.deleteContents();
    const frameElement = newElement;
    const sourceRange = frameElement.ownerDocument?.createRange();
    if (sourceRange) {
      sourceRange.selectNodeContents(frameElement);
      currentElement.appendChild(sourceRange.extractContents());
    }
  }
  constructor(delegate, currentSnapshot, newSnapshot, renderElement, isPreview, willRender = true) {
    super(currentSnapshot, newSnapshot, renderElement, isPreview, willRender);
    this.delegate = delegate;
  }
  get shouldRender() {
    return true;
  }
  async render() {
    await nextRepaint();
    this.preservingPermanentElements(() => {
      this.loadFrameElement();
    });
    this.scrollFrameIntoView();
    await nextRepaint();
    this.focusFirstAutofocusableElement();
    await nextRepaint();
    this.activateScriptElements();
  }
  loadFrameElement() {
    this.delegate.willRenderFrame(this.currentElement, this.newElement);
    this.renderElement(this.currentElement, this.newElement);
  }
  scrollFrameIntoView() {
    if (this.currentElement.autoscroll || this.newElement.autoscroll) {
      const element = this.currentElement.firstElementChild;
      const block = readScrollLogicalPosition(this.currentElement.getAttribute("data-autoscroll-block"), "end");
      const behavior = readScrollBehavior(this.currentElement.getAttribute("data-autoscroll-behavior"), "auto");
      if (element) {
        element.scrollIntoView({ block, behavior });
        return true;
      }
    }
    return false;
  }
  activateScriptElements() {
    for (const inertScriptElement of this.newScriptElements) {
      const activatedScriptElement = activateScriptElement(inertScriptElement);
      inertScriptElement.replaceWith(activatedScriptElement);
    }
  }
  get newScriptElements() {
    return this.currentElement.querySelectorAll("script");
  }
}
function readScrollLogicalPosition(value, defaultValue) {
  if (value == "end" || value == "start" || value == "center" || value == "nearest") {
    return value;
  } else {
    return defaultValue;
  }
}
function readScrollBehavior(value, defaultValue) {
  if (value == "auto" || value == "smooth") {
    return value;
  } else {
    return defaultValue;
  }
}
const _ProgressBar = class _ProgressBar {
  constructor() {
    __publicField(this, "hiding", false);
    __publicField(this, "value", 0);
    __publicField(this, "visible", false);
    __publicField(this, "trickle", () => {
      this.setValue(this.value + Math.random() / 100);
    });
    this.stylesheetElement = this.createStylesheetElement();
    this.progressElement = this.createProgressElement();
    this.installStylesheetElement();
    this.setValue(0);
  }
  /*ms*/
  static get defaultCSS() {
    return unindent`
      .turbo-progress-bar {
        position: fixed;
        display: block;
        top: 0;
        left: 0;
        height: 3px;
        background: #0076ff;
        z-index: 2147483647;
        transition:
          width ${_ProgressBar.animationDuration}ms ease-out,
          opacity ${_ProgressBar.animationDuration / 2}ms ${_ProgressBar.animationDuration / 2}ms ease-in;
        transform: translate3d(0, 0, 0);
      }
    `;
  }
  show() {
    if (!this.visible) {
      this.visible = true;
      this.installProgressElement();
      this.startTrickling();
    }
  }
  hide() {
    if (this.visible && !this.hiding) {
      this.hiding = true;
      this.fadeProgressElement(() => {
        this.uninstallProgressElement();
        this.stopTrickling();
        this.visible = false;
        this.hiding = false;
      });
    }
  }
  setValue(value) {
    this.value = value;
    this.refresh();
  }
  // Private
  installStylesheetElement() {
    document.head.insertBefore(this.stylesheetElement, document.head.firstChild);
  }
  installProgressElement() {
    this.progressElement.style.width = "0";
    this.progressElement.style.opacity = "1";
    document.documentElement.insertBefore(this.progressElement, document.body);
    this.refresh();
  }
  fadeProgressElement(callback) {
    this.progressElement.style.opacity = "0";
    setTimeout(callback, _ProgressBar.animationDuration * 1.5);
  }
  uninstallProgressElement() {
    if (this.progressElement.parentNode) {
      document.documentElement.removeChild(this.progressElement);
    }
  }
  startTrickling() {
    if (!this.trickleInterval) {
      this.trickleInterval = window.setInterval(this.trickle, _ProgressBar.animationDuration);
    }
  }
  stopTrickling() {
    window.clearInterval(this.trickleInterval);
    delete this.trickleInterval;
  }
  refresh() {
    requestAnimationFrame(() => {
      this.progressElement.style.width = `${10 + this.value * 90}%`;
    });
  }
  createStylesheetElement() {
    const element = document.createElement("style");
    element.type = "text/css";
    element.textContent = _ProgressBar.defaultCSS;
    if (this.cspNonce) {
      element.nonce = this.cspNonce;
    }
    return element;
  }
  createProgressElement() {
    const element = document.createElement("div");
    element.className = "turbo-progress-bar";
    return element;
  }
  get cspNonce() {
    return getMetaContent("csp-nonce");
  }
};
__publicField(_ProgressBar, "animationDuration", 300);
let ProgressBar = _ProgressBar;
class HeadSnapshot extends Snapshot {
  constructor() {
    super(...arguments);
    __publicField(this, "detailsByOuterHTML", this.children.filter((element) => !elementIsNoscript(element)).map((element) => elementWithoutNonce(element)).reduce((result, element) => {
      const { outerHTML } = element;
      const details = outerHTML in result ? result[outerHTML] : {
        type: elementType(element),
        tracked: elementIsTracked(element),
        elements: []
      };
      return {
        ...result,
        [outerHTML]: {
          ...details,
          elements: [...details.elements, element]
        }
      };
    }, {}));
  }
  get trackedElementSignature() {
    return Object.keys(this.detailsByOuterHTML).filter((outerHTML) => this.detailsByOuterHTML[outerHTML].tracked).join("");
  }
  getScriptElementsNotInSnapshot(snapshot) {
    return this.getElementsMatchingTypeNotInSnapshot("script", snapshot);
  }
  getStylesheetElementsNotInSnapshot(snapshot) {
    return this.getElementsMatchingTypeNotInSnapshot("stylesheet", snapshot);
  }
  getElementsMatchingTypeNotInSnapshot(matchedType, snapshot) {
    return Object.keys(this.detailsByOuterHTML).filter((outerHTML) => !(outerHTML in snapshot.detailsByOuterHTML)).map((outerHTML) => this.detailsByOuterHTML[outerHTML]).filter(({ type }) => type == matchedType).map(({ elements: [element] }) => element);
  }
  get provisionalElements() {
    return Object.keys(this.detailsByOuterHTML).reduce((result, outerHTML) => {
      const { type, tracked, elements } = this.detailsByOuterHTML[outerHTML];
      if (type == null && !tracked) {
        return [...result, ...elements];
      } else if (elements.length > 1) {
        return [...result, ...elements.slice(1)];
      } else {
        return result;
      }
    }, []);
  }
  getMetaValue(name) {
    const element = this.findMetaElementByName(name);
    return element ? element.getAttribute("content") : null;
  }
  findMetaElementByName(name) {
    return Object.keys(this.detailsByOuterHTML).reduce((result, outerHTML) => {
      const {
        elements: [element]
      } = this.detailsByOuterHTML[outerHTML];
      return elementIsMetaElementWithName(element, name) ? element : result;
    }, void 0 | void 0);
  }
}
function elementType(element) {
  if (elementIsScript(element)) {
    return "script";
  } else if (elementIsStylesheet(element)) {
    return "stylesheet";
  }
}
function elementIsTracked(element) {
  return element.getAttribute("data-turbo-track") == "reload";
}
function elementIsScript(element) {
  const tagName = element.localName;
  return tagName == "script";
}
function elementIsNoscript(element) {
  const tagName = element.localName;
  return tagName == "noscript";
}
function elementIsStylesheet(element) {
  const tagName = element.localName;
  return tagName == "style" || tagName == "link" && element.getAttribute("rel") == "stylesheet";
}
function elementIsMetaElementWithName(element, name) {
  const tagName = element.localName;
  return tagName == "meta" && element.getAttribute("name") == name;
}
function elementWithoutNonce(element) {
  if (element.hasAttribute("nonce")) {
    element.setAttribute("nonce", "");
  }
  return element;
}
class PageSnapshot extends Snapshot {
  static fromHTMLString(html = "") {
    return this.fromDocument(parseHTMLDocument(html));
  }
  static fromElement(element) {
    return this.fromDocument(element.ownerDocument);
  }
  static fromDocument({ documentElement, body, head }) {
    return new this(documentElement, body, new HeadSnapshot(head));
  }
  constructor(documentElement, body, headSnapshot) {
    super(body);
    this.documentElement = documentElement;
    this.headSnapshot = headSnapshot;
  }
  clone() {
    const clonedElement = this.element.cloneNode(true);
    const selectElements = this.element.querySelectorAll("select");
    const clonedSelectElements = clonedElement.querySelectorAll("select");
    for (const [index, source] of selectElements.entries()) {
      const clone = clonedSelectElements[index];
      for (const option of clone.selectedOptions) option.selected = false;
      for (const option of source.selectedOptions) clone.options[option.index].selected = true;
    }
    for (const clonedPasswordInput of clonedElement.querySelectorAll('input[type="password"]')) {
      clonedPasswordInput.value = "";
    }
    return new PageSnapshot(this.documentElement, clonedElement, this.headSnapshot);
  }
  get lang() {
    return this.documentElement.getAttribute("lang");
  }
  get headElement() {
    return this.headSnapshot.element;
  }
  get rootLocation() {
    const root = this.getSetting("root") ?? "/";
    return expandURL(root);
  }
  get cacheControlValue() {
    return this.getSetting("cache-control");
  }
  get isPreviewable() {
    return this.cacheControlValue != "no-preview";
  }
  get isCacheable() {
    return this.cacheControlValue != "no-cache";
  }
  get isVisitable() {
    return this.getSetting("visit-control") != "reload";
  }
  get prefersViewTransitions() {
    return this.headSnapshot.getMetaValue("view-transition") === "same-origin";
  }
  get shouldMorphPage() {
    return this.getSetting("refresh-method") === "morph";
  }
  get shouldPreserveScrollPosition() {
    return this.getSetting("refresh-scroll") === "preserve";
  }
  // Private
  getSetting(name) {
    return this.headSnapshot.getMetaValue(`turbo-${name}`);
  }
}
class ViewTransitioner {
  constructor() {
    __privateAdd(this, _viewTransitionStarted, false);
    __privateAdd(this, _lastOperation, Promise.resolve());
  }
  renderChange(useViewTransition, render) {
    if (useViewTransition && this.viewTransitionsAvailable && !__privateGet(this, _viewTransitionStarted)) {
      __privateSet(this, _viewTransitionStarted, true);
      __privateSet(this, _lastOperation, __privateGet(this, _lastOperation).then(async () => {
        await document.startViewTransition(render).finished;
      }));
    } else {
      __privateSet(this, _lastOperation, __privateGet(this, _lastOperation).then(render));
    }
    return __privateGet(this, _lastOperation);
  }
  get viewTransitionsAvailable() {
    return document.startViewTransition;
  }
}
_viewTransitionStarted = new WeakMap();
_lastOperation = new WeakMap();
const defaultOptions = {
  action: "advance",
  historyChanged: false,
  visitCachedSnapshot: () => {
  },
  willRender: true,
  updateHistory: true,
  shouldCacheSnapshot: true,
  acceptsStreamResponse: false
};
const TimingMetric = {
  visitStart: "visitStart",
  requestStart: "requestStart",
  requestEnd: "requestEnd",
  visitEnd: "visitEnd"
};
const VisitState = {
  initialized: "initialized",
  started: "started",
  canceled: "canceled",
  failed: "failed",
  completed: "completed"
};
const SystemStatusCode = {
  networkFailure: 0,
  timeoutFailure: -1,
  contentTypeMismatch: -2
};
const Direction = {
  advance: "forward",
  restore: "back",
  replace: "none"
};
class Visit {
  constructor(delegate, location2, restorationIdentifier, options = {}) {
    __publicField(this, "identifier", uuid());
    // Required by turbo-ios
    __publicField(this, "timingMetrics", {});
    __publicField(this, "followedRedirect", false);
    __publicField(this, "historyChanged", false);
    __publicField(this, "scrolled", false);
    __publicField(this, "shouldCacheSnapshot", true);
    __publicField(this, "acceptsStreamResponse", false);
    __publicField(this, "snapshotCached", false);
    __publicField(this, "state", VisitState.initialized);
    __publicField(this, "viewTransitioner", new ViewTransitioner());
    this.delegate = delegate;
    this.location = location2;
    this.restorationIdentifier = restorationIdentifier || uuid();
    const {
      action,
      historyChanged,
      referrer,
      snapshot,
      snapshotHTML,
      response,
      visitCachedSnapshot,
      willRender,
      updateHistory,
      shouldCacheSnapshot,
      acceptsStreamResponse,
      direction
    } = {
      ...defaultOptions,
      ...options
    };
    this.action = action;
    this.historyChanged = historyChanged;
    this.referrer = referrer;
    this.snapshot = snapshot;
    this.snapshotHTML = snapshotHTML;
    this.response = response;
    this.isSamePage = this.delegate.locationWithActionIsSamePage(this.location, this.action);
    this.isPageRefresh = this.view.isPageRefresh(this);
    this.visitCachedSnapshot = visitCachedSnapshot;
    this.willRender = willRender;
    this.updateHistory = updateHistory;
    this.scrolled = !willRender;
    this.shouldCacheSnapshot = shouldCacheSnapshot;
    this.acceptsStreamResponse = acceptsStreamResponse;
    this.direction = direction || Direction[action];
  }
  get adapter() {
    return this.delegate.adapter;
  }
  get view() {
    return this.delegate.view;
  }
  get history() {
    return this.delegate.history;
  }
  get restorationData() {
    return this.history.getRestorationDataForIdentifier(this.restorationIdentifier);
  }
  get silent() {
    return this.isSamePage;
  }
  start() {
    if (this.state == VisitState.initialized) {
      this.recordTimingMetric(TimingMetric.visitStart);
      this.state = VisitState.started;
      this.adapter.visitStarted(this);
      this.delegate.visitStarted(this);
    }
  }
  cancel() {
    if (this.state == VisitState.started) {
      if (this.request) {
        this.request.cancel();
      }
      this.cancelRender();
      this.state = VisitState.canceled;
    }
  }
  complete() {
    if (this.state == VisitState.started) {
      this.recordTimingMetric(TimingMetric.visitEnd);
      this.adapter.visitCompleted(this);
      this.state = VisitState.completed;
      this.followRedirect();
      if (!this.followedRedirect) {
        this.delegate.visitCompleted(this);
      }
    }
  }
  fail() {
    if (this.state == VisitState.started) {
      this.state = VisitState.failed;
      this.adapter.visitFailed(this);
      this.delegate.visitCompleted(this);
    }
  }
  changeHistory() {
    if (!this.historyChanged && this.updateHistory) {
      const actionForHistory = this.location.href === this.referrer?.href ? "replace" : this.action;
      const method = getHistoryMethodForAction(actionForHistory);
      this.history.update(method, this.location, this.restorationIdentifier);
      this.historyChanged = true;
    }
  }
  issueRequest() {
    if (this.hasPreloadedResponse()) {
      this.simulateRequest();
    } else if (this.shouldIssueRequest() && !this.request) {
      this.request = new FetchRequest(this, FetchMethod.get, this.location);
      this.request.perform();
    }
  }
  simulateRequest() {
    if (this.response) {
      this.startRequest();
      this.recordResponse();
      this.finishRequest();
    }
  }
  startRequest() {
    this.recordTimingMetric(TimingMetric.requestStart);
    this.adapter.visitRequestStarted(this);
  }
  recordResponse(response = this.response) {
    this.response = response;
    if (response) {
      const { statusCode } = response;
      if (isSuccessful(statusCode)) {
        this.adapter.visitRequestCompleted(this);
      } else {
        this.adapter.visitRequestFailedWithStatusCode(this, statusCode);
      }
    }
  }
  finishRequest() {
    this.recordTimingMetric(TimingMetric.requestEnd);
    this.adapter.visitRequestFinished(this);
  }
  loadResponse() {
    if (this.response) {
      const { statusCode, responseHTML } = this.response;
      this.render(async () => {
        if (this.shouldCacheSnapshot) this.cacheSnapshot();
        if (this.view.renderPromise) await this.view.renderPromise;
        if (isSuccessful(statusCode) && responseHTML != null) {
          const snapshot = PageSnapshot.fromHTMLString(responseHTML);
          await this.renderPageSnapshot(snapshot, false);
          this.adapter.visitRendered(this);
          this.complete();
        } else {
          await this.view.renderError(PageSnapshot.fromHTMLString(responseHTML), this);
          this.adapter.visitRendered(this);
          this.fail();
        }
      });
    }
  }
  getCachedSnapshot() {
    const snapshot = this.view.getCachedSnapshotForLocation(this.location) || this.getPreloadedSnapshot();
    if (snapshot && (!getAnchor(this.location) || snapshot.hasAnchor(getAnchor(this.location)))) {
      if (this.action == "restore" || snapshot.isPreviewable) {
        return snapshot;
      }
    }
  }
  getPreloadedSnapshot() {
    if (this.snapshotHTML) {
      return PageSnapshot.fromHTMLString(this.snapshotHTML);
    }
  }
  hasCachedSnapshot() {
    return this.getCachedSnapshot() != null;
  }
  loadCachedSnapshot() {
    const snapshot = this.getCachedSnapshot();
    if (snapshot) {
      const isPreview = this.shouldIssueRequest();
      this.render(async () => {
        this.cacheSnapshot();
        if (this.isSamePage || this.isPageRefresh) {
          this.adapter.visitRendered(this);
        } else {
          if (this.view.renderPromise) await this.view.renderPromise;
          await this.renderPageSnapshot(snapshot, isPreview);
          this.adapter.visitRendered(this);
          if (!isPreview) {
            this.complete();
          }
        }
      });
    }
  }
  followRedirect() {
    if (this.redirectedToLocation && !this.followedRedirect && this.response?.redirected) {
      this.adapter.visitProposedToLocation(this.redirectedToLocation, {
        action: "replace",
        response: this.response,
        shouldCacheSnapshot: false,
        willRender: false
      });
      this.followedRedirect = true;
    }
  }
  goToSamePageAnchor() {
    if (this.isSamePage) {
      this.render(async () => {
        this.cacheSnapshot();
        this.performScroll();
        this.changeHistory();
        this.adapter.visitRendered(this);
      });
    }
  }
  // Fetch request delegate
  prepareRequest(request) {
    if (this.acceptsStreamResponse) {
      request.acceptResponseType(StreamMessage.contentType);
    }
  }
  requestStarted() {
    this.startRequest();
  }
  requestPreventedHandlingResponse(_request, _response) {
  }
  async requestSucceededWithResponse(request, response) {
    const responseHTML = await response.responseHTML;
    const { redirected, statusCode } = response;
    if (responseHTML == void 0) {
      this.recordResponse({
        statusCode: SystemStatusCode.contentTypeMismatch,
        redirected
      });
    } else {
      this.redirectedToLocation = response.redirected ? response.location : void 0;
      this.recordResponse({ statusCode, responseHTML, redirected });
    }
  }
  async requestFailedWithResponse(request, response) {
    const responseHTML = await response.responseHTML;
    const { redirected, statusCode } = response;
    if (responseHTML == void 0) {
      this.recordResponse({
        statusCode: SystemStatusCode.contentTypeMismatch,
        redirected
      });
    } else {
      this.recordResponse({ statusCode, responseHTML, redirected });
    }
  }
  requestErrored(_request, _error) {
    this.recordResponse({
      statusCode: SystemStatusCode.networkFailure,
      redirected: false
    });
  }
  requestFinished() {
    this.finishRequest();
  }
  // Scrolling
  performScroll() {
    if (!this.scrolled && !this.view.forceReloaded && !this.view.shouldPreserveScrollPosition(this)) {
      if (this.action == "restore") {
        this.scrollToRestoredPosition() || this.scrollToAnchor() || this.view.scrollToTop();
      } else {
        this.scrollToAnchor() || this.view.scrollToTop();
      }
      if (this.isSamePage) {
        this.delegate.visitScrolledToSamePageLocation(this.view.lastRenderedLocation, this.location);
      }
      this.scrolled = true;
    }
  }
  scrollToRestoredPosition() {
    const { scrollPosition } = this.restorationData;
    if (scrollPosition) {
      this.view.scrollToPosition(scrollPosition);
      return true;
    }
  }
  scrollToAnchor() {
    const anchor = getAnchor(this.location);
    if (anchor != null) {
      this.view.scrollToAnchor(anchor);
      return true;
    }
  }
  // Instrumentation
  recordTimingMetric(metric) {
    this.timingMetrics[metric] = (/* @__PURE__ */ new Date()).getTime();
  }
  getTimingMetrics() {
    return { ...this.timingMetrics };
  }
  // Private
  getHistoryMethodForAction(action) {
    switch (action) {
      case "replace":
        return history.replaceState;
      case "advance":
      case "restore":
        return history.pushState;
    }
  }
  hasPreloadedResponse() {
    return typeof this.response == "object";
  }
  shouldIssueRequest() {
    if (this.isSamePage) {
      return false;
    } else if (this.action == "restore") {
      return !this.hasCachedSnapshot();
    } else {
      return this.willRender;
    }
  }
  cacheSnapshot() {
    if (!this.snapshotCached) {
      this.view.cacheSnapshot(this.snapshot).then((snapshot) => snapshot && this.visitCachedSnapshot(snapshot));
      this.snapshotCached = true;
    }
  }
  async render(callback) {
    this.cancelRender();
    this.frame = await nextRepaint();
    await callback();
    delete this.frame;
  }
  async renderPageSnapshot(snapshot, isPreview) {
    await this.viewTransitioner.renderChange(this.view.shouldTransitionTo(snapshot), async () => {
      await this.view.renderPage(snapshot, isPreview, this.willRender, this);
      this.performScroll();
    });
  }
  cancelRender() {
    if (this.frame) {
      cancelAnimationFrame(this.frame);
      delete this.frame;
    }
  }
}
function isSuccessful(statusCode) {
  return statusCode >= 200 && statusCode < 300;
}
class BrowserAdapter {
  constructor(session2) {
    __publicField(this, "progressBar", new ProgressBar());
    __publicField(this, "showProgressBar", () => {
      this.progressBar.show();
    });
    this.session = session2;
  }
  visitProposedToLocation(location2, options) {
    if (locationIsVisitable(location2, this.navigator.rootLocation)) {
      this.navigator.startVisit(location2, options?.restorationIdentifier || uuid(), options);
    } else {
      window.location.href = location2.toString();
    }
  }
  visitStarted(visit2) {
    this.location = visit2.location;
    visit2.loadCachedSnapshot();
    visit2.issueRequest();
    visit2.goToSamePageAnchor();
  }
  visitRequestStarted(visit2) {
    this.progressBar.setValue(0);
    if (visit2.hasCachedSnapshot() || visit2.action != "restore") {
      this.showVisitProgressBarAfterDelay();
    } else {
      this.showProgressBar();
    }
  }
  visitRequestCompleted(visit2) {
    visit2.loadResponse();
  }
  visitRequestFailedWithStatusCode(visit2, statusCode) {
    switch (statusCode) {
      case SystemStatusCode.networkFailure:
      case SystemStatusCode.timeoutFailure:
      case SystemStatusCode.contentTypeMismatch:
        return this.reload({
          reason: "request_failed",
          context: {
            statusCode
          }
        });
      default:
        return visit2.loadResponse();
    }
  }
  visitRequestFinished(_visit) {
  }
  visitCompleted(_visit) {
    this.progressBar.setValue(1);
    this.hideVisitProgressBar();
  }
  pageInvalidated(reason) {
    this.reload(reason);
  }
  visitFailed(_visit) {
    this.progressBar.setValue(1);
    this.hideVisitProgressBar();
  }
  visitRendered(_visit) {
  }
  // Form Submission Delegate
  formSubmissionStarted(_formSubmission) {
    this.progressBar.setValue(0);
    this.showFormProgressBarAfterDelay();
  }
  formSubmissionFinished(_formSubmission) {
    this.progressBar.setValue(1);
    this.hideFormProgressBar();
  }
  // Private
  showVisitProgressBarAfterDelay() {
    this.visitProgressBarTimeout = window.setTimeout(this.showProgressBar, this.session.progressBarDelay);
  }
  hideVisitProgressBar() {
    this.progressBar.hide();
    if (this.visitProgressBarTimeout != null) {
      window.clearTimeout(this.visitProgressBarTimeout);
      delete this.visitProgressBarTimeout;
    }
  }
  showFormProgressBarAfterDelay() {
    if (this.formProgressBarTimeout == null) {
      this.formProgressBarTimeout = window.setTimeout(this.showProgressBar, this.session.progressBarDelay);
    }
  }
  hideFormProgressBar() {
    this.progressBar.hide();
    if (this.formProgressBarTimeout != null) {
      window.clearTimeout(this.formProgressBarTimeout);
      delete this.formProgressBarTimeout;
    }
  }
  reload(reason) {
    dispatch("turbo:reload", { detail: reason });
    window.location.href = this.location?.toString() || window.location.href;
  }
  get navigator() {
    return this.session.navigator;
  }
}
class CacheObserver {
  constructor() {
    __publicField(this, "selector", "[data-turbo-temporary]");
    __publicField(this, "deprecatedSelector", "[data-turbo-cache=false]");
    __publicField(this, "started", false);
    __publicField(this, "removeTemporaryElements", (_event) => {
      for (const element of this.temporaryElements) {
        element.remove();
      }
    });
  }
  start() {
    if (!this.started) {
      this.started = true;
      addEventListener("turbo:before-cache", this.removeTemporaryElements, false);
    }
  }
  stop() {
    if (this.started) {
      this.started = false;
      removeEventListener("turbo:before-cache", this.removeTemporaryElements, false);
    }
  }
  get temporaryElements() {
    return [...document.querySelectorAll(this.selector), ...this.temporaryElementsWithDeprecation];
  }
  get temporaryElementsWithDeprecation() {
    const elements = document.querySelectorAll(this.deprecatedSelector);
    if (elements.length) {
      console.warn(
        `The ${this.deprecatedSelector} selector is deprecated and will be removed in a future version. Use ${this.selector} instead.`
      );
    }
    return [...elements];
  }
}
class FrameRedirector {
  constructor(session2, element) {
    __privateAdd(this, _FrameRedirector_instances);
    this.session = session2;
    this.element = element;
    this.linkInterceptor = new LinkInterceptor(this, element);
    this.formSubmitObserver = new FormSubmitObserver(this, element);
  }
  start() {
    this.linkInterceptor.start();
    this.formSubmitObserver.start();
  }
  stop() {
    this.linkInterceptor.stop();
    this.formSubmitObserver.stop();
  }
  // Link interceptor delegate
  shouldInterceptLinkClick(element, _location, _event) {
    return __privateMethod(this, _FrameRedirector_instances, shouldRedirect_fn).call(this, element);
  }
  linkClickIntercepted(element, url, event) {
    const frame = __privateMethod(this, _FrameRedirector_instances, findFrameElement_fn).call(this, element);
    if (frame) {
      frame.delegate.linkClickIntercepted(element, url, event);
    }
  }
  // Form submit observer delegate
  willSubmitForm(element, submitter) {
    return element.closest("turbo-frame") == null && __privateMethod(this, _FrameRedirector_instances, shouldSubmit_fn).call(this, element, submitter) && __privateMethod(this, _FrameRedirector_instances, shouldRedirect_fn).call(this, element, submitter);
  }
  formSubmitted(element, submitter) {
    const frame = __privateMethod(this, _FrameRedirector_instances, findFrameElement_fn).call(this, element, submitter);
    if (frame) {
      frame.delegate.formSubmitted(element, submitter);
    }
  }
}
_FrameRedirector_instances = new WeakSet();
shouldSubmit_fn = function(form, submitter) {
  const action = getAction$1(form, submitter);
  const meta = this.element.ownerDocument.querySelector(`meta[name="turbo-root"]`);
  const rootLocation = expandURL(meta?.content ?? "/");
  return __privateMethod(this, _FrameRedirector_instances, shouldRedirect_fn).call(this, form, submitter) && locationIsVisitable(action, rootLocation);
};
shouldRedirect_fn = function(element, submitter) {
  const isNavigatable = element instanceof HTMLFormElement ? this.session.submissionIsNavigatable(element, submitter) : this.session.elementIsNavigatable(element);
  if (isNavigatable) {
    const frame = __privateMethod(this, _FrameRedirector_instances, findFrameElement_fn).call(this, element, submitter);
    return frame ? frame != element.closest("turbo-frame") : false;
  } else {
    return false;
  }
};
findFrameElement_fn = function(element, submitter) {
  const id = submitter?.getAttribute("data-turbo-frame") || element.getAttribute("data-turbo-frame");
  if (id && id != "_top") {
    const frame = this.element.querySelector(`#${id}:not([disabled])`);
    if (frame instanceof FrameElement) {
      return frame;
    }
  }
};
class History {
  constructor(delegate) {
    __publicField(this, "location");
    __publicField(this, "restorationIdentifier", uuid());
    __publicField(this, "restorationData", {});
    __publicField(this, "started", false);
    __publicField(this, "pageLoaded", false);
    __publicField(this, "currentIndex", 0);
    // Event handlers
    __publicField(this, "onPopState", (event) => {
      if (this.shouldHandlePopState()) {
        const { turbo } = event.state || {};
        if (turbo) {
          this.location = new URL(window.location.href);
          const { restorationIdentifier, restorationIndex } = turbo;
          this.restorationIdentifier = restorationIdentifier;
          const direction = restorationIndex > this.currentIndex ? "forward" : "back";
          this.delegate.historyPoppedToLocationWithRestorationIdentifierAndDirection(this.location, restorationIdentifier, direction);
          this.currentIndex = restorationIndex;
        }
      }
    });
    __publicField(this, "onPageLoad", async (_event) => {
      await nextMicrotask();
      this.pageLoaded = true;
    });
    this.delegate = delegate;
  }
  start() {
    if (!this.started) {
      addEventListener("popstate", this.onPopState, false);
      addEventListener("load", this.onPageLoad, false);
      this.currentIndex = history.state?.turbo?.restorationIndex || 0;
      this.started = true;
      this.replace(new URL(window.location.href));
    }
  }
  stop() {
    if (this.started) {
      removeEventListener("popstate", this.onPopState, false);
      removeEventListener("load", this.onPageLoad, false);
      this.started = false;
    }
  }
  push(location2, restorationIdentifier) {
    this.update(history.pushState, location2, restorationIdentifier);
  }
  replace(location2, restorationIdentifier) {
    this.update(history.replaceState, location2, restorationIdentifier);
  }
  update(method, location2, restorationIdentifier = uuid()) {
    if (method === history.pushState) ++this.currentIndex;
    const state = { turbo: { restorationIdentifier, restorationIndex: this.currentIndex } };
    method.call(history, state, "", location2.href);
    this.location = location2;
    this.restorationIdentifier = restorationIdentifier;
  }
  // Restoration data
  getRestorationDataForIdentifier(restorationIdentifier) {
    return this.restorationData[restorationIdentifier] || {};
  }
  updateRestorationData(additionalData) {
    const { restorationIdentifier } = this;
    const restorationData = this.restorationData[restorationIdentifier];
    this.restorationData[restorationIdentifier] = {
      ...restorationData,
      ...additionalData
    };
  }
  // Scroll restoration
  assumeControlOfScrollRestoration() {
    if (!this.previousScrollRestoration) {
      this.previousScrollRestoration = history.scrollRestoration ?? "auto";
      history.scrollRestoration = "manual";
    }
  }
  relinquishControlOfScrollRestoration() {
    if (this.previousScrollRestoration) {
      history.scrollRestoration = this.previousScrollRestoration;
      delete this.previousScrollRestoration;
    }
  }
  // Private
  shouldHandlePopState() {
    return this.pageIsLoaded();
  }
  pageIsLoaded() {
    return this.pageLoaded || document.readyState == "complete";
  }
}
class LinkPrefetchObserver {
  constructor(delegate, eventTarget) {
    __privateAdd(this, _LinkPrefetchObserver_instances);
    __publicField(this, "started", false);
    __privateAdd(this, _prefetchedLink, null);
    __privateAdd(this, _enable, () => {
      this.eventTarget.addEventListener("mouseenter", __privateGet(this, _tryToPrefetchRequest), {
        capture: true,
        passive: true
      });
      this.eventTarget.addEventListener("mouseleave", __privateGet(this, _cancelRequestIfObsolete), {
        capture: true,
        passive: true
      });
      this.eventTarget.addEventListener("turbo:before-fetch-request", __privateGet(this, _tryToUsePrefetchedRequest), true);
      this.started = true;
    });
    __privateAdd(this, _tryToPrefetchRequest, (event) => {
      if (getMetaContent("turbo-prefetch") === "false") return;
      const target = event.target;
      const isLink = target.matches && target.matches("a[href]:not([target^=_]):not([download])");
      if (isLink && __privateMethod(this, _LinkPrefetchObserver_instances, isPrefetchable_fn).call(this, target)) {
        const link = target;
        const location2 = getLocationForLink(link);
        if (this.delegate.canPrefetchRequestToLocation(link, location2)) {
          __privateSet(this, _prefetchedLink, link);
          const fetchRequest = new FetchRequest(
            this,
            FetchMethod.get,
            location2,
            new URLSearchParams(),
            target
          );
          prefetchCache.setLater(location2.toString(), fetchRequest, __privateGet(this, _LinkPrefetchObserver_instances, cacheTtl_get));
        }
      }
    });
    __privateAdd(this, _cancelRequestIfObsolete, (event) => {
      if (event.target === __privateGet(this, _prefetchedLink)) __privateGet(this, _cancelPrefetchRequest).call(this);
    });
    __privateAdd(this, _cancelPrefetchRequest, () => {
      prefetchCache.clear();
      __privateSet(this, _prefetchedLink, null);
    });
    __privateAdd(this, _tryToUsePrefetchedRequest, (event) => {
      if (event.target.tagName !== "FORM" && event.detail.fetchOptions.method === "get") {
        const cached = prefetchCache.get(event.detail.url.toString());
        if (cached) {
          event.detail.fetchRequest = cached;
        }
        prefetchCache.clear();
      }
    });
    this.delegate = delegate;
    this.eventTarget = eventTarget;
  }
  start() {
    if (this.started) return;
    if (this.eventTarget.readyState === "loading") {
      this.eventTarget.addEventListener("DOMContentLoaded", __privateGet(this, _enable), { once: true });
    } else {
      __privateGet(this, _enable).call(this);
    }
  }
  stop() {
    if (!this.started) return;
    this.eventTarget.removeEventListener("mouseenter", __privateGet(this, _tryToPrefetchRequest), {
      capture: true,
      passive: true
    });
    this.eventTarget.removeEventListener("mouseleave", __privateGet(this, _cancelRequestIfObsolete), {
      capture: true,
      passive: true
    });
    this.eventTarget.removeEventListener("turbo:before-fetch-request", __privateGet(this, _tryToUsePrefetchedRequest), true);
    this.started = false;
  }
  prepareRequest(request) {
    const link = request.target;
    request.headers["X-Sec-Purpose"] = "prefetch";
    const turboFrame = link.closest("turbo-frame");
    const turboFrameTarget = link.getAttribute("data-turbo-frame") || turboFrame?.getAttribute("target") || turboFrame?.id;
    if (turboFrameTarget && turboFrameTarget !== "_top") {
      request.headers["Turbo-Frame"] = turboFrameTarget;
    }
  }
  // Fetch request interface
  requestSucceededWithResponse() {
  }
  requestStarted(fetchRequest) {
  }
  requestErrored(fetchRequest) {
  }
  requestFinished(fetchRequest) {
  }
  requestPreventedHandlingResponse(fetchRequest, fetchResponse) {
  }
  requestFailedWithResponse(fetchRequest, fetchResponse) {
  }
}
_prefetchedLink = new WeakMap();
_enable = new WeakMap();
_tryToPrefetchRequest = new WeakMap();
_cancelRequestIfObsolete = new WeakMap();
_cancelPrefetchRequest = new WeakMap();
_tryToUsePrefetchedRequest = new WeakMap();
_LinkPrefetchObserver_instances = new WeakSet();
cacheTtl_get = function() {
  return Number(getMetaContent("turbo-prefetch-cache-time")) || cacheTtl;
};
isPrefetchable_fn = function(link) {
  const href = link.getAttribute("href");
  if (!href) return false;
  if (unfetchableLink(link)) return false;
  if (linkToTheSamePage(link)) return false;
  if (linkOptsOut(link)) return false;
  if (nonSafeLink(link)) return false;
  if (eventPrevented(link)) return false;
  return true;
};
const unfetchableLink = (link) => {
  return link.origin !== document.location.origin || !["http:", "https:"].includes(link.protocol) || link.hasAttribute("target");
};
const linkToTheSamePage = (link) => {
  return link.pathname + link.search === document.location.pathname + document.location.search || link.href.startsWith("#");
};
const linkOptsOut = (link) => {
  if (link.getAttribute("data-turbo-prefetch") === "false") return true;
  if (link.getAttribute("data-turbo") === "false") return true;
  const turboPrefetchParent = findClosestRecursively(link, "[data-turbo-prefetch]");
  if (turboPrefetchParent && turboPrefetchParent.getAttribute("data-turbo-prefetch") === "false") return true;
  return false;
};
const nonSafeLink = (link) => {
  const turboMethod = link.getAttribute("data-turbo-method");
  if (turboMethod && turboMethod.toLowerCase() !== "get") return true;
  if (isUJS(link)) return true;
  if (link.hasAttribute("data-turbo-confirm")) return true;
  if (link.hasAttribute("data-turbo-stream")) return true;
  return false;
};
const isUJS = (link) => {
  return link.hasAttribute("data-remote") || link.hasAttribute("data-behavior") || link.hasAttribute("data-confirm") || link.hasAttribute("data-method");
};
const eventPrevented = (link) => {
  const event = dispatch("turbo:before-prefetch", { target: link, cancelable: true });
  return event.defaultPrevented;
};
class Navigator {
  constructor(delegate) {
    __privateAdd(this, _Navigator_instances);
    this.delegate = delegate;
  }
  proposeVisit(location2, options = {}) {
    if (this.delegate.allowsVisitingLocationWithAction(location2, options.action)) {
      this.delegate.visitProposedToLocation(location2, options);
    }
  }
  startVisit(locatable, restorationIdentifier, options = {}) {
    this.stop();
    this.currentVisit = new Visit(this, expandURL(locatable), restorationIdentifier, {
      referrer: this.location,
      ...options
    });
    this.currentVisit.start();
  }
  submitForm(form, submitter) {
    this.stop();
    this.formSubmission = new FormSubmission(this, form, submitter, true);
    this.formSubmission.start();
  }
  stop() {
    if (this.formSubmission) {
      this.formSubmission.stop();
      delete this.formSubmission;
    }
    if (this.currentVisit) {
      this.currentVisit.cancel();
      delete this.currentVisit;
    }
  }
  get adapter() {
    return this.delegate.adapter;
  }
  get view() {
    return this.delegate.view;
  }
  get rootLocation() {
    return this.view.snapshot.rootLocation;
  }
  get history() {
    return this.delegate.history;
  }
  // Form submission delegate
  formSubmissionStarted(formSubmission) {
    if (typeof this.adapter.formSubmissionStarted === "function") {
      this.adapter.formSubmissionStarted(formSubmission);
    }
  }
  async formSubmissionSucceededWithResponse(formSubmission, fetchResponse) {
    if (formSubmission == this.formSubmission) {
      const responseHTML = await fetchResponse.responseHTML;
      if (responseHTML) {
        const shouldCacheSnapshot = formSubmission.isSafe;
        if (!shouldCacheSnapshot) {
          this.view.clearSnapshotCache();
        }
        const { statusCode, redirected } = fetchResponse;
        const action = __privateMethod(this, _Navigator_instances, getActionForFormSubmission_fn).call(this, formSubmission, fetchResponse);
        const visitOptions = {
          action,
          shouldCacheSnapshot,
          response: { statusCode, responseHTML, redirected }
        };
        this.proposeVisit(fetchResponse.location, visitOptions);
      }
    }
  }
  async formSubmissionFailedWithResponse(formSubmission, fetchResponse) {
    const responseHTML = await fetchResponse.responseHTML;
    if (responseHTML) {
      const snapshot = PageSnapshot.fromHTMLString(responseHTML);
      if (fetchResponse.serverError) {
        await this.view.renderError(snapshot, this.currentVisit);
      } else {
        await this.view.renderPage(snapshot, false, true, this.currentVisit);
      }
      if (!snapshot.shouldPreserveScrollPosition) {
        this.view.scrollToTop();
      }
      this.view.clearSnapshotCache();
    }
  }
  formSubmissionErrored(formSubmission, error) {
    console.error(error);
  }
  formSubmissionFinished(formSubmission) {
    if (typeof this.adapter.formSubmissionFinished === "function") {
      this.adapter.formSubmissionFinished(formSubmission);
    }
  }
  // Visit delegate
  visitStarted(visit2) {
    this.delegate.visitStarted(visit2);
  }
  visitCompleted(visit2) {
    this.delegate.visitCompleted(visit2);
  }
  locationWithActionIsSamePage(location2, action) {
    const anchor = getAnchor(location2);
    const currentAnchor = getAnchor(this.view.lastRenderedLocation);
    const isRestorationToTop = action === "restore" && typeof anchor === "undefined";
    return action !== "replace" && getRequestURL(location2) === getRequestURL(this.view.lastRenderedLocation) && (isRestorationToTop || anchor != null && anchor !== currentAnchor);
  }
  visitScrolledToSamePageLocation(oldURL, newURL) {
    this.delegate.visitScrolledToSamePageLocation(oldURL, newURL);
  }
  // Visits
  get location() {
    return this.history.location;
  }
  get restorationIdentifier() {
    return this.history.restorationIdentifier;
  }
}
_Navigator_instances = new WeakSet();
getActionForFormSubmission_fn = function(formSubmission, fetchResponse) {
  const { submitter, formElement } = formSubmission;
  return getVisitAction(submitter, formElement) || __privateMethod(this, _Navigator_instances, getDefaultAction_fn).call(this, fetchResponse);
};
getDefaultAction_fn = function(fetchResponse) {
  const sameLocationRedirect = fetchResponse.redirected && fetchResponse.location.href === this.location?.href;
  return sameLocationRedirect ? "replace" : "advance";
};
const PageStage = {
  initial: 0,
  loading: 1,
  interactive: 2,
  complete: 3
};
class PageObserver {
  constructor(delegate) {
    __publicField(this, "stage", PageStage.initial);
    __publicField(this, "started", false);
    __publicField(this, "interpretReadyState", () => {
      const { readyState } = this;
      if (readyState == "interactive") {
        this.pageIsInteractive();
      } else if (readyState == "complete") {
        this.pageIsComplete();
      }
    });
    __publicField(this, "pageWillUnload", () => {
      this.delegate.pageWillUnload();
    });
    this.delegate = delegate;
  }
  start() {
    if (!this.started) {
      if (this.stage == PageStage.initial) {
        this.stage = PageStage.loading;
      }
      document.addEventListener("readystatechange", this.interpretReadyState, false);
      addEventListener("pagehide", this.pageWillUnload, false);
      this.started = true;
    }
  }
  stop() {
    if (this.started) {
      document.removeEventListener("readystatechange", this.interpretReadyState, false);
      removeEventListener("pagehide", this.pageWillUnload, false);
      this.started = false;
    }
  }
  pageIsInteractive() {
    if (this.stage == PageStage.loading) {
      this.stage = PageStage.interactive;
      this.delegate.pageBecameInteractive();
    }
  }
  pageIsComplete() {
    this.pageIsInteractive();
    if (this.stage == PageStage.interactive) {
      this.stage = PageStage.complete;
      this.delegate.pageLoaded();
    }
  }
  get readyState() {
    return document.readyState;
  }
}
class ScrollObserver {
  constructor(delegate) {
    __publicField(this, "started", false);
    __publicField(this, "onScroll", () => {
      this.updatePosition({ x: window.pageXOffset, y: window.pageYOffset });
    });
    this.delegate = delegate;
  }
  start() {
    if (!this.started) {
      addEventListener("scroll", this.onScroll, false);
      this.onScroll();
      this.started = true;
    }
  }
  stop() {
    if (this.started) {
      removeEventListener("scroll", this.onScroll, false);
      this.started = false;
    }
  }
  // Private
  updatePosition(position) {
    this.delegate.scrollPositionChanged(position);
  }
}
class StreamMessageRenderer {
  render({ fragment }) {
    Bardo.preservingPermanentElements(this, getPermanentElementMapForFragment(fragment), () => {
      withAutofocusFromFragment(fragment, () => {
        withPreservedFocus(() => {
          document.documentElement.appendChild(fragment);
        });
      });
    });
  }
  // Bardo delegate
  enteringBardo(currentPermanentElement, newPermanentElement) {
    newPermanentElement.replaceWith(currentPermanentElement.cloneNode(true));
  }
  leavingBardo() {
  }
}
function getPermanentElementMapForFragment(fragment) {
  const permanentElementsInDocument = queryPermanentElementsAll(document.documentElement);
  const permanentElementMap = {};
  for (const permanentElementInDocument of permanentElementsInDocument) {
    const { id } = permanentElementInDocument;
    for (const streamElement of fragment.querySelectorAll("turbo-stream")) {
      const elementInStream = getPermanentElementById(streamElement.templateElement.content, id);
      if (elementInStream) {
        permanentElementMap[id] = [permanentElementInDocument, elementInStream];
      }
    }
  }
  return permanentElementMap;
}
async function withAutofocusFromFragment(fragment, callback) {
  const generatedID = `turbo-stream-autofocus-${uuid()}`;
  const turboStreams = fragment.querySelectorAll("turbo-stream");
  const elementWithAutofocus = firstAutofocusableElementInStreams(turboStreams);
  let willAutofocusId = null;
  if (elementWithAutofocus) {
    if (elementWithAutofocus.id) {
      willAutofocusId = elementWithAutofocus.id;
    } else {
      willAutofocusId = generatedID;
    }
    elementWithAutofocus.id = willAutofocusId;
  }
  callback();
  await nextRepaint();
  const hasNoActiveElement = document.activeElement == null || document.activeElement == document.body;
  if (hasNoActiveElement && willAutofocusId) {
    const elementToAutofocus = document.getElementById(willAutofocusId);
    if (elementIsFocusable(elementToAutofocus)) {
      elementToAutofocus.focus();
    }
    if (elementToAutofocus && elementToAutofocus.id == generatedID) {
      elementToAutofocus.removeAttribute("id");
    }
  }
}
async function withPreservedFocus(callback) {
  const [activeElementBeforeRender, activeElementAfterRender] = await around(callback, () => document.activeElement);
  const restoreFocusTo = activeElementBeforeRender && activeElementBeforeRender.id;
  if (restoreFocusTo) {
    const elementToFocus = document.getElementById(restoreFocusTo);
    if (elementIsFocusable(elementToFocus) && elementToFocus != activeElementAfterRender) {
      elementToFocus.focus();
    }
  }
}
function firstAutofocusableElementInStreams(nodeListOfStreamElements) {
  for (const streamElement of nodeListOfStreamElements) {
    const elementWithAutofocus = queryAutofocusableElement(streamElement.templateElement.content);
    if (elementWithAutofocus) return elementWithAutofocus;
  }
  return null;
}
class StreamObserver {
  constructor(delegate) {
    __publicField(this, "sources", /* @__PURE__ */ new Set());
    __privateAdd(this, _started, false);
    __publicField(this, "inspectFetchResponse", (event) => {
      const response = fetchResponseFromEvent(event);
      if (response && fetchResponseIsStream(response)) {
        event.preventDefault();
        this.receiveMessageResponse(response);
      }
    });
    __publicField(this, "receiveMessageEvent", (event) => {
      if (__privateGet(this, _started) && typeof event.data == "string") {
        this.receiveMessageHTML(event.data);
      }
    });
    this.delegate = delegate;
  }
  start() {
    if (!__privateGet(this, _started)) {
      __privateSet(this, _started, true);
      addEventListener("turbo:before-fetch-response", this.inspectFetchResponse, false);
    }
  }
  stop() {
    if (__privateGet(this, _started)) {
      __privateSet(this, _started, false);
      removeEventListener("turbo:before-fetch-response", this.inspectFetchResponse, false);
    }
  }
  connectStreamSource(source) {
    if (!this.streamSourceIsConnected(source)) {
      this.sources.add(source);
      source.addEventListener("message", this.receiveMessageEvent, false);
    }
  }
  disconnectStreamSource(source) {
    if (this.streamSourceIsConnected(source)) {
      this.sources.delete(source);
      source.removeEventListener("message", this.receiveMessageEvent, false);
    }
  }
  streamSourceIsConnected(source) {
    return this.sources.has(source);
  }
  async receiveMessageResponse(response) {
    const html = await response.responseHTML;
    if (html) {
      this.receiveMessageHTML(html);
    }
  }
  receiveMessageHTML(html) {
    this.delegate.receivedMessageFromStream(StreamMessage.wrap(html));
  }
}
_started = new WeakMap();
function fetchResponseFromEvent(event) {
  const fetchResponse = event.detail?.fetchResponse;
  if (fetchResponse instanceof FetchResponse) {
    return fetchResponse;
  }
}
function fetchResponseIsStream(response) {
  const contentType = response.contentType ?? "";
  return contentType.startsWith(StreamMessage.contentType);
}
class ErrorRenderer extends Renderer {
  static renderElement(currentElement, newElement) {
    const { documentElement, body } = document;
    documentElement.replaceChild(newElement, body);
  }
  async render() {
    this.replaceHeadAndBody();
    this.activateScriptElements();
  }
  replaceHeadAndBody() {
    const { documentElement, head } = document;
    documentElement.replaceChild(this.newHead, head);
    this.renderElement(this.currentElement, this.newElement);
  }
  activateScriptElements() {
    for (const replaceableElement of this.scriptElements) {
      const parentNode = replaceableElement.parentNode;
      if (parentNode) {
        const element = activateScriptElement(replaceableElement);
        parentNode.replaceChild(element, replaceableElement);
      }
    }
  }
  get newHead() {
    return this.newSnapshot.headSnapshot.element;
  }
  get scriptElements() {
    return document.documentElement.querySelectorAll("script");
  }
}
var Idiomorph = /* @__PURE__ */ function() {
  let EMPTY_SET = /* @__PURE__ */ new Set();
  let defaults = {
    morphStyle: "outerHTML",
    callbacks: {
      beforeNodeAdded: noOp,
      afterNodeAdded: noOp,
      beforeNodeMorphed: noOp,
      afterNodeMorphed: noOp,
      beforeNodeRemoved: noOp,
      afterNodeRemoved: noOp,
      beforeAttributeUpdated: noOp
    },
    head: {
      style: "merge",
      shouldPreserve: function(elt) {
        return elt.getAttribute("im-preserve") === "true";
      },
      shouldReAppend: function(elt) {
        return elt.getAttribute("im-re-append") === "true";
      },
      shouldRemove: noOp,
      afterHeadMorphed: noOp
    }
  };
  function morph(oldNode, newContent, config = {}) {
    if (oldNode instanceof Document) {
      oldNode = oldNode.documentElement;
    }
    if (typeof newContent === "string") {
      newContent = parseContent(newContent);
    }
    let normalizedContent = normalizeContent(newContent);
    let ctx = createMorphContext(oldNode, normalizedContent, config);
    return morphNormalizedContent(oldNode, normalizedContent, ctx);
  }
  function morphNormalizedContent(oldNode, normalizedNewContent, ctx) {
    if (ctx.head.block) {
      let oldHead = oldNode.querySelector("head");
      let newHead = normalizedNewContent.querySelector("head");
      if (oldHead && newHead) {
        let promises = handleHeadElement(newHead, oldHead, ctx);
        Promise.all(promises).then(function() {
          morphNormalizedContent(oldNode, normalizedNewContent, Object.assign(ctx, {
            head: {
              block: false,
              ignore: true
            }
          }));
        });
        return;
      }
    }
    if (ctx.morphStyle === "innerHTML") {
      morphChildren(normalizedNewContent, oldNode, ctx);
      return oldNode.children;
    } else if (ctx.morphStyle === "outerHTML" || ctx.morphStyle == null) {
      let bestMatch = findBestNodeMatch(normalizedNewContent, oldNode, ctx);
      let previousSibling = bestMatch?.previousSibling;
      let nextSibling = bestMatch?.nextSibling;
      let morphedNode = morphOldNodeTo(oldNode, bestMatch, ctx);
      if (bestMatch) {
        return insertSiblings(previousSibling, morphedNode, nextSibling);
      } else {
        return [];
      }
    } else {
      throw "Do not understand how to morph style " + ctx.morphStyle;
    }
  }
  function ignoreValueOfActiveElement(possibleActiveElement, ctx) {
    return ctx.ignoreActiveValue && possibleActiveElement === document.activeElement && possibleActiveElement !== document.body;
  }
  function morphOldNodeTo(oldNode, newContent, ctx) {
    if (ctx.ignoreActive && oldNode === document.activeElement) ;
    else if (newContent == null) {
      if (ctx.callbacks.beforeNodeRemoved(oldNode) === false) return oldNode;
      oldNode.remove();
      ctx.callbacks.afterNodeRemoved(oldNode);
      return null;
    } else if (!isSoftMatch(oldNode, newContent)) {
      if (ctx.callbacks.beforeNodeRemoved(oldNode) === false) return oldNode;
      if (ctx.callbacks.beforeNodeAdded(newContent) === false) return oldNode;
      oldNode.parentElement.replaceChild(newContent, oldNode);
      ctx.callbacks.afterNodeAdded(newContent);
      ctx.callbacks.afterNodeRemoved(oldNode);
      return newContent;
    } else {
      if (ctx.callbacks.beforeNodeMorphed(oldNode, newContent) === false) return oldNode;
      if (oldNode instanceof HTMLHeadElement && ctx.head.ignore) ;
      else if (oldNode instanceof HTMLHeadElement && ctx.head.style !== "morph") {
        handleHeadElement(newContent, oldNode, ctx);
      } else {
        syncNodeFrom(newContent, oldNode, ctx);
        if (!ignoreValueOfActiveElement(oldNode, ctx)) {
          morphChildren(newContent, oldNode, ctx);
        }
      }
      ctx.callbacks.afterNodeMorphed(oldNode, newContent);
      return oldNode;
    }
  }
  function morphChildren(newParent, oldParent, ctx) {
    let nextNewChild = newParent.firstChild;
    let insertionPoint = oldParent.firstChild;
    let newChild;
    while (nextNewChild) {
      newChild = nextNewChild;
      nextNewChild = newChild.nextSibling;
      if (insertionPoint == null) {
        if (ctx.callbacks.beforeNodeAdded(newChild) === false) return;
        oldParent.appendChild(newChild);
        ctx.callbacks.afterNodeAdded(newChild);
        removeIdsFromConsideration(ctx, newChild);
        continue;
      }
      if (isIdSetMatch(newChild, insertionPoint, ctx)) {
        morphOldNodeTo(insertionPoint, newChild, ctx);
        insertionPoint = insertionPoint.nextSibling;
        removeIdsFromConsideration(ctx, newChild);
        continue;
      }
      let idSetMatch = findIdSetMatch(newParent, oldParent, newChild, insertionPoint, ctx);
      if (idSetMatch) {
        insertionPoint = removeNodesBetween(insertionPoint, idSetMatch, ctx);
        morphOldNodeTo(idSetMatch, newChild, ctx);
        removeIdsFromConsideration(ctx, newChild);
        continue;
      }
      let softMatch = findSoftMatch(newParent, oldParent, newChild, insertionPoint, ctx);
      if (softMatch) {
        insertionPoint = removeNodesBetween(insertionPoint, softMatch, ctx);
        morphOldNodeTo(softMatch, newChild, ctx);
        removeIdsFromConsideration(ctx, newChild);
        continue;
      }
      if (ctx.callbacks.beforeNodeAdded(newChild) === false) return;
      oldParent.insertBefore(newChild, insertionPoint);
      ctx.callbacks.afterNodeAdded(newChild);
      removeIdsFromConsideration(ctx, newChild);
    }
    while (insertionPoint !== null) {
      let tempNode = insertionPoint;
      insertionPoint = insertionPoint.nextSibling;
      removeNode(tempNode, ctx);
    }
  }
  function ignoreAttribute(attr, to, updateType, ctx) {
    if (attr === "value" && ctx.ignoreActiveValue && to === document.activeElement) {
      return true;
    }
    return ctx.callbacks.beforeAttributeUpdated(attr, to, updateType) === false;
  }
  function syncNodeFrom(from, to, ctx) {
    let type = from.nodeType;
    if (type === 1) {
      const fromAttributes = from.attributes;
      const toAttributes = to.attributes;
      for (const fromAttribute of fromAttributes) {
        if (ignoreAttribute(fromAttribute.name, to, "update", ctx)) {
          continue;
        }
        if (to.getAttribute(fromAttribute.name) !== fromAttribute.value) {
          to.setAttribute(fromAttribute.name, fromAttribute.value);
        }
      }
      for (let i = toAttributes.length - 1; 0 <= i; i--) {
        const toAttribute = toAttributes[i];
        if (ignoreAttribute(toAttribute.name, to, "remove", ctx)) {
          continue;
        }
        if (!from.hasAttribute(toAttribute.name)) {
          to.removeAttribute(toAttribute.name);
        }
      }
    }
    if (type === 8 || type === 3) {
      if (to.nodeValue !== from.nodeValue) {
        to.nodeValue = from.nodeValue;
      }
    }
    if (!ignoreValueOfActiveElement(to, ctx)) {
      syncInputValue(from, to, ctx);
    }
  }
  function syncBooleanAttribute(from, to, attributeName, ctx) {
    if (from[attributeName] !== to[attributeName]) {
      let ignoreUpdate = ignoreAttribute(attributeName, to, "update", ctx);
      if (!ignoreUpdate) {
        to[attributeName] = from[attributeName];
      }
      if (from[attributeName]) {
        if (!ignoreUpdate) {
          to.setAttribute(attributeName, from[attributeName]);
        }
      } else {
        if (!ignoreAttribute(attributeName, to, "remove", ctx)) {
          to.removeAttribute(attributeName);
        }
      }
    }
  }
  function syncInputValue(from, to, ctx) {
    if (from instanceof HTMLInputElement && to instanceof HTMLInputElement && from.type !== "file") {
      let fromValue = from.value;
      let toValue = to.value;
      syncBooleanAttribute(from, to, "checked", ctx);
      syncBooleanAttribute(from, to, "disabled", ctx);
      if (!from.hasAttribute("value")) {
        if (!ignoreAttribute("value", to, "remove", ctx)) {
          to.value = "";
          to.removeAttribute("value");
        }
      } else if (fromValue !== toValue) {
        if (!ignoreAttribute("value", to, "update", ctx)) {
          to.setAttribute("value", fromValue);
          to.value = fromValue;
        }
      }
    } else if (from instanceof HTMLOptionElement) {
      syncBooleanAttribute(from, to, "selected", ctx);
    } else if (from instanceof HTMLTextAreaElement && to instanceof HTMLTextAreaElement) {
      let fromValue = from.value;
      let toValue = to.value;
      if (ignoreAttribute("value", to, "update", ctx)) {
        return;
      }
      if (fromValue !== toValue) {
        to.value = fromValue;
      }
      if (to.firstChild && to.firstChild.nodeValue !== fromValue) {
        to.firstChild.nodeValue = fromValue;
      }
    }
  }
  function handleHeadElement(newHeadTag, currentHead, ctx) {
    let added = [];
    let removed = [];
    let preserved = [];
    let nodesToAppend = [];
    let headMergeStyle = ctx.head.style;
    let srcToNewHeadNodes = /* @__PURE__ */ new Map();
    for (const newHeadChild of newHeadTag.children) {
      srcToNewHeadNodes.set(newHeadChild.outerHTML, newHeadChild);
    }
    for (const currentHeadElt of currentHead.children) {
      let inNewContent = srcToNewHeadNodes.has(currentHeadElt.outerHTML);
      let isReAppended = ctx.head.shouldReAppend(currentHeadElt);
      let isPreserved = ctx.head.shouldPreserve(currentHeadElt);
      if (inNewContent || isPreserved) {
        if (isReAppended) {
          removed.push(currentHeadElt);
        } else {
          srcToNewHeadNodes.delete(currentHeadElt.outerHTML);
          preserved.push(currentHeadElt);
        }
      } else {
        if (headMergeStyle === "append") {
          if (isReAppended) {
            removed.push(currentHeadElt);
            nodesToAppend.push(currentHeadElt);
          }
        } else {
          if (ctx.head.shouldRemove(currentHeadElt) !== false) {
            removed.push(currentHeadElt);
          }
        }
      }
    }
    nodesToAppend.push(...srcToNewHeadNodes.values());
    let promises = [];
    for (const newNode of nodesToAppend) {
      let newElt = document.createRange().createContextualFragment(newNode.outerHTML).firstChild;
      if (ctx.callbacks.beforeNodeAdded(newElt) !== false) {
        if (newElt.href || newElt.src) {
          let resolve = null;
          let promise = new Promise(function(_resolve) {
            resolve = _resolve;
          });
          newElt.addEventListener("load", function() {
            resolve();
          });
          promises.push(promise);
        }
        currentHead.appendChild(newElt);
        ctx.callbacks.afterNodeAdded(newElt);
        added.push(newElt);
      }
    }
    for (const removedElement of removed) {
      if (ctx.callbacks.beforeNodeRemoved(removedElement) !== false) {
        currentHead.removeChild(removedElement);
        ctx.callbacks.afterNodeRemoved(removedElement);
      }
    }
    ctx.head.afterHeadMorphed(currentHead, { added, kept: preserved, removed });
    return promises;
  }
  function noOp() {
  }
  function mergeDefaults(config) {
    let finalConfig = {};
    Object.assign(finalConfig, defaults);
    Object.assign(finalConfig, config);
    finalConfig.callbacks = {};
    Object.assign(finalConfig.callbacks, defaults.callbacks);
    Object.assign(finalConfig.callbacks, config.callbacks);
    finalConfig.head = {};
    Object.assign(finalConfig.head, defaults.head);
    Object.assign(finalConfig.head, config.head);
    return finalConfig;
  }
  function createMorphContext(oldNode, newContent, config) {
    config = mergeDefaults(config);
    return {
      target: oldNode,
      newContent,
      config,
      morphStyle: config.morphStyle,
      ignoreActive: config.ignoreActive,
      ignoreActiveValue: config.ignoreActiveValue,
      idMap: createIdMap(oldNode, newContent),
      deadIds: /* @__PURE__ */ new Set(),
      callbacks: config.callbacks,
      head: config.head
    };
  }
  function isIdSetMatch(node1, node2, ctx) {
    if (node1 == null || node2 == null) {
      return false;
    }
    if (node1.nodeType === node2.nodeType && node1.tagName === node2.tagName) {
      if (node1.id !== "" && node1.id === node2.id) {
        return true;
      } else {
        return getIdIntersectionCount(ctx, node1, node2) > 0;
      }
    }
    return false;
  }
  function isSoftMatch(node1, node2) {
    if (node1 == null || node2 == null) {
      return false;
    }
    return node1.nodeType === node2.nodeType && node1.tagName === node2.tagName;
  }
  function removeNodesBetween(startInclusive, endExclusive, ctx) {
    while (startInclusive !== endExclusive) {
      let tempNode = startInclusive;
      startInclusive = startInclusive.nextSibling;
      removeNode(tempNode, ctx);
    }
    removeIdsFromConsideration(ctx, endExclusive);
    return endExclusive.nextSibling;
  }
  function findIdSetMatch(newContent, oldParent, newChild, insertionPoint, ctx) {
    let newChildPotentialIdCount = getIdIntersectionCount(ctx, newChild, oldParent);
    let potentialMatch = null;
    if (newChildPotentialIdCount > 0) {
      let potentialMatch2 = insertionPoint;
      let otherMatchCount = 0;
      while (potentialMatch2 != null) {
        if (isIdSetMatch(newChild, potentialMatch2, ctx)) {
          return potentialMatch2;
        }
        otherMatchCount += getIdIntersectionCount(ctx, potentialMatch2, newContent);
        if (otherMatchCount > newChildPotentialIdCount) {
          return null;
        }
        potentialMatch2 = potentialMatch2.nextSibling;
      }
    }
    return potentialMatch;
  }
  function findSoftMatch(newContent, oldParent, newChild, insertionPoint, ctx) {
    let potentialSoftMatch = insertionPoint;
    let nextSibling = newChild.nextSibling;
    let siblingSoftMatchCount = 0;
    while (potentialSoftMatch != null) {
      if (getIdIntersectionCount(ctx, potentialSoftMatch, newContent) > 0) {
        return null;
      }
      if (isSoftMatch(newChild, potentialSoftMatch)) {
        return potentialSoftMatch;
      }
      if (isSoftMatch(nextSibling, potentialSoftMatch)) {
        siblingSoftMatchCount++;
        nextSibling = nextSibling.nextSibling;
        if (siblingSoftMatchCount >= 2) {
          return null;
        }
      }
      potentialSoftMatch = potentialSoftMatch.nextSibling;
    }
    return potentialSoftMatch;
  }
  function parseContent(newContent) {
    let parser = new DOMParser();
    let contentWithSvgsRemoved = newContent.replace(/<svg(\s[^>]*>|>)([\s\S]*?)<\/svg>/gim, "");
    if (contentWithSvgsRemoved.match(/<\/html>/) || contentWithSvgsRemoved.match(/<\/head>/) || contentWithSvgsRemoved.match(/<\/body>/)) {
      let content = parser.parseFromString(newContent, "text/html");
      if (contentWithSvgsRemoved.match(/<\/html>/)) {
        content.generatedByIdiomorph = true;
        return content;
      } else {
        let htmlElement = content.firstChild;
        if (htmlElement) {
          htmlElement.generatedByIdiomorph = true;
          return htmlElement;
        } else {
          return null;
        }
      }
    } else {
      let responseDoc = parser.parseFromString("<body><template>" + newContent + "</template></body>", "text/html");
      let content = responseDoc.body.querySelector("template").content;
      content.generatedByIdiomorph = true;
      return content;
    }
  }
  function normalizeContent(newContent) {
    if (newContent == null) {
      const dummyParent = document.createElement("div");
      return dummyParent;
    } else if (newContent.generatedByIdiomorph) {
      return newContent;
    } else if (newContent instanceof Node) {
      const dummyParent = document.createElement("div");
      dummyParent.append(newContent);
      return dummyParent;
    } else {
      const dummyParent = document.createElement("div");
      for (const elt of [...newContent]) {
        dummyParent.append(elt);
      }
      return dummyParent;
    }
  }
  function insertSiblings(previousSibling, morphedNode, nextSibling) {
    let stack = [];
    let added = [];
    while (previousSibling != null) {
      stack.push(previousSibling);
      previousSibling = previousSibling.previousSibling;
    }
    while (stack.length > 0) {
      let node = stack.pop();
      added.push(node);
      morphedNode.parentElement.insertBefore(node, morphedNode);
    }
    added.push(morphedNode);
    while (nextSibling != null) {
      stack.push(nextSibling);
      added.push(nextSibling);
      nextSibling = nextSibling.nextSibling;
    }
    while (stack.length > 0) {
      morphedNode.parentElement.insertBefore(stack.pop(), morphedNode.nextSibling);
    }
    return added;
  }
  function findBestNodeMatch(newContent, oldNode, ctx) {
    let currentElement;
    currentElement = newContent.firstChild;
    let bestElement = currentElement;
    let score = 0;
    while (currentElement) {
      let newScore = scoreElement(currentElement, oldNode, ctx);
      if (newScore > score) {
        bestElement = currentElement;
        score = newScore;
      }
      currentElement = currentElement.nextSibling;
    }
    return bestElement;
  }
  function scoreElement(node1, node2, ctx) {
    if (isSoftMatch(node1, node2)) {
      return 0.5 + getIdIntersectionCount(ctx, node1, node2);
    }
    return 0;
  }
  function removeNode(tempNode, ctx) {
    removeIdsFromConsideration(ctx, tempNode);
    if (ctx.callbacks.beforeNodeRemoved(tempNode) === false) return;
    tempNode.remove();
    ctx.callbacks.afterNodeRemoved(tempNode);
  }
  function isIdInConsideration(ctx, id) {
    return !ctx.deadIds.has(id);
  }
  function idIsWithinNode(ctx, id, targetNode) {
    let idSet = ctx.idMap.get(targetNode) || EMPTY_SET;
    return idSet.has(id);
  }
  function removeIdsFromConsideration(ctx, node) {
    let idSet = ctx.idMap.get(node) || EMPTY_SET;
    for (const id of idSet) {
      ctx.deadIds.add(id);
    }
  }
  function getIdIntersectionCount(ctx, node1, node2) {
    let sourceSet = ctx.idMap.get(node1) || EMPTY_SET;
    let matchCount = 0;
    for (const id of sourceSet) {
      if (isIdInConsideration(ctx, id) && idIsWithinNode(ctx, id, node2)) {
        ++matchCount;
      }
    }
    return matchCount;
  }
  function populateIdMapForNode(node, idMap) {
    let nodeParent = node.parentElement;
    let idElements = node.querySelectorAll("[id]");
    for (const elt of idElements) {
      let current = elt;
      while (current !== nodeParent && current != null) {
        let idSet = idMap.get(current);
        if (idSet == null) {
          idSet = /* @__PURE__ */ new Set();
          idMap.set(current, idSet);
        }
        idSet.add(elt.id);
        current = current.parentElement;
      }
    }
  }
  function createIdMap(oldContent, newContent) {
    let idMap = /* @__PURE__ */ new Map();
    populateIdMapForNode(oldContent, idMap);
    populateIdMapForNode(newContent, idMap);
    return idMap;
  }
  return {
    morph,
    defaults
  };
}();
class PageRenderer extends Renderer {
  constructor() {
    super(...arguments);
    __privateAdd(this, _PageRenderer_instances);
  }
  static renderElement(currentElement, newElement) {
    if (document.body && newElement instanceof HTMLBodyElement) {
      document.body.replaceWith(newElement);
    } else {
      document.documentElement.appendChild(newElement);
    }
  }
  get shouldRender() {
    return this.newSnapshot.isVisitable && this.trackedElementsAreIdentical;
  }
  get reloadReason() {
    if (!this.newSnapshot.isVisitable) {
      return {
        reason: "turbo_visit_control_is_reload"
      };
    }
    if (!this.trackedElementsAreIdentical) {
      return {
        reason: "tracked_element_mismatch"
      };
    }
  }
  async prepareToRender() {
    __privateMethod(this, _PageRenderer_instances, setLanguage_fn).call(this);
    await this.mergeHead();
  }
  async render() {
    if (this.willRender) {
      await this.replaceBody();
    }
  }
  finishRendering() {
    super.finishRendering();
    if (!this.isPreview) {
      this.focusFirstAutofocusableElement();
    }
  }
  get currentHeadSnapshot() {
    return this.currentSnapshot.headSnapshot;
  }
  get newHeadSnapshot() {
    return this.newSnapshot.headSnapshot;
  }
  get newElement() {
    return this.newSnapshot.element;
  }
  async mergeHead() {
    const mergedHeadElements = this.mergeProvisionalElements();
    const newStylesheetElements = this.copyNewHeadStylesheetElements();
    this.copyNewHeadScriptElements();
    await mergedHeadElements;
    await newStylesheetElements;
    if (this.willRender) {
      this.removeUnusedDynamicStylesheetElements();
    }
  }
  async replaceBody() {
    await this.preservingPermanentElements(async () => {
      this.activateNewBody();
      await this.assignNewBody();
    });
  }
  get trackedElementsAreIdentical() {
    return this.currentHeadSnapshot.trackedElementSignature == this.newHeadSnapshot.trackedElementSignature;
  }
  async copyNewHeadStylesheetElements() {
    const loadingElements = [];
    for (const element of this.newHeadStylesheetElements) {
      loadingElements.push(waitForLoad(element));
      document.head.appendChild(element);
    }
    await Promise.all(loadingElements);
  }
  copyNewHeadScriptElements() {
    for (const element of this.newHeadScriptElements) {
      document.head.appendChild(activateScriptElement(element));
    }
  }
  removeUnusedDynamicStylesheetElements() {
    for (const element of this.unusedDynamicStylesheetElements) {
      document.head.removeChild(element);
    }
  }
  async mergeProvisionalElements() {
    const newHeadElements = [...this.newHeadProvisionalElements];
    for (const element of this.currentHeadProvisionalElements) {
      if (!this.isCurrentElementInElementList(element, newHeadElements)) {
        document.head.removeChild(element);
      }
    }
    for (const element of newHeadElements) {
      document.head.appendChild(element);
    }
  }
  isCurrentElementInElementList(element, elementList) {
    for (const [index, newElement] of elementList.entries()) {
      if (element.tagName == "TITLE") {
        if (newElement.tagName != "TITLE") {
          continue;
        }
        if (element.innerHTML == newElement.innerHTML) {
          elementList.splice(index, 1);
          return true;
        }
      }
      if (newElement.isEqualNode(element)) {
        elementList.splice(index, 1);
        return true;
      }
    }
    return false;
  }
  removeCurrentHeadProvisionalElements() {
    for (const element of this.currentHeadProvisionalElements) {
      document.head.removeChild(element);
    }
  }
  copyNewHeadProvisionalElements() {
    for (const element of this.newHeadProvisionalElements) {
      document.head.appendChild(element);
    }
  }
  activateNewBody() {
    document.adoptNode(this.newElement);
    this.activateNewBodyScriptElements();
  }
  activateNewBodyScriptElements() {
    for (const inertScriptElement of this.newBodyScriptElements) {
      const activatedScriptElement = activateScriptElement(inertScriptElement);
      inertScriptElement.replaceWith(activatedScriptElement);
    }
  }
  async assignNewBody() {
    await this.renderElement(this.currentElement, this.newElement);
  }
  get unusedDynamicStylesheetElements() {
    return this.oldHeadStylesheetElements.filter((element) => {
      return element.getAttribute("data-turbo-track") === "dynamic";
    });
  }
  get oldHeadStylesheetElements() {
    return this.currentHeadSnapshot.getStylesheetElementsNotInSnapshot(this.newHeadSnapshot);
  }
  get newHeadStylesheetElements() {
    return this.newHeadSnapshot.getStylesheetElementsNotInSnapshot(this.currentHeadSnapshot);
  }
  get newHeadScriptElements() {
    return this.newHeadSnapshot.getScriptElementsNotInSnapshot(this.currentHeadSnapshot);
  }
  get currentHeadProvisionalElements() {
    return this.currentHeadSnapshot.provisionalElements;
  }
  get newHeadProvisionalElements() {
    return this.newHeadSnapshot.provisionalElements;
  }
  get newBodyScriptElements() {
    return this.newElement.querySelectorAll("script");
  }
}
_PageRenderer_instances = new WeakSet();
setLanguage_fn = function() {
  const { documentElement } = this.currentSnapshot;
  const { lang } = this.newSnapshot;
  if (lang) {
    documentElement.setAttribute("lang", lang);
  } else {
    documentElement.removeAttribute("lang");
  }
};
class MorphRenderer extends PageRenderer {
  constructor() {
    super(...arguments);
    __privateAdd(this, _MorphRenderer_instances);
    __privateAdd(this, _shouldAddElement, (node) => {
      return !(node.id && node.hasAttribute("data-turbo-permanent") && document.getElementById(node.id));
    });
    __privateAdd(this, _shouldMorphElement, (oldNode, newNode) => {
      if (oldNode instanceof HTMLElement) {
        if (!oldNode.hasAttribute("data-turbo-permanent") && (this.isMorphingTurboFrame || !__privateMethod(this, _MorphRenderer_instances, isFrameReloadedWithMorph_fn).call(this, oldNode))) {
          const event = dispatch("turbo:before-morph-element", {
            cancelable: true,
            target: oldNode,
            detail: {
              newElement: newNode
            }
          });
          return !event.defaultPrevented;
        } else {
          return false;
        }
      }
    });
    __privateAdd(this, _shouldUpdateAttribute, (attributeName, target, mutationType) => {
      const event = dispatch("turbo:before-morph-attribute", { cancelable: true, target, detail: { attributeName, mutationType } });
      return !event.defaultPrevented;
    });
    __privateAdd(this, _didMorphElement, (oldNode, newNode) => {
      if (newNode instanceof HTMLElement) {
        dispatch("turbo:morph-element", {
          target: oldNode,
          detail: {
            newElement: newNode
          }
        });
      }
    });
    __privateAdd(this, _shouldRemoveElement, (node) => {
      return __privateGet(this, _shouldMorphElement).call(this, node);
    });
    __privateAdd(this, _morphFrameUpdate, (currentElement, newElement) => {
      dispatch("turbo:before-frame-morph", {
        target: currentElement,
        detail: { currentElement, newElement }
      });
      __privateMethod(this, _MorphRenderer_instances, morphElements_fn).call(this, currentElement, newElement.children, "innerHTML");
    });
  }
  async render() {
    if (this.willRender) await __privateMethod(this, _MorphRenderer_instances, morphBody_fn).call(this);
  }
  get renderMethod() {
    return "morph";
  }
}
_MorphRenderer_instances = new WeakSet();
morphBody_fn = async function() {
  __privateMethod(this, _MorphRenderer_instances, morphElements_fn).call(this, this.currentElement, this.newElement);
  __privateMethod(this, _MorphRenderer_instances, reloadRemoteFrames_fn).call(this);
  dispatch("turbo:morph", {
    detail: {
      currentElement: this.currentElement,
      newElement: this.newElement
    }
  });
};
morphElements_fn = function(currentElement, newElement, morphStyle = "outerHTML") {
  this.isMorphingTurboFrame = __privateMethod(this, _MorphRenderer_instances, isFrameReloadedWithMorph_fn).call(this, currentElement);
  Idiomorph.morph(currentElement, newElement, {
    morphStyle,
    callbacks: {
      beforeNodeAdded: __privateGet(this, _shouldAddElement),
      beforeNodeMorphed: __privateGet(this, _shouldMorphElement),
      beforeAttributeUpdated: __privateGet(this, _shouldUpdateAttribute),
      beforeNodeRemoved: __privateGet(this, _shouldRemoveElement),
      afterNodeMorphed: __privateGet(this, _didMorphElement)
    }
  });
};
_shouldAddElement = new WeakMap();
_shouldMorphElement = new WeakMap();
_shouldUpdateAttribute = new WeakMap();
_didMorphElement = new WeakMap();
_shouldRemoveElement = new WeakMap();
reloadRemoteFrames_fn = function() {
  __privateMethod(this, _MorphRenderer_instances, remoteFrames_fn).call(this).forEach((frame) => {
    if (__privateMethod(this, _MorphRenderer_instances, isFrameReloadedWithMorph_fn).call(this, frame)) {
      __privateMethod(this, _MorphRenderer_instances, renderFrameWithMorph_fn).call(this, frame);
      frame.reload();
    }
  });
};
renderFrameWithMorph_fn = function(frame) {
  frame.addEventListener("turbo:before-frame-render", (event) => {
    event.detail.render = __privateGet(this, _morphFrameUpdate);
  }, { once: true });
};
_morphFrameUpdate = new WeakMap();
isFrameReloadedWithMorph_fn = function(element) {
  return element.src && element.refresh === "morph";
};
remoteFrames_fn = function() {
  return Array.from(document.querySelectorAll("turbo-frame[src]")).filter((frame) => {
    return !frame.closest("[data-turbo-permanent]");
  });
};
class SnapshotCache {
  constructor(size) {
    __publicField(this, "keys", []);
    __publicField(this, "snapshots", {});
    this.size = size;
  }
  has(location2) {
    return toCacheKey(location2) in this.snapshots;
  }
  get(location2) {
    if (this.has(location2)) {
      const snapshot = this.read(location2);
      this.touch(location2);
      return snapshot;
    }
  }
  put(location2, snapshot) {
    this.write(location2, snapshot);
    this.touch(location2);
    return snapshot;
  }
  clear() {
    this.snapshots = {};
  }
  // Private
  read(location2) {
    return this.snapshots[toCacheKey(location2)];
  }
  write(location2, snapshot) {
    this.snapshots[toCacheKey(location2)] = snapshot;
  }
  touch(location2) {
    const key = toCacheKey(location2);
    const index = this.keys.indexOf(key);
    if (index > -1) this.keys.splice(index, 1);
    this.keys.unshift(key);
    this.trim();
  }
  trim() {
    for (const key of this.keys.splice(this.size)) {
      delete this.snapshots[key];
    }
  }
}
class PageView extends View {
  constructor() {
    super(...arguments);
    __publicField(this, "snapshotCache", new SnapshotCache(10));
    __publicField(this, "lastRenderedLocation", new URL(location.href));
    __publicField(this, "forceReloaded", false);
  }
  shouldTransitionTo(newSnapshot) {
    return this.snapshot.prefersViewTransitions && newSnapshot.prefersViewTransitions;
  }
  renderPage(snapshot, isPreview = false, willRender = true, visit2) {
    const shouldMorphPage = this.isPageRefresh(visit2) && this.snapshot.shouldMorphPage;
    const rendererClass = shouldMorphPage ? MorphRenderer : PageRenderer;
    const renderer = new rendererClass(this.snapshot, snapshot, PageRenderer.renderElement, isPreview, willRender);
    if (!renderer.shouldRender) {
      this.forceReloaded = true;
    } else {
      visit2?.changeHistory();
    }
    return this.render(renderer);
  }
  renderError(snapshot, visit2) {
    visit2?.changeHistory();
    const renderer = new ErrorRenderer(this.snapshot, snapshot, ErrorRenderer.renderElement, false);
    return this.render(renderer);
  }
  clearSnapshotCache() {
    this.snapshotCache.clear();
  }
  async cacheSnapshot(snapshot = this.snapshot) {
    if (snapshot.isCacheable) {
      this.delegate.viewWillCacheSnapshot();
      const { lastRenderedLocation: location2 } = this;
      await nextEventLoopTick();
      const cachedSnapshot = snapshot.clone();
      this.snapshotCache.put(location2, cachedSnapshot);
      return cachedSnapshot;
    }
  }
  getCachedSnapshotForLocation(location2) {
    return this.snapshotCache.get(location2);
  }
  isPageRefresh(visit2) {
    return !visit2 || this.lastRenderedLocation.pathname === visit2.location.pathname && visit2.action === "replace";
  }
  shouldPreserveScrollPosition(visit2) {
    return this.isPageRefresh(visit2) && this.snapshot.shouldPreserveScrollPosition;
  }
  get snapshot() {
    return PageSnapshot.fromElement(this.element);
  }
}
class Preloader {
  constructor(delegate, snapshotCache) {
    __publicField(this, "selector", "a[data-turbo-preload]");
    __privateAdd(this, _preloadAll, () => {
      this.preloadOnLoadLinksForView(document.body);
    });
    this.delegate = delegate;
    this.snapshotCache = snapshotCache;
  }
  start() {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", __privateGet(this, _preloadAll));
    } else {
      this.preloadOnLoadLinksForView(document.body);
    }
  }
  stop() {
    document.removeEventListener("DOMContentLoaded", __privateGet(this, _preloadAll));
  }
  preloadOnLoadLinksForView(element) {
    for (const link of element.querySelectorAll(this.selector)) {
      if (this.delegate.shouldPreloadLink(link)) {
        this.preloadURL(link);
      }
    }
  }
  async preloadURL(link) {
    const location2 = new URL(link.href);
    if (this.snapshotCache.has(location2)) {
      return;
    }
    const fetchRequest = new FetchRequest(this, FetchMethod.get, location2, new URLSearchParams(), link);
    await fetchRequest.perform();
  }
  // Fetch request delegate
  prepareRequest(fetchRequest) {
    fetchRequest.headers["X-Sec-Purpose"] = "prefetch";
  }
  async requestSucceededWithResponse(fetchRequest, fetchResponse) {
    try {
      const responseHTML = await fetchResponse.responseHTML;
      const snapshot = PageSnapshot.fromHTMLString(responseHTML);
      this.snapshotCache.put(fetchRequest.url, snapshot);
    } catch (_) {
    }
  }
  requestStarted(fetchRequest) {
  }
  requestErrored(fetchRequest) {
  }
  requestFinished(fetchRequest) {
  }
  requestPreventedHandlingResponse(fetchRequest, fetchResponse) {
  }
  requestFailedWithResponse(fetchRequest, fetchResponse) {
  }
}
_preloadAll = new WeakMap();
class Cache {
  constructor(session2) {
    __privateAdd(this, _Cache_instances);
    this.session = session2;
  }
  clear() {
    this.session.clearCache();
  }
  resetCacheControl() {
    __privateMethod(this, _Cache_instances, setCacheControl_fn).call(this, "");
  }
  exemptPageFromCache() {
    __privateMethod(this, _Cache_instances, setCacheControl_fn).call(this, "no-cache");
  }
  exemptPageFromPreview() {
    __privateMethod(this, _Cache_instances, setCacheControl_fn).call(this, "no-preview");
  }
}
_Cache_instances = new WeakSet();
setCacheControl_fn = function(value) {
  setMetaContent("turbo-cache-control", value);
};
class Session {
  constructor(recentRequests2) {
    __publicField(this, "navigator", new Navigator(this));
    __publicField(this, "history", new History(this));
    __publicField(this, "view", new PageView(this, document.documentElement));
    __publicField(this, "adapter", new BrowserAdapter(this));
    __publicField(this, "pageObserver", new PageObserver(this));
    __publicField(this, "cacheObserver", new CacheObserver());
    __publicField(this, "linkPrefetchObserver", new LinkPrefetchObserver(this, document));
    __publicField(this, "linkClickObserver", new LinkClickObserver(this, window));
    __publicField(this, "formSubmitObserver", new FormSubmitObserver(this, document));
    __publicField(this, "scrollObserver", new ScrollObserver(this));
    __publicField(this, "streamObserver", new StreamObserver(this));
    __publicField(this, "formLinkClickObserver", new FormLinkClickObserver(this, document.documentElement));
    __publicField(this, "frameRedirector", new FrameRedirector(this, document.documentElement));
    __publicField(this, "streamMessageRenderer", new StreamMessageRenderer());
    __publicField(this, "cache", new Cache(this));
    __publicField(this, "drive", true);
    __publicField(this, "enabled", true);
    __publicField(this, "progressBarDelay", 500);
    __publicField(this, "started", false);
    __publicField(this, "formMode", "on");
    __privateAdd(this, _pageRefreshDebouncePeriod, 150);
    this.recentRequests = recentRequests2;
    this.preloader = new Preloader(this, this.view.snapshotCache);
    this.debouncedRefresh = this.refresh;
    this.pageRefreshDebouncePeriod = this.pageRefreshDebouncePeriod;
  }
  start() {
    if (!this.started) {
      this.pageObserver.start();
      this.cacheObserver.start();
      this.linkPrefetchObserver.start();
      this.formLinkClickObserver.start();
      this.linkClickObserver.start();
      this.formSubmitObserver.start();
      this.scrollObserver.start();
      this.streamObserver.start();
      this.frameRedirector.start();
      this.history.start();
      this.preloader.start();
      this.started = true;
      this.enabled = true;
    }
  }
  disable() {
    this.enabled = false;
  }
  stop() {
    if (this.started) {
      this.pageObserver.stop();
      this.cacheObserver.stop();
      this.linkPrefetchObserver.stop();
      this.formLinkClickObserver.stop();
      this.linkClickObserver.stop();
      this.formSubmitObserver.stop();
      this.scrollObserver.stop();
      this.streamObserver.stop();
      this.frameRedirector.stop();
      this.history.stop();
      this.preloader.stop();
      this.started = false;
    }
  }
  registerAdapter(adapter) {
    this.adapter = adapter;
  }
  visit(location2, options = {}) {
    const frameElement = options.frame ? document.getElementById(options.frame) : null;
    if (frameElement instanceof FrameElement) {
      const action = options.action || getVisitAction(frameElement);
      frameElement.delegate.proposeVisitIfNavigatedWithAction(frameElement, action);
      frameElement.src = location2.toString();
    } else {
      this.navigator.proposeVisit(expandURL(location2), options);
    }
  }
  refresh(url, requestId) {
    const isRecentRequest = requestId && this.recentRequests.has(requestId);
    if (!isRecentRequest) {
      this.visit(url, { action: "replace", shouldCacheSnapshot: false });
    }
  }
  connectStreamSource(source) {
    this.streamObserver.connectStreamSource(source);
  }
  disconnectStreamSource(source) {
    this.streamObserver.disconnectStreamSource(source);
  }
  renderStreamMessage(message) {
    this.streamMessageRenderer.render(StreamMessage.wrap(message));
  }
  clearCache() {
    this.view.clearSnapshotCache();
  }
  setProgressBarDelay(delay) {
    this.progressBarDelay = delay;
  }
  setFormMode(mode) {
    this.formMode = mode;
  }
  get location() {
    return this.history.location;
  }
  get restorationIdentifier() {
    return this.history.restorationIdentifier;
  }
  get pageRefreshDebouncePeriod() {
    return __privateGet(this, _pageRefreshDebouncePeriod);
  }
  set pageRefreshDebouncePeriod(value) {
    this.refresh = debounce(this.debouncedRefresh.bind(this), value);
    __privateSet(this, _pageRefreshDebouncePeriod, value);
  }
  // Preloader delegate
  shouldPreloadLink(element) {
    const isUnsafe = element.hasAttribute("data-turbo-method");
    const isStream = element.hasAttribute("data-turbo-stream");
    const frameTarget = element.getAttribute("data-turbo-frame");
    const frame = frameTarget == "_top" ? null : document.getElementById(frameTarget) || findClosestRecursively(element, "turbo-frame:not([disabled])");
    if (isUnsafe || isStream || frame instanceof FrameElement) {
      return false;
    } else {
      const location2 = new URL(element.href);
      return this.elementIsNavigatable(element) && locationIsVisitable(location2, this.snapshot.rootLocation);
    }
  }
  // History delegate
  historyPoppedToLocationWithRestorationIdentifierAndDirection(location2, restorationIdentifier, direction) {
    if (this.enabled) {
      this.navigator.startVisit(location2, restorationIdentifier, {
        action: "restore",
        historyChanged: true,
        direction
      });
    } else {
      this.adapter.pageInvalidated({
        reason: "turbo_disabled"
      });
    }
  }
  // Scroll observer delegate
  scrollPositionChanged(position) {
    this.history.updateRestorationData({ scrollPosition: position });
  }
  // Form click observer delegate
  willSubmitFormLinkToLocation(link, location2) {
    return this.elementIsNavigatable(link) && locationIsVisitable(location2, this.snapshot.rootLocation);
  }
  submittedFormLinkToLocation() {
  }
  // Link hover observer delegate
  canPrefetchRequestToLocation(link, location2) {
    return this.elementIsNavigatable(link) && locationIsVisitable(location2, this.snapshot.rootLocation);
  }
  // Link click observer delegate
  willFollowLinkToLocation(link, location2, event) {
    return this.elementIsNavigatable(link) && locationIsVisitable(location2, this.snapshot.rootLocation) && this.applicationAllowsFollowingLinkToLocation(link, location2, event);
  }
  followedLinkToLocation(link, location2) {
    const action = this.getActionForLink(link);
    const acceptsStreamResponse = link.hasAttribute("data-turbo-stream");
    this.visit(location2.href, { action, acceptsStreamResponse });
  }
  // Navigator delegate
  allowsVisitingLocationWithAction(location2, action) {
    return this.locationWithActionIsSamePage(location2, action) || this.applicationAllowsVisitingLocation(location2);
  }
  visitProposedToLocation(location2, options) {
    extendURLWithDeprecatedProperties(location2);
    this.adapter.visitProposedToLocation(location2, options);
  }
  // Visit delegate
  visitStarted(visit2) {
    if (!visit2.acceptsStreamResponse) {
      markAsBusy(document.documentElement);
      this.view.markVisitDirection(visit2.direction);
    }
    extendURLWithDeprecatedProperties(visit2.location);
    if (!visit2.silent) {
      this.notifyApplicationAfterVisitingLocation(visit2.location, visit2.action);
    }
  }
  visitCompleted(visit2) {
    this.view.unmarkVisitDirection();
    clearBusyState(document.documentElement);
    this.notifyApplicationAfterPageLoad(visit2.getTimingMetrics());
  }
  locationWithActionIsSamePage(location2, action) {
    return this.navigator.locationWithActionIsSamePage(location2, action);
  }
  visitScrolledToSamePageLocation(oldURL, newURL) {
    this.notifyApplicationAfterVisitingSamePageLocation(oldURL, newURL);
  }
  // Form submit observer delegate
  willSubmitForm(form, submitter) {
    const action = getAction$1(form, submitter);
    return this.submissionIsNavigatable(form, submitter) && locationIsVisitable(expandURL(action), this.snapshot.rootLocation);
  }
  formSubmitted(form, submitter) {
    this.navigator.submitForm(form, submitter);
  }
  // Page observer delegate
  pageBecameInteractive() {
    this.view.lastRenderedLocation = this.location;
    this.notifyApplicationAfterPageLoad();
  }
  pageLoaded() {
    this.history.assumeControlOfScrollRestoration();
  }
  pageWillUnload() {
    this.history.relinquishControlOfScrollRestoration();
  }
  // Stream observer delegate
  receivedMessageFromStream(message) {
    this.renderStreamMessage(message);
  }
  // Page view delegate
  viewWillCacheSnapshot() {
    if (!this.navigator.currentVisit?.silent) {
      this.notifyApplicationBeforeCachingSnapshot();
    }
  }
  allowsImmediateRender({ element }, options) {
    const event = this.notifyApplicationBeforeRender(element, options);
    const {
      defaultPrevented,
      detail: { render }
    } = event;
    if (this.view.renderer && render) {
      this.view.renderer.renderElement = render;
    }
    return !defaultPrevented;
  }
  viewRenderedSnapshot(_snapshot, _isPreview, renderMethod) {
    this.view.lastRenderedLocation = this.history.location;
    this.notifyApplicationAfterRender(renderMethod);
  }
  preloadOnLoadLinksForView(element) {
    this.preloader.preloadOnLoadLinksForView(element);
  }
  viewInvalidated(reason) {
    this.adapter.pageInvalidated(reason);
  }
  // Frame element
  frameLoaded(frame) {
    this.notifyApplicationAfterFrameLoad(frame);
  }
  frameRendered(fetchResponse, frame) {
    this.notifyApplicationAfterFrameRender(fetchResponse, frame);
  }
  // Application events
  applicationAllowsFollowingLinkToLocation(link, location2, ev) {
    const event = this.notifyApplicationAfterClickingLinkToLocation(link, location2, ev);
    return !event.defaultPrevented;
  }
  applicationAllowsVisitingLocation(location2) {
    const event = this.notifyApplicationBeforeVisitingLocation(location2);
    return !event.defaultPrevented;
  }
  notifyApplicationAfterClickingLinkToLocation(link, location2, event) {
    return dispatch("turbo:click", {
      target: link,
      detail: { url: location2.href, originalEvent: event },
      cancelable: true
    });
  }
  notifyApplicationBeforeVisitingLocation(location2) {
    return dispatch("turbo:before-visit", {
      detail: { url: location2.href },
      cancelable: true
    });
  }
  notifyApplicationAfterVisitingLocation(location2, action) {
    return dispatch("turbo:visit", { detail: { url: location2.href, action } });
  }
  notifyApplicationBeforeCachingSnapshot() {
    return dispatch("turbo:before-cache");
  }
  notifyApplicationBeforeRender(newBody, options) {
    return dispatch("turbo:before-render", {
      detail: { newBody, ...options },
      cancelable: true
    });
  }
  notifyApplicationAfterRender(renderMethod) {
    return dispatch("turbo:render", { detail: { renderMethod } });
  }
  notifyApplicationAfterPageLoad(timing = {}) {
    return dispatch("turbo:load", {
      detail: { url: this.location.href, timing }
    });
  }
  notifyApplicationAfterVisitingSamePageLocation(oldURL, newURL) {
    dispatchEvent(
      new HashChangeEvent("hashchange", {
        oldURL: oldURL.toString(),
        newURL: newURL.toString()
      })
    );
  }
  notifyApplicationAfterFrameLoad(frame) {
    return dispatch("turbo:frame-load", { target: frame });
  }
  notifyApplicationAfterFrameRender(fetchResponse, frame) {
    return dispatch("turbo:frame-render", {
      detail: { fetchResponse },
      target: frame,
      cancelable: true
    });
  }
  // Helpers
  submissionIsNavigatable(form, submitter) {
    if (this.formMode == "off") {
      return false;
    } else {
      const submitterIsNavigatable = submitter ? this.elementIsNavigatable(submitter) : true;
      if (this.formMode == "optin") {
        return submitterIsNavigatable && form.closest('[data-turbo="true"]') != null;
      } else {
        return submitterIsNavigatable && this.elementIsNavigatable(form);
      }
    }
  }
  elementIsNavigatable(element) {
    const container = findClosestRecursively(element, "[data-turbo]");
    const withinFrame = findClosestRecursively(element, "turbo-frame");
    if (this.drive || withinFrame) {
      if (container) {
        return container.getAttribute("data-turbo") != "false";
      } else {
        return true;
      }
    } else {
      if (container) {
        return container.getAttribute("data-turbo") == "true";
      } else {
        return false;
      }
    }
  }
  // Private
  getActionForLink(link) {
    return getVisitAction(link) || "advance";
  }
  get snapshot() {
    return this.view.snapshot;
  }
}
_pageRefreshDebouncePeriod = new WeakMap();
function extendURLWithDeprecatedProperties(url) {
  Object.defineProperties(url, deprecatedLocationPropertyDescriptors);
}
const deprecatedLocationPropertyDescriptors = {
  absoluteURL: {
    get() {
      return this.toString();
    }
  }
};
const session = new Session(recentRequests);
const { cache, navigator: navigator$1 } = session;
function start() {
  session.start();
}
function registerAdapter(adapter) {
  session.registerAdapter(adapter);
}
function visit(location2, options) {
  session.visit(location2, options);
}
function connectStreamSource(source) {
  session.connectStreamSource(source);
}
function disconnectStreamSource(source) {
  session.disconnectStreamSource(source);
}
function renderStreamMessage(message) {
  session.renderStreamMessage(message);
}
function clearCache() {
  console.warn(
    "Please replace `Turbo.clearCache()` with `Turbo.cache.clear()`. The top-level function is deprecated and will be removed in a future version of Turbo.`"
  );
  session.clearCache();
}
function setProgressBarDelay(delay) {
  session.setProgressBarDelay(delay);
}
function setConfirmMethod(confirmMethod) {
  FormSubmission.confirmMethod = confirmMethod;
}
function setFormMode(mode) {
  session.setFormMode(mode);
}
var Turbo = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  navigator: navigator$1,
  session,
  cache,
  PageRenderer,
  PageSnapshot,
  FrameRenderer,
  fetch: fetchWithTurboHeaders,
  start,
  registerAdapter,
  visit,
  connectStreamSource,
  disconnectStreamSource,
  renderStreamMessage,
  clearCache,
  setProgressBarDelay,
  setConfirmMethod,
  setFormMode
});
class TurboFrameMissingError extends Error {
}
class FrameController {
  constructor(element) {
    __privateAdd(this, _FrameController_instances);
    __publicField(this, "fetchResponseLoaded", (_fetchResponse) => Promise.resolve());
    __privateAdd(this, _currentFetchRequest, null);
    __privateAdd(this, _resolveVisitPromise, () => {
    });
    __privateAdd(this, _connected, false);
    __privateAdd(this, _hasBeenLoaded, false);
    __privateAdd(this, _ignoredAttributes, /* @__PURE__ */ new Set());
    __publicField(this, "action", null);
    __publicField(this, "visitCachedSnapshot", ({ element }) => {
      const frame = element.querySelector("#" + this.element.id);
      if (frame && this.previousFrameElement) {
        frame.replaceChildren(...this.previousFrameElement.children);
      }
      delete this.previousFrameElement;
    });
    this.element = element;
    this.view = new FrameView(this, this.element);
    this.appearanceObserver = new AppearanceObserver(this, this.element);
    this.formLinkClickObserver = new FormLinkClickObserver(this, this.element);
    this.linkInterceptor = new LinkInterceptor(this, this.element);
    this.restorationIdentifier = uuid();
    this.formSubmitObserver = new FormSubmitObserver(this, this.element);
  }
  // Frame delegate
  connect() {
    if (!__privateGet(this, _connected)) {
      __privateSet(this, _connected, true);
      if (this.loadingStyle == FrameLoadingStyle.lazy) {
        this.appearanceObserver.start();
      } else {
        __privateMethod(this, _FrameController_instances, loadSourceURL_fn).call(this);
      }
      this.formLinkClickObserver.start();
      this.linkInterceptor.start();
      this.formSubmitObserver.start();
    }
  }
  disconnect() {
    if (__privateGet(this, _connected)) {
      __privateSet(this, _connected, false);
      this.appearanceObserver.stop();
      this.formLinkClickObserver.stop();
      this.linkInterceptor.stop();
      this.formSubmitObserver.stop();
    }
  }
  disabledChanged() {
    if (this.loadingStyle == FrameLoadingStyle.eager) {
      __privateMethod(this, _FrameController_instances, loadSourceURL_fn).call(this);
    }
  }
  sourceURLChanged() {
    if (__privateMethod(this, _FrameController_instances, isIgnoringChangesTo_fn).call(this, "src")) return;
    if (this.element.isConnected) {
      this.complete = false;
    }
    if (this.loadingStyle == FrameLoadingStyle.eager || __privateGet(this, _hasBeenLoaded)) {
      __privateMethod(this, _FrameController_instances, loadSourceURL_fn).call(this);
    }
  }
  sourceURLReloaded() {
    const { src } = this.element;
    this.element.removeAttribute("complete");
    this.element.src = null;
    this.element.src = src;
    return this.element.loaded;
  }
  loadingStyleChanged() {
    if (this.loadingStyle == FrameLoadingStyle.lazy) {
      this.appearanceObserver.start();
    } else {
      this.appearanceObserver.stop();
      __privateMethod(this, _FrameController_instances, loadSourceURL_fn).call(this);
    }
  }
  async loadResponse(fetchResponse) {
    if (fetchResponse.redirected || fetchResponse.succeeded && fetchResponse.isHTML) {
      this.sourceURL = fetchResponse.response.url;
    }
    try {
      const html = await fetchResponse.responseHTML;
      if (html) {
        const document2 = parseHTMLDocument(html);
        const pageSnapshot = PageSnapshot.fromDocument(document2);
        if (pageSnapshot.isVisitable) {
          await __privateMethod(this, _FrameController_instances, loadFrameResponse_fn).call(this, fetchResponse, document2);
        } else {
          await __privateMethod(this, _FrameController_instances, handleUnvisitableFrameResponse_fn).call(this, fetchResponse);
        }
      }
    } finally {
      this.fetchResponseLoaded = () => Promise.resolve();
    }
  }
  // Appearance observer delegate
  elementAppearedInViewport(element) {
    this.proposeVisitIfNavigatedWithAction(element, getVisitAction(element));
    __privateMethod(this, _FrameController_instances, loadSourceURL_fn).call(this);
  }
  // Form link click observer delegate
  willSubmitFormLinkToLocation(link) {
    return __privateMethod(this, _FrameController_instances, shouldInterceptNavigation_fn).call(this, link);
  }
  submittedFormLinkToLocation(link, _location, form) {
    const frame = __privateMethod(this, _FrameController_instances, findFrameElement_fn2).call(this, link);
    if (frame) form.setAttribute("data-turbo-frame", frame.id);
  }
  // Link interceptor delegate
  shouldInterceptLinkClick(element, _location, _event) {
    return __privateMethod(this, _FrameController_instances, shouldInterceptNavigation_fn).call(this, element);
  }
  linkClickIntercepted(element, location2) {
    __privateMethod(this, _FrameController_instances, navigateFrame_fn).call(this, element, location2);
  }
  // Form submit observer delegate
  willSubmitForm(element, submitter) {
    return element.closest("turbo-frame") == this.element && __privateMethod(this, _FrameController_instances, shouldInterceptNavigation_fn).call(this, element, submitter);
  }
  formSubmitted(element, submitter) {
    if (this.formSubmission) {
      this.formSubmission.stop();
    }
    this.formSubmission = new FormSubmission(this, element, submitter);
    const { fetchRequest } = this.formSubmission;
    this.prepareRequest(fetchRequest);
    this.formSubmission.start();
  }
  // Fetch request delegate
  prepareRequest(request) {
    request.headers["Turbo-Frame"] = this.id;
    if (this.currentNavigationElement?.hasAttribute("data-turbo-stream")) {
      request.acceptResponseType(StreamMessage.contentType);
    }
  }
  requestStarted(_request) {
    markAsBusy(this.element);
  }
  requestPreventedHandlingResponse(_request, _response) {
    __privateGet(this, _resolveVisitPromise).call(this);
  }
  async requestSucceededWithResponse(request, response) {
    await this.loadResponse(response);
    __privateGet(this, _resolveVisitPromise).call(this);
  }
  async requestFailedWithResponse(request, response) {
    await this.loadResponse(response);
    __privateGet(this, _resolveVisitPromise).call(this);
  }
  requestErrored(request, error) {
    console.error(error);
    __privateGet(this, _resolveVisitPromise).call(this);
  }
  requestFinished(_request) {
    clearBusyState(this.element);
  }
  // Form submission delegate
  formSubmissionStarted({ formElement }) {
    markAsBusy(formElement, __privateMethod(this, _FrameController_instances, findFrameElement_fn2).call(this, formElement));
  }
  formSubmissionSucceededWithResponse(formSubmission, response) {
    const frame = __privateMethod(this, _FrameController_instances, findFrameElement_fn2).call(this, formSubmission.formElement, formSubmission.submitter);
    frame.delegate.proposeVisitIfNavigatedWithAction(frame, getVisitAction(formSubmission.submitter, formSubmission.formElement, frame));
    frame.delegate.loadResponse(response);
    if (!formSubmission.isSafe) {
      session.clearCache();
    }
  }
  formSubmissionFailedWithResponse(formSubmission, fetchResponse) {
    this.element.delegate.loadResponse(fetchResponse);
    session.clearCache();
  }
  formSubmissionErrored(formSubmission, error) {
    console.error(error);
  }
  formSubmissionFinished({ formElement }) {
    clearBusyState(formElement, __privateMethod(this, _FrameController_instances, findFrameElement_fn2).call(this, formElement));
  }
  // View delegate
  allowsImmediateRender({ element: newFrame }, options) {
    const event = dispatch("turbo:before-frame-render", {
      target: this.element,
      detail: { newFrame, ...options },
      cancelable: true
    });
    const {
      defaultPrevented,
      detail: { render }
    } = event;
    if (this.view.renderer && render) {
      this.view.renderer.renderElement = render;
    }
    return !defaultPrevented;
  }
  viewRenderedSnapshot(_snapshot, _isPreview, _renderMethod) {
  }
  preloadOnLoadLinksForView(element) {
    session.preloadOnLoadLinksForView(element);
  }
  viewInvalidated() {
  }
  // Frame renderer delegate
  willRenderFrame(currentElement, _newElement) {
    this.previousFrameElement = currentElement.cloneNode(true);
  }
  proposeVisitIfNavigatedWithAction(frame, action = null) {
    this.action = action;
    if (this.action) {
      const pageSnapshot = PageSnapshot.fromElement(frame).clone();
      const { visitCachedSnapshot } = frame.delegate;
      frame.delegate.fetchResponseLoaded = async (fetchResponse) => {
        if (frame.src) {
          const { statusCode, redirected } = fetchResponse;
          const responseHTML = await fetchResponse.responseHTML;
          const response = { statusCode, redirected, responseHTML };
          const options = {
            response,
            visitCachedSnapshot,
            willRender: false,
            updateHistory: false,
            restorationIdentifier: this.restorationIdentifier,
            snapshot: pageSnapshot
          };
          if (this.action) options.action = this.action;
          session.visit(frame.src, options);
        }
      };
    }
  }
  changeHistory() {
    if (this.action) {
      const method = getHistoryMethodForAction(this.action);
      session.history.update(method, expandURL(this.element.src || ""), this.restorationIdentifier);
    }
  }
  async extractForeignFrameElement(container) {
    let element;
    const id = CSS.escape(this.id);
    try {
      element = activateElement(container.querySelector(`turbo-frame#${id}`), this.sourceURL);
      if (element) {
        return element;
      }
      element = activateElement(container.querySelector(`turbo-frame[src][recurse~=${id}]`), this.sourceURL);
      if (element) {
        await element.loaded;
        return await this.extractForeignFrameElement(element);
      }
    } catch (error) {
      console.error(error);
      return new FrameElement();
    }
    return null;
  }
  // Computed properties
  get id() {
    return this.element.id;
  }
  get enabled() {
    return !this.element.disabled;
  }
  get sourceURL() {
    if (this.element.src) {
      return this.element.src;
    }
  }
  set sourceURL(sourceURL) {
    __privateMethod(this, _FrameController_instances, ignoringChangesToAttribute_fn).call(this, "src", () => {
      this.element.src = sourceURL ?? null;
    });
  }
  get loadingStyle() {
    return this.element.loading;
  }
  get isLoading() {
    return this.formSubmission !== void 0 || __privateGet(this, _resolveVisitPromise).call(this) !== void 0;
  }
  get complete() {
    return this.element.hasAttribute("complete");
  }
  set complete(value) {
    if (value) {
      this.element.setAttribute("complete", "");
    } else {
      this.element.removeAttribute("complete");
    }
  }
  get isActive() {
    return this.element.isActive && __privateGet(this, _connected);
  }
  get rootLocation() {
    const meta = this.element.ownerDocument.querySelector(`meta[name="turbo-root"]`);
    const root = meta?.content ?? "/";
    return expandURL(root);
  }
}
_currentFetchRequest = new WeakMap();
_resolveVisitPromise = new WeakMap();
_connected = new WeakMap();
_hasBeenLoaded = new WeakMap();
_ignoredAttributes = new WeakMap();
_FrameController_instances = new WeakSet();
loadSourceURL_fn = async function() {
  if (this.enabled && this.isActive && !this.complete && this.sourceURL) {
    this.element.loaded = __privateMethod(this, _FrameController_instances, visit_fn).call(this, expandURL(this.sourceURL));
    this.appearanceObserver.stop();
    await this.element.loaded;
    __privateSet(this, _hasBeenLoaded, true);
  }
};
loadFrameResponse_fn = async function(fetchResponse, document2) {
  const newFrameElement = await this.extractForeignFrameElement(document2.body);
  if (newFrameElement) {
    const snapshot = new Snapshot(newFrameElement);
    const renderer = new FrameRenderer(this, this.view.snapshot, snapshot, FrameRenderer.renderElement, false, false);
    if (this.view.renderPromise) await this.view.renderPromise;
    this.changeHistory();
    await this.view.render(renderer);
    this.complete = true;
    session.frameRendered(fetchResponse, this.element);
    session.frameLoaded(this.element);
    await this.fetchResponseLoaded(fetchResponse);
  } else if (__privateMethod(this, _FrameController_instances, willHandleFrameMissingFromResponse_fn).call(this, fetchResponse)) {
    __privateMethod(this, _FrameController_instances, handleFrameMissingFromResponse_fn).call(this, fetchResponse);
  }
};
visit_fn = async function(url) {
  const request = new FetchRequest(this, FetchMethod.get, url, new URLSearchParams(), this.element);
  __privateGet(this, _currentFetchRequest)?.cancel();
  __privateSet(this, _currentFetchRequest, request);
  return new Promise((resolve) => {
    __privateSet(this, _resolveVisitPromise, () => {
      __privateSet(this, _resolveVisitPromise, () => {
      });
      __privateSet(this, _currentFetchRequest, null);
      resolve();
    });
    request.perform();
  });
};
navigateFrame_fn = function(element, url, submitter) {
  const frame = __privateMethod(this, _FrameController_instances, findFrameElement_fn2).call(this, element, submitter);
  frame.delegate.proposeVisitIfNavigatedWithAction(frame, getVisitAction(submitter, element, frame));
  __privateMethod(this, _FrameController_instances, withCurrentNavigationElement_fn).call(this, element, () => {
    frame.src = url;
  });
};
handleUnvisitableFrameResponse_fn = async function(fetchResponse) {
  console.warn(
    `The response (${fetchResponse.statusCode}) from <turbo-frame id="${this.element.id}"> is performing a full page visit due to turbo-visit-control.`
  );
  await __privateMethod(this, _FrameController_instances, visitResponse_fn).call(this, fetchResponse.response);
};
willHandleFrameMissingFromResponse_fn = function(fetchResponse) {
  this.element.setAttribute("complete", "");
  const response = fetchResponse.response;
  const visit2 = async (url, options) => {
    if (url instanceof Response) {
      __privateMethod(this, _FrameController_instances, visitResponse_fn).call(this, url);
    } else {
      session.visit(url, options);
    }
  };
  const event = dispatch("turbo:frame-missing", {
    target: this.element,
    detail: { response, visit: visit2 },
    cancelable: true
  });
  return !event.defaultPrevented;
};
handleFrameMissingFromResponse_fn = function(fetchResponse) {
  this.view.missing();
  __privateMethod(this, _FrameController_instances, throwFrameMissingError_fn).call(this, fetchResponse);
};
throwFrameMissingError_fn = function(fetchResponse) {
  const message = `The response (${fetchResponse.statusCode}) did not contain the expected <turbo-frame id="${this.element.id}"> and will be ignored. To perform a full page visit instead, set turbo-visit-control to reload.`;
  throw new TurboFrameMissingError(message);
};
visitResponse_fn = async function(response) {
  const wrapped = new FetchResponse(response);
  const responseHTML = await wrapped.responseHTML;
  const { location: location2, redirected, statusCode } = wrapped;
  return session.visit(location2, { response: { redirected, statusCode, responseHTML } });
};
findFrameElement_fn2 = function(element, submitter) {
  const id = getAttribute("data-turbo-frame", submitter, element) || this.element.getAttribute("target");
  return getFrameElementById(id) ?? this.element;
};
formActionIsVisitable_fn = function(form, submitter) {
  const action = getAction$1(form, submitter);
  return locationIsVisitable(expandURL(action), this.rootLocation);
};
shouldInterceptNavigation_fn = function(element, submitter) {
  const id = getAttribute("data-turbo-frame", submitter, element) || this.element.getAttribute("target");
  if (element instanceof HTMLFormElement && !__privateMethod(this, _FrameController_instances, formActionIsVisitable_fn).call(this, element, submitter)) {
    return false;
  }
  if (!this.enabled || id == "_top") {
    return false;
  }
  if (id) {
    const frameElement = getFrameElementById(id);
    if (frameElement) {
      return !frameElement.disabled;
    }
  }
  if (!session.elementIsNavigatable(element)) {
    return false;
  }
  if (submitter && !session.elementIsNavigatable(submitter)) {
    return false;
  }
  return true;
};
isIgnoringChangesTo_fn = function(attributeName) {
  return __privateGet(this, _ignoredAttributes).has(attributeName);
};
ignoringChangesToAttribute_fn = function(attributeName, callback) {
  __privateGet(this, _ignoredAttributes).add(attributeName);
  callback();
  __privateGet(this, _ignoredAttributes).delete(attributeName);
};
withCurrentNavigationElement_fn = function(element, callback) {
  this.currentNavigationElement = element;
  callback();
  delete this.currentNavigationElement;
};
function getFrameElementById(id) {
  if (id != null) {
    const element = document.getElementById(id);
    if (element instanceof FrameElement) {
      return element;
    }
  }
}
function activateElement(element, currentURL) {
  if (element) {
    const src = element.getAttribute("src");
    if (src != null && currentURL != null && urlsAreEqual(src, currentURL)) {
      throw new Error(`Matching <turbo-frame id="${element.id}"> element has a source URL which references itself`);
    }
    if (element.ownerDocument !== document) {
      element = document.importNode(element, true);
    }
    if (element instanceof FrameElement) {
      element.connectedCallback();
      element.disconnectedCallback();
      return element;
    }
  }
}
const StreamActions = {
  after() {
    this.targetElements.forEach((e) => e.parentElement?.insertBefore(this.templateContent, e.nextSibling));
  },
  append() {
    this.removeDuplicateTargetChildren();
    this.targetElements.forEach((e) => e.append(this.templateContent));
  },
  before() {
    this.targetElements.forEach((e) => e.parentElement?.insertBefore(this.templateContent, e));
  },
  prepend() {
    this.removeDuplicateTargetChildren();
    this.targetElements.forEach((e) => e.prepend(this.templateContent));
  },
  remove() {
    this.targetElements.forEach((e) => e.remove());
  },
  replace() {
    this.targetElements.forEach((e) => e.replaceWith(this.templateContent));
  },
  update() {
    this.targetElements.forEach((targetElement) => {
      targetElement.innerHTML = "";
      targetElement.append(this.templateContent);
    });
  },
  refresh() {
    session.refresh(this.baseURI, this.requestId);
  }
};
const _StreamElement = class _StreamElement extends HTMLElement {
  constructor() {
    super(...arguments);
    __privateAdd(this, _StreamElement_instances);
  }
  static async renderElement(newElement) {
    await newElement.performAction();
  }
  async connectedCallback() {
    try {
      await this.render();
    } catch (error) {
      console.error(error);
    } finally {
      this.disconnect();
    }
  }
  async render() {
    return this.renderPromise ??= (async () => {
      const event = this.beforeRenderEvent;
      if (this.dispatchEvent(event)) {
        await nextRepaint();
        await event.detail.render(this);
      }
    })();
  }
  disconnect() {
    try {
      this.remove();
    } catch {
    }
  }
  /**
   * Removes duplicate children (by ID)
   */
  removeDuplicateTargetChildren() {
    this.duplicateChildren.forEach((c) => c.remove());
  }
  /**
   * Gets the list of duplicate children (i.e. those with the same ID)
   */
  get duplicateChildren() {
    const existingChildren = this.targetElements.flatMap((e) => [...e.children]).filter((c) => !!c.id);
    const newChildrenIds = [...this.templateContent?.children || []].filter((c) => !!c.id).map((c) => c.id);
    return existingChildren.filter((c) => newChildrenIds.includes(c.id));
  }
  /**
   * Gets the action function to be performed.
   */
  get performAction() {
    if (this.action) {
      const actionFunction = StreamActions[this.action];
      if (actionFunction) {
        return actionFunction;
      }
      __privateMethod(this, _StreamElement_instances, raise_fn).call(this, "unknown action");
    }
    __privateMethod(this, _StreamElement_instances, raise_fn).call(this, "action attribute is missing");
  }
  /**
   * Gets the target elements which the template will be rendered to.
   */
  get targetElements() {
    if (this.target) {
      return this.targetElementsById;
    } else if (this.targets) {
      return this.targetElementsByQuery;
    } else {
      __privateMethod(this, _StreamElement_instances, raise_fn).call(this, "target or targets attribute is missing");
    }
  }
  /**
   * Gets the contents of the main `<template>`.
   */
  get templateContent() {
    return this.templateElement.content.cloneNode(true);
  }
  /**
   * Gets the main `<template>` used for rendering
   */
  get templateElement() {
    if (this.firstElementChild === null) {
      const template = this.ownerDocument.createElement("template");
      this.appendChild(template);
      return template;
    } else if (this.firstElementChild instanceof HTMLTemplateElement) {
      return this.firstElementChild;
    }
    __privateMethod(this, _StreamElement_instances, raise_fn).call(this, "first child element must be a <template> element");
  }
  /**
   * Gets the current action.
   */
  get action() {
    return this.getAttribute("action");
  }
  /**
   * Gets the current target (an element ID) to which the result will
   * be rendered.
   */
  get target() {
    return this.getAttribute("target");
  }
  /**
   * Gets the current "targets" selector (a CSS selector)
   */
  get targets() {
    return this.getAttribute("targets");
  }
  /**
   * Reads the request-id attribute
   */
  get requestId() {
    return this.getAttribute("request-id");
  }
  get description() {
    return (this.outerHTML.match(/<[^>]+>/) ?? [])[0] ?? "<turbo-stream>";
  }
  get beforeRenderEvent() {
    return new CustomEvent("turbo:before-stream-render", {
      bubbles: true,
      cancelable: true,
      detail: { newStream: this, render: _StreamElement.renderElement }
    });
  }
  get targetElementsById() {
    const element = this.ownerDocument?.getElementById(this.target);
    if (element !== null) {
      return [element];
    } else {
      return [];
    }
  }
  get targetElementsByQuery() {
    const elements = this.ownerDocument?.querySelectorAll(this.targets);
    if (elements.length !== 0) {
      return Array.prototype.slice.call(elements);
    } else {
      return [];
    }
  }
};
_StreamElement_instances = new WeakSet();
raise_fn = function(message) {
  throw new Error(`${this.description}: ${message}`);
};
let StreamElement = _StreamElement;
class StreamSourceElement extends HTMLElement {
  constructor() {
    super(...arguments);
    __publicField(this, "streamSource", null);
  }
  connectedCallback() {
    this.streamSource = this.src.match(/^ws{1,2}:/) ? new WebSocket(this.src) : new EventSource(this.src);
    connectStreamSource(this.streamSource);
  }
  disconnectedCallback() {
    if (this.streamSource) {
      this.streamSource.close();
      disconnectStreamSource(this.streamSource);
    }
  }
  get src() {
    return this.getAttribute("src") || "";
  }
}
FrameElement.delegateConstructor = FrameController;
if (customElements.get("turbo-frame") === void 0) {
  customElements.define("turbo-frame", FrameElement);
}
if (customElements.get("turbo-stream") === void 0) {
  customElements.define("turbo-stream", StreamElement);
}
if (customElements.get("turbo-stream-source") === void 0) {
  customElements.define("turbo-stream-source", StreamSourceElement);
}
(() => {
  let element = document.currentScript;
  if (!element) return;
  if (element.hasAttribute("data-turbo-suppress-warning")) return;
  element = element.parentElement;
  while (element) {
    if (element == document.body) {
      return console.warn(
        unindent`
        You are loading Turbo from a <script> element inside the <body> element. This is probably not what you meant to do!

        Load your application’s JavaScript bundle inside the <head> element instead. <script> elements in <body> are evaluated with each page change.

        For more information, see: https://turbo.hotwired.dev/handbook/building#working-with-script-elements

        ——
        Suppress this warning by adding a "data-turbo-suppress-warning" attribute to: %s
      `,
        element.outerHTML
      );
    }
    element = element.parentElement;
  }
})();
window.Turbo = { ...Turbo, StreamActions };
start();



/***/ }),

/***/ "./node_modules/@rails/actioncable/src/adapters.js":
/*!*********************************************************!*\
  !*** ./node_modules/@rails/actioncable/src/adapters.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  logger: typeof console !== "undefined" ? console : void 0,
  WebSocket: typeof WebSocket !== "undefined" ? WebSocket : void 0
});


/***/ }),

/***/ "./node_modules/@rails/actioncable/src/connection.js":
/*!***********************************************************!*\
  !*** ./node_modules/@rails/actioncable/src/connection.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _adapters__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./adapters */ "./node_modules/@rails/actioncable/src/adapters.js");
/* harmony import */ var _connection_monitor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./connection_monitor */ "./node_modules/@rails/actioncable/src/connection_monitor.js");
/* harmony import */ var _internal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal */ "./node_modules/@rails/actioncable/src/internal.js");
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./logger */ "./node_modules/@rails/actioncable/src/logger.js");




const { message_types, protocols } = _internal__WEBPACK_IMPORTED_MODULE_2__["default"];
const supportedProtocols = protocols.slice(0, protocols.length - 1);
const indexOf = [].indexOf;
class Connection {
  constructor(consumer) {
    this.open = this.open.bind(this);
    this.consumer = consumer;
    this.subscriptions = this.consumer.subscriptions;
    this.monitor = new _connection_monitor__WEBPACK_IMPORTED_MODULE_1__["default"](this);
    this.disconnected = true;
  }
  send(data) {
    if (this.isOpen()) {
      this.webSocket.send(JSON.stringify(data));
      return true;
    } else {
      return false;
    }
  }
  open() {
    if (this.isActive()) {
      _logger__WEBPACK_IMPORTED_MODULE_3__["default"].log(`Attempted to open WebSocket, but existing socket is ${this.getState()}`);
      return false;
    } else {
      const socketProtocols = [...protocols, ...this.consumer.subprotocols || []];
      _logger__WEBPACK_IMPORTED_MODULE_3__["default"].log(`Opening WebSocket, current state is ${this.getState()}, subprotocols: ${socketProtocols}`);
      if (this.webSocket) {
        this.uninstallEventHandlers();
      }
      this.webSocket = new _adapters__WEBPACK_IMPORTED_MODULE_0__["default"].WebSocket(this.consumer.url, socketProtocols);
      this.installEventHandlers();
      this.monitor.start();
      return true;
    }
  }
  close({ allowReconnect } = { allowReconnect: true }) {
    if (!allowReconnect) {
      this.monitor.stop();
    }
    if (this.isOpen()) {
      return this.webSocket.close();
    }
  }
  reopen() {
    _logger__WEBPACK_IMPORTED_MODULE_3__["default"].log(`Reopening WebSocket, current state is ${this.getState()}`);
    if (this.isActive()) {
      try {
        return this.close();
      } catch (error) {
        _logger__WEBPACK_IMPORTED_MODULE_3__["default"].log("Failed to reopen WebSocket", error);
      } finally {
        _logger__WEBPACK_IMPORTED_MODULE_3__["default"].log(`Reopening WebSocket in ${this.constructor.reopenDelay}ms`);
        setTimeout(this.open, this.constructor.reopenDelay);
      }
    } else {
      return this.open();
    }
  }
  getProtocol() {
    if (this.webSocket) {
      return this.webSocket.protocol;
    }
  }
  isOpen() {
    return this.isState("open");
  }
  isActive() {
    return this.isState("open", "connecting");
  }
  triedToReconnect() {
    return this.monitor.reconnectAttempts > 0;
  }
  // Private
  isProtocolSupported() {
    return indexOf.call(supportedProtocols, this.getProtocol()) >= 0;
  }
  isState(...states) {
    return indexOf.call(states, this.getState()) >= 0;
  }
  getState() {
    if (this.webSocket) {
      for (let state in _adapters__WEBPACK_IMPORTED_MODULE_0__["default"].WebSocket) {
        if (_adapters__WEBPACK_IMPORTED_MODULE_0__["default"].WebSocket[state] === this.webSocket.readyState) {
          return state.toLowerCase();
        }
      }
    }
    return null;
  }
  installEventHandlers() {
    for (let eventName in this.events) {
      const handler = this.events[eventName].bind(this);
      this.webSocket[`on${eventName}`] = handler;
    }
  }
  uninstallEventHandlers() {
    for (let eventName in this.events) {
      this.webSocket[`on${eventName}`] = function() {
      };
    }
  }
}
Connection.reopenDelay = 500;
Connection.prototype.events = {
  message(event) {
    if (!this.isProtocolSupported()) {
      return;
    }
    const { identifier, message, reason, reconnect, type } = JSON.parse(event.data);
    switch (type) {
      case message_types.welcome:
        if (this.triedToReconnect()) {
          this.reconnectAttempted = true;
        }
        this.monitor.recordConnect();
        return this.subscriptions.reload();
      case message_types.disconnect:
        _logger__WEBPACK_IMPORTED_MODULE_3__["default"].log(`Disconnecting. Reason: ${reason}`);
        return this.close({ allowReconnect: reconnect });
      case message_types.ping:
        return this.monitor.recordPing();
      case message_types.confirmation:
        this.subscriptions.confirmSubscription(identifier);
        if (this.reconnectAttempted) {
          this.reconnectAttempted = false;
          return this.subscriptions.notify(identifier, "connected", { reconnected: true });
        } else {
          return this.subscriptions.notify(identifier, "connected", { reconnected: false });
        }
      case message_types.rejection:
        return this.subscriptions.reject(identifier);
      default:
        return this.subscriptions.notify(identifier, "received", message);
    }
  },
  open() {
    _logger__WEBPACK_IMPORTED_MODULE_3__["default"].log(`WebSocket onopen event, using '${this.getProtocol()}' subprotocol`);
    this.disconnected = false;
    if (!this.isProtocolSupported()) {
      _logger__WEBPACK_IMPORTED_MODULE_3__["default"].log("Protocol is unsupported. Stopping monitor and disconnecting.");
      return this.close({ allowReconnect: false });
    }
  },
  close(event) {
    _logger__WEBPACK_IMPORTED_MODULE_3__["default"].log("WebSocket onclose event");
    if (this.disconnected) {
      return;
    }
    this.disconnected = true;
    this.monitor.recordDisconnect();
    return this.subscriptions.notifyAll("disconnected", { willAttemptReconnect: this.monitor.isRunning() });
  },
  error() {
    _logger__WEBPACK_IMPORTED_MODULE_3__["default"].log("WebSocket onerror event");
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Connection);


/***/ }),

/***/ "./node_modules/@rails/actioncable/src/connection_monitor.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@rails/actioncable/src/connection_monitor.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./logger */ "./node_modules/@rails/actioncable/src/logger.js");

const now = () => (/* @__PURE__ */ new Date()).getTime();
const secondsSince = (time) => (now() - time) / 1e3;
class ConnectionMonitor {
  constructor(connection) {
    this.visibilityDidChange = this.visibilityDidChange.bind(this);
    this.connection = connection;
    this.reconnectAttempts = 0;
  }
  start() {
    if (!this.isRunning()) {
      this.startedAt = now();
      delete this.stoppedAt;
      this.startPolling();
      addEventListener("visibilitychange", this.visibilityDidChange);
      _logger__WEBPACK_IMPORTED_MODULE_0__["default"].log(`ConnectionMonitor started. stale threshold = ${this.constructor.staleThreshold} s`);
    }
  }
  stop() {
    if (this.isRunning()) {
      this.stoppedAt = now();
      this.stopPolling();
      removeEventListener("visibilitychange", this.visibilityDidChange);
      _logger__WEBPACK_IMPORTED_MODULE_0__["default"].log("ConnectionMonitor stopped");
    }
  }
  isRunning() {
    return this.startedAt && !this.stoppedAt;
  }
  recordPing() {
    this.pingedAt = now();
  }
  recordConnect() {
    this.reconnectAttempts = 0;
    this.recordPing();
    delete this.disconnectedAt;
    _logger__WEBPACK_IMPORTED_MODULE_0__["default"].log("ConnectionMonitor recorded connect");
  }
  recordDisconnect() {
    this.disconnectedAt = now();
    _logger__WEBPACK_IMPORTED_MODULE_0__["default"].log("ConnectionMonitor recorded disconnect");
  }
  // Private
  startPolling() {
    this.stopPolling();
    this.poll();
  }
  stopPolling() {
    clearTimeout(this.pollTimeout);
  }
  poll() {
    this.pollTimeout = setTimeout(
      () => {
        this.reconnectIfStale();
        this.poll();
      },
      this.getPollInterval()
    );
  }
  getPollInterval() {
    const { staleThreshold, reconnectionBackoffRate } = this.constructor;
    const backoff = Math.pow(1 + reconnectionBackoffRate, Math.min(this.reconnectAttempts, 10));
    const jitterMax = this.reconnectAttempts === 0 ? 1 : reconnectionBackoffRate;
    const jitter = jitterMax * Math.random();
    return staleThreshold * 1e3 * backoff * (1 + jitter);
  }
  reconnectIfStale() {
    if (this.connectionIsStale()) {
      _logger__WEBPACK_IMPORTED_MODULE_0__["default"].log(`ConnectionMonitor detected stale connection. reconnectAttempts = ${this.reconnectAttempts}, time stale = ${secondsSince(this.refreshedAt)} s, stale threshold = ${this.constructor.staleThreshold} s`);
      this.reconnectAttempts++;
      if (this.disconnectedRecently()) {
        _logger__WEBPACK_IMPORTED_MODULE_0__["default"].log(`ConnectionMonitor skipping reopening recent disconnect. time disconnected = ${secondsSince(this.disconnectedAt)} s`);
      } else {
        _logger__WEBPACK_IMPORTED_MODULE_0__["default"].log("ConnectionMonitor reopening");
        this.connection.reopen();
      }
    }
  }
  get refreshedAt() {
    return this.pingedAt ? this.pingedAt : this.startedAt;
  }
  connectionIsStale() {
    return secondsSince(this.refreshedAt) > this.constructor.staleThreshold;
  }
  disconnectedRecently() {
    return this.disconnectedAt && secondsSince(this.disconnectedAt) < this.constructor.staleThreshold;
  }
  visibilityDidChange() {
    if (document.visibilityState === "visible") {
      setTimeout(
        () => {
          if (this.connectionIsStale() || !this.connection.isOpen()) {
            _logger__WEBPACK_IMPORTED_MODULE_0__["default"].log(`ConnectionMonitor reopening stale connection on visibilitychange. visibilityState = ${document.visibilityState}`);
            this.connection.reopen();
          }
        },
        200
      );
    }
  }
}
ConnectionMonitor.staleThreshold = 6;
ConnectionMonitor.reconnectionBackoffRate = 0.15;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ConnectionMonitor);


/***/ }),

/***/ "./node_modules/@rails/actioncable/src/consumer.js":
/*!*********************************************************!*\
  !*** ./node_modules/@rails/actioncable/src/consumer.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createWebSocketURL: () => (/* binding */ createWebSocketURL),
/* harmony export */   "default": () => (/* binding */ Consumer)
/* harmony export */ });
/* harmony import */ var _connection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./connection */ "./node_modules/@rails/actioncable/src/connection.js");
/* harmony import */ var _subscriptions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./subscriptions */ "./node_modules/@rails/actioncable/src/subscriptions.js");


class Consumer {
  constructor(url) {
    this._url = url;
    this.subscriptions = new _subscriptions__WEBPACK_IMPORTED_MODULE_1__["default"](this);
    this.connection = new _connection__WEBPACK_IMPORTED_MODULE_0__["default"](this);
    this.subprotocols = [];
  }
  get url() {
    return createWebSocketURL(this._url);
  }
  send(data) {
    return this.connection.send(data);
  }
  connect() {
    return this.connection.open();
  }
  disconnect() {
    return this.connection.close({ allowReconnect: false });
  }
  ensureActiveConnection() {
    if (!this.connection.isActive()) {
      return this.connection.open();
    }
  }
  addSubProtocol(subprotocol) {
    this.subprotocols = [...this.subprotocols, subprotocol];
  }
}
function createWebSocketURL(url) {
  if (typeof url === "function") {
    url = url();
  }
  if (url && !/^wss?:/i.test(url)) {
    const a = document.createElement("a");
    a.href = url;
    a.href = a.href;
    a.protocol = a.protocol.replace("http", "ws");
    return a.href;
  } else {
    return url;
  }
}


/***/ }),

/***/ "./node_modules/@rails/actioncable/src/index.js":
/*!******************************************************!*\
  !*** ./node_modules/@rails/actioncable/src/index.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Connection: () => (/* reexport safe */ _connection__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   ConnectionMonitor: () => (/* reexport safe */ _connection_monitor__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   Consumer: () => (/* reexport safe */ _consumer__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   INTERNAL: () => (/* reexport safe */ _internal__WEBPACK_IMPORTED_MODULE_3__["default"]),
/* harmony export */   Subscription: () => (/* reexport safe */ _subscription__WEBPACK_IMPORTED_MODULE_4__["default"]),
/* harmony export */   SubscriptionGuarantor: () => (/* reexport safe */ _subscription_guarantor__WEBPACK_IMPORTED_MODULE_6__["default"]),
/* harmony export */   Subscriptions: () => (/* reexport safe */ _subscriptions__WEBPACK_IMPORTED_MODULE_5__["default"]),
/* harmony export */   adapters: () => (/* reexport safe */ _adapters__WEBPACK_IMPORTED_MODULE_7__["default"]),
/* harmony export */   createConsumer: () => (/* binding */ createConsumer),
/* harmony export */   createWebSocketURL: () => (/* reexport safe */ _consumer__WEBPACK_IMPORTED_MODULE_2__.createWebSocketURL),
/* harmony export */   getConfig: () => (/* binding */ getConfig),
/* harmony export */   logger: () => (/* reexport safe */ _logger__WEBPACK_IMPORTED_MODULE_8__["default"])
/* harmony export */ });
/* harmony import */ var _connection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./connection */ "./node_modules/@rails/actioncable/src/connection.js");
/* harmony import */ var _connection_monitor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./connection_monitor */ "./node_modules/@rails/actioncable/src/connection_monitor.js");
/* harmony import */ var _consumer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./consumer */ "./node_modules/@rails/actioncable/src/consumer.js");
/* harmony import */ var _internal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./internal */ "./node_modules/@rails/actioncable/src/internal.js");
/* harmony import */ var _subscription__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./subscription */ "./node_modules/@rails/actioncable/src/subscription.js");
/* harmony import */ var _subscriptions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./subscriptions */ "./node_modules/@rails/actioncable/src/subscriptions.js");
/* harmony import */ var _subscription_guarantor__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./subscription_guarantor */ "./node_modules/@rails/actioncable/src/subscription_guarantor.js");
/* harmony import */ var _adapters__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./adapters */ "./node_modules/@rails/actioncable/src/adapters.js");
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./logger */ "./node_modules/@rails/actioncable/src/logger.js");










function createConsumer(url = getConfig("url") || _internal__WEBPACK_IMPORTED_MODULE_3__["default"].default_mount_path) {
  return new _consumer__WEBPACK_IMPORTED_MODULE_2__["default"](url);
}
function getConfig(name) {
  const element = document.head.querySelector(`meta[name='action-cable-${name}']`);
  if (element) {
    return element.getAttribute("content");
  }
}


/***/ }),

/***/ "./node_modules/@rails/actioncable/src/internal.js":
/*!*********************************************************!*\
  !*** ./node_modules/@rails/actioncable/src/internal.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  "message_types": {
    "welcome": "welcome",
    "disconnect": "disconnect",
    "ping": "ping",
    "confirmation": "confirm_subscription",
    "rejection": "reject_subscription"
  },
  "disconnect_reasons": {
    "unauthorized": "unauthorized",
    "invalid_request": "invalid_request",
    "server_restart": "server_restart",
    "remote": "remote"
  },
  "default_mount_path": "/cable",
  "protocols": [
    "actioncable-v1-json",
    "actioncable-unsupported"
  ]
});


/***/ }),

/***/ "./node_modules/@rails/actioncable/src/logger.js":
/*!*******************************************************!*\
  !*** ./node_modules/@rails/actioncable/src/logger.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _adapters__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./adapters */ "./node_modules/@rails/actioncable/src/adapters.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  log(...messages) {
    if (this.enabled) {
      messages.push(Date.now());
      _adapters__WEBPACK_IMPORTED_MODULE_0__["default"].logger.log("[ActionCable]", ...messages);
    }
  }
});


/***/ }),

/***/ "./node_modules/@rails/actioncable/src/subscription.js":
/*!*************************************************************!*\
  !*** ./node_modules/@rails/actioncable/src/subscription.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Subscription)
/* harmony export */ });
const extend = function(object, properties) {
  if (properties != null) {
    for (let key in properties) {
      const value = properties[key];
      object[key] = value;
    }
  }
  return object;
};
class Subscription {
  constructor(consumer, params = {}, mixin) {
    this.consumer = consumer;
    this.identifier = JSON.stringify(params);
    extend(this, mixin);
  }
  // Perform a channel action with the optional data passed as an attribute
  perform(action, data = {}) {
    data.action = action;
    return this.send(data);
  }
  send(data) {
    return this.consumer.send({ command: "message", identifier: this.identifier, data: JSON.stringify(data) });
  }
  unsubscribe() {
    return this.consumer.subscriptions.remove(this);
  }
}


/***/ }),

/***/ "./node_modules/@rails/actioncable/src/subscription_guarantor.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@rails/actioncable/src/subscription_guarantor.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./logger */ "./node_modules/@rails/actioncable/src/logger.js");

class SubscriptionGuarantor {
  constructor(subscriptions) {
    this.subscriptions = subscriptions;
    this.pendingSubscriptions = [];
  }
  guarantee(subscription) {
    if (this.pendingSubscriptions.indexOf(subscription) == -1) {
      _logger__WEBPACK_IMPORTED_MODULE_0__["default"].log(`SubscriptionGuarantor guaranteeing ${subscription.identifier}`);
      this.pendingSubscriptions.push(subscription);
    } else {
      _logger__WEBPACK_IMPORTED_MODULE_0__["default"].log(`SubscriptionGuarantor already guaranteeing ${subscription.identifier}`);
    }
    this.startGuaranteeing();
  }
  forget(subscription) {
    _logger__WEBPACK_IMPORTED_MODULE_0__["default"].log(`SubscriptionGuarantor forgetting ${subscription.identifier}`);
    this.pendingSubscriptions = this.pendingSubscriptions.filter((s) => s !== subscription);
  }
  startGuaranteeing() {
    this.stopGuaranteeing();
    this.retrySubscribing();
  }
  stopGuaranteeing() {
    clearTimeout(this.retryTimeout);
  }
  retrySubscribing() {
    this.retryTimeout = setTimeout(
      () => {
        if (this.subscriptions && typeof this.subscriptions.subscribe === "function") {
          this.pendingSubscriptions.map((subscription) => {
            _logger__WEBPACK_IMPORTED_MODULE_0__["default"].log(`SubscriptionGuarantor resubscribing ${subscription.identifier}`);
            this.subscriptions.subscribe(subscription);
          });
        }
      },
      500
    );
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SubscriptionGuarantor);


/***/ }),

/***/ "./node_modules/@rails/actioncable/src/subscriptions.js":
/*!**************************************************************!*\
  !*** ./node_modules/@rails/actioncable/src/subscriptions.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Subscriptions)
/* harmony export */ });
/* harmony import */ var _subscription__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./subscription */ "./node_modules/@rails/actioncable/src/subscription.js");
/* harmony import */ var _subscription_guarantor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./subscription_guarantor */ "./node_modules/@rails/actioncable/src/subscription_guarantor.js");
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./logger */ "./node_modules/@rails/actioncable/src/logger.js");



class Subscriptions {
  constructor(consumer) {
    this.consumer = consumer;
    this.guarantor = new _subscription_guarantor__WEBPACK_IMPORTED_MODULE_1__["default"](this);
    this.subscriptions = [];
  }
  create(channelName, mixin) {
    const channel = channelName;
    const params = typeof channel === "object" ? channel : { channel };
    const subscription = new _subscription__WEBPACK_IMPORTED_MODULE_0__["default"](this.consumer, params, mixin);
    return this.add(subscription);
  }
  // Private
  add(subscription) {
    this.subscriptions.push(subscription);
    this.consumer.ensureActiveConnection();
    this.notify(subscription, "initialized");
    this.subscribe(subscription);
    return subscription;
  }
  remove(subscription) {
    this.forget(subscription);
    if (!this.findAll(subscription.identifier).length) {
      this.sendCommand(subscription, "unsubscribe");
    }
    return subscription;
  }
  reject(identifier) {
    return this.findAll(identifier).map((subscription) => {
      this.forget(subscription);
      this.notify(subscription, "rejected");
      return subscription;
    });
  }
  forget(subscription) {
    this.guarantor.forget(subscription);
    this.subscriptions = this.subscriptions.filter((s) => s !== subscription);
    return subscription;
  }
  findAll(identifier) {
    return this.subscriptions.filter((s) => s.identifier === identifier);
  }
  reload() {
    return this.subscriptions.map((subscription) => this.subscribe(subscription));
  }
  notifyAll(callbackName, ...args) {
    return this.subscriptions.map((subscription) => this.notify(subscription, callbackName, ...args));
  }
  notify(subscription, callbackName, ...args) {
    let subscriptions;
    if (typeof subscription === "string") {
      subscriptions = this.findAll(subscription);
    } else {
      subscriptions = [subscription];
    }
    return subscriptions.map((subscription2) => typeof subscription2[callbackName] === "function" ? subscription2[callbackName](...args) : void 0);
  }
  subscribe(subscription) {
    if (this.sendCommand(subscription, "subscribe")) {
      this.guarantor.guarantee(subscription);
    }
  }
  confirmSubscription(identifier) {
    _logger__WEBPACK_IMPORTED_MODULE_2__["default"].log(`Subscription confirmed ${identifier}`);
    this.findAll(identifier).map((subscription) => this.guarantor.forget(subscription));
  }
  sendCommand(subscription, command) {
    const { identifier } = subscription;
    return this.consumer.send({ command, identifier });
  }
}


/***/ }),

/***/ "./app/javascript/controllers/application.js":
/*!***************************************************!*\
  !*** ./app/javascript/controllers/application.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   application: () => (/* binding */ application)
/* harmony export */ });
/* harmony import */ var _hotwired_stimulus__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @hotwired/stimulus */ "./node_modules/@hotwired/stimulus/dist/stimulus.js");

const application = _hotwired_stimulus__WEBPACK_IMPORTED_MODULE_0__.Application.start();
application.debug = false;
window.Stimulus = application;



/***/ }),

/***/ "./app/javascript/controllers/index.js":
/*!*********************************************!*\
  !*** ./app/javascript/controllers/index.js ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _application__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./application */ "./app/javascript/controllers/application.js");
/* harmony import */ var _notifications_controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./notifications_controller */ "./app/javascript/controllers/notifications_controller.js");
/* harmony import */ var _rank_controller__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./rank_controller */ "./app/javascript/controllers/rank_controller.js");
/* harmony import */ var _removals_controller__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./removals_controller */ "./app/javascript/controllers/removals_controller.js");
/* harmony import */ var _toggle_controller__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./toggle_controller */ "./app/javascript/controllers/toggle_controller.js");


_application__WEBPACK_IMPORTED_MODULE_0__.application.register("notifications", _notifications_controller__WEBPACK_IMPORTED_MODULE_1__["default"]);

_application__WEBPACK_IMPORTED_MODULE_0__.application.register("rank", _rank_controller__WEBPACK_IMPORTED_MODULE_2__["default"]);

_application__WEBPACK_IMPORTED_MODULE_0__.application.register("removals", _removals_controller__WEBPACK_IMPORTED_MODULE_3__["default"]);

_application__WEBPACK_IMPORTED_MODULE_0__.application.register("toggle", _toggle_controller__WEBPACK_IMPORTED_MODULE_4__["default"]);


/***/ }),

/***/ "./app/javascript/controllers/notifications_controller.js":
/*!****************************************************************!*\
  !*** ./app/javascript/controllers/notifications_controller.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ notifications_controller_default)
/* harmony export */ });
/* harmony import */ var _hotwired_stimulus__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @hotwired/stimulus */ "./node_modules/@hotwired/stimulus/dist/stimulus.js");
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

class notifications_controller_default extends _hotwired_stimulus__WEBPACK_IMPORTED_MODULE_0__.Controller {
  connect() {
  }
  itemTargetConnected(element) {
    element.classList.add("animate");
  }
}
__publicField(notifications_controller_default, "targets", ["item"]);


/***/ }),

/***/ "./app/javascript/controllers/rank_controller.js":
/*!*******************************************************!*\
  !*** ./app/javascript/controllers/rank_controller.js ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ rank_controller_default)
/* harmony export */ });
/* harmony import */ var _hotwired_stimulus__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @hotwired/stimulus */ "./node_modules/@hotwired/stimulus/dist/stimulus.js");
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

class rank_controller_default extends _hotwired_stimulus__WEBPACK_IMPORTED_MODULE_0__.Controller {
  connect() {
    this.selectedRank = null;
  }
  select(event) {
    event.preventDefault();
    const button = event.currentTarget;
    this.selectedRank = button.dataset.rank;
    this.inputTarget.value = this.selectedRank;
    this.buttonTargets.forEach((btn) => btn.classList.remove("btn--active"));
    button.classList.add("btn--active");
  }
}
__publicField(rank_controller_default, "targets", ["input", "button"]);


/***/ }),

/***/ "./app/javascript/controllers/removals_controller.js":
/*!***********************************************************!*\
  !*** ./app/javascript/controllers/removals_controller.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _hotwired_stimulus__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @hotwired/stimulus */ "./node_modules/@hotwired/stimulus/dist/stimulus.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (class extends _hotwired_stimulus__WEBPACK_IMPORTED_MODULE_0__.Controller {
  remove() {
    this.element.remove();
  }
});


/***/ }),

/***/ "./app/javascript/controllers/toggle_controller.js":
/*!*********************************************************!*\
  !*** ./app/javascript/controllers/toggle_controller.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ toggle_controller_default)
/* harmony export */ });
/* harmony import */ var _hotwired_stimulus__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @hotwired/stimulus */ "./node_modules/@hotwired/stimulus/dist/stimulus.js");
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

class toggle_controller_default extends _hotwired_stimulus__WEBPACK_IMPORTED_MODULE_0__.Controller {
  connect() {
    if (this.performOnConnectValue) this.perform();
  }
  perform() {
    if (this.hasElementTarget) {
      this.elementTargets.forEach(this._toggleActiveClass);
    } else {
      this._toggleActiveClass(this.element);
    }
  }
  on() {
    if (this.hasElementTarget) {
      this.elementTargets.forEach((element) => this._toggleActiveClass(element, true));
    } else {
      this._toggleActiveClass(this.element, true);
    }
  }
  off() {
    if (this.hasElementTarget) {
      this.elementTargets.forEach((element) => this._toggleActiveClass(element, false));
    } else {
      this._toggleActiveClass(this.element, false);
    }
  }
  _toggleActiveClass(element, direction = !element.classList.contains(this.activeClass)) {
    setTimeout(() => {
      element.classList.toggle(this.activeClass, direction);
    }, 0);
  }
}
__publicField(toggle_controller_default, "targets", ["element"]);
__publicField(toggle_controller_default, "classes", ["active"]);
__publicField(toggle_controller_default, "values", {
  performOnConnect: {
    type: Boolean,
    default: false
  }
});


/***/ }),

/***/ "./app/javascript/initializers/frame_missing_handler.js":
/*!**************************************************************!*\
  !*** ./app/javascript/initializers/frame_missing_handler.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
document.addEventListener("turbo:frame-missing", (event) => {
  if (event.target.id === "modal" || event.target.id === "panel") {
    event.preventDefault();
    event.detail.visit(event.detail.response.url, { action: "replace", referrer: location.href });
  }
});


/***/ }),

/***/ "./app/javascript/initializers/honeybadger.js":
/*!****************************************************!*\
  !*** ./app/javascript/initializers/honeybadger.js ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _honeybadger_io_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @honeybadger-io/js */ "./node_modules/@honeybadger-io/js/dist/browser/honeybadger.js");

if (false) {}


/***/ }),

/***/ "./app/javascript/initializers/turbo_confirm.js":
/*!******************************************************!*\
  !*** ./app/javascript/initializers/turbo_confirm.js ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _rolemodel_turbo_confirm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @rolemodel/turbo-confirm */ "./node_modules/@rolemodel/turbo-confirm/src/index.js");

_rolemodel_turbo_confirm__WEBPACK_IMPORTED_MODULE_0__["default"].start({ activeClass: "confirm-dialog-wrapper--active" });


/***/ }),

/***/ "./node_modules/@rolemodel/turbo-confirm/src/index.js":
/*!************************************************************!*\
  !*** ./node_modules/@rolemodel/turbo-confirm/src/index.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TurboConfirm: () => (/* reexport safe */ _lib_TurboConfirm_js__WEBPACK_IMPORTED_MODULE_1__.TurboConfirm),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _lib_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/utils.js */ "./node_modules/@rolemodel/turbo-confirm/src/lib/utils.js");
/* harmony import */ var _lib_TurboConfirm_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/TurboConfirm.js */ "./node_modules/@rolemodel/turbo-confirm/src/lib/TurboConfirm.js");


const start = (options) => {
  const tc = new _lib_TurboConfirm_js__WEBPACK_IMPORTED_MODULE_1__.TurboConfirm(options);
  if (!window.Turbo) throw _lib_utils_js__WEBPACK_IMPORTED_MODULE_0__.TurboConfirmError.noTurbo();
  window.Turbo.setConfirmMethod(async (message, formElement, submitter) => {
    const response = await tc.confirm(message, formElement, submitter);
    if (response) {
      (0,_lib_utils_js__WEBPACK_IMPORTED_MODULE_0__.dispatch)("confirm-accept", submitter);
    } else {
      (0,_lib_utils_js__WEBPACK_IMPORTED_MODULE_0__.dispatch)("confirm-reject", submitter);
    }
    return response;
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({ start });



/***/ }),

/***/ "./node_modules/@rolemodel/turbo-confirm/src/lib/ConfirmationController.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/@rolemodel/turbo-confirm/src/lib/ConfirmationController.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ConfirmationController)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./node_modules/@rolemodel/turbo-confirm/src/lib/utils.js");
var __defProp = Object.defineProperty;
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var _resolve, _ConfirmationController_instances, teardown_fn, setupListeners_fn, teardownListeners_fn, storeInitialContent_fn, restoreInitialContent_fn;

class ConfirmationController {
  constructor(delegate) {
    __privateAdd(this, _ConfirmationController_instances);
    __publicField(this, "initialContent");
    __privateAdd(this, _resolve);
    this.delegate = delegate;
    this.accept = this.accept.bind(this);
    this.deny = this.deny.bind(this);
  }
  showConfirm(contentMap) {
    __privateMethod(this, _ConfirmationController_instances, storeInitialContent_fn).call(this);
    for (const [selector, content] of Object.entries(contentMap)) {
      const target = this.element.querySelector(selector);
      if (target && content) target.innerHTML = content;
    }
    __privateMethod(this, _ConfirmationController_instances, setupListeners_fn).call(this);
    this.delegate.showConfirm(this.element);
    return new Promise((resolve) => __privateSet(this, _resolve, resolve));
  }
  accept() {
    __privateGet(this, _resolve).call(this, true);
    __privateMethod(this, _ConfirmationController_instances, teardown_fn).call(this);
  }
  deny() {
    __privateGet(this, _resolve).call(this, false);
    __privateMethod(this, _ConfirmationController_instances, teardown_fn).call(this);
  }
  get acceptButtons() {
    return this.element.querySelectorAll(this.delegate.acceptSelector);
  }
  get denyButtons() {
    return this.element.querySelectorAll(this.delegate.denySelector);
  }
  get element() {
    return document.querySelector(this.delegate.dialogSelector);
  }
}
_resolve = new WeakMap();
_ConfirmationController_instances = new WeakSet();
teardown_fn = function() {
  __privateSet(this, _resolve, null);
  this.delegate.hideConfirm(this.element);
  __privateMethod(this, _ConfirmationController_instances, teardownListeners_fn).call(this);
  setTimeout(__privateMethod(this, _ConfirmationController_instances, restoreInitialContent_fn).bind(this), this.delegate.animationDuration);
};
setupListeners_fn = function() {
  this.acceptButtons.forEach((element) => element.addEventListener("click", this.accept));
  this.denyButtons.forEach((element) => element.addEventListener("click", this.deny));
  this.element.addEventListener("cancel", this.deny);
};
teardownListeners_fn = function() {
  this.acceptButtons.forEach((element) => element.removeEventListener("click", this.accept));
  this.denyButtons.forEach((element) => element.removeEventListener("click", this.deny));
  this.element.removeEventListener("cancel", this.deny);
};
storeInitialContent_fn = function() {
  try {
    this.initialContent = this.element.innerHTML;
  } catch (error) {
    throw _utils_js__WEBPACK_IMPORTED_MODULE_0__.TurboConfirmError.missingDialog(this.delegate.dialogSelector, error);
  }
};
restoreInitialContent_fn = function() {
  try {
    this.element.innerHTML = this.initialContent;
  } catch {
  }
};


/***/ }),

/***/ "./node_modules/@rolemodel/turbo-confirm/src/lib/TurboConfirm.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@rolemodel/turbo-confirm/src/lib/TurboConfirm.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TurboConfirm: () => (/* binding */ TurboConfirm)
/* harmony export */ });
/* harmony import */ var _ConfirmationController_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ConfirmationController.js */ "./node_modules/@rolemodel/turbo-confirm/src/lib/ConfirmationController.js");
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var _controller, _config, _TurboConfirm_instances, contentMap_fn, slotSelector_fn, slotContent_fn, clickTarget_fn;

class TurboConfirm {
  constructor(options = {}) {
    __privateAdd(this, _TurboConfirm_instances);
    __privateAdd(this, _controller);
    __privateAdd(this, _config, {
      dialogSelector: "#confirm",
      activeClass: "modal--active",
      acceptSelector: "#confirm-accept",
      denySelector: ".confirm-cancel",
      animationDuration: 300,
      showConfirmCallback: (element) => element.showModal && element.showModal(),
      hideConfirmCallback: (element) => element.close && element.close(),
      messageSlotSelector: "#confirm-title",
      contentSlots: {
        body: {
          contentAttribute: "confirm-details",
          slotSelector: "#confirm-body"
        },
        acceptText: {
          contentAttribute: "confirm-button",
          slotSelector: "#confirm-accept"
        }
      }
    });
    for (const [key, value] of Object.entries(options)) {
      __privateGet(this, _config)[key] = value;
    }
    __privateSet(this, _controller, new _ConfirmationController_js__WEBPACK_IMPORTED_MODULE_0__["default"](this));
  }
  /**
   * Present a confirmation challenge to the user.
   * @public
   * @param {string} [message] - The main challenge message; Value of `data-turbo-confirm` attribute.
   * @param {HTMLFormElement} [_formElement] - (ignored) `form` element that contains the submitter.
   * @param {HTMLElement} [submitter] - button of input of type submit that triggered the form submission.
   * @returns {Promise<boolean>} - A promise that resolves to true if the user accepts the challenge or false if they deny it.
   */
  confirm(message, _formElement, submitter) {
    const clickTarget = __privateMethod(this, _TurboConfirm_instances, clickTarget_fn).call(this, submitter);
    const contentMap = __privateMethod(this, _TurboConfirm_instances, contentMap_fn).call(this, message, clickTarget);
    return this.confirmWithContent(contentMap);
  }
  /**
   * Present a confirmation challenge to the user.
   * @public
   * @param {Object} contentMap - A map of CSS selectors to HTML content to be inserted into the dialog.
   * @returns {Promise<boolean>} - A promise that resolves to true if the user accepts the challenge or false if they deny it.
   */
  confirmWithContent(contentMap) {
    return __privateGet(this, _controller).showConfirm(contentMap);
  }
  /**
   * a function for #controller to call after setup
   * @private
   */
  showConfirm(element) {
    element.classList.add(__privateGet(this, _config).activeClass);
    if (typeof __privateGet(this, _config).showConfirmCallback === "function") {
      __privateGet(this, _config).showConfirmCallback(element);
    }
  }
  /**
   * a function for #controller to call before teardown
   * @private
   */
  hideConfirm(element) {
    element.classList.remove(__privateGet(this, _config).activeClass);
    if (typeof __privateGet(this, _config).hideConfirmCallback === "function") {
      __privateGet(this, _config).hideConfirmCallback(element);
    }
  }
  get dialogSelector() {
    return __privateGet(this, _config).dialogSelector;
  }
  get acceptSelector() {
    return __privateGet(this, _config).acceptSelector;
  }
  get denySelector() {
    return __privateGet(this, _config).denySelector;
  }
  get animationDuration() {
    return __privateGet(this, _config).animationDuration;
  }
}
_controller = new WeakMap();
_config = new WeakMap();
_TurboConfirm_instances = new WeakSet();
contentMap_fn = function(message, sourceElement) {
  const contentMap = {};
  if (message) contentMap[__privateGet(this, _config).messageSlotSelector] = message;
  if (sourceElement) {
    for (const slotName of Object.keys(__privateGet(this, _config).contentSlots)) {
      contentMap[__privateMethod(this, _TurboConfirm_instances, slotSelector_fn).call(this, slotName)] = __privateMethod(this, _TurboConfirm_instances, slotContent_fn).call(this, slotName, sourceElement);
    }
  }
  return contentMap;
};
slotSelector_fn = function(slotName) {
  return __privateGet(this, _config).contentSlots[slotName].slotSelector;
};
slotContent_fn = function(slotName, element) {
  return element.getAttribute(`data-${__privateGet(this, _config).contentSlots[slotName].contentAttribute}`);
};
clickTarget_fn = function(target) {
  const element = target ?? document.activeElement;
  return element.closest("[data-turbo-confirm]");
};


/***/ }),

/***/ "./node_modules/@rolemodel/turbo-confirm/src/lib/utils.js":
/*!****************************************************************!*\
  !*** ./node_modules/@rolemodel/turbo-confirm/src/lib/utils.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TurboConfirmError: () => (/* binding */ TurboConfirmError),
/* harmony export */   dispatch: () => (/* binding */ dispatch)
/* harmony export */ });
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
const dispatch = (name, target = document, { bubbles = true, cancelable = true, prefix = "rms", detail } = {}) => {
  const event = new CustomEvent(`${prefix}:${name}`, { bubbles, cancelable, detail });
  target.dispatchEvent(event);
  return !event.defaultPrevented;
};
class TurboConfirmError extends Error {
  constructor() {
    super(...arguments);
    __publicField(this, "name", "TurboConfirmError");
  }
  static missingDialog(selector, typeError) {
    return new this(`No element matching dialogSelector: '${selector}'`, { cause: typeError });
  }
  static noTurbo() {
    return new this('Turbo is not defined. Be sure to import "@hotwired/turbo-rails" before calling the `start()` function');
  }
}


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
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
var __webpack_exports__ = {};
/*!***************************************!*\
  !*** ./app/javascript/application.js ***!
  \***************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _hotwired_turbo_rails__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @hotwired/turbo-rails */ "./node_modules/@hotwired/turbo-rails/app/javascript/turbo/index.js");
/* harmony import */ var _controllers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./controllers */ "./app/javascript/controllers/index.js");
/* harmony import */ var _initializers_honeybadger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./initializers/honeybadger */ "./app/javascript/initializers/honeybadger.js");
/* harmony import */ var _initializers_turbo_confirm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./initializers/turbo_confirm */ "./app/javascript/initializers/turbo_confirm.js");
/* harmony import */ var _initializers_frame_missing_handler__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./initializers/frame_missing_handler */ "./app/javascript/initializers/frame_missing_handler.js");






})();

// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!*************************************************!*\
  !*** ./app/assets/stylesheets/application.scss ***!
  \*************************************************/
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin

})();

/******/ })()
;
//# sourceMappingURL=application.js.map