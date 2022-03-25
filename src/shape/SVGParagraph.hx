package shape;

import js.html.svg.Element;
import svg.Group;
import Names.*;

class SVGParagraph extends SVGCombo {
	public function new(x, y, ?w, ?h) {
		super(x, y, w, h);
	}

	override public function update() {
		trace('SVGParagraph update');
		var text = cast element.querySelector('[data-centered~="${Names.GROUP_EL_CENTERED}"]');
		text.setAttribute('x', '${width / 2}');
		text.setAttribute('y', '${height / 2}');
		var gr:Element = cast element.querySelector('[data-type~="foo"]');
		// trace('resize group with lines');
		// trace(gr);
		// var temp = gr.parentElement;
		// var l = setLines();
		// // element.appendChild(l);
		// temp.replaceChild(gr, l);
		// temp.removeChild(gr);
	}

	function setLines() {
		var _w = width;
		var _h = height;
		var _padX = Config.GRID * 0.25;
		var _padY = _h * 0.5;
		// line
		var total = Math.floor((_w / _padX) / 2);
		var gr = new svg.Group();
		gr.dataType = 'foo';
		gr.element.classList.add(Style.IGNORE);
		for (i in 1...total) {
			var __p = (_padX * i);
			var line = new svg.Line(_padX, __p, (_w - _padX), __p);
			line.stroke = ('#e5e3e2');
			line.strokeWidth = 8;
			line.strokeLinecap = 'round';
			gr.appendChild(line.element);
		}
		return gr.element;
	}

	override public function create(x, y, w, h) {
		var _w = Config.GRID * 4;
		var _h = Config.GRID * 2;
		var _padX = Config.GRID * 0.25;
		var _padY = _h * 0.5;

		// group
		var group = Group.create(x, y);
		group.dataset.type = GROUP_TYPE;
		group.dataset.id = GROUP_PARAGRAPH;

		// rectangle
		var rect = svg.Rect.create(0, 0, w, h);
		rect.dataset.bg = Names.GROUP_EL_BG;
		group.appendChild(rect);

		// line
		var total = Math.floor(h / _padX);
		var gr = new svg.Group();
		gr.dataType = 'foo';
		gr.element.classList.add(Style.IGNORE);
		for (i in 1...total) {
			var __p = (_padX * i);
			var line = new svg.Line(_padX, __p, (w - _padX), __p);
			line.stroke = ('#e5e3e2');
			line.strokeWidth = 8;
			line.strokeLinecap = 'round';
			gr.appendChild(line.element);
		}
		group.appendChild(gr.element);

		// text
		var text = svg.Text.create('Paragraph', w / 2, h / 2);
		text.dataset.centered = Names.GROUP_EL_CENTERED;
		text.setAttribute('text-anchor', "middle");
		text.setAttribute('dominant-baseline', "central");
		group.appendChild(text);

		this.group = group;
	}
}
