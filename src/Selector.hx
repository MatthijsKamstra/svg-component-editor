import js.html.svg.SVGElement;
import js.html.SpanElement;
import js.html.Element;
import js.Browser.*;

using StringTools;

class Selector {
	public function new(stage:SVGElement) {
		var selection:SpanElement = cast document.createElement('span');

		selection.style.position = 'absolute';
		selection.style.display = 'block';
		selection.style.outline = 'solid 2px #99f';
		selection.style.pointerEvents = 'none';
		document.body.appendChild(selection);
		//

		var selected:SVGElement = null;
		var offset = {x: 0, y: 0};

		function updateSelection(element:SVGElement) {
			if (element.isSameNode(stage)) {
				selection.style.display = 'none';
				return;
			}
			if (element.classList.contains(Config.IGNORE)) {
				selection.style.display = 'none';
				return;
			}
			if (element.classList.contains(Config.IGNORE)) {
				selection.style.display = 'none';
				return;
			}

			trace(element.parentElement.nodeName);
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

		//
		stage.addEventListener('mouseover', function(event) {
			var target:SVGElement = isParentAGroup(event.target);
			updateSelection(target);
		});

		stage.addEventListener('mousedown', function(event) {
			var target = isParentAGroup(event.target);
			if (target.isSameNode(stage) == false) {
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
				if (selected.tagName == 'circle') {
					selected.setAttribute('cx', '${event.clientX + offset.x}');
					selected.setAttribute('cy', '${event.clientY + offset.y}');
				} else if (selected.tagName == 'g') {
					selected.setAttribute('transform', 'translate(${event.clientX + offset.x},${event.clientY + offset.y})');
				} else {
					selected.setAttribute('x', '${event.clientX + offset.x}');
					selected.setAttribute('y', '${event.clientY + offset.y}');
				}
				updateSelection(selected);
			}
		});
	}
}
