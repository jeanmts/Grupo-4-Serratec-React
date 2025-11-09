const Product = require('../model/product');

// 📦 Buscar todos os produtos
module.exports.getAllProducts = async (req, res) => {
	try {
		const limit = Number(req.query.limit) || 0;
		const sort = req.query.sort === 'desc' ? -1 : 1;

		const products = await Product.find()
			.select(['-_id'])
			.limit(limit)
			.sort({
				id: sort
			});

		res.json(products);
	} catch (err) {
		console.error(err);
		res.status(500).json({
			message: 'Erro ao buscar produtos'
		});
	}
};

// 🔍 Buscar produto por ID
module.exports.getProduct = async (req, res) => {
	try {
		const id = req.params.id;
		const product = await Product.findOne({
			id
		}).select(['-_id']);

		if (!product) return res.status(404).json({
			message: 'Produto não encontrado'
		});
		res.json(product);
	} catch (err) {
		console.error(err);
		res.status(500).json({
			message: 'Erro ao buscar produto'
		});
	}
};

// 📂 Buscar todas as categorias
module.exports.getProductCategories = async (req, res) => {
	try {
		const categories = await Product.distinct('category');
		res.json(categories);
	} catch (err) {
		console.error(err);
		res.status(500).json({
			message: 'Erro ao buscar categorias'
		});
	}
};

// 📁 Buscar produtos de uma categoria específica
module.exports.getProductsInCategory = async (req, res) => {
	try {
		const category = req.params.category;
		const limit = Number(req.query.limit) || 0;
		const sort = req.query.sort === 'desc' ? -1 : 1;

		const products = await Product.find({
				category
			})
			.select(['-_id'])
			.limit(limit)
			.sort({
				id: sort
			});

		res.json(products);
	} catch (err) {
		console.error(err);
		res.status(500).json({
			message: 'Erro ao buscar produtos da categoria'
		});
	}
};

// ➕ Adicionar produto
module.exports.addProduct = async (req, res) => {
	try {
		if (!req.body) {
			return res.status(400).json({
				status: 'error',
				message: 'Dados não enviados',
			});
		}

		const productCount = await Product.countDocuments();

		const product = new Product({
			id: productCount + 1,
			title: req.body.title,
			price: req.body.price,
			description: req.body.description,
			image: req.body.image,
			category: req.body.category,
		});

		const savedProduct = await product.save();
		res.status(201).json(savedProduct);
	} catch (err) {
		console.error(err);
		res.status(500).json({
			message: 'Erro ao adicionar produto'
		});
	}
};

// ✏️ Editar produto
module.exports.editProduct = async (req, res) => {
	try {
		const id = req.params.id;
		const updatedProduct = await Product.findOneAndUpdate({
				id
			},
			req.body, {
				new: true
			}
		);

		if (!updatedProduct)
			return res.status(404).json({
				message: 'Produto não encontrado'
			});

		res.json(updatedProduct);
	} catch (err) {
		console.error(err);
		res.status(500).json({
			message: 'Erro ao editar produto'
		});
	}
};

// ❌ Deletar produto
module.exports.deleteProduct = async (req, res) => {
	try {
		const id = req.params.id;
		const deletedProduct = await Product.findOneAndDelete({
			id
		});

		if (!deletedProduct)
			return res.status(404).json({
				message: 'Produto não encontrado'
			});

		res.json({
			message: 'Produto removido com sucesso',
			deletedProduct
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({
			message: 'Erro ao deletar produto'
		});
	}
};