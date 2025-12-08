
interface Races {
    image: string[];
    title: string;
    year: string;
    stravaLink?: string;
}

const races: Races[] = [
    {
        image: ["/running/sf25.png"],
        title: "San Francisco Half Marathon",
        year: "July 2025",
        stravaLink: "https://strava.app.link/NqMLj0qbWYb"
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
    // Extract year from strings like "July 2025" or "2019-2023"
    const getYear = (yearStr: string) => {
        const match = yearStr.match(/\d{4}/);
        return match ? parseInt(match[0]) : 0;
    };
    return getYear(b.year) - getYear(a.year);
});

export default races;
