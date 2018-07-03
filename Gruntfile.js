module.exports = function( grunt ) {
	grunt.initConfig({
		clean: {
			prod: ['prod/*']
		},

		copy: {
			prod: {
				expand: true,
				cwd: 'src',
				src: ['**', '!**/{scss,templates}/**'],
				dest: 'prod'
			}
		},

		// Sass
		sass: {
			prod: {
				options: {
					style: 'compressed',
					sourcemap: 'none',
					require: 'sass-globbing'
				},
				files: {
					'prod/css/main.css' : 'src/scss/main.scss'
				},
				spawn: false
			}
		},

		// Sets autoprefixer for css files
		postcss: {
			prod: {
				options: {
					map: false,
					processors: [
						require('autoprefixer')({browsers: 'last 2 versions'})
					]
				},
				src: 'prod/css/*.css'
			}
		},

		twigRender: {
			options: {
				// Task-specific options go here.
			},
			prod: {
				files : [
					{
						data: {},
						expand: true,
						cwd: 'src/templates/',
						src: [
							'**/*.twig',
							'!partials/**/_*.twig',
							'!layouts/**/*.twig'
						],
						dest: 'prod',
						ext: '.html'
					}
				]
			}
		},

		connect: {
			prod: {
				options: {
					port: 8000,
					base: 'prod',
					open: true,
					keepalive: true
				}
			}
		},

		// Watches for a file save and refreshes browser with livereload
		watch: {
			dev: {
				files: ['src/**'],
				tasks: ['clean:prod', 'copy:prod', 'sass:prod', 'postcss:prod', 'twigRender:prod'],
				options: {
					livereload: true
				}
			}
		}

	});

	grunt.loadNpmTasks('grunt-twig-render');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-postcss');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');

	grunt.registerTask('default', ['clean:prod', 'copy:prod', 'sass:prod', 'postcss:prod', 'twigRender:prod']);
	grunt.registerTask('build', ['clean:prod', 'copy:prod', 'sass:prod', 'postcss:prod', 'twigRender:prod']);
	grunt.registerTask('serve', ['clean:prod', 'copy:prod', 'sass:prod', 'postcss:prod', 'twigRender:prod', 'connect:prod']);
	grunt.registerTask('local', ['clean:prod', 'copy:prod', 'sass:prod', 'postcss:prod', 'twigRender:prod', 'connect:prod', 'watch']);
	grunt.registerTask('dev', ['clean:prod', 'copy:prod', 'sass:prod', 'postcss:prod', 'twigRender:prod', 'watch']);
};
