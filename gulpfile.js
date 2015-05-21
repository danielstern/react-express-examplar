var browserSync = require('browser-sync');
var gulp = require('gulp');
var LiveServer = require('gulp-live-server');
var source = require('vinyl-source-stream');
//var babelify = require('babelify');
var browserify = require('browserify');

gulp.task('live-server',function(){
	var server = new LiveServer('server/main.js');
	server.start();
	
	gulp.watch('./server/*.js')
		.on('change',server.start);
});

gulp.task('bundle',function(){
	return browserify({
		entries:'app/main.js',
	})
	.bundle()
	.pipe(source('app.js'))
	.pipe(gulp.dest('./.tmp'));
});

gulp.task('temp',function(){
	return gulp.src('app/index.html')
	.pipe(gulp.dest('./.tmp'));
});


gulp.task('serve', ['live-server','bundle','temp'], function() {
	console.log("Serving now.");
});