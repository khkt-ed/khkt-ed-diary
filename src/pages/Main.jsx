import { useEffect, useState, useRef } from "react";
import { Center, Container, Paper, Stack, Text, ActionIcon, ScrollArea, FileButton } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useLocalStorage } from "@mantine/hooks";
import { IconCameraPlus } from "@tabler/icons-react";
import dayjs from "dayjs";

const today = dayjs().startOf("day").toDate();

const quoteList = [
  {
      quote: "“The journey of a thousand miles begins with a single step.”",
      author: "—Lao Tzu"
  },
  {
      quote: "“If you can find a path with no obstacles, it probably doesn't lead anywhere.”",
      author: "—Frank A. Clark"
  },
  {
      quote: "“Those who mind don't matter and those who matter don't mind.”",
      author: "—Anonymous"
  },
  {
      quote: "“You can’t go back and make a new start, but you can start right now and make a brand new ending.”",
      author: "—James R. Sherman"
  },
  {
      quote: "“Don’t believe every worried thought you have. Worried thoughts are notoriously inaccurate.”",
      author: "—Renee Jain"
  },
  {
      quote: "“When everything seems to be going against you, remember that the airplane takes off against the wind, not with it.”",
      author: "—Henry Ford"
  },
  {
      quote: "“The greatest mistake we make is living in constant fear that we will make one.”",
      author: "—John C. Maxwell"
  },
  {
      quote: "“Stand up to your obstacles and do something about them. You will find that they haven’t half the strength you think they have.”",
      author: "—Norman Vincent Peale"
  },
  {
      quote: "“Take chances, make mistakes. That’s how you grow. Pain nourishes your courage. You have to fail in order to practice being brave.”",
      author: "—Mary Tyler Moore"
  },
  {
      quote: "“He who fears he shall suffer, already suffers what he fears.”",
      author: "—Michel de Montaigne"
  },
  {
      quote: "“You cannot make yourself feel something you do not feel, but you can make yourself do right in spite of your feelings.”",
      author: "—Pearl S. Buck"
  },
  {
      quote: "“The best thing one can do when it is raining, is to let it rain.”",
      author: "—Henry Wadsworth Longfellow"
  },
  {
      quote: "“Don’t let yesterday take up too much of today.”",
      author: "—Anonymous"
  },
  {
      quote: "“There are two ways to get rid of an anxiety monster, my friend—you either have a bath or a nap.”",
      author: "—Andrew Kaufman"
  },
  {
      quote: "“Going through things you never thought you’d go through will only take you places you never thought you’d get to.”",
      author: "—Morgan Harper Nichols"
  },
  {
      quote: "“You can’t stop the waves, but you can learn to surf.”",
      author: "—Jon Kabat-Zinn"
  },
  {
      quote: "“Comedy is defiance. It’s a snort of contempt in the face of fear and anxiety. And it’s the laughter that allows hope to creep back on the inhale.”",
      author: "—Will Durst"
  },
  {
      quote: "“Many of us feel stress and get overwhelmed not because we’re taking on too much, but because we’re taking on too little of what really strengthens us.”",
      author: "—Marcus Buckingham"
  },
  {
      quote: "“Anxiety is a lot like a toddler. It never stops talking, tells you you’re wrong about everything, and wakes you up at 3 am.”",
      author: "—Anonymous"
  },
  {
      quote: "“Don’t underestimate the value of Doing Nothing, of just going along, listening to all the things you can’t hear, and not bothering.”",
      author: "—A.A. Milne"
  },
  {
      quote: "“Calmness is the cradle of power.”",
      author: "—Josiah Gilbert Holland"
  },
  {
      quote: "“Anxiety happens when you think you have to figure out everything all at once. Breathe. You’re strong. You got this. Take it day by day.”",
      author: "—Karen Salmansohn"
  },
  {
      quote: "“In order to move on, you must understand why you felt what you did and why you no longer need to feel it.”",
      author: "—Mitch Albom"
  },
  {
      quote: "“Grant me the serenity to accept the things I cannot change, the courage to change the things I can, and the wisdom to know the difference.”",
      author: "—Reinhold Niebuhr"
  },
  {
      quote: "“You don’t drown by falling into water. You only drown if you stay there.”",
      author: "—Zig Ziglar"
  },
  {
      quote: "“There is no chance, no destiny, no fate, that can circumvent or hinder or control the firm resolve of a determined soul.”",
      author: "—Ella Wheeler Wilcox"
  },
  {
      quote: "“What lies behind us and what lies before us are tiny matters compared to what lies within us.”",
      author: "—Henry Stanley Haskins"
  },
  {
      quote: "“Sometimes the bad things that happen in our lives put us directly on the path to the most wonderful things that will ever happen to us.”",
      author: "—Nicole Reed"
  },
  {
      quote: "“The man who moves a mountain begins by carrying away small stones.”",
      author: "—Confucius"
  },
  {
      quote: "“I tell you the past is a bucket of ashes, so live not in your yesterdays, not just for tomorrow, but in the here and now.”",
      author: "—Carl Sandburg"
  },
  {
      quote: "“There must be quite a few things that a hot bath won’t cure, but I don’t know many of them.”",
      author: "—Sylvia Plath"
  },
  {
      quote: "“In the end, just three things matter: How well we have lived. How well we have loved. How well we have learned to let go.”",
      author: "—Jack Kornfield"
  },
  {
      quote: "“Become a worry-slapper. Treat frets like mosquitoes. Do you procrastinate when a bloodsucking bug lights on your skin? 'I'll take care of it in a moment.' Of course, you don't! You give the critter the slap it deserves. Be equally decisive with anxiety.”",
      author: "—Max Lucado"
  },
  {
      quote: "“Happiness is not a brilliant climax to years of grim struggle and anxiety. It is a long succession of little decisions simply to be happy in the moment.”",
      author: "—J. Donald Walters"
  },
  {
      quote: "“We all have anxiety about things. We all have little insecurities, but eventually you have to face your fears if you want to be successful, and everybody has some fear of failure.”",
      author: "—Nick Saban"
  },
  {
      quote: "“We live only a few conscious decades, and we fret ourselves enough for several lifetimes.”",
      author: "—Christopher Hitchens"
  },
  {
      quote: "“Our stresses, anxieties, pains and problems arise because we do not see the world, others or even ourselves as worthy of love.”",
      author: "—Prem Prakash"
  },
  {
      quote: "“We must be willing to get rid of the life we’ve planned, so as to have the life that is waiting for us.”",
      author: "—Joseph Campbell"
  },
  {
      quote: "“I know but one freedom and that is the freedom of the mind.”",
      author: "—Antoine de Saint-Exupery"
  },
  {
      quote: "“Good humor is a tonic for mind and body. It is the best antidote for anxiety and depression…It lightens human burdens. It is the direct route to serenity and contentment.”",
      author: "—Grenville Kleiser"
  },
  {
      quote: "“Actually spending ten minutes clearing off one shelf is better than fantasizing about spending a weekend cleaning out the basement.”",
      author: "—Gretchen Rubin"
  },
  {
      quote: "“For us, there is only the trying. The rest is not our business.”",
      author: "—T.S. Eliot"
  },
  {
      quote: "“When you walk through a storm hold your head up high, and don’t be afraid of the dark/At the end of the storm is a golden sky, and the sweet silver song of a lark.”",
      author: "—Oscar Hammerstein II"
  },
  {
      quote: "“Nothing is permanent in this wicked world—not even our troubles.”",
      author: "—Charlie Chaplin"
  },
  {
      quote: "“What else does anxiety about the future bring you but sorrow upon sorrow?”",
      author: "—Thomas á Kempis"
  },
  {
      quote: "“There are moments when all anxiety and stated toil are becalmed in the infinite leisure and repose of nature.”",
      author: "—Henry David Thoreau"
  },
  {
      quote: "“Maybe you have to know the darkness before you can appreciate the light.”",
      author: "—Madeleine L’Engle"
  },
  {
      quote: "“Worry in the dark can make it even darker.”",
      author: "—Camron Wright"
  },
  {
      quote: "“A crust eaten in peace is better than a banquet partaken in anxiety.”",
      author: "—Aesop"
  },
  {
      quote: "“The universe doesn’t allow perfection.”",
      author: "—Stephen Hawking"
  },
  {
      quote: "“The elimination diet: Remove anger, regret, resentment, guilt, blame and worry. Then watch your health, and life, improve.”",
      author: "—Charles Glassman"
  },
  {
      quote: "“Sometimes letting things go is an act of far greater power than defending or hanging on.”",
      author: "—Eckhart Tolle"
  },
  {
      quote: "“We ourselves feel that what we are doing is just a drop in the ocean. But the ocean would be less because of that missing drop.”",
      author: "—Mother Teresa"
  },
  {
      quote: "“Whatever happens to you belongs to you. Make it yours. Feed it to yourself even if it feels impossible to swallow. Let it nurture you because it will.”",
      author: "—Cheryl Strayed"
  },
  {
      quote: "“Rule number one: Don’t sweat the small stuff. Rule number two: It’s all small stuff.”",
      author: "—Robert S. Eliot"
  },
  {
      quote: "“Everyone remembers the remark of the old man at the point of death, that his life had been full of troubles—most of which had never happened.”",
      author: "—Winston Churchill"
  },
  {
      quote: "“You have dug your soul out of the dark, you have fought to be here; do not go back to what buried you.”",
      author: "—Bianca Sparacino"
  },
  {
      quote: "“Present fears are less than horrible imaginings.”",
      author: "—William Shakespeare"
  },
  {
      quote: "“You wouldn’t worry so much about what others think of you if you realized how seldom they do.”",
      author: "—Attributed to Eleanor Roosevelt"
  },
  {
      quote: "“Calm mind brings inner strength and self-confidence, so that’s very important for good health.”",
      author: "—Dalai Lama"
  },
  {
      quote: "“Surrender to what is, let go of what was, and have faith in what will be.”",
      author: "—Sonia Ricotti"
  },
  {
      quote: "“When you feel overwhelmed, remember: A little at a time is how it gets done. One thing, one task, one moment at a time.”",
      author: "—Anonymous"
  },
  {
      quote: "“The time to relax is when you don’t have time for it.”",
      author: "—Sydney J. Harris"
  },
  {
      quote: "“Tension is who you think you should be. Relaxation is who you are.”",
      author: "—Chinese proverb"
  },
  {
      quote: "“The great thing, then, in all education, is to make our nervous system our ally instead of our enemy.”",
      author: "—William James"
  },
  {
      quote: "“Nothing can bring you peace but yourself.”",
      author: "—Ralph Waldo Emerson"
  },
  {
      quote: "“Some days, doing ‘the best we can’ may still fall short of what we would like to be able to do, but life isn’t perfect—on any front—and doing what we can with what we have is the most we should expect of ourselves or anyone else.”",
      author: "—Fred Rogers"
  },
  {
      quote: "“It’s not stress that kills us, it is our reaction to it.”",
      author: "—Hans Selye"
  },
  {
      quote: "“A positive attitude gives you power over your circumstances instead of your circumstances having power over you.”",
      author: "—Joyce Meyer"
  },
  {
      quote: "“If we wanted to change the situation, we first had to change ourselves. And to change ourselves effectively, we first had to change our perceptions.”",
      author: "—Stephen Covey"
  },
  {
      quote: "“Your calm mind is the ultimate weapon against your challenges.”",
      author: "—Bryant McGill"
  },
  {
      quote: "“Worry often gives a small thing a big shadow.”",
      author: "—Swedish proverb"
  },
  {
      quote: "“The way you tell your story to yourself matters.”",
      author: "—Amy Cuddy"
  },
  {
      quote: "“If you don’t like something, change it. If you can’t change it, change your attitude.”",
      author: "—Maya Angelou"
  },
  {
      quote: "“My anxiety doesn't come from thinking about the future but from wanting to control it.”",
      author: "—Hugh Prather"
  },
  {
      quote: "“Almost everything will work again if you unplug it for a few minutes, including you.”",
      author: "—Anne Lamott"
  },
  {
      quote: "“If you can't fly, run. If you can't run, walk. If you can't walk, crawl, but by all means, keep moving.”",
      author: "—Martin Luther King, Jr."
  },
  {
      quote: "“It’s not time to worry yet.”",
      author: "—Harper Lee"
  },
  {
      quote: "“People become attached to their burdens sometimes more than the burdens are attached to them.”",
      author: "—George Bernard Shaw"
  },
  {
      quote: "“You don’t have to control your thoughts; you just have to stop letting them control you.”",
      author: "—Dan Millman"
  },
  {
      quote: "“Feelings come and go like clouds in a windy sky. Conscious breathing is my anchor.”",
      author: "—Thich Nhat Hanh"
  },
  {
      quote: "“Every time you are tempted to react in the same old way, ask if you want to be a prisoner of the past or a pioneer of the future.”",
      author: "—Deepak Chopra"
  },
  {
      quote: "“Anxiety was born in the very same moment as mankind. And since we will never be able to master it, we will have to learn to live with it— just as we have learned to live with storms.”",
      author: "—Paulo Coelho"
  },
  {
      quote: "“Life is ten percent what you experience and ninety percent how you respond to it.”",
      author: "—Anonymous"
  },
  {
      quote: "“Anxiety’s like a rocking chair. It gives you something to do, but it doesn't get you very far.”",
      author: "—Jodi Picoult"
  },
  {
      quote: "“Do what you can, with what you've got, where you are.”",
      author: "—Theodore Roosevelt"
  },
  {
      quote: "“Anxiety is the dizziness of freedom.”",
      author: "―Soren Kierkegaard"
  },
  {
      quote: "“Not everything that weighs you down is yours to carry.”",
      author: "—Anonymous"
  },
  {
      quote: "“Your mind will answer most questions if you learn to relax and wait for the answer.”",
      author: "—William S. Burroughs"
  },
  {
      quote: "“You cannot always control what goes on outside, but you can always control what goes on inside.”",
      author: "—Wayne Dyer"
  },
  {
      quote: "“Nothing in the affairs of men is worthy of great anxiety.”",
      author: "—Plato"
  },
  {
      quote: "“Just when the caterpillar thought the world was ending, he turned into a butterfly.”",
      author: "—Anonymous proverb"
  },
  {
      quote: "“Nothing diminishes anxiety faster than action.”",
      author: "—Walter Anderson"
  },
  {
      quote: "“Anxiety is a thin stream of fear trickling through the mind. If encouraged, it cuts a channel into which all other thoughts are drained.”",
      author: "—Arthur Somers Roche"
  },
  {
      quote: "“We must have a pie. Stress cannot exist in the presence of a pie.”",
      author: "—David Mamet"
  },
  {
      quote: "“How much pain have cost us the evils which have never happened.”",
      author: "—Thomas Jefferson"
  },
  {
      quote: "“Anxiety does not empty tomorrow of its sorrows, but only empties today of its strength.”",
      author: "—Charles Spurgeon"
  },
  {
      quote: "“There is only one way to happiness and that is to cease worrying about things which are beyond the power of our will.”",
      author: "—Epictetus"
  },
  {
      quote: "“I just give myself permission to suck…I find this hugely liberating.”",
      author: "—John Green"
  },
  {
      quote: "“Stress is an ignorant state. It believes that everything is an emergency. Nothing is that important.”",
      author: "—Natalie Goldberg"
  },
  {
      quote: "“No need to hurry. No need to sparkle. No need to be anybody but oneself.”",
      author: "—Virginia Woolf"
  },
];

const emptyDateData = () => {
  return {
    content: "",
    img: ""
  };
};

const imgToBase64 = img => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(img);
    reader.onload = () => resolve(reader.result?.toString() || "");
    reader.onerror = error => reject(error);
  })
}

const Main = props => {
  const [selectedDateObject, setSelectedDateObject] = useState({
    date: today,
    data: JSON.parse(localStorage.getItem("big-d"))?.[today] || emptyDateData()
  });
  const [bigD, setBigD] = useLocalStorage({
    key: "big-d",
    defaultValue: JSON.parse(localStorage.getItem("big-d")) || {
      [selectedDateObject.date]: selectedDateObject.data
    }
  });

  const textField = useRef(null);

  const [currentQuote, setCurrentQuote] = useLocalStorage({ key: "current-quote" });

  useEffect(() => {
    textField.current.innerText = selectedDateObject.data.content;
    
    if (!localStorage.getItem("last-time")) {
      localStorage.setItem("last-time", dayjs());
    }

    if (!localStorage.getItem("current-quote")) {
      setCurrentQuote(Math.floor(Math.random() * 101));
    }
  }, []);

  useEffect(() => {
    setBigD({
      ...bigD,
      [selectedDateObject.date]: selectedDateObject.data
    })
  }, [selectedDateObject])

  useEffect(() => {
    const interval = setInterval(() => {
      const now = dayjs();
      if (dayjs(localStorage.getItem("last-time")).date() !== dayjs(now).date()) {
        localStorage.setItem("last-time", now);
        setCurrentQuote(Math.floor(Math.random() * 101));
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="main">
      <Center
        h="10vh"
        sx={{
          backgroundColor: "hsl(185, 100%, 50%, 0.2)"
        }}
      >
        <DatePickerInput
          size="md"
          value={selectedDateObject.date}
          maxDate={today}
          onChange={value => {
            textField.current.innerText = bigD[value]?.content || "";
            setSelectedDateObject({ date: value, data: bigD[value] || emptyDateData() });
          }}
          styles={{
            input: {
              backgroundColor: "#11ffee00",
              borderColor: "#11ffee00",
              border: 0,
              color: "white",
              fontSize: "1.5rem",
              transition: "0.3s",
              "&:hover": {
                color: "hsl(240, 41%, 42%)",
                backgroundColor: "white"
              }
            }
          }}
        />
      </Center>
      <Center h="90vh">
        <Paper w="50vw" h="85vh" p="1rem" pt="0.5rem" radius="lg" shadow="md" opacity="0.88">
          <Stack h="100%" justify="center" spacing={0}>
            <Container w="100%" fluid>
              <Text ml="3rem" size="3rem" fs="italic" sx={{ fontFamily: "'Great Vibes', cursive" }}>
                Daily Diary
              </Text>
            </Container>
            <Container mb="0.5rem" mr={0} maw="70%" fluid>
              <Text size="0.8rem">
                {quoteList[currentQuote]?.quote}
                <br />
                <span style={{ float: "right", marginRight: "2rem" }}>{quoteList[currentQuote]?.author}</span>
              </Text>
            </Container>
            <ScrollArea
              w="100%"
              type="auto"
              sx={{
                flex: 1,
                position: "relative",
                border: "2px solid black",
                borderRadius: "2%",
                backgroundImage: `url(${selectedDateObject.data.img})`,
                backgroundSize: "cover",
              }}>
              <div
                ref={textField}
                contentEditable
                onInput={event => {
                  setSelectedDateObject({
                    ...selectedDateObject,
                    data: {
                      ...selectedDateObject.data,
                      content: event.target.textContent
                    }
                  });
                }}
                style={{
                  width: "calc(50vw - 2 * 1rem - 2 * 2px)",
                  padding: "10px",
                  fontSize: "1.2rem",
                  outline: "none",
                  color: "white",
                  mixBlendMode: "exclusion",
                }}
              >
                
              </div>
              <FileButton
                size="2.5rem"
                accept="image/*"
                onChange={async value => {
                  setSelectedDateObject({
                    ...selectedDateObject,
                    data: {
                      ...selectedDateObject.data,
                      img: await imgToBase64(value)
                    }
                  })
                }}
                sx={{
                  position: "absolute",
                  right: 10,
                  bottom: 10,
                  color: "white",
                  mixBlendMode: "exclusion"
                }}
              >
                {buttonProps => 
                  <ActionIcon {...buttonProps}>
                    <IconCameraPlus size="2rem" />
                  </ActionIcon>
                }

              </FileButton>
            </ScrollArea>
          </Stack>
        </Paper>
      </Center>
    </div>
  );
};

export default Main;