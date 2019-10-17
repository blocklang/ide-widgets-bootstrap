import * as blocklang from "designer-core/blocklang";
import TextInput from "./text-input";
import TextInputPropertiesLayout from "./text-input/propertiesLayout";
import { widgetInstanceMap } from "@dojo/framework/core/vdom";

/*******************************/
/*****往设计器中注册 Widget******/
/*******************************/

// 一个问题：
// 如果在这里写了组件仓库所在的网址，如 github.com
// 那么在 gitee 中备份该仓库，然后从 gitee 开始安装，则这里的值却依然是 github.com
// 如果动态获取呢？
const gitUrlSegment = { website: "github.com", owner: "blocklang", repoName: "ide-widgets-bootstrap" };
const widgets = {
	TextInput: { widget: TextInput, propertiesLayout: TextInputPropertiesLayout }
};
blocklang.registerWidgets(gitUrlSegment, widgets);

blocklang.cacheWidgetInstanceMap(gitUrlSegment, widgetInstanceMap);
