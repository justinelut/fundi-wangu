module.exports = function(api) {
  api.cache(true);

  return {
    presets: [
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
      'nativewind/babel',
    ],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],  // Allows resolving from the root directory
          alias: {
            '@api': './src/api',
            '@assets': './src/assets',
            '@components': './src/components',
            '@scenes': './src/scenes',
            '@theme': './src/theme',
            '@utils': './src/utils',
          },
          extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'], // Optional, adds file extensions
        },
      ],
    ],
  };
};
