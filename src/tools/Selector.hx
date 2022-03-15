package tools;

import js.html.svg.SVGElement;
import js.html.DivElement;
import js.html.SpanElement;
import js.html.Element;
import js.Browser.*;

using StringTools;

class Selector {
	var stage:SVGElement;
	var selectionEl:SpanElement;
	var resizeEl:DivElement;
	var selected:SVGElement = null;
	var offset = {x: 0, y: 0};

	var _target:SVGElement;
	var isResizer = false;

	public function new(stage:SVGElement) {
		this.stage = stage;

		initResizer();
		initSelector();

		stage.onmouseover = function(e) {
			var target:SVGElement = isParentAGroup(e.target);
			_target = isParentAGroup(e.target);
			updateSelection(target);
		};

		stage.onmousedown = function(e) {
			// offset
			var target = isParentAGroup(e.target);
			if (target != null && target.isSameNode(stage) == false) {
				// trace('${target.tagName}');
				// trace('+++++> target: ' + target);
				if (target.tagName == 'circle') {
					offset.x = Math.round(Std.parseFloat(target.getAttribute('cx')) - e.clientX);
					offset.y = Math.round(Std.parseFloat(target.getAttribute('cy')) - e.clientY);
				} else if (target.tagName == 'g') {
					var tr = target.getAttribute('transform').replace('translate(', '').replace(')', '');
					var _x = tr.split(',')[0];
					var _y = tr.split(',')[1];
					offset.x = Math.round(Std.parseFloat(_x) - e.clientX);
					offset.y = Math.round(Std.parseFloat(_y) - e.clientY);
				} else {
					offset.x = Math.round(Std.parseFloat(target.getAttribute('x')) - e.clientX);
					offset.y = Math.round(Std.parseFloat(target.getAttribute('y')) - e.clientY);
				}
				_target = isParentAGroup(e.target);
				selected = target;
			}
		};

		stage.onmouseup = function(e) {
			// set on grid
			if (selected != null && !isResizer) {
				var _off = Config.GRID;
				var _x:Float = e.clientX + offset.x;
				var _y:Float = e.clientY + offset.y;
				_x = Math.round((e.clientX + offset.x) / _off) * _off;
				_y = Math.round((e.clientY + offset.y) / _off) * _off;
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
			selected = null;
		};

		window.onmousemove = function(e) {
			// move outside grid
			if (selected != null && !isResizer) {
				var _off = Config.GRID;
				var _x:Float = e.clientX + offset.x;
				var _y:Float = e.clientY + offset.y;
				// _x = Math.round((e.clientX + offset.x) / _off) * _off;
				// _y = Math.round((e.clientY + offset.y) / _off) * _off;
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
			// if (isResizer) {
			// 	trace('window.onmousemove');
			// 	var _off = 1; // Config.GRID;
			// 	var _x:Float = e.clientX + offset.x;
			// 	var _y:Float = e.clientY + offset.y;
			// 	_x = Math.round((e.clientX + offset.x) / _off) * _off;
			// 	_y = Math.round((e.clientY + offset.y) / _off) * _off;
			// 	if (selected.tagName == 'rect') {
			// 		selected.setAttribute('width', '${_x}');
			// 		selected.setAttribute('height', '${_y}');
			// 	}
			// 	updateSelection(selected);
			// }
		};
	}

	function initResizer() {
		this.resizeEl = cast document.createDivElement();
		resizeEl.className = 'svg-element-resizer';
		document.body.appendChild(resizeEl);

		resizeEl.onmouseover = function(e) {
			isResizer = true;
			// trace(e);
			// trace(_target);
			// trace(isResizer);
		}
		resizeEl.onmouseout = function(e) {
			isResizer = false;
			// trace(e);
			// trace(_target);
			// trace(isResizer);
		}
		resizeEl.onmousedown = function(e) {
			trace('resizeEl.onmousedown');
		}
		resizeEl.onmouseup = function(e) {
			trace('resizeEl.onmouseup');
		}
	}

	function initSelector() {
		this.selectionEl = cast document.createElement('span');
		selectionEl.style.position = 'absolute';
		selectionEl.style.display = 'block';
		selectionEl.style.outline = 'solid 2px #99f';
		selectionEl.style.pointerEvents = 'none';
		document.body.appendChild(selectionEl);
	}

	function updateSelection(element:SVGElement) {
		if (element == null || element.isSameNode(stage)) {
			selectionEl.style.display = 'none';
			return;
		}
		if (element.classList.contains(Style.IGNORE)) {
			selectionEl.style.display = 'none';
			return;
		}

		// trace(element.parentElement.nodeName);
		// trace(element.parentElement.nodeType);
		// trace(element.parentElement.nodeValue);

		var rect = element.getBoundingClientRect();

		// selectionEl
		selectionEl.style.left = rect.left + 'px';
		selectionEl.style.top = rect.top + 'px';
		selectionEl.style.width = rect.width + 'px';
		selectionEl.style.height = rect.height + 'px';
		selectionEl.style.display = 'block';

		// resizeEl
		resizeEl.style.left = (rect.left + rect.width) + 'px';
		resizeEl.style.top = (rect.top + rect.height) + 'px';
	}

	function isParentAGroup(target:SVGElement):SVGElement {
		if (target.classList.contains(Style.IGNORE)) {
			selected = null;
			return null;
		}
		if (target.nodeName == 'svg') {
			// trace(target.parentElement.nodeName); // g
			// target = cast target;
			// target = cast target;
			selected = null;
			return null;
		}
		if (target.parentElement.nodeName == 'svg') {
			target = cast target;
		}
		if (target.parentElement.nodeName == 'g') {
			// trace(target.parentElement.nodeName); // g
			target = cast target.parentElement;
		}
		return target;
	}
}
