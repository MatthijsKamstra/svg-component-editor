package shape;

import svg.Group;
import Names.*;

class SVGImage {
	public function new() {
		// your code
	}

	public static function create(x, y) {
		var group = Group.create(x, y);
		group.id = GROUP_IMAGE;
		group.dataset.id = GROUP_ID_IMAGE;
		group.appendChild(svg.Rect.create(0, 0, Config.GRID * 2, Config.GRID * 2));

		var text = svg.Text.create('Image', Config.GRID * 1, Config.GRID * 1);
		text.setAttribute('text-anchor', "middle");
		text.setAttribute('dominant-baseline', "central");
		group.appendChild(text);

		return (group);
	}
}
