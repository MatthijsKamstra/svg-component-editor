package shape;

import js.html.svg.Element;
import js.html.svg.SVGElement;

class SVGCombo {
	@:isVar public var width(get, set):Float;
	@:isVar public var height(get, set):Float;
	@:isVar public var bg(get, set):SVGElement;
	@:isVar public var element(get, set):SVGElement;

	public function new(el:SVGElement) {
		var rect = el.getBoundingClientRect();

		element = el;
		width = rect.width;
		height = rect.height;

		// trace(el.querySelector('[data-bg~="${Names.GROUP_BG}"]'));
		// assumption is that there is always a bg
		bg = cast el.querySelector('[data-bg~="${Names.GROUP_EL_BG}"]');
	}

	public function update() {
		trace('SVGCombo - update');
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
}
