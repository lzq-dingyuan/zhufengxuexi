// ast语法树  用对象来描述原生语法的
// 虚拟DOM  用对象来描述Dom节点的
// ?: 匹配这个条件但是不捕获

const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`;  // abc-aaa 
const qnameCapture = `((?:${ncname}\\:)?${ncname})`;
const startTagOpen = new RegExp(`^<${qnameCapture}`); // 标签开头的正则 捕获的内容是标签名
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`); // 匹配标签结尾的 </div>
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/; // 匹配属性的
const startTagClose = /^\s*(\/?)>/; // 匹配标签结束的 >
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g

function start (tagName, attrs) {
  console.log('开始标签： ', tagName, '属性是', attrs)
}


function chars (text) {
  console.log(text, '这是text')
}

function end (tagName) {
  console.log(tagName, 'tagName')
}
function parseHTML (html){
  // 不停的解析html字符串
  while(html){
    console.log(html, '这是html')
    let textEnd = html.indexOf('<');
    if(textEnd == 0){
      let startTagMatch = parseStartTag();  // 通过这个方法获取匹配的结果 tagName, attrs
      if(startTagMatch){
        start(startTagMatch.tagName, startTagMatch.attrs)
        continue; // 如果开始标签匹配完毕之后，继续下一次匹配
      }
      const endTagMatch = html.match(endTag);
      if(endTagMatch){
        advance(endTagMatch[0].length)
        end(endTagMatch[1]);
        continue;
      }
    }
    let text;
    if(textEnd >= 0){
      text = html.substring(0, textEnd);
    }
    if(text){
      advance(text.length);
      chars(text);
    }
  }
  function advance(n){
    html = html.substring(n)
  }
  function parseStartTag () {
    let start = html.match(startTagOpen);
    if(start){
      const match = {
        tagName: start[1],
        attrs: []
      }
      advance(start[0].length)
      let end,attr; 
      while(!(end = html.match(startTagClose)) && (attr = html.match(attribute))){
        advance(attr[0].length)
        match.attrs.push({name: attr[1], value: attr[3] || attr[4] || attr[5]})
      }
      if(end){
        advance(end[0].length)
        return match
      }
    }
  }
}
export function compileToFunction(template){
  let root = parseHTML(template)
  return function render(){
 
  }
}