import logoBasf from "../assets/BASF-Logo_bw.svg.png"
import logoMarvel from "../assets/marvel-logo-4.png"

function Header() {
    return(
        <header>
            <a href="https://www.basf.com/br/pt.html" target="_blank" rel="noreferrer"><img className="logo" src={logoBasf} alt="BASF Logo"/></a>          
            <div className="logo-text">
                <p>BASF Internship Project by Bruno Cappio</p>
            </div>
            <a href="https://developer.marvel.com/" target="_blank" rel="noreferrer"><img className="logo" src={logoMarvel} alt="Marvel Logo"/></a>
        </header>
    )
}

export default Header