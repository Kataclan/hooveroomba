WORKSPACE 
------------------------------------

    1. see _readme.txt in workspace folder.
    2. first, configure all workspace

INSTALL (can be empty)
------------------------------------
    1. npm install
    2. DB Configuration: Change _rootUrl in ./lib/client-lib/src/ApiCalls.ts constructor with your API URL


FOLDERS 
------------------------------------
    1.  src (input)
         |- app                 - all code files
         |- style               - all css files
         |- www                 - index.html and all resources - images,  libs, styles ... 

    2.  dist (output)
         |- debug
             |- ...             - all www src/www/ files and folders
             |- app.js          - compiled source code
             |- app.maps.js     - sourcemaps
             |- app.css         - concat source styles
         |- release
             |- ...             - all www src/www/ files and folders
             |- app.js          - compiled source code and minified
             |- app.css         - concat source styles and minified
     2. lib  
        |- [lib-name] 
             |- dist            - js code. To include, copy to "./www/lib" and import in apps HTML (<script src"../../../www/lib/[lib name]"></script>)
             |- src             - ts code. To include use require and relative path. 

BUILD
-----------------------------------

    

    [ Main Commands ]    
    1. gulp clean               - remove "./dist/" folder
    2. gulp build-debug         - to "./bin/debug"   copy "src/www", build "src/style/", build "scr/app"
    3. gulp build-release       - to "./bin/release" copy "src/www", build "src/style/", build "scr/app"
    4. gulp building            - task build-debug and watch for any chandes in "scr/app" and "src/style"

    [ Other Commands ]    
    1. gulp www-debug           - to "./bin/debug"   copy "src/www"
    2. gulp www-release         - to "./bin/release" copy "src/www"
