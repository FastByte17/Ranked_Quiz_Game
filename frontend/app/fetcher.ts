import { Companies } from "./types";

export const fetcher = async (url: string, limit = 100) => {
    try {
        const companies = localStorage.getItem('companies')
        if (companies) {
            return shuffle(JSON.parse(companies))
        }
        const response = await fetch(`${url}?limit=${limit}`);
        if (!response.ok) {
            throw new Error(`Status: ${response.status}, an error occurred while fetching the data: ${response.statusText}`)
        }
        const result = await response.json();
        localStorage.setItem('companies', JSON.stringify(result.data));
        return shuffle(result.data)
    } catch (error) {
        throw error;
    }
};



function shuffle(array: Companies) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    return array.filter((item) => item.imageExists);
}