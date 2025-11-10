const Product = require('../../model/product');

const seedProducts = async () => {
  const existing = await Product.countDocuments();
  if (existing > 0) {
    console.log('🌱 Produtos já existentes no banco. Seed ignorado.');
    return;
  }

 const products = [
  {
    title: 'Mochila Fjallraven - Foldsack Nº 1',
    price: 109.95,
    description: 'Mochila ideal para o dia a dia e passeios. Possui compartimento acolchoado para laptop de até 15 polegadas.',
    image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png',
    category: 'Roupas Masculinas'
  },
  {
    title: 'Camiseta Masculina Premium Slim Fit',
    price: 22.3,
    description: 'Camiseta ajustada com gola redonda e tecido leve. Ideal para um visual casual e confortável.',
    image: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_t.png',
    category: 'Roupas Masculinas'
  },
  {
    title: 'Jaqueta Masculina de Algodão',
    price: 55.99,
    description: 'Jaqueta ideal para primavera, outono e inverno. Confortável e perfeita para aventuras ao ar livre.',
    image: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_t.png',
    category: 'Roupas Masculinas'
  },
  {
    title: 'Camiseta Masculina Slim Fit Casual',
    price: 15.99,
    description: 'Camiseta slim fit com corte moderno. A cor pode variar de acordo com o monitor.',
    image: 'https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_t.png',
    category: 'Roupas Masculinas'
  },
  {
    title: 'Pulseira Feminina John Hardy Naga Ouro e Prata',
    price: 695.0,
    description: 'Inspirada no dragão mítico Naga, símbolo de amor e proteção. Feita em ouro e prata.',
    image: 'https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_t.png',
    category: 'Joias'
  },
  {
    title: 'Anel de Ouro Maciço Micropavé',
    price: 168.0,
    description: 'Anel elegante em ouro maciço, com design micropavé. Trocas e devoluções em até 30 dias.',
    image: 'https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_t.png',
    category: 'Joias'
  },
  {
    title: 'Anel Princesa Banhado a Ouro Branco',
    price: 9.99,
    description: 'Anel clássico de noivado. Ideal para presentear em casamentos, aniversários ou datas especiais.',
    image: 'https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_t.png',
    category: 'Joias'
  },
  {
    title: 'Brincos Pierced Owl Banhados a Ouro Rosa',
    price: 10.99,
    description: 'Brincos banhados a ouro rosa, feitos em aço inoxidável 316L. Resistentes e sofisticados.',
    image: 'https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_t.png',
    category: 'Joias'
  },
  {
    title: 'HD Externo Portátil WD 2TB USB 3.0',
    price: 64.0,
    description: 'HD portátil compatível com USB 3.0 e 2.0. Alta capacidade e velocidade de transferência.',
    image: 'https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_t.png',
    category: 'Eletrônicos'
  },
  {
    title: 'SSD Interno SanDisk PLUS 1TB - SATA III',
    price: 109.0,
    description: 'SSD com velocidades de até 535MB/s. Ideal para inicialização e carregamento mais rápidos.',
    image: 'https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_t.png',
    category: 'Eletrônicos'
  },
  {
    title: 'SSD Silicon Power 256GB A55 SLC Cache',
    price: 109.0,
    description: 'Alta velocidade e durabilidade com tecnologia SLC Cache. Design fino e compatível com ultrabooks.',
    image: 'https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_t.png',
    category: 'Eletrônicos'
  },
  {
    title: 'HD Externo 4TB WD para Playstation 4',
    price: 114.0,
    description: 'Expanda seu armazenamento PS4 com este HD externo de 4TB. Design elegante e fácil instalação.',
    image: 'https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_t.png',
    category: 'Eletrônicos'
  },
  {
    title: 'Monitor Acer SB220Q 21.5" Full HD IPS',
    price: 599.0,
    description: 'Monitor Full HD com painel IPS, taxa de 75Hz e design ultrafino. Ideal para uso doméstico e profissional.',
    image: 'https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_t.png',
    category: 'Eletrônicos'
  },
  {
    title: 'Monitor Samsung 49" Curvo Gamer QLED 144Hz',
    price: 999.99,
    description: 'Monitor ultrawide QLED de 49 polegadas com 144Hz e HDR. Ideal para jogos imersivos.',
    image: 'https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_t.png',
    category: 'Eletrônicos'
  },
  {
    title: 'Jaqueta Feminina 3 em 1 Snowboard BIYLACLESEN',
    price: 56.99,
    description: 'Jaqueta com forro removível e tecido impermeável. Versátil para diferentes estações.',
    image: 'https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_t.png',
    category: 'Roupas Femininas'
  },
  {
    title: 'Jaqueta Feminina de Couro Sintético Lock and Love',
    price: 29.95,
    description: 'Jaqueta estilo motoqueira com capuz removível e detalhes em costura. Material leve e moderno.',
    image: 'https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_t.png',
    category: 'Roupas Femininas'
  },
  {
    title: 'Capa de Chuva Feminina com Listras',
    price: 39.99,
    description: 'Capa leve e elegante com capuz ajustável, bolsos laterais e fechamento em zíper e botões.',
    image: 'https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2t.png',
    category: 'Roupas Femininas'
  },
  {
    title: 'Blusa Feminina Gola Barco MBJ',
    price: 9.85,
    description: 'Blusa leve e elástica com gola barco e acabamento canelado. Confortável e estilosa.',
    image: 'https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_t.png',
    category: 'Roupas Femininas'
  },
  {
    title: 'Camiseta Feminina Opna Dry-Fit',
    price: 7.95,
    description: 'Camiseta respirável 100% poliéster. Gola em V e tecido leve para conforto durante o uso.',
    image: 'https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_t.png',
    category: 'Roupas Femininas'
  },
  {
    title: 'Camiseta Feminina DANVOUY Estampada',
    price: 12.99,
    description: 'Camiseta casual de algodão e elastano. Estampa moderna e toque macio.',
    image: 'https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_t.png',
    category: 'Roupas Femininas'
  }
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