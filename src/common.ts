
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
		defaultText: 'https://www.youtube.com/watch?v=YNzcBwufAAI',
		hostname: 'youtube.com',
		anotherHostname: 'youtu.be',
		queryString: 'v=',
	},
	DailyMotion: {
		name: 'dailymotion',
		wrapString1: '{% owl dailymotion ',
        wrapString2: ' %}',
		defaultText: 'https://www.dailymotion.com/video/x7twi0g',
		hostname: 'dailymotion.com',
		anotherHostname: '',
		queryString: '',
	},
	NicoNico: {
		name: 'niconico',
		wrapString1: '{% owl niconico ',
        wrapString2: ' watch %}',
		defaultText: 'https://www.nicovideo.jp/watch/sm24837',
		hostname: 'nicovideo.jp',
		anotherHostname: 'nico.ms',
		queryString: '',
	},
	IMDB: {
		name: 'imdb',
		wrapString1: '{% owl imdb ',
        wrapString2: ' %}',
		defaultText: 'https://www.imdb.com/title/tt0088763/?ref_=ext_shr_lnk',
		hostname: 'imdb.com',
		anotherHostname: '',
		queryString: '',
	},
};

export const DTI_SETTINGS_PREFIX      = 'hexoSupport.';
export const ACTIVATE_ONLY_SETTING    = 'activateOnlyIfEnabledInMarkdownSettings';

export default {
	actions,
	DTI_SETTINGS_PREFIX,
	ACTIVATE_ONLY_SETTING,
}
