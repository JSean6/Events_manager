import { Link } from "react-router-dom";
import { MdTravelExplore } from "react-icons/md";
// import logo from '/src/assets/logo.png';

const Navbar = () => {
    const navbarHeight = '96px'; // Adjust this value to match your navbar's height

    const styles = {
        img: {
            height: navbarHeight,
            width: '124px', // Set the image height to match the navbar height
            marginRight: '20px', // Add margin if needed to separate from other elements
            objectFit: 'cover', // Ensure the image covers the container
        },

    };

    return (
        <>
            <nav className='bg-blue-950 py-2' > 
                <div className='container mx-auto flex justify-between items-center mt-1 mb-1 '>
                    {/* <Link to="/" className='text-blue-500 font-bold text-2xl'>
                        <img src={logo} alt="SavannahSunsetTours" style={styles.img} />
                    </Link> */}
                    <ul className="flex justify-center space-x-6">
                        <li>
                            <Link to="" className='hover:bg-indigo-500 hover:border-indigo-500 hover:text-white transition duration-300 ease-in-out font-bold px-4 py-2 rounded text-white'>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/about" className='hover:bg-indigo-500 hover:border-indigo-500 hover:text-white transition duration-300 ease-in-out font-bold px-4 py-2 rounded text-white'>
                                About
                            </Link> 
                        </li>
                        <li>
                            <Link to="events" className='hover:bg-indigo-500 hover:border-indigo-500 hover:text-white transition duration-300 ease-in-out font-bold px-4 py-2 rounded text-white'>
                                Create Events
                            </Link> 
                        </li>
                        <li>
                            <Link to="eventlist" className='hover:bg-indigo-500 hover:border-indigo-500 hover:text-white transition duration-300 ease-in-out font-bold px-4 py-2 rounded text-white'>
                                Events
                            </Link> 
                        </li>
                    </ul>             
                </div>
            </nav>
        </>
    );
}

export default Navbar;
