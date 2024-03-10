import { Button } from "@mui/material"
import { ActionsButtonsComponentProps, ActionsButtonsProps } from "./Types"

function ActionsButtonsComponent({ actions }: ActionsButtonsComponentProps) {
	const buttons: (JSX.Element | null)[] = actions.map((
		actionItem: ActionsButtonsProps,
		index: number) => {
			const { action, color } = actionItem;
			const button: JSX.Element | null = (
				<Button
					key={index}
					variant="contained"
					size="small"
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					color={color as any}
					sx={{ fontSize: "9px", margin: "2px" }}
				>
					{action}
				</Button>
			);
			return button;
		});
	return buttons;
}

export default ActionsButtonsComponent;
