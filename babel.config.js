module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    ['module-resolver', {
      alias: {
        "@core": "./src/core",
        "@utils": "./src/utils",
        "@mail": "./src/workflow/mail",
        "@tools": "./src/workflow/tools",
        "@user": "./src/workflow/user"
      }
    }]
  ],
  ignore: [
    '**/*.spec.ts'
  ]
}