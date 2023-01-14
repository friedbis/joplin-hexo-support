# Joplin Plugin Hexo Support

This plugin is a support tool for Hexo.

## Functions

1. Translate a selected url into hexo owl tag
1. ~~[ToDo] Search text and download image from the result and insert the image~~
1. ~~[ToDo] Add items of **Google Search** and **Google Translate** into a context-menu for a selected text~~
1. Press shortcut key for Google Search dialog, and translate a selected text into the search result in link format.
1. Press shortcut key for Text Translation dialog, and translate a selected text into the text in other language.
1. Wrap the datetime in tag of todo or alarm. (Only used for me)


### Hexo Tag Owl

Translate a selected url into hexo owl tag

This is created assuming that can work in [hexo-tag-owl-fb](https://github.com/friedbis/hexo-tag-owl-fb).

#### <span style="text-decoration:underline;font-weight:bold;">Tag Translation Examples</span>

|Source URL|Service|Tag Type|Translated Tag|
|---|---|---|---|
|media.giphy.com/media/<span style="color:#7f1b7f;font-weight:bold;">GIPHYID</span>/giphy.gif|Giphy|Image|{% owl giphy <span style="color:#7f1b7f;font-weight:bold;">GIPHYID</span> %}|23c075
|imgur.com/gallery/<span style="color:#23c075;font-weight:bold;">IMGURID</span> |Imgur|Image|{% owl imgur <span style="color:#23c075;font-weight:bold;">IMGURID</span> %}|
|youtu.be/<span style="color:#db2d32;font-weight:bold;">YOUTUBEID</span><br/>www.youtube.com/watch?v=<span style="color:#db2d32;font-weight:bold;">YOUTUBEID</span> |YouTube|Video|{% owl youtube <span style="color:#db2d32;font-weight:bold;">YOUTUBEID</span> %}|
|nico.ms/<span style="color:#444;font-weight:bold;">NICOVIDEOID</span><br/>www.nicovideo.jp/watch/<span style="color:#444;font-weight:bold;">NICOVIDEOID</span>|NicoNico Video|Video|{% owl niconico <span style="color:#444;font-weight:bold;">NICOVIDEOID</span> watch %}|
|www.dailymotion.com/video/<span style="color:#333;background:#eee;font-weight:bold;padding:2px 5px;">DAILYMOTIONID</span>|Daily Motion|Video|{% owl dailymotion <span style="color:#333;background:#eee;font-weight:bold;padding:2px 5px;">DAILYMOTIONID</span> %}|

- local images don't work. I'm thinking whether it can work in other way.
- bilibili, tudou, youku, tencent, ted don't work because I don't use them at all. :P
- The above URLs are removed a prefix "https://" intentionally.

### Google Search

Translate a selected text into link format string using a result of Google Search.
Select a text that you want to search and press short cut key(Ctrl|Cmd + Shift + G) and then a search result dialog will be displayed,
Select a link you want to paste into your note and click [__CLOSE__], and the dialog will be close to paste the link into it.

#### <span style="text-decoration:underline;font-weight:bold;">Google Search Examples</span>

|Selected Text|<span style="white-space:nowrap;"> -> </span>|Translated String|
|---|---|---|
|Apple, Inc.| -> |<span style="color:#10855c;text-decoration:underline;">\[**Apple（日本）**](www.apple.com/jp/)</span>|
|Joplin API References| -> |<span style="color:#10855c;text-decoration:underline;">\[**Joplin Plugin API Documentation**](joplinapp.org/api/references/plugin_api/classes/joplin.html)</span>|

- The above URLs are removed a prefix "https://" intentionally.

### Text Translation (English &lt;-> Japanese)

Translate a seleted text into the result as the other language with a shotcut key(Ctrl|Cmd + Shift + E).
This functions only works in Japanese to English or English to Japanese.
And it also works only in one or a couple of words at once.

#### Text Translation Examples

|Selected Text|<span style="white-space:nowrap;">-></span>|Translated String|
|---|---|---|
|Don't go| -> |<span style="color:#005ee3;text-decoration:underline;">**行かないで**</span>|
|超常現象| -> |<span style="color:#005ee3;text-decoration:underline;">**psi**</span>|
|Supercalifragilisticexpialidocious| -> |<span style="color:#005ee3;text-decoration:underline;">**すばらしい**</span>|
|パタニティ| -> |<span style="color:#005ee3;text-decoration:underline;">**fatherhood**</span>|
|Pokemon | -> |<span style="color:#005ee3;text-decoration:underline;">**ポケットモンスター**</span>|


### ToDo Alarm

Translate a selected datetime string into the original span tag. (Only for private use)

```
eg.
a:2023/01/23 12:00 -> <span class="alarm">2023/01/23 12:00</span>
t:2023/01/23 12:00 -> <span class="todo">2023/01/23 12:00</span>
```


#### Definition of class name

**WARNING: The definitions below are not for Joplin. An other tool makes a notice.**

##### alarm

For a notification at the date time (only one shot)

##### todo

For a notification at the due date time (sticky alarm)

