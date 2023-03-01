const domContainer = document.querySelector("#root");


const directoryPath = document.createElement("h2");


var divTable = document.createElement("div");
var table = document.createElement("table");

var theads = table.createTHead();
var theadRows = table.insertRow(0);
var theadRowCells = [];
	
var tbodys = table.createTBody();
var tbodyRows = [];
var tbodyRowCells = [];
var tbodyElementA = [];
const theadContent = [
	"Name", 
	"-----", 
	"Date Added", 
	"",
	"Type", 
	"",
	"Comment", 
];


const index = [
	["directory_1", "&nbsp", "2022-December-27", "&nbsp", "Directory", "&nbsp", "", ""],
	["github/arqeyl/directory-listing", "&nbsp", "2023-March-01", "&nbsp", "URL", "&nbsp", "directory list template", "https://github.com/arqeyl/directory-listing"],
	["YouTube", "&nbsp", "2023-March-01", "&nbsp", "URL", "&nbsp", "a redirect to YouTube", "https://www.youtube.com/watch?v=xvFZjo5PgG0"],
//	there are two type of table content: URL and Directory. URL type redirect you to another page. Directory type load up a new directory table
//	["<name>","&nbsp","<date added>","&nbsp","URL", "&nbsp","<description (not important)>","<a URL link>"], // a template of URL type
//	["<name>","&nbsp","<date added>","&nbsp","Directory", "&nbsp","<description (not important)>",""], // a template of Directory type. leave last index empty. directoryContent will load to another directory using name
];


const directory_1 = [
	["...", "&nbsp", "2022-October-24", "&nbsp", "Directory", "&nbsp", "", ""],
];

/*
const directory_2 = [
	["...", "&nbsp", "2023-March-01", "&nbsp", "back to index", "&nbsp", ""], // always have a directory redirect back to your main page
];
*/


const directoryContent = [
	["..." , index],
	["directory_1" , directory_1],
//	["directory_2" , directory_2],
//	["directory name" , directory array],
//	make sure to add new directory here!
];


var tbodyContent = [].concat(index); // (<this array content on ready when you open the index.html>)


add_domContainer();


function add_theadRowCells() {
	for (let j = 0; j<theadContent.length; j++) {
		theadRowCells.push(theadRows.insertCell(j));
		if (j%2==0) { 
			theadRowCells[j].innerHTML = theadContent[j];
		}
		else {  
			theadRowCells[j].innerHTML = theadContent[1];
			theadRowCells[j].id = "thead-gap";
		}
	}
}


function add_tbodyRowCells() {
	for (let i=0; i<tbodyContent.length;i++) {
		tbodyRows.push(tbodys.insertRow(i));
		tbodyElementA.push(document.createElement("a"));
	}

	for (let i=0; i<tbodyContent.length; i++) {
		tbodyElementA[i].innerHTML = tbodyContent[i][0];
		if (tbodyContent[i][4] == "Directory") { // content is a Directory type
			for (let j=0; j<directoryContent.length; j++){
				if (directoryContent[j][0] == tbodyContent[i][0]) {
					tbodyElementA[i].addEventListener( "click", function() { change_tbodyContent(directoryContent[j][0], directoryContent[j][1]) } );
				}
			}
		}
		else { // content is a URL tyoe
			tbodyElementA[i].addEventListener( "click", function() { window.open(tbodyContent[i][7], '_blank') } );
		}
		var tempColumn = [];
		for (let k=0; k<tbodyContent[i].length-1; k++) { // -1 to ignore redirect link
			tempColumn.push(tbodyRows[i].insertCell(k));
			tempColumn[0].appendChild(tbodyElementA[i]);
			if (k>0) {
				tempColumn[k].innerHTML = tbodyContent[i][k];
			}
		}
		tbodyRowCells.push(tempColumn);
	}
}


function change_tbodyContent(new_contentName, new_content) {
	directoryPath.innerHTML = "Index of " + new_contentName;
	domContainer.removeChild(divTable);
	divTable = document.createElement("div");
	table = document.createElement("table");
	theads = table.createTHead();
	theadRows = table.insertRow(0);
	theadRowCells = [];
	tbodys = table.createTBody();
	tbodyRows = [];
	tbodyRowCells = [];
	tbodyElementA = [];

	tbodyContent = [].concat(new_content);

	append_table();
}


function append_directorypath() {
	directoryPath.innerHTML = "Index of ...";
	directoryPath.id = "path";
	domContainer.appendChild(directoryPath);
}


function append_table() {
	add_theadRowCells();
	add_tbodyRowCells();
	divTable.appendChild(table);
	divTable.className = "div-table";
	domContainer.appendChild(divTable);
	
}


function add_domContainer() {
	append_directorypath();
	append_table();
}
