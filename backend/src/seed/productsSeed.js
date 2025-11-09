const Product = require('../../model/product');

const seedProducts = async () => {
  const existing = await Product.countDocuments();
  if (existing > 0) {
    console.log('🌱 Produtos já existentes no banco. Seed ignorado.');
    return;


    
  }

  const products = [{
      title: 'Notebook Lenovo IdeaPad 3',
      price: 2899.99,
      description: 'Notebook com Ryzen 5, 8GB RAM e SSD 256GB.',
      image: 'https://m.media-amazon.com/images/I/71vDKtS1bGL._AC_SL1500_.jpg',
      category: 'Eletrônicos'
    },
    {
      title: 'Smartphone Samsung Galaxy S23',
      price: 4999.99,
      description: 'Smartphone topo de linha com 128GB e câmera tripla.',
      image: 'https://m.media-amazon.com/images/I/71ZDY57yTQL._AC_SL1500_.jpg',
      category: 'Celulares'
    },
    {
      title: 'Monitor LG Ultragear 24"',
      price: 999.99,
      description: 'Monitor gamer 144Hz Full HD com 1ms de resposta.',
      image: 'https://m.media-amazon.com/images/I/81tA2BAdJgL._AC_SL1500_.jpg',
      category: 'Informática'
    },
    {
      title: 'Cadeira Gamer ThunderX3',
      price: 1399.90,
      description: 'Cadeira ergonômica com apoio lombar e regulagem.',
      image: 'https://m.media-amazon.com/images/I/71rZf8PbK-L._AC_SL1500_.jpg',
      category: 'Móveis'
    },
    {
      title: 'Fone Bluetooth JBL Tune 510BT',
      price: 279.90,
      description: 'Som potente com conexão sem fio e bateria de longa duração.',
      image: 'https://m.media-amazon.com/images/I/71ynIMjwgwL._AC_SL1500_.jpg',
      category: 'Áudio'
    },
    {
      title: 'Mouse Logitech G203 Lightsync',
      price: 159.90,
      description: 'Mouse gamer RGB com sensor de alta precisão.',
      image: 'https://m.media-amazon.com/images/I/61Qqg+YyW-L._AC_SL1500_.jpg',
      category: 'Periféricos'
    },
    {
      title: 'Teclado Mecânico Redragon Kumara',
      price: 259.90,
      description: 'Switches mecânicos Blue e retroiluminação RGB.',
      image: 'https://m.media-amazon.com/images/I/61sZJ+PmHBL._AC_SL1500_.jpg',
      category: 'Periféricos'
    },
    {
      title: 'SSD Kingston A400 480GB',
      price: 299.90,
      description: 'SSD SATA 3 de alto desempenho para notebooks e PCs.',
      image: 'https://m.media-amazon.com/images/I/61ZygoEEXQL._AC_SL1500_.jpg',
      category: 'Armazenamento'
    },
    {
      title: 'Geladeira Brastemp Frost Free 375L',
      price: 3799.90,
      description: 'Design moderno, prateleiras ajustáveis e baixo consumo.',
      image: 'https://m.media-amazon.com/images/I/61HhbyYh0jL._AC_SL1500_.jpg',
      category: 'Eletrodomésticos'
    },
    {
      title: 'Liquidificador Philips Walita 800W',
      price: 199.90,
      description: 'Copo de 2L, lâminas de aço inoxidável e função pulsar.',
      image: 'https://m.media-amazon.com/images/I/61LK2HSm2jL._AC_SL1500_.jpg',
      category: 'Cozinha'
    },
    // 🧠 Adicione variações abaixo (vão gerar 50 produtos automaticamente)
  ];

  // Duplicando aleatoriamente até chegar em 50 produtos
  const expandedProducts = [];
  let idCounter = 1;

  while (expandedProducts.length < 50) {
    const base = products[Math.floor(Math.random() * products.length)];
    expandedProducts.push({
      id: idCounter++,
      ...base,
      title: `${base.title} #${idCounter}`
    });
  }

  await Product.insertMany(expandedProducts);
  console.log('✅ Seed de produtos inserido com sucesso!');
};

module.exports = seedProducts;