var gulp = require("gulp");
var browserify = require("browserify");
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var buffer = require('vinyl-buffer');
var tsify = require("tsify");
var gutil = require("gulp-util");
var watchify = require("watchify");
var clean = require('gulp-clean');
var uglify = require('gulp-uglify');
var size = require('gulp-size');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');
var mold = require('mold-source-map');
var zip = require('gulp-zip');
var sftp = require('gulp-sftp');
var fs = require('fs');
const path = require('path');

var paths = { in: {
        code: ['src/app/index.tsx'],
        style: "src/style/**/*.*",
        wwwFiles: ['src/www/**/*.*'],
        wwwFolder: "src/www/",
    },
    out: {
        folder: "dist/",
        debug: {
            main: "dist/debug/",
            js: "dist/debug/js",
            css: "dist/debug/css"
        },
        release: {
            main: "dist/release/",
            js: "dist/release/js",
            css: "dist/release/css"
        },
        jsFileName: "app.js",
        cssFileName: "style.css",
    }
};
//#region [ www ]
gulp.task("www-debug", function() {
    return gulp.src(paths.in.wwwFiles, { base: paths.in.wwwFolder })
        .pipe(gulp.dest(paths.out.debug.main));
});
gulp.task("www-release", function() {
    return gulp.src(paths.in.wwwFiles, { base: paths.in.wwwFolder })
        .pipe(gulp.dest(paths.out.release.main));
});
//#endregion

//#region [ app ]
gulp.task("clean", function() {
    return gulp.src(paths.out.folder)
        .pipe(clean());
});
gulp.task("debug", ["www-debug", "css-debug"], function() {
    return browserify({
            debug: true,
            entries: paths.in.code
        })
        // .exclude("jquery")
        // .exclude("react")
        // .exclude("react-dom")
        // .exclude("material-ui")
        .plugin(tsify)
        .bundle()
        .pipe(mold.transformSourcesRelativeTo(paths.out.debug.js))
        .pipe(source(paths.out.jsFileName))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(paths.out.debug.js))
        .pipe(size({ title: paths.out.debug.js + paths.out.jsFileName }));
});
gulp.task("release", ["www-release", "css-release"], function() {
    return browserify({
            entries: paths.in.code,
        })
        // .exclude("jquery")
        // .exclude("react")
        // .exclude("react-dom")
        // .exclude("material-ui")
        .plugin(tsify)
        .bundle()
        .pipe(source(paths.out.jsFileName))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest(paths.out.release.js))
        .pipe(size({ title: paths.out.release.js + paths.out.jsFileName }));
});

var watchedBrowserify = watchify(browserify({
    debug: true,
    entries: paths.in.code,
}).plugin(tsify));

function bundle() {
    gutil.log("start building app ...");
    return watchedBrowserify
        .bundle()
        .pipe(mold.transformSourcesRelativeTo(paths.out.debug.js))
        .pipe(source(paths.out.jsFileName))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(paths.out.debug.js))
        .pipe(size({ title: paths.out.debug.js + paths.out.jsFileName }));
}
gulp.task("building", ["www-debug", "building-css"], bundle);
watchedBrowserify.on("update", bundle);
watchedBrowserify.on("log", gutil.log);
//#endregion

//#region [ style ]
var bundle_css_debug = function() {
    return gulp
        .src(paths.in.style)
        .pipe(concat(paths.out.cssFileName))
        .pipe(gulp.dest(paths.out.debug.css))
        .pipe(size({ title: paths.out.debug.css + paths.out.cssFileName }));
}
gulp.task("css-debug", function() {
    return bundle_css_debug();
});
gulp.task("css-release", function() {
    return gulp
        .src(paths.in.style)
        .pipe(concat(paths.out.cssFileName))
        .pipe(gulp.dest(paths.out.release.css))
        .pipe(cleanCSS())
        .pipe(size({ title: paths.out.release.css + paths.out.cssFileName }))
});
gulp.task("building-css", ["css-debug"], function() {
    return gulp.watch([
            "src/style/**/*.css"
        ])
        .on('change', bundle_css_debug);
});
//#endregion

gulp.task("deploy-debug", ["debug"], function() {
    var appName = path.basename(__dirname);
    return gulp
        .src("dist/debug/**/*")
        .pipe(zip(appName + ".zip"))
        .pipe(gulp.dest("./pub/"));
});

gulp.task("deploy-release", ["inc-version", "release"], function() {
    var appName = path.basename(__dirname);
    return gulp
        .src("dist/release/**/*")
        .pipe(zip(appName + ".zip"))
        .pipe(gulp.dest("./pub/"));
});