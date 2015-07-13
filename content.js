$(document).ready(function() {
	var links = document.getElementsByTagName("a");
	var isAll = false;
	var uniqueLinks = "";
 	var isURL = new RegExp('^(https?:\\/\\/)?'+ // protocol
    	'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
		'((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
		'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
		'(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
		'(\\#[-a-z\\d_]*)?$','i'); // fragment locator
	var isAD = new RegExp("/\bads\b|2o7|a1\.yimg|ad(brite|click|farm|revolver|server|tech|vert)|at(dmt|wola)|banner|bizrate|blogads|bluestreak|burstnet|casalemedia|coremetrics|(double|fast)click|falkag|(feedster|right)media|googlesyndication|hitbox|httpads|imiclk|intellitxt|js\.overture|kanoodle|kontera|mediaplex|nextag|pointroll|qksrv|speedera|statcounter|tribalfusion|webtrends/");
	for(var l = 0; l < links.length; l++) {
		if(isURL.test(links[l].href)) {
			if(!isAD.test(links[l].href)) {
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
		}
	}
	chrome.runtime.sendMessage({data: uniqueLinks}, function(response) {
	});
})
