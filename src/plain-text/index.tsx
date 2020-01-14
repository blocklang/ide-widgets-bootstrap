import { create, tsx } from "@dojo/framework/core/vdom";
import icache from "@dojo/framework/core/middleware/icache";
import dimensions from "@dojo/framework/core/middleware/dimensions";
import * as css from "./index.m.css";
import ide from "designer-core/middleware/ide";

export interface PlainTextProperties {
	value?: string;
}

/**
 * 最好的实现是使用 <span contenteditable="true"/>，但是编辑内容时， dojo 每次都将光标移到文本前面，所以改为使用 textarea 模拟。
 */
const factory = create({ dimensions, icache, ide }).properties<PlainTextProperties>();

export default factory(function PlainText({ properties, middleware: { dimensions, icache, ide } }) {
	ide.config("root", "value");
	ide.tryFocus();
	const { value = "" } = properties();

	const _focused = icache.getOrSet<boolean>("textareaFocus", false);
	let emptyValueClass: string = "";
	if (value === "") {
		if (_focused) {
			emptyValueClass = css.textareaEmpty;
		} else {
			emptyValueClass = css.divEmpty;
		}
	}

	// 因为 span 的高度（29）总是比内容的高度（24）高，没有找到原因，所以这里先获取内容的高度，然后再设置为根节点 span 的高度
	const preDimensions = dimensions.get("pre");
	const rootStyles: any = {};
	if (preDimensions.size.height > 0) {
		rootStyles.height = `${preDimensions.size.height}px`;
	}

	// 双击，支持编辑
	return (
		<span key="root" classes={[css.root]} styles={rootStyles} {...ide.activeWidgetEvents()}>
			<pre key="pre" classes={[css.pre, emptyValueClass]}>
				<span>{value}</span>
				<br />
			</pre>
			{!_focused && (
				<div
					key="readonlyDiv"
					classes={[css.div]}
					ondblclick={() => {
						icache.set("textareaFocus", true);
					}}
				>
					{value}
				</div>
			)}
			{_focused && (
				<textarea
					key="textarea"
					classes={[css.textarea]}
					placeholder="输入文本"
					spellcheck={false}
					focus={() => true}
					onblur={() => {
						icache.set("textareaFocus", false);
					}}
					oninput={(event: KeyboardEvent) => {
						const value = (event.target as HTMLTextAreaElement).value;
						ide.changePropertyValue(value);
					}}
				>
					{value}
				</textarea>
			)}
		</span>
	);
});
