summary:
========
the typescript compiler (tsc) is used to compile all .ts files into .js.
it's able to combine them all into a single .js file,
and uses the preferred (one of several available) module loader framework
to wrap the application into a single exported module.

in a similar way,
the entire angular2 framework is availabe as a module.

the basic requirement to run an angular2 app is:
  - module loader (system.js)
  - angular2 framework (angular2.min.js)
  - app (app.js)
  - glue (init.js),
    which calls the module loader and tells it the name of a module to load.
    this module is our app, and once its loaded.. all the magic happens.

where to download (or obtain) all of the javascript files that need to be hosted
================================================================================

option #1:
  * use npm to download:
        npm install systemjs
        npm install angular2
        npm install es6-shim
        npm install rxjs
  * cherry pick files:
        node_modules/es6-shim/es6-shim.min.js
        node_modules/angular2/bundles/angular2-polyfills.min.js
        node_modules/systemjs/dist/system.js
        node_modules/rxjs/bundles/Rx.min.js
        node_modules/angular2/bundles/angular2.min.js
        node_modules/angular2/bundles/http.min.js

option #2:
==========
  * point to ones that are already hosted:
        <script src="http://cdnjs.cloudflare.com/ajax/libs/es6-shim/0.33.3/es6-shim.min.js"></script>
        <script src="https://code.angularjs.org/2.0.0-beta.17/angular2-polyfills.min.js"></script>
        <script src="https://code.angularjs.org/tools/system.js"></script>
        <script src="https://code.angularjs.org/2.0.0-beta.17/Rx.min.js"></script>
        <script src="https://code.angularjs.org/2.0.0-beta.17/angular2.min.js"></script>
        <script src="https://code.angularjs.org/2.0.0-beta.17/http.min.js"></script>
    on a public CDN:
        https://code.angularjs.org/
        https://code.angularjs.org/2.0.0-beta.17/
