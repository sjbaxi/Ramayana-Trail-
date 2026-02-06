
import React from 'react';
import { TRAIL_STOPS } from '../constants';

interface SidebarProps {
  onSelectStop: (stopName: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onSelectStop }) => {
  return (
    <div className="h-full bg-white border-r border-amber-100 flex flex-col w-full md:w-72 lg:w-80">
      <div className="p-6 border-b border-amber-50 saffron-gradient text-white">
        <h2 className="text-2xl font-bold leading-tight">The Ramayana Trail</h2>
        <p className="text-xs opacity-90 mt-1 uppercase tracking-wider font-semibold">Tracing the Footsteps of the Divine</p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
        <div className="text-[10px] font-bold text-amber-800 uppercase tracking-widest mb-2 px-2">Key Stations</div>
        {TRAIL_STOPS.map((stop) => (
          <button
            key={stop.id}
            onClick={() => onSelectStop(`Tell me more about ${stop.name} in the Ramayana Trail.`)}
            className="w-full text-left p-3 rounded-xl hover:bg-amber-50 transition-all duration-200 border border-transparent hover:border-amber-100 group shadow-sm hover:shadow-md"
          >
            <h3 className="text-sm font-semibold text-amber-900 group-hover:text-orange-700">{stop.name}</h3>
            <p className="text-xs text-amber-700 opacity-80 mt-1 line-clamp-1">{stop.region}</p>
            <div className="flex flex-wrap gap-1 mt-2">
              {stop.highlights.slice(0, 2).map((h, i) => (
                <span key={i} className="text-[9px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded uppercase font-medium">
                  {h}
                </span>
              ))}
            </div>
          </button>
        ))}

        <div className="mt-8 pt-4 border-t border-amber-50">
          <div className="text-[10px] font-bold text-amber-800 uppercase tracking-widest mb-3 px-2">Traveler Essentials</div>
          <div className="space-y-2">
            <button 
              onClick={() => onSelectStop("What is the best time to visit the Ramayana Trail?")}
              className="w-full text-left px-3 py-2 text-xs text-amber-900 hover:text-orange-700 hover:bg-amber-50 rounded-lg transition-colors"
            >
              📅 Best Time to Visit
            </button>
            <button 
              onClick={() => onSelectStop("Tell me about the key festivals on the Ramayana Trail.")}
              className="w-full text-left px-3 py-2 text-xs text-amber-900 hover:text-orange-700 hover:bg-amber-50 rounded-lg transition-colors"
            >
              🪔 Major Festivals
            </button>
            <button 
              onClick={() => onSelectStop("What are the modern pilgrimage options for the trail?")}
              className="w-full text-left px-3 py-2 text-xs text-amber-900 hover:text-orange-700 hover:bg-amber-50 rounded-lg transition-colors"
            >
              🚂 Luxury Pilgrimage Trains
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 bg-amber-50 text-[10px] text-amber-700 text-center border-t border-amber-100">
        Source: IMRI; Ram Van Gaman Path; Wikipedia
      </div>
    </div>
  );
};

export default Sidebar;
