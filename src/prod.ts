import * as blocklang from "designer-core/blocklang";
import TextInput from "./text-input";
import TextInputBase from "widgets-bootstrap/text-input";
import TextInputPropertiesLayout from "./text-input/propertiesLayout";
import { widgetInstanceMap } from "@dojo/framework/core/vdom";
import { ExtensionWidgetMap, GitUrlSegment } from "designer-core/interfaces";
import PlainTextBase from "widgets-bootstrap/plain-text";
import PlainText from "./plain-text";

/*******************************/
/*****往设计器中注册 Widget******/
/*******************************/

// 一个问题：
// 如果在这里写了组件仓库所在的网址，如 github.com
// 那么在 gitee 中备份该仓库，然后从 gitee 开始安装，则这里的值却依然是 github.com
// 如果动态获取呢？
const gitUrlSegment: GitUrlSegment = { website: "github.com", owner: "blocklang", repoName: "ide-widgets-bootstrap" };
const widgets: ExtensionWidgetMap = {
	TextInput: { widget: TextInputBase, ideWidget: TextInput, propertiesLayout: TextInputPropertiesLayout },
	PlainText: { widget: PlainTextBase, ideWidget: PlainText, propertiesLayout: [] }
};
blocklang.registerWidgets(gitUrlSegment, widgets);

blocklang.cacheWidgetInstanceMap(gitUrlSegment, widgetInstanceMap);
