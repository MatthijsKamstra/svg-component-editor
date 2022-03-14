package svg;

import js.Browser.*;
import js.html.*;
import svg.Default.NS;

class Group {
	public static function create(x:Float = 0, y:Float = 0):Element {
		var element = document.createElementNS(NS, 'g');
		// element.setAttribute('x', '${x}');
		// element.setAttribute('y', '${y}');
		element.setAttribute('transform', 'translate(${x},${y})');
		return element;
	}
}
