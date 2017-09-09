var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
  
    // Your username
    user: "uci.projects",
    
    // Your password
    password: "uciprojects123",
    database: "bamazon_DB"
  });

  connection.connect(function(err) {
      if (err) throw err;
      runItems();
  });

  function runItems() {
    inquirer
        .prompt([
            {
                name: "product_id",
                type: "input",
                message: "What is the ID of the product you would like to buy?"
            },
            {
                name: "quantity",
                type: "input",
                message: "How many units would you like to buy?",
                validate: function(value) {
                    if (isNaN(value) === false) {
                        return true;
                        var customerPurchase = value;
                        updateQuantity();
                    }
                    return false;
                    }
            }
        ])
  };

function updateQuantity() {
    var query = connection.query(
        "UPDATE stock_quantity SET ? WHERE ?",
        [
            {
                stock_quantity: 10
            }, 
            {
                product_id: "sweater"//user input
            }
        ]
    )
}

