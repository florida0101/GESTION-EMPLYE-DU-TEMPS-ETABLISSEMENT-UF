async function getWeekdaysData(url){
    try{
        const response = await fetch(url);
        const result = await response.json();
        return result;
    }catch(Error){
        console.log('Erreur lors de la récupération des Données:', Error);
        return null;
    }
}
 
export default getWeekdaysData;