import global from '@dojo/framework/shim/global';
import TextInput from './widgets/text-input';

// TODO：为防止用户恶意修改，本文件的代码将在编译期间自动生成
// 1. 统一在 global._block_lang_widgets 中存放部件，是一个全局变量
if(!global._block_lang_widgets_) {
    global._block_lang_widgets_ = {};
}
// key 的值与部件的文件夹名相同
const widgetMap = {"text-input": TextInput};
// 使用 {website}/{owner}/{repoName} 唯一标识组件库中的 Widget
global._block_lang_widgets_.push({"github.com/blocklang/ide-widgets-bootstrap": widgetMap});
