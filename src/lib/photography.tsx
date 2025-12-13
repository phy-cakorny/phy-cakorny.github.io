interface PhotographyPhoto {
    src: string;
    caption?: string;
}

const photographyPhotos: (string | PhotographyPhoto)[] = [
    {src: "/photography/boston.jpeg", caption: "Charles River (Boston, MA)"},
    {src: "/photography/weill.jpeg", caption: "Weill Hall (Ithaca, NY)"},
    {src: "/photography/italy1.jpeg", caption: " Manarola Village (Cinque Terre, Italy)"},
    {src: "/photography/korea1.jpeg", caption: ""},
    {src: "/photography/lake.jpeg", caption: "Lake Waban (Wellesley, MA)"},
    {src: "/photography/italy2.png", caption: "Rio della Misericordia (Venice, Italy)"},
    {src: "/photography/korea2.jpeg", caption: "Hallyeohaesang National Park (Tongyeong, S. Korea)"},
    {src: "/photography/nyc_ariel.jpeg", caption: ""},
    {src: "/photography/italy3.jpeg", caption: ""},
    {src: "/photography/nyc.jpeg", caption: ""},
    {src: "/photography/italy4.jpeg", caption: ""},
    {src: "/photography/korea3.jpeg", caption: ""},
    {src: "/photography/sf.jpeg", caption: "Japanese Tea Garden (San Francisco, CA)"},
];

export default photographyPhotos;