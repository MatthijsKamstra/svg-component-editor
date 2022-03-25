package shape;

import svg.Group;
import Names.*;

class SVGButton extends SVGCombo {
	public function new(x, y, ?w, ?h) {
		super(x, y, w, h);

		var text = cast element.querySelector('[data-centered~="${Names.GROUP_EL_CENTERED}"]');
		text.setAttribute('x', '${width / 2}');
		text.setAttribute('y', '${height / 2}');
	}

	override public function create(x, y, w, h) {
		var group = Group.create(x, y);
		group.dataset.type = GROUP_TYPE;
		group.dataset.id = GROUP_BTN;

		// rectangle
		var rect = svg.Rect.create(0, 0, 100, Config.GRID * 0.5);
		rect.dataset.bg = Names.GROUP_EL_BG;
		group.appendChild(rect);

		// text
		var text = svg.Text.create('Submit', 100 * 0.5, Config.GRID * 0.25);
		text.dataset.centered = Names.GROUP_EL_CENTERED;
		text.setAttribute('text-anchor', "middle");
		text.setAttribute('dominant-baseline', "central");
		group.appendChild(text);

		this.group = group;
	}
}
