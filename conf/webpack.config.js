const path = require('path');
const { CheckerPlugin, TsConfigPathsPlugin } = require('awesome-typescript-loader');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const isWatch = (process.env.WATCH === 'true');
const NODE_ENV = 'production';

// identify paths
const PROJECT_ROOT = path.resolve(__dirname, '../');
var PATHS = {
    entryPoint: path.resolve(PROJECT_ROOT, 'src/index.ts'),
    bundles: path.resolve(PROJECT_ROOT, 'dist/_bundles'),
    tsConfig: path.resolve(PROJECT_ROOT, 'src/tsconfig.json')
}

const LIBRARY_NAME = 'scatter';

var config = {

    // These are the entry point of our library. We tell webpack to use
    // the name we assign later, when creating the bundle. We also use
    // the name to filter the second entry point for applying code
    // minification via UglifyJS
    entry: {
        'scatter': [PATHS.entryPoint],
        'scatter.min': [PATHS.entryPoint],
    },

    // The output defines how and where we want the bundles. The special
    // value `[name]` in `filename` tell Webpack to use the name we defined above.
    // We target a UMD and name it scatter. When including the bundle in the browser
    // it will be accessible at `window.scatter`
    output: {
        path: PATHS.bundles,
        filename: '[name].js',
        libraryTarget: 'umd',
        library: LIBRARY_NAME,
        umdNamedDefine: true
    },

    // Add resolve for `tsx` and `ts` files, otherwise Webpack would
    // only look for common JavaScript file extension (.js)
    resolve: {
        extensions: [
            '.ts', '.tsx',
            '.js', '.jsx'
        ]
    },

    // Activate source maps for the bundles in order to preserve the original
    // source when the user debugs the application
    devtool: 'source-map',

    mode: 'production',

    plugins: [
        new CheckerPlugin()
    ],

    module: {
        // Webpack doesn't understand TypeScript files and a loader is needed.
        // `node_modules` folder is excluded in order to prevent problems with
        // the library dependencies, as well as `__tests__` folders that
        // contain the tests for the library
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader',
                options: {
                    // we don't want any declaration file in the bundles
                    // folder since it wouldn't be of any use ans the source
                    // map already include everything for debugging
                    declaration: false,
                    configFileName: PATHS.tsConfig
                },
                exclude: /node_modules/
            }
        ]
    },

    optimization: {
        minimizer: [
            // Apply minification only on the second bundle by
            // using a RegEx on the name, which must end with `.min.js`
            // NB: Remember to activate sourceMaps in UglifyJsPlugin
            // since they are disabled by default!
            new UglifyJsPlugin({
                include: /\.min\.js$/,
                parallel: true,
                sourceMap: true,
                uglifyOptions: {
                    ecma: 8,
                    warnings: false,
                    output: {
                        comments: false,
                        beautify: false
                    },
                    toplevel: false,
                    nameCache: null,
                    ie8: false,
                    keep_classnames: undefined,
                    keep_fnames: false,
                    safari10: false,
                }
            })
        ],
        noEmitOnErrors: true
    },

    // Tell webpack not to bundle the following things, if it sees them
    externals: {
        electron: 'electron',
        child_process: 'child_process',
        crypto: 'crypto',
        events: 'events',
        fs: 'fs',
        http: 'http',
        https: 'https',
        assert: 'assert',
        dns: 'dns',
        minimist: 'minimist',
        net: 'net',
        os: 'os',
        path: 'path',
        querystring: 'querystring',
        readline: 'readline',
        repl: 'repl',
        stream: 'stream',
        string_decoder: 'string_decoder',
        url: 'url',
        util: 'util',
        zlib: 'zlib',
        lodash: {
            commonjs: 'lodash',
            amd: 'lodash',
            root: '_' // indicates global variable
        }
    }
};


function describePackJob() {
    if (isWatch) {
        return;
    }
    console.log(' ');
    console.log('====================================================================================================');
    console.log(`==    PACKAGING  ${LIBRARY_NAME.toUpperCase()}`);
    console.log('====================================================================================================');
    console.log(' ');
    console.log(`        NODE_ENV: [${NODE_ENV}]`);
    console.log(`    PROJECT_ROOT: [${PROJECT_ROOT}]`);
    console.log(`       entryPath: [${PATHS.entryPoint}]`);
    console.log(`        tsConfig: [${PATHS.tsConfig}]`);
    console.log(`    BUNDLES PATH: [${PATHS.bundles}]`);
    console.log(' ');
}
describePackJob();

// Exports
module.exports = config;
