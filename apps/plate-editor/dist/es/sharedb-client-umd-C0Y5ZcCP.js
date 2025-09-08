import { g as getDefaultExportFromCjs, c as commonjsGlobal } from "./kk-adapt-export-9sEo3eKk.js";
function _mergeNamespaces(n, m) {
  for (var i = 0; i < m.length; i++) {
    const e = m[i];
    if (typeof e !== "string" && !Array.isArray(e)) {
      for (const k in e) {
        if (k !== "default" && !(k in n)) {
          const d = Object.getOwnPropertyDescriptor(e, k);
          if (d) {
            Object.defineProperty(n, k, d.get ? d : {
              enumerable: true,
              get: () => e[k]
            });
          }
        }
      }
    }
  }
  return Object.freeze(Object.defineProperty(n, Symbol.toStringTag, { value: "Module" }));
}
function commonjsRequire(path) {
  throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var sharedbClientUmd$2 = { exports: {} };
(function(module, exports) {
  (function(f) {
    {
      module.exports = f();
    }
  })(function() {
    return (/* @__PURE__ */ function() {
      function r(e, n, t) {
        function o(i2, f) {
          if (!n[i2]) {
            if (!e[i2]) {
              var c = "function" == typeof commonjsRequire && commonjsRequire;
              if (!f && c) return c(i2, true);
              if (u) return u(i2, true);
              var a = new Error("Cannot find module '" + i2 + "'");
              throw a.code = "MODULE_NOT_FOUND", a;
            }
            var p = n[i2] = { exports: {} };
            e[i2][0].call(p.exports, function(r2) {
              var n2 = e[i2][1][r2];
              return o(n2 || r2);
            }, p, p.exports, r, e, n, t);
          }
          return n[i2].exports;
        }
        for (var u = "function" == typeof commonjsRequire && commonjsRequire, i = 0; i < t.length; i++) o(t[i]);
        return o;
      }
      return r;
    }())({ 1: [function(require2, module2, exports2) {
      (function(process, setImmediate) {
        (function() {
          (function(global, factory) {
            typeof exports2 === "object" && typeof module2 !== "undefined" ? factory(exports2) : factory(global.async = {});
          })(this, function(exports3) {
            function apply(fn, ...args) {
              return (...callArgs) => fn(...args, ...callArgs);
            }
            function initialParams(fn) {
              return function(...args) {
                var callback = args.pop();
                return fn.call(this, args, callback);
              };
            }
            var hasQueueMicrotask = typeof queueMicrotask === "function" && queueMicrotask;
            var hasSetImmediate = typeof setImmediate === "function" && setImmediate;
            var hasNextTick = typeof process === "object" && typeof process.nextTick === "function";
            function fallback(fn) {
              setTimeout(fn, 0);
            }
            function wrap(defer) {
              return (fn, ...args) => defer(() => fn(...args));
            }
            var _defer;
            if (hasQueueMicrotask) {
              _defer = queueMicrotask;
            } else if (hasSetImmediate) {
              _defer = setImmediate;
            } else if (hasNextTick) {
              _defer = process.nextTick;
            } else {
              _defer = fallback;
            }
            var setImmediate$1 = wrap(_defer);
            function asyncify(func) {
              if (isAsync(func)) {
                return function(...args) {
                  const callback = args.pop();
                  const promise = func.apply(this, args);
                  return handlePromise(promise, callback);
                };
              }
              return initialParams(function(args, callback) {
                var result;
                try {
                  result = func.apply(this, args);
                } catch (e) {
                  return callback(e);
                }
                if (result && typeof result.then === "function") {
                  return handlePromise(result, callback);
                } else {
                  callback(null, result);
                }
              });
            }
            function handlePromise(promise, callback) {
              return promise.then((value) => {
                invokeCallback(callback, null, value);
              }, (err) => {
                invokeCallback(callback, err && err.message ? err : new Error(err));
              });
            }
            function invokeCallback(callback, error, value) {
              try {
                callback(error, value);
              } catch (err) {
                setImmediate$1((e) => {
                  throw e;
                }, err);
              }
            }
            function isAsync(fn) {
              return fn[Symbol.toStringTag] === "AsyncFunction";
            }
            function isAsyncGenerator(fn) {
              return fn[Symbol.toStringTag] === "AsyncGenerator";
            }
            function isAsyncIterable(obj) {
              return typeof obj[Symbol.asyncIterator] === "function";
            }
            function wrapAsync(asyncFn) {
              if (typeof asyncFn !== "function") throw new Error("expected a function");
              return isAsync(asyncFn) ? asyncify(asyncFn) : asyncFn;
            }
            function awaitify(asyncFn, arity = asyncFn.length) {
              if (!arity) throw new Error("arity is undefined");
              function awaitable(...args) {
                if (typeof args[arity - 1] === "function") {
                  return asyncFn.apply(this, args);
                }
                return new Promise((resolve, reject2) => {
                  args[arity - 1] = (err, ...cbArgs) => {
                    if (err) return reject2(err);
                    resolve(cbArgs.length > 1 ? cbArgs : cbArgs[0]);
                  };
                  asyncFn.apply(this, args);
                });
              }
              return awaitable;
            }
            function applyEach(eachfn) {
              return function applyEach2(fns, ...callArgs) {
                const go = awaitify(function(callback) {
                  var that = this;
                  return eachfn(fns, (fn, cb) => {
                    wrapAsync(fn).apply(that, callArgs.concat(cb));
                  }, callback);
                });
                return go;
              };
            }
            function _asyncMap(eachfn, arr, iteratee, callback) {
              arr = arr || [];
              var results = [];
              var counter = 0;
              var _iteratee = wrapAsync(iteratee);
              return eachfn(arr, (value, _, iterCb) => {
                var index2 = counter++;
                _iteratee(value, (err, v) => {
                  results[index2] = v;
                  iterCb(err);
                });
              }, (err) => {
                callback(err, results);
              });
            }
            function isArrayLike(value) {
              return value && typeof value.length === "number" && value.length >= 0 && value.length % 1 === 0;
            }
            const breakLoop = {};
            function once(fn) {
              function wrapper(...args) {
                if (fn === null) return;
                var callFn = fn;
                fn = null;
                callFn.apply(this, args);
              }
              Object.assign(wrapper, fn);
              return wrapper;
            }
            function getIterator(coll) {
              return coll[Symbol.iterator] && coll[Symbol.iterator]();
            }
            function createArrayIterator(coll) {
              var i = -1;
              var len = coll.length;
              return function next() {
                return ++i < len ? { value: coll[i], key: i } : null;
              };
            }
            function createES2015Iterator(iterator) {
              var i = -1;
              return function next() {
                var item = iterator.next();
                if (item.done)
                  return null;
                i++;
                return { value: item.value, key: i };
              };
            }
            function createObjectIterator(obj) {
              var okeys = obj ? Object.keys(obj) : [];
              var i = -1;
              var len = okeys.length;
              return function next() {
                var key = okeys[++i];
                if (key === "__proto__") {
                  return next();
                }
                return i < len ? { value: obj[key], key } : null;
              };
            }
            function createIterator(coll) {
              if (isArrayLike(coll)) {
                return createArrayIterator(coll);
              }
              var iterator = getIterator(coll);
              return iterator ? createES2015Iterator(iterator) : createObjectIterator(coll);
            }
            function onlyOnce(fn) {
              return function(...args) {
                if (fn === null) throw new Error("Callback was already called.");
                var callFn = fn;
                fn = null;
                callFn.apply(this, args);
              };
            }
            function asyncEachOfLimit(generator, limit, iteratee, callback) {
              let done = false;
              let canceled = false;
              let awaiting = false;
              let running = 0;
              let idx = 0;
              function replenish() {
                if (running >= limit || awaiting || done) return;
                awaiting = true;
                generator.next().then(({ value, done: iterDone }) => {
                  if (canceled || done) return;
                  awaiting = false;
                  if (iterDone) {
                    done = true;
                    if (running <= 0) {
                      callback(null);
                    }
                    return;
                  }
                  running++;
                  iteratee(value, idx, iterateeCallback);
                  idx++;
                  replenish();
                }).catch(handleError);
              }
              function iterateeCallback(err, result) {
                running -= 1;
                if (canceled) return;
                if (err) return handleError(err);
                if (err === false) {
                  done = true;
                  canceled = true;
                  return;
                }
                if (result === breakLoop || done && running <= 0) {
                  done = true;
                  return callback(null);
                }
                replenish();
              }
              function handleError(err) {
                if (canceled) return;
                awaiting = false;
                done = true;
                callback(err);
              }
              replenish();
            }
            var eachOfLimit = (limit) => {
              return (obj, iteratee, callback) => {
                callback = once(callback);
                if (limit <= 0) {
                  throw new RangeError("concurrency limit cannot be less than 1");
                }
                if (!obj) {
                  return callback(null);
                }
                if (isAsyncGenerator(obj)) {
                  return asyncEachOfLimit(obj, limit, iteratee, callback);
                }
                if (isAsyncIterable(obj)) {
                  return asyncEachOfLimit(obj[Symbol.asyncIterator](), limit, iteratee, callback);
                }
                var nextElem = createIterator(obj);
                var done = false;
                var canceled = false;
                var running = 0;
                var looping = false;
                function iterateeCallback(err, value) {
                  if (canceled) return;
                  running -= 1;
                  if (err) {
                    done = true;
                    callback(err);
                  } else if (err === false) {
                    done = true;
                    canceled = true;
                  } else if (value === breakLoop || done && running <= 0) {
                    done = true;
                    return callback(null);
                  } else if (!looping) {
                    replenish();
                  }
                }
                function replenish() {
                  looping = true;
                  while (running < limit && !done) {
                    var elem = nextElem();
                    if (elem === null) {
                      done = true;
                      if (running <= 0) {
                        callback(null);
                      }
                      return;
                    }
                    running += 1;
                    iteratee(elem.value, elem.key, onlyOnce(iterateeCallback));
                  }
                  looping = false;
                }
                replenish();
              };
            };
            function eachOfLimit$1(coll, limit, iteratee, callback) {
              return eachOfLimit(limit)(coll, wrapAsync(iteratee), callback);
            }
            var eachOfLimit$2 = awaitify(eachOfLimit$1, 4);
            function eachOfArrayLike(coll, iteratee, callback) {
              callback = once(callback);
              var index2 = 0, completed = 0, { length } = coll, canceled = false;
              if (length === 0) {
                callback(null);
              }
              function iteratorCallback(err, value) {
                if (err === false) {
                  canceled = true;
                }
                if (canceled === true) return;
                if (err) {
                  callback(err);
                } else if (++completed === length || value === breakLoop) {
                  callback(null);
                }
              }
              for (; index2 < length; index2++) {
                iteratee(coll[index2], index2, onlyOnce(iteratorCallback));
              }
            }
            function eachOfGeneric(coll, iteratee, callback) {
              return eachOfLimit$2(coll, Infinity, iteratee, callback);
            }
            function eachOf(coll, iteratee, callback) {
              var eachOfImplementation = isArrayLike(coll) ? eachOfArrayLike : eachOfGeneric;
              return eachOfImplementation(coll, wrapAsync(iteratee), callback);
            }
            var eachOf$1 = awaitify(eachOf, 3);
            function map(coll, iteratee, callback) {
              return _asyncMap(eachOf$1, coll, iteratee, callback);
            }
            var map$1 = awaitify(map, 3);
            var applyEach$1 = applyEach(map$1);
            function eachOfSeries(coll, iteratee, callback) {
              return eachOfLimit$2(coll, 1, iteratee, callback);
            }
            var eachOfSeries$1 = awaitify(eachOfSeries, 3);
            function mapSeries(coll, iteratee, callback) {
              return _asyncMap(eachOfSeries$1, coll, iteratee, callback);
            }
            var mapSeries$1 = awaitify(mapSeries, 3);
            var applyEachSeries = applyEach(mapSeries$1);
            const PROMISE_SYMBOL = Symbol("promiseCallback");
            function promiseCallback() {
              let resolve, reject2;
              function callback(err, ...args) {
                if (err) return reject2(err);
                resolve(args.length > 1 ? args : args[0]);
              }
              callback[PROMISE_SYMBOL] = new Promise((res, rej) => {
                resolve = res, reject2 = rej;
              });
              return callback;
            }
            function auto(tasks, concurrency, callback) {
              if (typeof concurrency !== "number") {
                callback = concurrency;
                concurrency = null;
              }
              callback = once(callback || promiseCallback());
              var numTasks = Object.keys(tasks).length;
              if (!numTasks) {
                return callback(null);
              }
              if (!concurrency) {
                concurrency = numTasks;
              }
              var results = {};
              var runningTasks = 0;
              var canceled = false;
              var hasError = false;
              var listeners = /* @__PURE__ */ Object.create(null);
              var readyTasks = [];
              var readyToCheck = [];
              var uncheckedDependencies = {};
              Object.keys(tasks).forEach((key) => {
                var task = tasks[key];
                if (!Array.isArray(task)) {
                  enqueueTask(key, [task]);
                  readyToCheck.push(key);
                  return;
                }
                var dependencies = task.slice(0, task.length - 1);
                var remainingDependencies = dependencies.length;
                if (remainingDependencies === 0) {
                  enqueueTask(key, task);
                  readyToCheck.push(key);
                  return;
                }
                uncheckedDependencies[key] = remainingDependencies;
                dependencies.forEach((dependencyName) => {
                  if (!tasks[dependencyName]) {
                    throw new Error("async.auto task `" + key + "` has a non-existent dependency `" + dependencyName + "` in " + dependencies.join(", "));
                  }
                  addListener(dependencyName, () => {
                    remainingDependencies--;
                    if (remainingDependencies === 0) {
                      enqueueTask(key, task);
                    }
                  });
                });
              });
              checkForDeadlocks();
              processQueue();
              function enqueueTask(key, task) {
                readyTasks.push(() => runTask(key, task));
              }
              function processQueue() {
                if (canceled) return;
                if (readyTasks.length === 0 && runningTasks === 0) {
                  return callback(null, results);
                }
                while (readyTasks.length && runningTasks < concurrency) {
                  var run = readyTasks.shift();
                  run();
                }
              }
              function addListener(taskName, fn) {
                var taskListeners = listeners[taskName];
                if (!taskListeners) {
                  taskListeners = listeners[taskName] = [];
                }
                taskListeners.push(fn);
              }
              function taskComplete(taskName) {
                var taskListeners = listeners[taskName] || [];
                taskListeners.forEach((fn) => fn());
                processQueue();
              }
              function runTask(key, task) {
                if (hasError) return;
                var taskCallback = onlyOnce((err, ...result) => {
                  runningTasks--;
                  if (err === false) {
                    canceled = true;
                    return;
                  }
                  if (result.length < 2) {
                    [result] = result;
                  }
                  if (err) {
                    var safeResults = {};
                    Object.keys(results).forEach((rkey) => {
                      safeResults[rkey] = results[rkey];
                    });
                    safeResults[key] = result;
                    hasError = true;
                    listeners = /* @__PURE__ */ Object.create(null);
                    if (canceled) return;
                    callback(err, safeResults);
                  } else {
                    results[key] = result;
                    taskComplete(key);
                  }
                });
                runningTasks++;
                var taskFn = wrapAsync(task[task.length - 1]);
                if (task.length > 1) {
                  taskFn(results, taskCallback);
                } else {
                  taskFn(taskCallback);
                }
              }
              function checkForDeadlocks() {
                var currentTask;
                var counter = 0;
                while (readyToCheck.length) {
                  currentTask = readyToCheck.pop();
                  counter++;
                  getDependents(currentTask).forEach((dependent) => {
                    if (--uncheckedDependencies[dependent] === 0) {
                      readyToCheck.push(dependent);
                    }
                  });
                }
                if (counter !== numTasks) {
                  throw new Error(
                    "async.auto cannot execute tasks due to a recursive dependency"
                  );
                }
              }
              function getDependents(taskName) {
                var result = [];
                Object.keys(tasks).forEach((key) => {
                  const task = tasks[key];
                  if (Array.isArray(task) && task.indexOf(taskName) >= 0) {
                    result.push(key);
                  }
                });
                return result;
              }
              return callback[PROMISE_SYMBOL];
            }
            var FN_ARGS = /^(?:async\s+)?(?:function)?\s*\w*\s*\(\s*([^)]+)\s*\)(?:\s*{)/;
            var ARROW_FN_ARGS = /^(?:async\s+)?\(?\s*([^)=]+)\s*\)?(?:\s*=>)/;
            var FN_ARG_SPLIT = /,/;
            var FN_ARG = /(=.+)?(\s*)$/;
            function stripComments(string) {
              let stripped = "";
              let index2 = 0;
              let endBlockComment = string.indexOf("*/");
              while (index2 < string.length) {
                if (string[index2] === "/" && string[index2 + 1] === "/") {
                  let endIndex = string.indexOf("\n", index2);
                  index2 = endIndex === -1 ? string.length : endIndex;
                } else if (endBlockComment !== -1 && string[index2] === "/" && string[index2 + 1] === "*") {
                  let endIndex = string.indexOf("*/", index2);
                  if (endIndex !== -1) {
                    index2 = endIndex + 2;
                    endBlockComment = string.indexOf("*/", index2);
                  } else {
                    stripped += string[index2];
                    index2++;
                  }
                } else {
                  stripped += string[index2];
                  index2++;
                }
              }
              return stripped;
            }
            function parseParams(func) {
              const src = stripComments(func.toString());
              let match = src.match(FN_ARGS);
              if (!match) {
                match = src.match(ARROW_FN_ARGS);
              }
              if (!match) throw new Error("could not parse args in autoInject\nSource:\n" + src);
              let [, args] = match;
              return args.replace(/\s/g, "").split(FN_ARG_SPLIT).map((arg) => arg.replace(FN_ARG, "").trim());
            }
            function autoInject(tasks, callback) {
              var newTasks = {};
              Object.keys(tasks).forEach((key) => {
                var taskFn = tasks[key];
                var params;
                var fnIsAsync = isAsync(taskFn);
                var hasNoDeps = !fnIsAsync && taskFn.length === 1 || fnIsAsync && taskFn.length === 0;
                if (Array.isArray(taskFn)) {
                  params = [...taskFn];
                  taskFn = params.pop();
                  newTasks[key] = params.concat(params.length > 0 ? newTask : taskFn);
                } else if (hasNoDeps) {
                  newTasks[key] = taskFn;
                } else {
                  params = parseParams(taskFn);
                  if (taskFn.length === 0 && !fnIsAsync && params.length === 0) {
                    throw new Error("autoInject task functions require explicit parameters.");
                  }
                  if (!fnIsAsync) params.pop();
                  newTasks[key] = params.concat(newTask);
                }
                function newTask(results, taskCb) {
                  var newArgs = params.map((name) => results[name]);
                  newArgs.push(taskCb);
                  wrapAsync(taskFn)(...newArgs);
                }
              });
              return auto(newTasks, callback);
            }
            class DLL {
              constructor() {
                this.head = this.tail = null;
                this.length = 0;
              }
              removeLink(node) {
                if (node.prev) node.prev.next = node.next;
                else this.head = node.next;
                if (node.next) node.next.prev = node.prev;
                else this.tail = node.prev;
                node.prev = node.next = null;
                this.length -= 1;
                return node;
              }
              empty() {
                while (this.head) this.shift();
                return this;
              }
              insertAfter(node, newNode) {
                newNode.prev = node;
                newNode.next = node.next;
                if (node.next) node.next.prev = newNode;
                else this.tail = newNode;
                node.next = newNode;
                this.length += 1;
              }
              insertBefore(node, newNode) {
                newNode.prev = node.prev;
                newNode.next = node;
                if (node.prev) node.prev.next = newNode;
                else this.head = newNode;
                node.prev = newNode;
                this.length += 1;
              }
              unshift(node) {
                if (this.head) this.insertBefore(this.head, node);
                else setInitial(this, node);
              }
              push(node) {
                if (this.tail) this.insertAfter(this.tail, node);
                else setInitial(this, node);
              }
              shift() {
                return this.head && this.removeLink(this.head);
              }
              pop() {
                return this.tail && this.removeLink(this.tail);
              }
              toArray() {
                return [...this];
              }
              *[Symbol.iterator]() {
                var cur = this.head;
                while (cur) {
                  yield cur.data;
                  cur = cur.next;
                }
              }
              remove(testFn) {
                var curr = this.head;
                while (curr) {
                  var { next } = curr;
                  if (testFn(curr)) {
                    this.removeLink(curr);
                  }
                  curr = next;
                }
                return this;
              }
            }
            function setInitial(dll, node) {
              dll.length = 1;
              dll.head = dll.tail = node;
            }
            function queue(worker, concurrency, payload) {
              if (concurrency == null) {
                concurrency = 1;
              } else if (concurrency === 0) {
                throw new RangeError("Concurrency must not be zero");
              }
              var _worker = wrapAsync(worker);
              var numRunning = 0;
              var workersList = [];
              const events = {
                error: [],
                drain: [],
                saturated: [],
                unsaturated: [],
                empty: []
              };
              function on(event, handler) {
                events[event].push(handler);
              }
              function once2(event, handler) {
                const handleAndRemove = (...args) => {
                  off(event, handleAndRemove);
                  handler(...args);
                };
                events[event].push(handleAndRemove);
              }
              function off(event, handler) {
                if (!event) return Object.keys(events).forEach((ev) => events[ev] = []);
                if (!handler) return events[event] = [];
                events[event] = events[event].filter((ev) => ev !== handler);
              }
              function trigger(event, ...args) {
                events[event].forEach((handler) => handler(...args));
              }
              var processingScheduled = false;
              function _insert(data, insertAtFront, rejectOnError, callback) {
                if (callback != null && typeof callback !== "function") {
                  throw new Error("task callback must be a function");
                }
                q.started = true;
                var res, rej;
                function promiseCallback2(err, ...args) {
                  if (err) return rejectOnError ? rej(err) : res();
                  if (args.length <= 1) return res(args[0]);
                  res(args);
                }
                var item = q._createTaskItem(
                  data,
                  rejectOnError ? promiseCallback2 : callback || promiseCallback2
                );
                if (insertAtFront) {
                  q._tasks.unshift(item);
                } else {
                  q._tasks.push(item);
                }
                if (!processingScheduled) {
                  processingScheduled = true;
                  setImmediate$1(() => {
                    processingScheduled = false;
                    q.process();
                  });
                }
                if (rejectOnError || !callback) {
                  return new Promise((resolve, reject2) => {
                    res = resolve;
                    rej = reject2;
                  });
                }
              }
              function _createCB(tasks) {
                return function(err, ...args) {
                  numRunning -= 1;
                  for (var i = 0, l = tasks.length; i < l; i++) {
                    var task = tasks[i];
                    var index2 = workersList.indexOf(task);
                    if (index2 === 0) {
                      workersList.shift();
                    } else if (index2 > 0) {
                      workersList.splice(index2, 1);
                    }
                    task.callback(err, ...args);
                    if (err != null) {
                      trigger("error", err, task.data);
                    }
                  }
                  if (numRunning <= q.concurrency - q.buffer) {
                    trigger("unsaturated");
                  }
                  if (q.idle()) {
                    trigger("drain");
                  }
                  q.process();
                };
              }
              function _maybeDrain(data) {
                if (data.length === 0 && q.idle()) {
                  setImmediate$1(() => trigger("drain"));
                  return true;
                }
                return false;
              }
              const eventMethod = (name) => (handler) => {
                if (!handler) {
                  return new Promise((resolve, reject2) => {
                    once2(name, (err, data) => {
                      if (err) return reject2(err);
                      resolve(data);
                    });
                  });
                }
                off(name);
                on(name, handler);
              };
              var isProcessing = false;
              var q = {
                _tasks: new DLL(),
                _createTaskItem(data, callback) {
                  return {
                    data,
                    callback
                  };
                },
                *[Symbol.iterator]() {
                  yield* q._tasks[Symbol.iterator]();
                },
                concurrency,
                payload,
                buffer: concurrency / 4,
                started: false,
                paused: false,
                push(data, callback) {
                  if (Array.isArray(data)) {
                    if (_maybeDrain(data)) return;
                    return data.map((datum) => _insert(datum, false, false, callback));
                  }
                  return _insert(data, false, false, callback);
                },
                pushAsync(data, callback) {
                  if (Array.isArray(data)) {
                    if (_maybeDrain(data)) return;
                    return data.map((datum) => _insert(datum, false, true, callback));
                  }
                  return _insert(data, false, true, callback);
                },
                kill() {
                  off();
                  q._tasks.empty();
                },
                unshift(data, callback) {
                  if (Array.isArray(data)) {
                    if (_maybeDrain(data)) return;
                    return data.map((datum) => _insert(datum, true, false, callback));
                  }
                  return _insert(data, true, false, callback);
                },
                unshiftAsync(data, callback) {
                  if (Array.isArray(data)) {
                    if (_maybeDrain(data)) return;
                    return data.map((datum) => _insert(datum, true, true, callback));
                  }
                  return _insert(data, true, true, callback);
                },
                remove(testFn) {
                  q._tasks.remove(testFn);
                },
                process() {
                  if (isProcessing) {
                    return;
                  }
                  isProcessing = true;
                  while (!q.paused && numRunning < q.concurrency && q._tasks.length) {
                    var tasks = [], data = [];
                    var l = q._tasks.length;
                    if (q.payload) l = Math.min(l, q.payload);
                    for (var i = 0; i < l; i++) {
                      var node = q._tasks.shift();
                      tasks.push(node);
                      workersList.push(node);
                      data.push(node.data);
                    }
                    numRunning += 1;
                    if (q._tasks.length === 0) {
                      trigger("empty");
                    }
                    if (numRunning === q.concurrency) {
                      trigger("saturated");
                    }
                    var cb = onlyOnce(_createCB(tasks));
                    _worker(data, cb);
                  }
                  isProcessing = false;
                },
                length() {
                  return q._tasks.length;
                },
                running() {
                  return numRunning;
                },
                workersList() {
                  return workersList;
                },
                idle() {
                  return q._tasks.length + numRunning === 0;
                },
                pause() {
                  q.paused = true;
                },
                resume() {
                  if (q.paused === false) {
                    return;
                  }
                  q.paused = false;
                  setImmediate$1(q.process);
                }
              };
              Object.defineProperties(q, {
                saturated: {
                  writable: false,
                  value: eventMethod("saturated")
                },
                unsaturated: {
                  writable: false,
                  value: eventMethod("unsaturated")
                },
                empty: {
                  writable: false,
                  value: eventMethod("empty")
                },
                drain: {
                  writable: false,
                  value: eventMethod("drain")
                },
                error: {
                  writable: false,
                  value: eventMethod("error")
                }
              });
              return q;
            }
            function cargo(worker, payload) {
              return queue(worker, 1, payload);
            }
            function cargo$1(worker, concurrency, payload) {
              return queue(worker, concurrency, payload);
            }
            function reduce(coll, memo, iteratee, callback) {
              callback = once(callback);
              var _iteratee = wrapAsync(iteratee);
              return eachOfSeries$1(coll, (x, i, iterCb) => {
                _iteratee(memo, x, (err, v) => {
                  memo = v;
                  iterCb(err);
                });
              }, (err) => callback(err, memo));
            }
            var reduce$1 = awaitify(reduce, 4);
            function seq(...functions) {
              var _functions = functions.map(wrapAsync);
              return function(...args) {
                var that = this;
                var cb = args[args.length - 1];
                if (typeof cb == "function") {
                  args.pop();
                } else {
                  cb = promiseCallback();
                }
                reduce$1(
                  _functions,
                  args,
                  (newargs, fn, iterCb) => {
                    fn.apply(that, newargs.concat((err, ...nextargs) => {
                      iterCb(err, nextargs);
                    }));
                  },
                  (err, results) => cb(err, ...results)
                );
                return cb[PROMISE_SYMBOL];
              };
            }
            function compose(...args) {
              return seq(...args.reverse());
            }
            function mapLimit(coll, limit, iteratee, callback) {
              return _asyncMap(eachOfLimit(limit), coll, iteratee, callback);
            }
            var mapLimit$1 = awaitify(mapLimit, 4);
            function concatLimit(coll, limit, iteratee, callback) {
              var _iteratee = wrapAsync(iteratee);
              return mapLimit$1(coll, limit, (val, iterCb) => {
                _iteratee(val, (err, ...args) => {
                  if (err) return iterCb(err);
                  return iterCb(err, args);
                });
              }, (err, mapResults) => {
                var result = [];
                for (var i = 0; i < mapResults.length; i++) {
                  if (mapResults[i]) {
                    result = result.concat(...mapResults[i]);
                  }
                }
                return callback(err, result);
              });
            }
            var concatLimit$1 = awaitify(concatLimit, 4);
            function concat(coll, iteratee, callback) {
              return concatLimit$1(coll, Infinity, iteratee, callback);
            }
            var concat$1 = awaitify(concat, 3);
            function concatSeries(coll, iteratee, callback) {
              return concatLimit$1(coll, 1, iteratee, callback);
            }
            var concatSeries$1 = awaitify(concatSeries, 3);
            function constant(...args) {
              return function(...ignoredArgs) {
                var callback = ignoredArgs.pop();
                return callback(null, ...args);
              };
            }
            function _createTester(check, getResult) {
              return (eachfn, arr, _iteratee, cb) => {
                var testPassed = false;
                var testResult;
                const iteratee = wrapAsync(_iteratee);
                eachfn(arr, (value, _, callback) => {
                  iteratee(value, (err, result) => {
                    if (err || err === false) return callback(err);
                    if (check(result) && !testResult) {
                      testPassed = true;
                      testResult = getResult(true, value);
                      return callback(null, breakLoop);
                    }
                    callback();
                  });
                }, (err) => {
                  if (err) return cb(err);
                  cb(null, testPassed ? testResult : getResult(false));
                });
              };
            }
            function detect(coll, iteratee, callback) {
              return _createTester((bool) => bool, (res, item) => item)(eachOf$1, coll, iteratee, callback);
            }
            var detect$1 = awaitify(detect, 3);
            function detectLimit(coll, limit, iteratee, callback) {
              return _createTester((bool) => bool, (res, item) => item)(eachOfLimit(limit), coll, iteratee, callback);
            }
            var detectLimit$1 = awaitify(detectLimit, 4);
            function detectSeries(coll, iteratee, callback) {
              return _createTester((bool) => bool, (res, item) => item)(eachOfLimit(1), coll, iteratee, callback);
            }
            var detectSeries$1 = awaitify(detectSeries, 3);
            function consoleFunc(name) {
              return (fn, ...args) => wrapAsync(fn)(...args, (err, ...resultArgs) => {
                if (typeof console === "object") {
                  if (err) {
                    if (console.error) {
                      console.error(err);
                    }
                  } else if (console[name]) {
                    resultArgs.forEach((x) => console[name](x));
                  }
                }
              });
            }
            var dir = consoleFunc("dir");
            function doWhilst(iteratee, test, callback) {
              callback = onlyOnce(callback);
              var _fn = wrapAsync(iteratee);
              var _test = wrapAsync(test);
              var results;
              function next(err, ...args) {
                if (err) return callback(err);
                if (err === false) return;
                results = args;
                _test(...args, check);
              }
              function check(err, truth) {
                if (err) return callback(err);
                if (err === false) return;
                if (!truth) return callback(null, ...results);
                _fn(next);
              }
              return check(null, true);
            }
            var doWhilst$1 = awaitify(doWhilst, 3);
            function doUntil(iteratee, test, callback) {
              const _test = wrapAsync(test);
              return doWhilst$1(iteratee, (...args) => {
                const cb = args.pop();
                _test(...args, (err, truth) => cb(err, !truth));
              }, callback);
            }
            function _withoutIndex(iteratee) {
              return (value, index2, callback) => iteratee(value, callback);
            }
            function eachLimit(coll, iteratee, callback) {
              return eachOf$1(coll, _withoutIndex(wrapAsync(iteratee)), callback);
            }
            var each = awaitify(eachLimit, 3);
            function eachLimit$1(coll, limit, iteratee, callback) {
              return eachOfLimit(limit)(coll, _withoutIndex(wrapAsync(iteratee)), callback);
            }
            var eachLimit$2 = awaitify(eachLimit$1, 4);
            function eachSeries(coll, iteratee, callback) {
              return eachLimit$2(coll, 1, iteratee, callback);
            }
            var eachSeries$1 = awaitify(eachSeries, 3);
            function ensureAsync(fn) {
              if (isAsync(fn)) return fn;
              return function(...args) {
                var callback = args.pop();
                var sync = true;
                args.push((...innerArgs) => {
                  if (sync) {
                    setImmediate$1(() => callback(...innerArgs));
                  } else {
                    callback(...innerArgs);
                  }
                });
                fn.apply(this, args);
                sync = false;
              };
            }
            function every(coll, iteratee, callback) {
              return _createTester((bool) => !bool, (res) => !res)(eachOf$1, coll, iteratee, callback);
            }
            var every$1 = awaitify(every, 3);
            function everyLimit(coll, limit, iteratee, callback) {
              return _createTester((bool) => !bool, (res) => !res)(eachOfLimit(limit), coll, iteratee, callback);
            }
            var everyLimit$1 = awaitify(everyLimit, 4);
            function everySeries(coll, iteratee, callback) {
              return _createTester((bool) => !bool, (res) => !res)(eachOfSeries$1, coll, iteratee, callback);
            }
            var everySeries$1 = awaitify(everySeries, 3);
            function filterArray(eachfn, arr, iteratee, callback) {
              var truthValues = new Array(arr.length);
              eachfn(arr, (x, index2, iterCb) => {
                iteratee(x, (err, v) => {
                  truthValues[index2] = !!v;
                  iterCb(err);
                });
              }, (err) => {
                if (err) return callback(err);
                var results = [];
                for (var i = 0; i < arr.length; i++) {
                  if (truthValues[i]) results.push(arr[i]);
                }
                callback(null, results);
              });
            }
            function filterGeneric(eachfn, coll, iteratee, callback) {
              var results = [];
              eachfn(coll, (x, index2, iterCb) => {
                iteratee(x, (err, v) => {
                  if (err) return iterCb(err);
                  if (v) {
                    results.push({ index: index2, value: x });
                  }
                  iterCb(err);
                });
              }, (err) => {
                if (err) return callback(err);
                callback(null, results.sort((a, b) => a.index - b.index).map((v) => v.value));
              });
            }
            function _filter(eachfn, coll, iteratee, callback) {
              var filter2 = isArrayLike(coll) ? filterArray : filterGeneric;
              return filter2(eachfn, coll, wrapAsync(iteratee), callback);
            }
            function filter(coll, iteratee, callback) {
              return _filter(eachOf$1, coll, iteratee, callback);
            }
            var filter$1 = awaitify(filter, 3);
            function filterLimit(coll, limit, iteratee, callback) {
              return _filter(eachOfLimit(limit), coll, iteratee, callback);
            }
            var filterLimit$1 = awaitify(filterLimit, 4);
            function filterSeries(coll, iteratee, callback) {
              return _filter(eachOfSeries$1, coll, iteratee, callback);
            }
            var filterSeries$1 = awaitify(filterSeries, 3);
            function forever(fn, errback) {
              var done = onlyOnce(errback);
              var task = wrapAsync(ensureAsync(fn));
              function next(err) {
                if (err) return done(err);
                if (err === false) return;
                task(next);
              }
              return next();
            }
            var forever$1 = awaitify(forever, 2);
            function groupByLimit(coll, limit, iteratee, callback) {
              var _iteratee = wrapAsync(iteratee);
              return mapLimit$1(coll, limit, (val, iterCb) => {
                _iteratee(val, (err, key) => {
                  if (err) return iterCb(err);
                  return iterCb(err, { key, val });
                });
              }, (err, mapResults) => {
                var result = {};
                var { hasOwnProperty } = Object.prototype;
                for (var i = 0; i < mapResults.length; i++) {
                  if (mapResults[i]) {
                    var { key } = mapResults[i];
                    var { val } = mapResults[i];
                    if (hasOwnProperty.call(result, key)) {
                      result[key].push(val);
                    } else {
                      result[key] = [val];
                    }
                  }
                }
                return callback(err, result);
              });
            }
            var groupByLimit$1 = awaitify(groupByLimit, 4);
            function groupBy(coll, iteratee, callback) {
              return groupByLimit$1(coll, Infinity, iteratee, callback);
            }
            function groupBySeries(coll, iteratee, callback) {
              return groupByLimit$1(coll, 1, iteratee, callback);
            }
            var log = consoleFunc("log");
            function mapValuesLimit(obj, limit, iteratee, callback) {
              callback = once(callback);
              var newObj = {};
              var _iteratee = wrapAsync(iteratee);
              return eachOfLimit(limit)(obj, (val, key, next) => {
                _iteratee(val, key, (err, result) => {
                  if (err) return next(err);
                  newObj[key] = result;
                  next(err);
                });
              }, (err) => callback(err, newObj));
            }
            var mapValuesLimit$1 = awaitify(mapValuesLimit, 4);
            function mapValues(obj, iteratee, callback) {
              return mapValuesLimit$1(obj, Infinity, iteratee, callback);
            }
            function mapValuesSeries(obj, iteratee, callback) {
              return mapValuesLimit$1(obj, 1, iteratee, callback);
            }
            function memoize(fn, hasher = (v) => v) {
              var memo = /* @__PURE__ */ Object.create(null);
              var queues = /* @__PURE__ */ Object.create(null);
              var _fn = wrapAsync(fn);
              var memoized = initialParams((args, callback) => {
                var key = hasher(...args);
                if (key in memo) {
                  setImmediate$1(() => callback(null, ...memo[key]));
                } else if (key in queues) {
                  queues[key].push(callback);
                } else {
                  queues[key] = [callback];
                  _fn(...args, (err, ...resultArgs) => {
                    if (!err) {
                      memo[key] = resultArgs;
                    }
                    var q = queues[key];
                    delete queues[key];
                    for (var i = 0, l = q.length; i < l; i++) {
                      q[i](err, ...resultArgs);
                    }
                  });
                }
              });
              memoized.memo = memo;
              memoized.unmemoized = fn;
              return memoized;
            }
            var _defer$1;
            if (hasNextTick) {
              _defer$1 = process.nextTick;
            } else if (hasSetImmediate) {
              _defer$1 = setImmediate;
            } else {
              _defer$1 = fallback;
            }
            var nextTick = wrap(_defer$1);
            var parallel = awaitify((eachfn, tasks, callback) => {
              var results = isArrayLike(tasks) ? [] : {};
              eachfn(tasks, (task, key, taskCb) => {
                wrapAsync(task)((err, ...result) => {
                  if (result.length < 2) {
                    [result] = result;
                  }
                  results[key] = result;
                  taskCb(err);
                });
              }, (err) => callback(err, results));
            }, 3);
            function parallel$1(tasks, callback) {
              return parallel(eachOf$1, tasks, callback);
            }
            function parallelLimit(tasks, limit, callback) {
              return parallel(eachOfLimit(limit), tasks, callback);
            }
            function queue$1(worker, concurrency) {
              var _worker = wrapAsync(worker);
              return queue((items, cb) => {
                _worker(items[0], cb);
              }, concurrency, 1);
            }
            class Heap {
              constructor() {
                this.heap = [];
                this.pushCount = Number.MIN_SAFE_INTEGER;
              }
              get length() {
                return this.heap.length;
              }
              empty() {
                this.heap = [];
                return this;
              }
              percUp(index2) {
                let p;
                while (index2 > 0 && smaller(this.heap[index2], this.heap[p = parent(index2)])) {
                  let t = this.heap[index2];
                  this.heap[index2] = this.heap[p];
                  this.heap[p] = t;
                  index2 = p;
                }
              }
              percDown(index2) {
                let l;
                while ((l = leftChi(index2)) < this.heap.length) {
                  if (l + 1 < this.heap.length && smaller(this.heap[l + 1], this.heap[l])) {
                    l = l + 1;
                  }
                  if (smaller(this.heap[index2], this.heap[l])) {
                    break;
                  }
                  let t = this.heap[index2];
                  this.heap[index2] = this.heap[l];
                  this.heap[l] = t;
                  index2 = l;
                }
              }
              push(node) {
                node.pushCount = ++this.pushCount;
                this.heap.push(node);
                this.percUp(this.heap.length - 1);
              }
              unshift(node) {
                return this.heap.push(node);
              }
              shift() {
                let [top] = this.heap;
                this.heap[0] = this.heap[this.heap.length - 1];
                this.heap.pop();
                this.percDown(0);
                return top;
              }
              toArray() {
                return [...this];
              }
              *[Symbol.iterator]() {
                for (let i = 0; i < this.heap.length; i++) {
                  yield this.heap[i].data;
                }
              }
              remove(testFn) {
                let j = 0;
                for (let i = 0; i < this.heap.length; i++) {
                  if (!testFn(this.heap[i])) {
                    this.heap[j] = this.heap[i];
                    j++;
                  }
                }
                this.heap.splice(j);
                for (let i = parent(this.heap.length - 1); i >= 0; i--) {
                  this.percDown(i);
                }
                return this;
              }
            }
            function leftChi(i) {
              return (i << 1) + 1;
            }
            function parent(i) {
              return (i + 1 >> 1) - 1;
            }
            function smaller(x, y) {
              if (x.priority !== y.priority) {
                return x.priority < y.priority;
              } else {
                return x.pushCount < y.pushCount;
              }
            }
            function priorityQueue(worker, concurrency) {
              var q = queue$1(worker, concurrency);
              var {
                push,
                pushAsync
              } = q;
              q._tasks = new Heap();
              q._createTaskItem = ({ data, priority }, callback) => {
                return {
                  data,
                  priority,
                  callback
                };
              };
              function createDataItems(tasks, priority) {
                if (!Array.isArray(tasks)) {
                  return { data: tasks, priority };
                }
                return tasks.map((data) => {
                  return { data, priority };
                });
              }
              q.push = function(data, priority = 0, callback) {
                return push(createDataItems(data, priority), callback);
              };
              q.pushAsync = function(data, priority = 0, callback) {
                return pushAsync(createDataItems(data, priority), callback);
              };
              delete q.unshift;
              delete q.unshiftAsync;
              return q;
            }
            function race(tasks, callback) {
              callback = once(callback);
              if (!Array.isArray(tasks)) return callback(new TypeError("First argument to race must be an array of functions"));
              if (!tasks.length) return callback();
              for (var i = 0, l = tasks.length; i < l; i++) {
                wrapAsync(tasks[i])(callback);
              }
            }
            var race$1 = awaitify(race, 2);
            function reduceRight(array, memo, iteratee, callback) {
              var reversed = [...array].reverse();
              return reduce$1(reversed, memo, iteratee, callback);
            }
            function reflect(fn) {
              var _fn = wrapAsync(fn);
              return initialParams(function reflectOn(args, reflectCallback) {
                args.push((error, ...cbArgs) => {
                  let retVal = {};
                  if (error) {
                    retVal.error = error;
                  }
                  if (cbArgs.length > 0) {
                    var value = cbArgs;
                    if (cbArgs.length <= 1) {
                      [value] = cbArgs;
                    }
                    retVal.value = value;
                  }
                  reflectCallback(null, retVal);
                });
                return _fn.apply(this, args);
              });
            }
            function reflectAll(tasks) {
              var results;
              if (Array.isArray(tasks)) {
                results = tasks.map(reflect);
              } else {
                results = {};
                Object.keys(tasks).forEach((key) => {
                  results[key] = reflect.call(this, tasks[key]);
                });
              }
              return results;
            }
            function reject(eachfn, arr, _iteratee, callback) {
              const iteratee = wrapAsync(_iteratee);
              return _filter(eachfn, arr, (value, cb) => {
                iteratee(value, (err, v) => {
                  cb(err, !v);
                });
              }, callback);
            }
            function reject$1(coll, iteratee, callback) {
              return reject(eachOf$1, coll, iteratee, callback);
            }
            var reject$2 = awaitify(reject$1, 3);
            function rejectLimit(coll, limit, iteratee, callback) {
              return reject(eachOfLimit(limit), coll, iteratee, callback);
            }
            var rejectLimit$1 = awaitify(rejectLimit, 4);
            function rejectSeries(coll, iteratee, callback) {
              return reject(eachOfSeries$1, coll, iteratee, callback);
            }
            var rejectSeries$1 = awaitify(rejectSeries, 3);
            function constant$1(value) {
              return function() {
                return value;
              };
            }
            const DEFAULT_TIMES = 5;
            const DEFAULT_INTERVAL = 0;
            function retry(opts, task, callback) {
              var options = {
                times: DEFAULT_TIMES,
                intervalFunc: constant$1(DEFAULT_INTERVAL)
              };
              if (arguments.length < 3 && typeof opts === "function") {
                callback = task || promiseCallback();
                task = opts;
              } else {
                parseTimes(options, opts);
                callback = callback || promiseCallback();
              }
              if (typeof task !== "function") {
                throw new Error("Invalid arguments for async.retry");
              }
              var _task = wrapAsync(task);
              var attempt = 1;
              function retryAttempt() {
                _task((err, ...args) => {
                  if (err === false) return;
                  if (err && attempt++ < options.times && (typeof options.errorFilter != "function" || options.errorFilter(err))) {
                    setTimeout(retryAttempt, options.intervalFunc(attempt - 1));
                  } else {
                    callback(err, ...args);
                  }
                });
              }
              retryAttempt();
              return callback[PROMISE_SYMBOL];
            }
            function parseTimes(acc, t) {
              if (typeof t === "object") {
                acc.times = +t.times || DEFAULT_TIMES;
                acc.intervalFunc = typeof t.interval === "function" ? t.interval : constant$1(+t.interval || DEFAULT_INTERVAL);
                acc.errorFilter = t.errorFilter;
              } else if (typeof t === "number" || typeof t === "string") {
                acc.times = +t || DEFAULT_TIMES;
              } else {
                throw new Error("Invalid arguments for async.retry");
              }
            }
            function retryable(opts, task) {
              if (!task) {
                task = opts;
                opts = null;
              }
              let arity = opts && opts.arity || task.length;
              if (isAsync(task)) {
                arity += 1;
              }
              var _task = wrapAsync(task);
              return initialParams((args, callback) => {
                if (args.length < arity - 1 || callback == null) {
                  args.push(callback);
                  callback = promiseCallback();
                }
                function taskFn(cb) {
                  _task(...args, cb);
                }
                if (opts) retry(opts, taskFn, callback);
                else retry(taskFn, callback);
                return callback[PROMISE_SYMBOL];
              });
            }
            function series(tasks, callback) {
              return parallel(eachOfSeries$1, tasks, callback);
            }
            function some(coll, iteratee, callback) {
              return _createTester(Boolean, (res) => res)(eachOf$1, coll, iteratee, callback);
            }
            var some$1 = awaitify(some, 3);
            function someLimit(coll, limit, iteratee, callback) {
              return _createTester(Boolean, (res) => res)(eachOfLimit(limit), coll, iteratee, callback);
            }
            var someLimit$1 = awaitify(someLimit, 4);
            function someSeries(coll, iteratee, callback) {
              return _createTester(Boolean, (res) => res)(eachOfSeries$1, coll, iteratee, callback);
            }
            var someSeries$1 = awaitify(someSeries, 3);
            function sortBy(coll, iteratee, callback) {
              var _iteratee = wrapAsync(iteratee);
              return map$1(coll, (x, iterCb) => {
                _iteratee(x, (err, criteria) => {
                  if (err) return iterCb(err);
                  iterCb(err, { value: x, criteria });
                });
              }, (err, results) => {
                if (err) return callback(err);
                callback(null, results.sort(comparator).map((v) => v.value));
              });
              function comparator(left, right) {
                var a = left.criteria, b = right.criteria;
                return a < b ? -1 : a > b ? 1 : 0;
              }
            }
            var sortBy$1 = awaitify(sortBy, 3);
            function timeout(asyncFn, milliseconds, info) {
              var fn = wrapAsync(asyncFn);
              return initialParams((args, callback) => {
                var timedOut = false;
                var timer;
                function timeoutCallback() {
                  var name = asyncFn.name || "anonymous";
                  var error = new Error('Callback function "' + name + '" timed out.');
                  error.code = "ETIMEDOUT";
                  if (info) {
                    error.info = info;
                  }
                  timedOut = true;
                  callback(error);
                }
                args.push((...cbArgs) => {
                  if (!timedOut) {
                    callback(...cbArgs);
                    clearTimeout(timer);
                  }
                });
                timer = setTimeout(timeoutCallback, milliseconds);
                fn(...args);
              });
            }
            function range(size) {
              var result = Array(size);
              while (size--) {
                result[size] = size;
              }
              return result;
            }
            function timesLimit(count, limit, iteratee, callback) {
              var _iteratee = wrapAsync(iteratee);
              return mapLimit$1(range(count), limit, _iteratee, callback);
            }
            function times(n, iteratee, callback) {
              return timesLimit(n, Infinity, iteratee, callback);
            }
            function timesSeries(n, iteratee, callback) {
              return timesLimit(n, 1, iteratee, callback);
            }
            function transform(coll, accumulator, iteratee, callback) {
              if (arguments.length <= 3 && typeof accumulator === "function") {
                callback = iteratee;
                iteratee = accumulator;
                accumulator = Array.isArray(coll) ? [] : {};
              }
              callback = once(callback || promiseCallback());
              var _iteratee = wrapAsync(iteratee);
              eachOf$1(coll, (v, k, cb) => {
                _iteratee(accumulator, v, k, cb);
              }, (err) => callback(err, accumulator));
              return callback[PROMISE_SYMBOL];
            }
            function tryEach(tasks, callback) {
              var error = null;
              var result;
              return eachSeries$1(tasks, (task, taskCb) => {
                wrapAsync(task)((err, ...args) => {
                  if (err === false) return taskCb(err);
                  if (args.length < 2) {
                    [result] = args;
                  } else {
                    result = args;
                  }
                  error = err;
                  taskCb(err ? null : {});
                });
              }, () => callback(error, result));
            }
            var tryEach$1 = awaitify(tryEach);
            function unmemoize(fn) {
              return (...args) => {
                return (fn.unmemoized || fn)(...args);
              };
            }
            function whilst(test, iteratee, callback) {
              callback = onlyOnce(callback);
              var _fn = wrapAsync(iteratee);
              var _test = wrapAsync(test);
              var results = [];
              function next(err, ...rest) {
                if (err) return callback(err);
                results = rest;
                if (err === false) return;
                _test(check);
              }
              function check(err, truth) {
                if (err) return callback(err);
                if (err === false) return;
                if (!truth) return callback(null, ...results);
                _fn(next);
              }
              return _test(check);
            }
            var whilst$1 = awaitify(whilst, 3);
            function until(test, iteratee, callback) {
              const _test = wrapAsync(test);
              return whilst$1((cb) => _test((err, truth) => cb(err, !truth)), iteratee, callback);
            }
            function waterfall(tasks, callback) {
              callback = once(callback);
              if (!Array.isArray(tasks)) return callback(new Error("First argument to waterfall must be an array of functions"));
              if (!tasks.length) return callback();
              var taskIndex = 0;
              function nextTask(args) {
                var task = wrapAsync(tasks[taskIndex++]);
                task(...args, onlyOnce(next));
              }
              function next(err, ...args) {
                if (err === false) return;
                if (err || taskIndex === tasks.length) {
                  return callback(err, ...args);
                }
                nextTask(args);
              }
              nextTask([]);
            }
            var waterfall$1 = awaitify(waterfall);
            var index = {
              apply,
              applyEach: applyEach$1,
              applyEachSeries,
              asyncify,
              auto,
              autoInject,
              cargo,
              cargoQueue: cargo$1,
              compose,
              concat: concat$1,
              concatLimit: concatLimit$1,
              concatSeries: concatSeries$1,
              constant,
              detect: detect$1,
              detectLimit: detectLimit$1,
              detectSeries: detectSeries$1,
              dir,
              doUntil,
              doWhilst: doWhilst$1,
              each,
              eachLimit: eachLimit$2,
              eachOf: eachOf$1,
              eachOfLimit: eachOfLimit$2,
              eachOfSeries: eachOfSeries$1,
              eachSeries: eachSeries$1,
              ensureAsync,
              every: every$1,
              everyLimit: everyLimit$1,
              everySeries: everySeries$1,
              filter: filter$1,
              filterLimit: filterLimit$1,
              filterSeries: filterSeries$1,
              forever: forever$1,
              groupBy,
              groupByLimit: groupByLimit$1,
              groupBySeries,
              log,
              map: map$1,
              mapLimit: mapLimit$1,
              mapSeries: mapSeries$1,
              mapValues,
              mapValuesLimit: mapValuesLimit$1,
              mapValuesSeries,
              memoize,
              nextTick,
              parallel: parallel$1,
              parallelLimit,
              priorityQueue,
              queue: queue$1,
              race: race$1,
              reduce: reduce$1,
              reduceRight,
              reflect,
              reflectAll,
              reject: reject$2,
              rejectLimit: rejectLimit$1,
              rejectSeries: rejectSeries$1,
              retry,
              retryable,
              seq,
              series,
              setImmediate: setImmediate$1,
              some: some$1,
              someLimit: someLimit$1,
              someSeries: someSeries$1,
              sortBy: sortBy$1,
              timeout,
              times,
              timesLimit,
              timesSeries,
              transform,
              tryEach: tryEach$1,
              unmemoize,
              until,
              waterfall: waterfall$1,
              whilst: whilst$1,
              // aliases
              all: every$1,
              allLimit: everyLimit$1,
              allSeries: everySeries$1,
              any: some$1,
              anyLimit: someLimit$1,
              anySeries: someSeries$1,
              find: detect$1,
              findLimit: detectLimit$1,
              findSeries: detectSeries$1,
              flatMap: concat$1,
              flatMapLimit: concatLimit$1,
              flatMapSeries: concatSeries$1,
              forEach: each,
              forEachSeries: eachSeries$1,
              forEachLimit: eachLimit$2,
              forEachOf: eachOf$1,
              forEachOfSeries: eachOfSeries$1,
              forEachOfLimit: eachOfLimit$2,
              inject: reduce$1,
              foldl: reduce$1,
              foldr: reduceRight,
              select: filter$1,
              selectLimit: filterLimit$1,
              selectSeries: filterSeries$1,
              wrapSync: asyncify,
              during: whilst$1,
              doDuring: doWhilst$1
            };
            exports3.default = index;
            exports3.apply = apply;
            exports3.applyEach = applyEach$1;
            exports3.applyEachSeries = applyEachSeries;
            exports3.asyncify = asyncify;
            exports3.auto = auto;
            exports3.autoInject = autoInject;
            exports3.cargo = cargo;
            exports3.cargoQueue = cargo$1;
            exports3.compose = compose;
            exports3.concat = concat$1;
            exports3.concatLimit = concatLimit$1;
            exports3.concatSeries = concatSeries$1;
            exports3.constant = constant;
            exports3.detect = detect$1;
            exports3.detectLimit = detectLimit$1;
            exports3.detectSeries = detectSeries$1;
            exports3.dir = dir;
            exports3.doUntil = doUntil;
            exports3.doWhilst = doWhilst$1;
            exports3.each = each;
            exports3.eachLimit = eachLimit$2;
            exports3.eachOf = eachOf$1;
            exports3.eachOfLimit = eachOfLimit$2;
            exports3.eachOfSeries = eachOfSeries$1;
            exports3.eachSeries = eachSeries$1;
            exports3.ensureAsync = ensureAsync;
            exports3.every = every$1;
            exports3.everyLimit = everyLimit$1;
            exports3.everySeries = everySeries$1;
            exports3.filter = filter$1;
            exports3.filterLimit = filterLimit$1;
            exports3.filterSeries = filterSeries$1;
            exports3.forever = forever$1;
            exports3.groupBy = groupBy;
            exports3.groupByLimit = groupByLimit$1;
            exports3.groupBySeries = groupBySeries;
            exports3.log = log;
            exports3.map = map$1;
            exports3.mapLimit = mapLimit$1;
            exports3.mapSeries = mapSeries$1;
            exports3.mapValues = mapValues;
            exports3.mapValuesLimit = mapValuesLimit$1;
            exports3.mapValuesSeries = mapValuesSeries;
            exports3.memoize = memoize;
            exports3.nextTick = nextTick;
            exports3.parallel = parallel$1;
            exports3.parallelLimit = parallelLimit;
            exports3.priorityQueue = priorityQueue;
            exports3.queue = queue$1;
            exports3.race = race$1;
            exports3.reduce = reduce$1;
            exports3.reduceRight = reduceRight;
            exports3.reflect = reflect;
            exports3.reflectAll = reflectAll;
            exports3.reject = reject$2;
            exports3.rejectLimit = rejectLimit$1;
            exports3.rejectSeries = rejectSeries$1;
            exports3.retry = retry;
            exports3.retryable = retryable;
            exports3.seq = seq;
            exports3.series = series;
            exports3.setImmediate = setImmediate$1;
            exports3.some = some$1;
            exports3.someLimit = someLimit$1;
            exports3.someSeries = someSeries$1;
            exports3.sortBy = sortBy$1;
            exports3.timeout = timeout;
            exports3.times = times;
            exports3.timesLimit = timesLimit;
            exports3.timesSeries = timesSeries;
            exports3.transform = transform;
            exports3.tryEach = tryEach$1;
            exports3.unmemoize = unmemoize;
            exports3.until = until;
            exports3.waterfall = waterfall$1;
            exports3.whilst = whilst$1;
            exports3.all = every$1;
            exports3.allLimit = everyLimit$1;
            exports3.allSeries = everySeries$1;
            exports3.any = some$1;
            exports3.anyLimit = someLimit$1;
            exports3.anySeries = someSeries$1;
            exports3.find = detect$1;
            exports3.findLimit = detectLimit$1;
            exports3.findSeries = detectSeries$1;
            exports3.flatMap = concat$1;
            exports3.flatMapLimit = concatLimit$1;
            exports3.flatMapSeries = concatSeries$1;
            exports3.forEach = each;
            exports3.forEachSeries = eachSeries$1;
            exports3.forEachLimit = eachLimit$2;
            exports3.forEachOf = eachOf$1;
            exports3.forEachOfSeries = eachOfSeries$1;
            exports3.forEachOfLimit = eachOfLimit$2;
            exports3.inject = reduce$1;
            exports3.foldl = reduce$1;
            exports3.foldr = reduceRight;
            exports3.select = filter$1;
            exports3.selectLimit = filterLimit$1;
            exports3.selectSeries = filterSeries$1;
            exports3.wrapSync = asyncify;
            exports3.during = whilst$1;
            exports3.doDuring = doWhilst$1;
            Object.defineProperty(exports3, "__esModule", { value: true });
          });
        }).call(this);
      }).call(this, require2("_process"), require2("timers").setImmediate);
    }, { "_process": 26, "timers": 52 }], 2: [function(require2, module2, exports2) {
      (function(global) {
        (function() {
          var possibleNames = [
            "BigInt64Array",
            "BigUint64Array",
            "Float32Array",
            "Float64Array",
            "Int16Array",
            "Int32Array",
            "Int8Array",
            "Uint16Array",
            "Uint32Array",
            "Uint8Array",
            "Uint8ClampedArray"
          ];
          var g = typeof globalThis === "undefined" ? global : globalThis;
          module2.exports = function availableTypedArrays() {
            var out = [];
            for (var i = 0; i < possibleNames.length; i++) {
              if (typeof g[possibleNames[i]] === "function") {
                out[out.length] = possibleNames[i];
              }
            }
            return out;
          };
        }).call(this);
      }).call(this, typeof commonjsGlobal !== "undefined" ? commonjsGlobal : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {}], 3: [function(require2, module2, exports2) {
      var GetIntrinsic = require2("get-intrinsic");
      var callBind = require2("./");
      var $indexOf = callBind(GetIntrinsic("String.prototype.indexOf"));
      module2.exports = function callBoundIntrinsic(name, allowMissing) {
        var intrinsic = GetIntrinsic(name, !!allowMissing);
        if (typeof intrinsic === "function" && $indexOf(name, ".prototype.") > -1) {
          return callBind(intrinsic);
        }
        return intrinsic;
      };
    }, { "./": 4, "get-intrinsic": 10 }], 4: [function(require2, module2, exports2) {
      var bind = require2("function-bind");
      var GetIntrinsic = require2("get-intrinsic");
      var $apply = GetIntrinsic("%Function.prototype.apply%");
      var $call = GetIntrinsic("%Function.prototype.call%");
      var $reflectApply = GetIntrinsic("%Reflect.apply%", true) || bind.call($call, $apply);
      var $gOPD = GetIntrinsic("%Object.getOwnPropertyDescriptor%", true);
      var $defineProperty = GetIntrinsic("%Object.defineProperty%", true);
      var $max = GetIntrinsic("%Math.max%");
      if ($defineProperty) {
        try {
          $defineProperty({}, "a", { value: 1 });
        } catch (e) {
          $defineProperty = null;
        }
      }
      module2.exports = function callBind(originalFunction) {
        var func = $reflectApply(bind, $call, arguments);
        if ($gOPD && $defineProperty) {
          var desc = $gOPD(func, "length");
          if (desc.configurable) {
            $defineProperty(
              func,
              "length",
              { value: 1 + $max(0, originalFunction.length - (arguments.length - 1)) }
            );
          }
        }
        return func;
      };
      var applyBind = function applyBind2() {
        return $reflectApply(bind, $apply, arguments);
      };
      if ($defineProperty) {
        $defineProperty(module2.exports, "apply", { value: applyBind });
      } else {
        module2.exports.apply = applyBind;
      }
    }, { "function-bind": 9, "get-intrinsic": 10 }], 5: [function(require2, module2, exports2) {
      var R = typeof Reflect === "object" ? Reflect : null;
      var ReflectApply = R && typeof R.apply === "function" ? R.apply : function ReflectApply2(target, receiver, args) {
        return Function.prototype.apply.call(target, receiver, args);
      };
      var ReflectOwnKeys;
      if (R && typeof R.ownKeys === "function") {
        ReflectOwnKeys = R.ownKeys;
      } else if (Object.getOwnPropertySymbols) {
        ReflectOwnKeys = function ReflectOwnKeys2(target) {
          return Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target));
        };
      } else {
        ReflectOwnKeys = function ReflectOwnKeys2(target) {
          return Object.getOwnPropertyNames(target);
        };
      }
      function ProcessEmitWarning(warning) {
        if (console && console.warn) console.warn(warning);
      }
      var NumberIsNaN = Number.isNaN || function NumberIsNaN2(value) {
        return value !== value;
      };
      function EventEmitter() {
        EventEmitter.init.call(this);
      }
      module2.exports = EventEmitter;
      module2.exports.once = once;
      EventEmitter.EventEmitter = EventEmitter;
      EventEmitter.prototype._events = void 0;
      EventEmitter.prototype._eventsCount = 0;
      EventEmitter.prototype._maxListeners = void 0;
      var defaultMaxListeners = 10;
      function checkListener(listener) {
        if (typeof listener !== "function") {
          throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
        }
      }
      Object.defineProperty(EventEmitter, "defaultMaxListeners", {
        enumerable: true,
        get: function() {
          return defaultMaxListeners;
        },
        set: function(arg) {
          if (typeof arg !== "number" || arg < 0 || NumberIsNaN(arg)) {
            throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + ".");
          }
          defaultMaxListeners = arg;
        }
      });
      EventEmitter.init = function() {
        if (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) {
          this._events = /* @__PURE__ */ Object.create(null);
          this._eventsCount = 0;
        }
        this._maxListeners = this._maxListeners || void 0;
      };
      EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
        if (typeof n !== "number" || n < 0 || NumberIsNaN(n)) {
          throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + ".");
        }
        this._maxListeners = n;
        return this;
      };
      function _getMaxListeners(that) {
        if (that._maxListeners === void 0)
          return EventEmitter.defaultMaxListeners;
        return that._maxListeners;
      }
      EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
        return _getMaxListeners(this);
      };
      EventEmitter.prototype.emit = function emit(type) {
        var args = [];
        for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
        var doError = type === "error";
        var events = this._events;
        if (events !== void 0)
          doError = doError && events.error === void 0;
        else if (!doError)
          return false;
        if (doError) {
          var er;
          if (args.length > 0)
            er = args[0];
          if (er instanceof Error) {
            throw er;
          }
          var err = new Error("Unhandled error." + (er ? " (" + er.message + ")" : ""));
          err.context = er;
          throw err;
        }
        var handler = events[type];
        if (handler === void 0)
          return false;
        if (typeof handler === "function") {
          ReflectApply(handler, this, args);
        } else {
          var len = handler.length;
          var listeners = arrayClone(handler, len);
          for (var i = 0; i < len; ++i)
            ReflectApply(listeners[i], this, args);
        }
        return true;
      };
      function _addListener(target, type, listener, prepend) {
        var m;
        var events;
        var existing;
        checkListener(listener);
        events = target._events;
        if (events === void 0) {
          events = target._events = /* @__PURE__ */ Object.create(null);
          target._eventsCount = 0;
        } else {
          if (events.newListener !== void 0) {
            target.emit(
              "newListener",
              type,
              listener.listener ? listener.listener : listener
            );
            events = target._events;
          }
          existing = events[type];
        }
        if (existing === void 0) {
          existing = events[type] = listener;
          ++target._eventsCount;
        } else {
          if (typeof existing === "function") {
            existing = events[type] = prepend ? [listener, existing] : [existing, listener];
          } else if (prepend) {
            existing.unshift(listener);
          } else {
            existing.push(listener);
          }
          m = _getMaxListeners(target);
          if (m > 0 && existing.length > m && !existing.warned) {
            existing.warned = true;
            var w = new Error("Possible EventEmitter memory leak detected. " + existing.length + " " + String(type) + " listeners added. Use emitter.setMaxListeners() to increase limit");
            w.name = "MaxListenersExceededWarning";
            w.emitter = target;
            w.type = type;
            w.count = existing.length;
            ProcessEmitWarning(w);
          }
        }
        return target;
      }
      EventEmitter.prototype.addListener = function addListener(type, listener) {
        return _addListener(this, type, listener, false);
      };
      EventEmitter.prototype.on = EventEmitter.prototype.addListener;
      EventEmitter.prototype.prependListener = function prependListener(type, listener) {
        return _addListener(this, type, listener, true);
      };
      function onceWrapper() {
        if (!this.fired) {
          this.target.removeListener(this.type, this.wrapFn);
          this.fired = true;
          if (arguments.length === 0)
            return this.listener.call(this.target);
          return this.listener.apply(this.target, arguments);
        }
      }
      function _onceWrap(target, type, listener) {
        var state = { fired: false, wrapFn: void 0, target, type, listener };
        var wrapped = onceWrapper.bind(state);
        wrapped.listener = listener;
        state.wrapFn = wrapped;
        return wrapped;
      }
      EventEmitter.prototype.once = function once2(type, listener) {
        checkListener(listener);
        this.on(type, _onceWrap(this, type, listener));
        return this;
      };
      EventEmitter.prototype.prependOnceListener = function prependOnceListener(type, listener) {
        checkListener(listener);
        this.prependListener(type, _onceWrap(this, type, listener));
        return this;
      };
      EventEmitter.prototype.removeListener = function removeListener(type, listener) {
        var list, events, position, i, originalListener;
        checkListener(listener);
        events = this._events;
        if (events === void 0)
          return this;
        list = events[type];
        if (list === void 0)
          return this;
        if (list === listener || list.listener === listener) {
          if (--this._eventsCount === 0)
            this._events = /* @__PURE__ */ Object.create(null);
          else {
            delete events[type];
            if (events.removeListener)
              this.emit("removeListener", type, list.listener || listener);
          }
        } else if (typeof list !== "function") {
          position = -1;
          for (i = list.length - 1; i >= 0; i--) {
            if (list[i] === listener || list[i].listener === listener) {
              originalListener = list[i].listener;
              position = i;
              break;
            }
          }
          if (position < 0)
            return this;
          if (position === 0)
            list.shift();
          else {
            spliceOne(list, position);
          }
          if (list.length === 1)
            events[type] = list[0];
          if (events.removeListener !== void 0)
            this.emit("removeListener", type, originalListener || listener);
        }
        return this;
      };
      EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
      EventEmitter.prototype.removeAllListeners = function removeAllListeners(type) {
        var listeners, events, i;
        events = this._events;
        if (events === void 0)
          return this;
        if (events.removeListener === void 0) {
          if (arguments.length === 0) {
            this._events = /* @__PURE__ */ Object.create(null);
            this._eventsCount = 0;
          } else if (events[type] !== void 0) {
            if (--this._eventsCount === 0)
              this._events = /* @__PURE__ */ Object.create(null);
            else
              delete events[type];
          }
          return this;
        }
        if (arguments.length === 0) {
          var keys = Object.keys(events);
          var key;
          for (i = 0; i < keys.length; ++i) {
            key = keys[i];
            if (key === "removeListener") continue;
            this.removeAllListeners(key);
          }
          this.removeAllListeners("removeListener");
          this._events = /* @__PURE__ */ Object.create(null);
          this._eventsCount = 0;
          return this;
        }
        listeners = events[type];
        if (typeof listeners === "function") {
          this.removeListener(type, listeners);
        } else if (listeners !== void 0) {
          for (i = listeners.length - 1; i >= 0; i--) {
            this.removeListener(type, listeners[i]);
          }
        }
        return this;
      };
      function _listeners(target, type, unwrap) {
        var events = target._events;
        if (events === void 0)
          return [];
        var evlistener = events[type];
        if (evlistener === void 0)
          return [];
        if (typeof evlistener === "function")
          return unwrap ? [evlistener.listener || evlistener] : [evlistener];
        return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
      }
      EventEmitter.prototype.listeners = function listeners(type) {
        return _listeners(this, type, true);
      };
      EventEmitter.prototype.rawListeners = function rawListeners(type) {
        return _listeners(this, type, false);
      };
      EventEmitter.listenerCount = function(emitter, type) {
        if (typeof emitter.listenerCount === "function") {
          return emitter.listenerCount(type);
        } else {
          return listenerCount.call(emitter, type);
        }
      };
      EventEmitter.prototype.listenerCount = listenerCount;
      function listenerCount(type) {
        var events = this._events;
        if (events !== void 0) {
          var evlistener = events[type];
          if (typeof evlistener === "function") {
            return 1;
          } else if (evlistener !== void 0) {
            return evlistener.length;
          }
        }
        return 0;
      }
      EventEmitter.prototype.eventNames = function eventNames() {
        return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
      };
      function arrayClone(arr, n) {
        var copy = new Array(n);
        for (var i = 0; i < n; ++i)
          copy[i] = arr[i];
        return copy;
      }
      function spliceOne(list, index) {
        for (; index + 1 < list.length; index++)
          list[index] = list[index + 1];
        list.pop();
      }
      function unwrapListeners(arr) {
        var ret = new Array(arr.length);
        for (var i = 0; i < ret.length; ++i) {
          ret[i] = arr[i].listener || arr[i];
        }
        return ret;
      }
      function once(emitter, name) {
        return new Promise(function(resolve, reject) {
          function errorListener(err) {
            emitter.removeListener(name, resolver);
            reject(err);
          }
          function resolver() {
            if (typeof emitter.removeListener === "function") {
              emitter.removeListener("error", errorListener);
            }
            resolve([].slice.call(arguments));
          }
          eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
          if (name !== "error") {
            addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
          }
        });
      }
      function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
        if (typeof emitter.on === "function") {
          eventTargetAgnosticAddListener(emitter, "error", handler, flags);
        }
      }
      function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
        if (typeof emitter.on === "function") {
          if (flags.once) {
            emitter.once(name, listener);
          } else {
            emitter.on(name, listener);
          }
        } else if (typeof emitter.addEventListener === "function") {
          emitter.addEventListener(name, function wrapListener(arg) {
            if (flags.once) {
              emitter.removeEventListener(name, wrapListener);
            }
            listener(arg);
          });
        } else {
          throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
        }
      }
    }, {}], 6: [function(require2, module2, exports2) {
      module2.exports = function equal(a, b) {
        if (a === b) return true;
        if (a && b && typeof a == "object" && typeof b == "object") {
          if (a.constructor !== b.constructor) return false;
          var length, i, keys;
          if (Array.isArray(a)) {
            length = a.length;
            if (length != b.length) return false;
            for (i = length; i-- !== 0; )
              if (!equal(a[i], b[i])) return false;
            return true;
          }
          if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
          if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
          if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();
          keys = Object.keys(a);
          length = keys.length;
          if (length !== Object.keys(b).length) return false;
          for (i = length; i-- !== 0; )
            if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;
          for (i = length; i-- !== 0; ) {
            var key = keys[i];
            if (!equal(a[key], b[key])) return false;
          }
          return true;
        }
        return a !== a && b !== b;
      };
    }, {}], 7: [function(require2, module2, exports2) {
      var isCallable = require2("is-callable");
      var toStr = Object.prototype.toString;
      var hasOwnProperty = Object.prototype.hasOwnProperty;
      var forEachArray = function forEachArray2(array, iterator, receiver) {
        for (var i = 0, len = array.length; i < len; i++) {
          if (hasOwnProperty.call(array, i)) {
            if (receiver == null) {
              iterator(array[i], i, array);
            } else {
              iterator.call(receiver, array[i], i, array);
            }
          }
        }
      };
      var forEachString = function forEachString2(string, iterator, receiver) {
        for (var i = 0, len = string.length; i < len; i++) {
          if (receiver == null) {
            iterator(string.charAt(i), i, string);
          } else {
            iterator.call(receiver, string.charAt(i), i, string);
          }
        }
      };
      var forEachObject = function forEachObject2(object, iterator, receiver) {
        for (var k in object) {
          if (hasOwnProperty.call(object, k)) {
            if (receiver == null) {
              iterator(object[k], k, object);
            } else {
              iterator.call(receiver, object[k], k, object);
            }
          }
        }
      };
      var forEach = function forEach2(list, iterator, thisArg) {
        if (!isCallable(iterator)) {
          throw new TypeError("iterator must be a function");
        }
        var receiver;
        if (arguments.length >= 3) {
          receiver = thisArg;
        }
        if (toStr.call(list) === "[object Array]") {
          forEachArray(list, iterator, receiver);
        } else if (typeof list === "string") {
          forEachString(list, iterator, receiver);
        } else {
          forEachObject(list, iterator, receiver);
        }
      };
      module2.exports = forEach;
    }, { "is-callable": 19 }], 8: [function(require2, module2, exports2) {
      var ERROR_MESSAGE = "Function.prototype.bind called on incompatible ";
      var toStr = Object.prototype.toString;
      var max = Math.max;
      var funcType = "[object Function]";
      var concatty = function concatty2(a, b) {
        var arr = [];
        for (var i = 0; i < a.length; i += 1) {
          arr[i] = a[i];
        }
        for (var j = 0; j < b.length; j += 1) {
          arr[j + a.length] = b[j];
        }
        return arr;
      };
      var slicy = function slicy2(arrLike, offset) {
        var arr = [];
        for (var i = offset, j = 0; i < arrLike.length; i += 1, j += 1) {
          arr[j] = arrLike[i];
        }
        return arr;
      };
      var joiny = function(arr, joiner) {
        var str = "";
        for (var i = 0; i < arr.length; i += 1) {
          str += arr[i];
          if (i + 1 < arr.length) {
            str += joiner;
          }
        }
        return str;
      };
      module2.exports = function bind(that) {
        var target = this;
        if (typeof target !== "function" || toStr.apply(target) !== funcType) {
          throw new TypeError(ERROR_MESSAGE + target);
        }
        var args = slicy(arguments, 1);
        var bound;
        var binder = function() {
          if (this instanceof bound) {
            var result = target.apply(
              this,
              concatty(args, arguments)
            );
            if (Object(result) === result) {
              return result;
            }
            return this;
          }
          return target.apply(
            that,
            concatty(args, arguments)
          );
        };
        var boundLength = max(0, target.length - args.length);
        var boundArgs = [];
        for (var i = 0; i < boundLength; i++) {
          boundArgs[i] = "$" + i;
        }
        bound = Function("binder", "return function (" + joiny(boundArgs, ",") + "){ return binder.apply(this,arguments); }")(binder);
        if (target.prototype) {
          var Empty = function Empty2() {
          };
          Empty.prototype = target.prototype;
          bound.prototype = new Empty();
          Empty.prototype = null;
        }
        return bound;
      };
    }, {}], 9: [function(require2, module2, exports2) {
      var implementation = require2("./implementation");
      module2.exports = Function.prototype.bind || implementation;
    }, { "./implementation": 8 }], 10: [function(require2, module2, exports2) {
      var undefined$1;
      var $SyntaxError = SyntaxError;
      var $Function = Function;
      var $TypeError = TypeError;
      var getEvalledConstructor = function(expressionSyntax) {
        try {
          return $Function('"use strict"; return (' + expressionSyntax + ").constructor;")();
        } catch (e) {
        }
      };
      var $gOPD = Object.getOwnPropertyDescriptor;
      if ($gOPD) {
        try {
          $gOPD({}, "");
        } catch (e) {
          $gOPD = null;
        }
      }
      var throwTypeError = function() {
        throw new $TypeError();
      };
      var ThrowTypeError = $gOPD ? function() {
        try {
          arguments.callee;
          return throwTypeError;
        } catch (calleeThrows) {
          try {
            return $gOPD(arguments, "callee").get;
          } catch (gOPDthrows) {
            return throwTypeError;
          }
        }
      }() : throwTypeError;
      var hasSymbols = require2("has-symbols")();
      var getProto = Object.getPrototypeOf || function(x) {
        return x.__proto__;
      };
      var needsEval = {};
      var TypedArray = typeof Uint8Array === "undefined" ? undefined$1 : getProto(Uint8Array);
      var INTRINSICS = {
        "%AggregateError%": typeof AggregateError === "undefined" ? undefined$1 : AggregateError,
        "%Array%": Array,
        "%ArrayBuffer%": typeof ArrayBuffer === "undefined" ? undefined$1 : ArrayBuffer,
        "%ArrayIteratorPrototype%": hasSymbols ? getProto([][Symbol.iterator]()) : undefined$1,
        "%AsyncFromSyncIteratorPrototype%": undefined$1,
        "%AsyncFunction%": needsEval,
        "%AsyncGenerator%": needsEval,
        "%AsyncGeneratorFunction%": needsEval,
        "%AsyncIteratorPrototype%": needsEval,
        "%Atomics%": typeof Atomics === "undefined" ? undefined$1 : Atomics,
        "%BigInt%": typeof BigInt === "undefined" ? undefined$1 : BigInt,
        "%BigInt64Array%": typeof BigInt64Array === "undefined" ? undefined$1 : BigInt64Array,
        "%BigUint64Array%": typeof BigUint64Array === "undefined" ? undefined$1 : BigUint64Array,
        "%Boolean%": Boolean,
        "%DataView%": typeof DataView === "undefined" ? undefined$1 : DataView,
        "%Date%": Date,
        "%decodeURI%": decodeURI,
        "%decodeURIComponent%": decodeURIComponent,
        "%encodeURI%": encodeURI,
        "%encodeURIComponent%": encodeURIComponent,
        "%Error%": Error,
        "%eval%": eval,
        // eslint-disable-line no-eval
        "%EvalError%": EvalError,
        "%Float32Array%": typeof Float32Array === "undefined" ? undefined$1 : Float32Array,
        "%Float64Array%": typeof Float64Array === "undefined" ? undefined$1 : Float64Array,
        "%FinalizationRegistry%": typeof FinalizationRegistry === "undefined" ? undefined$1 : FinalizationRegistry,
        "%Function%": $Function,
        "%GeneratorFunction%": needsEval,
        "%Int8Array%": typeof Int8Array === "undefined" ? undefined$1 : Int8Array,
        "%Int16Array%": typeof Int16Array === "undefined" ? undefined$1 : Int16Array,
        "%Int32Array%": typeof Int32Array === "undefined" ? undefined$1 : Int32Array,
        "%isFinite%": isFinite,
        "%isNaN%": isNaN,
        "%IteratorPrototype%": hasSymbols ? getProto(getProto([][Symbol.iterator]())) : undefined$1,
        "%JSON%": typeof JSON === "object" ? JSON : undefined$1,
        "%Map%": typeof Map === "undefined" ? undefined$1 : Map,
        "%MapIteratorPrototype%": typeof Map === "undefined" || !hasSymbols ? undefined$1 : getProto((/* @__PURE__ */ new Map())[Symbol.iterator]()),
        "%Math%": Math,
        "%Number%": Number,
        "%Object%": Object,
        "%parseFloat%": parseFloat,
        "%parseInt%": parseInt,
        "%Promise%": typeof Promise === "undefined" ? undefined$1 : Promise,
        "%Proxy%": typeof Proxy === "undefined" ? undefined$1 : Proxy,
        "%RangeError%": RangeError,
        "%ReferenceError%": ReferenceError,
        "%Reflect%": typeof Reflect === "undefined" ? undefined$1 : Reflect,
        "%RegExp%": RegExp,
        "%Set%": typeof Set === "undefined" ? undefined$1 : Set,
        "%SetIteratorPrototype%": typeof Set === "undefined" || !hasSymbols ? undefined$1 : getProto((/* @__PURE__ */ new Set())[Symbol.iterator]()),
        "%SharedArrayBuffer%": typeof SharedArrayBuffer === "undefined" ? undefined$1 : SharedArrayBuffer,
        "%String%": String,
        "%StringIteratorPrototype%": hasSymbols ? getProto(""[Symbol.iterator]()) : undefined$1,
        "%Symbol%": hasSymbols ? Symbol : undefined$1,
        "%SyntaxError%": $SyntaxError,
        "%ThrowTypeError%": ThrowTypeError,
        "%TypedArray%": TypedArray,
        "%TypeError%": $TypeError,
        "%Uint8Array%": typeof Uint8Array === "undefined" ? undefined$1 : Uint8Array,
        "%Uint8ClampedArray%": typeof Uint8ClampedArray === "undefined" ? undefined$1 : Uint8ClampedArray,
        "%Uint16Array%": typeof Uint16Array === "undefined" ? undefined$1 : Uint16Array,
        "%Uint32Array%": typeof Uint32Array === "undefined" ? undefined$1 : Uint32Array,
        "%URIError%": URIError,
        "%WeakMap%": typeof WeakMap === "undefined" ? undefined$1 : WeakMap,
        "%WeakRef%": typeof WeakRef === "undefined" ? undefined$1 : WeakRef,
        "%WeakSet%": typeof WeakSet === "undefined" ? undefined$1 : WeakSet
      };
      try {
        null.error;
      } catch (e) {
        var errorProto = getProto(getProto(e));
        INTRINSICS["%Error.prototype%"] = errorProto;
      }
      var doEval = function doEval2(name) {
        var value;
        if (name === "%AsyncFunction%") {
          value = getEvalledConstructor("async function () {}");
        } else if (name === "%GeneratorFunction%") {
          value = getEvalledConstructor("function* () {}");
        } else if (name === "%AsyncGeneratorFunction%") {
          value = getEvalledConstructor("async function* () {}");
        } else if (name === "%AsyncGenerator%") {
          var fn = doEval2("%AsyncGeneratorFunction%");
          if (fn) {
            value = fn.prototype;
          }
        } else if (name === "%AsyncIteratorPrototype%") {
          var gen = doEval2("%AsyncGenerator%");
          if (gen) {
            value = getProto(gen.prototype);
          }
        }
        INTRINSICS[name] = value;
        return value;
      };
      var LEGACY_ALIASES = {
        "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
        "%ArrayPrototype%": ["Array", "prototype"],
        "%ArrayProto_entries%": ["Array", "prototype", "entries"],
        "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
        "%ArrayProto_keys%": ["Array", "prototype", "keys"],
        "%ArrayProto_values%": ["Array", "prototype", "values"],
        "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
        "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
        "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"],
        "%BooleanPrototype%": ["Boolean", "prototype"],
        "%DataViewPrototype%": ["DataView", "prototype"],
        "%DatePrototype%": ["Date", "prototype"],
        "%ErrorPrototype%": ["Error", "prototype"],
        "%EvalErrorPrototype%": ["EvalError", "prototype"],
        "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
        "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
        "%FunctionPrototype%": ["Function", "prototype"],
        "%Generator%": ["GeneratorFunction", "prototype"],
        "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
        "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
        "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
        "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
        "%JSONParse%": ["JSON", "parse"],
        "%JSONStringify%": ["JSON", "stringify"],
        "%MapPrototype%": ["Map", "prototype"],
        "%NumberPrototype%": ["Number", "prototype"],
        "%ObjectPrototype%": ["Object", "prototype"],
        "%ObjProto_toString%": ["Object", "prototype", "toString"],
        "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
        "%PromisePrototype%": ["Promise", "prototype"],
        "%PromiseProto_then%": ["Promise", "prototype", "then"],
        "%Promise_all%": ["Promise", "all"],
        "%Promise_reject%": ["Promise", "reject"],
        "%Promise_resolve%": ["Promise", "resolve"],
        "%RangeErrorPrototype%": ["RangeError", "prototype"],
        "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
        "%RegExpPrototype%": ["RegExp", "prototype"],
        "%SetPrototype%": ["Set", "prototype"],
        "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
        "%StringPrototype%": ["String", "prototype"],
        "%SymbolPrototype%": ["Symbol", "prototype"],
        "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
        "%TypedArrayPrototype%": ["TypedArray", "prototype"],
        "%TypeErrorPrototype%": ["TypeError", "prototype"],
        "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
        "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
        "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
        "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
        "%URIErrorPrototype%": ["URIError", "prototype"],
        "%WeakMapPrototype%": ["WeakMap", "prototype"],
        "%WeakSetPrototype%": ["WeakSet", "prototype"]
      };
      var bind = require2("function-bind");
      var hasOwn = require2("has");
      var $concat = bind.call(Function.call, Array.prototype.concat);
      var $spliceApply = bind.call(Function.apply, Array.prototype.splice);
      var $replace = bind.call(Function.call, String.prototype.replace);
      var $strSlice = bind.call(Function.call, String.prototype.slice);
      var $exec = bind.call(Function.call, RegExp.prototype.exec);
      var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
      var reEscapeChar = /\\(\\)?/g;
      var stringToPath = function stringToPath2(string) {
        var first = $strSlice(string, 0, 1);
        var last = $strSlice(string, -1);
        if (first === "%" && last !== "%") {
          throw new $SyntaxError("invalid intrinsic syntax, expected closing `%`");
        } else if (last === "%" && first !== "%") {
          throw new $SyntaxError("invalid intrinsic syntax, expected opening `%`");
        }
        var result = [];
        $replace(string, rePropName, function(match, number, quote, subString) {
          result[result.length] = quote ? $replace(subString, reEscapeChar, "$1") : number || match;
        });
        return result;
      };
      var getBaseIntrinsic = function getBaseIntrinsic2(name, allowMissing) {
        var intrinsicName = name;
        var alias;
        if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
          alias = LEGACY_ALIASES[intrinsicName];
          intrinsicName = "%" + alias[0] + "%";
        }
        if (hasOwn(INTRINSICS, intrinsicName)) {
          var value = INTRINSICS[intrinsicName];
          if (value === needsEval) {
            value = doEval(intrinsicName);
          }
          if (typeof value === "undefined" && !allowMissing) {
            throw new $TypeError("intrinsic " + name + " exists, but is not available. Please file an issue!");
          }
          return {
            alias,
            name: intrinsicName,
            value
          };
        }
        throw new $SyntaxError("intrinsic " + name + " does not exist!");
      };
      module2.exports = function GetIntrinsic(name, allowMissing) {
        if (typeof name !== "string" || name.length === 0) {
          throw new $TypeError("intrinsic name must be a non-empty string");
        }
        if (arguments.length > 1 && typeof allowMissing !== "boolean") {
          throw new $TypeError('"allowMissing" argument must be a boolean');
        }
        if ($exec(/^%?[^%]*%?$/, name) === null) {
          throw new $SyntaxError("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
        }
        var parts = stringToPath(name);
        var intrinsicBaseName = parts.length > 0 ? parts[0] : "";
        var intrinsic = getBaseIntrinsic("%" + intrinsicBaseName + "%", allowMissing);
        var intrinsicRealName = intrinsic.name;
        var value = intrinsic.value;
        var skipFurtherCaching = false;
        var alias = intrinsic.alias;
        if (alias) {
          intrinsicBaseName = alias[0];
          $spliceApply(parts, $concat([0, 1], alias));
        }
        for (var i = 1, isOwn = true; i < parts.length; i += 1) {
          var part = parts[i];
          var first = $strSlice(part, 0, 1);
          var last = $strSlice(part, -1);
          if ((first === '"' || first === "'" || first === "`" || (last === '"' || last === "'" || last === "`")) && first !== last) {
            throw new $SyntaxError("property names with quotes must have matching quotes");
          }
          if (part === "constructor" || !isOwn) {
            skipFurtherCaching = true;
          }
          intrinsicBaseName += "." + part;
          intrinsicRealName = "%" + intrinsicBaseName + "%";
          if (hasOwn(INTRINSICS, intrinsicRealName)) {
            value = INTRINSICS[intrinsicRealName];
          } else if (value != null) {
            if (!(part in value)) {
              if (!allowMissing) {
                throw new $TypeError("base intrinsic for " + name + " exists, but the property is not available.");
              }
              return void 0;
            }
            if ($gOPD && i + 1 >= parts.length) {
              var desc = $gOPD(value, part);
              isOwn = !!desc;
              if (isOwn && "get" in desc && !("originalValue" in desc.get)) {
                value = desc.get;
              } else {
                value = value[part];
              }
            } else {
              isOwn = hasOwn(value, part);
              value = value[part];
            }
            if (isOwn && !skipFurtherCaching) {
              INTRINSICS[intrinsicRealName] = value;
            }
          }
        }
        return value;
      };
    }, { "function-bind": 9, "has": 15, "has-symbols": 12 }], 11: [function(require2, module2, exports2) {
      var GetIntrinsic = require2("get-intrinsic");
      var $gOPD = GetIntrinsic("%Object.getOwnPropertyDescriptor%", true);
      if ($gOPD) {
        try {
          $gOPD([], "length");
        } catch (e) {
          $gOPD = null;
        }
      }
      module2.exports = $gOPD;
    }, { "get-intrinsic": 10 }], 12: [function(require2, module2, exports2) {
      var origSymbol = typeof Symbol !== "undefined" && Symbol;
      var hasSymbolSham = require2("./shams");
      module2.exports = function hasNativeSymbols() {
        if (typeof origSymbol !== "function") {
          return false;
        }
        if (typeof Symbol !== "function") {
          return false;
        }
        if (typeof origSymbol("foo") !== "symbol") {
          return false;
        }
        if (typeof Symbol("bar") !== "symbol") {
          return false;
        }
        return hasSymbolSham();
      };
    }, { "./shams": 13 }], 13: [function(require2, module2, exports2) {
      module2.exports = function hasSymbols() {
        if (typeof Symbol !== "function" || typeof Object.getOwnPropertySymbols !== "function") {
          return false;
        }
        if (typeof Symbol.iterator === "symbol") {
          return true;
        }
        var obj = {};
        var sym = Symbol("test");
        var symObj = Object(sym);
        if (typeof sym === "string") {
          return false;
        }
        if (Object.prototype.toString.call(sym) !== "[object Symbol]") {
          return false;
        }
        if (Object.prototype.toString.call(symObj) !== "[object Symbol]") {
          return false;
        }
        var symVal = 42;
        obj[sym] = symVal;
        for (sym in obj) {
          return false;
        }
        if (typeof Object.keys === "function" && Object.keys(obj).length !== 0) {
          return false;
        }
        if (typeof Object.getOwnPropertyNames === "function" && Object.getOwnPropertyNames(obj).length !== 0) {
          return false;
        }
        var syms = Object.getOwnPropertySymbols(obj);
        if (syms.length !== 1 || syms[0] !== sym) {
          return false;
        }
        if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) {
          return false;
        }
        if (typeof Object.getOwnPropertyDescriptor === "function") {
          var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
          if (descriptor.value !== symVal || descriptor.enumerable !== true) {
            return false;
          }
        }
        return true;
      };
    }, {}], 14: [function(require2, module2, exports2) {
      var hasSymbols = require2("has-symbols/shams");
      module2.exports = function hasToStringTagShams() {
        return hasSymbols() && !!Symbol.toStringTag;
      };
    }, { "has-symbols/shams": 13 }], 15: [function(require2, module2, exports2) {
      var bind = require2("function-bind");
      module2.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);
    }, { "function-bind": 9 }], 16: [function(require2, module2, exports2) {
      var hat = module2.exports = function(bits, base) {
        if (!base) base = 16;
        if (bits === void 0) bits = 128;
        if (bits <= 0) return "0";
        var digits = Math.log(Math.pow(2, bits)) / Math.log(base);
        for (var i = 2; digits === Infinity; i *= 2) {
          digits = Math.log(Math.pow(2, bits / i)) / Math.log(base) * i;
        }
        var rem = digits - Math.floor(digits);
        var res = "";
        for (var i = 0; i < Math.floor(digits); i++) {
          var x = Math.floor(Math.random() * base).toString(base);
          res = x + res;
        }
        if (rem) {
          var b = Math.pow(base, rem);
          var x = Math.floor(Math.random() * b).toString(base);
          res = x + res;
        }
        var parsed = parseInt(res, base);
        if (parsed !== Infinity && parsed >= Math.pow(2, bits)) {
          return hat(bits, base);
        } else return res;
      };
      hat.rack = function(bits, base, expandBy) {
        var fn = function(data) {
          var iters = 0;
          do {
            if (iters++ > 10) {
              if (expandBy) bits += expandBy;
              else throw new Error("too many ID collisions, use more bits");
            }
            var id = hat(bits, base);
          } while (Object.hasOwnProperty.call(hats, id));
          hats[id] = data;
          return id;
        };
        var hats = fn.hats = {};
        fn.get = function(id) {
          return fn.hats[id];
        };
        fn.set = function(id, value) {
          fn.hats[id] = value;
          return fn;
        };
        fn.bits = bits || 128;
        fn.base = base || 16;
        return fn;
      };
    }, {}], 17: [function(require2, module2, exports2) {
      if (typeof Object.create === "function") {
        module2.exports = function inherits(ctor, superCtor) {
          if (superCtor) {
            ctor.super_ = superCtor;
            ctor.prototype = Object.create(superCtor.prototype, {
              constructor: {
                value: ctor,
                enumerable: false,
                writable: true,
                configurable: true
              }
            });
          }
        };
      } else {
        module2.exports = function inherits(ctor, superCtor) {
          if (superCtor) {
            ctor.super_ = superCtor;
            var TempCtor = function() {
            };
            TempCtor.prototype = superCtor.prototype;
            ctor.prototype = new TempCtor();
            ctor.prototype.constructor = ctor;
          }
        };
      }
    }, {}], 18: [function(require2, module2, exports2) {
      var hasToStringTag = require2("has-tostringtag/shams")();
      var callBound = require2("call-bind/callBound");
      var $toString = callBound("Object.prototype.toString");
      var isStandardArguments = function isArguments(value) {
        if (hasToStringTag && value && typeof value === "object" && Symbol.toStringTag in value) {
          return false;
        }
        return $toString(value) === "[object Arguments]";
      };
      var isLegacyArguments = function isArguments(value) {
        if (isStandardArguments(value)) {
          return true;
        }
        return value !== null && typeof value === "object" && typeof value.length === "number" && value.length >= 0 && $toString(value) !== "[object Array]" && $toString(value.callee) === "[object Function]";
      };
      var supportsStandardArguments = function() {
        return isStandardArguments(arguments);
      }();
      isStandardArguments.isLegacyArguments = isLegacyArguments;
      module2.exports = supportsStandardArguments ? isStandardArguments : isLegacyArguments;
    }, { "call-bind/callBound": 3, "has-tostringtag/shams": 14 }], 19: [function(require2, module2, exports2) {
      var fnToStr = Function.prototype.toString;
      var reflectApply = typeof Reflect === "object" && Reflect !== null && Reflect.apply;
      var badArrayLike;
      var isCallableMarker;
      if (typeof reflectApply === "function" && typeof Object.defineProperty === "function") {
        try {
          badArrayLike = Object.defineProperty({}, "length", {
            get: function() {
              throw isCallableMarker;
            }
          });
          isCallableMarker = {};
          reflectApply(function() {
            throw 42;
          }, null, badArrayLike);
        } catch (_) {
          if (_ !== isCallableMarker) {
            reflectApply = null;
          }
        }
      } else {
        reflectApply = null;
      }
      var constructorRegex = /^\s*class\b/;
      var isES6ClassFn = function isES6ClassFunction(value) {
        try {
          var fnStr = fnToStr.call(value);
          return constructorRegex.test(fnStr);
        } catch (e) {
          return false;
        }
      };
      var tryFunctionObject = function tryFunctionToStr(value) {
        try {
          if (isES6ClassFn(value)) {
            return false;
          }
          fnToStr.call(value);
          return true;
        } catch (e) {
          return false;
        }
      };
      var toStr = Object.prototype.toString;
      var objectClass = "[object Object]";
      var fnClass = "[object Function]";
      var genClass = "[object GeneratorFunction]";
      var ddaClass = "[object HTMLAllCollection]";
      var ddaClass2 = "[object HTML document.all class]";
      var ddaClass3 = "[object HTMLCollection]";
      var hasToStringTag = typeof Symbol === "function" && !!Symbol.toStringTag;
      var isIE68 = !(0 in [,]);
      var isDDA = function isDocumentDotAll() {
        return false;
      };
      if (typeof document === "object") {
        var all = document.all;
        if (toStr.call(all) === toStr.call(document.all)) {
          isDDA = function isDocumentDotAll(value) {
            if ((isIE68 || !value) && (typeof value === "undefined" || typeof value === "object")) {
              try {
                var str = toStr.call(value);
                return (str === ddaClass || str === ddaClass2 || str === ddaClass3 || str === objectClass) && value("") == null;
              } catch (e) {
              }
            }
            return false;
          };
        }
      }
      module2.exports = reflectApply ? function isCallable(value) {
        if (isDDA(value)) {
          return true;
        }
        if (!value) {
          return false;
        }
        if (typeof value !== "function" && typeof value !== "object") {
          return false;
        }
        try {
          reflectApply(value, null, badArrayLike);
        } catch (e) {
          if (e !== isCallableMarker) {
            return false;
          }
        }
        return !isES6ClassFn(value) && tryFunctionObject(value);
      } : function isCallable(value) {
        if (isDDA(value)) {
          return true;
        }
        if (!value) {
          return false;
        }
        if (typeof value !== "function" && typeof value !== "object") {
          return false;
        }
        if (hasToStringTag) {
          return tryFunctionObject(value);
        }
        if (isES6ClassFn(value)) {
          return false;
        }
        var strClass = toStr.call(value);
        if (strClass !== fnClass && strClass !== genClass && !/^\[object HTML/.test(strClass)) {
          return false;
        }
        return tryFunctionObject(value);
      };
    }, {}], 20: [function(require2, module2, exports2) {
      var toStr = Object.prototype.toString;
      var fnToStr = Function.prototype.toString;
      var isFnRegex = /^\s*(?:function)?\*/;
      var hasToStringTag = require2("has-tostringtag/shams")();
      var getProto = Object.getPrototypeOf;
      var getGeneratorFunc = function() {
        if (!hasToStringTag) {
          return false;
        }
        try {
          return Function("return function*() {}")();
        } catch (e) {
        }
      };
      var GeneratorFunction;
      module2.exports = function isGeneratorFunction(fn) {
        if (typeof fn !== "function") {
          return false;
        }
        if (isFnRegex.test(fnToStr.call(fn))) {
          return true;
        }
        if (!hasToStringTag) {
          var str = toStr.call(fn);
          return str === "[object GeneratorFunction]";
        }
        if (!getProto) {
          return false;
        }
        if (typeof GeneratorFunction === "undefined") {
          var generatorFunc = getGeneratorFunc();
          GeneratorFunction = generatorFunc ? getProto(generatorFunc) : false;
        }
        return getProto(fn) === GeneratorFunction;
      };
    }, { "has-tostringtag/shams": 14 }], 21: [function(require2, module2, exports2) {
      (function(global) {
        (function() {
          var forEach = require2("for-each");
          var availableTypedArrays = require2("available-typed-arrays");
          var callBound = require2("call-bind/callBound");
          var $toString = callBound("Object.prototype.toString");
          var hasToStringTag = require2("has-tostringtag/shams")();
          var gOPD = require2("gopd");
          var g = typeof globalThis === "undefined" ? global : globalThis;
          var typedArrays = availableTypedArrays();
          var $indexOf = callBound("Array.prototype.indexOf", true) || function indexOf(array, value) {
            for (var i = 0; i < array.length; i += 1) {
              if (array[i] === value) {
                return i;
              }
            }
            return -1;
          };
          var $slice = callBound("String.prototype.slice");
          var toStrTags = {};
          var getPrototypeOf = Object.getPrototypeOf;
          if (hasToStringTag && gOPD && getPrototypeOf) {
            forEach(typedArrays, function(typedArray) {
              var arr = new g[typedArray]();
              if (Symbol.toStringTag in arr) {
                var proto = getPrototypeOf(arr);
                var descriptor = gOPD(proto, Symbol.toStringTag);
                if (!descriptor) {
                  var superProto = getPrototypeOf(proto);
                  descriptor = gOPD(superProto, Symbol.toStringTag);
                }
                toStrTags[typedArray] = descriptor.get;
              }
            });
          }
          var tryTypedArrays = function tryAllTypedArrays(value) {
            var anyTrue = false;
            forEach(toStrTags, function(getter, typedArray) {
              if (!anyTrue) {
                try {
                  anyTrue = getter.call(value) === typedArray;
                } catch (e) {
                }
              }
            });
            return anyTrue;
          };
          module2.exports = function isTypedArray(value) {
            if (!value || typeof value !== "object") {
              return false;
            }
            if (!hasToStringTag || !(Symbol.toStringTag in value)) {
              var tag = $slice($toString(value), 8, -1);
              return $indexOf(typedArrays, tag) > -1;
            }
            if (!gOPD) {
              return false;
            }
            return tryTypedArrays(value);
          };
        }).call(this);
      }).call(this, typeof commonjsGlobal !== "undefined" ? commonjsGlobal : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, { "available-typed-arrays": 2, "call-bind/callBound": 3, "for-each": 7, "gopd": 11, "has-tostringtag/shams": 14 }], 22: [function(require2, module2, exports2) {
      module2.exports = bootstrapTransform;
      function bootstrapTransform(type, transformComponent, checkValidOp, append) {
        var transformComponentX = function(left, right, destLeft, destRight) {
          transformComponent(destLeft, left, right, "left");
          transformComponent(destRight, right, left, "right");
        };
        var transformX = type.transformX = function(leftOp, rightOp) {
          checkValidOp(leftOp);
          checkValidOp(rightOp);
          var newRightOp = [];
          for (var i = 0; i < rightOp.length; i++) {
            var rightComponent = rightOp[i];
            var newLeftOp = [];
            var k = 0;
            while (k < leftOp.length) {
              var nextC = [];
              transformComponentX(leftOp[k], rightComponent, newLeftOp, nextC);
              k++;
              if (nextC.length === 1) {
                rightComponent = nextC[0];
              } else if (nextC.length === 0) {
                for (var j = k; j < leftOp.length; j++) {
                  append(newLeftOp, leftOp[j]);
                }
                rightComponent = null;
                break;
              } else {
                var pair = transformX(leftOp.slice(k), nextC);
                for (var l = 0; l < pair[0].length; l++) {
                  append(newLeftOp, pair[0][l]);
                }
                for (var r = 0; r < pair[1].length; r++) {
                  append(newRightOp, pair[1][r]);
                }
                rightComponent = null;
                break;
              }
            }
            if (rightComponent != null) {
              append(newRightOp, rightComponent);
            }
            leftOp = newLeftOp;
          }
          return [leftOp, newRightOp];
        };
        type.transform = function(op, otherOp, type2) {
          if (!(type2 === "left" || type2 === "right"))
            throw new Error("type must be 'left' or 'right'");
          if (otherOp.length === 0) return op;
          if (op.length === 1 && otherOp.length === 1)
            return transformComponent([], op[0], otherOp[0], type2);
          if (type2 === "left")
            return transformX(op, otherOp)[0];
          else
            return transformX(otherOp, op)[1];
        };
      }
    }, {}], 23: [function(require2, module2, exports2) {
      module2.exports = {
        type: require2("./json0")
      };
    }, { "./json0": 24 }], 24: [function(require2, module2, exports2) {
      var isArray = function(obj) {
        return Object.prototype.toString.call(obj) == "[object Array]";
      };
      var isObject = function(obj) {
        return !!obj && obj.constructor === Object;
      };
      var clone = function(o) {
        return JSON.parse(JSON.stringify(o));
      };
      var json = {
        name: "json0",
        uri: "http://sharejs.org/types/JSONv0"
      };
      var subtypes = {};
      json.registerSubtype = function(subtype) {
        subtypes[subtype.name] = subtype;
      };
      json.create = function(data) {
        return data === void 0 ? null : clone(data);
      };
      json.invertComponent = function(c) {
        var c_ = { p: c.p };
        if (c.t && subtypes[c.t]) {
          c_.t = c.t;
          c_.o = subtypes[c.t].invert(c.o);
        }
        if (c.si !== void 0) c_.sd = c.si;
        if (c.sd !== void 0) c_.si = c.sd;
        if (c.oi !== void 0) c_.od = c.oi;
        if (c.od !== void 0) c_.oi = c.od;
        if (c.li !== void 0) c_.ld = c.li;
        if (c.ld !== void 0) c_.li = c.ld;
        if (c.na !== void 0) c_.na = -c.na;
        if (c.lm !== void 0) {
          c_.lm = c.p[c.p.length - 1];
          c_.p = c.p.slice(0, c.p.length - 1).concat([c.lm]);
        }
        return c_;
      };
      json.invert = function(op) {
        var op_ = op.slice().reverse();
        var iop = [];
        for (var i = 0; i < op_.length; i++) {
          iop.push(json.invertComponent(op_[i]));
        }
        return iop;
      };
      json.checkValidOp = function(op) {
        for (var i = 0; i < op.length; i++) {
          if (!isArray(op[i].p)) throw new Error("Missing path");
        }
      };
      json.checkList = function(elem) {
        if (!isArray(elem))
          throw new Error("Referenced element not a list");
      };
      json.checkObj = function(elem) {
        if (!isObject(elem)) {
          throw new Error("Referenced element not an object (it was " + JSON.stringify(elem) + ")");
        }
      };
      function convertFromText(c) {
        c.t = "text0";
        var o = { p: c.p.pop() };
        if (c.si != null) o.i = c.si;
        if (c.sd != null) o.d = c.sd;
        c.o = [o];
      }
      function convertToText(c) {
        c.p.push(c.o[0].p);
        if (c.o[0].i != null) c.si = c.o[0].i;
        if (c.o[0].d != null) c.sd = c.o[0].d;
        delete c.t;
        delete c.o;
      }
      json.apply = function(snapshot, op) {
        json.checkValidOp(op);
        op = clone(op);
        var container = {
          data: snapshot
        };
        for (var i = 0; i < op.length; i++) {
          var c = op[i];
          if (c.si != null || c.sd != null)
            convertFromText(c);
          var parent = null;
          var elem = container;
          var key = "data";
          for (var j = 0; j < c.p.length; j++) {
            var p = c.p[j];
            parent = elem;
            elem = elem[key];
            key = p;
            if (parent == null)
              throw new Error("Path invalid");
          }
          if (c.t && c.o !== void 0 && subtypes[c.t]) {
            elem[key] = subtypes[c.t].apply(elem[key], c.o);
          } else if (c.na !== void 0) {
            if (typeof elem[key] != "number")
              throw new Error("Referenced element not a number");
            elem[key] += c.na;
          } else if (c.li !== void 0 && c.ld !== void 0) {
            json.checkList(elem);
            elem[key] = c.li;
          } else if (c.li !== void 0) {
            json.checkList(elem);
            elem.splice(key, 0, c.li);
          } else if (c.ld !== void 0) {
            json.checkList(elem);
            elem.splice(key, 1);
          } else if (c.lm !== void 0) {
            json.checkList(elem);
            if (c.lm != key) {
              var e = elem[key];
              elem.splice(key, 1);
              elem.splice(c.lm, 0, e);
            }
          } else if (c.oi !== void 0) {
            json.checkObj(elem);
            elem[key] = c.oi;
          } else if (c.od !== void 0) {
            json.checkObj(elem);
            delete elem[key];
          } else {
            throw new Error("invalid / missing instruction in op");
          }
        }
        return container.data;
      };
      json.shatter = function(op) {
        var results = [];
        for (var i = 0; i < op.length; i++) {
          results.push([op[i]]);
        }
        return results;
      };
      json.incrementalApply = function(snapshot, op, _yield) {
        for (var i = 0; i < op.length; i++) {
          var smallOp = [op[i]];
          snapshot = json.apply(snapshot, smallOp);
          _yield(smallOp, snapshot);
        }
        return snapshot;
      };
      var pathMatches = json.pathMatches = function(p1, p2, ignoreLast) {
        if (p1.length != p2.length)
          return false;
        for (var i = 0; i < p1.length; i++) {
          if (p1[i] !== p2[i] && (!ignoreLast || i !== p1.length - 1))
            return false;
        }
        return true;
      };
      json.append = function(dest, c) {
        c = clone(c);
        if (dest.length === 0) {
          dest.push(c);
          return;
        }
        var last = dest[dest.length - 1];
        if ((c.si != null || c.sd != null) && (last.si != null || last.sd != null)) {
          convertFromText(c);
          convertFromText(last);
        }
        if (pathMatches(c.p, last.p)) {
          if (c.t && last.t && c.t === last.t && subtypes[c.t]) {
            last.o = subtypes[c.t].compose(last.o, c.o);
            if (c.si != null || c.sd != null) {
              var p = c.p;
              for (var i = 0; i < last.o.length - 1; i++) {
                c.o = [last.o.pop()];
                c.p = p.slice();
                convertToText(c);
                dest.push(c);
              }
              convertToText(last);
            }
          } else if (last.na != null && c.na != null) {
            dest[dest.length - 1] = { p: last.p, na: last.na + c.na };
          } else if (last.li !== void 0 && c.li === void 0 && c.ld === last.li) {
            if (last.ld !== void 0) {
              delete last.li;
            } else {
              dest.pop();
            }
          } else if (last.od !== void 0 && last.oi === void 0 && c.oi !== void 0 && c.od === void 0) {
            last.oi = c.oi;
          } else if (last.oi !== void 0 && c.od !== void 0) {
            if (c.oi !== void 0) {
              last.oi = c.oi;
            } else if (last.od !== void 0) {
              delete last.oi;
            } else {
              dest.pop();
            }
          } else if (c.lm !== void 0 && c.p[c.p.length - 1] === c.lm) ;
          else {
            dest.push(c);
          }
        } else {
          if ((c.si != null || c.sd != null) && (last.si != null || last.sd != null)) {
            convertToText(c);
            convertToText(last);
          }
          dest.push(c);
        }
      };
      json.compose = function(op1, op2) {
        json.checkValidOp(op1);
        json.checkValidOp(op2);
        var newOp = clone(op1);
        for (var i = 0; i < op2.length; i++) {
          json.append(newOp, op2[i]);
        }
        return newOp;
      };
      json.normalize = function(op) {
        var newOp = [];
        op = isArray(op) ? op : [op];
        for (var i = 0; i < op.length; i++) {
          var c = op[i];
          if (c.p == null) c.p = [];
          json.append(newOp, c);
        }
        return newOp;
      };
      json.commonLengthForOps = function(a, b) {
        var alen = a.p.length;
        var blen = b.p.length;
        if (a.na != null || a.t)
          alen++;
        if (b.na != null || b.t)
          blen++;
        if (alen === 0) return -1;
        if (blen === 0) return null;
        alen--;
        blen--;
        for (var i = 0; i < alen; i++) {
          var p = a.p[i];
          if (i >= blen || p !== b.p[i])
            return null;
        }
        return alen;
      };
      json.canOpAffectPath = function(op, path) {
        return json.commonLengthForOps({ p: path }, op) != null;
      };
      json.transformComponent = function(dest, c, otherC, type) {
        c = clone(c);
        var common = json.commonLengthForOps(otherC, c);
        var common2 = json.commonLengthForOps(c, otherC);
        var cplength = c.p.length;
        var otherCplength = otherC.p.length;
        if (c.na != null || c.t)
          cplength++;
        if (otherC.na != null || otherC.t)
          otherCplength++;
        if (common2 != null && otherCplength > cplength && c.p[common2] == otherC.p[common2]) {
          if (c.ld !== void 0) {
            var oc = clone(otherC);
            oc.p = oc.p.slice(cplength);
            c.ld = json.apply(clone(c.ld), [oc]);
          } else if (c.od !== void 0) {
            var oc = clone(otherC);
            oc.p = oc.p.slice(cplength);
            c.od = json.apply(clone(c.od), [oc]);
          }
        }
        if (common != null) {
          var commonOperand = cplength == otherCplength;
          var oc = otherC;
          if ((c.si != null || c.sd != null) && (otherC.si != null || otherC.sd != null)) {
            convertFromText(c);
            oc = clone(otherC);
            convertFromText(oc);
          }
          if (oc.t && subtypes[oc.t]) {
            if (c.t && c.t === oc.t) {
              var res = subtypes[c.t].transform(c.o, oc.o, type);
              if (c.si != null || c.sd != null) {
                var p = c.p;
                for (var i = 0; i < res.length; i++) {
                  c.o = [res[i]];
                  c.p = p.slice();
                  convertToText(c);
                  json.append(dest, c);
                }
              } else if (!isArray(res) || res.length > 0) {
                c.o = res;
                json.append(dest, c);
              }
              return dest;
            }
          } else if (otherC.na !== void 0) ;
          else if (otherC.li !== void 0 && otherC.ld !== void 0) {
            if (otherC.p[common] === c.p[common]) {
              if (!commonOperand) {
                return dest;
              } else if (c.ld !== void 0) {
                if (c.li !== void 0 && type === "left") {
                  c.ld = clone(otherC.li);
                } else {
                  return dest;
                }
              }
            }
          } else if (otherC.li !== void 0) {
            if (c.li !== void 0 && c.ld === void 0 && commonOperand && c.p[common] === otherC.p[common]) {
              if (type === "right")
                c.p[common]++;
            } else if (otherC.p[common] <= c.p[common]) {
              c.p[common]++;
            }
            if (c.lm !== void 0) {
              if (commonOperand) {
                if (otherC.p[common] <= c.lm)
                  c.lm++;
              }
            }
          } else if (otherC.ld !== void 0) {
            if (c.lm !== void 0) {
              if (commonOperand) {
                if (otherC.p[common] === c.p[common]) {
                  return dest;
                }
                var p = otherC.p[common];
                var from = c.p[common];
                var to = c.lm;
                if (p < to || p === to && from < to)
                  c.lm--;
              }
            }
            if (otherC.p[common] < c.p[common]) {
              c.p[common]--;
            } else if (otherC.p[common] === c.p[common]) {
              if (otherCplength < cplength) {
                return dest;
              } else if (c.ld !== void 0) {
                if (c.li !== void 0) {
                  delete c.ld;
                } else {
                  return dest;
                }
              }
            }
          } else if (otherC.lm !== void 0) {
            if (c.lm !== void 0 && cplength === otherCplength) {
              var from = c.p[common];
              var to = c.lm;
              var otherFrom = otherC.p[common];
              var otherTo = otherC.lm;
              if (otherFrom !== otherTo) {
                if (from === otherFrom) {
                  if (type === "left") {
                    c.p[common] = otherTo;
                    if (from === to)
                      c.lm = otherTo;
                  } else {
                    return dest;
                  }
                } else {
                  if (from > otherFrom) c.p[common]--;
                  if (from > otherTo) c.p[common]++;
                  else if (from === otherTo) {
                    if (otherFrom > otherTo) {
                      c.p[common]++;
                      if (from === to)
                        c.lm++;
                    }
                  }
                  if (to > otherFrom) {
                    c.lm--;
                  } else if (to === otherFrom) {
                    if (to > from)
                      c.lm--;
                  }
                  if (to > otherTo) {
                    c.lm++;
                  } else if (to === otherTo) {
                    if (otherTo > otherFrom && to > from || otherTo < otherFrom && to < from) {
                      if (type === "right") c.lm++;
                    } else {
                      if (to > from) c.lm++;
                      else if (to === otherFrom) c.lm--;
                    }
                  }
                }
              }
            } else if (c.li !== void 0 && c.ld === void 0 && commonOperand) {
              var from = otherC.p[common];
              var to = otherC.lm;
              p = c.p[common];
              if (p > from) c.p[common]--;
              if (p > to) c.p[common]++;
            } else {
              var from = otherC.p[common];
              var to = otherC.lm;
              p = c.p[common];
              if (p === from) {
                c.p[common] = to;
              } else {
                if (p > from) c.p[common]--;
                if (p > to) c.p[common]++;
                else if (p === to && from > to) c.p[common]++;
              }
            }
          } else if (otherC.oi !== void 0 && otherC.od !== void 0) {
            if (c.p[common] === otherC.p[common]) {
              if (c.oi !== void 0 && commonOperand) {
                if (type === "right") {
                  return dest;
                } else {
                  c.od = otherC.oi;
                }
              } else {
                return dest;
              }
            }
          } else if (otherC.oi !== void 0) {
            if (c.oi !== void 0 && c.p[common] === otherC.p[common]) {
              if (type === "left") {
                json.append(dest, { p: c.p, od: otherC.oi });
              } else {
                return dest;
              }
            }
          } else if (otherC.od !== void 0) {
            if (c.p[common] == otherC.p[common]) {
              if (!commonOperand)
                return dest;
              if (c.oi !== void 0) {
                delete c.od;
              } else {
                return dest;
              }
            }
          }
        }
        json.append(dest, c);
        return dest;
      };
      require2("./bootstrapTransform")(json, json.transformComponent, json.checkValidOp, json.append);
      var text = require2("./text0");
      json.registerSubtype(text);
      module2.exports = json;
    }, { "./bootstrapTransform": 22, "./text0": 25 }], 25: [function(require2, module2, exports2) {
      var text = module2.exports = {
        name: "text0",
        uri: "http://sharejs.org/types/textv0",
        create: function(initial) {
          if (initial != null && typeof initial !== "string") {
            throw new Error("Initial data must be a string");
          }
          return initial || "";
        }
      };
      var strInject = function(s1, pos, s2) {
        return s1.slice(0, pos) + s2 + s1.slice(pos);
      };
      var checkValidComponent = function(c) {
        if (typeof c.p !== "number")
          throw new Error("component missing position field");
        if (typeof c.i === "string" === (typeof c.d === "string"))
          throw new Error("component needs an i or d field");
        if (c.p < 0)
          throw new Error("position cannot be negative");
      };
      var checkValidOp = function(op) {
        for (var i = 0; i < op.length; i++) {
          checkValidComponent(op[i]);
        }
      };
      text.apply = function(snapshot, op) {
        var deleted;
        checkValidOp(op);
        for (var i = 0; i < op.length; i++) {
          var component = op[i];
          if (component.i != null) {
            snapshot = strInject(snapshot, component.p, component.i);
          } else {
            deleted = snapshot.slice(component.p, component.p + component.d.length);
            if (component.d !== deleted)
              throw new Error("Delete component '" + component.d + "' does not match deleted text '" + deleted + "'");
            snapshot = snapshot.slice(0, component.p) + snapshot.slice(component.p + component.d.length);
          }
        }
        return snapshot;
      };
      var append = text._append = function(newOp, c) {
        if (c.i === "" || c.d === "") return;
        if (newOp.length === 0) {
          newOp.push(c);
        } else {
          var last = newOp[newOp.length - 1];
          if (last.i != null && c.i != null && last.p <= c.p && c.p <= last.p + last.i.length) {
            newOp[newOp.length - 1] = { i: strInject(last.i, c.p - last.p, c.i), p: last.p };
          } else if (last.d != null && c.d != null && c.p <= last.p && last.p <= c.p + c.d.length) {
            newOp[newOp.length - 1] = { d: strInject(c.d, last.p - c.p, last.d), p: c.p };
          } else {
            newOp.push(c);
          }
        }
      };
      text.compose = function(op1, op2) {
        checkValidOp(op1);
        checkValidOp(op2);
        var newOp = op1.slice();
        for (var i = 0; i < op2.length; i++) {
          append(newOp, op2[i]);
        }
        return newOp;
      };
      text.normalize = function(op) {
        var newOp = [];
        if (op.i != null || op.p != null) op = [op];
        for (var i = 0; i < op.length; i++) {
          var c = op[i];
          if (c.p == null) c.p = 0;
          append(newOp, c);
        }
        return newOp;
      };
      var transformPosition = function(pos, c, insertAfter) {
        if (c.i != null) {
          if (c.p < pos || c.p === pos && insertAfter) {
            return pos + c.i.length;
          } else {
            return pos;
          }
        } else {
          if (pos <= c.p) {
            return pos;
          } else if (pos <= c.p + c.d.length) {
            return c.p;
          } else {
            return pos - c.d.length;
          }
        }
      };
      text.transformCursor = function(position, op, side) {
        var insertAfter = side === "right";
        for (var i = 0; i < op.length; i++) {
          position = transformPosition(position, op[i], insertAfter);
        }
        return position;
      };
      var transformComponent = text._tc = function(dest, c, otherC, side) {
        checkValidComponent(c);
        checkValidComponent(otherC);
        if (c.i != null) {
          append(dest, { i: c.i, p: transformPosition(c.p, otherC, side === "right") });
        } else {
          if (otherC.i != null) {
            var s = c.d;
            if (c.p < otherC.p) {
              append(dest, { d: s.slice(0, otherC.p - c.p), p: c.p });
              s = s.slice(otherC.p - c.p);
            }
            if (s !== "")
              append(dest, { d: s, p: c.p + otherC.i.length });
          } else {
            if (c.p >= otherC.p + otherC.d.length)
              append(dest, { d: c.d, p: c.p - otherC.d.length });
            else if (c.p + c.d.length <= otherC.p)
              append(dest, c);
            else {
              var newC = { d: "", p: c.p };
              if (c.p < otherC.p)
                newC.d = c.d.slice(0, otherC.p - c.p);
              if (c.p + c.d.length > otherC.p + otherC.d.length)
                newC.d += c.d.slice(otherC.p + otherC.d.length - c.p);
              var intersectStart = Math.max(c.p, otherC.p);
              var intersectEnd = Math.min(c.p + c.d.length, otherC.p + otherC.d.length);
              var cIntersect = c.d.slice(intersectStart - c.p, intersectEnd - c.p);
              var otherIntersect = otherC.d.slice(intersectStart - otherC.p, intersectEnd - otherC.p);
              if (cIntersect !== otherIntersect)
                throw new Error("Delete ops delete different text in the same region of the document");
              if (newC.d !== "") {
                newC.p = transformPosition(newC.p, otherC);
                append(dest, newC);
              }
            }
          }
        }
        return dest;
      };
      var invertComponent = function(c) {
        return c.i != null ? { d: c.i, p: c.p } : { i: c.d, p: c.p };
      };
      text.invert = function(op) {
        op = op.slice().reverse();
        for (var i = 0; i < op.length; i++) {
          op[i] = invertComponent(op[i]);
        }
        return op;
      };
      require2("./bootstrapTransform")(text, transformComponent, checkValidOp, append);
    }, { "./bootstrapTransform": 22 }], 26: [function(require2, module2, exports2) {
      var process = module2.exports = {};
      var cachedSetTimeout;
      var cachedClearTimeout;
      function defaultSetTimout() {
        throw new Error("setTimeout has not been defined");
      }
      function defaultClearTimeout() {
        throw new Error("clearTimeout has not been defined");
      }
      (function() {
        try {
          if (typeof setTimeout === "function") {
            cachedSetTimeout = setTimeout;
          } else {
            cachedSetTimeout = defaultSetTimout;
          }
        } catch (e) {
          cachedSetTimeout = defaultSetTimout;
        }
        try {
          if (typeof clearTimeout === "function") {
            cachedClearTimeout = clearTimeout;
          } else {
            cachedClearTimeout = defaultClearTimeout;
          }
        } catch (e) {
          cachedClearTimeout = defaultClearTimeout;
        }
      })();
      function runTimeout(fun) {
        if (cachedSetTimeout === setTimeout) {
          return setTimeout(fun, 0);
        }
        if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
          cachedSetTimeout = setTimeout;
          return setTimeout(fun, 0);
        }
        try {
          return cachedSetTimeout(fun, 0);
        } catch (e) {
          try {
            return cachedSetTimeout.call(null, fun, 0);
          } catch (e2) {
            return cachedSetTimeout.call(this, fun, 0);
          }
        }
      }
      function runClearTimeout(marker) {
        if (cachedClearTimeout === clearTimeout) {
          return clearTimeout(marker);
        }
        if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
          cachedClearTimeout = clearTimeout;
          return clearTimeout(marker);
        }
        try {
          return cachedClearTimeout(marker);
        } catch (e) {
          try {
            return cachedClearTimeout.call(null, marker);
          } catch (e2) {
            return cachedClearTimeout.call(this, marker);
          }
        }
      }
      var queue = [];
      var draining = false;
      var currentQueue;
      var queueIndex = -1;
      function cleanUpNextTick() {
        if (!draining || !currentQueue) {
          return;
        }
        draining = false;
        if (currentQueue.length) {
          queue = currentQueue.concat(queue);
        } else {
          queueIndex = -1;
        }
        if (queue.length) {
          drainQueue();
        }
      }
      function drainQueue() {
        if (draining) {
          return;
        }
        var timeout = runTimeout(cleanUpNextTick);
        draining = true;
        var len = queue.length;
        while (len) {
          currentQueue = queue;
          queue = [];
          while (++queueIndex < len) {
            if (currentQueue) {
              currentQueue[queueIndex].run();
            }
          }
          queueIndex = -1;
          len = queue.length;
        }
        currentQueue = null;
        draining = false;
        runClearTimeout(timeout);
      }
      process.nextTick = function(fun) {
        var args = new Array(arguments.length - 1);
        if (arguments.length > 1) {
          for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
          }
        }
        queue.push(new Item(fun, args));
        if (queue.length === 1 && !draining) {
          runTimeout(drainQueue);
        }
      };
      function Item(fun, array) {
        this.fun = fun;
        this.array = array;
      }
      Item.prototype.run = function() {
        this.fun.apply(null, this.array);
      };
      process.title = "browser";
      process.browser = true;
      process.env = {};
      process.argv = [];
      process.version = "";
      process.versions = {};
      function noop() {
      }
      process.on = noop;
      process.addListener = noop;
      process.once = noop;
      process.off = noop;
      process.removeListener = noop;
      process.removeAllListeners = noop;
      process.emit = noop;
      process.prependListener = noop;
      process.prependOnceListener = noop;
      process.listeners = function(name) {
        return [];
      };
      process.binding = function(name) {
        throw new Error("process.binding is not supported");
      };
      process.cwd = function() {
        return "/";
      };
      process.chdir = function(dir) {
        throw new Error("process.chdir is not supported");
      };
      process.umask = function() {
        return 0;
      };
    }, {}], 27: [function(require2, module2, exports2) {
      var Doc = require2("./doc");
      var Query = require2("./query");
      var Presence = require2("./presence/presence");
      var DocPresence = require2("./presence/doc-presence");
      var SnapshotVersionRequest = require2("./snapshot-request/snapshot-version-request");
      var SnapshotTimestampRequest = require2("./snapshot-request/snapshot-timestamp-request");
      var emitter = require2("../emitter");
      var ShareDBError = require2("../error");
      var ACTIONS = require2("../message-actions").ACTIONS;
      var types = require2("../types");
      var util = require2("../util");
      var logger = require2("../logger");
      var DocPresenceEmitter = require2("./presence/doc-presence-emitter");
      var protocol = require2("../protocol");
      var ERROR_CODE = ShareDBError.CODES;
      function connectionState(socket) {
        if (socket.readyState === 0 || socket.readyState === 1) return "connecting";
        return "disconnected";
      }
      module2.exports = Connection;
      function Connection(socket) {
        emitter.EventEmitter.call(this);
        this.collections = /* @__PURE__ */ Object.create(null);
        this.nextQueryId = 1;
        this.nextSnapshotRequestId = 1;
        this.queries = /* @__PURE__ */ Object.create(null);
        this._presences = /* @__PURE__ */ Object.create(null);
        this._docPresenceEmitter = new DocPresenceEmitter();
        this._snapshotRequests = /* @__PURE__ */ Object.create(null);
        this.seq = 1;
        this._presenceSeq = 1;
        this.id = null;
        this.agent = null;
        this.debug = false;
        this.state = connectionState(socket);
        this.bindToSocket(socket);
      }
      emitter.mixin(Connection);
      Connection.prototype.bindToSocket = function(socket) {
        if (this.socket) {
          this.socket.close();
          this.socket.onmessage = null;
          this.socket.onopen = null;
          this.socket.onerror = null;
          this.socket.onclose = null;
        }
        this.socket = socket;
        var newState = connectionState(socket);
        this._setState(newState);
        this.canSend = false;
        var connection = this;
        socket.onmessage = function(event) {
          try {
            var data = typeof event.data === "string" ? JSON.parse(event.data) : event.data;
          } catch (err) {
            logger.warn("Failed to parse message", event);
            return;
          }
          if (connection.debug) logger.info("RECV", JSON.stringify(data));
          var request = { data };
          connection.emit("receive", request);
          if (!request.data) return;
          try {
            connection.handleMessage(request.data);
          } catch (err) {
            util.nextTick(function() {
              connection.emit("error", err);
            });
          }
        };
        if (socket.readyState === 1) {
          connection._initializeHandshake();
        }
        socket.onopen = function() {
          connection._setState("connecting");
          connection._initializeHandshake();
        };
        socket.onerror = function(err) {
          connection.emit("connection error", err);
        };
        socket.onclose = function(reason) {
          if (reason === "closed" || reason === "Closed") {
            connection._setState("closed", reason);
          } else if (reason === "stopped" || reason === "Stopped by server") {
            connection._setState("stopped", reason);
          } else {
            connection._setState("disconnected", reason);
          }
        };
      };
      Connection.prototype.handleMessage = function(message) {
        var err = null;
        if (message.error) {
          err = wrapErrorData(message.error, message);
          delete message.error;
        }
        switch (message.a) {
          case ACTIONS.initLegacy:
            return this._handleLegacyInit(message);
          case ACTIONS.handshake:
            return this._handleHandshake(err, message);
          case ACTIONS.queryFetch:
            var query = this.queries[message.id];
            if (query) query._handleFetch(err, message.data, message.extra);
            return;
          case ACTIONS.querySubscribe:
            var query = this.queries[message.id];
            if (query) query._handleSubscribe(err, message.data, message.extra);
            return;
          case ACTIONS.queryUnsubscribe:
            return;
          case ACTIONS.queryUpdate:
            var query = this.queries[message.id];
            if (!query) return;
            if (err) return query._handleError(err);
            if (message.diff) query._handleDiff(message.diff);
            if (util.hasOwn(message, "extra")) query._handleExtra(message.extra);
            return;
          case ACTIONS.bulkFetch:
            return this._handleBulkMessage(err, message, "_handleFetch");
          case ACTIONS.bulkSubscribe:
          case ACTIONS.bulkUnsubscribe:
            return this._handleBulkMessage(err, message, "_handleSubscribe");
          case ACTIONS.snapshotFetch:
          case ACTIONS.snapshotFetchByTimestamp:
            return this._handleSnapshotFetch(err, message);
          case ACTIONS.fetch:
            var doc = this.getExisting(message.c, message.d);
            if (doc) doc._handleFetch(err, message.data);
            return;
          case ACTIONS.subscribe:
          case ACTIONS.unsubscribe:
            var doc = this.getExisting(message.c, message.d);
            if (doc) doc._handleSubscribe(err, message.data);
            return;
          case ACTIONS.op:
            var doc = this.getExisting(message.c, message.d);
            if (doc) doc._handleOp(err, message);
            return;
          case ACTIONS.presence:
            return this._handlePresence(err, message);
          case ACTIONS.presenceSubscribe:
            return this._handlePresenceSubscribe(err, message);
          case ACTIONS.presenceUnsubscribe:
            return this._handlePresenceUnsubscribe(err, message);
          case ACTIONS.presenceRequest:
            return this._handlePresenceRequest(err, message);
          case ACTIONS.pingPong:
            return this._handlePingPong(err);
          default:
            logger.warn("Ignoring unrecognized message", message);
        }
      };
      function wrapErrorData(errorData, fullMessage) {
        var err = new Error(errorData.message);
        err.code = errorData.code;
        if (fullMessage) {
          err.data = fullMessage;
        }
        return err;
      }
      Connection.prototype._handleBulkMessage = function(err, message, method) {
        if (message.data) {
          for (var id in message.data) {
            var dataForId = message.data[id];
            var doc = this.getExisting(message.c, id);
            if (doc) {
              if (err) {
                doc[method](err);
              } else if (dataForId.error) {
                doc[method](wrapErrorData(dataForId.error));
              } else {
                doc[method](null, dataForId);
              }
            }
          }
        } else if (Array.isArray(message.b)) {
          for (var i = 0; i < message.b.length; i++) {
            var id = message.b[i];
            var doc = this.getExisting(message.c, id);
            if (doc) doc[method](err);
          }
        } else if (message.b) {
          for (var id in message.b) {
            var doc = this.getExisting(message.c, id);
            if (doc) doc[method](err);
          }
        } else {
          logger.error("Invalid bulk message", message);
        }
      };
      Connection.prototype._reset = function() {
        this.agent = null;
      };
      Connection.prototype._setState = function(newState, reason) {
        if (this.state === newState) return;
        if (newState === "connecting" && this.state !== "disconnected" && this.state !== "stopped" && this.state !== "closed" || newState === "connected" && this.state !== "connecting") {
          var err = new ShareDBError(
            ERROR_CODE.ERR_CONNECTION_STATE_TRANSITION_INVALID,
            "Cannot transition directly from " + this.state + " to " + newState
          );
          return this.emit("error", err);
        }
        this.state = newState;
        this.canSend = newState === "connected";
        if (newState === "disconnected" || newState === "stopped" || newState === "closed") {
          this._reset();
        }
        this.startBulk();
        for (var id in this.queries) {
          var query = this.queries[id];
          query._onConnectionStateChanged();
        }
        for (var collection in this.collections) {
          var docs = this.collections[collection];
          for (var id in docs) {
            docs[id]._onConnectionStateChanged();
          }
        }
        for (var channel in this._presences) {
          this._presences[channel]._onConnectionStateChanged();
        }
        for (var id in this._snapshotRequests) {
          var snapshotRequest = this._snapshotRequests[id];
          snapshotRequest._onConnectionStateChanged();
        }
        this.endBulk();
        this.emit(newState, reason);
        this.emit("state", newState, reason);
      };
      Connection.prototype.startBulk = function() {
        if (!this.bulk) this.bulk = /* @__PURE__ */ Object.create(null);
      };
      Connection.prototype.endBulk = function() {
        if (this.bulk) {
          for (var collection in this.bulk) {
            var actions = this.bulk[collection];
            this._sendBulk("f", collection, actions.f);
            this._sendBulk("s", collection, actions.s);
            this._sendBulk("u", collection, actions.u);
          }
        }
        this.bulk = null;
      };
      Connection.prototype._sendBulk = function(action, collection, values) {
        if (!values) return;
        var ids = [];
        var versions = /* @__PURE__ */ Object.create(null);
        var versionsCount = 0;
        var versionId;
        for (var id in values) {
          var value = values[id];
          if (value == null) {
            ids.push(id);
          } else {
            versions[id] = value;
            versionId = id;
            versionsCount++;
          }
        }
        if (ids.length === 1) {
          var id = ids[0];
          this.send({ a: action, c: collection, d: id });
        } else if (ids.length) {
          this.send({ a: "b" + action, c: collection, b: ids });
        }
        if (versionsCount === 1) {
          var version = versions[versionId];
          this.send({ a: action, c: collection, d: versionId, v: version });
        } else if (versionsCount) {
          this.send({ a: "b" + action, c: collection, b: versions });
        }
      };
      Connection.prototype._sendActions = function(action, doc, version) {
        this._addDoc(doc);
        if (this.bulk) {
          var actions = this.bulk[doc.collection] || (this.bulk[doc.collection] = /* @__PURE__ */ Object.create(null));
          var versions = actions[action] || (actions[action] = /* @__PURE__ */ Object.create(null));
          var isDuplicate = util.hasOwn(versions, doc.id);
          versions[doc.id] = version;
          return isDuplicate;
        } else {
          var message = { a: action, c: doc.collection, d: doc.id, v: version };
          this.send(message);
        }
      };
      Connection.prototype.sendFetch = function(doc) {
        return this._sendActions(ACTIONS.fetch, doc, doc.version);
      };
      Connection.prototype.sendSubscribe = function(doc) {
        return this._sendActions(ACTIONS.subscribe, doc, doc.version);
      };
      Connection.prototype.sendUnsubscribe = function(doc) {
        return this._sendActions(ACTIONS.unsubscribe, doc);
      };
      Connection.prototype.sendOp = function(doc, op) {
        this._addDoc(doc);
        var message = {
          a: ACTIONS.op,
          c: doc.collection,
          d: doc.id,
          v: doc.version,
          src: op.src,
          seq: op.seq,
          x: {}
        };
        if ("op" in op) message.op = op.op;
        if (op.create) message.create = op.create;
        if (op.del) message.del = op.del;
        if (doc.submitSource) message.x.source = op.source;
        this.send(message);
      };
      Connection.prototype.send = function(message) {
        if (this.debug) logger.info("SEND", JSON.stringify(message));
        this.emit("send", message);
        this.socket.send(JSON.stringify(message));
      };
      Connection.prototype.ping = function() {
        if (!this.canSend) {
          throw new ShareDBError(
            ERROR_CODE.ERR_CANNOT_PING_OFFLINE,
            "Socket must be CONNECTED to ping"
          );
        }
        var message = {
          a: ACTIONS.pingPong
        };
        this.send(message);
      };
      Connection.prototype.close = function() {
        this.socket.close();
      };
      Connection.prototype.getExisting = function(collection, id) {
        if (this.collections[collection]) return this.collections[collection][id];
      };
      Connection.prototype.get = function(collection, id) {
        var docs = this.collections[collection] || (this.collections[collection] = /* @__PURE__ */ Object.create(null));
        var doc = docs[id];
        if (!doc) {
          doc = docs[id] = new Doc(this, collection, id);
          this.emit("doc", doc);
        }
        doc._wantsDestroy = false;
        return doc;
      };
      Connection.prototype._destroyDoc = function(doc) {
        if (!doc._wantsDestroy) return;
        util.digAndRemove(this.collections, doc.collection, doc.id);
        doc.emit("destroy");
      };
      Connection.prototype._addDoc = function(doc) {
        var docs = this.collections[doc.collection];
        if (!docs) {
          docs = this.collections[doc.collection] = /* @__PURE__ */ Object.create(null);
        }
        if (docs[doc.id] !== doc) {
          docs[doc.id] = doc;
        }
      };
      Connection.prototype._createQuery = function(action, collection, q, options, callback) {
        var id = this.nextQueryId++;
        var query = new Query(action, this, id, collection, q, options, callback);
        this.queries[id] = query;
        query.send();
        return query;
      };
      Connection.prototype._destroyQuery = function(query) {
        delete this.queries[query.id];
      };
      Connection.prototype.createFetchQuery = function(collection, q, options, callback) {
        return this._createQuery(ACTIONS.queryFetch, collection, q, options, callback);
      };
      Connection.prototype.createSubscribeQuery = function(collection, q, options, callback) {
        return this._createQuery(ACTIONS.querySubscribe, collection, q, options, callback);
      };
      Connection.prototype.hasPending = function() {
        return !!(this._firstDoc(hasPending) || this._firstQuery(hasPending) || this._firstSnapshotRequest());
      };
      function hasPending(object) {
        return object.hasPending();
      }
      Connection.prototype.hasWritePending = function() {
        return !!this._firstDoc(hasWritePending);
      };
      function hasWritePending(object) {
        return object.hasWritePending();
      }
      Connection.prototype.whenNothingPending = function(callback) {
        var doc = this._firstDoc(hasPending);
        if (doc) {
          doc.once("nothing pending", this._nothingPendingRetry(callback));
          return;
        }
        var query = this._firstQuery(hasPending);
        if (query) {
          query.once("ready", this._nothingPendingRetry(callback));
          return;
        }
        var snapshotRequest = this._firstSnapshotRequest();
        if (snapshotRequest) {
          snapshotRequest.once("ready", this._nothingPendingRetry(callback));
          return;
        }
        util.nextTick(callback);
      };
      Connection.prototype._nothingPendingRetry = function(callback) {
        var connection = this;
        return function() {
          util.nextTick(function() {
            connection.whenNothingPending(callback);
          });
        };
      };
      Connection.prototype._firstDoc = function(fn) {
        for (var collection in this.collections) {
          var docs = this.collections[collection];
          for (var id in docs) {
            var doc = docs[id];
            if (fn(doc)) {
              return doc;
            }
          }
        }
      };
      Connection.prototype._firstQuery = function(fn) {
        for (var id in this.queries) {
          var query = this.queries[id];
          if (fn(query)) {
            return query;
          }
        }
      };
      Connection.prototype._firstSnapshotRequest = function() {
        for (var id in this._snapshotRequests) {
          return this._snapshotRequests[id];
        }
      };
      Connection.prototype.fetchSnapshot = function(collection, id, version, callback) {
        if (typeof version === "function") {
          callback = version;
          version = null;
        }
        var requestId = this.nextSnapshotRequestId++;
        var snapshotRequest = new SnapshotVersionRequest(this, requestId, collection, id, version, callback);
        this._snapshotRequests[snapshotRequest.requestId] = snapshotRequest;
        snapshotRequest.send();
      };
      Connection.prototype.fetchSnapshotByTimestamp = function(collection, id, timestamp, callback) {
        if (typeof timestamp === "function") {
          callback = timestamp;
          timestamp = null;
        }
        var requestId = this.nextSnapshotRequestId++;
        var snapshotRequest = new SnapshotTimestampRequest(this, requestId, collection, id, timestamp, callback);
        this._snapshotRequests[snapshotRequest.requestId] = snapshotRequest;
        snapshotRequest.send();
      };
      Connection.prototype._handleSnapshotFetch = function(error, message) {
        var snapshotRequest = this._snapshotRequests[message.id];
        if (!snapshotRequest) return;
        delete this._snapshotRequests[message.id];
        snapshotRequest._handleResponse(error, message);
      };
      Connection.prototype._handleLegacyInit = function(message) {
        if (protocol.checkAtLeast(message, "1.1")) return this._initializeHandshake();
        this._initialize(message);
      };
      Connection.prototype._initializeHandshake = function() {
        this.send({
          a: ACTIONS.handshake,
          id: this.id,
          protocol: protocol.major,
          protocolMinor: protocol.minor
        });
      };
      Connection.prototype._handleHandshake = function(error, message) {
        if (error) return this.emit("error", error);
        this._initialize(message);
      };
      Connection.prototype._handlePingPong = function(error) {
        if (error) return this.emit("error", error);
        this.emit("pong");
      };
      Connection.prototype._initialize = function(message) {
        if (this.state !== "connecting") return;
        if (message.protocol !== protocol.major) {
          return this.emit("error", new ShareDBError(
            ERROR_CODE.ERR_PROTOCOL_VERSION_NOT_SUPPORTED,
            "Unsupported protocol version: " + message.protocol
          ));
        }
        if (types.map[message.type] !== types.defaultType) {
          return this.emit("error", new ShareDBError(
            ERROR_CODE.ERR_DEFAULT_TYPE_MISMATCH,
            message.type + " does not match the server default type"
          ));
        }
        if (typeof message.id !== "string") {
          return this.emit("error", new ShareDBError(
            ERROR_CODE.ERR_CLIENT_ID_BADLY_FORMED,
            "Client id must be a string"
          ));
        }
        this.id = message.id;
        this._setState("connected");
      };
      Connection.prototype.getPresence = function(channel) {
        var connection = this;
        var presence = util.digOrCreate(this._presences, channel, function() {
          return new Presence(connection, channel);
        });
        presence._wantsDestroy = false;
        return presence;
      };
      Connection.prototype.getDocPresence = function(collection, id) {
        var channel = DocPresence.channel(collection, id);
        var connection = this;
        var presence = util.digOrCreate(this._presences, channel, function() {
          return new DocPresence(connection, collection, id);
        });
        presence._wantsDestroy = false;
        return presence;
      };
      Connection.prototype._sendPresenceAction = function(action, seq, presence) {
        this._addPresence(presence);
        var message = { a: action, ch: presence.channel, seq };
        this.send(message);
        return message.seq;
      };
      Connection.prototype._addPresence = function(presence) {
        util.digOrCreate(this._presences, presence.channel, function() {
          return presence;
        });
      };
      Connection.prototype._requestRemotePresence = function(channel) {
        this.send({ a: ACTIONS.presenceRequest, ch: channel });
      };
      Connection.prototype._handlePresenceSubscribe = function(error, message) {
        var presence = util.dig(this._presences, message.ch);
        if (presence) presence._handleSubscribe(error, message.seq);
      };
      Connection.prototype._handlePresenceUnsubscribe = function(error, message) {
        var presence = util.dig(this._presences, message.ch);
        if (presence) presence._handleUnsubscribe(error, message.seq);
      };
      Connection.prototype._handlePresence = function(error, message) {
        var presence = util.dig(this._presences, message.ch);
        if (presence) presence._receiveUpdate(error, message);
      };
      Connection.prototype._handlePresenceRequest = function(error, message) {
        var presence = util.dig(this._presences, message.ch);
        if (presence) presence._broadcastAllLocalPresence(error, message);
      };
    }, { "../emitter": 41, "../error": 42, "../logger": 43, "../message-actions": 45, "../protocol": 48, "../types": 50, "../util": 51, "./doc": 28, "./presence/doc-presence": 31, "./presence/doc-presence-emitter": 30, "./presence/presence": 34, "./query": 37, "./snapshot-request/snapshot-timestamp-request": 39, "./snapshot-request/snapshot-version-request": 40 }], 28: [function(require2, module2, exports2) {
      var emitter = require2("../emitter");
      var logger = require2("../logger");
      var ShareDBError = require2("../error");
      var types = require2("../types");
      var util = require2("../util");
      var clone = util.clone;
      var deepEqual = require2("fast-deep-equal");
      var ACTIONS = require2("../message-actions").ACTIONS;
      var ERROR_CODE = ShareDBError.CODES;
      module2.exports = Doc;
      function Doc(connection, collection, id) {
        emitter.EventEmitter.call(this);
        this.connection = connection;
        this.collection = collection;
        this.id = id;
        this.version = null;
        this.type = null;
        this.data = void 0;
        this.inflightFetch = [];
        this.inflightSubscribe = null;
        this.pendingFetch = [];
        this.pendingSubscribe = [];
        this._isInHardRollback = false;
        this.subscribed = false;
        this.wantSubscribe = false;
        this._wantsDestroy = false;
        this.inflightOp = null;
        this.pendingOps = [];
        this.applyStack = null;
        this.preventCompose = false;
        this.submitSource = false;
        this.paused = false;
        this._dataStateVersion = 0;
      }
      emitter.mixin(Doc);
      Doc.prototype.destroy = function(callback) {
        this._wantsDestroy = true;
        var doc = this;
        doc.whenNothingPending(function() {
          if (doc.wantSubscribe) {
            doc.unsubscribe(function(err) {
              if (err) {
                if (callback) return callback(err);
                return doc.emit("error", err);
              }
              doc.connection._destroyDoc(doc);
              if (callback) callback();
            });
          } else {
            doc.connection._destroyDoc(doc);
            if (callback) callback();
          }
        });
      };
      Doc.prototype._setType = function(newType) {
        if (typeof newType === "string") {
          newType = types.map[newType];
        }
        if (newType) {
          this.type = newType;
        } else if (newType === null) {
          this.type = newType;
          this._setData(void 0);
        } else {
          var err = new ShareDBError(ERROR_CODE.ERR_DOC_TYPE_NOT_RECOGNIZED, "Missing type " + newType);
          return this.emit("error", err);
        }
      };
      Doc.prototype._setData = function(data) {
        this.data = data;
        this._dataStateVersion++;
      };
      Doc.prototype.ingestSnapshot = function(snapshot, callback) {
        if (!snapshot) return callback && callback();
        if (typeof snapshot.v !== "number") {
          var err = new ShareDBError(
            ERROR_CODE.ERR_INGESTED_SNAPSHOT_HAS_NO_VERSION,
            "Missing version in ingested snapshot. " + this.collection + "." + this.id
          );
          if (callback) return callback(err);
          return this.emit("error", err);
        }
        if (this.type || this.hasWritePending()) {
          if (this.version == null) {
            if (this.hasWritePending()) {
              return callback && this.once("no write pending", callback);
            }
            var err = new ShareDBError(
              ERROR_CODE.ERR_DOC_MISSING_VERSION,
              "Cannot ingest snapshot in doc with null version. " + this.collection + "." + this.id
            );
            if (callback) return callback(err);
            return this.emit("error", err);
          }
          if (snapshot.v > this.version) return this.fetch(callback);
          return callback && callback();
        }
        if (this.version > snapshot.v) return callback && callback();
        this.version = snapshot.v;
        var type = snapshot.type === void 0 ? types.defaultType : snapshot.type;
        this._setType(type);
        this._setData(
          this.type && this.type.deserialize ? this.type.deserialize(snapshot.data) : snapshot.data
        );
        this.emit("load");
        callback && callback();
      };
      Doc.prototype.whenNothingPending = function(callback) {
        var doc = this;
        util.nextTick(function() {
          if (doc.hasPending()) {
            doc.once("nothing pending", callback);
            return;
          }
          callback();
        });
      };
      Doc.prototype.hasPending = function() {
        return !!(this.inflightOp || this.pendingOps.length || this.inflightFetch.length || this.inflightSubscribe || this.pendingFetch.length || this.pendingSubscribe.length);
      };
      Doc.prototype.hasWritePending = function() {
        return !!(this.inflightOp || this.pendingOps.length);
      };
      Doc.prototype._emitNothingPending = function() {
        if (this.hasWritePending()) return;
        this.emit("no write pending");
        if (this.hasPending()) return;
        this.emit("nothing pending");
      };
      Doc.prototype._emitResponseError = function(err, callback) {
        if (err && err.code === ERROR_CODE.ERR_SNAPSHOT_READ_SILENT_REJECTION) {
          this.wantSubscribe = false;
          if (callback) {
            callback();
          }
          this._emitNothingPending();
          return;
        }
        if (callback) {
          callback(err);
          this._emitNothingPending();
          return;
        }
        this._emitNothingPending();
        this.emit("error", err);
      };
      Doc.prototype._handleFetch = function(error, snapshot) {
        var callbacks = this.pendingFetch;
        this.pendingFetch = [];
        var callback = this.inflightFetch.shift();
        if (callback) callbacks.unshift(callback);
        if (callbacks.length) {
          callback = function(error2) {
            util.callEach(callbacks, error2);
          };
        }
        if (error) return this._emitResponseError(error, callback);
        this.ingestSnapshot(snapshot, callback);
        this._emitNothingPending();
      };
      Doc.prototype._handleSubscribe = function(error, snapshot) {
        var request = this.inflightSubscribe;
        this.inflightSubscribe = null;
        var callbacks = this.pendingFetch;
        this.pendingFetch = [];
        if (request.callback) callbacks.push(request.callback);
        var callback;
        if (callbacks.length) {
          callback = function(error2) {
            util.callEach(callbacks, error2);
          };
        }
        if (error) return this._emitResponseError(error, callback);
        this.subscribed = request.wantSubscribe;
        if (this.subscribed) this.ingestSnapshot(snapshot, callback);
        else if (callback) callback();
        this._emitNothingPending();
        this._flushSubscribe();
      };
      Doc.prototype._handleOp = function(err, message) {
        if (err) {
          if (err.code === ERROR_CODE.ERR_NO_OP && message.seq === this.inflightOp.seq) {
            return this.fetch(this._clearInflightOp.bind(this));
          }
          if (this.inflightOp) {
            return this._rollback(err);
          }
          return this.emit("error", err);
        }
        if (this.inflightOp && message.src === this.inflightOp.src && message.seq === this.inflightOp.seq) {
          this._opAcknowledged(message);
          return;
        }
        if (this.version == null || message.v > this.version) {
          this.fetch();
          return;
        }
        if (message.v < this.version) {
          return;
        }
        if (this.inflightOp) {
          var transformErr = transformX(this.inflightOp, message);
          if (transformErr) return this._hardRollback(transformErr);
        }
        for (var i = 0; i < this.pendingOps.length; i++) {
          var transformErr = transformX(this.pendingOps[i], message);
          if (transformErr) return this._hardRollback(transformErr);
        }
        this.version++;
        try {
          this._otApply(message, false);
        } catch (error) {
          return this._hardRollback(error);
        }
      };
      Doc.prototype._onConnectionStateChanged = function() {
        if (this.connection.canSend) {
          this.flush();
          this._resubscribe();
        } else {
          if (this.inflightOp) {
            this.pendingOps.unshift(this.inflightOp);
            this.inflightOp = null;
          }
          this.subscribed = false;
          if (this.inflightSubscribe) {
            if (this.inflightSubscribe.wantSubscribe) {
              this.pendingSubscribe.unshift(this.inflightSubscribe);
              this.inflightSubscribe = null;
            } else {
              this._handleSubscribe();
            }
          }
          if (this.inflightFetch.length) {
            this.pendingFetch = this.pendingFetch.concat(this.inflightFetch);
            this.inflightFetch.length = 0;
          }
        }
      };
      Doc.prototype._resubscribe = function() {
        if (!this.pendingSubscribe.length && this.wantSubscribe) {
          return this.subscribe();
        }
        var willFetch = this.pendingSubscribe.some(function(request) {
          return request.wantSubscribe;
        });
        if (!willFetch && this.pendingFetch.length) this.fetch();
        this._flushSubscribe();
      };
      Doc.prototype.fetch = function(callback) {
        this._fetch({}, callback);
      };
      Doc.prototype._fetch = function(options, callback) {
        this.pendingFetch.push(callback);
        var shouldSend = this.connection.canSend && (options.force || !this.inflightFetch.length);
        if (!shouldSend) return;
        this.inflightFetch.push(this.pendingFetch.shift());
        this.connection.sendFetch(this);
      };
      Doc.prototype.subscribe = function(callback) {
        var wantSubscribe = true;
        this._queueSubscribe(wantSubscribe, callback);
      };
      Doc.prototype.unsubscribe = function(callback) {
        var wantSubscribe = false;
        this._queueSubscribe(wantSubscribe, callback);
      };
      Doc.prototype._queueSubscribe = function(wantSubscribe, callback) {
        var lastRequest = this.pendingSubscribe[this.pendingSubscribe.length - 1] || this.inflightSubscribe;
        var isDuplicateRequest = lastRequest && lastRequest.wantSubscribe === wantSubscribe;
        if (isDuplicateRequest) {
          lastRequest.callback = combineCallbacks([lastRequest.callback, callback]);
          return;
        }
        this.pendingSubscribe.push({
          wantSubscribe: !!wantSubscribe,
          callback
        });
        this._flushSubscribe();
      };
      Doc.prototype._flushSubscribe = function() {
        if (this.inflightSubscribe || !this.pendingSubscribe.length) return;
        if (this.connection.canSend) {
          this.inflightSubscribe = this.pendingSubscribe.shift();
          this.wantSubscribe = this.inflightSubscribe.wantSubscribe;
          if (this.wantSubscribe) {
            this.connection.sendSubscribe(this);
          } else {
            this.subscribed = false;
            this.connection.sendUnsubscribe(this);
          }
          return;
        }
        if (!this.pendingSubscribe[0].wantSubscribe) {
          this.inflightSubscribe = this.pendingSubscribe.shift();
          var doc = this;
          util.nextTick(function() {
            doc._handleSubscribe();
          });
        }
      };
      function combineCallbacks(callbacks) {
        callbacks = callbacks.filter(util.truthy);
        if (!callbacks.length) return null;
        return function(error) {
          util.callEach(callbacks, error);
        };
      }
      Doc.prototype.flush = function() {
        if (!this.connection.canSend || this.inflightOp) return;
        if (!this.paused && this.pendingOps.length) {
          this._sendOp();
        }
      };
      function setNoOp(op) {
        delete op.op;
        delete op.create;
        delete op.del;
      }
      function transformX(client, server) {
        if (client.del) return setNoOp(server);
        if (server.del) {
          return new ShareDBError(ERROR_CODE.ERR_DOC_WAS_DELETED, "Document was deleted");
        }
        if (server.create) {
          return new ShareDBError(ERROR_CODE.ERR_DOC_ALREADY_CREATED, "Document already created");
        }
        if (!("op" in server)) return;
        if (client.create) {
          return new ShareDBError(ERROR_CODE.ERR_DOC_ALREADY_CREATED, "Document already created");
        }
        if (client.type.transformX) {
          var result = client.type.transformX(client.op, server.op);
          client.op = result[0];
          server.op = result[1];
        } else {
          var clientOp = client.type.transform(client.op, server.op, "left");
          var serverOp = client.type.transform(server.op, client.op, "right");
          client.op = clientOp;
          server.op = serverOp;
        }
      }
      Doc.prototype._otApply = function(op, source) {
        if ("op" in op) {
          if (!this.type) {
            throw new ShareDBError(
              ERROR_CODE.ERR_DOC_DOES_NOT_EXIST,
              "Cannot apply op to uncreated document. " + this.collection + "." + this.id
            );
          }
          this.emit("before op batch", op.op, source);
          if (!source && this.type === types.defaultType && op.op.length > 1) {
            if (!this.applyStack) this.applyStack = [];
            var stackLength = this.applyStack.length;
            for (var i = 0; i < op.op.length; i++) {
              var component = op.op[i];
              var componentOp = { op: [component] };
              this.emit("before op", componentOp.op, source, op.src);
              for (var j = stackLength; j < this.applyStack.length; j++) {
                var transformErr = transformX(this.applyStack[j], componentOp);
                if (transformErr) return this._hardRollback(transformErr);
              }
              this._setData(this.type.apply(this.data, componentOp.op));
              this.emit("op", componentOp.op, source, op.src);
            }
            this.emit("op batch", op.op, source);
            this._popApplyStack(stackLength);
            return;
          }
          this.emit("before op", op.op, source, op.src);
          this._setData(this.type.apply(this.data, op.op));
          this.emit("op", op.op, source, op.src);
          this.emit("op batch", op.op, source);
          return;
        }
        if (op.create) {
          this._setType(op.create.type);
          if (this.type.deserialize) {
            if (this.type.createDeserialized) {
              this._setData(this.type.createDeserialized(op.create.data));
            } else {
              this._setData(this.type.deserialize(this.type.create(op.create.data)));
            }
          } else {
            this._setData(this.type.create(op.create.data));
          }
          this.emit("create", source);
          return;
        }
        if (op.del) {
          var oldData = this.data;
          this._setType(null);
          this.emit("del", oldData, source);
          return;
        }
      };
      Doc.prototype._sendOp = function() {
        if (!this.connection.canSend) return;
        var src = this.connection.id;
        if (!this.inflightOp) {
          this.inflightOp = this.pendingOps.shift();
        }
        var op = this.inflightOp;
        if (!op) {
          var err = new ShareDBError(ERROR_CODE.ERR_INFLIGHT_OP_MISSING, "No op to send on call to _sendOp");
          return this.emit("error", err);
        }
        op.sentAt = Date.now();
        op.retries = op.retries == null ? 0 : op.retries + 1;
        if (op.seq == null) {
          if (this.connection.seq >= util.MAX_SAFE_INTEGER) {
            return this.emit("error", new ShareDBError(
              ERROR_CODE.ERR_CONNECTION_SEQ_INTEGER_OVERFLOW,
              "Connection seq has exceeded the max safe integer, maybe from being open for too long"
            ));
          }
          op.seq = this.connection.seq++;
        }
        this.connection.sendOp(this, op);
        if (op.src == null) op.src = src;
      };
      Doc.prototype._submit = function(op, source, callback) {
        if (!source) source = true;
        if ("op" in op) {
          if (!this.type) {
            if (this._isInHardRollback) {
              var err = new ShareDBError(
                ERROR_CODE.ERR_DOC_IN_HARD_ROLLBACK,
                "Cannot submit op. Document is performing hard rollback. " + this.collection + "." + this.id
              );
            } else {
              var err = new ShareDBError(
                ERROR_CODE.ERR_DOC_DOES_NOT_EXIST,
                "Cannot submit op. Document has not been created. " + this.collection + "." + this.id
              );
            }
            if (callback) return callback(err);
            return this.emit("error", err);
          }
          if (this.type.normalize) op.op = this.type.normalize(op.op);
        }
        try {
          this._pushOp(op, source, callback);
          this._otApply(op, source);
        } catch (error) {
          return this._hardRollback(error);
        }
        var doc = this;
        util.nextTick(function() {
          doc.flush();
        });
      };
      Doc.prototype._pushOp = function(op, source, callback) {
        op.source = source;
        if (this.applyStack) {
          this.applyStack.push(op);
        } else {
          var composed = this._tryCompose(op);
          if (composed) {
            composed.callbacks.push(callback);
            return;
          }
        }
        op.type = this.type;
        op.callbacks = [callback];
        this.pendingOps.push(op);
      };
      Doc.prototype._popApplyStack = function(to) {
        if (to > 0) {
          this.applyStack.length = to;
          return;
        }
        var op = this.applyStack[0];
        this.applyStack = null;
        if (!op) return;
        var i = this.pendingOps.indexOf(op);
        if (i === -1) return;
        var ops = this.pendingOps.splice(i);
        for (var i = 0; i < ops.length; i++) {
          var op = ops[i];
          var composed = this._tryCompose(op);
          if (composed) {
            composed.callbacks = composed.callbacks.concat(op.callbacks);
          } else {
            this.pendingOps.push(op);
          }
        }
      };
      Doc.prototype._tryCompose = function(op) {
        if (this.preventCompose) return;
        var last = this.pendingOps[this.pendingOps.length - 1];
        if (!last || last.sentAt) return;
        if (this.submitSource && !deepEqual(op.source, last.source)) return;
        if (last.create && "op" in op) {
          last.create.data = this.type.apply(last.create.data, op.op);
          return last;
        }
        if ("op" in last && "op" in op && this.type.compose) {
          last.op = this.type.compose(last.op, op.op);
          return last;
        }
      };
      Doc.prototype.submitOp = function(component, options, callback) {
        if (typeof options === "function") {
          callback = options;
          options = null;
        }
        var op = { op: component };
        var source = options && options.source;
        this._submit(op, source, callback);
      };
      Doc.prototype.create = function(data, type, options, callback) {
        if (typeof type === "function") {
          callback = type;
          options = null;
          type = null;
        } else if (typeof options === "function") {
          callback = options;
          options = null;
        }
        if (!type) {
          type = types.defaultType.uri;
        }
        if (this.type) {
          var err = new ShareDBError(ERROR_CODE.ERR_DOC_ALREADY_CREATED, "Document already exists");
          if (callback) return callback(err);
          return this.emit("error", err);
        }
        var op = { create: { type, data } };
        var source = options && options.source;
        this._submit(op, source, callback);
      };
      Doc.prototype.del = function(options, callback) {
        if (typeof options === "function") {
          callback = options;
          options = null;
        }
        if (!this.type) {
          var err = new ShareDBError(ERROR_CODE.ERR_DOC_DOES_NOT_EXIST, "Document does not exist");
          if (callback) return callback(err);
          return this.emit("error", err);
        }
        var op = { del: true };
        var source = options && options.source;
        this._submit(op, source, callback);
      };
      Doc.prototype.pause = function() {
        this.paused = true;
      };
      Doc.prototype.resume = function() {
        this.paused = false;
        this.flush();
      };
      Doc.prototype.toSnapshot = function() {
        return {
          v: this.version,
          data: clone(this.data),
          type: this.type.uri
        };
      };
      Doc.prototype._opAcknowledged = function(message) {
        if (this.inflightOp.create) {
          this.version = message.v;
        } else if (message.v !== this.version) {
          logger.warn("Invalid version from server. Expected: " + this.version + " Received: " + message.v, message);
          return this.fetch();
        }
        if (message[ACTIONS.fixup]) {
          for (var i = 0; i < message[ACTIONS.fixup].length; i++) {
            var fixupOp = message[ACTIONS.fixup][i];
            for (var j = 0; j < this.pendingOps.length; j++) {
              var transformErr = transformX(this.pendingOps[i], fixupOp);
              if (transformErr) return this._hardRollback(transformErr);
            }
            try {
              this._otApply(fixupOp, false);
            } catch (error) {
              return this._hardRollback(error);
            }
          }
        }
        this.version++;
        this._clearInflightOp();
      };
      Doc.prototype._rollback = function(err) {
        var op = this.inflightOp;
        if (!("op" in op && op.type.invert)) {
          return this._hardRollback(err);
        }
        try {
          op.op = op.type.invert(op.op);
        } catch (error) {
          return this._hardRollback(err);
        }
        for (var i = 0; i < this.pendingOps.length; i++) {
          var transformErr = transformX(this.pendingOps[i], op);
          if (transformErr) return this._hardRollback(transformErr);
        }
        try {
          this._otApply(op, false);
        } catch (error) {
          return this._hardRollback(error);
        }
        if (err.code === ERROR_CODE.ERR_OP_SUBMIT_REJECTED) {
          return this._clearInflightOp(null);
        }
        this._clearInflightOp(err);
      };
      Doc.prototype._hardRollback = function(err) {
        this._isInHardRollback = true;
        var pendingOps = this.pendingOps;
        var inflightOp = this.inflightOp;
        this._setType(null);
        this.version = null;
        this.inflightOp = null;
        this.pendingOps = [];
        var doc = this;
        this._fetch({ force: true }, function(fetchError) {
          doc._isInHardRollback = false;
          if (fetchError) {
            logger.error("Hard rollback doc fetch failed.", fetchError, inflightOp);
            doc.emit("error", new ShareDBError(
              ERROR_CODE.ERR_HARD_ROLLBACK_FETCH_FAILED,
              "Hard rollback fetch failed: " + fetchError.message
            ));
          }
          if (err.code === ERROR_CODE.ERR_OP_SUBMIT_REJECTED) {
            if (inflightOp) {
              util.callEach(inflightOp.callbacks);
              inflightOp = null;
            }
            if (!pendingOps.length) return;
            err = new ShareDBError(
              ERROR_CODE.ERR_PENDING_OP_REMOVED_BY_OP_SUBMIT_REJECTED,
              "Discarding pending op because of hard rollback during ERR_OP_SUBMIT_REJECTED"
            );
          }
          if (inflightOp) pendingOps.unshift(inflightOp);
          var allOpsHadCallbacks = !!pendingOps.length;
          for (var i = 0; i < pendingOps.length; i++) {
            allOpsHadCallbacks = util.callEach(pendingOps[i].callbacks, err) && allOpsHadCallbacks;
          }
          if (err && !allOpsHadCallbacks) doc.emit("error", err);
        });
      };
      Doc.prototype._clearInflightOp = function(err) {
        var inflightOp = this.inflightOp;
        this.inflightOp = null;
        var called = util.callEach(inflightOp.callbacks, err);
        this.flush();
        this._emitNothingPending();
        if (err && !called) return this.emit("error", err);
      };
    }, { "../emitter": 41, "../error": 42, "../logger": 43, "../message-actions": 45, "../types": 50, "../util": 51, "fast-deep-equal": 6 }], 29: [function(require2, module2, exports2) {
      exports2.Connection = require2("./connection");
      exports2.Doc = require2("./doc");
      exports2.Error = require2("../error");
      exports2.Query = require2("./query");
      exports2.types = require2("../types");
      exports2.logger = require2("../logger");
    }, { "../error": 42, "../logger": 43, "../types": 50, "./connection": 27, "./doc": 28, "./query": 37 }], 30: [function(require2, module2, exports2) {
      var util = require2("../../util");
      var EventEmitter = require2("events").EventEmitter;
      var EVENTS = [
        "create",
        "del",
        "destroy",
        "load",
        "op"
      ];
      module2.exports = DocPresenceEmitter;
      function DocPresenceEmitter() {
        this._docs = /* @__PURE__ */ Object.create(null);
        this._forwarders = /* @__PURE__ */ Object.create(null);
        this._emitters = /* @__PURE__ */ Object.create(null);
      }
      DocPresenceEmitter.prototype.addEventListener = function(doc, event, listener) {
        this._registerDoc(doc);
        var emitter = util.dig(this._emitters, doc.collection, doc.id);
        emitter.on(event, listener);
      };
      DocPresenceEmitter.prototype.removeEventListener = function(doc, event, listener) {
        var emitter = util.dig(this._emitters, doc.collection, doc.id);
        if (!emitter) return;
        emitter.off(event, listener);
        if (emitter._eventsCount === 1) this._unregisterDoc(doc);
      };
      DocPresenceEmitter.prototype._registerDoc = function(doc) {
        var alreadyRegistered = true;
        util.digOrCreate(this._docs, doc.collection, doc.id, function() {
          alreadyRegistered = false;
          return doc;
        });
        if (alreadyRegistered) return;
        var emitter = util.digOrCreate(this._emitters, doc.collection, doc.id, function() {
          var e = new EventEmitter();
          e.setMaxListeners(1e3);
          return e;
        });
        var self2 = this;
        EVENTS.forEach(function(event) {
          var forwarder = util.digOrCreate(self2._forwarders, doc.collection, doc.id, event, function() {
            return emitter.emit.bind(emitter, event);
          });
          doc.on(event, forwarder);
        });
        this.addEventListener(doc, "destroy", this._unregisterDoc.bind(this, doc));
      };
      DocPresenceEmitter.prototype._unregisterDoc = function(doc) {
        var forwarders = util.dig(this._forwarders, doc.collection, doc.id);
        for (var event in forwarders) {
          doc.off(event, forwarders[event]);
        }
        var emitter = util.dig(this._emitters, doc.collection, doc.id);
        emitter.removeAllListeners();
        util.digAndRemove(this._forwarders, doc.collection, doc.id);
        util.digAndRemove(this._emitters, doc.collection, doc.id);
        util.digAndRemove(this._docs, doc.collection, doc.id);
      };
    }, { "../../util": 51, "events": 5 }], 31: [function(require2, module2, exports2) {
      var Presence = require2("./presence");
      var LocalDocPresence = require2("./local-doc-presence");
      var RemoteDocPresence = require2("./remote-doc-presence");
      function DocPresence(connection, collection, id) {
        var channel = DocPresence.channel(collection, id);
        Presence.call(this, connection, channel);
        this.collection = collection;
        this.id = id;
      }
      module2.exports = DocPresence;
      DocPresence.prototype = Object.create(Presence.prototype);
      DocPresence.channel = function(collection, id) {
        return collection + "." + id;
      };
      DocPresence.prototype._createLocalPresence = function(id) {
        return new LocalDocPresence(this, id);
      };
      DocPresence.prototype._createRemotePresence = function(id) {
        return new RemoteDocPresence(this, id);
      };
    }, { "./local-doc-presence": 32, "./presence": 34, "./remote-doc-presence": 35 }], 32: [function(require2, module2, exports2) {
      var LocalPresence = require2("./local-presence");
      var ShareDBError = require2("../../error");
      var util = require2("../../util");
      var ERROR_CODE = ShareDBError.CODES;
      module2.exports = LocalDocPresence;
      function LocalDocPresence(presence, presenceId) {
        LocalPresence.call(this, presence, presenceId);
        this.collection = this.presence.collection;
        this.id = this.presence.id;
        this._doc = this.connection.get(this.collection, this.id);
        this._emitter = this.connection._docPresenceEmitter;
        this._isSending = false;
        this._docDataVersionByPresenceVersion = /* @__PURE__ */ Object.create(null);
        this._opHandler = this._transformAgainstOp.bind(this);
        this._createOrDelHandler = this._handleCreateOrDel.bind(this);
        this._loadHandler = this._handleLoad.bind(this);
        this._destroyHandler = this.destroy.bind(this);
        this._registerWithDoc();
      }
      LocalDocPresence.prototype = Object.create(LocalPresence.prototype);
      LocalDocPresence.prototype.submit = function(value, callback) {
        if (!this._doc.type) {
          if (value === null) return this._callbackOrEmit(null, callback);
          var error = null;
          if (this._doc._isInHardRollback) {
            error = {
              code: ERROR_CODE.ERR_DOC_IN_HARD_ROLLBACK,
              message: "Cannot submit presence. Document is processing hard rollback"
            };
          } else {
            error = {
              code: ERROR_CODE.ERR_DOC_DOES_NOT_EXIST,
              message: "Cannot submit presence. Document has not been created"
            };
          }
          return this._callbackOrEmit(error, callback);
        }
        this._docDataVersionByPresenceVersion[this.presenceVersion] = this._doc._dataStateVersion;
        LocalPresence.prototype.submit.call(this, value, callback);
      };
      LocalDocPresence.prototype.destroy = function(callback) {
        this._emitter.removeEventListener(this._doc, "op", this._opHandler);
        this._emitter.removeEventListener(this._doc, "create", this._createOrDelHandler);
        this._emitter.removeEventListener(this._doc, "del", this._createOrDelHandler);
        this._emitter.removeEventListener(this._doc, "load", this._loadHandler);
        this._emitter.removeEventListener(this._doc, "destroy", this._destroyHandler);
        LocalPresence.prototype.destroy.call(this, callback);
      };
      LocalDocPresence.prototype._sendPending = function() {
        if (this._isSending) return;
        this._isSending = true;
        var presence = this;
        this._doc.whenNothingPending(function() {
          presence._isSending = false;
          if (!presence.connection.canSend) return;
          presence._pendingMessages.forEach(function(message) {
            message.t = presence._doc.type.uri;
            message.v = presence._doc.version;
            presence.connection.send(message);
          });
          presence._pendingMessages = [];
          presence._docDataVersionByPresenceVersion = /* @__PURE__ */ Object.create(null);
        });
      };
      LocalDocPresence.prototype._registerWithDoc = function() {
        this._emitter.addEventListener(this._doc, "op", this._opHandler);
        this._emitter.addEventListener(this._doc, "create", this._createOrDelHandler);
        this._emitter.addEventListener(this._doc, "del", this._createOrDelHandler);
        this._emitter.addEventListener(this._doc, "load", this._loadHandler);
        this._emitter.addEventListener(this._doc, "destroy", this._destroyHandler);
      };
      LocalDocPresence.prototype._transformAgainstOp = function(op, source) {
        var presence = this;
        var docDataVersion = this._doc._dataStateVersion;
        this._pendingMessages.forEach(function(message) {
          var messageDocDataVersion = presence._docDataVersionByPresenceVersion[message.pv];
          if (messageDocDataVersion >= docDataVersion) return;
          try {
            message.p = presence._transformPresence(message.p, op, source);
            presence._docDataVersionByPresenceVersion[message.pv] = docDataVersion;
          } catch (error) {
            var callback = presence._getCallback(message.pv);
            presence._callbackOrEmit(error, callback);
          }
        });
        try {
          this.value = this._transformPresence(this.value, op, source);
        } catch (error) {
          this.emit("error", error);
        }
      };
      LocalDocPresence.prototype._handleCreateOrDel = function() {
        this._pendingMessages.forEach(function(message) {
          message.p = null;
        });
        this.value = null;
      };
      LocalDocPresence.prototype._handleLoad = function() {
        this.value = null;
        this._pendingMessages = [];
        this._docDataVersionByPresenceVersion = /* @__PURE__ */ Object.create(null);
      };
      LocalDocPresence.prototype._message = function() {
        var message = LocalPresence.prototype._message.call(this);
        message.c = this.collection, message.d = this.id, message.v = null;
        message.t = null;
        return message;
      };
      LocalDocPresence.prototype._transformPresence = function(value, op, source) {
        var type = this._doc.type;
        if (!util.supportsPresence(type)) {
          throw new ShareDBError(
            ERROR_CODE.ERR_TYPE_DOES_NOT_SUPPORT_PRESENCE,
            "Type does not support presence: " + type.name
          );
        }
        return type.transformPresence(value, op, source);
      };
    }, { "../../error": 42, "../../util": 51, "./local-presence": 33 }], 33: [function(require2, module2, exports2) {
      var emitter = require2("../../emitter");
      var ACTIONS = require2("../../message-actions").ACTIONS;
      var util = require2("../../util");
      module2.exports = LocalPresence;
      function LocalPresence(presence, presenceId) {
        emitter.EventEmitter.call(this);
        if (!presenceId || typeof presenceId !== "string") {
          throw new Error("LocalPresence presenceId must be a string");
        }
        this.presence = presence;
        this.presenceId = presenceId;
        this.connection = presence.connection;
        this.presenceVersion = 0;
        this.value = null;
        this._pendingMessages = [];
        this._callbacksByPresenceVersion = /* @__PURE__ */ Object.create(null);
      }
      emitter.mixin(LocalPresence);
      LocalPresence.prototype.submit = function(value, callback) {
        this.value = value;
        this.send(callback);
      };
      LocalPresence.prototype.send = function(callback) {
        var message = this._message();
        this._pendingMessages.push(message);
        this._callbacksByPresenceVersion[message.pv] = callback;
        this._sendPending();
      };
      LocalPresence.prototype.destroy = function(callback) {
        var presence = this;
        this.submit(null, function(error) {
          if (error) return presence._callbackOrEmit(error, callback);
          delete presence.presence.localPresences[presence.presenceId];
          if (callback) callback();
        });
      };
      LocalPresence.prototype._sendPending = function() {
        if (!this.connection.canSend) return;
        var presence = this;
        this._pendingMessages.forEach(function(message) {
          presence.connection.send(message);
        });
        this._pendingMessages = [];
      };
      LocalPresence.prototype._ack = function(error, presenceVersion) {
        var callback = this._getCallback(presenceVersion);
        this._callbackOrEmit(error, callback);
      };
      LocalPresence.prototype._message = function() {
        return {
          a: ACTIONS.presence,
          ch: this.presence.channel,
          id: this.presenceId,
          p: this.value,
          pv: this.presenceVersion++
        };
      };
      LocalPresence.prototype._getCallback = function(presenceVersion) {
        var callback = this._callbacksByPresenceVersion[presenceVersion];
        delete this._callbacksByPresenceVersion[presenceVersion];
        return callback;
      };
      LocalPresence.prototype._callbackOrEmit = function(error, callback) {
        if (callback) return util.nextTick(callback, error);
        if (error) this.emit("error", error);
      };
    }, { "../../emitter": 41, "../../message-actions": 45, "../../util": 51 }], 34: [function(require2, module2, exports2) {
      var emitter = require2("../../emitter");
      var LocalPresence = require2("./local-presence");
      var RemotePresence = require2("./remote-presence");
      var util = require2("../../util");
      var async = require2("async");
      var hat = require2("hat");
      var ACTIONS = require2("../../message-actions").ACTIONS;
      module2.exports = Presence;
      function Presence(connection, channel) {
        emitter.EventEmitter.call(this);
        if (!channel || typeof channel !== "string") {
          throw new Error("Presence channel must be provided");
        }
        this.connection = connection;
        this.channel = channel;
        this.wantSubscribe = false;
        this.subscribed = false;
        this.remotePresences = /* @__PURE__ */ Object.create(null);
        this.localPresences = /* @__PURE__ */ Object.create(null);
        this._remotePresenceInstances = /* @__PURE__ */ Object.create(null);
        this._subscriptionCallbacksBySeq = /* @__PURE__ */ Object.create(null);
        this._wantsDestroy = false;
      }
      emitter.mixin(Presence);
      Presence.prototype.subscribe = function(callback) {
        this._sendSubscriptionAction(true, callback);
      };
      Presence.prototype.unsubscribe = function(callback) {
        this._sendSubscriptionAction(false, callback);
      };
      Presence.prototype.create = function(id) {
        if (this._wantsDestroy) {
          throw new Error("Presence is being destroyed");
        }
        id = id || hat();
        var localPresence = this._createLocalPresence(id);
        this.localPresences[id] = localPresence;
        return localPresence;
      };
      Presence.prototype.destroy = function(callback) {
        this._wantsDestroy = true;
        var presence = this;
        var localIds = Object.keys(presence.localPresences);
        this.unsubscribe(function(error) {
          if (error) return presence._callbackOrEmit(error, callback);
          var remoteIds = Object.keys(presence._remotePresenceInstances);
          async.parallel(
            [
              function(next) {
                async.each(localIds, function(presenceId, next2) {
                  var localPresence = presence.localPresences[presenceId];
                  if (!localPresence) return next2();
                  localPresence.destroy(next2);
                }, next);
              },
              function(next) {
                if (!presence._wantsDestroy) return next();
                async.each(remoteIds, function(presenceId, next2) {
                  presence._remotePresenceInstances[presenceId].destroy(next2);
                }, next);
              }
            ],
            function(error2) {
              if (presence._wantsDestroy) delete presence.connection._presences[presence.channel];
              presence._callbackOrEmit(error2, callback);
            }
          );
        });
      };
      Presence.prototype._sendSubscriptionAction = function(wantSubscribe, callback) {
        wantSubscribe = !!wantSubscribe;
        if (wantSubscribe === this.wantSubscribe) {
          if (!callback) return;
          if (wantSubscribe === this.subscribed) return util.nextTick(callback);
          if (Object.keys(this._subscriptionCallbacksBySeq).length) {
            return this._combineSubscribeCallbackWithLastAdded(callback);
          }
        }
        this.wantSubscribe = wantSubscribe;
        var action = this.wantSubscribe ? ACTIONS.presenceSubscribe : ACTIONS.presenceUnsubscribe;
        var seq = this.connection._presenceSeq++;
        this._subscriptionCallbacksBySeq[seq] = callback;
        if (this.connection.canSend) {
          this.connection._sendPresenceAction(action, seq, this);
        }
      };
      Presence.prototype._requestRemotePresence = function() {
        this.connection._requestRemotePresence(this.channel);
      };
      Presence.prototype._handleSubscribe = function(error, seq) {
        if (this.wantSubscribe) this.subscribed = true;
        var callback = this._subscriptionCallback(seq);
        this._callbackOrEmit(error, callback);
      };
      Presence.prototype._handleUnsubscribe = function(error, seq) {
        this.subscribed = false;
        var callback = this._subscriptionCallback(seq);
        this._callbackOrEmit(error, callback);
      };
      Presence.prototype._receiveUpdate = function(error, message) {
        var localPresence = util.dig(this.localPresences, message.id);
        if (localPresence) return localPresence._ack(error, message.pv);
        if (error) return this.emit("error", error);
        var presence = this;
        var remotePresence = util.digOrCreate(this._remotePresenceInstances, message.id, function() {
          return presence._createRemotePresence(message.id);
        });
        remotePresence.receiveUpdate(message);
      };
      Presence.prototype._updateRemotePresence = function(remotePresence) {
        this.remotePresences[remotePresence.presenceId] = remotePresence.value;
        if (remotePresence.value === null) this._removeRemotePresence(remotePresence.presenceId);
        this.emit("receive", remotePresence.presenceId, remotePresence.value);
      };
      Presence.prototype._broadcastAllLocalPresence = function(error) {
        if (error) return this.emit("error", error);
        for (var id in this.localPresences) {
          var localPresence = this.localPresences[id];
          if (localPresence.value !== null) localPresence.send();
        }
      };
      Presence.prototype._removeRemotePresence = function(id) {
        this._remotePresenceInstances[id].destroy();
        delete this._remotePresenceInstances[id];
        delete this.remotePresences[id];
      };
      Presence.prototype._onConnectionStateChanged = function() {
        if (!this.connection.canSend) {
          this.subscribed = false;
          return;
        }
        this._resubscribe();
        for (var id in this.localPresences) {
          this.localPresences[id]._sendPending();
        }
      };
      Presence.prototype._resubscribe = function() {
        var callbacks = [];
        for (var seq in this._subscriptionCallbacksBySeq) {
          var callback = this._subscriptionCallback(seq);
          callbacks.push(callback);
        }
        if (!this.wantSubscribe) return this._callEachOrEmit(callbacks);
        var presence = this;
        this.subscribe(function(error) {
          presence._callEachOrEmit(callbacks, error);
        });
      };
      Presence.prototype._subscriptionCallback = function(seq) {
        var callback = this._subscriptionCallbacksBySeq[seq];
        delete this._subscriptionCallbacksBySeq[seq];
        return callback;
      };
      Presence.prototype._callbackOrEmit = function(error, callback) {
        if (callback) return util.nextTick(callback, error);
        if (error) this.emit("error", error);
      };
      Presence.prototype._createLocalPresence = function(id) {
        return new LocalPresence(this, id);
      };
      Presence.prototype._createRemotePresence = function(id) {
        return new RemotePresence(this, id);
      };
      Presence.prototype._callEachOrEmit = function(callbacks, error) {
        var called = util.callEach(callbacks, error);
        if (!called && error) this.emit("error", error);
      };
      Presence.prototype._combineSubscribeCallbackWithLastAdded = function(callback) {
        var seqs = Object.keys(this._subscriptionCallbacksBySeq);
        var lastSeq = seqs[seqs.length - 1];
        var originalCallback = this._subscriptionCallbacksBySeq[lastSeq];
        if (!originalCallback) return this._subscriptionCallbacksBySeq[lastSeq] = callback;
        this._subscriptionCallbacksBySeq[lastSeq] = function(error) {
          originalCallback(error);
          callback(error);
        };
      };
    }, { "../../emitter": 41, "../../message-actions": 45, "../../util": 51, "./local-presence": 33, "./remote-presence": 36, "async": 1, "hat": 16 }], 35: [function(require2, module2, exports2) {
      var RemotePresence = require2("./remote-presence");
      var ot = require2("../../ot");
      module2.exports = RemoteDocPresence;
      function RemoteDocPresence(presence, presenceId) {
        RemotePresence.call(this, presence, presenceId);
        this.collection = this.presence.collection;
        this.id = this.presence.id;
        this.src = null;
        this.presenceVersion = null;
        this._doc = this.connection.get(this.collection, this.id);
        this._emitter = this.connection._docPresenceEmitter;
        this._pending = null;
        this._opCache = null;
        this._pendingSetPending = false;
        this._opHandler = this._handleOp.bind(this);
        this._createDelHandler = this._handleCreateDel.bind(this);
        this._loadHandler = this._handleLoad.bind(this);
        this._registerWithDoc();
      }
      RemoteDocPresence.prototype = Object.create(RemotePresence.prototype);
      RemoteDocPresence.prototype.receiveUpdate = function(message) {
        if (this._pending && message.pv < this._pending.pv) return;
        this.src = message.src;
        this._pending = message;
        this._setPendingPresence();
      };
      RemoteDocPresence.prototype.destroy = function(callback) {
        this._emitter.removeEventListener(this._doc, "op", this._opHandler);
        this._emitter.removeEventListener(this._doc, "create", this._createDelHandler);
        this._emitter.removeEventListener(this._doc, "del", this._createDelHandler);
        this._emitter.removeEventListener(this._doc, "load", this._loadHandler);
        RemotePresence.prototype.destroy.call(this, callback);
      };
      RemoteDocPresence.prototype._registerWithDoc = function() {
        this._emitter.addEventListener(this._doc, "op", this._opHandler);
        this._emitter.addEventListener(this._doc, "create", this._createDelHandler);
        this._emitter.addEventListener(this._doc, "del", this._createDelHandler);
        this._emitter.addEventListener(this._doc, "load", this._loadHandler);
      };
      RemoteDocPresence.prototype._setPendingPresence = function() {
        if (this._pendingSetPending) return;
        this._pendingSetPending = true;
        var presence = this;
        this._doc.whenNothingPending(function() {
          presence._pendingSetPending = false;
          if (!presence._pending) return;
          if (presence._pending.pv < presence.presenceVersion) return presence._pending = null;
          if (presence._pending.v > presence._doc.version) {
            return presence._doc.fetch();
          }
          if (!presence._catchUpStalePresence()) return;
          presence.value = presence._pending.p;
          presence.presenceVersion = presence._pending.pv;
          presence._pending = null;
          presence.presence._updateRemotePresence(presence);
        });
      };
      RemoteDocPresence.prototype._handleOp = function(op, source, connectionId) {
        var isOwnOp = connectionId === this.src;
        this._transformAgainstOp(op, isOwnOp);
        this._cacheOp(op, isOwnOp);
        this._setPendingPresence();
      };
      RemotePresence.prototype._handleCreateDel = function() {
        this._cacheOp(null);
        this._setPendingPresence();
      };
      RemotePresence.prototype._handleLoad = function() {
        this.value = null;
        this._pending = null;
        this._opCache = null;
        this.presence._updateRemotePresence(this);
      };
      RemoteDocPresence.prototype._transformAgainstOp = function(op, isOwnOp) {
        if (!this.value) return;
        try {
          this.value = this._doc.type.transformPresence(this.value, op, isOwnOp);
        } catch (error) {
          return this.presence.emit("error", error);
        }
        this.presence._updateRemotePresence(this);
      };
      RemoteDocPresence.prototype._catchUpStalePresence = function() {
        if (this._pending.v >= this._doc.version) return true;
        if (!this._opCache) {
          this._startCachingOps();
          this._doc.fetch();
          this.presence._requestRemotePresence();
          return false;
        }
        while (this._opCache[this._pending.v]) {
          var item = this._opCache[this._pending.v];
          var op = item.op;
          var isOwnOp = item.isOwnOp;
          if (op === null) {
            this._pending.p = null;
            this._pending.v++;
          } else {
            ot.transformPresence(this._pending, op, isOwnOp);
          }
        }
        var hasCaughtUp = this._pending.v >= this._doc.version;
        if (hasCaughtUp) {
          this._stopCachingOps();
        }
        return hasCaughtUp;
      };
      RemoteDocPresence.prototype._startCachingOps = function() {
        this._opCache = [];
      };
      RemoteDocPresence.prototype._stopCachingOps = function() {
        this._opCache = null;
      };
      RemoteDocPresence.prototype._cacheOp = function(op, isOwnOp) {
        if (this._opCache) {
          op = op ? { op } : null;
          this._opCache[this._doc.version - 1] = { op, isOwnOp };
        }
      };
    }, { "../../ot": 47, "./remote-presence": 36 }], 36: [function(require2, module2, exports2) {
      var util = require2("../../util");
      module2.exports = RemotePresence;
      function RemotePresence(presence, presenceId) {
        this.presence = presence;
        this.presenceId = presenceId;
        this.connection = this.presence.connection;
        this.value = null;
        this.presenceVersion = 0;
      }
      RemotePresence.prototype.receiveUpdate = function(message) {
        if (message.pv < this.presenceVersion) return;
        this.value = message.p;
        this.presenceVersion = message.pv;
        this.presence._updateRemotePresence(this);
      };
      RemotePresence.prototype.destroy = function(callback) {
        delete this.presence._remotePresenceInstances[this.presenceId];
        delete this.presence.remotePresences[this.presenceId];
        if (callback) util.nextTick(callback);
      };
    }, { "../../util": 51 }], 37: [function(require2, module2, exports2) {
      var emitter = require2("../emitter");
      var ACTIONS = require2("../message-actions").ACTIONS;
      var util = require2("../util");
      module2.exports = Query;
      function Query(action, connection, id, collection, query, options, callback) {
        emitter.EventEmitter.call(this);
        this.action = action;
        this.connection = connection;
        this.id = id;
        this.collection = collection;
        this.query = query;
        this.results = null;
        if (options && options.results) {
          this.results = options.results;
          delete options.results;
        }
        this.extra = void 0;
        this.options = options;
        this.callback = callback;
        this.ready = false;
        this.sent = false;
      }
      emitter.mixin(Query);
      Query.prototype.hasPending = function() {
        return !this.ready;
      };
      Query.prototype.send = function() {
        if (!this.connection.canSend) return;
        var message = {
          a: this.action,
          id: this.id,
          c: this.collection,
          q: this.query
        };
        if (this.options) {
          message.o = this.options;
        }
        if (this.results) {
          var results = [];
          for (var i = 0; i < this.results.length; i++) {
            var doc = this.results[i];
            results.push([doc.id, doc.version]);
          }
          message.r = results;
        }
        this.connection.send(message);
        this.sent = true;
      };
      Query.prototype.destroy = function(callback) {
        if (this.connection.canSend && this.action === ACTIONS.querySubscribe) {
          this.connection.send({ a: ACTIONS.queryUnsubscribe, id: this.id });
        }
        this.connection._destroyQuery(this);
        if (callback) util.nextTick(callback);
      };
      Query.prototype._onConnectionStateChanged = function() {
        if (this.connection.canSend && !this.sent) {
          this.send();
        } else {
          this.sent = false;
        }
      };
      Query.prototype._handleFetch = function(err, data, extra) {
        this.connection._destroyQuery(this);
        this._handleResponse(err, data, extra);
      };
      Query.prototype._handleSubscribe = function(err, data, extra) {
        this._handleResponse(err, data, extra);
      };
      Query.prototype._handleResponse = function(err, data, extra) {
        var callback = this.callback;
        this.callback = null;
        if (err) return this._finishResponse(err, callback);
        if (!data) return this._finishResponse(null, callback);
        var query = this;
        var wait = 1;
        var finish = function(err2) {
          if (err2) return query._finishResponse(err2, callback);
          if (--wait) return;
          query._finishResponse(null, callback);
        };
        if (Array.isArray(data)) {
          wait += data.length;
          this.results = this._ingestSnapshots(data, finish);
          this.extra = extra;
        } else {
          for (var id in data) {
            wait++;
            var snapshot = data[id];
            var doc = this.connection.get(snapshot.c || this.collection, id);
            doc.ingestSnapshot(snapshot, finish);
          }
        }
        finish();
      };
      Query.prototype._ingestSnapshots = function(snapshots, finish) {
        var results = [];
        for (var i = 0; i < snapshots.length; i++) {
          var snapshot = snapshots[i];
          var doc = this.connection.get(snapshot.c || this.collection, snapshot.d);
          doc.ingestSnapshot(snapshot, finish);
          results.push(doc);
        }
        return results;
      };
      Query.prototype._finishResponse = function(err, callback) {
        this.emit("ready");
        this.ready = true;
        if (err) {
          this.connection._destroyQuery(this);
          if (callback) return callback(err);
          return this.emit("error", err);
        }
        if (callback) callback(null, this.results, this.extra);
      };
      Query.prototype._handleError = function(err) {
        this.emit("error", err);
      };
      Query.prototype._handleDiff = function(diff) {
        for (var i = 0; i < diff.length; i++) {
          var d = diff[i];
          if (d.type === "insert") d.values = this._ingestSnapshots(d.values);
        }
        for (var i = 0; i < diff.length; i++) {
          var d = diff[i];
          switch (d.type) {
            case "insert":
              var newDocs = d.values;
              Array.prototype.splice.apply(this.results, [d.index, 0].concat(newDocs));
              this.emit("insert", newDocs, d.index);
              break;
            case "remove":
              var howMany = d.howMany || 1;
              var removed = this.results.splice(d.index, howMany);
              this.emit("remove", removed, d.index);
              break;
            case "move":
              var howMany = d.howMany || 1;
              var docs = this.results.splice(d.from, howMany);
              Array.prototype.splice.apply(this.results, [d.to, 0].concat(docs));
              this.emit("move", docs, d.from, d.to);
              break;
          }
        }
        this.emit("changed", this.results);
      };
      Query.prototype._handleExtra = function(extra) {
        this.extra = extra;
        this.emit("extra", extra);
      };
    }, { "../emitter": 41, "../message-actions": 45, "../util": 51 }], 38: [function(require2, module2, exports2) {
      var Snapshot = require2("../../snapshot");
      var emitter = require2("../../emitter");
      module2.exports = SnapshotRequest;
      function SnapshotRequest(connection, requestId, collection, id, callback) {
        emitter.EventEmitter.call(this);
        if (typeof callback !== "function") {
          throw new Error("Callback is required for SnapshotRequest");
        }
        this.requestId = requestId;
        this.connection = connection;
        this.id = id;
        this.collection = collection;
        this.callback = callback;
        this.sent = false;
      }
      emitter.mixin(SnapshotRequest);
      SnapshotRequest.prototype.send = function() {
        if (!this.connection.canSend) {
          return;
        }
        this.connection.send(this._message());
        this.sent = true;
      };
      SnapshotRequest.prototype._onConnectionStateChanged = function() {
        if (this.connection.canSend) {
          if (!this.sent) this.send();
        } else {
          this.sent = false;
        }
      };
      SnapshotRequest.prototype._handleResponse = function(error, message) {
        this.emit("ready");
        if (error) {
          return this.callback(error);
        }
        var metadata = message.meta ? message.meta : null;
        var snapshot = new Snapshot(this.id, message.v, message.type, message.data, metadata);
        this.callback(null, snapshot);
      };
    }, { "../../emitter": 41, "../../snapshot": 49 }], 39: [function(require2, module2, exports2) {
      var SnapshotRequest = require2("./snapshot-request");
      var util = require2("../../util");
      var ACTIONS = require2("../../message-actions").ACTIONS;
      module2.exports = SnapshotTimestampRequest;
      function SnapshotTimestampRequest(connection, requestId, collection, id, timestamp, callback) {
        SnapshotRequest.call(this, connection, requestId, collection, id, callback);
        if (!util.isValidTimestamp(timestamp)) {
          throw new Error("Snapshot timestamp must be a positive integer or null");
        }
        this.timestamp = timestamp;
      }
      SnapshotTimestampRequest.prototype = Object.create(SnapshotRequest.prototype);
      SnapshotTimestampRequest.prototype._message = function() {
        return {
          a: ACTIONS.snapshotFetchByTimestamp,
          id: this.requestId,
          c: this.collection,
          d: this.id,
          ts: this.timestamp
        };
      };
    }, { "../../message-actions": 45, "../../util": 51, "./snapshot-request": 38 }], 40: [function(require2, module2, exports2) {
      var SnapshotRequest = require2("./snapshot-request");
      var util = require2("../../util");
      var ACTIONS = require2("../../message-actions").ACTIONS;
      module2.exports = SnapshotVersionRequest;
      function SnapshotVersionRequest(connection, requestId, collection, id, version, callback) {
        SnapshotRequest.call(this, connection, requestId, collection, id, callback);
        if (!util.isValidVersion(version)) {
          throw new Error("Snapshot version must be a positive integer or null");
        }
        this.version = version;
      }
      SnapshotVersionRequest.prototype = Object.create(SnapshotRequest.prototype);
      SnapshotVersionRequest.prototype._message = function() {
        return {
          a: ACTIONS.snapshotFetch,
          id: this.requestId,
          c: this.collection,
          d: this.id,
          v: this.version
        };
      };
    }, { "../../message-actions": 45, "../../util": 51, "./snapshot-request": 38 }], 41: [function(require2, module2, exports2) {
      var EventEmitter = require2("events").EventEmitter;
      exports2.EventEmitter = EventEmitter;
      exports2.mixin = mixin;
      function mixin(Constructor) {
        for (var key in EventEmitter.prototype) {
          Constructor.prototype[key] = EventEmitter.prototype[key];
        }
      }
    }, { "events": 5 }], 42: [function(require2, module2, exports2) {
      function ShareDBError(code, message) {
        this.code = code;
        this.message = message || "";
        if (Error.captureStackTrace) {
          Error.captureStackTrace(this, ShareDBError);
        } else {
          this.stack = new Error().stack;
        }
      }
      ShareDBError.prototype = Object.create(Error.prototype);
      ShareDBError.prototype.constructor = ShareDBError;
      ShareDBError.prototype.name = "ShareDBError";
      ShareDBError.CODES = {
        ERR_APPLY_OP_VERSION_DOES_NOT_MATCH_SNAPSHOT: "ERR_APPLY_OP_VERSION_DOES_NOT_MATCH_SNAPSHOT",
        ERR_APPLY_SNAPSHOT_NOT_PROVIDED: "ERR_APPLY_SNAPSHOT_NOT_PROVIDED",
        ERR_FIXUP_IS_ONLY_VALID_ON_APPLY: "ERR_FIXUP_IS_ONLY_VALID_ON_APPLY",
        ERR_CANNOT_FIXUP_DELETION: "ERR_CANNOT_FIXUP_DELETION",
        ERR_CLIENT_ID_BADLY_FORMED: "ERR_CLIENT_ID_BADLY_FORMED",
        ERR_CANNOT_PING_OFFLINE: "ERR_CANNOT_PING_OFFLINE",
        ERR_CONNECTION_SEQ_INTEGER_OVERFLOW: "ERR_CONNECTION_SEQ_INTEGER_OVERFLOW",
        ERR_CONNECTION_STATE_TRANSITION_INVALID: "ERR_CONNECTION_STATE_TRANSITION_INVALID",
        ERR_DATABASE_ADAPTER_NOT_FOUND: "ERR_DATABASE_ADAPTER_NOT_FOUND",
        ERR_DATABASE_DOES_NOT_SUPPORT_SUBSCRIBE: "ERR_DATABASE_DOES_NOT_SUPPORT_SUBSCRIBE",
        ERR_DATABASE_METHOD_NOT_IMPLEMENTED: "ERR_DATABASE_METHOD_NOT_IMPLEMENTED",
        ERR_DEFAULT_TYPE_MISMATCH: "ERR_DEFAULT_TYPE_MISMATCH",
        ERR_DOC_MISSING_VERSION: "ERR_DOC_MISSING_VERSION",
        ERR_DOC_ALREADY_CREATED: "ERR_DOC_ALREADY_CREATED",
        ERR_DOC_DOES_NOT_EXIST: "ERR_DOC_DOES_NOT_EXIST",
        ERR_DOC_TYPE_NOT_RECOGNIZED: "ERR_DOC_TYPE_NOT_RECOGNIZED",
        ERR_DOC_WAS_DELETED: "ERR_DOC_WAS_DELETED",
        ERR_DOC_IN_HARD_ROLLBACK: "ERR_DOC_IN_HARD_ROLLBACK",
        ERR_INFLIGHT_OP_MISSING: "ERR_INFLIGHT_OP_MISSING",
        ERR_INGESTED_SNAPSHOT_HAS_NO_VERSION: "ERR_INGESTED_SNAPSHOT_HAS_NO_VERSION",
        ERR_MAX_SUBMIT_RETRIES_EXCEEDED: "ERR_MAX_SUBMIT_RETRIES_EXCEEDED",
        ERR_MESSAGE_BADLY_FORMED: "ERR_MESSAGE_BADLY_FORMED",
        ERR_MILESTONE_ARGUMENT_INVALID: "ERR_MILESTONE_ARGUMENT_INVALID",
        ERR_NO_OP: "ERR_NO_OP",
        ERR_OP_ALREADY_SUBMITTED: "ERR_OP_ALREADY_SUBMITTED",
        ERR_OP_NOT_ALLOWED_IN_PROJECTION: "ERR_OP_NOT_ALLOWED_IN_PROJECTION",
        ERR_OP_SUBMIT_REJECTED: "ERR_OP_SUBMIT_REJECTED",
        ERR_PENDING_OP_REMOVED_BY_OP_SUBMIT_REJECTED: "ERR_PENDING_OP_REMOVED_BY_OP_SUBMIT_REJECTED",
        ERR_HARD_ROLLBACK_FETCH_FAILED: "ERR_HARD_ROLLBACK_FETCH_FAILED",
        ERR_OP_VERSION_MISMATCH_AFTER_TRANSFORM: "ERR_OP_VERSION_MISMATCH_AFTER_TRANSFORM",
        ERR_OP_VERSION_MISMATCH_DURING_TRANSFORM: "ERR_OP_VERSION_MISMATCH_DURING_TRANSFORM",
        ERR_OP_VERSION_NEWER_THAN_CURRENT_SNAPSHOT: "ERR_OP_VERSION_NEWER_THAN_CURRENT_SNAPSHOT",
        ERR_OT_LEGACY_JSON0_OP_CANNOT_BE_NORMALIZED: "ERR_OT_LEGACY_JSON0_OP_CANNOT_BE_NORMALIZED",
        ERR_OT_OP_BADLY_FORMED: "ERR_OT_OP_BADLY_FORMED",
        ERR_OT_OP_NOT_APPLIED: "ERR_OT_OP_NOT_APPLIED",
        ERR_OT_OP_NOT_PROVIDED: "ERR_OT_OP_NOT_PROVIDED",
        ERR_PRESENCE_TRANSFORM_FAILED: "ERR_PRESENCE_TRANSFORM_FAILED",
        ERR_PROTOCOL_VERSION_NOT_SUPPORTED: "ERR_PROTOCOL_VERSION_NOT_SUPPORTED",
        ERR_QUERY_CHANNEL_MISSING: "ERR_QUERY_CHANNEL_MISSING",
        ERR_QUERY_EMITTER_LISTENER_NOT_ASSIGNED: "ERR_QUERY_EMITTER_LISTENER_NOT_ASSIGNED",
        /**
         * A special error that a "readSnapshots" middleware implementation can use to indicate that it
         * wishes for the ShareDB client to treat it as a silent rejection, not passing the error back to
         * user code.
         *
         * For subscribes, the ShareDB client will still cancel the document subscription.
         */
        ERR_SNAPSHOT_READ_SILENT_REJECTION: "ERR_SNAPSHOT_READ_SILENT_REJECTION",
        /**
         * A "readSnapshots" middleware rejected the reads of specific snapshots.
         *
         * This error code is mostly for server use and generally will not be encountered on the client.
         * Instead, each specific doc that encountered an error will receive its specific error.
         *
         * The one exception is for queries, where a "readSnapshots" rejection of specific snapshots will
         * cause the client to receive this error for the whole query, since queries don't support
         * doc-specific errors.
         */
        ERR_SNAPSHOT_READS_REJECTED: "ERR_SNAPSHOT_READS_REJECTED",
        ERR_SUBMIT_TRANSFORM_OPS_NOT_FOUND: "ERR_SUBMIT_TRANSFORM_OPS_NOT_FOUND",
        ERR_TYPE_CANNOT_BE_PROJECTED: "ERR_TYPE_CANNOT_BE_PROJECTED",
        ERR_TYPE_DOES_NOT_SUPPORT_COMPOSE: "ERR_TYPE_DOES_NOT_SUPPORT_COMPOSE",
        ERR_TYPE_DOES_NOT_SUPPORT_PRESENCE: "ERR_TYPE_DOES_NOT_SUPPORT_PRESENCE",
        ERR_UNKNOWN_ERROR: "ERR_UNKNOWN_ERROR"
      };
      module2.exports = ShareDBError;
    }, {}], 43: [function(require2, module2, exports2) {
      var Logger = require2("./logger");
      var logger = new Logger();
      module2.exports = logger;
    }, { "./logger": 44 }], 44: [function(require2, module2, exports2) {
      var SUPPORTED_METHODS = [
        "info",
        "warn",
        "error"
      ];
      function Logger() {
        var defaultMethods = /* @__PURE__ */ Object.create(null);
        SUPPORTED_METHODS.forEach(function(method) {
          defaultMethods[method] = console[method].bind(console);
        });
        this.setMethods(defaultMethods);
      }
      module2.exports = Logger;
      Logger.prototype.setMethods = function(overrides) {
        overrides = overrides || {};
        var logger = this;
        SUPPORTED_METHODS.forEach(function(method) {
          if (typeof overrides[method] === "function") {
            logger[method] = overrides[method];
          }
        });
      };
    }, {}], 45: [function(require2, module2, exports2) {
      exports2.ACTIONS = {
        initLegacy: "init",
        handshake: "hs",
        queryFetch: "qf",
        querySubscribe: "qs",
        queryUnsubscribe: "qu",
        queryUpdate: "q",
        bulkFetch: "bf",
        bulkSubscribe: "bs",
        bulkUnsubscribe: "bu",
        fetch: "f",
        fixup: "fixup",
        subscribe: "s",
        unsubscribe: "u",
        op: "op",
        snapshotFetch: "nf",
        snapshotFetchByTimestamp: "nt",
        pingPong: "pp",
        presence: "p",
        presenceSubscribe: "ps",
        presenceUnsubscribe: "pu",
        presenceRequest: "pr"
      };
    }, {}], 46: [function(require2, module2, exports2) {
      exports2.messageChannel = function() {
        var triggerCallback = createNextTickTrigger(arguments);
        var channel = new MessageChannel();
        channel.port1.onmessage = function() {
          triggerCallback();
          channel.port1.close();
        };
        channel.port2.postMessage("");
      };
      exports2.setTimeout = function() {
        var triggerCallback = createNextTickTrigger(arguments);
        setTimeout(triggerCallback);
      };
      function createNextTickTrigger(args) {
        var callback = args[0];
        var _args = [];
        for (var i = 1; i < args.length; i++) {
          _args[i - 1] = args[i];
        }
        return function triggerCallback() {
          callback.apply(null, _args);
        };
      }
    }, {}], 47: [function(require2, module2, exports2) {
      var types = require2("./types");
      var ShareDBError = require2("./error");
      var util = require2("./util");
      var ERROR_CODE = ShareDBError.CODES;
      exports2.checkOp = function(op) {
        if (op == null || typeof op !== "object") {
          return new ShareDBError(ERROR_CODE.ERR_OT_OP_BADLY_FORMED, "Op must be an object");
        }
        if (op.create != null) {
          if (typeof op.create !== "object") {
            return new ShareDBError(ERROR_CODE.ERR_OT_OP_BADLY_FORMED, "Create data must be an object");
          }
          var typeName = op.create.type;
          if (typeof typeName !== "string") {
            return new ShareDBError(ERROR_CODE.ERR_OT_OP_BADLY_FORMED, "Missing create type");
          }
          var type = types.map[typeName];
          if (type == null || typeof type !== "object") {
            return new ShareDBError(ERROR_CODE.ERR_DOC_TYPE_NOT_RECOGNIZED, "Unknown type");
          }
        } else if (op.del != null) {
          if (op.del !== true) return new ShareDBError(ERROR_CODE.ERR_OT_OP_BADLY_FORMED, "del value must be true");
        } else if (!("op" in op)) {
          return new ShareDBError(ERROR_CODE.ERR_OT_OP_BADLY_FORMED, "Missing op, create, or del");
        }
        if (op.src != null && typeof op.src !== "string") {
          return new ShareDBError(ERROR_CODE.ERR_OT_OP_BADLY_FORMED, "src must be a string");
        }
        if (op.seq != null && typeof op.seq !== "number") {
          return new ShareDBError(ERROR_CODE.ERR_OT_OP_BADLY_FORMED, "seq must be a number");
        }
        if (op.src == null && op.seq != null || op.src != null && op.seq == null) {
          return new ShareDBError(ERROR_CODE.ERR_OT_OP_BADLY_FORMED, "Both src and seq must be set together");
        }
        if (op.m != null && typeof op.m !== "object") {
          return new ShareDBError(ERROR_CODE.ERR_OT_OP_BADLY_FORMED, "op.m must be an object or null");
        }
      };
      exports2.normalizeType = function(typeName) {
        return types.map[typeName] && types.map[typeName].uri;
      };
      exports2.apply = function(snapshot, op) {
        if (typeof snapshot !== "object") {
          return new ShareDBError(ERROR_CODE.ERR_APPLY_SNAPSHOT_NOT_PROVIDED, "Missing snapshot");
        }
        if (snapshot.v != null && op.v != null && snapshot.v !== op.v) {
          return new ShareDBError(ERROR_CODE.ERR_APPLY_OP_VERSION_DOES_NOT_MATCH_SNAPSHOT, "Version mismatch");
        }
        if (op.create) {
          if (snapshot.type) return new ShareDBError(ERROR_CODE.ERR_DOC_ALREADY_CREATED, "Document already exists");
          var create = op.create;
          var type = types.map[create.type];
          if (!type) return new ShareDBError(ERROR_CODE.ERR_DOC_TYPE_NOT_RECOGNIZED, "Unknown type");
          try {
            snapshot.data = type.create(create.data);
            snapshot.type = type.uri;
            snapshot.v++;
          } catch (err2) {
            return err2;
          }
        } else if (op.del) {
          snapshot.data = void 0;
          snapshot.type = null;
          snapshot.v++;
        } else if ("op" in op) {
          var err = applyOpEdit(snapshot, op.op);
          if (err) return err;
          snapshot.v++;
        } else {
          snapshot.v++;
        }
      };
      function applyOpEdit(snapshot, edit) {
        if (!snapshot.type) return new ShareDBError(ERROR_CODE.ERR_DOC_DOES_NOT_EXIST, "Document does not exist");
        if (edit === void 0) return new ShareDBError(ERROR_CODE.ERR_OT_OP_NOT_PROVIDED, "Missing op");
        var type = types.map[snapshot.type];
        if (!type) return new ShareDBError(ERROR_CODE.ERR_DOC_TYPE_NOT_RECOGNIZED, "Unknown type");
        if (type.name === "json0" && Array.isArray(edit)) {
          for (var i = 0; i < edit.length; i++) {
            var opComponent = edit[i];
            if (Array.isArray(opComponent.p)) {
              for (var j = 0; j < opComponent.p.length; j++) {
                var pathSegment = opComponent.p[j];
                if (util.isDangerousProperty(pathSegment)) {
                  return new ShareDBError(ERROR_CODE.ERR_OT_OP_NOT_APPLIED, "Invalid path segment");
                }
              }
            }
          }
        }
        try {
          snapshot.data = type.apply(snapshot.data, edit);
        } catch (err) {
          return new ShareDBError(ERROR_CODE.ERR_OT_OP_NOT_APPLIED, err.message);
        }
      }
      exports2.transform = function(type, op, appliedOp) {
        if (op.v != null && op.v !== appliedOp.v) {
          return new ShareDBError(ERROR_CODE.ERR_OP_VERSION_MISMATCH_DURING_TRANSFORM, "Version mismatch");
        }
        if (appliedOp.del) {
          if (op.create || "op" in op) {
            return new ShareDBError(ERROR_CODE.ERR_DOC_WAS_DELETED, "Document was deleted");
          }
        } else if (appliedOp.create && ("op" in op || op.create || op.del) || "op" in appliedOp && op.create) {
          return new ShareDBError(ERROR_CODE.ERR_DOC_ALREADY_CREATED, "Document was created remotely");
        } else if ("op" in appliedOp && "op" in op) {
          if (!type) return new ShareDBError(ERROR_CODE.ERR_DOC_DOES_NOT_EXIST, "Document does not exist");
          if (typeof type === "string") {
            type = types.map[type];
            if (!type) return new ShareDBError(ERROR_CODE.ERR_DOC_TYPE_NOT_RECOGNIZED, "Unknown type");
          }
          try {
            op.op = type.transform(op.op, appliedOp.op, "left");
          } catch (err) {
            return err;
          }
        }
        if (op.v != null) op.v++;
      };
      exports2.applyOps = function(snapshot, ops, options) {
        options = options || {};
        for (var index = 0; index < ops.length; index++) {
          var op = ops[index];
          if (options._normalizeLegacyJson0Ops) {
            try {
              normalizeLegacyJson0Ops(snapshot, op);
            } catch (error2) {
              return new ShareDBError(
                ERROR_CODE.ERR_OT_LEGACY_JSON0_OP_CANNOT_BE_NORMALIZED,
                "Cannot normalize legacy json0 op"
              );
            }
          }
          snapshot.v = op.v;
          var error = exports2.apply(snapshot, op);
          if (error) return error;
        }
      };
      exports2.transformPresence = function(presence, op, isOwnOp) {
        var opError = this.checkOp(op);
        if (opError) return opError;
        var type = presence.t;
        if (typeof type === "string") {
          type = types.map[type];
        }
        if (!type) return { code: ERROR_CODE.ERR_DOC_TYPE_NOT_RECOGNIZED, message: "Unknown type" };
        if (!util.supportsPresence(type)) {
          return { code: ERROR_CODE.ERR_TYPE_DOES_NOT_SUPPORT_PRESENCE, message: "Type does not support presence" };
        }
        if (op.create || op.del) {
          presence.p = null;
          presence.v++;
          return;
        }
        try {
          presence.p = presence.p === null ? null : type.transformPresence(presence.p, op.op, isOwnOp);
        } catch (error) {
          return { code: ERROR_CODE.ERR_PRESENCE_TRANSFORM_FAILED, message: error.message || error };
        }
        presence.v++;
      };
      function normalizeLegacyJson0Ops(snapshot, json0Op) {
        if (snapshot.type !== types.defaultType.uri) return;
        var components = json0Op.op;
        if (!components) return;
        var data = snapshot.data;
        if (components.length > 1) data = util.clone(data);
        for (var i = 0; i < components.length; i++) {
          var component = components[i];
          if (typeof component.lm === "string") component.lm = +component.lm;
          var path = component.p;
          var element = data;
          for (var j = 0; j < path.length; j++) {
            var key = path[j];
            if (Object.prototype.toString.call(element) == "[object Array]") path[j] = +key;
            else if (element.constructor === Object) path[j] = key.toString();
            element = element[key];
          }
          if (i < components.length - 1) data = types.defaultType.apply(data, [component]);
        }
      }
    }, { "./error": 42, "./types": 50, "./util": 51 }], 48: [function(require2, module2, exports2) {
      module2.exports = {
        major: 1,
        minor: 2,
        checkAtLeast
      };
      function checkAtLeast(toCheck, checkAgainst) {
        toCheck = normalizedProtocol(toCheck);
        checkAgainst = normalizedProtocol(checkAgainst);
        if (toCheck.major > checkAgainst.major) return true;
        return toCheck.major === checkAgainst.major && toCheck.minor >= checkAgainst.minor;
      }
      function normalizedProtocol(protocol) {
        if (typeof protocol === "string") {
          var segments = protocol.split(".");
          protocol = {
            major: segments[0],
            minor: segments[1]
          };
        }
        return {
          major: +(protocol.protocol || protocol.major || 0),
          minor: +(protocol.protocolMinor || protocol.minor || 0)
        };
      }
    }, {}], 49: [function(require2, module2, exports2) {
      module2.exports = Snapshot;
      function Snapshot(id, version, type, data, meta) {
        this.id = id;
        this.v = version;
        this.type = type;
        this.data = data;
        this.m = meta;
      }
    }, {}], 50: [function(require2, module2, exports2) {
      exports2.defaultType = require2("ot-json0").type;
      exports2.map = /* @__PURE__ */ Object.create(null);
      exports2.register = function(type) {
        if (type.name) exports2.map[type.name] = type;
        if (type.uri) exports2.map[type.uri] = type;
      };
      exports2.register(exports2.defaultType);
    }, { "ot-json0": 23 }], 51: [function(require2, module2, exports2) {
      (function(process) {
        (function() {
          var nextTickImpl = require2("./next-tick");
          exports2.doNothing = doNothing;
          function doNothing() {
          }
          exports2.hasKeys = function(object) {
            for (var key in object) return true;
            return false;
          };
          var hasOwn;
          exports2.hasOwn = hasOwn = Object.hasOwn || function(obj, prop) {
            return Object.prototype.hasOwnProperty.call(obj, prop);
          };
          exports2.isInteger = Number.isInteger || function(value) {
            return typeof value === "number" && isFinite(value) && Math.floor(value) === value;
          };
          exports2.isValidVersion = function(version) {
            if (version === null) return true;
            return exports2.isInteger(version) && version >= 0;
          };
          exports2.isValidTimestamp = function(timestamp) {
            return exports2.isValidVersion(timestamp);
          };
          exports2.MAX_SAFE_INTEGER = 9007199254740991;
          exports2.dig = function() {
            var obj = arguments[0];
            for (var i = 1; i < arguments.length; i++) {
              var key = arguments[i];
              obj = hasOwn(obj, key) ? obj[key] : i === arguments.length - 1 ? void 0 : /* @__PURE__ */ Object.create(null);
            }
            return obj;
          };
          exports2.digOrCreate = function() {
            var obj = arguments[0];
            var createCallback = arguments[arguments.length - 1];
            for (var i = 1; i < arguments.length - 1; i++) {
              var key = arguments[i];
              obj = hasOwn(obj, key) ? obj[key] : obj[key] = i === arguments.length - 2 ? createCallback() : /* @__PURE__ */ Object.create(null);
            }
            return obj;
          };
          exports2.digAndRemove = function() {
            var obj = arguments[0];
            var objects = [obj];
            for (var i = 1; i < arguments.length - 1; i++) {
              var key = arguments[i];
              if (!hasOwn(obj, key)) break;
              obj = obj[key];
              objects.push(obj);
            }
            for (var i = objects.length - 1; i >= 0; i--) {
              var parent = objects[i];
              var key = arguments[i + 1];
              var child = parent[key];
              if (i === objects.length - 1 || !exports2.hasKeys(child)) delete parent[key];
            }
          };
          exports2.supportsPresence = function(type) {
            return type && typeof type.transformPresence === "function";
          };
          exports2.callEach = function(callbacks, error) {
            var called = false;
            callbacks.forEach(function(callback) {
              if (callback) {
                callback(error);
                called = true;
              }
            });
            return called;
          };
          exports2.truthy = function(arg) {
            return !!arg;
          };
          if (typeof process !== "undefined" && typeof process.nextTick === "function") {
            exports2.nextTick = process.nextTick;
          } else if (typeof MessageChannel !== "undefined") {
            exports2.nextTick = nextTickImpl.messageChannel;
          } else {
            exports2.nextTick = nextTickImpl.setTimeout;
          }
          exports2.clone = function(obj) {
            return obj === void 0 ? void 0 : JSON.parse(JSON.stringify(obj));
          };
          var objectProtoPropNames = /* @__PURE__ */ Object.create(null);
          Object.getOwnPropertyNames(Object.prototype).forEach(function(prop) {
            if (prop !== "__proto__") {
              objectProtoPropNames[prop] = true;
            }
          });
          exports2.isDangerousProperty = function(propName) {
            return propName === "__proto__" || objectProtoPropNames[propName];
          };
          try {
            var util = require2("util");
            if (typeof util.inherits !== "function") throw new Error("Could not find util.inherits()");
            exports2.inherits = util.inherits;
          } catch (e) {
            try {
              exports2.inherits = require2("inherits");
            } catch (e2) {
              throw new Error('If running sharedb in a browser, please install the "inherits" or "util" package');
            }
          }
        }).call(this);
      }).call(this, require2("_process"));
    }, { "./next-tick": 46, "_process": 26, "inherits": 17, "util": 55 }], 52: [function(require2, module2, exports2) {
      (function(setImmediate, clearImmediate) {
        (function() {
          var nextTick = require2("process/browser.js").nextTick;
          var apply = Function.prototype.apply;
          var slice = Array.prototype.slice;
          var immediateIds = {};
          var nextImmediateId = 0;
          exports2.setTimeout = function() {
            return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
          };
          exports2.setInterval = function() {
            return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
          };
          exports2.clearTimeout = exports2.clearInterval = function(timeout) {
            timeout.close();
          };
          function Timeout(id, clearFn) {
            this._id = id;
            this._clearFn = clearFn;
          }
          Timeout.prototype.unref = Timeout.prototype.ref = function() {
          };
          Timeout.prototype.close = function() {
            this._clearFn.call(window, this._id);
          };
          exports2.enroll = function(item, msecs) {
            clearTimeout(item._idleTimeoutId);
            item._idleTimeout = msecs;
          };
          exports2.unenroll = function(item) {
            clearTimeout(item._idleTimeoutId);
            item._idleTimeout = -1;
          };
          exports2._unrefActive = exports2.active = function(item) {
            clearTimeout(item._idleTimeoutId);
            var msecs = item._idleTimeout;
            if (msecs >= 0) {
              item._idleTimeoutId = setTimeout(function onTimeout() {
                if (item._onTimeout)
                  item._onTimeout();
              }, msecs);
            }
          };
          exports2.setImmediate = typeof setImmediate === "function" ? setImmediate : function(fn) {
            var id = nextImmediateId++;
            var args = arguments.length < 2 ? false : slice.call(arguments, 1);
            immediateIds[id] = true;
            nextTick(function onNextTick() {
              if (immediateIds[id]) {
                if (args) {
                  fn.apply(null, args);
                } else {
                  fn.call(null);
                }
                exports2.clearImmediate(id);
              }
            });
            return id;
          };
          exports2.clearImmediate = typeof clearImmediate === "function" ? clearImmediate : function(id) {
            delete immediateIds[id];
          };
        }).call(this);
      }).call(this, require2("timers").setImmediate, require2("timers").clearImmediate);
    }, { "process/browser.js": 26, "timers": 52 }], 53: [function(require2, module2, exports2) {
      module2.exports = function isBuffer(arg) {
        return arg && typeof arg === "object" && typeof arg.copy === "function" && typeof arg.fill === "function" && typeof arg.readUInt8 === "function";
      };
    }, {}], 54: [function(require2, module2, exports2) {
      var isArgumentsObject = require2("is-arguments");
      var isGeneratorFunction = require2("is-generator-function");
      var whichTypedArray = require2("which-typed-array");
      var isTypedArray = require2("is-typed-array");
      function uncurryThis(f) {
        return f.call.bind(f);
      }
      var BigIntSupported = typeof BigInt !== "undefined";
      var SymbolSupported = typeof Symbol !== "undefined";
      var ObjectToString = uncurryThis(Object.prototype.toString);
      var numberValue = uncurryThis(Number.prototype.valueOf);
      var stringValue = uncurryThis(String.prototype.valueOf);
      var booleanValue = uncurryThis(Boolean.prototype.valueOf);
      if (BigIntSupported) {
        var bigIntValue = uncurryThis(BigInt.prototype.valueOf);
      }
      if (SymbolSupported) {
        var symbolValue = uncurryThis(Symbol.prototype.valueOf);
      }
      function checkBoxedPrimitive(value, prototypeValueOf) {
        if (typeof value !== "object") {
          return false;
        }
        try {
          prototypeValueOf(value);
          return true;
        } catch (e) {
          return false;
        }
      }
      exports2.isArgumentsObject = isArgumentsObject;
      exports2.isGeneratorFunction = isGeneratorFunction;
      exports2.isTypedArray = isTypedArray;
      function isPromise(input) {
        return typeof Promise !== "undefined" && input instanceof Promise || input !== null && typeof input === "object" && typeof input.then === "function" && typeof input.catch === "function";
      }
      exports2.isPromise = isPromise;
      function isArrayBufferView(value) {
        if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
          return ArrayBuffer.isView(value);
        }
        return isTypedArray(value) || isDataView(value);
      }
      exports2.isArrayBufferView = isArrayBufferView;
      function isUint8Array(value) {
        return whichTypedArray(value) === "Uint8Array";
      }
      exports2.isUint8Array = isUint8Array;
      function isUint8ClampedArray(value) {
        return whichTypedArray(value) === "Uint8ClampedArray";
      }
      exports2.isUint8ClampedArray = isUint8ClampedArray;
      function isUint16Array(value) {
        return whichTypedArray(value) === "Uint16Array";
      }
      exports2.isUint16Array = isUint16Array;
      function isUint32Array(value) {
        return whichTypedArray(value) === "Uint32Array";
      }
      exports2.isUint32Array = isUint32Array;
      function isInt8Array(value) {
        return whichTypedArray(value) === "Int8Array";
      }
      exports2.isInt8Array = isInt8Array;
      function isInt16Array(value) {
        return whichTypedArray(value) === "Int16Array";
      }
      exports2.isInt16Array = isInt16Array;
      function isInt32Array(value) {
        return whichTypedArray(value) === "Int32Array";
      }
      exports2.isInt32Array = isInt32Array;
      function isFloat32Array(value) {
        return whichTypedArray(value) === "Float32Array";
      }
      exports2.isFloat32Array = isFloat32Array;
      function isFloat64Array(value) {
        return whichTypedArray(value) === "Float64Array";
      }
      exports2.isFloat64Array = isFloat64Array;
      function isBigInt64Array(value) {
        return whichTypedArray(value) === "BigInt64Array";
      }
      exports2.isBigInt64Array = isBigInt64Array;
      function isBigUint64Array(value) {
        return whichTypedArray(value) === "BigUint64Array";
      }
      exports2.isBigUint64Array = isBigUint64Array;
      function isMapToString(value) {
        return ObjectToString(value) === "[object Map]";
      }
      isMapToString.working = typeof Map !== "undefined" && isMapToString(/* @__PURE__ */ new Map());
      function isMap(value) {
        if (typeof Map === "undefined") {
          return false;
        }
        return isMapToString.working ? isMapToString(value) : value instanceof Map;
      }
      exports2.isMap = isMap;
      function isSetToString(value) {
        return ObjectToString(value) === "[object Set]";
      }
      isSetToString.working = typeof Set !== "undefined" && isSetToString(/* @__PURE__ */ new Set());
      function isSet(value) {
        if (typeof Set === "undefined") {
          return false;
        }
        return isSetToString.working ? isSetToString(value) : value instanceof Set;
      }
      exports2.isSet = isSet;
      function isWeakMapToString(value) {
        return ObjectToString(value) === "[object WeakMap]";
      }
      isWeakMapToString.working = typeof WeakMap !== "undefined" && isWeakMapToString(/* @__PURE__ */ new WeakMap());
      function isWeakMap(value) {
        if (typeof WeakMap === "undefined") {
          return false;
        }
        return isWeakMapToString.working ? isWeakMapToString(value) : value instanceof WeakMap;
      }
      exports2.isWeakMap = isWeakMap;
      function isWeakSetToString(value) {
        return ObjectToString(value) === "[object WeakSet]";
      }
      isWeakSetToString.working = typeof WeakSet !== "undefined" && isWeakSetToString(/* @__PURE__ */ new WeakSet());
      function isWeakSet(value) {
        return isWeakSetToString(value);
      }
      exports2.isWeakSet = isWeakSet;
      function isArrayBufferToString(value) {
        return ObjectToString(value) === "[object ArrayBuffer]";
      }
      isArrayBufferToString.working = typeof ArrayBuffer !== "undefined" && isArrayBufferToString(new ArrayBuffer());
      function isArrayBuffer(value) {
        if (typeof ArrayBuffer === "undefined") {
          return false;
        }
        return isArrayBufferToString.working ? isArrayBufferToString(value) : value instanceof ArrayBuffer;
      }
      exports2.isArrayBuffer = isArrayBuffer;
      function isDataViewToString(value) {
        return ObjectToString(value) === "[object DataView]";
      }
      isDataViewToString.working = typeof ArrayBuffer !== "undefined" && typeof DataView !== "undefined" && isDataViewToString(new DataView(new ArrayBuffer(1), 0, 1));
      function isDataView(value) {
        if (typeof DataView === "undefined") {
          return false;
        }
        return isDataViewToString.working ? isDataViewToString(value) : value instanceof DataView;
      }
      exports2.isDataView = isDataView;
      var SharedArrayBufferCopy = typeof SharedArrayBuffer !== "undefined" ? SharedArrayBuffer : void 0;
      function isSharedArrayBufferToString(value) {
        return ObjectToString(value) === "[object SharedArrayBuffer]";
      }
      function isSharedArrayBuffer(value) {
        if (typeof SharedArrayBufferCopy === "undefined") {
          return false;
        }
        if (typeof isSharedArrayBufferToString.working === "undefined") {
          isSharedArrayBufferToString.working = isSharedArrayBufferToString(new SharedArrayBufferCopy());
        }
        return isSharedArrayBufferToString.working ? isSharedArrayBufferToString(value) : value instanceof SharedArrayBufferCopy;
      }
      exports2.isSharedArrayBuffer = isSharedArrayBuffer;
      function isAsyncFunction(value) {
        return ObjectToString(value) === "[object AsyncFunction]";
      }
      exports2.isAsyncFunction = isAsyncFunction;
      function isMapIterator(value) {
        return ObjectToString(value) === "[object Map Iterator]";
      }
      exports2.isMapIterator = isMapIterator;
      function isSetIterator(value) {
        return ObjectToString(value) === "[object Set Iterator]";
      }
      exports2.isSetIterator = isSetIterator;
      function isGeneratorObject(value) {
        return ObjectToString(value) === "[object Generator]";
      }
      exports2.isGeneratorObject = isGeneratorObject;
      function isWebAssemblyCompiledModule(value) {
        return ObjectToString(value) === "[object WebAssembly.Module]";
      }
      exports2.isWebAssemblyCompiledModule = isWebAssemblyCompiledModule;
      function isNumberObject(value) {
        return checkBoxedPrimitive(value, numberValue);
      }
      exports2.isNumberObject = isNumberObject;
      function isStringObject(value) {
        return checkBoxedPrimitive(value, stringValue);
      }
      exports2.isStringObject = isStringObject;
      function isBooleanObject(value) {
        return checkBoxedPrimitive(value, booleanValue);
      }
      exports2.isBooleanObject = isBooleanObject;
      function isBigIntObject(value) {
        return BigIntSupported && checkBoxedPrimitive(value, bigIntValue);
      }
      exports2.isBigIntObject = isBigIntObject;
      function isSymbolObject(value) {
        return SymbolSupported && checkBoxedPrimitive(value, symbolValue);
      }
      exports2.isSymbolObject = isSymbolObject;
      function isBoxedPrimitive(value) {
        return isNumberObject(value) || isStringObject(value) || isBooleanObject(value) || isBigIntObject(value) || isSymbolObject(value);
      }
      exports2.isBoxedPrimitive = isBoxedPrimitive;
      function isAnyArrayBuffer(value) {
        return typeof Uint8Array !== "undefined" && (isArrayBuffer(value) || isSharedArrayBuffer(value));
      }
      exports2.isAnyArrayBuffer = isAnyArrayBuffer;
      ["isProxy", "isExternal", "isModuleNamespaceObject"].forEach(function(method) {
        Object.defineProperty(exports2, method, {
          enumerable: false,
          value: function() {
            throw new Error(method + " is not supported in userland");
          }
        });
      });
    }, { "is-arguments": 18, "is-generator-function": 20, "is-typed-array": 21, "which-typed-array": 56 }], 55: [function(require2, module2, exports2) {
      (function(process) {
        (function() {
          var getOwnPropertyDescriptors = Object.getOwnPropertyDescriptors || function getOwnPropertyDescriptors2(obj) {
            var keys = Object.keys(obj);
            var descriptors = {};
            for (var i = 0; i < keys.length; i++) {
              descriptors[keys[i]] = Object.getOwnPropertyDescriptor(obj, keys[i]);
            }
            return descriptors;
          };
          var formatRegExp = /%[sdj%]/g;
          exports2.format = function(f) {
            if (!isString(f)) {
              var objects = [];
              for (var i = 0; i < arguments.length; i++) {
                objects.push(inspect(arguments[i]));
              }
              return objects.join(" ");
            }
            var i = 1;
            var args = arguments;
            var len = args.length;
            var str = String(f).replace(formatRegExp, function(x2) {
              if (x2 === "%%") return "%";
              if (i >= len) return x2;
              switch (x2) {
                case "%s":
                  return String(args[i++]);
                case "%d":
                  return Number(args[i++]);
                case "%j":
                  try {
                    return JSON.stringify(args[i++]);
                  } catch (_) {
                    return "[Circular]";
                  }
                default:
                  return x2;
              }
            });
            for (var x = args[i]; i < len; x = args[++i]) {
              if (isNull(x) || !isObject(x)) {
                str += " " + x;
              } else {
                str += " " + inspect(x);
              }
            }
            return str;
          };
          exports2.deprecate = function(fn, msg) {
            if (typeof process !== "undefined" && process.noDeprecation === true) {
              return fn;
            }
            if (typeof process === "undefined") {
              return function() {
                return exports2.deprecate(fn, msg).apply(this, arguments);
              };
            }
            var warned = false;
            function deprecated() {
              if (!warned) {
                if (process.throwDeprecation) {
                  throw new Error(msg);
                } else if (process.traceDeprecation) {
                  console.trace(msg);
                } else {
                  console.error(msg);
                }
                warned = true;
              }
              return fn.apply(this, arguments);
            }
            return deprecated;
          };
          var debugs = {};
          var debugEnvRegex = /^$/;
          if (process.env.NODE_DEBUG) {
            var debugEnv = process.env.NODE_DEBUG;
            debugEnv = debugEnv.replace(/[|\\{}()[\]^$+?.]/g, "\\$&").replace(/\*/g, ".*").replace(/,/g, "$|^").toUpperCase();
            debugEnvRegex = new RegExp("^" + debugEnv + "$", "i");
          }
          exports2.debuglog = function(set) {
            set = set.toUpperCase();
            if (!debugs[set]) {
              if (debugEnvRegex.test(set)) {
                var pid = process.pid;
                debugs[set] = function() {
                  var msg = exports2.format.apply(exports2, arguments);
                  console.error("%s %d: %s", set, pid, msg);
                };
              } else {
                debugs[set] = function() {
                };
              }
            }
            return debugs[set];
          };
          function inspect(obj, opts) {
            var ctx = {
              seen: [],
              stylize: stylizeNoColor
            };
            if (arguments.length >= 3) ctx.depth = arguments[2];
            if (arguments.length >= 4) ctx.colors = arguments[3];
            if (isBoolean(opts)) {
              ctx.showHidden = opts;
            } else if (opts) {
              exports2._extend(ctx, opts);
            }
            if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
            if (isUndefined(ctx.depth)) ctx.depth = 2;
            if (isUndefined(ctx.colors)) ctx.colors = false;
            if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
            if (ctx.colors) ctx.stylize = stylizeWithColor;
            return formatValue(ctx, obj, ctx.depth);
          }
          exports2.inspect = inspect;
          inspect.colors = {
            "bold": [1, 22],
            "italic": [3, 23],
            "underline": [4, 24],
            "inverse": [7, 27],
            "white": [37, 39],
            "grey": [90, 39],
            "black": [30, 39],
            "blue": [34, 39],
            "cyan": [36, 39],
            "green": [32, 39],
            "magenta": [35, 39],
            "red": [31, 39],
            "yellow": [33, 39]
          };
          inspect.styles = {
            "special": "cyan",
            "number": "yellow",
            "boolean": "yellow",
            "undefined": "grey",
            "null": "bold",
            "string": "green",
            "date": "magenta",
            // "name": intentionally not styling
            "regexp": "red"
          };
          function stylizeWithColor(str, styleType) {
            var style = inspect.styles[styleType];
            if (style) {
              return "\x1B[" + inspect.colors[style][0] + "m" + str + "\x1B[" + inspect.colors[style][1] + "m";
            } else {
              return str;
            }
          }
          function stylizeNoColor(str, styleType) {
            return str;
          }
          function arrayToHash(array) {
            var hash = {};
            array.forEach(function(val, idx) {
              hash[val] = true;
            });
            return hash;
          }
          function formatValue(ctx, value, recurseTimes) {
            if (ctx.customInspect && value && isFunction(value.inspect) && // Filter out the util module, it's inspect function is special
            value.inspect !== exports2.inspect && // Also filter out any prototype objects using the circular check.
            !(value.constructor && value.constructor.prototype === value)) {
              var ret = value.inspect(recurseTimes, ctx);
              if (!isString(ret)) {
                ret = formatValue(ctx, ret, recurseTimes);
              }
              return ret;
            }
            var primitive = formatPrimitive(ctx, value);
            if (primitive) {
              return primitive;
            }
            var keys = Object.keys(value);
            var visibleKeys = arrayToHash(keys);
            if (ctx.showHidden) {
              keys = Object.getOwnPropertyNames(value);
            }
            if (isError(value) && (keys.indexOf("message") >= 0 || keys.indexOf("description") >= 0)) {
              return formatError(value);
            }
            if (keys.length === 0) {
              if (isFunction(value)) {
                var name = value.name ? ": " + value.name : "";
                return ctx.stylize("[Function" + name + "]", "special");
              }
              if (isRegExp(value)) {
                return ctx.stylize(RegExp.prototype.toString.call(value), "regexp");
              }
              if (isDate(value)) {
                return ctx.stylize(Date.prototype.toString.call(value), "date");
              }
              if (isError(value)) {
                return formatError(value);
              }
            }
            var base = "", array = false, braces = ["{", "}"];
            if (isArray(value)) {
              array = true;
              braces = ["[", "]"];
            }
            if (isFunction(value)) {
              var n = value.name ? ": " + value.name : "";
              base = " [Function" + n + "]";
            }
            if (isRegExp(value)) {
              base = " " + RegExp.prototype.toString.call(value);
            }
            if (isDate(value)) {
              base = " " + Date.prototype.toUTCString.call(value);
            }
            if (isError(value)) {
              base = " " + formatError(value);
            }
            if (keys.length === 0 && (!array || value.length == 0)) {
              return braces[0] + base + braces[1];
            }
            if (recurseTimes < 0) {
              if (isRegExp(value)) {
                return ctx.stylize(RegExp.prototype.toString.call(value), "regexp");
              } else {
                return ctx.stylize("[Object]", "special");
              }
            }
            ctx.seen.push(value);
            var output;
            if (array) {
              output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
            } else {
              output = keys.map(function(key) {
                return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
              });
            }
            ctx.seen.pop();
            return reduceToSingleString(output, base, braces);
          }
          function formatPrimitive(ctx, value) {
            if (isUndefined(value))
              return ctx.stylize("undefined", "undefined");
            if (isString(value)) {
              var simple = "'" + JSON.stringify(value).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
              return ctx.stylize(simple, "string");
            }
            if (isNumber(value))
              return ctx.stylize("" + value, "number");
            if (isBoolean(value))
              return ctx.stylize("" + value, "boolean");
            if (isNull(value))
              return ctx.stylize("null", "null");
          }
          function formatError(value) {
            return "[" + Error.prototype.toString.call(value) + "]";
          }
          function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
            var output = [];
            for (var i = 0, l = value.length; i < l; ++i) {
              if (hasOwnProperty(value, String(i))) {
                output.push(formatProperty(
                  ctx,
                  value,
                  recurseTimes,
                  visibleKeys,
                  String(i),
                  true
                ));
              } else {
                output.push("");
              }
            }
            keys.forEach(function(key) {
              if (!key.match(/^\d+$/)) {
                output.push(formatProperty(
                  ctx,
                  value,
                  recurseTimes,
                  visibleKeys,
                  key,
                  true
                ));
              }
            });
            return output;
          }
          function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
            var name, str, desc;
            desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
            if (desc.get) {
              if (desc.set) {
                str = ctx.stylize("[Getter/Setter]", "special");
              } else {
                str = ctx.stylize("[Getter]", "special");
              }
            } else {
              if (desc.set) {
                str = ctx.stylize("[Setter]", "special");
              }
            }
            if (!hasOwnProperty(visibleKeys, key)) {
              name = "[" + key + "]";
            }
            if (!str) {
              if (ctx.seen.indexOf(desc.value) < 0) {
                if (isNull(recurseTimes)) {
                  str = formatValue(ctx, desc.value, null);
                } else {
                  str = formatValue(ctx, desc.value, recurseTimes - 1);
                }
                if (str.indexOf("\n") > -1) {
                  if (array) {
                    str = str.split("\n").map(function(line) {
                      return "  " + line;
                    }).join("\n").slice(2);
                  } else {
                    str = "\n" + str.split("\n").map(function(line) {
                      return "   " + line;
                    }).join("\n");
                  }
                }
              } else {
                str = ctx.stylize("[Circular]", "special");
              }
            }
            if (isUndefined(name)) {
              if (array && key.match(/^\d+$/)) {
                return str;
              }
              name = JSON.stringify("" + key);
              if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
                name = name.slice(1, -1);
                name = ctx.stylize(name, "name");
              } else {
                name = name.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'");
                name = ctx.stylize(name, "string");
              }
            }
            return name + ": " + str;
          }
          function reduceToSingleString(output, base, braces) {
            var length = output.reduce(function(prev, cur) {
              if (cur.indexOf("\n") >= 0) ;
              return prev + cur.replace(/\u001b\[\d\d?m/g, "").length + 1;
            }, 0);
            if (length > 60) {
              return braces[0] + (base === "" ? "" : base + "\n ") + " " + output.join(",\n  ") + " " + braces[1];
            }
            return braces[0] + base + " " + output.join(", ") + " " + braces[1];
          }
          exports2.types = require2("./support/types");
          function isArray(ar) {
            return Array.isArray(ar);
          }
          exports2.isArray = isArray;
          function isBoolean(arg) {
            return typeof arg === "boolean";
          }
          exports2.isBoolean = isBoolean;
          function isNull(arg) {
            return arg === null;
          }
          exports2.isNull = isNull;
          function isNullOrUndefined(arg) {
            return arg == null;
          }
          exports2.isNullOrUndefined = isNullOrUndefined;
          function isNumber(arg) {
            return typeof arg === "number";
          }
          exports2.isNumber = isNumber;
          function isString(arg) {
            return typeof arg === "string";
          }
          exports2.isString = isString;
          function isSymbol(arg) {
            return typeof arg === "symbol";
          }
          exports2.isSymbol = isSymbol;
          function isUndefined(arg) {
            return arg === void 0;
          }
          exports2.isUndefined = isUndefined;
          function isRegExp(re) {
            return isObject(re) && objectToString(re) === "[object RegExp]";
          }
          exports2.isRegExp = isRegExp;
          exports2.types.isRegExp = isRegExp;
          function isObject(arg) {
            return typeof arg === "object" && arg !== null;
          }
          exports2.isObject = isObject;
          function isDate(d) {
            return isObject(d) && objectToString(d) === "[object Date]";
          }
          exports2.isDate = isDate;
          exports2.types.isDate = isDate;
          function isError(e) {
            return isObject(e) && (objectToString(e) === "[object Error]" || e instanceof Error);
          }
          exports2.isError = isError;
          exports2.types.isNativeError = isError;
          function isFunction(arg) {
            return typeof arg === "function";
          }
          exports2.isFunction = isFunction;
          function isPrimitive(arg) {
            return arg === null || typeof arg === "boolean" || typeof arg === "number" || typeof arg === "string" || typeof arg === "symbol" || // ES6 symbol
            typeof arg === "undefined";
          }
          exports2.isPrimitive = isPrimitive;
          exports2.isBuffer = require2("./support/isBuffer");
          function objectToString(o) {
            return Object.prototype.toString.call(o);
          }
          function pad(n) {
            return n < 10 ? "0" + n.toString(10) : n.toString(10);
          }
          var months = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
          ];
          function timestamp() {
            var d = /* @__PURE__ */ new Date();
            var time = [
              pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())
            ].join(":");
            return [d.getDate(), months[d.getMonth()], time].join(" ");
          }
          exports2.log = function() {
            console.log("%s - %s", timestamp(), exports2.format.apply(exports2, arguments));
          };
          exports2.inherits = require2("inherits");
          exports2._extend = function(origin, add) {
            if (!add || !isObject(add)) return origin;
            var keys = Object.keys(add);
            var i = keys.length;
            while (i--) {
              origin[keys[i]] = add[keys[i]];
            }
            return origin;
          };
          function hasOwnProperty(obj, prop) {
            return Object.prototype.hasOwnProperty.call(obj, prop);
          }
          var kCustomPromisifiedSymbol = typeof Symbol !== "undefined" ? Symbol("util.promisify.custom") : void 0;
          exports2.promisify = function promisify(original) {
            if (typeof original !== "function")
              throw new TypeError('The "original" argument must be of type Function');
            if (kCustomPromisifiedSymbol && original[kCustomPromisifiedSymbol]) {
              var fn = original[kCustomPromisifiedSymbol];
              if (typeof fn !== "function") {
                throw new TypeError('The "util.promisify.custom" argument must be of type Function');
              }
              Object.defineProperty(fn, kCustomPromisifiedSymbol, {
                value: fn,
                enumerable: false,
                writable: false,
                configurable: true
              });
              return fn;
            }
            function fn() {
              var promiseResolve, promiseReject;
              var promise = new Promise(function(resolve, reject) {
                promiseResolve = resolve;
                promiseReject = reject;
              });
              var args = [];
              for (var i = 0; i < arguments.length; i++) {
                args.push(arguments[i]);
              }
              args.push(function(err, value) {
                if (err) {
                  promiseReject(err);
                } else {
                  promiseResolve(value);
                }
              });
              try {
                original.apply(this, args);
              } catch (err) {
                promiseReject(err);
              }
              return promise;
            }
            Object.setPrototypeOf(fn, Object.getPrototypeOf(original));
            if (kCustomPromisifiedSymbol) Object.defineProperty(fn, kCustomPromisifiedSymbol, {
              value: fn,
              enumerable: false,
              writable: false,
              configurable: true
            });
            return Object.defineProperties(
              fn,
              getOwnPropertyDescriptors(original)
            );
          };
          exports2.promisify.custom = kCustomPromisifiedSymbol;
          function callbackifyOnRejected(reason, cb) {
            if (!reason) {
              var newReason = new Error("Promise was rejected with a falsy value");
              newReason.reason = reason;
              reason = newReason;
            }
            return cb(reason);
          }
          function callbackify(original) {
            if (typeof original !== "function") {
              throw new TypeError('The "original" argument must be of type Function');
            }
            function callbackified() {
              var args = [];
              for (var i = 0; i < arguments.length; i++) {
                args.push(arguments[i]);
              }
              var maybeCb = args.pop();
              if (typeof maybeCb !== "function") {
                throw new TypeError("The last argument must be of type Function");
              }
              var self2 = this;
              var cb = function() {
                return maybeCb.apply(self2, arguments);
              };
              original.apply(this, args).then(
                function(ret) {
                  process.nextTick(cb.bind(null, null, ret));
                },
                function(rej) {
                  process.nextTick(callbackifyOnRejected.bind(null, rej, cb));
                }
              );
            }
            Object.setPrototypeOf(callbackified, Object.getPrototypeOf(original));
            Object.defineProperties(
              callbackified,
              getOwnPropertyDescriptors(original)
            );
            return callbackified;
          }
          exports2.callbackify = callbackify;
        }).call(this);
      }).call(this, require2("_process"));
    }, { "./support/isBuffer": 53, "./support/types": 54, "_process": 26, "inherits": 17 }], 56: [function(require2, module2, exports2) {
      (function(global) {
        (function() {
          var forEach = require2("for-each");
          var availableTypedArrays = require2("available-typed-arrays");
          var callBound = require2("call-bind/callBound");
          var gOPD = require2("gopd");
          var $toString = callBound("Object.prototype.toString");
          var hasToStringTag = require2("has-tostringtag/shams")();
          var g = typeof globalThis === "undefined" ? global : globalThis;
          var typedArrays = availableTypedArrays();
          var $slice = callBound("String.prototype.slice");
          var toStrTags = {};
          var getPrototypeOf = Object.getPrototypeOf;
          if (hasToStringTag && gOPD && getPrototypeOf) {
            forEach(typedArrays, function(typedArray) {
              if (typeof g[typedArray] === "function") {
                var arr = new g[typedArray]();
                if (Symbol.toStringTag in arr) {
                  var proto = getPrototypeOf(arr);
                  var descriptor = gOPD(proto, Symbol.toStringTag);
                  if (!descriptor) {
                    var superProto = getPrototypeOf(proto);
                    descriptor = gOPD(superProto, Symbol.toStringTag);
                  }
                  toStrTags[typedArray] = descriptor.get;
                }
              }
            });
          }
          var tryTypedArrays = function tryAllTypedArrays(value) {
            var foundName = false;
            forEach(toStrTags, function(getter, typedArray) {
              if (!foundName) {
                try {
                  var name = getter.call(value);
                  if (name === typedArray) {
                    foundName = name;
                  }
                } catch (e) {
                }
              }
            });
            return foundName;
          };
          var isTypedArray = require2("is-typed-array");
          module2.exports = function whichTypedArray(value) {
            if (!isTypedArray(value)) {
              return false;
            }
            if (!hasToStringTag || !(Symbol.toStringTag in value)) {
              return $slice($toString(value), 8, -1);
            }
            return tryTypedArrays(value);
          };
        }).call(this);
      }).call(this, typeof commonjsGlobal !== "undefined" ? commonjsGlobal : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, { "available-typed-arrays": 2, "call-bind/callBound": 3, "for-each": 7, "gopd": 11, "has-tostringtag/shams": 14, "is-typed-array": 21 }], 57: [function(require2, module2, exports2) {
      module2.exports = require2("sharedb/lib/client");
    }, { "sharedb/lib/client": 29 }] }, {}, [57])(57);
  });
})(sharedbClientUmd$2);
var sharedbClientUmdExports = sharedbClientUmd$2.exports;
const sharedbClientUmd = /* @__PURE__ */ getDefaultExportFromCjs(sharedbClientUmdExports);
const sharedbClientUmd$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: sharedbClientUmd
}, [sharedbClientUmdExports]);
export {
  sharedbClientUmd$1 as s
};
