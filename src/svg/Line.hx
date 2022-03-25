package svg;

import js.html.svg.SVGElement;
import js.Browser.*;
import js.html.*;
import svg.Default.NS;

// <line x1="0" y1="80" x2="100" y2="20" stroke="black" />
class Line {
	@:isVar public var element(get, set):SVGElement;

	@:isVar public var stroke(get, set):String;
	@:isVar public var strokeWidth(get, set):Float;

	// stroke-linecap
	@:isVar public var strokeLinecap(get, set):String;

	public function new(x1:Float = 0, y1:Float = 0, x2:Float, y2:Float) {
		element = cast document.createElementNS(NS, 'line');
		element.setAttribute('x1', '${x1}');
		element.setAttribute('y1', '${y1}');
		element.setAttribute('x2', '${x2}');
		element.setAttribute('y2', '${y2}');
		element.setAttribute('stroke', 'green');
	}

	public function child() {
		return element;
	}

	public static function create(x1:Float = 0, y1:Float = 0, x2:Float, y2:Float):Element {
		var element = document.createElementNS(NS, 'line');
		element.setAttribute('x1', '${x1}');
		element.setAttribute('y1', '${y1}');
		element.setAttribute('x2', '${x2}');
		element.setAttribute('y2', '${y2}');
		element.style.stroke = 'blue';
		return element;
	}

	public static function horizontal(x:Float = 0, y:Float = 0, length:Float = 100):Element {
		return Line.create(x, y, x + length, y);
	}

	public static function vertical(x:Float = 0, y:Float = 0, length:Float = 100):Element {
		return Line.create(x, y, x, y + length);
	}

	// ____________________________________ getter/setter ____________________________________
	function get_element():SVGElement {
		return element;
	}

	function set_element(value:SVGElement):SVGElement {
		return element = value;
	}

	function get_stroke():String {
		return stroke;
	}

	function set_stroke(value:String):String {
		element.setAttribute('stroke', '${value}');
		return stroke = value;
	}

	function get_strokeLinecap():String {
		return strokeLinecap;
	}

	function set_strokeLinecap(value:String):String {
		element.setAttribute('stroke-linecap', '${value}');
		return strokeLinecap = value;
	}

	function get_strokeWidth():Float {
		return strokeWidth;
	}

	function set_strokeWidth(value:Float):Float {
		element.setAttribute('stroke-width', '${value}');
		return strokeWidth = value;
	}
}
