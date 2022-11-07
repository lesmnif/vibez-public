export default function SubmitButton({ setVibeName, title, placeholder, light, hide}) {
    
    return (
      <div>
        {!hide && <h1 className={light ? "block text-base font-light text-white mb-5 " :  "block text-base font-semibold text-white mb-5"}>
          {title}
        </h1>}
        {placeholder && <div className="mt-1">
          <input
            onChange={(event) => setVibeName(event.target.value)}
            type="text"
            placeholder={placeholder}
            className="border-2 border-white placeholder:capitalize shadow-sm mb-3 block w-full bg-vibez-cards sm:text-sm text-white rounded-md"
          />
        </div>}
        
      </div>
    )
  }