import { useParams, useNavigate } from "react-router-dom";
import {galleryImages} from "../components/Gallery";


export default function ServiceDetails() {
  const {id} = useParams();
  
  const navigate = useNavigate();
 // const service = servicesData[serviceId];
const item =galleryImages.find((element) => element.id ===Number(id));

  return (
  
    <div className="bg-gray-100">
      <button
        onClick={() => navigate("/")}
        className=" px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
      >
        ← Back to Services
      </button>

      <div className="flex flex-col items-center text-center">
  
        <h1 className="text-3xl font-bold mb-6 text-black">{item.title}</h1>
        <img
              src={item.img}
              alt={item.title}
              className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
            />
       
      </div>
    </div>
  );
}
