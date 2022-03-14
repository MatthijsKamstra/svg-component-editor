package tools;

import js.html.Element;

class Source {
	var dom:Element;

	public function new(dom) {
		this.dom = dom;
	}

	public function setText(text) {
		this.dom.textContent = text;
	}
}
