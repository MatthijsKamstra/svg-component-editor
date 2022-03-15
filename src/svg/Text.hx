package svg;

import js.Browser.*;
import js.html.*;
import svg.Default.NS;

class Text {
	public static function create(content:String, x:Float = 0, y:Float = 0, w:Float = 100, h:Float = 16):Element {
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
