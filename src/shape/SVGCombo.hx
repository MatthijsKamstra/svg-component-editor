package shape;

import js.html.svg.Element;
import js.html.svg.SVGElement;

using StringTools;

class SVGCombo {
	@:isVar public var bg(get, set):SVGElement;
	@:isVar public var element(get, set):SVGElement;
	@:isVar public var group(get, set):SVGElement;

	@:isVar public var x(get, set):Float;
	@:isVar public var y(get, set):Float;
	@:isVar public var width(get, set):Float;
	@:isVar public var height(get, set):Float;

	public function new(x:Float, y:Float, ?w:Float, ?h:Float) {
		this.x = x;
		this.y = y;
		this.width = (w != null) ? w : Config.GRID * 2;
		this.height = (h != null) ? h : Config.GRID * 2;

		create(this.x, this.y, this.width, this.height);
	}

	function create(x, y, w, h):Void {
		trace('SVGCombo - create');
	}

	public function update() {
		trace('SVGCombo - update');
	}

	public static function parse(el:SVGElement) {
		var rect = el.getBoundingClientRect();
		var width = rect.width;
		var height = rect.height;
		var x = rect.left;
		var y = rect.top;

		if (el.getAttribute('transform') != null) {
			var tr = el.getAttribute('transform').replace('translate(', '').replace(')', '');
			x = Std.parseFloat(tr.split(',')[0]);
			y = Std.parseFloat(tr.split(',')[1]);
		}

		var svgCombo = new SVGCombo(x, y, width, height);

		// trace(el.querySelector('[data-bg~="${Names.GROUP_BG}"]'));
		// assumption is that there is always a bg
		svgCombo.bg = cast el.querySelector('[data-bg~="${Names.GROUP_EL_BG}"]');

		svgCombo.width = Std.parseFloat(svgCombo.bg.getAttribute('width'));
		svgCombo.height = Std.parseFloat(svgCombo.bg.getAttribute('height'));

		svgCombo.element = el;
		svgCombo.group = el;

		return svgCombo;
	}

	// ____________________________________ getter/setter ____________________________________

	function get_width():Float {
		return width;
	}

	function set_width(value:Float):Float {
		return width = value;
	}

	function get_height():Float {
		return height;
	}

	function set_height(value:Float):Float {
		return height = value;
	}

	function get_bg():SVGElement {
		return bg;
	}

	function set_bg(value:SVGElement):SVGElement {
		return bg = value;
	}

	function get_element():SVGElement {
		return element;
	}

	function set_element(value:SVGElement):SVGElement {
		return element = value;
	}

	function get_group():SVGElement {
		return group;
	}

	function set_group(value:SVGElement):SVGElement {
		return group = value;
	}

	function get_y():Float {
		return y;
	}

	function set_y(value:Float):Float {
		return y = value;
	}

	function get_x():Float {
		return x;
	}

	function set_x(value:Float):Float {
		return x = value;
	}
}
