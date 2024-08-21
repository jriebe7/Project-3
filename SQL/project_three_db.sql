CREATE TABLE spotify_data (
	Track VARCHAR(500),
	AlbumName VARCHAR(500),
	Artist VARCHAR(500),
	ReleaseDate DATE,
	ISRC VARCHAR(500),
	AllTimeRank VARCHAR (500),
	TrackScore FLOAT,
	SpotifyStreams VARCHAR (500),
	SpotifyPlaylistCount VARCHAR (500),
	SpotifyPlaylistReach VARCHAR (500),
	SpotifyPopularity VARCHAR (500),
	YouTubeViews VARCHAR (500),
	YouTubeLikes VARCHAR (500),
	TiktokPosts VARCHAR(500),
	TikTokLikes varchar(500),
	TikTokViews varchar(500),
	YouTubePlaylistReach varchar(500),
	AppleMusicPlaylistCount varchar(500),
	AirPlaySpins varchar(500),
	SiriusXMSpins varchar(500),
	DeezerPlaylistCount varchar(500),
	DeezerPlaylistReach VARCHAR(500),	
	AmazonPlaylistCount VARCHAR(500),
	PandoraStreams VARCHAR(500),
	PandoraTrackStations VARCHAR(500),
	SoundcloudStreams VARCHAR(500),
	ShazamCounts VARCHAR(500),
	TIDALPopularity VARCHAR(500),
	ExplicitTrack INT
	);

SELECT * FROM spotify_data