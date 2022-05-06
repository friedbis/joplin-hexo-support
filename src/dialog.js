function searchInGoogle() {
    let query=document.getElementById('query').value;
    let searchengine='https://www.google.com/search?hl=ja&lr=lang_ja&q=';
    let result=document.getElementById('result');

    console.log(`query:${query}`);
    fetch(searchengine + query).then(response => response.text()).then((data)=>{
        let xml=new DOMParser();
        let _div=xml.parseFromString(data, 'text/html');
        let div=_div.getElementsByClassName("yuRUbf");

        result.innerHTML+='<ul>';
        Array.prototype.forEach.call(div, function(element, index){
            let title=element.getElementsByClassName("LC20lb")[0].innerHTML;
            let link=element.getElementsByTagName("a")[0].getAttribute("href");
            result.innerHTML+=`<li><a id='link_${index}' href='javascript:return false;' onclick='clickValue("${link}",${index})'>${title}</a></li>`;
        });
        result.innerHTML+='</ul>';
    });
}
function clickValue(url, index){
    let resultURL=document.getElementById('resultURL');
    let linktitle=document.getElementById('linktitle');

    resultURL.value=url;
    linktitle.innerHTML=document.getElementById("link_"+index).innerText;
    return true;
}

searchInGoogle();
