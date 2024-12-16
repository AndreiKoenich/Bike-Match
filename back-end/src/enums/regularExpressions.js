export const regularExpressions = Object.freeze({
    LOGIN: /^[a-zA-Z0-9._-]+$/,
    NUMBERS: /[0-9]/,
    LETTERS_SPACE_APOSTROPHE_HYPHEN: /^[A-Za-zÀ-ÿ\s'.-]+$/,
    CONSECUTIVE_SPACES: /\s{2,}/
});