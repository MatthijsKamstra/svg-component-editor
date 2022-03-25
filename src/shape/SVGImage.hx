package shape;

import js.html.svg.TextElement;
import js.html.svg.SVGElement;
import svg.Group;
import Names.*;

class SVGImage extends SVGCombo {
	public function new(el) {
		super(el);
	}

	override public function update() {
		trace('SVGImage update');
		var text:TextElement = cast element.querySelector('[data-centered~="${Names.GROUP_CENTERED}"]');
		text.setAttribute('x', '${width / 2}');
		text.setAttribute('y', '${height / 2}');
	}

	public static function create(x, y) {
		var group = Group.create(x, y);
		group.dataset.type = GROUP_TYPE;
		group.dataset.id = GROUP_IMAGE;

		// rectangle
		var rect = svg.Rect.create(0, 0, Config.GRID * 2, Config.GRID * 2);
		rect.dataset.bg = Names.GROUP_BG;
		group.appendChild(rect);

		// text
		var text = svg.Text.create('Image', Config.GRID * 1, Config.GRID * 1);
		text.dataset.centered = Names.GROUP_CENTERED;
		text.setAttribute('text-anchor', "middle");
		text.setAttribute('dominant-baseline', "central");
		group.appendChild(text);

		return (group);
	}
}
