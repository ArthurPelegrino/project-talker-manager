function validateToken(req, res, next) {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ message: 'Token não encontrado' });
    }
    if (authorization.length !== 16) {
        return res.status(401).json({ message: 'Token inválido' });
    }
    return next();
}

function validateName(req, res, next) {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ message: 'O campo "name" é obrigatório' });
    }
    if (name.length < 3) {
        return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
    }
    return next();
}
function validateAge(req, res, next) {
    const { age } = req.body;
    const isAge = typeof age;
    if (!age) {
        return res.status(400).json({ message: 'O campo "age" é obrigatório' });
    }
    if (isAge !== 'number') {
        return res.status(400).json({ message: 'O campo "age" deve ser do tipo "number"' });
    }
    if (!Number.isInteger(age)) {
        return res.status(400).json({
             message: 'O campo "age" deve ser um "number" do tipo inteiro',
             });
    }
    if (age < 18) {
        return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
    }
    return next();
}

function validateTalk(req, res, next) {
    const { talk } = req.body;
    if (!talk) {
        return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
    }
    next();
}

function validateWatchedAt(req, res, next) {
    const validation = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
    const { watchedAt } = req.body.talk;
    if (!watchedAt) {
        return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
    }

    if (!validation.test(watchedAt)) {
        return res.status(400).json({
             message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
    }
    return next();
}

function validateRate(req, res, next) {
    const { rate } = req.body.talk;
    if (rate === undefined) {
        return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
    }
    if (!Number.isInteger(rate) || rate < 1 || rate > 5) {
        return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    }
    return next();
}

module.exports = {
    validateToken,
    validateName,
    validateAge,
    validateTalk,
    validateWatchedAt,
    validateRate,
};
