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
          '@/services': './src/services',
          '@/hooks': './src/hooks',
          '@/shared': './src/shared',
          '@/utils': './src/utils',
          '@/models': './src/models',
          '@/navigation': './src/navigation'
        }
      }
    ]
  ]
}
