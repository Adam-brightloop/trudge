//app/drafts/page.jsx
// This is a Next.js page component that fetches and displays draft data for a fantasy football league.
// It uses the Sleeper API to get league and draft information, and displays it in a tabbed interface.
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import players from '@/data/players.json';

async function getUsers() {
  const res = await fetch('http://localhost:3000/api/users', {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error('Failed to fetch users');
  return res.json();
}

async function getRosters(leagueId) {
  const res = await fetch(`https://api.sleeper.app/v1/league/${leagueId}/rosters`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error('Failed to fetch rosters');
  return res.json();
}

async function getLeaguesBySeason(season) {
  const userId = process.env.NEXT_PUBLIC_SLEEPER_USER_ID;
  const res = await fetch(`https://api.sleeper.app/v1/user/${userId}/leagues/nfl/${season}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error(`Failed to fetch leagues for ${season}`);
  return res.json();
}

async function getDraftPicks(leagueId) {
  const res = await fetch(`https://api.sleeper.app/v1/league/${leagueId}/drafts`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error('Failed to fetch drafts');
  const drafts = await res.json();
  if (drafts.length === 0) return [];
  const draftId = drafts[0].draft_id; // Assume first draft
  const picksRes = await fetch(`https://api.sleeper.app/v1/draft/${draftId}/picks`, {
    next: { revalidate: 3600 },
  });
  if (!picksRes.ok) throw new Error('Failed to fetch draft picks');
  return picksRes.json();
}

export default async function Drafts() {
  const seasons = ['2025', '2024', '2023', '2022'];
  
  let users, leaguesBySeason;

  try {
    users = await getUsers();
    leaguesBySeason = await Promise.all(
      seasons.map(async (season) => {
        try {
          const leagues = await getLeaguesBySeason(season);
          // Filter for Apex Dynasty by name to get season-specific league_id
          const filteredLeagues = leagues.filter((league) => league.name === 'APEX Dynasty ');
          const leagueData = await Promise.all(
            filteredLeagues.map(async (league) => {
              const [rosters, draftPicks] = await Promise.all([
                getRosters(league.league_id),
                getDraftPicks(league.league_id),
              ]);
              return { league, rosters, draftPicks };
            })
          );
          return { season, leagueData };
        } catch (error) {
          console.error(`Error for season ${season}:`, error.message);
          return { season, leagueData: [] };
        }
      })
    );
  } catch (error) {
    console.error('Error fetching draft data:', error.message);
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-red-500">Error: Failed to load draft data</p>
      </div>
    );
  }

  // Create team name map for each league
  const teamNameMaps = leaguesBySeason.reduce((acc, { season, leagueData }) => {
    acc[season] = leagueData.reduce((leagueAcc, { league, rosters }) => {
      leagueAcc[league.league_id] = rosters.reduce((rosterAcc, roster) => {
        const user = users.find((u) => u.user_id === roster.owner_id);
        rosterAcc[roster.roster_id] = user?.metadata?.team_name || user?.display_name || `Team ${roster.roster_id}`;
        return rosterAcc;
      }, {});
      return leagueAcc;
    }, {});
    return acc;
  }, {});

  // Get available seasons with draft data
  const availableSeasons = leaguesBySeason
    .filter(({ leagueData }) => leagueData.some(({ draftPicks }) => draftPicks.length > 0))
    .map(({ season }) => season)
    .sort((a, b) => b - a);

  // Log data for debugging
  console.log('Leagues by Season:', JSON.stringify(leaguesBySeason, null, 2));

  return (
    <div className="min-h-screen bg-background">
      <header className="text-neutral py-4">
        <div className="container mx-auto flex items-center gap-4">
          <h1 className="text-3xl font-bold">Draft History</h1>
        </div>
      </header>
      <main className="container mx-auto py-8">
        <Tabs defaultValue={availableSeasons[0] || '2025'} className="w-full mb-8">
          <TabsList className="grid w-full grid-cols-4 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-6">
            {availableSeasons.map((season) => (
              <TabsTrigger key={season} value={season}>
                {season}
              </TabsTrigger>
            ))}
          </TabsList>
          {availableSeasons.map((season) => (
            <TabsContent key={season} value={season}>
              <div className="space-y-8">
                {leaguesBySeason
                  .find((s) => s.season === season)
                  ?.leagueData.map(({ league, draftPicks }) => (
                    <Card key={league.league_id}>
                      <CardHeader>
                        <CardTitle>Draft Picks - {league.name} ({season})</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {draftPicks.length === 0 ? (
                          <p>No draft picks found</p>
                        ) : (
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Round</TableHead>
                                <TableHead>Pick</TableHead>
                                <TableHead>Player</TableHead>
                                <TableHead>Team</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {draftPicks.map((pick) => {
                                console.log(`Pick Player ID: ${pick.player_id}, Data:`, players[pick.player_id]);
                                return (
                                  <TableRow key={`${pick.draft_id}-${pick.round}-${pick.pick_no}`}>
                                    <TableCell>{pick.round}</TableCell>
                                    <TableCell>{pick.pick_no}</TableCell>
                                    <TableCell>
                                      {players[pick.player_id]?.full_name || `Unknown Player (${pick.player_id})`}
                                    </TableCell>
                                    <TableCell className="max-w-xs truncate">
                                      {teamNameMaps[season]?.[league.league_id]?.[pick.roster_id] || 'Unknown Team'}
                                    </TableCell>
                                  </TableRow>
                                );
                              })}
                            </TableBody>
                          </Table>
                        )}
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </main>
    </div>
  );
}