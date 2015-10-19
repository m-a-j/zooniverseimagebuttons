var self = require('sdk/self');

var keyf = 0;
var keyb = 0;

// a dummy function, to show how tests work.
// to see how to test this function, look at test/test-index.js
function dummy(text, callback) {
  callback(text);
}

exports.dummy = dummy;

function paddy(n, p, c) {
    var pad_char = typeof c !== 'undefined' ? c : '0';
    var pad = new Array(1 + p).join(pad_char);
    return (pad + n).slice(-pad.length);
}

var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");
var tu = require("sdk/tabs/utils");
var lastdirection = "";

var buttonback = buttons.ActionButton({
  id: "back",
  label: "BACK",
  icon: {
    "16": "./arrow-icon-left.png",
  },
  onClick: handleClickBack
});


var buttonforward = buttons.ActionButton({
  id: "forward",
  label: "FORWARD",
  icon: {
    "16": "./arrow-icon-right.png",
  },
  onClick: handleClickForward
});

var buttonreset = buttons.ActionButton({
  id: "reset",
  label: "RESET",
  badge: 0,
  badgeColor: "#AAAAAA",
  icon: {
    "16": "./simple-avatar-16.jpg",
  },
  onClick: handleClickReset
});

function checkBadge() {
	if (buttonreset.badge < 0) {
		buttonreset.badgeColor = "#FF0000";
	} else if (buttonreset.badge == 0) {
		buttonreset.badgeColor = "#AAAAAA";
	} else {
		buttonreset.badgeColor = "#00FF00";
	}
}

function handleClickReset(state) {
	buttonreset.badge =  0;
	buttonreset.badgeColor = "#AAAAAA";
}

function handleClickBack(state) {
  var activeUrl = tabs.activeTab.url;
  var last = activeUrl.substr(activeUrl.length - 8);
  var n = last.substr(0,4);
  var nIntOld = parseInt(n);
  var nIntNew = nIntOld - 1;
  buttonreset.badge =  buttonreset.badge - 1;  
  checkBadge();
  var lastdirection = "back";
  tabs.activeTab.on("close", handleClickReset);
  
  console.log('active: ' + activeUrl);
  console.log('last: ' + last);
  console.log('nIntOld: ' + nIntOld + '  nIntNew: ' + nIntNew);
  tabs.activeTab.url = activeUrl.substr(0, activeUrl.length - 8) + paddy(nIntNew,4) + ".JPG";
}

function handleClickForward(state) {
	// if (keyf==0){
	// keyf = !keyf;
	// console.log('keyf :'+keyf);
	
  var activeUrl = tabs.activeTab.url;
  var last = activeUrl.substr(activeUrl.length - 8);
  var n = last.substr(0,4);
  var nIntOld = parseInt(n);
  var nIntNew = nIntOld + 1;
  buttonreset.badge =  buttonreset.badge + 1;
  checkBadge();
  var lastdirection = "forward";
  tabs.activeTab.on("close", handleClickReset);
  tabs.activeTab.on("ready", function(){console.log('--READY!!-------');});
  // buttonforward.state("window", {
    // disabled: true
  // });
  
  console.log('active: ' + activeUrl);
  console.log('last: ' + last);
  console.log('nIntOld: ' + nIntOld + '  nIntNew: ' + nIntNew);
  tabs.activeTab.url = activeUrl.substr(0, activeUrl.length - 8) + paddy(nIntNew,4) + ".JPG";
  console.log('activeX: ' + tabs.activeTab.url);
  // tabs.on('ready', function(tab) {
    // buttonforward.state("window", {
      // disabled: false
    // });
	// console.log('tab is loaded', tab.title, tab.url);
  // });
	
	// }
}