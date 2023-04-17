export const keyUser = (input) => {
    input = input.replace(/[^A-Za-z]/g, "");
    if (input === input.toLowerCase()) {
        return input.slice(0, 3);
    } else if (/[A-Z]/.test(input)) {
        let uppercase = "";
        for (let i = 0; i < input.length; i++) {
            if (input[i] === input[i].toUpperCase()) {
                uppercase += input[i];
            }
        }
        if (uppercase.length < 3) {
            return input.slice(0, 1) + uppercase;
        } else {
            return uppercase.slice(0, 3);
        }
    } else {
        return input.slice(0, 3);
    }
};
