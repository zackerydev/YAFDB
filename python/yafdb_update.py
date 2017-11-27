import nflgame
import nflgame.player
import sys
import mysql.connector
import httplib2
from datetime import datetime


connection = mysql.connector.connect(user='root', password='', host='127.0.0.1', database='yafdb_temp')
cursor = connection.cursor()

add_team = ("INSERT INTO `team` "
            "(`name`, `city`, `state`, `division`, `conference`, `code`) "
            "VALUES (%s, $%s, %s, %s, %s, %s)")
teams = nflgame.teams

add_game = ("INSERT IGNORE INTO `game` "
            "(`id`, `season_year`, `season_week`, `season_type`, `home_team`, `home_score`, `away_team`, `away_score`) "
            "VALUES (%(id)s, %(year)s, %(week)s, %(type)s, %(home)s, %(home_score)s, %(away)s, %(away_score)s);")

find_team_id = "SELECT `id` FROM `team` WHERE `code` = %(code)s"

add_player = ("INSERT IGNORE INTO `player` "
              "VALUES (%(id)s, %(first_name)s, %(last_name)s, %(number)s, %(position)s, %(birthday)s, %(team_id)s);")

add_player_game_stats = ("INSERT IGNORE INTO `player_game_stats`"
                         " VALUES (%(game_id)s, %(player_id)s, %(team_id)s, "
                         "%(passing_yards)s, %(passing_attempts)s, %(passing_completions)s, %(passing_touchdowns)s, "
                         "%(rushing_yards)s, %(rushing_attempts)s, %(rushing_touchdowns)s, "
                         "%(receiving_yards)s, %(receiving_catches)s, %(receiving_targets)s, %(receiving_touchdowns)s, "
                         "%(tackles)s, %(interceptions_thrown)s, %(interceptions_caught)s, %(fumbles)s, "
                         "%(fumbles_lost)s, %(fumbles_recovered)s, %(fumbles_forced)s, %(defense_sacks)s, "
                         "%(kicking_fg_made)s, %(kicking_fg_tried)s, %(kicking_pat_made)s, %(kicking_pat_tried)s, "
                         "%(punts)s, %(punting_yds)s, %(kick_return_yds)s, %(kick_return_tds)s, %(punt_return_yds)s, "
                         "%(punt_return_tds)s);")

is_player = "SELECT  COUNT(*) FROM `player` WHERE `id` = %(player_id)s;"


delete_players = ("DELETE FROM "
                  "")

#Insert players
for key, player in nflgame.players.iteritems():
    try:
        cursor.execute(find_team_id, {'code': nflgame.standard_team(player.team)})
        team_id = int(cursor.fetchone()[0])
    except TypeError:
        team_id = None
    try:
        birthday = datetime.strptime(player.birthdate, '%m/%d/%Y')
    except ValueError:
        birthday = None

    data_player = {
        'id': int(player.gsis_id.replace("-", "")),
        'first_name': player.first_name,
        'last_name': player.last_name,
        'number': player.number,
        'position': player.position,
        'birthday': birthday,
        'team_id': team_id
    }
    cursor.execute(add_player, data_player)
    connection.commit()

#Insert Pre-Season games
for i in range(1, 5):
    games = nflgame.games([2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017], kind='PRE', week=i)
    for j in range(0, len(games)):
        print games[j].season()
        print 'Week ' + str(i)
        print 'Pre Season'
        print "Home team: " + nflgame.standard_team(games[j].home)
        print "Home score: " + str(games[j].score_home)
        print "Away team: " + nflgame.standard_team(games[j].away)
        print "Away score: " + str(games[j].score_away)
        print "\n"
        cursor.execute(find_team_id, {'code': nflgame.standard_team(games[j].home)})
        home_id = int(cursor.fetchone()[0])
        cursor.execute(find_team_id, {'code': nflgame.standard_team(games[j].away)})
        away_id = int(cursor.fetchone()[0])
        data_game = {
            'id': games[j].gamekey,
            'year': games[j].season(),
            'week': i,
            'type': "PRE",
            'home': home_id,
            'home_score': games[j].score_home,
            'away': away_id,
            'away_score': games[j].score_away
        }
        cursor.execute(add_game, data_game)
        game_id = cursor.lastrowid
        # Insert player_game_stats
        players = nflgame.combine_game_stats([games[j]])
        for player in players:
            isPlayer = 0
            try:
                data_player = {
                    'player_id': int(player.playerid.replace("-", ""))
                }
                cursor.execute(is_player, data_player)
                isPlayer = int(cursor.fetchone()[0])
                if isPlayer:
                    data_player_game_stats = {
                        'game_id': games[j].gamekey,
                        'player_id': int(player.playerid.replace("-", "")),
                        'team_id': home_id if player.home else away_id,
                        'passing_yards': player.passing_yds,
                        'passing_attempts': player.passing_att,
                        'passing_completions': player.passing_cmp,
                        'passing_touchdowns': player.passing_tds,
                        'rushing_yards': player.rushing_yds,
                        'rushing_attempts': player.rushing_att,
                        'rushing_touchdowns': player.rushing_tds,
                        'receiving_yards': player.receiving_yds,
                        'receiving_catches': player.receiving_rec,
                        'receiving_targets': player.receiving_tar,
                        'receiving_touchdowns': player.receiving_tds,
                        'tackles': player.defense_tkl,
                        'interceptions_thrown': player.passing_ints,
                        'interceptions_caught': player.defense_int,
                        'fumbles': player.fumbles_tot,
                        'fumbles_lost': player.fumbles_lost,
                        'fumbles_recovered': player.defense_frec,
                        'fumbles_forced': player.defense_ffum,
                        'defense_sacks': player.defense_sk,
                        'kicking_fg_made': player.kicking_fgm,
                        'kicking_fg_tried': player.kicking_fga,
                        'kicking_pat_made': player.kicking_xpmade,
                        'kicking_pat_tried': player.kicking_xpa,
                        'punts': player.punting_tot,
                        'punting_yds': player.punting_yds,
                        'kick_return_yds': player.kickret_yds,
                        'kick_return_tds': player.kickret_tds,
                        'punt_return_yds': player.puntret_yds,
                        'punt_return_tds': player.puntret_tds
                    }
                    cursor.execute(add_player_game_stats, data_player_game_stats)
            except ValueError:
                pass
        connection.commit()

#Insert Regular-Season games
for i in range(1, 18):
    games = nflgame.games([2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017], week=i)
    for j in range(0, len(games)):
        print games[j].season()
        print 'Week ' + str(i)
        print 'Regular Season'
        print "Home team: " + nflgame.standard_team(games[j].home)
        print "Home score: " + str(games[j].score_home)
        print "Away team: " + nflgame.standard_team(games[j].away)
        print "Away score: " + str(games[j].score_away)
        print "\n"
        cursor.execute(find_team_id, {'code': nflgame.standard_team(games[j].home)})
        home_id = int(cursor.fetchone()[0])
        cursor.execute(find_team_id, {'code': nflgame.standard_team(games[j].away)})
        away_id = int(cursor.fetchone()[0])
        data_game = {
            'id': games[j].gamekey,
            'year': games[j].season(),
            'week': i,
            'type': "REG",
            'home': home_id,
            'home_score': games[j].score_home,
            'away': away_id,
            'away_score': games[j].score_away
        }
        cursor.execute(add_game, data_game)
        game_id = cursor.lastrowid
        # Insert player_game_stats
        players = nflgame.combine_game_stats([games[j]])
        for player in players:
            isPlayer = 0
            try:
                data_player = {
                    'player_id': int(player.playerid.replace("-", ""))
                }
                cursor.execute(is_player, data_player)
                isPlayer = int(cursor.fetchone()[0])
                if isPlayer:
                    data_player_game_stats = {
                        'game_id': games[j].gamekey,
                        'player_id': int(player.playerid.replace("-", "")),
                        'team_id': home_id if player.home else away_id,
                        'passing_yards': player.passing_yds,
                        'passing_attempts': player.passing_att,
                        'passing_completions': player.passing_cmp,
                        'passing_touchdowns': player.passing_tds,
                        'rushing_yards': player.rushing_yds,
                        'rushing_attempts': player.rushing_att,
                        'rushing_touchdowns': player.rushing_tds,
                        'receiving_yards': player.receiving_yds,
                        'receiving_catches': player.receiving_rec,
                        'receiving_targets': player.receiving_tar,
                        'receiving_touchdowns': player.receiving_tds,
                        'tackles': player.defense_tkl,
                        'interceptions_thrown': player.passing_ints,
                        'interceptions_caught': player.defense_int,
                        'fumbles': player.fumbles_tot,
                        'fumbles_lost': player.fumbles_lost,
                        'fumbles_recovered': player.defense_frec,
                        'fumbles_forced': player.defense_ffum,
                        'defense_sacks': player.defense_sk,
                        'kicking_fg_made': player.kicking_fgm,
                        'kicking_fg_tried': player.kicking_fga,
                        'kicking_pat_made': player.kicking_xpmade,
                        'kicking_pat_tried': player.kicking_xpa,
                        'punts': player.punting_tot,
                        'punting_yds': player.punting_yds,
                        'kick_return_yds': player.kickret_yds,
                        'kick_return_tds': player.kickret_tds,
                        'punt_return_yds': player.puntret_yds,
                        'punt_return_tds': player.puntret_tds
                    }
                    cursor.execute(add_player_game_stats, data_player_game_stats)
            except ValueError:
                pass
        connection.commit()

#Insert Post-Season games
for i in range(1, 5):
    games = nflgame.games([2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017], kind='POST', week=i)
    for j in range(0, len(games)):
        print games[j].season()
        print 'Week ' + str(i)
        print 'Post Season'
        print "Home team: " + games[j].home
        print "Home score: " + str(games[j].score_home)
        print "Away team: " + games[j].away
        print "Away score: " + str(games[j].score_away)
        print "\n"
        cursor.execute(find_team_id, {'code': nflgame.standard_team(games[j].home)})
        home_id = int(cursor.fetchone()[0])
        cursor.execute(find_team_id, {'code': nflgame.standard_team(games[j].away)})
        away_id = int(cursor.fetchone()[0])
        data_game = {
            'id': games[j].gamekey,
            'year': games[j].season(),
            'week': i,
            'type': "POST",
            'home': home_id,
            'home_score': games[j].score_home,
            'away': away_id,
            'away_score': games[j].score_away
        }
        cursor.execute(add_game, data_game)
        game_id = cursor.lastrowid
        # Insert player_game_stats
        players = nflgame.combine_game_stats([games[j]])
        for player in players:
            isPlayer = 0
            try:
                data_player = {
                    'player_id': int(player.playerid.replace("-", ""))
                }
                cursor.execute(is_player, data_player)
                isPlayer = int(cursor.fetchone()[0])
                if isPlayer:
                    data_player_game_stats = {
                        'game_id': games[j].gamekey,
                        'player_id': int(player.playerid.replace("-", "")),
                        'team_id': home_id if player.home else away_id,
                        'passing_yards': player.passing_yds,
                        'passing_attempts': player.passing_att,
                        'passing_completions': player.passing_cmp,
                        'passing_touchdowns': player.passing_tds,
                        'rushing_yards': player.rushing_yds,
                        'rushing_attempts': player.rushing_att,
                        'rushing_touchdowns': player.rushing_tds,
                        'receiving_yards': player.receiving_yds,
                        'receiving_catches': player.receiving_rec,
                        'receiving_targets': player.receiving_tar,
                        'receiving_touchdowns': player.receiving_tds,
                        'tackles': player.defense_tkl,
                        'interceptions_thrown': player.passing_ints,
                        'interceptions_caught': player.defense_int,
                        'fumbles': player.fumbles_tot,
                        'fumbles_lost': player.fumbles_lost,
                        'fumbles_recovered': player.defense_frec,
                        'fumbles_forced': player.defense_ffum,
                        'defense_sacks': player.defense_sk,
                        'kicking_fg_made': player.kicking_fgm,
                        'kicking_fg_tried': player.kicking_fga,
                        'kicking_pat_made': player.kicking_xpmade,
                        'kicking_pat_tried': player.kicking_xpa,
                        'punts': player.punting_tot,
                        'punting_yds': player.punting_yds,
                        'kick_return_yds': player.kickret_yds,
                        'kick_return_tds': player.kickret_tds,
                        'punt_return_yds': player.puntret_yds,
                        'punt_return_tds': player.puntret_tds
                    }
                    cursor.execute(add_player_game_stats, data_player_game_stats)
            except ValueError:
                pass
        connection.commit()

players = nflgame.combine_game_stats(games)
print players
connection.commit()
cursor.close()
connection.close()


