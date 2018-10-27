var _ = require("underscore");

var data = {
  f01: {
    name: "Alice",
    age: 15,
    follows: ["f02", "f03", "f04"]
    // followers: Charlie, Debbie (2)
  },
  f02: {
    name: "Bob",
    age: 20,
    follows: ["f05", "f06"]
    // followers: Alice, Debbie (2)
  },
  f03: {
    name: "Charlie",
    age: 35,
    follows: ["f01", "f04", "f06"]
    // followers: Alice, Debbie (2)
  },
  f04: {
    name: "Debbie",
    age: 40,
    follows: ["f01", "f02", "f03", "f05", "f06"]
    // followers: Alice, Charlie, Elizabeth (3)
  },
  f05: {
    name: "Elizabeth",
    age: 45,
    follows: ["f04"]
    // followers: Bob, Debbie, Finn (3)
  },
  f06: {
    name: "Finn",
    age: 25,
    follows: ["f05"]
    // followers: Bob, Charlie, Debbie (3)
  }
};
// --------------------------------

// database for user names based on id codes
var allNames = {
  "f01": data["f01"]["name"],
  "f02": data["f02"]["name"],
  "f03": data["f03"]["name"],
  "f04": data["f04"]["name"],
  "f05": data["f05"]["name"],
  "f06": data["f06"]["name"]
}

// converts a name back to code
var backToCode = function (name){
  var codeName = "";
  for (var code in data){
    if (name == data[code]["name"]){ // if the input name equals the code name
      codeName = code;
      return codeName;
    }
  }
}

// get a user's followers
var getFollowers = function(userId){
  var followers = "";
  for (var person in data){ // for each person in data/
    for (var code in data[person]["follows"]){ // for each code in data/"person"/follows
      if (userId === data[person]["follows"][code]){
        followers += data[person]["name"] + ", ";
      }
    }
  }
  var output = followers.substring(0, followers.length - 2);
  return output;
}

// get a user's followers who are over 30
var getFollowersOverThirty = function(userId){
  var followers = ""; // create an emppty string
  for (var person in data){ // for each person in data/
    for (var code in data[person]["follows"]){ // for each id in data/"person"/follows/
      if (userId === data[person]["follows"][code] && data[person]["age"] > 30)
        followers += data[person]["name"] + ", ";
    }
  }
  var output = followers.substring(0, followers.length - 2);
  return output;
}

// get a list of who a user is following
var getFollowing = function(userId){
  var realName = allNames[userId];
  var following = "";
  for (var person in data){ // for each person in data/
    if (realName == data[person]["name"]){ // if userId matches the name in data/
      for (var code in data[person]["follows"]){ // for each code in data/"person"/follows
        var followName = allNames[data[person]["follows"][code]]; // assign that name to a variable
        if (code < data[person]["follows"].length - 1){ // if the code index is less than the last spot
          following += followName + ", "; // add the name to the "following" string with a comma
        }
        else { // otherwise
          following += followName; // add the name to the "following" string
        }
      }
      return following; // return the "following" value
    }
  }
}

// get a user's age
var getAge = function(userId){
  var realName = allNames[userId]; // real name equals userId
  var age = 0;                     // current age is 0
  for (var user in data){          // for each user in data/
    if (realName == data[user]["name"]){ // if realName == data/"user"/name
      var age = data[user]["age"];    // age equals that person's age
    }
  }
  return(age);
}

// get a list of who a user is following (who are over 30)
var getFollowingOverThirty = function(userId){
  var realName = allNames[userId]; // get the user's real name
  var followArray = []; // creates an empty array
  var following = ""; // create an empty string
  for (var person in data){ // for each person in data/
    if (realName == data[person]["name"]){ // if the real name equals the id code (data/"person"), continue
      var tempString = getFollowing(userId); // now have an array [ "name1, name2, name 3" ]
      followArray = tempString.split(", "); // split the array (now equals [ "name1", "name2", "name3" ])
    }
  }
  for (var x = 0; x < followArray.length; x++){ // for each item in the array
    var elmCode = backToCode(followArray[x]);   // assign var elmCode to equal the id code in the array item
    var addName = allNames[elmCode];
    if (data[elmCode]["age"] > 30){
      following += addName + ", ";
    }
  }
  return following.substring(0, following.length - 2);
}

// count the number of followers of a user
var countFollowers = function(userId) {
  var followers = getFollowers(userId); // gets the list of followers
  var followersArray = followers.split(", ");
  var length = followersArray.length;
  return length;
}

var countFollowersOverThirty = function(userId){
  var followers = getFollowersOverThirty(userId);
  var followersArray = followers.split(", ");
  var length = followersArray.length;
  return length;
}

// count how many other users a user is following
var countFollowing = function(userId) {
  var following = getFollowing(userId);
  var followingArray = following.split(", ");
  var length = followingArray.length;
  return length;
}

var countFollowingOverThirty = function(userId){
  var following = getFollowingOverThirty(userId);
  var followingArray = following.split(", ");
  var length = followingArray.length;
  return length;
}

//----------------------------------------------------------------------------------------
// FIRST ASSIGNMENT - COMPLETE

// list everyone and for each of them, list the names of their followers and
// who follows them

var allData = function() {
  for (var person in data){
    var temp = person;
    var name = allNames[temp];
    var followers = getFollowers(temp);
    var following = getFollowing(temp);
    console.log("Name: " + name + ";   Following: " + following + ";   Followers: " + followers);
  }
}
// allData();

// Output:
// Name: Alice;   Following: Bob, Charlie, Debbie;   Followers: Charlie, Debbie
// Name: Bob;   Following: Elizabeth, Finn;   Followers: Alice, Debbie
// Name: Charlie;   Following: Alice, Debbie, Finn;   Followers: Alice, Debbie
// Name: Debbie;   Following: Alice, Bob, Charlie, Elizabeth, Finn;   Followers: Alice, Charlie, Elizabeth
// Name: Elizabeth;   Following: Debbie;   Followers: Bob, Debbie, Finn
// Name: Finn;   Following: Elizabeth;   Followers: Bob, Charlie, Debbie

//----------------------------------------------------------------------------------------
// SECOND ASSIGNMENT - COMPLETE

// Identify who follows the most people

// Same as assignment 3 but with substituted variables

var followsMost = function () {
  var count = 0;
  var name = "";
  for (var id in data){
    var total = countFollowing(id);
    if (total > count){
      name = allNames[id];
      count = total;
    }
    else if (total == count){
      name += ", " + allNames[id];
    }
  }
  console.log("Following the most people: " + name);
}
// followsMost();

// Output:
// Following the most people: Debbie

//----------------------------------------------------------------------------------------
// THIRD ASSIGNMENT - COMPLETE

// Identify who has the most followers

// create an empty number variable "count"
// create an empty string variable "name"
// evaluate each user
  // count the number of followers that follower has
  // if the number of followers that that user has is greater than the previous count
    // string is equal to that user
    // count is now equal to that number of followers
  // else if the number of followers that user has is already equal to count
    // add the user's name to the string
// log "Most followers: " + name

var followersMost = function () {
  var count = 0;
  var name = "";
  for (var id in data){ // for each id in allNames (6 total)
    var total = countFollowers(id); // record the number of followers
    if (total > count){ // if the number of followers exceeds the previous count
      name = allNames[id];
      count = total; // count becomes equal to the new total
    }
    else if (total == count){
      name += ", " + allNames[id];
    }
  }
  console.log("Most followers: " + name);
}
// followersMost();

// Output:
// Most followers: Debbie, Elizabeth, Finn

//----------------------------------------------------------------------------------------
// ASSIGNMENT 4 - COMPLETE

// Identify who has the most followers over the age of 30:

// create an empty number variable "count"
// create an empty string variable "name"
// define an empty array variable "overThirty" (for people over 30)
// evaluate each user
  // count the number of followers (over 30) that that user has
  // if the number of followers (over 30) is greater than the previous count
    // string is equal to that user
    // count is now equal to that number of followers
  // else if the number of followers (over 30) is equal to the previous count
    // add the user's name to the string
// return the string

var followersOverThirty = function () {
  var count = 0;
  var name = "";
  for (var id in data){
    var total = countFollowersOverThirty(id);
    if (total > count){
      name = allNames[id];
      count = total;
    }
    else if (total === count){
      name += ", " + allNames[id];
    }
  }
  console.log("Most followers over 30: " + name);
}
// followersOverThirty();

// Output:
// Most followers over 30: Alice, Debbie, Finn

//----------------------------------------------------------------------------------------
// ASSIGNMENT 5 - COMPLETE

// Identify who follows the most people over the age of 30

// Same as Assignment 4 but with substituted variables

var followsOverThirty = function () {
  var count = 0;
  var name = "";
  for (var id in data){
    var total = countFollowingOverThirty(id);
    if (total > count){
      name = allNames[id];
      count = total;
    }
    else if (total === count){
      name += ", " + allNames[id];
    }
  }
  console.log("Follows the most people over 30: " + name);
}
// followsOverThirty();

// Output:
// Follows the most people over 30: Alice, Debbie

//----------------------------------------------------------------------------------------
// ASSIGNMENT 6

// List those who follow someone that doesn't follow them back

// create an empty string variable "name"
// evaluate each follower (var id in data)
  // create a variable containing who that user follows
  // evaluate each of those followed users
    // create a variable containing who those users follow
    // evaluate each of those users
      // if that user's list of people they follow contains the original user (var id in person)
      // ...this will use the "_.contain(list, value)" and will either be true or false
        // add the followed user to that list
// log back the name string

var noFollowBack = function () {
  var name = ""; // empty string
  for (var firstUser in data){ // for each user in data/ (first level)
    var following = getFollowing(firstUser); // gets the user's following list √
    for (var secondUser in data[firstUser]["follows"]){ // for each user followed (second level)
      var secondFollow = getFollowing(data[firstUser]["follows"][secondUser]);
      var secondFollowArray = secondFollow.split(", ");
      var doesContain = _.contains(secondFollowArray, allNames[firstUser]);
      if (doesContain){
        name += ", " + firstUser;
      }

      // if (secondUser_.contains(secondFollow), firstUser);{
      //   name += ", " + firstUser;
      // }
    }
    console.log("Follows someone who doesn't follow them back: " + name);
      // var secondFollowing = getFollowing(usersFollowing);
      // console.log(usersFollowing);
      // if (usersFollowing_.contains(usersFollowing))
      // }
  }
}
noFollowBack();


//----------------------------------------------------------------------------------------
// ASSIGNMENT 7

// List everyone and their reach (sum of # of followers and the # of those followers' followers)

var listReach = function() {

}