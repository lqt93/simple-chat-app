export const generateRoomName = room => {
  if (!room) return null;
  return room.name ? room.name : generateNameFromMembers(room.members);
};

const generateNameFromMembers = members => {
  if (!members || members.length === 0) return null;
  switch (true) {
    case members.length === 1:
      return members[0].fullName;
    case members.length > 1 && members.length <= 3:
      return members.reduce(
        (current, next) =>
          (typeof current === "string" ? current : current.fullName) +
          ", " +
          next.fullName
      );
    case members.length > 3:
      return (
        members
          .slice(0, 2)
          .reduce(
            (current, next) =>
              (typeof current === "string" ? current : current.fullName) +
              ", " +
              next.fullName
          ) + `and ${members.length - 2} other people`
      );
    default:
      return null;
  }
};
