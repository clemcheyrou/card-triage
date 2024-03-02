import axios from 'axios';

const apiUrl = 'http://localhost:3000';

const fetchCards = () => {
	return axios.get(`${apiUrl}/cards`)
		.then(response => {
		const data = response.data;
		return data;
		})
		.catch(error => {
		console.error('error recovering card data :', error);
		throw error;
		});
	};

const patchCard = (id: number, updatedStatus: string) => {
	return axios.patch(`${apiUrl}/cards/${id}`, { status: updatedStatus })
	.then(response => {
		const updatedCard = response.data;
		return updatedCard;
	})
	.catch(error => {
		console.error(`patient identification error :`, error);
		throw error;
	});
};

export { fetchCards, patchCard };