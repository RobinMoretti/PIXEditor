module.exports = {
root: true,
env: {
node: true,
browser: true,
es2021: true,
},
extends: [
'plugin:vue/vue3-essential',
'eslint:recommended',
],
parserOptions: {
ecmaVersion: 2021,
},
rules: {
'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
indent: [2, 'tab', { SwitchCase: 1, VariableDeclarator: 1 }],
'no-tabs': 0,
},
}
