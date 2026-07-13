"use strict";

const v=(word,definition,example)=>({word,definition,example});
const g=(title,rule,examples)=>({title,rule,examples});
const r=(title,summary,points,mainIdea)=>({title,summary,points,mainIdea});
const p=(sound,rule,words)=>({sound,rule,words});
const q=(text,options,answer,why)=>({type:"choice",text,options,answer,why});
const tf=(text,answer,why)=>({type:"tf",text,options:["True","False"],answer:answer?"True":"False",why});

const COVER_MAP={
  "app-cover":"assets/covers/app-cover.webp",
  "teacher-cover":"assets/covers/teacher-cover.webp",
  "unit-1":"assets/covers/unit-1.webp","unit-2":"assets/covers/unit-2.webp","unit-3":"assets/covers/unit-3.webp",
  "unit-4":"assets/covers/unit-4.webp","unit-5":"assets/covers/unit-5.webp","unit-6":"assets/covers/unit-6.webp",
  "hospital-cover":"assets/covers/hospital-cover.webp","story-cover":"assets/covers/story-cover.webp"
};
for(let u=1;u<=6;u++)for(let l=1;l<=4;l++)COVER_MAP[`lesson-${u}-${l}`]=`assets/covers/lesson-${u}-${l}.webp`;
for(let i=1;i<=4;i++)COVER_MAP[`hospital-${i}`]=`assets/covers/hospital-${i}.webp`;
for(let i=1;i<=5;i++)COVER_MAP[`story-${i}`]=`assets/covers/story-${i}.webp`;

const UNITS=[
  {
    id:1,title:"At the Track",theme:"Who am I? (Living healthy)",
    description:"Sports events, predictions, world records, and the habits of a supportive friend.",
    lifeSkill:"Fair participation, loyalty, perseverance, and healthy competition",cover:"unit-1",
    lessons:[
      {
        id:"1-1",title:"A Sports Event",subtitle:"Athletes, races, throwing, jumping, and measuring results",cover:"lesson-1-1",
        vocab:[
          v("athlete","a person who trains and takes part in sports","The athlete trains at the track."),
          v("event","one activity in a sports competition","The long jump is an exciting event."),
          v("compete","to try to win against other people","The girls compete in a running race."),
          v("distance","the space between two places or points","They measure the distance of the jump."),
          v("jump","to push your body up from the ground","Aya can jump very far."),
          v("measure","to find the size, length, distance, or time of something","We measure the race time in seconds."),
          v("medal","a metal award given to a winner","The winner gets a gold medal."),
          v("race","a competition to see who is the fastest","Sara runs in a 200-meter race."),
          v("throw","to send something through the air with your hand","Throw the ball as far as you can."),
          v("track","a special path used for running races","The athletes are running around the track."),
          v("win","to be the best in a game or competition","I hope our team will win.")
        ],
        phrases:["take part in a sports event","run around the track","throw the ball as far as you can","measure the distance","win a medal"],
        notes:["We compete in an event, but we compete against another person or team.","Use meters and kilometers for distance. Use seconds, minutes, and hours for time.","Win is a verb. Winner is the person who wins."],
        grammar:g("Talking about sports","Use the present continuous for actions happening now. Use can for ability.",[["Action now","The athletes are running now."],["Ability","She can jump high."],["Question","Can she throw far?"],["Short answer","Yes, she can."]]),
        reading:r("At the sports event","A child watches athletes run, jump, and throw at a sports event. Officials measure distances and race times before giving medals.",["Athletes compete in different events.","The running track is 800 meters around the field.","Officials measure how far athletes throw or jump.","The best athletes can win medals."],"Sports events need training, clear rules, and fair measurement."),
        questions:[q("Where do athletes run in a race?",["On a track","In a kitchen","In a hospital","Under the sea"],"On a track","Running races take place on a track."),q("What does an official use to find how far a ball travels?",["A measurement","A recipe","A secret","A rumor"],"A measurement","Distance tells us how far something travels."),tf("A medal is an award for a winner.",true,"A medal is given for achievement in a competition.")]
      },
      {
        id:"1-2",title:"Who Will Win?",subtitle:"Make predictions with will and won't",cover:"lesson-1-2",
        vocab:[
          v("prediction","an idea about what may happen in the future","My prediction is that Sara will win."),
          v("winner","the person who wins","The winner will be happy."),
          v("tired","needing rest after activity","Will the runners be tired?"),
          v("difficult","not easy to do","The long race will be difficult."),
          v("amazing","very surprising or excellent","The event will be amazing."),
          v("competition","an event in which people try to win","Our school has a sports competition."),
          v("hear","to notice sound with your ears","It won't be difficult to hear the whistle."),
          v("future","the time after now","We use will to talk about the future.")
        ],
        phrases:["I think she will win.","It won't be easy.","Will they be tired?","Yes, they will.","No, they won't."],
        notes:["Will does not change with I, he, she, we, or they.","Use will + base verb: will win, will be, will run.","The negative form is will not or won't.","Put will before the subject to make a question."],
        grammar:g("Future with will","Use will for predictions about the future. Use won't for negative predictions.",[["Positive","She will be happy."],["Negative","It won't be easy."],["Question","Will they be tired?"],["Answer","Yes, they will. / No, they won't."]]),
        reading:r("Predictions at Sports Day","Students look at the competitors and make predictions about the races and medals.",["A prediction is not a certain fact.","Will comes before the base verb.","Won't shows a negative future idea.","Short answers repeat will or won't."],"We can use evidence, such as training and past performance, to make a sensible prediction."),
        questions:[q("Complete: I think the athlete ___ win.",["will","is","did","has"],"will","Use will + base verb for a future prediction."),q("Choose the negative prediction.",["It won't be easy.","It is easy.","It was easy.","It has been easy."],"It won't be easy.","Won't is the negative form of will."),q("___ they be tired?",["Will","Do","Did","Are"],"Will","Start a future question with will."),tf("We say: She will wins.",false,"After will, use the base verb: She will win.")]
      },
      {
        id:"1-3",title:"Nesma and Sara",subtitle:"Training, friendship, conjunctions, and race times",cover:"lesson-1-3",
        vocab:[
          v("warm up","to prepare your body before exercise","Sara and Nesma warm up together."),
          v("support","to help and encourage someone","Nesma trains to support her friend."),
          v("come second","to finish directly after the winner","Sara came second in her last race."),
          v("try harder","to make a greater effort","She wants to try harder next time."),
          v("record","to write down information for later","Nesma records Sara's race times."),
          v("fit","healthy and strong because of exercise","Training helps Nesma get fit."),
          v("worried","unhappy because you think something bad may happen","Sara listens when Nesma feels worried."),
          v("snack","a small amount of food between meals","They take fruit as a healthy snack."),
          v("once","one time","Sara trains with her parents once at the weekend."),
          v("three times","on three occasions","They visit the track three times a week.")
        ],
        phrases:["three times a week","once at the weekend","train for a competition","record a race time","listen when a friend has a problem"],
        notes:["Use times to say how often: once, twice, three times.","Come second means finish immediately after the winner.","Support can mean helping, encouraging, or listening."],
        grammar:g("Joining ideas","Use and to add, but to contrast, because to give a reason, so to show a result, and or to give a choice.",[["and","I like running and jumping."],["but","I like running, but I'm not very fast."],["because","She trains because she has a race."],["so","It is hot, so we drink water."],["or","Do you like running or jumping?"]]),
        reading:r("Why is Nesma training?","Nesma trains at the track with her friend Sara. Sara is preparing for a 200-meter race, while Nesma helps by recording times, exercising with her, and offering support.",["Sara goes to the track four times a week in total.","She came second in her previous race in 35 seconds.","She wants to work harder and become faster.","The girls warm up, eat fruit, and drink water.","Nesma helps Sara because Sara is a good, supportive friend."],"A good friend supports you in both sport and everyday life."),
        questions:[q("How often does Sara go to the track in total?",["Four times a week","Once a month","Every two months","Only on Friday"],"Four times a week","She goes three times with Nesma and once with her parents."),q("Why does Nesma record Sara's times?",["To help track her progress","To spread a rumor","To skip training","To change the rules"],"To help track her progress","Race times show whether Sara is getting faster."),q("Choose the best conjunction: Sara trains hard ___ she has a competition.",["because","or","but","and"],"because","Because gives the reason."),tf("Sara won her last race.",false,"She came second in her last race.")]
      },
      {
        id:"1-4",title:"Good Friends and World Records",subtitle:"Friendship rules, measurement, and famous Egyptian records",cover:"lesson-1-4",
        vocab:[
          v("apologize","to say sorry for doing something wrong","Sherif apologized for telling the secret."),
          v("make fun of","to laugh at someone in an unkind way","Never make fun of your friends."),
          v("pressure","to try to make someone do something they do not want","Do not pressure a friend."),
          v("spread rumors","to pass unproven stories from person to person","Good friends do not spread rumors."),
          v("tell secrets","to share private information","Never tell your friend's secrets."),
          v("second","a unit used to measure a short time","Aya ran the race in 33 seconds."),
          v("centimeter","a small unit of distance","We measure a small jump in centimeters."),
          v("kilometer","a unit equal to one thousand meters","The cyclists rode 761 kilometers."),
          v("world record","the best recorded result in the world","Mohamed Salah set a world record."),
          v("line graph","a graph that shows how numbers change","The line graph shows Aya's race times.")
        ],
        phrases:["keep a secret","say sorry","set a world record","measure time","measure distance","get faster every month"],
        notes:["Seconds, minutes, and hours measure time.","Centimeters, meters, and kilometers measure distance.","On a time graph for a race, a lower time usually means a faster athlete.","Apologize is a verb; an apology is the thing you say."],
        grammar:g("Friendship rules","Use the base verb for a positive rule. Use never + base verb for a strong negative rule.",[["Positive","Listen to your friend's ideas."],["Positive","Support your friend."],["Negative","Never spread rumors."],["Advice","It is good to apologize."]]),
        phonics:p("c /k/ and c /s/","The letter c often sounds /k/ before a, o, and u, but it often sounds /s/ before e, i, and y.",["cat","coat","cup","cent","city","cycle"]),
        reading:r("Records and respect","Tamer becomes upset when a secret about his fear of water is shared. His friends later apologize. The unit also explores units of measurement and Egyptian world records.",["A secret should not be shared without permission.","A sincere apology can help repair a friendship.","Aya's falling race time shows she is getting faster.","Mohamed Salah scored 32 league goals in the 2017/2018 season.","Egypt's national team has won the Africa Cup of Nations seven times.","Egyptian cyclists created a heart-shaped GPS drawing over 761 kilometers."],"Personal success matters, but respect and support make achievement meaningful."),
        questions:[q("Which unit measures time?",["seconds","centimeters","meters","kilometers"],"seconds","Seconds measure time."),q("Which action belongs to a good friend?",["Keep a secret","Spread rumors","Pressure someone","Make fun of someone"],"Keep a secret","A good friend respects private information."),q("What did the cyclists draw on the map?",["A heart","A pyramid","A medal","A cat"],"A heart","Their GPS route made the shape of a heart."),tf("A falling race time can mean the runner is getting faster.",true,"The same distance in less time means greater speed.")]
      }
    ]
  },
  {
    id:2,title:"Body Matters",theme:"Who am I? (Living healthy)",
    description:"The heart, lungs, bones, muscles, protection, healthy choices, and digestion.",
    lifeSkill:"Preventative health, self-management, and appreciation of science",cover:"unit-2",
    lessons:[
      {
        id:"2-1",title:"Heart, Blood, and Lungs",subtitle:"How oxygen and nutrients move around the body",cover:"lesson-2-1",
        vocab:[
          v("heart","the organ that pumps blood around the body","The heart beats and pumps blood."),
          v("blood","the red liquid that carries oxygen and nutrients","Blood travels around the body."),
          v("oxygen","a gas that living things need","The lungs add oxygen to the blood."),
          v("nutrients","useful substances in food that help us grow","Blood carries nutrients to our cells."),
          v("artery","a blood vessel that carries blood away from the heart","An artery carries oxygenated blood."),
          v("vein","a blood vessel that carries blood toward the heart","A vein returns blood to the heart."),
          v("lungs","the organs used for breathing","Oxygen enters the blood in the lungs."),
          v("pump","to push liquid from one place to another","The heart pumps blood."),
          v("blood vessel","a tube that carries blood","Arteries and veins are blood vessels."),
          v("beat","one movement of the heart","Exercise makes the heart beat faster.")
        ],
        phrases:["pump blood around the body","carry oxygen and nutrients","travel back to the heart","add oxygen to the blood","connect to the heart"],
        notes:["Arteries usually carry blood away from the heart. Veins carry blood toward the heart.","Oxygenated means with oxygen.","The heart, lungs, and blood vessels work together as a system."],
        grammar:g("Explaining a process","Use the present simple for scientific facts and sequence words to show order.",[["Fact","The heart pumps blood."],["First","First, blood travels to the lungs."],["Then","Then, oxygen is added."],["Finally","Finally, the heart pumps it to the body."]]),
        reading:r("The journey of blood","The heart pushes blood to the lungs. The lungs add oxygen, and the oxygenated blood returns to the heart before traveling through arteries to the body.",["Blood carries oxygen and nutrients.","Veins return blood from the body to the heart.","The heart sends blood to the lungs.","The lungs add oxygen.","Arteries carry oxygenated blood to the rest of the body."],"The circulatory and respiratory systems work together to keep every part of the body supplied."),
        questions:[q("Where is oxygen added to the blood?",["In the lungs","In the skull","In the knee","In the stomach"],"In the lungs","The lungs add oxygen to the blood."),q("Which vessel carries blood toward the heart?",["A vein","An artery","A rib","A muscle"],"A vein","Veins return blood to the heart."),tf("Blood carries nutrients around the body.",true,"Blood transports both oxygen and nutrients.")]
      },
      {
        id:"2-2",title:"Bones, Muscles, and Protection",subtitle:"The skeleton, important organs, and safe plans",cover:"lesson-2-2",
        vocab:[
          v("skeleton","all the bones that support the body","The skeleton helps us stand and move."),
          v("bone","a hard part inside the body","The skull is a bone that protects the brain."),
          v("muscle","body tissue that moves bones","Muscles move our arms and legs."),
          v("organ","a body part with an important job","The heart is an organ."),
          v("skull","the bones around the brain","A helmet protects the skull."),
          v("rib","one of the curved bones around the chest","Ribs protect the heart and lungs."),
          v("jaw","the bone used to open and close the mouth","The jaw moves when we chew."),
          v("elbow","the joint in the middle of the arm","Elbow pads protect your elbows."),
          v("knee","the joint in the middle of the leg","Knee pads protect your knees."),
          v("helmet","hard equipment worn to protect the head","She wears a helmet when she cycles.")
        ],
        phrases:["protect the skull","wear knee pads","move the jaw","attached to bones","keep important organs safe"],
        notes:["Bones support and protect; muscles pull bones to create movement.","The skull protects the brain. Ribs protect the heart and lungs.","Use going to for a plan already decided."],
        grammar:g("Be going to","Use am/is/are going to + base verb for plans and intentions.",[["I","I'm going to wear a helmet."],["He","He's going to wear pads."],["Negative","He isn't going to go to the park."],["Question","Is she going to climb?"],["Answer","Yes, she is. / No, she isn't."]]),
        reading:r("Our movement and safety","Bones make a strong framework, muscles move them, and protective equipment keeps important body parts safe during activities.",["The skeleton supports the body.","Muscles attach to bones and move them.","The skull and ribs protect soft organs.","The jaw moves when we chew.","Helmets and pads reduce the risk of injury."],"Understanding the body helps us make safer choices."),
        questions:[q("Which bone protects the brain?",["The skull","The knee","The elbow","The jaw"],"The skull","The skull surrounds the brain."),q("Complete: She ___ going to wear a helmet.",["is","are","am","be"],"is","Use is with she."),tf("Muscles help move bones.",true,"Muscles pull and turn bones so the body can move.")]
      },
      {
        id:"2-3",title:"Healthy Choices",subtitle:"Breakfast, sleep, exercise, water, and a positive mood",cover:"lesson-2-3",
        vocab:[
          v("skip breakfast","to miss the morning meal","Do not skip breakfast before school."),
          v("stay up late","to remain awake after the usual bedtime","Staying up late can make you tired."),
          v("stay positive","to keep hopeful thoughts","Adam tries to stay positive."),
          v("be calm","to feel relaxed and not angry","A walk helps him be calm."),
          v("be in a good mood","to feel happy and cheerful","Exercise puts Dareen in a good mood."),
          v("have an argument","to disagree angrily with someone","Malak has an argument with a friend."),
          v("lifestyle","the way a person usually lives","A healthy lifestyle includes sleep and exercise."),
          v("cross","angry or annoyed","Laila feels tired and cross in the morning."),
          v("soda","a sweet fizzy drink","Water is healthier than soda."),
          v("piece","one item or part","Try to eat five pieces of fruit and vegetables.")
        ],
        phrases:["get enough sleep","eat fruit and vegetables","drink six cups of water","play outside every day","make a healthy choice"],
        notes:["How often asks about frequency. How much asks about an amount.","Try to + base verb means make an effort to do something.","Healthy choices affect both the body and the mood."],
        grammar:g("Frequency questions","Use how often with actions and how much with uncountable amounts.",[["Frequency","How often do you exercise?"],["Amount","How much water do you drink?"],["Habit","I always eat breakfast."],["Occasional habit","I sometimes stay up late."],["No habit","I never drink soda."]]),
        reading:r("Making healthy choices","Five children describe their habits. Some choices, such as exercise and enough sleep, improve health and mood; others, such as too many sweet snacks or staying up late, can cause problems.",["Breakfast gives energy for the morning.","Children need regular, sufficient sleep.","Outdoor play and exercise support health.","Fruit, vegetables, and water supply useful nutrients.","Talking about worries is better than hiding every problem."],"A few small daily choices create a healthier lifestyle."),
        questions:[q("What may happen after staying up late?",["You may feel tired and cross.","You grow a new bone.","You win a medal.","You become a surgeon."],"You may feel tired and cross.","Too little sleep affects energy and mood."),q("Choose the healthiest regular drink.",["Water","Soda","Candy","Salt"],"Water","Water supports many body functions without added sugar."),tf("Exercise can help a person be in a good mood.",true,"Physical activity can improve mood.")]
      },
      {
        id:"2-4",title:"Digestion",subtitle:"How the body breaks down food and absorbs nutrients",cover:"lesson-2-4",
        vocab:[
          v("digestion","the process of breaking food down so the body can use it","Digestion begins in the mouth."),
          v("chew","to crush food with the teeth","We chew food before we swallow."),
          v("swallow","to move food from the mouth toward the stomach","Muscles help us swallow."),
          v("saliva","a liquid made in the mouth","Saliva helps soften food."),
          v("tongue","the muscle in the mouth used for tasting and moving food","The tongue helps move food."),
          v("stomach","the organ where food is mixed and broken down","Stomach acid breaks down food."),
          v("absorb","to take a substance into the body","The body absorbs useful nutrients."),
          v("break down","to make something into smaller parts","The body breaks down food."),
          v("stomach acid","a special liquid that helps digest food","Stomach acid works inside the stomach."),
          v("energy","the power needed for activity and growth","Food gives the body energy.")
        ],
        phrases:["put food in the mouth","chew with the teeth","push food to the stomach","break food down","absorb the nutrients"],
        notes:["Chew is what teeth and jaw do; swallow is moving food down from the mouth.","Break down is a phrasal verb.","Digest is the verb; digestion is the noun."],
        grammar:g("Process sequence","Use first, next, then, and finally to explain steps in order.",[["First","First, food enters the mouth."],["Next","Next, we chew it."],["Then","Then, we swallow it."],["Finally","Finally, the body absorbs nutrients."]]),
        phonics:p("oo","The letters oo can make the long /uː/ sound or the short /ʊ/ sound.",["food","mood","school","book","cook","good"]),
        reading:r("What happens to food?","Digestion changes food into forms the body can use. The mouth, tongue, teeth, saliva, muscles, stomach, and stomach acid all have jobs in the process.",["Food first enters the mouth.","Teeth, tongue, and jaw help us chew.","Saliva mixes with food.","Muscles push swallowed food to the stomach.","Stomach acid breaks it down further.","The body absorbs nutrients and removes what it does not need."],"Body systems work as a sequence, with each part doing a special job."),
        questions:[q("Where does digestion begin?",["In the mouth","In the knee","In the skull","On the skin"],"In the mouth","Chewing and saliva begin the process in the mouth."),q("What helps break down food in the stomach?",["Stomach acid","A helmet","A medal","A line graph"],"Stomach acid","Stomach acid is a special digestive liquid."),tf("The body absorbs nutrients from digested food.",true,"Absorption lets the body use useful substances from food.")]
      }
    ]
  },
  {
    id:3,title:"What's on Your Plate?",theme:"Who am I? (Living healthy)",
    description:"Balanced nutrition, water, food labels, preservation, sugar, and healthy decisions.",
    lifeSkill:"Decision-making, independence, and choosing a healthy diet",cover:"unit-3",
    lessons:[
      {
        id:"3-1",title:"The Healthy Eating Plate",subtitle:"Nutrients, food groups, and a balanced diet",cover:"lesson-3-1",
        vocab:[
          v("carbohydrate","a nutrient that gives the body energy","Rice and bread contain carbohydrates."),
          v("protein","a nutrient that helps the body grow and become strong","Fish, eggs, and meat contain protein."),
          v("fat","a nutrient that gives energy and helps absorb vitamins","Olive oil contains a healthy fat."),
          v("fiber","part of plant food that supports healthy digestion","Fruit and vegetables contain fiber."),
          v("vitamin","a substance needed in small amounts for health","Oranges contain Vitamin C."),
          v("mineral","a natural substance the body needs","Calcium is an important mineral."),
          v("dairy","food made from milk","Cheese and yogurt are dairy foods."),
          v("calcium","a mineral that supports bones, heart, and muscles","Milk can give us calcium."),
          v("balanced diet","a diet with the right amounts of different foods","A balanced diet contains several food groups."),
          v("sugar","a sweet substance that gives quick energy","Cakes and soda often contain a lot of sugar.")
        ],
        phrases:["give us energy","help us grow","make our bodies strong","absorb important vitamins","five to seven pieces of fruit and vegetables"],
        notes:["Carbohydrate and fat can give energy, but the body needs the right balance.","Dairy is a food group; calcium is a mineral found in many dairy foods.","Fruit contains natural sugar, fiber, vitamins, and water."],
        grammar:g("Giving healthy advice","Use should + base verb for advice and shouldn't + base verb for negative advice.",[["Advice","You should eat a healthy lunch."],["Negative advice","You shouldn't eat lots of sugar."],["Question","Should I drink water?"],["Answer","Yes, you should."]]),
        reading:r("A balanced plate","The healthy eating plate divides food into useful groups. Different nutrients have different jobs, so no single food provides everything the body needs.",["Fruit and vegetables supply vitamins and fiber.","Carbohydrates provide energy.","Protein helps growth and strength.","Some fats support energy and vitamin absorption.","Dairy can provide protein, vitamins, and calcium.","Foods high in added sugar should be limited."],"Health comes from balance and variety, not from one special food."),
        questions:[q("Which nutrient helps the body grow and become strong?",["Protein","A rumor","A helmet","A world record"],"Protein","Protein supports growth and strong body tissues."),q("Complete: You ___ eat a balanced lunch.",["should","will not","has","are"],"should","Should gives advice."),tf("Fiber is found in fruit and vegetables.",true,"Plant foods are useful sources of fiber.")]
      },
      {
        id:"3-2",title:"Why Do We Need Water?",subtitle:"Hydration, blood, brain, temperature, and sweating",cover:"lesson-3-2",
        vocab:[
          v("hydrated","having enough water in the body","Drink water to stay hydrated."),
          v("dehydrated","not having enough water in the body","You may feel tired when you are dehydrated."),
          v("sweat","liquid that comes through the skin when the body is hot","We lose water when we sweat."),
          v("temperature","a measure of how hot or cold something is","Water helps control body temperature."),
          v("toxin","a harmful substance in the body","Water helps the body remove toxins."),
          v("joint","a place where two bones meet and move","The knee is a joint."),
          v("pure water","water without added sugar or flavor","Most daily drinks should be pure water."),
          v("liter","a metric unit used to measure liquid","Children need about 1.5 liters of water a day."),
          v("headache","pain in the head","Dehydration can cause a headache."),
          v("soil","the top layer of earth where plants grow","Plant roots take water from the soil.")
        ],
        phrases:["stay hydrated","feel tired","get a headache","control body temperature","remove toxins","drink more in hot weather"],
        notes:["Hydrated and dehydrated are opposites.","Water is uncountable: say much water, not many water.","The book recommends about 1.5 liters daily for children, with more needed in hot weather or during activity."],
        grammar:g("Should and shouldn't","Use should for healthy actions and shouldn't for unhealthy actions.",[["Water","You should drink water when you exercise."],["Sleep","You shouldn't sleep for only four hours."],["Food","He should eat some carbohydrates."],["Question","Should she drink more in hot weather?"]]),
        reading:r("Water and the body","Water supports blood, the brain, joints, body temperature, digestion, and waste removal. The body loses water through sweat, so intake must increase in hot weather.",["Blood uses water to carry oxygen and nutrients.","The brain works better when the body is hydrated.","Dehydration can cause tiredness, headache, and poor concentration.","Water supports joints and temperature control.","Children should drink water regularly, especially in heat."],"Water is not only for thirst; it is part of nearly every important body process."),
        questions:[q("What does dehydrated mean?",["Not having enough water","Winning a race","Having strong bones","Being a good friend"],"Not having enough water","Dehydration means the body needs more water."),q("Why should we drink more in hot weather?",["We lose water when we sweat.","Water becomes a medal.","Our bones disappear.","The track becomes shorter."],"We lose water when we sweat.","Sweating cools the body but removes water."),tf("Water helps the body remove toxins.",true,"Water supports waste removal from the body.")]
      },
      {
        id:"3-3",title:"Read the Food Label",subtitle:"Calories, servings, sodium, sugar, and choosing a snack",cover:"lesson-3-3",
        vocab:[
          v("calorie","a unit that measures energy in food","The label shows 143 calories."),
          v("serving","the amount of food used for nutrition information","Check the serving size first."),
          v("percent","an amount out of one hundred","The label shows a percent for each nutrient."),
          v("sodium","a mineral found in salt","Too much sodium is not healthy."),
          v("enough","as much as is needed","We need enough energy for the day."),
          v("too much","more than a healthy or useful amount","The brownie has too much sugar."),
          v("food label","information printed on food packaging","A food label helps us compare snacks."),
          v("dried fruit","fruit with most of its water removed","A dried fruit bar can be a useful snack."),
          v("natural sugar","sugar naturally present in food","Fruit contains natural sugar."),
          v("compare","to look for similarities and differences","Compare the calories on two labels.")
        ],
        phrases:["check the serving size","has the most calories","has fewer calories","too much sugar","choose a healthier snack"],
        notes:["Most is used for the greatest amount; fewer is used with countable things such as calories.","Too much goes with uncountable nouns: too much sugar, salt, or fat.","A label must be compared using the same serving size."],
        grammar:g("Comparing amounts","Use more/most for larger amounts and fewer/fewest with countable plural nouns.",[["Large amount","This bar has more sugar."],["Largest amount","It has the most calories."],["Small count","It has fewer calories."],["Excess","It has too much sodium."]]),
        reading:r("Choosing a snack","Four snack labels show different amounts of calories, fat, sugar, and salt. A smart choice considers several values, not only taste.",["Check that serving sizes are comparable.","Calories measure energy.","High sugar and fat can make a snack less suitable for every day.","Fruit can provide natural sugar and Vitamin C.","A lower number in one category does not automatically make a food perfect."],"Reading labels helps us make informed choices instead of guessing."),
        questions:[q("What should you check before comparing two food labels?",["The serving size","The color of the wrapper","The name of the shop","The size of the picture"],"The serving size","Different serving sizes can make numbers misleading."),q("Choose the correct phrase: ___ sugar.",["too much","too many","many","a few"],"too much","Sugar is uncountable."),tf("Calories measure energy in food.",true,"A calorie is a unit of energy.")]
      },
      {
        id:"3-4",title:"Preserving Food and Limiting Sugar",subtitle:"Keeping food safe and understanding sugar's effects",cover:"lesson-3-4",
        vocab:[
          v("preserve","to keep food safe and fresh for longer","People preserve fish with salt."),
          v("store","to keep something for later use","We store food in a cool place."),
          v("smoke","to preserve food using smoke from a fire","People smoke some meat and fish."),
          v("dry","to remove water from something","We can dry fruit in the sun."),
          v("container","an object used to hold something","A jar is a food container."),
          v("zeer pot","a traditional clay cooling container","A zeer pot keeps food cool without electricity."),
          v("electricity","energy used to power fridges and freezers","A refrigerator needs electricity."),
          v("damage","to harm something","Too much sugar can damage teeth."),
          v("anxious","worried or nervous","A quick sugar rise can make a person feel anxious."),
          v("mood","the way someone feels","Food and sleep can affect mood.")
        ],
        phrases:["keep food fresh","take the water out","close the jar","last for years","damage the teeth","affect the mood"],
        notes:["Preserve means stop food from going bad; store means keep it in a place.","Drying and salting work partly by reducing water available to microbes.","Added sugar gives quick energy, but it should not replace balanced sources of energy."],
        grammar:g("Past and present methods","Use the past simple for old methods and the present simple for methods still used today.",[["Past","People invented zeer pots long ago."],["Present","People still dry fruit today."],["Past","They used fire to smoke fish."],["Present","Cans keep air away from food."]]),
        phonics:p("-tion endings","The ending -tion is often pronounced /ʃən/.",["nutrition","digestion","protection","operation","competition"]),
        reading:r("Food without a fridge","People preserve food by smoking, salting, drying, and sealing it in containers. Traditional zeer pots cool food without electricity. The unit also explains why too much sugar can harm teeth, arteries, energy, concentration, and mood.",["Smoking and salting are old preservation methods.","Drying removes water while keeping many nutrients.","A zeer pot uses water evaporation to cool food.","Cans and jars limit air and can preserve food for a long time.","Too much added sugar can damage teeth and affect the heart and mood."],"Technology changes, but the goal remains the same: keep food safe and choose amounts wisely."),
        questions:[q("Which traditional container can cool food without electricity?",["A zeer pot","A helmet","A line graph","A blood vessel"],"A zeer pot","Water evaporating from the pot helps cool the food."),q("Why can drying help preserve fruit?",["It removes water.","It adds a helmet.","It creates oxygen.","It makes a rumor."],"It removes water.","Removing water slows spoilage."),tf("Too much sugar can affect the teeth and mood.",true,"The reading connects excess sugar with several health effects.")]
      }
    ]
  },
  {
    id:4,title:"In the Wild",theme:"The world around me (Taking care of our world)",
    description:"Wild animals, behavior, habitats, possibilities, and changes in the environment.",
    lifeSkill:"Compassion, critical thinking, and environmental responsibility",cover:"unit-4",
    lessons:[
      {
        id:"4-1",title:"Amazing Wild Animals",subtitle:"Meet animals from different parts of the world",cover:"lesson-4-1",
        vocab:[
          v("cheetah","a fast spotted wild cat","A cheetah can run very fast."),
          v("chimpanzee","an intelligent ape that lives in Africa","The chimpanzee uses its hands to gather food."),
          v("cobra","a poisonous snake that can spread its neck","A cobra may live in a hot habitat."),
          v("fennec fox","a small desert fox with very large ears","The fennec fox takes shelter in a burrow."),
          v("macaw","a large colorful parrot","A macaw eats fruit and leaves."),
          v("sea lion","a sea mammal with flippers","The sea lion swims and rests on rocks."),
          v("sloth","a slow tree-living mammal","A sloth hangs from a branch."),
          v("spider monkey","a monkey with long arms and a long tail","The spider monkey moves through rainforest trees."),
          v("wildlife park","a protected place where people can observe wild animals","We saw a fennec fox at the wildlife park."),
          v("tail","the part that grows from the back of many animals","The spider monkey uses its long tail.")
        ],
        phrases:["go to a wildlife park","guess the animal","have big ears","move through the trees","live in the desert"],
        notes:["Use it for one animal when its sex is not important.","The plural of fox is foxes; the plural of monkey is monkeys.","Describe an animal using size, color, body parts, movement, and habitat."],
        grammar:g("Describing an animal","Use has/had for body parts and is/was for qualities.",[["Present body part","It has a long tail."],["Past body part","It had big ears."],["Present quality","It is small."],["Past quality","It was fast."]]),
        reading:r("Guess the animal","Students identify animals by listening to clues about their body parts, size, movement, and habitat.",["A fennec fox is small and has large ears.","A cheetah is a very fast land animal.","Macaws are colorful birds.","Spider monkeys use long arms and tails in trees.","Sea lions are mammals adapted to water."],"Careful observation helps us classify and understand animals."),
        questions:[q("Which animal is a colorful parrot?",["A macaw","A cobra","A sloth","A sea lion"],"A macaw","A macaw is a large colorful parrot."),q("Which animal has very large ears and lives in the desert?",["A fennec fox","A sea lion","A chimpanzee","A macaw"],"A fennec fox","Large ears help the fennec fox in its desert habitat."),tf("A sea lion is a sea mammal.",true,"Sea lions are mammals adapted to marine life.")]
      },
      {
        id:"4-2",title:"How Animals Behave",subtitle:"Nests, burrows, shelter, hunting, hiding, and groups",cover:"lesson-4-2",
        vocab:[
          v("build a nest","to make a home for eggs and young birds","Many birds build nests in trees."),
          v("dig a burrow","to make a hole or tunnel in the ground","Foxes and rabbits dig burrows."),
          v("take shelter","to move to a safe protected place","Animals take shelter from bad weather."),
          v("hide","to stay where others cannot see you","Crayfish hide under rocks in the day."),
          v("hunt","to chase and catch animals for food","Lions hunt other animals."),
          v("gather","to come together in one place","Penguins gather in a large group."),
          v("colony","a large group of animals living together","Thousands of penguins can form a colony."),
          v("crayfish","a small water animal with a hard shell and claws","Crayfish live in rivers."),
          v("mole","a small animal that lives under the ground","A mole digs a burrow."),
          v("squirrel","a small animal with a long bushy tail","A squirrel may build a nest in a tree.")
        ],
        phrases:["close to a natural habitat","safe from other animals","come out at night","hunt for food","gather to keep warm"],
        notes:["Behavior means what an animal does.","Habitat means the place where an organism lives.","Take shelter is an action; shelter can also be a safe place."],
        grammar:g("Possibility with might","Use might + base verb when something is possible but not certain. Use might not for a negative possibility.",[["Possibility","It might live in Africa."],["Negative possibility","It might not eat grass."],["Ability guess","It might be able to swim."],["Question for discussion","What might happen next?"]]),
        reading:r("Animal behavior","Animals use different behaviors to find food, stay safe, protect their families, and manage the climate of their habitat.",["Birds build nests or use holes in trees.","Foxes and rabbits dig burrows for shelter.","Crayfish hide under rocks by day.","Lions and cheetahs hunt for food.","Penguins gather in colonies to stay warm."],"Behavior is an animal's practical answer to the challenges of its habitat."),
        questions:[q("Why do penguins gather in a colony?",["To keep warm","To build a dam","To read labels","To measure a race"],"To keep warm","A large group helps penguins conserve warmth."),q("Complete: The animal ___ live in Africa.",["might","has","did","is going"],"might","Might expresses possibility."),tf("We add -s after the verb following might.",false,"Use might + base verb: It might live.")]
      },
      {
        id:"4-3",title:"Habitats Around the World",subtitle:"Polar regions, rainforests, wetlands, and the equator",cover:"lesson-4-3",
        vocab:[
          v("habitat","a place where a plant or animal normally lives","A rainforest is a habitat."),
          v("polar","connected with the very cold North or South Pole","A polar habitat has snow and ice."),
          v("rainforest","a warm wet forest with many plants and animals","Spider monkeys live in rainforests."),
          v("wetland","land that is covered or filled with water","A swamp is a type of wetland."),
          v("swamp","a wetland with many trees","Tree roots grow in the swamp water."),
          v("grassland","a large open habitat covered mainly with grass","Many grazing animals live in grassland."),
          v("desert","a very dry habitat with little rain","A fennec fox can live in a desert."),
          v("equator","an imaginary line around the middle of Earth","The equator receives strong sunlight."),
          v("North Pole","the point farthest north on Earth","The North Pole is very cold."),
          v("South Pole","the point farthest south on Earth","Penguins live near the South Pole.")
        ],
        phrases:["all over the world","warm tropical regions","near the sea","near a river","get the most sunshine"],
        notes:["Climate describes usual weather conditions; landscape describes the shape and features of land.","The equator is a line, while the North and South Poles are points.","A swamp is one kind of wetland."],
        grammar:g("There is and there are","Use there is for one thing or an uncountable noun; use there are for plural things.",[["One thing","There is snow and ice."],["Plural","There are many trees."],["Negative plural","There aren't any tall trees."],["Question","Are there animals in the wetland?"]]),
        reading:r("Comparing habitats","Polar habitats are cold and icy, rainforests are warm and wet, and wetlands have water for all or part of the year. Sunlight and location help explain these differences.",["Polar plants are usually small, and animals need protection from cold.","Rainforests contain many trees, fruit, and tree-living animals.","Wetlands can form near seas and rivers.","The equator receives the most direct sunlight.","The poles receive less sunlight and remain much colder."],"Climate and landscape decide which plants and animals can live in a habitat."),
        questions:[q("Which habitat is warm, wet, and full of trees?",["A rainforest","A polar habitat","A track","A hospital"],"A rainforest","Rainforests are warm and receive much rain."),q("Where does Earth receive the most direct sunshine?",["Near the equator","At both poles","Inside a burrow","Under a dam"],"Near the equator","The equator receives stronger sunlight throughout the year."),tf("A swamp is a type of wetland.",true,"Swamps are wetlands with many trees.")]
      },
      {
        id:"4-4",title:"Changes to Habitats",subtitle:"Human activity, natural disasters, and environmental responsibility",cover:"lesson-4-4",
        vocab:[
          v("deforestation","cutting down large areas of forest","Deforestation destroys many homes for wildlife."),
          v("pollution","harmful waste that makes land, water, or air dirty","Plastic waste can cause water pollution."),
          v("drought","a long period with too little rain","Plants cannot grow well during a drought."),
          v("flood","water covering land that is usually dry","A flood can damage homes and habitats."),
          v("volcano","a mountain that can release hot rock and ash","Volcanic ash may cover the ground."),
          v("fire","burning that can spread quickly","A forest fire can destroy a habitat."),
          v("natural disaster","a dangerous event caused by natural processes","Floods and droughts can be natural disasters."),
          v("human activity","something people do that affects the world","Building and pollution are human activities."),
          v("destroy","to damage something so badly that it no longer exists or works","New roads can destroy habitats."),
          v("balance","a stable relationship between living things and their environment","Plants and animals live together in balance.")
        ],
        phrases:["cut down forests","make land for farming","lose their homes","pollute the air","overflow onto dry land","protect natural habitats"],
        notes:["Deforestation is a human activity; a drought can occur naturally.","Some events have both natural and human causes or become worse because of human choices.","Cause tells why something happens; effect tells what happens next."],
        grammar:g("Cause and effect","Use because to introduce a cause and so to introduce a result.",[["Cause","Habitats change because people cut down trees."],["Effect","There is little rain, so the ground becomes dry."],["Cause","Animals leave because they lose shelter."],["Effect","Water is polluted, so fish may die."]]),
        phonics:p("-nd and -nt","Listen for both consonants at the end of each word.",["sand","land","pond","plant","hunt","elephant"]),
        reading:r("Why habitats change","Habitats can change because of human actions, such as deforestation, building, and pollution, or because of natural events, such as volcanoes, droughts, floods, and fires.",["Cutting forests removes food and shelter.","Building can replace natural land with homes and factories.","Pollution harms air, water, and soil.","Drought reduces water and plant growth.","Floods and fires can change large areas quickly.","Responsible choices can reduce preventable damage."],"Understanding causes helps communities choose better ways to protect living things."),
        questions:[q("Which word means cutting down large areas of forest?",["deforestation","digestion","condensation","competition"],"deforestation","Deforestation removes forest cover."),q("Choose the effect: There is a drought, ___ plants cannot grow well.",["so","because","or","but"],"so","So introduces the result."),tf("Pollution can affect land, water, and air.",true,"Pollution occurs in all three environments.")]
      }
    ]
  },
  {
    id:5,title:"All About Water",theme:"The world around me (Taking care of our world)",
    description:"Oases, the water cycle, present perfect experiences, adaptation, and rainfall.",
    lifeSkill:"Curiosity, saving water, and understanding links between ideas",cover:"unit-5",
    lessons:[
      {
        id:"5-1",title:"A Desert Oasis",subtitle:"How underground water reaches the surface",cover:"lesson-5-1",
        vocab:[
          v("oasis","a fertile place in a desert where water is found","People grow crops around an oasis."),
          v("spring","a place where underground water comes to the surface","The spring supplies fresh water."),
          v("surface","the outside or top layer of something","Water reaches the surface of the ground."),
          v("soak","to pass slowly into or through something","Rain soaks into the earth."),
          v("groundwater","water stored under the ground","Groundwater can feed a spring."),
          v("date palm","a tall tree that produces dates","Farmers grow date palms at the oasis."),
          v("acacia","a tree that gives shade and protection","Acacia trees shelter people and animals."),
          v("tamarisk","a small tree that helps stop sand","Tamarisk trees protect the oasis from sandstorms."),
          v("spearmint","a herb used in food, drink, and medicine","People grow spearmint at the oasis."),
          v("basil","a useful herb with vitamins and minerals","Basil tastes good in food.")
        ],
        phrases:["under the ground","come up to the surface","provide shade","protect from sandstorms","use as medicine","make baskets from leaves"],
        notes:["An oasis forms where groundwater is close enough to reach the surface through springs.","Spring can mean a water source or a season; context tells the meaning.","Provide means give something useful or needed."],
        grammar:g("Explaining formation","Use the present simple and sequence words to explain a natural process.",[["First","First, rain falls to the ground."],["Next","Next, it soaks into the earth."],["Then","Then, water gathers underground."],["Finally","Finally, it reaches the surface through a spring."]]),
        reading:r("How an oasis forms","Rain falls, soaks into the earth, and collects in underground rivers and lakes. Where springs bring this water to the surface, an oasis can form.",["Groundwater begins with rainfall.","Water moves through earth and rock.","A spring is an exit point at the surface.","Several springs can support an oasis.","Trees and herbs supply food, shade, medicine, materials, and protection."],"Water makes life possible even in a dry desert environment."),
        questions:[q("What brings groundwater to the surface?",["A spring","A medal","A cast","A helmet"],"A spring","A spring is where underground water emerges."),q("Which tree can help protect an oasis from sandstorms?",["Tamarisk","Sea lion","Cobra","Cereal"],"Tamarisk","Tamarisk trees help reduce blowing sand."),tf("An oasis can provide food, shade, and medicine.",true,"Oasis plants have many uses for people and animals.")]
      },
      {
        id:"5-2",title:"Have You Ever Visited an Oasis?",subtitle:"Experiences with the present perfect",cover:"lesson-5-2",
        vocab:[
          v("ever","at any time in a person's life","Have you ever visited Siwa?"),
          v("never","not at any time","I've never eaten olives."),
          v("experience","something that happens to you","Visiting an oasis is a special experience."),
          v("visited","been to a place to see it","We have visited Cairo."),
          v("climbed","moved up a mountain, tree, or wall","He has climbed a mountain."),
          v("seen","past participle of see","Have you seen a spring?"),
          v("eaten","past participle of eat","She has eaten dates."),
          v("tried","tested or done something for the first time","They have tried olive oil."),
          v("walked","moved on foot","I have walked in the desert."),
          v("taken","past participle of take","She has taken photos.")
        ],
        phrases:["Have you ever...?","Yes, I have.","No, I haven't.","I've never...","He has climbed..."],
        notes:["Use have with I, you, we, and they. Use has with he, she, and it.","Ever is common in questions; never gives a negative meaning without not.","Use the past participle after have/has: seen, eaten, taken, visited."],
        grammar:g("Present perfect for life experiences","Use have/has + past participle to talk about experiences when the exact time is not given.",[["I / You / We / They","We have visited an oasis."],["He / She / It","She has climbed a tree."],["Question","Have you ever seen a spring?"],["Positive answer","Yes, I have."],["Negative answer","No, I haven't."],["Never","I've never eaten olives."]]),
        reading:r("Experiences in the desert","Students ask and answer about experiences such as visiting Siwa, walking in the desert, seeing a spring, or tasting dates and olives.",["The exact date is not important in an experience question.","Have and has connect the subject to a past participle.","Regular participles often end in -ed.","Common irregular participles include seen, eaten, and taken.","Short answers repeat have or haven't."],"Sharing experiences helps speakers connect grammar to real life."),
        questions:[q("Complete: She ___ climbed a tree.",["has","have","is","did"],"has","Use has with she."),q("What is the past participle of see?",["seen","saw","seeing","sees"],"seen","Present perfect uses have/has + seen."),q("Choose the correct question.",["Have you ever visited Siwa?","Did you ever visited Siwa?","Has you visit Siwa?","Are you ever visit Siwa?"],"Have you ever visited Siwa?","Use have + subject + past participle."),tf("Never already gives a negative meaning.",true,"Do not add not before never in this structure.")]
      },
      {
        id:"5-3",title:"The Water Cycle",subtitle:"Evaporation, condensation, precipitation, runoff, and groundwater",cover:"lesson-5-3",
        vocab:[
          v("evaporation","the change of liquid water into vapor","Sunlight causes evaporation from the sea."),
          v("condensation","the change of water vapor into drops","Condensation helps form clouds."),
          v("precipitation","water falling from clouds as rain, snow, or hail","Rain is a form of precipitation."),
          v("runoff","water that flows over land into rivers","Runoff moves down mountains."),
          v("water vapor","water in its gas form","Water vapor rises into the atmosphere."),
          v("atmosphere","the layer of gases around Earth","Clouds form in the atmosphere."),
          v("cycle","a series of stages that repeat","The water cycle repeats continuously."),
          v("cloud","a visible group of tiny water drops or ice crystals","Wind moves clouds across the sky."),
          v("hail","small balls of ice falling from clouds","Hail is a type of precipitation."),
          v("narrow","not wide","A young river may be small and narrow.")
        ],
        phrases:["turn into vapor","rise into the atmosphere","cool into drops","fall from clouds","flow down mountains","start the cycle again"],
        notes:["Evaporate and condense are verbs; evaporation and condensation are nouns.","The water itself is recycled; it changes location and state.","Runoff moves over the land, while groundwater moves or stays below it."],
        grammar:g("Present perfect for a completed change","Use has/have + past participle to describe a change that has happened and matters now.",[["Water","The water has evaporated."],["Vapor","The vapor has condensed."],["Clouds","The clouds have moved."],["Rain","The rain has fallen."]]),
        reading:r("Water travels in a cycle","Sunlight evaporates surface water. Cooling vapor condenses into clouds. Water returns as precipitation, then travels as runoff or groundwater before reaching rivers and seas.",["Heat from the sun causes evaporation.","Rising air cools, causing condensation.","Cloud drops become heavy and fall as precipitation.","Runoff flows downhill into rivers.","Some water soaks underground and later appears in springs.","The process repeats, so it is called a cycle."],"Water connects the atmosphere, land, rivers, groundwater, and seas in one repeating system."),
        questions:[q("Which stage turns liquid water into vapor?",["Evaporation","Condensation","Precipitation","Digestion"],"Evaporation","Heat changes liquid water to vapor."),q("What happens after water vapor cools?",["It condenses into drops.","It becomes a medal.","It grows bones.","It turns into sandbags."],"It condenses into drops.","Cooling leads to condensation."),tf("Runoff usually moves downhill.",true,"Gravity pulls runoff toward lower land and rivers.")]
      },
      {
        id:"5-4",title:"Adapting to Water Scarcity",subtitle:"Cacti, camels, wetlands, rainfall, and smart survival",cover:"lesson-5-4",
        vocab:[
          v("adapt","to change or develop features that help survival","Camels have adapted to desert life."),
          v("cactus","a desert plant that stores water","A cactus has a thick stem."),
          v("spine","a sharp pointed part on a plant","Cactus spines discourage animals."),
          v("hump","the raised part on a camel's back","A camel stores fat in its hump."),
          v("hoof","the hard foot of an animal such as a camel","Wide hooves help a camel walk on sand."),
          v("camouflage","colors or patterns that help an animal hide","Wetland animals use camouflage."),
          v("hollow","empty inside","Some wetland plants have hollow stems."),
          v("rainfall","the amount of rain in a place","Rainfall is measured in millimeters."),
          v("scarcity","a situation in which there is not enough of something","Water scarcity affects dry countries."),
          v("millimeter","a small metric unit used to measure rainfall","The map shows annual rainfall in millimeters.")
        ],
        phrases:["survive in the desert","store water for years","lose water through sweat","walk on soft sand","measure annual rainfall"],
        notes:["A camel's hump stores fat, not water.","Cactus roots spread near the surface to collect brief rainfall quickly.","Adaptation is a feature or behavior that improves survival over time."],
        grammar:g("Explaining adaptations","Use because to connect a useful feature with its survival reason.",[["Cactus","A cactus has spines because they protect its water."],["Camel","A camel has wide hooves because it walks on sand."],["Stem","The stem is thick, so water evaporates slowly."],["Fur","Camels have thick fur to stay warm at night."]]),
        phonics:p("schwa /ə/","An unstressed vowel can make a weak schwa sound.",["river","water","polar","cobra","animal","camel"]),
        reading:r("Plants and animals save water","Cacti and camels have features that help them live with little water. Wetland organisms have different adaptations, while rainfall maps show why water challenges vary between countries.",["Wide cactus roots collect short bursts of rain.","A thick stem stores water, and spines protect it.","Camels drink large amounts when water is available.","Camels sweat less and store fat in the hump.","Wide hooves and protective hair help in sand.","Rainfall is measured in millimeters per year."],"Living things survive when their structures and behaviors fit the conditions around them."),
        questions:[q("What does a camel store in its hump?",["Fat and nutrients","A lake of water","Sandbags","Oxygenated blood"],"Fat and nutrients","The hump stores fat that can supply energy."),q("Why do cactus roots spread near the surface?",["To collect rain quickly","To make a world record","To measure time","To build a hospital"],"To collect rain quickly","Desert rain may be brief, so surface roots gather it fast."),tf("Rainfall is commonly measured in millimeters per year.",true,"Annual rainfall values use millimeters.")]
      }
    ]
  },
  {
    id:6,title:"What Is a Flood?",theme:"The world around me (Taking care of our world)",
    description:"Flood control, quantity language, first responders, dry-area farming, and water engineering.",
    lifeSkill:"Problem-solving, cooperation, sustainable development, and helping others",cover:"unit-6",
    lessons:[
      {
        id:"6-1",title:"Flood Protection",subtitle:"Dams, barriers, drains, pumps, pipes, and sandbags",cover:"lesson-6-1",
        vocab:[
          v("barrier","something that blocks movement","A barrier stops flood water entering a street."),
          v("canal","a human-made waterway","A canal moves water to where it is needed."),
          v("dam","a strong wall that controls river water","A dam can reduce flooding."),
          v("drain","an opening or pipe that carries unwanted water away","Street water goes down the drain."),
          v("pipe","a tube that carries water or another substance","Water moves through pipes."),
          v("pump","a machine that moves water","A pump removes water from a building."),
          v("sandbag","a strong bag filled with sand","People place sandbags in front of doors."),
          v("flood water","water that covers land and buildings during a flood","Flood water can enter homes."),
          v("flow","the movement of water","A dam changes the flow of a river."),
          v("engineer","a person who designs and builds solutions","Engineers design flood barriers.")
        ],
        phrases:["keep water out","stop the flow","go down a drain","remove water from a building","put up a barrier"],
        notes:["A dam blocks or controls a natural river; a canal is built to move water.","A drain carries water away, while a pump actively pushes or pulls it.","Sandbags work best when placed closely together as a temporary barrier."],
        grammar:g("Quantities with too much, too many, and enough","Use too much with uncountable nouns, too many with plural countable nouns, and enough for the needed amount.",[["Uncountable excess","There is too much water."],["Plural excess","There are too many cars."],["Not enough uncountable","There isn't enough water."],["Not enough plural","There aren't enough trees."]]),
        reading:r("Tools that manage water","Different structures and machines guide, block, or remove water. Choosing the correct tool depends on where the water is and what must be protected.",["Sandbags and barriers block water temporarily.","Dams control river flow.","Drains carry surface water away.","Pipes move water above or below ground.","Pumps remove water from low places.","Canals take water to another location."],"Flood protection works best when several suitable tools are planned together."),
        questions:[q("Which machine removes water from a flooded building?",["A pump","A medal","A thermometer","A cactus"],"A pump","Pumps move water out of low or enclosed places."),q("Complete: There is ___ water.",["too much","too many","many","a few"],"too much","Water is uncountable."),tf("We say: There are too many cars.",true,"Cars are countable and plural, so use too many.")]
      },
      {
        id:"6-2",title:"Predict, Warn, and Protect",subtitle:"How communities prepare before flood water arrives",cover:"lesson-6-2",
        vocab:[
          v("collapse","to fall down suddenly","A damaged bridge can collapse."),
          v("install","to put equipment in place ready for use","Workers install a powerful pump."),
          v("minimize","to make something as small as possible","Planning can minimize flood damage."),
          v("predict","to say what is likely to happen","Meteorologists predict heavy rainfall."),
          v("protect","to keep someone or something safe","Barriers protect buildings."),
          v("ruin","to damage something very badly","Flood water can ruin furniture."),
          v("warn","to tell people about possible danger","Phones can warn citizens quickly."),
          v("wash away","to carry something away with moving water","A flood can wash away a road."),
          v("meteorologist","a scientist who studies weather","A meteorologist watches storms and rainfall."),
          v("technology","tools and systems made using scientific knowledge","New technology improves flood pumps.")
        ],
        phrases:["predict a flood","warn people quickly","keep drains clear","install new technology","minimize dangerous effects"],
        notes:["Predict happens before an event; warn tells people so they can prepare.","Protect and minimize are positive actions. Ruin, collapse, and wash away describe damage.","A cell-phone warning system only works well when messages are clear and timely."],
        grammar:g("Purpose with so and to","Use to + base verb for purpose. Use so + clause for a result.",[["Purpose","We install pumps to remove water."],["Purpose","Scientists watch weather to predict floods."],["Result","They send warnings, so people can prepare."],["Result","Drains stay clear, so water moves away."]]),
        reading:r("Preparing for a flood","Meteorologists monitor weather and predict dangerous rainfall. Engineers, officials, and citizens use warnings, pumps, drains, barriers, and sandbags to reduce damage.",["Floods can ruin buildings and wash away roads.","Weather experts can predict risk.","Warnings give people time to act.","Powerful pumps remove water.","Clear drains help water escape.","Preparation minimizes danger even when it cannot stop all rain."],"Early information plus practical action saves more than last-minute reaction."),
        questions:[q("Who studies the weather and may predict a flood?",["A meteorologist","A porter","A surgeon","An athlete"],"A meteorologist","Meteorologists study weather patterns and rainfall."),q("Why do officials send warnings?",["So people can prepare","So roads collapse","To add sugar","To hide a secret"],"So people can prepare","A warning gives time for protective action."),tf("Keeping drains clear can help water move away.",true,"Blocked drains make surface flooding worse.")]
      },
      {
        id:"6-3",title:"Emergency Responders",subtitle:"Volunteering, rescue, character qualities, and teamwork",cover:"lesson-6-3",
        vocab:[
          v("emergency responder","a trained person who helps during a dangerous event","Lara is an emergency responder."),
          v("rescue","to take someone out of danger","The team rescues people from flood water."),
          v("citizen","a person who belongs to a country or community","Responders help other citizens."),
          v("volunteer","to work to help without being paid","Lara volunteers during emergencies."),
          v("rainfall","the amount of rain that falls","Heavy rainfall can cause a flood."),
          v("injured","hurt in an accident or emergency","Responders help injured people."),
          v("cooperative","good at working with other people","A cooperative team shares tasks."),
          v("responsible","able to be trusted to do the right thing","A responsible responder follows safety rules."),
          v("caring","kind and concerned about other people","Caring volunteers want to help."),
          v("brave","able to face danger with courage","Emergency responders must be brave.")
        ],
        phrases:["one of the first people to help","focus on helping others","ready to rescue people","work well in a team","volunteer without getting paid"],
        notes:["Brave does not mean never feeling scared; it means acting carefully despite fear.","A volunteer works without pay, but still needs training and safety procedures.","Positive character adjectives include caring, cooperative, polite, responsible, generous, and wise."],
        grammar:g("Describing people","Use be + adjective. Use because to support an opinion with evidence.",[["Quality","Lara is brave."],["Teamwork","The responders are cooperative."],["Reason","She is caring because she helps injured people."],["Possibility","Volunteers might feel scared sometimes."]]),
        reading:r("Interview with Lara","Lara explains how trained volunteers support police and firefighters during floods. Her team prepares before heavy rainfall and helps people leave dangerous or damaged homes.",["Lara is a trained volunteer, not a police officer.","Responders rescue citizens from flood water.","The work can feel scary, so Lara focuses on the people who need help.","The team prepares when very heavy rain is expected.","Helping people safely can be deeply rewarding."],"Courage, training, cooperation, and care are all needed in an emergency."),
        questions:[q("What does a volunteer do?",["Helps without getting paid","Wins every race","Builds every dam alone","Only watches television"],"Helps without getting paid","Volunteering is unpaid service for other people."),q("Which adjective best describes a person who works well in a team?",["cooperative","selfish","lazy","mean"],"cooperative","Cooperative people share work and communicate."),tf("Lara says emergency work is never scary.",false,"She says it can be scary, but she focuses on helping others.")]
      },
      {
        id:"6-4",title:"Water Engineering and Dry-Area Farming",subtitle:"Irrigation, hydroponics, waterwheels, dams, and desalination",cover:"lesson-6-4",
        vocab:[
          v("irrigation","bringing water to crops","Farmers use irrigation when rainfall is not enough."),
          v("hydroponic farming","growing plants in nutrient-rich water instead of soil","Hydroponic farming uses less water."),
          v("aqueduct","a structure that carries water to a place","An aqueduct carried Nile water to the Citadel."),
          v("waterwheel","a wheel turned by moving water","Waterwheels helped move irrigation water."),
          v("turbine","a machine that spins to produce power","Water turns a turbine at the dam."),
          v("hydroelectric","connected with electricity made from moving water","The High Dam produces hydroelectric power."),
          v("desalination","removing salt from sea water","Desalination can provide fresh water."),
          v("crop","a plant grown by farmers for food or another use","Farmers need water for their crops."),
          v("well","a deep hole made to reach groundwater","Water can be pumped from a well."),
          v("gravity","the force that pulls objects and water downward","Gravity moved water down the aqueduct.")
        ],
        phrases:["bring water to crops","use less water","grow plants without soil","control the Nile","produce electricity","remove salt from sea water"],
        notes:["Hydroponics uses water with dissolved minerals instead of soil.","Hydroelectric power uses moving water to turn a turbine.","Desalination creates fresh water but can require significant energy and money."],
        grammar:g("Comparing solutions","Use less with uncountable nouns and fewer with plural countable nouns.",[["Water","Hydroponics uses less water."],["Resources","The new system may use fewer pipes."],["Excess","Traditional irrigation can take too much river water."],["Need","Dry areas do not have enough rainfall."]]),
        phonics:p("-ous","The ending -ous often means full of a quality and is usually unstressed.",["dangerous","generous","nervous","famous"]),
        reading:r("Engineering water for life","People have long designed systems to move, store, control, and clean water. Modern hydroponics and desalination add new options for dry areas.",["Irrigation brings water from rivers, wells, or canals to crops.","Hydroponics grows plants in mineral-rich water and can use less water.","Egyptian waterwheels have supported irrigation for thousands of years.","Aqueducts moved water to cities and high places.","The High Dam controls flooding, stores water, and produces electricity.","Desalination removes salt to create fresh water."],"Good engineering balances human needs, cost, energy use, and environmental impact."),
        questions:[q("Which farming method grows plants without soil?",["Hydroponic farming","World-record cycling","Drying fruit","Building nests"],"Hydroponic farming","Hydroponics uses nutrient-rich water instead of soil."),q("What turns to make hydroelectric power?",["A turbine","A cast","A rib","A food label"],"A turbine","Moving water spins a turbine connected to a generator."),tf("Desalination removes salt from sea water.",true,"The goal of desalination is to produce fresh water.")]
      }
    ]
  }
];

const READERS=[
  {
    id:"hospitals",type:"Non-fiction Reader",title:"Hospitals",cover:"hospital-cover",
    description:"People, equipment, treatment, and a hospital diary.",
    chapters:[
      {
        id:"h-1",title:"People Who Help",subtitle:"Doctors, nurses, surgeons, cleaners, and more",cover:"hospital-1",
        vocab:[v("doctor","a person trained to find and treat illness","The doctor finds out why a patient is sick."),v("nurse","a trained person who cares for patients","The nurse gives the correct medicine."),v("surgeon","a doctor who performs operations","The surgeon can do an operation."),v("cleaner","a person who keeps the hospital clean","Cleaners help prevent infection."),v("receptionist","a person who organizes appointments","The receptionist tells patients where to go."),v("patient","a person receiving medical care","The patient speaks to the doctor."),v("carer","a person who looks after someone who needs long-term help","A carer supports a sick person."),v("porter","a worker who helps move patients and equipment","The porter takes a patient to the X-ray room."),v("cook","a person who prepares food","Hospital cooks prepare balanced meals."),v("appointment","an arranged time to see a professional","The appointment is at ten o'clock.")],
        phrases:["look after a patient","give the right medicine","do an operation","organize appointments","move around the hospital"],
        notes:["Patient is the person receiving care; patient can also mean calm while waiting, but the context is different.","A surgeon is a doctor with special training for operations.","Every hospital role contributes to safe care, including cleaning and food preparation."],
        grammar:g("Jobs and responsibilities","Use can + base verb to describe what a worker is able or trained to do.",[["Doctor","A doctor can diagnose illness."],["Nurse","A nurse can give medicine."],["Porter","A porter can help a patient move."],["Cook","A cook can prepare healthy food."]]),
        reading:r("A hospital team","Hospitals depend on many people with different responsibilities, from diagnosis and nursing to cleaning, transport, appointments, and nutrition.",["Doctors diagnose and plan treatment.","Nurses provide medicine and daily care.","Surgeons perform operations.","Receptionists organize appointments.","Porters help people move.","Cleaners and cooks support a safe recovery environment."],"Excellent care is a team effort, not the work of one person."),
        questions:[q("Who organizes hospital appointments?",["The receptionist","The athlete","The farmer","The cyclist"],"The receptionist","Receptionists manage appointment times and directions."),tf("Only doctors are important in a hospital.",false,"Many roles work together to care for patients.")]
      },
      {
        id:"h-2",title:"Checks and Treatment",subtitle:"Temperature, blood pressure, X-rays, casts, and bandages",cover:"hospital-2",
        vocab:[v("thermometer","a tool used to measure temperature","The nurse uses a thermometer."),v("temperature","how hot or cold the body is","A high temperature can be a sign of illness."),v("blood pressure","a measurement connected with how the heart pumps blood","The doctor measures blood pressure."),v("X-ray","a picture that shows bones inside the body","The X-ray shows whether a bone is broken."),v("cast","a hard covering that holds a broken bone still","The patient wears a cast for six weeks."),v("bandage","material wrapped around an injury for support or protection","A bandage supports the injured muscle."),v("injure","to hurt part of the body","She injured a muscle."),v("broken","damaged so that a bone has cracked or separated","The X-ray showed a broken bone."),v("measure","to find an amount using a tool","The nurse measures the patient's temperature."),v("support","to hold something in a safe position","The bandage supports the arm.")],
        phrases:["take your temperature","measure your blood pressure","have an X-ray","put on a cast","support an injured muscle"],
        notes:["A cast is usually used for a broken bone; a bandage can support a soft-tissue injury.","An X-ray does not treat the injury; it helps professionals see bones.","Blood pressure and body temperature are different measurements."],
        grammar:g("If for a real situation","Use if + present simple, then can + base verb to describe what may happen.",[["Bone","If you break a bone, you can have an X-ray."],["Muscle","If you injure a muscle, a nurse can use a bandage."],["Illness","If you are ill, your temperature can change."]]),
        reading:r("What happens at hospital?","Doctors and nurses take measurements and use tools to understand an illness or injury. Treatment depends on what the evidence shows.",["A thermometer measures body temperature.","Blood pressure gives information about the heart and circulation.","An X-ray creates an image of bones.","A cast keeps a broken bone still while it heals.","A bandage can support an injured muscle."],"The right test helps the medical team choose the right treatment."),
        questions:[q("Which tool measures body temperature?",["A thermometer","A sandbag","A turbine","A food label"],"A thermometer","A thermometer is designed to measure temperature."),tf("An X-ray can show whether a bone is broken.",true,"X-ray images show bones inside the body.")]
      },
      {
        id:"h-3",title:"Nagy's Hospital Diary",subtitle:"A skateboard accident and a careful examination",cover:"hospital-3",
        vocab:[v("diary","a personal record of events","Nagy writes about his hospital visit in a diary."),v("skateboard","a short board with wheels","Nagy fell off his skateboard."),v("hurt","to cause pain or injury","He hurt his arm."),v("overnight","for the whole night","He did not stay in hospital overnight."),v("machine","equipment that uses power to do a job","The X-ray machine took a picture."),v("strange","unusual or unfamiliar","The machine felt strange, but it did not hurt."),v("special","made for a particular purpose","The nurse used a special bandage."),v("advice","an opinion about what someone should do","His dad gave him safety advice."),v("room","a separate part of a building","The receptionist sent him to Room 11."),v("picture","an image or photograph","The doctor looked at the pictures of the bones.")],
        phrases:["fall off a skateboard","take someone to hospital","ask what is wrong","look at an X-ray","stay overnight"],
        notes:["Fall off means move accidentally from something onto the ground.","The past of fall is fell; the past of hurt is hurt.","A diary retells events in time order and often uses I."],
        grammar:g("Past simple in a diary","Use past forms to retell completed events.",[["fall","I fell off my skateboard."],["take","My dad took me to hospital."],["see","We saw the receptionist first."],["say","The doctor said my arm wasn't broken."],["put","A nurse put on a bandage."]]),
        reading:r("A visit after an accident","Nagy falls from a skateboard and hurts his arm. At the hospital, a receptionist directs him, a doctor examines him, a porter takes him for an X-ray, and a nurse supports the arm with a bandage.",["Nagy's father takes him to hospital.","The receptionist sends him to Room 11.","The doctor orders an X-ray.","The X-ray shows the arm is not broken.","A nurse applies a supporting bandage.","His father advises him to avoid the skateboard for three weeks."],"A calm sequence of checks can rule out a serious injury and guide safe recovery."),
        questions:[q("Who did Nagy see first?",["The receptionist","The cook","The athlete","The farmer"],"The receptionist","The receptionist gave directions before he met the doctor."),tf("Nagy's X-ray showed a broken arm.",false,"The doctor said the arm was not broken.")]
      },
      {
        id:"h-4",title:"Write a Hospital Diary",subtitle:"Plan, order, and describe a visit clearly",cover:"hospital-4",
        vocab:[v("plan","to decide what to include before writing","Make a plan before writing the diary."),v("event","something that happens","Put the events in the correct order."),v("first","before all other events","First, my mom took me to hospital."),v("next","immediately after something","Next, I met the nurse."),v("then","after that","Then, I had an X-ray."),v("finally","at the end","Finally, I went home."),v("describe","to give details about something","Describe how the accident happened."),v("treatment","medical care given for an illness or injury","The diary explains the treatment."),v("recover","to become healthy again","The patient rested to recover."),v("safety","being protected from danger","The writer ends with safety advice.")],
        phrases:["How did it happen?","Who took you?","What happened next?","Did you stay overnight?","First... Next... Then... Finally..."],
        notes:["A clear diary has a beginning, middle, and end.","Use time-order words to guide the reader.","Keep verb tense consistent when retelling completed events."],
        grammar:g("Organizing a recount","Use sequence words plus past-simple verbs.",[["Beginning","First, I hurt my leg."],["Movement","Next, my dad took me to hospital."],["Treatment","Then, a nurse helped me."],["Ending","Finally, I went home."]]),
        reading:r("Plan a clear diary","The workbook prompts the writer to explain the injury, journey to hospital, people met, treatment, food or overnight stay, and final result.",["Answer planning questions before drafting.","Choose the most important events.","Keep the events in time order.","Use specific hospital vocabulary.","End with the result or advice."],"Planning turns a list of memories into a clear, readable recount."),
        questions:[q("Which word usually introduces the last event?",["Finally","First","Because","Ever"],"Finally","Finally signals the end of a sequence."),tf("A diary about a completed visit usually uses past verbs.",true,"Past simple is appropriate for completed events.")]
      }
    ]
  },
  {
    id:"fares",type:"Fiction Reader",title:"Fares and the Fish",cover:"story-cover",
    description:"A story about safety, disappointment, family support, patience, and recovery.",
    chapters:[
      {
        id:"s-1",title:"Fares the Swimmer",subtitle:"A dream, daily training, and a sunny ride",cover:"story-1",
        vocab:[v("Hurghada","an Egyptian city on the Red Sea","Fares lives in Hurghada."),v("train","to practice regularly for a sport","Fares trains in the pool every day."),v("athlete","a person trained in sport","He dreams of becoming an athlete."),v("competition","an event in which people try to win","Fares wants to win competitions."),v("sports center","a place with facilities for exercise","The pool is inside the sports center."),v("cycle","to ride a bicycle","Sometimes Fares cycles to the pool."),v("garage","a building or room used for a vehicle","He takes his bicycle from the garage."),v("helmet","hard head protection","His mother checks that he has a cycle helmet."),v("pool","a place filled with water for swimming","He trains in the pool for an hour."),v("dream","a strong hope for the future","Fares dreams of sporting success.")],
        phrases:["go swimming every day","train for an hour","live close to the sports center","put on a helmet","feel happy"],
        notes:["Train can mean practice for sport or a railway vehicle; here it is a verb.","Cycle is both a noun and a verb; bicycle is commonly the noun.","Safety equipment should be used even on a familiar route."],
        grammar:g("Past simple story opening","Use past simple to introduce completed story events.",[["live","Fares lived in Hurghada."],["love","He loved swimming."],["go","He went swimming every day."],["want","He wanted to be an athlete."]]),
        reading:r("A focused young swimmer","Fares lives close to a sports center in Hurghada. He swims and trains every day because he wants to become an athlete and win competitions. One sunny morning he cycles toward the pool wearing his helmet.",["Swimming is Fares's favorite activity.","He trains for one hour every day.","His family lives near the sports center.","He sometimes walks and sometimes cycles.","His mother reminds him to wear his helmet."],"A dream becomes realistic through regular practice and safe habits."),
        questions:[q("What sport does Fares love?",["Swimming","Running","Tennis","Basketball"],"Swimming","He swims and trains every day."),tf("Fares lives far away from the sports center.",false,"His family lives close to it.")]
      },
      {
        id:"s-2",title:"The Skateboard Accident",subtitle:"A risky choice, a fall, and an ambulance",cover:"story-2",
        vocab:[v("skateboard","a board with wheels used for riding","Adam and his friends ride skateboards."),v("knee pad","protective padding worn on the knee","Fares asks why Adam is not wearing knee pads."),v("ramp","a sloping surface used to move up or down","Fares stands at the top of the ramp."),v("push","to move something away using force","He pushes with his feet."),v("slip","to slide accidentally and lose balance","Fares slips on the skateboard."),v("fall","to move suddenly down to the ground","He falls at the bottom of the ramp."),v("hurt","to feel pain after an injury","His leg hurts."),v("worried","feeling that something bad may happen","Adam is worried about Fares."),v("ambulance","a vehicle that carries sick or injured people","Adam calls an ambulance."),v("broken","cracked or separated","Adam thinks the leg might be broken.")],
        phrases:["be careful","try skateboarding","stand at the top of the ramp","go too fast","call an ambulance"],
        notes:["Protective equipment reduces injury risk but does not make a dangerous action perfectly safe.","The past of slip is slipped; the past of fall is fell.","Might be broken expresses uncertainty before an X-ray."],
        grammar:g("Past simple and might","Use past verbs for events and might for an uncertain possibility.",[["Past action","Fares stood on the skateboard."],["Past action","He slipped and fell."],["Possibility","His leg might be broken."],["Plan","Adam is going to call an ambulance."]]),
        reading:r("A decision changes the day","Fares meets friends at the park and tries a skateboard for the first time. He rides down a ramp too quickly, slips, falls, and cannot move his painful leg. Adam calls Fares's mother and an ambulance.",["Adam is not wearing a helmet or knee pads.","Fares has never tried skateboarding before.","He accepts the invitation to try.","The ramp feels easy, but he goes too fast.","He falls and cannot move his leg.","Adam responds by calling for adult and medical help."],"Confidence without preparation or protection can turn a fun activity into a serious accident."),
        questions:[q("Why does Fares fall?",["He goes too fast and slips.","He is swimming underwater.","He is wearing a cast.","He is eating dates."],"He goes too fast and slips.","Speed and inexperience make him lose balance."),tf("Fares had tried skateboarding many times before.",false,"He says he has not tried it before.")]
      },
      {
        id:"s-3",title:"The Cast and the Apology",subtitle:"Bad news, difficult feelings, and family understanding",cover:"story-3",
        vocab:[v("X-ray","an image used to look at bones","The hospital takes an X-ray of Fares's leg."),v("cast","a hard covering that holds a broken bone still","Fares must wear a cast for about six weeks."),v("bone","a hard part of the skeleton","Fares sees the broken bone in the picture."),v("rude","not polite or respectful","Fares realizes he was rude to his family."),v("apologize","to say sorry","He apologizes later that evening."),v("understand","to know why someone feels or acts a certain way","His mother says the family understands."),v("accident","an unexpected event that causes damage or injury","The fall was a serious accident."),v("angry","feeling strong displeasure","Fares feels angry after the accident."),v("sad","unhappy","He is sad because he cannot swim."),v("movie","a story shown on a screen","The family watches a movie together.")],
        phrases:["wear a cast for six weeks","feel angry and sad","borrow a comic","say go away","apologize to the family","watch a movie together"],
        notes:["Feelings explain behavior but do not excuse hurting other people.","Apologize to a person for an action: He apologized to his family for being rude.","Understand does not always mean agree; it can mean recognize another person's feelings."],
        grammar:g("Past feelings and reasons","Use was/were for past states and because to explain a reason.",[["State","Fares was sad."],["Pain","His leg was broken."],["Reason","He was angry because he couldn't swim."],["Repair","He apologized because he had been rude."]]),
        reading:r("A hard evening","An X-ray confirms that Fares's leg is broken, and the doctor says he will need a cast. At home he rejects his siblings' attempts to help, then recognizes his rude behavior and apologizes. His family accepts his feelings and stays close.",["The X-ray shows a broken leg.","The cast may stay on for about six weeks.","Fares worries about missing swimming.","He speaks rudely to Wael and Dalia.","Later he apologizes honestly.","The family watches a movie together."],"Naming feelings and apologizing help a family move through disappointment together."),
        questions:[q("Why is Fares especially sad?",["He cannot swim while his leg heals.","He lost a food label.","He must build a dam.","He forgot a world record."],"He cannot swim while his leg heals.","Swimming is his daily sport and dream."),tf("Fares apologizes to his family.",true,"He says he is sorry for being rude.")]
      },
      {
        id:"s-4",title:"A Fish-Tank Surprise",subtitle:"Care, patience, and a new responsibility",cover:"story-4",
        vocab:[v("surprise","something unexpected","Dad and Dalia prepare a surprise."),v("fish tank","a glass container where fish live","Dad places a large fish tank in the room."),v("beautiful","very pleasing to see","Fares thinks the fish are beautiful."),v("count","to say numbers in order to find an amount","There are too many fish to count quickly."),v("feed","to give food to a person or animal","Fares feeds the fish."),v("clean","to remove dirt","He keeps the fish tank water clean."),v("rest","to relax so the body can recover","Fares rests while his leg heals."),v("slowly","at a low speed or over time","Slowly, his leg gets better."),v("type","a group of things with shared features","He learns the names of different types of fish."),v("responsibility","a duty to care for something","Feeding the fish becomes Fares's responsibility.")],
        phrases:["carry a fish tank","too many to count","learn the names","keep the water clean","get better slowly"],
        notes:["Too many is used with countable plural nouns such as fish.","Fish can be singular or plural when talking about animals of the same kind.","Caring for an animal requires regular feeding and clean water."],
        grammar:g("Too many and enough","Use too many with plural countable nouns and enough for a suitable amount.",[["Large count","There are too many fish to count."],["Suitable amount","The fish have enough food."],["Not enough","There isn't enough clean water."],["Progress","Fares has rested enough today."]]),
        reading:r("A thoughtful gift","Dad and Dalia bring a large fish tank to Fares's room. Watching and caring for the fish reconnects him with the water world he loves while his leg rests and heals.",["The family prepares boxes in the kitchen.","Dad carries the tank into Fares's room.","Fares is delighted by the many fish.","He learns their names and feeds them.","He keeps the water clean.","His mood and leg improve gradually."],"Support is strongest when it responds to what a person truly cares about."),
        questions:[q("How does Fares care for the fish?",["He feeds them and keeps the water clean.","He teaches them to cycle.","He puts them in a cast.","He measures their race time."],"He feeds them and keeps the water clean.","Feeding and clean water are part of responsible care."),tf("The fish tank helps Fares feel happier while he recovers.",true,"It connects him to his love of water and gives him a positive responsibility.")]
      },
      {
        id:"s-5",title:"Swimming Like a Fish",subtitle:"Recovery, the beach, and an underwater surprise",cover:"story-5",
        vocab:[v("recover","to become healthy again","Fares recovers after two months."),v("pack","to put things together for a trip","The family packs for the beach."),v("beach","land beside the sea","The family spends a day at the beach."),v("mask","equipment worn over the eyes and nose underwater","Dad gives Fares a diving mask."),v("snorkel","a tube used to breathe while the face is underwater","Fares breathes through a snorkel."),v("underwater","below the surface of water","He looks at fish underwater."),v("breathe","to take air into and out of the lungs","The snorkel helps him breathe."),v("sea","a large area of salt water","Fares swims in the sea."),v("surprise","an unexpected gift or event","Dad has one more surprise."),v("laugh","to make a happy sound","Fares laughs with delight.")],
        phrases:["take off the cast","walk and run again","go to the beach","breathe underwater","look under the water","swim like a fish"],
        notes:["After two months is a finished past-time marker, so the story uses past simple.","A snorkel helps a swimmer breathe near the surface; it is not the same as a diving air tank.","Recovery requires time, rest, medical advice, and gradual return to activity."],
        grammar:g("Could and couldn't","Use could for past ability and couldn't for past inability.",[["Before recovery","Fares couldn't swim."],["After recovery","He could walk and run."],["At the beach","He could breathe through the snorkel."],["Past question","Could he see fish underwater?"]]),
        reading:r("Back in the water","After two months, Fares no longer needs the cast and can walk and run. At the beach, his father gives him a mask and snorkel. Fares swims, sees fish underwater, and ends the story laughing with joy.",["The cast is removed after recovery.","The family plans a beach day.","Fares is eager to swim again.","The mask and snorkel reveal an underwater world.","He sees many fish in the sea.","His return to water completes both his physical and emotional recovery."],"Patience, family support, and safe return to activity help Fares rediscover his confidence."),
        questions:[q("What does Dad give Fares at the beach?",["A mask and snorkel","A skateboard ramp","A line graph","A sandbag"],"A mask and snorkel","They help him look and breathe near the water's surface."),tf("At the end, Fares can swim again.",true,"His recovery is complete enough for a happy beach swim.")]
      }
    ]
  }
];

const BADGES=[
  {id:"first-step",title:"First Step",description:"Complete your first lesson",symbol:"1"},
  {id:"word-star",title:"Word Star",description:"Answer 50 vocabulary questions",symbol:"W"},
  {id:"grammar-girl",title:"Grammar Girl",description:"Score 80% in a grammar-rich lesson",symbol:"G"},
  {id:"unit-hero",title:"Unit Hero",description:"Complete one full unit",symbol:"U"},
  {id:"reader",title:"Super Reader",description:"Complete a Reader chapter",symbol:"R"},
  {id:"water-wise",title:"Water Wise",description:"Complete Units 5 and 6",symbol:"H2O"},
  {id:"course-star",title:"Course Star",description:"Complete all six units",symbol:"CP"},
  {id:"perfect",title:"Perfect Round",description:"Get every question correct in a quiz",symbol:"100"}
];

const ALL_LESSONS=UNITS.flatMap(unit=>unit.lessons.map((lesson,index)=>({...lesson,index,unitId:unit.id,unitTitle:unit.title,kind:"unit"})));
const ALL_CHAPTERS=READERS.flatMap(reader=>reader.chapters.map((chapter,index)=>({...chapter,index,readerId:reader.id,readerTitle:reader.title,kind:"reader"})));
const ALL_CONTENT=[...ALL_LESSONS,...ALL_CHAPTERS];
