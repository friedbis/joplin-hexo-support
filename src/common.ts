
export const actions = {
	textHexoTagOwl: {
		label: 'hexo-tag-owl',
		iconName: 'fas fa-percent',
		accelerator: 'CmdOrCtrl+Shift+T',
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

export const DTI_SETTINGS_PREFIX      = 'hexoSupport.';
export const ACTIVATE_ONLY_SETTING    = 'activateOnlyIfEnabledInMarkdownSettings';
export const DEFAULTID                = 'NNNNNNNN';

export default {
	actions,
	DTI_SETTINGS_PREFIX,
	ACTIVATE_ONLY_SETTING,
	DEFAULTID,
	hostList,
}
