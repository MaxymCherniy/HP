import express from 'express';
import mongoose from 'mongoose';
import Get from './Get.js';
import axios from 'axios';

const PORT = 5000;
const DB_URL = 'mongodb+srv://user:user@hpp.yk16eyo.mongodb.net/?retryWrites=true&w=majority&appName=hpp';

const app = express();
app.use(express.json());



app.get('/fetch-characters', async (req, res) => {
	try {
		const response = await axios.get('https://hp-api.onrender.com/api/characters/students');
		const characters = response.data;

		if(Array.isArray(characters)){
			const characterSaves = characters.map(character => ({
				name: character.name,
				alternate_names: character.alternate_names[0],
				house: character.house,
				dateOfBirth: character.dateOfBirth
			}));
			
			await Promise.all(characterSaves.map(async character => {
				try {
					const newCharacter = new Get(character);
					await newCharacter.save();
					console.log('Character saved', newCharacter);

				} catch (error) {
					
				}
			}))
		}

		// if (Array.isArray(characters)) {
		// 	const characterToSave = characters.map(character => ({ name: character.name, house: character.house }));

		// 	await Promise.all(characterToSave.map(async character => {
		// 		try {
		// 			const newCharacter = new Get(character);
		// 			await newCharacter.save();
		// 		} catch (error) {
		// 			console.error('Error saving character:', error);
        //             throw new Error('Error saving character');
		// 		}
		// 	}))

		// 	res.status(201).json({ message: 'Characters successfully saved' });
		// } else {
		// 	res.status(400).json({ message: 'Invalid data format' });
		// }
	} catch (error) {
		console.error('Error fetching and saving characters:', error);
		res.status(500).json({ error: 'Error fetching and saving characters' });
	}
});

async function startApp() {
	try {
		mongoose.connect(DB_URL);
		console.log('Connected to MongoDB successfully!');
		app.listen(PORT, () => console.log('SERVER STARTED ON PORT ' + PORT));
	} catch (error) {
		console.log(error);
	}
}

startApp();



// app.get('/students', async (req, res) => {
// 	try {
// 		const response = await fetch('https://hp-api.onrender.com/api/characters/students');
// 		if (!response.ok) {
// 			throw new Error(`Error fetching data: ${response.statusText}`);
// 		}
// 		const data = await response.json();
// 		res.status(200).json(data);
// 	} catch (e) {
// 		res.status(500).json(e);
// 	}
// });