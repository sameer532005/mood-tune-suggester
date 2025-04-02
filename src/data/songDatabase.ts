
interface Song {
  title: string;
  artist: string;
  youtubeLink: string;
}

interface SongDatabase {
  [emotion: string]: Song[];
}

export const songDatabase: SongDatabase = {
  happy: [
    { 
      title: "Happy", 
      artist: "Pharrell Williams",
      youtubeLink: "https://www.youtube.com/watch?v=ZbZSe6N_BXs" 
    },
    { 
      title: "Can't Stop the Feeling!", 
      artist: "Justin Timberlake",
      youtubeLink: "https://www.youtube.com/watch?v=ru0K8uYEZWw" 
    },
    { 
      title: "Uptown Funk", 
      artist: "Mark Ronson ft. Bruno Mars",
      youtubeLink: "https://www.youtube.com/watch?v=OPf0YbXqDm0" 
    },
    { 
      title: "Good as Hell", 
      artist: "Lizzo",
      youtubeLink: "https://www.youtube.com/watch?v=vuq-VAiW9kw" 
    },
    { 
      title: "Walking on Sunshine", 
      artist: "Katrina & The Waves",
      youtubeLink: "https://www.youtube.com/watch?v=iPUmE-tne5U" 
    },
    { 
      title: "Don't Stop Me Now", 
      artist: "Queen",
      youtubeLink: "https://www.youtube.com/watch?v=HgzGwKwLmgM" 
    },
    { 
      title: "On Top of the World", 
      artist: "Imagine Dragons",
      youtubeLink: "https://www.youtube.com/watch?v=w5tWYmIOWGk" 
    },
    { 
      title: "Best Day of My Life", 
      artist: "American Authors",
      youtubeLink: "https://www.youtube.com/watch?v=Y66j_BUCBMY" 
    },
    { 
      title: "I Gotta Feeling", 
      artist: "Black Eyed Peas",
      youtubeLink: "https://www.youtube.com/watch?v=uSD4vsh1zDA" 
    },
    { 
      title: "Shut Up and Dance", 
      artist: "Walk the Moon",
      youtubeLink: "https://www.youtube.com/watch?v=6JCLY0Rlx6Q" 
    }
  ],
  sad: [
    { 
      title: "Here Comes the Sun", 
      artist: "The Beatles",
      youtubeLink: "https://www.youtube.com/watch?v=KQetemT1sWc" 
    },
    { 
      title: "Don't Worry, Be Happy", 
      artist: "Bobby McFerrin",
      youtubeLink: "https://www.youtube.com/watch?v=d-diB65scQU" 
    },
    { 
      title: "Shake It Off", 
      artist: "Taylor Swift",
      youtubeLink: "https://www.youtube.com/watch?v=nfWlot6h_JM" 
    },
    { 
      title: "Three Little Birds", 
      artist: "Bob Marley",
      youtubeLink: "https://www.youtube.com/watch?v=zaGUr6wzyT8" 
    },
    { 
      title: "Brave", 
      artist: "Sara Bareilles",
      youtubeLink: "https://www.youtube.com/watch?v=QUQsqBqxoR4" 
    },
    { 
      title: "Beautiful Day", 
      artist: "U2",
      youtubeLink: "https://www.youtube.com/watch?v=co6WMzDOh1o" 
    },
    { 
      title: "Eye of the Tiger", 
      artist: "Survivor",
      youtubeLink: "https://www.youtube.com/watch?v=btPJPFnesV4" 
    },
    { 
      title: "Shiny Happy People", 
      artist: "R.E.M.",
      youtubeLink: "https://www.youtube.com/watch?v=YYOKMUTTDdA" 
    },
    { 
      title: "I Will Survive", 
      artist: "Gloria Gaynor",
      youtubeLink: "https://www.youtube.com/watch?v=ARt9HV9T0w8" 
    },
    { 
      title: "Dog Days Are Over", 
      artist: "Florence + The Machine",
      youtubeLink: "https://www.youtube.com/watch?v=iWOyfLBYtuU" 
    }
  ],
  angry: [
    { 
      title: "Weightless", 
      artist: "Marconi Union",
      youtubeLink: "https://www.youtube.com/watch?v=UfcAVejslrU" 
    },
    { 
      title: "Somewhere Over the Rainbow", 
      artist: "Israel Kamakawiwoʻole",
      youtubeLink: "https://www.youtube.com/watch?v=V1bFr2SWP1I" 
    },
    { 
      title: "Hakuna Matata", 
      artist: "From The Lion King",
      youtubeLink: "https://www.youtube.com/watch?v=nbY_aP-alkw" 
    },
    { 
      title: "What a Wonderful World", 
      artist: "Louis Armstrong",
      youtubeLink: "https://www.youtube.com/watch?v=rBrd_3VMC3c" 
    },
    { 
      title: "Clair de Lune", 
      artist: "Claude Debussy",
      youtubeLink: "https://www.youtube.com/watch?v=WNcsUNKlAKw" 
    },
    { 
      title: "Don't Stop Believin'", 
      artist: "Journey",
      youtubeLink: "https://www.youtube.com/watch?v=1k8craCGpgs" 
    },
    { 
      title: "Perfect Day", 
      artist: "Lou Reed",
      youtubeLink: "https://www.youtube.com/watch?v=9wxI4KK9ZYo" 
    },
    { 
      title: "Imagine", 
      artist: "John Lennon",
      youtubeLink: "https://www.youtube.com/watch?v=YkgkThdzX-8" 
    },
    { 
      title: "Somewhere Only We Know", 
      artist: "Keane",
      youtubeLink: "https://www.youtube.com/watch?v=Oextk-If8HQ" 
    },
    { 
      title: "Let It Be", 
      artist: "The Beatles",
      youtubeLink: "https://www.youtube.com/watch?v=QDYfEBY9NM4" 
    }
  ],
  neutral: [
    { 
      title: "Viva La Vida", 
      artist: "Coldplay",
      youtubeLink: "https://www.youtube.com/watch?v=dvgZkm1xWPE" 
    },
    { 
      title: "Africa", 
      artist: "Toto",
      youtubeLink: "https://www.youtube.com/watch?v=FTQbiNvZqaY" 
    },
    { 
      title: "September", 
      artist: "Earth, Wind & Fire",
      youtubeLink: "https://www.youtube.com/watch?v=Gs069dndIYk" 
    },
    { 
      title: "Clocks", 
      artist: "Coldplay",
      youtubeLink: "https://www.youtube.com/watch?v=d020hcWA_Wg" 
    },
    { 
      title: "Dreams", 
      artist: "Fleetwood Mac",
      youtubeLink: "https://www.youtube.com/watch?v=mrZRURcb1cM" 
    },
    { 
      title: "Sweet Disposition", 
      artist: "The Temper Trap",
      youtubeLink: "https://www.youtube.com/watch?v=jxKjOOR9xyU" 
    },
    { 
      title: "The Middle", 
      artist: "Jimmy Eat World",
      youtubeLink: "https://www.youtube.com/watch?v=oKsxPW6i3pM" 
    },
    { 
      title: "Electric Feel", 
      artist: "MGMT",
      youtubeLink: "https://www.youtube.com/watch?v=MmZexg8sxyk" 
    },
    { 
      title: "Disconnect", 
      artist: "Clean Bandit",
      youtubeLink: "https://www.youtube.com/watch?v=jQi8PEkKBWA" 
    },
    { 
      title: "Sunday Morning", 
      artist: "Maroon 5",
      youtubeLink: "https://www.youtube.com/watch?v=S2Cti12XBw4" 
    }
  ],
  surprised: [
    { 
      title: "Feel Good Inc", 
      artist: "Gorillaz",
      youtubeLink: "https://www.youtube.com/watch?v=HyHNuVaZJ-k" 
    },
    { 
      title: "Thriller", 
      artist: "Michael Jackson",
      youtubeLink: "https://www.youtube.com/watch?v=sOnqjkJTMaA" 
    },
    { 
      title: "Wake Me Up", 
      artist: "Avicii",
      youtubeLink: "https://www.youtube.com/watch?v=IcrbM1l_BoI" 
    },
    { 
      title: "Feel It Still", 
      artist: "Portugal. The Man",
      youtubeLink: "https://www.youtube.com/watch?v=pBkHHoOIIn8" 
    },
    { 
      title: "Pompeii", 
      artist: "Bastille",
      youtubeLink: "https://www.youtube.com/watch?v=F90Cw4l-8NY" 
    },
    { 
      title: "Levels", 
      artist: "Avicii",
      youtubeLink: "https://www.youtube.com/watch?v=_ovdm2yX4MA" 
    },
    { 
      title: "Can't Hold Us", 
      artist: "Macklemore & Ryan Lewis",
      youtubeLink: "https://www.youtube.com/watch?v=2zNSgSzhBfM" 
    },
    { 
      title: "Raise Your Glass", 
      artist: "Pink",
      youtubeLink: "https://www.youtube.com/watch?v=XjVNlG5cZyQ" 
    },
    { 
      title: "Dance Monkey", 
      artist: "Tones and I",
      youtubeLink: "https://www.youtube.com/watch?v=q0hyYWKXF0Q" 
    },
    { 
      title: "HandClap", 
      artist: "Fitz and The Tantrums",
      youtubeLink: "https://www.youtube.com/watch?v=Y2V6yjjPbX0" 
    }
  ],
  fearful: [
    { 
      title: "Brave", 
      artist: "Sara Bareilles",
      youtubeLink: "https://www.youtube.com/watch?v=QUQsqBqxoR4" 
    },
    { 
      title: "Firework", 
      artist: "Katy Perry",
      youtubeLink: "https://www.youtube.com/watch?v=QGJuMBdaqIw" 
    },
    { 
      title: "Roar", 
      artist: "Katy Perry",
      youtubeLink: "https://www.youtube.com/watch?v=CevxZvSJLk8" 
    },
    { 
      title: "Fight Song", 
      artist: "Rachel Platten",
      youtubeLink: "https://www.youtube.com/watch?v=xo1VInw-SKc" 
    },
    { 
      title: "Rise Up", 
      artist: "Andra Day",
      youtubeLink: "https://www.youtube.com/watch?v=kNFaRecnTxY" 
    },
    { 
      title: "A Sky Full of Stars", 
      artist: "Coldplay",
      youtubeLink: "https://www.youtube.com/watch?v=VPRjCeoBqrI" 
    },
    { 
      title: "Count on Me", 
      artist: "Bruno Mars",
      youtubeLink: "https://www.youtube.com/watch?v=6k8cpUkKK4c" 
    },
    { 
      title: "Beautiful", 
      artist: "Christina Aguilera",
      youtubeLink: "https://www.youtube.com/watch?v=eAfyFTzZDMM" 
    },
    { 
      title: "Rainbow", 
      artist: "Kacey Musgraves",
      youtubeLink: "https://www.youtube.com/watch?v=6OFv566mj7s" 
    },
    { 
      title: "You Will Be Found", 
      artist: "Dear Evan Hansen",
      youtubeLink: "https://www.youtube.com/watch?v=WFZmT29xdK0" 
    }
  ],
  disgusted: [
    { 
      title: "Lovely Day", 
      artist: "Bill Withers",
      youtubeLink: "https://www.youtube.com/watch?v=bEeaS6fuUoA" 
    },
    { 
      title: "Banana Pancakes", 
      artist: "Jack Johnson",
      youtubeLink: "https://www.youtube.com/watch?v=OkyrIRyrRdY" 
    },
    { 
      title: "Brown Eyed Girl", 
      artist: "Van Morrison",
      youtubeLink: "https://www.youtube.com/watch?v=UfmkgQRmmeE" 
    },
    { 
      title: "Island in the Sun", 
      artist: "Weezer",
      youtubeLink: "https://www.youtube.com/watch?v=erG5rgNYSdk" 
    },
    { 
      title: "Santeria", 
      artist: "Sublime",
      youtubeLink: "https://www.youtube.com/watch?v=AEYN5w4T_aM" 
    },
    { 
      title: "Tongue Tied", 
      artist: "Grouplove",
      youtubeLink: "https://www.youtube.com/watch?v=1x1wjGKHjBI" 
    },
    { 
      title: "Valerie", 
      artist: "Mark Ronson ft. Amy Winehouse",
      youtubeLink: "https://www.youtube.com/watch?v=d7PoRrLMwFg" 
    },
    { 
      title: "Put Your Records On", 
      artist: "Corinne Bailey Rae",
      youtubeLink: "https://www.youtube.com/watch?v=rjOhZZyn30k" 
    },
    { 
      title: "Budapest", 
      artist: "George Ezra",
      youtubeLink: "https://www.youtube.com/watch?v=VHrLPs3_1Fs" 
    },
    { 
      title: "Sunny", 
      artist: "Boney M",
      youtubeLink: "https://www.youtube.com/watch?v=yD8DcgpLp_w" 
    }
  ]
};
