import js.html.svg.SVGElement;
import js.html.SpanElement;
import js.html.Element;
import js.Browser.*;

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

			var rect = element.getBoundingClientRect();

			selection.style.left = rect.left + 'px';
			selection.style.top = rect.top + 'px';
			selection.style.width = rect.width + 'px';
			selection.style.height = rect.height + 'px';

			selection.style.display = 'block';
		}

		//
		stage.addEventListener('mouseover', function(event) {
			var target = event.target;
			updateSelection(target);
		});

		stage.addEventListener('mousedown', function(event) {
			var target = event.target;
			if (target.isSameNode(stage) == false) {
				trace('${target.tagName}');

				if (target.tagName == 'circle') {
					offset.x = Math.round(Std.parseFloat(target.getAttribute('cx')) - event.clientX);
					offset.y = Math.round(Std.parseFloat(target.getAttribute('cy')) - event.clientY);
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
				} else {
					selected.setAttribute('x', '${event.clientX + offset.x}');
					selected.setAttribute('y', '${event.clientY + offset.y}');
				}
				updateSelection(selected);
			}
		});
	}
}
