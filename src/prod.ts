import * as blocklang from "@blocklang/designer-core/blocklang";
import TextInputPreview from "widgets-bootstrap/text-input";
import TextInputIde from "./text-input";
import TextInputPropertiesLayout from "./text-input/propertiesLayout";
import PageDataPropertiesLayout from "./page-data/edit/propertiesLayout";
import { widgetInstanceMap } from "@dojo/framework/core/vdom";
import { ExtensionWidgetMap, GitUrlSegment } from "@blocklang/designer-core/interfaces";
import PlainTextPreview from "widgets-bootstrap/plain-text";
import PlainTextIde from "./plain-text";
import PageDataPreview from "./page-data/preview";
import PageDataIde from "./page-data/edit";

/*******************************/
/*****往设计器中注册 Widget******/
/*******************************/

// 一个问题：
// 如果在这里写了组件仓库所在的网址，如 github.com
// 那么在 gitee 中备份该仓库，然后从 gitee 开始安装，则这里的值却依然是 github.com
// 如果动态获取呢？
const gitUrlSegment: GitUrlSegment = { website: "github.com", owner: "blocklang", repoName: "ide-widgets-bootstrap" };
const widgets: ExtensionWidgetMap = {
	TextInput: { widget: TextInputPreview, ideWidget: TextInputIde, propertiesLayout: TextInputPropertiesLayout },
	PlainText: { widget: PlainTextPreview, ideWidget: PlainTextIde, propertiesLayout: [] },
	PageData: { widget: PageDataPreview, ideWidget: PageDataIde, propertiesLayout: PageDataPropertiesLayout },
};
blocklang.registerWidgets(gitUrlSegment, widgets);

blocklang.cacheWidgetInstanceMap(gitUrlSegment, widgetInstanceMap);
