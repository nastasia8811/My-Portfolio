/** @type {import('lint-staged').LintStagedConfig} */
module.exports = {
    '*.{js,jsx,ts,tsx}': ['eslint --fix', 'git add'],
    '*.{css,scss,md}': ['prettier --write', 'git add'],
}
