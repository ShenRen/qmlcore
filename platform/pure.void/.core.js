if ((typeof process !== 'undefined') && (process.release.name === 'node')) {
	exports.core.os = process.platform
	exports.core.userAgent = process.release.name
}

_globals._backend = function() { return _globals.pure.void.backend }
_globals.core.__locationBackend = function() { return _globals.pure.void.backend }
