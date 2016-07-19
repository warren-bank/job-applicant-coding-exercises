# [SumoMe-02](https://github.com/warren-bank/job-applicant-coding-exercises/tree/SumoMe-02)

## Coding Exercise

>  01. Create a web app written in Node.JS using an Express based framework, SequelizeJS, and MySQL.
>  02. Use the latest stable release of Node.JS v0.10.x.
>  03. Follow the [ES5 JavaScript Style Guide](https://github.com/airbnb/javascript/tree/master/es5)
>  04. Use NPM to declare all dependencies so that we can run it in a test environment.
>  05. The app should allow an admin to enter survey questions with multiple choice answers.
>  06. When a guest visits the app in a browser it should present a random survey question to the guest and allow them to answer.
>  07. Avoid showing a previously answered question to the same guest.
>  08. Record answers and display the survey results in an admin interface.
>  09. Secure the admin interface from guests.
>  10. Make sure the UI is mobile browser friendly.
>  11. Provide a clear README with instructions on how to setup and run the app.
>  12. Create a github.com repository with the app that we can pull from and test.
>  13. Provide a link to your application running on a publicly accessible server with any credentials needed to fully test it.

## Installation

### Download Solution Set

```bash
wget "https://github.com/warren-bank/job-applicant-coding-exercises/archive/SumoMe-02.zip"
unzip "SumoMe-02.zip"
mv "job-applicant-coding-exercises-SumoMe-02" "SumoMe-02"
cd "SumoMe-02"
```

*notes:*
* It isn't advisable to use git to clone the entire repository. The solution set for this coding exercise is isolated to one particular branch. Other branches may exist that contain code for other unrelated coding exercises.
* The git repo contains all branches. It is a much larger download. After the repo has been cloned, it would be necessary to checkout the appropriate branch.
* If, however, you prefer this workflow:

  ```bash
  git clone "https://github.com/warren-bank/job-applicant-coding-exercises.git"
  mv "job-applicant-coding-exercises" "SumoMe-02"
  cd "SumoMe-02"
  git checkout "SumoMe-02"
  rm -rf ".git"
  ```

### Install all Node.js dependencies with `npm`

```bash
npm install
```

### Initialize the MySQL database

```bash
npm run-script wipe
```

*notes:*
* This assumes that `mysqld` is running on `localhost` and no password is set for its `root` user; configure as needed.

*summary:*
* create database `job_applicant_coding_exercise__warren_bank`
* create user `warren_bank`
* create tables `sessions`, `admin_users`, `surveys`, `answers`
* add login credentials for two admin users
  * `warren:bank`
  * `SumoMe:hire`
* add 6 sample surveys, each having 4 possible answers and a random distribution of results

### Start the Web Server

```bash
PORT=80
npm run-script start
```

## Public Web Host

[Red Hat OpenShift](https://developers.openshift.com/overview/basic-terminology.html)

### Site Map

*public access:*
* [homepage: visitors are asked to complete surveys](http://surveys-warrenbank.rhcloud.com/)
* [login form: admin users can authenticate identity](http://surveys-warrenbank.rhcloud.com/admin/login)
* [RESTful data API endpoint, GET one survey](http://surveys-warrenbank.rhcloud.com/data/survey)
* [RESTful data API endpoint, PUT one answer](http://surveys-warrenbank.rhcloud.com/data/answer/<surveyId>/<answerId>)

*restricted access:*
* [admin: view all survey results](http://surveys-warrenbank.rhcloud.com/admin)
* [admin: save new survey](http://surveys-warrenbank.rhcloud.com/admin/new_survey)
* [admin: logout](http://surveys-warrenbank.rhcloud.com/admin/logout)
* [admin: RESTful data API endpoint, GET all results](http://surveys-warrenbank.rhcloud.com/admin/data/results)
* [admin: RESTful data API endpoint, GET one result by ID](http://surveys-warrenbank.rhcloud.com/admin/data/result/<surveyId>)
* [admin: RESTful data API endpoint, POST new survey](http://surveys-warrenbank.rhcloud.com/admin/data/surveys)

### Status

completed, deployed
