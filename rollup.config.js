import jsx from 'rollup-plugin-jsx'
import babel from 'rollup-plugin-babel'
import esformatter from 'rollup-plugin-esformatter'
import cleanup from 'rollup-plugin-cleanup'

const es5 = process.env.BUILD === 'es5' && {
    dest: 'dist/react-canvas-component.es5.js',
    plugins: [
        'transform-es2015-classes',
        'transform-es2015-block-scoping',
        'transform-es2015-destructuring',
        'transform-es2015-shorthand-properties',
    ],
}

export default {
    format: 'cjs',
    entry: 'src/react-canvas-component.jsx',
    dest: es5 ? es5.dest : 'dist/react-canvas-component.js',
    external: [
        'react',
        'react-dom',
    ],
    interop: true,
    plugins: [
        babel({
            plugins: [
                'syntax-jsx',
                'transform-class-properties',
                'transform-object-rest-spread',
                ...(es5 ? es5.plugins : []),
            ],
        }),
        jsx({
            factory: 'React.createElement',
        }),
        esformatter({
            indent: {
                value: '  ',
            },
            lineBreak: {
                before: {
                    ClassDeclaration: 2,
                },
                after: {
                    FunctionDeclarationClosingBrace: 2,
                    ClassOpeningBrace: 1,
                    ClassClosingBrace: 2,
                },
            },
        }),
        cleanup(),
    ],
}
