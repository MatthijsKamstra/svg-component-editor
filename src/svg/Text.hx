package svg;

import js.Browser.*;
import js.html.*;
import svg.Default.NS;

class Text {
	public static function create(content:String, x:Int = 0, y:Int = 0, w:Int = 100, h:Int = 16):Element {
		var element = document.createElementNS(NS, 'text');
		element.setAttribute('x', '${x}');
		element.setAttribute('y', '${y}');
		element.setAttribute('font-size', '16px');
		element.style.stroke = 'none';
		element.style.fill = 'black';
		element.textContent = content;
		return element;
	}
}
