var gulp = require('gulp');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var mochaPhantomJS = require('gulp-mocha-phantomjs');

// list of source files listed in order
var source = [ 'src/init.js', 'src/config.js', 'src/html-to-json.js', 'src/render.js', 'src/options.js' ];

// for each source file there must be a spec file present
var spec = source.map(function(el) { return el.replace('.js', '-spec.js').replace('src', 'spec'); });

// lint and concatenate library files
gulp.task('build', function() {
	return gulp.src(source)
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(concat('chartist-html.js'))
		.pipe(gulp.dest('./build/'));
});

// concatenate specs
gulp.task('concat-spec', function() {
	return gulp.src(spec)
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(concat('chartist-html-spec.js'))
		.pipe(gulp.dest('./spec/runner'));
});

// run specs only after they are concatenated
gulp.task('run-spec', [ 'concat-spec' ], function() {
	return gulp.src('./spec/runner/runner.html')
		.pipe(mochaPhantomJS());
});

gulp.task('watch', function() {
	gulp.watch('src/**/*.js', [ 'build' ]);
});

gulp.task('default', [ 'build', 'concat-spec', 'run-spec' ]);