const _cm = {
	/*
		@function parse Variable Name to Normal Text
		@param str: string as variable name
		@return text: string
	*/
	varToText(str) {
		return str
			.replace(/[_.]+/gi, ' ')
			.replace(/\W+/g, '')
			.replace(/([a-z])([A-Z])/g, '$1 $2')
			.replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')
			.replace(/\w{1}/, x => x.toUpperCase());
	},
	/*
		@function replace Variable Name with Variable Value
		@param str: string as text
		@param args: object
			@keys as Variable Name and
			@properties as Variable Value
		@param opt: object
			@s: string as text start with
			@e: string as text end with
			@rs: string as text replace start with
			@re: string as text replace end with
		@return text: string
	*/
	replaceVars(str, args, opt = { s: '{', e: '}', rs: '', re: '' }) {
		const { s, e, rs, re } = opt;
		let text = str;
		for (const key of Object.keys(args)) {
			text = text.replace(new RegExp(`${s + key + e}`, 'g'), `${rs + args[key].toString() + re}`);
		}
		return str;
	}
};

module.exports = _cm;
