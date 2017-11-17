/**
 * Created by WANGP on 2017/11/14.
 */
/**
 * Created by WANGP on 2017/11/14.
 */
var module;
module.exports = function(grunt) {

    var sassStyle = 'expanded';
    var appName = 'learnMVC';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        // sass: {
        //   output : {
        //     options: {
        //       style: sassStyle
        //     },
        //     files: {
        //       './style.css': './scss/style.scss'
        //     }
        //   }
        // },
        appTpl: appName,
        concat: {
            dist: {
                src: ['./src/js/*.js'],
                dest: './src/build/global.js',
            },
        },
        uglify: {
            compressjs: {
                files: {
                    // 这里必须是常量，不能只改appName，需要手动改
                    './src/build/global.min.js': ['./src/build/global.js']
                }
            }
        },
        jshint: {
            all: ['./src/js/*.js']
        },
        watch: {
            scripts: {
                files: ['./src/js/*.js'],
                // tasks: ['jshint']
                tasks: ['concat','jshint','uglify']
            },
            // sass: {
            //   files: ['./scss/style.scss'],
            //   tasks: ['sass']
            // },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>' //监听connect中声明的端口
                },
                files: [  //下面文件的改变就会实时刷新网页
                    './src/*.html',
                    './src/css/{,*/}*.css',
                    './src/js/{,*/}*.js',
                    './src/img/{,*/}*.{png,jpg}'
                ]
            }
        },
        connect: {
            options: {
                port: 9000,
                open: true,
                livereload: 35729, //声明给watch监听的端口
                // Change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost' // 本机域名
            },
            server: {
                options: {
                    port: 9001,
                    base: './src/'
                }
            }
        }
    });

    // grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');

    // grunt.registerTask('outputcss',['sass']);
    grunt.registerTask('concatjs',['concat']);
    grunt.registerTask('compressjs',['concat','jshint','uglify']);
    // grunt.registerTask('watchit',['sass','concat','jshint','uglify','connect','watch']);
    grunt.registerTask('watchit',['concat','jshint','uglify','connect','watch']);
    grunt.registerTask('default');

};