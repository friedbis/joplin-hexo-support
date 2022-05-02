import joplin from 'api';
import { MenuItemLocation } from 'api/types';
import { ToolbarButtonLocation } from 'api/types';
import { settings } from "./settings";
import { actions, DTI_SETTINGS_PREFIX, ACTIVATE_ONLY_SETTING, hostList, DEFAULTID  } from "./common";

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
