# 在线Markdown编辑器



---



## 项目说明

本次项目为字节跳动训练营第六期大作业，要求是基于**HTML**、**CSS**和**JavaScript**实现一个在线的Markdown编辑器



### 成果链接

[Markdown Oline](https://linzs148.github.io/tech-training-camp-frontend/)



### 实现的功能

1. 常用Markdown语法转换，包括

   * 标题
   * 粗体
   * 斜体
   * 粗斜体
   * 删除线
   * 分割线
   * 图片
   * 链接
   * 代码块
   * 引用块
   * 嵌套引用块
   * 段落中的代码
2. 支持使用顶部工具栏按钮进行操作，以便于不熟悉Markdown语法的初学者进行书写



---



## 项目思路



### 结构布局

整体的布局分为4个部分，分别为

* 顶部的header放置了常用Markdown语法的按钮，方便初学者操作
* mainbody的left区域用来输入Markdown源代码
* mainbody的right区域用来展示转换之后的Markdown文本
* 底部的footer用来展示版权信息



### 风格样式

整体的页面尊崇**简约**的风格，配色为**黑、白、灰**，将三者互相进行搭配从而呈现出淡雅的视觉体验



### 转换逻辑

基于**正则表达式**对于**输入的每一行**进行各种样式语法的判断，并**将匹配到的Markdown语法转换为对应的HTML标签**

`header`区域内的按钮则是通过**将指定文本输入到左侧文本域并调用`processInput()`方法转换为对应形式在右侧展示**来实现



---



## 项目困难

困难的地方还是蛮多的（哭）

1. 整体的布局

   由于我开始写CSS布局的时候还没学习CSS进阶的课程，所以靠着自己的摸索整了很久

   我先是通过具体的像素值来设定左右两块区域的宽度，后来发现这样写实在很不方便，需要测量整个页面的宽度，而且对于不同宽度的设备并不能很好地展示出来

   通过一番百度之后我选择了**flex布局**，将左右两块区域的**flex都设置为1**，就能很好地平分整块区域

2. 换行问题

   由于有些标签的块级元素不需要再进行换行（添加br标签），而有些内联元素如果不换行就会展示在同一行内，不符合转换的要求

   所以我在判断每一行样式的时候都用一个`flag`来记录是否需要进行换行

3. 列表问题

   对于无序列表（有序列表同理）需要添加两重标签（`<ul><li></li></ul>`），添加第二个`<li>`的时候很难将其插入到对应的第一个`<ul>`之中

   这里我采用了一个比较奇葩的办法

   对于每一个无序列表项我都添加一个`<ul><li></li></ul>`，最后将所有的`</ul><ul>`替换为空字符串就能达到理想的效果

   不知道有没有什么更好的办法

4. 样式问题

   由于原生的各种HTML标签的样式都不算好看，所以我调试了很久才勉强完成了一套还算不错的样式

5. 嵌套问题

   这个问题是我最后也没能解决的

   主要就是对于各种块级语法的**互相嵌套**（引用里加入无序列表、无序列表里加引用等），基于正则表达式似乎没法完成（或者很难完成）这种转换，这也是我这次大作业的遗憾之一，希望能通过后续的学习来实现这一点



---



## 项目不足



1. 完备性

   如上面所说，这次完成的编辑器没法实现块级语法的互相嵌套，同时也只涉及到了部分常用的Markdown语法，并不能对于所有的语法都进行转换

2. 样式风格

   由于本人不具备太高的艺术素养（淦），所以没有设计出好看的样式风格

   后续有时间的话会对各种样式风格进行尝试，计划给编辑器添加切换风格的功能

   （PS：已经在尝试赛博朋克风格了（滑稽

3. 滚动条同步

   左右两侧的滚动条没有办法同步滑动，增加了两边同步定位的难度，不便于操作

   关于这个细节我已经查到了解决方案，只是由于时间问题还没来得及尝试



---



## 致谢

首先感谢这次训练营中字节跳动的各位哥哥姐姐们在这一个月里向我们教授知识、答疑解惑、给予鼓励，不仅让我对前端的基础知识有了更加深入的了解，也让我在学习、实践的过程中对前端产生了浓厚的兴趣，更加坚定未来向前端方向发展的决心

其次感谢这次训练营中的同学们，感谢大家互帮互助，共同成长的学习氛围，感谢大佬们能够对于基础比较差的同学（比如我）进行耐心地帮助，能够拥有这样的学习伙伴实在是很辛运！

最后要感谢坚持学习和做大作业的自己，虽然没有完全掌握所有的知识点、没有完美得完成大作业，但至少我坚持了下来，没有中途放弃，最终也取得了进步，还是值得夸奖一下自己的（滑稽
