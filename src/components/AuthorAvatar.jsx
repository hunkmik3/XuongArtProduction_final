import Image from "next/image";

const AuthorAvatar = ({ size = "md", showName = true, className = "", textColor = "text-gray-900", avatarSrc = "/images/avatar_author.jpg" }) => {
  const sizeClasses = {
    xs: "w-6 h-6",
    sm: "w-8 h-8",
    md: "w-10 h-10", 
    lg: "w-12 h-12",
    xl: "w-16 h-16"
  };

  const textSizeClasses = {
    xs: "text-xs",
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg", 
    xl: "text-xl"
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className={`${sizeClasses[size]} rounded-full overflow-hidden bg-gray-200 flex-shrink-0`}>
        <Image
          src={avatarSrc} // Avatar của XUONGART
          alt="XUONGART"
          width={64}
          height={64}
          className="w-full h-full object-cover"
        />
      </div>
      {showName && (
        <span className={`font-semibold ${textColor} ${textSizeClasses[size]}`}>
          XUONGART
        </span>
      )}
    </div>
  );
};

export default AuthorAvatar;
