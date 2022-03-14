(function ($global) { "use strict";
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
	this.NS = "http://www.w3.org/2000/svg";
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
		var load = window.document.getElementById("load");
		var save = window.document.getElementById("save");
		var clear = window.document.getElementById("clear");
		var stage = window.document.getElementById("stage");
		var textarea = window.document.getElementById("textarea");
		var editor = new Editor(stage);
		editor.setSource(new Source(textarea));
		var selector = new Selector(stage);
		wireframe.addEventListener("change",function() {
			stage.classList.toggle("wireframe");
		});
		createCircle.addEventListener("click",function() {
			var element = window.document.createElementNS(_gthis.NS,"circle");
			element.setAttribute("cx",_gthis.parseNumber(Math.random() * _gthis.WIDTH));
			element.setAttribute("cy",_gthis.parseNumber(Math.random() * _gthis.HEIGHT));
			element.setAttribute("r",_gthis.parseNumber(Math.random() * 100));
			element.style.stroke = "black";
			element.style.fill = _gthis.randomColor();
			editor.addElement(element);
		});
		createRectangle.addEventListener("click",function() {
			var element = window.document.createElementNS(_gthis.NS,"rect");
			element.setAttribute("x",_gthis.parseNumber(Math.random() * _gthis.WIDTH));
			element.setAttribute("y",_gthis.parseNumber(Math.random() * _gthis.HEIGHT));
			element.setAttribute("width",_gthis.parseNumber(Math.random() * 100));
			element.setAttribute("height",_gthis.parseNumber(Math.random() * 100));
			element.style.stroke = "black";
			element.style.fill = _gthis.randomColor();
			editor.addElement(element);
		});
		createText.addEventListener("click",function() {
			var element = window.document.createElementNS(_gthis.NS,"text");
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
		var rect = element.getBoundingClientRect();
		selection.style.left = rect.left + "px";
		selection.style.top = rect.top + "px";
		selection.style.width = rect.width + "px";
		selection.style.height = rect.height + "px";
		selection.style.display = "block";
	};
	stage.addEventListener("mouseover",function(event) {
		var target = event.target;
		updateSelection(target);
	});
	stage.addEventListener("mousedown",function(event) {
		var target = event.target;
		if(target.isSameNode(stage) == false) {
			console.log("src/Selector.hx:45:","" + target.tagName);
			if(target.tagName == "circle") {
				offset_x = Math.round(parseFloat(target.getAttribute("cx")) - event.clientX);
				offset_y = Math.round(parseFloat(target.getAttribute("cy")) - event.clientY);
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
Main.main();
})(typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);

//# sourceMappingURL=svg-component.editor.js.map