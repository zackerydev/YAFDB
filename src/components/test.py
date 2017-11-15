sqlQuery = "INSERT INTO playerstats VALUES "

for player in players:
	try:
		sqlQuery += player.rushing_yds + ","
	catch:
		sqlQuery += "0,"
	try:
		sqlQuery += player.passing_yds + ","
	catch:
		sqlQuery += "0,"