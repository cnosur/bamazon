var mysql=require("mysql");
var inquirer=require("inquirer");

var connection=mysql.createConnection({
    host: "localhost",
    port: 8889, 
    user: "root",
    password:"root",
    database:"bamazon_db"
})

connection.connect(function(err){
    if (err) throw err;
    start();
})

function start() {
    connection.query("SELECT * FROM products", function(err,res) {
    if (err) throw err;
    inquirer
        .prompt([{
        name:"choice",
        type:"rawlist",
        choices: function(){
            var choiceArray = [];
            for(var i = 0; i<res.length; i++){
                choiceArray.push(res[i].product_name);
            }
         return choiceArray;
        },
        message:"What is the ID of the product you would like to buy?"
    },{
        name:"quantity",
        type:"input",
        message: "How many would you like to purchase?"

    }]).then(function(answer){
        var chosen;
        for (var i = 0; i < res.length; i++) {
            if (res[i].product_name === answer.choice) {
             chosen = res[i];
             console.log(chosen) 
            }
        }
    start();
    })
    })

}

// TOTAL COST

// UPDATE QUANTITY

// function update() {
//     connection.query("UPDATE products SET ? WHERE ?", {

//     } 
// }

// 