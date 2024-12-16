import MainNavbar from "../../components/MainNavbar";
import Content from "../../components/ProductContainer";
import SwiperComponent from "../../components/SwiperComponent";

const Home = () => {
    return(
        <>
        <MainNavbar/>
        <SwiperComponent/>
        <div className="w-[80%] mx-auto"> 
            <div className="relative overflow-hidden">
            <Content />
            </div>
        </div>
        </>
    )
}

export default Home;