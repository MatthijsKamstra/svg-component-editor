package svg;

import js.Browser.*;
import js.html.*;
import svg.Default.NS;

class Rect {
	public static function create(x:Float = 0, y:Float = 0, w:Float = 100, h:Float = 16):Element {
		var element = document.createElementNS(NS, 'rect');
		element.setAttribute('x', '${x}');
		element.setAttribute('y', '${y}');
		element.setAttribute('width', '${w}');
		element.setAttribute('height', '${h}');
		element.style.stroke = 'black';
		element.style.fill = 'silver';

		return element;
	}
}
