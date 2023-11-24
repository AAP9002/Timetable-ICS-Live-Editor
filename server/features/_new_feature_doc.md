## 1. Implement your feature in its own file in ```/server/features```
```js
// your feature
// @author : your github username
// @date : the date you created this file
// @description : a short description of what your feature does
// @params : any parameters your feature needs
// @returns : what your feature returns
// @notes : any notes you want to add

function run(cal) {
  // your code

  return cal
}

module.exports = {
    run,
};
```

## 2. Set up your feature in ```/server/index.js```
- Import your code within the commented section 'IMPORT FEATURES'
- Add a switch case for your feature in the performModifications method

## 3. Add your feature to the front end
- Add your feature as an option to the user in ```/client/src/components/customization/CustomizationSection.js```

## 4. Finally
- Add your feature to the README.md
- Create a pull request
- Once merged, I will add code on the front end to users can enable your feature