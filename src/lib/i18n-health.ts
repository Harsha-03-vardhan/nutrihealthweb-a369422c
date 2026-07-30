/**
 * Health page / vaccination tracker strings.
 * `enHealth`/`taHealth` hold UI keys (namespaced, e.g. "health.foo") meant to be
 * merged into the main `en`/`ta` dictionaries used by `t()`.
 * Keys that look like plain English sentences (no dot-namespace) are
 * data-driven content strings meant to be merged into the `contentTa`
 * dictionary used by `tx()` — for those, only the Tamil value matters.
 */
export const enHealth: Record<string, string> = {
  "health.careFor": "Care for {name}",
  "health.aiAssistant": "AI Assistant",
  "common.clear": "Clear",
  "common.stopVoice": "Stop",
  "common.startVoice": "Voice",
};

export const taHealth: Record<string, string> = {
  "health.careFor": "{name} க்கான பராமரிப்பு",
  "health.aiAssistant": "AI உதவியாளர்",
  "common.clear": "அழி",
  "common.stopVoice": "நிறுத்து",
  "common.startVoice": "குரல்",

  // Symptom overviews
  "Common colds are viral and usually resolve in 7–10 days.": "சாதாரண சளி வைரஸ் காரணமாக ஏற்படுவது, பொதுவாக 7–10 நாட்களில் குணமாகும்.",
  "A rise in body temperature above 38°C. Usually a sign of infection.": "உடல் வெப்பநிலை 38°C க்கு மேல் உயர்வது. பொதுவாக தொற்றின் அறிகுறி.",
  "Loose, watery stools 3+ times a day. Can cause quick dehydration.": "நாளொன்றுக்கு 3+ முறை தளர்ந்த, நீர்த்த மலம். விரைவில் நீர்ச்சத்து குறையலாம்.",
  "Forceful throwing up of stomach contents. Often self-limiting.": "வயிற்றின் உள்ளடக்கத்தை பலமாக வெளியேற்றுதல். பெரும்பாலும் தானாகவே சரியாகும்.",
  "Skin reactions ranging from heat rash to allergy or infection.": "வெப்ப தடிப்பு முதல் ஒவ்வாமை அல்லது தொற்று வரையிலான தோல் எதிர்வினைகள்.",
  "Prolonged, unexplained crying — usually resolves by 4 months.": "நீண்ட நேரம், காரணமில்லாத அழுகை — பொதுவாக 4 மாதங்களில் சரியாகிவிடும்.",

  // Causes
  "Viral infections": "வைரஸ் தொற்றுகள்", "Weather change": "வானிலை மாற்றம்", "Contact with infected persons": "தொற்று உள்ளவர்களுடன் தொடர்பு",
  "Viral illness": "வைரஸ் நோய்", "Bacterial infection": "பாக்டீரியா தொற்று", "Post-vaccination reaction": "தடுப்பூசிக்குப் பின் எதிர்வினை",
  "Viral (rotavirus)": "வைரஸ் (ரோட்டா வைரஸ்)", "Food intolerance": "உணவு ஒவ்வாமை", "Antibiotics": "நுண்ணுயிர் எதிர்ப்பிகள்",
  "Overfeeding": "அதிக உணவு", "Gastroenteritis": "இரைப்பை குடல் அழற்சி", "Reflux": "அமில மீள்வு",
  "Heat": "வெப்பம்", "New food": "புதிய உணவு", "Detergent / fabric": "சவர்க்காரம் / துணி", "Viral": "வைரஸ்",
  "Immature gut": "வளர்ச்சியடையாத குடல்", "Gas": "வாயு", "Overstimulation": "அதிக தூண்டல்",

  // Remedies
  "Use saline nasal drops and gently suction.": "உப்பு நீர் மூக்கு துளிகளைப் பயன்படுத்தி மென்மையாக உறிஞ்சவும்.",
  "Elevate the head slightly while sleeping.": "தூங்கும்போது தலையை சற்று உயர்த்தி வையுங்கள்.",
  "Keep the baby well hydrated with breast milk / warm fluids.": "தாய்ப்பால் / சூடான திரவங்கள் மூலம் குழந்தைக்கு நல்ல நீர்ச்சத்து வழங்கவும்.",
  "Keep lightly clothed": "லேசான ஆடை அணிவிக்கவும்", "Sponge with lukewarm water": "வெதுவெதுப்பான நீரில் துடைக்கவும்", "Offer fluids often": "அடிக்கடி திரவங்கள் கொடுங்கள்",
  "Give ORS in small sips": "சிறிய அளவில் ORS கொடுங்கள்", "Continue breastfeeding": "தாய்ப்பாலை தொடருங்கள்", "Avoid sugary drinks": "இனிப்பு பானங்களைத் தவிர்க்கவும்",
  "Small frequent feeds": "சிறிய அளவில் அடிக்கடி உணவு", "Keep upright after feeds": "உணவுக்குப் பின் நிமிர்ந்து வையுங்கள்", "ORS in sips": "சிறிய அளவு ORS",
  "Keep skin dry & cool": "தோலை உலர்வாகவும் குளிர்ச்சியாகவும் வையுங்கள்", "Use mild moisturizer": "மென்மையான மாய்ஸ்சரைசர் பயன்படுத்துங்கள்", "Loose cotton clothes": "தளர்வான பருத்தி ஆடைகள்",
  "Gentle tummy massage": "மென்மையான வயிறு மசாஜ்", "Warm compress": "சூடான ஒத்தடம்", "Rhythmic rocking": "தாளத்துடன் ஆட்டுதல்",

  // Warnings
  "Fever above 38.5°C": "38.5°C க்கு மேல் காய்ச்சல்", "Difficulty breathing": "மூச்சு விடுவதில் சிரமம்", "Poor feeding for >24 hours": "24 மணி நேரத்திற்கு மேல் உணவு எடுக்காதது",
  "Fever >39°C in infants <3 months": "3 மாதத்திற்குட்பட்ட குழந்தைகளில் 39°C க்கு மேல் காய்ச்சல்", "Seizures": "வலிப்பு", "Extreme lethargy": "மிகுந்த சோர்வு",
  "Signs of dehydration": "நீர்ச்சத்து குறைவின் அறிகுறிகள்", "Blood in stool": "மலத்தில் ரத்தம்", "High fever": "அதிக காய்ச்சல்",
  "Projectile vomiting": "வேகமாக வாந்தி எடுத்தல்", "Green/yellow vomit": "பச்சை/மஞ்சள் வாந்தி",
  "Blistering": "கொப்புளங்கள்", "Fever with rash": "தடிப்புடன் காய்ச்சல்", "Rapid spread": "வேகமாக பரவுதல்",
  "Fever": "காய்ச்சல்", "Vomiting": "வாந்தி",

  // Doctor notes
  "Consult if symptoms persist beyond 7 days or worsen suddenly.": "அறிகுறிகள் 7 நாட்களுக்கு மேல் தொடர்ந்தால் அல்லது திடீரென மோசமானால் மருத்துவரை அணுகவும்.",
  "Any fever in a baby under 3 months needs immediate medical attention.": "3 மாதத்திற்குட்பட்ட குழந்தைக்கு ஏற்படும் எந்த காய்ச்சலும் உடனடி மருத்துவ கவனிப்பு தேவை.",
  "Seek help if diarrhea lasts >24 hours in babies under 1 year.": "1 வயதிற்குட்பட்ட குழந்தைகளில் வயிற்றுப்போக்கு 24 மணி நேரத்திற்கு மேல் தொடர்ந்தால் உதவி பெறவும்.",
  "See a pediatrician if vomiting continues >8 hours.": "வாந்தி 8 மணி நேரத்திற்கு மேல் தொடர்ந்தால் குழந்தை மருத்துவரை பார்க்கவும்.",
  "Consult if rash is painful, spreading, or with fever.": "தடிப்பு வலியுடன், பரவும் விதத்தில் அல்லது காய்ச்சலுடன் இருந்தால் ஆலோசிக்கவும்.",
  "Rule out reflux or CMPA if severe.": "கடுமையாக இருந்தால் அமில மீள்வு அல்லது CMPA இல்லை என உறுதி செய்யவும்.",

  // Medicines
  "Avoid OTC cold medicines for babies under 2 years without pediatric advice.": "மருத்துவர் ஆலோசனையின்றி 2 வயதிற்குட்பட்ட குழந்தைகளுக்கு OTC சளி மருந்துகளைத் தவிர்க்கவும்.",
  "Paracetamol drops as prescribed. Dose is weight-based.": "மருத்துவர் பரிந்துரைத்தபடி பாராசிட்டமால் துளிகள். அளவு எடையின் அடிப்படையில்.",
  "ORS + Zinc supplementation as prescribed.": "மருத்துவர் பரிந்துரைத்தபடி ORS + சிங்க் துணை மருந்து.",
  "Anti-emetics only under doctor's guidance.": "மருத்துவர் வழிகாட்டுதலின் கீழ் மட்டுமே வாந்தி தடுப்பு மருந்துகள்.",
  "Calamine lotion for itch; consult before steroid creams.": "அரிப்புக்கு கலமைன் லோஷன்; ஸ்டீராய்டு களிம்புகளுக்கு முன் ஆலோசிக்கவும்.",
  "Simethicone drops as needed under advice.": "தேவைப்படும்போது ஆலோசனையின் கீழ் சிமெதிகோன் துளிகள்.",

  // Nutrition
  "Warm khichdi": "சூடான கிச்சடி", "Vegetable broth": "காய்கறி குழம்பு", "Extra breast milk": "கூடுதல் தாய்ப்பால்", "Steamed apple": "ஆவியில் வேகவைத்த ஆப்பிள்",
  "Hydration first": "முதலில் நீர்ச்சத்து", "Coconut water (>6m)": "தேங்காய் நீர் (>6 மாதம்)", "Light dal water": "லேசான பருப்பு நீர்",
  "BRAT diet: Banana, Rice, Apple, Toast": "BRAT உணவு: வாழைப்பழம், சாதம், ஆப்பிள், டோஸ்ட்", "Curd rice (>8m)": "தயிர் சாதம் (>8 மாதம்)",
  "Clear fluids first": "முதலில் தெளிவான திரவங்கள்", "Bland foods when tolerated": "தாங்கும் போது சுவையற்ற உணவுகள்",
  "Continue current diet if no new food introduced recently.": "சமீபத்தில் புதிய உணவு அறிமுகப்படுத்தவில்லை என்றால் தற்போதைய உணவைத் தொடருங்கள்.",
  "Mother should avoid gassy foods if breastfeeding.": "தாய்ப்பால் கொடுத்தால், வாயு உண்டாக்கும் உணவுகளை தாய் தவிர்க்க வேண்டும்.",

  // FAQs
  "Can I give honey?": "தேன் கொடுக்கலாமா?",
  "Never for babies under 12 months — risk of botulism.": "12 மாதத்திற்குட்பட்ட குழந்தைகளுக்கு ஒருபோதும் வேண்டாம் — போட்டுலிசம் ஆபத்து உண்டு.",
  "Should I stop feeding solids?": "திட உணவு கொடுப்பதை நிறுத்த வேண்டுமா?",
  "No, offer soft, warm foods in smaller amounts.": "இல்லை, மென்மையான, சூடான உணவுகளை சிறிய அளவில் கொடுங்கள்.",
  "How often to check temperature?": "எவ்வளவு அடிக்கடி வெப்பநிலையை பரிசோதிக்க வேண்டும்?",
  "Every 3–4 hours or if the baby feels warmer.": "ஒவ்வொரு 3–4 மணி நேரமும் அல்லது குழந்தை சூடாக உணரும்போது.",
  "Is curd safe?": "தயிர் பாதுகாப்பானதா?",
  "Yes after 8 months; it helps restore gut flora.": "ஆம், 8 மாதங்களுக்குப் பிறகு; இது குடல் நுண்ணுயிரிகளை மீட்க உதவும்.",
  "Difference from spit-up?": "வாந்திக்கும் துப்புதலுக்கும் வேறுபாடு?",
  "Spit-ups are effortless; vomiting is forceful.": "துப்புதல் எளிதாக நடக்கும்; வாந்தி பலமாக ஏற்படும்.",
  "Can I bathe daily?": "தினமும் குளிப்பாட்டலாமா?",
  "Yes with lukewarm water and mild soap.": "ஆம், வெதுவெதுப்பான நீர் மற்றும் மென்மையான சோப்புடன்.",
  "How long does colic last?": "வயிற்று வலி (கோலிக்) எவ்வளவு காலம் நீடிக்கும்?",
  "Usually peaks at 6 weeks and resolves by 3–4 months.": "பொதுவாக 6 வாரங்களில் உச்சத்தை அடைந்து 3–4 மாதங்களில் சரியாகிவிடும்.",
};
