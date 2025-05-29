interface Match {
  id: string;
  utcDate: string;
  homeTeam: { id: string; name: string; shortName: string; crest: string };
  awayTeam: { id: string; name: string; shortName: string; crest: string };
  venue: string;
  competition: { name: string; emblem: string };
}

export function transformMatch(apiMatch: any): Match {
  const dateTime = `${apiMatch.event_date}T${apiMatch.event_time}:00Z`;

  return {
    id: String(apiMatch.event_key),
    utcDate: new Date(dateTime).toISOString(),

    homeTeam: {
      id: String(apiMatch.home_team_key),
      name: apiMatch.event_home_team,
      shortName: apiMatch.event_home_team,
      crest: apiMatch.home_team_logo,
    },

    awayTeam: {
      id: String(apiMatch.away_team_key),
      name: apiMatch.event_away_team,
      shortName: apiMatch.event_away_team,
      crest: apiMatch.away_team_logo,
    },

    venue: apiMatch.event_stadium || 'N/A',

    competition: {
      name: apiMatch.league_name,
      emblem: apiMatch.league_logo,
    },
  };
}
