# Vibez

Vibez is a PWA built with Next.js (React.js) and Tailwind.css on top of Spotify API, Unsplash API and Supabase.

## About Vibez

Vibez is a platform that helps people share and discover new music based on different feels or "vibes". With Vibez, you can:

- Browse vibes to explore new music.
- Create your own vibes to help others discover music that fits your desired feel.
- Submit songs to any given vibe, either by searching for a specific song or sharing what you're currently listening to.
- Sync your Spotify playlists with Vibez and add songs while browsing.
- Create new playlists on the Vibez interface.

## Screenshots

![Vibez Tutorial](https://raw.githubusercontent.com/lesmnif/vibez-public/main/public/VibezTuto.png)
![Vibez Main Screen](https://raw.githubusercontent.com/lesmnif/vibez-public/main/public/VibezMain.png)
![Vibez Browsing Playlist](https://raw.githubusercontent.com/lesmnif/vibez-public/main/public/VibezBrowsing.png)
![Vibez Browsing Song](https://raw.githubusercontent.com/lesmnif/vibez-public/main/public/VibezBrowsing2.png)
![Vibez Adding Song](https://raw.githubusercontent.com/lesmnif/vibez-public/main/public/VibezAdding.png)

## Requirements

To use Vibez, you will need:

- A Spotify account
- Access to the Spotify API (available by creating a developer account on the [Spotify Developer website](https://developer.spotify.com/dashboard/login))
- Access to the Unsplash API (available by creating a developer account on the [Unsplash Developer website](https://unsplash.com/developers))
- An account with Supabase (available by signing up on the [Supabase website](https://supabase.com/) )

Once you have the corresponding keys, make sure to change the following environment variables to your .env file.

`VITE_SUPABASE_URL`

`VITE_SUPABASE_ANON_KEY`

`NEXT_PUBLIC_SPOTIFY_SECRET`

`NEXT_PUBLIC_SPOTIFY_CLIENT`

`NEXT_PUBLIC_UNSPLASH_ID`

## Run Locally

Clone the project

```bash
  git clone https://github.com/lesmnif/vibez-public.git
```

Go to the project directory

```bash
  cd vibez-public
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

## Demo

There's a simple preview loom of Vibez.

[Vibez loom](https://www.loom.com/share/a666214fce714d139e3afd4e566fc7ab?user_id_of_reactor=701374)

If you want to test the app by yourself make sure to reach out to me on [LinkedIn](https://www.linkedin.com/in/bogdan-fotescu/) with a Spotify Mail so you can get access.

## Feedback

If you have any feedback, please reach out to me at bogdan@fotescu.com or [LinkedIn](https://www.linkedin.com/in/bogdan-fotescu/), it'll be greatly appreciated.
