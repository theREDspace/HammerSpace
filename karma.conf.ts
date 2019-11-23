
module.exports = function(config) {
	config.set({
		frameworks: ["jasmine", "karma-typescript"],
		basePath  : 'src/',
		files: [{
			pattern: "**/*.ts"
		}],
		exclude: [
			"main.ts"
		],
		preprocessors: {
			"**/*.ts": ["karma-typescript"]
		},
		reporters: ["karma-typescript"],
		browsers: ["ChromeHeadless"],
		singleRun: true
	});
};
