package;

import js.html.TextAreaElement;
import js.html.svg.SVGElement;
import js.Browser.*;

class Editor {
	var svg:SVGElement;
	var source:Source;

	public function new(svg) {
		this.svg = svg;
		this.source = null;
	}

	public function addElement(element) {
		this.svg.appendChild(element);
		this.svg.appendChild(document.createTextNode('\n'));
		this.source.setText(this.toString());
	}

	public function setSource(source) {
		this.source = source;
	}

	public function setSVG(svg) {
		this.svg.innerHTML = svg.documentElement.innerHTML;
		this.source.setText(this.toString());
	}

	public function clear() {
		this.svg.textContent = '';
		this.source.setText(this.toString());
	}

	public function toString() {
		// TODO Checkbox for auto-formating
		return [
			'<?xml version="1.0" encoding="UTF-8"?>\n',
			'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400">\n',
			this.svg.innerHTML,
			'</svg>'
		].join('');
	}
}
