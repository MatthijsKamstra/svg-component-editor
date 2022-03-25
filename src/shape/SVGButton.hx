package shape;

import js.html.svg.SVGElement;
import svg.Group;
import Names.*;

class SVGButton extends SVGCombo {
	public function new(el) {
		super(el);
	}

	public static function create(x, y) {
		var group = Group.create(x, y);
		group.dataset.type = GROUP_TYPE;
		group.dataset.id = GROUP_BTN;

		// rectangle
		var rect = svg.Rect.create(0, 0, 100, Config.GRID * 0.5);
		rect.dataset.bg = Names.GROUP_BG;
		group.appendChild(rect);

		// text
		var text = svg.Text.create('Submit', 100 * 0.5, Config.GRID * 0.25);
		text.setAttribute('text-anchor', "middle");
		text.setAttribute('dominant-baseline', "central");
		group.appendChild(text);

		return (group);
	}
}
