const gulp = require("gulp");
const sass = require("gulp-sass")(require("node-sass"));
const watch = require("gulp-watch");
const concat = require("gulp-concat");
const ts = require("gulp-typescript");
const tslint = require("gulp-tslint");


//defining tasks
gulp.task('sass', function(done){
    gulp.src('src/scss/*.scss')
        .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
        .pipe(concat("main.css"))
        .pipe(gulp.dest("dist/content-scripts/css/"));
    done();
});
gulp.task("manifest", function(done){
    gulp.src("manifest.json")
        .pipe(gulp.dest("dist/"));
    done();
});
gulp.task("resources", function(done){
    gulp.src("resources/*/*.svg")
        .pipe(gulp.dest("dist/resources/"));
    done();
});
//watching while development
gulp.task("watch", function(done){
    watch(["./src/scss/*.scss"], gulp.series("sass"));
});

//calling all tasks on "gulp"
gulp.task("default", gulp.parallel(
    "sass", 
    "manifest", 
    "resources"
    ));