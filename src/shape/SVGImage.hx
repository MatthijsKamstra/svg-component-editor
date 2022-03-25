package shape;

import svg.Text;
import utils.ColorUtil;
import svg.Group;
import Names.*;

class SVGImage extends SVGCombo {
	public function new(x, y, ?w, ?h) {
		super(x, y, w, h);
	}

	// override public function create(x, y, w, h) {
	// 	var gr = Group.create(x, y);
	// 	gr.dataset.type = GROUP_TYPE;
	// 	gr.dataset.id = GROUP_IMAGE;
	// 	// rectangle
	// 	var rect = svg.Rect.create(0, 0, w, h);
	// 	rect.dataset.bg = Names.GROUP_EL_BG;
	// 	gr.appendChild(rect);
	// 	// text
	// 	var text = svg.Text.create('Image', w * 0.5, h * 0.5);
	// 	text.dataset.centered = Names.GROUP_EL_CENTERED;
	// 	text.setAttribute('text-anchor', "middle");
	// 	text.setAttribute('dominant-baseline', "central");
	// 	gr.appendChild(text);
	// 	this.group = gr;
	// }

	override public function create(x, y, w, h):Void {
		// trace(x, y, w, h);
		var gr = Group.create(x, y);
		gr.dataset.type = GROUP_TYPE;
		gr.dataset.id = GROUP_IMAGE;

		// rectangle
		var rect = svg.Rect.create(0, 0, w, h);
		rect.dataset.bg = Names.GROUP_EL_BG;
		rect.style.fill = ColorUtil.randomColor();
		gr.appendChild(rect);

		// text
		var text = svg.Text.create('Image', w * 0.5, h * 0.5);
		text.dataset.centered = Names.GROUP_EL_CENTERED;
		text.setAttribute('text-anchor', "middle");
		text.setAttribute('dominant-baseline', "central");
		gr.appendChild(text);

		this.group = gr;
	}

	override public function update() {
		trace('SVGImage update');
		var text = cast element.querySelector('[data-centered~="${Names.GROUP_EL_CENTERED}"]');
		text.setAttribute('x', '${width / 2}');
		text.setAttribute('y', '${height / 2}');
	}
}
