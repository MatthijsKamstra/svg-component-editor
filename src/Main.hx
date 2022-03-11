package;

import js.html.svg.SVGElement;
import js.Browser.*;
import js.Browser;
import js.html.*;
import model.constants.App;

/**
 * @author Matthijs Kamstra aka [mck]
 * MIT
 */
class Main {
	var container:js.html.DivElement;

	var NS = 'http://www.w3.org/2000/svg';
	var WIDTH = 600;
	var HEIGHT = 400;

	public function new() {
		trace("Hello 'Example Javascript'");
		init();
	}

	function init() {
		var title:InputElement = cast document.getElementById('title');
		var wireframe:InputElement = cast document.getElementById('wireframe');
		var createCircle:ButtonElement = cast document.getElementById('createCircle');
		var createRectangle:ButtonElement = cast document.getElementById('createRectangle');
		var createText:ButtonElement = cast document.getElementById('createText');
		var load:ButtonElement = cast document.getElementById('load');
		var save:ButtonElement = cast document.getElementById('save');
		var clear:ButtonElement = cast document.getElementById('clear');

		var stage:SVGElement = cast document.getElementById('stage');
		var textarea:TextAreaElement = cast document.getElementById('textarea');

		var editor = new Editor(stage);
		editor.setSource(new Source(textarea));
		var selector = new Selector(stage);

		//
		wireframe.addEventListener('change', function() {
			stage.classList.toggle('wireframe');
		});

		createCircle.addEventListener('click', function() {
			var element = document.createElementNS(NS, 'circle');
			element.setAttribute('cx', parseNumber(untyped Math.random() * WIDTH));
			element.setAttribute('cy', parseNumber(untyped Math.random() * HEIGHT));
			element.setAttribute('r', parseNumber(untyped Math.random() * 100));
			element.style.stroke = 'black';
			element.style.fill = randomColor();
			editor.addElement(element);
		});

		createRectangle.addEventListener('click', function() {
			var element = document.createElementNS(NS, 'rect');
			element.setAttribute('x', parseNumber(untyped Math.random() * WIDTH));
			element.setAttribute('y', parseNumber(untyped Math.random() * HEIGHT));
			element.setAttribute('width', parseNumber(untyped Math.random() * 100));
			element.setAttribute('height', parseNumber(untyped Math.random() * 100));
			element.style.stroke = 'black';
			element.style.fill = randomColor();
			editor.addElement(element);
		});

		createText.addEventListener('click', function() {
			var element = document.createElementNS(NS, 'text');
			element.setAttribute('x', parseNumber(untyped Math.random() * WIDTH));
			element.setAttribute('y', parseNumber(untyped Math.random() * HEIGHT));
			element.setAttribute('font-size', '30px');
			element.style.stroke = 'black';
			element.style.fill = randomColor();
			element.textContent = 'Hello World';
			editor.addElement(element);
		});

		// LOAD
		var form:FormElement = cast document.createElement('form');
		form.style.display = 'none';
		document.body.appendChild(form);

		var input:InputElement = cast document.createElement('input');
		input.type = 'file';
		input.addEventListener('change', function(event) {
			var file = input.files[0];
			title.value = file.name.split('.')[0];
			var reader = new FileReader();
			reader.addEventListener('load', function(event) {
				var contents = event.target.result;
				editor.setSVG(new DOMParser().parseFromString(contents, IMAGE_SVG_XML));
			}, false);
			reader.readAsText(file);
			form.reset();
		});

		form.appendChild(input);
		load.addEventListener('click', function() {
			input.click();
		});

		// SAVE
		var link:LinkElement = cast document.createElement('a');
		link.style.display = 'none';
		document.body.appendChild(link);
		save.addEventListener('click', function() {
			var blob = new Blob([editor.toString()], {type: 'text/plain'});
			link.href = URL.createObjectURL(blob);
			untyped link.download = title.value + '.svg';
			link.click();
		});

		// CLEAR
		clear.addEventListener('click', function() {
			editor.clear();
		});
	}

	function parseNumber(value) {
		return untyped parseFloat(value.toFixed(2));
	}

	function randomColor() {
		return untyped '#' + Math.floor(untyped Math.random() * 16777215).toString(16);
	}

	static public function main() {
		var app = new Main();
	}
}
