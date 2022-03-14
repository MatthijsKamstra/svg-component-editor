package svg;

import js.Browser.*;
import js.html.*;
import svg.Default.NS;

// <line x1="0" y1="80" x2="100" y2="20" stroke="black" />
class Line {
	public static function create(x1:Int = 0, y1:Int = 0, x2:Int, y2:Int):Element {
		var element = document.createElementNS(NS, 'line');
		element.setAttribute('x1', '${x1}');
		element.setAttribute('y1', '${y1}');
		element.setAttribute('x2', '${x2}');
		element.setAttribute('y2', '${y2}');
		element.style.stroke = 'blue';
		return element;
	}

	public static function horizontal(x:Int = 0, y:Int = 0, length:Int = 100):Element {
		return Line.create(x, y, x + length, y);
	}

	public static function vertical(x:Int = 0, y:Int = 0, length:Int = 100):Element {
		return Line.create(x, y, x, y + length);
	}
}
