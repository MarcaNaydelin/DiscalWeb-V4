const Child = require('../models/Child');

exports.createChildProfile = async (req, res) => {
  const { parent_id, name, identification_type, age_group, avatar } = req.body;

  console.log("Datos recibidos:", req.body);

  try {
    const newChild = await Child.createChild({ parent_id, name, identification_type, age_group, avatar });
    res.status(201).json({ message: 'Perfil de niño creado exitosamente', child: newChild });
  } catch (error) {
    /*console.error(error);*/
    console.error("Error en createChildProfile:", error.message);
    res.status(500).json({ message: 'Error al crear el perfil del niño' });
  }
};

exports.getChildrenByParent = async (req, res) => {
  const { parent_id } = req.params;

  try {
    const children = await Child.getChildrenByParent(parent_id);
    res.json(children);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los perfiles de los niños' });
  }
};

exports.updateChildProfile = async (req, res) => {
  const childId = req.params.id;
  const { name, identification_type, age_group, avatar } = req.body;

  try {
    const updatedChild = await Child.updateChild({
      id: childId,
      name,
      identification_type,
      age_group,
      avatar
    });

    res.json({ 
      message: "Perfil actualizado correctamente", 
      child: updatedChild 
    });
  } catch (error) {
    console.error("Error al actualizar perfil:", error.message);
    res.status(500).json({ 
      message: "Error al actualizar el perfil del niño" 
    });
  }
};