(function ($global) { "use strict";
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
		var _gthis = this;
		var title = window.document.getElementById("title");
		var wireframe = window.document.getElementById("wireframe");
		var createCircle = window.document.getElementById("createCircle");
		var createRectangle = window.document.getElementById("createRectangle");
		var createText = window.document.getElementById("createText");
		var btnImage = window.document.getElementById("js-createImage");
		var btnButton = window.document.getElementById("js-createButton");
		var load = window.document.getElementById("load");
		var save = window.document.getElementById("save");
		var clear = window.document.getElementById("clear");
		var stage = window.document.getElementById("stage");
		var textarea = window.document.getElementById("textarea");
		var editor = new tools_Editor(stage);
		editor.setSource(new tools_Source(textarea));
		var selector = new tools_Selector(stage);
		this.setupGrid(stage,editor);
		wireframe.addEventListener("change",function() {
			stage.classList.toggle("wireframe");
		});
		createCircle.addEventListener("click",function() {
			var element = window.document.createElementNS(svg_Default.NS,"circle");
			element.setAttribute("cx",_gthis.parseNumber(Math.random() * _gthis.WIDTH));
			element.setAttribute("cy",_gthis.parseNumber(Math.random() * _gthis.HEIGHT));
			element.setAttribute("r",_gthis.parseNumber(Math.random() * 100));
			element.style.stroke = "black";
			element.style.fill = _gthis.randomColor();
			editor.addElement(element);
		});
		createRectangle.addEventListener("click",function() {
			var element = svg_Rect.create(Config.GRID * utils_MathUtil.getRandomInt(1,4),Config.GRID * utils_MathUtil.getRandomInt(1,4),Config.GRID * utils_MathUtil.getRandomInt(1,4),Config.GRID * utils_MathUtil.getRandomInt(1,4));
			element.style.stroke = "black";
			element.style.fill = _gthis.randomColor();
			editor.addElement(element);
		});
		btnImage.addEventListener("click",function() {
			console.log("src/Main.hx:89:","btnImage");
			var group = svg_Group.create(Config.GRID,Config.GRID);
			group.id = Names.GROUP_IMAGE;
			group.appendChild(svg_Rect.create(0,0,Config.GRID * 2,Config.GRID * 2));
			var text = svg_Text.create("Image",Config.GRID,Config.GRID);
			text.setAttribute("text-anchor","middle");
			text.setAttribute("dominant-baseline","central");
			group.appendChild(text);
			editor.addElement(group);
		});
		btnButton.addEventListener("click",function() {
			console.log("src/Main.hx:103:","btnButton");
			var group = svg_Group.create(Config.GRID,Config.GRID);
			group.id = Names.GROUP_BTN;
			group.appendChild(svg_Rect.create(0,0,100,Config.GRID * 0.5));
			var text = svg_Text.create("Submit",50.,Config.GRID * 0.25);
			text.setAttribute("text-anchor","middle");
			text.setAttribute("dominant-baseline","central");
			group.appendChild(text);
			editor.addElement(group);
		});
		createText.addEventListener("click",function() {
			var element = window.document.createElementNS(svg_Default.NS,"text");
			element.setAttribute("x",_gthis.parseNumber(Math.random() * _gthis.WIDTH));
			element.setAttribute("y",_gthis.parseNumber(Math.random() * _gthis.HEIGHT));
			element.setAttribute("font-size","30px");
			element.style.stroke = "black";
			element.style.fill = _gthis.randomColor();
			element.textContent = "Hello World";
			editor.addElement(element);
		});
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
	,setupGrid: function(stage,editor) {
		var group = svg_Group.create(0,0);
		group.id = Names.GROUP_GRID;
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
		editor.addElement(group);
	}
	,parseNumber: function(value) {
		return parseFloat(value.toFixed(2));
	}
	,randomColor: function() {
		return "#" + Math.floor(Math.random() * 16777215).toString(16);
	}
};
var Names = function() { };
var StringTools = function() { };
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
};
var Style = function() { };
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
var svg_Group = function() { };
svg_Group.create = function(x,y) {
	if(y == null) {
		y = 0;
	}
	if(x == null) {
		x = 0;
	}
	var element = window.document.createElementNS(svg_Default.NS,"g");
	element.setAttribute("transform","translate(" + x + "," + y + ")");
	return element;
};
var svg_Line = function() { };
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
	this.isResizer = false;
	this.offset = { x : 0, y : 0};
	this.selected = null;
	var _gthis = this;
	this.stage = stage;
	this.initResizer();
	this.initSelector();
	stage.onmouseover = function(e) {
		var target = _gthis.isParentAGroup(e.target);
		_gthis._target = _gthis.isParentAGroup(e.target);
		_gthis.updateSelection(target);
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
			var _off = Config.GRID;
			var _x = e.clientX + _gthis.offset.x;
			var _y = e.clientY + _gthis.offset.y;
			_x = Math.round((e.clientX + _gthis.offset.x) / _off) * _off;
			_y = Math.round((e.clientY + _gthis.offset.y) / _off) * _off;
			if(_gthis.selected.tagName == "circle") {
				_gthis.selected.setAttribute("cx","" + _x);
				_gthis.selected.setAttribute("cy","" + _y);
			} else if(_gthis.selected.tagName == "g") {
				_gthis.selected.setAttribute("transform","translate(" + _x + "," + _y + ")");
			} else {
				_gthis.selected.setAttribute("x","" + _x);
				_gthis.selected.setAttribute("y","" + _y);
			}
			_gthis.updateSelection(_gthis.selected);
		}
		_gthis.selected = null;
	};
	window.onmousemove = function(e) {
		if(_gthis.selected != null && !_gthis.isResizer) {
			var _off = Config.GRID;
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
			_gthis.updateSelection(_gthis.selected);
		}
	};
};
tools_Selector.prototype = {
	initResizer: function() {
		var _gthis = this;
		this.resizeEl = window.document.createElement("div");
		this.resizeEl.className = "svg-element-resizer";
		window.document.body.appendChild(this.resizeEl);
		this.resizeEl.onmouseover = function(e) {
			_gthis.isResizer = true;
		};
		this.resizeEl.onmouseout = function(e) {
			_gthis.isResizer = false;
		};
		this.resizeEl.onmousedown = function(e) {
			console.log("src/tools/Selector.hx:132:","resizeEl.onmousedown");
		};
		this.resizeEl.onmouseup = function(e) {
			console.log("src/tools/Selector.hx:135:","resizeEl.onmouseup");
		};
	}
	,initSelector: function() {
		this.selectionEl = window.document.createElement("span");
		this.selectionEl.style.position = "absolute";
		this.selectionEl.style.display = "block";
		this.selectionEl.style.outline = "solid 2px #99f";
		this.selectionEl.style.pointerEvents = "none";
		window.document.body.appendChild(this.selectionEl);
	}
	,updateSelection: function(element) {
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
var utils_MathUtil = function() { };
utils_MathUtil.getRandomInt = function(min,max) {
	return Math.floor(Math.random() * (max - min)) + min;
};
Config.WIDTH = 600;
Config.HEIGHT = 400;
Config.GRID = Config.WIDTH / 12;
Names.GROUP_BTN = "group-btn";
Names.GROUP_IMAGE = "group-image";
Names.GROUP_GRID = "group-grid";
Style.IGNORE = "ignore";
svg_Default.NS = "http://www.w3.org/2000/svg";
Main.main();
})(typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);

//# sourceMappingURL=svg-component.editor.js.map