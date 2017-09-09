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
  });

//run function to display all items from database

connection.query("SELECT * FROM products", function(err, results, fields) {
    if(err){
        console.log(err.stack);
    } else {
        for (var i = 0; i < results.length; i++) {
            console.log("Item ID: " + results[i].item_id);
            console.log("Product ID: " + results[i].product_name);
            console.log("Department: " + results[i].department_name);
            console.log("Price: " + results[i].price);
            console.log("Inventory: " + results[i].stock_quantity);
        }
    }
    runItems(results);
})

  function runItems(results) {
    inquirer
        .prompt([
            {
                name: "item_id",
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
        .then(function(answer){
            updateQuantity(results, answer);

        })//make sure to add connection.end();
  };

function updateQuantity(results, answer) {
    console.log("qty " + results[answer.item_id -1].stock_quantity)
    console.log(answer.item_id -1);
connection.query(
        "UPDATE products SET ? WHERE ?",
        [
            {
                stock_quantity: results[answer.item_id -1].stock_quantity -  answer.quantity 
            }, 
            {
                item_id: answer.item_id
            }
        ]
    )
}

