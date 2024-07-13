
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import banner01 from "../../assets/banner01.jpg"
import banner02 from "../../assets/banner02.jpg"
import banner03 from "../../assets/banner03.jpg"
import banner04 from "../../assets/banner04.jpg"
import banner05 from "../../assets/banner05.jpg"
import banner06 from "../../assets/banner06.jpg"
const Banner = () => {
    return (
        <Carousel>
        <div>
            <img src={banner01} />
         
        </div>
        <div>
            <img src={banner02}/>
           
        </div>
        <div>
            <img src={banner03} />
         
        </div>
        <div>
            <img src={banner04}/>
           
        </div>
        <div>
            <img src={banner05} />
         
        </div>
        <div>
            <img src={banner06} />
         
        </div>
    </Carousel>
    );
};

export default Banner;