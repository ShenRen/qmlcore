exports.capabilities = { }

var html = null
var runtime = null
var rootItem = null
var canvas = null

var proxy = [
	'requestAnimationFrame', 'cancelAnimationFrame',
	'enterFullscreenMode', 'exitFullscreenMode', 'inFullscreenMode',
//	'initImage', 'loadImage', 'initText', 'layoutText',  //this should not be proxy, implement this backend methods
	'run'
]

var paintRect = function(renderer, rect) {
	console.log('paintRect: ' + rect)
}

exports.init = function(ctx) {
	console.log('init')
	html = _globals.html5.html
	runtime = _globals.pure.runtime

	proxy.forEach(function(name) {
		exports[name] = html[name]
	})

	ctx.options.tag = 'canvas'
	html.init(ctx)
	canvas = ctx.element.dom
	ctx._updatedItems = new Set()
	ctx.element = new runtime.Element(ctx, ctx.getTag())
	{
		var Element = runtime.Element
		Element.prototype.setHtml = function(html) {
			console.log('setHtml stub')
			this.layoutText()
		}

		Element.prototype.layoutText = function() {
			console.log('layout text stub')
		}
	}
}

exports.createElement = function(ctx, tag) {
	if (runtime === null)
		runtime = _globals.pure.runtime //fixme: this is called from StyleSheet too early (ctor?), fix initialisation order!
	return new runtime.Element(ctx, tag, paintRect)
}
