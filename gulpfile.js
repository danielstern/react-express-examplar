var browserSync = require('browser-sync');
var gulp = require('gulp');
var LiveServer = require('gulp-live-server');

gulp.task('live-server',function(){
	var server = new LiveServer('server/main.js');
	server.start();
	
	gulp.watch('server/main.js',server.start);
})

gulp.task('serve', ['live-server'], function() {
	browserSync.init(null, {
		proxy: "http://localhost",
		port: 9001
	});
});