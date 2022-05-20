const fs = require('fs');
const path = require('path');

let productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
let productJSON = fs.readFileSync(productsFilePath, 'utf-8');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		res.render('products',{products})
//res.render('detail',{products});
	//	res.render('products',{ 
	//		products,
		//	toThousand
		//});
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		const product = products.find(product=>product.id == req.params.id);
		res.render('detail',{product: product})
		
		//let id = req.params.id
		//let product = products.find(product=> product.id == id);
	//	res.render('detail',{product,toThousand});
	},

	// Create - Form to create
	create: (req, res) => {
		res.render('product-create-form');
	},
	
	// Create -  Method to store
	store: (req, res) => {
		let total  = products.length -1;
		let idnuevo = products[total].id+1;

		let newProduct = {
			id: idnuevo,
			name: req.body.name,
			price: req.body.price,
			discount: req.body.discount,
			category: req.body.category,
			description: req.body.description,
			image:req.file.filename
		};
		//LEE EL ARCHIVO
		//let archivoUsuario = fs.readFileSync('usuario.json',{encoding: 'utf-8'})
		//let usuarios = JSON.parse(archivoUsuario); descromprimimos esta informacion  array con uusarios viejos
		// puede que el archivo este vacio
		let productoNew;
		if(productJSON==''){ // si lo que yo lei es VACIO
			 productoNew = []  //mi variable de productos va a ser un array vacio
		} else{ 
			//si tiene contenido DESCOMPRIMIMOS el archivo JSON para obtener el array de productos
			productoNew = JSON.parse(productJSON);
		}
			//agregar producto nuevo el que creamos
		productoNew.push(newProduct);
		//de nuevo transformarla en JSON 
		
			//pasar a JSON NUEVAMENTE

			let produ = JSON.stringify(productoNew,null,'\t');
			//luego de este proceso podemos hacer fs.writeSync  ( escribirlo)
			fs.writeFileSync(productsFilePath,produ);

			res.redirect('/products');

		//products.push(newProduct);
		//fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ''));
		
	




	},

	// Update - Form to edit
	edit: (req, res) => {
		const product = products.find(item=>item.id==req.params.id);
		res.render('product-edit-form',{productToEdit: product});

		//let  id = req.params.id
	//	const productToEdit= products.find(item=>item.id==id);
		//res.render('product-edit-form',{productToEdit});
	},
	// Update - Method to update
	update: (req, res) => {
		products.find(product=>{
			if(product.id==req.params.id){
				product.name=req.body.name,
				product.price=req.body.price,
				product.discount=req.body.discount,
				product.description=req.body.description,
				product.image=req.file.filename;
			}
		
		})	
		fs.writeFileSync(productsFilePath, JSON.stringify(products,null,'\t'));
		//fs.readFileSync(productsFilePath,'UTF-8');
		res.redirect('/products/detail/'+req.params.id);
	

	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
	
		//const productoToDelete=products.find(product=>product.id===parseInt(req.params.id));
		const newListProducts=products.filter(product=>product.id!==parseInt(req.params.id));
		products = newListProducts;
		fs.writeFileSync(productsFilePath,JSON.stringify(newListProducts,null,'\t'));
		res.redirect('/products');
	}
	
};

module.exports = controller;