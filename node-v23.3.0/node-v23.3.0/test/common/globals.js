'use strict';

const intrinsics = new Set([
  'Object',
  'Function',
  'Array',
  'Number',
  'parseFloat',
  'parseInt',
  'Infinity',
  'NaN',
  'undefined',
  'Boolean',
  'String',
  'Symbol',
  'Date',
  'Promise',
  'RegExp',
  'Error',
  'AggregateError',
  'EvalError',
  'RangeError',
  'ReferenceError',
  'SyntaxError',
  'TypeError',
  'URIError',
  'globalThis',
  'JSON',
  'Math',
  'Intl',
  'ArrayBuffer',
  'Uint8Array',
  'Int8Array',
  'Uint16Array',
  'Int16Array',
  'Uint32Array',
  'Int32Array',
  'Float32Array',
  'Float64Array',
  'Uint8ClampedArray',
  'BigUint64Array',
  'BigInt64Array',
  'DataView',
  'Map',
  'BigInt',
  'Set',
  'WeakMap',
  'WeakSet',
  'Proxy',
  'Reflect',
  'ShadowRealm',
  'FinalizationRegistry',
  'WeakRef',
  'decodeURI',
  'decodeURIComponent',
  'encodeURI',
  'encodeURIComponent',
  'escape',
  'unescape',
  'eval',
  'isFinite',
  'isNaN',
  'SharedArrayBuffer',
  'Atomics',
  'WebAssembly',
  'Iterator',
]);

if (global.gc) {
  intrinsics.add('gc');
}

// v8 exposes console in the global scope.
intrinsics.add('console');

const webIdlExposedWildcard = new Set([
  'DOMException',
  'TextEncoder',
  'TextDecoder',
  'AbortController',
  'AbortSignal',
  'CustomEvent',
  'EventTarget',
  'Event',
  'URL',
  'URLSearchParams',
  'ReadableStream',
  'ReadableStreamDefaultReader',
  'ReadableStreamBYOBReader',
  'ReadableStreamBYOBRequest',
  'ReadableByteStreamController',
  'ReadableStreamDefaultController',
  'TransformStream',
  'TransformStreamDefaultController',
  'WritableStream',
  'WritableStreamDefaultWriter',
  'WritableStreamDefaultController',
  'ByteLengthQueuingStrategy',
  'CountQueuingStrategy',
  'TextEncoderStream',
  'TextDecoderStream',
  'CompressionStream',
  'DecompressionStream',
]);

const webIdlExposedWindow = new Set([
  'console',
  'BroadcastChannel',
  'queueMicrotask',
  'structuredClone',
  'MessageChannel',
  'MessagePort',
  'MessageEvent',
  'clearInterval',
  'clearTimeout',
  'setInterval',
  'setTimeout',
  'atob',
  'btoa',
  'Blob',
  'Performance',
  'performance',
  'fetch',
  'FormData',
  'Headers',
  'Request',
  'Response',
  'WebSocket',
  'EventSource',
  'CloseEvent',
]);

const nodeGlobals = new Set([
  'process',
  'global',
  'Buffer',
  'clearImmediate',
  'setImmediate',
]);

module.exports = {
  intrinsics,
  webIdlExposedWildcard,
  webIdlExposedWindow,
  nodeGlobals,
};
