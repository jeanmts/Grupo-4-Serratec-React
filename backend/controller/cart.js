const Cart = require('../model/cart');

// 🛒 Buscar todos os carrinhos
module.exports.getAllCarts = async (req, res) => {
	try {
		const limit = Number(req.query.limit) || 0;
		const sort = req.query.sort === 'desc' ? -1 : 1;
		const startDate = new Date(req.query.startdate || '1970-01-01');
		const endDate = new Date(req.query.enddate || Date.now());

		const carts = await Cart.find({
				date: {
					$gte: startDate,
					$lte: endDate
				},
			})
			.select('-_id -products._id')
			.limit(limit)
			.sort({
				id: sort
			});

		res.json(carts);
	} catch (err) {
		console.error(err);
		res.status(500).json({
			status: 'error',
			message: 'Erro ao buscar carrinhos.'
		});
	}
};

// 👤 Buscar carrinhos por usuário
module.exports.getCartsByUserId = async (req, res) => {
	try {
		const userId = req.params.userid;
		const startDate = new Date(req.query.startdate || '1970-01-01');
		const endDate = new Date(req.query.enddate || Date.now());

		const carts = await Cart.find({
			userId,
			date: {
				$gte: startDate,
				$lte: endDate
			},
		}).select('-_id -products._id');

		res.json(carts);
	} catch (err) {
		console.error(err);
		res.status(500).json({
			status: 'error',
			message: 'Erro ao buscar carrinhos do usuário.'
		});
	}
};

// 🧺 Buscar carrinho por ID
module.exports.getSingleCart = async (req, res) => {
	try {
		const id = parseInt(req.params.id);
		const cart = await Cart.findOne({
			id
		}).select('-_id -products._id');

		if (!cart) {
			return res.status(404).json({
				status: 'error',
				message: 'Carrinho não encontrado.'
			});
		}

		res.json(cart);
	} catch (err) {
		console.error(err);
		res.status(500).json({
			status: 'error',
			message: 'Erro ao buscar carrinho.'
		});
	}
};

// ➕ Adicionar carrinho
module.exports.addCart = async (req, res) => {
	try {
		if (!req.body || Object.keys(req.body).length === 0) {
			return res.status(400).json({
				status: 'error',
				message: 'Dados não enviados.'
			});
		}

		const count = await Cart.countDocuments();

		const newCart = new Cart({
			id: count + 1,
			userId: req.body.userId,
			date: req.body.date || new Date(),
			products: req.body.products || [],
		});

		const savedCart = await newCart.save();
		res.status(201).json(savedCart);
	} catch (err) {
		console.error(err);
		res.status(500).json({
			status: 'error',
			message: 'Erro ao criar carrinho.'
		});
	}
};

// ✏️ Editar carrinho
module.exports.editCart = async (req, res) => {
	try {
		const id = parseInt(req.params.id);
		const updates = req.body;

		const updatedCart = await Cart.findOneAndUpdate({
			id
		}, updates, {
			new: true
		});

		if (!updatedCart) {
			return res.status(404).json({
				status: 'error',
				message: 'Carrinho não encontrado.'
			});
		}

		res.json(updatedCart);
	} catch (err) {
		console.error(err);
		res.status(500).json({
			status: 'error',
			message: 'Erro ao editar carrinho.'
		});
	}
};

// ❌ Deletar carrinho
module.exports.deleteCart = async (req, res) => {
	try {
		const id = parseInt(req.params.id);

		const deletedCart = await Cart.findOneAndDelete({
			id
		});

		if (!deletedCart) {
			return res.status(404).json({
				status: 'error',
				message: 'Carrinho não encontrado.'
			});
		}

		res.json({
			status: 'success',
			message: 'Carrinho removido com sucesso.'
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({
			status: 'error',
			message: 'Erro ao deletar carrinho.'
		});
	}
};