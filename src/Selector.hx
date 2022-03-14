import js.html.svg.SVGElement;
import js.html.SpanElement;
import js.html.Element;
import js.Browser.*;

using StringTools;

class Selector {
	var stage:SVGElement;
	var selection:SpanElement;
	var selected:SVGElement = null;
	var offset = {x: 0, y: 0};

	public function new(stage:SVGElement) {
		this.stage = stage;

		this.selection = cast document.createElement('span');
		selection.style.position = 'absolute';
		selection.style.display = 'block';
		selection.style.outline = 'solid 2px #99f';
		selection.style.pointerEvents = 'none';
		document.body.appendChild(selection);

		stage.addEventListener('mouseover', function(event) {
			var target:SVGElement = isParentAGroup(event.target);
			updateSelection(target);
		});

		stage.addEventListener('mousedown', function(event) {
			var target = isParentAGroup(event.target);
			if (target != null && target.isSameNode(stage) == false) {
				// trace('${target.tagName}');
				if (target.tagName == 'circle') {
					offset.x = Math.round(Std.parseFloat(target.getAttribute('cx')) - event.clientX);
					offset.y = Math.round(Std.parseFloat(target.getAttribute('cy')) - event.clientY);
				} else if (target.tagName == 'g') {
					var tr = target.getAttribute('transform').replace('translate(', '').replace(')', '');
					var _x = tr.split(',')[0];
					var _y = tr.split(',')[1];
					offset.x = Math.round(Std.parseFloat(_x) - event.clientX);
					offset.y = Math.round(Std.parseFloat(_y) - event.clientY);
				} else {
					offset.x = Math.round(Std.parseFloat(target.getAttribute('x')) - event.clientX);
					offset.y = Math.round(Std.parseFloat(target.getAttribute('y')) - event.clientY);
				}
				selected = target;
			}
		});

		stage.addEventListener('mouseup', function(event) {
			selected = null;
		});

		window.addEventListener('mousemove', function(event) {
			if (selected != null) {
				var _off = Config.GRID;
				var _x:Float = event.clientX + offset.x;
				var _y:Float = event.clientY + offset.y;
				_x = Math.round((event.clientX + offset.x) / _off) * _off;
				_y = Math.round((event.clientY + offset.y) / _off) * _off;
				if (selected.tagName == 'circle') {
					selected.setAttribute('cx', '${_x}');
					selected.setAttribute('cy', '${_y}');
				} else if (selected.tagName == 'g') {
					selected.setAttribute('transform', 'translate(${_x},${_y})');
				} else {
					selected.setAttribute('x', '${_x}');
					selected.setAttribute('y', '${_y}');
				}
				updateSelection(selected);
			}
		});
	}

	function updateSelection(element:SVGElement) {
		if (element == null || element.isSameNode(stage)) {
			selection.style.display = 'none';
			return;
		}
		if (element.classList.contains(Names.IGNORE)) {
			selection.style.display = 'none';
			return;
		}

		// trace(element.parentElement.nodeName);
		// trace(element.parentElement.nodeType);
		// trace(element.parentElement.nodeValue);

		var rect = element.getBoundingClientRect();

		selection.style.left = rect.left + 'px';
		selection.style.top = rect.top + 'px';
		selection.style.width = rect.width + 'px';
		selection.style.height = rect.height + 'px';

		selection.style.display = 'block';
	}

	function isParentAGroup(target:SVGElement):SVGElement {
		if (target.classList.contains(Names.IGNORE)) {
			selected = null;
			return null;
		}
		if (target.parentElement.nodeName == 'svg') {
			// trace(target.parentElement.nodeName); // g
			target = cast target;
		}
		if (target.parentElement.nodeName == 'g') {
			// trace(target.parentElement.nodeName); // g
			target = cast target.parentElement;
		}
		return target;
	}
}
