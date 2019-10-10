import global from "@dojo/framework/shim/global";
import TextInput from "./text-input";

// TODO：为防止用户恶意修改，本文件的代码将在编译期间自动生成
// 1. 统一在 global._block_lang_widgets_ 中存放部件，是一个全局变量
if (!global._block_lang_widgets_) {
	global._block_lang_widgets_ = {};
}
// key 的值与部件的文件夹名相同
var widgetMap = { "text-input": TextInput };
// 使用 {website}/{owner}/{repoName} 唯一标识组件库中的 Widget
// 是否需要版本号？因为只加载了一个版本，所以这里不需要版本号做区分
global._block_lang_widgets_["github.com/blocklang/ide-widgets-bootstrap"] = widgetMap;
