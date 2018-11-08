This node js application allowed to sync/download youtube video from playlist to local file system.

# Instalation:
```
git clone https://github.com/infiniti008/youtube_on_phone.git
```
```
cd youtube_on_phone
```
```
npm i
```
```
npm run install
```
>Clarify url for YouTube playlist.
>Clarify path to load media.
# Run:
```npm run start
```
This command run watching for your playlist every 5 minutes. If You add new video to playlist - this video will download to directory called like playlist name in specified path.
If You delete video from playlist - this video will delete from local directory.
You don't need to remove files from localy directory.

# Phone sync:
Right now for sync with phone you need to use thirdparty app. For example You can use Resilio app on your server and phone.
