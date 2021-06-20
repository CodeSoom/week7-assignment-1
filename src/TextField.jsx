export default function TextField({
  label, type = 'text', name,
  value, onChange,
}) {
  function handleChange(event) {
    const {
      target: {
        name: inputName,
        value: inputValue,
      },
    } = event;

    onChange({
      name: inputName,
      value: inputValue,
    });
  }

  return (
    <label>
      {label}
      <input
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
      />
    </label>
  );
}
