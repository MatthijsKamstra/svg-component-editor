package shape;

import svg.Group;
import Names.*;

class SVGButton {
	public function new() {
		// your code
	}

	public static function create(x, y) {
		var group = Group.create(x, y);
		group.id = GROUP_BTN;
		group.dataset.id = GROUP_ID_BUTTON;
		group.appendChild(svg.Rect.create(0, 0, 100, Config.GRID * 0.5));

		var text = svg.Text.create('Submit', 100 * 0.5, Config.GRID * 0.25);
		text.setAttribute('text-anchor', "middle");
		text.setAttribute('dominant-baseline', "central");
		group.appendChild(text);

		return (group);
	}
}
