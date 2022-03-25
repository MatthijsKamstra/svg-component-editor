package;

import Names.*;
import js.Browser.*;
import js.html.*;
import js.html.svg.SVGElement;
import shape.SVGButton;
import shape.SVGHeading;
import shape.SVGImage;
import shape.SVGParagraph;
import shape.SVGRectangle;
import svg.Group;
import tools.*;

/**
 * @author Matthijs Kamstra aka [mck]
 * MIT
 */
class Main {
	var container:js.html.DivElement;

	var WIDTH = Config.WIDTH;
	var HEIGHT = Config.HEIGHT;

	public function new() {
		console.info('Svg-component-editor');
		init();
	}

	function init() {
		// helpers
		var title:InputElement = cast document.getElementById('title');
		var wireframe:InputElement = cast document.getElementById('wireframe');

		// create
		// var createCircle:ButtonElement = cast document.getElementById('createCircle');
		// var createRectangle:ButtonElement = cast document.getElementById('createRectangle');
		// var createText:ButtonElement = cast document.getElementById('createText');
		//
		var btnHeading:ButtonElement = cast document.getElementById("js-createHeading");
		var btnParagraph:ButtonElement = cast document.getElementById("js-createParagraph");
		var btnRect:ButtonElement = cast document.getElementById("js-createRectangle");
		var btnImage:ButtonElement = cast document.getElementById("js-createImage");
		var btnButton:ButtonElement = cast document.getElementById("js-createButton");

		// save/load/clear
		var load:ButtonElement = cast document.getElementById('load');
		var save:ButtonElement = cast document.getElementById('save');
		var clear:ButtonElement = cast document.getElementById('clear');
		//
		var btnConvert:ButtonElement = cast document.getElementById('js-svg2html');
		var btnTestConvert:ButtonElement = cast document.getElementById('js-svg2html-test');

		// elements
		var stage:SVGElement = cast document.getElementById('stage');
		var stageGrid:SVGElement = cast document.getElementById('js-grid');
		var textarea:TextAreaElement = cast document.getElementById('textarea');

		// here we go
		var editor = new Editor(stage);
		editor.setSource(new Source(textarea));
		var selector = new Selector(stage);

		// setup grid
		setupGrid(stageGrid);
		//
		wireframe.addEventListener('change', function() {
			stage.classList.toggle('wireframe');
		});

		// createCircle.addEventListener('click', function() {
		// 	var element = document.createElementNS(NS, 'circle');
		// 	element.setAttribute('cx', parseNumber(untyped Math.random() * WIDTH));
		// 	element.setAttribute('cy', parseNumber(untyped Math.random() * HEIGHT));
		// 	element.setAttribute('r', parseNumber(untyped Math.random() * 100));
		// 	element.style.stroke = 'black';
		// 	element.style.fill = ColorUtil.randomColor();
		// 	editor.addElement(element);
		// });

		// createRectangle.addEventListener('click', function() {
		// 	// var element = document.createElementNS(NS, 'rect');
		// 	// element.setAttribute('x', parseNumber(untyped Math.random() * WIDTH));
		// 	// element.setAttribute('y', parseNumber(untyped Math.random() * HEIGHT));
		// 	// element.setAttribute('width', parseNumber(untyped Math.random() * 100));
		// 	// element.setAttribute('height', parseNumber(untyped Math.random() * 100));
		// 	// element.style.stroke = 'black';
		// 	// element.style.fill = randomColor();
		// 	var element = svg.new Rect(Config.GRID * MathUtil.getRandomInt(1, 4), Config.GRID * MathUtil.getRandomInt(1, 4),
		// 		Config.GRID * MathUtil.getRandomInt(1, 4), Config.GRID * MathUtil.getRandomInt(1, 4));
		// 	element.style.stroke = 'black';
		// 	element.style.fill = ColorUtil.randomColor();
		// 	editor.addElement(element);
		// });

		// createText.addEventListener('click', function() {
		// 	var element = document.createElementNS(NS, 'text');
		// 	element.setAttribute('x', parseNumber(untyped Math.random() * WIDTH));
		// 	element.setAttribute('y', parseNumber(untyped Math.random() * HEIGHT));
		// 	element.setAttribute('font-size', '30px');
		// 	element.style.stroke = 'black';
		// 	element.style.fill = ColorUtil.randomColor();
		// 	element.textContent = 'Hello World';
		// 	editor.addElement(element);
		// });

		btnRect.onclick = function() {
			var elGroup = new SVGRectangle(Config.GRID, Config.GRID);
			editor.addElement(elGroup.group);
		};

		btnImage.onclick = function() {
			var elGroup = new SVGImage(Config.GRID, Config.GRID);
			editor.addElement(elGroup.group);
		};

		btnButton.onclick = function() {
			var elGroup = new SVGButton(Config.GRID, Config.GRID);
			editor.addElement(elGroup.group);
		};

		btnHeading.onclick = function() {
			var elGroup = new SVGHeading(Config.GRID, Config.GRID);
			editor.addElement(elGroup.group);
		};

		btnParagraph.onclick = function() {
			var elGroup = new SVGParagraph(Config.GRID, Config.GRID);
			editor.addElement(elGroup.group);
		};

		btnConvert.onclick = function() {
			var c = new convert.ConvertSvg2Html(stage);
		};

		btnTestConvert.onclick = function() {
			trace('add dummy');
			editor.addElement(new SVGRectangle(Config.GRID * 6, Config.GRID, Config.GRID * 3).group);
			editor.addElement(new SVGImage(Config.GRID * 9, Config.GRID, Config.GRID * 3).group);
			editor.addElement(new SVGParagraph(Config.GRID * 0, Config.GRID, Config.GRID * 6).group);
			editor.addElement(new SVGHeading(Config.GRID * 0, Config.GRID, Config.GRID * 6).group);
			trace('convert');
			var c = new convert.ConvertSvg2Html(stage);
		};

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

	// setup grid
	function setupGrid(stage:SVGElement) {
		var group = Group.create(0, 0);
		group.id = GROUP_GRID;
		group.classList.add(Style.IGNORE);
		var gridW = WIDTH / 12;
		for (i in 0...13) {
			var line = svg.Line.vertical(Math.round(i * gridW), 0, HEIGHT);
			line.classList.add(Style.IGNORE);
			group.appendChild(line);
			for (j in 0...13) {
				var circle = svg.Circle.create(Math.round(i * gridW), Math.round(j * gridW), 1);
				circle.classList.add(Style.IGNORE);
				group.appendChild(circle);
			}
		}
		// editor.addElement(group);
		stage.appendChild(group);
	}

	function parseNumber(value) {
		return untyped parseFloat(value.toFixed(2));
	}

	static public function main() {
		var app = new Main();
	}
}
