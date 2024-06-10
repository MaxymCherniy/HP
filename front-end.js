const fetchButton = document.querySelector('.fetchButton');

fetchButton.addEventListener('click', async () => {
	try {
		const response = await fetch('https://hp-api.onrender.com/api/characters/students');
		const data = await response.json();
		console.log(data);
	} catch (e) {
		console.log(e);
	}
});