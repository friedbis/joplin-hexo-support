function searchInGoogle() {
    let query=document.getElementById('query').value;
    let searchengine='https://www.google.com/search?hl=ja&lr=lang_ja&q=';
    let result=document.getElementById('result');

    console.log(`query:${query}`);
    fetch(searchengine + query).then(response => response.text()).then((data)=>{
        //console.log(data);
        let xml=new DOMParser();
        let _div=xml.parseFromString(data, 'text/html');
        //console.log(_div);
        let div=_div.getElementsByClassName("yuRUbf");
        result.innerHTML+='<ul>';
        Array.prototype.forEach.call(div, function(element){
            //console.log(element);
            let title=element.getElementsByClassName("LC20lb")[0].innerHTML;
            let link=element.getElementsByClassName("iUh30")[0].innerHTML.replace(/<[^>]+>[^<]+<\/[^>]+>/g,'');
            //console.log(title);
            //console.log(link);
            result.innerHTML+=`<li><a href='${link}' target='_blank'>${title}</a></li>`;
        });
        result.innerHTML+='</ul>';
    });
}
searchInGoogle();
