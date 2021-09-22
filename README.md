# discordItkBot

試圖使用 JS 重建 [discord_itk_bot](https://github.com/EnderWolf50/discord_itk_bot)

## Roadmap

### handlers

+ [x] load commands
+ [x] load slash commands
+ [x] load events

### commands

+ client
  + [ ] `load`
    + [ ] `loadCommand`
    + [ ] `loadSlash`
  + [ ] `unload`
    + [ ] `unloadCommand`
    + [ ] `unloadSlash`
  + [x] `reload` *(use unload & load to achieve)*
    + [x] `reloadCommand`
    + [x] `reloadSlash`
  + [ ] `settings` | `config`
+ info
  + [x] `ping`
  + [ ] `help`
  + [ ] `invite`
+ utils
  + [x] `id` *(user, guild, channel, emoji)*
  + [x] `poll` | `vote`
  + [ ] `clean`
  + [x] `choose`
  + [ ] `calculate` *(w/ mode switch)*
  + [ ] `translate`
  + [ ] `imageSearch`
  + [ ] `note` | `memo`? *(remind the user at the specified time)*
  + [ ] `todo`?
  + [ ] `info`? *(embed info for user and server)*
  + [ ] `weather`? *(can specify the country)*
  + [ ] `google`?
  + [ ] `wiki`?
  + [ ] `embed`? *(make a simple embed with command)*
+ fun
  + [ ] `ip`
  + [ ] `bzz`
  + [ ] `pin`
  + [ ] `roll` | `dice`
  + [ ] `ascii` *(figlet)*
  + [ ] `achievement` *(by usingg [minecraft-api](https://minecraft-api.com/achivements/blocks/))*
+ guild
  + [ ] `reactionRole`
  + [ ] `joinRole`?
  + [ ] `joinMessage`
+ games
  + [ ] `ab`
  + [ ] no sure yet *(djs-games, weky)*
+ user
  + [ ] `profile`?
