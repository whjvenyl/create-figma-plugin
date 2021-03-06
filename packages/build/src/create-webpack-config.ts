import { constants } from '@create-figma-plugin/common'
import { join, resolve } from 'path'
import * as TerserPlugin from 'terser-webpack-plugin'
import * as webpack from 'webpack'

export function createWebpackConfig (
  entry: webpack.Entry,
  isDevelopment: boolean
): webpack.Configuration {
  const mode = isDevelopment ? 'development' : 'production'
  return {
    mode,
    entry,
    output: {
      filename: '[name].js',
      path: join(process.cwd(), constants.build.directoryName)
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules\/(?!@create-figma-plugin)/,
          use: {
            loader: 'babel-loader',
            options: {
              plugins: [
                '@babel/plugin-proposal-object-rest-spread',
                [
                  '@babel/plugin-transform-template-literals',
                  {
                    loose: true
                  }
                ],
                [
                  '@babel/plugin-transform-react-jsx',
                  {
                    pragma: 'h',
                    pragmaFrag: 'Fragment'
                  }
                ]
              ]
            }
          }
        },
        {
          test: /\.tsx?$/,
          exclude: /node_modules\/(?!@create-figma-plugin)/,
          use: {
            loader: 'ts-loader',
            options: {
              compilerOptions: {
                moduleResolution: 'node',
                module: 'es2020',
                target: 'es6'
              }
            }
          }
        },
        {
          test: /\.s?css$/,
          use: [
            {
              loader: 'style-loader',
              options: {
                injectType: 'styleTag'
              }
            },
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                modules: true
              }
            },
            {
              loader: 'sass-loader'
            }
          ]
        }
      ]
    },
    resolve: {
      modules: [
        join(process.cwd(), constants.src.directory),
        join(process.cwd(), 'node_modules'),
        resolve(process.cwd(), '..', '..', 'node_modules'), // Lerna monorepo
        process.cwd(),
        'node_modules'
      ],
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
    },
    devtool: isDevelopment ? 'inline-cheap-module-source-map' : false,
    stats: 'errors-only',
    plugins: [
      new webpack.EnvironmentPlugin({
        NODE_ENV: mode
      })
    ],
    optimization: {
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            output: {
              comments: false
            }
          },
          extractComments: false
        })
      ]
    }
  }
}
