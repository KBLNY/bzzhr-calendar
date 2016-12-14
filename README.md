# BZZHR-Calendar
This repository is intented to be used for a demo. 
This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Content
- [Features](#features)
- [Testing](#testing)
- [Project Structure](#project-structure)
- [Dependencies](#dependencies)
- [TODOS](#todos)

## Features
- Display a list of Events provided in JSON through an API endpoint
- Navigation between weeks
- Week/Month view
- Overlapping events hendled
- Filters on Start and/or End dates
- Responsiveness (could be improve with Bootstrap)
- npm to manage dependencies

## Testing
You can either test the complied build version, or up to you to test this build version into your local server.

Simply test from the compiled version:
1. Download or clone the project
2. Run `cd bzzhr-calendar` to navigate into the project's folder
3. Navigate to the `build` folder 
4. Open `index.html``
 
Test on your local server:
1. Download or clone the project
2. Run `cd bzzhr-calendar` to navigate into the project's folder
3. Run `npm install -g pushstate-server`
4. Run `pushstate-server build`
5. Run `open http://localhost:9000`

## Project Structure
This app is based on React.js. The project app folder is organized as follow:
```
- /
|- build (Compiled version, ready to be deployed on a server)
|- node_modules (contains all npm modules used in the app: react, react-native, etc.)
|- public (static resources)
|- src 
    |- api (all managers handle API calls)
    |- assets
        |- img (contains all images used in the app)
    |- component (This folder contains all reusable components, like Button or Text)
    |- helpers (utils using for stats, formatting, etc.)
    |- i18n (contains localized strings)
    |- models (all models representing the data)
```

## Dependencies
Dependencies are managed by NPM. These will be installed on `npm install` a the root of the project folder.

## TODOS
- [ ] Localized the whole App using react-native-localization
- [ ] Use a router to navigate between "pages", using a powerful routing system
- [ ] Use Flux/Redux to handle state
- [ ] APIs calls and Models would come from a shared JavaScript SDK. That one would be then used by the Mobile Apps, by external APIs, the Web App, etc. 
- [ ] Use TypeScript
- [ ] Add CI
- [ ] Add Code Quality badge

---

>**Copyright &copy; 2016 KBLNY.**

*Please provide attribution, it is greatly appreciated.*
