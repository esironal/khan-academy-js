# Khan Academy API JS Wrapper

A very simple JS wrapper for Khan Academy's API.

For all available methods (e.g., `playlists/chemistry/videos`), see the official [Khan Academy API Methods documentation](https://github.com/Khan/khan-api/wiki/Khan-Academy-API-Methods)

## Example Usage #1

```javascript
// Request all Algebra I videos
ka.api('playlists/algebra-i/videos', function (response) {

    // Get the YouTube ID for the first video in the playlist
    var first_video = response[0].youtube_id;

    // Embed the first video in a div with the id 'myDiv'
    ka.embed('myDiv', first_video);

});
```


## Example Usage #2

```javascript
// Request all Chemistry videos
ka.api('playlists/chemistry/videos', function (response) {

    // Get the YouTube ID for the first video in the playlist
    var first_video = response[0].youtube_id;

    // Embed the first video in a div with the id 'myDiv'
    // with some custom attributes
    ka.embed({
        id: 'myDiv',
        class: 'yt-player',
        youtube_id: first_video,
        width: 320,
        height: 280
    });

});
```