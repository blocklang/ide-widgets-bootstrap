import WidgetBase from "@dojo/framework/core/WidgetBase";
import { tsx } from "@dojo/framework/core/vdom";
import * as css from "./index.m.css";
import { WidgetDesignableMixin } from "designer-core/mixins/WidgetDesignable";

export interface PlainTextProperties {
	value?: string;
}

export class PlainTextBase extends WidgetBase<PlainTextProperties> {
	private _focused: boolean = false;

	protected render() {
		const { value = "" } = this.properties;

		// 双击，支持编辑
		return (
			<span key={this.getRootKey()} classes={[css.root]}>
				<pre classes={[css.pre]}>
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
