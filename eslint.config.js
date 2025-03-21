import { eslint } from '@siberiacancode/eslint';
import pluginTanstackQuery from '@tanstack/eslint-plugin-query';
import pluginTanstackRouter from '@tanstack/eslint-plugin-router';

export default eslint(
  {
    typescript: true,
    react: true,
    jsx: true,
    rules: {
      'react/no-unstable-default-props': 'off',
      '@typescript-eslint/no-use-before-define': 'off',
      'react/no-unstable-context-value': 'off',
      'eslint-comments/no-unlimited-disable': 'off'
    }
  },
  {
    plugins: {
      '@tanstack/query': pluginTanstackQuery
    },
    name: 'tanstack-query',
    ...pluginTanstackQuery.configs.recomended
  },
  {
    plugins: {
      '@tanstack/router': pluginTanstackRouter
    },
    name: 'tanstack-router',
    ...pluginTanstackRouter.configs.recomended
  }
);
