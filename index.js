const inputEl = document.getElementById("input-el");
const saveBtn = document.getElementById("input-btn");
const tabBtn = document.getElementById("tab-btn");
const delBtn = document.getElementById("del-btn");
const ulEl = document.getElementById("ul-el")
let myLeads =[]

let leadsFromLocalStorage = localStorage.getItem("myLeads");
leadsFromLocalStorage = JSON.parse(leadsFromLocalStorage)

if(leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage;
    render(myLeads);
}

function render(leads){
    let listItems ="";
    for(let i=0; i< leads.length; i++){
        listItems += 
        `   <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems;
}

delBtn.addEventListener("dblclick", function(){
    localStorage.clear();
    myLeads = [];
    render(myLeads);
})

saveBtn.addEventListener("click",function(){
    let data = inputEl.value
    if(!data){
        return ""
    }
    myLeads.push(data)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
})

tabBtn.addEventListener("click", function(){
    chrome.tabs.query({active : true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })
})