let all = [];

chrome.bookmarks.getTree((bookmarks)=>{
	process_bookmark(bookmarks);
});


let closeFirstTab = function(){
	chrome.tabs.query({},(tabs)=>{
		chrome.tabs.remove(tabs[0].id);
	});
};

let closeRandomTab = function(){
	chrome.tabs.query({},(tabs)=>{
		let randTab = tabs[Math.floor(Math.random() * tabs.length)];
		chrome.tabs.remove(randTab.id);
	});
};

let shuffleTabs = function(){
	chrome.tabs.query({},(tabs)=>{
		for(let i=0;i<tabs.length;i++){
			let tab = tabs[i];
			let rand = Math.floor(Math.random() * tabs.length);
			chrome.tabs.move(tab.id,{index:rand});
		}
	});
}

let openRandomFromHistory = function(){
	chrome.history.search({text:''}, (history)=>{
		let randomItem = history[Math.floor(Math.random() * history.length)];
		chrome.tabs.create({ url: randomItem.url });
	});

};

function process_bookmark(bookmarks) {

    for (var i =0; i < bookmarks.length; i++) {
        var bookmark = bookmarks[i];
        if (bookmark.url) {
            all.push(bookmark.url);
        }

        if (bookmark.children) {
            process_bookmark(bookmark.children);
        }
    }
}


let openRandomBookmark = function(){
	let rand = all[Math.floor(Math.random() * all.length)];
	chrome.tabs.create({ url: rand });
};

let options = [openRandomBookmark, closeFirstTab, closeRandomTab, shuffleTabs, openRandomFromHistory];

$('button').on('click',()=>{
	let rand = Math.floor(Math.random() * options.length);
	let annoy = options[rand];
	annoy();
});