import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, } from 'lucide-react';
import { formatShortDate, formatTime } from '../../utils/helpers';

interface Team {
  id: string;
  name: string;
  shortName: string;
  crest: string;
}

interface Match {
  id: string;
  utcDate: string;
  homeTeam: Team;
  awayTeam: Team;
  venue: string;
  competition: {
    name: string;
    emblem: string;
  };
}

interface MatchCardProps {
  match: Match;
}

const MatchCard = ({ match }: MatchCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Competition Banner */}
      <div className="bg-gray-100 dark:bg-gray-700 py-2 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img 
            src={match.competition.emblem} 
            alt={match.competition.name} 
            className="w-5 h-5" 
          />
          <span className="text-sm font-medium truncate">{match.competition.name}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
          <Calendar className="w-4 h-4 mr-1" />
          <span>{formatShortDate(match.utcDate)}</span>
        </div>
      </div>
      
      {/* Teams Section */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          {/* Home Team */}
          <Link to={`/team/${match.homeTeam.id}`} className="flex flex-col items-center w-2/5 group">
            <div className="w-16 h-16 p-2 rounded-full bg-gray-50 dark:bg-gray-700 flex items-center justify-center mb-2 transition-transform duration-300 group-hover:scale-110">
              <img 
                src={match.homeTeam.crest} 
                alt={match.homeTeam.name} 
                className="max-w-full max-h-full" 
              />
            </div>
            <span className="text-center font-medium truncate w-full">{match.homeTeam.shortName}</span>
          </Link>
          
          {/* VS & Time */}
          <div className="flex flex-col items-center justify-center">
            <span className="text-lg font-bold text-gray-700 dark:text-gray-300">VS</span>
            <span className="text-sm text-gray-500 dark:text-gray-400 mt-1 flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {formatTime(match.utcDate)}
            </span>
          </div>
          
          {/* Away Team */}
          <Link to={`/team/${match.awayTeam.id}`} className="flex flex-col items-center w-2/5 group">
            <div className="w-16 h-16 p-2 rounded-full bg-gray-50 dark:bg-gray-700 flex items-center justify-center mb-2 transition-transform duration-300 group-hover:scale-110">
              <img 
                src={match.awayTeam.crest} 
                alt={match.awayTeam.name} 
                className="max-w-full max-h-full" 
              />
            </div>
            <span className="text-center font-medium truncate w-full">{match.awayTeam.shortName}</span>
          </Link>
        </div>
        
        {/* Venue */}
        <div className={`flex items-center justify-center text-sm text-gray-600 dark:text-gray-400 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-70'}`}>
          <MapPin className="w-4 h-4 mr-1" />
          <span>{match.venue}</span>
        </div>
      </div>
      
      {/* View Details CTA */}
      {/* <Link
        to={`/match/${match.id}`}
        className={`block bg-blue-50 dark:bg-blue-900/20 border-t border-blue-100 dark:border-blue-800 py-2 px-4 text-center text-blue-600 dark:text-blue-400 font-medium text-sm transition-all duration-300 ${
          isHovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        View match details <ArrowRight className="inline w-4 h-4 ml-1" />
      </Link> */}
    </div>
  );
};

export default MatchCard;
