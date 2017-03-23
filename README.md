#HOVEROOMBA



##Description
    A little game done with React + Typescript. Move a hover robot through a resizable room for cleaning the dirty patches. You can see little demonstration on the [demo site](https://kataclan.github.io/#/) 

##Folders 
    1.  src (input)
         |- app                 - all code files
         |- style               - all css files
         |- www                 - index.html  
            |- public           - All resources - images,  libs, styles ...

    2.  dist (output)
         |- debug
             |- public             - all www src/www/ files and folders
             |- app.js          - compiled source code
             |- app.maps.js     - sourcemaps
             |- app.css         - concat source styles
         |- release
             |- public             - all www src/www/ files and folders
             |- app.js          - compiled source code and minified
             |- app.css         - concat source styles and minified
     2. lib  
        |- [lib-name] 
             |- interfaces      - TS Interfaces
             |- models          - TS Models
             |- utils.js        - Util Function definitions
    
##Installation and running (can be empty)
------------------------------------
    On a terminal:

    1. run npm install -> Install packgages and dependencies
    2. Follow building steps. ( run #gulp debug )
    3. run npm start
    4. Open a browser and go to http://localhost:5000/

##Building
-----------------------------------

    [ Main Commands ]    
    1. gulp clean               - remove "./dist/" folder
    2. gulp build-debug         - copies builded and transpiled "src/www", build "src/style/", build "scr/app" to "./dist/debug"   
    3. gulp build-release       - copies builded and transpiled "src/www", build "src/style/", build "scr/app" to "./dist/release" 
    4. gulp building            - task build-debug and watch for any changes in "scr/app" and "src/style"






