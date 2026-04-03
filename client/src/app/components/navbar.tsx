import { MapPin } from "lucide-react";
export default function NavBar() {
  return (
    <div className="flex">
      <div className="flex ml-22 py-4">
        <div>
          <img src="/food-icon.svg" alt="Food Icon" width="46" height="37" />
        </div>
        <div className="w-22 h-11">
          <p>
            Nom<span className="text-[#EF4444]">Nom</span>
          </p>
          <p className="text-xs">Swift delivery</p>
        </div>
      </div>
      <div>
        <div className="bg-white w-62.75 h-9 rounded-4xl">
          <MapPin color="#EF4444" />
        </div>
      </div>
    </div>
  );
}
