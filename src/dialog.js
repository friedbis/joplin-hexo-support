function searchInGoogle(query) {
    let searchengine='https://www.google.com/search?hl=ja&lr=lang_ja&q=';
    fetch(searchengine + query).then(response => response.text()).then((data)=>{
        //console.log(data);
        let xml=new DOMParser();
        let _div=xml.parseFromString(data, 'text/html');
        console.log(_div);
        let div=_div.getElementsByClassName("yuRUbf");
        console.log(div);
    });
}
searchInGoogle('test');
