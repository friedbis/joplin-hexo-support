
function returnQuery(formdata: any){
	return (formdata.resultText!=="")?formdata.resultText:formdata.query;
}

function generateLink(formdata: any, genType = ''){
	let link=formdata.resultTitle;
	let url=formdata.resultURL;
	return ((genType==="img"||genType==="image")?"!":"")+"["+link+"]"+"("+url+")";
}

function showDialog(selected: string, dlgTitle: string){
	let query=`<input id='query' type='hidden' name='query' value='${selected}'>`;

	return `
	<h1 id='dlgtitle'>${dlgTitle}</h1>
	<h2 id='linktitle'></h2>
	<div id='result'></div>
	<form id='formdata' name='formdata'>
	<input id='resultURL' name='resultURL' type='hidden' value=''>
	<input id='resultTitle' name='resultTitle' type='hidden' value=''>
	${query}
	</form>
	`;
}

function wrapSelectionWithStrings(selected: string|null){
	// Determine host info and throw into subfunc
	for(const host in hostList){
		const objHost = hostList[host];
		if(selected.search(objHost.hostname)>-1){
			console.log('Detected ['+objHost.name+']');
			return _wrapSelectionWithStrings(selected, objHost);
		}
		if(objHost.anotherHostname!==""&&selected.search(objHost.anotherHostname)>-1){
			console.log('Detected ['+objHost.name+']');
			return _wrapSelectionWithStrings(selected, objHost);
		}
		if(selected.search(objHost.name)>-1){
			console.log('Detected ['+objHost.name+']');
			return _wrapSelectionWithStrings(selected, objHost);
		}
	}
}

function _wrapSelectionWithStrings(selected: string|null, Host: any) {
	if (!selected) selected = Host.defaultURL;

	// Remove white space on either side of selection
	const start = selected.search(/[^\s]/);
	const end = selected.search(/[^\s](?=[\s]*$)/);
	const core = selected.slice(start,  end + 1);

	// Translate URL <-> TagOWL
	if (core.startsWith(Host.wrapString1) && core.endsWith(Host.wrapString2)) {
		console.log('TagOWL -> URL');
		const inside = core.slice(Host.wrapString1.length, core.length - Host.wrapString2.length);
		const defaulturl = Host.defaultURL.replace(DEFAULTID, inside);
		console.log('['+defaulturl+']');
		return defaulturl;
	} else {
		console.log('URL -> TagOWL');
		const mediaid=getMediaId(selected, Host.hostname, Host.queryString);
		const tagowl=selected.slice(0, start) + Host.wrapString1 + mediaid + Host.wrapString2 + selected.slice(end + 1);
		console.log('['+tagowl+']');
		return tagowl;
	}
}

function getMediaId(selected: string, hostname: string, queryString: string){
	// Parse URL
	let parse: URL;
	try {
		console.log('Parsing URL');
		parse = new URL(selected);
	}catch(err){
		console.log('Error parsing URL');
		return '**error**';
	}

	if(parse.hostname.search(hostname)<0){
		console.log('Invalid hostname');
		return '**error**';
	}

	// Parse mediaid
	if(queryString!==""){
		console.log('Parsing MediaID');
		const start = parse.search.search(queryString);
		if(start>-1){
			const params = parse.searchParams;
			const query = queryString.replace('=','').replace('?','');
			return params.get(query);
		}
	}

	// Parse pathname
	console.log('Parsing pathname');
	const pathArray = parse.pathname.split('/');
	if(pathArray[pathArray.length-1]!==''){
		if(hostname.search('giphy')>-1)
			return pathArray[pathArray.length-2];
		else
			return pathArray[pathArray.length-1];
	}else{
		return pathArray[pathArray.length-2];
	}
}

export const actions = {
	textHexoTagOwl: {
		parseFormType: 'hexo-tag-owl',
		iconName: 'fas fa-percent',
		accelerator: 'CmdOrCtrl+Shift+W',
		execute: wrapSelectionWithStrings,
		label: 'Hexo Tag Owl',
		showDialog: false,
		parseFormData: null,
	},
	textGoogleSearch: {
		parseFormType: 'google-search',
		iconName: 'fab fa-google',
		accelerator: 'CmdOrCtrl+Shift+G',
		execute: showDialog,
		label: 'Google Search',
		showDialog: true,
		parseFormData: generateLink,
	},
	textTranslate: {
		parseFormType: 'translate',
		iconName: 'fas fa-globe',
		accelerator: 'CmdOrCtrl+Shift+R',
		execute: showDialog,
		label: 'Translate',
		showDialog: true,
		parseFormData: returnQuery,
	},
};

export const hostList = {
	YouTube: {
		name: 'youtube',
		wrapString1: '{% owl youtube ',
		wrapString2: ' %}',
		defaultURL: 'https://www.youtube.com/watch?v=NNNNNNNN',
		hostname: 'youtube.com',
		anotherHostname: 'youtu.be',
		queryString: 'v=',
	},
	DailyMotion: {
		name: 'dailymotion',
		wrapString1: '{% owl dailymotion ',
		wrapString2: ' %}',
		defaultURL: 'https://www.dailymotion.com/video/NNNNNNNN',
		hostname: 'dailymotion.com',
		anotherHostname: '',
		queryString: '',
	},
	NicoNico: {
		name: 'niconico',
		wrapString1: '{% owl niconico ',
		wrapString2: ' watch %}',
		defaultURL: 'https://www.nicovideo.jp/watch/NNNNNNNN',
		hostname: 'nicovideo.jp',
		anotherHostname: 'nico.ms',
		queryString: '',
	},
	vimeo: {
		name: 'vimeo',
		wrapString1: '{% owl vimeo ',
		wrapString2: ' %}',
		defaultURL: 'https://vimeo.com/NNNNNNNN',
		hostname: 'vimeo.com',
		anotherHostname: '',
		queryString: '',
	},
	IMDB: {
		name: 'imdb',
		wrapString1: '{% owl imdb ',
		wrapString2: ' %}',
		defaultURL: 'https://www.imdb.com/title/NNNNNNNN/?ref_=ext_shr_lnk',
		hostname: 'imdb.com',
		anotherHostname: '',
		queryString: '',
	},
	GIPHY: {
		name: 'giphy',
		wrapString1: '{% owl giphy ',
		wrapString2: ' %}',
		defaultURL: 'https://media.giphy.com/media/NNNNNNNN/giphy.gif',
		hostname: 'giphy.com',
		anotherHostname: '',
		queryString: '',
	},
	Imgur: {
		name: 'imgur',
		wrapString1: '{% owl imgur ',
		wrapString2: ' %}',
		defaultURL: 'https://imgur.com/gallery/NNNNNNNN',
		hostname: 'imgur.com',
		anotherHostname: '',
		queryString: '',
	},
};

export const DTI_SETTINGS_PREFIX	  = 'hexoSupport.';
export const ACTIVATE_ONLY_SETTING	= 'activateOnlyIfEnabledInMarkdownSettings';
export const DEFAULTID				= 'NNNNNNNN';

export default {
	actions,
	DTI_SETTINGS_PREFIX,
	ACTIVATE_ONLY_SETTING,
}
