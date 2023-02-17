/*jshint esversion: 6 */
'use strict';

let xhr = new XMLHttpRequest();
xhr.open("GET", "temp_data/tatasky.csv");
xhr.send();
let csvfile;
xhr.onload = listItems;

document.querySelector("#chanSearch").addEventListener("keyup", searchFunction)


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

// document.addEventListener("keypress", setFocus);
// function setFocus(){
//     document.getElementById("chanSearch").focus();
// }

function isSearchBoxEmpty() {
    let searchBox = document.getElementById('chanSearch');
    if (searchBox.value.length > 0) {
        return false;
    } else {
        return true;
    }
}

function clearListHeader() {
    if (isSearchBoxEmpty()) {
        document.querySelector('.list-header').style.display="flex";
    } else {
        document.querySelector('.list-header').style.display="none";
    }
}

function emboldenCharacters(searchBoxText, itemText) {
    
}

// Settigs Events

document.getElementById("settings-reset").addEventListener("click", resetLocalStorage);
document.getElementById("settings-save-exit").addEventListener("click", onSettingsSave);

// localStorage Stuff



function onPageload() {
    if (storageAvailable("localStorage") !== true) {
        console.log("ModalMessage: Error! localStorage not available!");
    } else {
        if (doesLocalStorageHaveData() === true) {
            getFromLocalStorage();
        } else {
            console.log("ModalMessage: localStorage doesn't have data!");
        }
    }
}

function onSettingsSave() {
    if (storageAvailable("localStorage") !== true) {
        console.log("ModalMessage: Error! localStorage not available!"); 
    } else {
        if (isServerSettingsIncomplete() !== true) {
            saveInLocalStorage();
        }   else {
            console.log("Modal Message: Server Settings incomplete! Please complete all fields!")
        }
        
    }
}

// Local Storage Handler Functions

function storageAvailable(type) {
    let storage;
    try {
        storage = window[type];
        const x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch (e) {
        return e instanceof DOMException && (
            // everything except Firefox
            // e.code === 22 ||
            // Firefox
            // e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
}


function doesLocalStorageHaveData() {
    if (localStorage.getItem('server')) {
        return true
    } else {
        return false
    }
}


    // if (storageAvailable('localStorage')) {
    //     console.log('localStorage Available!');
    //     if (!localStorage.getItem('server')) {
    //         saveInLocalStorage();
    //     } else {
    //         getFromLocalStorage();
    //     }
        
    // } else {
    //     // msgModal : localStorage unavailable

    // }


function saveInLocalStorage() {
    localStorage.setItem('server', document.getElementById('serverIPURL').value);
    localStorage.setItem('topic', document.getElementById('topicText').value);

    console.log("Saved Settings Data in localStorage!");
    console.log(localStorage);
}

function getFromLocalStorage() {
    // Get from local storage
    const server = localStorage.getItem('server');
    const topic = localStorage.getItem('topic');

    // Set text input value to derived values
    document.getElementById('serverIPURL').value = server;
    document.getElementById('topicText').value = topic;

    // 
}

function resetLocalStorage() {
    // Clear local storage
    localStorage.clear();

    // Set text input value to ""
    document.getElementById('serverIPURL').value = document.getElementById('topicText').value = "";

    // TODO modalMessage: Cleared!
    console.log("ModalMessage: localStorage cleared of ALL data!");
}

function isServerSettingsIncomplete() {
    const server = document.getElementById("serverIPURL").value
    const topic = document.getElementById('topicText').value

    if (server === "" || topic === "") {
        return true;
    } else {
        return false;
    }
}

// MQTT

// 

// Diagnostics

function serverPing() {}
