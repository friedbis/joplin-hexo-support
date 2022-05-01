const query="?v=";
//const selected='https://youtube.com/watch?v=acICcm213';
const selected='https://youtube.com/watch/asdf/acICcm213/';

let parse=new URL(selected);

//const param = query.replace('=','').replace('?','');
//const start = parse.search.search(query);

const pathArray = parse.pathname.split('/');

console.log(pathArray);
