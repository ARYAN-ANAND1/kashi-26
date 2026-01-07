// import cut from "/cut.webp";
const cut="https://kashiyatra.s3.eu-north-1.amazonaws.com/PHOTO-2026-01-06-20-17-16.jpg";
// import advaita from "/advaita.webp"
import helm from "/helm.png";
import asmita from "/asmita.webp";
import auralia from "/auralia.webp";
import band from "/band.webp";
import bliss from "/bliss.webp";
import box from "/box.webp";
import cheshta from "/cheshta.webp";
import costume from "/costume.webp";
// import cypher from "/cypher.webp";
const cypher="https://kashiyatra.s3.eu-north-1.amazonaws.com/PHOTO-2026-01-06-20-17-25.jpg";
import ectasy from "/ectasy.webp";
// import enquizta from "/enquizta.webp"
import face from "/face.webp";
import glitz from "/glitz.webp";
import hullad from "/hullad.webp";
import ink from "/ink.webp";
import kriti from "/kriti.webp";
import live from "/live.webp";
import miss from "/miss.webp";
import mr from "/mr.webp";
import paper from "/paper.webp";
import poster from "/poster.webp";
import rangmanch from "/rangmanch.webp";
import rangriti from "/rangriti.webp";
// import razzma from "/razzma.webp";
import sanlayan from "/sanlayan.webp";
import script from "/script.webp";
import soap from "/soap.webp";
import spitfire from "/spitfire.webp";
import strumento from "/strumento.webp";
import sur from "/sur.webp";
import swar from "/swar.webp";
import tees from "/tees.webp";
import ashu from "/ashu.webp";
import cook from "/cook.webp";
import design from "/design.webp";
import improv from "/improv.webp";
import JAM from "/JAM.webp";
import jester from "/jester.webp";

import kissagoi from "/Kissagoi.webp";
// import quiz from "/quiz.webp";
// import debate from "/debate.webp";
// import nukkad_natak from "/nukkad_natak.webp";
// import group_dance from "/group_dance.webp";
// import solo_dance from "/solo_dance.webp";
// import mono_act from "/mono_act.webp";
// import sketching from "/sketching.webp";
// import open_mic from "/open_mic.webp";


import Madhurima from "/Madhurima.webp";
import raagsamar from "/raagsamar.webp";
import rapid from "/rapid.webp";
import tark from "/tark.webp";
import word from "/word.webp";

import tag from "/Tag Team.webp";

// import tag from "/tag Team.webp"

import battle from "/battle.webp";
import legend from "/legend.webp";
import food from "/food.webp";
import sport from "/sport.webp";
import india from "/india.webp";
import mela from "/mela.webp";
import general from "/general.webp";
import sci from "/sci.webp";

const countData: Record<
  number,
  { minparticipants: number; maxparticipants: number }
> = {
  23: { minparticipants: 3, maxparticipants: 8 },
  20: { minparticipants: 8, maxparticipants: 50 },
  2: { minparticipants: 2, maxparticipants: 2 },
  4: { minparticipants: 5, maxparticipants: 35 },
  1: { minparticipants: 5, maxparticipants: 10 },
  3: { minparticipants: 5, maxparticipants: 10 },
  9: { minparticipants: 2, maxparticipants: 50 },
  6: { minparticipants: 10, maxparticipants: 30 },
  7: { minparticipants: 3, maxparticipants: 12 },
  25: { minparticipants: 2, maxparticipants: 2 },
  32: { minparticipants: 3, maxparticipants: 5 },
  // "HIND, HINDI HINDUSTAN": { minparticipants: 1, maxparticipants: 3 },
  19: { minparticipants: 1, maxparticipants: 15 },
  // "ADVITA": { minparticipants: 3, maxparticipants: 10 },
  14: { minparticipants: 4, maxparticipants: 20 },
  11: { minparticipants: 3, maxparticipants: 10 },
  50: { minparticipants: 3, maxparticipants: 3 },
  48: { minparticipants: 3, maxparticipants: 3 },
  46: { minparticipants: 3, maxparticipants: 3 },
  49: { minparticipants: 3, maxparticipants: 3 },
  47: { minparticipants: 3, maxparticipants: 3 },
  51: { minparticipants: 3, maxparticipants: 3 },
  37: { minparticipants: 1, maxparticipants: 3 },
  36: { minparticipants: 4, maxparticipants: 4 },
  38: { minparticipants: 2, maxparticipants: 2 },
  39: { minparticipants: 4, maxparticipants: 4 },
  40: { minparticipants: 2, maxparticipants: 2 },
  43: { minparticipants: 2, maxparticipants: 2 },
  35: { minparticipants: 1, maxparticipants: 3 },
  44: { minparticipants: 2, maxparticipants: 2 },
  45: { minparticipants: 2, maxparticipants: 2 },
  52: { minparticipants: 1, maxparticipants: 3 },
};

const eventsData = {
  Natraj: [
    {
      title: "CUT-A-RUG",
      type: "Individual",
      description: "Western Solo Dance Competition",
      details:
        "Unleash your inner dancer and let the rhythm take over the stage! Cut A Rug is the ultimate Western Solo Dance Competition, where you have the chance to shine as a one-person powerhouse, captivating the audience with your moves, energy, and flair. This is your moment to showcase your individuality, creativity, and passion for dance.",
      image: cut,
      eventId: 0,
    },
    {
      title: "CYPHER OF MOBS ",
      type: "Team",
      description: "Street Dance Battle Competition",
      details:
        "The streets come alive with rhythm, passion, and raw energy in the Cypher of Mobs, where the battle for supremacy begins. This Street Battle is where every move counts, every beat drops with intensity, and every dancer showcases their unique style in a head-to-head showdown. If you've got the courage, the creativity, and the fire to rise above the crowd, then this is your arena",
      image: cypher,
      eventId: 1,
    },
    {
      title: "ECSTASY",
      type: "Team",
      description: "Duet Dance Competition",
      details:
        "Get ready to experience a symphony of movement, harmony, and rhythm as Ecstasy takes the stage. This Duet Dance Competition celebrates the power of connection, coordination, and creativity, where two dancers come together to weave a story through flawless synchronization and passion. In this competition, your bond as a pair will shine as brightly as your individual talent.",
      image: ectasy,
      eventId: 2,
    },
    // {
    //   title: "Razzmatazz",
    //   type: "Team",
    //   description: "Folk Dance Competition",
    //   details:
    //     "Razzmatazz, the Folk Dance Competition, calls upon you and your partner to unite in perfect harmony, armed with passion, precision, and the vibrant energy of folk dance. This is your chance to showcase the beauty of cultural storytelling through every step, every beat, and every movement.",
    //   image: razzma,
    //   eventId: 3,
    // },
    {
      title: "BLISS",
      type: "Team",
      description: "Group Dance Competition",
      details:
        "Talent is not rare, but the opportunity to showcase it is. Bliss, the Western Group Dance Competition, where creativity, energy, and precision come together in perfect harmony. This is your stage to shine, as you and your team set the floor ablaze with synchronized moves, electrifying beats, and an unmatched passion for dance",
      image: bliss,
      eventId: 4,
    },
    {
      title: "GLITZ",
      type: "Individual",
      description: "Solo Classical Dance",
      details:
        "Glitz is a celebration of grace, storytelling, and cultural heritage, offering solo performers the opportunity to showcase their mastery over the most elegant and soulful forms of dance. Whether it's the graceful fluidity of classical dance or the vibrant energy of folk traditions, this is your moment to shine and leave the audience spellbound.",
      image: glitz,
      eventId: 5,
    },
  ],
  Abhinay: [
    {
      title: "HULLAD",
      type: "Team",
      description: "Street Play",
      details:
        "In this fast-developing world, very few people have a natural taste for drama. If you can catch the attention & attract people to stay and watch your performance, here is your chance. The art of grabbing the audience's attention is all that you need. No lights, no mics, only pure action full of energy.",
      image: hullad,
      eventId: 6,
    },

    {
      title: "CHESTHA",
      type: "Team",
      description: "Mime",
      details:
        "In the midst of eternal silence where slightest of the sound was finding it very difficult to escape, those creatures in the shades of black and white were making statements with their mouth stitched and were gradually paving the path for the crowd to dive deep into the sea of joyride full of laughter and emotions Reliving those golden days when Charlie Chaplin and Marcel Marceau ruled at Kashiyatra un furl their hidden soul beneath you and let your mimed other chatters that won't stop ever.",
      image: cheshta,
      eventId: 7,
    },

    {
      title: "ASMITA",
      type: "Individual",
      description: "Mono Act",
      details:
        "In civilized life, where the happiness, and indeed almost the existence, of man, depends so much upon the opinion of his fellow men, he is always acting a studied part. In a Mono Act, an actor is vulnerable. His total personality is exposed to critical judgment - his intellect, his bearing, his diction, his whole appearance. If you can reveal your emotions in front of the audience, here is your chance. ",
      image: asmita,
      eventId: 8,
    },

    {
      title: "RANGMANCH",
      type: "Team",
      description: "Stage Play",
      details:
        "Do you have what it takes to dissolve an audience in an ocean of emotions and actions? The colourful lights, cameras & the audience are waiting for you. If you can make your expressions to the next level, then this is where you belong. The stage is set and waiting for your next grand act.",
      image: rangmanch,
      eventId: 9,
    },
  ],
  Bandish: [
    {
      title: "SUR",
      type: "Individual",
      description: "Classical Solo Singing",
      details:
        'SUR: The Solo Singing Event" is your opportunity to showcase your talent in Indian classical music. Whether through the enchanting allure of ragas or the rhythmic precision of taal, let your voice resonate with emotion and depth, captivating your audience and proving your mastery in this timeless art form. Step onto the stage, embrace the tradition, and leave a lasting impression.',
      image: sur,
      eventId: 10,
    },
    {
      title: "RAAGSAMAR",
      type: "Team",
      description: "Unplugged Band",
      details:
        "If you think you can enthrall the audience by singing on soft acoustic music if unplugged tunes are all you need to set the cool vibes around then don't miss the chance to participate in Unplugged!",
      image: raagsamar,
      eventId: 11,
    },
    {
      title: "SANLAYAN",
      type: "Individual",
      description: "Solo Percussion",
      details:
        "'Percussion Extravaganza' celebrates the art of rhythm, offering a platform for talented percussionists to showcase their mastery. From the tabla to the drums, experience the power of beats, precision, and energy that make percussion an unforgettable musical force.",
      image: sanlayan,
      eventId: 12,
    },
    {
      title: "KRITI",
      type: "Individual",
      description: "Original Music Competition",
      details:
        "Kriti is your chance to let your imagination and creativity flow in the form of a beautiful self-composed song. Stand out as that brilliantly clear solo is as you take control over the vocals and mesmerize the audience. The championship is awarded to the performer who presents the best and wins the hearts with their creation.",
      image: kriti,
      eventId: 13,
    },
    // {
    //     title: 'ADVAITA',
    //     type: 'Team',
    //     description: 'Battle of Bands',
    //     details: "If you think you can make the crowd forget themselves in your performance, then this is the place to be. With massive enthusiasm and fearsome competition, this event brings out the best in its participants striving for glory. If you have the band that can't lose and have a hunger for more, then come and perform against the most formidable bands in India. It is the battle of bands, and the clash is raging hotter than ever.",
    //     image: advaita
    // },
    {
      title: "SWAR SANGATI",
      type: "Team",
      description: "Indian Choir Competition",
      details:
        "Calling all passionate vocal ensembles! Step onto the grand stage of Swar Sangati, IIT BHU's premier choir competition. Unleash your harmonious prowess and celebrate the diversity of our musical heritage. Join this symphony of voices, where unity and artistic excellence blend, creating an unforgettable showcase of talent and cultural resonance.",
      image: swar,
      eventId: 14,
    },
  ],
  Crosswindz: [
    {
      title: "AURALIS",
      type: "Individual",
      description: "Solo Singing Competition",
      details:
        "Auralis is a premier solo singing competition that celebrates the magic of music, where participants are judged based on their performances across two vibrant genres—light music and western music.Offering an incredible platform for talented singers to showcase their vocal prowess.With a diverse audience and a panel of distinguished judges, the competition promises to be a thrilling experience that blends melody, creativity, and musicality",
      image: auralia,
      eventId: 15,
    },
    {
      title: "STRUMENTO",
      type: "Individual",
      description: "Non-Percussion Instrumental Competition",
      details:
        "Harmonic Fest is an exquisite celebration of musical artistry, offering a distinguished platform for virtuoso instrumentalists to display their exceptional craftsmanship. This elegant event invites musicians to perform on a range of non-percussion instruments, including the refined strings of the guitar and violin, the resonant keys of the piano and keyboards, and the delicate, melodic tones of wind instruments such as the flute and harmonica.",
      image: strumento,
      eventId: 16,
    },
    {
      title: "SPITFIRE",
      type: "Individual",
      description: "Rap Battle",
      details:
        "Welcome to SPITFIRE, where words cut deeper than swords, and every verse is a battlefield. This is not just a rap battle—it's a test of intellect, rhythm, and presence. A stage where raw talent meets razor-sharp wordplay, and only the elite will rise",
      image: spitfire,
      eventId: 17,
    },
    {
      title: "BOX-BLITZ",
      type: "Individual",
      description: "Beatboxing Competition",
      details:
        "Beatboxers, this is your battleground! It's time to push the limits of sound, creativity, and rhythm on the grand stage of BOX-BLITZ, IIT BHU's premier beatboxing competition. Here, it's not just about the beats—it's about domination, innovation, and leaving your mark.",
      image: box,
      eventId: 18,
    },
    {
      title: "BATTLE OF BANDS",
      type: "Team",
      description: "Band Competition",
      details:
        "Brace yourself for an explosive musical battle where genres collide, boundaries are shattered, and only the fiercest performers rise to the top. As the flagship event of Crosswindz, Battle of the Bands is a celebration of raw talent, electrifying energy, and pure sonic power. From the intricate melodies of classical fusion to the relentless intensity of metal, every performance is a revolution in sound.",
      image: band,
      eventId: 19,
    },
  ],
  Mirage: [
    {
      title: "DESIGN ELEGANTE",
      type: "Team",
      description: "Fashion Design Competition",
      details:
        "Enter a realm where elegance meets innovation and artistry knows no bounds at Design Elegante, the most anticipated designer show of the year. This isn't just a fashion show—it's a celebration of creativity, craftsmanship, and the transformative power of design.",
      image: design,
      eventId: 20,
    },
    {
      eventId: 21,
      title: "MR. KY",
      type: "Individual",
      description: "Male Pageant Show",
      details:
        "Everyone dreams of standing out—whether it's the charisma of Mr. India or the iconic presence of Mr. Universe. Now, it's time to take the first step toward turning that dream into reality. Welcome to Mr. KY, an exclusive competition where you have the chance to define your legacy and make a statement like never before.",
      image: mr,
    },
    {
      eventId: 22,
      title: "MISS KY",
      type: "Individual",
      description: "Female Pageant Show",
      details:
        "The stage will ignite with the arrival of the bold, dynamic, and unforgettable women of the country. Miss KY is your chance to shine, to step into the spotlight, and to turn your dream of becoming a pageant queen into reality",
      image: miss,
    },
    {
      eventId: 23,
      title: "COSTUME DESIGN",
      type: "Team",
      description: "Creative Costume Making",
      details:
        "Step into a world where creativity knows no bounds and fashion becomes a canvas for storytelling. The Costume Design event is a celebration of artistic brilliance and craftsmanship, where every stitch, color, and fabric choice combine to create a work of art. Here, visionaries take their concepts and transform them into show-stopping designs, blending history, fantasy, and contemporary themes into unforgettable masterpieces.",
      image: costume,
    },
  ],
  Samwaad: [
    {
      title: "SCRIPTURESQUE",
      type: "Individual",
      description: "Creative Writing Contest",
      details:
        "Step into the world of words and let your imagination soar in Scripturesque, where creativity meets the power of storytelling. This is your chance to weave stories, paint vivid images with your language, and explore the boundless world of possibilities that writing offers. Whether you're a master of prose, poetry, or the art of crafting compelling narratives, Scripturesque is the stage where your words will come to life.",
      image: script,
      eventId: 24,
    },
    {
      title: "What's The Word?",
      type: "Team",
      description: "Word Puzzle Challenge",
      details:
        "Step into What's The Word? and put your word-solving skills to the test. Whether it's unscrambling letters, cracking cryptic clues, or deciphering riddles, each challenge will push the limits of your vocabulary and quick thinking.",
      image: word,
      eventId: 25,
    },
    {
      title: "मधुरिमा",
      type: "Individual",
      description: "Hindi Poetry Slam",
      details:
        "Step into a realm where words transform into magic—मधुरिमा, the Hindi Poetry Slam, is your chance to craft and deliver verses that stir hearts and awaken minds. Here, the rhythm of your language becomes a powerful medium to express passion, provoke thought, and leave a lasting impact. In मधुरिमा, your words will not just be heard, but felt, resonating deep within the souls of all who listen.",
      image: Madhurima,
      eventId: 26,
    },
    {
      title: "THE LEGEND OF SIR SPEAK-A-LOT",
      type: "Individual",
      description: "Elocution Poetry Contest",
      details:
        "In this legendary battle, your voice is your weapon, and your words are your legacy. Whether you're delivering an evocative poem or a compelling speech, you'll be challenged to blend precision with passion, clarity with emotion, creating a performance that resonates long after the final word is spoken. The Legend of Sir Speak-A-Lot is a competition that merges the art of elocution with the rhythm of poetry, crafting a stage for those who possess the power to captivate with their voice. It's here that language transforms into magic, and the sheer force of expression takes the spotlight.",
      image: legend,
      eventId: 27,
    },
    {
      title: "Battlefront",
      type: "Individual",
      description: "English Debate Competition",
      details:
        "Step into the arena where intellect reigns and words are your greatest weapon—Battlefront, the ultimate English Debate competition, is a war of ideas where only the sharpest minds survive. Here, every argument, every point, and every rebuttal is a chance to showcase your power of persuasion and your mastery over language.",
      image: battle,
      eventId: 28,
    },
    {
      title: "Just A Minute!",
      type: "Individual",
      description: "One Minute Talk",
      details:
        "Get ready for an exhilarating, fast-paced challenge in Just A Minute! Channeling the excitement of the famous BBC Radio 4 show, this event tests your ability to speak on a given topic without hesitation, deviation, or repetition. Compete individually and stay on your toes as you try to outwit your opponents, avoid mistakes, and be the last one speaking after the one-minute mark.",
      image: JAM,
      eventId: 29,
    },
    {
      title: "तर्कसंगत",
      type: "Individual",
      description: "Hindi Debate Contest",
      details:
        "Welcome to तर्कसंगत, where the sharpness of your intellect and the power of your words will be tested like never before. It's not enough to simply speak. You must engage, persuade, and captivate your audience with the power of Hindi. Each word you utter will carry weight as you argue your stance with precision, clarity, and wit. Every statement is an opportunity to sway the judges, and every rebuttal could make or break your case. This is not just another debate; it's a battlefield where logic, eloquence, and the rich essence of Hindi combine to shape the future of ideas.",
      image: tark,
      eventId: 30,
    },
    {
      title: "क़िस्सागोई",
      type: "Individual",
      description: "Hindi Story Telling",
      details:
        "क़िस्सागोई, where words weave magic, emotions take flight, and stories come alive! This event celebrates the rich tradition of Hindi storytelling, bringing together passionate narrators and eager listeners for an unforgettable experience. Whether you have a tale of nostalgia, an epic saga, or a heartwarming anecdote, this is your stage to mesmerize the audience with the power of words. Let your voice paint vivid landscapes, evoke deep emotions, and transport everyone to another time and place.",
      image: kissagoi,
      eventId: 31,
    },
    {
      title: "Improv Comedy",
      type: "Team",
      description: "Spontaneous Comedy Show",
      details:
        "Get ready for a rollercoaster of laughter where anything can happen and everything is made up on the spot! Welcome to Improv Comedy, where quick wit, wild creativity, and audience suggestions fuel spontaneous, side-splitting performances. Whether you're here to perform, suggest, or simply laugh till your stomach hurts, Improv Comedy promises a night of energy, spontaneity, and non-stop fun. Come be a part of the madness—because in improv, the only rule is to say YES!",
      image: improv,
      eventId: 32,
    },
    {
      title: "आशुभाषण",
      type: "Individual",
      description: "Image Based Speaking",
      details:
        "Every picture holds a hidden story, waiting to be told. This is your stage to showcase creativity, quick thinking, and powerful expression! You will be shown a thought-provoking image and given one minute to analyze it. Then, in just two minutes, you must present your unique interpretation with confidence and clarity. The challenge lies in your ability to think spontaneously, craft a compelling narrative, and engage the audience.",
      image: ashu,
      eventId: 33,
    },
    {
      title: "A Jester's Court",
      type: "Individual",
      description: "Stand-up Comedy Show",
      details:
        "Welcome to A Jester's Court, where the mic is your sword, laughter is your power, and the crowd is your kingdom! This stand-up comedy face-off invites participants to craft and deliver a side-splitting set-in front of a live, interactive audience.",
      image: jester,
      eventId: 34,
    },
    {
      title: "हिंद, हिंदी, हिंदुस्तान",
      type: "Team",
      description: "Indian Helm Quiz",
      details:
        "Step into the heart of India’s legacy with An Indian Helm Quiz—a thrilling journey that delves deep into the country’s rich history, the evolution of its language, the brilliance of its literature, and the enchanting realms of its mythology. This is your opportunity to challenge your intellect and uncover the wisdom that has shaped one of the world’s oldest civilizations.",
      image: helm,
      eventId: 52,
    },
  ],
  Toolika: [
    {
      title: "Rangriti",
      type: "Team",
      description: "The art of colors",
      details:
        " Unleash your creativity and bring colors to life in Rangriti, the Rangoli-making competition! This is your chance to showcase the perfect blend of tradition and artistry as you transform plain surfaces into mesmerizing works of art. Whether you prefer intricate patterns, cultural motifs, or modern designs, Rangriti is the ultimate platform to display your imagination through vibrant colors.",
      image: rangriti,
      eventId: 35,
    },
    {
      title: "Rapid Fire",
      type: "Team",
      description: "Quick art under pressure",
      details:
        "Ultimate challenge where speed meets creativity in a test of artistic brilliance! In this high-energy event, you'll face a series of rapid prompts and only a limited time to transform your ideas into vibrant masterpieces. Whether you're sketching, painting, or sculpting, the clock is ticking! Each prompt will push you to think quickly, yet thoughtfully, creating stunning art under pressure. It's not just about finishing fast it's about bringing your best creative instincts to life in record time.",
      image: rapid,
      eventId: 36,
    },
    {
      title: "Spoil The Tees!",
      type: "Team",
      description: "Paint unique T-shirt designs",
      details:
        "Are you ready to turn a plain T-shirt into a bold expression of art? Spoil The Tees, where creativity and fashion collide! In this event, you'll take a blank T-shirt and transform it into a one-of-a-kind masterpiece with your paintbrush and imagination.",
      image: tees,
      eventId: 37,
    },
    {
      title: "Face Painting",
      type: "Team",
      description: "Creative facial art designs",
      details:
        "Welcome to Paint the Face, where your face becomes your canvas! In this event, you'll take face painting to the next level by transforming your face into a stunning, one-of-a-kind masterpiece using bold strokes, vibrant colors, and limitless creativity. From playful animals to intricate designs, or abstract art that speaks to your soul—the sky's the limit! Get ready to wear your art, express yourself like never before, and showcase your unique vision in every brushstroke.",
      image: face,
      eventId: 38,
    },
    {
      title: "Vastra Shilp  ",
      type: "Team",
      description: "Paper costume design competition",
      details:
        "Fashion is art, and you are the canvas- Velvet Paper. So, wake up the Coco Chanel inside you and let your creativity do the talking. Weave out art and style with the fabrics of your imagination and yeah paper ",
      image: paper,
      eventId: 39,
    },
    {
      title: " Soap Carving ",
      type: "Team",
      description: "Creative soap art designs",
      details:
        "I saw the angel in the marble and carved until I set him free.—Michelangelo. Though carving stone is tough, carving soap is easy. That's why we give you soap. Just carve your creativity out on these mundane pieces of soap and transform them into pieces of art. ",
      image: soap,
      eventId: 40,
    },
    {
      title: "Live Sketching ",
      type: "Individual",
      description: "Real-time scene sketching",
      details:
        "Individual where participants need to sketch a scene in front of them. The scene will be a wide area to accommodate all the participants from different Institutes simultaneously and to add variations to their submissions.",
      image: live,
      eventId: 41,
    },
    {
      title: "Aether And Ash  ",
      type: "Individual",
      description: "Creative poster making competition",
      details:
        "Every stroke tells a story; every shade speaks a message. This poster-making competition challenges your artistic instincts and your ability to visually communicate powerful ideas. With paints or Charcoal as your tools, create a masterpiece that resonates with the given theme. Let your creativity take the spotlight! ",
      image: poster,
      eventId: 42,
    },
    {
      title: "INK IT",
      type: "Team",
      description: "Design unique tattoos",
      details:
        "Design a unique tattoo with some fantastic ideas, artwork and style. Get ready to define the concept of body art! ",
      image: ink,
      eventId: 43,
    },
  ],
  Zaika: [
    {
      title: "COOK OFF ",
      type: "Team",
      description: "Timed cooking challenge",
      details:
        "Get ready to unleash your inner chef in the Cook Off, a timed cooking competition where creativity meets culinary skills! Participants will be provided with a fixed pantry of ingredients and a theme to inspire their dish. The challenge To create a delicious masterpiece within the time limit, using only what's available in the pantry. ",
      image: cook,
      eventId: 44,
    },
    {
      title: "TAG TEAM ",
      type: "Team",
      description: "Team cooking relay race",
      details:
        "Get ready for a team-based cooking relay in Tag Team, where culinary skills, teamwork, and time management are put to the ultimate test! This exciting challenge will see teams rotating every 15 minutes—only one team member can cook at a time. Each participant must work together to create a unified dish while maintaining speed and precision under pressure.",
      image: tag,
      eventId: 45,
    },
  ],
  Enquizta: [
    {
      title: "India Quiz",
      type: "Team",
      description: "Explore India’s rich heritage",
      details:
        "India Quiz is a thrilling test of knowledge covering India's history, culture, politics, sports, and more. It challenges participants with engaging questions, sparking curiosity and awareness. From ancient heritage to modern achievements, the quiz celebrates India's diversity, making it an exciting and enlightening experience for all trivia enthusiasts.",
      image: india,
      eventId: 46,
    },
    {
      title: "MELA Quiz",
      type: "Team",
      description: "Music, Entertainment, Literature, Arts",
      details:
        "MELA Quiz is a vibrant and dynamic quiz celebrating Music, Entertainment, Literature, and Arts. It tests participants’ knowledge of films, music, books, pop culture, and artistic milestones. With exciting rounds and diverse questions, MELA Quiz is a treat for enthusiasts who love exploring the creative and cultural world of entertainment.",
      image: mela,
      eventId: 47,
    },
    {
      title: "General Quiz",
      type: "Team",
      description: "Wide-ranging knowledge challenge",
      details:
        "General Quiz is an exciting test of knowledge covering a wide range of topics, including history, science, sports, politics, entertainment, and current affairs. With diverse and thought-provoking questions, it challenges participants to think critically and stay informed, making it a thrilling experience for quiz enthusiasts of all backgrounds.",
      image: general,
      eventId: 48,
    },
    {
      title: "Sports Quiz",
      type: "Team",
      description: "Ultimate sports knowledge test",
      details:
        "Sports Quiz is an exhilarating competition that tests participants' knowledge of various sports, legendary athletes, iconic moments, records, and tournaments. Covering everything from cricket and football to the Olympics and beyond, it challenges sports enthusiasts to showcase their passion and expertise in a thrilling and competitive environment.",
      image: sport,
      eventId: 49,
    },
    {
      title: "Sci-Biz-Tech Quiz",
      type: "Team",
      description: "Science, business, and technology",
      details:
        "Sci-Biz-Tech Quiz is a dynamic competition that blends science, business, and technology. It challenges participants with questions on groundbreaking innovations, corporate strategies, and technological advancements. Perfect for those passionate about the intersection of these fields, this quiz offers an exciting platform to test knowledge and stay updated on global trends.",
      image: sci,
      eventId: 50,
    },
    {
      title: "Food Quiz",
      type: "Team",
      description: "Test your culinary knowledge",
      details:
        "Food Quiz is a deliciously engaging competition that tests participants' knowledge of cuisines, culinary techniques, ingredients, and food culture from around the world. Whether it’s identifying famous dishes or exploring food history, this quiz offers a fun and flavorful challenge for food enthusiasts and trivia lovers alike.",
      image: food,
      eventId: 51,
    },
  ],
  Zonals: [
    {
      title: "Paper Costume Design",
      type: "Individual",
      description: "Weave art and style from the fabrics of your imagination.",
      details:
        "Fashion is art, and you are the canvas- Velvet Paper. So, wake up the Coco Chanel inside you and let your creativity do the talking. Weave out art and style with the fabrics of your imagination and yeah paper",
      image: "https://res.cloudinary.com/dh0c7gmeo/image/upload/v1761535218/org_site/jxljuydtunyppfxcbnbj.webp",
      eventId: 101,
    },
    {
      title: "Face Painting",
      type: "Individual",
      description:
        "Transform your face into a stunning, one-of-a-kind masterpiece.",
      details:
        "Welcome to Paint the Face, where your face becomes your canvas! In this event, you'll take face painting to the next level by transforming your face into a stunning, one-of-a-kind masterpiece using bold strokes, vibrant colors, and limitless creativity. From playful animals to intricate designs, or abstract art that speaks to your soul—the sky's the limit! Get ready to wear your art, express yourself like never before, and showcase your unique vision in every brushstroke.",
      image: "https://res.cloudinary.com/dh0c7gmeo/image/upload/v1761535217/org_site/t7wunimvwlzqqgygkxla.webp",
      eventId: 102,
    },
    {
      title: "Sketching",
      type: "Individual",
      description:
        "Capture a live scene designed to challenge perspective and detail.",
      details:
        "Unleash your creativity and observation skills as you put pencil to paper in this individual sketching event. Participants will capture a live scene set in an open area designed to challenge perspective and detail. You will sketch side by side and reflect your own unique viewpoint, making the experience as diverse as it is inspiring.",
      image: "https://res.cloudinary.com/dh0c7gmeo/image/upload/v1761535218/org_site/lqaqoo0zbps9i4ldld5n.webp",
      eventId: 103,
    },
    {
      title: "Solo Dance",
      type: "Individual",
      description: "Captivate the audience with your moves, energy, and flair.",
      details:
        "Unleash your inner dancer and let the rhythm take over the stage! In Solo Dance Competition, you have the chance to shine as a one-person powerhouse, captivating the audience with your moves, energy, and flair. This is your moment to showcase your individuality, creativity, and passion for dance.",
      image: "https://res.cloudinary.com/dh0c7gmeo/image/upload/v1761535218/org_site/rrip6unnjmgcpwrkyyl4.webp",
      eventId: 104,
    },
    {
      title: "Mono Act",
      type: "Individual",
      description:
        "Reveal your emotions and expose your total personality on stage.",
      details:
        "In civilized life, where the happiness, and indeed almost the existence, of man, depends so much upon the opinion of his fellow men, he is always acting a studied part. In a Mono Act, an actor is vulnerable. His total personality is exposed to critical judgment - his intellect, his bearing, his diction, his whole appearance. If you can reveal your emotions in front of the audience, here is your chance.",
      image: "https://res.cloudinary.com/dh0c7gmeo/image/upload/v1761535218/org_site/gt44rxpfgauvcsqp3hej.webp",
      eventId: 105,
    },
    {
      title: "Mr. and Ms. Oriental",
      type: "Individual",
      description:
        "An exclusive competition where charm meets confidence and talent meets grace.",
      details:
        "Everyone dreams of standing out—whether it's the charisma of Mr. India, the iconic presence of Mr. Universe, or the elegance of a pageant queen—and now it’s your time to turn that dream into reality. Welcome to Mr. & Ms. Oriental, an exclusive competition where charm meets confidence, talent meets grace, and legacies are defined. The stage will ignite with bold, dynamic, and unforgettable personalities ready to shine, step into the spotlight, and make a statement like never before.",
      image: "https://res.cloudinary.com/dh0c7gmeo/image/upload/v1761535217/org_site/q1wxnd0cmoeohtksr5aj.webp",
      eventId: 106,
    },
    {
      title: "Group Dance",
      type: "Team",
      description:
        "Set the floor ablaze with synchronized moves and electrifying beats.",
      details:
        "Talent is not rare, but the opportunity to showcase it is. The Group Dance Competition, where creativity, energy, and precision come together in perfect harmony. This is your stage to shine, as you and your team set the floor ablaze with synchronized moves, electrifying beats, and an unmatched passion for dance",
      image: "https://res.cloudinary.com/dh0c7gmeo/image/upload/v1761535219/org_site/htlvxvz09nkzgj8uh9cn.webp",
      eventId: 107,
    },
    {
      title: "Nukkad Natak",
      type: "Team",
      description: "Grab the audience's attention with pure action and energy.",
      details:
        "In this fast-developing world, very few people have a natural taste for drama. If you can catch the attention & attract people to stay and watch your performance, here is your chance. The art of grabbing the audience's attention is all that you need. No lights, no mics, only pure action full of energy.",
      image: "https://res.cloudinary.com/dh0c7gmeo/image/upload/v1761535219/org_site/trk5ox0at26dd5ggmtmz.webp",
      eventId: 108,
    },
    {
      title: "Debate",
      type: "Team",
      description: "A war of ideas where only the sharpest minds survive.",
      details:
        "Step into the arena where intellect reigns and words are your greatest weapon—Battlefront, the ultimate Debate competition, is a war of ideas where only the sharpest minds survive. Here, every argument, every point, and every rebuttal is a chance to showcase your power of persuasion and your mastery over language.",
      image: "https://res.cloudinary.com/dh0c7gmeo/image/upload/v1761535218/org_site/noezsi7io79nt2pbxkjk.webp",
      eventId: 109,
    },
    {
      title: "Quiz",
      type: "Team",
      description: "A war of ideas where only the sharpest minds survive.",
      details:
        "Step into the arena where intellect reigns and words are your greatest weapon—Battlefront, the ultimate Debate competition, is a war of ideas where only the sharpest minds survive. Here, every argument, every point, and every rebuttal is a chance to showcase your power of persuasion and your mastery over language.",
      image: "https://res.cloudinary.com/dh0c7gmeo/image/upload/v1761535218/org_site/appuazgr6fspwqerts9f.webp",
      eventId: 110,
    },
    {
      title: "Open Mic",
      type: "Individual",
      description: "This is your moment to own the stage.",
      details:
        "Step into the spotlight where creativity flows freely, boundaries fade, and talent takes center stage. This is not just a performance; it’s an experience where emotions echo, laughter resonates, and art comes alive. Unleash your inner artist, captivate the crowd, and let your voice leave an unforgettable mark.",
      image: "https://res.cloudinary.com/dh0c7gmeo/image/upload/v1761535218/org_site/kjeppgdz2nyb3qs1ee6t.webp",
      eventId: 111,
    },
    {
      title: "Solo Instrumental & Solo Music",
      type: "Individual",
      description: "This is your moment to own the stage.",
      details:
        "Showcase your musical brilliance in Solo Music & Instrumental, where rhythm meets melody and talent takes center stage. Whether you sing from the heart or let your instrument do the talking, this is your moment to shine. Captivate the audience with your passion, precision, and performance. Let your music echo the true spirit of Kashiyatra!",
      image: "https://res.cloudinary.com/dh0c7gmeo/image/upload/v1761535218/org_site/dvruiqzaljdsrjpfwkls.jpg",
      eventId: 111,
    },
  ],

  // Add other event categories here as needed
};

const contactData = {
  Natraj: [{ name: "Ansh", phone: "9919344094" },{ name: "Prashant", phone: "9430379435" }],
  Bandish: [{ name: "Masud", phone: "8787546047" },{ name: "Abhishek", phone: "7275423101" }],
  Abhinay: [{name: "Sachin",phone: "9664003430"},{ name: "Apoorv", phone: "6378461641" }],
  Crosswindz: [{ name: "Masud", phone: "8787546047" },{ name: "Abhishek", phone: "7275423101" }],
  Mirage: [{ name: "Saransh Mishra", phone: "9669577578" },{ name: "Siddharth Saxena", phone: "7007435313" }],
  Samwaad: [{ name: "Saransh Mishra", phone: "9669577578" },{ name: "Siddharth Saxena", phone: "7007435313" }],
  Toolika: [{name: "Sachin",phone: "9664003430"},{ name: "Apoorv", phone: "6378461641" }],
  Enquizta: [{ name: "Ansh", phone: "9919344094" },{ name: "Prashant", phone: "9430379435" }],
}

export { countData, eventsData, contactData };
