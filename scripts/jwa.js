// Looks for citation: Uri D. Herscher, Jewish Agricultural Utopias in America, 1880-1910 (Detroit: Wayne State University Press, 1991), 123.
// on https://jwa.org/teach/livingthelegacy/jews-and-farming-in-america
// Parse citation to get creator:"Herscher, Uri D" AND title:"Jewish Agricultural Utopias in America"
// search archive to get https://archive.org/details/jewishagricultur0000hers


$(document).ready(function() {
  findCitations()
});

function findCitations(){
  let candidates = $("a[id^='_ftn']").parent()
  for(let i = 0; i < candidates.length; i++){
    let citation = getCitation(candidates[i])
    if(citation){
      advancedSearch(getAdvancedSearchQuery(citation))
    }
  }
}

function getCitation(p){
  let str = p.innerText;
  let start = str.indexOf("]")+1;
  if(str.slice(start).length == 0){
    return null
  }else{
    return str.slice(start)
  }
}

function getAdvancedSearchQuery(cit){
  [author, title, ...rest] = cit.split(',')
  //format author
  author = formatAuthor(author)
  return 'creator:"'+author+'" AND title:"'+title+'"'
}

function formatAuthor(auth){
  let names = auth.split(".")
  return names[1] + " " + names[0]
}

function advancedSearch(query){
  let host = 'https://archive.org/advancedsearch.php?q='
  // let query = 'q=creator%3A"Diamond%2C+Jared+M"+AND+title%3A"Collapse"+AND+publisher%3A"Penguin"'
  let endsearch = '&fl%5B%5D=identifier&sort%5B%5D=&sort%5B%5D=&sort%5B%5D=&rows=50&page=1&output=json&callback=?&save=yes'
  let url = host+query+endsearch
  console.log(url)
  $.ajax({
    url: url,
    type: 'GET',
    dataType: 'jsonp',
    crossDomain: true,
    jsonpCallback: 'callback',
    contentType: "application/json",
  })
  .done(function(data) {
    console.log(data)
  })
  .fail(function(err) {
    console.log(err);
  })
}
function callback(json){
  console.log(json)
}
