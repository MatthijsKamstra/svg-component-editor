package utils;

class ColorUtil {
	public function new() {
		// your code
	}

	public static function randomColor() {
		return untyped '#' + Math.floor(untyped Math.random() * 16777215).toString(16);
	}
}
