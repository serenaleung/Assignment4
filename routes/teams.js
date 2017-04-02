const Express = require('express');
const router  = Express.Router();

router.get('/', function (request, response) {
  // response.clearCookie("todos")
  response.render('index');
})

router.post('/', function (request, response) {
  const names = request.body.names;
  // {} destructuring; same as above
  const {input} = request.body;
  let teams = request.cookies.teams;

  // ? make names into an array of names instead of a string
  let listOfNames = names.split(", ");

  let random = function(names, num) {
    let count = listOfNames.length-1;
    let randCount = listOfNames.length-1;
    let result = []

    for (let i=1; i<=num; i++) {
      teams[i] = [];
    	for (let j=0; j< (count/num); j++) {
        teams[i].push(" "+ listOfNames.splice(Math.floor(Math.random() * (randCount - 0) + 0), 1));
        randCount--;
      }

      result.push(`Team ${i}: ${teams[i]}`);
    }
    return result;
  }

  let call = random(listOfNames, input);
  console.log(call);

  // joining the old array with new nums, will keep displaying more resutlts as they get added
  // let newTeam = teams.concat(listOfNames);

  // const { counts = [] } = request.cookies;
  // putting newTeam into the teams cookie []

  response.cookie('teams', listOfNames);
  response.cookie('results', call);
  response.redirect('/teams');

})

router.get('/teams', function (request, response) {
  const teams = request.cookies.teams;
  const results = request.cookies.results;
  response.render('teams/index', { teams: teams, results: results });

})

module.exports = router;
