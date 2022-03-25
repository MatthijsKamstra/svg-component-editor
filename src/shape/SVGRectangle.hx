package shape;

import utils.ColorUtil;
import js.html.svg.SVGElement;
import svg.Group;
import Names.*;

class SVGRectangle extends SVGCombo {
	public function new(x, y, ?w, ?h) {
		super(x, y, w, h);
	}

	override public function create(x, y, w, h) {
		var gr = Group.create(x, y);
		gr.dataset.type = GROUP_TYPE;
		gr.dataset.id = GROUP_RECT;

		// var element = svg.Rect.create(Config.GRID * MathUtil.getRandomInt(1, 4), Config.GRID * MathUtil.getRandomInt(1, 4),
		// Config.GRID * MathUtil.getRandomInt(1, 4), Config.GRID * MathUtil.getRandomInt(1, 4));
		// element.style.stroke = 'black';
		// element.style.fill = randomColor();
		// editor.addElement(element);

		// rectangle
		var rect = svg.Rect.create(0, 0, w, h);
		rect.dataset.bg = Names.GROUP_EL_BG;
		rect.style.fill = ColorUtil.randomColor();
		gr.appendChild(rect);

		this.group = gr;
	}
}
