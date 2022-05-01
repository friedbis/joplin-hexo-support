
export const actions = {
	textYouTube: {
		label: 'YouTube',
		iconName: 'fab fa-youtube',
		wrapString1: '{% owl youtube ',
        wrapString2: ' %}',
		defaultText: 'https://www.youtube.com/watch?v=YNzcBwufAAI',
		accelerator: 'CmdOrCtrl+Shift+U',
		hostname: 'youtube.com',
		anotherHostname: 'youtu.be',
		queryString: 'v=',
	},
	textDailyMotion: {
		label: 'DailyMotion',
		iconName: 'fab fa-dailymotion',
		wrapString1: '{% owl dailymotion ',
        wrapString2: ' %}',
		defaultText: 'https://www.dailymotion.com/video/x7twi0g',
		accelerator: 'CmdOrCtrl+Shift+D',
		hostname: 'dailymotion.com',
		anotherHostname: '',
		queryString: '',
	},
	textNicoNico: {
		label: 'NicoNico',
		iconName: 'fas fa-tv',
		wrapString1: '{% owl niconico ',
        wrapString2: ' watch %}',
		defaultText: 'https://www.nicovideo.jp/watch/sm24837',
		accelerator: 'CmdOrCtrl+Shift+O',
		hostname: 'nicovideo.jp',
		anotherHostname: 'nico.ms',
		queryString: '',
	},
	textIMDB: {
		label: 'IMDB',
		iconName: 'fab fa-imdb',
		wrapString1: '{% owl imdb ',
        wrapString2: ' %}',
		defaultText: 'https://www.imdb.com/title/tt0088763/?ref_=ext_shr_lnk',
		accelerator: 'CmdOrCtrl+Shift+M',
		hostname: 'imdb.com',
		anotherHostname: '',
		queryString: '',
	},
};

export const DTI_SETTINGS_PREFIX      = 'disableToolbarIcon.';
export const ACTIVATE_ONLY_SETTING    = 'activateOnlyIfEnabledInMarkdownSettings';

export default {
	actions,
	DTI_SETTINGS_PREFIX,
	ACTIVATE_ONLY_SETTING,
}
