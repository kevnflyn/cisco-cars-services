const UPPERCASE = /[\p{Lu}]/u;
const LOWERCASE = /[\p{Ll}]/u;
const LEADING_CAPITAL = /^[\p{Lu}](?![\p{Lu}])/gu;
const IDENTIFIER = /([\p{Alpha}\p{N}_]|$)/u;
const SEPARATORS = /[_.\- ]+/;

const LEADING_SEPARATORS = new RegExp('^' + SEPARATORS.source);
const SEPARATORS_AND_IDENTIFIER = new RegExp(SEPARATORS.source + IDENTIFIER.source, 'gu');
const NUMBERS_AND_IDENTIFIER = new RegExp('\\d+' + IDENTIFIER.source, 'gu');

type ToCaseFunc = (character: string) => string

type Options = {
	/**
	Uppercase the first character: `foo-bar` → `FooBar`.

	@default false
	*/
	readonly pascalCase?: boolean;

	/**
	Preserve consecutive uppercase characters: `foo-BAR` → `FooBAR`.

	@default false
	*/
	readonly preserveConsecutiveUppercase?: boolean;

	/**
	The locale parameter indicates the locale to be used to convert to upper/lower case according to any locale-specific case mappings. If multiple locales are given in an array, the best available locale is used.

	Setting `locale: false` ignores the platform locale and uses the [Unicode Default Case Conversion](https://unicode-org.github.io/icu/userguide/transforms/casemappings.html#simple-single-character-case-mapping) algorithm.

	Default: The host environment’s current locale.

	@example
	```
	import camelCase from 'camelcase';

	camelCase('lorem-ipsum', {locale: 'en-US'});
	//=> 'loremIpsum'

	camelCase('lorem-ipsum', {locale: 'tr-TR'});
	//=> 'loremİpsum'

	camelCase('lorem-ipsum', {locale: ['en-US', 'en-GB']});
	//=> 'loremIpsum'

	camelCase('lorem-ipsum', {locale: ['tr', 'TR', 'tr-TR']});
	//=> 'loremİpsum'
	```
	*/
	readonly locale?: false | string | readonly string[];
};

const preserveCamelCase = (
  string: string,
  toLowerCase: ToCaseFunc,
  toUpperCase: ToCaseFunc) => {
	let isLastCharLower = false;
	let isLastCharUpper = false;
	let isLastLastCharUpper = false;

	for (let index = 0; index < string.length; index++) {
		const character = string[index];

		if (isLastCharLower && UPPERCASE.test(character)) {
			string = string.slice(0, index) + '-' + string.slice(index);
			isLastCharLower = false;
			isLastLastCharUpper = isLastCharUpper;
			isLastCharUpper = true;
			index++;
		} else if (isLastCharUpper && isLastLastCharUpper && LOWERCASE.test(character)) {
			string = string.slice(0, index - 1) + '-' + string.slice(index - 1);
			isLastLastCharUpper = isLastCharUpper;
			isLastCharUpper = false;
			isLastCharLower = true;
		} else {
			isLastCharLower = toLowerCase(character) === character && toUpperCase(character) !== character;
			isLastLastCharUpper = isLastCharUpper;
			isLastCharUpper = toUpperCase(character) === character && toLowerCase(character) !== character;
		}
	}

	return string;
};

const preserveConsecutiveUppercase = (input: string, toLowerCase: ToCaseFunc) => {
	LEADING_CAPITAL.lastIndex = 0;

	return input.replace(LEADING_CAPITAL, m1 => toLowerCase(m1));
};

const postProcess = (input: string, toUpperCase: ToCaseFunc) => {
	SEPARATORS_AND_IDENTIFIER.lastIndex = 0;
	NUMBERS_AND_IDENTIFIER.lastIndex = 0;

	return input.replace(SEPARATORS_AND_IDENTIFIER, (_, identifier) => toUpperCase(identifier))
		.replace(NUMBERS_AND_IDENTIFIER, m => toUpperCase(m));
};

export const toCamelCase = (input: string, initOptions?: Options) => {
	if (!(typeof input === 'string' || Array.isArray(input))) {
		throw new TypeError('Expected the input to be `string | string[]`');
	}

	const options = {
		pascalCase: false,
		preserveConsecutiveUppercase: false,
		...initOptions,
	};

	if (Array.isArray(input)) {
		input = input.map(x => x.trim())
			.filter(x => x.length)
			.join('-');
	} else {
		input = input.trim();
	}

	if (input.length === 0) {
		return '';
	}

	const toLowerCase = options.locale === false
		? (string: string) => string.toLowerCase()
		: (string: string) => string.toLocaleLowerCase(options.locale as string);

	const toUpperCase = options.locale === false
		? (string: string) => string.toUpperCase()
		: (string: string) => string.toLocaleUpperCase(options.locale as string);

	if (input.length === 1) {
		if (SEPARATORS.test(input)) {
			return '';
		}

		return options.pascalCase ? toUpperCase(input) : toLowerCase(input);
	}

	const hasUpperCase = input !== toLowerCase(input);

	if (hasUpperCase) {
		input = preserveCamelCase(input, toLowerCase, toUpperCase);
	}

	input = input.replace(LEADING_SEPARATORS, '');
	input = options.preserveConsecutiveUppercase ? preserveConsecutiveUppercase(input, toLowerCase) : toLowerCase(input);

	if (options.pascalCase) {
		input = toUpperCase(input.charAt(0)) + input.slice(1);
	}

	return postProcess(input, toUpperCase);
}
