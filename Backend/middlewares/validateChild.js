module.exports = (req, res, next) => {
  const isUpdate = req.method.toUpperCase() === 'PUT';
  const { name, identification_type, age_group, avatar } = req.body;

  // Validar campos obligatorios
  const missingFields = [];
  if (!name) missingFields.push('name');
  if (!identification_type) missingFields.push('identification_type');
  if (!age_group) missingFields.push('age_group');
  if (!avatar) missingFields.push('avatar');

  if (missingFields.length > 0) {
    return res.status(400).json({
      message: isUpdate
        ? `Faltan campos obligatorios para actualizar: ${missingFields.join(', ')}`
        : `Faltan campos obligatorios para crear: ${missingFields.join(', ')}`,
      operation: isUpdate ? 'update' : 'create'
    });
  }

  // Solo validar parent_id para creación (POST)
  if (!isUpdate && !req.body.parent_id) {
    return res.status(400).json({ 
      message: "Falta el ID del padre para creación.",
      operation: 'create'
    });
  }

  // Validar valores permitidos
  const tiposValidos = ["Nombre", "Iniciales"];
  const edadesValidas = ["6-7", "7-8", "8-9"];

  if (!tiposValidos.includes(identification_type)) {
    return res.status(400).json({ 
      message: "Tipo de identificación no válido.",
      validTypes: tiposValidos
    });
  }

  if (!edadesValidas.includes(age_group)) {
    return res.status(400).json({ 
      message: "Grupo de edad no válido.",
      validAgeGroups: edadesValidas
    });
  }

  next();
};