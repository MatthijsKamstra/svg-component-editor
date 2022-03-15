package utils;

class MathUtil {
	/**
	 * Returns a random number between min (inclusive) and max (exclusive)
	 */
	public static function getRandomArbitrary(min:Float, max:Float):Float {
		return Math.random() * (max - min) + min;
	}

	/**
	 * Returns a random integer between min (inclusive) and max (inclusive).
	 * The value is no lower than min (or the next integer greater than min
	 * if min isn't an integer) and no greater than max (or the next integer
	 * lower than max if max isn't an integer).
	 * Using Math.round() will give you a non-uniform distribution!
	 */
	public static function getRandomInt(min:Int, max:Int):Int {
		return Math.floor(Math.random() * (max - min)) + min;
	}
}
