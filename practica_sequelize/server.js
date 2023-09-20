const express = require('express');
const app = express();

const sequelize = require('./src/conexion/connection');
const Product = require('./src/modelos/product');
const Employee = require('./src/modelos/employee');
const ProductCategoryView = require('./src/modelos/productsandcategories');
const { Op } = require('sequelize');

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(async (req, res, next) => {
      try {
            await sequelize.authenticate();
            await Product.sync();
            await Employee.sync();
            next();
      } catch (error) {
            res.status(500).json({ error: 'Error en el servidor', description: error.message });
      }
});

app.get('/productos', async (req, res) => {
      try {
            const allProducts = await Product.findAll();

            allProducts.length !== 0 ? res.status(200).json(allProducts)
                  : res.status(404).json({ error: "No se encontraron productos para listar." });

      } catch (error) {
            res.status(500).json({ error: 'Error en el servidor', description: error.message });
      }
});

app.get('/productos/:productID', async (req, res) => {
      try {
            const { productID } = req.params;
            const product = await Product.findByPk(productID);

            !product ? res.status(404).json({ error: "Producto no encontrado." })
                     : res.status(200).json(product);
      } catch (error) {
            res.status(500).json({ error: 'Error en el servidor', 
                                   description: error.message });
      }
});

app.get('/productos/categoria/:categoryID', async (req, res) => {
      try {
            const { categoryID } = req.params;
            const products = await Product.findAll({ where: { categoryID } });

            !products ? res.status(404).json({ error: 'Producto no encontrado' })
                      : res.status(200).json(products);
      } catch (error) {
            res.status(500).json({ error: 'Error en el servidor', 
                                   description: error.message });
      }
});

app.get('/productos/nombre/:productName', async (req, res) => {
      try {
            const { productName } = req.params;
            const product = await Product.findOne({ where: { productName } });

            !product ? res.status(404).json({ error: 'Producto no encontrado' })
                     : res.status(200).json(product);
      } catch (error) {
            res.status(500).json({ error: 'Error en el servidor', description: error.message });
      }
});

app.get('/productos/buscar/:query', async (req, res) => {
      try {
            const { query } = req.params;
            const products = await Product.findAll({
                  where: { productName: {
                              [Op.like]: `%${ query }%`,
                           },
                  },
            });

            products.length !== 0 ? res.status(200).json(products)
                                  : res.status(404).json({ error: "No se encontraron productos para listar." });
      } catch (error) {
            res.status(500).json({ error: 'Error en el servidor', description: error.message });
      }
});

app.get('/productos/importemayor/:unitPrice', async (req, res) => {
      try {
            const { unitPrice } = req.params;
            const products = await Product.findAll({
                  where: { UnitPrice: {
                              [Op.gt]: unitPrice,
                           },
                  },
            });

            products.length !== 0 ? res.status(200).json(products)
                                  : res.status(404).json({ error: "No se encontraron productos para listar." });
      } catch (error) {
            res.status(500).json({ error: 'Error en el servidor', description: error.message });
      }
});

app.get('/productosycategorias', async (req, res) => { //Vista SQL simple
      try {
            const allProducts = await ProductCategoryView.findAll();
            
            allProducts.length !== 0 ? res.status(200).json(allProducts)
                  : res.status(404).json({ error: "No se encontraron productos." });

      } catch (error) {
            res.status(500).json({ error: 'Error en el servidor', 
                                   description: error.message });
      }
});

// app.get('/productosycategorias', async (req, res) => { //Vista SQL más información adicional
//       try {
//             const allProducts = await ProductCategoryView.findAll();

//             const response = {
//                   results: [...allProducts],
//                   info: {
//                         dateOfQuery: new Date(),
//                         totalRecords: allProducts.length || 0,
//                         database: sequelize.getDatabaseName()
//                   }
//             }

//             allProducts.length !== 0 ? res.status(200).json(response)
//                   : res.status(404).json({ error: "No se encontraron productos." });

//       } catch (error) {
//             res.status(500).json({ error: 'Error en el servidor', 
//                                    description: error.message });
//       }
// });


app.get('/empleados', async (req, res) => {
      try {
            const allEmployees = await Employee.findAll();
            allEmployees.length !== 0 ? res.status(200).json(allEmployees)
                                      : res.status(404).json({ error: "No se encontraron registros para listar." });

      } catch (error) {
            res.status(500).json({ error: 'Error en el servidor', description: error.message });
      }
});

app.get('/empleados/:employeeID', async (req, res) => {
      try {
            const { employeeID } = req.params;
            const employee = await Employee.findByPk(employeeID);

            !employee ? res.status(404).json({ error: "No se encontró el empleado." })
                      : res.status(200).json(employee);
      } catch (error) {
            res.status(500).json({ error: 'Error en el servidor', description: error.message });
      }
});

app.listen(port, () => console.log(`Servidor escuchando en el puerto ${port}`) );