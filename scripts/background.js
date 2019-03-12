
// Extension only active on wikipedia pages
chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
  chrome.declarativeContent.onPageChanged.addRules([{
    conditions: [new chrome.declarativeContent.PageStateMatcher({
      pageUrl: {hostEquals: 'jwa.org'},
    })
  ],
  actions: [new chrome.declarativeContent.ShowPageAction()]
}]);
});
