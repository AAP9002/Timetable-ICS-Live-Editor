## Implement your feature in its own file in /server/features
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

## Set up your feature in /server/index.js
- import your code within the commented section 'IMPORT FEATURES'
- Add a switch case for your feature in the performModifications method

## Finally
- add your feature to the README.md
- create a pull request
- once merged, I will add code on the front end to users can enable your feature