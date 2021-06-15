let products = require("../data");
const slugify = require("slugify");

exports.productList = (req, res) => {
  res.json(products);
};
exports.productCreate = (req, res) => {
  const id = products[products.length - 1].id + 1;
  const slug = slugify(
    req.body.name.toLowerCase()
  ); /*const slug=slugify(req.body.name ,{lower:true})*/
  const newProduct = { id: id, slug: slug, ...req.body };
  products.push(newProduct);
  res.status(201).json(newProduct);
};
exports.productDelete = (req, res) => {
  const productId = req.params.productId; /* const {productId} =req.params;*/
  const productFound = products.find((product) => product.id === +productId);
  if (productFound) {
    products = products.filter((product) => product !== productFound);
    res.status(204).end();
  } else {
    res.status(404).json({ message: "product id does not exist" });
  }
};
