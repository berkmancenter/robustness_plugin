$(document).ready(function() {
	var links = document.getElementsByTagName("a");
	var isAll = false;
	var uniqueLinks = "";
	var counter = 0;
	for(var l = 0; l < links.length; l++) {
		if(!isAll) {
			pathArray = links[l].href.split( '/' );
			protocol = pathArray[0];
			host = pathArray[2];
			links[l].href = protocol + '//' + host;
		}
		if(uniqueLinks.indexOf(links[l].href) == -1) {
			counter += 1;
			uniqueLinks += links[l].href + ",";
		}
	}
	alert(counter);
	var timer = new Date().getTime();
	chrome.runtime.sendMessage({data: uniqueLinks}, function(response) {
	});
	chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
	  if (msg.action == 'open_dialog_box') {
	    alert("Total time: " + Number(new Date().getTime() - timer));
	  }
	});
})
