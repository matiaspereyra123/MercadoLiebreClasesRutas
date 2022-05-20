const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");



const controller = {
	index: (req, res) => {
		const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

		const visited = products.filter((product)=>{
			return product.category == 'visited';
		});
		
		
		const inSale = products.filter(function(product){
			return product.category == 'in-sale';
		});


		res.render('index',{visited:visited, inSale:inSale});
	},
	search: (req, res) => {
	res.render('results')
	},
};

module.exports = controller;
