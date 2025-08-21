
// Funcion para validar email
export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Funcion para validar password
export const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return passwordRegex.test(password);
}

// Funcion para validar nombre
export const validateName = (name) => {
    const nameRegex = /^[a-zA-Z\s]{1,20}$/;
    return nameRegex.test(name);
}

