export const namePattern = (name: string) => {
    const regex = /^[a-zA-Z\s]{1,100}$/;
    return regex.test(name);
}

export const passwordPattern = (password: string) => {
    const regex = /^[a-zA-Z0-9]{8,20}$/;
    return regex.test(password);
}