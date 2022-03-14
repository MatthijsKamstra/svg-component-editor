(function ($global) { "use strict";
var Config = function() { };
var Editor = function(svg) {
	this.svg = svg;
	this.source = null;
};
Editor.prototype = {
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
var Main = function() {
	this.HEIGHT = 400;
	this.WIDTH = 600;
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
		var editor = new Editor(stage);
		editor.setSource(new Source(textarea));
		var selector = new Selector(stage);
		this.setupGrid(stage,editor);
		wireframe.addEventListener("change",function() {
			stage.classList.toggle("wireframe");
		});
		createCircle.addEventListener("click",function() {
			var element = window.document.createElementNS(svg_Config.NS,"circle");
			element.setAttribute("cx",_gthis.parseNumber(Math.random() * _gthis.WIDTH));
			element.setAttribute("cy",_gthis.parseNumber(Math.random() * _gthis.HEIGHT));
			element.setAttribute("r",_gthis.parseNumber(Math.random() * 100));
			element.style.stroke = "black";
			element.style.fill = _gthis.randomColor();
			editor.addElement(element);
		});
		createRectangle.addEventListener("click",function() {
			var element = window.document.createElementNS(svg_Config.NS,"rect");
			element.setAttribute("x",_gthis.parseNumber(Math.random() * _gthis.WIDTH));
			element.setAttribute("y",_gthis.parseNumber(Math.random() * _gthis.HEIGHT));
			element.setAttribute("width",_gthis.parseNumber(Math.random() * 100));
			element.setAttribute("height",_gthis.parseNumber(Math.random() * 100));
			element.style.stroke = "black";
			element.style.fill = _gthis.randomColor();
			editor.addElement(element);
		});
		btnImage.addEventListener("click",function() {
			console.log("src/Main.hx:84:","btnImage");
			var group = svg_Group.create(10,10);
			group.id = Config.GROUP_BTN;
			group.appendChild(svg_Rect.create(0,0,100,100));
			group.appendChild(svg_Text.create("Image",5,Math.round(55.)));
			editor.addElement(group);
		});
		btnButton.addEventListener("click",function() {
			console.log("src/Main.hx:93:","btnButton");
			var group = svg_Group.create(10,10);
			group.appendChild(svg_Rect.create(0,0,100,20));
			group.appendChild(svg_Text.create("Submit",5,15));
			editor.addElement(group);
		});
		createText.addEventListener("click",function() {
			var element = window.document.createElementNS(svg_Config.NS,"text");
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
		group.id = "grid";
		var gridW = this.WIDTH / 12;
		var _g = 0;
		while(_g < 13) {
			var i = _g++;
			var line = svg_Line.vertical(Math.round(i * gridW),0,this.HEIGHT);
			line.classList.add(Config.IGNORE);
			group.appendChild(line);
			var _g1 = 0;
			while(_g1 < 13) {
				var j = _g1++;
				var circle = svg_Circle.create(Math.round(i * gridW),Math.round(j * gridW),1);
				circle.classList.add(Config.IGNORE);
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
var Selector = function(stage) {
	var selection = window.document.createElement("span");
	selection.style.position = "absolute";
	selection.style.display = "block";
	selection.style.outline = "solid 2px #99f";
	selection.style.pointerEvents = "none";
	window.document.body.appendChild(selection);
	var selected = null;
	var offset_y;
	var offset_x = 0;
	offset_y = 0;
	var updateSelection = function(element) {
		if(element.isSameNode(stage)) {
			selection.style.display = "none";
			return;
		}
		if(element.classList.contains(Config.IGNORE)) {
			selection.style.display = "none";
			return;
		}
		if(element.classList.contains(Config.IGNORE)) {
			selection.style.display = "none";
			return;
		}
		console.log("src/Selector.hx:36:",element.parentElement.nodeName);
		var rect = element.getBoundingClientRect();
		selection.style.left = rect.left + "px";
		selection.style.top = rect.top + "px";
		selection.style.width = rect.width + "px";
		selection.style.height = rect.height + "px";
		selection.style.display = "block";
	};
	var isParentAGroup = function(target) {
		var isParentAGroup = target.parentElement.nodeName == "svg";
		if(target.parentElement.nodeName == "g") {
			target = target.parentElement;
		}
		return target;
	};
	stage.addEventListener("mouseover",function(event) {
		var target = isParentAGroup(event.target);
		updateSelection(target);
	});
	stage.addEventListener("mousedown",function(event) {
		var target = isParentAGroup(event.target);
		if(target.isSameNode(stage) == false) {
			if(target.tagName == "circle") {
				offset_x = Math.round(parseFloat(target.getAttribute("cx")) - event.clientX);
				offset_y = Math.round(parseFloat(target.getAttribute("cy")) - event.clientY);
			} else if(target.tagName == "g") {
				var tr = StringTools.replace(StringTools.replace(target.getAttribute("transform"),"translate(",""),")","");
				var _x = tr.split(",")[0];
				var _y = tr.split(",")[1];
				offset_x = Math.round(parseFloat(_x) - event.clientX);
				offset_y = Math.round(parseFloat(_y) - event.clientY);
			} else {
				offset_x = Math.round(parseFloat(target.getAttribute("x")) - event.clientX);
				offset_y = Math.round(parseFloat(target.getAttribute("y")) - event.clientY);
			}
			selected = target;
		}
	});
	stage.addEventListener("mouseup",function(event) {
		selected = null;
	});
	window.addEventListener("mousemove",function(event) {
		if(selected != null) {
			if(selected.tagName == "circle") {
				selected.setAttribute("cx","" + (event.clientX + offset_x));
				selected.setAttribute("cy","" + (event.clientY + offset_y));
			} else if(selected.tagName == "g") {
				selected.setAttribute("transform","translate(" + (event.clientX + offset_x) + "," + (event.clientY + offset_y) + ")");
			} else {
				selected.setAttribute("x","" + (event.clientX + offset_x));
				selected.setAttribute("y","" + (event.clientY + offset_y));
			}
			updateSelection(selected);
		}
	});
};
var Source = function(dom) {
	this.dom = dom;
};
Source.prototype = {
	setText: function(text) {
		this.dom.textContent = text;
	}
};
var StringTools = function() { };
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
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
	var element = window.document.createElementNS(svg_Config.NS,"circle");
	element.setAttribute("cx","" + x);
	element.setAttribute("cy","" + y);
	element.setAttribute("r","" + r);
	element.style.stroke = "black";
	element.style.fill = "silver";
	return element;
};
var svg_Config = function() { };
var svg_Group = function() { };
svg_Group.create = function(x,y) {
	if(y == null) {
		y = 0;
	}
	if(x == null) {
		x = 0;
	}
	var element = window.document.createElementNS(svg_Config.NS,"g");
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
	var element = window.document.createElementNS(svg_Config.NS,"line");
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
	var element = window.document.createElementNS(svg_Config.NS,"rect");
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
	var element = window.document.createElementNS(svg_Config.NS,"text");
	element.setAttribute("x","" + x);
	element.setAttribute("y","" + y);
	element.setAttribute("font-size","16px");
	element.style.stroke = "none";
	element.style.fill = "black";
	element.textContent = content;
	return element;
};
Config.IGNORE = "ignore";
Config.GROUP_BTN = "group-btn";
svg_Config.NS = "http://www.w3.org/2000/svg";
Main.main();
})(typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);

//# sourceMappingURL=svg-component.editor.js.map