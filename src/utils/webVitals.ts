/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
const reportWebVitals = (onPerfEntry?: any) => {
	if (onPerfEntry && onPerfEntry instanceof Function) {
		import("web-vitals").then(({ onCLS, onFID, onFCP, onLCP, onTTFB }) => {
			onCLS(onPerfEntry);
			onFID(onPerfEntry);
			onFCP(onPerfEntry);
			onLCP(onPerfEntry);
			onTTFB(onPerfEntry);
		});
	}
};

export default reportWebVitals;
