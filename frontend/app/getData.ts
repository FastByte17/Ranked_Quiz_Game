export const getData = async (url, limit = 100) => {
    try {
        const response = await fetch(`${url}?${limit}`);
        if (!response.ok) {
            throw new Error(`Status: ${response.status} ${response.statusText}`);
        }
        const result = await response.json();
        return shuffle(result.data.organizationList.organizationsLists);
    } catch (error) {
        throw error;
    }
};
export function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    return array.filter((item) => item.imageExists);
}