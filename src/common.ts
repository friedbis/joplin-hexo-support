
export const actions = {
	textYouTube: {
		label: 'Youtube',
		iconName: 'fab fa-youtube',
		wrapString1: '{% owl youtube ',
        wrapString2: ' %}',
		defaultText: 'https://www.youtube.com/watch?v=YNzcBwufAAI',
		accelerator: 'CmdOrCtrl+Shift+U',
	},
	textDailyMotion: {
		label: 'DailyMotion',
		iconName: 'fab fa-dailymotion',
		wrapString1: '{% owl dailymotion ',
        wrapString2: ' %}',
		defaultText: 'https://www.dailymotion.com/video/x7twi0g',
		accelerator: 'CmdOrCtrl+Shift+D',
	},
	textNicoNico: {
		label: 'NicoNico',
		iconName: 'fas fa-tv',
		wrapString1: '{% owl niconico ',
        wrapString2: ' watch %}',
		defaultText: 'https://www.nicovideo.jp/watch/sm24837',
		accelerator: 'CmdOrCtrl+Shift+O',
	},
	textIMDB: {
		label: 'IMDB',
		iconName: 'fab fa-imdb',
		wrapString1: '{% owl imdb ',
        wrapString2: ' %}',
		defaultText: 'Translate IMDB tag',
		accelerator: null,
	},
};

export const DTI_SETTINGS_PREFIX      = 'disableToolbarIcon.';
export const ACTIVATE_ONLY_SETTING    = 'activateOnlyIfEnabledInMarkdownSettings';

export default {
	actions,
	DTI_SETTINGS_PREFIX,
	ACTIVATE_ONLY_SETTING,
}
