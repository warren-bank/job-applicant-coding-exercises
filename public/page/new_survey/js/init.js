System.config({
  map: {
    "page/new_survey/js/app": "/page/new_survey/js/app.js"
  },
  packages: {
    "page/new_survey/js/app": {
      format: 'register',
      defaultExtension: 'js'
    }
  }
});

System.import("page/new_survey/js/app")
  .then(null, console.error.bind(console));
