/**
 * Central health-guide library. Every "Read guide" surface in the app reads
 * from this list, so a new guide added here appears everywhere automatically.
 *
 * Content follows general paediatric guidance from WHO, UNICEF and the Indian
 * Academy of Pediatrics. It is educational only - see `guideDisclaimer`.
 */
export type GuideCategory = "Home Remedies" | "Doctor" | "Medicine";

export type HealthGuide = {
  id: string;
  title: string;
  desc: string;
  emoji: string;
  category: GuideCategory;
  intro: string;
  symptoms: string[];
  causes: string[];
  homeCare: string[];
  prevention: string[];
  nutrition: string[];
  warningSigns: string[];
  whenToSeeDoctor: string[];
  emergency: string[];
  tips: string[];
};

export const guideDisclaimer =
  "This guide is for general education only and does not replace a medical consultation. Always follow the advice of your paediatrician, especially for babies under 3 months, premature babies or children with existing medical conditions.";

export const healthGuides: HealthGuide[] = [
  {
    id: "fever", title: "Fever", desc: "Reading a baby's temperature correctly and knowing when it is serious.", emoji: "🌡️", category: "Doctor",
    intro: "Fever is a body temperature of 38°C (100.4°F) or higher. It is not an illness itself but a sign that the immune system is fighting an infection. Most childhood fevers are viral and settle within three days. How your baby behaves matters far more than the exact number on the thermometer.",
    symptoms: ["Warm forehead, chest and back", "Flushed cheeks and sweating or shivering", "Reduced appetite and feeding", "Irritability or unusual sleepiness", "Faster breathing and heart rate"],
    causes: ["Viral infections such as colds and flu", "Bacterial infections including ear, throat and urine infections", "Normal reaction in the 24-48 hours after a vaccination", "Overheating from too many layers of clothing", "Teething can raise temperature slightly but not above 38°C"],
    homeCare: ["Use a digital thermometer in the armpit for babies and record the reading with the time", "Dress the baby in one light cotton layer and keep the room airy", "Offer breast milk, formula or water more often than usual", "Sponge with lukewarm - never cold - water if the baby is uncomfortable", "Give paracetamol only at the weight-based dose your doctor prescribed"],
    prevention: ["Wash hands before handling or feeding the baby", "Keep the baby away from visitors who have cough or fever", "Complete every vaccination on schedule", "Continue breastfeeding for its protective antibodies", "Keep the home ventilated and clean feeding utensils properly"],
    nutrition: ["Increase fluids: breast milk, ORS, dal water, coconut water after 6 months", "Offer small frequent portions of soft food such as kanji or khichdi", "Do not force-feed; appetite returns as the fever settles", "Avoid heavy fried food and cold drinks", "Vitamin-C fruits such as orange or guava after 8 months help recovery"],
    warningSigns: ["Fever in any baby under 3 months", "Temperature above 39°C that will not come down", "Fever lasting more than 3 days", "Refusing all feeds or far fewer wet nappies", "Unusual drowsiness, floppiness or a weak high-pitched cry"],
    whenToSeeDoctor: ["Any fever in a baby under 3 months - go the same day", "Fever with rash, stiff neck or persistent vomiting", "Fever that returns after settling for 24 hours", "Fever with ear pain, burning urine or breathing difficulty", "You are simply worried - trust your instinct"],
    emergency: ["A fit or seizure", "Blue lips, grunting or laboured breathing", "A rash that does not fade when pressed with a glass", "Unresponsive or very difficult to wake", "Sunken fontanelle with no urine for 8 hours"],
    tips: ["Never use aspirin in children", "Do not alternate medicines unless your doctor tells you to", "Keep a simple log of temperature, medicine and feeds", "Cold sponging and ice packs cause shivering and raise the core temperature"],
  },
  {
    id: "cold", title: "Common Cold", desc: "Managing a blocked nose and runny nose safely at home.", emoji: "🤧", category: "Home Remedies",
    intro: "Colds are caused by viruses and a baby may catch six to eight of them in the first year. They usually last 7 to 10 days and antibiotics do not help. The main aim of care is to keep the nose clear so the baby can feed and sleep.",
    symptoms: ["Runny or blocked nose with clear then thick discharge", "Sneezing and mild cough", "Low-grade fever", "Noisy or snuffly breathing while feeding", "Slightly reduced appetite and disturbed sleep"],
    causes: ["Rhinovirus and other common respiratory viruses", "Close contact with an infected child or adult", "Sudden weather changes and dusty environments", "Crowded places and daycare", "Cigarette smoke in the home irritates the airway"],
    homeCare: ["Put 1-2 drops of sterile saline in each nostril and gently suction with a bulb syringe", "Raise the head end of the mattress slightly - never use a pillow under the baby", "Run steam in the bathroom and sit with the baby for a few minutes", "Feed smaller amounts more often since a blocked nose tires the baby", "Wipe the nose with a soft damp cloth to prevent soreness"],
    prevention: ["Frequent handwashing for everyone in the house", "Keep the baby away from people with colds", "No smoking anywhere indoors", "Continue breastfeeding", "Wash toys and bedding regularly"],
    nutrition: ["Warm fluids such as dal water and thin kanji", "Continue breast milk on demand", "Steamed apple, warm khichdi and vegetable broth", "Avoid cold and refrigerated food", "Do not give honey before 12 months"],
    warningSigns: ["Fast or laboured breathing, chest drawing in", "Fever above 38.5°C or lasting over 3 days", "Refusing feeds for more than 24 hours", "Cold lasting more than 10 days or getting worse after day 5", "Ear pulling with crying, which may mean an ear infection"],
    whenToSeeDoctor: ["Baby under 3 months with any cold and fever", "Wheezing or a barking cough", "Green discharge with fever after a week", "Not gaining weight due to poor feeding", "Repeated colds with wheeze that suggest allergy or asthma"],
    emergency: ["Blue or grey lips or tongue", "Pauses in breathing", "Severe chest indrawing and grunting", "Extreme lethargy or unresponsiveness"],
    tips: ["Never give over-the-counter cold or decongestant medicines under 2 years", "Saline drops before feeds and sleep work best", "Keep the room humid but not damp", "Discard used tissues immediately"],
  },
  {
    id: "cough", title: "Cough", desc: "Telling a harmless cough apart from one that needs review.", emoji: "😮‍💨", category: "Home Remedies",
    intro: "Coughing is a protective reflex that clears the airway. Most coughs in babies come with a cold and improve in one to two weeks. The sound of the cough, the breathing rate and the baby's energy tell you far more than how often it happens.",
    symptoms: ["Dry tickly cough or a wet rattly cough", "Cough that worsens at night or with feeds", "Occasional vomiting after a coughing bout", "Hoarse voice or a barking sound in croup", "Wheezing whistle on breathing out"],
    causes: ["Viral respiratory infections", "Post-nasal drip from a blocked nose", "Reflux of feeds into the throat", "Dust, smoke and strong perfumes", "Asthma or allergy in older babies"],
    homeCare: ["Keep the baby upright for 20 minutes after every feed", "Offer frequent small sips of warm fluid", "Use saline nose drops so the baby does not breathe through the mouth", "Keep the air free of smoke, incense and mosquito coils", "Steam inhalation in a closed bathroom for 5 minutes"],
    prevention: ["Avoid dust and strong household sprays", "Wash hands and keep sick contacts away", "Complete pertussis (DTP) vaccination on time", "Keep bedding dust-mite free", "Treat reflux and allergies as advised"],
    nutrition: ["Warm soups and dal water soothe the throat", "Small frequent meals to avoid coughing while full", "Turmeric milk after 12 months", "Avoid cold drinks, curd at night and fried snacks", "Honey with warm water only after 12 months"],
    warningSigns: ["Breathing faster than 50 breaths per minute in an infant", "Chest wall pulling in with each breath", "Cough with high fever lasting more than 3 days", "Cough lasting over 3 weeks", "Coughing up blood or thick green sputum with fever"],
    whenToSeeDoctor: ["Any cough with breathing difficulty", "Barking cough with noisy breathing at rest", "Cough that started suddenly after eating a nut or seed", "Night cough disturbing sleep every night", "Baby under 3 months with a persistent cough"],
    emergency: ["Sudden choking followed by continuous coughing", "Blue lips, grunting or gasping", "Unable to cry, feed or speak", "Collapse or extreme lethargy"],
    tips: ["Cough syrups are not recommended under 2 years", "A cough usually outlasts the cold by a week - that is normal", "Note whether the cough is worse at night or with activity for the doctor", "Never give a family member's prescribed medicine to a baby"],
  },
  {
    id: "vomiting", title: "Vomiting", desc: "Separating harmless spit-up from true vomiting.", emoji: "🤢", category: "Doctor",
    intro: "Spit-up is an effortless dribble of milk and is normal in the first year. Vomiting is forceful and can quickly dehydrate a baby. Most vomiting is caused by a stomach virus and stops within 24 hours with careful fluid replacement.",
    symptoms: ["Forceful throwing up rather than dribbling", "Refusing feeds afterwards", "Tummy pain, crying and drawing up the legs", "Fever or loose stools with a stomach infection", "Fewer wet nappies"],
    causes: ["Viral gastroenteritis", "Overfeeding or swallowing air", "Gastro-oesophageal reflux", "Cow milk protein allergy or a new food", "Infections elsewhere such as urine or ear infection"],
    homeCare: ["Stop solids for a few hours and offer ORS 5 ml every 5 minutes", "Continue breastfeeding in shorter, more frequent sessions", "Keep the baby upright for 30 minutes after feeds", "Reintroduce bland food such as kanji or curd rice once vomiting stops", "Burp the baby well mid-feed and after"],
    prevention: ["Do not overfeed - watch for the baby turning away", "Boil drinking water and wash hands before feeds", "Sterilise bottles and store milk safely", "Give the rotavirus vaccine on schedule", "Avoid vigorous play right after a feed"],
    nutrition: ["ORS in small frequent sips is the priority", "Return to normal diet within 24 hours of stopping vomiting", "Bland soft food: kanji, khichdi, curd rice, banana", "Avoid fruit juices and fizzy drinks", "Continue breast milk throughout - never stop it"],
    warningSigns: ["Green or yellow bile-stained vomit", "Blood in vomit or coffee-coloured specks", "Projectile vomiting after every feed in a baby 2-8 weeks old", "No urine for 6-8 hours", "Swollen, hard or very tender tummy"],
    whenToSeeDoctor: ["Vomiting continuing beyond 8-12 hours", "Signs of dehydration: dry mouth, sunken eyes, no tears", "Vomiting with high fever or severe diarrhoea", "Vomiting after a head injury", "Weight loss or poor weight gain"],
    emergency: ["Bile-stained or bloody vomit", "Baby is floppy, cold or unresponsive", "Severe dehydration with sunken fontanelle", "Vomiting with a seizure or a stiff neck"],
    tips: ["Never give anti-vomiting medicine without a prescription", "ORS beats plain water because it replaces salts", "Record how many times the baby vomits and passes urine", "Wash hands thoroughly - stomach viruses spread fast in a family"],
  },
  {
    id: "diarrhea", title: "Diarrhoea", desc: "Preventing dehydration - the real danger in loose stools.", emoji: "💧", category: "Doctor",
    intro: "Diarrhoea means three or more loose watery stools in a day, or stools that are noticeably looser and more frequent than usual for that baby. Breastfed newborns naturally pass soft frequent stools, which is not diarrhoea. WHO recommends ORS plus zinc as the core treatment.",
    symptoms: ["Frequent loose or watery stools", "Tummy cramps and crying before passing stool", "Nappy rash from the acidic stool", "Fever or vomiting with an infection", "Thirst, dry lips and fewer wet nappies"],
    causes: ["Rotavirus and other viral infections", "Contaminated water or food", "Antibiotic courses upsetting gut bacteria", "Lactose or food intolerance", "Too much fruit juice"],
    homeCare: ["Give ORS after every loose stool - 50-100 ml for babies under 2 years", "Give zinc supplement for 14 days as prescribed", "Continue breastfeeding and normal food", "Change nappies promptly and apply a barrier cream", "Wash hands after every nappy change"],
    prevention: ["Rotavirus vaccination on schedule", "Boiled or filtered drinking water", "Exclusive breastfeeding for the first 6 months", "Clean utensils and freshly cooked food", "Safe handwashing with soap"],
    nutrition: ["ORS is the treatment - continue food alongside", "Curd rice, banana, apple, rice kanji and moong dal water", "Avoid fruit juice, sugary drinks and fatty food", "Offer one extra meal daily for two weeks after recovery", "Do not dilute formula or stop milk"],
    warningSigns: ["Blood or mucus in the stool", "No urine for 6-8 hours", "Sunken eyes or fontanelle, no tears when crying", "Very sleepy or unusually irritable", "Diarrhoea lasting more than 7 days"],
    whenToSeeDoctor: ["Diarrhoea in a baby under 6 months", "More than 8 loose stools in 24 hours", "Any sign of dehydration", "Persistent high fever", "Baby refusing ORS or vomiting it back repeatedly"],
    emergency: ["Baby is limp, cold or unresponsive", "No urine for over 12 hours", "Continuous vomiting with watery stools", "Blood-stained stools with high fever"],
    tips: ["Anti-diarrhoeal medicines are unsafe for babies", "Make ORS with boiled cooled water and use within 24 hours", "Home-made salt-sugar water is a stopgap only - buy ORS sachets", "Keep a nappy-change log to judge urine output"],
  },
  {
    id: "constipation", title: "Constipation", desc: "Hard, painful stools and how to soften them naturally.", emoji: "🚼", category: "Home Remedies",
    intro: "Constipation means hard, pellet-like or painful stools - not simply infrequent ones. A fully breastfed baby can go several days without passing stool and still be normal. It most often appears when solids or formula are introduced.",
    symptoms: ["Hard, dry or pellet-like stools", "Straining, crying and a red face while passing stool", "Firm tummy and reduced appetite", "Small streaks of blood from a tiny anal tear", "Passing stool less often than usual for that baby"],
    causes: ["Starting solids, especially rice cereal and banana", "Not enough fluids, particularly in hot weather", "Switching from breast milk to formula", "Low fibre in the diet", "Holding stool because a previous one hurt"],
    homeCare: ["Offer extra water between meals after 6 months", "Give prune, pear or apple purée once a day", "Bicycle the baby's legs and massage the tummy clockwise", "A warm bath relaxes the muscles before a bowel movement", "Increase vegetables and whole grains in the diet"],
    prevention: ["Balanced fibre from vegetables, dals and fruit", "Adequate fluids for the weather", "Regular tummy time and floor play", "Avoid excessive rice cereal and refined foods", "Do not delay toilet needs once the child signals"],
    nutrition: ["Prunes, pears, peaches, plums and apricots", "Ragi, oats and whole wheat porridge", "Spinach dal, pumpkin and beans", "Plenty of water after 6 months", "Reduce banana, apple sauce and white rice temporarily"],
    warningSigns: ["Constipation in a baby under 1 month", "Persistent blood in the stool", "Vomiting with a swollen tummy", "Weight loss or poor growth", "No stool at all for more than 5-7 days with distress"],
    whenToSeeDoctor: ["Constipation not improving after a week of diet change", "Severe pain or repeated bleeding", "A visible bulge in the groin or navel", "Baby is not gaining weight", "Recurring constipation needing repeated home treatment"],
    emergency: ["Hard swollen tummy with green vomit", "No stool and no gas passing with severe crying", "Baby is very lethargic or refusing all feeds"],
    tips: ["Never use adult laxatives or soap sticks", "Glycerine suppositories only if the doctor advises", "Track stool frequency and texture for the visit", "Sudden diet change is the most common trigger - go slowly"],
  },
  {
    id: "dehydration", title: "Dehydration", desc: "Spotting fluid loss early and replacing it correctly.", emoji: "🥤", category: "Doctor",
    intro: "Babies dehydrate faster than adults because they hold less water and lose it quickly through diarrhoea, vomiting, fever and hot weather. Recognising early signs and giving ORS at once prevents a hospital admission.",
    symptoms: ["Fewer than 6 wet nappies in 24 hours", "Dry mouth and lips, no tears when crying", "Sunken eyes and a sunken soft spot", "Unusual sleepiness or irritability", "Dark, strong-smelling urine"],
    causes: ["Diarrhoea and vomiting", "High fever and sweating", "Hot humid weather with insufficient feeds", "Poor feeding due to a blocked nose or mouth ulcers", "Excessive sweating during illness"],
    homeCare: ["Give ORS in 5 ml sips every 5 minutes even if the baby vomits", "Continue breastfeeding as often as the baby wants", "Keep the baby in a cool, shaded and airy place", "Record every wet nappy for the day", "Dress the baby in light cotton clothing"],
    prevention: ["Feed more often in hot weather and during illness", "Start ORS at the very first loose stool", "Rotavirus vaccine on schedule", "Boiled and safely stored drinking water", "Never leave a baby in a hot car or direct sun"],
    nutrition: ["ORS is the first line - not plain water alone", "Breast milk, coconut water and rice kanji water after 6 months", "Curd rice and moong dal water to rebuild strength", "Avoid sugary juices and soft drinks which worsen fluid loss", "Small frequent feeds rather than large ones"],
    warningSigns: ["No urine for 6-8 hours", "Sunken fontanelle", "Skin that stays pinched when lifted", "Very rapid breathing or heartbeat", "Cold hands and feet with a mottled skin colour"],
    whenToSeeDoctor: ["Any baby under 6 months with vomiting and diarrhoea", "ORS being refused or vomited repeatedly", "Moderate signs of dehydration present", "Illness lasting more than 24 hours with reduced urine", "Weight loss of more than 5 percent"],
    emergency: ["Unresponsive, floppy or very difficult to wake", "No urine for 12 hours", "Cold clammy skin with rapid breathing", "Seizure"],
    tips: ["Weigh the baby daily during a diarrhoeal illness if you can", "One sachet of ORS makes exactly one litre - never make it stronger", "Discard prepared ORS after 24 hours", "Keep two ORS sachets and zinc syrup at home at all times"],
  },
  {
    id: "teething", title: "Teething", desc: "Comfort measures for sore gums and what teething is not.", emoji: "🦷", category: "Home Remedies",
    intro: "The first tooth usually appears between 4 and 10 months, most often the lower front pair. Teething causes gum discomfort, drooling and chewing - it does not cause high fever, diarrhoea or a cough. Blaming those on teething can delay treatment of a real illness.",
    symptoms: ["Excess drooling and a drool rash on the chin", "Chewing and biting on everything", "Swollen tender gums", "Irritability and disturbed sleep", "Slightly reduced appetite"],
    causes: ["Normal eruption of the milk teeth through the gum", "Pressure and inflammation of the gum tissue", "Individual variation - some babies teethe at 3 months, others after 12"],
    homeCare: ["Rub the gums with a clean finger for a minute", "Offer a chilled - not frozen - silicone teether", "Wipe the chin often and apply a barrier cream", "Offer a chilled cucumber stick under supervision after 8 months", "Extra cuddles and distraction during fussy evenings"],
    prevention: ["Clean the gums with a soft damp cloth twice a day from birth", "Brush the first tooth with a rice-grain smear of fluoride toothpaste", "No bottle in bed and no sweetened drinks", "Avoid dipping soothers in honey or sugar", "First dental visit by the first birthday"],
    nutrition: ["Cool soft foods: curd, apple purée, chilled yoghurt after 8 months", "Firm safe finger foods to chew on", "Calcium foods: milk, ragi, paneer, sesame", "Avoid hard biscuits which can break and choke", "Keep offering normal meals even when appetite dips"],
    warningSigns: ["Fever above 38°C - this is not teething", "Diarrhoea or vomiting - look for another cause", "No teeth at all by 15-18 months", "Bleeding, ulcerated or pus-filled gums", "Refusing all food for over 24 hours"],
    whenToSeeDoctor: ["Fever or diarrhoea being attributed to teething", "No tooth by 18 months", "Teeth erupting with severe swelling or infection", "Discoloured or malformed teeth", "Persistent pain not relieved by simple measures"],
    emergency: ["Choking on a teether or a broken piece of one", "Severe facial swelling with fever"],
    tips: ["Never use teething gels containing benzocaine or salicylate", "Amber teething necklaces are a strangulation and choking risk", "Freeze teethers only until chilled, never rock hard", "Sterilise teethers daily"],
  },
  {
    id: "vaccination", title: "Vaccination", desc: "The immunisation schedule and how to handle after-effects.", emoji: "💉", category: "Doctor",
    intro: "Vaccines train the immune system safely and are the single most effective protection against serious childhood illness. The Indian Academy of Pediatrics schedule starts at birth and continues through adolescence. Mild fever and soreness afterwards mean the immune system is responding.",
    symptoms: ["Low-grade fever within 24 hours", "Redness, swelling or a small lump at the injection site", "Fussiness and extra sleepiness for a day", "Reduced appetite for one or two feeds", "A small BCG scar developing over 6-8 weeks"],
    causes: ["Normal immune response to the vaccine antigen", "Local inflammation at the injection site", "Live vaccines such as MMR may cause a mild fever 5-12 days later"],
    homeCare: ["Give paracetamol at the prescribed dose only if the baby is uncomfortable", "Apply a cool clean cloth to the injection site", "Breastfeed more often for comfort and hydration", "Keep the site clean and dry - do not massage or apply pastes", "Dress the baby lightly"],
    prevention: ["Keep the immunisation card updated at every visit", "Never skip or delay a dose without medical advice", "Inform the doctor of allergies or previous reactions", "Mild cold without fever is not a reason to postpone", "Catch up missed doses as soon as possible"],
    nutrition: ["Extra breast milk or fluids on vaccination day", "Normal diet - no special food is needed", "Soft comforting food if the appetite dips", "Iron and vitamin D supplements as prescribed continue as usual"],
    warningSigns: ["Fever above 39°C or lasting beyond 48 hours", "Continuous inconsolable crying for over 3 hours", "A large hard swelling spreading beyond the injection site", "Extreme drowsiness or floppiness", "Rash spreading over the body"],
    whenToSeeDoctor: ["Any fever in a baby under 3 months after a vaccine", "Swelling with pus or increasing redness after 48 hours", "A previous severe reaction before the next dose", "Baby with a chronic illness needing a modified schedule", "Missed doses to be rescheduled"],
    emergency: ["Difficulty breathing or facial and lip swelling", "Collapse or unresponsiveness", "A seizure", "Widespread hives immediately after a vaccine"],
    tips: ["Feed the baby just before the injection to calm them", "Note the date and batch in the immunisation card", "Serious reactions are extremely rare - the disease risk is far higher", "Keep the card safe; schools and travel require it"],
  },
  {
    id: "sleep", title: "Baby Sleep", desc: "Safe sleep practices and settling routines by age.", emoji: "😴", category: "Home Remedies",
    intro: "Newborns sleep 14-17 hours in short blocks; by one year most babies sleep 11-14 hours including two naps. Night waking is normal in the first year. Safe sleep positioning is the single most important step in preventing sudden infant death.",
    symptoms: ["Rubbing eyes, yawning and staring blankly", "Fussiness and clinginess when overtired", "Short catnaps and frequent waking", "Fighting sleep at bedtime", "Early morning waking"],
    causes: ["Hunger, wind or a wet nappy", "Overtiredness from a missed nap window", "Too much light, noise or heat", "Teething or a blocked nose", "Developmental leaps such as crawling or standing"],
    homeCare: ["Always place the baby on the back to sleep on a firm flat mattress", "Keep the cot free of pillows, quilts, bumpers and soft toys", "Follow the same short routine nightly: bath, feed, dim light, song", "Put the baby down drowsy but awake so they learn to self-settle", "Keep the room at a comfortable 24-26°C"],
    prevention: ["Room-share for the first 6 months but do not bed-share", "No smoking around the baby", "Avoid overheating - one light layer more than an adult wears", "Consistent nap timings during the day", "No screens in the hour before bed"],
    nutrition: ["A full feed before bedtime reduces early waking", "Avoid heavy or new foods at dinner", "Milk before brushing, never a bottle in the cot", "Iron deficiency can disturb sleep - keep the diet iron rich"],
    warningSigns: ["Snoring with pauses in breathing", "Sweating heavily during feeds and sleep", "Extreme difficulty waking the baby", "Sleeping far more than usual during illness", "No settled sleep pattern at all after 6 months"],
    whenToSeeDoctor: ["Loud snoring or breathing pauses", "Poor weight gain with disturbed sleep", "Persistent night waking with pain-like crying", "Suspected reflux keeping the baby upright all night", "Parental exhaustion affecting your wellbeing"],
    emergency: ["Baby found blue, limp or not breathing - call emergency services and start rescue breathing", "Breathing pauses longer than 20 seconds"],
    tips: ["Back to sleep, tummy to play", "Swaddle only until the baby starts rolling", "A dark quiet room helps consolidate naps", "Night feeds are normal in the first year - do not rush to stop them"],
  },
  {
    id: "milestones", title: "Growth Milestones", desc: "What to expect month by month in the first three years.", emoji: "📈", category: "Doctor",
    intro: "Milestones are the skills most children gain by a certain age - smiling, sitting, walking, talking. There is a wide normal range, and premature babies are assessed by corrected age. Track the sequence rather than the exact date.",
    symptoms: ["2 months: social smile, follows objects with the eyes", "6 months: rolls over, sits with support, babbles", "9 months: sits alone, crawls, responds to their name", "12 months: pulls to stand, waves, says one or two words", "24 months: runs, two-word phrases, uses a spoon"],
    causes: ["Genetics and family pattern", "Nutrition, especially iron, protein and vitamin D", "Opportunity to practise - floor time and play", "Prematurity delays milestones by the corrected age", "Chronic illness or frequent infections"],
    homeCare: ["Give plenty of supervised tummy time from the newborn period", "Talk, sing and read aloud every day", "Offer safe floor space instead of long periods in a walker", "Respond to babble to build two-way communication", "Record milestones with dates in the growth section of the app"],
    prevention: ["Attend all well-baby checks", "Iron-rich weaning food from 6 months", "Vitamin D supplement as advised", "Limit screen time to zero before 2 years", "Treat ear infections promptly to protect hearing"],
    nutrition: ["Iron: ragi, dal, spinach, meat, egg yolk", "Protein at every meal for muscle strength", "Healthy fats: ghee, nuts ground fine, avocado for brain growth", "Calcium and vitamin D for bone strength", "Avoid excess milk after one year - it displaces iron-rich food"],
    warningSigns: ["No social smile by 3 months", "Not sitting without support by 9 months", "No babbling or gestures by 12 months", "Not walking by 18 months", "Loss of a skill the child previously had"],
    whenToSeeDoctor: ["Any red flag milestone above", "Persistent floppiness or stiffness of the limbs", "Squint after 3 months of age", "Little eye contact or response to name at 12 months", "You feel something is different - ask for a developmental review"],
    emergency: ["Sudden loss of previously gained skills", "A seizure with loss of consciousness", "Sudden weakness on one side of the body"],
    tips: ["Compare the child with their own past progress, not with other children", "Use corrected age for premature babies until 2 years", "Early intervention works best when started young", "Photographs and dated notes make reviews far easier"],
  },
  {
    id: "developmental-delay", title: "Development Delays", desc: "Recognising delay early and what happens next.", emoji: "🧩", category: "Doctor",
    intro: "A developmental delay means a child is significantly behind the expected range in one or more areas - motor, speech, social or cognitive. Early identification and therapy dramatically improve outcomes, so raising a concern early is always the right choice.",
    symptoms: ["Not meeting milestones for the age band", "Limited eye contact or social smiling", "No pointing, waving or gestures by 12-15 months", "Speech far behind peers", "Poor head control or unusual muscle tone"],
    causes: ["Prematurity and low birth weight", "Birth complications and low oxygen", "Genetic and chromosomal conditions", "Hearing or vision impairment", "Severe malnutrition, iron deficiency or lack of stimulation"],
    homeCare: ["Daily one-to-one play, naming objects and actions", "Reduce background TV noise so speech is clearer", "Encourage floor play, crawling and reaching", "Follow the therapy exercises given by the specialist", "Keep routines predictable to build security"],
    prevention: ["Regular antenatal care and safe delivery", "Newborn hearing screening", "Complete vaccination and good nutrition", "Regular developmental checks at 9, 18 and 24 months", "Zero screen time before 2 years"],
    nutrition: ["Iron, iodine, zinc and vitamin B12 are critical for brain development", "Omega-3 from fish, walnuts ground fine and flax", "Adequate protein and calories to support growth", "Correct anaemia promptly with medical guidance", "Vitamin D supplementation as prescribed"],
    warningSigns: ["Loss of skills already achieved", "No response to loud sounds", "Stiff or very floppy limbs", "Repetitive behaviours with no social interest", "Frequent unexplained falls in a walking child"],
    whenToSeeDoctor: ["As soon as any red flag appears - do not wait and watch", "Family history of developmental or genetic conditions", "Parental concern about hearing, vision or speech", "Behaviour that isolates the child from other children", "Regression at any age"],
    emergency: ["Seizures", "Sudden loss of consciousness or one-sided weakness"],
    tips: ["Waiting rarely helps; assessment costs nothing but time", "Speech, occupational and physiotherapy work best together", "Involve grandparents and carers so practice is consistent", "Record short videos of the behaviour to show the specialist"],
  },
  {
    id: "rashes", title: "Skin Rashes", desc: "Nappy rash, heat rash, eczema and infectious rashes.", emoji: "🩹", category: "Home Remedies",
    intro: "Baby skin is thin and reacts easily. Most rashes are harmless: heat rash, nappy rash and mild eczema respond to simple care. A rash with fever, or one that does not fade under pressure, always needs urgent review.",
    symptoms: ["Red patches in skin folds or the nappy area", "Tiny prickly bumps on the neck, chest and back", "Dry, itchy, scaly eczema patches on the cheeks and joints", "Blisters or weeping areas in infection", "Widespread rash with fever in viral illness"],
    causes: ["Prolonged contact with a wet or soiled nappy", "Heat, humidity and over-clothing", "Soap, detergent or fabric irritation", "Food or contact allergy", "Viral infections such as measles, chickenpox and hand-foot-mouth disease"],
    homeCare: ["Change nappies every 2-3 hours and clean with plain water", "Give nappy-free air time twice a day", "Apply a thick zinc barrier cream at each change", "Bathe in lukewarm water with a mild fragrance-free cleanser", "Moisturise eczema-prone skin twice a day"],
    prevention: ["Loose cotton clothing in hot weather", "Fragrance-free detergent, rinsed twice", "Keep nails short to reduce scratching", "Avoid talcum powder - it irritates the airway", "Introduce new foods one at a time"],
    nutrition: ["Continue breastfeeding, which protects against eczema", "Note any food that reliably triggers a flare", "Vitamin-A rich foods for skin: carrot, pumpkin, greens", "Adequate fluids to keep the skin hydrated", "Do not eliminate whole food groups without medical advice"],
    warningSigns: ["Rash with high fever", "Rash that does not fade when pressed with a glass", "Blisters, pus or a foul smell", "Rapidly spreading redness", "Rash with swelling of the lips or breathing difficulty"],
    whenToSeeDoctor: ["Nappy rash not improving in 3 days or with white patches suggesting thrush", "Eczema that is weeping or infected", "Any rash with fever or lethargy", "A rash the child scratches until it bleeds", "Recurrent hives after feeds"],
    emergency: ["Non-blanching purple spots with fever - possible meningococcal infection", "Rash with facial swelling or breathing difficulty", "Widespread blistering with peeling skin"],
    tips: ["Do the glass test on any purple rash immediately", "Steroid creams only in the strength and duration prescribed", "Photograph the rash - it may change before the appointment", "Coconut oil suits mild dryness but not weeping eczema"],
  },
  {
    id: "allergies", title: "Food Allergies", desc: "Introducing allergens safely and spotting reactions.", emoji: "🥜", category: "Doctor",
    intro: "Around 6 percent of children have a food allergy. Current guidance is to introduce common allergens - egg, peanut, dairy, wheat, fish, soy - between 6 and 12 months, one at a time, rather than delaying them. Delaying introduction increases rather than reduces risk.",
    symptoms: ["Hives or an itchy rash within minutes to 2 hours", "Swelling of the lips, eyelids or face", "Vomiting, cramps or diarrhoea after a specific food", "Wheezing, coughing or a hoarse voice", "Persistent eczema that flares after certain foods"],
    causes: ["Immune reaction to a food protein", "Family history of allergy, asthma or eczema", "Cow milk protein, egg, peanut, tree nut, wheat, soy, fish, shellfish", "Severe eczema in infancy raises the risk"],
    homeCare: ["Introduce one new allergen in a small amount in the morning", "Wait 3 days before the next new food", "Keep a written food and symptom diary", "Give an antihistamine only at the dose your doctor prescribed", "Read every packaged food label for hidden allergens"],
    prevention: ["Do not delay allergen introduction beyond 12 months", "Continue an allergen regularly once tolerated - at least twice a week", "Manage eczema well, since broken skin sensitises", "Inform every carer and creche about the allergy", "Carry the prescribed emergency medicine at all times"],
    nutrition: ["Replace excluded foods with equivalent nutrition - for dairy, ensure calcium from ragi, sesame and fortified alternatives", "Work with a dietitian for multiple exclusions", "Peanut can be given as a smooth thinned paste, never whole nuts", "Well-cooked and baked egg is tolerated by many egg-allergic children"],
    warningSigns: ["Any breathing difficulty after food", "Swelling of the tongue or throat", "Repeated vomiting with pallor and floppiness", "Widespread hives after every exposure", "Poor weight gain with chronic diarrhoea"],
    whenToSeeDoctor: ["Any suspected allergic reaction - get a formal diagnosis", "Family history plus severe eczema before starting allergens", "Growth faltering on an exclusion diet", "Repeated reactions to unclear triggers", "Before reintroducing a food that previously caused a reaction"],
    emergency: ["Anaphylaxis: breathing difficulty, throat swelling, collapse - use adrenaline if prescribed and call an ambulance immediately", "Lips turning blue", "Sudden pallor with limpness after food"],
    tips: ["Never test an allergen for the first time at night or away from home", "Milk allergy is not lactose intolerance - they are different problems", "Most milk and egg allergies are outgrown by school age", "Keep a written emergency action plan on the fridge"],
  },
  {
    id: "nutrition-deficiency", title: "Nutrition Deficiencies", desc: "Iron, vitamin D, calcium, zinc and vitamin A in Indian babies.", emoji: "🥗", category: "Doctor",
    intro: "Iron deficiency anaemia and vitamin D deficiency are the commonest nutritional problems in Indian children. Both develop slowly and are easy to miss because the child looks well at first, yet both affect growth and brain development.",
    symptoms: ["Pale skin, tongue, palms and lower eyelids", "Tiredness, irritability and poor concentration", "Poor appetite and slow weight gain", "Frequent infections", "Delayed walking, bow legs or a soft skull in rickets"],
    causes: ["Prolonged exclusive milk feeding beyond 6 months without iron-rich solids", "Excess cow milk after one year replacing solid food", "Low sun exposure and dark skin reducing vitamin D synthesis", "Repeated diarrhoea and worm infestation", "Diets low in animal foods, greens and pulses"],
    homeCare: ["Add an iron-rich food to two meals every day", "Pair iron foods with a vitamin-C food such as lemon, guava or tomato", "Give 15-20 minutes of morning sun exposure daily", "Give supplements exactly as prescribed and complete the full course", "Deworming every 6 months after one year as advised"],
    prevention: ["Start iron-rich complementary food at exactly 6 months", "Limit cow milk to 500 ml a day after one year", "Vitamin D drops from birth as recommended", "Iodised salt in family cooking after one year", "Regular growth monitoring and haemoglobin checks"],
    nutrition: ["Iron: ragi, spinach dal, jaggery after one year, egg yolk, chicken, dates", "Vitamin C: guava, orange, lemon, tomato, amla", "Calcium: milk, curd, paneer, ragi, sesame, drumstick leaves", "Zinc: pulses, pumpkin seeds ground fine, meat", "Avoid tea and coffee entirely - they block iron absorption"],
    warningSigns: ["Very pale palms and inner eyelids", "Breathlessness on mild exertion", "Repeated infections", "Flattening of the growth curve", "Pica - eating mud, chalk or paper"],
    whenToSeeDoctor: ["Any suspicion of anaemia - a simple blood test confirms it", "Weight or height crossing downward across centile lines", "Bow legs, delayed teething or a persistently open fontanelle", "Extreme fussy eating limiting whole food groups", "Before starting any supplement on your own"],
    emergency: ["Severe pallor with fast breathing and lethargy", "Fainting or unresponsiveness"],
    tips: ["Cooking in an iron kadai adds usable iron to food", "Soak and sprout pulses to improve mineral absorption", "Give iron syrup between meals with a citrus juice", "Iron syrup can darken stools - that is harmless"],
  },
  {
    id: "hygiene", title: "Infant Hygiene", desc: "Bathing, nappy care, oral care and safe feeding hygiene.", emoji: "🛁", category: "Home Remedies",
    intro: "Good hygiene prevents most infections in the first year. Babies do not need daily soap, but they do need clean hands around them, clean feeding equipment and prompt nappy changes.",
    symptoms: ["Nappy rash from delayed changes", "Thrush - white patches in the mouth", "Umbilical stump redness or discharge", "Frequent tummy upsets from unclean bottles", "Skin infections in the folds"],
    causes: ["Infrequent nappy changes", "Unsterilised bottles and teats", "Unwashed hands of adults and older siblings", "Sharing towels and utensils", "Stored, reheated food"],
    homeCare: ["Bathe 2-3 times a week in the first months and daily after crawling starts", "Clean the nappy area front to back with plain water", "Wipe the gums with a soft damp cloth twice daily", "Keep the umbilical stump clean and dry, exposed to air", "Trim nails weekly with baby scissors while the baby sleeps"],
    prevention: ["Everyone washes hands before holding or feeding the baby", "Sterilise bottles and teats until 12 months", "Cook fresh food for each meal and never re-serve leftovers", "Separate towels, bedding and utensils for the baby", "Keep pets away from feeding and sleeping areas"],
    nutrition: ["Freshly cooked food at every meal", "Boiled and cooled water after 6 months", "Do not store prepared baby food beyond 24 hours refrigerated", "Never reheat a meal more than once", "Discard breast milk left in a bottle after a feed"],
    warningSigns: ["Pus or a foul smell from the umbilical stump", "White patches in the mouth that do not wipe away", "Recurrent diarrhoea", "Persistent nappy rash with satellite spots", "Boils or spreading skin redness"],
    whenToSeeDoctor: ["Red, swollen or discharging umbilical stump", "Oral thrush that does not clear in a week", "Recurrent skin infections", "Nappy rash worsening despite good care", "Any fever with a skin infection"],
    emergency: ["Fever with a rapidly spreading red area of skin", "Umbilical infection with fever in a newborn"],
    tips: ["Water alone is enough for cleaning a young baby's skin", "Avoid talcum powder and antiseptic lotions on baby skin", "Change nappies every 2-3 hours, even at night if soiled", "Keep a nail-cutter and thermometer in the baby's care kit"],
  },
  {
    id: "medicine-safety", title: "Medicine Safety", desc: "Dosing, storage and the medicines never to give a baby.", emoji: "💊", category: "Medicine",
    intro: "Baby medicine doses are calculated by weight, not age, so the same syrup is a different amount for every child. Most medicine errors at home come from using a kitchen spoon or repeating a dose too soon.",
    symptoms: ["Signs of overdose: excessive sleepiness, vomiting, fast breathing", "Rash or hives from a drug allergy", "Sudden diarrhoea after an antibiotic", "No improvement, suggesting the wrong medicine or dose"],
    causes: ["Using a household spoon instead of the measuring device", "Repeating a dose too soon", "Sharing another child's prescription", "Storing medicine where a toddler can reach it", "Continuing a syrup past its opened shelf life"],
    homeCare: ["Always use the dropper or cup supplied with the medicine", "Write the time of each dose on a chart", "Give paracetamol no more often than every 6 hours", "Complete the full course of any prescribed antibiotic", "Store medicines locked, cool and out of sight"],
    prevention: ["Confirm the weight-based dose with the doctor at every visit as the baby grows", "Never give aspirin to a child", "No over-the-counter cough or cold medicine under 2 years", "Check the expiry date and the discard date after opening", "Keep the prescription and the box together"],
    nutrition: ["Give iron syrup between meals with a vitamin-C drink", "Give probiotics 2 hours apart from an antibiotic", "Some medicines need food - ask specifically", "Avoid mixing medicine into a full bottle of milk - the dose is lost if unfinished"],
    warningSigns: ["Rash, swelling or wheeze after a dose", "Extreme drowsiness or a very fast heartbeat", "Vomiting every dose", "No improvement after 48 hours on an antibiotic"],
    whenToSeeDoctor: ["Any suspected allergic reaction to a medicine", "Uncertainty about the dose or timing", "The child spits out most doses", "Symptoms worsening despite treatment"],
    emergency: ["Suspected overdose - go to hospital with the bottle", "Difficulty breathing or facial swelling after a dose", "Unresponsiveness or a seizure"],
    tips: ["Paracetamol 15 mg per kg per dose is the usual maximum - confirm with your doctor", "Ibuprofen is avoided in dehydration and in babies under 3 months", "Never call medicine 'sweet' or 'candy'", "Save the poison control and paediatrician numbers in your phone"],
  },
  {
    id: "choking", title: "Choking", desc: "Preventing choking and the correct first-aid response.", emoji: "⚠️", category: "Doctor",
    intro: "Choking is a leading cause of injury death in children under 3. Babies explore with their mouths and their airway is the width of a straw. Prevention plus knowing the back-blow and chest-thrust sequence saves lives.",
    symptoms: ["Sudden inability to cry, cough or breathe", "Silent distress with wide panicked eyes", "Blue lips and face", "High-pitched noisy breathing", "Weak ineffective coughing"],
    causes: ["Whole grapes, nuts, popcorn, raw carrot, hard sweets", "Small toys, coins, button batteries and balloon pieces", "Eating while walking, crawling or lying down", "Being fed too fast or too large a spoonful", "Unsupervised access to an older sibling's toys"],
    homeCare: ["If the baby is coughing forcefully, let them cough - do not intervene", "If they cannot cough or breathe: 5 back blows between the shoulder blades, head down along your forearm", "Then 5 chest thrusts with two fingers on the breastbone", "Repeat the cycle and call for help at the same time", "Start CPR if the baby becomes unresponsive"],
    prevention: ["Cut grapes and cherry tomatoes lengthwise into quarters", "No whole nuts, popcorn or hard sweets before 4 years", "Always seat the baby upright while eating and supervise every meal", "Check the floor daily for small objects", "Toys must be larger than a toilet-roll tube"],
    nutrition: ["Grate or cook hard vegetables such as carrot and apple until soft", "Grind nuts to a fine powder or thin paste", "Remove all bones and fish spines twice", "Cut food into thin strips, not round coins", "Give food in one texture step above the current skill, never two"],
    warningSigns: ["Coughing or wheezing that started suddenly while eating or playing", "A persistent cough after a choking episode - an object may remain in the airway", "Recurrent chest infection on the same side"],
    whenToSeeDoctor: ["After any choking episode, even if the baby recovers", "A persistent cough or wheeze after choking", "Suspected swallowed object such as a coin"],
    emergency: ["Cannot breathe, cry or cough - start back blows immediately and call an ambulance", "Blue lips or unresponsiveness - begin CPR", "Suspected button battery swallowing - go to hospital immediately, this burns within hours"],
    tips: ["Never use abdominal thrusts on a baby under one year", "Do not do blind finger sweeps - it pushes the object deeper", "Take a basic infant first-aid course before the baby starts solids", "Keep emergency numbers on the fridge"],
  },
  {
    id: "burns", title: "Burns and Scalds", desc: "Immediate cooling, dressing and prevention at home.", emoji: "🔥", category: "Doctor",
    intro: "Hot liquid scalds in the kitchen are the most common burn in Indian homes with toddlers. The first 20 minutes of cool running water determine how deep the burn becomes and how much it scars.",
    symptoms: ["Red painful skin in a superficial burn", "Blisters in a partial-thickness burn", "White, brown or leathery painless skin in a deep burn", "Swelling around the area", "Intense crying and distress"],
    causes: ["Hot tea, coffee, milk and cooking oil spills", "Pressure cooker steam and hot vessels", "Hot bathing water", "Electrical points and hot iron boxes", "Firecrackers and lamps during festivals"],
    homeCare: ["Hold the area under cool running water for 20 minutes - not ice", "Remove clothing and jewellery near the burn unless stuck to the skin", "Cover loosely with a clean non-fluffy cloth or cling film", "Give paracetamol for pain at the prescribed dose", "Keep the child warm and calm while arranging review"],
    prevention: ["Keep hot drinks and vessels at the back of counters and away from table edges", "Turn pot handles inwards on the stove", "Check bath water with your elbow - 37-38°C", "Cover electrical sockets and keep the iron out of reach", "Never carry a baby while holding a hot drink"],
    nutrition: ["Extra protein and fluids support healing", "Vitamin C and zinc rich foods aid skin repair", "Continue normal feeds - healing needs calories"],
    warningSigns: ["Burn larger than the child's palm", "Any blistering burn", "Burns on the face, hands, feet, joints or genitals", "Increasing pain, pus or fever after a few days", "Any electrical or chemical burn"],
    whenToSeeDoctor: ["All but the smallest superficial reddening should be reviewed the same day", "Any blister or deep burn", "Signs of infection developing", "Burn from an unknown chemical"],
    emergency: ["Burns to the face or airway, or a hoarse voice and soot around the nose", "Large burns with the child becoming cold or drowsy", "Electrical burn - the internal injury is often far worse than it looks"],
    tips: ["Never apply toothpaste, ghee, oil, ink or turmeric to a burn", "Do not burst blisters", "Cling film is an excellent temporary cover", "Note the time the burn happened for the hospital"],
  },
  {
    id: "falls", title: "Falls and Head Injury", desc: "What to watch for after a tumble and how to prevent one.", emoji: "🤕", category: "Doctor",
    intro: "Falls are the commonest childhood accident. Most result in nothing more than a bruise and a fright. The important task is observing for 24-48 hours for the small number of signs that suggest a significant head injury.",
    symptoms: ["A soft swelling or bruise at the impact site", "Brief crying that settles with comfort", "A small graze or cut", "Temporary limping if a limb was hurt", "Sleepiness soon after - normal if the child wakes easily"],
    causes: ["Rolling off a bed, sofa or changing table", "Baby walkers, which are a major cause of stair falls", "Climbing furniture that is not wall-anchored", "Slippery bathroom floors", "Unguarded stairs and balconies"],
    homeCare: ["Apply a cold compress for 10 minutes to reduce swelling", "Keep the child calm and observe closely for 24-48 hours", "Let them sleep but wake them once or twice the first night to check they rouse normally", "Give paracetamol for pain - never ibuprofen if a head bleed is suspected", "Avoid rough play for a day or two"],
    prevention: ["Never leave a baby unattended on a raised surface, even for a second", "Do not use baby walkers", "Install stair gates and window and balcony guards", "Anchor bookshelves and TVs to the wall", "Use non-slip mats in the bathroom"],
    nutrition: ["Normal diet; offer fluids if the child is subdued", "Avoid a heavy meal if the child has vomited once"],
    warningSigns: ["Vomiting more than once after the fall", "Increasing drowsiness or difficulty waking", "Unequal pupil size or a squint that is new", "Clear fluid or blood from the nose or ear", "A soft boggy swelling on the skull, or a bulging fontanelle"],
    whenToSeeDoctor: ["Any fall from a height greater than the child's own height", "Any fall in a baby under 6 months", "Persistent crying or refusal to use a limb", "A cut needing stitches", "Any of the warning signs above"],
    emergency: ["Loss of consciousness, even briefly", "A seizure after the fall", "Repeated vomiting or worsening drowsiness", "Weakness on one side or slurred speech in an older child"],
    tips: ["Note the height and surface of the fall for the doctor", "A large scalp bump is usually less serious than persistent vomiting", "Do not give sedating medicines during the observation period", "Recheck the home for hazards after any fall"],
  },
  {
    id: "poisoning", title: "Poisoning", desc: "Household products, medicines and what to do immediately.", emoji: "☠️", category: "Doctor",
    intro: "Toddlers swallow whatever they can reach. Kerosene, phenyl, detergents, pesticides and adult medicines cause most home poisonings in India. Speed matters, and so does not making the classic mistake of inducing vomiting.",
    symptoms: ["Unexplained vomiting or drooling", "Burns or staining around the mouth", "A chemical smell on the breath", "Sudden drowsiness, unsteadiness or confusion", "Difficulty breathing or coughing after swallowing a liquid"],
    causes: ["Cleaning products stored in soft drink bottles", "Adult medicines in a handbag or bedside drawer", "Kerosene, phenyl, camphor and mosquito repellents", "Pesticides and rat poison", "Button batteries and lead-containing objects"],
    homeCare: ["Remove any remaining substance from the mouth", "Do NOT induce vomiting", "Do not give milk, salt water or any home antidote", "Keep the container or label to show the hospital", "Take the child to hospital immediately, keeping them on their side if drowsy"],
    prevention: ["Store all chemicals and medicines locked and high up", "Never decant chemicals into food or drink bottles", "Keep handbags with medicines out of reach", "Use child-resistant caps and check they are closed", "Dispose of expired medicines safely"],
    nutrition: ["Give nothing by mouth until medically advised", "Resume normal feeds only after clearance from the hospital"],
    warningSigns: ["Drooling with refusal to swallow", "Persistent coughing after swallowing a liquid, which suggests it entered the lungs", "Drowsiness or unsteady walking", "Burns around the mouth"],
    whenToSeeDoctor: ["Every suspected poisoning - even if the child looks fine", "Unknown quantity or substance swallowed", "Any symptom developing hours later"],
    emergency: ["Any suspected kerosene, acid, alkali or pesticide ingestion - go to hospital at once", "Unresponsive, seizing or having difficulty breathing", "Button battery swallowed - this is a surgical emergency"],
    tips: ["Never induce vomiting - corrosives burn twice on the way back up", "Carry the product container to the hospital", "Save the nearest poison centre number in your phone", "Do a quick low-level sweep of your home from a toddler's eye height"],
  },
  {
    id: "seasonal", title: "Seasonal Illnesses", desc: "Monsoon, summer and winter risks and how to prepare.", emoji: "🌦️", category: "Home Remedies",
    intro: "Indian seasons bring predictable illnesses: dengue and gastroenteritis in the monsoon, heat rash and dehydration in summer, and respiratory infections in winter. Preparing ahead of each season prevents most of them.",
    symptoms: ["Monsoon: fever with body pain, loose stools, skin infections", "Summer: heat rash, dehydration, sunken eyes, poor urine output", "Winter: blocked nose, cough, wheeze, dry itchy skin", "Year-round: mosquito bites and allergic sneezing"],
    causes: ["Mosquito breeding in stagnant monsoon water", "Contaminated water and food in humid weather", "High ambient temperature and inadequate fluids in summer", "Cold dry air and crowded indoor spaces in winter", "Seasonal pollen and dust allergens"],
    homeCare: ["Monsoon: boiled water only, mosquito nets and full-sleeve clothing", "Summer: extra feeds, light cotton clothes, avoid outdoors 11am-4pm", "Winter: humidify the room, moisturise skin daily, layer clothing", "Keep the vaccination schedule up to date including flu vaccine", "Empty all standing water around the home weekly"],
    prevention: ["Mosquito repellent patches and nets rather than coils near a baby", "Annual influenza vaccination from 6 months", "Wash hands after outdoor play", "Store drinking water covered", "Dress for the weather without overheating"],
    nutrition: ["Summer: coconut water, curd rice, watermelon after 8 months, extra fluids", "Monsoon: freshly cooked warm food only, no cut fruit from outside", "Winter: warm soups, ghee, dry fruit powder, vitamin C fruits", "Continue breastfeeding through every season"],
    warningSigns: ["High fever with a rash during dengue season", "Bleeding gums, nose bleeds or unusual bruising", "Reduced urine in hot weather", "Wheezing or fast breathing in winter", "Diarrhoea lasting more than 2 days in the monsoon"],
    whenToSeeDoctor: ["Fever above 38.5°C during a dengue or malaria outbreak", "Any bleeding sign or persistent vomiting with fever", "Breathing difficulty in a winter cough", "Dehydration signs in hot weather"],
    emergency: ["Cold clammy skin with a falling temperature after high fever - possible dengue shock", "Severe breathing difficulty", "Seizure with high fever", "Heat stroke: very hot dry skin with confusion"],
    tips: ["A platelet check is only needed if the doctor advises it - do not self-order tests", "Never use mosquito coils in a closed room with a baby", "Keep an ORS and paracetamol kit ready before each season", "Air-conditioning is fine at 24-26°C with the baby not in the direct draught"],
  },
  {
    id: "safe-feeding", title: "Safe Feeding Practices", desc: "Weaning safely from 6 months onwards.", emoji: "🍽️", category: "Home Remedies",
    intro: "WHO recommends exclusive breastfeeding for 6 months, then complementary foods alongside breastfeeding to 2 years and beyond. Safe weaning is about the right texture at the right age, hygiene, and responsive feeding without force.",
    symptoms: ["Readiness cues: sits with support, good head control, interest in food, loss of the tongue-thrust reflex", "Gagging is normal learning; choking is silent and needs action", "Refusal of a new food on the first few offers is normal"],
    causes: ["Starting solids too early strains the immature gut", "Starting too late causes iron deficiency and texture refusal", "Force-feeding creates long-term food aversion", "Distracted feeding with screens reduces intake awareness"],
    homeCare: ["Start at 6 months with 2-3 teaspoons once a day and build up gradually", "Move from purée to mash to soft lumps to finger food by 9-12 months", "Introduce one new food every 3 days and watch for reactions", "Always seat the child upright and supervise every meal", "Let the child self-feed with hands and a spoon, however messy"],
    prevention: ["No salt before 12 months and no sugar or honey before 12 months", "No whole nuts, grapes, popcorn or hard raw vegetables", "No cow's milk as a main drink before 12 months", "Freshly cooked food, never reheated twice", "No screens or walking around while eating"],
    nutrition: ["Include an iron-rich food in two meals daily", "Add a teaspoon of ghee or oil for calorie density", "Offer all six tastes and many textures early to prevent fussiness", "Continue breastfeeding on demand alongside solids", "Three meals plus two snacks by 12 months"],
    warningSigns: ["Persistent refusal of solids beyond 8 months", "Gagging or vomiting with every textured food", "Poor weight gain after starting solids", "Constant diarrhoea after a specific food", "Reliance on milk only after 12 months"],
    whenToSeeDoctor: ["Not accepting any solids by 8 months", "Faltering growth", "Suspected allergy or intolerance", "Difficulty chewing or swallowing", "Extreme fussy eating limiting whole food groups"],
    emergency: ["Silent choking - begin back blows immediately", "Sudden facial swelling or breathing difficulty after a new food"],
    tips: ["A new food may need 10-15 exposures before acceptance", "Eat together as a family - babies copy what they see", "Never bribe or punish around food", "Offer water in an open or straw cup from 6 months"],
  },
  {
    id: "first-aid", title: "First Aid Basics", desc: "The home kit and the actions every parent should know.", emoji: "🩺", category: "Doctor",
    intro: "Most childhood injuries are minor and handled at home. Knowing five basic responses - bleeding, burns, choking, falls and fever - and keeping a stocked kit turns panic into calm action.",
    symptoms: ["Minor cuts and grazes with bleeding", "Nose bleeds", "Insect bites and stings", "Small burns and bumps", "Sprains with swelling"],
    causes: ["Falls and crawling accidents", "Kitchen and bathroom hazards", "Sharp corners and unguarded furniture", "Insect bites during outdoor play"],
    homeCare: ["Bleeding: press firmly with a clean cloth for 10 minutes without peeking", "Nose bleed: sit the child forward and pinch the soft part of the nose for 10 minutes", "Burns: 20 minutes of cool running water", "Bumps and sprains: cold compress for 10 minutes and rest", "Insect bite: wash, cold compress and watch for swelling"],
    prevention: ["Corner guards, socket covers and stair gates", "Keep sharp objects, hot vessels and chemicals out of reach", "Non-slip mats in the bathroom", "Regular hazard sweep at toddler eye level", "Learn infant CPR before the baby becomes mobile"],
    nutrition: ["Normal feeds after any minor injury", "Extra fluids after a nose bleed or a hot day"],
    warningSigns: ["Bleeding that does not stop after 10 minutes of pressure", "A wound that is deep, gaping or dirty", "Swelling with inability to use a limb", "Increasing redness, pus or fever from a wound"],
    whenToSeeDoctor: ["Any wound that may need stitches", "A possible fracture - refusal to bear weight or use an arm", "Animal or human bites", "Any wound in a child whose tetanus doses are incomplete"],
    emergency: ["Uncontrolled bleeding", "Not breathing or unresponsive - begin CPR and call an ambulance", "Suspected fracture with visible deformity", "Any deep wound to the head, chest or abdomen"],
    tips: ["Kit list: digital thermometer, ORS, paracetamol syrup, saline drops, sterile gauze, adhesive tape, antiseptic solution, tweezers, cotton, barrier cream", "Check kit expiry dates every 6 months", "Save the paediatrician, ambulance and poison centre numbers in your phone", "Practise the choking sequence on a doll so it becomes automatic"],
  },
  {
    id: "emergency-symptoms", title: "Emergency Symptoms", desc: "The signs that mean go to hospital right now.", emoji: "🚑", category: "Doctor",
    intro: "Very few childhood symptoms are true emergencies, but the ones that are must be recognised in seconds. Print this list and keep it where every carer can see it. When in doubt, go - no doctor will mind an unnecessary visit.",
    symptoms: ["Breathing difficulty: fast breathing, chest indrawing, grunting, nostril flaring", "Blue or grey lips, tongue or face", "Unresponsive, floppy or very hard to wake", "Seizure or fit", "Non-blanching purple rash with fever"],
    causes: ["Severe infection such as pneumonia, meningitis or sepsis", "Severe dehydration from vomiting and diarrhoea", "Anaphylaxis from food or a drug", "Airway obstruction from choking", "Head injury, poisoning or a burn"],
    homeCare: ["Call an ambulance or leave for hospital immediately - do not wait to observe", "Keep the airway clear and place an unconscious baby on their side", "Do not give food or drink if the baby is drowsy", "Carry any medicine containers or the immunisation card", "Start CPR if the baby is not breathing"],
    prevention: ["Complete all vaccinations on schedule", "Treat dehydration early with ORS", "Childproof the home", "Recognise the early warning signs in each individual guide", "Keep emergency numbers and the nearest hospital route saved"],
    nutrition: ["Nothing by mouth if the baby is drowsy, seizing or has breathing difficulty"],
    warningSigns: ["Any fever in a baby under 3 months", "No urine for 8-12 hours", "Refusing all feeds for 12 hours", "Continuous inconsolable crying or a weak high-pitched cry", "A bulging or deeply sunken fontanelle"],
    whenToSeeDoctor: ["Any of the symptoms in this guide - go immediately, not tomorrow", "Repeated vomiting with drowsiness", "Any parental instinct that something is seriously wrong"],
    emergency: ["Not breathing or gasping - start CPR", "Seizure lasting more than 5 minutes", "Blue lips or unresponsiveness", "Non-blanching purple rash with fever", "Severe bleeding that will not stop"],
    tips: ["Rehearse the route to your nearest paediatric emergency department", "Keep a bag ready with the immunisation card and a change of clothes", "One adult drives, one holds the baby safely - never carry a baby in your lap in the front seat", "Trust your instinct: you know your baby best"],
  },
  {
    id: "colic", title: "Colic", desc: "Prolonged evening crying in an otherwise healthy baby.", emoji: "😢", category: "Home Remedies",
    intro: "Colic is defined as crying for more than three hours a day, three days a week, for three weeks in a thriving baby. It typically peaks around six weeks and resolves by three to four months. It is exhausting but harmless.",
    symptoms: ["Intense crying, often in the late afternoon and evening", "Drawing the legs up and clenching the fists", "A tense tummy and passing wind", "Difficult to console despite feeding and changing", "Normal feeding and weight gain between episodes"],
    causes: ["An immature digestive system and gut bacteria", "Swallowed air during feeding", "Overstimulation at the end of the day", "Cow milk protein sensitivity in a small number of babies", "Normal developmental crying peak"],
    homeCare: ["Hold the baby upright against your chest with gentle rocking", "Massage the tummy clockwise and cycle the legs", "Try a warm bath or a warm cloth on the tummy", "White noise and reduced light in the evening", "Burp thoroughly during and after every feed"],
    prevention: ["Feed before the baby becomes frantically hungry", "Keep the baby upright for 20 minutes after feeds", "Reduce evening stimulation and visitors", "Breastfeeding mothers can try reducing caffeine and very gassy foods", "Check the bottle teat flow rate is not too fast"],
    nutrition: ["Continue breastfeeding - stopping rarely helps", "Mothers may trial reducing dairy for two weeks under guidance", "Do not switch formula without medical advice", "Gripe water and herbal drops are not recommended"],
    warningSigns: ["Poor weight gain", "Vomiting forcefully or blood in the stool", "Fever", "Crying with a fixed, high-pitched or weak sound", "Colic that starts after 4 months or persists past 5 months"],
    whenToSeeDoctor: ["Any warning sign above", "Suspected cow milk protein allergy with eczema and loose stools", "Reflux symptoms with arching and refusal to feed", "Parental exhaustion - ask for help, this matters"],
    emergency: ["A weak high-pitched continuous cry with fever or floppiness", "A swollen tender tummy with green vomit", "Any sudden change in the pattern of crying"],
    tips: ["It is safe to place the baby down in a cot and step away for five minutes to breathe", "Never shake a baby - it causes permanent brain injury", "Share the evening shift between carers", "Colic always ends - most babies are settled by 4 months"],
  },
];

export const guideCategories = ["Home Remedies", "Doctor", "Medicine"] as const;

export const guideById = (id: string) => healthGuides.find((g) => g.id === id);

export const guidesByCategory = (category: GuideCategory) =>
  healthGuides.filter((g) => g.category === category);

/** Search guides by title, description and any section content. */
export function searchGuides(query: string): HealthGuide[] {
  const q = query.trim().toLowerCase();
  if (!q) return healthGuides;
  return healthGuides.filter((g) =>
    [g.title, g.desc, g.intro, ...g.symptoms, ...g.causes, ...g.homeCare, ...g.prevention, ...g.nutrition]
      .join(" ")
      .toLowerCase()
      .includes(q)
  );
}
