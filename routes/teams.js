const Express = require('express');
const router  = Express.Router();

router.get('/', function (request, response) {
  // response.clearCookie("todos")
  response.render('index');
})

router.post('/', function (request, response) {
  const names = request.body.names;
  // { count } is the same as count = request.body.count
  const input = request.body.input;
  // const { result } = request.body;

  let teams = request.cookies.teams;
  let num = request.cookies.input;
  let results = request.cookies.result;

  if(!teams) {
    teams = [];
  }

  // ? make names into an array of names instead of a string
  let listOfNames = names.split(", ");

  let random = function(names, num) {
    let teams = [];
    let count = listOfNames.length-1;
    let randCount = listOfNames.length-1;
    let result = []

    for (let i=1; i<=num; i++) {
      teams[i] = [];
    	for (let j=0; j< (count/num); j++) {
        teams[i].push(" "+ listOfNames.splice(Math.floor(Math.random() * (randCount - 0) + 0), 1));
        randCount--;
      }
    	// console.log(`Team ${i}: ${teams[i]} console`);
    	// result = `Team ${i}: ${teams[i]}`;

      // console.log(teams)
      // return result;
      result.push(`Team ${i}: ${teams[i]}`);
      // console.log(`Team ${i}: ${teams[i]}`);
      // console.log(teams);
    }
    return result
  }

    let call = random(listOfNames, input);
    // random("names", 3);
    console.log(call);

  // joining the old array with new nums, will keep displaying more resutlts as they get added
  // let newTeam = teams.concat(listOfNames);

  // const { counts = [] } = request.cookies;
  // console.log(`listOfNames: ${listOfNames}, num: ${num}`);
  // console.log(`results: ${results}`);
  // console.log(`result: ${result}`);
  // putting newTeam into the teams cookie []

  response.cookie('teams', listOfNames);
  response.cookie('results', call);
  response.cookie('num', input);
  response.redirect('/teams');

})

router.get('/teams', function (request, response) {
  const teams = request.cookies.teams;
  const results = request.cookies.results;
  response.render('teams/index', { teams: teams, results: results });
  // response.render('teams/index', { results: results });
})

module.exports = router;
