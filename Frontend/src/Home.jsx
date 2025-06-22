import { Link } from "react-router-dom";
 
const Home = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-2xl font-bold mb-6">Welcome to MediTrack</h1>
 
            <div className="space-x-4">
                <Link to="/deliveries">
                    <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700">
                        Admin Dashboard
                    </button>
                </Link>
 
                <Link to="/admin/orders">
                    <button className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700">
                        Customer Side
                    </button>
                </Link>

                <Link to="/admin/orders">
                    <button className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700">
                        Driver Dashboard
                    </button>
                </Link>
            </div>
        </div>
    );
};
 
export default Home;