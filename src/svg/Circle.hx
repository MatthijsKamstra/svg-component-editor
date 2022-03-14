package svg;

import js.Browser.*;
import js.html.*;
import svg.Config.NS;

class Circle {
	public static function create(x:Int = 0, y:Int = 0, r:Int = 100):Element {
		var element = document.createElementNS(NS, 'circle');
		element.setAttribute('cx', '${x}');
		element.setAttribute('cy', '${y}');
		element.setAttribute('r', '${r}');

		element.style.stroke = 'black';
		element.style.fill = 'silver';

		return element;
	}
}
