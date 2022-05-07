function searchInGoogleTranslate() {
    new Promise(function (res, rej){
        let div=document.getElementById('tr-e2j');
        div.addEventListener("click",function(){
            var lang = $(this).attr('data-lang');
            window.location = $(this).attr('href');
            location.reload();
        });
    }
    let query=document.getElementById('query').value.replace(' ','%20').replace('&','%26');
    let result=document.getElementById('result');
    result.innerHTML+="\n"+query;
}    
/*
    let query=document.getElementById('query').value.replace(' ','%20').replace('&','%26');
    //let searchengine='https://translate.google.co.jp/?sl=en&tl=ja&op=translate&text=';
    let searchengine='https://translate.google.co.jp/?hl=ja&sl=en&tl=ja&op=translate&text=';
    let result=document.getElementById('result');

    console.log('query:'+query+'');
    fetch(searchengine + query).then(response => response.text()).then((data)=>{
        let xml=new DOMParser();
        let _div=xml.parseFromString(data, 'text/html');
        console.log(_div);
        let div=_div.getElementsByClassName("Q4iAWc")[0].innerHTML;
        result.innerHTML+=`<a id='link' href='javascript:return false;' onclick='clickValue()'>${div}</a></li>`;
    });
}
*/
function googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'ja', 
        layout: google.translate.TranslateElement.FloatPosition.TOP_LEFT
    }, 'google_translate_element');
}
function clickValue(){
    let resultTitle=document.getElementById('link');
    let resultText=document.getElementById('resultText');

    resultText.value=resultTitle;
    return true;
}
searchInGoogleTranslate().then();
    

