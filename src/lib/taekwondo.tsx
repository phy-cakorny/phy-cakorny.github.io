// Scale options: "sm" (384px), "md" (448px), "lg" (512px), "xl" (576px), "2xl" (672px - default), "3xl" (768px), "full" (100%)
const taekwondoBlogContent = [
    {
        type: "text",
        content: "In 2016 (almost 10 years ago!), I went to my first taekwondo class. As an energetic \
        kid, my parents were eager to enroll me in a sport that would keep me active and focused. \
        I quickly grew to love the discipline and training, specifically in poomsae."
        // It has become one of the most meaningful parts of my life. Through discipline, dedication, and countless hours of practice, I've progressed to achieve my Black Belt and 3rd Dan rank."
    },
    {
        type: "photo",
        src: "/taekwondo/tkd0.jpeg",
        caption: "Poomsae practice in Los Angeles",
        scale: "sm"
    },
    {
        type: "text",
        content: "I also loved to compete! With the support \
        of my family and friends, I had the incredible opportunity to learn from \
        renowned coaches and train alongside talented athletes."
    },
    {
        type: "carousel",
        photos: [
            { src: "/taekwondo/beg0.JPG", caption: "American Open 2016", scale: "sm"},
            { src: "/taekwondo/comp2.JPG", caption: "USA Nationals 2017", scale: "sm"},
            { src: "/taekwondo/comp.JPG", caption: "Santa Cruz Open 2019", scale: "sm"}
        ]
    },
    
    {
        type: "text",
        content: "After an injury in 2018, I took a break from competing and \
        focused on teaching and coaching younger athletes."
    },
    {
        type: "carousel",
        photos: [
            { src: "/taekwondo/coaching.JPG", caption: "Santa Cruz Open 2019", scale: "sm" },
            { src: "/taekwondo/tkd10.JPG", caption: "Bay Area Open 2019", scale: "md" },
            { src: "/taekwondo/tkd11.JPG", caption: "Silicon Valley Open 2021", scale: "sm" }
        ]
    },
    {
        type: "text",
        content: "At Cornell, I've continued to train and compete with the club team. \
        I'm looking forward to seeing where this sport takes me!"
    },
    {
        type: "carousel",
        photos: [
            { src: "/taekwondo/tkd3.jpeg", caption: "Cornell Tournament 2024", scale: "md" },
            { src: "/taekwondo/tkd9.jpeg", caption: "Brown Tournament 2023", scale: "md" },
            { src: "/taekwondo/tkd7.jpeg", caption: "University of Vermont Tournament 2024", scale: "sm" },
            { src: "/taekwondo/tkd4.jpeg", caption: "Brown Tournament 2023", scale: "md" },
            { src: "/taekwondo/tkd8.jpeg", caption: "Princeton Tournament 2023", scale: "md" }
        ]
    },
];

export default taekwondoBlogContent;

export const taekwondoPhotos = [
    "/taekwondo/tkd0.jpeg",
    "/taekwondo/beg0.JPG",
    "/taekwondo/comp2.JPG",
    "/taekwondo/comp.JPG",
    "/taekwondo/coaching.JPG",
    "/taekwondo/tkd10.JPG",
    "/taekwondo/tkd11.JPG",
    "/taekwondo/tkd3.jpeg",
    "/taekwondo/tkd9.jpeg",
    "/taekwondo/tkd7.jpeg",
    "/taekwondo/tkd4.jpeg",
    "/taekwondo/tkd8.jpeg",
];