import joplin from 'api';
import { MenuItemLocation } from 'api/types';
import { ToolbarButtonLocation } from 'api/types';
import { settings } from "./settings";
import { actions, DTI_SETTINGS_PREFIX, ACTIVATE_ONLY_SETTING, IMAGE_SEARCH_APIKEY_SETTING } from "./common";

joplin.plugins.register({
	onStart: async function() {
		console.info('Hexo Support plugin started!');
		await settings.register();
		const activateOnlyIfEnabledInMarkdownSettings = await joplin.settings.value(ACTIVATE_ONLY_SETTING);
		actions.imageSearch.apikey = await joplin.settings.value(IMAGE_SEARCH_APIKEY_SETTING);

		const dialogs = joplin.views.dialogs;
		const dialog = await dialogs.create('search_dialog');
		await joplin.views.dialogs.addScript(dialog, 'dialog.js');
		await joplin.views.dialogs.addScript(dialog, 'dialog.css');
		await dialogs.setButtons(dialog, [
			{
				id: 'cancel',
				title: 'Close'
			}
		]);

		// process actions
		for (const actionName in actions) {
			const action = actions[actionName];
			let activate = true;

			if (activateOnlyIfEnabledInMarkdownSettings && actionName !== 'textStrikethrough') {
				activate = await joplin.settings.globalValue(action.markdownPluginSetting);
			}

			joplin.commands.register({
				name: actionName,
				label: action.parseFormType,
				enabledCondition: 'markdownEditorPaneVisible && !richTextEditorVisible',
				iconName: action.iconName,
				execute: async () => {
					const selectedText = (await joplin.commands.execute('selectedText') as string);

					console.log('setting action');
					let newText = '' as string;
					if(action.showDialog){
						console.log('show dialog');
						await dialogs.setHtml(dialog, action.execute(selectedText, action.label, action.apikey));
						const result=await dialogs.open(dialog);
						const formdata = result.formData.formdata;
						//console.log(formdata);
						let mediaType = (formdata.resultURL.search(".jpg")>-1)?'image':'';
						//console.log(mediaType);
						newText = action.parseFormData(formdata, mediaType);
					}else{
						console.log('return something else but dialog');
						newText = action.execute(selectedText);
					}

					await joplin.commands.execute('replaceSelection', newText);
					await joplin.commands.execute('editor.focus');
				},
			});
			var toolbarIconEnabled = !(await joplin.settings.value(DTI_SETTINGS_PREFIX + actionName));
			if (toolbarIconEnabled) {
				joplin.views.toolbarButtons.create(actionName + 'Button', actionName, ToolbarButtonLocation.EditorToolbar);
			}
			joplin.views.menuItems.create(actionName + 'MenuItem', actionName, MenuItemLocation.Edit, { accelerator: action.accelerator });
		}

	},
});
