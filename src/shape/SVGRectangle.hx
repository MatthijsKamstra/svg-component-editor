package shape;

import utils.ColorUtil;
import js.html.svg.SVGElement;
import svg.Group;
import Names.*;

class SVGRectangle extends SVGCombo {
	public function new(el) {
		super(el);
	}

	public static function create(x, y) {
		var group = Group.create(x, y);
		group.dataset.type = GROUP_TYPE;
		group.dataset.id = GROUP_RECT;

		// var element = svg.Rect.create(Config.GRID * MathUtil.getRandomInt(1, 4), Config.GRID * MathUtil.getRandomInt(1, 4),
		// 	Config.GRID * MathUtil.getRandomInt(1, 4), Config.GRID * MathUtil.getRandomInt(1, 4));
		// element.style.stroke = 'black';
		// element.style.fill = randomColor();
		// editor.addElement(element);

		// rectangle
		var rect = svg.Rect.create(0, 0, Config.GRID * 2, Config.GRID * 2);
		rect.dataset.bg = Names.GROUP_EL_BG;
		rect.style.fill = ColorUtil.randomColor();
		group.appendChild(rect);

		return (group);
	}
}
