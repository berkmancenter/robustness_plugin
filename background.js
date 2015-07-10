var objs = new Array();

var test = function(url) {
	this.url = url;
	this.state = 'waiting';
	this.data = {};
	this.date = new Date();
	var that = this;

	var receiveListener = function(details) {
		details.responseHeaders = that.filterHeaders(details.responseHeaders);
		that.data.receivedHeaderDetails = details;
		that.onReceiveHeaders();
	};

	this.onReceiveHeaders = function() {
		this.state = 'complete';
		//this.iframe.remove();
		var removeCode = "var theFrame = document.getElementById('" + this.url + "');";
		removeCode += "theFrame.parentNode.removeChild(theFrame);";
		chrome.tabs.executeScript({
			code: removeCode
		});
		chrome.webRequest.onHeadersReceived.removeListener(receiveListener);
		this.onComplete();
	};

	this.filterHeaders = function(headers) {
		return headers.filter(function(header) {
			return header.name != 'Cookie' && header.name != 'Set-Cookie';
		});
	};

	this.onComplete = function() {
		console.log(this.data.receivedHeaderDetails.statusCode + ": " + this.data.receivedHeaderDetails.url);
	};

	this.commence = function() {
		chrome.webRequest.onHeadersReceived.addListener(
			receiveListener,
			{ urls: [this.url] },
			["responseHeaders"]
		);

		var code = 'var linktest_frame = document.createElement("iframe");';
		code += 'linktest_frame.setAttribute("width", 0);';
		code += 'linktest_frame.setAttribute("height", 0);';
		code += 'linktest_frame.setAttribute("src", "' + this.url + '");';
		code += 'linktest_frame.style.display = "none";';
		code += 'linktest_frame.setAttribute("id", "' + this.url + '");'
		code += 'document.body.appendChild(linktest_frame);';

		chrome.tabs.executeScript({
		    code: code
		});
	};
};

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	//console.log(request.data);
	var linkArray = request.data.split(",");
	//console.log(linkArray);
	for(var l = 0; l < linkArray.length; l++) {
		if(linkArray[l]) {
			objs[l] = new test(linkArray[l]);
			objs[l].commence();
		}
	}
});