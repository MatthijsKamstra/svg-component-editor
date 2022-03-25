package utils;

import js.html.DOMParser;
import js.html.SupportedType;

class String2Node {
	/**
	 * Convert a template string into HTML DOM nodes
	 * @param  {String} str The template string
	 * @return {Node}       The template HTML
	 */
	public static function parse(str:String) {
		var parser = new DOMParser();
		var doc = parser.parseFromString(str, SupportedType.TEXT_HTML);
		return doc.body;
	}
}
