const mysql = require('mysql');

// -- Conexión a la base de datos [MySQL]
const dba = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodeRest'
});
 
dba.connect();

// -- Declaración del objeto de la clase usuarios
var userModel = {};

// -- Listar los usuarios
userModel.listUsers = function(response){
    if(dba){
		dba.query('SELECT * FROM mock_data ORDER BY id DESC', function (error, results) {
	        if (error) throw error;
	        response(null, results);
    	});        
    }
}

// -- Obtener el siguiente ID correlativo para insertar
userModel.nextID = function(response){
	if(dba){
		dba.query('SELECT id FROM mock_data ORDER BY id DESC LIMIT 1', function (error, results) {
	        if (error) throw error;
	        response(null, results);
    	});        
    }	
}

// -- Agregar usuario
userModel.addUser = function(userData, response){
	if(dba){
		this.nextID(function(error, data){
		 	userData.id = data[0].id+1;
			dba.query("INSERT INTO mock_data SET ? ", userData, function (error, results) {
		        if (error) throw error;
		        response(null, results);
		    });
		});
	}
}

// -- Eliminar usuario
userModel.delUser = function(userID, response){
	if(dba){
		dba.query('DELETE FROM mock_data WHERE id = ? LIMIT 1', [userID], function (error, results) {
	        if (error) throw error;
	        response(null, results);
	    });
	}
}

// -- Actualizar usuario
userModel.updateUser = function(userData, response){
	if(dba){
		dba.query("UPDATE mock_data SET ? WHERE id = ?", [userData, userData.id], function (error, results) {
	        if (error) throw error;
	        response(null, results);
	    });
	}
}

// -- Exportar el modulo
module.exports = userModel;