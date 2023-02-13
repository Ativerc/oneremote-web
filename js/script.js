/*jshint esversion: 6 */
'use strict';

let xhr = new XMLHttpRequest();
xhr.open("GET", "temp_data/tatasky.csv");
xhr.send();
let csvfile;
xhr.onload = listItems;


function listItems() {
    if (xhr.status != 200){
        alert(`Error ${xhr.status}: ${xhr.statusText}`);
    } else {
        csvfile = xhr.response;
        var results = Papa.parse(csvfile);
        var count = 0;
        results.data.forEach(function(entry) {
            if (count === 0) {
                count++;
            } else {
                createListItem(entry)
            }
            
        });
    };
};

function createListItem(entry) {
    let group = document.body.getElementsByClassName('list-group')[0];
    let divvy = document.createElement('div');
    divvy.className = "list-item flex-container flex-row justify-content_spacebetween";
    group.append(divvy);
    let left_div = document.createElement('div');
    left_div.className = 'left flex-container flex-column justify-content_center';
    let right_div = document.createElement('div');
    right_div.className = 'right flex-container flex-column justify-content_center';
    divvy.append(left_div);
    divvy.append(right_div);
    let channel_name_div = document.createElement('div');
    channel_name_div.className = "name";
    channel_name_div.innerHTML = `${entry[1]}`;
    left_div.append(channel_name_div);
    let channel_no = document.createElement('div');
    channel_no.innerHTML="<strong>"+ `${entry[4]}` + "</strong>";
    right_div.append(channel_no);
}

function searchFunction() {
    let searchBox, filter, listGroup, listItem, chanName, chanNameText;
    searchBox = document.getElementById('chanSearch');
    filter = searchBox.value.toUpperCase();
    listGroup = document.getElementsByClassName('list-group')[0];
    listItem = document.getElementsByClassName('list-item');
    for (let i = 0; i < listItem.length; i++){
        chanName = listItem[i].getElementsByClassName("name")[0];
        chanNameText = chanName.innerText;
        if (chanNameText.toUpperCase().indexOf(filter) > -1) {
            listItem[i].style.display="flex";
            clearListHeader();
        } else {
            listItem[i].style.display = "none";
            clearListHeader();
        };
    };
};

document.addEventListener("keypress", setFocus);
function setFocus(){
    document.getElementById("chanSearch").focus();
}

function isSearchBoxEmpty() {
    let searchBox = document.getElementById('chanSearch');
    if (searchBox.value.length > 0) {
        console.log(searchBox.value.length)
        return false
    } else {
        return true
    }
}

function clearListHeader() {
    if (isSearchBoxEmpty()) {
        document.querySelector('.list-header').style.display="flex";
    } else {
        document.querySelector('.list-header').style.display="none";
    }
}