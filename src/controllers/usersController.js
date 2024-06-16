const controller = {};

controller.userById = (req, res) => {
    req.getConnection((err, conn) => {
        const document = req.query.document;
        const typeDocument = req.query.typeDocument;

        if (!document || !typeDocument) {
            return res.status(400).json({ error: 'Falta documento o typeDocument en el cuerpo de la petición', status: 400 });
        }

        
        let query = 'SELECT * FROM users WHERE document = ? AND typeDocument = ?';
        let queryParams = [document, typeDocument];


        console.log(query);
        conn.query(query, queryParams, (err, users) => {
            if (err) {
                console.error('Error executing query:', err);
                // Enviar un código de estado 500 si hay un error de servidor
                return res.status(500).json({ error: 'Error interno del servidor', status: 500 });
            }
            if (users.length === 0) {
                // Enviar un código de estado 404 si no se encuentran usuarios
                return res.status(404).json({ message: 'No se han encontrado usuario', status: 404 });
            }
            // Enviar un código de estado 200 con los usuarios si la consulta es exitosa
            res.status(200).json({ users, status: 200 });
        });
    })
};
controller.users = (req, res) => {
    req.getConnection((err, conn) => {

        conn.query('SELECT * FROM users', (err, user) => {
            if (err) {
                console.error('Error executing query:', err);
                // Enviar un código de estado 500 si hay un error de servidor
                return res.status(500).json({ error: 'Error interno del servidor', status: 500 });
            }
            if (user.length === 0) {
                // Enviar un código de estado 404 si no se encuentran usuarios
                return res.status(404).json({ message: 'No se han encontrado usuarios', status: 404 });
            }
            // Enviar un código de estado 200 con los usuarios si la consulta es exitosa
            res.status(200).json({ user, status: 200 });
        });
    });
};

module.exports = controller;