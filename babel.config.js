module.exports = {
  presets: [
    ['@babel/preset-env', {targets: { node: 'current' }}],
    '@babel/preset-typescript'
  ],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          "@config": ["./src/config"],
          "@errors": ["./src/shared/errors"],
          "@middlewares": ["./src/shared/infra/http/middlewares"],
          "@providers": ["./src/shared/container/providers"],
          "@shared": ["./src/shared"],
          "@shared:routes": ["./src/shared/infra/http/routes"],
          "@shared:typeorm": ["./src/shared/infra/typeorm"],
          "@accounts:cases": ["./src/modules/accounts/use-cases"],
          "@accounts:container": ["./src/modules/accounts/infra/container"],
          "@accounts:dtos": ["./src/modules/accounts/dtos"],
          "@accounts:entities": ["./src/modules/accounts/infra/typeorm/entities"],
          "@accounts:mocks": ["./src/modules/accounts/repositories/in-memory"],
          "@accounts:repos": ["./src/modules/accounts/infra/typeorm/repositories"],
          "@accounts:irepos": ["./src/modules/accounts/repositories"],
          "@accounts:routes": ["./src/modules/accounts/infra/http"],
          "@accounts:types": ["./src/modules/accounts/@types"],
          "@cars:cases": ["./src/modules/cars/use-cases"],
          "@cars:container": ["./src/modules/cars/infra/container"],
          "@cars:dtos": ["./src/modules/cars/dtos"],
          "@cars:entities": ["./src/modules/cars/infra/typeorm/entities"],
          "@cars:mocks": ["./src/modules/cars/repositories/in-memory"],
          "@cars:repos": ["./src/modules/cars/infra/typeorm/repositories"],
          "@cars:irepos": ["./src/modules/cars/repositories"],
          "@cars:routes": ["./src/modules/cars/infra/http"],
          "@cars:types": ["./src/modules/cars/@types"],
          "@rental:cases": ["./src/modules/rental/use-cases"],
          "@rental:container": ["./src/modules/rental/infra/container"],
          "@rental:dtos": ["./src/modules/rental/dtos"],
          "@rental:entities": ["./src/modules/rental/infra/typeorm/entities"],
          "@rental:mocks": ["./src/modules/rental/repositories/in-memory"],
          "@rental:repos": ["./src/modules/rental/infra/typeorm/repositories"],
          "@rental:irepos": ["./src/modules/rental/repositories"],
          "@rental:routes": ["./src/modules/rental/infra/http"],
          "@rental:types": ["./src/modules/rental/@types"]
        }
      }
    ],
    "babel-plugin-transform-typescript-metadata",
    ["@babel/plugin-proposal-decorators", {legacy: true}],
    ["@babel/plugin-proposal-class-properties", {loose: true}],
  ]
}
