
function vowels (string1) {
  var vowelsList = ['a', 'e', 'i', 'o', 'u']

  var count = 0;

  for (var i = 0; i < string1.length; i++) {
    if (vowelsList.indexOf(string1[i]) > -1) {
      count++
    }
  }

  return count
}


console.log(vowels('Catalina'))
