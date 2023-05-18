const fetchCharityButton = document.getElementById("fetch-Charity-button");

fetchCharityButton.addEventListener("click", fetchCharityData);
async function fetchCharityData() {
    const apiKey = "df10c999-9506-4008-84a4-8b2c5985cb56";
    const url = `https://api.globalgiving.org/api/public/orgservice/organization/456?api_key=${apiKey}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
    } catch (error) {
        console.error("Oops! We ran into an issue.", error);
    }
}
