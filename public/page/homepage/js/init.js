System.config({
  map: {
    "page/homepage/js/app": "/page/homepage/js/app.js"
  },
  packages: {
    "page/homepage/js/app": {
      format: 'register',
      defaultExtension: 'js'
    }
  }
});

System.import("page/homepage/js/app")
  .then(null, console.error.bind(console));
