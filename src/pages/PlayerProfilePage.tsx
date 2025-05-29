import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPlayer } from '../services/api';
import { Flag, Calendar, Trophy, Briefcase } from 'lucide-react';
import toast from 'react-hot-toast';

const PlayerProfilePage = () => {
  const { playerId } = useParams<{ playerId: string }>();
  const [player, setPlayer] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPlayerData = async () => {
      if (!playerId) return;
      
      setIsLoading(true);
      try {
        const playerData = await getPlayer(playerId);
        setPlayer(playerData);
      } catch (error) {
        console.error('Error fetching player data:', error);
        toast.error('Failed to load player information');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlayerData();
  }, [playerId]);

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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!player) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
        <p className="text-gray-600 dark:text-gray-300">Player not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Player Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg overflow-hidden shadow-lg text-white">
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            {/* Player Image */}
            <div className="w-32 h-32 md:w-48 md:h-48 bg-white rounded-full flex items-center justify-center overflow-hidden shadow-md border-4 border-white">
              {player.currentTeam?.crest ? (
                <img 
                  src={player.currentTeam.crest} 
                  alt={player.currentTeam.name} 
                  className="w-1/2 h-1/2 object-contain opacity-20" 
                />
              ) : (
                <span className="text-4xl">👤</span>
              )}
            </div>
            
            {/* Player Details */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold">{player.name}</h1>
              
              <div className="mt-2 flex flex-wrap justify-center md:justify-start gap-4">
                <div className="flex items-center">
                  <Flag className="w-4 h-4 mr-1 opacity-70" />
                  <span>{player.nationality}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1 opacity-70" />
                  <span>{calculateAge(player.dateOfBirth)} years old</span>
                </div>
              </div>
              
              <div className="mt-4 flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
                <span className="px-3 py-1 bg-blue-900/30 rounded-full text-sm font-medium">
                  {player.position}
                </span>
                
                {player.shirtNumber && (
                  <span className="px-3 py-1 bg-blue-900/30 rounded-full text-sm font-medium">
                    #{player.shirtNumber}
                  </span>
                )}
                
                {player.currentTeam && (
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center p-1">
                      <img 
                        src={player.currentTeam.crest} 
                        alt={player.currentTeam.name} 
                        className="max-w-full max-h-full" 
                      />
                    </div>
                    <Link 
                      to={`/team/${player.currentTeam.id}`}
                      className="text-white hover:underline"
                    >
                      {player.currentTeam.name}
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Career Milestones */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
            <h2 className="text-xl font-semibold flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
              Career Milestones
            </h2>
          </div>
          <div className="p-6">
            {player.careerMilestones?.length > 0 ? (
              <ol className="relative border-l border-gray-200 dark:border-gray-700 ml-3">
                {player.careerMilestones.map((milestone: any, index: number) => (
                  <li key={index} className="mb-6 ml-6">
                    <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-800 dark:bg-blue-900">
                      <span className="text-xs font-medium text-blue-800 dark:text-blue-300">
                        {index + 1}
                      </span>
                    </span>
                    <h3 className="flex items-center mb-1 text-sm font-semibold text-gray-900 dark:text-white">
                      {new Date(milestone.date).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'short',
                      })}
                    </h3>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {milestone.description}
                    </p>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                No milestone information available
              </p>
            )}
          </div>
        </div>
        
        {/* Honours */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
            <h2 className="text-xl font-semibold flex items-center">
              <Trophy className="w-5 h-5 mr-2 text-yellow-600 dark:text-yellow-400" />
              Honours
            </h2>
          </div>
          <div className="p-6">
            {player.honours?.length > 0 ? (
              <ul className="space-y-4">
                {player.honours.map((honour: any, index: number) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <Trophy className="w-5 h-5 text-yellow-500" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {honour.title}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {honour.season} • {honour.team}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                No honours information available
              </p>
            )}
          </div>
        </div>
      </div>
      
      {/* Past Teams */}
      <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
          <h2 className="text-xl font-semibold flex items-center">
            <Briefcase className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
            Career History
          </h2>
        </div>
        <div className="p-6">
          {player.pastTeams?.length > 0 ? (
            <div className="space-y-6">
              {player.pastTeams.map((team: any, index: number) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center p-2">
                    {team.crest ? (
                      <img src={team.crest} alt={team.name} className="max-w-full max-h-full" />
                    ) : (
                      <span className="text-lg">🏆</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {team.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(team.startDate).getFullYear()} - {new Date(team.endDate).getFullYear()}
                      {team.onLoan && " (On Loan)"}
                    </p>
                  </div>
                  <Link
                    to={`/team/${team.id}`}
                    className="px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-sm font-medium rounded-md hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
                  >
                    View Team
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-center py-4">
              No past team information available
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlayerProfilePage;