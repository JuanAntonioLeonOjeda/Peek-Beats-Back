# Project-3: PeekBeats-Streaming-App

### Auth Endpoints

| METHOD | ENDPOINT     | TOKEN | ROLE | DESCRIPTION           | POST PARAMS                                                 | RETURNS |
| ------ | ------------ | ----- | ---- | --------------------- | ----------------------------------------------------------- | ------- |
| POST   | /auth/signup | -     | -    | User Sign Up          | user_name, email, date_of_birth, password, confirm_password | token   |
| POST   | /auth/login  | -     | -    | Delete skills form DB | email, password                                             | token   |

### Users Endpoints

| METHOD | ENDPOINT                  | TOKEN | ROLE  | DESCRIPTION                  | POST PARAMS                | RETURNS                              |
| ------ | ------------------------- | ----- | ----- | ---------------------------- | -------------------------- | ------------------------------------ |
| GET    | /users                    | YES   | Admin | Get all users                | -                          | [{ users }]                          |
| GET    | /users/:userId            | YES   | Admin | Get one user                 | user_id                    | { user }                             |
| DELETE | /users/me                 | YES   | -     | Remove own profile           | user_id                    | "Profile deleted"                    |
| GET    | /users/me                 | YES   | -     | Get own profile              | user_id                    | { user }                             |
| PUT    | /users/me                 | YES   | -     | Update own profile           | user_id                    | { user }                             |
| GET    | /users/me/streams         | YES   | -     | Get all user streams         | user_id                    | [{ streams }]                        |
| GET    | /users/me/badges          | YES   | -     | Get all user badges          | user_id                    | [{ badges }]                         |
| GET    | /users/me/friends         | YES   | -     | Get all user friends         | user_id                    | [{ friends }]                        |
| POST   | /users/me/friends/:id     | YES   | -     | Add one user friend          | user_id, friend_id         | { friend }                           |
| DELETE | /users/me/friends/:id     | YES   | -     | Remove one user friend       | user_id, friend_id         | "Friend has been removed"            |
| GET    | /users/me/favorites       | YES   | -     | Get all favorites streamers  | ¿user_id?                  | [{ streamers }]                      |
| POST   | /users/me/favorites/:id   | YES   | -     | Add one streamer to favorite | streamer_id                | { streamer }                         |
| DELETE | /users/me/favorites/:id   | YES   | -     | Remove one favorite streamer | streamer_id                | "Favorite streamer has been removed" |
| POST   | /users/me/password        | YES   | -     | Change own password          | old_password, new_password | "Password updated"                   |
| POST   | /users/:userId/badges/:id | YES   | Admin | Add one badge to user        | user_id, badge_id          | { badge }                            |
| DELETE | /users/:userId/badges/:id | YES   | Admin | Remove one badge from user   | user_id, badge_id          | "Badge has been removed"             |

### Whispers Endpoints

| METHOD | ENDPOINT         | TOKEN | ROLE | DESCRIPTION             | POST PARAMS | RETURNS                    |
| ------ | ---------------- | ----- | ---- | ----------------------- | ----------- | -------------------------- |
| GET    | /me/whispers     | YES   | -    | Get all whispers        | -           | [{ whisper }]              |
| GET    | /me/whispers/:id | YES   | -    | Get one whisper         | whisper_id  | { whisper }                |
| POST   | /me/whispers/:id | YES   | -    | Create and send whisper | { whisper } | { whisper }                |
| DELETE | /me/whispers/:id | YES   | -    | Remove whisper          | whisper_id  | "Whisper has been deleted" |

### Streams Endpoints

| METHOD | ENDPOINT     | TOKEN | ROLE  | DESCRIPTION     | POST PARAMS         | RETURNS                    |
| ------ | ------------ | ----- | ----- | --------------- | ------------------- | -------------------------- |
| GET    | /streams     | YES   | -     | Get all streams | query: search string| [{ streams }]              |
| GET    | /streams/:id | YES   | -     | Join stream     | stream_id           | { stream }                 |
| POST   | /me/streams  | YES   | -     | Create stream   | -                   | { stream }                 |
| DELETE | /streams/:id | YES   | Admin | Remove stream   | stream_id           | "Streams has been deleted" |

### Genres Endpoints

| METHOD | ENDPOINT    | TOKEN | ROLE  | DESCRIPTION      | POST PARAMS | RETURNS                   |
| ------ | ----------- | ----- | ----- | ---------------- | ----------- | ------------------------- |
| GET    | /genres     | YES   | -     | Get all genres   | -           | [{ genres }]              |
| GET    | /genres/:id | YES   | -     | Get one genre    | genre_id    | { genre }                 |
| POST   | /genres     | YES   | Admin | Create one genre | { genre }   | { genre }                 |
| PUT    | /genres/:id | YES   | Admin | Update one genre | genre_id    | { genre }                 |
| DELETE | /genres/:id | YES   | Admin | Remove one genre | genre_id    | "Genres has been deleted" |

### Badges Endpoints

| METHOD | ENDPOINT    | TOKEN | ROLE  | DESCRIPTION       | POST PARAMS | RETURNS                   |
| ------ | ----------- | ----- | ----- | ----------------- | ----------- | ------------------------- |
| GET    | /badges     | YES   | -     | Get all badges    | -           | [{ badges }]              |
| GET    | /badges/:id | YES   | -     | Get one badge     | badge_id    | { badge }                 |
| POST   | /badges     | YES   | Admin | Create one badge  | { badge }   | { badge }                 |
| PUT    | /badges/:id | YES   | Admin | Update one badge  | badge_id    | { badge }                 |
| DELETE | /badges/:id | YES   | Admin | Remove one badge. | badge_id    | "Badges has been deleted" |
