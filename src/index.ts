import joplin from 'api';
import { MenuItemLocation } from 'api/types';
import { ToolbarButtonLocation } from 'api/types';
import { ContentScriptType } from 'api/types';
import { settings } from "./settings";
import { actions, DTI_SETTINGS_PREFIX, ACTIVATE_ONLY_SETTING  } from "./common";
import { url } from 'inspector';
import { deflate } from 'zlib';

function wrapSelectionWithStrings(selected: string|null, string1: string, string2: string, defaultText: string, hostname: string, anotherHostname: string, queryString: string) {
	if (!selected) selected = defaultText;
	const videoid=getVideoId(selected, defaultText, hostname, anotherHostname, queryString);
	console.log(videoid);

	// Remove white space on either side of selection
	const start = selected.search(/[^\s]/);
	const end = selected.search(/[^\s](?=[\s]*$)/);
	const core = selected.slice(start,  end + 1);

	// If selection can be toggled do that
	if (core.startsWith(string1) && core.endsWith(string2)) {
		const inside = core.slice(string1.length, core.length - string2.length);
		return selected.slice(0, start) + inside + selected.slice(end + 1);
	} else {
		return selected.slice(0, start) + string1 + videoid + string2 + selected.slice(end + 1);
	}
}

function getVideoId(selected: string, defaultText: string, hostname: string, anotherHostname: string, queryString: string){
	let parse: URL;
	try {
		parse = new URL(selected);
	}catch(err){
		console.log('Error parsing URL');
		parse = new URL(defaultText);
	}

	if(parse.hostname.search(hostname)<0){
		if(anotherHostname!==""){
			if(parse.hostname.search(anotherHostname)<0){
				parse=new URL(defaultText);
			}
		}else{
			parse=new URL(defaultText);
		}
	}

	//parsing videoid
	if(queryString!==""){
		const start = parse.search.search(queryString);
		if(start>-1){
			const params = parse.searchParams;
			const query = queryString.replace('=','').replace('?','');
			return params.get(query);
		}
	}

	const pathArray = parse.pathname.split('/');
	if(pathArray[pathArray.length-1]!==''){
		return pathArray[pathArray.length-1];
	}else{
		return pathArray[pathArray.length-2];
	}
}

joplin.plugins.register({
	onStart: async function() {
		console.info('Hexo Support plugin started!');
		await settings.register();
		const activateOnlyIfEnabledInMarkdownSettings = await joplin.settings.value(ACTIVATE_ONLY_SETTING);

		// process actions
		for (const actionName in actions) {
			const action = actions[actionName];

			joplin.commands.register({
				name: actionName,
				label: action.label,
				enabledCondition: 'markdownEditorPaneVisible && !richTextEditorVisible',
				iconName: action.iconName,
				execute: async () => {
					const selectedText = (await joplin.commands.execute('selectedText') as string);

					const newText = wrapSelectionWithStrings(selectedText, action.wrapString1, action.wrapString2, action.defaultText, action.hostname, action.anotherHostname, action.queryString);

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
