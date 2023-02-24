function validateEmail(param) {
    const validEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i;
    const validationEmail = validEmail.test(param);
    return validationEmail;
}

function validationLogin(req, res) {
    const { email, password } = req.body;
    const validEmail = validateEmail(email);

    if (!email) {
        return res.status(400).json({ message: 'O campo "email" é obrigatório' });
    }
    if (!password) {
        return res.status(400).json({ message: 'O campo "password" é obrigatório' });
    }
    if (password.length < 6) {
        return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
    }
    if (!validEmail) {
        return res.status(400).json(
            { message: 'O "email" deve ter o formato "email@email.com"' },
);
    }
}

module.exports = validationLogin;