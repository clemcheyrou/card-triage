import { PiSquaresFourLight } from "react-icons/pi";
import { IoIosInformationCircle } from "react-icons/io";
import { Link } from "react-router-dom";

function NavVertical() {
  return (
	<div className="h-full p-6 border-r border-navy">
		{/*Logo*/}
		<Link to={'/'}><img src='/src/assets/logo_cardiologs.jpeg' alt='logo cardialogs' className="w-14 h-12"/></Link>
		{/*Navbar*/}
		<nav className="py-10 h-[80vh]">
			<ul className="flex flex-col justify-between h-full">
				<Link to={'/'}><li><PiSquaresFourLight className="h-12 w-12 text-navy"/></li></Link>
				<Link to={'/help'}><li><IoIosInformationCircle className="h-12 w-12 text-navy"/></li></Link>
			</ul>
		</nav>
	</div>
  )
}

export default NavVertical