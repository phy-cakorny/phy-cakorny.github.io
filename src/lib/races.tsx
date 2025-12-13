
interface Races {
    image: string[];
    title: string;
    year: string;
    stravaLink?: string;
    quote?: string;
}

const races: Races[] = [
    {
        image: ["/running/sf25.png"],
        title: "San Francisco Half Marathon",
        year: "July 2025",
        stravaLink: "https://strava.app.link/NqMLj0qbWYb",
        quote: "This was my first "
    },
    {
        image: ["/running/turkey.jpeg"],
        title: "Westchester Turkey Trot 5K",
        year: "November 2025",
        stravaLink: "https://strava.app.link/qpKggqUaWYb"
    },
    {
        image: ["/running/airport.jpeg"],
        title: "Ithaca Airport 5K",
        year: "September 2025",
        stravaLink: "https://strava.app.link/0VSvzjpbWYb"
    },
    {
        image: ["/running/sf241.png"], //"/running/sf242.jpeg
        title: "San Francisco Marathon",
        year: "July 2024",
        stravaLink: "https://strava.app.link/PYsgRixbWYb"
    },
    {
        image: ["/running/group1.png", "/running/group2.jpg", "/running/group3.JPG", "/running/xc.jpeg"],
        title: "Gunn Cross Country",
        year: "2019-2023",
    },
].sort((a, b) => {
    // Extract year and month from strings like "July 2025" or "2019-2023"
    const getDateValue = (yearStr: string) => {
        // Handle date ranges like "2019-2023" - use the first year
        if (yearStr.indexOf('-') !== -1) {
            const match = yearStr.match(/\d{4}/);
            return match ? parseInt(match[0]) * 12 : 0;
        }
        
        // Handle month + year like "July 2025"
        const monthNames = ["january", "february", "march", "april", "may", "june", 
                           "july", "august", "september", "october", "november", "december"];
        const parts = yearStr.toLowerCase().split(' ');
        const month = parts[0];
        const yearMatch = yearStr.match(/\d{4}/);
        const year = yearMatch ? parseInt(yearMatch[0]) : 0;
        const monthIndex = monthNames.indexOf(month);
        return year * 12 + (monthIndex >= 0 ? monthIndex : 0);
    };
    return getDateValue(a.year) - getDateValue(b.year);
});

export default races;
