$(document).ready(function() {
	var links = document.getElementsByTagName("a");
	//links[20].href = "http://nicholasrub.in/thereisnopagehere";
	// Test for stupid links here
	var uniqueLinks = "";
	for(var l = 0; l < links.length; l++) {
		if(uniqueLinks.indexOf(links[l].href) == -1) {
			uniqueLinks += links[l].href + ",";
		}
	}
	chrome.runtime.sendMessage({data: uniqueLinks}, function(response) {
	});
})
