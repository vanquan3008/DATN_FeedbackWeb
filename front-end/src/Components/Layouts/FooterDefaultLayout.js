import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function FooterDefaultLayout() {
    return (
    <div className="flex flex-row justify-between text-sm text-color-basic p-4">
        <div>
            <span>© 2021, made with <FontAwesomeIcon style={{color:"#ff0000"}} icon={faHeart}></FontAwesomeIcon> by NLP Team for a better web.</span>
        </div>
        <div className="flex flex-row pr-4">
            <a href="/" className="pl-2 pr-2">
                About us
            </a>
            <a href="/" className="pl-2 pr-2">
                Blog
            </a>
            <a href="/" className="pl-2 pr-2">
                License
            </a>
        </div>
    </div>  );
}

export default FooterDefaultLayout;