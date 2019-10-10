import { create, tsx } from "@dojo/framework/core/vdom";

export interface TextInputProperties {}

const factory = create().properties<TextInputProperties>();

export default factory(function TextInput({ properties }) {
	const {} = properties();
	return <div>Text Input</div>;
});
