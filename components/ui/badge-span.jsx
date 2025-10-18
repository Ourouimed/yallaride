export default function BadgeSpan({ title, icon: Icon, className = '' }) {
  return (
    <span
      className={`inline-flex items-center gap-2 py-2 px-5 rounded-full 
                  bg-sec dark:bg-gray-800 
                  ${className}`}
      role="status"
      aria-label={title}
    >
      <span className="flex items-center justify-center p-1 rounded-full aspect-square bg-mainColor dark:bg-blue-500">
        {Icon && <Icon className="text-white w-4 h-4" />}
      </span>
      <span className="text-sm text-black dark:text-white">{title}</span>
    </span>
  );
}
