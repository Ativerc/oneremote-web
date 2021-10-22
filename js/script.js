let xhr = new XMLHttpRequest();
xhr.open("GET", "temp_data/tatasky.csv");
// /WebUI/temp_data/tatasky.csv = http://127.0.0.1:5500/WebUI/temp_data/tatasky.csv
// WebUI/temp_data/tatasky.csv = http://127.0.0.1:5500/WebUI/channel-ui/WebUI/temp_data/tatasky.csv
// temp_data/tatasky.csv WORKS??
xhr.send();
let csvfile;
xhr.onload = function() {
    if (xhr.status != 200){
        alert(`Error ${xhr.status}: ${xhr.statusText}`);
    } else {
        // alert(`Done, got ${xhr.response.length} bytes`);
        csvfile = xhr.response;
        // alert(csvfile);
        var results = Papa.parse(csvfile);
        // let i;
        // for (i in results.data){
        //     console.log(i[4]);
        // }
        // <div class="list-item flex-container flex-row justify-content_spaceevenly">
        //         <!-- <div class="icon"></div> -->
        //         <div class="left flex-container flex-column justify-content_center">
        //             <div class="name">FirstName LastName</div>
        //             <div class="badge flex-container flex-row justify-content_flex_start">
        //                 <div class="badge type-badge hd-badge">HD</div>
        //                 <div class="badge paidc-badge">PAID-CHANNEL</div>
        //             </div>
        //         </div>
        //         <div class="right flex-container flex-column justify-content_center">
        //             <button class="btn unsubscribed-btn">110</button>
        //         </div>
        //     </div>
        results.data.forEach(function(entry) {
            // :TODO: if entry is from row[0], neglect 
            // if (entry !== results.data[0][0]){
            //     console.log(results.data[0]);
            //     console.log(entry);
            // };
            // console.log(`${entry}`);
            let group = document.body.getElementsByClassName('list-group')[0];
            let divvy = document.createElement('div');
            divvy.className = "list-item flex-container flex-row justify-content_spacebetween";
            group.append(divvy);
            left_div = document.createElement('div');
            left_div.className = 'left flex-container flex-column justify-content_center';
            right_div = document.createElement('div');
            right_div.className = 'right flex-container flex-column justify-content_center';
            divvy.append(left_div);
            divvy.append(right_div);
            channel_name_div = document.createElement('div');
            channel_name_div.className = "name";
            channel_name_div.innerHTML = `${entry[1]}`;
            left_div.append(channel_name_div);
            let channel_no = document.createElement('div');
            channel_no.innerHTML="<strong>"+ `${entry[4]}` + "</strong>";
            right_div.append(channel_no);
        });
        // document.body.style.background = "red";
        // setTimeout(() => document.body.style.background = "", 1000);
    };
};

function searchFunction() {
    let input, filter, listGroup, listItem, textValue, chanName;
    input = document.getElementById('chanSearch');
    filter = input.value.toUpperCase();
    listGroup = document.getElementsByClassName('list-group')[0];
    listItem = document.getElementsByClassName('list-item');
    for (i = 0; i < listItem.length; i++){
        chanName = listItem[i].getElementsByClassName("name")[0];
        textValue = chanName.innerText;
        if (textValue.toUpperCase().indexOf(filter) > -1) {
            listItem[i].style.display="";
        } else {
            listItem[i].style.display = "none";
        };
    };
};
document.addEventListener("keypress", setFocus);
function setFocus(){
    document.getElementById("chanSearch").focus();
}