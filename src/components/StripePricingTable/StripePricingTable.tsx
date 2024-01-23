interface StripePricingTableProps {
	email?: string;
	referenceId?: string;
	pricingTableId: string;
	publishableKey: string;
}

function StripePricingTable({ email, referenceId, pricingTableId, publishableKey }: StripePricingTableProps) {
	return (
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		<stripe-pricing-table
			customer-email={email}
			publishable-key={publishableKey}
			client-reference-id={referenceId}
			pricing-table-id={pricingTableId}
		/>
	);
}

export default StripePricingTable;
