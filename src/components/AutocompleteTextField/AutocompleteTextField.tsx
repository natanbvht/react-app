import Autocomplete, { AutocompleteProps } from "@mui/material/Autocomplete";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { useMemo } from "react";

interface AutocompleteTextFieldProps extends Omit<AutocompleteProps<string, boolean, boolean, boolean>, "renderInput"> {
	textFieldProps?: TextFieldProps;
}

function AutocompleteTextField({ textFieldProps, ...autocompleteProps }: AutocompleteTextFieldProps) {
	return (
		<Autocomplete
			{...autocompleteProps}
			renderInput={(params) => (
				<TextField
					{...params}
					{...textFieldProps}
					InputLabelProps={textFieldProps?.InputLabelProps}
				/>
			)}
		/>
	);
}

AutocompleteTextField.defaultProps = {
	textFieldProps: {
		required: true,
		fullWidth: true,
		autoComplete: "on"
	}
};

function MemorizedAutoCompleteTextField(props: AutocompleteTextFieldProps) {
	return useMemo(() => <AutocompleteTextField {...props} />, [props]);
}

export default MemorizedAutoCompleteTextField;
