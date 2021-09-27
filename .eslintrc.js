module.exports = {
    env: {
        node: true,
        'jest/globals': true
    },
    'extends': ['plugin:@typescript-eslint/recommended', 'plugin:jest/recommended'],
    parser: '@typescript-eslint/parser',
    overrides: [
        {
            files: ['*.ts'],
            parserOptions: {
                project: './tsconfig.eslint.json',
                sourceType: 'module',
                tsconfigRootDir: __dirname,
            },
        }
    ],
    plugins: ['@typescript-eslint', 'filenames', 'jest'],
    settings: {
        'import/extensions': ['.js', '.ts'],
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts']
        },
        'import/resolver': {
            node: {
                extensions: ['.js', '.ts']
            }
        }
    },
    rules: {
        'filenames/match-regex': ['error', '^[a-z0-9-.]+$'],
        'no-bitwise': 'error',
        curly: ['error', 'all'],
        eqeqeq: 'error',
        'wrap-iife': ['error', 'any'],
        indent: ['error', 4, {SwitchCase: 1}],
        'padding-line-between-statements': [
            'error',
            {
                blankLine: 'always',
                prev: ['const', 'let', 'var'],
                next: '*'
            },
            {
                blankLine: 'any',
                prev: ['const', 'let', 'var'],
                next: ['const', 'let', 'var']
            },
            {
                blankLine: 'always',
                prev: 'multiline-expression',
                next: 'multiline-expression'
            },
        ],
        'new-cap': 'error',
        'no-caller': 'error',
        'no-empty': ['error', {allowEmptyCatch: true}],
        'no-new': 'error',
        'no-plusplus': 'error',
        quotes: ['error', 'single', {avoidEscape: true, allowTemplateLiterals: true}],
        'no-undef': 'error',
        'no-unused-vars': 'error',
        strict: ['error', 'safe'],
        'no-unused-expressions': 'error',
        'no-mixed-spaces-and-tabs': 'error',
        'max-len': ['error', 120],
        'space-infix-ops': 'error',
        'space-unary-ops': ['error', {words: true, nonwords: false}],
        'space-before-blocks': ['error', 'always'],
        semi: ['error', 'always'],
        'keyword-spacing': ['error', {}],
        'quote-props': ['error', 'as-needed', {keywords: true}],
        'dot-notation': 'error',
        'space-before-function-paren': ['error', {
            anonymous: 'never',
            named: 'never',
            asyncArrow: 'always'
        }],
        'comma-spacing': ['error', {before: false, after: true}],
        'array-bracket-spacing': ['error', 'never'],
        'array-bracket-newline': 'off',
        'object-curly-newline': ['error', {multiline: true, consistent: true}],
        'object-property-newline': ['error', {allowMultiplePropertiesPerLine: true}],
        'key-spacing': ['error', {afterColon: true, beforeColon: false}],
        'no-trailing-spaces': ['error'],
        'object-curly-spacing': ['error', 'never'],
        'max-depth': ['warn', 3],
        'max-lines': ['warn', 250],
        complexity: ['warn', 20],
        'max-statements': ['warn', 25],
        'one-var-declaration-per-line': ['error', 'initializations'],
        'eol-last': ['warn'],
        '@typescript-eslint/ban-ts-comment': [
            'error',
            {
                'ts-expect-error': 'allow-with-description',
                'ts-ignore': 'allow-with-description',
                'ts-nocheck': 'allow-with-description',
                'ts-check': 'allow-with-description',
            }
        ],
        '@typescript-eslint/no-explicit-any': 'off',
    }
};
