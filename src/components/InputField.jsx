export default function InputField({type,placeholder, value, setValue,label}) {
    return (
        <div className="form-group">
        <input type={type} required placeholder={placeholder} value={value} onChange={(e) => setValue(e.target.value)} />
        <label>{label}</label>
      </div>
    )
}