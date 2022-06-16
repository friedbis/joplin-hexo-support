import joplin from "api";
import { SettingItemType } from "api/types";
import { actions, DTI_SETTINGS_PREFIX, ACTIVATE_ONLY_SETTING, IMAGE_SEARCH_APIKEY_SETTING } from "./common";

export namespace settings {
	const SECTION = 'MenuShortcutToolbarSettings';

	export async function register() {
		await joplin.settings.registerSection(SECTION, {
			label: "joplin-plugin-hexo-support",
			iconName: "fas fa-edit",
		});

		let PLUGIN_SETTINGS = {};

		PLUGIN_SETTINGS[ACTIVATE_ONLY_SETTING] = {
			value: false,
			public: true,
			section: SECTION,
			type: SettingItemType.Bool,
			label: 'Only activate, if enabled in Markdown Plugin settings',
			description: "Only activate menu items, toolbar icons for supporting hexo which are enabled in Joplin's settings. (requires restart)",
		}

		for (const actionName in actions) {
			const action = actions[actionName];
			var setting = DTI_SETTINGS_PREFIX + actionName;

			PLUGIN_SETTINGS[setting] = {
				value: false,
				public: true,
				section: SECTION,
				advanced: true,
				type: SettingItemType.Bool,
				label: 'Remove toolbar icon for ' + action.label + ' (requires restart)',
			}
		}

		PLUGIN_SETTINGS[IMAGE_SEARCH_APIKEY_SETTING] = {
			value: '',
			public: true,
			section: SECTION,
			type: SettingItemType.String,
			label: 'Pixabay Image Search API key',
			description: 'Enter API key for Pixabay Image Search',
		}

		await joplin.settings.registerSettings(PLUGIN_SETTINGS);
	}
}
