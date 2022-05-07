function searchInWebiio() {
    //let source='en';
    //let target='ja';
    let text=document.getElementById('query').value.replace(' ','+').replace('&','%26');
    let searchengine='https://ejje.weblio.jp/content/';
    let result=document.getElementById('result');
    let queryurl=searchengine + text;

    console.log('query:'+text+'');
    fetch(queryurl).then(response => response.text()).then((data)=>{
        //console.log(data);
        let xml=new DOMParser();
        let _div=xml.parseFromString(data, 'text/html');
        let div=_div.getElementsByClassName("content-explanation");

        result.innerHTML+='<ul>';
        Array.prototype.forEach.call(div, function(element, index){
            let title=element.innerText;

            result.innerHTML+=`<li><a id='link_${index}' href='javascript:return false;' onclick='clickValue(${index})'>${title}</li>`;
        });
        result.innerHTML+='</ul>';
    });
}
function clickValue(index){
    let resultText=document.getElementById('resultText');
    let linkText=document.getElementById("link_"+index).innerText;

    resultTitle.value=linkText;
    return true;
}
searchInWebiio();



