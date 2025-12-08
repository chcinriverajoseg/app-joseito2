import React from "react";

const UserCard = ({ user, actions }) => {
  return (
    <div className="rounded-xl overflow-hidden bg-white dark:bg-gray-900 shadow hover:shadow-lg transition">
      <img
        src={user?.avatar || "https://picsum.photos/600/400"}
        alt={user?.name || user?.username}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {user?.name || user?.username || "Usuario"}
        </h3>
        {user?.bio && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
            {user.bio}
          </p>
        )}

        {actions && <div className="mt-4 flex gap-2">{actions}</div>}
      </div>
    </div>
  );
};

export default UserCard;
