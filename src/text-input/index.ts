import { create, v, w } from "@dojo/framework/core/vdom";
import { TextInputProperties } from "widgets-bootstrap/text-input";
import ide from "@blocklang/designer-core/middleware/ide";
import Overlay from "@blocklang/designer-core/widgets/overlay";
import * as css from "./index.m.css";
import * as c from "@blocklang/bootstrap-classes";

const factory = create({ ide }).properties<TextInputProperties>();

export default factory(function TextInput({ properties, middleware: { ide } }) {
	ide.config("root");

	const { value = "", onValue } = properties();
	return [
		v("input", {
			key: "root",
			classes: [css.root, c.form_control],
			value,
			oninput: (event: KeyboardEvent) => {
				event.stopPropagation();
				const value = (event.target as HTMLInputElement).value;
				onValue && onValue(value);
			},
		}),
		w(Overlay, { ...ide.getFocusNodeOffset(), ...ide.activeWidgetEvents() }),
		ide.alwaysRenderActiveWidget(),
	];
});
