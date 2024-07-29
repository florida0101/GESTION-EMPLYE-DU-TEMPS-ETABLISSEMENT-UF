async function UpdateData(data, url) {
    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        return result
    } catch (error) {
        console.error('Erreur lors de la mise à jour des données :', error)
        return null;
    }
}

export default UpdateData;