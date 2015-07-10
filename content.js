$(document).ready(function() {
	var links = document.getElementsByTagName("a");
	var isAll = false;
	//links[20].href = "http://nicholasrub.in/thereisnopagehere";
	// Test for stupid links here
	var uniqueLinks = "";
	for(var l = 0; l < links.length; l++) {
		if(!isAll) {
			pathArray = links[l].href.split( '/' );
			protocol = pathArray[0];
			host = pathArray[2];
			links[l].href = protocol + '//' + host;
		}
		if(uniqueLinks.indexOf(links[l].href) == -1) {
			uniqueLinks += links[l].href + ",";
		}
	}
	chrome.runtime.sendMessage({data: uniqueLinks}, function(response) {
	});
})
