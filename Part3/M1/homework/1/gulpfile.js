const { src , dest } = require('gulp')
const less = require('gulp-less')
const cleancss = require('gulp-clean-css')
const rename = require('gulp-rename')

const style = () => {
    return src('src/css/index.less',{base:'src'})
    .pipe(less())
    .pipe(cleancss())
    .pipe(rename({'extname':'.min.css'}))
    .pipe(dest('dist'))
}

module.exports = {
    style
}