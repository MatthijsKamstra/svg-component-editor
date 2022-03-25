package svg;

import js.html.svg.SVGElement;
import js.Browser.*;
import js.html.*;
import svg.Default.NS;

class Group {
	public var element:SVGElement;

	@:isVar public var dataType(get, set):String;

	public function new(x:Float = 0, y:Float = 0) {
		element = cast document.createElementNS(NS, 'g');
		// element.setAttribute('x', '${x}');
		// element.setAttribute('y', '${y}');
		element.setAttribute('transform', 'translate(${x},${y})');
	}

	public function appendChild(el) {
		element.appendChild(el);
	}

	public static function create(x:Float = 0, y:Float = 0):SVGElement {
		var gr = new Group(x, y);
		return gr.element;
	}

	// ____________________________________ getter/setter ____________________________________

	function get_dataType():String {
		return dataType;
	}

	function set_dataType(value:String):String {
		element.dataset.type = value;
		return dataType = value;
	}
}
