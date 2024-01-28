module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          src: './src',
          '@/assets': './src/assets',
          '@/components': './src/components',
          '@/constants': './src/constants',
          '@/contexts': './src/contexts',
          '@/screens': './src/screens',
          '@/styles': './src/styles',
          '@/routes': './src/routes',
          '@/routers': './src/routers',
          '@/hooks': './src/hooks',
          '@/utils': './src/utils',
          '@/models': './src/models',
          '@/navigation': './src/navigation'
        }
      }
    ],
    'react-native-reanimated/plugin'
  ]
}
