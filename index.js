// TODO: 
// STOP DISABLING BUTTONS (BECAUSE THEY ARE STILL DISABLED WHEN YOU SWITCH BETWEEN TABS), 
// MAYBE REMOVE "" BADGES, CHECK FOR PATTERN ON CLICK INSTEAD, MAYBE SHOW MESSAGE IF URL DOES NOT FIT PATTERN

var self = require('sdk/self');

var buttons = require('sdk/ui/button/action');

var buttonback = buttons.ActionButton({
  id: "back",
  label: "BACK",
  icon: {
    "16": "./arrow-icon-left.png",
  },
  onClick: handleClickBack,
  badge: " ",
  badgeColor: "#22BB22"
});

var buttonforward = buttons.ActionButton({
  id: "forward",
  label: "FORWARD",
  icon: {
    "16": "./arrow-icon-right.png",
  },
  onClick: handleClickForward,
  badge: " ",
  badgeColor: "#22BB22"
});

var buttonreset = buttons.ActionButton({
  id: "reset",
  label: "RESET",
  badge: 0,
  badgeColor: "#AAAAAA",
  icon: {
    "16": "./favicon.ico",
  },
  onClick: handleClickReset
});

var tabs = require("sdk/tabs");
var { MatchPattern } = require("sdk/util/match-pattern");
//http://zooniverse-export.s3-website-us-east-1.amazonaws.com/21484_1000_S02_Season 2_Set 1_EK000109.JPG
var pattern = new MatchPattern(/.*zooniverse-export\.s3-website-us-east-1\.amazonaws.com\/.*[0-9]{4}.JPG/);

// is this too expensive?
tabs.on("pageshow", function(tab){
	if (pattern.test(tab.url)) {
		setNumber(); // maybe find another solution for this
		buttonforward.state("window", {
			disabled: false,
			badgeColor: "#22BB22"
		});
		buttonback.state("window", {
			disabled: false,
			badgeColor: "#22BB22"
		});
		buttonreset.state("window", {
			disabled: false
		});
	} else {
		//console.log('wrong URL: \n', tab.url);
		buttonforward.state("window", {
			disabled: true,
			badgeColor: "#444444"
		});
		buttonback.state("window", {
			disabled: true,
			badgeColor: "#444444"
		});
		buttonreset.state("window", {
			disabled: true,
			badgeColor: "#444444"
		});
	}
});

// from StackOverflow - adds leading zeros
function paddy(n, p, c) {
    var pad_char = typeof c !== 'undefined' ? c : '0';
    var pad = new Array(1 + p).join(pad_char);
    return (pad + n).slice(-pad.length);
}

var number = 0;

function setNumber(){ // maybe find another solution for this
	if (buttonreset.badge == 0) {
		number = parseInt(tabs.activeTab.url.substr(tabs.activeTab.url.length - 8, 4));
	}
}


function checkBadge() {
	if (buttonreset.badge == 0) {
		number = parseInt(tabs.activeTab.url.substr(tabs.activeTab.url.length - 8, 4));
		buttonreset.badgeColor = "#AAAAAA";
	} else if (buttonreset.badge < 0) {
		buttonreset.badgeColor = "#BB2222";
	} else {
		buttonreset.badgeColor = "#22BB22";
	}
}

function handleClickReset(state) {
	buttonreset.badge =  0;
	buttonreset.badgeColor = "#AAAAAA";
	setNumber(); // is this neccessary? also maybe find another solution for this
}

function handleClickBack(state) {
  setNumber(); // maybe find another solution for this
  buttonreset.badge =  buttonreset.badge - 1;  
  var nIntNew = number + buttonreset.badge;
  
  tabs.activeTab.on("close", handleClickReset);
  tabs.activeTab.url = tabs.activeTab.url.substr(0, tabs.activeTab.url.length - 8) + paddy(nIntNew,4) + ".JPG";
  checkBadge();
}

function handleClickForward(state) {
  setNumber(); // maybe find another solution for this
  buttonreset.badge =  buttonreset.badge + 1;  
  var nIntNew = number + buttonreset.badge;
  
  tabs.activeTab.on("close", handleClickReset);
  tabs.activeTab.url = tabs.activeTab.url.substr(0, tabs.activeTab.url.length - 8) + paddy(nIntNew,4) + ".JPG";
  checkBadge();
}