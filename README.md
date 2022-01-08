# _Name Removed Due To DMCA Request_ Clone

_Inspiration:_
This game is an open source clone of the immensely popular online word guessing game _Name Removed Due To DMCA Request_. Like many others all over the world, I saw the signature pattern of green, yellow, and white squares popping up all over social media and the web and had to check it out. After a few days of play, I decided it would be great for my learning to try to rebuild _Name Removed Due To DMCA Request_ in React!

_Design Decisions:_
I used a combination of React, Typescript, and Tailwind to build this _Name Removed Due To DMCA Request_ Clone. When examining the original _Name Removed Due To DMCA Request_, I assumed the list might come from an external API or database, but after investigating in chrome dev tools I found that the list of words is simply stored in an array on the front end. I'm using the same list as the OG _Name Removed Due To DMCA Request_ uses, but watch out for spoilers if you go find the file in this repo! The word match functionality is simple: the word array index increments each day from a fixed game epoch timestamp (only one puzzle per day!) roughly like so:

```
WORDS[Math.floor((NOW_IN_MS - GAME_EPOCH_IN_MS) / ONE_DAY_IN_MS)]
```

React enabled me to componentize the littlest parts of the game - keys and letter cells - and use them as the building blocks for the keyboard, word grid, and winning solution graphic. As for handling state, I used the built in useState and useEffect hooks to track guesses, whether the game is won, and to conditionally render popups.

In addition to other things, Typescript helped ensure type safety for the statuses of each guessed letter, which were used in many areas of the app and needed to be accurate for the game to work correctly.

I implemented Tailwind mostly because I wanted to learn how to use Tailwind CSS, but I also took advantage of [Tailwind UI](https://tailwindui.com/) with their [headless package](https://headlessui.dev/) to build the modals and notifications. This was such an easy way to build simple popups for how to play, winning the game, and invalid words.

_To Run Locally:_
Clone the repository and perform the following command line actions:
```bash
$ cd _Name Removed Due To DMCA Request_
$ npm init
$ npm run start
```

### I'm looking for a junior developer role
Please feel free to contact me on [linkedin](https://www.linkedin.com/in/hannahpark1000/) and learn more about me [here](https://www.hannahmariepark.com/)
