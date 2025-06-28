import React, { useState, useEffect, useRef } from 'react';
import { FaChevronDown, FaTimes } from 'react-icons/fa';
import './MultiSelect.css';

const MultiSelect = ({
  options = [], // [{ value: '1', label: 'Option 1' }, ...]
  value = [],   // Array de objetos de opción seleccionados: [{ value: '1', label: 'Option 1' }]
  onChange,     // Función que recibe un array de objetos de opción seleccionados
  labelledBy = "multi-select", // Para accesibilidad
  placeholder = "Seleccionar...",
  hasSelectAll = true,
  overrideStrings = {}
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  const strings = {
    selectSomeItems: "Seleccionar...",
    allItemsAreSelected: "Todos seleccionados",
    search: "Buscar...",
    selectAll: "Seleccionar todo",
    clearAll: "Limpiar todo",
    ...overrideStrings,
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [wrapperRef]);

  const handleToggleOption = (option) => {
    let newValue;
    if (value.some(v => v.value === option.value)) {
      newValue = value.filter(v => v.value !== option.value);
    } else {
      newValue = [...value, option];
    }
    onChange(newValue);
  };

  const handleSelectAll = () => {
    if (value.length === options.length) {
      onChange([]); // Deseleccionar todo
    } else {
      onChange(options); // Seleccionar todo
    }
  };

  const getDisplayValue = () => {
    if (value.length === 0) {
      return placeholder || strings.selectSomeItems;
    }
    if (value.length === options.length && options.length > 0) {
      return strings.allItemsAreSelected;
    }
    if (value.length > 2) {
      return `${value.length} seleccionados`;
    }
    return value.map(v => v.label).join(', ');
  };

  return (
    <div className="multiselect-wrapper" ref={wrapperRef} aria-labelledby={labelledBy}>
      <button
        type="button"
        className={`multiselect-control ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="multiselect-value">{getDisplayValue()}</span>
        <FaChevronDown className={`multiselect-chevron ${isOpen ? 'open' : ''}`} />
      </button>
      {isOpen && (
        <div className="multiselect-dropdown" role="listbox">
          {hasSelectAll && options.length > 0 && (
            <button
              type="button"
              className="multiselect-action-button"
              onClick={handleSelectAll}
            >
              {value.length === options.length ? strings.clearAll : strings.selectAll}
            </button>
          )}
          {options.map(option => (
            <div
              key={option.value}
              className={`multiselect-option ${value.some(v => v.value === option.value) ? 'selected' : ''}`}
              onClick={() => handleToggleOption(option)}
              role="option"
              aria-selected={value.some(v => v.value === option.value)}
              tabIndex={0}
              onKeyPress={(e) => e.key === 'Enter' && handleToggleOption(option)}
            >
              <input
                type="checkbox"
                checked={value.some(v => v.value === option.value)}
                readOnly
                className="multiselect-checkbox"
              />
              {option.label}
            </div>
          ))}
          {options.length === 0 && (
            <div className="multiselect-no-options">No hay opciones disponibles</div>
          )}
        </div>
      )}
    </div>
  );
};

export default MultiSelect;