// Events Page Data - Simple version with just image and name
interface EventPageItem {
  id: number
  title: string
  image: string
  type: "concert" | "international_carnival" | "graffiti" | "juggler_shows" | "kavi_sammelan"
}

const eventsPageData = {
  concert: [
    {
      id: 1,
      title: "Krsna",
      image: "https://kashiyatra.s3.eu-north-1.amazonaws.com/kr%24na.webp",
      type: "concert" as const
    },
    {
      id: 2,
      title: "Mohit Chauhan",
      image: "https://kashiyatra.s3.eu-north-1.amazonaws.com/mohit.webp",
      type: "concert" as const
    },
    {
      id: 3,
      title: "Bismil",
      image: "https://kashiyatra.s3.eu-north-1.amazonaws.com/Bismil.webp",
      type: "concert" as const
    }
  ],

  international_carnival: [
    {
      id: 4,
      title: "Seppe Sitar",
      image: "https://kashiyatra.s3.eu-north-1.amazonaws.com/sitarist.jpeg",
      type: "international_carnival" as const
    },
    {
      id: 6,
      title: "Coming Soon",
      image: "https://kashiyatra.s3.eu-north-1.amazonaws.com/question_mark.webp",
      type: "international_carnival" as const
    }
  ],

  graffiti: [
    {
      id: 7,
      title: "Doctortoy",
      image: "https://kashiyatra.s3.eu-north-1.amazonaws.com/doctortoy.jpg",
      type: "graffiti" as const
    },
  ],

  juggler_shows: [
    {
      id: 10,
      title: "Prashanth M",
      image: "https://kashiyatra.s3.eu-north-1.amazonaws.com/juggler.jpeg",
      type: "juggler_shows" as const
    },
  ],

  kavi_sammelan: [
    {
      id: 11,
      title: "Coming Soon",
      image: "https://kashiyatra.s3.eu-north-1.amazonaws.com/question_mark.webp",
      type: "kavi_sammelan" as const
    },
    {
      id: 12,
      title: "Coming Soon",
      image: "https://kashiyatra.s3.eu-north-1.amazonaws.com/question_mark.webp",
      type: "kavi_sammelan" as const
    }
  ]
}

export { eventsPageData }
export type { EventPageItem }