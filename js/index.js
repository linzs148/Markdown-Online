function getInput(event){
	let str = event.target.value;
	processInput(str);
}

function processInput(str){
	let res = "";
	lines = str.split("\n");
	let n = lines.length;
	let state = false;
	
	for (let i = 0; i < n; i++) {
		let line = lines[i], flag = true;
		
		//检测代码块
		let code = /^\s*`{3,}/g;
		if (code.test(line)) {
			if (state) {
				res += '</code></pre>';
				state = false;
			}
			else {
				res += '<pre class="line-numbers"><code class="language-js">';
				state = true;
			}
			continue;
		}
		
		if (state) {
			res += line + "\n";
			continue;
		}
		
		//检测分割线
		let separator = /^\*{3,}\s*$|^-{3,}$/g;
		//查 改
		if (separator.test(line)) {
			res += "<hr/ >";
			continue;
		}
		
		//检测引用
		let quote = /^\s*>\s*/g;
		let cnt = 0;
		//cnt记录有几个开头的>
		while (quote.test(line)) {
			cnt++;
			let idx = line.match(quote)[0].length;
			line = line.substring(idx);
			flag = false;
		}
		
		//检测标题
		let title = /^#+\s+/g;
		let number = 0;
		if (title.test(line)) {
			number = line.match(title)[0].replace(/\s+/g, "").length;
			if (number > 6) number = 6;
			flag = false;
		}
		
		if (number !== 0) line = "<h" + number + ">" + line.substring(number) + "</h" + number + ">";
		//此时才写<blockquote>标签，因为引用中也可能有标题
		if (line.replace(/\s+/g,"").length === 0) line = '<div class="blockquote"></div>'
		for (let i = 0; i < cnt; i++) line = "<blockquote>" + line + "</blockquote>";
		
		

		//检测无序列表
		let unordered_list = /^\s*[\*+-]\s+/g;
		if (unordered_list.test(line)) {
			let idx = line.match(unordered_list)[0].length;
			line = "<ul><li>" + line.substring(idx) + "</li></ul>";
			flag = false;
		}
		
		//检测有序列表
		let ordered_list = /^\s*\d\.\s+/g;
		if (ordered_list.test(line)) {
			let idx = line.match(ordered_list)[0].length;
			line = "<ol><li>" + line.substring(idx) + "</li></ol>";
			flag = false;
		}
		
		//检测粗斜体
		let bi = /\*{3}.+?\*{3}|_{3}.+?_{3}/g;
		if (bi.test(line)) {
			let items = line.match(bi);
			let length = items.length;
			for (let i = 0; i < length; i++) {
				let item = items[i];
				line = line.replace(item, "<b><i>" + item.substring(3, item.length - 3) + "</i></b>");
			}
		}
		//此时line已经被替换为<b><i></i></b>
		
		//检测粗体
		let bold = /\*{2}.+?\*{2}|_{2}.+?_{2}/g;
		if (bold.test(line)) {
			let items = line.match(bold);
			let length = items.length;
			for (let i = 0; i < length; i++) {
				let item = items[i];
				line = line.replace(item, "<b>" + item.substring(2, item.length - 2) + "</b>");
			}
		}
		
		//检测斜体
		let italic = /\*.+?\*/g;
		if (italic.test(line)) {
			let items = line.match(italic);
			let length = items.length;
			for (let i = 0; i < length; i++) {
				let item = items[i];
				line = line.replace(item, "<i>" + item.substring(1, item.length - 1) + "</i>");
			}
		}
		
		//检测删除线
		let deleted = /~{2}.+?~{2}/g;
		if (deleted.test(line)) {
			let items = line.match(deleted);
			let length = items.length;
			for (let i = 0; i < length; i++) {
				let item = items[i];
				line = line.replace(item, "<del>" + item.substring(2, item.length - 2) + "</del>");
			}
		}
		
		//检测段落中的代码
		let pcode = /`.+?`/g;
		if (pcode.test(line)) {
			let items = line.match(pcode);
			let length = items.length;
			for (let i = 0; i < length; i++) {
				let item = items[i];
				line = line.replace(item, '<span class="code">' + item.substring(1, item.length - 1) + '</span>');
			}
		}
		
		//检测图片
		let image = /!\[.*?\]\(.*?\)/g;
		if (image.test(line)) {
			let items = line.match(image);
			let length = items.length;
			for (let i = 0; i < length; i++) {
				let item = items[i];
				let attrs = item.split("](");
				let name = attrs[0].substring(2);
				let src = attrs[1].substring(0, attrs[1].length - 1);
				line = line.replace(item, '<img src="' + src + '" name="' + name + '"></img>');
			}
		}
		
		//检测链接
		let url = /\[.*?\]\(.*?\)/g;
		if (url.test(line)) {
			let items = line.match(url);
			let length = items.length;
			for (let i = 0; i < length; i++) {
				let item = items[i];
				let attrs = item.split("](");
				let name = attrs[0].substring(1);
				let href = attrs[1].substring(0, attrs[1].length - 1);
				line = line.replace(item, '<a target="_blank", href="' + href + '">' + name + '</a>');
			}
		}
		
		res += line;
		if (flag) res += "<br />";
	}
	
	res = res.replace(/<\/ul>\s*<ul>/g, "").replace(/<\/ol>\s*<ol>/g, "");
	document.querySelector(".right").innerHTML = res;
}

function isEndWithSpace(str) {
	if (str !== "" && str.charAt(str.length - 1) !== "\n") str += "\n"
	return str;
}

function writeTitle(level) {
	let str = document.querySelector("textarea").value;
	str = isEndWithSpace(str);
	for (let i = 0; i < level; i++) str += "#";
	str += " 这是标题";
	document.querySelector("textarea").value = str;
	processInput(str);
}

function writeBold() {
	let str = document.querySelector("textarea").value;
	str = isEndWithSpace(str);
	str += "**这是粗体**";
	document.querySelector("textarea").value = str;
	processInput(str);
}

function writeItalic() {
	let str = document.querySelector("textarea").value;
	str = isEndWithSpace(str);
	str += "*这是斜体*";
	document.querySelector("textarea").value = str;
	processInput(str);
}

function writeDeleted() {
	let str = document.querySelector("textarea").value;
	str = isEndWithSpace(str);
	str += "~~这是删除线~~";
	document.querySelector("textarea").value = str;
	processInput(str);
}

function writeImage() {
	let str = document.querySelector("textarea").value;
	str = isEndWithSpace(str);
	str += "![这是图片](https://www.hualigs.cn/image/6050c9761bab7.jpg)";
	document.querySelector("textarea").value = str;
	processInput(str);
}

function writeUrl() {
	let str = document.querySelector("textarea").value;
	str = isEndWithSpace(str);
	str += "[这是链接](https://www.baidu.com/)";
	document.querySelector("textarea").value = str;
	processInput(str);
}

function writeSeparator() {
	let str = document.querySelector("textarea").value;
	str = isEndWithSpace(str);
	str += "这是分割线\n***\n";
	document.querySelector("textarea").value = str;
	processInput(str);
}

function writeCode() {
	let str = document.querySelector("textarea").value;
	str = isEndWithSpace(str);
	str += "```\n这是代码\n```";
	document.querySelector("textarea").value = str;
	processInput(str);
}

function writeQuote() {
	let str = document.querySelector("textarea").value;
	str = isEndWithSpace(str);
	str += "> 这是引用\n> 这也是引用";
	document.querySelector("textarea").value = str;
	processInput(str);
}

function writeUnorderedList() {
	let str = document.querySelector("textarea").value;
	str = isEndWithSpace(str);
	str += "* 无\n* 序\n* 列\n* 表";
	document.querySelector("textarea").value = str;
	processInput(str);
}

function writeOrderedList() {
	let str = document.querySelector("textarea").value;
	str = isEndWithSpace(str);
	str += "1. 有\n2. 序\n3. 列\n4. 表";
	document.querySelector("textarea").value = str;
	processInput(str);
}