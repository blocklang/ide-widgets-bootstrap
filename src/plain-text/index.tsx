import WidgetBase from "@dojo/framework/core/WidgetBase";
import { tsx } from "@dojo/framework/core/vdom";
import * as css from "./index.m.css";
import { WidgetDesignableMixin } from "designer-core/mixins/WidgetDesignable";
import Dimensions from "@dojo/framework/core/meta/Dimensions";

export interface PlainTextProperties {
	value?: string;
}

/**
 * 最好的实现是使用 <span contenteditable="true"/>，但是编辑内容时， dojo 每次都将光标移到文本前面，所以改为使用 textarea 模拟。
 */
export class PlainTextBase extends WidgetBase<PlainTextProperties> {
	private _focused: boolean = false;

	protected render() {
		const { value = "" } = this.properties;

		let emptyValueClass;
		if (value === "") {
			if (this._focused) {
				emptyValueClass = css.textareaEmpty;
			} else {
				emptyValueClass = css.divEmpty;
			}
		}

		// 因为 span 的高度（29）总是比内容的高度（24）高，没有找到原因，所以这里先获取内容的高度，然后再设置为根节点 span 的高度
		const dimensions = this.meta(Dimensions).get("pre");
		const rootStyles: any = {};
		if (dimensions.size.height > 0) {
			rootStyles.height = `${dimensions.size.height}px`;
		}

		// 双击，支持编辑
		return (
			<span key={this.getRootKey()} classes={[css.root]} styles={rootStyles}>
				<pre key="pre" classes={[css.pre, emptyValueClass]}>
					<span>{value}</span>
					<br />
				</pre>
				{this._focused === false && (
					<div
						classes={[css.div]}
						ondblclick={(event: MouseEvent) => {
							this._focused = true;
							this.invalidate();
						}}
					>
						{value}
					</div>
				)}
				{this._focused && (
					<textarea
						classes={[css.textarea]}
						placeholder="输入文本"
						spellcheck={false}
						focus={() => true}
						onblur={() => {
							this._focused = false;
							this.invalidate();
						}}
					>
						{value}
					</textarea>
				)}
			</span>
		);
	}

	getRootKey() {
		return "plain-text";
	}
}

export default class PlainText extends WidgetDesignableMixin(PlainTextBase) {
	/**
	 * 支持直接编辑，因此不能为本部件添加遮盖层。
	 */
	protected needOverlay(): boolean {
		return false;
	}

	protected getCanEditingPropertyName(): string | undefined {
		return "value";
	}
}
