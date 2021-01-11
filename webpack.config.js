const path = require("path");
const built = path.resolve(__dirname, "built");

module.exports = {
	mode: "development",
	entry: "./src/main.ts",
	output: {
		filename: "bundle.js",
		path: `${built}/`,
	},
	module: {
		rules: [
			{
				test: /\.ts/,
				use: "ts-loader",
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: [".ts", ".js"],
	},
	devServer: {
		contentBase: `${built}/`,
		open: true,
		hot: true,
		watchContentBase: true,
	},
};
