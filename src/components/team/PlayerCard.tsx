import { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserRound, Flag } from 'lucide-react';

interface Player {
  player_key: string;
  player_name: string;
  player_type: string;
  player_birthdate: string;
  nationality: string;
}

interface PlayerCardProps {
  player: Player;
}

const PlayerCard = ({ player }: PlayerCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Calculate age from date of birth
  const calculateAge = (dateOfBirth: string): number => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  // Get position color
  const getPositionColor = (position: string): string => {
    switch (position) {
      case 'Goalkeeper':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200';
      case 'Defender':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200';
      case 'Midfielder':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200';
      case 'Attacker':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  return (
    <Link 
      to={`/player/${player.player_key}`}
      className={`block bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all duration-300 ${
        isHovered ? 'transform -translate-y-1 shadow-lg' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-4">
        <div className="flex items-center space-x-4">
          {/* Player Avatar Placeholder */}
          <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center flex-shrink-0">
            <UserRound size={32} className="text-gray-400 dark:text-gray-500" />
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white truncate">
              {player.player_name}
            </h3>
            
            <div className="mt-1 flex items-center">
              <Flag size={14} className="text-gray-500 dark:text-gray-400 mr-1" />
              <span className="text-sm text-gray-500 dark:text-gray-400">
                • {calculateAge(player.player_birthdate)} years
              </span>
            </div>
            
            <div className="mt-2">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPositionColor(player.player_type)}`}>
                {player.player_type}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div 
        className={`bg-blue-50 dark:bg-blue-900/20 border-t border-blue-100 dark:border-blue-800 py-2 px-4 text-center text-blue-600 dark:text-blue-400 font-medium text-sm transform transition-all duration-300 ${
          isHovered ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        View player profile
      </div>
    </Link>
  );
};

export default PlayerCard;