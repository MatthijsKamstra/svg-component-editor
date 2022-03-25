package convert;

import utils.ColorUtil;
import utils.String2Node;
import shape.SVGCombo;
import js.html.svg.SVGElement;
import js.Browser.*;

using StringTools;

class ConvertSvg2Html {
	public function new(stage:SVGElement) {
		// trace(stage);
		// trace(stage.children);
		var html = '\n';
		html += '<section class="container">\n';
		// html += '  <div class="row">\n';

		var array:Array<SVGObject> = [];
		for (i in 0...stage.children.length) {
			var _target:SVGElement = cast stage.children[i];
			var _svgCombo:SVGCombo = SVGCombo.parse(_target);
			array.push({
				id: _svgCombo.element.dataset.id,
				x: _svgCombo.x,
				y: _svgCombo.y,
				width: _svgCombo.width,
				height: _svgCombo.height,
			});
		}
		console.log("array: ", array);
		// sort
		var copy = array.copy();
		copy.sort(function(a, b) {
			if (a.x < b.x)
				return -1;
			else if (a.x > b.x)
				return 1;
			else
				return 0;
		});
		console.log("Sort with array.sort()", copy);

		var structureObj = {};
		for (i in 0...copy.length) {
			var obj = copy[i];
			var row = 'row-${obj.y / Config.GRID}';
			if (!Reflect.hasField(structureObj, row)) {
				Reflect.setField(structureObj, row, {});
			}
			if (!Reflect.hasField(structureObj, row)) {
				Reflect.setField(structureObj, row, {});
			}
			var tObj = Reflect.getProperty(structureObj, row);
			var col = 'col-${obj.x / Config.GRID}';
			if (!Reflect.hasField(tObj, col)) {
				Reflect.setField(tObj, col, []);
			}
			var arr:Array<SVGObject> = Reflect.getProperty(tObj, col);
			if (obj.id == Names.GROUP_HEADING) {
				// trace('xxxxx');
				arr.unshift(obj);
			} else {
				arr.push(obj);
			}
			Reflect.setField(tObj, col, arr);
		}

		console.log(structureObj);

		for (i in Reflect.fields(structureObj)) {
			var obj = Reflect.field(structureObj, i);
			html += '  <div class="row">\n';
			console.log('---> ');
			console.log(i);
			console.log(obj);
			for (j in Reflect.fields(obj)) {
				var arr = Reflect.field(obj, j);
				console.log(arr);
				var __obj:SVGObject = arr[0];
				html += '    <div class="col-${__obj.width / Config.GRID}">';
				for (i in 0...arr.length) {
					var obj = arr[i];
					trace(obj);
					html += '${convert(obj)}';
				}
				html += '</div>';
				html += '\n';
			}
			html += '  </div>';
		}

		// for (i in 0...copy.length) {
		// 	var obj = copy[i];
		// 	html += '    <div class="col-${obj.width / Config.GRID}">';
		// 	html += '${convert(obj)}';
		// 	html += '</div>';
		// 	html += '\n';
		// }

		// html += '  </div>\n';
		html += '</section>\n';

		console.log(html);

		document.body.appendChild(String2Node.parse(html));
	}

	function convert(obj:SVGObject):String {
		var str = '';
		switch (obj.id) {
			case Names.GROUP_HEADING:
				str = '<h1>Heading1</h1>';
			case Names.GROUP_PARAGRAPH:
				str = '<p>Paragraph</p>';
			case Names.GROUP_RECT:
				str = '<div style="display: flex; justify-content: center; align-items: center; background-color: ${ColorUtil.randomColor()}; width: ${obj.width}px;height: ${obj.height}px;">Rectangle</div>';
			case Names.GROUP_IMAGE:
				str = '<img src="https://picsum.photos/${obj.width}/${obj.height}" alt="" title=""class="img-fluid" />';
			default:
				trace("case '" + obj.id + "': trace ('" + obj.id + "');");
		}
		return str;
	}
}

typedef SVGObject = {
	var id:String;
	var x:Float;
	var y:Float;
	var width:Float;
	var height:Float;
}
