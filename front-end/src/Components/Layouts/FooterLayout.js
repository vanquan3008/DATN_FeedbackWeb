import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDribbble, faGithub, faInstagram, faPinterest, faTwitter } from "@fortawesome/free-brands-svg-icons";

function Footer() {
    return ( 
        <div className="flex flex-col w-screen h-18 justify-center items-center pb-6" >
            <div className="mb-4">
                <ul className="flex flex-row text-color-basic">
                    <li className="pl-4 pr-4 text-sm">
                        <a href="/"> Company </a>
                    </li>
                    <li className="pl-4 pr-4 text-sm">
                        <a href="/"> About us </a>
                    </li>
                    <li className="pl-4 pr-4 text-sm">
                        <a href="/"> Team </a>           
                    </li>
                    <li className="pl-4 pr-4 text-sm">
                         <a href="/">Products </a>
                    </li>
                    <li className="pl-4 pr-4 text-sm">
                         <a href="/">Blog </a>
                    </li>
                    <li className="pl-4 pr-4 text-sm">
                         <a href="/">Pricing </a>
                    </li>
                </ul>
            </div>
            <div className="pt-2">
            <ul className="flex flex-row text-color-basic ">
                    <li className="pl-6 pr-6">
                        <a href="/">
                             <FontAwesomeIcon className="w-5 h-5 p-0.5"  icon={faDribbble} />
                        </a>
                    </li>
                    <li className="pl-6 pr-6">
                        <a href="/">
                            <FontAwesomeIcon className="w-5 h-5 p-0.5"  icon={faTwitter}/>
                        </a>
                    </li>
                    <li className="pl-6 pr-6">
                        <a href="/">
                            <FontAwesomeIcon className="w-5 h-5 p-0.5"  icon={faInstagram}/>
                        </a>           
                    </li> 
                    <li className="pl-6 pr-6 ">
                         <a href="/">
                            <FontAwesomeIcon className="w-5 h-5 p-0.5"  icon={faPinterest}/>
                        </a>
                    </li>
                    <li className="pl-6 pr-6">
                         <a href="/">
                            <FontAwesomeIcon className="w-5 h-5 p-0.5"  icon={faGithub}/>
                        </a>
                    </li>
                    
                </ul>
            </div>
            <div className="text-color-basic pt-4 text-sm ">
                <span>Copyright © 2024 Soft by NLPTeam</span>
            </div>
        </div>
    );
}

export default Footer;