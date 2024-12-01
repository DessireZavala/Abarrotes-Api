const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { categoriaModel, marcaModel, productoModel } = require('./models');  // Importa desde models/index.js

// Configuración del servidor Express
const app = express();
const port = 3000;

// Habilitar CORS
app.use(cors());

// Configuración para que Express pueda recibir JSON
app.use(express.json());

// Conexión a MongoDB
const uri = 'mongodb://localhost:27017/supermercado';
mongoose.connect(uri)
    .then(() => {
        console.log('Conexión a MongoDB exitosa');
        app.listen(port, () => console.log(`Servidor corriendo en http://localhost:${port}`));
    })
    .catch(error => {
        console.error('Error de conexión', error);
    });

// Ruta principal
app.get('/', (req, res) => {
    res.send('Supermercado API!');
});

// Rutas para obtener todas las categorías con productos asociados
app.get('/categorias', async (req, res) => {
    try {
        const categorias = await categoriaModel.aggregate([
            {
                $lookup: {
                    from: 'productos',
                    localField: '_id',
                    foreignField: 'categoria',
                    as: 'productos'
                }
            }
        ]);
        return res.json(categorias);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno' });
    }
});

// Ruta para crear una nueva categoría
app.post('/categorias', async (req, res) => {
    try {
        const nombre = req.body?.nombre_categoria;
        if (!nombre) {
            return res.status(400).json({ message: 'Bad request, nombre no encontrado' });
        }
        const categoria = new categoriaModel({ nombre_categoria: nombre });
        const save = await categoria.save();
        return res.status(201).json({ categoria: save });
    } catch (error) {
        console.error('Error', error);
        res.status(500).json({ message: 'Error al crear categoría' });
    }
});

// Otras rutas para marcas y productos
// (Ejemplo: crear una nueva marca)
app.post('/marcas', async (req, res) => {
    try {
        const nombre = req.body?.nombre_marca;
        if (!nombre) {
            return res.status(400).json({ message: 'Bad request, nombre no encontrado' });
        }
        const marca = new marcaModel({ nombre_marca: nombre });
        const save = await marca.save();
        return res.status(201).json({ marca: save });
    } catch (error) {
        console.error('Error', error);
        res.status(500).json({ message: 'Error al crear marca' });
    }
});

// (Ejemplo: obtener todos los productos)
app.get('/productos', async (req, res) => {
    try {
        const productos = await productoModel.find({})
            .populate('categoria')
            .populate('marca');
        return res.json({ productos });
    } catch (error) {
        console.error('Error', error);
        res.status(500).json({ message: 'Error interno' });
    }
});

// (Ejemplo: crear un nuevo producto)
app.post('/productos', async (req, res) => {
    try {
        const { nombre, descripcion, precio, categoria_id, marca_id } = req.body;

        if (!nombre || !descripcion || !precio || !categoria_id || !marca_id) {
            return res.status(400).json({ message: 'Bad request, faltan datos' });
        }

        const categoria = await categoriaModel.findById(categoria_id);
        const marca = await marcaModel.findById(marca_id);

        if (!categoria || !marca) {
            return res.status(400).json({ message: 'Categoría o marca no encontrados' });
        }

        const producto = new productoModel({
            nombre,
            descripcion,
            precio,
            categoria: categoria._id,
            marca: marca._id
        });

        const save = await producto.save();
        return res.status(201).json({ producto: save });
    } catch (error) {
        console.error('Error', error);
        res.status(500).json({ message: 'Error al crear producto' });
    }
});
