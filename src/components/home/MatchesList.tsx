import { useState, useEffect } from 'react';
import MatchCard from './MatchCard';

interface Match {
  id: string;
  utcDate: string;
  homeTeam: {
    id: string;
    name: string;
    shortName: string;
    crest: string;
  };
  awayTeam: {
    id: string;
    name: string;
    shortName: string;
    crest: string;
  };
  venue: string;
  competition: {
    name: string;
    emblem: string;
  };
}

interface MatchesListProps {
  matches: Match[];
  isLoading: boolean;
}

const MatchesList = ({ matches, isLoading }: MatchesListProps) => {
  // console.log('haha')
  const [groupedMatches, setGroupedMatches] = useState<{ [key: string]: Match[] }>({});

useEffect(() => {
  const grouped = matches.reduce((acc, match) => {
    const rawDate = new Date(match.utcDate);
    if (isNaN(rawDate.getTime())) return acc; // skip invalid dates

    const date = rawDate.toISOString().split('T')[0]; // YYYY-MM-DD
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(match);
    return acc;
  }, {} as { [key: string]: Match[] });

  setGroupedMatches(grouped);
}, [matches]);


  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (matches.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
        <p className="text-gray-600 dark:text-gray-300">No upcoming matches found. Please select a different league.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {Object.entries(groupedMatches).map(([date, dateMatches]) => (
        <div key={date}>
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700 pb-2">
            {new Date(date).toLocaleDateString(undefined, {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
            })}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dateMatches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MatchesList;
