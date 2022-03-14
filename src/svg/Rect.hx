package svg;

import js.Browser.*;
import js.html.*;
import svg.Config.NS;

class Rect {
	public static function create(x:Int = 0, y:Int = 0, w:Int = 100, h:Int = 16):Element {
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
