export function hasCountryCode(phoneNumber: string) {
    const countryCodeRegex = /^\+\d+/;
    return countryCodeRegex.test(phoneNumber);
}
