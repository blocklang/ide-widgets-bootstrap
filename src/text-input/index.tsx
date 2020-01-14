import { create, tsx } from "@dojo/framework/core/vdom";
import { TextInputProperties } from "widgets-bootstrap/text-input";
import ide from "designer-core/middleware/ide";
import Overlay from "designer-core/widgets/overlay";
import * as css from "./index.m.css";
import * as c from "bootstrap-classes";

const factory = create({ ide }).properties<TextInputProperties>();

export default factory(function TextInput({ properties, middleware: { ide } }) {
	ide.config("root");
	ide.tryFocus();

	const { value = "", onValue } = properties();
	return (
		<virtual>
			<input
				key="root"
				classes={[css.root, c.form_control]}
				value={value}
				oninput={(event: Event) => {
					event.stopPropagation();
					const value = (event.target as HTMLInputElement).value;
					onValue && onValue(value);
				}}
			/>
			<Overlay {...ide.getFocusNodeOffset()} {...ide.activeWidgetEvents()} />
		</virtual>
	);
});
