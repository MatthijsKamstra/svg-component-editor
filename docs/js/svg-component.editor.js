(function ($global) { "use strict";
function $extend(from, fields) {
	var proto = Object.create(from);
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var Config = function() { };
var Main = function() {
	this.HEIGHT = Config.HEIGHT;
	this.WIDTH = Config.WIDTH;
	$global.console.info("Svg-component-editor");
	this.init();
};
Main.main = function() {
	var app = new Main();
};
Main.prototype = {
	init: function() {
		var title = window.document.getElementById("title");
		var wireframe = window.document.getElementById("wireframe");
		var btnHeading = window.document.getElementById("js-createHeading");
		var btnParagraph = window.document.getElementById("js-createParagraph");
		var btnRect = window.document.getElementById("js-createRectangle");
		var btnImage = window.document.getElementById("js-createImage");
		var btnButton = window.document.getElementById("js-createButton");
		var load = window.document.getElementById("load");
		var save = window.document.getElementById("save");
		var clear = window.document.getElementById("clear");
		var btnConvert = window.document.getElementById("js-svg2html");
		var btnTestConvert = window.document.getElementById("js-svg2html-test");
		var stage = window.document.getElementById("stage");
		var stageGrid = window.document.getElementById("js-grid");
		var textarea = window.document.getElementById("textarea");
		var editor = new tools_Editor(stage);
		editor.setSource(new tools_Source(textarea));
		var selector = new tools_Selector(stage);
		this.setupGrid(stageGrid);
		wireframe.addEventListener("change",function() {
			stage.classList.toggle("wireframe");
		});
		btnRect.onclick = function() {
			var elGroup = new shape_SVGRectangle(Config.GRID,Config.GRID);
			editor.addElement(elGroup.get_group());
		};
		btnImage.onclick = function() {
			var elGroup = new shape_SVGImage(Config.GRID,Config.GRID);
			editor.addElement(elGroup.get_group());
		};
		btnButton.onclick = function() {
			var elGroup = new shape_SVGButton(Config.GRID,Config.GRID);
			editor.addElement(elGroup.get_group());
		};
		btnHeading.onclick = function() {
			var elGroup = new shape_SVGHeading(Config.GRID,Config.GRID);
			editor.addElement(elGroup.get_group());
		};
		btnParagraph.onclick = function() {
			var elGroup = new shape_SVGParagraph(Config.GRID,Config.GRID);
			editor.addElement(elGroup.get_group());
		};
		btnConvert.onclick = function() {
			var c = new convert_ConvertSvg2Html(stage);
		};
		btnTestConvert.onclick = function() {
			console.log("src/Main.hx:137:","add dummy");
			editor.addElement(new shape_SVGRectangle(Config.GRID * 6,Config.GRID,Config.GRID * 3).get_group());
			editor.addElement(new shape_SVGImage(Config.GRID * 9,Config.GRID,Config.GRID * 3).get_group());
			editor.addElement(new shape_SVGParagraph(Config.GRID * 0,Config.GRID,Config.GRID * 6).get_group());
			editor.addElement(new shape_SVGHeading(Config.GRID * 0,Config.GRID,Config.GRID * 6).get_group());
			console.log("src/Main.hx:142:","convert");
			var c = new convert_ConvertSvg2Html(stage);
		};
		var form = window.document.createElement("form");
		form.style.display = "none";
		window.document.body.appendChild(form);
		var input = window.document.createElement("input");
		input.type = "file";
		input.addEventListener("change",function(event) {
			var file = input.files[0];
			title.value = file.name.split(".")[0];
			var reader = new FileReader();
			reader.addEventListener("load",function(event) {
				var contents = event.target.result;
				editor.setSVG(new DOMParser().parseFromString(contents,"image/svg+xml"));
			},false);
			reader.readAsText(file);
			form.reset();
		});
		form.appendChild(input);
		load.addEventListener("click",function() {
			input.click();
		});
		var link = window.document.createElement("a");
		link.style.display = "none";
		window.document.body.appendChild(link);
		save.addEventListener("click",function() {
			var blob = new Blob([editor.toString()],{ type : "text/plain"});
			link.href = URL.createObjectURL(blob);
			link.download = title.value + ".svg";
			link.click();
		});
		clear.addEventListener("click",function() {
			editor.clear();
		});
	}
	,setupGrid: function(stage) {
		var group = svg_Group.create(0,0);
		group.id = "group-grid";
		group.classList.add(Style.IGNORE);
		var gridW = this.WIDTH / 12;
		var _g = 0;
		while(_g < 13) {
			var i = _g++;
			var line = svg_Line.vertical(Math.round(i * gridW),0,this.HEIGHT);
			line.classList.add(Style.IGNORE);
			group.appendChild(line);
			var _g1 = 0;
			while(_g1 < 13) {
				var j = _g1++;
				var circle = svg_Circle.create(Math.round(i * gridW),Math.round(j * gridW),1);
				circle.classList.add(Style.IGNORE);
				group.appendChild(circle);
			}
		}
		stage.appendChild(group);
	}
};
var Reflect = function() { };
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( _g ) {
		return null;
	}
};
Reflect.getProperty = function(o,field) {
	var tmp;
	if(o == null) {
		return null;
	} else {
		var tmp1;
		if(o.__properties__) {
			tmp = o.__properties__["get_" + field];
			tmp1 = tmp;
		} else {
			tmp1 = false;
		}
		if(tmp1) {
			return o[tmp]();
		} else {
			return o[field];
		}
	}
};
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o,f)) {
			a.push(f);
		}
		}
	}
	return a;
};
var StringTools = function() { };
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
};
var Style = function() { };
var convert_ConvertSvg2Html = function(stage) {
	this.lorum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
	var html = "\n";
	html += "<section class=\"container\">\n";
	var array = [];
	var _g = 0;
	var _g1 = stage.children.length;
	while(_g < _g1) {
		var i = _g++;
		var _target = stage.children[i];
		var _svgCombo = shape_SVGCombo.parse(_target);
		array.push({ id : _svgCombo.get_element().dataset.id, x : _svgCombo.get_x(), y : _svgCombo.get_y(), width : _svgCombo.get_width(), height : _svgCombo.get_height()});
	}
	$global.console.log("array: ",array);
	var copy = array.slice();
	copy.sort(function(a,b) {
		if(a.x < b.x) {
			return -1;
		} else if(a.x > b.x) {
			return 1;
		} else {
			return 0;
		}
	});
	$global.console.log("Sort with array.sort()",copy);
	var structureObj = { };
	var _g = 0;
	var _g1 = copy.length;
	while(_g < _g1) {
		var i = _g++;
		var obj = copy[i];
		var row = "row-" + obj.y / Config.GRID;
		if(!Object.prototype.hasOwnProperty.call(structureObj,row)) {
			structureObj[row] = { };
		}
		if(!Object.prototype.hasOwnProperty.call(structureObj,row)) {
			structureObj[row] = { };
		}
		var tObj = Reflect.getProperty(structureObj,row);
		var col = "col-" + obj.x / Config.GRID;
		if(!Object.prototype.hasOwnProperty.call(tObj,col)) {
			tObj[col] = [];
		}
		var arr = Reflect.getProperty(tObj,col);
		if(obj.id == "group-heading") {
			arr.unshift(obj);
		} else {
			arr.push(obj);
		}
		tObj[col] = arr;
	}
	$global.console.log(structureObj);
	var _g = 0;
	var _g1 = Reflect.fields(structureObj);
	while(_g < _g1.length) {
		var i = _g1[_g];
		++_g;
		var obj = Reflect.field(structureObj,i);
		html += "  <div class=\"row\">\n";
		var _g2 = 0;
		var _g3 = Reflect.fields(obj);
		while(_g2 < _g3.length) {
			var j = _g3[_g2];
			++_g2;
			var arr = Reflect.field(obj,j);
			var __obj = arr[0];
			html += "    <div class=\"col-" + __obj.width / Config.GRID + "\">";
			var _g4 = 0;
			var _g5 = arr.length;
			while(_g4 < _g5) {
				var i1 = _g4++;
				var obj1 = arr[i1];
				html += "" + this.convert(obj1);
			}
			html += "</div>";
			html += "\n";
		}
		html += "  </div>";
	}
	html += "</section>\n";
	$global.console.log(html);
	window.document.body.appendChild(utils_String2Node.parse(html));
};
convert_ConvertSvg2Html.prototype = {
	convert: function(obj) {
		var str = "";
		switch(obj.id) {
		case "group-heading":
			str = "<h2>Heading2</h2>";
			break;
		case "group-image":
			str = "<img src=\"https://picsum.photos/" + obj.width + "/" + obj.height + "\" alt=\"\" title=\"\"class=\"img-fluid\" />";
			break;
		case "group-paragraph":
			str = "<p>" + this.lorum + "</p>";
			break;
		case "group-rect":
			str = "<div style=\"display:flex;justify-content:center;align-items:center;background-color:" + utils_ColorUtil.randomColor() + ";width:" + obj.width + "px;min-height:" + obj.height + "px;height:100%;\">Rectangle</div>";
			break;
		default:
			console.log("src/convert/ConvertSvg2Html.hx:121:","case '" + obj.id + "': trace ('" + obj.id + "');");
		}
		return str;
	}
};
var haxe_iterators_ArrayIterator = function(array) {
	this.current = 0;
	this.array = array;
};
haxe_iterators_ArrayIterator.prototype = {
	hasNext: function() {
		return this.current < this.array.length;
	}
	,next: function() {
		return this.array[this.current++];
	}
};
var shape_SVGCombo = function(x,y,w,h) {
	this.set_x(x);
	this.set_y(y);
	this.set_width(w != null ? w : Config.GRID * 2);
	this.set_height(h != null ? h : Config.GRID * 2);
	this.create(this.get_x(),this.get_y(),this.get_width(),this.get_height());
};
shape_SVGCombo.parse = function(el) {
	var rect = el.getBoundingClientRect();
	var width = rect.width;
	var height = rect.height;
	var x = rect.left;
	var y = rect.top;
	if(el.getAttribute("transform") != null) {
		var tr = StringTools.replace(StringTools.replace(el.getAttribute("transform"),"translate(",""),")","");
		x = parseFloat(tr.split(",")[0]);
		y = parseFloat(tr.split(",")[1]);
	}
	var svgCombo = new shape_SVGCombo(x,y,width,height);
	svgCombo.set_bg(el.querySelector("[data-bg~=\"" + "group-element-bg" + "\"]"));
	svgCombo.set_width(parseFloat(svgCombo.get_bg().getAttribute("width")));
	svgCombo.set_height(parseFloat(svgCombo.get_bg().getAttribute("height")));
	svgCombo.set_element(el);
	svgCombo.set_group(el);
	return svgCombo;
};
shape_SVGCombo.prototype = {
	create: function(x,y,w,h) {
		console.log("src/shape/SVGCombo.hx:28:","SVGCombo - create");
	}
	,update: function() {
		console.log("src/shape/SVGCombo.hx:32:","SVGCombo - update");
	}
	,get_width: function() {
		return this.width;
	}
	,set_width: function(value) {
		return this.width = value;
	}
	,get_height: function() {
		return this.height;
	}
	,set_height: function(value) {
		return this.height = value;
	}
	,get_bg: function() {
		return this.bg;
	}
	,set_bg: function(value) {
		return this.bg = value;
	}
	,get_element: function() {
		return this.element;
	}
	,set_element: function(value) {
		return this.element = value;
	}
	,get_group: function() {
		return this.group;
	}
	,set_group: function(value) {
		return this.group = value;
	}
	,get_y: function() {
		return this.y;
	}
	,set_y: function(value) {
		return this.y = value;
	}
	,get_x: function() {
		return this.x;
	}
	,set_x: function(value) {
		return this.x = value;
	}
	,__properties__: {set_height:"set_height",get_height:"get_height",set_width:"set_width",get_width:"get_width",set_y:"set_y",get_y:"get_y",set_x:"set_x",get_x:"get_x",set_group:"set_group",get_group:"get_group",set_element:"set_element",get_element:"get_element",set_bg:"set_bg",get_bg:"get_bg"}
};
var shape_SVGButton = function(x,y,w,h) {
	shape_SVGCombo.call(this,x,y,w,h);
	var text = this.get_element().querySelector("[data-centered~=\"" + "group-element-centered" + "\"]");
	var tmp = "" + this.get_width() / 2;
	text.setAttribute("x",tmp);
	var tmp = "" + this.get_height() / 2;
	text.setAttribute("y",tmp);
};
shape_SVGButton.__super__ = shape_SVGCombo;
shape_SVGButton.prototype = $extend(shape_SVGCombo.prototype,{
	create: function(x,y,w,h) {
		var group = svg_Group.create(x,y);
		group.dataset.type = "group-type-svgcombo";
		group.dataset.id = "group-btn";
		var rect = svg_Rect.create(0,0,100,Config.GRID * 0.5);
		rect.dataset.bg = "group-element-bg";
		group.appendChild(rect);
		var text = svg_Text.create("Submit",50.,Config.GRID * 0.25);
		text.dataset.centered = "group-element-centered";
		text.setAttribute("text-anchor","middle");
		text.setAttribute("dominant-baseline","central");
		group.appendChild(text);
		this.set_group(group);
	}
});
var shape_SVGHeading = function(x,y,w,h) {
	shape_SVGCombo.call(this,x,y,w,h);
};
shape_SVGHeading.__super__ = shape_SVGCombo;
shape_SVGHeading.prototype = $extend(shape_SVGCombo.prototype,{
	update: function() {
		console.log("src/shape/SVGHeading.hx:13:","SVGHeading update");
		var text = this.get_element().querySelector("[data-centered~=\"" + "group-element-centered" + "\"]");
		var tmp = "" + this.get_width() / 2;
		text.setAttribute("x",tmp);
		var tmp = "" + this.get_height() / 2;
		text.setAttribute("y",tmp);
	}
	,create: function(x,y,w,h) {
		var _w = Config.GRID * 4;
		var _h = Config.GRID * 0.5;
		var _padX = Config.GRID * 0.25;
		var _padY = _h * 0.5;
		var group = svg_Group.create(x,y);
		group.dataset.type = "group-type-svgcombo";
		group.dataset.id = "group-heading";
		var rect = svg_Rect.create(0,0,w,_h);
		rect.dataset.bg = "group-element-bg";
		group.appendChild(rect);
		var line = new svg_Line(_padX,_padY,w - _padX,_padY);
		line.set_stroke("#e5e3e2");
		line.set_strokeWidth(_h * .6);
		line.set_strokeLinecap("round");
		group.appendChild(line.child());
		var text = svg_Text.create("Heading",w / 2,_h / 2);
		text.dataset.centered = "group-element-centered";
		text.setAttribute("text-anchor","middle");
		text.setAttribute("dominant-baseline","central");
		group.appendChild(text);
		this.set_group(group);
	}
});
var shape_SVGImage = function(x,y,w,h) {
	shape_SVGCombo.call(this,x,y,w,h);
};
shape_SVGImage.__super__ = shape_SVGCombo;
shape_SVGImage.prototype = $extend(shape_SVGCombo.prototype,{
	create: function(x,y,w,h) {
		var gr = svg_Group.create(x,y);
		gr.dataset.type = "group-type-svgcombo";
		gr.dataset.id = "group-image";
		var rect = svg_Rect.create(0,0,w,h);
		rect.dataset.bg = "group-element-bg";
		rect.style.fill = utils_ColorUtil.randomColor();
		gr.appendChild(rect);
		var text = svg_Text.create("Image",w * 0.5,h * 0.5);
		text.dataset.centered = "group-element-centered";
		text.setAttribute("text-anchor","middle");
		text.setAttribute("dominant-baseline","central");
		gr.appendChild(text);
		this.set_group(gr);
	}
	,update: function() {
		console.log("src/shape/SVGImage.hx:53:","SVGImage update");
		var text = this.get_element().querySelector("[data-centered~=\"" + "group-element-centered" + "\"]");
		var tmp = "" + this.get_width() / 2;
		text.setAttribute("x",tmp);
		var tmp = "" + this.get_height() / 2;
		text.setAttribute("y",tmp);
	}
});
var shape_SVGParagraph = function(x,y,w,h) {
	shape_SVGCombo.call(this,x,y,w,h);
};
shape_SVGParagraph.__super__ = shape_SVGCombo;
shape_SVGParagraph.prototype = $extend(shape_SVGCombo.prototype,{
	update: function() {
		console.log("src/shape/SVGParagraph.hx:13:","SVGParagraph update");
		var text = this.get_element().querySelector("[data-centered~=\"" + "group-element-centered" + "\"]");
		var tmp = "" + this.get_width() / 2;
		text.setAttribute("x",tmp);
		var tmp = "" + this.get_height() / 2;
		text.setAttribute("y",tmp);
		var gr = this.get_element().querySelector("[data-type~=\"foo\"]");
	}
	,create: function(x,y,w,h) {
		var _w = Config.GRID * 4;
		var _h = Config.GRID * 2;
		var _padX = Config.GRID * 0.25;
		var _padY = _h * 0.5;
		var group = svg_Group.create(x,y);
		group.dataset.type = "group-type-svgcombo";
		group.dataset.id = "group-paragraph";
		var rect = svg_Rect.create(0,0,w,h);
		rect.dataset.bg = "group-element-bg";
		group.appendChild(rect);
		var total = Math.floor(h / _padX);
		var gr = new svg_Group();
		gr.set_dataType("foo");
		gr.element.classList.add(Style.IGNORE);
		var _g = 1;
		var _g1 = total;
		while(_g < _g1) {
			var i = _g++;
			var __p = _padX * i;
			var line = new svg_Line(_padX,__p,w - _padX,__p);
			line.set_stroke("#e5e3e2");
			line.set_strokeWidth(8);
			line.set_strokeLinecap("round");
			gr.appendChild(line.get_element());
		}
		group.appendChild(gr.element);
		var text = svg_Text.create("Paragraph",w / 2,h / 2);
		text.dataset.centered = "group-element-centered";
		text.setAttribute("text-anchor","middle");
		text.setAttribute("dominant-baseline","central");
		group.appendChild(text);
		this.set_group(group);
	}
});
var shape_SVGRectangle = function(x,y,w,h) {
	shape_SVGCombo.call(this,x,y,w,h);
};
shape_SVGRectangle.__super__ = shape_SVGCombo;
shape_SVGRectangle.prototype = $extend(shape_SVGCombo.prototype,{
	create: function(x,y,w,h) {
		var gr = svg_Group.create(x,y);
		gr.dataset.type = "group-type-svgcombo";
		gr.dataset.id = "group-rect";
		var rect = svg_Rect.create(0,0,w,h);
		rect.dataset.bg = "group-element-bg";
		rect.style.fill = utils_ColorUtil.randomColor();
		gr.appendChild(rect);
		this.set_group(gr);
	}
});
var svg_Circle = function() { };
svg_Circle.create = function(x,y,r) {
	if(r == null) {
		r = 100;
	}
	if(y == null) {
		y = 0;
	}
	if(x == null) {
		x = 0;
	}
	var element = window.document.createElementNS(svg_Default.NS,"circle");
	element.setAttribute("cx","" + x);
	element.setAttribute("cy","" + y);
	element.setAttribute("r","" + r);
	element.style.stroke = "black";
	element.style.fill = "silver";
	return element;
};
var svg_Default = function() { };
var svg_Group = function(x,y) {
	if(y == null) {
		y = 0;
	}
	if(x == null) {
		x = 0;
	}
	this.element = window.document.createElementNS(svg_Default.NS,"g");
	this.element.setAttribute("transform","translate(" + x + "," + y + ")");
};
svg_Group.create = function(x,y) {
	if(y == null) {
		y = 0;
	}
	if(x == null) {
		x = 0;
	}
	var gr = new svg_Group(x,y);
	return gr.element;
};
svg_Group.prototype = {
	appendChild: function(el) {
		this.element.appendChild(el);
	}
	,set_dataType: function(value) {
		this.element.dataset.type = value;
		return this.dataType = value;
	}
	,__properties__: {set_dataType:"set_dataType"}
};
var svg_Line = function(x1,y1,x2,y2) {
	if(y1 == null) {
		y1 = 0;
	}
	if(x1 == null) {
		x1 = 0;
	}
	this.set_element(window.document.createElementNS(svg_Default.NS,"line"));
	this.get_element().setAttribute("x1","" + x1);
	this.get_element().setAttribute("y1","" + y1);
	this.get_element().setAttribute("x2","" + x2);
	this.get_element().setAttribute("y2","" + y2);
	this.get_element().setAttribute("stroke","green");
};
svg_Line.create = function(x1,y1,x2,y2) {
	if(y1 == null) {
		y1 = 0;
	}
	if(x1 == null) {
		x1 = 0;
	}
	var element = window.document.createElementNS(svg_Default.NS,"line");
	element.setAttribute("x1","" + x1);
	element.setAttribute("y1","" + y1);
	element.setAttribute("x2","" + x2);
	element.setAttribute("y2","" + y2);
	element.style.stroke = "blue";
	return element;
};
svg_Line.vertical = function(x,y,length) {
	if(length == null) {
		length = 100;
	}
	if(y == null) {
		y = 0;
	}
	if(x == null) {
		x = 0;
	}
	return svg_Line.create(x,y,x,y + length);
};
svg_Line.prototype = {
	child: function() {
		return this.get_element();
	}
	,get_element: function() {
		return this.element;
	}
	,set_element: function(value) {
		return this.element = value;
	}
	,set_stroke: function(value) {
		this.get_element().setAttribute("stroke","" + value);
		return this.stroke = value;
	}
	,set_strokeLinecap: function(value) {
		this.get_element().setAttribute("stroke-linecap","" + value);
		return this.strokeLinecap = value;
	}
	,set_strokeWidth: function(value) {
		this.get_element().setAttribute("stroke-width","" + value);
		return this.strokeWidth = value;
	}
	,__properties__: {set_strokeLinecap:"set_strokeLinecap",set_strokeWidth:"set_strokeWidth",set_stroke:"set_stroke",set_element:"set_element",get_element:"get_element"}
};
var svg_Rect = function() { };
svg_Rect.create = function(x,y,w,h) {
	if(h == null) {
		h = 16;
	}
	if(w == null) {
		w = 100;
	}
	if(y == null) {
		y = 0;
	}
	if(x == null) {
		x = 0;
	}
	var element = window.document.createElementNS(svg_Default.NS,"rect");
	element.setAttribute("x","" + x);
	element.setAttribute("y","" + y);
	element.setAttribute("width","" + w);
	element.setAttribute("height","" + h);
	element.style.stroke = "black";
	element.style.fill = "silver";
	return element;
};
var svg_Text = function() { };
svg_Text.create = function(content,x,y,w,h) {
	if(h == null) {
		h = 16;
	}
	if(w == null) {
		w = 100;
	}
	if(y == null) {
		y = 0;
	}
	if(x == null) {
		x = 0;
	}
	var element = window.document.createElementNS(svg_Default.NS,"text");
	element.setAttribute("x","" + x);
	element.setAttribute("y","" + y);
	element.setAttribute("font-size","16px");
	element.style.stroke = "none";
	element.style.fill = "black";
	element.textContent = content;
	return element;
};
var tools_Editor = function(svg) {
	this.svg = svg;
	this.source = null;
};
tools_Editor.prototype = {
	addElement: function(element) {
		this.svg.appendChild(element);
		this.svg.appendChild(window.document.createTextNode("\n"));
		this.source.setText(this.toString());
	}
	,setSource: function(source) {
		this.source = source;
	}
	,setSVG: function(svg) {
		this.svg.innerHTML = svg.documentElement.innerHTML;
		this.source.setText(this.toString());
	}
	,clear: function() {
		this.svg.textContent = "";
		this.source.setText(this.toString());
	}
	,toString: function() {
		return ["<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n","<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 600 400\">\n",this.svg.innerHTML,"</svg>"].join("");
	}
};
var tools_Selector = function(stage) {
	this._off = 1.0;
	this.isSnap2Grid = true;
	this.isResizer = false;
	this.xoffset = { x : 0, y : 0};
	this.offset = { x : 0, y : 0};
	this.selected = null;
	var _gthis = this;
	this.stage = stage;
	if(this.isSnap2Grid) {
		this._off = Config.GRID;
	}
	this.initResizerElement();
	this.initSelectorElement();
	stage.onmouseover = function(e) {
		var target = _gthis.isParentAGroup(e.target);
		_gthis._target = _gthis.isParentAGroup(e.target);
		_gthis.updateSelectionElement(target);
	};
	stage.onmousedown = function(e) {
		var target = _gthis.isParentAGroup(e.target);
		if(target != null && target.isSameNode(stage) == false) {
			if(target.tagName == "circle") {
				var tmp = parseFloat(target.getAttribute("cx")) - e.clientX;
				_gthis.offset.x = Math.round(tmp);
				var tmp = parseFloat(target.getAttribute("cy")) - e.clientY;
				_gthis.offset.y = Math.round(tmp);
			} else if(target.tagName == "g") {
				var tr = StringTools.replace(StringTools.replace(target.getAttribute("transform"),"translate(",""),")","");
				var _x = tr.split(",")[0];
				var _y = tr.split(",")[1];
				var tmp = parseFloat(_x) - e.clientX;
				_gthis.offset.x = Math.round(tmp);
				var tmp = parseFloat(_y) - e.clientY;
				_gthis.offset.y = Math.round(tmp);
			} else {
				var tmp = parseFloat(target.getAttribute("x")) - e.clientX;
				_gthis.offset.x = Math.round(tmp);
				var tmp = parseFloat(target.getAttribute("y")) - e.clientY;
				_gthis.offset.y = Math.round(tmp);
			}
			_gthis._target = _gthis.isParentAGroup(e.target);
			_gthis.selected = target;
		}
	};
	stage.onmouseup = function(e) {
		if(_gthis.selected != null && !_gthis.isResizer) {
			var _x = e.clientX + _gthis.offset.x;
			var _y = e.clientY + _gthis.offset.y;
			_x = Math.round((e.clientX + _gthis.offset.x) / _gthis._off) * _gthis._off;
			_y = Math.round((e.clientY + _gthis.offset.y) / _gthis._off) * _gthis._off;
			if(_gthis.selected.tagName == "circle") {
				_gthis.selected.setAttribute("cx","" + _x);
				_gthis.selected.setAttribute("cy","" + _y);
			} else if(_gthis.selected.tagName == "g") {
				_gthis.selected.setAttribute("transform","translate(" + _x + "," + _y + ")");
			} else {
				_gthis.selected.setAttribute("x","" + _x);
				_gthis.selected.setAttribute("y","" + _y);
			}
			_gthis.updateSelectionElement(_gthis.selected);
		}
		_gthis.selected = null;
	};
	window.onmousemove = function(e) {
		if(_gthis.selected != null && !_gthis.isResizer) {
			var _x = e.clientX + _gthis.offset.x;
			var _y = e.clientY + _gthis.offset.y;
			if(_gthis.selected.tagName == "circle") {
				_gthis.selected.setAttribute("cx","" + _x);
				_gthis.selected.setAttribute("cy","" + _y);
			} else if(_gthis.selected.tagName == "g") {
				_gthis.selected.setAttribute("transform","translate(" + _x + "," + _y + ")");
			} else {
				_gthis.selected.setAttribute("x","" + _x);
				_gthis.selected.setAttribute("y","" + _y);
			}
			_gthis.updateSelectionElement(_gthis.selected);
		}
		if(_gthis.isResizer) {
			if(_gthis._target == null) {
				_gthis.isResizer = false;
				return;
			}
			console.log("src/tools/Selector.hx:116:","window.onmousemove");
			console.log("src/tools/Selector.hx:117:",_gthis.isResizer);
			var clientX = Math.round(e.clientX);
			var clientY = Math.round(e.clientY);
			if(_gthis._target.dataset.type == "group-type-svgcombo") {
				var _svgCombo = shape_SVGCombo.parse(_gthis._target);
				_svgCombo.get_bg().setAttribute("width","" + -Math.round(_gthis.xoffset.x - clientX));
				_svgCombo.get_bg().setAttribute("height","" + -Math.round(_gthis.xoffset.y - clientY));
			}
			_gthis.updateSelectionElement(_gthis._target);
		}
	};
};
tools_Selector.prototype = {
	initResizerElement: function() {
		var _gthis = this;
		this.resizeEl = window.document.createElement("div");
		this.resizeEl.className = "svg-element-resizer";
		window.document.body.appendChild(this.resizeEl);
		this.resizeEl.onmouseover = function(e) {
			if(_gthis._target == null) {
				_gthis.resizeEl.classList.remove("show");
				return;
			}
			if(_gthis._target.dataset.type == "group-type-svgcombo") {
				_gthis.resizeEl.classList.add("show");
			}
		};
		this.resizeEl.onmouseout = function(e) {
			_gthis.resizeEl.classList.remove("show");
		};
		this.resizeEl.onmousedown = function(e) {
			console.log("src/tools/Selector.hx:196:","resizeEl.onmousedown");
			_gthis.isResizer = true;
			if(_gthis._target.dataset.type == "group-type-svgcombo") {
				var _svgCombo = shape_SVGCombo.parse(_gthis._target);
				var tmp = e.clientX - _svgCombo.get_width();
				_gthis.xoffset.x = Math.round(tmp);
				var tmp = e.clientY - _svgCombo.get_height();
				_gthis.xoffset.y = Math.round(tmp);
			} else {
				var tmp = e.clientX - parseFloat(_gthis._target.getAttribute("width"));
				_gthis.xoffset.x = Math.round(tmp);
				var tmp = e.clientY - parseFloat(_gthis._target.getAttribute("height"));
				_gthis.xoffset.y = Math.round(tmp);
			}
			console.log("src/tools/Selector.hx:207:",_gthis.xoffset);
		};
		this.resizeEl.onmouseup = function(e) {
			console.log("src/tools/Selector.hx:211:","resizeEl.onmouseup");
			if(_gthis.isResizer) {
				if(_gthis._target.dataset.type == "group-type-svgcombo") {
					var _svgCombo = shape_SVGCombo.parse(_gthis._target);
					_svgCombo.get_bg().setAttribute("width","" + Math.round(_svgCombo.get_width() / _gthis._off) * _gthis._off);
					_svgCombo.get_bg().setAttribute("height","" + Math.round(_svgCombo.get_height() / _gthis._off) * _gthis._off);
				} else {
					var _w = parseFloat(_gthis._target.getAttribute("width"));
					var _h = parseFloat(_gthis._target.getAttribute("height"));
					_gthis._target.setAttribute("width","" + Math.round(_w / _gthis._off) * _gthis._off);
					_gthis._target.setAttribute("height","" + Math.round(_h / _gthis._off) * _gthis._off);
				}
				_gthis.updateSelectionElement(_gthis._target);
			}
			_gthis.isResizer = false;
		};
	}
	,initSelectorElement: function() {
		this.selectionEl = window.document.createElement("span");
		this.selectionEl.style.position = "absolute";
		this.selectionEl.style.display = "block";
		this.selectionEl.style.outline = "solid 2px #99f";
		this.selectionEl.style.pointerEvents = "none";
		window.document.body.appendChild(this.selectionEl);
	}
	,updateSelectionElement: function(element) {
		if(element == null || element.isSameNode(this.stage)) {
			this.selectionEl.style.display = "none";
			return;
		}
		if(element.classList.contains(Style.IGNORE)) {
			this.selectionEl.style.display = "none";
			return;
		}
		var rect = element.getBoundingClientRect();
		this.selectionEl.style.left = rect.left + "px";
		this.selectionEl.style.top = rect.top + "px";
		this.selectionEl.style.width = rect.width + "px";
		this.selectionEl.style.height = rect.height + "px";
		this.selectionEl.style.display = "block";
		this.resizeEl.style.left = rect.left + rect.width + "px";
		this.resizeEl.style.top = rect.top + rect.height + "px";
		if(element.dataset.type == "group-type-svgcombo") {
			switch(element.dataset.id) {
			case "group-btn":
				var _svgCombo = shape_SVGCombo.parse(element);
				_svgCombo.update();
				break;
			case "group-heading":
				var _svgCombo = shape_SVGCombo.parse(element);
				_svgCombo.update();
				break;
			case "group-image":
				var _svgCombo = shape_SVGCombo.parse(element);
				_svgCombo.update();
				break;
			case "group-paragraph":
				var _svgCombo = shape_SVGCombo.parse(element);
				_svgCombo.update();
				break;
			case "group-rect":
				var _svgCombo = shape_SVGCombo.parse(element);
				_svgCombo.update();
				break;
			default:
				var _svgCombo = shape_SVGCombo.parse(element);
				_svgCombo.update();
			}
		}
	}
	,isParentAGroup: function(target) {
		if(target.classList.contains(Style.IGNORE)) {
			this.selected = null;
			return null;
		}
		if(target.nodeName == "svg") {
			this.selected = null;
			return null;
		}
		var tmp = target.parentElement.nodeName == "svg";
		if(target.parentElement.nodeName == "g") {
			target = target.parentElement;
		}
		return target;
	}
};
var tools_Source = function(dom) {
	this.dom = dom;
};
tools_Source.prototype = {
	setText: function(text) {
		this.dom.textContent = text;
	}
};
var utils_ColorUtil = function() { };
utils_ColorUtil.randomColor = function() {
	return "#" + Math.floor(Math.random() * 16777215).toString(16);
};
var utils_String2Node = function() { };
utils_String2Node.parse = function(str) {
	var parser = new DOMParser();
	var doc = parser.parseFromString(str,"text/html");
	return doc.body;
};
Config.WIDTH = 600;
Config.HEIGHT = 400;
Config.GRID = Config.WIDTH / 12;
Style.IGNORE = "ignore";
svg_Default.NS = "http://www.w3.org/2000/svg";
Main.main();
})(typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);

//# sourceMappingURL=svg-component.editor.js.map