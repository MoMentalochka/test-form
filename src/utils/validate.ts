export function checkPassword(str: string): boolean {
    const re =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]|[_]).{4,}$/
    return re.test(str);
}
