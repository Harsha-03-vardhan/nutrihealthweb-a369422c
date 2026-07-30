/**
 * Extra i18n keys used by profile/notification/search UI that are not yet
 * present in the base dictionaries in `src/lib/i18n.tsx`.
 * Merge these into the `en`/`ta` dictionaries (e.g. via Object.assign) to
 * activate them.
 */

export const enProfile: Record<string, string> = {
  "profile.thanksRatingN": "Thanks for rating {n}/5",
  "profile.rateAria": "Rate {n}",
  "notif.delete": "Delete",
};

export const taProfile: Record<string, string> = {
  "profile.thanksRatingN": "{n}/5 மதிப்பீட்டிற்கு நன்றி",
  "profile.rateAria": "{n} மதிப்பிடு",
  "notif.delete": "நீக்கு",
};
