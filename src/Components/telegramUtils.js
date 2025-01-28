// telegramUtils.js

/**
 * Fetch Telegram user data from the Telegram WebApp API.
 * @returns {Object} Telegram user data (or null if not available).
 */
export const getTelegramUser = () => {
    const telegram = window.Telegram.WebApp;
    const telegramUser = telegram?.initDataUnsafe?.user;

    if (telegramUser) {
        console.log("Telegram User Data:", telegramUser);
        return telegramUser;
    }

    console.error("Telegram user data not available.");
    return null;
};
