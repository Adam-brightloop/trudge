//app/about/page.jsx
// This file is a Next.js page component that fetches and displays league data, rosters, and user information.
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import players from '@/data/players.json';
import supabase from '@/lib/supabase';

async function getLeagueData() {
  const res = await fetch('http://localhost:3000/api/league', {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error('Failed to fetch league data');
  return res.json();
}

async function getRosters() {
  const res = await fetch('http://localhost:3000/api/rosters', {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error('Failed to fetch rosters');
  return res.json();
}

async function getUsers() {
  const res = await fetch('http://localhost:3000/api/users', {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error('Failed to fetch users');
  return res.json();
}

async function getLeaguesBySeason(season) {
  const res = await fetch(`http://localhost:3000/api/leagues/${season}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error(`Failed to fetch leagues for ${season}`);
  return res.json();
}

async function getUserInfo(userIds) {
  const { data, error } = await supabase
    .from('user_info')
    .select('*')
    .in('user_id', userIds);
  if (error) {
    console.error('Error fetching user info:', error.message);
    return [];
  }
  return data;
}

// Define position order for sorting
const positionOrder = { QB: 1, RB: 2, WR: 3, TE: 4, DEF: 5, K: 6 };

export default async function Home() {
  const seasons = ['2025', '2024', '2023'];
  let league, rosters, users, leaguesBySeason;

  try {
    [league, rosters, users] = await Promise.all([
      getLeagueData(),
      getRosters(),
      getUsers(),
    ]);

    leaguesBySeason = await Promise.all(
      seasons.map(async (season) => {
        try {
          const leagues = await getLeaguesBySeason(season);
          return { season, leagues };
        } catch (error) {
          console.error(`Error for season ${season}:`, error.message);
          return { season, leagues: [] };
        }
      })
    );
  } catch (error) {
    console.error('Error fetching data:', error.message);
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-red-500">Error: Failed to load data</p>
      </div>
    );
  }

  // Create team name map
  const teamNameMap = rosters.reduce((acc, roster) => {
    const user = users.find((u) => u.user_id === roster.owner_id);
    acc[roster.roster_id] = {
      team_name: user?.metadata?.team_name || user?.display_name || `Team ${roster.roster_id}`,
      avatar: user?.avatar ? `https://sleepercdn.com/avatars/${user.avatar}` : null,
      user_id: user?.user_id,
      display_name: user?.display_name,
    };
    return acc;
  }, {});

  // Fetch user info from Supabase
  const userIds = users.map((user) => user.user_id);
  const userInfo = await getUserInfo(userIds);
  const userInfoMap = userInfo.reduce((acc, info) => {
    acc[info.user_id] = info;
    return acc;
  }, {});

  // Get available seasons
  const availableSeasons = leaguesBySeason
    .filter(({ leagues }) => leagues.length > 0)
    .map(({ season }) => season)
    .concat('2025')
    .filter((value, index, self) => self.indexOf(value) === index)
    .sort((a, b) => b - a);

  // Log rosters for debugging
  console.log('Rosters:', JSON.stringify(rosters, null, 2));

  return (
    <div className="min-h-screen dark:bg-black">
      <header className="dark:bg-black text-neutral py-4">
        <div className="container mx-auto flex items-center gap-4">
          <h1 className="text-3xl font-bold">{league.name} Overview</h1>
        </div>
      </header>
      <main className="container mx-auto py-8">
        <Tabs defaultValue={availableSeasons[0] || '2025'} className="w-full mb-8">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {availableSeasons.map((season) => (
              <TabsTrigger key={season} value={season}>
                {season}
              </TabsTrigger>
            ))}
          </TabsList>
          {availableSeasons.map((season) => (
            <TabsContent key={season} value={season}>
              <div className="space-y-8">
                {/* League Overview */}
                <Card>
                  <CardHeader>
                    <CardTitle>League Overview ({season})</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Teams: {league.total_rosters}</p>
                    <p>Season: {league.season}</p>
                  </CardContent>
                </Card>

                {/* Rosters */}
                <Card>
                  <CardHeader>
                    <CardTitle>Rosters</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {rosters.length === 0 ? (
                      <p>No rosters found</p>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {rosters.map((roster) => {
                          const team = teamNameMap[roster.roster_id];
                          const info = userInfoMap[team?.user_id] || {};
                          // Sort players by position
                          const sortedPlayers = roster.players
                            .map((playerId) => {
                              const player = players[String(playerId)];
                              console.log(`Player ID: ${playerId}, Data:`, player); // Debug
                              return {
                                playerId,
                                full_name: player?.full_name || `Unknown Player (${playerId})`,
                                position: player?.position || 'N/A',
                                team: player?.team || 'N/A',
                                years_exp: player?.years_exp != null ? player.years_exp : 'N/A',
                              };
                            })
                            .sort((a, b) => {
                              const posA = positionOrder[a.position] || 99;
                              const posB = positionOrder[b.position] || 99;
                              return posA - posB;
                            });

                          // Log sorted players
                          console.log(`Roster ${roster.roster_id} Players:`, JSON.stringify(sortedPlayers, null, 2));

                          return (
                            <Card key={roster.roster_id}>
                              <CardHeader>
                                <div className="flex items-center gap-4">
                                  <Avatar>
                                    <AvatarImage src={team?.avatar} alt={team?.team_name} />
                                    <AvatarFallback>
                                      {team?.team_name?.[0] || 'T'}
                                    </AvatarFallback>
                                  </Avatar>
                                  <CardTitle>{team?.team_name}</CardTitle>
                                </div>
                                <p className="text-sm text-gray-600">
                                  Manager: {team?.display_name || 'Unknown'}
                                </p>
                                <p className="text-sm text-gray-600">
                                  Bio: {info.bio || 'No bio available'}
                                </p>
                                <p className="text-sm text-gray-600">
                                  Favorite NFL Team: {info.favorite_nfl_team || 'N/A'}
                                </p>
                                <p className="text-sm text-gray-600">
                                  Contact: {info.contact_preference || 'N/A'}
                                </p>
                              </CardHeader>
                              <CardContent>
                                <Table>
                                  <TableHeader>
                                    <TableRow>
                                      <TableHead>Player</TableHead>
                                      <TableHead>Position</TableHead>
                                      <TableHead>Team</TableHead>
                                      <TableHead>Years Exp</TableHead>
                                    </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                    {sortedPlayers.length === 0 ? (
                                      <TableRow>
                                        <TableCell colSpan={4}>No players found</TableCell>
                                      </TableRow>
                                    ) : (
                                      sortedPlayers.map(({ playerId, full_name, position, team, years_exp }) => (
                                        <TableRow key={playerId}>
                                          <TableCell className="max-w-xs truncate">
                                            {full_name}
                                          </TableCell>
                                          <TableCell>{position}</TableCell>
                                          <TableCell>{team}</TableCell>
                                          <TableCell>{years_exp}</TableCell>
                                        </TableRow>
                                      ))
                                    )}
                                  </TableBody>
                                </Table>
                              </CardContent>
                            </Card>
                          );
                        })}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* League Settings */}
                {season === '2025' && (
                  <Card>
                    <CardHeader>
                      <CardTitle>League Settings</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <h3 className="text-lg font-semibold mb-2">General</h3>
                      <p>Teams: {league.settings?.teams || 'N/A'}</p>
                      <p>Playoff Teams: {league.settings?.playoff_teams || 'N/A'}</p>
                      <p>Divisions: {league.settings?.divisions || 'None'}</p>

                      <h3 className="text-lg font-semibold mt-4 mb-2">Roster Positions</h3>
                      <p>{league.roster_positions?.join(', ') || 'N/A'}</p>

                      <h3 className="text-lg font-semibold mt-4 mb-2">Scoring Settings</h3>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Stat</TableHead>
                            <TableHead>Points</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {league.scoring_settings
                            ? Object.entries(league.scoring_settings).map(([stat, points]) => (
                                <TableRow key={stat}>
                                  <TableCell>{stat}</TableCell>
                                  <TableCell>{points}</TableCell>
                                </TableRow>
                              ))
                            : <TableRow><TableCell colSpan={2}>No scoring settings available</TableCell></TableRow>}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </main>
    </div>
  );
}