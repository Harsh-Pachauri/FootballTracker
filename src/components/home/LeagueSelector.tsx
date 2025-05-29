import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface League {
  league_key: string;
  league_name: string;
  code: string;
  league_logo: string;
}

interface LeagueSelectorProps {
  leagues: League[];
  selectedLeague: League | null;
  onSelectLeague: (league: League) => void;
}

const LeagueSelector = ({ leagues, selectedLeague, onSelectLeague }: LeagueSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (league: League) => {
    onSelectLeague(league);
    setIsOpen(false);
    setSearchTerm(''); // reset search after selection
  };

  // Filter leagues based on search term (case insensitive)
  const filteredLeagues = leagues.filter(league =>
    league.league_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex justify-between w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          id="league-selector"
          aria-haspopup="true"
          aria-expanded={isOpen}
          onClick={toggleDropdown}
        >
          {selectedLeague ? (
            <div className="flex items-center">
              <img 
                src={selectedLeague.league_logo} 
                alt={selectedLeague.league_name} 
                className="w-6 h-6 mr-2" 
              />
              <span>{selectedLeague.league_name}</span>
            </div>
          ) : (
            <span>Select League</span>
          )}
          <ChevronDown className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      {isOpen && (
        <div 
          className="origin-top-right absolute z-10 right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="league-selector"
        >
          <div className="p-2">
            <input
              type="text"
              placeholder="Search leagues..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-1 text-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="max-h-60 overflow-auto py-1" role="none">
            {filteredLeagues.length > 0 ? (
              filteredLeagues.map((league) => (
                <button
                  key={league.league_key}
                  className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  role="menuitem"
                  onClick={() => handleSelect(league)}
                >
                  <img 
                    src={league.league_logo} 
                    alt={league.league_name} 
                    className="w-6 h-6 mr-2" 
                  />
                  {league.league_name}
                </button>
              ))
            ) : (
              <div className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">No leagues found.</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LeagueSelector;
