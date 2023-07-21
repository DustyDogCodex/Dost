function Advert() {
    //array of advert images and descriptions
    const adverts = [
        {
            image:'uncomfortable_watering_can.jpg',
            description:'Tired of running out of water while watering your plants? With our newest invention that won\'t be a problem anymore!' 
        },
        {
            image:'uncomfortable_boots.jpg',
            description:'Ever been torn between avoiding the rain while also wanting to soak yourself in it? With our newest line of boots you can do both!' 
        },
        {
            image:'engagement_mugs.jpg',
            description:'Why drink from one mug when you can drink from two?! Double the coffee means double the existensial crises!' 
        },
        {
            image:'chain_fork.jpg',
            description:'Tired of how monotonous eating food can be? Our newest invention will revolutionise this millenium old boring way of eating by turning it into a true challenge!' 
        }
    ]

    //selecting a random advertisement from the adverts array to display
    const selectedAdvert = adverts[Math.floor(Math.random() * 4)]

    return (
        <div
            className="m-3 p-3 bg-white rounded-lg w-80 dark:bg-slate-800 dark:text-white"
        >
            <h5
                className="text-center text-sm text-gray-500"
            >
                Advertisement
            </h5>
            <a href="https://www.theuncomfortable.com/" target="_blank">
                <img 
                    src={`./${selectedAdvert.image}`} 
                    alt={selectedAdvert.image} 
                    className="rounded-lg my-2"
                />
            </a>
            <p
                className="text-sm text-center"
            >
                {selectedAdvert.description}
            </p>
        </div>
    )
}

export default Advert