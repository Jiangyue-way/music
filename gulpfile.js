var gulp = require("gulp");
var imagemin = require("gulp-imagemin");
var newer = require("gulp-newer");    //这个插件只会将当前目录下面的新文件放入到工作流中
var htmlclean = require("gulp-htmlclean");   //压缩html
var jsUglify = require("gulp-uglify");
var stripDebug = require("gulp-strip-debug");  //去掉js里的调试语句,包括console
var jsconcat = require("gulp-concat");   //js文件拼接起来
var less = require("gulp-less");   //less转换成css
var postcss = require("gulp-postcss");  //自动添加css样式的前缀，如webkit
var autoprefixer = require("autoprefixer");  //添加前缀
var cssnano = require("cssnano");  //压缩css代码
var gulpConnect = require("gulp-connect");  //服务器插件
var gulpUtil = require("gulp-util");   //查找js出错地方

// console.log(process.env.NODE_ENV == "producation")   //生产环境
var devMode = process.env.NODE_ENV == "development"   //开发环境
console.log(devMode);
var folder={
    src: "src/",  //开发目录
    dist: "dist/"  //压缩打包后的目录文件夹
}

// gulp.src()    //读文件
// gulp.dest()   //写文件
// gulp.task()   //任务
// gulp.watch()  //监听

//流读取文件
gulp.task("htm", function () {
    var page = gulp.src(folder.src + "html/*")
                   .pipe(gulpConnect.reload())  //自动刷新
    if(!devMode){
        page.pipe(htmlclean())
    }
    page.pipe(gulp.dest(folder.dist + "html"))

})
gulp.task("css", function () {
    var options = [autoprefixer(), cssnano()]
    var page = gulp.src(folder.src + "css/*")
                   .pipe(less())
                   .pipe(gulpConnect.reload())  //自动刷新
    if(!devMode){
        page.pipe(postcss(options))
    }
    page.pipe(gulp.dest(folder.dist + "css"))
})
gulp.task("js", function() {
    var page = gulp.src(folder.src + "js/*")
                   .pipe(gulpConnect.reload());  //自动刷新
    if(!devMode){
        page.pipe(stripDebug())
            .pipe(jsUglify())
            .on('error', function(err) {
                //打印出错日志
                gulpUtil.log(gulpUtil.colors.red('[Error]'), err.toString());
            })

    }
    page.pipe(gulp.dest(folder.dist + "js"))
        // .pipe(jsconcat("main.js"))
        
})
gulp.task("imag", function () {
    gulp.src(folder.src + "images/*")
        .pipe(newer(folder.dist + "images"))
        .pipe(imagemin())
        .pipe(gulp.dest(folder.dist + "images"))

})
gulp.task("watch", function() {
    gulp.watch(folder.src + "html/*", ["htm"])
    gulp.watch(folder.src + "css/*", ["css"])
    gulp.watch(folder.src + "js/*", ["js"])
    gulp.watch(folder.src + "images/*", ["imag"])
})
gulp.task("server", function () {
    gulpConnect.server({
        port: "8090",
        livereload: true  //浏览器自动刷新
    })
})


gulp.task("default", ["htm", "imag", "js", "css", "watch", "server"]);