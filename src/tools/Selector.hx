package tools;

import shape.SVGRectangle;
import shape.SVGButton;
import shape.SVGCombo;
import shape.SVGImage;
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
	var xoffset = {x: 0, y: 0};

	var _target:SVGElement;
	var isResizer = false;

	var isSnap2Grid = true;
	var _off = 1.0;

	public function new(stage:SVGElement) {
		this.stage = stage;

		if (isSnap2Grid) {
			_off = Config.GRID;
		}

		initResizerElement();
		initSelectorElement();

		stage.onmouseover = function(e) {
			var target:SVGElement = isParentAGroup(e.target);
			_target = isParentAGroup(e.target);
			updateSelectionElement(target);
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
			if (selected != null && !isResizer) {
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
				updateSelectionElement(selected);
			}
			selected = null;
		};

		window.onmousemove = function(e) {
			// move outside grid
			if (selected != null && !isResizer) {
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
				updateSelectionElement(selected);
			}

			if (isResizer) {
				if (_target == null) {
					isResizer = false;
					return;
				}

				trace('window.onmousemove');
				trace(isResizer);
				// trace("selected: " + selected);
				// trace("_target: " + _target);
				// if (_target.tagName == 'rect') {
				// 	trace('rect');
				// }
				// var _off = 1; // Config.GRID;
				// var _x:Float = e.clientX + offset.x;
				// var _y:Float = e.clientY + offset.y;
				// _x = Math.round((e.clientX + offset.x) / _off) * _off;
				// _y = Math.round((e.clientY + offset.y) / _off) * _off;

				// offset.x = Math.round(Std.parseFloat(_target.getAttribute('x')) - e.clientX);
				// offset.y = Math.round(Std.parseFloat(_target.getAttribute('y')) - e.clientY);
				var clientX = Math.round(e.clientX);
				var clientY = Math.round(e.clientY);

				if (_target.tagName == 'rect') {
					// var _x = Math.round(Std.parseFloat(_target.getAttribute('x')));
					// var _y = Math.round(Std.parseFloat(_target.getAttribute('y')));
					// var _w = Math.round(Std.parseFloat(_target.getAttribute('width')));
					// var _h = Math.round(Std.parseFloat(_target.getAttribute('height')));
					// //
					// // var _xx = (e.clientX + offset.x);
					// // var _yy = (e.clientY + offset.y);
					// //
					// // var _ww = (_xx + _w);
					// // var _hh = (_yy + _h);

					// // _target.setAttribute('width', '${_x}');
					// // _target.setAttribute('height', '${_y}');

					// // offset.x = Math.round(Std.parseFloat(target.getAttribute('x')) - e.clientX);
					// // offset.y = Math.round(Std.parseFloat(target.getAttribute('y')) - e.clientY);

					// console.group('x');
					// console.log(_target);
					// console.log(xoffset);
					// console.log('target x: ' + _x + ', y:  ' + _y + ', width: ' + _w + ', height: ' + _h);
					// console.log('clientX: ' + e.clientX + ', clientY: ' + e.clientY);
					// console.log('new w: ' + -(xoffset.x - e.clientX) + ', new h: ' + -(xoffset.y - e.clientY));
					// // console.log('xx: ' + _xx + ', yy: ' + _yy);
					// // console.log('new w: ' + (_ww - _xx) + ', new h: ' + (_hh - _yy));
					// console.groupEnd();

					_target.setAttribute('width', '${- Math.round(xoffset.x - clientX)}');
					_target.setAttribute('height', '${- Math.round(xoffset.y - clientY)}');
				}
				if (_target.dataset.type == Names.GROUP_TYPE) {
					var _svgCombo:SVGCombo = new SVGCombo(_target);
					_svgCombo.bg.setAttribute('width', '${- Math.round(xoffset.x - clientX)}');
					_svgCombo.bg.setAttribute('height', '${- Math.round(xoffset.y - clientY)}');
				}
				updateSelectionElement(_target);
			}
			// trace('x: ' + e.clientX + ', y: ' + e.clientY);
		};
	}

	function initResizerElement() {
		this.resizeEl = cast document.createDivElement();
		resizeEl.className = 'svg-element-resizer';
		document.body.appendChild(resizeEl);

		resizeEl.onmouseover = function(e) {
			if (_target == null) {
				// isResizer = false;
				resizeEl.classList.remove('show');
				return;
			}
			// isResizer = true;
			if (_target.dataset.type == Names.GROUP_TYPE)
				resizeEl.classList.add('show');
		}
		resizeEl.onmouseout = function(e) {
			// isResizer = false;
			resizeEl.classList.remove('show');
		}
		resizeEl.onmousedown = function(e) {
			trace('resizeEl.onmousedown');
			isResizer = true;
			xoffset.x = Math.round(e.clientX - Std.parseFloat(_target.getAttribute('width')));
			xoffset.y = Math.round(e.clientY - Std.parseFloat(_target.getAttribute('height')));

			if (_target.dataset.type == Names.GROUP_TYPE) {
				var _svgCombo:SVGCombo = new SVGCombo(_target);
				xoffset.x = Math.round(e.clientX - _svgCombo.width);
				xoffset.y = Math.round(e.clientY - _svgCombo.height);
			}
			trace(xoffset);
		}

		resizeEl.onmouseup = function(e) {
			trace('resizeEl.onmouseup');
			if (isResizer) {
				var _w = Std.parseFloat(_target.getAttribute('width'));
				var _h = Std.parseFloat(_target.getAttribute('height'));
				_target.setAttribute('width', '${Math.round(_w / _off) * _off}');
				_target.setAttribute('height', '${Math.round(_h / _off) * _off}');
				if (_target.dataset.type == Names.GROUP_TYPE) {
					var _svgCombo:SVGCombo = new SVGCombo(_target);
					_svgCombo.bg.setAttribute('width', '${Math.round(_svgCombo.width / _off) * _off}');
					_svgCombo.bg.setAttribute('height', '${Math.round(_svgCombo.height / _off) * _off}');
				}
				updateSelectionElement(_target);
			}
			isResizer = false;
		}
	}

	function initSelectorElement() {
		this.selectionEl = cast document.createElement('span');
		selectionEl.style.position = 'absolute';
		selectionEl.style.display = 'block';
		selectionEl.style.outline = 'solid 2px #99f';
		selectionEl.style.pointerEvents = 'none';
		document.body.appendChild(selectionEl);
	}

	function updateSelectionElement(element:SVGElement) {
		if (element == null || element.isSameNode(stage)) {
			selectionEl.style.display = 'none';
			return;
		}
		if (element.classList.contains(Style.IGNORE)) {
			selectionEl.style.display = 'none';
			return;
		}

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

		if (element.dataset.type == Names.GROUP_TYPE) {
			switch (element.dataset.id) {
				case Names.GROUP_IMAGE:
					var _svgCombo:SVGImage = new SVGImage(element);
					_svgCombo.update();
				case Names.GROUP_BTN:
					var _svgCombo:SVGButton = new SVGButton(element);
					_svgCombo.update();
				case Names.GROUP_RECT:
					var _svgCombo:SVGRectangle = new SVGRectangle(element);
					_svgCombo.update();
				default:
					// trace("case '" + element.dataset.id + "': trace ('" + element.dataset.id + "');");
					var _svgCombo:SVGCombo = new SVGCombo(element);
					_svgCombo.update();
			}

			if (element.dataset.id == Names.GROUP_IMAGE) {} else {}
		}
	}

	function isParentAGroup(target:SVGElement):SVGElement {
		if (target.classList.contains(Style.IGNORE)) {
			selected = null;
			return null;
		}
		if (target.nodeName == 'svg') {
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
