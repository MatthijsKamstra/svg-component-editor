package shape;

import svg.Line;
import svg.Group;
import Names.*;

class SVGHeading extends SVGCombo {
	public function new(el) {
		super(el);
	}

	override public function update() {
		trace('SVGHeading update');
		var text = cast element.querySelector('[data-centered~="${Names.GROUP_EL_CENTERED}"]');
		text.setAttribute('x', '${width / 2}');
		text.setAttribute('y', '${height / 2}');
	}

	public static function create(x, y) {
		var _w = Config.GRID * 4;
		var _h = Config.GRID * 0.5;
		var _padX = Config.GRID * 0.25;
		var _padY = _h * 0.5;

		// group
		var group = Group.create(x, y);
		group.dataset.type = GROUP_TYPE;
		group.dataset.id = GROUP_HEADING;

		// rectangle
		var rect = svg.Rect.create(0, 0, _w, _h);
		rect.dataset.bg = Names.GROUP_EL_BG;
		group.appendChild(rect);

		// line
		var line = new svg.Line(_padX, _padY, (_w - _padX), _padY);
		line.stroke = ('#e5e3e2');
		line.strokeWidth = _h * .6;
		line.strokeLinecap = 'round';
		group.appendChild(line.child());

		// text
		var text = svg.Text.create('Heading', _w / 2, _h / 2);
		text.dataset.centered = Names.GROUP_EL_CENTERED;
		text.setAttribute('text-anchor', "middle");
		text.setAttribute('dominant-baseline', "central");
		group.appendChild(text);

		return (group);
	}
}
