import eslintJs from '@eslint/js'
import tsEslint from 'typescript-eslint'
import globals from 'globals';
import jestPlugin from 'eslint-plugin-jest'

export default tsEslint.config(
    //---- PLUGINS
    {
        plugins: {
            ['@typescript-eslint']: tsEslint.plugin,
            ['jest']: jestPlugin
        }
    },
    //---- GLOBAL IGNORES
    {
        // note folders can only be ignored at the global level, per-cfg you must do: '**/dist/**/*'
        ignores: [
            '**/lib/',
            '**/vendor/',
            '**/node_modules/',
            '**/jest.config.mjs',
            '**/tests/',
            '**/example/'
        ],
    },
    //---- EXTENDS
    eslintJs.configs.recommended,
    tsEslint.configs.recommendedTypeChecked,
    tsEslint.configs.stylisticTypeChecked,
    //---- BASE
    {
        languageOptions: {
            globals: {
                ...globals.es2020,
                ...globals.node,
            },
            parserOptions: {
                project: './tsconfig.eslint.json',
                tsconfigRootDir: import.meta.dirname,
            }
        },
        rules: {
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                    caughtErrors: 'all',
                }
            ],
            'no-unused-vars': 'off',
        }
    },
    {
        extends: [tsEslint.configs.disableTypeChecked],
        files: ['**/*.js'],
        rules: {
            // turn off other type-aware rules
            '@typescript-eslint/internal/no-poorly-typed-ts-props': 'off',

            // turn off rules that don't apply to JS code
            '@typescript-eslint/explicit-function-return-type': 'off',
        }
    },
    {
        files: ['**/tests/**/*.test.{ts,tsx,cts,mts}'],
        languageOptions: {
          globals: {
            ...jestPlugin.environments.globals.globals,
          },
        },
    },
    {
        files: [
            '**/tests/**/*.test.{ts,tsx,cts,mts}',
        ],
        rules: {
            '@typescript-eslint/no-empty-function': 'off',
            '@typescript-eslint/no-non-null-assertion': 'off',
            '@typescript-eslint/no-unsafe-assignment': 'off',
            '@typescript-eslint/no-unsafe-call': 'off',
            '@typescript-eslint/no-unsafe-member-access': 'off',
            '@typescript-eslint/no-unsafe-return': 'off',
            'jest/no-alias-methods': 'error',
            'jest/no-deprecated-functions': 'error',
            'jest/no-disabled-tests': 'error',
            'jest/no-done-callback': 'error',
            'jest/no-focused-tests': 'error',
            'jest/no-identical-title': 'error',
            'jest/no-jasmine-globals': 'error',
            'jest/no-test-prefixes': 'error',
            'jest/no-test-return-statement': 'error',
            'jest/prefer-spy-on': 'error',
            'jest/prefer-to-be': 'error',
            'jest/prefer-to-contain': 'error',
            'jest/prefer-to-have-length': 'error',
            'jest/valid-expect': 'error',
        },
    },
    {
        extends: [tsEslint.configs.disableTypeChecked],
        files: ['eslint.config.{js,cjs,mjs}', 'knip.ts', 'packages/*/src/index.ts'],
        rules: {
          // requirement
          'import/no-default-export': 'off',
        },
    },
)