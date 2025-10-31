export default function Input({ label, id, ...props }: any) {
  let style = "w-full px-4 py-3 bg-input border border-border rounded-lg text-fg placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all";
  if( id === "password" ) {
    style += " pr-12";
  }
  return (
    <div className="control no-margin relative">
      {id && props.type ? (
        <>
          <label
            htmlFor={id}
            className="block text-md font-medium text-fg mb-2"
          >
            {label}
          </label>
          <input id={id} {...props} className={style} />
        </>
      ) : (
        <label htmlFor={id} className="block text-md font-medium text-fg mb-2">
          {label}
        </label>
      )}
    </div>
  );
}
