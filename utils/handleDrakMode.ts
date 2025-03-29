export const handleDarkMode = (): void => {
	const htmlElm = document.documentElement;
	const isDarkMode = localStorage?.getItem("idDarkMode");

	if (isDarkMode && JSON.parse(isDarkMode) === true) {
		htmlElm.classList.remove("dark");
		localStorage.setItem("idDarkMode", "false");
	} else {
		htmlElm.classList.add("dark");
		localStorage.setItem("idDarkMode", "true");
	}
};
