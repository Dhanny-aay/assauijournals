import About from "../comps/about";
import Contact from "../comps/contact";
import Editors from "../comps/editors";
import Footer from "../comps/footer";
import Hero from "../comps/hero";
import Journal from "../comps/journal";
import Posts from "../comps/posts";

const Home = () => {
    return ( 
        <>
        <Hero/>
        <Posts/>
        <Journal/>
        <Editors/>
        <About/>
        <Contact/>
        <Footer/>
        </>
     );
}
 
export default Home;