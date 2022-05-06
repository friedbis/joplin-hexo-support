function searchInGoogleTranslate() {
    let query=document.getElementById('query').value.replace(' ','%20').replace('&','%26');
    let searchengine='https://translate.google.co.jp/?sl=en&tl=ja&op=translate&text=';
    let result=document.getElementById('result');

    console.log('query:'+query+'');
    fetch(searchengine + query).then(response => response.text()).then((data)=>{
        let xml=new DOMParser();
        let _div=xml.parseFromString(data, 'text/html');
        let div=_div.getElementsByClassName("Q4iAWc")[0].innerHTML;
        result.innerHTML+=`<a id='link' href='javascript:return false;' onclick='clickValue()'>${div}</a></li>`;
    });
}
function clickValue(){
    let resultTitle=document.getElementById('link');
    let resultText=document.getElementById('resultText');

    resultText.value=resultTitle;
    return true;
}

searchInGoogleTranslate();
