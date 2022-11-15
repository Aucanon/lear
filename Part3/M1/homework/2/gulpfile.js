const { src , dest , parallel } = require('gulp')
const htmlmin = require('gulp-html-minifier-terser')

const html = () => {
    return src('src/index.html')
    .pipe(htmlmin({
        collapseWhitespace:true,
        minifyJS:true
    }))
    .pipe(dest('dist'))
}

const js = () => {
    return src('src/js/**',{base:'src'})
    .pipe((dest('dist')))
}

const build = parallel(html,js)

module.exports = {
    build
}