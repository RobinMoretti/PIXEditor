// vue.config.js
const path = require('path')

module.exports = {
	publicPath: process.env.NODE_ENV === 'production'
	  ? '/PIXEditor/'
	  : '/',
    pluginOptions: {
		'style-resources-loader': {
			'preProcessor': 'scss',
			'patterns': [
				path.resolve(__dirname, './src/assets/sass/variables.scss'),
			]
		}
	},

    lintOnSave: false
}
// test