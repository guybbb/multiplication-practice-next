function convertToEmbedLink(youtubeUrl) {
  const url = new URL(youtubeUrl); // Parse the URL
  const videoId = url.searchParams.get("v"); // Extract the 'v' query parameter (video ID)
  return videoId ? `https://www.youtube.com/embed/${videoId}` : null; // Construct embed URL
}

const funnyAnimals = [
  {
      "title": "The World's FUNNIEST Animals!😂(Try Not To Laugh Challenge For Kids)!",
      "link": "https://www.youtube.com/watch?v=mY5opeFpnng&pp=ygUTZnVubnkgYW5pbWFsIHZpZGVvcw%3D%3D"
  },
  {
      "title": "Pet Escape Artists | Funny Pet Video Compilation | The Pet Collective",
      "link": "https://www.youtube.com/watch?v=d2jPd-JPg6g&pp=ygUTZnVubnkgYW5pbWFsIHZpZGVvcw%3D%3D"
  },
  {
      "title": "Dogs' Epic Shopping Cart Voyage: Funny Dogs Maymo & Penny",
      "link": "https://www.youtube.com/watch?v=c2OTHeCKsBE&pp=ygUTZnVubnkgYW5pbWFsIHZpZGVvcw%3D%3D"
  },
  {
      "title": "Animals vs. Wheels | Funny Pet Compilation 2020",
      "link": "https://www.youtube.com/watch?v=C865IDd1chs&pp=ygUTZnVubnkgYW5pbWFsIHZpZGVvcw%3D%3D"
  },
  {
      "title": "Cat VS Dog Funny Animal Videos #shorts",
      "link": "https://www.youtube.com/watch?v=2doW0iqfziI&pp=ygUTZnVubnkgYW5pbWFsIHZpZGVvcw%3D%3D"
  },
  {
      "title": "Cats and Ping Pong Trick Shots",
      "link": "https://www.youtube.com/watch?v=2CzH-iiGfgI&pp=ygUTZnVubnkgYW5pbWFsIHZpZGVvcw%3D%3D"
  },
  {
      "title": "Little Grumpy Dog Is A BAD BOY… Or Is He? | Animal Videos For Kids | Dodo Kids",
      "link": "https://www.youtube.com/watch?v=YjN8qmRoSxc&pp=ygUTZnVubnkgYW5pbWFsIHZpZGVvcw%3D%3D"
  },
  {
      "title": "funny animal videos 2024  🤣  try not to laugh 😹 funny cat and dogs #008 #funnyanimalvideos2024",
      "link": "https://www.youtube.com/watch?v=sg4GfiB5fBM&pp=ygUTZnVubnkgYW5pbWFsIHZpZGVvcw%3D%3D"
  },
  {
      "title": "Funniest Animals 2023 😂 New Funny Cats and Dogs Videos 😻🐶 Part 1",
      "link": "https://www.youtube.com/watch?v=wW9lUBcEC2U&pp=ygUTZnVubnkgYW5pbWFsIHZpZGVvcw%3D%3D"
  },
  {
      "title": "funny animal videos  🤣  try not to laugh 😹 funny cat and dogs #007  #funnycats2024",
      "link": "https://www.youtube.com/watch?v=BZVtFAsTBec&pp=ygUTZnVubnkgYW5pbWFsIHZpZGVvcw%3D%3D"
  },
  {
      "title": "Funny Cats With Zero Chill Pet Compilation",
      "link": "https://www.youtube.com/watch?v=6HqwHvAH-mI&pp=ygUTZnVubnkgYW5pbWFsIHZpZGVvcw%3D%3D"
  },
  {
      "title": "Rollin' France - what if animals were round?",
      "link": "https://www.youtube.com/watch?v=ba62uuv-5Dc&pp=ygUTZnVubnkgYW5pbWFsIHZpZGVvcw%3D%3D"
  },
  {
      "title": "Pup Left On Highway Finds Dad And Is Never Alone Now | Cuddle Buddies",
      "link": "https://www.youtube.com/watch?v=maH-czwz19I&pp=ygUTZnVubnkgYW5pbWFsIHZpZGVvcw%3D%3D"
  },
  {
      "title": "Cats and Mentos Cola & Domino",
      "link": "https://www.youtube.com/watch?v=FTIM-797FJw&pp=ygUTZnVubnkgYW5pbWFsIHZpZGVvcw%3D%3D"
  },
  {
      "title": "Cats and Domino",
      "link": "https://www.youtube.com/watch?v=7Nn7NZI_LN4&pp=ygUTZnVubnkgYW5pbWFsIHZpZGVvcw%3D%3D"
  },
  {
      "title": "World's Most Obedient Cat - Aaron's Animals",
      "link": "https://www.youtube.com/watch?v=oZFAcp-Qfbs&pp=ygUTZnVubnkgYW5pbWFsIHZpZGVvcw%3D%3D"
  },
  {
      "title": "Watch Out For The Hammock Monsters! | Dodo Kids | Funny Dog Videos",
      "link": "https://www.youtube.com/watch?v=HenPoLOYjiM&pp=ygUTZnVubnkgYW5pbWFsIHZpZGVvcw%3D%3D"
  },
  {
      "title": "Turtle / Tortoise - A Funny Turtle And Cute Turtle Videos Compilation || NEW HD",
      "link": "https://www.youtube.com/watch?v=p4Jj9QZFJvw&pp=ygUTZnVubnkgYW5pbWFsIHZpZGVvcw%3D%3D"
  },
  {
      "title": "Funny Fish",
      "link": "https://www.youtube.com/watch?v=Gyqat1g6MY0&pp=ygUTZnVubnkgYW5pbWFsIHZpZGVvcw%3D%3D"
  },
  {
      "title": "Peppa Pig Animals in REAL LIFE!",
      "link": "https://www.youtube.com/watch?v=GvPLY1LgCXY&pp=ygUTZnVubnkgYW5pbWFsIHZpZGVvcw%3D%3D"
  },
  {
      "title": "Watch Out For The Hammock Monsters! | Dodo Kids | Funny Dog Videos",
      "link": "https://www.youtube.com/watch?v=HenPoLOYjiM&pp=ygUTZnVubnkgYW5pbWFsIHZpZGVvcw%3D%3D"
  },
  {
      "title": "My Funny Pet Hamster in Lego Obstacle Course",
      "link": "https://www.youtube.com/watch?v=SAHHrJjEHmI&pp=ygUTZnVubnkgYW5pbWFsIHZpZGVvcw%3D%3D"
  },
  {
      "title": "♪♪ Funny Animal Song | When Hedgehogs Kiss | Hooray Kids Songs & Nursery Rhymes | Love",
      "link": "https://www.youtube.com/watch?v=aIgQMKTO6UU&pp=ygUTZnVubnkgYW5pbWFsIHZpZGVvcw%3D%3D"
  }
]

const funnyAnimations = [
  {
      "title": "Spider-Man Stops A Train",
      "link": "https://www.youtube.com/watch?v=iiTDUNkRn0w&pp=ygUXZnVubnkgYW5pbWF0aW9ucyB2aWRlb3M%3D"
  },
  {
      "title": "Rollin' France - what if animals were round?",
      "link": "https://www.youtube.com/watch?v=ba62uuv-5Dc&pp=ygUXZnVubnkgYW5pbWF0aW9ucyB2aWRlb3M%3D"
  },
  {
      "title": "The Egyptian Pyramids - Funny Animated Short Film (Full HD)",
      "link": "https://www.youtube.com/watch?v=j6PbonHsqW0&pp=ygUXZnVubnkgYW5pbWF0aW9ucyB2aWRlb3M%3D"
  },
  {
      "title": "Gordon Goose: Risky Life! / Funny animated short film",
      "link": "https://www.youtube.com/watch?v=CBi0HUmTrkI&pp=ygUXZnVubnkgYW5pbWF0aW9ucyB2aWRlb3M%3D"
  },
  {
      "title": "Eating Kidney Beans | Cartoon Box 133 | By Frame Order | Funny animated cartoons",
      "link": "https://www.youtube.com/watch?v=Q912Hykuw34&pp=ygUXZnVubnkgYW5pbWF0aW9ucyB2aWRlb3M%3D"
  },
  {
      "title": "The Innovator",
      "link": "https://www.youtube.com/watch?v=ZtHZyJTfvHc&pp=ygUXZnVubnkgYW5pbWF0aW9ucyB2aWRlb3M%3D"
  },
  {
      "title": "Minecraft In A Nutshell",
      "link": "https://www.youtube.com/watch?v=_wbzPFyWHi8&pp=ygUXZnVubnkgYW5pbWF0aW9ucyB2aWRlb3M%3D"
  },
  {
      "title": "CGI Animated Short Film: \"Watermelon A Cautionary Tale\" by Kefei Li & Connie Qin He | CGMeetup",
      "link": "https://www.youtube.com/watch?v=lTxn2BuqyzU&pp=ygUXZnVubnkgYW5pbWF0aW9ucyB2aWRlb3M%3D"
  },
  {
      "title": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
      "link": "https://www.youtube.com/watch?v=4mnrlK8gdfY&pp=ygUXZnVubnkgYW5pbWF0aW9ucyB2aWRlb3M%3D"
  },
  {
      "title": "Peppa Pig Funny Animations",
      "link": "https://www.youtube.com/watch?v=g49ro7J8Mlo&pp=ygUXZnVubnkgYW5pbWF0aW9ucyB2aWRlb3M%3D"
  },
  {
      "title": "Originalos episode 17: Before Democracy",
      "link": "https://www.youtube.com/watch?v=oCvITs2cg4I&pp=ygUXZnVubnkgYW5pbWF0aW9ucyB2aWRlb3M%3D"
  },
  {
      "title": "They have their own song😅 #funny #viralvideo #fyp",
      "link": "https://www.youtube.com/watch?v=ABH7qCq0LNY&pp=ygUXZnVubnkgYW5pbWF0aW9ucyB2aWRlb3M%3D"
  },
  {
      "title": "Haircut - Peppa Funny Animation",
      "link": "https://www.youtube.com/watch?v=EOTc7jv-tCE&pp=ygUXZnVubnkgYW5pbWF0aW9ucyB2aWRlb3M%3D"
  }
]

export const funnyVideos = [...funnyAnimals,...funnyAnimations].map((video) => ({
  ...video,
  link: convertToEmbedLink(video.link),
}));
