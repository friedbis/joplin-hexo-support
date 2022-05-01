import joplin from 'api';
import { MenuItemLocation } from 'api/types';
import { ToolbarButtonLocation } from 'api/types';
import { settings } from "./settings";
import { actions, DTI_SETTINGS_PREFIX, ACTIVATE_ONLY_SETTING, hostList  } from "./common";

function wrapSelectionWithStrings(selected: string|null){
	for(const host in hostList){
		const objHost = hostList[host];
		if(selected.search(objHost.hostname)>-1){
			return wrapSelectionWithStrings2(selected, objHost.wrapString1, objHost.wrapString2, objHost.defaultText, objHost.hostname, objHost.queryString);
		}
		if(objHost.anotherHostname!==""&&selected.search(objHost.anotherHostname)>-1){
			return wrapSelectionWithStrings2(selected, objHost.wrapString1, objHost.wrapString2, objHost.defaultText, objHost.anotherHostname, objHost.queryString);
		}
		if(selected.search(objHost.name)>-1){
			return wrapSelectionWithStrings2(selected, objHost.wrapString1, objHost.wrapString2, objHost.defaultText, objHost.name, objHost.queryString);
		}
	}
}

function wrapSelectionWithStrings2(selected: string|null, string1: string, string2: string, defaultText: string, hostname: string, queryString: string) {
	if (!selected) selected = defaultText;
	
	// Remove white space on either side of selection
	const start = selected.search(/[^\s]/);
	const end = selected.search(/[^\s](?=[\s]*$)/);
	const core = selected.slice(start,  end + 1);
	console.log(core);

	// If selection can be toggled do that
	if (core.startsWith(string1) && core.endsWith(string2)) {
		const inside = core.slice(string1.length, core.length - string2.length);
		return selected.slice(0, start) + inside + selected.slice(end + 1);
	} else {
		const videoid=getVideoId(selected, defaultText, hostname, queryString);
		console.log(videoid);
		return selected.slice(0, start) + string1 + videoid + string2 + selected.slice(end + 1);
	}
}

function getVideoId(selected: string, defaultText: string, hostname: string, queryString: string){
	let parse: URL;
	try {
		parse = new URL(selected);
	}catch(err){
		console.log('Error parsing URL');
		//parse = new URL(defaultText);
		return '**error**';
	}

	if(parse.hostname.search(hostname)<0){
		return '**error**';
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

			let activate = true;

			if (activateOnlyIfEnabledInMarkdownSettings && actionName !== 'textStrikethrough') {
				activate = await joplin.settings.globalValue(action.markdownPluginSetting);
			}

			joplin.commands.register({
				name: actionName,
				label: action.label,
				enabledCondition: 'markdownEditorPaneVisible && !richTextEditorVisible',
				iconName: action.iconName,
				execute: async () => {
					const selectedText = (await joplin.commands.execute('selectedText') as string);

					const newText = wrapSelectionWithStrings(selectedText);

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
