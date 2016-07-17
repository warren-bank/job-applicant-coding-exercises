System.config({
  map: {
    "app": "/page/new_survey/js/app.js"
  },
  packages: {
    "app": {
      format: 'register',
      defaultExtension: 'js'
    }
  }
});

System.import("app")
  .then(null, console.error.bind(console));
