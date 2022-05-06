# Joplin Plugin Hexo Support

This plugin is a support tool for Hexo.

## Functions

1. Translate a selected url into hexo owl tag
1. ~~[ToDo] Search text and download image from the result and insert the image~~
1. [ToDo] Add items of **Google Search** and **Google Translate** into a context-menu for a selected text

### Hexo Tag Owl

Translate a selected url into hexo owl tag

This is created assuming that can work in [hexo-tag-owl-fb](https://github.com/friedbis/hexo-tag-owl-fb).

#### Tag Translation Examples

##### __images__

https://media.giphy.com/media/XXXXXXXXXXXXX/giphy.gif -> {% owl giphy XXXXXXXXXXXXX %}

https://imgur.com/gallery/XXXXXXX -> {% owl imgur XXXXXXX %}

local images don't work.
I'm thinking whether it can work in other way.

##### __videos__

https://youtu.be/XXXXXXXXX -> {% owl youtube XXXXXXXXX %}

https://www.youtube.com/watch?v=XXXXXXXXX -> {% owl youtube XXXXXXXXX %}

https://nico.ms/XXXXXXXX -> {% owl niconico XXXXXXXX watch %}

https://www.nicovideo.jp/watch/XXXXXXXX -> {% owl niconico XXXXXXXX watch %}

https://www.dailymotion.com/video/XXXXXXX -> {% owl dailymotion XXXXXXX %}

bilibili, tudou, youku, tencent, ted don't work because I don't use them at all. :)

### Google Search

Translate a selected text into link format string using a result of Google Search.
Select a text that you want to search and press short cut key(Ctrl|Cmd + Shift + G) and then a search result dialog will be displayed,
Select a link you want to paste into your note and click [__CLOSE__], and the dialog will be close to paste the link into it.

#### Google Search Examples

**Apple, Inc.** -> \[**Apple（日本）**](https://www.apple.com/jp/)

**Joplin API References** -> \[**Joplin Plugin API Documentation**](https://joplinapp.org/api/references/plugin_api/classes/joplin.html)

